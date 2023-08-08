---
dependencies: []
disable_edit: true
---
# aws_ebs_snapshot

## `account_id`
**Type**: `STRING`<br>
## `create_volume_permissions`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `CreateVolumePermissions`<br>
**Description**: The users and groups that have the permissions for creating volumes from the snapshot.<br>
   - `group`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Group`<br>
    **Description**: The group to be added or removed. The possible value is <code>all</code>.<br>
   - `user_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `UserId`<br>
    **Description**: The ID of the Amazon Web Services account to be added or removed.<br>
## `data_encryption_key_id`
**Type**: `STRING`<br>
**Provider name**: `DataEncryptionKeyId`<br>
**Description**: The data encryption key identifier for the snapshot. This value is a unique identifier that corresponds to the data encryption key that was used to encrypt the original volume or snapshot copy. Because data encryption keys are inherited by volumes created from snapshots, and vice versa, if snapshots share the same data encryption key identifier, then they belong to the same volume/snapshot lineage. This parameter is only returned by DescribeSnapshots.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `Description`<br>
**Description**: The description for the snapshot.<br>
## `encrypted`
**Type**: `BOOLEAN`<br>
**Provider name**: `Encrypted`<br>
**Description**: Indicates whether the snapshot is encrypted.<br>
## `kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**Description**: The Amazon Resource Name (ARN) of the Key Management Service (KMS) KMS key that was used to protect the volume encryption key for the parent volume.<br>
## `outpost_arn`
**Type**: `STRING`<br>
**Provider name**: `OutpostArn`<br>
**Description**: The ARN of the Outpost on which the snapshot is stored. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshots-outposts.html">Amazon EBS local snapshots on Outposts</a> in the <i>Amazon Elastic Compute Cloud User Guide</i>.<br>
## `owner_alias`
**Type**: `STRING`<br>
**Provider name**: `OwnerAlias`<br>
**Description**: The Amazon Web Services owner alias, from an Amazon-maintained list (<code>amazon</code>). This is not the user-configured Amazon Web Services account alias set using the IAM console.<br>
## `owner_id`
**Type**: `STRING`<br>
**Provider name**: `OwnerId`<br>
**Description**: The ID of the Amazon Web Services account that owns the EBS snapshot.<br>
## `progress`
**Type**: `STRING`<br>
**Provider name**: `Progress`<br>
**Description**: The progress of the snapshot, as a percentage.<br>
## `restore_expiry_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `RestoreExpiryTime`<br>
**Description**: Only for archived snapshots that are temporarily restored. Indicates the date and time when a temporarily restored snapshot will be automatically re-archived.<br>
## `snapshot_arn`
**Type**: `STRING`<br>
## `snapshot_id`
**Type**: `STRING`<br>
**Provider name**: `SnapshotId`<br>
**Description**: The ID of the EBS snapshot.<br>
## `start_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `StartTime`<br>
**Description**: The time stamp when the snapshot was initiated.<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `State`<br>
**Description**: The snapshot state.<br>
## `state_message`
**Type**: `STRING`<br>
**Provider name**: `StateMessage`<br>
**Description**: Encrypted Amazon EBS snapshots are copied asynchronously. If a snapshot copy operation fails (for example, if the proper Key Management Service (KMS) permissions are not obtained) this field displays error state details to help you diagnose why the error occurred. This parameter is only returned by DescribeSnapshots.<br>
## `storage_tier`
**Type**: `STRING`<br>
**Provider name**: `StorageTier`<br>
**Description**: The storage tier in which the snapshot is stored. <code>standard</code> indicates that the snapshot is stored in the standard snapshot storage tier and that it is ready for use. <code>archive</code> indicates that the snapshot is currently archived and that it must be restored before it can be used.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `volume_id`
**Type**: `STRING`<br>
**Provider name**: `VolumeId`<br>
**Description**: The ID of the volume that was used to create the snapshot. Snapshots created by the CopySnapshot action have an arbitrary volume ID that should not be used for any purpose.<br>
## `volume_size`
**Type**: `INT32`<br>
**Provider name**: `VolumeSize`<br>
**Description**: The size of the volume, in GiB.<br>
