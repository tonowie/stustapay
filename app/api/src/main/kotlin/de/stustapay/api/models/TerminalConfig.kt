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

package de.stustapay.api.models

import de.stustapay.api.models.TerminalTillConfig

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName
import kotlinx.serialization.Contextual

/**
 * 
 *
 * @param id 
 * @param name 
 * @param description 
 * @param till 
 * @param testMode 
 * @param testModeMessage 
 */
@Serializable

data class TerminalConfig (

    @SerialName(value = "id")
    val id: @Contextual com.ionspin.kotlin.bignum.integer.BigInteger,

    @SerialName(value = "name")
    val name: kotlin.String,

    @SerialName(value = "description")
    val description: kotlin.String,

    @SerialName(value = "till")
    val till: TerminalTillConfig?,

    @SerialName(value = "test_mode")
    val testMode: kotlin.Boolean,

    @SerialName(value = "test_mode_message")
    val testModeMessage: kotlin.String

)
