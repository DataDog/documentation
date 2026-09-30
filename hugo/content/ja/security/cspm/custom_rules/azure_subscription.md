---
dependencies: []
disable_edit: true
---
# azure_subscription

## `authorization_source`
**タイプ**: `STRING`<br>
**プロバイダー名**: `authorizationSource`<br>
**説明**: リクエストの認可元。有効な値は、Legacy、RoleBased、Bypassed、Direct、および Management の 1 つまたは複数の組み合わせです。例えば、'Legacy, RoleBased' です。<br>
## `display_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `displayName`<br>
**説明**: サブスクリプションの表示名。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: サブスクリプションの完全修飾 ID。例: /subscriptions/00000000-0000-0000-0000-000000000000<br>
## `managed_by_tenants`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `managedByTenants`<br>
**説明**: サブスクリプションを管理するテナントを含む配列。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `tenantId`<br>
    **説明**: 管理するテナントのテナント ID。これは GUID です。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `state`
**タイプ**: `STRING`<br>
**Provider name**: `state`<br>
**説明**: サブスクリプションの状態。可能な値は Enabled、Warned、PastDue、Disabled、および Deleted です。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `subscription_policies`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `subscriptionPolicies`<br>
**説明**: サブスクリプションポリシー。<br>
   - `location_placement_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `locationPlacementId`<br>
    **説明**: サブスクリプションのロケーション配置 ID。この ID は、サブスクリプションに表示されるリージョンを示します。たとえば、ロケーション配置 ID が Public_2014-09-01 のサブスクリプションは、Azure のパブリックリージョンにアクセスできます。<br>
   - `quota_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `quotaId`<br>
    **説明**: サブスクリプションクォータ ID。<br>
   - `spending_limit`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `spendingLimit`<br>
    **説明**: サブスクリプションの利用限度。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `tenant_id`
**タイプ**: `STRING`<br>
**Provider name**: `tenantId`<br>
**説明**: サブスクリプションテナント ID。<br>