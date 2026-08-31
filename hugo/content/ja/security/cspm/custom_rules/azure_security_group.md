---
dependencies: []
disable_edit: true
---
# azure_security_group

## `default_security_rules`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.defaultSecurityRules`<br>
**説明**: ネットワークセキュリティグループのデフォルトのセキュリティルール。<br>
   - `access`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.access`<br>
    **説明**: ネットワークトラフィックを許可または拒否します。<br>
   - `description`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.description`<br>
    **説明**: このルールの説明。140 文字以内に制限されています。<br>
   - `destination_address_prefix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.destinationAddressPrefix`<br>
    **説明**: 宛先アドレスのプレフィックス。CIDR または宛先 IP の範囲。アスタリスク '*' を使用して、すべての送信元 IP に一致させることもできます。'VirtualNetwork'、'AzureLoadBalancer'、'Internet' などのデフォルトのタグも使用できます。<br>
   - `destination_address_prefixes`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.destinationAddressPrefixes`<br>
    **説明**: 宛先アドレスのプレフィックスです。CIDR または宛先 IP の範囲。<br>
   - `destination_port_range`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.destinationPortRange`<br>
    **説明**: 宛先ポートまたは範囲。0 から 65535 までの整数または範囲。アスタリスク '*' を使用すると、すべてのポートに一致させることもできます。<br>
   - `destination_port_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.destinationPortRanges`<br>
    **説明**: 宛先ポートの範囲。<br>
   - `direction`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.direction`<br>
    **説明**: ルールの方向。方向は、ルールが受信トラフィックと送信トラフィックのどちらで評価されるかを指定します。<br>
   - `etag`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `etag`<br>
    **説明**: リソースが更新されるたびに変更される、一意の読み取り専用文字列。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソースグループ内で一意となるリソースの名前。この名前を使用して、リソースにアクセスすることができます。<br>
   - `priority`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `properties.priority`<br>
    **説明**: ルールの優先度。値は 100 から 4096 の間で指定できます。優先度番号は、コレクション内の各ルールに対して一意である必要があります。優先度番号が低いほど、ルールの優先度は高くなります。<br>
   - `protocol`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.protocol`<br>
    **説明**: このルールが適用されるネットワークプロトコル。<br>
   - `provisioning_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.provisioningState`<br>
    **説明**: セキュリティルールリソースのプロビジョニング状態。<br>
   - `source_address_prefix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.sourceAddressPrefix`<br>
    **説明**: CIDR または送信元 IP の範囲。アスタリスク '*' を使用して、すべてのソース IP に一致させることもできます。'VirtualNetwork'、'AzureLoadBalancer'、'Internet' などのデフォルトのタグを使用することもできます。これがイングレスルールである場合、ネットワークトラフィックの発信元を指定します。<br>
   - `source_address_prefixes`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.sourceAddressPrefixes`<br>
    **説明**: CIDR または送信元 IP の範囲。<br>
   - `source_port_range`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.sourcePortRange`<br>
    **説明**: 送信元ポートまたは範囲。0 から 65535 までの整数または範囲。アスタリスク '*' を使用すると、すべてのポートに一致させることもできます。<br>
   - `source_port_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.sourcePortRanges`<br>
    **説明**: 送信元ポートの範囲。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースのタイプ。<br>
## `etag`
**タイプ**: `STRING`<br>
**プロバイダー名**: `etag`<br>
**説明**: リソースが更新されるたびに変更される、一意の読み取り専用文字列。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソース ID。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースロケーション。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソース名。<br>
## `provisioning_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.provisioningState`<br>
**説明**: ネットワークセキュリティグループリソースのプロビジョニング状態。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `resource_guid`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.resourceGuid`<br>
**説明**: ネットワークセキュリティグループリソースのリソース GUID プロパティ。<br>
## `security_rules`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `properties.securityRules`<br>
**説明**: ネットワークセキュリティグループのセキュリティルールのコレクション。<br>
   - `access`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.access`<br>
    **説明**: ネットワークトラフィックを許可または拒否します。<br>
   - `description`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.description`<br>
    **説明**: このルールの説明。140 文字以内に制限されています。<br>
   - `destination_address_prefix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.destinationAddressPrefix`<br>
    **説明**: 宛先アドレスのプレフィックス。CIDR または宛先 IP の範囲。アスタリスク '*' を使用して、すべての送信元 IP に一致させることもできます。'VirtualNetwork'、'AzureLoadBalancer'、'Internet' などのデフォルトのタグも使用できます。<br>
   - `destination_address_prefixes`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.destinationAddressPrefixes`<br>
    **説明**: 宛先アドレスのプレフィックスです。CIDR または宛先 IP の範囲。<br>
   - `destination_port_range`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.destinationPortRange`<br>
    **説明**: 宛先ポートまたは範囲。0 から 65535 までの整数または範囲。アスタリスク '*' を使用すると、すべてのポートに一致させることもできます。<br>
   - `destination_port_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.destinationPortRanges`<br>
    **説明**: 宛先ポートの範囲。<br>
   - `direction`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.direction`<br>
    **説明**: ルールの方向。方向は、ルールが受信トラフィックと送信トラフィックのどちらで評価されるかを指定します。<br>
   - `etag`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `etag`<br>
    **説明**: リソースが更新されるたびに変更される、一意の読み取り専用文字列。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソースグループ内で一意となるリソースの名前。この名前を使用して、リソースにアクセスすることができます。<br>
   - `priority`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `properties.priority`<br>
    **説明**: ルールの優先度。値は 100 から 4096 の間で指定できます。優先度番号は、コレクション内の各ルールに対して一意である必要があります。優先度番号が低いほど、ルールの優先度は高くなります。<br>
   - `protocol`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.protocol`<br>
    **説明**: このルールが適用されるネットワークプロトコル。<br>
   - `provisioning_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.provisioningState`<br>
    **説明**: セキュリティルールリソースのプロビジョニング状態。<br>
   - `source_address_prefix`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.sourceAddressPrefix`<br>
    **説明**: CIDR または送信元 IP の範囲。アスタリスク '*' を使用して、すべてのソース IP に一致させることもできます。'VirtualNetwork'、'AzureLoadBalancer'、'Internet' などのデフォルトのタグを使用することもできます。これがイングレスルールである場合、ネットワークトラフィックの発信元を指定します。<br>
   - `source_address_prefixes`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.sourceAddressPrefixes`<br>
    **説明**: CIDR または送信元 IP の範囲。<br>
   - `source_port_range`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.sourcePortRange`<br>
    **説明**: 送信元ポートまたは範囲。0 から 65535 までの整数または範囲。アスタリスク '*' を使用すると、すべてのポートに一致させることもできます。<br>
   - `source_port_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `properties.sourcePortRanges`<br>
    **説明**: 送信元ポートの範囲。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースのタイプ。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースタイプ。<br>