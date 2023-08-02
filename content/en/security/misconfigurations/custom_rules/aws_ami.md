---
dependencies: []
disable_edit: true
---
# aws_ami

## `account_id`
**Type**: `STRING`<br>
## `architecture`
**Type**: `STRING`<br>
**Provider name**: `Architecture`<br>
**Description**: The architecture of the image.<br>
## `arn`
**Type**: `STRING`<br>
## `block_device_mappings`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `BlockDeviceMappings`<br>
**Description**: Any block device mapping entries.<br>
   - `device_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DeviceName`<br>
    **Description**: The device name (for example, <code>/dev/sdh</code> or <code>xvdh</code>).<br>
   - `ebs`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Ebs`<br>
    **Description**: Parameters used to automatically set up EBS volumes when the instance is launched.<br>
       - `delete_on_termination`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `DeleteOnTermination`<br>
        **Description**: Indicates whether the EBS volume is deleted on instance termination. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html#preserving-volumes-on-termination">Preserving Amazon EBS volumes on instance termination</a> in the <i>Amazon EC2 User Guide</i>.<br>
       - `encrypted`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `Encrypted`<br>
        **Description**: Indicates whether the encryption state of an EBS volume is changed while being restored from a backing snapshot. The effect of setting the encryption state to <code>true</code> depends on the volume origin (new or from a snapshot), starting encryption state, ownership, and whether encryption by default is enabled. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-parameters">Amazon EBS encryption</a> in the <i>Amazon EC2 User Guide</i>. In no case can you remove encryption from an encrypted volume. Encrypted volumes can only be attached to instances that support Amazon EBS encryption. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_supported_instances">Supported instance types</a>. This parameter is not returned by <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImageAttribute.html">DescribeImageAttribute</a>.<br>
       - `iops`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Iops`<br>
        **Description**: The number of I/O operations per second (IOPS). For <code>gp3</code>, <code>io1</code>, and <code>io2</code> volumes, this represents the number of IOPS that are provisioned for the volume. For <code>gp2</code> volumes, this represents the baseline performance of the volume and the rate at which the volume accumulates I/O credits for bursting. The following are the supported values for each volume type: <ul> <li>  <code>gp3</code>: 3,000-16,000 IOPS </li> <li>  <code>io1</code>: 100-64,000 IOPS </li> <li>  <code>io2</code>: 100-64,000 IOPS </li> </ul> For <code>io1</code> and <code>io2</code> volumes, we guarantee 64,000 IOPS only for <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances">Instances built on the Nitro System</a>. Other instance families guarantee performance up to 32,000 IOPS. This parameter is required for <code>io1</code> and <code>io2</code> volumes. The default for <code>gp3</code> volumes is 3,000 IOPS. This parameter is not supported for <code>gp2</code>, <code>st1</code>, <code>sc1</code>, or <code>standard</code> volumes.<br>
       - `kms_key_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `KmsKeyId`<br>
        **Description**: Identifier (key ID, key alias, ID ARN, or alias ARN) for a customer managed CMK under which the EBS volume is encrypted. This parameter is only supported on <code>BlockDeviceMapping</code> objects called by <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RunInstances.html">RunInstances</a>, <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RequestSpotFleet.html">RequestSpotFleet</a>, and <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RequestSpotInstances.html">RequestSpotInstances</a>.<br>
       - `outpost_arn`<br>
        **Type**: `STRING`<br>
        **Provider name**: `OutpostArn`<br>
        **Description**: The ARN of the Outpost on which the snapshot is stored. This parameter is only supported on <code>BlockDeviceMapping</code> objects called by <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateImage.html"> CreateImage</a>.<br>
       - `snapshot_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `SnapshotId`<br>
        **Description**: The ID of the snapshot.<br>
       - `throughput`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Throughput`<br>
        **Description**: The throughput that the volume supports, in MiB/s. This parameter is valid only for <code>gp3</code> volumes. Valid Range: Minimum value of 125. Maximum value of 1000.<br>
       - `volume_size`<br>
        **Type**: `INT32`<br>
        **Provider name**: `VolumeSize`<br>
        **Description**: The size of the volume, in GiBs. You must specify either a snapshot ID or a volume size. If you specify a snapshot, the default is the snapshot size. You can specify a volume size that is equal to or larger than the snapshot size. The following are the supported volumes sizes for each volume type: <ul> <li>  <code>gp2</code> and <code>gp3</code>:1-16,384 </li> <li>  <code>io1</code> and <code>io2</code>: 4-16,384 </li> <li>  <code>st1</code> and <code>sc1</code>: 125-16,384 </li> <li>  <code>standard</code>: 1-1,024 </li> </ul>
       - `volume_type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VolumeType`<br>
        **Description**: The volume type. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumeTypes.html">Amazon EBS volume types</a> in the <i>Amazon EC2 User Guide</i>. If the volume type is <code>io1</code> or <code>io2</code>, you must specify the IOPS that the volume supports.<br>
   - `no_device`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NoDevice`<br>
    **Description**: To omit the device from the block device mapping, specify an empty string. When this property is specified, the device is removed from the block device mapping regardless of the assigned value.<br>
   - `virtual_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VirtualName`<br>
    **Description**: The virtual device name (<code>ephemeral</code>N). Instance store volumes are numbered starting from 0. An instance type with 2 available instance store volumes can specify mappings for <code>ephemeral0</code> and <code>ephemeral1</code>. The number of available instance store volumes depends on the instance type. After you connect to the instance, you must mount the volume. NVMe instance store volumes are automatically enumerated and assigned a device name. Including them in your block device mapping has no effect. Constraints: For M3 instances, you must specify instance store volumes in the block device mapping for the instance. When you launch an M3 instance, we ignore any instance store volumes specified in the block device mapping for the AMI.<br>
## `boot_mode`
**Type**: `STRING`<br>
**Provider name**: `BootMode`<br>
**Description**: The boot mode of the image. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ami-boot.html">Boot modes</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `creation_date`
**Type**: `STRING`<br>
**Provider name**: `CreationDate`<br>
**Description**: The date and time the image was created.<br>
## `deprecation_time`
**Type**: `STRING`<br>
**Provider name**: `DeprecationTime`<br>
**Description**: The date and time to deprecate the AMI, in UTC, in the following format: <i>YYYY</i>-<i>MM</i>-<i>DD</i>T<i>HH</i>:<i>MM</i>:<i>SS</i>Z. If you specified a value for seconds, Amazon EC2 rounds the seconds to the nearest minute.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `Description`<br>
**Description**: The description of the AMI that was provided during image creation.<br>
## `ena_support`
**Type**: `BOOLEAN`<br>
**Provider name**: `EnaSupport`<br>
**Description**: Specifies whether enhanced networking with ENA is enabled.<br>
## `hypervisor`
**Type**: `STRING`<br>
**Provider name**: `Hypervisor`<br>
**Description**: The hypervisor type of the image.<br>
## `image_id`
**Type**: `STRING`<br>
**Provider name**: `ImageId`<br>
**Description**: The ID of the AMI.<br>
## `image_location`
**Type**: `STRING`<br>
**Provider name**: `ImageLocation`<br>
**Description**: The location of the AMI.<br>
## `image_owner_alias`
**Type**: `STRING`<br>
**Provider name**: `ImageOwnerAlias`<br>
**Description**: The Amazon Web Services account alias (for example, <code>amazon</code>, <code>self</code>) or the Amazon Web Services account ID of the AMI owner.<br>
## `image_type`
**Type**: `STRING`<br>
**Provider name**: `ImageType`<br>
**Description**: The type of image.<br>
## `imds_support`
**Type**: `STRING`<br>
**Provider name**: `ImdsSupport`<br>
**Description**: If <code>v2.0</code>, it indicates that IMDSv2 is specified in the AMI. Instances launched from this AMI will have <code>HttpTokens</code> automatically set to <code>required</code> so that, by default, the instance requires that IMDSv2 is used when requesting instance metadata. In addition, <code>HttpPutResponseHopLimit</code> is set to <code>2</code>. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-IMDS-new-instances.html#configure-IMDS-new-instances-ami-configuration">Configure the AMI</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `kernel_id`
**Type**: `STRING`<br>
**Provider name**: `KernelId`<br>
**Description**: The kernel associated with the image, if any. Only applicable for machine images.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `Name`<br>
**Description**: The name of the AMI that was provided during image creation.<br>
## `owner_id`
**Type**: `STRING`<br>
**Provider name**: `OwnerId`<br>
**Description**: The ID of the Amazon Web Services account that owns the image.<br>
## `platform`
**Type**: `STRING`<br>
**Provider name**: `Platform`<br>
**Description**: This value is set to <code>windows</code> for Windows AMIs; otherwise, it is blank.<br>
## `platform_details`
**Type**: `STRING`<br>
**Provider name**: `PlatformDetails`<br>
**Description**: The platform details associated with the billing code of the AMI. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ami-billing-info.html">Understand AMI billing information</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `product_codes`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ProductCodes`<br>
**Description**: Any product codes associated with the AMI.<br>
   - `product_code_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ProductCodeId`<br>
    **Description**: The product code.<br>
   - `product_code_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ProductCodeType`<br>
    **Description**: The type of product code.<br>
## `public`
**Type**: `BOOLEAN`<br>
**Provider name**: `Public`<br>
**Description**: Indicates whether the image has public launch permissions. The value is <code>true</code> if this image has public launch permissions or <code>false</code> if it has only implicit and explicit launch permissions.<br>
## `ramdisk_id`
**Type**: `STRING`<br>
**Provider name**: `RamdiskId`<br>
**Description**: The RAM disk associated with the image, if any. Only applicable for machine images.<br>
## `root_device_name`
**Type**: `STRING`<br>
**Provider name**: `RootDeviceName`<br>
**Description**: The device name of the root device volume (for example, <code>/dev/sda1</code>).<br>
## `root_device_type`
**Type**: `STRING`<br>
**Provider name**: `RootDeviceType`<br>
**Description**: The type of root device used by the AMI. The AMI can use an Amazon EBS volume or an instance store volume.<br>
## `sriov_net_support`
**Type**: `STRING`<br>
**Provider name**: `SriovNetSupport`<br>
**Description**: Specifies whether enhanced networking with the Intel 82599 Virtual Function interface is enabled.<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `State`<br>
**Description**: The current state of the AMI. If the state is <code>available</code>, the image is successfully registered and can be used to launch an instance.<br>
## `state_reason`
**Type**: `STRUCT`<br>
**Provider name**: `StateReason`<br>
**Description**: The reason for the state change.<br>
   - `code`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Code`<br>
    **Description**: The reason code for the state change.<br>
   - `message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Message`<br>
    **Description**: The message for the state change. <ul> <li>  <code>Server.InsufficientInstanceCapacity</code>: There was insufficient capacity available to satisfy the launch request. </li> <li>  <code>Server.InternalError</code>: An internal error caused the instance to terminate during launch. </li> <li>  <code>Server.ScheduledStop</code>: The instance was stopped due to a scheduled retirement. </li> <li>  <code>Server.SpotInstanceShutdown</code>: The instance was stopped because the number of Spot requests with a maximum price equal to or higher than the Spot price exceeded available capacity or because of an increase in the Spot price. </li> <li>  <code>Server.SpotInstanceTermination</code>: The instance was terminated because the number of Spot requests with a maximum price equal to or higher than the Spot price exceeded available capacity or because of an increase in the Spot price. </li> <li>  <code>Client.InstanceInitiatedShutdown</code>: The instance was shut down using the <code>shutdown -h</code> command from the instance. </li> <li>  <code>Client.InstanceTerminated</code>: The instance was terminated or rebooted during AMI creation. </li> <li>  <code>Client.InternalError</code>: A client error caused the instance to terminate during launch. </li> <li>  <code>Client.InvalidSnapshot.NotFound</code>: The specified snapshot was not found. </li> <li>  <code>Client.UserInitiatedHibernate</code>: Hibernation was initiated on the instance. </li> <li>  <code>Client.UserInitiatedShutdown</code>: The instance was shut down using the Amazon EC2 API. </li> <li>  <code>Client.VolumeLimitExceeded</code>: The limit on the number of EBS volumes or total storage was exceeded. Decrease usage or request an increase in your account limits. </li> </ul>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `tpm_support`
**Type**: `STRING`<br>
**Provider name**: `TpmSupport`<br>
**Description**: If the image is configured for NitroTPM support, the value is <code>v2.0</code>. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nitrotpm.html">NitroTPM</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `usage_operation`
**Type**: `STRING`<br>
**Provider name**: `UsageOperation`<br>
**Description**: The operation of the Amazon EC2 instance and the billing code that is associated with the AMI. <code>usageOperation</code> corresponds to the <a href="https://docs.aws.amazon.com/cur/latest/userguide/Lineitem-columns.html#Lineitem-details-O-Operation">lineitem/Operation</a> column on your Amazon Web Services Cost and Usage Report and in the <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html">Amazon Web Services Price List API</a>. You can view these fields on the <b>Instances</b> or <b>AMIs</b> pages in the Amazon EC2 console, or in the responses that are returned by the <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImages.html">DescribeImages</a> command in the Amazon EC2 API, or the <a href="https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html">describe-images</a> command in the CLI.<br>
## `virtualization_type`
**Type**: `STRING`<br>
**Provider name**: `VirtualizationType`<br>
**Description**: The type of virtualization of the AMI.<br>
