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

import de.stustapay.api.models.CashRegister
import de.stustapay.api.models.CashRegisterStocking

import de.stustapay.api.models.RegisterStockUpPayload
import de.stustapay.api.models.TerminalConfig
import de.stustapay.api.models.UserInfo
import de.stustapay.api.models.UserInfoPayload

import de.stustapay.api.infrastructure.*
import io.ktor.client.HttpClientConfig
import io.ktor.client.request.forms.formData
import io.ktor.client.engine.HttpClientEngine
import io.ktor.http.ParametersBuilder

    open class BaseApi(
    baseUrl: String = ApiClient.BASE_URL,
    httpClientEngine: HttpClientEngine? = null,
    httpClientConfig: ((HttpClientConfig<*>) -> Unit)? = null,
    ) : ApiClient(
        baseUrl,
        httpClientEngine,
        httpClientConfig,
    ) {

        /**
        * obtain the current terminal config
        * 
         * @return TerminalConfig
        */
            @Suppress("UNCHECKED_CAST")
        open suspend fun config(): HttpResponse<TerminalConfig> {

            val localVariableAuthNames = listOf<String>("OAuth2PasswordBearer")

            val localVariableBody = 
                    io.ktor.client.utils.EmptyContent

            val localVariableQuery = mutableMapOf<String, List<String>>()

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.GET,
            "/config",
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
        * health check endpoint
        * 
         * @return void
        */
        open suspend fun health(): HttpResponse<Unit> {

            val localVariableAuthNames = listOf<String>()

            val localVariableBody = 
                    io.ktor.client.utils.EmptyContent

            val localVariableQuery = mutableMapOf<String, List<String>>()

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.GET,
            "/health",
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = false,
            )

            return request(
            localVariableConfig,
            localVariableBody,
            localVariableAuthNames
            ).wrap()
            }

        /**
        * obtain the list of available cash register stockings
        * 
         * @return kotlin.collections.List<CashRegisterStocking>
        */
            @Suppress("UNCHECKED_CAST")
        open suspend fun listCashRegisterStockings(): HttpResponse<kotlin.collections.List<CashRegisterStocking>> {

            val localVariableAuthNames = listOf<String>("OAuth2PasswordBearer")

            val localVariableBody = 
                    io.ktor.client.utils.EmptyContent

            val localVariableQuery = mutableMapOf<String, List<String>>()

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.GET,
            "/cash-register-stockings",
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
        * list all cash registers
        * 
         * @param hideAssigned  (optional, default to true)
         * @return kotlin.collections.List<CashRegister>
        */
            @Suppress("UNCHECKED_CAST")
        open suspend fun listCashRegisters(hideAssigned: kotlin.Boolean?): HttpResponse<kotlin.collections.List<CashRegister>> {

            val localVariableAuthNames = listOf<String>("OAuth2PasswordBearer")

            val localVariableBody = 
                    io.ktor.client.utils.EmptyContent

            val localVariableQuery = mutableMapOf<String, List<String>>()
            hideAssigned?.apply { localVariableQuery["hide_assigned"] = listOf("$hideAssigned") }

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.GET,
            "/cash-registers",
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
        * stock up a cash register
        * 
         * @param registerStockUpPayload  
         * @return void
        */
        open suspend fun stockUpCashRegister(registerStockUpPayload: RegisterStockUpPayload): HttpResponse<Unit> {

            val localVariableAuthNames = listOf<String>("OAuth2PasswordBearer")

            val localVariableBody = registerStockUpPayload

            val localVariableQuery = mutableMapOf<String, List<String>>()

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.POST,
            "/stock-up-cash-register",
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            )

            return jsonRequest(
            localVariableConfig,
            localVariableBody,
            localVariableAuthNames
            ).wrap()
            }

        /**
        * Obtain information about a user tag
        * 
         * @param userInfoPayload  
         * @return UserInfo
        */
            @Suppress("UNCHECKED_CAST")
        open suspend fun userInfo(userInfoPayload: UserInfoPayload): HttpResponse<UserInfo> {

            val localVariableAuthNames = listOf<String>("OAuth2PasswordBearer")

            val localVariableBody = userInfoPayload

            val localVariableQuery = mutableMapOf<String, List<String>>()

            val localVariableHeaders = mutableMapOf<String, String>()

            val localVariableConfig = RequestConfig<kotlin.Any?>(
            RequestMethod.POST,
            "/user-info",
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            )

            return jsonRequest(
            localVariableConfig,
            localVariableBody,
            localVariableAuthNames
            ).wrap()
            }

        }
