---
dependencies: []
disable_edit: true
---
# azure_diagnostic_setting

## `event_hub_authorization_rule_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.eventHubAuthorizationRuleId`<br>
**説明**: イベントハブ認可ルールのリソース ID。<br>
## `event_hub_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.eventHubName`<br>
**説明**: イベントハブの名前。指定しない場合は、デフォルトのイベントハブが選択されます。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: Azure リソース ID<br>
## `log_analytics_destination_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.logAnalyticsDestinationType`<br>
**説明**: Log Analytics へのエクスポートで、デフォルトの宛先タイプ (AzureDiagnostics など) を使用するか、次のように構築された宛先タイプを使用するかを示す文字列: <normalized service identity>_<normalized category name>可能な値は Dedicated および null (デフォルトは null) です。<br>
## `logs`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.logs`<br>
**説明**: ログ設定のリスト。<br>
   - `category`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `category`<br>
    **説明**: この設定が適用されるリソースタイプの診断ログカテゴリーの名前。リソースの診断ログカテゴリーのリストを取得するには、まず GET 診断設定オペレーションを実行します。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enabled`<br>
    **説明**: このログが有効であるかどうかを示す値。<br>
   - `retention_policy`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `retentionPolicy`<br>
    **説明**: このログの保存ポリシー。<br>
       - `days`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `days`<br>
        **説明**: 保持する日数。0 を指定すると、イベントは無期限に保持されます。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: 保持ポリシーが有効であるかどうかを示す値。<br>
## `metrics`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.metrics`<br>
**説明**: メトリクス設定のリスト。<br>
   - `category`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `category`<br>
    **説明**: この設定が適用されるリソースタイプの診断メトリクスカテゴリーの名前。リソースの診断メトリクスカテゴリーのリストを取得するには、まず GET 診断設定オペレーションを実行します。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enabled`<br>
    **説明**: このカテゴリーが有効であるかどうかを示す値。<br>
   - `retention_policy`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `retentionPolicy`<br>
    **説明**: このカテゴリーの保存ポリシー。<br>
       - `days`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `days`<br>
        **説明**: 保持する日数。0 を指定すると、イベントは無期限に保持されます。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: 保持ポリシーが有効であるかどうかを示す値。<br>
   - `time_grain`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `timeGrain`<br>
    **説明**: ISO8601 形式のメトリクスのタイムグレーン。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: Azure リソース名<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `service_bus_rule_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.serviceBusRuleId`<br>
**説明**: 診断設定のサービスバスルール ID。これは後方互換性を維持するために存在します。<br>
## `storage_account_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.storageAccountId`<br>
**説明**: 診断ログの送信先となるストレージアカウントのリソース ID。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: Azure リソースタイプ<br>
## `workspace_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.workspaceId`<br>
**説明**: 診断ログを送信する Log Analytics ワークスペースの完全な ARM リソース ID。例: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2<br>