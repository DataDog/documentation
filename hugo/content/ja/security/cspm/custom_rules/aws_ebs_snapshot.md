---
dependencies: []
disable_edit: true
---
# aws_ebs_snapshot

## `account_id`
**タイプ**: `STRING`<br>
## `create_volume_permissions`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `CreateVolumePermissions`<br>
**説明**: スナップショットからボリュームを作成するための権限を持つユーザーとグループ。<br>
   - `group`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Group`<br>
    **説明**: 追加または削除されるグループ。指定できる値は <code>all</code> です。<br>
   - `user_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `UserId`<br>
    **説明**: 追加・削除する Amazon Web Services アカウントの ID。<br>
## `data_encryption_key_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `DataEncryptionKeyId`<br>
**説明**: スナップショットのデータ暗号化キー識別子。この値は、元のボリュームまたはスナップショットのコピーを暗号化するために使用されたデータ暗号化キーに対応する一意の識別子です。データ暗号化キーはスナップショットから作成されたボリュームによって継承され、逆にスナップショットが同じデータ暗号化キー識別子を共有する場合、それらは同じボリューム/スナップショットの系譜に属します。このパラメーターは、DescribeSnapshots によってのみ返されます。<br>
## `description`
**タイプ**: `STRING`<br>
**Provider name**: `Description`<br>
**説明**: スナップショットの説明文。<br>
## `encrypted`
**タイプ**: `BOOLEAN`<br>
**Provider name**: `Encrypted`<br>
**説明**: スナップショットが暗号化されているかどうかを示します。<br>
## `kms_key_id`
**タイプ**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**説明**: 親ボリュームのボリューム暗号化キーを保護するために使用された Key Management Service (KMS) KMS キーの Amazon Resource Name (ARN)。<br>
## `outpost_arn`
**タイプ**: `STRING`<br>
**Provider name**: `OutpostArn`<br>
**説明**: スナップショットが保存されている Outpost の ARN。詳細については、<i>Amazon Elastic Compute Cloud ユーザーガイド</i>の <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshots-outposts.html">Outposts 上の Amazon EBS ローカルスナップショット</a>を参照してください。<br>
## `owner_alias`
**タイプ**: `STRING`<br>
**プロバイダー名**: `OwnerAlias`<br>
**説明**: Amazon が管理するリスト (<code>amazon</code>) からの、Amazon Web Services のオーナーエイリアス。これは、IAM コンソールを使用して設定されたユーザー構成の Amazon Web Services アカウントエイリアスではありません。<br>
## `owner_id`
**タイプ**: `STRING`<br>
**Provider name**: `OwnerId`<br>
**説明**: EBS スナップショットを所有する Amazon Web Services アカウントの ID。<br>
## `progress`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Progress`<br>
**説明**: スナップショットの進捗状況 (パーセンテージ)。<br>
## `restore_expiry_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `RestoreExpiryTime`<br>
**説明**: 一時的にリストアされるアーカイブされたスナップショットのみ。一時的に復元されたスナップショットが自動的に再アーカイブされる日時を示します。<br>
## `snapshot_arn`
**タイプ**: `STRING`<br>
## `snapshot_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnapshotId`<br>
**説明**: EBS スナップショットの ID。<br>
## `start_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `StartTime`<br>
**説明**: スナップショットが開始されたときのタイムスタンプ。<br>
## `state`
**タイプ**: `STRING`<br>
**Provider name**: `State`<br>
**説明**: スナップショットの状態。<br>
## `state_message`
**タイプ**: `STRING`<br>
**プロバイダー名**: `StateMessage`<br>
**説明**: 暗号化された Amazon EBS スナップショットは、非同期でコピーされます。スナップショットコピー操作が失敗した場合 (たとえば、適切な Key Management Service (KMS) 権限が得られない場合)、このフィールドにはエラー状態の詳細が表示され、エラーが発生した理由を診断するのに役立ちます。このパラメーターは、DescribeSnapshots によってのみ返されます。<br>
## `storage_tier`
**タイプ**: `STRING`<br>
**プロバイダー名**: `StorageTier`<br>
**説明**: スナップショットが保存されているストレージ階層。<code>standard</code> は、スナップショットが標準的なスナップショットストレージ層に保存されており、使用可能であることを示します。 <code>archive</code> は、スナップショットが現在アーカイブされており、使用する前にリストアする必要があることを示します。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `volume_id`
**タイプ**: `STRING`<br>
**Provider name**: `VolumeId`<br>
**説明**: スナップショットを作成するために使用されたボリュームの ID。CopySnapshot アクションで作成されたスナップショットには、任意のボリューム ID が設定されます。<br>
## `volume_size`
**タイプ**: `INT32`<br>
**プロバイダー名**: `VolumeSize`<br>
**説明**: ボリュームのサイズ (GiB 単位)。<br>