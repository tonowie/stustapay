/**
 *
 * Please note:
 * This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit this file manually.
 *
 */

@file:Suppress(
    "ArrayInDataClass",
    "EnumEntryName",
    "RemoveRedundantQualifierName",
    "UnusedImport"
)

package de.stustapay.api.apis


import de.stustapay.api.models.TerminalRegistrationPayload
import de.stustapay.api.models.TerminalRegistrationSuccess

import de.stustapay.api.infrastructure.*
import io.ktor.client.HttpClientConfig
import io.ktor.client.request.forms.formData
import io.ktor.client.engine.HttpClientEngine
import io.ktor.http.ParametersBuilder

    open class AuthApi(
    baseUrl: String = ApiClient.BASE_URL,
    httpClientEngine: HttpClientEngine? = null,
    httpClientConfig: ((HttpClientConfig<*>) -> Unit)? = null,
    ) : ApiClient(
        baseUrl,
        httpClientEngine,
        httpClientConfig,
    ) {

        /**
        * Log out this Terminal
        * 
         * @return void
        */
        open suspend fun logoutTerminal(): HttpResponse<Unit> {

            val localVariableAuthNames = listOf<String>("OAuth2PasswordBearer")

            val localVariableBody = 
                    io.ktor.client.utils.EmptyContent

            val localVariableQuery = mutableMapOf<String, List<String>>()

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.POST,
            "/auth/logout_terminal",
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            )

            return request(
            localVariableConfig,
            localVariableBody,
            localVariableAuthNames
            ).wrap()
            }

        /**
        * Register a new Terminal
        * 
         * @param terminalRegistrationPayload  
         * @return TerminalRegistrationSuccess
        */
            @Suppress("UNCHECKED_CAST")
        open suspend fun registerTerminal(terminalRegistrationPayload: TerminalRegistrationPayload): HttpResponse<TerminalRegistrationSuccess> {

            val localVariableAuthNames = listOf<String>()

            val localVariableBody = terminalRegistrationPayload

            val localVariableQuery = mutableMapOf<String, List<String>>()

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.POST,
            "/auth/register_terminal",
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = false,
            )

            return jsonRequest(
            localVariableConfig,
            localVariableBody,
            localVariableAuthNames
            ).wrap()
            }

        }
