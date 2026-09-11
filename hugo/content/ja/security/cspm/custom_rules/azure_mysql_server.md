---
dependencies: []
disable_edit: true
---
# azure_mysql_server

## `administrator_login`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.administratorLogin`<br>
**説明**: サーバーの管理者ログイン名。サーバーの作成時にのみ指定可能です (作成時には必須)。<br>
## `byok_enforcement`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.byokEnforcement`<br>
**説明**: 顧客管理キーによるサーバーのデータ暗号化が有効かどうかを示すステータス。<br>
## `earliest_restore_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.earliestRestoreDate`<br>
**説明**: 最も古い復元ポイントの作成時刻 (ISO8601 形式)<br>
## `fully_qualified_domain_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.fullyQualifiedDomainName`<br>
**説明**: サーバーの完全修飾ドメイン名。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
**説明**: サーバーの Azure Active Directory の ID。<br>
   - `principal_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalId`<br>
    **説明**: Azure Active Directory のプリンシパル ID。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: Azure Active Directory のテナント ID。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: ID のタイプ。リソースに対して Azure Active Directory のプリンシパルを自動的に作成し、割り当てるには、これを 'SystemAssigned' に設定します。<br>
## `infrastructure_encryption`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.infrastructureEncryption`<br>
**説明**: サーバーがインフラストラクチャーの暗号化を有効にしたかどうかを示すステータス。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースが存在するジオロケーション<br>
## `master_server_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.masterServerId`<br>
**説明**: レプリカサーバーのマスターサーバー ID。<br>
## `minimal_tls_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.minimalTlsVersion`<br>
**説明**: サーバーに最小限の Tls バージョンを強制的に適用します。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソースの名前<br>
## `private_endpoint_connections`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.privateEndpointConnections`<br>
**説明**: サーバー上のプライベートエンドポイント接続のリスト<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: プライベートエンドポイント接続のリソース ID。<br>
   - `private_endpoint`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.privateEndpoint`<br>
    **説明**: 接続先が属するプライベートエンドポイント。<br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `id`<br>
        **説明**: プライベートエンドポイントのリソース ID。<br>
   - `private_link_service_connection_state`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `properties.privateLinkServiceConnectionState`<br>
    **説明**: プライベートエンドポイント接続の接続状態。<br>
       - `actions_required`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `actionsRequired`<br>
        **説明**: プライベートリンクサービス接続に必要なアクション。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `description`<br>
        **説明**: プライベートリンクサービス接続の説明。<br>
       - `status`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `status`<br>
        **説明**: プライベートリンクサービスの接続ステータス。<br>
   - `provisioning_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.provisioningState`<br>
    **説明**: プライベートエンドポイント接続の状態。<br>
## `public_network_access`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.publicNetworkAccess`<br>
**説明**: このサーバーでパブリックネットワークアクセスを許可するかどうか。値は任意ですが、渡された場合は 'Enabled' または 'Disabled' でなければなりません。<br>
## `replica_capacity`
**タイプ**: `INT32`<br>
**プロバイダー名**: `properties.replicaCapacity`<br>
**説明**: マスターサーバーが持つことができるレプリカの最大数。<br>
## `replication_role`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.replicationRole`<br>
**説明**: サーバーのレプリケーションのロール。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `sku`
**タイプ**: `STRUCT`<br>
**Provider name**: `sku`<br>
**説明**: サーバーの SKU (価格帯)。<br>
   - `capacity`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `capacity`<br>
    **説明**: サーバーのコンピュートユニットを表すスケールアップ/アウトの容量。<br>
   - `family`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `family`<br>
    **説明**: ハードウェアのファミリー。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: SKU の名前。通常、階層＋ファミリー＋コア、例: B_Gen4_1、GP_Gen5_8<br>
   - `size`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `size`<br>
    **説明**: リソースが適切に解釈するためのサイズコード。<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `tier`<br>
    **説明**: 特定の SKU の階層 (例: Basic)。<br>
## `ssl_enforcement`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.sslEnforcement`<br>
**説明**: サーバーへの接続時に SSL の強制を行うかどうか。<br>
## `storage_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.storageProfile`<br>
**説明**: サーバーのストレージプロファイル。<br>
   - `backup_retention_days`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `backupRetentionDays`<br>
    **説明**: サーバーのバックアップ保持日数。<br>
   - `geo_redundant_backup`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `geoRedundantBackup`<br>
    **説明**: サーバーバックアップのための Geo-redundant を有効にするかどうか。<br>
   - `storage_autogrow`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `storageAutogrow`<br>
    **説明**: ストレージの自動増加を有効にします。<br>
   - `storage_mb`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `storageMB`<br>
    **説明**: サーバーに許容される最大ストレージ容量。<br>
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
## `user_visible_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.userVisibleState`<br>
**説明**: ユーザーから見えるサーバーの状態。<br>
## `version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.version`<br>
**説明**: サーバーのバージョン。<br>