---
dependencies: []
disable_edit: true
---
# gcp_sql_database_instance

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `available_maintenance_versions`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `availableMaintenanceVersions`<br>
**説明**: 出力のみ。インスタンスに適用されるすべてのメンテナンスバージョンをリストアップします<br>
## `backend_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `backendType`<br>
**説明**: バックエンドのタイプ。`SECOND_GEN`: クラウド SQL データベースのインスタンス。`EXTERNAL`: Google が管理していないデータベースサーバー。このプロパティは読み取り専用です。データベースの種類を決定するには、`settings` オブジェクトの `tier` プロパティを使用します。 <br>
**可能な値**:<br>
  - `SQL_BACKEND_TYPE_UNSPECIFIED` - これは、例えば不明なバックエンドの種類です。<br>
  - `FIRST_GEN` - V1 スペックルインスタンス。<br>
  - `SECOND_GEN` - V2 スペックルインスタンス。<br>
  - `EXTERNAL` - オンプレミスインスタンス。<br>
## `connection_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `connectionName`<br>
**説明**: 接続文字列で使用されるクラウド SQL インスタンスの接続名。<br>
## `create_time`
**タイプ**: `TIMESTAMP`<br>
**Provider name**: `createTime`<br>
**説明**: 出力のみ。インスタンスが作成された時刻。[RFC 3339](https://tools.ietf.org/html/rfc3339) 形式で、例えば `2012-11-15T16:19:00.094Z` のようになります。<br>
## `current_disk_size`
**タイプ**: `INT64`<br>
**プロバイダー名**: `currentDiskSize`<br>
**説明**: インスタンスの現在のディスク使用量 (バイト単位)。このプロパティは非推奨となりました。代わりに Cloud Monitoring API の "cloudsql.googleapis.com/database/disk/bytes_used" メトリクスを使用してください。詳しくは[この発表](https://groups.google.com/d/msg/google-cloud-sql-announce/I_7-F9EBhT0/BtvFtdFeAgAJ)をご覧ください。<br>
## `database_installed_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `databaseInstalledVersion`<br>
**説明**: 出力のみ。`MYSQL_8_0_18` のようなマイナーバージョンを含む、インスタンス上で動作している現在のデータベースバージョンを格納します。<br>
## `database_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `databaseVersion`<br>
**説明**: データベースエンジンの種類とバージョン。`databaseVersion` フィールドはインスタンス作成後に変更することはできません。 <br>
**可能な値**:<br>
  - `SQL_DATABASE_VERSION_UNSPECIFIED` - これは、不明なデータベースのバージョンです。<br>
  - `MYSQL_5_1` - データベースのバージョンは、MySQL 5.1 です。<br>
  - `MYSQL_5_5` - データベースのバージョンは、MySQL 5.5 です。<br>
  - `MYSQL_5_6` - データベースのバージョンは、MySQL 5.6 です。<br>
  - `MYSQL_5_7` - データベースのバージョンは、MySQL 5.7 です。<br>
  - `SQLSERVER_2017_STANDARD` - データベースのバージョンは、SQL Server 2017 Standard です。<br>
  - `SQLSERVER_2017_ENTERPRISE` - データベースのバージョンは、SQL Server 2017 Enterprise です。<br>
  - `SQLSERVER_2017_EXPRESS` - データベースのバージョンは、SQL Server 2017 Express です。<br>
  - `SQLSERVER_2017_WEB` - データベースのバージョンは、SQL Server 2017 Web です。<br>
  - `POSTGRES_9_6` - データベースのバージョンは、PostgreSQL 9.6 です。<br>
  - `POSTGRES_10` - データベースのバージョンは、PostgreSQL 10 です。<br>
  - `POSTGRES_11` - データベースのバージョンは、PostgreSQL 11 です。<br>
  - `POSTGRES_12` - データベースのバージョンは、PostgreSQL 12 です。<br>
  - `POSTGRES_13` - データベースのバージョンは、PostgreSQL 13 です。<br>
  - `POSTGRES_14` - データベースのバージョンは、PostgreSQL 14 です。<br>
  - `MYSQL_8_0` - データベースのバージョンは、MySQL 8 です。<br>
  - `MYSQL_8_0_18` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 18 です。<br>
  - `MYSQL_8_0_26` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 26 です。<br>
  - `MYSQL_8_0_27` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 27 です。<br>
  - `MYSQL_8_0_28` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 28 です。<br>
  - `MYSQL_8_0_29` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 29 です。<br>
  - `MYSQL_8_0_30` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 30 です。<br>
  - `MYSQL_8_0_31` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 31 です。<br>
  - `MYSQL_8_0_32` - データベースのメジャーバージョンは MySQL 8.0、マイナーバージョンは 32 です。<br>
  - `SQLSERVER_2019_STANDARD` - データベースのバージョンは、SQL Server 2019 Standard です。<br>
  - `SQLSERVER_2019_ENTERPRISE` - データベースのバージョンは、SQL Server 2019 Enterprise です。<br>
  - `SQLSERVER_2019_EXPRESS` - データベースのバージョンは、SQL Server 2019 Express です。<br>
  - `SQLSERVER_2019_WEB` - データベースのバージョンは、SQL Server 2019 Web です。<br>
## `disk_encryption_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `diskEncryptionConfiguration`<br>
**説明**: インスタンスに固有のディスク暗号化構成。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: これは常に `sql#diskEncryptionConfiguration` です。<br>
   - `kms_key_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kmsKeyName`<br>
    **説明**: ディスク暗号化用 KMS キーのリソース名<br>
## `disk_encryption_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `diskEncryptionStatus`<br>
**説明**: インスタンスに固有のディスク暗号化ステータス。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: これは常に `sql#diskEncryptionStatus` です。<br>
   - `kms_key_version_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kmsKeyVersionName`<br>
    **説明**: Cloud SQL インスタンスリソースの暗号化に使用した KMS キーのバージョン<br>
## `etag`
**タイプ**: `STRING`<br>
**プロバイダー名**: `etag`<br>
**説明**: このフィールドは非推奨で、API の将来のバージョンでは削除される予定です。代わりに `settings.settingsVersion` フィールドを使用してください。<br>
## `failover_replica`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `failoverReplica`<br>
**説明**: フェイルオーバーレプリカの名前とステータス。<br>
   - `available`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `available`<br>
    **説明**: フェイルオーバーレプリカの有効性ステータスです。false のステータスは、フェイルオーバーレプリカが同期していないことを示します。プライマリインスタンスは、このステータスが true のときのみフェイルオーバーレプリカにフェイルオーバーすることができます。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: フェイルオーバーレプリカの名前。インスタンス作成時に指定すると、そのインスタンスに対してフェイルオーバーレプリカが作成されます。この名前にはプロジェクト ID は含まれません。<br>
## `gce_zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `gceZone`<br>
**説明**: インスタンスが現在サービスを提供している Compute Engine のゾーン。この値は、インスタンスがセカンダリゾーンにフェイルオーバーした場合、インスタンスの作成時に指定されたゾーンと異なる可能性があります。警告: これを変更すると、インスタンスが再起動する場合があります。<br>
## `instance_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `instanceType`<br>
**説明**: インスタンスタイプ。<br>
**可能な値**:<br>
  - `SQL_INSTANCE_TYPE_UNSPECIFIED` - これは、不明な Cloud SQL インスタンスタイプです。<br>
  - `CLOUD_SQL_INSTANCE` - プライマリインスタンスからレプリケートされていない通常の Cloud SQL インスタンス。<br>
  - `ON_PREMISES_INSTANCE` - Cloud SQL で管理されていない、顧客構内で稼働しているインスタンス。<br>
  - `READ_REPLICA_INSTANCE` - リードレプリカとして動作する Cloud SQL インスタンス。<br>
## `ip_addresses`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ipAddresses`<br>
**説明**: インスタンスに割り当てられた IP アドレス。<br>
   - `ip_address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ipAddress`<br>
    **説明**: 割り当てられた IP アドレス。<br>
   - `time_to_retire`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `timeToRetire`<br>
    **説明**: この IP がリタイアする予定時刻を [RFC 3339](https://tools.ietf.org/html/rfc3339) 形式で、例えば `2012-11-15T16:19:00.094Z` のように指定します。このフィールドは、IP がリタイアする予定のときにのみ利用可能です。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: この IP アドレスのタイプ。`PRIMARY` アドレスはパブリックアドレスで、着信接続を受け入れることができます。`PRIVATE` アドレスは、着信接続を受け入れることができるプライベートなアドレスです。`OUTGOING` アドレスは、サポートされている場合、インスタンスから発信される接続の発信元アドレスです。<br>
    **可能な値**:<br>
      - `SQL_IP_ADDRESS_TYPE_UNSPECIFIED` - これは、不明な IP アドレスタイプです。<br>
      - `PRIMARY` - 顧客が接続することになっている IP アドレス。通常、これはロードバランサーの IP アドレスです。<br>
      - `OUTGOING` - リードレプリカがその外部プライマリインスタンスに確立する接続のソース IP アドレス。この IP アドレスは、構内のプライマリインスタンスへの着信接続をフィルターするファイアウォールがある場合、顧客が許可リストに入れることができます。<br>
      - `PRIVATE` - プライベート IP やネットワークピアリングを利用する際に使用するプライベート IP。<br>
      - `MIGRATED_1ST_GEN` - 移行したインスタンスの V1 IP。移行が完了したらすぐにこの IP を廃止してください。注: V1 IP アドレスを持つ V1 インスタンスは、PRIMARY としてカウントされます。<br>
## `ipv6_address`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ipv6Address`<br>
**説明**: インスタンスに割り当てられた IPv6 アドレス。(非推奨) このプロパティは、第一世代のインスタンスにのみ適用可能でした。<br>
## `kind`
**タイプ**: `STRING`<br>
**プロバイダー名**: `kind`<br>
**説明**: これは常に `sql#instance` です。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `maintenance_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `maintenanceVersion`<br>
**説明**: インスタンス上の現在のソフトウェアバージョン。<br>
## `master_instance_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `masterInstanceName`<br>
**説明**: レプリケーション設定においてプライマリとして動作するインスタンスの名前。<br>
## `max_disk_size`
**タイプ**: `INT64`<br>
**プロバイダー名**: `maxDiskSize`<br>
**説明**: インスタンスの最大ディスクサイズ (バイト単位)。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: Cloud SQL インスタンスの名前。プロジェクト ID は含まれません。<br>
## `on_premises_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `onPremisesConfiguration`<br>
**説明**: オンプレミスインスタンスに特化した構成。<br>
   - `ca_certificate`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `caCertificate`<br>
    **説明**: 信頼できる CA の x509 証明書の PEM 表現。<br>
   - `client_certificate`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `clientCertificate`<br>
    **説明**: レプリカの x509 証明書の PEM 表現。<br>
   - `client_key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `clientKey`<br>
    **説明**: レプリカの秘密鍵の PEM 表現。対応する公開キーは、クライアントの証明書にエンコードされています。<br>
   - `dump_file_path`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `dumpFilePath`<br>
    **説明**: Cloud SQL レプリカを作成するためのダンプファイル。<br>
   - `host_port`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `hostPort`<br>
    **説明**: オンプレミスインスタンスのホストとポート (host:port 形式)<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: これは常に `sql#onPremisesConfiguration` です。<br>
   - `password`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `password`<br>
    **説明**: オンプレミスインスタンスに接続するためのパスワード。<br>
   - `source_instance`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `sourceInstance`<br>
    **説明**: ソースが Cloud SQL の場合、Cloud SQL インスタンスへの参照。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `name`<br>
        **説明**: 参照する Cloud SQL インスタンスの名前。プロジェクト ID は含まれません。<br>
       - `project`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `project`<br>
        **説明**: 参照する Cloud SQL インスタンスのプロジェクト ID。デフォルトは、参照しているインスタンスと同じプロジェクト ID です。<br>
       - `region`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `region`<br>
        **説明**: 参照されている Cloud SQL インスタンスのリージョン。<br>
   - `username`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `username`<br>
    **説明**: オンプレミスインスタンスに接続するためのユーザー名。<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `out_of_disk_report`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `outOfDiskReport`<br>
**説明**: このフィールドは、OutOfDisk 問題に対するプロアクティブデータベースウェルネスジョブが生成するレポートを表します。* ライター: * OOD のプロアクティブデータベースウェルネスジョブ。* リーダー: * プロアクティブデータベースウェルネスジョブ<br>
   - `sql_min_recommended_increase_size_gb`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `sqlMinRecommendedIncreaseSizeGb`<br>
    **説明**: 最小推奨増加サイズ (ギガバイト単位)。このフィールドは、フロントエンドによって消費されます。* ライター: * OOD のプロアクティブデータベースウェルネスジョブ。* リーダー:<br>
   - `sql_out_of_disk_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sqlOutOfDiskState`<br>
    **説明**: このフィールドは、OutOfDisk 問題に対するプロアクティブデータベースウェルネスジョブが生成する状態を表します。* ライター: * OOD のプロアクティブデータベースウェルネスジョブ。* リーダー: * プロアクティブデータベースウェルネスジョブ<br>
    **可能な値**:<br>
      - `SQL_OUT_OF_DISK_STATE_UNSPECIFIED` - 未指定の状態<br>
      - `NORMAL` - インスタンスのデータディスクに十分な空き容量があります<br>
      - `SOFT_SHUTDOWN` - データディスクをほぼ使い切った状態です。データの破損を防ぐためにシャットダウンされます。<br>
## `parent`
**タイプ**: `STRING`<br>
## `project`
**タイプ**: `STRING`<br>
**プロバイダー名**: `project`<br>
**説明**: Cloud SQL インスタンスを含むプロジェクトのプロジェクト ID。該当する場合は、Google アプリのドメインがプレフィックスとして付きます。<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `region`
**タイプ**: `STRING`<br>
**プロバイダー名**: `region`<br>
**説明**: 地理的な地域。* `us-central` (`FIRST_GEN` インスタンスのみ) * `us-central1` (`SECOND_GEN` インスタンスのみ) * `asia-east1` または `europe-west1` が可能です。デフォルトは、インスタンスタイプに応じて `us-central` または `us-central1` です。インスタンス作成後に地域を変更することはできません。<br>
## `replica_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `replicaConfiguration`<br>
**説明**: フェイルオーバーレプリカとリードレプリカに特化した構成。<br>
   - `failover_target`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `failoverTarget`<br>
    **説明**: レプリカがフェイルオーバーのターゲットであるかどうかを指定します。このフィールドを `true` に設定すると、レプリカはフェイルオーバーレプリカとして指定されます。プライマリインスタンスに障害が発生した場合、そのレプリカインスタンスが新しいプライマリインスタンスとして昇格します。フェイルオーバーの対象として指定できるレプリカは 1 つだけで、そのレプリカはプライマリインスタンスと異なるゾーンにある必要があります。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: これは常に `sql#replicaConfiguration` です。<br>
   - `mysql_replica_configuration`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `mysqlReplicaConfiguration`<br>
    **説明**: MySQL オンプレミスプライマリインスタンスからレプリケーションを行う際の MySQL 固有の構成。ユーザー名、パスワード、証明書、キーなどのレプリケーション構成情報は、インスタンスのメタデータには保存されません。構成情報はレプリケーション接続のセットアップにのみ使用され、MySQL によってデータディレクトリの `master.info` というファイルに保存されます。<br>
       - `ca_certificate`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `caCertificate`<br>
        **説明**: 信頼できる CA の x509 証明書の PEM 表現。<br>
       - `client_certificate`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `clientCertificate`<br>
        **説明**: レプリカの x509 証明書の PEM 表現。<br>
       - `client_key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `clientKey`<br>
        **説明**: レプリカの秘密鍵の PEM 表現。対応する公開キーは、クライアントの証明書にエンコードされています。<br>
       - `connect_retry_interval`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `connectRetryInterval`<br>
        **説明**: 接続の再試行までの待ち時間 (秒単位)。MySQL のデフォルトは 60 秒です。<br>
       - `dump_file_path`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `dumpFilePath`<br>
        **説明**: レプリカインスタンスの作成元となる、Google Cloud Storage にある SQL ダンプファイルへのパス。URI は gs://bucketName/fileName の形式です。圧縮された gzip ファイル (.gz) もサポートされています。ダンプには、レプリケーションを開始する binlog 座標を指定します。これは、mysqldump を使用する際に --master-data を 1 に設定することで実現可能です。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `kind`<br>
        **説明**: これは常に `sql#mysqlReplicaConfiguration` です。<br>
       - `master_heartbeat_period`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `masterHeartbeatPeriod`<br>
        **説明**: レプリケーションのハートビート間の間隔 (ミリ秒)。<br>
       - `password`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `password`<br>
        **説明**: レプリケーション接続のパスワード。<br>
       - `ssl_cipher`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `sslCipher`<br>
        **説明**: SSL 暗号化に使用する権限ある暗号のリスト。<br>
       - `username`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `username`<br>
        **説明**: レプリケーション接続のユーザー名。<br>
       - `verify_server_certificate`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `verifyServerCertificate`<br>
        **説明**: プライマリインスタンスが SSL ハンドシェイク中に送信する証明書の Common Name の値をチェックするかどうか。<br>
## `replica_names`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `replicaNames`<br>
**説明**: インスタンスのレプリカ。<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `root_password`
**タイプ**: `STRING`<br>
**プロバイダー名**: `rootPassword`<br>
**説明**: ルートパスワードの初期値。作成時のみ使用します。PostgreSQL インスタンスに接続する前に、ルートパスワードを設定する必要があります。<br>
## `satisfies_pzs`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `satisfiesPzs`<br>
**説明**: インスタンスが Pzs を満たすかどうかを示すステータス。将来の使用のために予約されています。<br>
## `scheduled_maintenance`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `scheduledMaintenance`<br>
**説明**: このインスタンスに対して今後予定されているメンテナンスの開始時間。<br>
   - `can_defer`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `canDefer`<br>
   - `can_reschedule`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `canReschedule`<br>
    **説明**: スケジュールメンテナンスの再スケジューリングが可能かどうか。<br>
   - `schedule_deadline_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `scheduleDeadlineTime`<br>
    **説明**: この期限を過ぎてのメンテナンス開始の再スケジューリングはできません。<br>
   - `start_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `startTime`<br>
    **説明**: このインスタンスに対して今後予定されているメンテナンスの開始時間。<br>
## `secondary_gce_zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `secondaryGceZone`<br>
**説明**: リージョンインスタンスの場合、フェイルオーバーインスタンスが現在サービスを提供している Compute Engine のゾーン。この値は、インスタンスがセカンダリ/フェイルオーバーゾーンにフェイルオーバーした場合、インスタンスの作成時に指定されたゾーンと異なる可能性があります。<br>
## `self_link`
**タイプ**: `STRING`<br>
**プロバイダー名**: `selfLink`<br>
**説明**: このリソースの URI。<br>
## `server_ca_cert`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `serverCaCert`<br>
**説明**: SSL 構成。<br>
   - `cert`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `cert`<br>
    **説明**: PEM 表現。<br>
   - `cert_serial_number`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `certSerialNumber`<br>
    **説明**: 証明書から抽出されたシリアル番号。<br>
   - `common_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `commonName`<br>
    **説明**: ユーザー提供の名前。[a-zA-Z.-_ ]+ に制限されています。<br>
   - `create_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `createTime`<br>
    **説明**: 証明書が作成された時刻。[RFC 3339](https://tools.ietf.org/html/rfc3339) 形式で、例えば `2012-11-15T16:19:00.094Z` のようになります。<br>
   - `expiration_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `expirationTime`<br>
    **説明**: 証明書の有効期限。[RFC 3339](https://tools.ietf.org/html/rfc3339) 形式で、例えば `2012-11-15T16:19:00.094Z` のようになります。<br>
   - `instance`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `instance`<br>
    **説明**: データベースインスタンスの名前。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: これは常に `sql#sslCert` です。<br>
   - `self_link`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `selfLink`<br>
    **説明**: このリソースの URI。<br>
   - `sha1_fingerprint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sha1Fingerprint`<br>
    **説明**: Sha1 フィンガープリント。<br>
## `service_account_email_address`
**タイプ**: `STRING`<br>
**プロバイダー名**: `serviceAccountEmailAddress`<br>
**説明**: インスタンスに割り当てられたサービスアカウントのメールアドレス。このプロパティは読み取り専用です。<br>
## `settings`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `settings`<br>
**説明**: ユーザー設定。<br>
   - `activation_policy`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `activationPolicy`<br>
    **説明**: アクティブ化ポリシーは、インスタンスがいつアクティブになるかを指定します。これは、インスタンスの状態が RUNNABLE である場合にのみ適用されます。有効な値: * `ALWAYS`: インスタンスはオンになっており、接続リクエストがない場合でもそのままの状態を保ちます。* `NEVER`: インスタンスはオフで、接続リクエストが来てもアクティブになりません。 <br>
    **可能な値**:<br>
      - `SQL_ACTIVATION_POLICY_UNSPECIFIED` - 不明なアクティブ化プラン。<br>
      - `ALWAYS` - インスタンスは常に稼働しています。<br>
      - `NEVER` - インスタンスが起動することはありません。<br>
      - `ON_DEMAND` - インスタンスはリクエストを受けると起動します。<br>
   - `active_directory_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `activeDirectoryConfig`<br>
    **説明**: Active Directory の構成。Cloud SQL for SQL Server のみに関連します。<br>
       - `domain`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `domain`<br>
        **説明**: ドメイン名 (例: mydomain.com)。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `kind`<br>
        **説明**: これは常に sql#activeDirectoryConfig です。<br>
   - `advanced_machine_features`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `advancedMachineFeatures`<br>
    **説明**: SQL Server のみに関連するインスタンスの事前マシン構成を指定します。<br>
       - `threads_per_core`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `threadsPerCore`<br>
        **説明**: 物理コアあたりのスレッド数。<br>
   - `authorized_gae_applications`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `authorizedGaeApplications`<br>
    **説明**: このインスタンスにアクセスできる App Engine のアプリ ID。(非推奨) First Generation インスタンスにのみ適用されます。<br>
   - `availability_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `availabilityType`<br>
    **説明**: 可用性タイプ。想定される値: * `ZONAL`: インスタンスは 1 つのゾーンのみからデータを提供します。そのゾーンで障害が発生した場合、データアクセスに影響があります。* `REGIONAL`: インスタンスはリージョン内の複数のゾーンからデータを提供できます (高可用性です)。詳しくは、[高可用性構成の概要](https://cloud.google.com/sql/docs/mysql/high-availability)を参照してください。 <br>
    **可能な値**:<br>
      - `SQL_AVAILABILITY_TYPE_UNSPECIFIED` - これは不明な可用性タイプです。<br>
      - `ZONAL` - ゾーンで利用可能なインスタンス。<br>
      - `REGIONAL` - リージョンで利用可能なインスタンス。<br>
   - `backup_configuration`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `backupConfiguration`<br>
    **説明**: インスタンスの日次バックアップ構成。<br>
       - `backup_retention_settings`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `backupRetentionSettings`<br>
        **説明**: バックアップの保持設定。<br>
           - `retained_backups`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `retainedBackups`<br>
            **説明**: retention_unit の値に応じて、バックアップを削除する必要があるかどうかを判断するために使用されます。retention_unit が 'COUNT' の場合、この数のバックアップを保持することになります。<br>
           - `retention_unit`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `retentionUnit`<br>
            **説明**: 'retained_backups' が表す単位。<br>
            **可能な値**:<br>
              - `RETENTION_UNIT_UNSPECIFIED` - バックアップの保持単位は未指定で、COUNT として扱われます。<br>
              - `COUNT` - バックアップの保持は、「直近の 7 つのバックアップを保持する」のように、回数で指定します。<br>
       - `binary_log_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `binaryLogEnabled`<br>
        **説明**: (MySQL のみ) バイナリログが有効かどうか。バックアップ構成が無効の場合、バイナリログも無効にする必要があります。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: この構成が有効であるかどうか。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `kind`<br>
        **説明**: これは常に `sql#backupConfiguration` です。<br>
       - `location`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `location`<br>
        **説明**: バックアップの場所<br>
       - `point_in_time_recovery_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `pointInTimeRecoveryEnabled`<br>
        **説明**: (Postgres のみ) ポイントインタイムリカバリーが有効かどうか。<br>
       - `replication_log_archiving_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `replicationLogArchivingEnabled`<br>
        **説明**: 将来の使用に備えた予約。<br>
       - `start_time`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `startTime`<br>
        **説明**: 毎日のバックアップ構成の開始時刻。UTC タイムゾーンで、24 時間形式 - `HH:MM` で指定します。<br>
       - `transaction_log_retention_days`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `transactionLogRetentionDays`<br>
        **説明**: ポイントインタイムリストアのために保持するトランザクションログの日数 (1～7)。<br>
   - `collation`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `collation`<br>
    **説明**: サーバーインスタンス照合の名前。<br>
   - `connector_enforcement`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `connectorEnforcement`<br>
    **説明**: 接続にクラウド SQL コネクターを使用しなければならないかどうかを指定します。オプションの値は以下の通りです。`NOT_REQUIRED` (Cloud SQL インスタンスは Cloud SQL Connectors なしで接続可能) と `REQUIRED` (Cloud SQL Connectors を使用する接続のみ許可) REQUIRED を使用すると、既存のすべての認可されたネットワークが無効になることに注意してください。新規インスタンス作成時にこのフィールドを指定しない場合、NOT_REQUIRED が使用されます。既存のインスタンスにパッチを適用したり更新したりする際にこのフィールドが指定されない場合、そのインスタンスでは変更されずにそのまま残ります。<br>
    **可能な値**:<br>
      - `CONNECTOR_ENFORCEMENT_UNSPECIFIED` - Cloud SQL コネクターの要件は不明です。<br>
      - `NOT_REQUIRED` - Cloud SQL コネクターを要求しません。<br>
      - `REQUIRED` - Cloud SQL Auth Proxy と Cloud SQL Java、Python、Go コネクターを含む、すべての接続に Cloud SQL コネクターを使用するよう要求します。注: これは、既存のすべての認可されたネットワークを無効にします。<br>
   - `crash_safe_replication_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `crashSafeReplicationEnabled`<br>
    **説明**: リードレプリカインスタンスに固有の構成。クラッシュセーフレプリケーションのためのデータベースフラグが有効であるかどうかを示します。このプロパティは、第一世代のインスタンスにのみ適用可能でした。<br>
   - `data_disk_size_gb`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `dataDiskSizeGb`<br>
    **説明**: データディスクのサイズ (GB 単位)。データディスクの最小サイズは 10GB です。<br>
   - `data_disk_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `dataDiskType`<br>
    **説明**: データディスクのデータタイプ: `PD_SSD` (デフォルト) または `PD_HDD`。 第一世代のインスタンスでは使用されません。<br>
    **可能な値**:<br>
      - `SQL_DATA_DISK_TYPE_UNSPECIFIED` - これは不明なデータディスクタイプです。<br>
      - `PD_SSD` - SSD データディスク。<br>
      - `PD_HDD` - HDD データディスク。<br>
      - `OBSOLETE_LOCAL_SSD` - このフィールドは非推奨で、API の将来のバージョンで削除される予定です。<br>
   - `database_flags`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `databaseFlags`<br>
    **説明**: 起動時にインスタンスに渡されるデータベースフラグ。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `name`<br>
        **説明**: フラグの名前。これらのフラグはインスタンスの起動時に渡されるので、 サーバーオプションとシステム変数の両方が含まれます。フラグはハイフンではなくアンダースコアで指定します。詳しくは、Cloud SQL ドキュメントの[データベースフラグの構成](https://cloud.google.com/sql/docs/mysql/flags)を参照してください。<br>
       - `value`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `value`<br>
        **説明**: フラグの値。ブール値のフラグは、true の場合は `on` に、false の場合は `off` に設定されます。フラグが値をとらない場合は、このフィールドを省略しなければなりません。<br>
   - `database_replication_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `databaseReplicationEnabled`<br>
    **説明**: リードレプリカインスタンスに特化した構成。レプリケーションが有効かどうかを示します。警告: これを変更すると、インスタンスが再起動します。<br>
   - `deletion_protection_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `deletionProtectionEnabled`<br>
    **説明**: 誤ってインスタンスが削除されないようにするための構成。<br>
   - `deny_maintenance_periods`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `denyMaintenancePeriods`<br>
    **説明**: 拒否メンテナンス期間<br>
       - `end_date`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `endDate`<br>
        **説明**: "deny maintenance period" の終了日。終了日の年が空であれば、開始日の年も空でなければなりません。この場合、拒否メンテナンス期間が毎年繰り返されることを意味します。日付の形式は、yyyy-mm-dd (例: 2020-11-01)、または mm-dd (例: 11-01) です。<br>
       - `start_date`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `startDate`<br>
        **説明**: "deny maintenance period" の開始日。開始日の年が空であれば、終了日の年も空でなければなりません。この場合、拒否メンテナンス期間が毎年繰り返されることを意味します。日付の形式は、yyyy-mm-dd (例: 2020-11-01)、または mm-dd (例: 11-01) です。<br>
       - `time`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `time`<br>
        **説明**: "deny maintenance period" が start_date に始まり end_date に終了する UTC での時間。時刻の形式は HH:mm:SS、すなわち、00:00:00 です。<br>
   - `insights_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `insightsConfig`<br>
    **説明**: インサイト構成、今のところ Postgres にのみ関係します。<br>
       - `query_insights_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `queryInsightsEnabled`<br>
        **説明**: Query Insights 機能が有効かどうか。<br>
       - `query_plans_per_minute`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `queryPlansPerMinute`<br>
        **説明**: Insights が 1 分間にキャプチャした、すべてのクエリの実行プランの数。デフォルトは 5 です。<br>
       - `query_string_length`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `queryStringLength`<br>
        **説明**: 保存される最大クエリ長 (バイト単位)。デフォルト値: 1024 バイト。範囲: 256-4500 バイト。このフィールドの値以上のクエリ長は、この値に切り詰められます。未設定の場合、クエリ長はデフォルト値となります。クエリ長を変更すると、データベースを再起動します。<br>
       - `record_application_tags`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `recordApplicationTags`<br>
        **説明**: Query Insights が有効な場合に、クエリからアプリケーションタグを記録するかどうか。<br>
       - `record_client_address`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `recordClientAddress`<br>
        **説明**: Query Insights が有効な場合に、クライアントのアドレスを記録するかどうか。<br>
   - `ip_configuration`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ipConfiguration`<br>
    **説明**: IP 管理に関する設定です。これにより、インスタンス IP を有効または無効にし、どの外部ネットワークがインスタンスに接続できるかを管理することができます。第二世代インスタンスでは、IPv4 アドレスを無効にすることはできません。<br>
       - `allocated_ip_range`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `allocatedIpRange`<br>
        **説明**: プライベート IP Cloud SQL インスタンスに割り当てられた IP 範囲の名前。例えば "google-managed-services-default" のようになります。設定した場合、インスタンス IP は割り当てられた範囲に作成されます。範囲名は [RFC 1035](https://tools.ietf.org/html/rfc1035) に準拠する必要があります。具体的には、1～63 文字で、正規表現 `[a-z]([-a-z0-9]*[a-z0-9])?.` にマッチする名前であることが必要です。<br>
       - `authorized_networks`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `authorizedNetworks`<br>
        **説明**: IP を使用してインスタンスへの接続が許可されている外部ネットワークのリスト。'CIDR' 表記で、'slash' 表記としても知られています (例: `157.197.200.0/24`)。<br>
           - `expiration_time`<br>
            **タイプ**: `TIMESTAMP`<br>
            **プロバイダー名**: `expirationTime`<br>
            **説明**: このアクセス制御エントリーの有効期限。[RFC 3339](https://tools.ietf.org/html/rfc3339) 形式で、例えば `2012-11-15T16:19:00.094Z` のようになります。<br>
           - `kind`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `kind`<br>
            **説明**: これは常に `sql#aclEntry` です。<br>
           - `name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `name`<br>
            **説明**: オプション。このエントリーを識別するためのラベルです。<br>
           - `value`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `value`<br>
            **説明**: アクセス制御リストの allowlisted 値。<br>
       - `enable_private_path_for_google_cloud_services`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enablePrivatePathForGoogleCloudServices`<br>
        **説明**: BigQuery などの Google サービスからプライベート IP インスタンスへの接続を制御します。<br>
       - `ipv4_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `ipv4Enabled`<br>
        **説明**: インスタンスにパブリック IP アドレスが割り当てられているかどうか。<br>
       - `private_network`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `privateNetwork`<br>
        **説明**: Cloud SQL インスタンスがプライベート IP でアクセスできる VPC ネットワークのリソースリンク。例えば、`/projects/myProject/global/networks/default` となります。この設定は更新することができますが、設定後に削除することはできません。<br>
       - `require_ssl`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `requireSsl`<br>
        **説明**: IP 経由の SSL 接続が強制されるかどうか。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: これは常に `sql#settings` です。<br>
   - `location_preference`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `locationPreference`<br>
    **説明**: ロケーションプリファレンスの設定。これにより、インスタンスは App Engine アプリまたは Compute Engine ゾーンのどちらかにできるだけ近い場所に配置され、パフォーマンスが向上します。App Engine のコロケーションは、第一世代のインスタンスにのみ適用されました。<br>
       - `follow_gae_application`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `followGaeApplication`<br>
        **説明**: フォローする App Engine アプリケーション。Cloud SQL インスタンスと同じリージョンにある必要があります。警告: これを変更すると、インスタンスが再起動する場合があります。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `kind`<br>
        **説明**: これは常に `sql#locationPreference` です。<br>
       - `secondary_zone`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `secondaryZone`<br>
        **説明**: セカンダリ/フェイルオーバーの優先 Compute Engine ゾーン (例: us-central1-a、us-central1-b など)。<br>
       - `zone`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `zone`<br>
        **説明**: 優先 Compute Engine ゾーン (例: us-central1-a、us-central1-b など)。警告: これを変更すると、インスタンスが再起動する場合があります。<br>
   - `maintenance_window`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `maintenanceWindow`<br>
    **説明**: このインスタンスのメンテナンスウィンドウ。これは、メンテナンスのためにインスタンスを再起動できるタイミングを指定します。<br>
       - `day`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `day`<br>
        **説明**: 曜日 (1-7)、月曜日から始まります。<br>
       - `hour`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `hour`<br>
        **説明**: 時間帯 - 0～23。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `kind`<br>
        **説明**: これは常に `sql#maintenanceWindow` です。<br>
       - `update_track`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `updateTrack`<br>
        **説明**: メンテナンスタイミングの設定: `canary` (初期) または `stable` (後期)。[詳しくはこちら](https://cloud.google.com/sql/docs/mysql/instance-settings#maintenance-timing-2ndgen)。 <br>
        **可能な値**:<br>
          - `SQL_UPDATE_TRACK_UNSPECIFIED` - これは、不明なメンテナンスタイミングの優先です。<br>
          - `canary` - 再起動が必要なインスタンス更新の場合、この更新追跡は、メンテナンスウィンドウの早い段階で新しいバージョンのために再起動することを好むインスタンスを示します。<br>
          - `stable` - 再起動が必要なインスタンス更新の場合、この更新トラックは、Cloud SQL に再起動のタイミングを選択させることを希望するインスタンスを示します (該当する場合、そのメンテナンスウィンドウ内で)。<br>
   - `password_validation_policy`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `passwordValidationPolicy`<br>
    **説明**: インスタンスのローカルユーザーパスワード検証ポリシー。<br>
       - `complexity`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `complexity`<br>
        **説明**: パスワードの複雑さ。 <br>
        **可能な値**:<br>
          - `COMPLEXITY_UNSPECIFIED` - 複雑さのチェックは指定されていません。<br>
          - `COMPLEXITY_DEFAULT` - 小文字、大文字、数字、非英数字の組み合わせ。<br>
       - `disallow_username_substring`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `disallowUsernameSubstring`<br>
        **説明**: パスワードの一部としてのユーザー名を許可しません。<br>
       - `enable_password_policy`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enablePasswordPolicy`<br>
        **説明**: パスワードポリシーが有効かどうか。<br>
       - `min_length`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `minLength`<br>
        **説明**: 最低限許可される文字数。<br>
       - `password_change_interval`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `passwordChangeInterval`<br>
        **説明**: パスワードを変更できるようになる最小間隔。このフラグは PostgreSQL でのみサポートされます。<br>
       - `reuse_interval`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `reuseInterval`<br>
        **説明**: 再利用できない過去のパスワードの数。<br>
   - `pricing_plan`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `pricingPlan`<br>
    **説明**: このインスタンスの料金プラン。これは `PER_USE` または `PACKAGE` のいずれかになります。第二世代インスタンスでは `PER_USE` のみがサポートされています。 <br>
    **可能な値**:<br>
      - `SQL_PRICING_PLAN_UNSPECIFIED` - これは、このインスタンスの不明な料金プランです。<br>
      - `PACKAGE` - インスタンスは、月額定額制で請求されます。<br>
      - `PER_USE` - インスタンスは使用量ごとに請求されます。<br>
   - `replication_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `replicationType`<br>
    **説明**: このインスタンスが使用するレプリケーションのタイプ。これは `ASYNCHRONOUS` または `SYNCHRONOUS` のどちらかになります。(非推奨) このプロパティは、第一世代のインスタンスにのみ適用可能でした。 <br>
    **可能な値**:<br>
      - `SQL_REPLICATION_TYPE_UNSPECIFIED` - これは、Cloud SQL インスタンスの不明なレプリケーションタイプです。<br>
      - `SYNCHRONOUS` - 第一世代インスタンスの同期レプリケーションモード。デフォルト値です。<br>
      - `ASYNCHRONOUS` - 第一世代インスタンスの非同期レプリケーションモード。若干のパフォーマンス向上が期待できますが、このオプションを非同期に設定した状態で障害が発生した場合、最大で数秒間のデータ更新が失われる可能性があります。<br>
   - `settings_version`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `settingsVersion`<br>
    **説明**: インスタンス設定のバージョン。これは、同時更新が適切に処理されるようにするための update メソッドの必須フィールドです。更新時には、このインスタンスの最新の settingsVersion 値を使用し、この値の更新は試みないでください。<br>
   - `sql_server_audit_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `sqlServerAuditConfig`<br>
    **説明**: SQL Server 固有の監査構成。<br>
       - `bucket`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `bucket`<br>
        **説明**: 宛先バケット名 (例: gs://mybucket)。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `kind`<br>
        **説明**: これは常に sql#sqlServerAuditConfig です<br>
       - `retention_interval`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `retentionInterval`<br>
        **説明**: 生成された監査ファイルの保存期間。<br>
       - `upload_interval`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `uploadInterval`<br>
        **説明**: 生成された監査ファイルをアップロードする頻度。<br>
   - `storage_auto_resize`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `storageAutoResize`<br>
    **説明**: ストレージサイズを自動的に増加させる構成。デフォルト値は true です。<br>
   - `storage_auto_resize_limit`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `storageAutoResizeLimit`<br>
    **説明**: ストレージの容量を自動的に増加させることができる最大サイズ。デフォルト値は 0 で、無制限であることを指定します。<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tier`<br>
    **説明**: このインスタンスの階層 (またはマシンタイプ)、たとえば `db-custom-1-3840` です。警告: これを変更すると、インスタンスが再起動します。<br>
   - `time_zone`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `timeZone`<br>
    **説明**: サーバーのタイムゾーン。Cloud SQL for SQL Server のみに関連します。<br>
   - `user_labels`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `userLabels`<br>
    **説明**: ユーザー提供のラベルで、各ラベルが 1 つのキーと値の組である辞書として表現されます。<br>
## `state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `state`<br>
**説明**: Cloud SQL インスタンスの現在のサービス状態。<br>
**可能な値**:<br>
  - `SQL_INSTANCE_STATE_UNSPECIFIED` - インスタンスの状態は不明です。<br>
  - `RUNNABLE` - インスタンスは実行中、またはオーナーによって停止されています。<br>
  - `SUSPENDED` - 請求の問題などで、インスタンスは利用できません。<br>
  - `PENDING_DELETE` - インスタンスは削除中です。<br>
  - `PENDING_CREATE` - インスタンスは作成中です。<br>
  - `MAINTENANCE` - インスタンスはメンテナンスのため停止しています。<br>
  - `FAILED` - インスタンスの作成に失敗したか、メンテナンス中に致命的なエラーが発生しました。<br>
  - `ONLINE_MAINTENANCE` - 非推奨<br>
## `suspension_reason`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `suspensionReason`<br>
**説明**: インスタンス状態が SUSPENDED の場合、停止した理由。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>