---
dependencies: []
disable_edit: true
---
# aws_redshift_cluster

## `account_id`
**タイプ**: `STRING`<br>
## `allow_version_upgrade`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `AllowVersionUpgrade`<br>
**説明**: ブール値。<code>true</code> の場合、メンテナンスウィンドウの間、クラスターにメジャーバージョンアップグレードが自動的に適用されることを示します。<br>
## `aqua_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `AquaConfiguration`<br>
**説明**: クラスターの AQUA(Advanced Query Accelerator) 構成。<br>
   - `aqua_configuration_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AquaConfigurationStatus`<br>
    **説明**: この値は、クラスターが AQUA を使用するように構成されていることを表します。可能な値は次のとおりです。 <ul> <li> enabled - 現在の Amazon Web Services リージョンと Amazon Redshift のノードタイプで利用可能な場合は、AQUA を使用します。 </li> <li> disabled - AQUA を使用しません。  </li> <li> auto - Amazon Redshift が、AQUA を使用するかどうかを判断します。 </li> </ul>
   - `aqua_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AquaStatus`<br>
    **説明**: この値は、クラスター上の AQUA のステータスを示します。可能な値は次のとおりです。 <ul> <li> enabled - AQUA は有効です。 </li> <li> disabled - AQUA は有効ではありません。  </li> <li> applying - AQUA ステータスを適用中です。  </li> </ul>
## `automated_snapshot_retention_period`
**タイプ**: `INT32`<br>
**プロバイダー名**: `AutomatedSnapshotRetentionPeriod`<br>
**説明**: クラスターの自動スナップショットを保持する日数。<br>
## `availability_zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `AvailabilityZone`<br>
**説明**: クラスターが配置されているアベイラビリティゾーンの名前。<br>
## `availability_zone_relocation_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `AvailabilityZoneRelocationStatus`<br>
**説明**: アベイラビリティゾーンの再配置オペレーションのステータスを説明します。<br>
## `cluster_availability_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterAvailabilityStatus`<br>
**説明**: クエリに対するクラスターの可用性ステータス。可能な値は次のとおりです: <ul> <li> Available - クラスターはクエリに使用できます。  </li> <li> Unavailable - クラスターはクエリに使用できません。 </li> <li> Maintenance - クラスターはメンテナンスのため、断続的にクエリに使用できる状態になっています。 </li> <li> Modifying - クラスターを修正する変更により、クラスターが断続的にクエリに使用できる状態になっています。 </li> <li> Failed - クラスターに障害が発生し、クエリに使用できません。 </li> </ul>
## `cluster_create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `ClusterCreateTime`<br>
**説明**: クラスターが作成された日時。<br>
## `cluster_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterIdentifier`<br>
**説明**: クラスターの一意な識別子。<br>
## `cluster_logging`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `LoggingStatus`<br>
   - `bucket_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `BucketName`<br>
    **説明**: ログファイルが保存される S3 バケットの名前。<br>
   - `last_failure_message`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LastFailureMessage`<br>
    **説明**: ログの配信に失敗したことを示すメッセージ。<br>
   - `last_failure_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LastFailureTime`<br>
    **説明**: ログの配信に失敗した最後の時間。<br>
   - `last_successful_delivery_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LastSuccessfulDeliveryTime`<br>
    **説明**: ログが最後に配信された時間。<br>
   - `log_destination_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LogDestinationType`<br>
    **説明**: ログ宛先の種類。<code>s3</code> および <code>cloudwatch</code> の値が可能な enum です。<br>
   - `log_exports`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `LogExports`<br>
    **説明**: エクスポートされたログタイプのコレクション。ログタイプには、接続ログ、ユーザーログ、ユーザーアクティビティログが含まれます。<br>
   - `logging_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `LoggingEnabled`<br>
    **説明**: ロギングがオンの場合は <code>true</code>、オフの場合は <code>false</code> となります。<br>
   - `s3_key_prefix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `S3KeyPrefix`<br>
    **説明**: ログファイル名に適用されるプレフィックス。<br>
## `cluster_namespace_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterNamespaceArn`<br>
**説明**: クラスターのネームスペース Amazon Resource Name (ARN)。<br>
## `cluster_nodes`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ClusterNodes`<br>
**説明**: クラスターを構成するノード。<br>
   - `node_role`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `NodeRole`<br>
    **説明**: ノードがリーダーノードかコンピュートノードか。<br>
   - `private_ip_address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `PrivateIPAddress`<br>
    **説明**: クラスター内のノードのプライベート IP アドレス。<br>
   - `public_ip_address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `PublicIPAddress`<br>
    **説明**: クラスター内のノードのパブリック IP アドレス。<br>
## `cluster_parameter_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ClusterParameterGroups`<br>
**説明**: このクラスターに関連するクラスターパラメーターグループのリスト。リスト内の各パラメーターグループはそのステータスと共に返されます。<br>
   - `cluster_parameter_status_list`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `ClusterParameterStatusList`<br>
    **説明**: パラメーターステータスのリスト。 パラメーターとパラメーターグループの詳細については、<i>Amazon Redshift クラスター管理ガイド</i>の <a href="https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-parameter-groups.html">Amazon Redshift Parameter Groups</a> をご覧ください。<br>
       - `parameter_apply_error_description`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ParameterApplyErrorDescription`<br>
        **説明**: パラメーターがデータベースに適用されるのを妨げたエラー。<br>
       - `parameter_apply_status`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `ParameterApplyStatus`<br>
        **説明**: パラメーターがデータベースと同期しているか、クラスターの再起動待ちか、適用中にエラーが発生したかを示す、パラメーターのステータス。考えられるステータスと説明は次のとおりです。 <ul> <li>  <code>in-sync</code>: パラメーター値はデータベースと同期しています。 </li> <li>  <code>pending-reboot</code>: パラメーター値は、クラスターが再起動した後に適用されます。 </li> <li>  <code>applying</code>: パラメーター値はデータベースに適用されています。 </li> <li>  <code>invalid-parameter</code>: パラメーター値は無効な値または構文であるため、適用できません。 </li> <li>  <code>apply-deferred</code>: このパラメーターには、静的なプロパティの変更が含まれます。変更はクラスターが再起動するまで延期されます。 </li> <li>  <code>apply-error</code>: クラスターに接続できません。パラメーターの変更は、クラスターが再起動した後に適用されます。 </li> <li>  <code>unknown-error</code>: パラメーターの変更を今すぐには適用できません。クラスターが再起動した後に変更が適用されます。 </li> </ul>
       - `parameter_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ParameterName`<br>
        **説明**: パラメーターの名前。<br>
   - `parameter_apply_status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `ParameterApplyStatus`<br>
    **Description**: The status of parameter updates.<br>
   - `parameter_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ParameterGroupName`<br>
    **説明**: クラスターパラメーターグループの名前。<br>
## `cluster_public_key`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterPublicKey`<br>
**説明**: クラスターの公開キー。<br>
## `cluster_revision_number`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterRevisionNumber`<br>
**説明**: クラスター内のデータベースの具体的なリビジョン番号。<br>
## `cluster_security_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ClusterSecurityGroups`<br>
**説明**: クラスターに関連するクラスターセキュリティグループのリスト。各セキュリティグループは、<code>ClusterSecurityGroup.Name</code> および <code>ClusterSecurityGroup.Status</code> サブ要素を含む要素によって表されます。 クラスターセキュリティグループは、クラスターが Amazon Virtual Private Cloud (VPC) に作成されていない場合に使用されます。VPC で作成されるクラスターは、<b>VpcSecurityGroups</b> パラメーターによってリストされる VPC セキュリティグループを使用します。<br>
   - `cluster_security_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ClusterSecurityGroupName`<br>
    **説明**: クラスターセキュリティグループの名前。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: クラスターセキュリティグループのステータス。<br>
## `cluster_snapshot_copy_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ClusterSnapshotCopyStatus`<br>
**説明**: クロスリージョンスナップショットコピーに構成されている宛先リージョンと保持期間を返す値。<br>
   - `destination_region`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DestinationRegion`<br>
    **説明**: クロスリージョンスナップショットコピーが有効な場合に、スナップショットが自動的にコピーされる宛先リージョン。<br>
   - `manual_snapshot_retention_period`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `ManualSnapshotRetentionPeriod`<br>
    **説明**: 自動スナップショットがソースリージョンからコピーされた後、宛先リージョンで保持される日数。値が -1 である場合、手動スナップショットは無期限に保持されます。 値は -1 または 1〜3,653 の整数のいずれかである必要があります。<br>
   - `retention_period`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `RetentionPeriod`<br>
    **説明**: 自動化スナップショットがソースリージョンからコピーされた後、宛先リージョンに保持される日数。<br>
   - `snapshot_copy_grant_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SnapshotCopyGrantName`<br>
    **説明**: スナップショットコピーグラントの名前。<br>
## `cluster_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterStatus`<br>
**説明**: クラスターの現在の状態。可能な値は次のとおりです: <ul> <li>  <code>available</code>  </li> <li>  <code>available, prep-for-resize</code>  </li> <li>  <code>available, resize-cleanup</code>  </li> <li>  <code>cancelling-resize</code>  </li> <li>  <code>creating</code>  </li> <li>  <code>deleting</code>  </li> <li>  <code>final-snapshot</code>  </li> <li>  <code>hardware-failure</code>  </li> <li>  <code>incompatible-hsm</code>  </li> <li>  <code>incompatible-network</code>  </li> <li>  <code>incompatible-parameters</code>  </li> <li>  <code>incompatible-restore</code>  </li> <li>  <code>modifying</code>  </li> <li>  <code>paused</code>  </li> <li>  <code>rebooting</code>  </li> <li>  <code>renaming</code>  </li> <li>  <code>resizing</code>  </li> <li>  <code>rotating-keys</code>  </li> <li>  <code>storage-full</code>  </li> <li>  <code>updating-hsm</code>  </li> </ul>
## `cluster_subnet_group_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterSubnetGroupName`<br>
**説明**: クラスターに関連するサブネットグループの名前。このパラメーターは、クラスターが VPC 内にある場合のみ有効です。<br>
## `cluster_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClusterVersion`<br>
**説明**: クラスター上で動作している Amazon Redshift エンジンのバージョン ID。<br>
## `data_transfer_progress`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `DataTransferProgress`<br>
**説明**: <br>
   - `current_rate_in_mega_bytes_per_second`<br>
    **タイプ**: `DOUBLE`<br>
    **プロバイダー名**: `CurrentRateInMegaBytesPerSecond`<br>
    **説明**: データ転送速度を 1 秒あたりの MB 数で記述します。<br>
   - `data_transferred_in_mega_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `DataTransferredInMegaBytes`<br>
    **説明**: 転送されたデータの総量を MB 単位で記述します。<br>
   - `elapsed_time_in_seconds`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `ElapsedTimeInSeconds`<br>
    **説明**: データ転送中に経過した秒数を記述します。<br>
   - `estimated_time_to_completion_in_seconds`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `EstimatedTimeToCompletionInSeconds`<br>
    **説明**: 転送が完了するまでの推定残り秒数を記述します。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: クラスターのステータスを記述します。転送中はステータスが <code>transferringdata</code> となります。<br>
   - `total_data_in_mega_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `TotalDataInMegaBytes`<br>
    **説明**: 転送するデータの総量をメガバイト単位で記述します。<br>
## `db_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBName`<br>
**説明**: クラスター作成時に作成された初期データベースの名前。この同じ名前がクラスターの存続期間中返されます。初期データベースが指定されていない場合、<code>dev</code>dev という名前のデータベースがデフォルトで作成されます。<br>
## `default_iam_role_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DefaultIamRoleArn`<br>
**説明**: クラスターのデフォルトとして設定された IAM ロールの Amazon Resource Name (ARN)。<br>
## `deferred_maintenance_windows`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DeferredMaintenanceWindows`<br>
**説明**: <code>DeferredMaintenanceWindow</code> オブジェクトのグループを記述します。<br>
   - `defer_maintenance_end_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `DeferMaintenanceEndTime`<br>
    **説明**: メンテナンスを延期する期間の終了を示すタイムスタンプ。<br>
   - `defer_maintenance_identifier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DeferMaintenanceIdentifier`<br>
    **説明**: メンテナンスウィンドウの一意の識別子。<br>
   - `defer_maintenance_start_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `DeferMaintenanceStartTime`<br>
    **説明**: メンテナンスを延期する期間の開始を示すタイムスタンプ。<br>
## `elastic_ip_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ElasticIpStatus`<br>
**説明**: エラスティック IP (EIP) アドレスのステータス。<br>
   - `elastic_ip`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticIp`<br>
    **説明**: クラスターのエラスティック IP (EIP) アドレス。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: エラスティック IP (EIP) アドレスのステータス。<br>
## `elastic_resize_number_of_node_options`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ElasticResizeNumberOfNodeOptions`<br>
**説明**: エラスティックリサイズ方式でクラスターをリサイズできるノード数。<br>
## `encrypted`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `Encrypted`<br>
**説明**: クラスター内のデータが静止時に暗号化されていることを示すブール値 (<code>true</code> の場合)。<br>
## `endpoint`
**タイプ**: `STRUCT`<br>
**Provider name**: `Endpoint`<br>
**説明**: 接続のエンドポイント。<br>
   - `address`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Address`<br>
    **説明**: クラスターの DNS アドレス。<br>
   - `port`<br>
    **タイプ**: `INT32`<br>
    **Provider name**: `Port`<br>
    **説明**: データベースエンジンがリッスンしているポート。<br>
   - `vpc_endpoints`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `VpcEndpoints`<br>
    **説明**: 接続エンドポイントを記述します。<br>
       - `network_interfaces`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `NetworkInterfaces`<br>
        **説明**: エンドポイントの 1 つまたは複数のネットワークインターフェイス。インターフェイスエンドポイントともいいます。<br>
           - `availability_zone`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `AvailabilityZone`<br>
            **説明**: アベイラビリティゾーン。<br>
           - `network_interface_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `NetworkInterfaceId`<br>
            **説明**: ネットワークインターフェイスの識別子。<br>
           - `private_ip_address`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `PrivateIpAddress`<br>
            **説明**: サブネット内のネットワークインターフェイスの IPv4 アドレス。<br>
           - `subnet_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `SubnetId`<br>
            **説明**: サブネットの識別子。<br>
       - `vpc_endpoint_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `VpcEndpointId`<br>
        **説明**: プロキシを経由して Amazon Redshift クラスターに接続するための接続エンドポイント ID。<br>
       - `vpc_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `VpcId`<br>
        **説明**: エンドポイントが関連付けられている VPC 識別子。<br>
## `enhanced_vpc_routing`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `EnhancedVpcRouting`<br>
**説明**: 拡張 VPC ルーティングを有効にしてクラスターを作成するかどうかを指定するオプション。拡張 VPC ルーティングを使用するクラスターを作成するには、クラスターが VPC 内にある必要があります。詳細については、Amazon Redshift クラスター管理ガイドの<a href="https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html">拡張 VPC ルーティング</a>を参照してください。このオプションが <code>true</code> の場合、拡張 VPC ルーティングは有効になります。<br>
**デフォルト**: false
## `expected_next_snapshot_schedule_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `ExpectedNextSnapshotScheduleTime`<br>
**説明**: 有効なスナップショットスケジュールとバックアップが有効なクラスターについて、次にスナップショットを取得すると予想される日時。<br>
## `expected_next_snapshot_schedule_time_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ExpectedNextSnapshotScheduleTimeStatus`<br>
**説明**: 有効なスナップショットスケジュールとバックアップを有効にしているクラスターの、次に期待されるスナップショットのステータス。可能な値は次のとおりです: <ul> <li> OnTrack - 次のスナップショットは時間通りに取得される予定です。  </li> <li> Pending - 次のスナップショットの取得が保留されています。  </li> </ul>
## `hsm_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `HsmStatus`<br>
**説明**: Amazon Redshift クラスターが modify cluster コマンドで指定されたハードウェアセキュリティモジュール (HSM) の設定変更の適用を終了したかどうかを報告する値。値: active、applying<br>
   - `hsm_client_certificate_identifier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HsmClientCertificateIdentifier`<br>
    **説明**: Amazon Redshift クラスターが HSM に格納されたデータ暗号キーを取得するために使用する HSM クライアント証明書の名前を指定します。<br>
   - `hsm_configuration_identifier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HsmConfigurationIdentifier`<br>
    **説明**: Amazon Redshift クラスターが HSM でキーを取得し保存するために使用できる情報を含む HSM 構成の名前を指定します。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: Amazon Redshift クラスターが modify cluster コマンドで指定された HSM の設定変更の適用を終了したかどうかを報告します。値: active、applying<br>
## `iam_roles`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `IamRoles`<br>
**説明**: クラスターが他の Amazon Web Services サービスにアクセスするために使用できる Identity and Access Management (IAM) ロールのリスト。<br>
   - `apply_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ApplyStatus`<br>
    **説明**: IAM ロールの Amazon Redshift クラスターとの関連付けのステータスを説明する値。以下は、可能なステータスと説明です。 <ul> <li>  <code>in-sync</code>: クラスターで使用可能なロールです。 </li> <li>  <code>adding</code>: ロールはクラスターに関連付けされている最中です。 </li> <li>  <code>removing</code>: ロールがクラスターから切り離されている最中です。 </li> </ul>
   - `iam_role_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IamRoleArn`<br>
    **説明**: IAM ロールの Amazon Resource Name (ARN)。例: <code>arn:aws:iam::123456789012:role/RedshiftCopyUnload</code><br>
## `kms_key_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KmsKeyId`<br>
**説明**: クラスター内のデータを暗号化するために使用される暗号キーの KMS (Key Management Service) キー ID。<br>
## `maintenance_track_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `MaintenanceTrackName`<br>
**説明**: クラスターのメンテナンストラックの名前。<br>
## `manual_snapshot_retention_period`
**タイプ**: `INT32`<br>
**プロバイダー名**: `ManualSnapshotRetentionPeriod`<br>
**説明**: 手動スナップショットを保持するためのデフォルトの日数。値が -1 である場合、スナップショットは無期限に保持されます。この設定は、既存のスナップショットの保持期間を変更するものではありません。値は -1 または 1～3,653 の整数のいずれかである必要があります。<br>
## `master_username`
**タイプ**: `STRING`<br>
**プロバイダー名**: `MasterUsername`<br>
**説明**: クラスターの管理者ユーザー名。この名前は、<b>DBName</b> パラメーターで指定されたデータベースへの接続に使用されます。<br>
## `modify_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ModifyStatus`<br>
**説明**: クラスターに対して開始された変更操作のステータス (もしあれば)。<br>
## `next_maintenance_window_start_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `NextMaintenanceWindowStartTime`<br>
**説明**: システムメンテナンスを開始できる日時 (UTC)。<br>
## `node_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `NodeType`<br>
**説明**: クラスター内のノードのノードタイプ。<br>
## `number_of_nodes`
**タイプ**: `INT32`<br>
**プロバイダー名**: `NumberOfNodes`<br>
**説明**: クラスター内のコンピュートノードの数。<br>
## `parameters`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Parameters`<br>
**説明**: Parameter インスタンスのリスト。各インスタンスには、1 つのクラスターパラメーターグループのパラメーターが一覧表示されます。<br>
   - `allowed_values`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AllowedValues`<br>
    **説明**: パラメーターの有効な値の範囲。<br>
   - `apply_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ApplyType`<br>
    **説明**: WLM 構成パラメーターを適用する方法を指定します。いくつかのプロパティは動的に適用することができますが、他のプロパティは構成変更を適用するために関連するすべてのクラスターを再起動する必要があります。パラメーターとパラメーターグループの詳細については、<i>Amazon Redshift クラスター管理ガイド</i>の <a href="https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-parameter-groups.html">Amazon Redshift Parameter Groups</a> を参照してください。<br>
   - `data_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DataType`<br>
    **説明**: パラメーターのデータタイプ。<br>
   - `description`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Description`<br>
    **説明**: パラメーターの説明。<br>
   - `is_modifiable`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IsModifiable`<br>
    **説明**: true の場合、そのパラメーターを変更することができます。一部のパラメーターは、セキュリティやオペレーションの関係で変更できないものもあります。<br>
   - `minimum_engine_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `MinimumEngineVersion`<br>
    **説明**: このパラメーターが適用できる最も古いエンジンバージョン。<br>
   - `parameter_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ParameterName`<br>
    **説明**: パラメーターの名前。<br>
   - `parameter_value`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ParameterValue`<br>
    **説明**: パラメーターの値。<code>ParameterName</code> が <code>wlm_json_configuration</code> の場合、<code>ParameterValue</code> の最大サイズは 8000 文字となります。<br>
## `pending_actions`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `PendingActions`<br>
**説明**: 開始を待っているクラスター操作。<br>
## `pending_modified_values`
**タイプ**: `STRUCT`<br>
**Provider name**: `PendingModifiedValues`<br>
**説明**: クラスターへの変更が保留されていることを示す値。保留中の特定の変更はサブ要素で識別されます。<br>
   - `automated_snapshot_retention_period`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `AutomatedSnapshotRetentionPeriod`<br>
    **説明**: 自動スナップショット保持期間の保留または変更中であること。<br>
   - `cluster_identifier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ClusterIdentifier`<br>
    **説明**: クラスターの新しい識別子の保留または変更中であること。<br>
   - `cluster_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ClusterType`<br>
    **説明**: クラスタータイプの保留または変更中であること。<br>
   - `cluster_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ClusterVersion`<br>
    **説明**: サービスバージョンの保留または変更中であること。<br>
   - `encryption_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `EncryptionType`<br>
    **説明**: クラスターの暗号化タイプ。可能な値は、KMS および None です。<br>
   - `enhanced_vpc_routing`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `EnhancedVpcRouting`<br>
    **説明**: 拡張 VPC ルーティングを有効にしてクラスターを作成するかどうかを指定するオプション。拡張 VPC ルーティングを使用するクラスターを作成するには、クラスターが VPC 内にある必要があります。詳細については、Amazon Redshift クラスター管理ガイドの<a href="https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html">拡張 VPC ルーティング</a>を参照してください。このオプションが <code>true</code> の場合、拡張 VPC ルーティングは有効になります。<br>
    **デフォルト**: false
   - `maintenance_track_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `MaintenanceTrackName`<br>
    **説明**: 次のメンテナンスウィンドウでクラスターが変更されるメンテナンス追跡の名前。<br>
   - `master_user_password`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `MasterUserPassword`<br>
    **説明**: クラスターの管理者ユーザーパスワードの保留または変更中であること。<br>
   - `node_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `NodeType`<br>
    **説明**: クラスターのノードタイプの保留または変更中であること。<br>
   - `number_of_nodes`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `NumberOfNodes`<br>
    **説明**: クラスター内のノード数の保留または変更中であること。<br>
   - `publicly_accessible`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `PubliclyAccessible`<br>
    **説明**: パブリックネットワークからクラスターに接続する機能の保留または変更中であること。<br>
## `preferred_maintenance_window`
**タイプ**: `STRING`<br>
**Provider name**: `PreferredMaintenanceWindow`<br>
**説明**: システムメンテナンスが可能な週単位の時間帯 (協定世界時)。<br>
## `publicly_accessible`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `PubliclyAccessible`<br>
**説明**: <code>true</code> の場合、クラスターがパブリックネットワークからアクセス可能であることを示すブール値。<br>
## `redshift_cluster_arn`
**タイプ**: `STRING`<br>
## `reserved_node_exchange_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ReservedNodeExchangeStatus`<br>
**説明**: 予約ノードの交換要求のステータス。ステータスは in-progress と requested があります。<br>
   - `request_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `RequestTime`<br>
    **説明**: 予約ノード交換がリクエストされた日時。<br>
   - `reserved_node_exchange_request_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ReservedNodeExchangeRequestId`<br>
    **説明**: 予約ノード交換リクエストの識別子。<br>
   - `source_reserved_node_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `SourceReservedNodeCount`<br>
    **説明**: クラスター内のソース予約ノード数。<br>
   - `source_reserved_node_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SourceReservedNodeId`<br>
    **説明**: ソース予約ノードの識別子。<br>
   - `source_reserved_node_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SourceReservedNodeType`<br>
    **説明**: ソース予約ノードタイプ (例: ds2.xlarge)。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: 予約ノードの交換要求のステータス。ステータスは in-progress と requested があります。<br>
   - `target_reserved_node_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `TargetReservedNodeCount`<br>
    **説明**: クラスター内のターゲット予約ノード数。<br>
   - `target_reserved_node_offering_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TargetReservedNodeOfferingId`<br>
    **説明**: ターゲット予約ノード製品の識別子。<br>
   - `target_reserved_node_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TargetReservedNodeType`<br>
    **説明**: ターゲット予約ノードのノードタイプ (例: ra3.4xlarge)。<br>
## `resize_info`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ResizeInfo`<br>
**説明**: 以下を返します: <ul> <li> AllowCancelResize: リサイズ操作を取り消すことができるかどうかを示すブール値。 </li> <li> ResizeType: ClassicResize を返します </li> </ul>
   - `allow_cancel_resize`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `AllowCancelResize`<br>
    **説明**: リサイズ操作を取り消すことができるかどうかを示すブール値。<br>
   - `resize_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ResizeType`<br>
    **説明**: 値 <code>ClassicResize</code> を返します。<br>
## `restore_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `RestoreStatus`<br>
**説明**: クラスターのリストアアアクションのステータスを表す値。このパラメーターは、スナップショットのリストアによってクラスターが作成されなかった場合、NULL を返します。<br>
   - `current_restore_rate_in_mega_bytes_per_second`<br>
    **タイプ**: `DOUBLE`<br>
    **プロバイダー名**: `CurrentRestoreRateInMegaBytesPerSecond`<br>
    **説明**: バックアップストレージから転送される 1 秒あたりのメガバイト数。バックアップが完了したときの平均レートを返します。このフィールドは、DC2 および DS2 ノードタイプにリストアするときのみ更新されます。<br>
   - `elapsed_time_in_seconds`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `ElapsedTimeInSeconds`<br>
    **説明**: 進行中のリストアが実行されている時間、または完了したリストアが終了するまでに要した時間。このフィールドは、DC2 および DS2 ノードタイプにリストアする場合にのみ更新されます。<br>
   - `estimated_time_to_completion_in_seconds`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `EstimatedTimeToCompletionInSeconds`<br>
    **説明**: リストアが完了するまでの残り時間の推定値。リストアが完了した場合は 0 を返します。このフィールドは、DC2 および DS2 ノードタイプにリストアする場合にのみ更新されます。<br>
   - `progress_in_mega_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `ProgressInMegaBytes`<br>
    **説明**: スナップショットストレージから転送されたメガバイト数。このフィールドは、DC2 および DS2 ノードタイプにリストアするときのみ更新されます。<br>
   - `snapshot_size_in_mega_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `SnapshotSizeInMegaBytes`<br>
    **説明**: クラスターの復元に使用されるスナップショットデータのセットのサイズ。このフィールドは、DC2 および DS2 ノードタイプにリストアする場合にのみ更新されます。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: リストアアクションのステータス。開始、リストア中、完了、失敗のいずれかを返します。<br>
## `snapshot_schedule_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnapshotScheduleIdentifier`<br>
**説明**: クラスターのスナップショットスケジュールの一意の識別子。<br>
## `snapshot_schedule_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnapshotScheduleState`<br>
**説明**: クラスターのスナップショットスケジュールの現在の状態。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `total_storage_capacity_in_mega_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `TotalStorageCapacityInMegaBytes`<br>
**説明**: クラスターの総ストレージ容量 (メガバイト単位)。<br>
## `vpc_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `VpcId`<br>
**説明**: クラスターが VPC に所属している場合、その VPC の識別子。<br>
## `vpc_security_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `VpcSecurityGroups`<br>
**説明**: クラスターに関連する Amazon Virtual Private Cloud (Amazon VPC) のセキュリティグループのリスト。このパラメーターは、クラスターが VPC 内にある場合のみ返されます。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: VPC セキュリティグループのステータス。<br>
   - `vpc_security_group_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `VpcSecurityGroupId`<br>
    **説明**: VPC セキュリティグループの識別子。<br>