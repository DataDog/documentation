---
dependencies: []
disable_edit: true
---
# aws_sns_topic
Refer to the AWS documentation for more details [1]

[1]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/sns.html#SNS.Client.get_topic_attributes

## `account_id`
**Type**: `STRING`<br>
## `display_name`
**Type**: `STRING`<br>
**Description**: The human-readable name used in the From field for notifications to email and email-json endpoints.<br>
## `kms_master_key_id`
**Type**: `STRING`<br>
**Description**: The ID of an Amazon Web Services managed customer master key (CMK) for Amazon SNS or a custom CMK.<br>
## `owner`
**Type**: `STRING`<br>
**Description**: The Amazon Web Services account ID of the topic's owner.<br>
## `policies`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `policies`<br>
**Description**: The JSON serialization of the topic's access control policy.<br>
   - `account_id`<br>
    **Type**: `STRING`<br>
   - `policy_id`<br>
    **Type**: `STRING`<br>
   - `policy_not_principal`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `policy_not_principal`<br>
       - `policy_id`<br>
        **Type**: `STRING`<br>
       - `principal`<br>
        **Type**: `STRING`<br>
       - `principal_aws`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
       - `principal_canonical_user`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
       - `principal_federated`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
       - `principal_service`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
   - `policy_principal`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `policy_principal`<br>
       - `policy_id`<br>
        **Type**: `STRING`<br>
       - `principal`<br>
        **Type**: `STRING`<br>
       - `principal_aws`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
       - `principal_canonical_user`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
       - `principal_federated`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
       - `principal_service`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
   - `principal_aws`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
   - `statement_action`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
   - `statement_effect`<br>
    **Type**: `STRING`<br>
   - `statement_has_condition`<br>
    **Type**: `BOOLEAN`<br>
   - `statement_id`<br>
    **Type**: `INT32`<br>
   - `statement_not_action`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
   - `statement_not_resource`<br>
    **Type**: `STRING`<br>
   - `statement_resource`<br>
    **Type**: `STRING`<br>
   - `statement_sid`<br>
    **Type**: `STRING`<br>
   - `topic_arn`<br>
    **Type**: `STRING`<br>
## `region`
**Type**: `STRING`<br>
## `subscriptions_confirmed`
**Type**: `STRING`<br>
**Description**: The number of confirmed subscriptions for the topic.<br>
## `subscriptions_deleted`
**Type**: `STRING`<br>
**Description**: The number of deleted subscriptions for the topic.<br>
## `subscriptions_pending`
**Type**: `STRING`<br>
**Description**: The number of subscriptions pending confirmation for the topic.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `topic_arn`
**Type**: `STRING`<br>
**Description**: The topic's ARN.<br>
