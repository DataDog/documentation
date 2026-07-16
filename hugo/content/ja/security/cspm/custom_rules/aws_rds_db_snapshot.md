---
dependencies: []
disable_edit: true
---
# aws_rds_db_snapshot

## `account_id`
**タイプ**: `STRING`<br>
## `allocated_storage`
**タイプ**: `INT32`<br>
**プロバイダー名**: `AllocatedStorage`<br>
**説明**: ジビバイト (GiB) 単位でストレージの割り当てサイズを指定します。<br>
## `availability_zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `AvailabilityZone`<br>
**説明**: DB インスタンスが DB スナップショット時に位置していたアベイラビリティゾーンの名前を指定します。<br>
## `db_instance_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBInstanceIdentifier`<br>
**説明**: この DB スナップショットの作成元となった DB インスタンスの識別子を指定します。<br>
## `db_snapshot_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBSnapshotArn`<br>
**説明**: DB スナップショットの Amazon Resource Name (ARN)。<br>
## `db_snapshot_attributes`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DBSnapshotAttributes`<br>
**説明**: 手動 DB スナップショットの属性と値のリスト。<br>
   - `attribute_name`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `AttributeName`<br>
    **説明**: 手動 DB スナップショット属性の名前。<code>restore</code> という属性は、手動 DB クラスタースナップショットをコピーまたはリストアする権限を持っている Amazon Web Services アカウントのリストを参照します。詳細については、<code>ModifyDBSnapshotAttribute</code> API アクションを参照してください。<br>
   - `attribute_values`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `AttributeValues`<br>
    **説明**: 手動 DB スナップショット属性の値または値。<code>AttributeName</code> フィールドが <code>restore</code> に設定されている場合、この要素は、手動 DB スナップショットをコピーまたはリストアするために認可されている Amazon Web Services アカウントの ID のリストを返します。<code>all</code> の値がリストにある場合、手動 DB スナップショットは公開され、任意の Amazon Web Services アカウントがコピーまたはリストアするために利用可能です。<br>
## `db_snapshot_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBSnapshotIdentifier`<br>
**説明**: 属性が適用される手動 DB スナップショットの識別子。<br>
## `dbi_resource_id`
**タイプ**: `STRING`<br>
**Provider name**: `DbiResourceId`<br>
**説明**: ソース DB インスタンスの識別子で、変更不可、かつ Amazon Web Services リージョンに固有のもの。<br>
## `encrypted`
**タイプ**: `BOOLEAN`<br>
**Provider name**: `Encrypted`<br>
**説明**: DB スナップショットが暗号化されているかどうかを指定します。<br>
## `engine`
**タイプ**: `STRING`<br>
**Provider name**: `Engine`<br>
**説明**: データベースエンジンの名前を指定します。<br>
## `engine_version`
**タイプ**: `STRING`<br>
**Provider name**: `EngineVersion`<br>
**説明**: データベースエンジンのバージョンを指定します。<br>
## `iam_database_authentication_enabled`
**タイプ**: `BOOLEAN`<br>
**Provider name**: `IAMDatabaseAuthenticationEnabled`<br>
**説明**: Amazon Web Services Identity and Access Management (IAM) アカウントのデータベースアカウントへのマッピングが有効な場合は true、そうでない場合は false です。<br>
## `instance_create_time`
**タイプ**: `TIMESTAMP`<br>
**Provider name**: `InstanceCreateTime`<br>
**説明**: スナップショットの元となる DB インスタンスが作成された時刻を協定世界時 (UTC) で指定します。<br>
## `iops`
**タイプ**: `INT32`<br>
**Provider name**: `Iops`<br>
**説明**: スナップショット時の DB インスタンスの Provisioned IOPS (I/O オペレーション/秒) の値を指定します。<br>
## `kms_key_id`
**タイプ**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**説明**: <code>Encrypted</code> が true の場合、暗号化された DB スナップショットの Amazon Web Services KMS キー識別子。Amazon Web Services KMS キー識別子は、KMS キーのキー ARN、キー ID、エイリアス ARN、またはエイリアス名です。<br>
## `license_model`
**タイプ**: `STRING`<br>
**Provider name**: `LicenseModel`<br>
**説明**: リストアした DB インスタンスのライセンスモデル情報。<br>
## `master_username`
**タイプ**: `STRING`<br>
**Provider name**: `MasterUsername`<br>
**説明**: DB スナップショットのマスターユーザー名を提供します。<br>
## `option_group_name`
**タイプ**: `STRING`<br>
**Provider name**: `OptionGroupName`<br>
**説明**: DB スナップショットのオプショングループ名を提供します。<br>
## `original_snapshot_create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `OriginalSnapshotCreateTime`<br>
**説明**: CreateDBSnapshot 操作の時刻を協定世界時 (UTC) で指定します。スナップショットがコピーされても変更されません。<br>
## `percent_progress`
**タイプ**: `INT32`<br>
**プロバイダー名**: `PercentProgress`<br>
**説明**: 推定されたデータのうち、転送が完了した割合。<br>
## `port`
**タイプ**: `INT32`<br>
**Provider name**: `Port`<br>
**説明**: スナップショット時にデータベースエンジンがリッスンしていたポートを指定します。<br>
## `processor_features`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ProcessorFeatures`<br>
**説明**: DB スナップショット作成時の DB インスタンスの DB インスタンスクラスの CPU コア数およびコアあたりのスレッド数。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Name`<br>
    **Description**: The name of the processor feature. Valid names are <code>coreCount</code> and <code>threadsPerCore</code>.<br>
   - `value`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Value`<br>
    **Description**: The value of a processor feature name.<br>
## `snapshot_create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `SnapshotCreateTime`<br>
**説明**: スナップショットの取得時刻を協定世界時 (UTC) で指定します。スナップショットのコピー時に変更します。<br>
## `snapshot_database_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `SnapshotDatabaseTime`<br>
**説明**: バックアップしているデータベースに適用された直近のトランザクションのタイムスタンプ。したがって、スナップショットをリストアする場合、SnapshotDatabaseTime はリストアされた DB インスタンスの直近のトランザクションとなります。一方、originalSnapshotCreateTime は、スナップショットが完了したシステム時刻を指定します。リードレプリカをバックアップする場合、SnapshotDatabaseTime と originalSnapshotCreateTime を比較することで、レプリカの遅延を判断することができます。たとえば、originalSnapshotCreateTime が SnapshotDatabaseTime より 2 時間遅い場合、レプリカの遅延は 2 時間です。<br>
## `snapshot_target`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnapshotTarget`<br>
**説明**: 手動スナップショットの保存先を指定します。Amazon Web Services Outposts または Amazon Web Services Region です。<br>
## `snapshot_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnapshotType`<br>
**説明**: DB スナップショットの種類を提供します。<br>
## `source_db_snapshot_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SourceDBSnapshotIdentifier`<br>
**説明**: DB スナップショットのコピー元の Amazon Resource Name (ARN)。クロスアカウントまたはクロスリージョンコピーの場合のみ値を持ちます。<br>
## `source_region`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SourceRegion`<br>
**説明**: DB スナップショットが作成された、またはコピーされた Amazon Web Services のリージョン。<br>
## `status`
**タイプ**: `STRING`<br>
**Provider name**: `Status`<br>
**説明**: この DB スナップショットのステータスを指定します。<br>
## `storage_throughput`
**タイプ**: `INT32`<br>
**Provider name**: `StorageThroughput`<br>
**説明**: DB スナップショットのストレージスループットを指定します。<br>
## `storage_type`
**タイプ**: `STRING`<br>
**Provider name**: `StorageType`<br>
**説明**: DB スナップショットに関連するストレージの種類を指定します。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `tde_credential_arn`
**タイプ**: `STRING`<br>
**Provider name**: `TdeCredentialArn`<br>
**説明**: TDE 暗号化のためにインスタンスと関連付けるキーストアからの ARN。<br>
## `timezone`
**タイプ**: `STRING`<br>
**Provider name**: `Timezone`<br>
**説明**: DB スナップショットのタイムゾーン。ほとんどの場合、<code>Timezone</code> 要素は空です。<code>Timezone</code> コンテンツは、タイムゾーンを指定して作成された Microsoft SQL Server DB インスタンスから取得されたスナップショットに対してのみ表示されます。<br>
## `vpc_id`
**タイプ**: `STRING`<br>
**Provider name**: `VpcId`<br>
**説明**: DB スナップショットに関連する VPC ID を提供します。<br>