---
dependencies: []
disable_edit: true
---
# aws_rds_instance

## `account_id`
**タイプ**: `STRING`<br>
## `activity_stream_engine_native_audit_fields_included`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `ActivityStreamEngineNativeAuditFieldsIncluded`<br>
**説明**: エンジンネイティブな監査フィールドがデータベースアクティビティストリームに含まれるかどうかを示します。<br>
## `activity_stream_kinesis_stream_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ActivityStreamKinesisStreamName`<br>
**説明**: データベースアクティビティストリームに使用される Amazon Kinesis データストリームの名前。<br>
## `activity_stream_kms_key_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ActivityStreamKmsKeyId`<br>
**説明**: データベースアクティビティストリームでメッセージを暗号化するために使用される Amazon Web Services KMS キー識別子。Amazon Web Services KMS キー識別子は、KMS キーのキー ARN、キー ID、エイリアス ARN、またはエイリアス名です。<br>
## `activity_stream_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ActivityStreamMode`<br>
**説明**: データベースアクティビティストリームのモード。変更またはアクセスなどのデータベースイベントは、アクティビティストリームイベントを生成します。RDS for Oracle は常にこれらのイベントを非同期で処理します。<br>
## `activity_stream_policy_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ActivityStreamPolicyStatus`<br>
**説明**: アクティビティストリームにおけるポリシーのステータス。<br>
## `activity_stream_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ActivityStreamStatus`<br>
**説明**: データベースアクティビティストリームのステータス。<br>
## `allocated_storage`
**タイプ**: `INT32`<br>
**プロバイダー名**: `AllocatedStorage`<br>
**説明**: ジビバイト (GiB) 単位で指定されたストレージの割り当てサイズを指定します。<br>
## `associated_roles`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `AssociatedRoles`<br>
**説明**: DB インスタンスに関連する Amazon Web Services Identity and Access Management (IAM) ロール。<br>
   - `feature_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `FeatureName`<br>
    **説明**: Amazon Web Services Identity and Access Management (IAM) ロールに関連付けられた機能の名前。サポートされる機能名については、<code>DBEngineVersion</code> を参照してください。<br>
   - `role_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RoleArn`<br>
    **説明**: DB インスタンスに関連する IAM ロールの Amazon Resource Name (ARN)。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: IAM ロールと DB インスタンス間の関連付けの状態を記述します。Status プロパティは次の値のいずれかを返します: <ul> <li>  <code>ACTIVE</code> - IAM ロール ARN は DB インスタンスに関連付けられ、お客様に代わって他の Amazon Web Services サービスにアクセスするために使用することができます。 </li> <li>  <code>PENDING</code> - IAM ロール ARN が DB インスタンスと関連付けられています。 </li> <li>  <code>INVALID</code> - IAM ロール ARN は DB インスタンスに関連付けられますが、お客様に代わって他の Amazon Web Services サービスにアクセスするために、DB インスタンスは IAM ロールを引き受けることができません。 </li> </ul>
## `auto_minor_version_upgrade`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `AutoMinorVersionUpgrade`<br>
**説明**: マイナーバージョンパッチが自動的に適用されることを示す値。<br>
## `automatic_restart_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `AutomaticRestartTime`<br>
**説明**: 停止した DB インスタンスを自動的に再起動させる時間。<br>
## `automation_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `AutomationMode`<br>
**説明**: RDS カスタム DB インスタンスの自動化モード: <code>full</code> または <code>all paused</code>。<code>full</code> の場合、DB インスタンスは監視とインスタンス回復を自動化します。<code>all paused</code> の場合、インスタンスは <code>--resume-full-automation-mode-minutes</code> で設定した時間だけ自動化を停止します。<br>
## `availability_zone`
**タイプ**: `STRING`<br>
**Provider name**: `AvailabilityZone`<br>
**説明**: DB インスタンスが位置するアベイラビリティゾーンの名前を指定します。<br>
## `aws_backup_recovery_point_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `AwsBackupRecoveryPointArn`<br>
**説明**: Amazon Web Services Backup におけるリカバリーポイントの Amazon Resource Name (ARN)。<br>
## `backup_retention_period`
**タイプ**: `INT32`<br>
**プロバイダー名**: `BackupRetentionPeriod`<br>
**説明**: DB の自動スナップショットを保持する日数を指定します。<br>
## `backup_target`
**タイプ**: `STRING`<br>
**プロバイダー名**: `BackupTarget`<br>
**説明**: 自動バックアップと手動スナップショットの保存先を指定します。Amazon Web Services Outposts または Amazon Web Services Region です。<br>
## `ca_certificate_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CACertificateIdentifier`<br>
**説明**: この DB インスタンスの CA 証明書の識別子。<br>
## `character_set_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CharacterSetName`<br>
**説明**: 存在する場合、このインスタンスが関連する文字セットの名前を指定します。<br>
## `copy_tags_to_snapshot`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `CopyTagsToSnapshot`<br>
**説明**: DB インスタンスから DB インスタンスのスナップショットへタグをコピーするかどうかを指定します。  <b>Amazon Aurora</b>  該当なし。スナップショットへのタグのコピーは、DB クラスターによって管理されます。Aurora DB インスタンスにこの値を設定しても、DB クラスターの設定には影響しません。詳細については、<code>DBCluster</code> を参照してください。<br>
## `custom_iam_instance_profile`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CustomIamInstanceProfile`<br>
**説明**: RDS カスタム DB インスタンスの基礎となる Amazon EC2 インスタンスに関連付けられたインスタンスプロファイル。インスタンスプロファイルは、次の要件を満たしている必要があります。 <ul> <li> プロファイルは、お使いのアカウントに存在する必要があります。 </li> <li> プロファイルは、Amazon EC2 が引き受ける権限を持つ IAM ロールを持つ必要があります。 </li> <li> インスタンスプロファイル名と関連する IAM ロール名は、プレフィックス <code>AWSRDSCustom</code> で始まる必要があります。 </li> </ul> <p>IAM ロールに必要な権限の一覧は、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-setup-orcl.html#custom-setup-orcl.iam-vpc">IAM と VPC の構成</a>を参照してください。</p>
## `customer_owned_ip_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `CustomerOwnedIpEnabled`<br>
**説明**: RDS on Outposts DB インスタンスで顧客所有の IP アドレス (CoIP) を有効化するかどうかを指定します。<i>CoIP</i> は、オンプレミスネットワークを通じて Outpost サブネット内のリソースへのローカルまたは外部接続を提供します。一部のユースケースでは、CoIP を使用すると、ローカルネットワーク上の仮想プライベートクラウド (VPC) の外部から DB インスタンスへの接続のレイテンシーを低くすることができます。RDS on Outposts の詳細については、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-on-outposts.html">Amazon Web Services Outposts で Amazon RDS を使用する</a>を参照してください。CoIP の詳細については、<i>Amazon Web Services Outposts ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/outposts/latest/userguide/outposts-networking-components.html#ip-addressing">顧客所有の IP アドレス</a>を参照してください。<br>
## `db_cluster_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBClusterIdentifier`<br>
**説明**: DB インスタンスが DB クラスターのメンバーである場合、DB インスタンスがメンバーである DB クラスターの名前を含みます。<br>
## `db_instance_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBInstanceArn`<br>
**説明**: DB インスタンスの ARN (Amazon Resource Name)。<br>
## `db_instance_automated_backups_replications`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DBInstanceAutomatedBackupsReplications`<br>
**説明**: DB インスタンスに関連付けられた複製された自動バックアップのリスト。<br>
   - `db_instance_automated_backups_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBInstanceAutomatedBackupsArn`<br>
    **説明**: 複製された自動バックアップの Amazon Resource Name (ARN)。<br>
## `db_instance_class`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBInstanceClass`<br>
**説明**: DB インスタンスのコンピュートおよびメモリ容量クラスの名前が格納されています。<br>
## `db_instance_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBInstanceIdentifier`<br>
**説明**: ユーザーが提供するデータベース識別子をコンテナで格納します。この識別子は、DB インスタンスを識別するための一意のキーです。<br>
## `db_instance_port`
**タイプ**: `INT32`<br>
**プロバイダー名**: `DbInstancePort`<br>
**説明**: DB インスタンスがリッスンするポートを指定します。DB インスタンスが DB クラスターの一部である場合、DB クラスターのポートとは異なるポートにすることができます。<br>
## `db_instance_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DBInstanceStatus`<br>
**説明**: このデータベースの現在の状態を指定します。DB インスタンスのステータスについては、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/accessing-monitoring.html#Overview.DBInstance.Status">DB インスタンスのステータスを表示する</a>を参照してください。<br>
## `db_name`
**タイプ**: `STRING`<br>
**Provider name**: `DBName`<br>
**説明**: このパラメーターの意味は、使用するデータベースエンジンによって異なります。  <b>MySQL、MariaDB、SQL Server、PostgreSQL</b>  DB インスタンスの作成時に指定された場合、このインスタンスの初期データベースの名前が格納されます。DB インスタンスの存続期間中、この同じ名前が返されます。タイプ: 文字列  <b>Oracle</b>  作成された DB インスタンスの Oracle System ID (SID) をコンテナで格納します。返されたパラメーターが Oracle DB インスタンスに適用されない場合、表示されません。<br>
## `db_parameter_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DBParameterGroups`<br>
**説明**: この DB インスタンスに適用される DB パラメーターグループのリストを提供します。<br>
   - `db_parameter_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBParameterGroupName`<br>
    **説明**: DB パラメーターグループの名前。<br>
   - `parameter_apply_status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `ParameterApplyStatus`<br>
    **Description**: The status of parameter updates.<br>
## `db_security_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DBSecurityGroups`<br>
**説明**: <code>DBSecurityGroup.Name</code> と <code>DBSecurityGroup.Status</code> のサブ要素を含む DB セキュリティグループ要素のリスト。<br>
   - `db_security_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBSecurityGroupName`<br>
    **説明**: DB セキュリティグループの名前。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: DB セキュリティグループのステータス。<br>
## `db_subnet_group`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `DBSubnetGroup`<br>
**説明**: DB インスタンスに関連するサブネットグループの情報 (名前、説明、サブネットグループ内のサブネットなど) を指定します。<br>
   - `db_subnet_group_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBSubnetGroupArn`<br>
    **説明**: DB サブネットグループの ARN (Amazon Resource Name)。<br>
   - `db_subnet_group_description`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBSubnetGroupDescription`<br>
    **説明**: DB サブネットグループの説明を提供します。<br>
   - `db_subnet_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBSubnetGroupName`<br>
    **説明**: DB サブネットグループの名前。<br>
   - `subnet_group_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SubnetGroupStatus`<br>
    **説明**: DB サブネットグループのステータスを提供します。<br>
   - `subnets`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Subnets`<br>
    **説明**: <code>Subnet</code> 要素のリストが含まれています。<br>
       - `subnet_availability_zone`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `SubnetAvailabilityZone`<br>
           - `name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Name`<br>
            **説明**: アベイラビリティゾーンの名前。<br>
       - `subnet_identifier`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `SubnetIdentifier`<br>
        **説明**: サブネットの識別子。<br>
       - `subnet_outpost`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `SubnetOutpost`<br>
        **説明**: サブネットが Outpost と関連付けられている場合、この値は Outpost を指定します。RDS on Outposts の詳細については、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-on-outposts.html">Amazon RDS on Amazon Web Services Outposts</a> を参照してください。<br>
           - `arn`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `Arn`<br>
            **説明**: Outpost の Amazon Resource Name (ARN)。<br>
       - `subnet_status`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `SubnetStatus`<br>
        **説明**: サブネットのステータス。<br>
   - `supported_network_types`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `SupportedNetworkTypes`<br>
    **説明**: DB サブネットグループのネットワークタイプ。有効な値は次のとおりです: <ul> <li>  <code>IPV4</code>  </li> <li>  <code>DUAL</code>  </li> </ul> <code>DBSubnetGroup</code> は、IPv4 プロトコルのみ、または IPv4 と IPv6 プロトコル (<code>DUAL</code>) をサポートすることができます。詳細については、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html">VPC 内の DB インスタンスでの作業</a>を参照してください。<br>
   - `vpc_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `VpcId`<br>
    **説明**: DB サブネットグループの VpcId を提供します。<br>
## `dbi_resource_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DbiResourceId`<br>
**説明**: DB インスタンスの Amazon Web Services リージョン固有の不変の識別子。この識別子は、DB インスタンスの Amazon Web Services KMS キーにアクセスするたびに、Amazon Web Services CloudTrail のログエントリで見つかります。<br>
## `deletion_protection`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `DeletionProtection`<br>
**説明**: DB インスタンスが削除保護を有効にしているかどうかを示します。削除保護が有効な場合、データベースを削除することはできません。詳細については、<a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteInstance.html">DB インスタンスの削除</a>を参照してください。<br>
## `domain_memberships`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `DomainMemberships`<br>
**説明**: DB インスタンスに関連する Active Directory ドメインメンバーシップのレコード。<br>
   - `domain`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Domain`<br>
    **説明**: Active Directory ドメインの識別子。<br>
   - `fqdn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `FQDN`<br>
    **説明**: Active Directory ドメインの完全修飾ドメイン名。<br>
   - `iam_role_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IAMRoleName`<br>
    **説明**: Directory Service への API コールを行う際に使用される IAM ロールの名前。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: DB インスタンスまたはクラスターの Active Directory ドメインメンバーシップのステータス。値には、joined、pending-join、failed などがあります。<br>
## `enabled_cloudwatch_logs_exports`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `EnabledCloudwatchLogsExports`<br>
**説明**: この DB インスタンスが CloudWatch Logs にエクスポートするよう構成されているログタイプのリスト。ログタイプは DB エンジンによって異なります。各 DB エンジンのログタイプについては、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.html">Amazon RDS データベースのログファイル</a>を参照してください。<br>
## `endpoint`
**タイプ**: `STRUCT`<br>
**Provider name**: `Endpoint`<br>
**説明**: 接続のエンドポイントを指定します。 <note> ステータスが <code>creating</code> のインスタンスにはエンドポイントが表示されない場合があります。 </note><br>
   - `address`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Address`<br>
    **説明**: DB インスタンスの DNS アドレスを指定します。<br>
   - `hosted_zone_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HostedZoneId`<br>
    **説明**: ホストゾーンを作成する際に Amazon Route 53 が割り当てる ID を指定します。<br>
   - `port`<br>
    **タイプ**: `INT32`<br>
    **Provider name**: `Port`<br>
    **説明**: データベースエンジンがリッスンしているポートを指定します。<br>
## `engine`
**タイプ**: `STRING`<br>
**Provider name**: `Engine`<br>
**説明**: この DB インスタンスで使用するデータベースエンジンの名前。<br>
## `engine_version`
**タイプ**: `STRING`<br>
**Provider name**: `EngineVersion`<br>
**説明**: データベースエンジンのバージョンを示します。<br>
## `enhanced_monitoring_resource_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `EnhancedMonitoringResourceArn`<br>
**説明**: DB インスタンスの拡張モニタリングメトリクスデータを受信する Amazon CloudWatch Logs ログストリームの Amazon Resource Name (ARN)。<br>
## `iam_database_authentication_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IAMDatabaseAuthenticationEnabled`<br>
**説明**: Amazon Web Services Identity and Access Management (IAM) アカウントのデータベースアカウントへのマッピングが有効な場合は true、そうでない場合は false となります。IAM データベース認証は、以下のデータベースエンジンで有効にすることができます。 <ul> <li> MySQL 5.6 の場合、マイナーバージョン 5.6.34 以降 </li> <li> MySQL 5.7 の場合、マイナーバージョン 5.7.16 以降 </li> <li> Aurora 5.6 以降。Aurora の IAM データベース認証を有効にするには、DBCluster の種類を参照してください。 </li> </ul>
## `instance_create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `InstanceCreateTime`<br>
**説明**: DB インスタンスが作成された日時を提供します。<br>
## `iops`
**タイプ**: `INT32`<br>
**プロバイダー名**: `Iops`<br>
**説明**: Provisioned IOPS (I/O オペレーション/秒) の値を指定します。<br>
## `kms_key_id`
**タイプ**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**説明**: <code>StorageEncrypted</code> が true の場合、暗号化された DB インスタンスの Amazon Web Services KMS キー識別子。Amazon Web Services KMS キー識別子は、KMS キーのキー ARN、キー ID、エイリアス ARN、またはエイリアス名です。<br>
## `latest_restorable_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `LatestRestorableTime`<br>
**説明**: ポイントインタイムリストアでデータベースをリストアできる最新の時刻を指定します。<br>
## `license_model`
**タイプ**: `STRING`<br>
**プロバイダー名**: `LicenseModel`<br>
**説明**: この DB インスタンスのライセンスモデル情報。この設定は RDS カスタムには適用されません。<br>
## `listener_endpoint`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ListenerEndpoint`<br>
**説明**: SQL Server Always On のリスナー接続エンドポイントを指定します。<br>
   - `address`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Address`<br>
    **説明**: DB インスタンスの DNS アドレスを指定します。<br>
   - `hosted_zone_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HostedZoneId`<br>
    **説明**: ホストゾーンを作成する際に Amazon Route 53 が割り当てる ID を指定します。<br>
   - `port`<br>
    **タイプ**: `INT32`<br>
    **Provider name**: `Port`<br>
    **説明**: データベースエンジンがリッスンしているポートを指定します。<br>
## `master_username`
**タイプ**: `STRING`<br>
**Provider name**: `MasterUsername`<br>
**説明**: DB インスタンスのマスターユーザー名がコンテナで格納されています。<br>
## `max_allocated_storage`
**タイプ**: `INT32`<br>
**プロバイダー名**: `MaxAllocatedStorage`<br>
**説明**: Amazon RDS が DB インスタンスのストレージを自動的に拡張できる上限値 (ジビバイト (GiB) 単位)。<br>
## `monitoring_interval`
**タイプ**: `INT32`<br>
**プロバイダー名**: `MonitoringInterval`<br>
**説明**: DB インスタンスの拡張モニタリングメトリクスを収集するポイント間の間隔 (秒単位)。<br>
## `monitoring_role_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `MonitoringRoleArn`<br>
**説明**: RDS が Amazon CloudWatch Logs に拡張モニタリングメトリクスを送信することを許可する IAM ロールの ARN。<br>
## `multi_az`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `MultiAZ`<br>
**説明**: DB インスタンスが Multi-AZ デプロイメントであるかどうかを指定します。この設定は、RDS カスタムには適用されません。<br>
## `nchar_character_set_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `NcharCharacterSetName`<br>
**説明**: Oracle DB インスタンスの NCHAR 文字セットの名前。この文字セットは、NCHAR、NCLOB、または NVARCHAR2 タイプのテーブル列に格納されるデータの Unicode エンコーディングを指定します。<br>
## `network_type`
**タイプ**: `STRING`<br>
**Provider name**: `NetworkType`<br>
**説明**: DB インスタンスのネットワークタイプ。有効な値は次のとおりです: <ul> <li>  <code>IPV4</code>  </li> <li>  <code>DUAL</code>  </li> </ul> <p>ネットワークの種類は、DB インスタンスに指定された <code>DBSubnetGroup</code> によって決定されます。<code>DBSubnetGroup</code> は、IPv4 プロトコルのみ、または IPv4 と IPv6 プロトコル (<code>DUAL</code>) をサポートすることができます。詳細については、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html">VPC 内の DB インスタンスでの作業</a>、および <i>Amazon Aurora ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html">VPC 内の DB インスタンスでの作業</a>を参照してください。</p>
## `option_group_memberships`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `OptionGroupMemberships`<br>
**説明**: この DB インスタンスのオプショングループのメンバーシップのリストを提供します。<br>
   - `option_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `OptionGroupName`<br>
    **説明**: インスタンスが所属するオプショングループの名前。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: DB インスタンスのオプショングループのメンバーシップのステータス。有効な値は次のとおりです: <code>in-sync</code>、<code>pending-apply</code>、<code>pending-removal</code>、<code>pending-maintenance-apply</code>、<code>pending-maintenance-removal</code>、<code>applying</code>、<code>removing</code>、<code>failed</code><br>
## `pending_modified_values`
**タイプ**: `STRUCT`<br>
**Provider name**: `PendingModifiedValues`<br>
**説明**: DB インスタンスへの変更が保留されていることを指定する値。この要素は、変更が保留されている場合にのみ含まれます。特定の変更はサブ要素で識別されます。<br>
   - `allocated_storage`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `AllocatedStorage`<br>
    **説明**: DB インスタンスに割り当てられたストレージのサイズ (ジビバイト (GiB) 単位)。<br>
   - `automation_mode`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AutomationMode`<br>
    **説明**: RDS カスタム DB インスタンスの自動化モード: <code>full</code> または <code>all-paused</code>。<code>full</code> の場合、DB インスタンスは監視とインスタンス回復を自動化します。<code>all paused</code> の場合、インスタンスは <code>--resume-full-automation-mode-minutes</code> で設定した時間だけ自動化を停止します。<br>
   - `backup_retention_period`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `BackupRetentionPeriod`<br>
    **説明**: 自動バックアップを保持する日数。<br>
   - `ca_certificate_identifier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CACertificateIdentifier`<br>
    **説明**: DB インスタンスの CA 証明書の識別子。<br>
   - `db_instance_class`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBInstanceClass`<br>
    **説明**: DB インスタンスのコンピュートおよびメモリ容量クラスの名前。<br>
   - `db_instance_identifier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBInstanceIdentifier`<br>
    **説明**: DB インスタンスのデータベース識別子。<br>
   - `db_subnet_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DBSubnetGroupName`<br>
    **説明**: DB インスタンスの DB サブネットグループ。<br>
   - `engine_version`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `EngineVersion`<br>
    **説明**: データベースエンジンのバージョン。<br>
   - `iam_database_authentication_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IAMDatabaseAuthenticationEnabled`<br>
    **説明**: Amazon Web Services Identity and Access Management (IAM) アカウントのデータベースアカウントへのマッピングが有効かどうか。<br>
   - `iops`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Iops`<br>
    **説明**: DB インスタンスの Provisioned IOPS の値。<br>
   - `license_model`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LicenseModel`<br>
    **説明**: DB インスタンスのライセンスモデル。有効な値は次のとおりです: <code>license-included</code> | <code>bring-your-own-license</code> | <code>general-public-license</code><br>
   - `master_user_password`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `MasterUserPassword`<br>
    **説明**: DB インスタンスのマスター資格情報。<br>
   - `multi_az`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `MultiAZ`<br>
    **説明**: Single-AZ DB インスタンスが Multi-AZ デプロイメントに変更されることを示す値。<br>
   - `pending_cloudwatch_logs_exports`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `PendingCloudwatchLogsExports`<br>
       - `log_types_to_disable`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `LogTypesToDisable`<br>
        **説明**: 有効化途中のログタイプ。有効化された後、これらのログタイプは CloudWatch Logs にエクスポートされます。<br>
       - `log_types_to_enable`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `LogTypesToEnable`<br>
        **説明**: 無効化途中のログタイプ。無効化された後、これらのログタイプは CloudWatch Logs にエクスポートされません。<br>
   - `port`<br>
    **タイプ**: `INT32`<br>
    **Provider name**: `Port`<br>
    **説明**: DB インスタンスのポート。<br>
   - `processor_features`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `ProcessorFeatures`<br>
    **説明**: DB インスタンスの DB インスタンスクラスの CPU コア数およびコアあたりのスレッド数。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Name`<br>
        **説明**: プロセッサ機能の名前。有効な名前は <code>coreCount</code> および <code>threadsPerCore</code> です。<br>
       - `value`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Value`<br>
        **説明**: プロセッサーの機能名の値。<br>
   - `resume_full_automation_mode_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `ResumeFullAutomationModeTime`<br>
    **説明**: 自動化を一時停止する時間 (分)。この時間が終了すると、RDS カスタムは完全な自動化を再開します。最小値は 60 (デフォルト)。最大値は 1,440 です。<br>
   - `storage_throughput`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `StorageThroughput`<br>
    **説明**: DB インスタンスのストレージスループット。<br>
   - `storage_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `StorageType`<br>
    **説明**: DB インスタンスのストレージタイプ。<br>
## `performance_insights_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `PerformanceInsightsEnabled`<br>
**説明**: DB インスタンスで Performance Insights が有効な場合は true、そうでない場合は false になります。<br>
## `performance_insights_kms_key_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PerformanceInsightsKMSKeyId`<br>
**説明**: Performance Insights のデータを暗号化するための Amazon Web Services KMS キー識別子。Amazon Web Services KMS キー識別子は、KMS キーのキー ARN、キー ID、エイリアス ARN、またはエイリアス名です。<br>
## `performance_insights_retention_period`
**タイプ**: `INT32`<br>
**プロバイダー名**: `PerformanceInsightsRetentionPeriod`<br>
**説明**: Performance Insights のデータを保持する日数。デフォルトは 7 日間です。次の値が有効です: <ul> <li> 7 </li> <li>  <i>month</i> * 31: <i>month</i> は 1～23 の月数です </li> <li> 731 </li> </ul> <p>例えば、次のような値が有効です:</p> <ul> <li> 93 (3 months * 31) </li> <li> 341 (11 months * 31) </li> <li> 589 (19 months * 31) </li> <li> 731 </li> </ul>
## `preferred_backup_window`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PreferredBackupWindow`<br>
**説明**: 自動バックアップが有効な場合に、<code>BackupRetentionPeriod</code> によって決定される、自動バックアップが作成される毎日の時間範囲を指定します。<br>
## `preferred_maintenance_window`
**タイプ**: `STRING`<br>
**Provider name**: `PreferredMaintenanceWindow`<br>
**説明**: システムメンテナンスが可能な週単位の時間帯を、協定世界時 (UTC) で指定します。<br>
## `processor_features`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ProcessorFeatures`<br>
**説明**: DB インスタンスの DB インスタンスクラスの CPU コア数およびコアあたりのスレッド数。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Name`<br>
    **説明**: プロセッサ機能の名前。有効な名前は <code>coreCount</code> および <code>threadsPerCore</code> です。<br>
   - `value`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Value`<br>
    **説明**: プロセッサーの機能名の値。<br>
## `promotion_tier`
**タイプ**: `INT32`<br>
**プロバイダー名**: `PromotionTier`<br>
**説明**: 既存のプライマリインスタンスに障害が発生した後、Aurora Replica がプライマリインスタンスに昇格する順序を指定する値。詳細については、<i>Amazon Aurora ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.FaultTolerance">Aurora DB クラスターのフォールトトレランス</a>を参照してください。<br>
## `publicly_accessible`
**タイプ**: `BOOLEAN`<br>
**Provider name**: `PubliclyAccessible`<br>
**説明**: DB インスタンスのアクセシビリティオプションを指定します。DB クラスターがパブリックアクセス可能な場合、その DNS (Domain Name System) エンドポイントは、DB クラスターの仮想プライベートクラウド (VPC) 内からはプライベート IP アドレスに解決されます。DB クラスターの VPC の外からはパブリック IP アドレスに解決されます。DB クラスターへのアクセスは、最終的に使用するセキュリティグループによって制御されます。DB クラスターに割り当てられたセキュリティグループが許可しない場合、そのパブリックアクセスは許可されません。DB インスタンスが一般的にアクセスできない場合、それはプライベート IP アドレスに解決される DNS 名を持つ内部 DB インスタンスになります。詳細については、CreateDBInstance を参照してください。<br>
## `read_replica_db_cluster_identifiers`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `ReadReplicaDBClusterIdentifiers`<br>
**説明**: RDS DB インスタンスがリードレプリカとして複製される Aurora DB クラスターの 1 つ以上の識別子が含まれています。例えば、RDS for MySQL DB インスタンスの Aurora リードレプリカを作成すると、Aurora リードレプリカの Aurora MySQL DB クラスターが表示されます。この出力には、リージョンをまたがる Aurora リードレプリカの情報は含まれていません。 <note> 現在、各 RDS DB インスタンスは 1 つの Aurora リードレプリカしか持つことができません。 </note><br>
## `read_replica_db_instance_identifiers`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `ReadReplicaDBInstanceIdentifiers`<br>
**説明**: この DB インスタンスに関連するリードレプリカの 1 つ以上の識別子をコンテナで格納します。<br>
## `read_replica_source_db_instance_identifier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ReadReplicaSourceDBInstanceIdentifier`<br>
**説明**: この DB インスタンスがリードレプリカの場合、ソース DB インスタンスの識別子をコンテナで格納します。<br>
## `replica_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ReplicaMode`<br>
**説明**: Oracle リードレプリカのオープンモード。デフォルトは open-read-only です。詳細については、<i>Amazon RDS ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/oracle-read-replicas.html">Amazon RDS の Oracle リードレプリカを使用した作業</a>を参照してください。 <note> この属性は、RDS for Oracle でのみサポートされています。 </note><br>
## `resume_full_automation_mode_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `ResumeFullAutomationModeTime`<br>
**説明**: 自動化を一時停止する時間 (分)。この時間が終了すると、RDS カスタムは完全な自動化を再開します。最小値は 60 (デフォルト)。最大値は 1,440 です。<br>
## `secondary_availability_zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SecondaryAvailabilityZone`<br>
**説明**: 存在する場合、Multi-AZ をサポートする DB インスタンスのセカンダリアベイラビリティゾーンの名前を指定します。<br>
## `status_infos`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `StatusInfos`<br>
**説明**: リードレプリカのステータス。インスタンスがリードレプリカでない場合、これは空白となります。<br>
   - `message`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Message`<br>
    **説明**: インスタンスにエラーがある場合、そのエラーの詳細。インスタンスがエラー状態でない場合、この値は空白となります。<br>
   - `normal`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Normal`<br>
    **説明**: インスタンスが正常に動作している場合は true、インスタンスがエラー状態の場合は false となるブール値。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: DB インスタンスのステータス。StatusType が read replica の場合、値は replicating、replication stop point set、replication stop point reached、error、stopped、terminated のいずれかになります。<br>
   - `status_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `StatusType`<br>
    **説明**: この値は現在、"read replication" です。<br>
## `storage_encrypted`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `StorageEncrypted`<br>
**説明**: DB インスタンスが暗号化されているかどうかを指定します。<br>
## `storage_throughput`
**タイプ**: `INT32`<br>
**プロバイダー名**: `StorageThroughput`<br>
**説明**: DB インスタンスのストレージスループットを指定します。<br>
## `storage_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `StorageType`<br>
**説明**: DB インスタンスに関連するストレージの種類を指定します。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `tde_credential_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TdeCredentialArn`<br>
**説明**: TDE 暗号化のためにインスタンスが関連付けられているキーストアからの ARN。<br>
## `timezone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Timezone`<br>
**説明**: DB インスタンスのタイムゾーン。ほとんどの場合、<code>Timezone</code> 要素は空です。<code>Timezone</code> コンテンツは、タイムゾーンを指定して作成された Microsoft SQL Server DB インスタンスに対してのみ表示されます。<br>
## `vpc_security_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `VpcSecurityGroups`<br>
**説明**: DB インスタンスが所属する VPC セキュリティグループ要素の一覧を提供します。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: VPC セキュリティグループのメンバーシップステータス。現在、有効なステータスは <code>active</code> のみです。<br>
   - `vpc_security_group_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `VpcSecurityGroupId`<br>
    **説明**: VPC セキュリティグループの名前。<br>