---
dependencies: []
disable_edit: true
---
# aws_sns_topic
詳細は AWS のドキュメントをご参照ください [1]

[1]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/sns.html#SNS.Client.get_topic_attributes

## `account_id`
**タイプ**: `STRING`<br>
## `display_name`
**タイプ**: `STRING`<br>
**説明**: email および email-json エンドポイントへの通知で From フィールドに使用される、人間が読める名前。<br>
## `kms_master_key_id`
**タイプ**: `STRING`<br>
**説明**: Amazon SNS の Amazon Web Services が管理するカスタマーマスターキー (CMK)、またはカスタム CMK の ID。<br>
## `owner`
**タイプ**: `STRING`<br>
**説明**: トピックの所有者の Amazon Web Services アカウント ID。<br>
## `policies`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `policies`<br>
**説明**: トピックのアクセス制御ポリシーを JSON でシリアライズしたもの。<br>
   - `account_id`<br>
    **タイプ**: `STRING`<br>
   - `policy_id`<br>
    **タイプ**: `STRING`<br>
   - `policy_not_principal`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `policy_not_principal`<br>
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
   - `policy_principal`<br>
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
   - `principal_aws`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `statement_action`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `statement_effect`<br>
    **タイプ**: `STRING`<br>
   - `statement_has_condition`<br>
    **タイプ**: `BOOLEAN`<br>
   - `statement_id`<br>
    **タイプ**: `INT32`<br>
   - `statement_not_action`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
   - `statement_not_resource`<br>
    **タイプ**: `STRING`<br>
   - `statement_resource`<br>
    **タイプ**: `STRING`<br>
   - `statement_sid`<br>
    **タイプ**: `STRING`<br>
   - `topic_arn`<br>
    **タイプ**: `STRING`<br>
## `region`
**タイプ**: `STRING`<br>
## `subscriptions_confirmed`
**タイプ**: `STRING`<br>
**説明**: トピックの確定済みサブスクリプション数。<br>
## `subscriptions_deleted`
**タイプ**: `STRING`<br>
**説明**: トピックの削除済みサブスクリプション数。<br>
## `subscriptions_pending`
**タイプ**: `STRING`<br>
**説明**: トピックの確定待ちサブスクリプション数。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `topic_arn`
**タイプ**: `STRING`<br>
**説明**: トピックの ARN。<br>