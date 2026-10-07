---
dependencies: []
disable_edit: true
---
# aws_security_group

## `account_id`
**タイプ**: `STRING`<br>
## `description`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Description`<br>
**説明**: セキュリティグループの説明。<br>
## `group_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `GroupId`<br>
**説明**: セキュリティグループの ID。<br>
## `group_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `GroupName`<br>
**説明**: セキュリティグループの名前。<br>
## `ip_permissions`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `IpPermissions`<br>
**説明**: セキュリティグループに関連するインバウンドルール。<br>
   - `from_port`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `FromPort`<br>
    **説明**: プロトコルが TCP または UDP の場合、ポート範囲の最初です。プロトコルが ICMP または ICMPv6 の場合、タイプ番号です。値 -1 は、すべての ICMP/ICMPv6 タイプを示します。すべての ICMP/ICMPv6 タイプを指定する場合、すべての ICMP/ICMPv6 コードを指定する必要があります。<br>
   - `ip_protocol`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IpProtocol`<br>
    **説明**: IP プロトコル名 (<code>tcp</code>、<code>udp</code>、<code>icmp</code>、<code>icmpv6</code>) または番号 (<a href="http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml">プロトコル番号</a>を参照)。[VPC のみ] すべてのプロトコルを指定する場合は <code>-1</code> を使用します。セキュリティグループ規則を作成するときに、<code>-1</code> または <code>tcp</code>、<code>udp</code>、<code>icmp</code>、<code>icmpv6</code> 以外のプロトコル番号を指定すると、指定したポート範囲にかかわらず、すべてのポートでのトラフィックが許可されます。<code>tcp</code>、<code>udp</code>、および <code>icmp</code> の場合、ポート範囲を指定する必要があります。<code>icmpv6</code> では、ポート範囲はオプションです。ポート範囲を省略した場合、すべてのタイプおよびコードのトラフィックが許可されます。<br>
   - `ip_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `IpRanges`<br>
    **説明**: IPv4 の範囲。<br>
       - `cidr_ip`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CidrIp`<br>
        **説明**: IPv4 の CIDR 範囲。CIDR 範囲またはソースセキュリティグループのどちらかを指定でき、両方を指定することはできません。単一の IPv4 アドレスを指定する場合は、/32 プレフィックス長を使用します。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: この IPv4 アドレス範囲を参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=&amp;;{}!$* です。<br>
   - `ipv6_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Ipv6Ranges`<br>
    **説明**: [VPC のみ] IPv6 の範囲。<br>
       - `cidr_ipv6`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CidrIpv6`<br>
        **説明**: IPv6 の CIDR 範囲。CIDR 範囲またはソースセキュリティグループのどちらかを指定でき、両方を指定することはできません。単一の IPv6 アドレスを指定する場合は、/128 プレフィックス長を使用します。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: この IPv6 アドレス範囲を参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=&amp;;{}!$* です。<br>
   - `prefix_list_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `PrefixListIds`<br>
    **説明**: [VPC のみ] プレフィックスリスト ID。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: このプレフィックスリスト ID を参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=;{}!$* です。<br>
       - `prefix_list_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PrefixListId`<br>
        **説明**: プレフィックスの ID。<br>
   - `to_port`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `ToPort`<br>
    **説明**: プロトコルが TCP または UDP の場合、ポート範囲の最後です。プロトコルが ICMP または ICMPv6 の場合、コードです。値 -1 は、すべての ICMP/ICMPv6 コードを示します。すべての ICMP/ICMPv6 タイプを指定する場合、すべての ICMP/ICMPv6 コードを指定する必要があります。<br>
   - `user_id_group_pairs`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `UserIdGroupPairs`<br>
    **説明**: セキュリティグループと Amazon Web Services のアカウント ID のペア。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: このユーザー ID グループペアを参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=;{}!$* です。<br>
       - `group_id`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `GroupId`<br>
        **Description**: The ID of the security group.<br>
       - `group_name`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `GroupName`<br>
        **説明**: セキュリティグループの名前。リクエストでは、EC2-Classic またはデフォルト VPC 内のセキュリティグループに対してのみ、このパラメーターを使用します。デフォルト以外の VPC にあるセキュリティグループの場合は、セキュリティグループ ID を使用します。 他の VPC で参照されているセキュリティグループについては、参照されているセキュリティグループが削除された場合、この値は返されません。<br>
       - `peering_status`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PeeringStatus`<br>
        **説明**: VPC ピアリング接続のステータス (該当する場合)。<br>
       - `user_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `UserId`<br>
        **説明**: Amazon Web Services アカウントの ID。他の VPC で参照されているセキュリティグループの場合、参照されているセキュリティグループのアカウント ID がレスポンスで返されます。参照されているセキュリティグループが削除された場合、この値は返されません。[EC2-Classic] 他の Amazon Web Services アカウントのセキュリティグループを参照するルールを追加または削除する場合に必要です。<br>
       - `vpc_id`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `VpcId`<br>
        **説明**: 参照するセキュリティグループの VPC の ID (該当する場合)。<br>
       - `vpc_peering_connection_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `VpcPeeringConnectionId`<br>
        **説明**: VPC ピアリング接続の ID (該当する場合)。<br>
## `ip_permissions_egress`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `IpPermissionsEgress`<br>
**説明**: [VPC のみ] セキュリティグループに関連するアウトバウンドルール。<br>
   - `from_port`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `FromPort`<br>
    **説明**: プロトコルが TCP または UDP の場合、ポート範囲の最初です。プロトコルが ICMP または ICMPv6 の場合、タイプ番号です。値 -1 は、すべての ICMP/ICMPv6 タイプを示します。すべての ICMP/ICMPv6 タイプを指定する場合、すべての ICMP/ICMPv6 コードを指定する必要があります。<br>
   - `ip_protocol`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IpProtocol`<br>
    **説明**: IP プロトコル名 (<code>tcp</code>、<code>udp</code>、<code>icmp</code>、<code>icmpv6</code>) または番号 (<a href="http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml">プロトコル番号</a>を参照)。[VPC のみ] すべてのプロトコルを指定する場合は <code>-1</code> を使用します。セキュリティグループ規則を作成するときに、<code>-1</code> または <code>tcp</code>、<code>udp</code>、<code>icmp</code>、<code>icmpv6</code> 以外のプロトコル番号を指定すると、指定したポート範囲にかかわらず、すべてのポートでのトラフィックが許可されます。<code>tcp</code>、<code>udp</code>、および <code>icmp</code> の場合、ポート範囲を指定する必要があります。<code>icmpv6</code> では、ポート範囲はオプションです。ポート範囲を省略した場合、すべてのタイプおよびコードのトラフィックが許可されます。<br>
   - `ip_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `IpRanges`<br>
    **説明**: IPv4 の範囲。<br>
       - `cidr_ip`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CidrIp`<br>
        **説明**: IPv4 の CIDR 範囲。CIDR 範囲またはソースセキュリティグループのどちらかを指定でき、両方を指定することはできません。単一の IPv4 アドレスを指定する場合は、/32 プレフィックス長を使用します。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: この IPv4 アドレス範囲を参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=&amp;;{}!$* です。<br>
   - `ipv6_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `Ipv6Ranges`<br>
    **説明**: [VPC のみ] IPv6 の範囲。<br>
       - `cidr_ipv6`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `CidrIpv6`<br>
        **説明**: IPv6 の CIDR 範囲。CIDR 範囲またはソースセキュリティグループのどちらかを指定でき、両方を指定することはできません。単一の IPv6 アドレスを指定する場合は、/128 プレフィックス長を使用します。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: この IPv6 アドレス範囲を参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=&amp;;{}!$* です。<br>
   - `prefix_list_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `PrefixListIds`<br>
    **説明**: [VPC のみ] プレフィックスリスト ID。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: このプレフィックスリスト ID を参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=;{}!$* です。<br>
       - `prefix_list_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PrefixListId`<br>
        **説明**: プレフィックスの ID。<br>
   - `to_port`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `ToPort`<br>
    **説明**: プロトコルが TCP または UDP の場合、ポート範囲の最後です。プロトコルが ICMP または ICMPv6 の場合、コードです。値 -1 は、すべての ICMP/ICMPv6 コードを示します。すべての ICMP/ICMPv6 タイプを指定する場合、すべての ICMP/ICMPv6 コードを指定する必要があります。<br>
   - `user_id_group_pairs`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `UserIdGroupPairs`<br>
    **説明**: セキュリティグループと Amazon Web Services のアカウント ID のペア。<br>
       - `description`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Description`<br>
        **説明**: このユーザー ID グループペアを参照するセキュリティグループルールの説明。制約事項: 最大 255 文字まで。許可される文字は、a-z、A-Z、0-9、スペース、および ._-:/()#,@[]+=;{}!$* です。<br>
       - `group_id`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `GroupId`<br>
        **Description**: The ID of the security group.<br>
       - `group_name`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `GroupName`<br>
        **説明**: セキュリティグループの名前。リクエストでは、EC2-Classic またはデフォルト VPC 内のセキュリティグループに対してのみ、このパラメーターを使用します。デフォルト以外の VPC にあるセキュリティグループの場合は、セキュリティグループ ID を使用します。 他の VPC で参照されているセキュリティグループについては、参照されているセキュリティグループが削除された場合、この値は返されません。<br>
       - `peering_status`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `PeeringStatus`<br>
        **説明**: VPC ピアリング接続のステータス (該当する場合)。<br>
       - `user_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `UserId`<br>
        **説明**: Amazon Web Services アカウントの ID。他の VPC で参照されているセキュリティグループの場合、参照されているセキュリティグループのアカウント ID がレスポンスで返されます。参照されているセキュリティグループが削除された場合、この値は返されません。[EC2-Classic] 他の Amazon Web Services アカウントのセキュリティグループを参照するルールを追加または削除する場合に必要です。<br>
       - `vpc_id`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `VpcId`<br>
        **説明**: 参照するセキュリティグループの VPC の ID (該当する場合)。<br>
       - `vpc_peering_connection_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `VpcPeeringConnectionId`<br>
        **説明**: VPC ピアリング接続の ID (該当する場合)。<br>
## `owner_id`
**タイプ**: `STRING`<br>
**Provider name**: `OwnerId`<br>
**説明**: セキュリティグループの所有者の Amazon Web Services アカウント ID。<br>
## `security_group_arn`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `vpc_id`
**タイプ**: `STRING`<br>
**Provider name**: `VpcId`<br>
**説明**: [VPC のみ] セキュリティグループの VPC の ID。<br>