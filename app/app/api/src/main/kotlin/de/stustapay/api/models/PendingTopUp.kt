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

import de.stustapay.api.models.PaymentMethod

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName
import kotlinx.serialization.Contextual

/**
 * 
 *
 * @param uuid 
 * @param paymentMethod 
 * @param amount 
 * @param customerTagUid 
 * @param customerAccountId 
 * @param oldBalance 
 * @param newBalance 
 */
@Serializable

data class PendingTopUp (

    @Contextual @SerialName(value = "uuid")
    val uuid: java.util.UUID,

    @Contextual @SerialName(value = "payment_method")
    val paymentMethod: PaymentMethod,

    @Contextual @SerialName(value = "amount")
    val amount: kotlin.Double,

    @SerialName(value = "customer_tag_uid")
    val customerTagUid: kotlin.Int,

    @SerialName(value = "customer_account_id")
    val customerAccountId: kotlin.Int,

    @Contextual @SerialName(value = "old_balance")
    val oldBalance: kotlin.Double,

    @Contextual @SerialName(value = "new_balance")
    val newBalance: kotlin.Double

)

