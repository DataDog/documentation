---
dependencies: []
disable_edit: true
---
# gcp_compute_instance

## `advanced_machine_features`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `advancedMachineFeatures`<br>
**説明**: マシン関連の高度な動作機能を制御します。<br>
   - `enable_nested_virtualization`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableNestedVirtualization`<br>
    **説明**: ネストされた仮想化を有効にするかどうか (デフォルトは false)。<br>
   - `enable_uefi_networking`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableUefiNetworking`<br>
    **説明**: インスタンス作成時に UEFI ネットワーキングを有効にするかどうか。<br>
   - `threads_per_core`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `threadsPerCore`<br>
    **説明**: 物理コアあたりのスレッド数。同時マルチスレッド (SMT) を無効にするには、これを 1 に設定します。未設定の場合、プロセッサがサポートするコアあたりのスレッド数の最大値が設定されます。<br>
   - `visible_core_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `visibleCoreCount`<br>
    **説明**: インスタンスに公開する物理コアの数。コアあたりのスレッド数を乗算して、インスタンスに公開する仮想 CPU の総数を計算します。未設定の場合、コア数はインスタンスの公称 CPU 数と基盤となるプラットフォームの SMT 幅から推論されます。<br>
## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `can_ip_forward`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `canIpForward`<br>
**説明**: このインスタンスが宛先または送信元 IP が一致しないパケットを送受信できるようにします。これは、このインスタンスを使用してルートを転送することを計画している場合に必要です。詳細については、「IP 転送を有効にする」を参照してください。<br>
## `confidential_instance_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `confidentialInstanceConfig`<br>
   - `enable_confidential_compute`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableConfidentialCompute`<br>
    **説明**: インスタンスがコンフィデンシャルコンピューティングを有効にするかどうかを定義します。<br>
## `cpu_platform`
**タイプ**: `STRING`<br>
**プロバイダー名**: `cpuPlatform`<br>
**説明**: [出力のみ] このインスタンスが使用する CPU プラットフォーム。<br>
## `creation_timestamp`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `creationTimestamp`<br>
**説明**: [出力のみ] RFC3339 の書式で表記された作成日時のタイムスタンプ。<br>
## `deletion_protection`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `deletionProtection`<br>
**説明**: リソースを削除から保護するかどうか。<br>
## `description`
**タイプ**: `STRING`<br>
**Provider name**: `description`<br>
**説明**: このリソースの説明 (オプション)。ご自身でリソースを作成した場合に、このプロパティを使用してください。<br>
## `display_device`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `displayDevice`<br>
**説明**: インスタンスの表示デバイスを有効にします。<br>
   - `enable_display`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableDisplay`<br>
    **説明**: インスタンスがディスプレイを有効にしているかどうかを定義します。<br>
## `gcp_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `status`<br>
**説明**: [出力のみ] インスタンスのステータス。値は PROVISIONING、STAGING、RUNNING、STOPPING、SUSPENDING、SUSPENDED、REPAIRING、TERMINATED のいずれかです。インスタンスのステータスについては、「インスタンスのライフサイクル」を参照してください。 <br>
**可能な値**:<br>
  - `DEPROVISIONING` - インスタンスは停止しており、ネットワークのデプログラミング、クォータ、IP の解放、ディスクのテアダウンなどのテアダウン作業を行っています。<br>
  - `PROVISIONING` - インスタンスにリソースが割り当てられています。<br>
  - `REPAIRING` - インスタンスは修理中です。<br>
  - `RUNNING` - インスタンスは実行中です。<br>
  - `STAGING` - 必要なリソースがすべて割り当てられ、インスタンスが起動中です。<br>
  - `STOPPED` - インスタンスは正常に停止しました。<br>
  - `STOPPING` - インスタンスは現在停止中です (削除されるか強制終了されます)。<br>
  - `SUSPENDED` - インスタンスが一時停止しました。<br>
  - `SUSPENDING` - インスタンスは一時停止中です。<br>
  - `TERMINATED` - インスタンスが停止しました (明示的なアクションまたは根本的な失敗によって)。<br>
## `guest_accelerators`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `guestAccelerators`<br>
**説明**: インスタンスにアタッチされているアクセラレータカードの種類と枚数のリスト。<br>
   - `accelerator_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `acceleratorCount`<br>
    **説明**: このインスタンスに公開されるゲストアクセラレータカードの数。<br>
   - `accelerator_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `acceleratorType`<br>
    **説明**: このインスタンスにアタッチするアクセラレータタイプのリソースの完全または部分的な URL。例: projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100。インスタンステンプレートを作成する場合は、アクセラレータ名のみを指定します。アクセラレータタイプの全リストは、「Compute Engine の GPU」を参照してください。<br>
## `hostname`
**タイプ**: `STRING`<br>
**プロバイダー名**: `hostname`<br>
**説明**: インスタンスのホスト名を指定します。指定するホスト名は RFC1035 に準拠したものである必要があります。ホスト名を指定しない場合、デフォルトのホスト名は、グローバル DNS を使用する場合は [INSTANCE_NAME].c.[PROJECT_ID].internal で、ゾーン DNS を使用する場合は [INSTANCE_NAME].[ZONE].c.[PROJECT_ID].internal です。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: [出力のみ] リソースの一意の識別子。この識別子はサーバーにより定義されます。<br>
## `key_revocation_action_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `keyRevocationActionType`<br>
**説明**: インスタンスの KeyRevocationActionType。サポートされるオプションは "STOP" と "NONE" です。指定しない場合のデフォルトは "NONE" です。 <br>
**可能な値**:<br>
  - `KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED` - デフォルト値。この値は未使用です。<br>
  - `NONE` - ユーザーが無操作を選択したことを示します。<br>
  - `STOP` - キーの失効時に VM をシャットダウンすることをユーザーが選択したことを示します。<br>
## `kind`
**タイプ**: `STRING`<br>
**Provider name**: `kind`<br>
**説明**: [出力のみ] リソースの種類。インスタンスの場合は、常に compute#instance になります。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `last_start_timestamp`
**タイプ**: `STRING`<br>
**プロバイダー名**: `lastStartTimestamp`<br>
**説明**: [出力のみ] RFC3339 の書式で表現された最終開始のタイムスタンプ。<br>
## `last_stop_timestamp`
**タイプ**: `STRING`<br>
**プロバイダー名**: `lastStopTimestamp`<br>
**説明**: [出力のみ] RFC3339 の書式で表現された最終中止のタイムスタンプ。<br>
## `last_suspended_timestamp`
**タイプ**: `STRING`<br>
**プロバイダー名**: `lastSuspendedTimestamp`<br>
**説明**: [出力のみ] RFC3339 の書式で表現された最終停止のタイムスタンプ。<br>
## `machine_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `machineType`<br>
**説明**: このインスタンスに使用するマシンタイプリソースの完全な、または部分的な URL で、zones/zone/machineTypes/machine-type という形式です。これはインスタンス作成時にクライアントから提供されます。例えば、zones/us-central1-f/machineTypes/n1-standard-1 は定義済みマシンタイプへの有効な部分 URL です。ここで CPUS は 1 または 32 までの偶数 (2、4、6 ... 24 など)、MEMORY はこのインスタンスの総メモリ量です。メモリは 256 MB の倍数で、MB 単位で指定する必要があります (例えば、5 GB のメモリは 5120 MB です): zones/zone/machineTypes/custom-<CPUS>-<MEMORY> 例: zones/us-central1-f/machineTypes/custom-4-5120。制限事項の全リストは、カスタムマシンタイプの仕様をお読みください。<br>
## `metadata`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `metadata`<br>
**説明**: このインスタンスに割り当てられたメタデータのキーと値のペア。これにはカスタムメタデータと定義済みのキーが含まれます。<br>
   - `items`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `items`<br>
    **説明**: キーと値のペアの配列。すべてのキーと値の合計サイズは 512 KB 未満でなければなりません。<br>
       - `key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `key`<br>
        **説明**: メタデータエントリーのキー。キーは正規表現 [a-zA-Z0-9-_]+ に従わなければなりません。長さは128バイト未満です。これはメタデータサーバーの URL の一部として反映されます。また、あいまいさを避けるため、キーはプロジェクトの他のメタデータキーと衝突してはいけません。<br>
       - `value`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `value`<br>
        **説明**: メタデータエントリーの値。これらは自由形式の文字列であり、そのインスタンスで動作するイメージが解釈した場合にのみ意味を持ちます。値に対する唯一の制限は、サイズが 262144 バイト (256 KiB) 以下でなければならないということです。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
    **説明**: [出力のみ] リソースの種類。メタデータの場合は、常に compute#metadata になります。<br>
## `min_cpu_platform`
**タイプ**: `STRING`<br>
**プロバイダー名**: `minCpuPlatform`<br>
**説明**: VM インスタンスの最小 CPU プラットフォームを指定します。適用可能な値は、minCpuPlatform: "Intel Haswell" や minCpuPlatform: "Intel Sandy Bridge" のような CPU プラットフォームのフレンドリーな名前です。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソースを最初に作成するときにクライアントが提供するリソースの名前。リソース名は 1〜63 文字の長さで、RFC1035 に準拠する必要があります。具体的には、名前は 1〜63 文字で、正規表現 `[a-z]([-a-z0-9]*[a-z0-9])?` に一致しなければなりません。 これは、最初の文字は小文字でなければならず、続くすべての文字はダッシュ、小文字、または数字でなければならないことを意味しますが、最後の文字はダッシュであってはなりません。<br>
## `network_interfaces`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `networkInterfaces`<br>
**説明**: このインスタンスのネットワーク構成の配列。インターネットへの接続など、他のネットワークサービスと相互作用するようにインターフェイスを構成する方法を指定します。インスタンスごとに複数のインターフェイスがサポートされています。<br>
   - `access_configs`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `accessConfigs`<br>
    **説明**: このインターフェースの構成の配列。現在のところ、ONE_TO_ONE_NAT という 1 つのアクセス構成のみがサポートされています。もし accessConfigs が指定されていない場合、このインスタンスは外部からのインターネットアクセスを持ちません。<br>
       - `external_ipv6`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `externalIpv6`<br>
        **説明**: ipv6AccessConfigs にのみ適用されます。このインスタンスに関連する外部 IPv6 範囲の最初の IPv6 アドレスで、プレフィックス長は ipv6AccessConfig の externalIpv6PrefixLength に格納されます。静的な外部 IP アドレスを使用するには、未使用でインスタンスのゾーンと同じリージョンにある必要があります。指定しない場合、Google Cloud はインスタンスのサブネットワークから外部 IPv6 アドレスを自動的に割り当てます。<br>
       - `external_ipv6_prefix_length`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `externalIpv6PrefixLength`<br>
        **説明**: ipv6AccessConfigs にのみ適用されます。外部 IPv6 範囲のプレフィックス長。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
        **説明**: [出力のみ] リソースの種類。アクセス構成の場合は、常に compute#accessConfig になります。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `name`<br>
        **説明**: このアクセス構成の名前。accessConfigs (IPv4) の場合、デフォルトおよび推奨される名前は External NAT ですが、My external IP や Network Access など任意の文字列を使用することができます。ipv6AccessConfigs の場合、推奨される名前は External IPv6 です。<br>
       - `nat_ip`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `natIP`<br>
        **説明**: accessConfigs (IPv4) にのみ適用されます。このインスタンスに関連付けられた外部 IP アドレス。プロジェクトで使用可能な未使用の静的外部 IP アドレスを指定するか、このフィールドを未定義のままにして、共有エフェメラル IP アドレスプールからの IP を使用します。静的な外部 IP アドレスを指定する場合、インスタンスのゾーンと同じリージョンに存在する必要があります。<br>
       - `network_tier`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `networkTier`<br>
        **説明**: これは、このアクセス構成の設定に使用されるネットワーク層を意味し、PREMIUM、STANDARD の値のみを取ることができます。有効な外部 IP アドレスを持たない AccessConfig を指定した場合、この networkTier でエフェメラル IP が作成されます。有効な外部 IP アドレスを持つ AccessConfig を指定する場合は、その IP を所有する Address リソースに関連付けられた networkTier のアドレスと一致する必要があります。<br>
        **可能な値**:<br>
          - `FIXED_STANDARD` - 固定帯域の公衆インターネット品質。<br>
          - `PREMIUM` - Google グレードの高品質なネットワーク層、あらゆるネットワーク製品に対応。<br>
          - `STANDARD` - 公衆インターネット品質、他のネットワーク製品の限られたサポートのみ。<br>
          - `STANDARD_OVERRIDES_FIXED_STANDARD` - (出力のみ) FIXED_STANDARD の固定標準層が期限切れ、または構成されていない場合の一時的な層。<br>
       - `public_ptr_domain_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `publicPtrDomainName`<br>
        **説明**: 公開 PTR レコードの DNS ドメイン名。このフィールドは accessConfig で `setPublicPtr` フィールドが有効になっている場合のみ設定できます。このフィールドが ipv6AccessConfig で指定されていない場合、デフォルトの PTR レコードは関連する外部 IPv6 レンジの最初の IP に対して作成されます。<br>
       - `set_public_ptr`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `setPublicPtr`<br>
        **説明**: インスタンスの外部 IP アドレスを DNS ドメイン名にマップするために、公開 DNS の PTR レコードを作成すべきかどうかを指定します。このフィールドは ipv6AccessConfig では使用されません。VM に外部 IPv6 レンジが関連付けられている場合、デフォルトの PTR レコードが作成されます。<br>
       - `type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `type`<br>
        **説明**: 構成のタイプ。accessConfigs (IPv4) の場合、デフォルトで唯一のオプションは ONE_TO_ONE_NAT です。ipv6AccessConfigs の場合、デフォルトで唯一のオプションは、DIRECT_IPV6 です。 <br>
        **可能な値**:<br>
          - `DIRECT_IPV6`
          - `ONE_TO_ONE_NAT`
   - `alias_ip_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `aliasIpRanges`<br>
    **説明**: このネットワークインターフェイスのエイリアス IP 範囲の配列。このフィールドは、VPC ネットワーク内のネットワークインターフェイスにのみ指定できます。<br>
       - `ip_cidr_range`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ipCidrRange`<br>
        **説明**: このインターフェイスに割り当てる IP エイリアス範囲。この IP CIDR 範囲は指定されたサブネットワークに属していなければならず、 システムによって予約された IP アドレスや、他のネットワークインターフェイスによって 使用された IP アドレスを含むことはできません。この範囲は単一の IP アドレス (10.2.3.4 など)、ネットマスク (/24 など)、または CIDR フォーマットの文字列 (10.1.2.0/24 など) である可能性があります。<br>
       - `subnetwork_range_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `subnetworkRangeName`<br>
        **説明**: IP エイリアス範囲を割り当てるためのサブネットワークのセカンダリー IP 範囲の名前です。指定しない場合、サブネットワークのプライマリー範囲が使用されます。<br>
   - `internal_ipv6_prefix_length`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `internalIpv6PrefixLength`<br>
    **説明**: プライマリ内部 IPv6 範囲のプレフィックス長。<br>
   - `ipv6_access_configs`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `ipv6AccessConfigs`<br>
    **説明**: このインターフェイスの IPv6 アクセス構成の配列。現在のところ、DIRECT_IPV6 という IPv6 アクセス構成のみがサポートされています。ipv6AccessConfig が指定されていない場合、このインスタンスは外部からの IPv6 インターネットアクセスを持ちません。<br>
       - `external_ipv6`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `externalIpv6`<br>
        **説明**: ipv6AccessConfigs にのみ適用されます。このインスタンスに関連する外部 IPv6 範囲の最初の IPv6 アドレスで、プレフィックス長は ipv6AccessConfig の externalIpv6PrefixLength に格納されます。静的な外部 IP アドレスを使用するには、未使用でインスタンスのゾーンと同じリージョンにある必要があります。指定しない場合、Google Cloud はインスタンスのサブネットワークから外部 IPv6 アドレスを自動的に割り当てます。<br>
       - `external_ipv6_prefix_length`<br>
        **タイプ**: `INT32`<br>
        **プロバイダー名**: `externalIpv6PrefixLength`<br>
        **説明**: ipv6AccessConfigs にのみ適用されます。外部 IPv6 範囲のプレフィックス長。<br>
       - `kind`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `kind`<br>
        **説明**: [出力のみ] リソースの種類。アクセス構成の場合は、常に compute#accessConfig になります。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `name`<br>
        **説明**: このアクセス構成の名前。accessConfigs (IPv4) の場合、デフォルトおよび推奨される名前は External NAT ですが、My external IP や Network Access など任意の文字列を使用することができます。ipv6AccessConfigs の場合、推奨される名前は External IPv6 です。<br>
       - `nat_ip`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `natIP`<br>
        **説明**: accessConfigs (IPv4) にのみ適用されます。このインスタンスに関連付けられた外部 IP アドレス。プロジェクトで使用可能な未使用の静的外部 IP アドレスを指定するか、このフィールドを未定義のままにして、共有エフェメラル IP アドレスプールからの IP を使用します。静的な外部 IP アドレスを指定する場合、インスタンスのゾーンと同じリージョンに存在する必要があります。<br>
       - `network_tier`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `networkTier`<br>
        **説明**: これは、このアクセス構成の設定に使用されるネットワーク層を意味し、PREMIUM、STANDARD の値のみを取ることができます。有効な外部 IP アドレスを持たない AccessConfig を指定した場合、この networkTier でエフェメラル IP が作成されます。有効な外部 IP アドレスを持つ AccessConfig を指定する場合は、その IP を所有する Address リソースに関連付けられた networkTier のアドレスと一致する必要があります。<br>
        **可能な値**:<br>
          - `FIXED_STANDARD` - 固定帯域の公衆インターネット品質。<br>
          - `PREMIUM` - Google グレードの高品質なネットワーク層、あらゆるネットワーク製品に対応。<br>
          - `STANDARD` - 公衆インターネット品質、他のネットワーク製品の限られたサポートのみ。<br>
          - `STANDARD_OVERRIDES_FIXED_STANDARD` - (出力のみ) FIXED_STANDARD の固定標準層が期限切れ、または構成されていない場合の一時的な層。<br>
       - `public_ptr_domain_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `publicPtrDomainName`<br>
        **説明**: 公開 PTR レコードの DNS ドメイン名。このフィールドは accessConfig で `setPublicPtr` フィールドが有効になっている場合のみ設定できます。このフィールドが ipv6AccessConfig で指定されていない場合、デフォルトの PTR レコードは関連する外部 IPv6 レンジの最初の IP に対して作成されます。<br>
       - `set_public_ptr`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `setPublicPtr`<br>
        **説明**: インスタンスの外部 IP アドレスを DNS ドメイン名にマップするために、公開 DNS の PTR レコードを作成すべきかどうかを指定します。このフィールドは ipv6AccessConfig では使用されません。VM に外部 IPv6 レンジが関連付けられている場合、デフォルトの PTR レコードが作成されます。<br>
       - `type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `type`<br>
        **説明**: 構成のタイプ。accessConfigs (IPv4) の場合、デフォルトで唯一のオプションは ONE_TO_ONE_NAT です。ipv6AccessConfigs の場合、デフォルトで唯一のオプションは、DIRECT_IPV6 です。 <br>
        **可能な値**:<br>
          - `DIRECT_IPV6`
          - `ONE_TO_ONE_NAT`
   - `ipv6_access_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ipv6AccessType`<br>
    **説明**: [出力のみ] EXTERNAL、INTERNAL のいずれかを指定し、その IP がインターネットからアクセス可能かどうかを示します。このフィールドは常にサブネットワークから継承されます。stackType が IPV4_IPV6 のときのみ有効です。 <br>
    **可能な値**:<br>
      - `EXTERNAL` - このネットワークインターフェイスは、外部 IPv6 を持つことができます。<br>
      - `INTERNAL` - このネットワークインターフェイスは、内部 IPv6 を持つことができます。<br>
   - `ipv6_address`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ipv6Address`<br>
    **説明**: このネットワークインターフェイスの IPv6 内部ネットワークアドレス。静的な内部 IP アドレスを使用するには、未使用でインスタンスのゾーンと同じリージョンにある必要があります。指定しない場合、Google Cloud はインスタンスのサブネットワークから内部 IPv6 アドレスを自動的に割り当てます。<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `kind`<br>
    **説明**: [出力のみ] リソースの種類。ネットワークインターフェイスの場合は、常に compute#networkInterface になります。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: [出力のみ] ネットワークインターフェイスの名前で、サーバーによって生成されます。VM の場合、ネットワークインターフェイスは nicN という命名形式を使用します。ここで、N は 0 から 7 の間の値です。デフォルトのインターフェイス値は nic0 です。<br>
   - `network`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `network`<br>
    **説明**: このインスタンスの VPC ネットワークリソースの URL。インスタンスの作成時に、ネットワークもサブネットワークも指定しなかった場合、デフォルトのネットワーク global/networks/default が使用されます。選択したプロジェクトにデフォルトのネットワークがない場合、ネットワークまたはサブネットを指定する必要があります。ネットワークが指定されておらず、サブネットワークが指定されている場合、そのネットワークが推論されます。このプロパティを指定する場合、ネットワークを完全な URL または部分的な URL として指定することができます。たとえば、以下はすべて有効な URL です: - https://www.googleapis.com/compute/v1/projects/project/global/networks/ network - projects/project/global/networks/network - global/networks/default<br>
   - `network_attachment`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `networkAttachment`<br>
    **説明**: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name} の形式の、このインターフェイスが接続すべきネットワークアタッチの URL。<br>
   - `network_ip`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `networkIP`<br>
    **説明**: このネットワークインターフェイスのインスタンスに割り当てる IPv4 内部 IP アドレス。ユーザーによって指定されない場合、未使用の内部 IP がシステムによって割り当てられます。<br>
   - `nic_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `nicType`<br>
    **説明**: このインターフェイスで使用される vNIC のタイプ。これは gVNIC または VirtioNet である可能性があります。 <br>
    **可能な値**:<br>
      - `GVNIC` - GVNIC<br>
      - `UNSPECIFIED_NIC_TYPE` - タイプ指定なし。<br>
      - `VIRTIO_NET` - VIRTIO<br>
   - `queue_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `queueCount`<br>
    **説明**: ネットワークインターフェイスのためにユーザーが指定するネットワーキングキュー数。Rx と Tx の両方のキューがこの数値に設定されます。ユーザーによって指定されない場合は、空となります。<br>
   - `stack_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `stackType`<br>
    **説明**: このネットワークインターフェイスのスタックタイプ。IPv4 アドレスのみを割り当てるには、IPV4_ONLY を使用します。IPv4 と IPv6 の両方のアドレスを割り当てるには、IPV4_IPV6 を使用します。指定しない場合は、IPV4_ONLY が使用されます。このフィールドは、インスタンス作成時とネットワークインターフェイスの更新時の両方で設定することができます。<br>
    **可能な値**:<br>
      - `IPV4_IPV6` - ネットワークインターフェイスは、IPv4 と IPv6 の両方のアドレスを持つことができます。<br>
      - `IPV4_ONLY` - ネットワークインターフェイスには、IPv4 アドレスが割り当てられます。<br>
   - `subnetwork`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `subnetwork`<br>
    **説明**: このインスタンスの Subnetwork リソースの URL。ネットワークリソースがレガシーモードの場合、このフィールドは指定しないでください。ネットワークがオートサブネットモードの場合、サブネットワークの指定は任意です。ネットワークがカスタムサブネットモードの場合、サブネットワークの指定は必須です。このフィールドを指定する場合、サブネットワークを完全または部分的な URL として指定することができます。たとえば、以下はすべて有効な URL です: - https://www.googleapis.com/compute/v1/projects/project/regions/region /subnetworks/subnetwork - regions/region/subnetworks/subnetwork<br>
## `network_performance_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `networkPerformanceConfig`<br>
   - `total_egress_bandwidth_tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `totalEgressBandwidthTier`<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `params`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `params`<br>
**説明**: 入力のみ。 [入力のみ] リクエストと共に渡されるが、リソースのペイロードの一部として永続化されない追加パラメーター。<br>

## `parent`
**タイプ**: `STRING`<br>
## `private_ipv6_google_access`
**タイプ**: `STRING`<br>
**プロバイダー名**: `privateIpv6GoogleAccess`<br>
**説明**: VM のプライベート IPv6 グーグルアクセスタイプ。指定しない場合は、デフォルトで INHERIT_FROM_SUBNETWORK を使用します。 <br>
**可能な値**:<br>
  - `ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE` - Google サービスとの双方向のプライベート IPv6 アクセス。指定すると、インスタンスのデフォルトネットワークインターフェイスにアタッチされているサブネットワークに内部 IPv6 プレフィックスが割り当てられます (以前に割り当てられていない場合)。<br>
  - `ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE` - このサブネット内の VM から Google サービスへのアウトバウンドプライベート IPv6 アクセス。指定すると、インスタンスのデフォルトネットワークインターフェイスにアタッチされているサブネットワークに内部 IPv6 プレフィックスが割り当てられます (以前に割り当てられていない場合)。<br>
  - `INHERIT_FROM_SUBNETWORK` - 各ネットワークインターフェイスは、そのサブネットワークから PrivateIpv6GoogleAccess を継承します。<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `reservation_affinity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `reservationAffinity`<br>
**説明**: このインスタンスが消費できる予約を指定します。<br>
   - `consume_reservation_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `consumeReservationType`<br>
    **説明**: このインスタンスがリソースを消費することができる予約の種類を指定します。ANY_RESERVATION (デフォルト)、SPECIFIC_RESERVATION、または NO_RESERVATION です。例としては、「予約されたインスタンスを消費する」を参照してください。 <br>
    **可能な値**:<br>
      - `ANY_RESERVATION` - 利用できる割り当てを消費します。<br>
      - `NO_RESERVATION` - 割り当てられた容量から消費しません。<br>
      - `SPECIFIC_RESERVATION` - 特定の予約から消費する必要があります。予約を指定するためのキーバリューフィールドを指定しなければなりません。<br>
      - `UNSPECIFIED`
   - `key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `key`<br>
    **説明**: 予約リソースのラベルキーに相当します。名前で SPECIFIC_RESERVATION をターゲットにするには、キーに googleapis.com/reservation-name を、値に予約の名前を指定します。<br>
   - `values`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `values`<br>
    **説明**: 予約リソースのラベル値に対応します。これは、同じプロジェクト内の予約の名前か、同じゾーンだが異なるプロジェクト内の共有予約を対象とする "projects/different-project/reservations/some-reservation-name" のいずれかにすることができます。<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `resource_policies`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `resourcePolicies`<br>
**説明**: このインスタンスに適用されるリソースポリシー。<br>
## `resource_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `resourceStatus`<br>
**説明**: [出力のみ] インスタンス属性に設定された値を、対応する入力専用フィールドでユーザーがリクエストした値と比較して指定します。<br>
   - `physical_host`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `physicalHost`<br>
    **説明**: [出力のみ] VM が稼働しているホストの不透明な ID。<br>
## `satisfies_pzs`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `satisfiesPzs`<br>
**説明**: [出力のみ] 将来の使用に備えた予約。<br>
## `scheduling`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `scheduling`<br>
**説明**: このインスタンスのスケジューリングオプションを設定します。<br>
   - `automatic_restart`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `automaticRestart`<br>
    **説明**: Compute Engine によって終了された場合 (ユーザーによって終了されたのではない)、インスタンスを自動的に再起動させるかどうかを指定します。自動再起動のオプションは、標準インスタンスにのみ設定できます。プリエンプティブインスタンスは自動で再起動できません。デフォルトでは、これは true に設定されているので、インスタンスは Compute Engine によって終了された場合、自動的に再起動されます。<br>
   - `instance_termination_action`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `instanceTerminationAction`<br>
    **説明**: インスタンスの終了アクションを指定します。 <br>
    **可能な値**:<br>
      - `DELETE` - VM を削除します。<br>
      - `INSTANCE_TERMINATION_ACTION_UNSPECIFIED` - デフォルト値。この値は未使用です。<br>
      - `STOP` - インメモリコンテンツを保存せずに VM を停止します。デフォルトのアクションです。<br>
   - `location_hint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `locationHint`<br>
    **説明**: インスタンスを他のリソースの近くに配置するために使用される不透明な位置情報。このフィールドは、公開 API を使用する内部ツールで使用するためのものです。<br>
   - `min_node_cpus`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `minNodeCpus`<br>
    **説明**: このインスタンスがソールテナントノードで実行されるときに消費する仮想 CPU の最小数。<br>
   - `node_affinities`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `nodeAffinities`<br>
    **説明**: ノードアフィニティとアンチアフィニティの構成一式。詳細については、「ノードアフィニティの構成」を参照してください。reservationAffinity をオーバーライドします。<br>
       - `key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `key`<br>
        **説明**: Node リソースのラベルキーに対応します。<br>
       - `operator`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `operator`<br>
        **説明**: ノード選択の演算子を定義します。有効な演算子は、アフィニティを表す IN とアンチアフィニティを表す NOT_IN です。 <br>
        **可能な値**:<br>
          - `IN` - Compute Engine が一致するノードを探す必要があります。<br>
          - `NOT_IN` - Compute Engine が特定のノードを回避する必要があります。<br>
          - `OPERATOR_UNSPECIFIED`
       - `values`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `values`<br>
        **説明**: Node リソースのラベル値に対応します。<br>
   - `on_host_maintenance`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `onHostMaintenance`<br>
    **説明**: このインスタンスのメンテナンスの動作を定義します。標準的なインスタンスの場合、デフォルトの動作は MIGRATE です。プリエンプト可能なインスタンスの場合、デフォルトで唯一可能な動作は TERMINATE です。詳細については、「VM ホストのメンテナンスポリシーの設定」を参照してください。 <br>
    **可能な値**:<br>
      - `MIGRATE` - *[デフォルト]* Compute Engine がメンテナンスイベントの邪魔にならないようにインスタンスを自動的にマイグレートできるようにします。<br>
      - `TERMINATE` - メンテナンスアクティビティから離れた場所でインスタンスを終了させ、(オプションで) 再起動するように Compute Engine に指示します。もし、インスタンスを再起動させたい場合は、automaticRestart フラグを true に設定します。インスタンスは複数回再起動することができ、メンテナンスイベントの期間外に再起動することもできます。<br>
   - `preemptible`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `preemptible`<br>
    **説明**: インスタンスがプリエンプティブであるかどうかを定義します。これはインスタンスの作成時か、インスタンスが停止していて `TERMINATED` 状態のときのみ設定可能です。インスタンスの状態についての詳細は「インスタンスのライフサイクル 」を参照してください。<br>
   - `provisioning_model`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `provisioningModel`<br>
    **説明**: インスタンスのプロビジョニングモデルを指定します。<br>
    **可能な値**:<br>
      - `SPOT` - 大幅ディスカウント、動作保証なし。<br>
      - `STANDARD` - ユーザー制御のランタイムで標準プロビジョニング、ディスカウントなし。<br>
## `self_link`
**タイプ**: `STRING`<br>
**プロバイダー名**: `selfLink`<br>
**説明**: [出力のみ] このリソースのサーバー定義の URL。<br>
## `service_accounts`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `serviceAccounts`<br>
**説明**: このインスタンスに対して認可された、指定されたスコープを持つサービスアカウントのリスト。VM インスタンスにつき 1 つのサービスアカウントのみがサポートされます。サービスアカウントは、メタデータサーバからアクセス可能なアクセストークンを生成し、インスタンス上のアプリケーションを認証するために使用されます。詳細については、「サービスアカウント」を参照してください。<br>
   - `email`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `email`<br>
    **説明**: サービスアカウントのメールアドレス。<br>
   - `scopes`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `scopes`<br>
    **説明**: このサービスアカウントで利用できるようにするスコープのリスト。<br>
## `shielded_instance_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `shieldedInstanceConfig`<br>
   - `enable_integrity_monitoring`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableIntegrityMonitoring`<br>
    **説明**: インスタンスが整合性監視を有効にしているかどうかを定義します。デフォルトでは有効です。<br>
   - `enable_secure_boot`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableSecureBoot`<br>
    **説明**: インスタンスがセキュアブートを有効にしているかどうかを定義します。デフォルトでは無効です。<br>
   - `enable_vtpm`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableVtpm`<br>
    **説明**: インスタンスが vTPM を有効にしているかどうかを定義します。デフォルトでは有効です。<br>
## `shielded_instance_integrity_policy`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `shieldedInstanceIntegrityPolicy`<br>
   - `update_auto_learn_policy`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `updateAutoLearnPolicy`<br>
    **説明**: VM インスタンスの直近のブートからの測定値を使用して、整合性ポリシーのベースラインを更新します。<br>
## `source_machine_image`
**タイプ**: `STRING`<br>
**プロバイダー名**: `sourceMachineImage`<br>
**説明**: ソースマシンイメージ<br>
## `source_machine_image_encryption_key`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `sourceMachineImageEncryptionKey`<br>
**説明**: マシンイメージからインスタンスを作成する際の、ソースマシンイメージの暗号化キー。<br>
   - `kms_key_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kmsKeyName`<br>
    **説明**: Google Cloud KMS に保存される暗号化キーの名前。例: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/key_region/cryptoKeys/key<br>
   - `kms_key_service_account`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kmsKeyServiceAccount`<br>
    **説明**: 指定された KMS キーの暗号化リクエストに使用されるサービスアカウント。指定しない場合は、Compute Engine のデフォルトのサービスアカウントが使用されます。例: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/<br>
   - `raw_key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `rawKey`<br>
    **説明**: このリソースを暗号化または復号化するために、RFC 4648 base64 でエンコードされた、顧客が提供する 256 ビットの暗号化キーを指定します。rawKey と rsaEncryptedKey のどちらかを指定することができます。例: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" <br>
   - `rsa_encrypted_key`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `rsaEncryptedKey`<br>
    **説明**: このリソースを暗号化または復号化するための、RFC 4648 base64 エンコードされた、RSA ラッピングされた 2048 ビットの暗号化キーを指定します。rawKey または rsaEncryptedKey のどちらかを指定することができます。例: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" キーは、Compute Engine に提供する前に、以下の要件を満たしている必要があります。 1. キーは、Google が提供する RSA 公開キー証明書を使用してラップされている。2. ラップ後のキーは、RFC4648 の base64 エンコーディングでエンコードされている必要がある。Google が提供する RSA 公開キー証明書を入手するには、https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem にアクセスしてください。<br>
   - `sha256`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sha256`<br>
    **説明**: [出力のみ] このリソースを保護するために顧客が提供する暗号化キーの RFC 4648 base64 エンコードされた SHA-256 ハッシュ。<br>
## `start_restricted`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `startRestricted`<br>
**説明**: [出力のみ] Compute Engine が不審なアクティビティを検出したため、VM の起動が制限されたかどうか。<br>
## `status_message`
**タイプ**: `STRING`<br>
**プロバイダー名**: `statusMessage`<br>
**説明**: [出力のみ] オプションで、人間が読み取れるステータスの説明。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `zone`
**タイプ**: `STRING`<br>
**プロバイダー名**: `zone`<br>
**説明**: [出力のみ] インスタンスが存在するゾーンの URL。このフィールドは、HTTP リクエストの URL の一部として指定する必要があります。リクエスト本文のフィールドとして設定することはできません。<br>