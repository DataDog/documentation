---
dependencies: []
disable_edit: true
---
# aws_network_acl

## `account_id`
**Type**: `STRING`<br>
## `associations`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Associations`<br>
**Description**: Any associations between the network ACL and one or more subnets<br>
   - `network_acl_association_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NetworkAclAssociationId`<br>
    **Description**: The ID of the association between a network ACL and a subnet.<br>
   - `network_acl_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `NetworkAclId`<br>
    **Description**: The ID of the network ACL.<br>
   - `subnet_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SubnetId`<br>
    **Description**: The ID of the subnet.<br>
## `entries`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Entries`<br>
**Description**: One or more entries (rules) in the network ACL.<br>
   - `cidr_block`<br>
    **Type**: `STRING`<br>
    **Provider name**: `CidrBlock`<br>
    **Description**: The IPv4 network range to allow or deny, in CIDR notation.<br>
   - `egress`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `Egress`<br>
    **Description**: Indicates whether the rule is an egress rule (applied to traffic leaving the subnet).<br>
   - `icmp_type_code`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `IcmpTypeCode`<br>
    **Description**: ICMP protocol: The ICMP type and code.<br>
       - `code`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Code`<br>
        **Description**: The ICMP code. A value of -1 means all codes for the specified ICMP type.<br>
       - `type`<br>
        **Type**: `INT32`<br>
        **Provider name**: `Type`<br>
        **Description**: The ICMP type. A value of -1 means all types.<br>
   - `ipv6_cidr_block`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Ipv6CidrBlock`<br>
    **Description**: The IPv6 network range to allow or deny, in CIDR notation.<br>
   - `port_range`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `PortRange`<br>
    **Description**: TCP or UDP protocols: The range of ports the rule applies to.<br>
       - `from`<br>
        **Type**: `INT32`<br>
        **Provider name**: `From`<br>
        **Description**: The first port in the range.<br>
       - `to`<br>
        **Type**: `INT32`<br>
        **Provider name**: `To`<br>
        **Description**: The last port in the range.<br>
   - `protocol`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Protocol`<br>
    **Description**: The protocol number. A value of "-1" means all protocols.<br>
   - `rule_action`<br>
    **Type**: `STRING`<br>
    **Provider name**: `RuleAction`<br>
    **Description**: Indicates whether to allow or deny the traffic that matches the rule.<br>
   - `rule_number`<br>
    **Type**: `INT32`<br>
    **Provider name**: `RuleNumber`<br>
    **Description**: The rule number for the entry. ACL entries are processed in ascending order by rule number.<br>
## `is_default`
**Type**: `BOOLEAN`<br>
**Provider name**: `IsDefault`<br>
**Description**: Indicates whether this is the default network ACL for the VPC.<br>
## `network_acl_arn`
**Type**: `STRING`<br>
## `network_acl_id`
**Type**: `STRING`<br>
**Provider name**: `NetworkAclId`<br>
**Description**: The ID of the network ACL.<br>
## `owner_id`
**Type**: `STRING`<br>
**Provider name**: `OwnerId`<br>
**Description**: The ID of the Amazon Web Services account that owns the network ACL.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `vpc_id`
**Type**: `STRING`<br>
**Provider name**: `VpcId`<br>
**Description**: The ID of the VPC for the network ACL.<br>
