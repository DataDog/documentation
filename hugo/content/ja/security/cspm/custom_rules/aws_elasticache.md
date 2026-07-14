---
dependencies: []
disable_edit: true
---
# aws_elasticache

## `account_id`
**タイプ**: `STRING`<br>
## `arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ARN`<br>
**説明**: キャッシュクラスターの ARN (Amazon Resource Name)。<br>
## `at_rest_encryption_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `AtRestEncryptionEnabled`<br>
**説明**: <code>true</code> に設定すると、静止時の暗号化を有効にするフラグ。クラスターを作成した後に <code>AtRestEncryptionEnabled</code> の値を変更することはできません。クラスターで保存時の暗号化を有効にするには、クラスターを作成するときに <code>AtRestEncryptionEnabled</code> を <code>true</code> に設定する必要があります。 必須: redis バージョン <code>3.2.6</code>、<code>4.x</code> 以降を使用して Amazon VPC でレプリケーショングループを作成する場合のみ利用可能です。<br>
**デフォルト**: <code>false</code>
## `auth_token_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `AuthTokenEnabled`<br>
**説明**: Redis コマンドを発行する際に <code>AuthToken</code> (パスワード) を使用することを有効にするフラグ。<br>
**デフォルト**: <code>false</code>
## `auth_token_last_modified_date`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `AuthTokenLastModifiedDate`<br>
**説明**: 認証トークンが最後に更新された日付<br>
## `auto_minor_version_upgrade`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `AutoMinorVersionUpgrade`<br>
**説明**: Redis エンジンバージョン 6.0 以降を使用している場合、次回の自動マイナーバージョンアップキャンペーンに参加する場合は、このパラメーターを yes に設定します。それ以前のバージョンでは、このパラメーターは無効です。<br>
## `cache_cluster_create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `CacheClusterCreateTime`<br>
**説明**: クラスターが作成された日時。<br>
## `cache_cluster_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CacheClusterId`<br>
**説明**: ユーザーが提供するクラスターの識別子。この識別子は、クラスターを識別する一意のキーです。<br>
## `cache_cluster_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CacheClusterStatus`<br>
**説明**: このクラスターの現在の状態。次の値のいずれかです: <code>available</code>、<code>creating</code>、<code>deleted</code>、<code>deleting</code>、<code>incompatible-network</code>、<code>modifying</code>、<code>rebooting cluster nodes</code>、<code>restore-failed</code>、または <code>snapshotting</code><br>
## `cache_node_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CacheNodeType`<br>
**説明**: クラスターのコンピュートおよびメモリー容量のノードタイプの名前。ElastiCache では、以下のノードタイプがサポートされています。一般的に、現在の世代のタイプは、同等の前世代のものと比較して、より多くのメモリと計算能力を低コストで提供します。<ul> <li>汎用: <ul> <li> 現世代:   <b>M6g ノードタイプ</b> (Redis エンジン バージョン 5.0.6 以降と Memcached エンジン バージョン 1.5.16 以降でのみ利用可能): <code>cache.m6g.large</code>、<code>cache.m6g.xlarge</code>、<code>cache.m6g.2xlarge</code>、<code>cache.m6g.4xlarge</code>、<code>cache.m6g.8xlarge</code>、<code>cache.m6g.12xlarge</code>、<code>cache.m6g.16xlarge</code>  <note>リージョンの利用可否については、<a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheNodes.SupportedTypes.html#CacheNodes.SupportedTypesByRegion">サポートされるノードタイプ</a>を参照してください  </note>  <b>M5 ノードタイプ:</b> <code>cache.m5.large</code>、<code>cache.m5.xlarge</code>、<code>cache.m5.2xlarge</code>、<code>cache.m5.4xlarge</code>、<code>cache.m5.12xlarge</code>、<code>cache.m5.24xlarge</code>   <b>M4 node types:</b> <code>cache.m4.large</code>、<code>cache.m4.xlarge</code>、<code>cache.m4.2xlarge</code>、<code>cache.m4.4xlarge</code>、<code>cache.m4.10xlarge</code>   <b>T4g ノードタイプ</b> (Redis エンジンバージョン 5.0.6 以降と Memcached エンジンバージョン 1.5.16 以降でのみ利用可能): <code>cache.t4g.micro</code>、<code>cache.t4g.small</code>、<code>cache.t4g.medium</code>   <b>T3 ノードタイプ:</b> <code>cache.t3.micro</code>、<code>cache.t3.small</code>、<code>cache.t3.medium</code>   <b>T2 ノードタイプ:</b> <code>cache.t2.micro</code>、<code>cache.t2.small</code>、<code>cache.t2.medium</code>  </li> <li> 前世代: (推奨されません。既存のクラスターはサポートされていますが、これらのタイプでは新しいクラスターの作成はサポートされていません。)  <b>T1 ノードタイプ:</b> <code>cache.t1.micro</code>   <b>M1 ノードタイプ:</b> <code>cache.m1.small</code>、<code>cache.m1.medium</code>、<code>cache.m1.large</code>、<code>cache.m1.xlarge</code>   <b>M3 ノードタイプ:</b> <code>cache.m3.medium</code>、<code>cache.m3.large</code>、<code>cache.m3.xlarge</code>、<code>cache.m3.2xlarge</code>  </li> </ul> </li> <li> コンピューティング最適化: <ul> <li> 前世代: (推奨されません。既存のクラスターはサポートされていますが、これらのタイプでは新しいクラスターの作成はサポートされていません。)  <b>C1 ノードタイプ:</b> <code>cache.c1.xlarge</code>  </li> </ul> </li> <li> メモリ最適化: <ul> <li> 現世代:   <b>R6g ノードタイプ</b> (Redis エンジン バージョン 5.0.6 以降と Memcached エンジン バージョン 1.5.16 以降でのみ利用可能)。  <code>cache.r6g.large</code>、<code>cache.r6g.xlarge</code>、<code>cache.r6g.2xlarge</code>、<code>cache.r6g.4xlarge</code>、<code>cache.r6g.8xlarge</code>、<code>cache.r6g.12xlarge</code>、<code>cache.r6g.16xlarge</code>  <note> リージョンの利用可否については、<a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheNodes.SupportedTypes.html#CacheNodes.SupportedTypesByRegion">サポートされるノードタイプ</a>を参照してください  </note>  <b>R5 ノードタイプ:</b> <code>cache.r5.large</code>、<code>cache.r5.xlarge</code>、<code>cache.r5.2xlarge</code>、<code>cache.r5.4xlarge</code>、<code>cache.r5.12xlarge</code>、<code>cache.r5.24xlarge</code>   <b>R4 ノードタイプ:</b> <code>cache.r4.large</code>、<code>cache.r4.xlarge</code>、<code>cache.r4.2xlarge</code>、<code>cache.r4.4xlarge</code>、<code>cache.r4.8xlarge</code>、<code>cache.r4.16xlarge</code>  </li> <li> 前世代: (推奨されません。既存のクラスターはサポートされていますが、これらのタイプでは新しいクラスターの作成はサポートされていません。)  <b>M2 ノードタイプ:</b> <code>cache.m2.xlarge</code>、<code>cache.m2.2xlarge</code>、<code>cache.m2.4xlarge</code>   <b>R3 node types:</b> <code>cache.r3.large</code>、<code>cache.r3.xlarge</code>、<code>cache.r3.2xlarge</code>、<code>cache.r3.4xlarge</code>、<code>cache.r3.8xlarge</code>  </li> </ul> </li> </ul>  <b>ノードタイプの追加情報</b>  <ul> <li> 現在の世代のインスタンスタイプはすべて、デフォルトで Amazon VPC に作成されます。 </li> <li> Redis の append-only ファイル (AOF) は、T1 および T2 インスタンスではサポートされていません。 </li> <li> T1 インスタンスでは、自動フェイルオーバー機能を持つ Redis Multi-AZ はサポートされていません。 </li> <li> Redis 構成変数 <code>appendonly</code> および <code>appendfsync</code> は、Redis バージョン 2.8.22 以降でサポートされていません。 </li> </ul>
## `cache_nodes`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `CacheNodes`<br>
**説明**: クラスターのメンバーであるキャッシュノードのリスト。<br>
   - `cache_node_create_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `CacheNodeCreateTime`<br>
    **説明**: キャッシュノードが作成された日時。<br>
   - `cache_node_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CacheNodeId`<br>
    **説明**: キャッシュのノード ID。ノード ID は数字による識別子です (0001、0002 など)。クラスター ID とノード ID の組み合わせで、顧客の Amazon アカウントで使用されるすべてのキャッシュノードを一意に識別します。<br>
   - `cache_node_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CacheNodeStatus`<br>
    **説明**: このキャッシュノードの現在の状態。以下の値のいずれかです: <code>available</code>、<code>creating</code>、<code>rebooting</code>、または <code>deleting</code><br>
   - `customer_availability_zone`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CustomerAvailabilityZone`<br>
    **説明**: このノードが作成され、現在存在するアベイラビリティゾーン。<br>
   - `customer_outpost_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CustomerOutpostArn`<br>
    **説明**: キャッシュノードのカスタマーアウトポスト ARN。<br>
   - `endpoint`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Endpoint`<br>
    **説明**: このキャッシュノードに接続するためのホスト名。<br>
       - `address`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Address`<br>
        **説明**: キャッシュノードの DNS ホスト名。<br>
       - `port`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Port`<br>
        **説明**: キャッシュエンジンがリッスンしているポート番号。<br>
   - `parameter_group_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ParameterGroupStatus`<br>
    **説明**: このキャッシュノードに適用されるパラメーターグループのステータス。<br>
   - `source_cache_node_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SourceCacheNodeId`<br>
    **説明**: このリードレプリカノードが同期しているプライマリノードの ID。このフィールドが空の場合、このノードはプライマリクラスターと関連付けられていません。<br>
## `cache_parameter_group`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `CacheParameterGroup`<br>
**説明**: キャッシュパラメーターグループのステータス。<br>
   - `cache_node_ids_to_reboot`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `CacheNodeIdsToReboot`<br>
    **説明**: パラメーター変更を適用するために再起動が必要なキャッシュノード ID の一覧。ノード ID は数字による識別子 (0001、0002 など) です。<br>
   - `cache_parameter_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CacheParameterGroupName`<br>
    **説明**: キャッシュパラメーターグループの名前。<br>
   - `parameter_apply_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ParameterApplyStatus`<br>
    **説明**: パラメーター更新のステータス。<br>
## `cache_security_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `CacheSecurityGroups`<br>
**説明**: キャッシュセキュリティグループの要素のリストで、名前とステータスのサブ要素で構成されます。<br>
   - `cache_security_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CacheSecurityGroupName`<br>
    **説明**: キャッシュセキュリティグループの名前。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Status`<br>
    **説明**: キャッシュセキュリティグループのメンバーシップステータス。ステータスは、キャッシュセキュリティグループが変更されたとき、またはクラスターに割り当てられているキャッシュセキュリティグループが変更されたときに変更されます。<br>
## `cache_subnet_group_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CacheSubnetGroupName`<br>
**説明**: クラスターに関連するキャッシュサブネットグループの名前。<br>
## `client_download_landing_page`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClientDownloadLandingPage`<br>
**説明**: 最新の ElastiCache クライアントライブラリをダウンロードできる Web ページの URL。<br>
## `configuration_endpoint`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ConfigurationEndpoint`<br>
**説明**: アプリケーションからクラスター内の任意のノードに接続するために使用できる Memcached クラスターエンドポイントを表します。構成エンドポイントには、常に <code>.cfg</code> が含まれます。 例: <code>mem-3.9dvc4r<u>.cfg</u>.usw2.cache.amazonaws.com:11211</code><br>
   - `address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Address`<br>
    **説明**: キャッシュノードの DNS ホスト名。<br>
   - `port`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Port`<br>
    **説明**: キャッシュエンジンがリッスンしているポート番号。<br>
## `engine`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Engine`<br>
**説明**: このクラスターで使用するキャッシュエンジン (<code>memcached</code> または <code>redis</code>) の名前。<br>
## `engine_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `EngineVersion`<br>
**説明**: このクラスターで使用されるキャッシュエンジンのバージョン。<br>
## `ip_discovery`
**タイプ**: `STRING`<br>
**プロバイダー名**: `IpDiscovery`<br>
**説明**: クラスターに関連するネットワーク タイプ。<code>ipv4</code> または <code>ipv6</code> のいずれかです。IPv6 は、<a href="https://aws.amazon.com/ec2/nitro/">Nitro システム</a>で構築されたすべてのインスタンスで Redis エンジン バージョン 6.2 以降または Memcached エンジンバージョン 1.6.6 を使用するワークロードでサポートされています。<br>
## `log_delivery_configurations`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `LogDeliveryConfigurations`<br>
**説明**: ログの宛先、形式、種類を返します。<br>
   - `destination_details`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `DestinationDetails`<br>
    **説明**: CloudWatch Logs の宛先、または Kinesis Data Firehose の宛先のどちらかの構成詳細。<br>
       - `cloud_watch_logs_details`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `CloudWatchLogsDetails`<br>
        **説明**: CloudWatch Logs の宛先の構成詳細。<br>
           - `log_group`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `LogGroup`<br>
            **説明**: CloudWatch Logs のロググループの名前。<br>
       - `kinesis_firehose_details`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `KinesisFirehoseDetails`<br>
        **説明**: Kinesis Data Firehose の宛先の構成詳細。<br>
           - `delivery_stream`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `DeliveryStream`<br>
            **説明**: Kinesis Data Firehose の配信ストリームの名前。<br>
   - `destination_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DestinationType`<br>
    **説明**: <code>cloudwatch-logs</code> または <code>kinesis-firehose</code> のどちらかの宛先タイプを返します。<br>
   - `log_format`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LogFormat`<br>
    **説明**: ログの形式を JSON または TEXT で返します。<br>
   - `log_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LogType`<br>
    **説明**: <a href="https://redis.io/commands/slowlog">slow-log</a> または engine-log を指します。<br>
   - `message`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Message`<br>
    **説明**: ログ配信構成に関するエラーメッセージを返します。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Status`<br>
    **説明**: ログ配信の構成ステータスを返します。値は以下のいずれかです: <code>enabling</code> | <code>disabling</code> | <code>modifying</code> | <code>active</code> | <code>error</code><br>
## `network_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `NetworkType`<br>
**説明**: <code>ipv4</code>、<code>ipv6</code>、<code>dual_stack</code> のいずれかである必要があります。IPv6 は、<a href="https://aws.amazon.com/ec2/nitro/">Nitro システム</a>で構築されたすべてのインスタンスで Redis エンジン バージョン 6.2 以降または Memcached エンジンバージョン 1.6.6 を使用するワークロードでサポートされています。<br>
## `notification_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `NotificationConfiguration`<br>
**説明**: 通知トピックとそのステータスを説明します。通知トピックは、Amazon Simple Notification Service (SNS) を使用して、ElastiCache イベントを購読者に公開するために使用されます。<br>
   - `topic_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TopicArn`<br>
    **説明**: トピックを識別するための Amazon Resource Name (ARN)。<br>
   - `topic_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TopicStatus`<br>
    **説明**: トピックの現在の状態。<br>
## `num_cache_nodes`
**タイプ**: `INT32`<br>
**プロバイダー名**: `NumCacheNodes`<br>
**説明**: クラスター内のキャッシュノードの数。Redis を実行しているクラスターでは、この値は 1 でなければなりません。Memcached を実行しているクラスターでは、この値は 1 から 40 の間である必要があります。<br>
## `pending_modified_values`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `PendingModifiedValues`<br>
   - `auth_token_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AuthTokenStatus`<br>
    **説明**: 認証トークンステータス<br>
   - `cache_node_ids_to_remove`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `CacheNodeIdsToRemove`<br>
    **説明**: クラスターから削除される (または削除される予定の) キャッシュノード ID のリスト。ノード ID は 4 桁の数字による識別子です (0001、0002 など)。<br>
   - `cache_node_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CacheNodeType`<br>
    **説明**: このクラスターまたはレプリケーショングループをスケーリングするキャッシュノードのタイプ。<br>
   - `engine_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `EngineVersion`<br>
    **説明**: クラスターが実行する新しいキャッシュエンジンのバージョン。<br>
   - `log_delivery_configurations`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `LogDeliveryConfigurations`<br>
    **説明**: 変更されるログ配信構成<br>
       - `destination_details`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `DestinationDetails`<br>
        **説明**: CloudWatch Logs の宛先、または Kinesis Data Firehose の宛先のどちらかの構成詳細。<br>
           - `cloud_watch_logs_details`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `CloudWatchLogsDetails`<br>
            **説明**: CloudWatch Logs の宛先の構成詳細。<br>
               - `log_group`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `LogGroup`<br>
                **説明**: CloudWatch Logs のロググループの名前。<br>
           - `kinesis_firehose_details`<br>
            **タイプ**: `STRUCT`<br>
            **プロバイダー名**: `KinesisFirehoseDetails`<br>
            **説明**: Kinesis Data Firehose の宛先の構成詳細。<br>
               - `delivery_stream`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `DeliveryStream`<br>
                **説明**: Kinesis Data Firehose の配信ストリームの名前。<br>
       - `destination_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `DestinationType`<br>
        **説明**: CloudWatch Logs または Kinesis Data Firehose のどちらかの宛先タイプを返します。<br>
       - `log_format`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `LogFormat`<br>
        **説明**: ログの形式を JSON または TEXT で返します<br>
       - `log_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `LogType`<br>
        **説明**: <a href="https://redis.io/commands/slowlog">slow-log</a> または engine-log を指します。<br>
   - `num_cache_nodes`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `NumCacheNodes`<br>
    **説明**: クラスターのキャッシュノードの新しい数。Redis を実行しているクラスターでは、この値は 1 でなければなりません。Memcached を実行しているクラスターでは、この値は 1 から 40 の間である必要があります。<br>
## `preferred_availability_zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PreferredAvailabilityZone`<br>
**説明**: クラスターが配置されているアベイラビリティゾーンの名前、またはキャッシュノードが異なるアベイラビリティゾーンに配置されている場合は "Multiple"。<br>
## `preferred_maintenance_window`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PreferredMaintenanceWindow`<br>
**説明**: クラスターのメンテナンスが実行される週単位の時間範囲を指定します。ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC) のフォーマットで範囲を指定します。最小のメンテナンスウィンドウは 60 分です。<code>ddd</code> の有効な値は以下の通りです: <ul> <li>  <code>sun</code>  </li> <li>  <code>mon</code>  </li> <li>  <code>tue</code>  </li> <li>  <code>wed</code>  </li> <li>  <code>thu</code>  </li> <li>  <code>fri</code>  </li> <li>  <code>sat</code>  </li> </ul> 例: <code>sun:23:00-mon:01:30</code><br>
## `preferred_outpost_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PreferredOutpostArn`<br>
**説明**: キャッシュクラスターが作成されるアウトポスト ARN。<br>
## `replication_group_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ReplicationGroupId`<br>
**説明**: このクラスターが所属するレプリケーショングループ。このフィールドが空の場合、クラスターはどのレプリケーショングループにも関連付けられていません。<br>
## `replication_group_log_delivery_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `ReplicationGroupLogDeliveryEnabled`<br>
**説明**: レプリケーショングループでログ配信が有効かどうかを示すブール値。<br>
## `security_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `SecurityGroups`<br>
**説明**: クラスターに関連する VPC セキュリティグループのリスト。<br>
   - `security_group_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SecurityGroupId`<br>
    **説明**: キャッシュセキュリティグループの識別子。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Status`<br>
    **説明**: キャッシュセキュリティグループのメンバーシップのステータス。ステータスは、キャッシュセキュリティグループが変更されたとき、またはクラスターに割り当てられているキャッシュセキュリティグループが変更されたときに変更されます。<br>
## `snapshot_retention_limit`
**タイプ**: `INT32`<br>
**プロバイダー名**: `SnapshotRetentionLimit`<br>
**説明**: ElastiCache が自動クラスタースナップショットを削除する前に保持する日数。例えば、<code>SnapshotRetentionLimit</code> を 5 に設定すると、今日撮影されたスナップショットは、削除される前に 5 日間保持されます。 <important>  SnapshotRetentionLimit の値をゼロ (0) にすると、バックアップはオフになります。 </important><br>
## `snapshot_window`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnapshotWindow`<br>
**説明**: ElastiCache がクラスターの日次スナップショットの取得を開始する日次時間範囲 (UTC 単位)。例: <code>05:00-09:00</code><br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `transit_encryption_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `TransitEncryptionEnabled`<br>
**説明**: <code>true</code> に設定すると、トランジット内暗号化を有効にするフラグ。クラスターを作成した後に <code>TransitEncryptionEnabled</code> の値を変更することはできません。クラスターでトランジット内暗号化を有効にするには、クラスターを作成するときに <code>TransitEncryptionEnabled</code> を <code>true</code> に設定する必要があります。  <b>必須:</b> Amazon VPC で redis バージョン <code>3.2.6</code>、<code>4.x</code> 以降を使用してレプリケーショングループを作成する場合のみ利用可能です。<br>
**デフォルト**: <code>false</code>