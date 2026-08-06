---
dependencies: []
disable_edit: true
---
# azure_key_vault

## `create_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.createMode`<br>
**説明**: Vault の作成モード。Vault を復元する必要があるかどうかを示します。<br>
## `diagnostic_settings`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DiagnosticSettingsResource`<br>
   - `event_hub_authorization_rule_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.eventHubAuthorizationRuleId`<br>
    **説明**: イベントハブ認可ルールのリソース ID。<br>
   - `event_hub_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.eventHubName`<br>
    **説明**: イベントハブの名前。指定しない場合は、デフォルトのイベントハブが選択されます。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: Azure リソース ID<br>
   - `log_analytics_destination_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.logAnalyticsDestinationType`<br>
    **説明**: Log Analytics へのエクスポートで、デフォルトの宛先タイプ (AzureDiagnostics など) を使用するか、次のように構築された宛先タイプを使用するかを示す文字列: <normalized service identity>_<normalized category name>可能な値は Dedicated および null (デフォルトは null) です。<br>
   - `logs`<br>
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
   - `metrics`<br>
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
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: Azure リソース名<br>
   - `service_bus_rule_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.serviceBusRuleId`<br>
    **説明**: 診断設定のサービスバスルール ID。これは後方互換性を維持するために存在します。<br>
   - `storage_account_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.storageAccountId`<br>
    **説明**: 診断ログの送信先となるストレージアカウントのリソース ID。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: Azure リソースタイプ<br>
   - `workspace_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.workspaceId`<br>
    **説明**: 診断ログを送信する Log Analytics ワークスペースの完全な ARM リソース ID。例: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2<br>
## `enable_purge_protection`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enablePurgeProtection`<br>
**説明**: この Vault に対して、完全削除に対する保護が有効であるかどうかを指定するプロパティ。このプロパティを true に設定すると、この Vault とそのコンテンツの完全削除に対する保護が有効になり、Key Vault サービスだけが、回復不能なハード削除を開始することができます。この設定は、ソフト削除も有効になっている場合にのみ有効です。この関数を有効にすると、元に戻すことはできません。つまり、このプロパティは値として false を受け入れません。<br>
## `enable_rbac_authorization`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enableRbacAuthorization`<br>
**説明**: データアクションの認可方法を制御するプロパティ。true の場合、 Key Vault はデータアクションの認可にロールベースアクセス制御 (RBAC) を使用し、Vault のプロパ ティで指定されたアクセスポリシーは無視されます。false の場合、Key ｖ は、Vault のプロパティで指定されたアクセスポリシーを使用し、Azure Resource Manager に保存されたポリシーは無視されます。null または指定しない場合、Vault はデフォルト値である false で作成されます。管理アクションは常に RBAC で認可されることに注意してください。<br>
## `enable_soft_delete`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enableSoftDelete`<br>
**説明**: この Key Vault に対して 'soft delete' 機能を有効にするかどうかを指定するプロパティ。Key Vault の新規作成時に、このプロパティに値 (true または false) が設定されていない場合、デフォルトで true に設定されます。一旦 true に設定されると、false に戻すことはできません。<br>
## `enabled_for_deployment`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enabledForDeployment`<br>
**説明**: Azure Virtual Machine が Key Vault からシークレットとして保存された証明書を取得することを許可されるかどうかを指定するプロパティ。<br>
## `enabled_for_disk_encryption`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enabledForDiskEncryption`<br>
**説明**: Azure Disk Encryption が、Vault からシークレットを取得し、キーをアンラップすることを許可されているかどうかを指定するプロパティ。<br>
## `enabled_for_template_deployment`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enabledForTemplateDeployment`<br>
**説明**: Azure Resource Manager が Key Vault からシークレットを取得することを許可されるかどうかを指定するプロパティ。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: key vault リソースの完全修飾識別子。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: key vault リソースの Azure の場所。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: key vault リソースの名前。<br>
## `provisioning_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.provisioningState`<br>
**説明**: Vault のプロビジョニング状態。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.sku`<br>
**説明**: SKU の詳細<br>
   - `family`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `family`<br>
    **説明**: SKU ファミリー名<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: Key Vault がスタンダード Vault かプレミアム Vault かを指定するための SKU 名。<br>
## `soft_delete_retention_in_days`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.softDeleteRetentionInDays`<br>
**説明**: softDelete のデータ保持日数。7 以上、90 未満を受け付けます。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `tenant_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.tenantId`<br>
**説明**: Key Vault へのリクエストの認証に使用される Azure Active Directory テナント ID。<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: key vault リソースのリソースタイプ。<br>
## `vault_uri`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.vaultUri`<br>
**説明**: キーとシークレットに対する操作を実行するための Vault の URI。このプロパティは読み取り専用です。<br>