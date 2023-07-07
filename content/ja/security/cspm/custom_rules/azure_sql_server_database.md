---
dependencies: []
disable_edit: true
---
# azure_sql_server_database

## `auto_pause_delay`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.autoPauseDelay`<br>
**説明**: データベースが自動的に一時停止するまでの時間 (分単位)。値が -1 の場合は、自動停止が無効であることを意味します<br>
## `catalog_collation`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.catalogCollation`<br>
**説明**: メタデータカタログの照合。<br>
## `collation`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.collation`<br>
**説明**: データベースの照合。<br>
## `create_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.createMode`<br>
**説明**: データベースの作成モードを指定します。デフォルト: 通常のデータベース作成。Copy: 既存のデータベースのコピーとしてデータベースを作成します。sourceDatabaseId は、ソースデータベースのリソース ID として指定する必要があります。secondary: 既存のデータベースのセカンダリレプリカとしてデータベースを作成します。sourceDatabaseId には、既存のプライマリデータベースのリソース ID を指定する必要があります。PointInTimeRestore: 既存データベースのポイントインタイムバックアップを復元してデータベースを作成します。sourceDatabaseId を既存データベースのリソース ID として指定し、restorePointInTime を指定する必要があります。Recovery: 地理的に複製されたバックアップを復元してデータベースを作成します。sourceDatabaseId は復元する回復可能なデータベースリソース ID として指定する必要があります。Restore: 削除されたデータベースのバックアップを復元してデータベースを作成します。sourceDatabaseId を指定する必要があります。sourceDatabaseId がデータベースの元のリソース ID の場合、sourceDatabaseDeletionDate を指定する必要があります。それ以外の場合、sourceDatabaseId は復元可能な削除されたデータベースのリソース ID でなければならず、sourceDatabaseDeletionDate は無視されます。 restorePointInTime は、以前の時点から復元するためにも指定することができます。RestoreLongTermRetentionBackup: 長期保持  vault から復元してデータベースを作成します。recoveryServicesRecoveryPointResourceId は回復ポイントリソース ID として指定する必要があります。DataWarehouse エディションでは、Copy、Secondary、RestoreLongTermRetentionBackup はサポートされていません。<br>
## `creation_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.creationDate`<br>
**説明**: データベースの作成日 (ISO8601 形式)。<br>
## `current_service_objective_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.currentServiceObjectiveName`<br>
**説明**: データベースの現在のサービスレベル目標名。<br>
## `current_sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.currentSku`<br>
**説明**: SKU の名前とティア。<br>
   - `capacity`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `capacity`<br>
    **説明**: 特定の SKU の容量。<br>
   - `family`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `family`<br>
    **説明**: 同じ SKU でもハードウェアの世代が異なるサービスであれば、それをここでキャプチャすることができます。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: SKU の名前、通常はアルファベット + 数字コード、例: P3<br>
   - `size`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `size`<br>
    **説明**: 特定の SKU のサイズ<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tier`<br>
    **説明**: 特定の SKU のティアまたはエディション (例: Basic、Premium)。<br>
## `database_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.databaseId`<br>
**説明**: データベースの ID。<br>
## `default_secondary_location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.defaultSecondaryLocation`<br>
**説明**: このデータベースのデフォルトのセカンダリリージョン。<br>
## `earliest_restore_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.earliestRestoreDate`<br>
**説明**: このデータベースでリストアが可能な最も早い開始日時を記録します (ISO8601 形式)。<br>
## `elastic_pool_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.elasticPoolId`<br>
**説明**: このデータベースを含むエラスティックプールのリソース識別子。<br>
## `failover_group_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.failoverGroupId`<br>
**説明**: このデータベースが所属するフェイルオーバーグループのリソース識別子。<br>
## `high_availability_replica_count`
**タイプ**: `INT32`<br>
**プロバイダー名**: `properties.highAvailabilityReplicaCount`<br>
**説明**: 高可用性を提供するために使用される、データベースに関連付けられたセカンダリレプリカの数。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソース ID。<br>
## `kind`
**タイプ**: `STRING`<br>
**プロバイダー名**: `kind`<br>
**説明**: データベースの種類。Azure ポータルのエクスペリエンスに使用されるメタデータです。<br>
## `license_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.licenseType`<br>
**説明**: このデータベースに適用するライセンスタイプ。ライセンスが必要な場合は `LicenseIncluded`、ライセンスを持っていて Azure Hybrid Benefit の対象である場合は `BasePrice` となります。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースロケーション。<br>
## `long_term_retention_backup_resource_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.longTermRetentionBackupResourceId`<br>
**説明**: このデータベースの作成操作に関連付けられた長期保持のバックアップのリソース識別子。<br>
## `maintenance_configuration_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.maintenanceConfigurationId`<br>
**説明**: データベースに割り当てられたメンテナンス構成 ID。この構成は、メンテナンス更新が行われる期間を定義します。<br>
## `managed_by`
**タイプ**: `STRING`<br>
**プロバイダー名**: `managedBy`<br>
**説明**: データベースを管理するリソース。<br>
## `max_log_size_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.maxLogSizeBytes`<br>
**説明**: このデータベースの最大ログサイズ。<br>
## `max_size_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.maxSizeBytes`<br>
**説明**: データベースの最大サイズ (バイト単位)。<br>
## `min_capacity`
**タイプ**: `DOUBLE`<br>
**プロバイダー名**: `properties.minCapacity`<br>
**説明**: 一時停止していない場合、データベースが常に割り当てられる最小限の容量。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソース名。<br>
## `paused_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.pausedDate`<br>
**説明**: ユーザーの構成やアクションによってデータベースが一時停止された日付 (ISO8601 形式)。データベースが準備できている場合は NULL。<br>
## `read_scale`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.readScale`<br>
**説明**: 読み取り専用ルーティングの状態。有効な場合、接続文字列でアプリケーションインテントを読み取り専用に設定した接続は、同じリージョン内の読み取り専用のセカンダリレプリカにルーティングされる場合があります。<br>
## `recoverable_database_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.recoverableDatabaseId`<br>
**説明**: このデータベースの作成操作に関連付けられた回復可能なデータベースのリソース識別子。<br>
## `recovery_services_recovery_point_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.recoveryServicesRecoveryPointId`<br>
**説明**: このデータベースの作成操作に関連付けられた回復ポイントのリソース識別子。<br>
## `requested_service_objective_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.requestedServiceObjectiveName`<br>
**説明**: データベースのリクエストされたサービスレベル目標名。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `restorable_dropped_database_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.restorableDroppedDatabaseId`<br>
**説明**: このデータベースの作成操作に関連付けられた復元可能なドロップされたデータベースのリソース識別子。<br>
## `restore_point_in_time`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.restorePointInTime`<br>
**説明**: 新しいデータベースを作成するために復元されるソースデータベースの時点 (ISO8601 形式) を指定します。<br>
## `resumed_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.resumedDate`<br>
**説明**: ユーザーアクションまたはデータベースログインによってデータベースが再開された日付 (ISO8601 形式)。データベースが一時停止している場合は NULL。<br>
## `sample_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.sampleName`<br>
**説明**: このデータベースを作成する際に適用するサンプルスキーマの名前。<br>
## `secondary_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.secondaryType`<br>
**説明**: データベースがセカンダリの場合、そのセカンダリタイプ。 有効な値は Geo と Named です。<br>
## `sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `sku`<br>
**説明**: データベースの SKU。SKU のリストは、リージョンとサポートオファーによって異なる場合があります。Azure リージョンで、サブスクリプションで利用できる SKU (SKU 名、ティア/エディション、ファミリー、容量を含む) を確認するには、`Capabilities_ListByLocation` REST API または次のコマンドのいずれかを使用します:```azurecliaz sql db list-editions -l <location> -o table```````powershellGet-AzSqlServerServiceObjective -Location <location>````<br>
   - `capacity`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `capacity`<br>
    **説明**: 特定の SKU の容量。<br>
   - `family`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `family`<br>
    **説明**: 同じ SKU でもハードウェアの世代が異なるサービスであれば、それをここでキャプチャすることができます。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: SKU の名前、通常はアルファベット + 数字コード、例: P3<br>
   - `size`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `size`<br>
    **説明**: 特定の SKU のサイズ<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tier`<br>
    **説明**: 特定の SKU のティアまたはエディション (例: Basic、Premium)。<br>
## `source_database_deletion_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.sourceDatabaseDeletionDate`<br>
**説明**: データベースが削除された時刻を指定します。<br>
## `source_database_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.sourceDatabaseId`<br>
**説明**: このデータベースの作成操作に関連付けられたソースデータベースのリソース識別子。<br>
## `status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.status`<br>
**説明**: データベースのステータス。<br>
## `storage_account_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.storageAccountType`<br>
**説明**: このデータベースのバックアップを保存するために使用されるストレージアカウントのタイプ。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `transparent_data_encryption`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `LogicalDatabaseTransparentDataEncryption`<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.state`<br>
    **説明**: 透過的データ暗号化の状態を指定します。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースタイプ。<br>
## `zone_redundant`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.zoneRedundant`<br>
**説明**: このデータベースがゾーン冗長であるかどうか、つまりこのデータベースのレプリカが複数のアベイラビリティゾーンに分散していることを意味します。<br>