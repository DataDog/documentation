---
dependencies: []
disable_edit: true
---
# aws_ami

## `account_id`
**タイプ**: `STRING`<br>
## `architecture`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Architecture`<br>
**説明**: イメージのアーキテクチャ。<br>
## `arn`
**タイプ**: `STRING`<br>
## `block_device_mappings`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `BlockDeviceMappings`<br>
**説明**: 任意のブロックデバイスマッピングエントリ。<br>
   - `device_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `DeviceName`<br>
    **説明**: デバイス名 (例: <code>/dev/sdh</code> または <code>xvdh</code>)。<br>
   - `ebs`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Ebs`<br>
    **説明**: インスタンス起動時に EBS ボリュームを自動的にセットアップするために使用されるパラメーター。<br>
       - `delete_on_termination`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `DeleteOnTermination`<br>
        **説明**: インスタンス終了時に EBS ボリュームを削除するかどうかを示します。詳しくは、<i>Amazon EC2 ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html#preserving-volumes-on-termination">インスタンス終了時に Amazon EBS ボリュームを保持する</a>を参照してください。<br>
       - `encrypted`<br>
        **タイプ**: `BOOLEAN`<br>
        **Provider name**: `Encrypted`<br>
        **説明**: EBS ボリュームがバックアップのスナップショットから復元される際に、暗号化状態が変更されるかどうかを示します。暗号化状態を <code>true</code> に設定した場合の効果は、ボリュームの作成元 (新規かスナップショットからの復元か)、最初の暗号化状態、所有権、デフォルトでの暗号化が有効かどうかによって変わります。詳しくは、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-parameters">Amazon EBS 暗号化</a>を参照してください。いかなる場合も、暗号化されたボリュームから暗号化を削除することはできません。暗号化されたボリュームは、Amazon EBS 暗号化をサポートしているインスタンスにのみアタッチできます。詳しくは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_supported_instances">サポートされているインスタンスタイプ</a>を参照してください。<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImageAttribute.html">DescribeImageAttribute</a> はこのパラメーターを返しません。<br>
       - `iops`<br>
        **タイプ**: `INT32`<br>
        **Provider name**: `Iops`<br>
        **説明**: 1 秒あたりの入出力操作 (IOPS) 数。<code>gp3</code>、<code>io1</code>、<code>io2</code> ボリュームの場合は、ボリュームにプロビジョニングされる IOPS 数を表します。<code>gp2</code> ボリュームの場合は、ボリュームのベースラインパフォーマンスと、ボリュームでバースト用の I/O クレジットが累積されるレートを表します。各ボリュームタイプでサポートされる値は次のとおりです。<ul> <li>  <code>gp3</code>: 3,000 ～ 16,000 IOPS </li> <li>  <code>io1</code>: 100 ～ 64,000 IOPS </li> <li>  <code>io2</code>: 100 ～ 64,000 IOPS </li> </ul> <code>io1</code> と <code>io2</code> のボリュームについては、<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances">Nitro System 上に構築されたインスタンス</a>に関してのみ 64,000 IOPS を保証します。その他のインスタンスファミリーで保証されるパフォーマンスは、最大 32,000 IOPS です。このパラメーターは、<code>io1</code> と <code>io2</code> のボリュームでは必須です。 <code>gp3</code> ボリュームのデフォルトは 3,000 IOPS です。このパラメーターは、<code>gp2</code>、<code>st1</code>、<code>sc1</code>、<code>standard</code> ボリュームではサポートされていません。<br>
       - `kms_key_id`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `KmsKeyId`<br>
        **説明**: EBS ボリュームの暗号化に使用されているカスタマーマネージド型 CMK の識別子 (キー ID、キーエイリアス、ID ARN、またはエイリアス ARN)。このパラメーターは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RunInstances.html">RunInstances</a>、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RequestSpotFleet.html">RequestSpotFleet</a>、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RequestSpotInstances.html">RequestSpotInstances</a> から呼び出される <code>BlockDeviceMapping</code> オブジェクトでのみサポートされています。<br>
       - `outpost_arn`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `OutpostArn`<br>
        **説明**: スナップショットが保管されている Outpost の ARN。このパラメーターは、<a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateImage.html"> CreateImage</a> から呼び出される <code>BlockDeviceMapping</code> オブジェクトでのみサポートされています。<br>
       - `snapshot_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `SnapshotId`<br>
        **説明**: スナップショットの ID。<br>
       - `throughput`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Throughput`<br>
        **説明**: ボリュームがサポートするスループット (MiB/s 単位)。このパラメーターは、<code>gp3</code> ボリュームでのみ有効です。有効範囲: 最小値 125、最大値 1000。<br>
       - `volume_size`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `VolumeSize`<br>
        **説明**: ボリュームのサイズ (GiBs 単位)。スナップショット ID かボリュームサイズのいずれかを指定する必要があります。スナップショットを指定する場合、デフォルトはスナップショットのサイズになります。スナップショットのサイズと同じかそれよりも大きいボリュームサイズを指定できます。各ボリュームタイプでサポートされているボリュームサイズは、次のとおりです。<ul> <li>  <code>gp2</code>、<code>gp3</code>: 1 ～ 16,384 </li> <li>  <code>io1</code>、<code>io2</code>: 4 ～ 16,384 </li> <li>  <code>st1</code>、 <code>sc1</code>: 125 ～ 16,384 </li> <li>  <code>standard</code>: 1 ～ 1,024 </li> </ul>
       - `volume_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `VolumeType`<br>
        **説明**: ボリュームの種類。詳しくは、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumeTypes.html">Amazon EBS ボリュームの種類</a>を参照してください。ボリュームの種類が <code>io1</code> または <code>io2</code> の場合は、そのボリュームがサポートしている IOPS を指定する必要があります。<br>
   - `no_device`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `NoDevice`<br>
    **説明**: ブロックデバイスマッピングからデバイスを除外するには、空の文字列を指定します。このプロパティが指定された場合、割り当てられた値にかかわらず、ブロックデバイスマッピングからデバイスが除外されます。<br>
   - `virtual_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `VirtualName`<br>
    **説明**: 仮想デバイス名 (<code>ephemeral</code>N)。インスタンスストアボリュームには 0 から始まる番号が振られています。インスタンスストアボリュームを 2 つ利用できるインスタンスタイプでは、<code>ephemeral0</code> と <code>ephemeral1</code> のマッピングを指定できます。利用できるインスタンスストアボリュームの数は、インスタンスタイプによって決まります。インスタンスに接続した後は、ボリュームのマウントが必要です。NVMe インスタンスストアボリュームには自動的に番号が振られ、デバイス名が割り当てられます。それらをブロックデバイスマッピングに含めても何も影響はありません。制約: M3 インスタンスの場合は、インスタンスのブロックデバイスマッピングでインスタンスストアボリュームを指定する必要があります。M3 インスタンスを起動する際、AMI のブロックデバイスマッピングで指定されたインスタンスストアボリュームは無視されます。<br>
## `boot_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `BootMode`<br>
**説明**: イメージのブートモード。詳細については、<i>Amazon EC2 ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ami-boot.html">ブートモード</a>を参照してください。<br>
## `creation_date`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CreationDate`<br>
**説明**: イメージが作成された日時。<br>
## `deprecation_time`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DeprecationTime`<br>
**説明**: AMI を非推奨にする日時 (UTC) を <i>YYYY</i>-<i>MM</i>-<i>DD</i>T<i>HH</i>:<i>MM</i>:<i>SS</i>Z の形式で指定します。秒の値を設定した場合、Amazon EC2 が秒数を丸めて、一番近い分数に変換します。<br>
## `description`
**タイプ**: `STRING`<br>
**Provider name**: `Description`<br>
**説明**: イメージの作成中に提供された AMI の説明。<br>
## `ena_support`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `EnaSupport`<br>
**説明**: ENA による拡張ネットワークが有効かどうかを指定します。<br>
## `hypervisor`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Hypervisor`<br>
**説明**: イメージのハイパーバイザーの種類。<br>
## `image_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ImageId`<br>
**説明**: AMI の ID。<br>
## `image_location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ImageLocation`<br>
**説明**: AMI の場所。<br>
## `image_owner_alias`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ImageOwnerAlias`<br>
**説明**: Amazon Web Services アカウントのエイリアス (例: <code>amazon</code>、<code>self</code>) または AMI オーナーの Amazon Web Services アカウント ID。<br>
## `image_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ImageType`<br>
**説明**: イメージの種類。<br>
## `imds_support`
**タイプ**: `STRING`<br>
**プロバイダー名**: `ImdsSupport`<br>
**説明**: <code>v2.0</code> の場合、AMI で IMDSv2 が指定されていることを示します。この AMI から起動したインスタンスでは、<code>HttpTokens</code> が自動的に <code>required</code> に設定され、インスタンスのメタデータをリクエストする際に IMDSv2 が使用されていることがデフォルトで要求されるようになります。 また、<code>HttpPutResponseHopLimit</code> は <code>2</code> に設定されています。詳しくは、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-IMDS-new-instances.html#configure-IMDS-new-instances-ami-configuration">AMI の構成</a>を参照してください。<br>
## `kernel_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KernelId`<br>
**説明**: イメージに関連付けられたカーネル (存在する場合のみ)。マシンイメージの場合のみ使用します。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Name`<br>
**説明**: イメージの作成中に提供された AMI の名前。<br>
## `owner_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `OwnerId`<br>
**説明**: イメージを所有する Amazon Web Services アカウントの ID。<br>
## `platform`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Platform`<br>
**説明**: この値は Windows AMI の場合は <code>windows</code> に設定し、それ以外の場合は空白にします。<br>
## `platform_details`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PlatformDetails`<br>
**説明**: AMI の請求コードに関連付けられたプラットフォーム情報。詳しくは、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ami-billing-info.html">AMI の請求情報を理解する</a>を参照してください。<br>
## `product_codes`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `ProductCodes`<br>
**説明**: AMI に関連付けられた製品コード。<br>
   - `product_code_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ProductCodeId`<br>
    **説明**: 製品コード。<br>
   - `product_code_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ProductCodeType`<br>
    **説明**: 製品コードの種類。<br>
## `public`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `Public`<br>
**説明**: イメージにパブリック起動許可が設定されているかどうかを示します。この値は、イメージにパブリック起動許可が設定されている場合は <code>true</code> に、暗黙的または明示的起動許可のみが設定されている場合は <code>false</code> になります。<br>
## `ramdisk_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RamdiskId`<br>
**説明**: イメージに関連付けられた RAM ディスク (存在する場合のみ)。マシンイメージの場合のみ使用します。<br>
## `root_device_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RootDeviceName`<br>
**説明**: ルートデバイスボリュームのデバイス名 (例: <code>/dev/sda1</code>)。<br>
## `root_device_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RootDeviceType`<br>
**説明**: AMI で使用されるルートデバイスの種類。AMI は Amazon EBS ボリュームまたはインスタンスストアボリュームを使用することができます。<br>
## `sriov_net_support`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SriovNetSupport`<br>
**説明**: Intel 82599 仮想関数インターフェイスによる拡張ネットワークが有効かどうかを指定します。<br>
## `state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `State`<br>
**説明**: AMI の現在の状態。状態が <code>available</code> の場合は、イメージが正常に登録されており、インスタンスの起動に使用できます。<br>
## `state_reason`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `StateReason`<br>
**説明**: 状態変化の理由。<br>
   - `code`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Code`<br>
    **説明**: 状態変化の理由コード。<br>
   - `message`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Message`<br>
    **説明**: 状態変化に関するメッセージ。 <ul> <li>  <code>Server.InsufficientInstanceCapacity</code>: 起動リクエストに応えるには容量が足りませんでした。 </li> <li>  <code>Server.InternalError</code>: 内部エラーにより、起動中にインスタンスが終了しました。 </li> <li>  <code>Server.ScheduledStop</code>: リタイア予定のため、インスタンスは停止しました。 </li> <li>  <code>Server.SpotInstanceShutdown</code>: 最大価格がスポット価格と同じかそれ以上のスポットリクエストの数が利用可能な容量を超えたため、またはスポット価格が上昇したため、インスタンスが停止しました。 </li> <li>  <code>Server.SpotInstanceTermination</code>: 最大価格がスポット価格と同じかそれ以上のスポットリクエストの数が利用可能な容量を超えたため、またはスポット価格が上昇したため、インスタンスが終了しました。 </li> <li>  <code>Client.InstanceInitiatedShutdown</code>: インスタンスから <code>shutdown -h</code> コマンドを使用して、インスタンスをシャットダウンしました。 </li> <li>  <code>Client.InstanceTerminated</code>: AMI 作成中にインスタンスが終了または再起動しました。 </li> <li>  <code>Client.InternalError</code>: クライアントエラーにより、起動中にインスタンスが終了してしまいました。 </li> <li>  <code>Client.InvalidSnapshot.NotFound</code>: 指定されたスナップショットは見つかりませんでした。 </li> <li>  <code>Client.UserInitiatedHibernate</code>: インスタンスでハイバネーションが開始されました。 </li> <li>  <code>Client.UserInitiatedShutdown</code>: Amazon EC2 API を使用してインスタンスをシャットダウンしました。 </li> <li>  <code>Client.VolumeLimitExceeded</code>: EBS ボリューム数または総ストレージ数の制限を超えました。使用量を減らすか、アカウントの上限数の引き上げをリクエストしてください。 </li> </ul>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `tpm_support`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TpmSupport`<br>
**説明**: イメージが NitroTPM サポートに構成されている場合、この値は <code>v2.0</code> です。詳しくは、<i>Amazon EC2 ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nitrotpm.html">NitroTPM</a> を参照してください。<br>
## `usage_operation`
**タイプ**: `STRING`<br>
**プロバイダー名**: `UsageOperation`<br>
**説明**: Amazon EC2 インスタンスのオペレーションと、AMI に関連付けられた請求コード。<code>usageOperation</code> は Amazon Web Services Cost and Usage Report と <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html">Amazon Web Services Price List API</a> の <a href="https://docs.aws.amazon.com/cur/latest/userguide/Lineitem-columns.html#Lineitem-details-O-Operation">lineitem/Operation</a> 列に対応します。これらのフィールドは、Amazon EC2 コンソールの <b>Instances</b> もしくは <b>AMIs</b> のページ、または theAmazon EC2 API の <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImages.html">DescribeImages</a> コマンド、もしくは CLI  <a href="https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html">describe-images</a> コマンドにより返される応答内で確認できます。<br>
## `virtualization_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `VirtualizationType`<br>
**説明**: AMI の仮想化タイプ。<br>