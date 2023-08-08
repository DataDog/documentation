---
dependencies: []
disable_edit: true
---
# aws_vpc

## `account_id`
**Type**: `STRING`<br>
## `arn`
**Type**: `STRING`<br>
## `cidr_block`
**Type**: `STRING`<br>
**Provider name**: `CidrBlock`<br>
**Description**: The primary IPv4 CIDR block for the VPC.<br>
## `cidr_block_association_set`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `CidrBlockAssociationSet`<br>
**Description**: Information about the IPv4 CIDR blocks associated with the VPC.<br>
   - `association_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AssociationId`<br>
    **Description**: The association ID for the IPv4 CIDR block.<br>
   - `cidr_block`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CidrBlock`<br>
    **Description**: The IPv4 CIDR block.<br>
   - `cidr_block_state`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `CidrBlockState`<br>
    **Description**: Information about the state of the CIDR block.<br>
       - `state`<br>
        **Type**: `STRING`<br>
        **Provider name**: `State`<br>
        **Description**: The state of the CIDR block.<br>
       - `status_message`<br>
        **Type**: `STRING`<br>
        **Provider name**: `StatusMessage`<br>
        **Description**: A message about the status of the CIDR block, if applicable.<br>
## `dhcp_options_id`
**Type**: `STRING`<br>
**Provider name**: `DhcpOptionsId`<br>
**Description**: The ID of the set of DHCP options you've associated with the VPC.<br>
## `flow_logs`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `FlowLogs`<br>
**Description**: Information about the flow logs.<br>
   - `creation_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `CreationTime`<br>
    **Description**: The date and time the flow log was created.<br>
   - `deliver_logs_error_message`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DeliverLogsErrorMessage`<br>
    **Description**: Information about the error that occurred. <code>Rate limited</code> indicates that CloudWatch Logs throttling has been applied for one or more network interfaces, or that you've reached the limit on the number of log groups that you can create. <code>Access error</code> indicates that the IAM role associated with the flow log does not have sufficient permissions to publish to CloudWatch Logs. <code>Unknown error</code> indicates an internal error.<br>
   - `deliver_logs_permission_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DeliverLogsPermissionArn`<br>
    **Description**: The ARN of the IAM role that posts logs to CloudWatch Logs.<br>
   - `deliver_logs_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `DeliverLogsStatus`<br>
    **Description**: The status of the logs delivery (<code>SUCCESS</code> | <code>FAILED</code>).<br>
   - `destination_options`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `DestinationOptions`<br>
    **Description**: The destination options.<br>
       - `file_format`<br>
        **Type**: `STRING`<br>
        **Provider name**: `FileFormat`<br>
        **Description**: The format for the flow log.<br>
       - `hive_compatible_partitions`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `HiveCompatiblePartitions`<br>
        **Description**: Indicates whether to use Hive-compatible prefixes for flow logs stored in Amazon S3.<br>
       - `per_hour_partition`<br>
        **Type**: `BOOLEAN`<br>
        **Provider name**: `PerHourPartition`<br>
        **Description**: Indicates whether to partition the flow log per hour.<br>
   - `flow_log_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `FlowLogId`<br>
    **Description**: The flow log ID.<br>
   - `flow_log_status`<br>
    **Type**: `STRING`<br>
    **Provider name**: `FlowLogStatus`<br>
    **Description**: The status of the flow log (<code>ACTIVE</code>).<br>
   - `log_destination`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LogDestination`<br>
    **Description**: The destination to which the flow log data is published. Flow log data can be published to an CloudWatch Logs log group or an Amazon S3 bucket. If the flow log publishes to CloudWatch Logs, this element indicates the Amazon Resource Name (ARN) of the CloudWatch Logs log group to which the data is published. If the flow log publishes to Amazon S3, this element indicates the ARN of the Amazon S3 bucket to which the data is published.<br>
   - `log_destination_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LogDestinationType`<br>
    **Description**: The type of destination to which the flow log data is published. Flow log data can be published to CloudWatch Logs or Amazon S3.<br>
   - `log_format`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LogFormat`<br>
    **Description**: The format of the flow log record.<br>
   - `log_group_name`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LogGroupName`<br>
    **Description**: The name of the flow log group.<br>
   - `max_aggregation_interval`<br>
    **Type**: `INT32`<br>
    **Provider name**: `MaxAggregationInterval`<br>
    **Description**: The maximum interval of time, in seconds, during which a flow of packets is captured and aggregated into a flow log record. When a network interface is attached to a <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances">Nitro-based instance</a>, the aggregation interval is always 60 seconds (1 minute) or less, regardless of the specified value. Valid Values: <code>60</code> | <code>600</code><br>
   - `resource_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ResourceId`<br>
    **Description**: The ID of the resource on which the flow log was created.<br>
   - `traffic_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TrafficType`<br>
    **Description**: The type of traffic captured for the flow log.<br>
## `instance_tenancy`
**Type**: `STRING`<br>
**Provider name**: `InstanceTenancy`<br>
**Description**: The allowed tenancy of instances launched into the VPC.<br>
## `ipv6_cidr_block_association_set`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Ipv6CidrBlockAssociationSet`<br>
**Description**: Information about the IPv6 CIDR blocks associated with the VPC.<br>
   - `association_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `AssociationId`<br>
    **Description**: The association ID for the IPv6 CIDR block.<br>
   - `ipv6_cidr_block`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Ipv6CidrBlock`<br>
    **Description**: The IPv6 CIDR block.<br>
   - `ipv6_cidr_block_state`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Ipv6CidrBlockState`<br>
    **Description**: Information about the state of the CIDR block.<br>
       - `state`<br>
        **Type**: `STRING`<br>
        **Provider name**: `State`<br>
        **Description**: The state of the CIDR block.<br>
       - `status_message`<br>
        **Type**: `STRING`<br>
        **Provider name**: `StatusMessage`<br>
        **Description**: A message about the status of the CIDR block, if applicable.<br>
   - `ipv6_pool`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Ipv6Pool`<br>
    **Description**: The ID of the IPv6 address pool from which the IPv6 CIDR block is allocated.<br>
   - `network_border_group`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NetworkBorderGroup`<br>
    **Description**: The name of the unique set of Availability Zones, Local Zones, or Wavelength Zones from which Amazon Web Services advertises IP addresses, for example, <code>us-east-1-wl1-bos-wlz-1</code>.<br>
## `is_default`
**Type**: `BOOLEAN`<br>
**Provider name**: `IsDefault`<br>
**Description**: Indicates whether the VPC is the default VPC.<br>
## `owner_id`
**Type**: `STRING`<br>
**Provider name**: `OwnerId`<br>
**Description**: The ID of the Amazon Web Services account that owns the VPC.<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `State`<br>
**Description**: The current state of the VPC.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `vpc_id`
**Type**: `STRING`<br>
**Provider name**: `VpcId`<br>
**Description**: The ID of the VPC.<br>
