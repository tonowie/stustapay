package de.stustapay.stustapay.ui.root

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import de.stustapay.stustapay.model.InfallibleApiRequest
import de.stustapay.stustapay.model.InfallibleApiResponse
import de.stustapay.stustapay.repository.InfallibleRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject


sealed interface PopupState {
    /** no overlay visible */
    object Hide : PopupState

    /** show request attempt that can be retried */
    data class CanRetry(val request: InfallibleApiRequest) : PopupState

    /** when the request is currently retrying */
    data class Retrying(val request: InfallibleApiRequest) : PopupState

    /** show request result that must be dismissed */
    data class RetrySuccess(val response: InfallibleApiResponse) : PopupState
}


@HiltViewModel
class InfalliblePopupViewModel @Inject constructor(
    private val infallibleRepository: InfallibleRepository
) : ViewModel() {

    private val showPopup = MutableStateFlow(false)

    val state: StateFlow<PopupState> =
        combine(
            infallibleRepository.request,
            infallibleRepository.response,
            infallibleRepository.active
        ) { request, response, active ->
            if (request == null) {
                // request was sent or cleared -> it's null
                if (response != null && showPopup.value) {
                    PopupState.RetrySuccess(response)
                } else {
                    PopupState.Hide
                }
            } else {
                // request is pending.
                when (request.status()) {
                    is InfallibleApiRequest.Status.Failed -> {
                        // when a request failed initially
                        showPopup.update { true }
                        PopupState.CanRetry(request)
                    }

                    is InfallibleApiRequest.Status.Normal -> {
                        if (showPopup.value && active) {
                            // when we retried through the popup
                            PopupState.Retrying(request)
                        } else {
                            // for every normal request
                            PopupState.Hide
                        }
                    }
                }
            }
        }.stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = PopupState.Hide,
        )

    private val clickCounter = MutableStateFlow(0)

    fun resetClicker() {
        clickCounter.update { 0 }
    }

    fun bypass() {
        clickCounter.update { it + 1 }
        if (clickCounter.value > 20) {
            viewModelScope.launch {
                infallibleRepository.clear()
            }
        }
    }

    /** retry button action */
    fun retry() {
        viewModelScope.launch {
            infallibleRepository.retry()
        }
    }

    /** after requests were successful */
    fun dismiss() {
        viewModelScope.launch {
            infallibleRepository.dismissSuccess()
            showPopup.update { false }
        }
    }
}