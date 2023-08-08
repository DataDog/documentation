---
dependencies: []
disable_edit: true
---
# aws_security_group

## `account_id`
**Type**: `STRING`<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `Description`<br>
**Description**: A description of the security group.<br>
## `group_id`
**Type**: `STRING`<br>
**Provider name**: `GroupId`<br>
**Description**: The ID of the security group.<br>
## `group_name`
**Type**: `STRING`<br>
**Provider name**: `GroupName`<br>
**Description**: The name of the security group.<br>
## `ip_permissions`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `IpPermissions`<br>
**Description**: The inbound rules associated with the security group.<br>
   - `from_port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `FromPort`<br>
    **Description**: If the protocol is TCP or UDP, this is the start of the port range. If the protocol is ICMP or ICMPv6, this is the type number. A value of -1 indicates all ICMP/ICMPv6 types. If you specify all ICMP/ICMPv6 types, you must specify all ICMP/ICMPv6 codes.<br>
   - `ip_protocol`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IpProtocol`<br>
    **Description**: The IP protocol name (<code>tcp</code>, <code>udp</code>, <code>icmp</code>, <code>icmpv6</code>) or number (see <a href="http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml">Protocol Numbers</a>). [VPC only] Use <code>-1</code> to specify all protocols. When authorizing security group rules, specifying <code>-1</code> or a protocol number other than <code>tcp</code>, <code>udp</code>, <code>icmp</code>, or <code>icmpv6</code> allows traffic on all ports, regardless of any port range you specify. For <code>tcp</code>, <code>udp</code>, and <code>icmp</code>, you must specify a port range. For <code>icmpv6</code>, the port range is optional; if you omit the port range, traffic for all types and codes is allowed.<br>
   - `ip_ranges`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `IpRanges`<br>
    **Description**: The IPv4 ranges.<br>
       - `cidr_ip`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CidrIp`<br>
        **Description**: The IPv4 CIDR range. You can either specify a CIDR range or a source security group, not both. To specify a single IPv4 address, use the /32 prefix length.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this IPv4 address range. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=&amp;;{}!$*<br>
   - `ipv6_ranges`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Ipv6Ranges`<br>
    **Description**: [VPC only] The IPv6 ranges.<br>
       - `cidr_ipv6`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CidrIpv6`<br>
        **Description**: The IPv6 CIDR range. You can either specify a CIDR range or a source security group, not both. To specify a single IPv6 address, use the /128 prefix length.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this IPv6 address range. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=&amp;;{}!$*<br>
   - `prefix_list_ids`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `PrefixListIds`<br>
    **Description**: [VPC only] The prefix list IDs.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this prefix list ID. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=;{}!$*<br>
       - `prefix_list_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PrefixListId`<br>
        **Description**: The ID of the prefix.<br>
   - `to_port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `ToPort`<br>
    **Description**: If the protocol is TCP or UDP, this is the end of the port range. If the protocol is ICMP or ICMPv6, this is the code. A value of -1 indicates all ICMP/ICMPv6 codes. If you specify all ICMP/ICMPv6 types, you must specify all ICMP/ICMPv6 codes.<br>
   - `user_id_group_pairs`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `UserIdGroupPairs`<br>
    **Description**: The security group and Amazon Web Services account ID pairs.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this user ID group pair. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=;{}!$*<br>
       - `group_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `GroupId`<br>
        **Description**: The ID of the security group.<br>
       - `group_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `GroupName`<br>
        **Description**: The name of the security group. In a request, use this parameter for a security group in EC2-Classic or a default VPC only. For a security group in a nondefault VPC, use the security group ID.  For a referenced security group in another VPC, this value is not returned if the referenced security group is deleted.<br>
       - `peering_status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PeeringStatus`<br>
        **Description**: The status of a VPC peering connection, if applicable.<br>
       - `user_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `UserId`<br>
        **Description**: The ID of an Amazon Web Services account. For a referenced security group in another VPC, the account ID of the referenced security group is returned in the response. If the referenced security group is deleted, this value is not returned. [EC2-Classic] Required when adding or removing rules that reference a security group in another Amazon Web Services account.<br>
       - `vpc_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VpcId`<br>
        **Description**: The ID of the VPC for the referenced security group, if applicable.<br>
       - `vpc_peering_connection_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VpcPeeringConnectionId`<br>
        **Description**: The ID of the VPC peering connection, if applicable.<br>
## `ip_permissions_egress`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `IpPermissionsEgress`<br>
**Description**: [VPC only] The outbound rules associated with the security group.<br>
   - `from_port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `FromPort`<br>
    **Description**: If the protocol is TCP or UDP, this is the start of the port range. If the protocol is ICMP or ICMPv6, this is the type number. A value of -1 indicates all ICMP/ICMPv6 types. If you specify all ICMP/ICMPv6 types, you must specify all ICMP/ICMPv6 codes.<br>
   - `ip_protocol`<br>
    **Type**: `STRING`<br>
    **Provider name**: `IpProtocol`<br>
    **Description**: The IP protocol name (<code>tcp</code>, <code>udp</code>, <code>icmp</code>, <code>icmpv6</code>) or number (see <a href="http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml">Protocol Numbers</a>). [VPC only] Use <code>-1</code> to specify all protocols. When authorizing security group rules, specifying <code>-1</code> or a protocol number other than <code>tcp</code>, <code>udp</code>, <code>icmp</code>, or <code>icmpv6</code> allows traffic on all ports, regardless of any port range you specify. For <code>tcp</code>, <code>udp</code>, and <code>icmp</code>, you must specify a port range. For <code>icmpv6</code>, the port range is optional; if you omit the port range, traffic for all types and codes is allowed.<br>
   - `ip_ranges`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `IpRanges`<br>
    **Description**: The IPv4 ranges.<br>
       - `cidr_ip`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CidrIp`<br>
        **Description**: The IPv4 CIDR range. You can either specify a CIDR range or a source security group, not both. To specify a single IPv4 address, use the /32 prefix length.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this IPv4 address range. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=&amp;;{}!$*<br>
   - `ipv6_ranges`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `Ipv6Ranges`<br>
    **Description**: [VPC only] The IPv6 ranges.<br>
       - `cidr_ipv6`<br>
        **Type**: `STRING`<br>
        **Provider name**: `CidrIpv6`<br>
        **Description**: The IPv6 CIDR range. You can either specify a CIDR range or a source security group, not both. To specify a single IPv6 address, use the /128 prefix length.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this IPv6 address range. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=&amp;;{}!$*<br>
   - `prefix_list_ids`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `PrefixListIds`<br>
    **Description**: [VPC only] The prefix list IDs.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this prefix list ID. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=;{}!$*<br>
       - `prefix_list_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PrefixListId`<br>
        **Description**: The ID of the prefix.<br>
   - `to_port`<br>
    **Type**: `INT32`<br>
    **Provider name**: `ToPort`<br>
    **Description**: If the protocol is TCP or UDP, this is the end of the port range. If the protocol is ICMP or ICMPv6, this is the code. A value of -1 indicates all ICMP/ICMPv6 codes. If you specify all ICMP/ICMPv6 types, you must specify all ICMP/ICMPv6 codes.<br>
   - `user_id_group_pairs`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `UserIdGroupPairs`<br>
    **Description**: The security group and Amazon Web Services account ID pairs.<br>
       - `description`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Description`<br>
        **Description**: A description for the security group rule that references this user ID group pair. Constraints: Up to 255 characters in length. Allowed characters are a-z, A-Z, 0-9, spaces, and ._-:/()#,@[]+=;{}!$*<br>
       - `group_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `GroupId`<br>
        **Description**: The ID of the security group.<br>
       - `group_name`<br>
        **Type**: `STRING`<br>
        **Provider name**: `GroupName`<br>
        **Description**: The name of the security group. In a request, use this parameter for a security group in EC2-Classic or a default VPC only. For a security group in a nondefault VPC, use the security group ID.  For a referenced security group in another VPC, this value is not returned if the referenced security group is deleted.<br>
       - `peering_status`<br>
        **Type**: `STRING`<br>
        **Provider name**: `PeeringStatus`<br>
        **Description**: The status of a VPC peering connection, if applicable.<br>
       - `user_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `UserId`<br>
        **Description**: The ID of an Amazon Web Services account. For a referenced security group in another VPC, the account ID of the referenced security group is returned in the response. If the referenced security group is deleted, this value is not returned. [EC2-Classic] Required when adding or removing rules that reference a security group in another Amazon Web Services account.<br>
       - `vpc_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VpcId`<br>
        **Description**: The ID of the VPC for the referenced security group, if applicable.<br>
       - `vpc_peering_connection_id`<br>
        **Type**: `STRING`<br>
        **Provider name**: `VpcPeeringConnectionId`<br>
        **Description**: The ID of the VPC peering connection, if applicable.<br>
## `owner_id`
**Type**: `STRING`<br>
**Provider name**: `OwnerId`<br>
**Description**: The Amazon Web Services account ID of the owner of the security group.<br>
## `security_group_arn`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `vpc_id`
**Type**: `STRING`<br>
**Provider name**: `VpcId`<br>
**Description**: [VPC only] The ID of the VPC for the security group.<br>
