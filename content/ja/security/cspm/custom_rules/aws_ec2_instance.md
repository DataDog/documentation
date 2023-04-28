---
dependencies: []
disable_edit: true
---
# aws_ec2_instance

## `account_id`
**タイプ**: `STRING`<br>
## `ami_launch_index`
**タイプ**: `INT32`<br>
**プロバイダー名**: `AmiLaunchIndex`<br>
**説明**: AMI 起動インデックス。起動グループ内でこのインスタンスを見つけるために使用します。<br>
## `architecture`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Architecture`<br>
**説明**: イメージのアーキテクチャ。<br>
## `block_device_mappings`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `BlockDeviceMappings`<br>
**説明**: インスタンスの任意のブロックデバイスマッピングエントリ。<br>
   - `device_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DeviceName`<br>
    **説明**: デバイス名 (例: <code>/dev/sdh</code> または <code>xvdh</code>)。<br>
   - `ebs`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Ebs`<br>
    **説明**: インスタンス起動時に EBS ボリュームを自動的にセットアップするために使用されるパラメーター。<br>
       - `attach_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `AttachTime`<br>
        **説明**: アタッチメントが開始されたタイムスタンプ。<br>
       - `delete_on_termination`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `DeleteOnTermination`<br>
        **説明**: インスタンス終了時にボリュームを削除するかどうかを示します。<br>
       - `status`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Status`<br>
        **説明**: アタッチメントの状態。<br>
       - `volume_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `VolumeId`<br>
        **説明**: EBS ボリュームの ID。<br>
## `boot_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `BootMode`<br>
**説明**: インスタンスのブートモード。詳細については、<i>Amazon EC2 ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ami-boot.html">ブートモード</a>を参照してください。<br>
## `capacity_reservation_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CapacityReservationId`<br>
**説明**: 容量予約の ID。<br>
## `capacity_reservation_specification`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `CapacityReservationSpecification`<br>
**説明**: 容量予約のターゲティングオプションに関する情報。<br>
   - `capacity_reservation_preference`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CapacityReservationPreference`<br>
    **説明**: インスタンスの容量予約の環境設定を記述します。可能な環境設定は次のとおりです: <ul> <li>  <code>open</code> - インスタンスは、属性 (インスタンスタイプ、プラットフォーム、アベイラビリティゾーン) が一致する、任意の <code>open</code> な容量予約で実行することができます。 </li> <li>  <code>none</code> - インスタンスは、容量予約が可能な場合でも、容量予約での実行を回避します。インスタンスはオンデマンドの容量で実行されます。 </li> </ul>
   - `capacity_reservation_target`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `CapacityReservationTarget`<br>
    **説明**: 対象となる容量予約または容量予約グループに関する情報。<br>
       - `capacity_reservation_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CapacityReservationId`<br>
        **説明**: 対象となる容量予約の ID。<br>
       - `capacity_reservation_resource_group_arn`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CapacityReservationResourceGroupArn`<br>
        **説明**: 対象となる容量予約グループの ARN。<br>
## `client_token`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ClientToken`<br>
**説明**: インスタンスの起動時に提供した idempotency トークン (該当する場合)。<br>
## `cpu_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `CpuOptions`<br>
**説明**: インスタンスの CPU オプション。<br>
   - `core_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `CoreCount`<br>
    **説明**: インスタンスの CPU コアの数。<br>
   - `threads_per_core`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `ThreadsPerCore`<br>
    **説明**: CPU コアあたりのスレッド数。<br>
## `ebs_optimized`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `EbsOptimized`<br>
**説明**: インスタンスが Amazon EBS の I/O に最適化されているかどうかを示します。この最適化は、Amazon EBS への専用スループットと最適化された構成スタックを提供し、最適な I/O パフォーマンスを提供します。この最適化は、すべてのインスタンスタイプで利用できるわけではありません。EBS Optimized インスタンスを使用する場合、追加の使用料が適用されます。<br>
## `elastic_gpu_associations`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ElasticGpuAssociations`<br>
**説明**: インスタンスに関連付けられた Elastic GPU。<br>
   - `elastic_gpu_association_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticGpuAssociationId`<br>
    **説明**: アソシエーションの ID。<br>
   - `elastic_gpu_association_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticGpuAssociationState`<br>
    **説明**: インスタンスと Elastic Graphics アクセラレータの関連付けの状態。<br>
   - `elastic_gpu_association_time`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticGpuAssociationTime`<br>
    **説明**: Elastic Graphics アクセラレータがインスタンスと関連付けられていた時間。<br>
   - `elastic_gpu_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticGpuId`<br>
    **説明**: Elastic Graphics アクセラレータの ID。<br>
## `elastic_inference_accelerator_associations`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ElasticInferenceAcceleratorAssociations`<br>
**説明**: インスタンスに関連付けられたエラスティック推論アクセラレータ。<br>
   - `elastic_inference_accelerator_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticInferenceAcceleratorArn`<br>
    **説明**: エラスティック推論アクセラレータの Amazon Resource Name (ARN)。<br>
   - `elastic_inference_accelerator_association_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticInferenceAcceleratorAssociationId`<br>
    **説明**: アソシエーションの ID。<br>
   - `elastic_inference_accelerator_association_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ElasticInferenceAcceleratorAssociationState`<br>
    **説明**: エラスティック推論アクセラレータの状態。<br>
   - `elastic_inference_accelerator_association_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `ElasticInferenceAcceleratorAssociationTime`<br>
    **説明**: エラスティック推論アクセラレータがインスタンスに関連づけられた時間。<br>
## `ena_support`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `EnaSupport`<br>
**説明**: ENA による拡張ネットワークが有効かどうかを指定します。<br>
## `enclave_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `EnclaveOptions`<br>
**説明**: インスタンスが Amazon Web Services Nitro Enclaves で有効になっているかどうかを示します。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Enabled`<br>
    **説明**: このパラメーターが <code>true</code> に設定されている場合、インスタンスは Amazon Web Services Nitro Enclaves に対して有効になり、そうでない場合は Amazon Web Services Nitro Enclaves に対して有効になりません。<br>
## `hibernation_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `HibernationOptions`<br>
**説明**: インスタンスがハイバネーションに有効であるかどうかを示します。<br>
   - `configured`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Configured`<br>
    **説明**: このパラメーターが <code>true</code> に設定されている場合、インスタンスはハイバネーションに有効で、そうでない場合はハイバネーションに有効ではありません。<br>
## `hypervisor`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Hypervisor`<br>
**説明**: インスタンスのハイパーバイザーの種類。値 <code>xen</code> は Xen および Nitro ハイパーバイザーの両方に使用されます。<br>
## `iam_instance_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `IamInstanceProfile`<br>
**説明**: インスタンスに関連付けられた IAM インスタンスプロファイル (該当する場合)。<br>
   - `arn`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **説明**: インスタンスプロファイルの Amazon Resource Name (ARN)。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Id`<br>
    **説明**: インスタンスプロファイルの ID。<br>
## `image_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ImageId`<br>
**説明**: インスタンスの起動に使用した AMI の ID。<br>
## `instance_arn`
**タイプ**: `STRING`<br>
## `instance_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `InstanceId`<br>
**説明**: インスタンスの ID。<br>
## `instance_lifecycle`
**タイプ**: `STRING`<br>
**プロバイダー名**: `InstanceLifecycle`<br>
**説明**: スポットインスタンスかスケジュールインスタンスかを示します。<br>
## `instance_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `InstanceType`<br>
**説明**: インスタンスタイプ。<br>
## `ipv6_address`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Ipv6Address`<br>
**説明**: インスタンスに割り当てられた IPv6 アドレス。<br>
## `kernel_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KernelId`<br>
**説明**: このインスタンスに関連付けられたカーネル (該当する場合)。<br>
## `key_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KeyName`<br>
**説明**: このインスタンスが関連するキーペアで起動された場合、そのキーペアの名前。<br>
## `launch_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `LaunchTime`<br>
**説明**: インスタンスが起動された時間。<br>
## `licenses`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Licenses`<br>
**説明**: インスタンスのライセンス構成。<br>
   - `license_configuration_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LicenseConfigurationArn`<br>
    **説明**: ライセンス構成の Amazon Resource Name (ARN)。<br>
## `maintenance_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `MaintenanceOptions`<br>
**説明**: インスタンスのリカバリーとメンテナンスのオプションに関する情報を提供します。<br>
   - `auto_recovery`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AutoRecovery`<br>
    **説明**: インスタンスの現在の自動リカバリー動作に関する情報を提供します。<br>
## `metadata_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `MetadataOptions`<br>
**説明**: インスタンスのメタデータオプション。<br>
   - `http_endpoint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HttpEndpoint`<br>
    **説明**: インスタンス上の HTTP メタデータエンドポイントが有効か無効かを示します。値が <code>disabled</code> の場合、インスタンスのメタデータにアクセスすることはできません。<br>
   - `http_protocol_ipv6`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HttpProtocolIpv6`<br>
    **説明**: インスタンスメタデータサービスの IPv6 エンドポイントが有効か無効かを示します。<br>
   - `http_put_response_hop_limit`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `HttpPutResponseHopLimit`<br>
    **説明**: インスタンスメターデータリクエストの HTTP PUT レスポンスホップ制限の希望値。この数値が大きいほど、インスタンスメターデータリクエストはより遠くに移動することができます。<br>
    **デフォルト**: 1</p> <p>可能な値: 1 から 64 までの整数
   - `http_tokens`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HttpTokens`<br>
    **説明**: IMDSv2 はトークンバックセッションを使用します。HTTP トークンの使用が <code>optional</code> であるか (言い換えれば、IMDSv2 の使用が <code>optional</code> であるかを示す)、<code>required</code> であるか (言い換えれば、IMDSv2の使用が <code>required</code> であるかを示す) を示します。<ul><li> <code>optional</code> - IMDSv2 がオプションの場合、リクエストでセッショントークンを使用するかしないかを選択して、インスタンスメタデータを取得することができます。トークンなしで IAM ロール資格情報を取得する場合、IMDSv1 ロール資格情報が返されます。有効なセッショントークンを使用して IAM ロールの資格情報を取得した場合、IMDSv2 ロールの資格情報が返されます。</li><li> <code>required</code> - IMDSv2 が必須の場合、インスタンスメタデータの取得リクエストでセッショントークンを送信する必要があります。この状態では、IAM ロールの資格情報を取得すると常に IMDSv2 資格情報が返され、IMDSv1 資格情報は利用できません。</li></ul>
    **デフォルト**: <code>optional</code>
   - `instance_metadata_tags`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `InstanceMetadataTags`<br>
    **説明**: インスタンスメタデータからのインスタンスタグへのアクセスが有効か無効かを示します。詳細については、<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#work-with-tags-in-IMDS">インスタンスメタデータを使用したインスタンスタグの操作</a>を参照してください。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `State`<br>
    **説明**: メタデータオプションの変化の状態。  <code>pending</code> - メタデータオプションは更新中で、インスタンスは新しい選択でメタデータトラフィックを処理する準備ができていません。  <code>applied</code> - メタデータオプションはインスタンスに正常に適用されました。<br>
## `monitoring`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `Monitoring`<br>
**説明**: インスタンスの監視。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `State`<br>
    **説明**: 詳細監視が有効かどうかを示します。それ以外の場合は、基本監視を行います。<br>
## `network_interfaces`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `NetworkInterfaces`<br>
**説明**: [EC2-VPC] インスタンスのネットワークインターフェイス。<br>
   - `association`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Association`<br>
    **説明**: ネットワークインターフェイスに関連付けられた Elastic IPv4 のアソシエーション情報。<br>
       - `carrier_ip`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CarrierIp`<br>
        **説明**: ネットワークインターフェイスに関連するキャリア IP アドレス。<br>
       - `customer_owned_ip`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CustomerOwnedIp`<br>
        **説明**: ネットワークインターフェイスに関連する顧客所有の IP アドレス。<br>
       - `ip_owner_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `IpOwnerId`<br>
        **説明**: Elastic IP アドレスの所有者の ID。<br>
       - `public_dns_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PublicDnsName`<br>
        **説明**: パブリック DNS 名。<br>
       - `public_ip`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PublicIp`<br>
        **説明**: ネットワークインターフェイスにバインドされているパブリック IP アドレスまたは Elastic IP アドレス。<br>
   - `attachment`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Attachment`<br>
    **説明**: ネットワークインターフェイスのアタッチメント。<br>
       - `attach_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `AttachTime`<br>
        **説明**: アタッチメントが開始されたときのタイムスタンプ。<br>
       - `attachment_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `AttachmentId`<br>
        **説明**: ネットワークインターフェイスのアタッチメントの ID。<br>
       - `delete_on_termination`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `DeleteOnTermination`<br>
        **説明**: インスタンス終了時にネットワークインターフェイスを削除するかどうかを示します。<br>
       - `device_index`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `DeviceIndex`<br>
        **説明**: ネットワークインターフェイスのアタッチメント用のインスタンス上のデバイスのインデックス。<br>
       - `network_card_index`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `NetworkCardIndex`<br>
        **説明**: ネットワークカードのインデックス。<br>
       - `status`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Status`<br>
        **説明**: アタッチメントの状態。<br>
   - `description`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Description`<br>
    **説明**: 説明文。<br>
   - `groups`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Groups`<br>
    **説明**: セキュリティグループ。<br>
       - `group_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `GroupId`<br>
        **説明**: セキュリティグループの ID。<br>
       - `group_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `GroupName`<br>
        **説明**: セキュリティグループの名前。<br>
   - `interface_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `InterfaceType`<br>
    **説明**: ネットワークインターフェイスの種類。有効な値: <code>interface</code> | <code>efa</code> | <code>trunk</code><br>
   - `ipv4_prefixes`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Ipv4Prefixes`<br>
    **説明**: ネットワークインターフェイスに割り当てる IPv4 委任プレフィックス。<br>
       - `ipv4_prefix`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Ipv4Prefix`<br>
        **説明**: ネットワークインターフェイスに割り当てられた 1 つまたは複数の IPv4 プレフィックス。<br>
   - `ipv6_addresses`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Ipv6Addresses`<br>
    **説明**: ネットワークインターフェイスに関連付けられた IPv6 アドレス。<br>
       - `ipv6_address`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Ipv6Address`<br>
        **説明**: IPv6 アドレス。<br>
   - `ipv6_prefixes`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Ipv6Prefixes`<br>
    **説明**: ネットワークインターフェイスに割り当てる IPv6 委任プレフィックス。<br>
       - `ipv6_prefix`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Ipv6Prefix`<br>
        **説明**: ネットワークインターフェイスに割り当てられた 1 つまたは複数の IPv6 プレフィックス。<br>
   - `mac_address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `MacAddress`<br>
    **説明**: MAC アドレス。<br>
   - `network_interface_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `NetworkInterfaceId`<br>
    **説明**: ネットワークインターフェイスの ID。<br>
   - `owner_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `OwnerId`<br>
    **説明**: ネットワークインターフェイスを作成した Amazon Web Services のアカウントの ID。<br>
   - `private_dns_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `PrivateDnsName`<br>
    **説明**: プライベート DNS 名。<br>
   - `private_ip_address`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `PrivateIpAddress`<br>
    **Description**: The IPv4 address of the network interface within the subnet.<br>
   - `private_ip_addresses`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `PrivateIpAddresses`<br>
    **説明**: ネットワークインターフェイスに関連付けられたプライベート IPv4 アドレス。<br>
       - `association`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `Association`<br>
        **説明**: ネットワークインターフェイスの Elastic IP アドレスのアソシエーション情報。<br>
           - `carrier_ip`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `CarrierIp`<br>
            **説明**: ネットワークインターフェイスに関連するキャリア IP アドレス。<br>
           - `customer_owned_ip`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `CustomerOwnedIp`<br>
            **説明**: ネットワークインターフェイスに関連する顧客所有の IP アドレス。<br>
           - `ip_owner_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `IpOwnerId`<br>
            **説明**: Elastic IP アドレスの所有者の ID。<br>
           - `public_dns_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `PublicDnsName`<br>
            **説明**: パブリック DNS 名。<br>
           - `public_ip`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `PublicIp`<br>
            **説明**: ネットワークインターフェイスにバインドされているパブリック IP アドレスまたは Elastic IP アドレス。<br>
       - `primary`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `Primary`<br>
        **説明**: この IPv4 アドレスがネットワークインターフェイスのプライマリプライベート IP アドレスであるかどうかを示します。<br>
       - `private_dns_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PrivateDnsName`<br>
        **説明**: プライベート IPv4 DNS 名。<br>
       - `private_ip_address`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `PrivateIpAddress`<br>
        **説明**: ネットワークインターフェイスのプライベート IPv4 アドレス。<br>
   - `source_dest_check`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `SourceDestCheck`<br>
    **説明**: 送信元/宛先のチェックが有効であるかどうかを示します。<br>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Status`<br>
    **説明**: ネットワークインターフェイスのステータス。<br>
   - `subnet_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `SubnetId`<br>
    **説明**: サブネットの ID。<br>
   - `vpc_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `VpcId`<br>
    **説明**: VPC の ID。<br>
## `outpost_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `OutpostArn`<br>
**Description**: The Amazon Resource Name (ARN) of the Outpost.<br>
## `placement`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `Placement`<br>
**説明**: インスタンスが起動した場所 (該当する場合)。<br>
   - `affinity`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Affinity`<br>
    **説明**: Dedicated Host 上のインスタンスのアフィニティ設定。このパラメーターは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> または <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportInstance.html">ImportInstance</a> ではサポートされていません。<br>
   - `availability_zone`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `AvailabilityZone`<br>
    **説明**: インスタンスのアベイラビリティゾーン。指定しない場合、リージョンのロードバランシング基準に基づいて、アベイラビリティゾーンが自動的に選択されます。このパラメーターは <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> ではサポートされていません。<br>
   - `group_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `GroupId`<br>
    **説明**: インスタンスが所属している配置グループの ID。<code>GroupId</code> を指定した場合、<code>GroupName</code> は指定できません。<br>
   - `group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `GroupName`<br>
    **説明**: インスタンスが所属している配置グループの名前。<code>GroupName</code> を指定した場合、<code>GroupId</code> は指定できません。<br>
   - `host_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HostId`<br>
    **説明**: インスタンスが存在する Dedicated Host の ID。このパラメーターは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> または <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportInstance.html">ImportInstance</a> ではサポートされていません。<br>
   - `host_resource_group_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HostResourceGroupArn`<br>
    **説明**: インスタンスを起動するホストリソースグループの ARN。このパラメーター指定する場合は、<b>Tenancy</b> パラメーターを省略するか、<code>host</code> に設定します。このパラメーターは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> ではサポートされていません。<br>
   - `partition_number`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `PartitionNumber`<br>
    **説明**: インスタンスが所属するパーティションの番号。配置グループ戦略が <code>partition</code> に設定されている場合のみ有効です。このパラメーターは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> ではサポートされていません。<br>
   - `spread_domain`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SpreadDomain`<br>
    **説明**: 将来の使用に備えた予約。<br>
   - `tenancy`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Tenancy`<br>
    **説明**: インスタンスのテナンシー (インスタンスが VPC で実行されている場合)。テナントが <code>dedicated</code> のインスタンスは、シングルテナントのハードウェアで実行されます。このパラメーターは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> ではサポートされていません。<code>host</code> テナンシーは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportInstance.html">ImportInstance</a> または <code>unlimited</code> CPU クレジットオプションに構成されている T3 インスタンスではサポートされていません。<br>
## `platform`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Platform`<br>
**説明**: 値は Windows インスタンスの場合は <code>Windows</code>、それ以外は空白です。<br>
## `platform_details`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PlatformDetails`<br>
**説明**: インスタンスのプラットフォーム詳細値。詳細は、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-info-fields.html">AMI 請求情報フィールド</a>を参照してください。<br>
## `private_dns_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PrivateDnsName`<br>
**説明**: (IPv4 のみ) インスタンスに割り当てられたプライベート DNS ホスト名。この DNS ホスト名は、Amazon EC2 ネットワーク内でのみ使用することができます。この名前は、インスタンスが <code>running</code> 状態に入るまで使用できません。 [EC2-VPC] VPC で DNS 解決と DNS ホストネームを有効にした場合、Amazon 提供の DNS サーバーは Amazon 提供のプライベート DNS ホストネームを解決します。VPC で Amazon 提供の DNS サーバーを使用していない場合、カスタムのドメインネームサーバーが適切にホスト名を解決する必要があります。<br>
## `private_dns_name_options`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `PrivateDnsNameOptions`<br>
**説明**: インスタンスのホスト名に関するオプション。<br>
   - `enable_resource_name_dns_a_record`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `EnableResourceNameDnsARecord`<br>
    **説明**: DNS A レコードを持つインスタンスホスト名に対する DNS クエリに応答するかどうかを示します。<br>
   - `enable_resource_name_dns_aaaa_record`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `EnableResourceNameDnsAAAARecord`<br>
    **説明**: DNS AAAA レコードを持つインスタンスホスト名に対する DNS クエリに応答するかどうかを示します。<br>
   - `hostname_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `HostnameType`<br>
    **説明**: インスタンスに割り当てるホスト名の種類。<br>
## `private_ip_address`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PrivateIpAddress`<br>
**説明**: インスタンスに割り当てられたプライベート IPv4 アドレス。<br>
## `product_codes`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ProductCodes`<br>
**説明**: このインスタンスにアタッチされている製品コード (該当する場合)。<br>
   - `product_code_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ProductCodeId`<br>
    **説明**: 製品コード。<br>
   - `product_code_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ProductCodeType`<br>
    **説明**: 製品コードの種類。<br>
## `public_dns_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PublicDnsName`<br>
**説明**: (IPv4 のみ) インスタンスに割り当てられたパブリック DNS 名。この名前は、インスタンスが <code>running</code> 状態になるまで利用できません。EC2-VPC の場合、この名前は VPC の DNS ホストネームを有効にした場合のみ利用可能です。<br>
## `public_ip_address`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PublicIpAddress`<br>
**説明**: パブリック IPv4 アドレス、またはインスタンスに割り当てられたキャリア IP アドレス (該当する場合)。キャリア IP アドレスは、波長ゾーンに関連するサブネットで起動したインスタンスにのみ適用されます。<br>
## `ramdisk_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RamdiskId`<br>
**説明**: このインスタンスに関連付けられた RAM ディスク (該当する場合)。<br>
## `root_device_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RootDeviceName`<br>
**説明**: ルートデバイスボリュームのデバイス名 (例: <code>/dev/sda1</code>)。<br>
## `root_device_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RootDeviceType`<br>
**説明**: AMI で使用されるルートデバイスの種類。AMI は EBS ボリュームまたはインスタンスストアボリュームを使用することができます。<br>
## `security_groups`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `SecurityGroups`<br>
**説明**: インスタンスのセキュリティグループ。<br>
   - `group_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `GroupId`<br>
    **説明**: セキュリティグループの ID。<br>
   - `group_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `GroupName`<br>
    **説明**: セキュリティグループの名前。<br>
## `source_dest_check`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `SourceDestCheck`<br>
**説明**: 送信元/宛先のチェックが有効であるかどうかを示します。<br>
## `spot_instance_request_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SpotInstanceRequestId`<br>
**説明**: リクエストがスポットインスタンスリクエストである場合、リクエストの ID。<br>
## `sriov_net_support`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SriovNetSupport`<br>
**説明**: Intel 82599 仮想関数インターフェイスによる拡張ネットワークが有効かどうかを指定します。<br>
## `state`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `State`<br>
**説明**: インスタンスの現在の状態。<br>
   - `code`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Code`<br>
    **説明**: 16 ビット符号なし整数としてのインスタンスの状態。 上位バイトは 2^8 から (2^16)-1 までのすべてのビットで、256 から 65535 までの 10 進数値に相当します。これらの数値は内部で使用されるもので、無視されるべきものです。下位バイトは、2^0 から (2^8)-1 までのすべてのビットで、0 から 255 までの 10 進数値に相当します。instance-state-code の有効な値は、すべて下位バイトの範囲になり、それらは次のとおりです。 <ul> <li>  <code>0</code> : <code>pending</code>  </li> <li>  <code>16</code> : <code>running</code>  </li> <li>  <code>32</code> : <code>shutting-down</code>  </li> <li>  <code>48</code> : <code>terminated</code>  </li> <li>  <code>64</code> : <code>stopping</code>  </li> <li>  <code>80</code> : <code>stopped</code>  </li> </ul> 2^8、10 進数で 256 以上のビットを全てゼロにすることで、上位バイトの値を無視することができます。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Name`<br>
    **説明**: インスタンスの現在の状態。<br>
## `state_reason`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `StateReason`<br>
**説明**: 直近の状態遷移の理由。<br>
   - `code`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Code`<br>
    **説明**: 状態変化の理由コード。<br>
   - `message`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Message`<br>
    **説明**: 状態変化に関するメッセージ。 <ul> <li>  <code>Server.InsufficientInstanceCapacity</code>: 起動リクエストに応えるには容量が足りませんでした。 </li> <li>  <code>Server.InternalError</code>: 内部エラーにより、起動中にインスタンスが終了しました。 </li> <li>  <code>Server.ScheduledStop</code>: リタイア予定のため、インスタンスは停止しました。 </li> <li>  <code>Server.SpotInstanceShutdown</code>: 最大価格がスポット価格と同じかそれ以上のスポットリクエストの数が利用可能な容量を超えたため、またはスポット価格が上昇したため、インスタンスが停止しました。 </li> <li>  <code>Server.SpotInstanceTermination</code>: 最大価格がスポット価格と同じかそれ以上のスポットリクエストの数が利用可能な容量を超えたため、またはスポット価格が上昇したため、インスタンスが終了しました。 </li> <li>  <code>Client.InstanceInitiatedShutdown</code>: インスタンスから <code>shutdown -h</code> コマンドを使用して、インスタンスをシャットダウンしました。 </li> <li>  <code>Client.InstanceTerminated</code>: AMI 作成中にインスタンスが終了または再起動しました。 </li> <li>  <code>Client.InternalError</code>: クライアントエラーにより、起動中にインスタンスが終了してしまいました。 </li> <li>  <code>Client.InvalidSnapshot.NotFound</code>: 指定されたスナップショットは見つかりませんでした。 </li> <li>  <code>Client.UserInitiatedHibernate</code>: インスタンスでハイバネーションが開始されました。 </li> <li>  <code>Client.UserInitiatedShutdown</code>: Amazon EC2 API を使用してインスタンスをシャットダウンしました。 </li> <li>  <code>Client.VolumeLimitExceeded</code>: EBS ボリューム数または総ストレージ数の制限を超えました。使用量を減らすか、アカウントの上限数の引き上げをリクエストしてください。 </li> </ul>
## `state_transition_reason`
**タイプ**: `STRING`<br>
**プロバイダー名**: `StateTransitionReason`<br>
**説明**: 直近の状態遷移の理由。これは空文字列になる可能性があります。<br>
## `subnet_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SubnetId`<br>
**説明**: [EC2-VPC] インスタンスが稼働しているサブネットの ID。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `tpm_support`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TpmSupport`<br>
**説明**: インスタンスが NitroTPM サポートに構成されている場合、この値は <code>v2.0</code> です。詳しくは、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nitrotpm.html">NitroTPM</a> を参照してください。<br>
## `usage_operation`
**タイプ**: `STRING`<br>
**プロバイダー名**: `UsageOperation`<br>
**説明**: インスタンスの利用操作値。詳細は、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-info-fields.html">AMI 請求情報フィールド</a>を参照してください。<br>
## `usage_operation_update_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `UsageOperationUpdateTime`<br>
**説明**: 利用操作が最後に更新された時刻。<br>
## `virtualization_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `VirtualizationType`<br>
**説明**: インスタンスの仮想化タイプ。<br>
## `vpc_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `VpcId`<br>
**説明**: [EC2-VPC] インスタンスが稼働している VPC の ID。<br>