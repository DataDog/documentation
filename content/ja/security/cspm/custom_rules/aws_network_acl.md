---
dependencies: []
disable_edit: true
---
# aws_network_acl

## `account_id`
**タイプ**: `STRING`<br>
## `associations`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Associations`<br>
**説明**: ネットワーク ACL と 1 つまたは複数のサブネットの関連付け<br>
   - `network_acl_association_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `NetworkAclAssociationId`<br>
    **説明**: ネットワーク ACL とサブネットの関連付け ID。<br>
   - `network_acl_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `NetworkAclId`<br>
    **説明**: ネットワーク ACL の ID。<br>
   - `subnet_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `SubnetId`<br>
    **説明**: サブネットの ID。<br>
## `entries`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Entries`<br>
**説明**: ネットワークACL 内の 1 つまたは複数のエントリ (ルール)。<br>
   - `cidr_block`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `CidrBlock`<br>
    **説明**: 許可または拒否する IPv4 ネットワーク範囲 (CIDR 表記)。<br>
   - `egress`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Egress`<br>
    **説明**: ルールが (サブネットから出ていくトラフィックに適用される) アウトバウンドルールかどうかを示します。<br>
   - `icmp_type_code`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `IcmpTypeCode`<br>
    **説明**: ICMP プロトコル: ICMP タイプとコード。<br>
       - `code`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Code`<br>
        **説明**: ICMP コード。値が -1 の場合は、指定した ICMP タイプのすべてのコードを意味します。<br>
       - `type`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `Type`<br>
        **説明**: ICMP タイプ。値が -1 の場合は、すべてのタイプを意味します。<br>
   - `ipv6_cidr_block`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Ipv6CidrBlock`<br>
    **説明**: 許可または拒否する IPv6 ネットワーク範囲 (CIDR 表記)。<br>
   - `port_range`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `PortRange`<br>
    **説明**: TCP または UDP プロトコル: ルールが適用されるポートの範囲。<br>
       - `from`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `From`<br>
        **説明**: 範囲内の最初のポート。<br>
       - `to`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `To`<br>
        **説明**: 範囲内の最後のポート。<br>
   - `protocol`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Protocol`<br>
    **説明**: プロトコル番号。値が -1 の場合は、すべてのプロトコルを意味します。<br>
   - `rule_action`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RuleAction`<br>
    **説明**: ルールに合致するトラフィックを許可するか、それとも拒否するかを示します。<br>
   - `rule_number`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `RuleNumber`<br>
    **説明**: エントリのルール番号。ACL エントリは、ルール番号を基準に昇順で処理されます。<br>
## `is_default`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IsDefault`<br>
**説明**: これが VPC のデフォルトのネットワーク ACL かどうかを示します。<br>
## `network_acl_arn`
**タイプ**: `STRING`<br>
## `network_acl_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `NetworkAclId`<br>
**説明**: ネットワーク ACL の ID。<br>
## `owner_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `OwnerId`<br>
**説明**: ネットワーク ACL を所有する Amazon Web Services アカウントの ID。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `vpc_id`
**タイプ**: `STRING`<br>
**Provider name**: `VpcId`<br>
**説明**: ネットワーク ACL を使用する VPC の ID。<br>