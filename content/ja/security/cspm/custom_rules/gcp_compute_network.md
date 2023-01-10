---
aliases:
- /ja/security_platform/cspm/custom_rules/gcp_compute_network
kind: documentation
title: gcp_compute_network
---

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `auto_create_subnetworks`
**タイプ**: `BOOLEAN`<br>
    **説明**: VPC ネットワークを作成するために設定する必要があります。設定されていない場合は、レガシーネットワークが作成されます。true に設定すると、VPC ネットワークはオートモードで作成されます。false に設定すると、VPC ネットワークはカスタムモードで作成されます。オートモードの VPC ネットワークは、地域ごとに 1 つのサブネットで開始されます。各サブネットは、「オートモード VPC ネットワークの IP 範囲」で説明するように、あらかじめ決められた範囲を持っています。カスタムモードの VPC ネットワークでは、サブネットワークの挿入方法を使用してサブネットを追加することができます。<br>
    **GCP 名**: `autoCreateSubnetworks`<br>
## `creation_timestamp`
**タイプ**: `TIMESTAMP`<br>
    **説明**: [出力のみ] RFC3339 のテキスト形式による作成タイムスタンプ。<br>
    **GCP 名**: `creationTimestamp`<br>
## `description`
**タイプ**: `STRING`<br>
    **説明**: このリソースの説明 (オプション)。ご自身でリソースを作成した場合に、このフィールドを使用してください。<br>
    **GCP 名**: `description`<br>
## `enable_ula_internal_ipv6`
**タイプ**: `BOOLEAN`<br>
    **説明**: このネットワークで ULA 内部 IPv6 を有効にします。この機能を有効にすると、Google 定義の ULA プレフィックス `fd20::/20.` から /48 を割り当てます。<br>
    **GCP 名**: `enableUlaInternalIpv6`<br>
## `gateway_ipv4`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] GCP によって選択された、ネットワークの外へのデフォルトルーティングのためのゲートウェイアドレス。<br>
    **GCP 名**: `gatewayIPv4`<br>
## `id`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] リソースの一意の識別子。この識別子はサーバーにより定義されます。<br>
    **GCP 名**: `id`<br>
## `internal_ipv6_range`
**タイプ**: `STRING`<br>
    **説明**: ULA 内部 IPv6 を有効にするとき、呼び出し側はオプションで、Google 定義の ULA プレフィックス `fd20::/20` から必要な /48 範囲を指定することができます。入力は、有効な /48 ULA IPv6 アドレスでなければならず、`fd20::/20` の範囲内になければなりません。指定された /48 がすでに他のリソースによって使用されている場合、演算子は失敗します。このフィールドが指定されない場合、/48 の範囲は `fd20::/20` からランダムに割り当てられ、このフィールドを介して返されます。<br>
    **GCP 名**: `internalIpv6Range`<br>
## `ipv4_range`
**タイプ**: `STRING`<br>
    **説明**: サブネットモードのネットワークに取って代わられ、非推奨。このネットワークで有効な内部アドレスの範囲。この範囲は CIDR 仕様で、例えば `192.168.0.0/16` のようなものです。ネットワークが作成されるときにクライアントから提供されます。<br>
    **GCP 名**: `IPv4Range`<br>
## `kind`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] リソースの種類。ネットワークの場合は常に `compute#network` となります。<br>
    **GCP 名**: `kind`<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `mtu`
**タイプ**: `INT32`<br>
    **説明**: 最大送信単位 (バイト単位)。このフィールドの最小値は `1460` で、最大値は `1500` バイトです。未指定の場合、デフォルトは `1460` です。<br>
    **GCP 名**: `mtu`<br>
## `name`
**タイプ**: `STRING`<br>
    **説明**: リソース名。リソースの作成時にユーザーが指定します。名前は 1 ～ 63 文字で、RFC1035 に準拠する必要があります。具体的には、名前は 1 ～ 63 文字で、正規表現 <code>[a-z]&#40;[-a-z0-9]*[a-z0-9]&#41;?</code> と一致しなければなりません。1 文字目は小文字の英字で、これに続く文字はすべて (最後の文字を除き) ダッシュ、小文字の英字、または数字にします。最後の文字は、小文字の英字か数字にする必要があります。<br>
    **GCP 名**: `name`<br>
## `network_firewall_policy_enforcement_order`
**タイプ**: `STRING`<br>
    **説明**: ネットワークファイアウォールポリシーの実行順序。`AFTER_CLASSIC_FIREWALL` または `BEFORE_CLASSIC_FIREWALL` のどちらかを指定します。このフィールドを指定しなかった場合、デフォルトは `AFTER_CLASSIC_FIREWALL` です。 <br>
    **GCP 名**: `networkFirewallPolicyEnforcementOrder`<br>
        **可能な値**:<br>
  - `AFTER_CLASSIC_FIREWALL` <br>
  - `BEFORE_CLASSIC_FIREWALL` <br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `peerings`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **説明**: [出力のみ] リソースのネットワークピアリングのリスト。<br>
  **GCP 名**: `peerings`
   - `auto_create_routes`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: このフィールドはまもなく非推奨となります。代わりに `exchange_subnet_routes` フィールドを使用してください。ピアリングされたネットワーク間で、フルメッシュ接続が自動的に作成・管理されるかどうかを示します。ピアリングの状態が ACTIVE である場合、Google Compute Engine は 2 つのネットワーク間で自動的にサブネットワークのルートを作成・管理するため、現在のところこのフィールドは常に `true` であるべきです。<br>
        **GCP 名**: `autoCreateRoutes`<br>
   - `exchange_subnet_routes`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: ピアリングされたネットワーク間で、フルメッシュ接続が自動的に作成・管理されるかどうかを示します。ピアリングの状態が ACTIVE である場合、Google Compute Engine は 2 つのネットワーク間で自動的にサブネットワークのルートを作成・管理するため、現在のところこのフィールドは常に `true` であるべきです。<br>
        **GCP 名**: `exchangeSubnetRoutes`<br>
   - `export_custom_routes`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: カスタムルートをピアネットワークにエクスポートするかどうか。デフォルトは `false` です。<br>
        **GCP 名**: `exportCustomRoutes`<br>
   - `export_subnet_routes_with_public_ip`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: 公開 IP 範囲を持つサブネットルートをエクスポートするかどうか。デフォルト値は `true` で、すべてのサブネットのルートがエクスポートされます。IPv4 の特別な使用範囲は、常にピアにエクスポートされ、このフィールドによって制御されません。<br>
        **GCP 名**: `exportSubnetRoutesWithPublicIp`<br>
   - `import_custom_routes`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: カスタムルートをピアネットワークからインポートするかどうか。デフォルトは `false` です。<br>
        **GCP 名**: `importCustomRoutes`<br>
   - `import_subnet_routes_with_public_ip`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: 公開 IP 範囲のサブネットルートをインポートするかどうか。デフォルトは false です。IPv4 特殊用途範囲は常にピアからインポートされ，このフィールドで制御されません。<br>
        **GCP 名**: `importSubnetRoutesWithPublicIp`<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
        **説明**: このピアリングの名前。ピアリングの作成時にクライアントから提供されます。この名前は、RFC1035 に準拠する必要があります。具体的には、名前は 1～63 文字で、正規表現 <code>[a-z]&#40;[-a-z0-9]*[a-z0-9]&#41;?</code> に一致しなければなりません。最初の文字は小文字でなければならず、続くすべての文字はダッシュ、小文字、または数字でなければなりませんが、最後の文字はダッシュであってはなりません。<br>
        **GCP 名**: `name`<br>
   - `network`<br>
    **タイプ**: `STRING`<br>
        **説明**: ピアネットワークの URL。完全な URL か部分的な URL のどちらかにすることができます。ピアネットワークは、異なるプロジェクトに属している可能性があります。部分的な URL にプロジェクトが含まれていない場合、ピアネットワークは現在のネットワークと同じプロジェクトに属していると見なされます。<br>
        **GCP 名**: `network`<br>
   - `peer_mtu`<br>
    **Type**: `INT32`<br>
        **説明**: 最大送信単位 (バイト単位)。<br>
        **GCP 名**: `peerMtu`<br>
   - `stack_type`<br>
    **タイプ**: `STRING`<br>
        **説明**: ピアネットワーク間で、どの IP バージョンのトラフィックとルートのインポートまたはエクスポートを許可するか。デフォルト値は `IPV4_ONLY` です。 <br>
        **GCP 名**: `stackType`<br>
            **Possible values**:<br>
      - `IPV4_IPV6` - このピアリングでは、IPv4 トラフィックとルートの交換が可能です。さらに、一致するピアリングが `IPV4_IPV6` である場合、IPv6 のトラフィックとルートも交換されます。<br>
      - `IPV4_ONLY` - このピアリングは、一致するピアリングが `IPV4_IPV6` であっても、IPv4 のトラフィックとルートのみを交換することを許可します。<br>
   - `state`<br>
    **タイプ**: `STRING`<br>
        **説明**: [出力のみ] ピアリングの状態で、`ACTIVE` または `INACTIVE` のいずれかです。ピアネットワークに一致する構成がある場合、ピアリングは `ACTIVE` となります。 <br>
        **GCP 名**: `state`<br>
            **Possible values**:<br>
      - `ACTIVE` - ピアに一致する構成が存在します。<br>
      - `INACTIVE` - ピアに一致する構成がありません (ピアが存在しない場合を含む)。<br>
   - `state_details`<br>
    **タイプ**: `STRING`<br>
        **説明**: [出力のみ] ピアリングの現在の状態についての詳細。<br>
        **GCP 名**: `stateDetails`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `routing_config`
  **Type**: `STRUCT`<br>
  **説明**: このネットワークに対するネットワークレベルのルーティング構成。クラウドルーターが、どのような種類のネットワーク全体のルーティング動作を強制するかを決定するために使用されます。<br>
  **GCP 名**: `routingConfig`
   - `routing_mode`<br>
    **タイプ**: `STRING`<br>
        **説明**: 使用するネットワーク全体のルーティングモード。`REGIONAL` に設定すると、このネットワークのクラウドルーターは、ルーターと同じ地域にあるこのネットワークのサブネットとのルートのみを広告するようになります。`GLOBAL` に設定すると、このネットワークのクラウドルーターは、地域を越えてこのネットワークのすべてのサブネットとのルートを広告するようになります。 <br>
        **GCP 名**: `routingMode`<br>
            **Possible values**:<br>
      - `GLOBAL` <br>
      - `REGIONAL` <br>
## `self_link`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] このリソースのサーバー定義の URL。<br>
    **GCP name**: `selfLink`<br>
## `self_link_with_id`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] このリソースのサーバー定義 URL とリソース ID。<br>
    **GCP 名**: `selfLinkWithId`<br>
## `subnetworks`
**タイプ**: `UNORDERED_LIST_STRING`<br>
    **説明**: [出力のみ] この VPC ネットワーク内のすべてのサブネットワークに対するサーバー定義の完全修飾 URL。<br>
    **GCP 名**: `subnetworks`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>