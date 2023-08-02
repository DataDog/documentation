---
dependencies: []
disable_edit: true
---
# aws_vpc_endpoint_policy_statement
Refer to the AWS documentation for more details [1]

[1]: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html#vpc-endpoint-policies

## `account_id`
**Type**: `STRING`<br>
## `policy_id`
**Type**: `STRING`<br>
## `policy_not_principal`
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
## `policy_principal`
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
## `principal_aws`
**Type**: `UNORDERED_LIST_STRING`<br>
## `statement_action`
**Type**: `UNORDERED_LIST_STRING`<br>
## `statement_effect`
**Type**: `STRING`<br>
## `statement_has_condition`
**Type**: `BOOLEAN`<br>
## `statement_id`
**Type**: `INT32`<br>
## `statement_not_action`
**Type**: `UNORDERED_LIST_STRING`<br>
## `statement_not_resource`
**Type**: `STRING`<br>
## `statement_resource`
**Type**: `STRING`<br>
## `statement_sid`
**Type**: `STRING`<br>
## `vpc_endpoint_arn`
**Type**: `STRING`<br>
## `vpc_endpoint_id`
**Type**: `STRING`<br>
