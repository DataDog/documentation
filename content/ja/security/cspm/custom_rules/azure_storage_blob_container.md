---
dependencies: []
disable_edit: true
---
# azure_storage_blob_container

## `default_encryption_scope`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.defaultEncryptionScope`<br>
**説明**: すべての書き込みに指定された暗号化スコープを使用するよう、コンテナをデフォルトにします。<br>
## `deleted`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.deleted`<br>
**説明**: Blob コンテナが削除されたかどうかを示します。<br>
## `deleted_time`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.deletedTime`<br>
**説明**: Blob コンテナの削除時間。<br>
## `deny_encryption_scope_override`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.denyEncryptionScopeOverride`<br>
**説明**: コンテナのデフォルトから暗号化スコープのオーバーライドをブロックします。<br>
## `etag`
**タイプ**: `STRING`<br>
**プロバイダー名**: `etag`<br>
**説明**: リソース Etag。<br>
## `has_immutability_policy`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.hasImmutabilityPolicy`<br>
**説明**: このコンテナに対して ImmutabilityPolicy が作成されている場合、SRP は hasImmutabilityPolicy パブリックプロパティを true に設定します。ImmutabilityPolicy がこのコンテナに作成されていない場合、SRP は hasImmutabilityPolicy パブリックプロパティを false に設定します。<br>
## `has_legal_hold`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.hasLegalHold`<br>
**説明**: 既存のタグが 1 つでもある場合、SRP によって hasLegalHold パブリックプロパティは true に設定されます。既存のリーガルホールドのタグがすべて消去されると、SRP によって hasLegalHold パブリックプロパティが false に設定されます。1 つのアカウントで hasLegalHold=true の Blob コンテナは最大 1000 個まで可能です。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `last_modified_time`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.lastModifiedTime`<br>
**説明**: コンテナが最後に変更された日時を返します。<br>
## `lease_duration`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.leaseDuration`<br>
**説明**: コンテナのリース期間が無限か固定かを、コンテナがリースされるときだけ指定します。<br>
## `lease_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.leaseState`<br>
**説明**: コンテナのリース状態。<br>
## `lease_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.leaseStatus`<br>
**説明**: コンテナのリースステータス。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソースの名前<br>
## `public_access`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.publicAccess`<br>
**説明**: コンテナ内のデータを公開でアクセスしてもよいかどうか、およびアクセスのレベルを指定します。<br>
## `remaining_retention_days`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.remainingRetentionDays`<br>
**説明**: ソフト削除された Blob コンテナの残り保持日数。<br>
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
**説明**: リソースの種類。例: "Microsoft.Compute/virtualMachines" または "Microsoft.Storage/storageAccounts"<br>
## `version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.version`<br>
**説明**: 削除された Blob コンテナのバージョン。<br>