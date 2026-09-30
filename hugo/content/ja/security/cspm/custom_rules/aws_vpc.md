---
dependencies: []
disable_edit: true
---
# aws_vpc

## `account_id`
**タイプ**: `STRING`<br>
## `arn`
**タイプ**: `STRING`<br>
## `cidr_block`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CidrBlock`<br>
**説明**: VPC のプライマリ IPv4 CIDR ブロック。<br>
## `cidr_block_association_set`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `CidrBlockAssociationSet`<br>
**説明**: VPC に関連付けられた IPv4 CIDR ブロックに関する情報。<br>
   - `association_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AssociationId`<br>
    **説明**: IPv4 CIDR ブロックのアソシエーション ID。<br>
   - `cidr_block`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CidrBlock`<br>
    **説明**: IPv4 の CIDR ブロック。<br>
   - `cidr_block_state`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `CidrBlockState`<br>
    **説明**: CIDR ブロックの状態に関する情報。<br>
       - `state`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `State`<br>
        **説明**: CIDR ブロックの状態。<br>
       - `status_message`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `StatusMessage`<br>
        **説明**: CIDR ブロックのステータスに関するメッセージ (該当する場合)。<br>
## `dhcp_options_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DhcpOptionsId`<br>
**説明**: VPC に関連付けられた DHCP オプションのセットの ID。<br>
## `flow_logs`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `FlowLogs`<br>
**説明**: フローログに関する情報。<br>
   - `creation_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `CreationTime`<br>
    **説明**: フローログが作成された日時。<br>
   - `deliver_logs_error_message`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DeliverLogsErrorMessage`<br>
    **説明**: 発生したエラーの情報。<code>Rate limited</code> は、1 つ以上のネットワークインターフェイスに対して CloudWatch Logs のスロットリングが適用されているか、作成できるロググループの数が制限に達していることを示します。<code>Access error</code> は、フローログに関連付けられた IAM ロールが CloudWatch Logs に公開するための十分な権限を持っていないことを示します。<code>Unknown error</code> は、内部エラーを示します。<br>
   - `deliver_logs_permission_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DeliverLogsPermissionArn`<br>
    **説明**: CloudWatch Logs にログをポストする IAM ロールの ARN。<br>
   - `deliver_logs_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DeliverLogsStatus`<br>
    **説明**: ログの配信ステータス (<code>SUCCESS</code> | <code>FAILED</code>)。<br>
   - `destination_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `DestinationOptions`<br>
    **説明**: 宛先のオプション。<br>
       - `file_format`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `FileFormat`<br>
        **説明**: フローログのフォーマット。<br>
       - `hive_compatible_partitions`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `HiveCompatiblePartitions`<br>
        **説明**: Amazon S3 に保存されているフローログに、Hive 互換のプレフィックスを使用するかどうかを示します。<br>
       - `per_hour_partition`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `PerHourPartition`<br>
        **説明**: フローログを時間ごとに分割するかどうかを示します。<br>
   - `flow_log_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `FlowLogId`<br>
    **説明**: フローログの ID。<br>
   - `flow_log_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `FlowLogStatus`<br>
    **説明**: フローログのステータス (<code>ACTIVE</code>)。<br>
   - `log_destination`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LogDestination`<br>
    **説明**: フローログデータの公開先。フローログデータは、CloudWatch Logs のロググループまたは Amazon S3 バケットに公開することができます。フローログが CloudWatch Logs に公開される場合、この要素はデータが公開される CloudWatch Logs ロググループの Amazon Resource Name (ARN) を示します。フローログが Amazon S3 に公開される場合、この要素はデータが公開される Amazon S3 バケットのARNを示します。<br>
   - `log_destination_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LogDestinationType`<br>
    **説明**: フローログデータの公開先のデータタイプ。フローログデータは CloudWatch Logs または Amazon S3 に公開することができます。<br>
   - `log_format`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LogFormat`<br>
    **説明**: フローログレコードのフォーマット。<br>
   - `log_group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LogGroupName`<br>
    **説明**: フローロググループの名前。<br>
   - `max_aggregation_interval`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `MaxAggregationInterval`<br>
    **説明**: パケットのフローをキャプチャしてフローログのレコードに集計する時間の最大間隔 (秒単位)。ネットワークインターフェイスが <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances">Nitro ベースのインスタンス</a>にアタッチされている場合、指定した値にかかわらず、集計間隔は常に 60 秒 (1 分) 以下となります。有効な値: <code>60</code> | <code>600</code><br>
   - `resource_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ResourceId`<br>
    **説明**: フローログが作成されたリソースの ID。<br>
   - `traffic_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TrafficType`<br>
    **説明**: フローログにキャプチャされたトラフィックのタイプ。<br>
## `instance_tenancy`
**タイプ**: `STRING`<br>
**プロバイダー名**: `InstanceTenancy`<br>
**説明**: VPC に起動するインスタンスの許容テナント。<br>
## `ipv6_cidr_block_association_set`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Ipv6CidrBlockAssociationSet`<br>
**説明**: VPC に関連付けられた IPv6 CIDR ブロックに関する情報。<br>
   - `association_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AssociationId`<br>
    **説明**: IPv6 CIDR ブロックのアソシエーション ID。<br>
   - `ipv6_cidr_block`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Ipv6CidrBlock`<br>
    **説明**: IPv6 の CIDR ブロック。<br>
   - `ipv6_cidr_block_state`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Ipv6CidrBlockState`<br>
    **説明**: CIDR ブロックの状態に関する情報。<br>
       - `state`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `State`<br>
        **説明**: CIDR ブロックの状態。<br>
       - `status_message`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `StatusMessage`<br>
        **説明**: CIDR ブロックのステータスに関するメッセージ (該当する場合)。<br>
   - `ipv6_pool`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Ipv6Pool`<br>
    **説明**: IPv6 CIDR ブロックの割り当て元となる IPv6 アドレスプールの ID。<br>
   - `network_border_group`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `NetworkBorderGroup`<br>
    **説明**: Amazon Web Services が IP アドレスをアドバタイズする、アベイラビリティゾーン、ローカルゾーン、または波長ゾーンの一意のセットの名前。例: <code>us-east-1-wl1-bos-wlz-1</code><br>
## `is_default`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IsDefault`<br>
**説明**: VPC がデフォルト VPC であるかどうかを示します。<br>
## `owner_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `OwnerId`<br>
**説明**: VPC を所有する Amazon Web Services アカウントの ID。<br>
## `state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `State`<br>
**説明**: VPC の現在の状態。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `vpc_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `VpcId`<br>
**説明**: VPC の ID。<br>