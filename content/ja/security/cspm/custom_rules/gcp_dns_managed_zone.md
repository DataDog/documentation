---
dependencies: []
disable_edit: true
---
# gcp_dns_managed_zone

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `cloud_logging_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `cloudLoggingConfig`<br>
   - `enable_logging`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableLogging`<br>
    **説明**: 設定された場合、この ManagedZone のクエリロギングを有効にします。デフォルトでは False で、ロギングはオプトインになります。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
## `creation_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `creationTime`<br>
**説明**: このリソースがサーバーに作成された時間。これは RFC3339 のテキスト形式です。出力のみ。<br>
## `description`
**タイプ**: `STRING`<br>
**Provider name**: `description`<br>
**説明**: ユーザーの利便性のために、このリソースに関連付けられた最大 1024 文字の変更可能な文字列。管理対象ゾーンの関数には影響を与えません。<br>
## `dns_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `dnsName`<br>
**説明**: この管理対象ゾーンの DNS 名、例えば "example.com."。<br>
## `dnssec_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `dnssecConfig`<br>
**説明**: DNSSEC の構成。<br>
   - `default_key_specs`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `defaultKeySpecs`<br>
    **説明**: この ManagedZone の初期 DnsKeys を生成するためのパラメーターを指定します。OFF の状態でのみ変更可能です。<br>
       - `algorithm`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `algorithm`<br>
        **説明**: このキーの DNSSEC アルゴリズムを指定する文字列ニーモニック。 <br>
        **可能な値**:<br>
          - `rsasha1`
          - `rsasha256`
          - `rsasha512`
          - `ecdsap256sha256`
          - `ecdsap384sha384`
       - `key_length`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `keyLength`<br>
        **説明**: キーの長さ (ビット数)。<br>
       - `key_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `keyType`<br>
        **説明**: 鍵署名鍵 (KSK) またはゾーン署名鍵 (ZSK) のどちらであるかを指定します。鍵署名鍵にはセキュアエントリーポイントフラグが設定されており、アクティブな場合、タイプ DNSKEY のリソースレコードセットに署名するためにのみ使用されます。ゾーン署名鍵にはセキュアエントリーポイントのフラグが設定されておらず、 他のすべてのタイプのリソースレコードセットに署名するために使用されます。 <br>
        **可能な値**:<br>
          - `keySigning`
          - `zoneSigning`
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `non_existence`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `nonExistence`<br>
    **説明**: 認証された存在拒否応答に関する機構を指定します。OFF のときのみ変更可能です。<br>
    **可能な値**:<br>
      - `nsec`
      - `nsec3`
   - `state`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `state`<br>
    **説明**: DNSSEC が有効かどうか、どのようなモードであるかを指定します。 <br>
    **可能な値**:<br>
      - `off` - DNSSEC は無効で、ゾーンは署名されません。<br>
      - `on` - DNSSEC は有効で、ゾーンが署名され、完全に管理されています。<br>
      - `transfer` - DNSSEC は有効ですが、「転送」モードになっています。<br>
## `forwarding_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `forwardingConfig`<br>
**説明**: このフィールドの存在は、このゾーンでアウトバウンド転送が有効であることを示します。このフィールドの値は、転送する宛先のセットを含みます。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `target_name_servers`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `targetNameServers`<br>
    **説明**: 転送先のネームサーバーのリスト。複数のターゲットが指定された場合、クラウド DNS は利用可能な最も良いネームサーバーを選択します。<br>
       - `forwarding_path`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `forwardingPath`<br>
        **説明**: この NameServerTarget の転送パス。未設定または DEFAULT に設定されている場合、Cloud DNS は IP アドレス範囲に基づいて転送を決定します。つまり、RFC1918 アドレスは VPC ネットワークへ、非 RFC1918 アドレスはインターネットへ転送されます。PRIVATE に設定すると、Cloud DNS は常にこのターゲットに対して VPC ネットワークを通してクエリを送信します。 <br>
        **可能な値**:<br>
          - `default` - クラウド DNS は、アドレスの範囲に基づいて転送を判断します。つまり、RFC1918 のアドレスは VPC 経由でターゲットに転送し、RFC1918 以外のアドレスはインターネット経由でターゲットに転送します。<br>
          - `private` - クラウド DNS は常に VPC を経由してこのターゲットに転送されます。<br>
       - `ipv4_address`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ipv4Address`<br>
        **説明**: 対象のネームサーバーの IPv4 アドレス。<br>
       - `ipv6_address`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `ipv6Address`<br>
        **説明**: 対象のネームサーバーの IPv6 アドレス。ipv4 と ipv6 の両方のフィールドに入力することはできません。2022 年 11 月現在、パブリックプレビューです。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: サーバーで定義されたリソースの一意な識別子 (出力のみ)<br>
## `kind`
**タイプ**: `STRING`<br>
**Provider name**: `kind`<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: このリソースにユーザーが割り当てる名前。プロジェクト内で一意でなければなりません。名前は 1～63 文字で、文字で始まり、文字または数字で終わり、小文字、数字、ダッシュのみでなければなりません。<br>
## `name_server_set`
**タイプ**: `STRING`<br>
**プロバイダー名**: `nameServerSet`<br>
**説明**: オプションで、この ManagedZone の NameServerSet を指定します。NameServerSet は、同じ ManagedZone をホストする DNS ネームサーバーのセットです。ほとんどのユーザーはこのフィールドを設定しないままにしています。このフィールドを使用する必要がある場合は、アカウントチームに連絡してください。<br>
## `name_servers`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `nameServers`<br>
**説明**: managed_zone をこれらの仮想ネームサーバーに委譲します。サーバーによって定義されます (出力のみ)<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `peering_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `peeringConfig`<br>
**説明**: このフィールドの存在は、このゾーンで DNS ピアリングが有効であることを示します。このフィールドの値は、ピアとなるネットワークを含みます。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `target_network`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `targetNetwork`<br>
    **説明**: ピアとなるネットワーク。<br>
       - `deactivate_time`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `deactivateTime`<br>
        **説明**: ゾーンが非活性化された時間。RFC 3339 の日付-時間形式です。空の文字列は、ピアリング接続がアクティブであることを示します。プロデューサーネットワークはゾーンを非活性化することができます。ゾーンが対象とするプロデューサーネットワークが削除された場合、ゾーンは自動的に非アクティブになります。出力のみ。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
       - `network_url`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `networkUrl`<br>
        **説明**: クエリを転送する VPC ネットワークの完全修飾 URL。https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network} のような形式である必要があります。<br>
## `private_visibility_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `privateVisibilityConfig`<br>
**説明**: 非公開ゾーンの場合、ゾーンが可視化される仮想プライベートクラウドリソースのセット。<br>
   - `gke_clusters`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `gkeClusters`<br>
    **説明**: このゾーンを見ることができる Google Kubernetes Engine クラスターのリスト。<br>
       - `gke_cluster_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `gkeClusterName`<br>
        **説明**: この ManagedZone をバインドするクラスターのリソース名。projects/*/locations/*/clusters/* のようなフォーマットで指定する必要があります。GKE projects.locations.clusters.get API から参照されます: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `networks`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `networks`<br>
    **説明**: このゾーンを見ることができる VPC ネットワークのリスト。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
       - `network_url`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `networkUrl`<br>
        **説明**: バインドする VPC ネットワークの完全修飾 URL。この URL は https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network} のような形式で指定します。<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `reverse_lookup_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `reverseLookupConfig`<br>
**説明**: このフィールドが存在する場合、これは管理された逆引きゾーンであり、クラウド DNS は VPC リソース用に自動的に構成されたレコードを使用して逆引きクエリを解決することを示します。これは private_visibility_config の下にリストされたネットワークにのみ適用されます。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
## `service_directory_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `serviceDirectoryConfig`<br>
**説明**: このフィールドは、関連するサービスディレクトリネームスペースにリンクしています。公開ゾーンと転送ゾーンにはこのフィールドを設定しないでください。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
   - `namespace`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `namespace`<br>
    **説明**: ゾーンに関連付けられたネームスペースに関する情報を含みます。<br>
       - `deletion_time`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `deletionTime`<br>
        **説明**: このゾーンをバックアップするネームスペースが削除された時刻。これは RFC3339 のテキスト形式です。出力のみ。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
       - `namespace_url`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `namespaceUrl`<br>
        **説明**: ゾーンに関連付けられたネームスペースの完全修飾 URL。フォーマットは https://servicedirectory.googleapis.com/v1/projects/{project}/locations/{location}/namespaces/{namespace} でなければなりません。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `visibility`
**タイプ**: `STRING`<br>
**プロバイダー名**: `visibility`<br>
**説明**: ゾーンの可視性: 公開ゾーンはインターネットに公開され、非公開ゾーンは仮想プライベートクラウドリソースにのみ可視化されます。<br>
**可能な値**:<br>
  - `public`
  - `private`