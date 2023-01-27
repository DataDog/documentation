---
dependencies: []
disable_edit: true
---
# azure_log_analytics_workspace

## `created_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.createdDate`<br>
**説明**: ワークスペースの作成日。<br>
## `customer_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.customerId`<br>
**説明**: 読み取り専用のプロパティです。ワークスペースに関連付けられた ID を表します。<br>
## `etag`
**タイプ**: `STRING`<br>
**プロバイダー名**: `etag`<br>
**説明**: ワークスペースの etag。<br>
## `features`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.features`<br>
**説明**: ワークスペースの機能。<br>
   - `cluster_resource_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `clusterResourceId`<br>
    **説明**: ワークスペースに紐づく LA クラスター専用 resourceId。<br>
   - `disable_local_auth`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `disableLocalAuth`<br>
    **説明**: Non-AAD ベース Auth を無効にします。<br>
   - `enable_data_export`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableDataExport`<br>
    **説明**: データをエクスポートするかどうかを示すフラグ。<br>
   - `enable_log_access_using_only_resource_permissions`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableLogAccessUsingOnlyResourcePermissions`<br>
    **説明**: リソースとワークスペースのどちらを使用するか、または両方を使用する権限を示すフラグ。<br>
   - `immediate_purge_data_on30_days`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `immediatePurgeDataOn30Days`<br>
    **説明**: 30 日後にデータを削除するかどうかを記述するフラグ。<br>
## `force_cmk_for_query`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.forceCmkForQuery`<br>
**説明**: クエリ管理に顧客管理ストレージが必須であるか否かを示します。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースが存在するジオロケーション<br>
## `modified_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.modifiedDate`<br>
**説明**: ワークスペースの変更日。<br>
## `name`
**タイプ**: `STRING`<br>
**Provider name**: `name`<br>
**説明**: リソースの名前<br>
## `private_link_scoped_resources`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.privateLinkScopedResources`<br>
**説明**: リンクされたプライベートリンクスコープリソースのリスト。<br>
   - `resource_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `resourceId`<br>
    **説明**: プライベートリンクスコープリソースの完全なリソース ID。<br>
   - `scope_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `scopeId`<br>
    **説明**: プライベートリンクスコープの一意の識別子。<br>
## `provisioning_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.provisioningState`<br>
**説明**: ワークスペースのプロビジョニング状態。<br>
## `public_network_access_for_ingestion`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.publicNetworkAccessForIngestion`<br>
**説明**: Log Analytics の取り込みにアクセスするためのネットワークアクセスタイプ。<br>
## `public_network_access_for_query`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.publicNetworkAccessForQuery`<br>
**説明**: Log Analytics のクエリにアクセスするためのネットワークアクセスタイプ。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `retention_in_days`
**タイプ**: `INT32`<br>
**プロバイダー名**: `properties.retentionInDays`<br>
**説明**: ワークスペースのデータ保持期間 (日数)。許容される値は、料金プランによります。詳細については、価格設定のドキュメントを参照してください。<br>
## `sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.sku`<br>
**説明**: ワークスペースの SKU。<br>
   - `capacity_reservation_level`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `capacityReservationLevel`<br>
    **説明**: CapacityReservation sku を選択した場合、このワークスペースの容量予約レベル (GB 単位)。<br>
   - `last_sku_update`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `lastSkuUpdate`<br>
    **説明**: SKU が最後に更新された時刻。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `name`<br>
    **説明**: SKU の名前。<br>
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
## `workspace_capping`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.workspaceCapping`<br>
**説明**: 1 日の取り込み量の上限。<br>
   - `daily_quota_gb`<br>
    **タイプ**: `DOUBLE`<br>
    **プロバイダー名**: `dailyQuotaGb`<br>
    **説明**: ワークスペースの 1 日あたりの取り込み量。<br>
   - `data_ingestion_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `dataIngestionStatus`<br>
    **説明**: このワークスペースのデータ取り込みのステータス。<br>
   - `quota_next_reset_time`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `quotaNextResetTime`<br>
    **説明**: クォータがレストになる時間。<br>