---
dependencies: []
disable_edit: true
---
# aws_ec2_instance

## `account_id`
**Type**: `STRING`<br>
## `ami_launch_index`
**Type**: `INT32`<br>
**Provider name**: `AmiLaunchIndex`<br>
**Description**: The AMI launch index, which can be used to find this instance in the launch group.<br>
## `architecture`
**Type**: `STRING`<br>
**Provider name**: `Architecture`<br>
**Description**: The architecture of the image.<br>
## `block_device_mappings`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `BlockDeviceMappings`<br>
**Description**: Any block device mapping entries for the instance.<br>
   - `device_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DeviceName`<br>
    **Description**: The device name (for example, <code>/dev/sdh</code> or <code>xvdh</code>).<br>
   - `ebs`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Ebs`<br>
    **Description**: Parameters used to automatically set up EBS volumes when the instance is launched.<br>
       - `attach_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `AttachTime`<br>
        **Description**: The time stamp when the attachment initiated.<br>
       - `delete_on_termination`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `DeleteOnTermination`<br>
        **Description**: Indicates whether the volume is deleted on instance termination.<br>
       - `status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Status`<br>
        **Description**: The attachment state.<br>
       - `volume_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VolumeId`<br>
        **Description**: The ID of the EBS volume.<br>
## `boot_mode`
**Type**: `STRING`<br>
**Provider name**: `BootMode`<br>
**Description**: The boot mode of the instance. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ami-boot.html">Boot modes</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `capacity_reservation_id`
**Type**: `STRING`<br>
**Provider name**: `CapacityReservationId`<br>
**Description**: The ID of the Capacity Reservation.<br>
## `capacity_reservation_specification`
**Type**: `STRUCT`<br>
**Provider name**: `CapacityReservationSpecification`<br>
**Description**: Information about the Capacity Reservation targeting option.<br>
   - `capacity_reservation_preference`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CapacityReservationPreference`<br>
    **Description**: Describes the instance's Capacity Reservation preferences. Possible preferences include: <ul> <li>  <code>open</code> - The instance can run in any <code>open</code> Capacity Reservation that has matching attributes (instance type, platform, Availability Zone). </li> <li>  <code>none</code> - The instance avoids running in a Capacity Reservation even if one is available. The instance runs in On-Demand capacity. </li> </ul>
   - `capacity_reservation_target`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `CapacityReservationTarget`<br>
    **Description**: Information about the targeted Capacity Reservation or Capacity Reservation group.<br>
       - `capacity_reservation_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CapacityReservationId`<br>
        **Description**: The ID of the targeted Capacity Reservation.<br>
       - `capacity_reservation_resource_group_arn`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CapacityReservationResourceGroupArn`<br>
        **Description**: The ARN of the targeted Capacity Reservation group.<br>
## `client_token`
**Type**: `STRING`<br>
**Provider name**: `ClientToken`<br>
**Description**: The idempotency token you provided when you launched the instance, if applicable.<br>
## `cpu_options`
**Type**: `STRUCT`<br>
**Provider name**: `CpuOptions`<br>
**Description**: The CPU options for the instance.<br>
   - `core_count`<br>
    **Type**: `INT32`<br>
    **Provider name**: `CoreCount`<br>
    **Description**: The number of CPU cores for the instance.<br>
   - `threads_per_core`<br>
    **Type**: `INT32`<br>
    **Provider name**: `ThreadsPerCore`<br>
    **Description**: The number of threads per CPU core.<br>
## `ebs_optimized`
**Type**: `BOOLEAN`<br>
**Provider name**: `EbsOptimized`<br>
**Description**: Indicates whether the instance is optimized for Amazon EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal I/O performance. This optimization isn't available with all instance types. Additional usage charges apply when using an EBS Optimized instance.<br>
## `elastic_gpu_associations`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ElasticGpuAssociations`<br>
**Description**: The Elastic GPU associated with the instance.<br>
   - `elastic_gpu_association_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticGpuAssociationId`<br>
    **Description**: The ID of the association.<br>
   - `elastic_gpu_association_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticGpuAssociationState`<br>
    **Description**: The state of the association between the instance and the Elastic Graphics accelerator.<br>
   - `elastic_gpu_association_time`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticGpuAssociationTime`<br>
    **Description**: The time the Elastic Graphics accelerator was associated with the instance.<br>
   - `elastic_gpu_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticGpuId`<br>
    **Description**: The ID of the Elastic Graphics accelerator.<br>
## `elastic_inference_accelerator_associations`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ElasticInferenceAcceleratorAssociations`<br>
**Description**: The elastic inference accelerator associated with the instance.<br>
   - `elastic_inference_accelerator_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticInferenceAcceleratorArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the elastic inference accelerator.<br>
   - `elastic_inference_accelerator_association_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticInferenceAcceleratorAssociationId`<br>
    **Description**: The ID of the association.<br>
   - `elastic_inference_accelerator_association_state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ElasticInferenceAcceleratorAssociationState`<br>
    **Description**: The state of the elastic inference accelerator.<br>
   - `elastic_inference_accelerator_association_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `ElasticInferenceAcceleratorAssociationTime`<br>
    **Description**: The time at which the elastic inference accelerator is associated with an instance.<br>
## `ena_support`
**Type**: `BOOLEAN`<br>
**Provider name**: `EnaSupport`<br>
**Description**: Specifies whether enhanced networking with ENA is enabled.<br>
## `enclave_options`
**Type**: `STRUCT`<br>
**Provider name**: `EnclaveOptions`<br>
**Description**: Indicates whether the instance is enabled for Amazon Web Services Nitro Enclaves.<br>
   - `enabled`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Enabled`<br>
    **Description**: If this parameter is set to <code>true</code>, the instance is enabled for Amazon Web Services Nitro Enclaves; otherwise, it is not enabled for Amazon Web Services Nitro Enclaves.<br>
## `hibernation_options`
**Type**: `STRUCT`<br>
**Provider name**: `HibernationOptions`<br>
**Description**: Indicates whether the instance is enabled for hibernation.<br>
   - `configured`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Configured`<br>
    **Description**: If this parameter is set to <code>true</code>, your instance is enabled for hibernation; otherwise, it is not enabled for hibernation.<br>
## `hypervisor`
**Type**: `STRING`<br>
**Provider name**: `Hypervisor`<br>
**Description**: The hypervisor type of the instance. The value <code>xen</code> is used for both Xen and Nitro hypervisors.<br>
## `iam_instance_profile`
**Type**: `STRUCT`<br>
**Provider name**: `IamInstanceProfile`<br>
**Description**: The IAM instance profile associated with the instance, if applicable.<br>
   - `arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **Description**: The Amazon Resource Name (ARN) of the instance profile.<br>
   - `id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Id`<br>
    **Description**: The ID of the instance profile.<br>
## `image_id`
**Type**: `STRING`<br>
**Provider name**: `ImageId`<br>
**Description**: The ID of the AMI used to launch the instance.<br>
## `instance_arn`
**Type**: `STRING`<br>
## `instance_id`
**Type**: `STRING`<br>
**Provider name**: `InstanceId`<br>
**Description**: The ID of the instance.<br>
## `instance_lifecycle`
**Type**: `STRING`<br>
**Provider name**: `InstanceLifecycle`<br>
**Description**: Indicates whether this is a Spot Instance or a Scheduled Instance.<br>
## `instance_type`
**Type**: `STRING`<br>
**Provider name**: `InstanceType`<br>
**Description**: The instance type.<br>
## `ipv6_address`
**Type**: `STRING`<br>
**Provider name**: `Ipv6Address`<br>
**Description**: The IPv6 address assigned to the instance.<br>
## `kernel_id`
**Type**: `STRING`<br>
**Provider name**: `KernelId`<br>
**Description**: The kernel associated with this instance, if applicable.<br>
## `key_name`
**Type**: `STRING`<br>
**Provider name**: `KeyName`<br>
**Description**: The name of the key pair, if this instance was launched with an associated key pair.<br>
## `launch_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `LaunchTime`<br>
**Description**: The time the instance was launched.<br>
## `licenses`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Licenses`<br>
**Description**: The license configurations for the instance.<br>
   - `license_configuration_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LicenseConfigurationArn`<br>
    **Description**: The Amazon Resource Name (ARN) of the license configuration.<br>
## `maintenance_options`
**Type**: `STRUCT`<br>
**Provider name**: `MaintenanceOptions`<br>
**Description**: Provides information on the recovery and maintenance options of your instance.<br>
   - `auto_recovery`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AutoRecovery`<br>
    **Description**: Provides information on the current automatic recovery behavior of your instance.<br>
## `metadata_options`
**Type**: `STRUCT`<br>
**Provider name**: `MetadataOptions`<br>
**Description**: The metadata options for the instance.<br>
   - `http_endpoint`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HttpEndpoint`<br>
    **Description**: Indicates whether the HTTP metadata endpoint on your instances is enabled or disabled. If the value is <code>disabled</code>, you cannot access your instance metadata.<br>
   - `http_protocol_ipv6`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HttpProtocolIpv6`<br>
    **Description**: Indicates whether the IPv6 endpoint for the instance metadata service is enabled or disabled.<br>
   - `http_put_response_hop_limit`<br>
    **Type**: `INT32`<br>
    **Provider name**: `HttpPutResponseHopLimit`<br>
    **Description**: The desired HTTP PUT response hop limit for instance metadata requests. The larger the number, the further instance metadata requests can travel.<br>
    **Default**: 1</p> <p>Possible values: Integers from 1 to 64
   - `http_tokens`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HttpTokens`<br>
    **Description**: IMDSv2 uses token-backed sessions. Indicates whether the use of HTTP tokens is <code>optional</code> (in other words, indicates whether the use of IMDSv2 is <code>optional</code>) or <code>required</code> (in other words, indicates whether the use of IMDSv2 is <code>required</code>). <ul> <li>  <code>optional</code> - When IMDSv2 is optional, you can choose to retrieve instance metadata with or without a session token in your request. If you retrieve the IAM role credentials without a token, the IMDSv1 role credentials are returned. If you retrieve the IAM role credentials using a valid session token, the IMDSv2 role credentials are returned. </li> <li>  <code>required</code> - When IMDSv2 is required, you must send a session token with any instance metadata retrieval requests. In this state, retrieving the IAM role credentials always returns IMDSv2 credentials; IMDSv1 credentials are not available. </li> </ul>
    **Default**: <code>optional</code>
   - `instance_metadata_tags`<br>
    **Type**: `STRING`<br>
    **Provider name**: `InstanceMetadataTags`<br>
    **Description**: Indicates whether access to instance tags from the instance metadata is enabled or disabled. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#work-with-tags-in-IMDS">Work with instance tags using the instance metadata</a>.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `State`<br>
    **Description**: The state of the metadata option changes.  <code>pending</code> - The metadata options are being updated and the instance is not ready to process metadata traffic with the new selection.  <code>applied</code> - The metadata options have been successfully applied on the instance.<br>
## `monitoring`
**Type**: `STRUCT`<br>
**Provider name**: `Monitoring`<br>
**Description**: The monitoring for the instance.<br>
   - `state`<br>
    **Type**: `STRING`<br>
    **Provider name**: `State`<br>
    **Description**: Indicates whether detailed monitoring is enabled. Otherwise, basic monitoring is enabled.<br>
## `network_interfaces`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `NetworkInterfaces`<br>
**Description**: [EC2-VPC] The network interfaces for the instance.<br>
   - `association`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Association`<br>
    **Description**: The association information for an Elastic IPv4 associated with the network interface.<br>
       - `carrier_ip`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CarrierIp`<br>
        **Description**: The carrier IP address associated with the network interface.<br>
       - `customer_owned_ip`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CustomerOwnedIp`<br>
        **Description**: The customer-owned IP address associated with the network interface.<br>
       - `ip_owner_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `IpOwnerId`<br>
        **Description**: The ID of the owner of the Elastic IP address.<br>
       - `public_dns_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PublicDnsName`<br>
        **Description**: The public DNS name.<br>
       - `public_ip`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PublicIp`<br>
        **Description**: The public IP address or Elastic IP address bound to the network interface.<br>
   - `attachment`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Attachment`<br>
    **Description**: The network interface attachment.<br>
       - `attach_time`<br>
        **Type**: `TIMESTAMP`<br>
        **Provider name**: `AttachTime`<br>
        **Description**: The time stamp when the attachment initiated.<br>
       - `attachment_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `AttachmentId`<br>
        **Description**: The ID of the network interface attachment.<br>
       - `delete_on_termination`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `DeleteOnTermination`<br>
        **Description**: Indicates whether the network interface is deleted when the instance is terminated.<br>
       - `device_index`<br>
        **Type**: `INT32`<br>
        **Provider name**: `DeviceIndex`<br>
        **Description**: The index of the device on the instance for the network interface attachment.<br>
       - `network_card_index`<br>
        **Type**: `INT32`<br>
        **Provider name**: `NetworkCardIndex`<br>
        **Description**: The index of the network card.<br>
       - `status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Status`<br>
        **Description**: The attachment state.<br>
   - `description`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Description`<br>
    **Description**: The description.<br>
   - `groups`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Groups`<br>
    **Description**: The security groups.<br>
       - `group_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `GroupId`<br>
        **Description**: The ID of the security group.<br>
       - `group_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `GroupName`<br>
        **Description**: The name of the security group.<br>
   - `interface_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `InterfaceType`<br>
    **Description**: The type of network interface. Valid values: <code>interface</code> | <code>efa</code> | <code>trunk</code><br>
   - `ipv4_prefixes`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Ipv4Prefixes`<br>
    **Description**: The IPv4 delegated prefixes that are assigned to the network interface.<br>
       - `ipv4_prefix`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Ipv4Prefix`<br>
        **Description**: One or more IPv4 prefixes assigned to the network interface.<br>
   - `ipv6_addresses`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Ipv6Addresses`<br>
    **Description**: The IPv6 addresses associated with the network interface.<br>
       - `ipv6_address`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Ipv6Address`<br>
        **Description**: The IPv6 address.<br>
   - `ipv6_prefixes`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Ipv6Prefixes`<br>
    **Description**: The IPv6 delegated prefixes that are assigned to the network interface.<br>
       - `ipv6_prefix`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Ipv6Prefix`<br>
        **Description**: One or more IPv6 prefixes assigned to the network interface.<br>
   - `mac_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `MacAddress`<br>
    **Description**: The MAC address.<br>
   - `network_interface_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NetworkInterfaceId`<br>
    **Description**: The ID of the network interface.<br>
   - `owner_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `OwnerId`<br>
    **Description**: The ID of the Amazon Web Services account that created the network interface.<br>
   - `private_dns_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PrivateDnsName`<br>
    **Description**: The private DNS name.<br>
   - `private_ip_address`<br>
    **Type**: `STRING`<br>
    **Provider name**: `PrivateIpAddress`<br>
    **Description**: The IPv4 address of the network interface within the subnet.<br>
   - `private_ip_addresses`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `PrivateIpAddresses`<br>
    **Description**: The private IPv4 addresses associated with the network interface.<br>
       - `association`<br>
        **Type**: `STRUCT`<br>
        **Provider name**: `Association`<br>
        **Description**: The association information for an Elastic IP address for the network interface.<br>
           - `carrier_ip`<br>
            **Type**: `STRING`<br>
            **Provider name**: `CarrierIp`<br>
            **Description**: The carrier IP address associated with the network interface.<br>
           - `customer_owned_ip`<br>
            **Type**: `STRING`<br>
            **Provider name**: `CustomerOwnedIp`<br>
            **Description**: The customer-owned IP address associated with the network interface.<br>
           - `ip_owner_id`<br>
            **Type**: `STRING`<br>
            **Provider name**: `IpOwnerId`<br>
            **Description**: The ID of the owner of the Elastic IP address.<br>
           - `public_dns_name`<br>
            **Type**: `STRING`<br>
            **Provider name**: `PublicDnsName`<br>
            **Description**: The public DNS name.<br>
           - `public_ip`<br>
            **Type**: `STRING`<br>
            **Provider name**: `PublicIp`<br>
            **Description**: The public IP address or Elastic IP address bound to the network interface.<br>
       - `primary`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `Primary`<br>
        **Description**: Indicates whether this IPv4 address is the primary private IP address of the network interface.<br>
       - `private_dns_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PrivateDnsName`<br>
        **Description**: The private IPv4 DNS name.<br>
       - `private_ip_address`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PrivateIpAddress`<br>
        **Description**: The private IPv4 address of the network interface.<br>
   - `source_dest_check`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `SourceDestCheck`<br>
    **Description**: Indicates whether source/destination checking is enabled.<br>
   - `status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Status`<br>
    **Description**: The status of the network interface.<br>
   - `subnet_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SubnetId`<br>
    **Description**: The ID of the subnet.<br>
   - `vpc_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VpcId`<br>
    **Description**: The ID of the VPC.<br>
## `outpost_arn`
**Type**: `STRING`<br>
**Provider name**: `OutpostArn`<br>
**Description**: The Amazon Resource Name (ARN) of the Outpost.<br>
## `placement`
**Type**: `STRUCT`<br>
**Provider name**: `Placement`<br>
**Description**: The location where the instance launched, if applicable.<br>
   - `affinity`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Affinity`<br>
    **Description**: The affinity setting for the instance on the Dedicated Host. This parameter is not supported for <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> or <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportInstance.html">ImportInstance</a>.<br>
   - `availability_zone`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AvailabilityZone`<br>
    **Description**: The Availability Zone of the instance. If not specified, an Availability Zone will be automatically chosen for you based on the load balancing criteria for the Region. This parameter is not supported for <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a>.<br>
   - `group_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `GroupId`<br>
    **Description**: The ID of the placement group that the instance is in. If you specify <code>GroupId</code>, you can't specify <code>GroupName</code>.<br>
   - `group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `GroupName`<br>
    **Description**: The name of the placement group that the instance is in. If you specify <code>GroupName</code>, you can't specify <code>GroupId</code>.<br>
   - `host_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HostId`<br>
    **Description**: The ID of the Dedicated Host on which the instance resides. This parameter is not supported for <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a> or <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportInstance.html">ImportInstance</a>.<br>
   - `host_resource_group_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HostResourceGroupArn`<br>
    **Description**: The ARN of the host resource group in which to launch the instances. If you specify this parameter, either omit the <b>Tenancy</b> parameter or set it to <code>host</code>. This parameter is not supported for <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a>.<br>
   - `partition_number`<br>
    **Type**: `INT32`<br>
    **Provider name**: `PartitionNumber`<br>
    **Description**: The number of the partition that the instance is in. Valid only if the placement group strategy is set to <code>partition</code>. This parameter is not supported for <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a>.<br>
   - `spread_domain`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SpreadDomain`<br>
    **Description**: Reserved for future use.<br>
   - `tenancy`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Tenancy`<br>
    **Description**: The tenancy of the instance (if the instance is running in a VPC). An instance with a tenancy of <code>dedicated</code> runs on single-tenant hardware. This parameter is not supported for <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateFleet">CreateFleet</a>. The <code>host</code> tenancy is not supported for <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportInstance.html">ImportInstance</a> or for T3 instances that are configured for the <code>unlimited</code> CPU credit option.<br>
## `platform`
**Type**: `STRING`<br>
**Provider name**: `Platform`<br>
**Description**: The value is <code>Windows</code> for Windows instances; otherwise blank.<br>
## `platform_details`
**Type**: `STRING`<br>
**Provider name**: `PlatformDetails`<br>
**Description**: The platform details value for the instance. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-info-fields.html">AMI billing information fields</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `private_dns_name`
**Type**: `STRING`<br>
**Provider name**: `PrivateDnsName`<br>
**Description**: (IPv4 only) The private DNS hostname name assigned to the instance. This DNS hostname can only be used inside the Amazon EC2 network. This name is not available until the instance enters the <code>running</code> state.  [EC2-VPC] The Amazon-provided DNS server resolves Amazon-provided private DNS hostnames if you've enabled DNS resolution and DNS hostnames in your VPC. If you are not using the Amazon-provided DNS server in your VPC, your custom domain name servers must resolve the hostname as appropriate.<br>
## `private_dns_name_options`
**Type**: `STRUCT`<br>
**Provider name**: `PrivateDnsNameOptions`<br>
**Description**: The options for the instance hostname.<br>
   - `enable_resource_name_dns_a_record`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `EnableResourceNameDnsARecord`<br>
    **Description**: Indicates whether to respond to DNS queries for instance hostnames with DNS A records.<br>
   - `enable_resource_name_dns_aaaa_record`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `EnableResourceNameDnsAAAARecord`<br>
    **Description**: Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records.<br>
   - `hostname_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `HostnameType`<br>
    **Description**: The type of hostname to assign to an instance.<br>
## `private_ip_address`
**Type**: `STRING`<br>
**Provider name**: `PrivateIpAddress`<br>
**Description**: The private IPv4 address assigned to the instance.<br>
## `product_codes`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `ProductCodes`<br>
**Description**: The product codes attached to this instance, if applicable.<br>
   - `product_code_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ProductCodeId`<br>
    **Description**: The product code.<br>
   - `product_code_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ProductCodeType`<br>
    **Description**: The type of product code.<br>
## `public_dns_name`
**Type**: `STRING`<br>
**Provider name**: `PublicDnsName`<br>
**Description**: (IPv4 only) The public DNS name assigned to the instance. This name is not available until the instance enters the <code>running</code> state. For EC2-VPC, this name is only available if you've enabled DNS hostnames for your VPC.<br>
## `public_ip_address`
**Type**: `STRING`<br>
**Provider name**: `PublicIpAddress`<br>
**Description**: The public IPv4 address, or the Carrier IP address assigned to the instance, if applicable. A Carrier IP address only applies to an instance launched in a subnet associated with a Wavelength Zone.<br>
## `ramdisk_id`
**Type**: `STRING`<br>
**Provider name**: `RamdiskId`<br>
**Description**: The RAM disk associated with this instance, if applicable.<br>
## `root_device_name`
**Type**: `STRING`<br>
**Provider name**: `RootDeviceName`<br>
**Description**: The device name of the root device volume (for example, <code>/dev/sda1</code>).<br>
## `root_device_type`
**Type**: `STRING`<br>
**Provider name**: `RootDeviceType`<br>
**Description**: The root device type used by the AMI. The AMI can use an EBS volume or an instance store volume.<br>
## `security_groups`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `SecurityGroups`<br>
**Description**: The security groups for the instance.<br>
   - `group_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `GroupId`<br>
    **Description**: The ID of the security group.<br>
   - `group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `GroupName`<br>
    **Description**: The name of the security group.<br>
## `source_dest_check`
**Type**: `BOOLEAN`<br>
**Provider name**: `SourceDestCheck`<br>
**Description**: Indicates whether source/destination checking is enabled.<br>
## `spot_instance_request_id`
**Type**: `STRING`<br>
**Provider name**: `SpotInstanceRequestId`<br>
**Description**: If the request is a Spot Instance request, the ID of the request.<br>
## `sriov_net_support`
**Type**: `STRING`<br>
**Provider name**: `SriovNetSupport`<br>
**Description**: Specifies whether enhanced networking with the Intel 82599 Virtual Function interface is enabled.<br>
## `state`
**Type**: `STRUCT`<br>
**Provider name**: `State`<br>
**Description**: The current state of the instance.<br>
   - `code`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Code`<br>
    **Description**: The state of the instance as a 16-bit unsigned integer.  The high byte is all of the bits between 2^8 and (2^16)-1, which equals decimal values between 256 and 65,535. These numerical values are used for internal purposes and should be ignored. The low byte is all of the bits between 2^0 and (2^8)-1, which equals decimal values between 0 and 255.  The valid values for instance-state-code will all be in the range of the low byte and they are: <ul> <li>  <code>0</code> : <code>pending</code>  </li> <li>  <code>16</code> : <code>running</code>  </li> <li>  <code>32</code> : <code>shutting-down</code>  </li> <li>  <code>48</code> : <code>terminated</code>  </li> <li>  <code>64</code> : <code>stopping</code>  </li> <li>  <code>80</code> : <code>stopped</code>  </li> </ul> You can ignore the high byte value by zeroing out all of the bits above 2^8 or 256 in decimal.<br>
   - `name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Name`<br>
    **Description**: The current state of the instance.<br>
## `state_reason`
**Type**: `STRUCT`<br>
**Provider name**: `StateReason`<br>
**Description**: The reason for the most recent state transition.<br>
   - `code`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Code`<br>
    **Description**: The reason code for the state change.<br>
   - `message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Message`<br>
    **Description**: The message for the state change. <ul> <li>  <code>Server.InsufficientInstanceCapacity</code>: There was insufficient capacity available to satisfy the launch request. </li> <li>  <code>Server.InternalError</code>: An internal error caused the instance to terminate during launch. </li> <li>  <code>Server.ScheduledStop</code>: The instance was stopped due to a scheduled retirement. </li> <li>  <code>Server.SpotInstanceShutdown</code>: The instance was stopped because the number of Spot requests with a maximum price equal to or higher than the Spot price exceeded available capacity or because of an increase in the Spot price. </li> <li>  <code>Server.SpotInstanceTermination</code>: The instance was terminated because the number of Spot requests with a maximum price equal to or higher than the Spot price exceeded available capacity or because of an increase in the Spot price. </li> <li>  <code>Client.InstanceInitiatedShutdown</code>: The instance was shut down using the <code>shutdown -h</code> command from the instance. </li> <li>  <code>Client.InstanceTerminated</code>: The instance was terminated or rebooted during AMI creation. </li> <li>  <code>Client.InternalError</code>: A client error caused the instance to terminate during launch. </li> <li>  <code>Client.InvalidSnapshot.NotFound</code>: The specified snapshot was not found. </li> <li>  <code>Client.UserInitiatedHibernate</code>: Hibernation was initiated on the instance. </li> <li>  <code>Client.UserInitiatedShutdown</code>: The instance was shut down using the Amazon EC2 API. </li> <li>  <code>Client.VolumeLimitExceeded</code>: The limit on the number of EBS volumes or total storage was exceeded. Decrease usage or request an increase in your account limits. </li> </ul>
## `state_transition_reason`
**Type**: `STRING`<br>
**Provider name**: `StateTransitionReason`<br>
**Description**: The reason for the most recent state transition. This might be an empty string.<br>
## `subnet_id`
**Type**: `STRING`<br>
**Provider name**: `SubnetId`<br>
**Description**: [EC2-VPC] The ID of the subnet in which the instance is running.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `tpm_support`
**Type**: `STRING`<br>
**Provider name**: `TpmSupport`<br>
**Description**: If the instance is configured for NitroTPM support, the value is <code>v2.0</code>. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nitrotpm.html">NitroTPM</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `usage_operation`
**Type**: `STRING`<br>
**Provider name**: `UsageOperation`<br>
**Description**: The usage operation value for the instance. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-info-fields.html">AMI billing information fields</a> in the <i>Amazon EC2 User Guide</i>.<br>
## `usage_operation_update_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `UsageOperationUpdateTime`<br>
**Description**: The time that the usage operation was last updated.<br>
## `virtualization_type`
**Type**: `STRING`<br>
**Provider name**: `VirtualizationType`<br>
**Description**: The virtualization type of the instance.<br>
## `vpc_id`
**Type**: `STRING`<br>
**Provider name**: `VpcId`<br>
**Description**: [EC2-VPC] The ID of the VPC in which the instance is running.<br>
