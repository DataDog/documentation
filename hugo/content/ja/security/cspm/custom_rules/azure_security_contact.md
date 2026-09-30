---
dependencies: []
disable_edit: true
---
# azure_security_contact

## `alert_notifications`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.alertNotifications`<br>
**説明**: 新しいセキュリティアラートに関するメール通知を送信するかどうかを定義します<br>
   - `minimal_severity`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `minimalSeverity`<br>
    **説明**: メール通知として送信されるアラートの重大度の最小値を定義します<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `state`<br>
    **説明**: 新しいセキュリティアラートについてメール通知を送信するかどうかを定義します<br>
## `emails`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.emails`<br>
**説明**: このセキュリティ担当者で定義された構成で、Azure Security Center から通知を受け取るメールアドレスのリスト。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソース ID<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソース名<br>
## `notifications_by_role`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.notificationsByRole`<br>
**説明**: Azure Security Center から、サブスクリプション上の特定の RBAC ロールを持つ人にメール通知を送信するかどうかを定義します。<br>
   - `roles`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `roles`<br>
    **説明**: Azure Security Center からメール通知を受け取る RBAC ロールを定義します。許可された RBAC ロールのリスト:<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `state`<br>
    **説明**: Azure Security Center から、サブスクリプション上の特定の RBAC ロールを持つ人にメール通知を送信するかどうかを定義します。<br>
## `phone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.phone`<br>
**説明**: セキュリティ担当者の電話番号<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースタイプ<br>