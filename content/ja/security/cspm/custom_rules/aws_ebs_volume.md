---
dependencies: []
disable_edit: true
---
# aws_ebs_volume

## `account_id`
**タイプ**: `STRING`<br>
## `attachments`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Attachments`<br>
**説明**: ボリュームのアタッチメントに関する情報。<br>
   - `attach_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **Provider name**: `AttachTime`<br>
    **Description**: The time stamp when the attachment initiated.<br>
   - `delete_on_termination`<br>
    **タイプ**: `BOOLEAN`<br>
    **Provider name**: `DeleteOnTermination`<br>
    **説明**: インスタンス終了時に EBS ボリュームを削除するかどうかを示します。<br>
   - `device`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Device`<br>
    **説明**: デバイス名。<br>
   - `instance_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `InstanceId`<br>
    **Description**: The ID of the instance.<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `State`<br>
    **説明**: ボリュームのアタッチメント状態。<br>
   - `volume_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `VolumeId`<br>
    **説明**: ボリュームの ID。<br>
## `availability_zone`
**タイプ**: `STRING`<br>
**Provider name**: `AvailabilityZone`<br>
**説明**: ボリュームのアベイラビリティゾーン。<br>
## `create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `CreateTime`<br>
**説明**: ボリュームの作成が開始されたときのタイムスタンプ。<br>
## `encrypted`
**タイプ**: `BOOLEAN`<br>
**Provider name**: `Encrypted`<br>
**説明**: ボリュームが暗号化されているかどうかを示します。<br>
## `fast_restored`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `FastRestored`<br>
**説明**: 高速スナップショットリストアを使用してボリュームが作成されたかどうかを示します。<br>
## `iops`
**タイプ**: `INT32`<br>
**Provider name**: `Iops`<br>
**説明**: 1 秒あたりの I/O 操作数 (IOPS)。<code>gp3</code>、<code>io1</code>、<code>io2</code> ボリュームの場合、これはボリュームにプロビジョニングされる IOPS の数を表します。<code>gp2</code> ボリュームの場合、ボリュームのベースラインパフォーマンスと、バースト用の I/O クレジットの蓄積レートを表します。<br>
## `kms_key_id`
**タイプ**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**説明**: ボリュームのボリューム暗号化キーを保護するために使用された Key Management Service (KMS) KMS キーの Amazon Resource Name (ARN)。<br>
## `multi_attach_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `MultiAttachEnabled`<br>
**説明**: Amazon EBS Multi-Attach が有効かどうかを示します。<br>
## `outpost_arn`
**タイプ**: `STRING`<br>
**Provider name**: `OutpostArn`<br>
**Description**: The Amazon Resource Name (ARN) of the Outpost.<br>
## `size`
**タイプ**: `INT32`<br>
**Provider name**: `Size`<br>
**説明**: ボリュームのサイズ (GiB 単位)。<br>
## `snapshot_id`
**タイプ**: `STRING`<br>
**Provider name**: `SnapshotId`<br>
**説明**: ボリュームが作成されたスナップショット (該当する場合)。<br>
## `state`
**タイプ**: `STRING`<br>
**Provider name**: `State`<br>
**説明**: ボリュームの状態。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `throughput`
**タイプ**: `INT32`<br>
**プロバイダー名**: `Throughput`<br>
**説明**: ボリュームがサポートするスループット (MiB/s 単位)。<br>
## `volume_arn`
**タイプ**: `STRING`<br>
## `volume_id`
**タイプ**: `STRING`<br>
**Provider name**: `VolumeId`<br>
**説明**: ボリュームの ID。<br>
## `volume_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `VolumeType`<br>
**説明**: ボリュームの種類。<br>