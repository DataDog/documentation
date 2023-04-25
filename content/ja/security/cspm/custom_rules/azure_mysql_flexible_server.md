---
dependencies: []
disable_edit: true
---
# azure_mysql_flexible_server

## `administrator_login`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.administratorLogin`<br>
**説明**: サーバーの管理者ログイン名。サーバーの作成時にのみ指定可能です (作成時には必須)。<br>
## `administrator_login_password`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.administratorLoginPassword`<br>
**説明**: 管理者ログインのパスワード (サーバー作成時に必要)。<br>
## `availability_zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.availabilityZone`<br>
**説明**: サーバーのアベイラビリティゾーン情報。<br>
## `backup`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.backup`<br>
**説明**: サーバーのバックアップ関連プロパティ。<br>
   - `backup_retention_days`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `backupRetentionDays`<br>
    **説明**: サーバーのバックアップ保持日数。<br>
   - `earliest_restore_date`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `earliestRestoreDate`<br>
    **説明**: 最も古い復元ポイントの作成時刻 (ISO8601 形式)<br>
   - `geo_redundant_backup`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `geoRedundantBackup`<br>
    **説明**: geo 冗長バックアップが有効かどうか。<br>
## `create_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.createMode`<br>
**説明**: 新しい MySQL サーバーを作成するモード。<br>
## `data_encryption`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.dataEncryption`<br>
**説明**: CMK のデータ暗号化。<br>
   - `geo_backup_key_uri`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `geoBackupKeyURI`<br>
    **説明**: Geo バックアップキー URI は、Key vault がリージョンをまたぐことができないため、Geo バックアップと同じリージョンに cmk が必要です<br>
   - `geo_backup_user_assigned_identity_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `geoBackupUserAssignedIdentityId`<br>
    **説明**: Geo バックアップのユーザー ID リソース ID はリージョンをまたぐことができないため、Geo バックアップと同じリージョンに ID が必要です。<br>
   - `primary_key_uri`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `primaryKeyURI`<br>
    **説明**: プライマリキー URI<br>
   - `primary_user_assigned_identity_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `primaryUserAssignedIdentityId`<br>
    **説明**: プライマリユーザーアイデンティティリソース ID<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: キーの種類で、enable cmk の場合は AzureKeyVault、disable cmk の場合は SystemManaged となります。<br>
## `fully_qualified_domain_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.fullyQualifiedDomainName`<br>
**説明**: サーバーの完全修飾ドメイン名。<br>
## `high_availability`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.highAvailability`<br>
**説明**: サーバーの高可用性関連のプロパティ。<br>
   - `mode`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `mode`<br>
    **説明**: サーバーの高可用性モード。<br>
   - `standby_availability_zone`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `standbyAvailabilityZone`<br>
    **説明**: スタンバイサーバーのアベイラビリティゾーン。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `state`<br>
    **説明**: サーバーの高可用性の状態。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソースの完全修飾型リソース ID。例 - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
**説明**: サーバーの cmk アイデンティティ。<br>
   - `principal_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalId`<br>
    **説明**: KeyVault からの ObjectId<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: KeyVault からの TenantId<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: マネージドサービスアイデンティティの種類。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースが存在するジオロケーション<br>
## `maintenance_window`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.maintenanceWindow`<br>
**説明**: サーバーのメンテナンスウィンドウ。<br>
   - `custom_window`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `customWindow`<br>
    **説明**: カスタムウィンドウが有効か無効かを示します。<br>
   - `day_of_week`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `dayOfWeek`<br>
    **説明**: メンテナンスウィンドウの曜日<br>
   - `start_hour`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `startHour`<br>
    **説明**: メンテナンスウィンドウの開始時間<br>
   - `start_minute`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `startMinute`<br>
    **説明**: メンテナンスウィンドウの開始分<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソースの名前<br>
## `network`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.network`<br>
**説明**: サーバーのネットワーク関連プロパティ。<br>
   - `delegated_subnet_resource_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `delegatedSubnetResourceId`<br>
    **説明**: サーバーの Vnet を設定するために使用される委任されたサブネットリソース ID。<br>
   - `private_dns_zone_resource_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `privateDnsZoneResourceId`<br>
    **説明**: プライベート DNS ゾーンのリソース ID。<br>
   - `public_network_access`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `publicNetworkAccess`<br>
    **説明**: このサーバーでパブリックネットワークアクセスを許可するかどうか。VNet インテグレーションを使用している場合、値は 'Disabled' です。<br>
## `replica_capacity`
**タイプ**: `INT32`<br>
**プロバイダー名**: `properties.replicaCapacity`<br>
**説明**: プライマリサーバーが持つことができるレプリカの最大数。<br>
## `replication_role`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.replicationRole`<br>
**説明**: レプリケーションのロール。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `restore_point_in_time`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.restorePointInTime`<br>
**説明**: リストアポイント作成時刻 (ISO8601 形式)、リストア元となる時刻を指定します。<br>
## `sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `sku`<br>
**説明**: サーバーの SKU (価格帯)。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: SKU の名前 (例: Standard_D32s_v3)。<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tier`<br>
    **説明**: 特定の SKU の階層 (例: GeneralPurpose)。<br>
## `source_server_resource_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.sourceServerResourceId`<br>
**説明**: 送信元の MySQL サーバー ID。<br>
## `state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.state`<br>
**説明**: サーバーの状態。<br>
## `storage`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.storage`<br>
**説明**: サーバーのストレージ関連プロパティ。<br>
   - `auto_grow`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `autoGrow`<br>
    **説明**: ストレージの自動増加を有効にするかどうか。<br>
   - `iops`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `iops`<br>
    **説明**: サーバーのストレージ IOPS。<br>
   - `storage_size_gb`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `storageSizeGB`<br>
    **説明**: サーバーに許容される最大ストレージサイズ。<br>
   - `storage_sku`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `storageSku`<br>
    **説明**: サーバーストレージの SKU 名。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `system_data`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `systemData`<br>
**説明**: このリソースに関連するシステムメタデータ。<br>
   - `created_at`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `createdAt`<br>
    **説明**: リソース作成時のタイムスタンプ (UTC)。<br>
   - `created_by`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `createdBy`<br>
    **説明**: リソースを作成した ID。<br>
   - `created_by_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `createdByType`<br>
    **説明**: リソースを作成した ID の種類。<br>
   - `last_modified_at`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `lastModifiedAt`<br>
    **説明**: リソースの最終更新時刻 (UTC)<br>
   - `last_modified_by`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `lastModifiedBy`<br>
    **説明**: リソースを最後に変更したアイデンティティ。<br>
   - `last_modified_by_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `lastModifiedByType`<br>
    **説明**: リソースを最後に変更したアイデンティティの種類。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースの種類。例: "Microsoft.Compute/virtualMachines" または "Microsoft.Storage/storageAccounts"<br>
## `version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.version`<br>
**説明**: サーバーのバージョン。<br>