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


import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName
import kotlinx.serialization.Contextual

/**
 * 
 *
 * @param vouchers 
 * @param userTagUid 
 */
@Serializable

data class GrantVoucherPayload (

    @SerialName(value = "vouchers")
    val vouchers: kotlin.Int,

    @SerialName(value = "user_tag_uid")
    val userTagUid: kotlin.ULong

)

