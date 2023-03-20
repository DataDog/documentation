---
dependencies: []
disable_edit: true
---
# aws_lambda_policy_statement
詳細は AWS のドキュメントをご参照ください [1]

[1]: https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html

## `account_id`
**タイプ**: `STRING`<br>
## `function_arn`
**タイプ**: `STRING`<br>
## `policy_id`
**タイプ**: `STRING`<br>
## `policy_not_principal`
**Type**: `STRUCT`<br>
**Provider name**: `policy_not_principal`<br>
   - `policy_id`<br>
    **タイプ**: `STRING`<br>
   - `principal`<br>
    **タイプ**: `STRING`<br>
   - `principal_aws`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `principal_canonical_user`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `principal_federated`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `principal_service`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
## `policy_principal`
**タイプ**: `STRUCT`<br>
**Provider name**: `policy_principal`<br>
   - `policy_id`<br>
    **タイプ**: `STRING`<br>
   - `principal`<br>
    **タイプ**: `STRING`<br>
   - `principal_aws`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `principal_canonical_user`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `principal_federated`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `principal_service`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
## `principal_aws`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `principal_service`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `statement_action`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `statement_effect`
**タイプ**: `STRING`<br>
## `statement_has_condition`
**タイプ**: `BOOLEAN`<br>
## `statement_id`
**タイプ**: `INT32`<br>
## `statement_not_action`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `statement_not_resource`
**タイプ**: `STRING`<br>
## `statement_resource`
**タイプ**: `STRING`<br>
## `statement_sid`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>