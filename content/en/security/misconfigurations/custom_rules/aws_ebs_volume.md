---
dependencies: []
disable_edit: true
---
# aws_ebs_volume

## `account_id`
**Type**: `STRING`<br>
## `attachments`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Attachments`<br>
**Description**: Information about the volume attachments.<br>
   - `attach_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `AttachTime`<br>
    **Description**: The time stamp when the attachment initiated.<br>
   - `delete_on_termination`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `DeleteOnTermination`<br>
    **Description**: Indicates whether the EBS volume is deleted on instance termination.<br>
   - `device`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Device`<br>
    **Description**: The device name.<br>
   - `instance_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `InstanceId`<br>
    **Description**: The ID of the instance.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `State`<br>
    **Description**: The attachment state of the volume.<br>
   - `volume_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VolumeId`<br>
    **Description**: The ID of the volume.<br>
## `availability_zone`
**Type**: `STRING`<br>
**Provider name**: `AvailabilityZone`<br>
**Description**: The Availability Zone for the volume.<br>
## `create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `CreateTime`<br>
**Description**: The time stamp when volume creation was initiated.<br>
## `encrypted`
**Type**: `BOOLEAN`<br>
**Provider name**: `Encrypted`<br>
**Description**: Indicates whether the volume is encrypted.<br>
## `fast_restored`
**Type**: `BOOLEAN`<br>
**Provider name**: `FastRestored`<br>
**Description**: Indicates whether the volume was created using fast snapshot restore.<br>
## `iops`
**Type**: `INT32`<br>
**Provider name**: `Iops`<br>
**Description**: The number of I/O operations per second (IOPS). For <code>gp3</code>, <code>io1</code>, and <code>io2</code> volumes, this represents the number of IOPS that are provisioned for the volume. For <code>gp2</code> volumes, this represents the baseline performance of the volume and the rate at which the volume accumulates I/O credits for bursting.<br>
## `kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**Description**: The Amazon Resource Name (ARN) of the Key Management Service (KMS) KMS key that was used to protect the volume encryption key for the volume.<br>
## `multi_attach_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `MultiAttachEnabled`<br>
**Description**: Indicates whether Amazon EBS Multi-Attach is enabled.<br>
## `outpost_arn`
**Type**: `STRING`<br>
**Provider name**: `OutpostArn`<br>
**Description**: The Amazon Resource Name (ARN) of the Outpost.<br>
## `size`
**Type**: `INT32`<br>
**Provider name**: `Size`<br>
**Description**: The size of the volume, in GiBs.<br>
## `snapshot_id`
**Type**: `STRING`<br>
**Provider name**: `SnapshotId`<br>
**Description**: The snapshot from which the volume was created, if applicable.<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `State`<br>
**Description**: The volume state.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `throughput`
**Type**: `INT32`<br>
**Provider name**: `Throughput`<br>
**Description**: The throughput that the volume supports, in MiB/s.<br>
## `volume_arn`
**Type**: `STRING`<br>
## `volume_id`
**Type**: `STRING`<br>
**Provider name**: `VolumeId`<br>
**Description**: The ID of the volume.<br>
## `volume_type`
**Type**: `STRING`<br>
**Provider name**: `VolumeType`<br>
**Description**: The volume type.<br>
