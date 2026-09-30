---
dependencies: []
disable_edit: true
---
# azure_app_service

## `availability_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.availabilityState`<br>
**説明**: アプリの管理情報の利用可能状態。<br>
## `client_affinity_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.clientAffinityEnabled`<br>
**説明**: <code>false</code> を指定すると、セッションアフィニティクッキーの送信を停止し、 同じセッションのクライアントリクエストを同じインスタンスにルーティングします。デフォルトは <code>true</code> です。<br>
## `client_cert_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.clientCertEnabled`<br>
**説明**: クライアント証明書認証 (TLS 相互認証) を有効にする場合は <code>true</code>、そうでない場合は <code>false</code> を指定します。デフォルトは <code>false</code> です。<br>
## `client_cert_exclusion_paths`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.clientCertExclusionPaths`<br>
**説明**: クライアント証明書認証のカンマ区切りの除外パス<br>
## `client_cert_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.clientCertMode`<br>
**説明**: ClientCertEnabled の設定と組み合わせて使用します。ClientCertEnabled: false は、ClientCert を無視することを意味します。ClientCertEnabled: true および ClientCertMode: Required は、ClientCert が必要であることを意味します。ClientCertEnabled: true および ClientCertMode: Optional は、ClientCert がオプションまたは受け入れ可能であることを意味します。<br>
## `container_size`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.containerSize`<br>
**説明**: 関数コンテナのサイズ。<br>
## `custom_domain_verification_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.customDomainVerificationId`<br>
**説明**: アプリに割り当てられたカスタムドメインを検証するための一意の識別子。顧客はこの ID を検証のために txt レコードに追加します。<br>
## `daily_memory_time_quota`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.dailyMemoryTimeQuota`<br>
**説明**: 1 日のメモリ時間割り当ての最大許容量 (ダイナミックアプリにのみ適用)。<br>
## `default_host_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.defaultHostName`<br>
**説明**: アプリのデフォルトのホスト名。読み取り専用です。<br>
## `enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enabled`<br>
**説明**: アプリが有効な場合は <code>true</code>、そうでない場合は <code>false</code> です。この値を false に設定すると、アプリが無効になります (アプリがオフラインになります)。<br>
## `enabled_host_names`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `properties.enabledHostNames`<br>
**説明**: アプリのホスト名を有効にします。ホスト名は割り当てられ (HostNames を参照)、かつ有効になっている必要があります。そうでない場合は、アプリはこれらのホスト名で提供されません。<br>
## `extended_location`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `extendedLocation`<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: 拡張ロケーションの名前。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: 拡張ロケーションのタイプ。<br>
## `host_names`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `properties.hostNames`<br>
**説明**: アプリに関連付けられたホスト名。<br>
## `host_names_disabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.hostNamesDisabled`<br>
**説明**: アプリの公開ホスト名を無効にする場合は <code>true</code>、それ以外の場合は <code>false</code> を指定します。<code>true</code> の場合、アプリは API 管理プロセスからのみアクセス可能となります。<br>
## `https_only`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.httpsOnly`<br>
**説明**: HttpsOnly: Web サイトが https リクエストのみを受け付けるように構成します。HTTP リクエストのリダイレクトを発行します<br>
## `hyper_v`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.hyperV`<br>
**説明**: Hyper-V のサンドボックス。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソース ID。<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
   - `principal_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalId`<br>
    **説明**: マネージドサービスアイデンティティのプリンシパル ID。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: マネージドサービスアイデンティティのテナント。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: マネージドサービスアイデンティティの種類。<br>
## `in_progress_operation_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.inProgressOperationId`<br>
**説明**: このサイトに保留中の操作がある場合、操作 ID を指定します。<br>
## `is_default_container`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.isDefaultContainer`<br>
**説明**: アプリがデフォルトコンテナである場合は <code>true</code>、そうでない場合は <code>false</code> を指定します。<br>
## `is_xenon`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.isXenon`<br>
**説明**: 廃止: Hyper-V のサンドボックス。<br>
## `key_vault_reference_identity`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.keyVaultReferenceIdentity`<br>
**説明**: Key Vault Reference の認証に使用するアイデンティティ。<br>
## `kind`
**タイプ**: `STRING`<br>
**プロバイダー名**: `kind`<br>
**説明**: リソースの種類。<br>
## `last_modified_time_utc`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.lastModifiedTimeUtc`<br>
**説明**: アプリが最後に変更された時刻 (UTC 単位)。読み取り専用です。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースロケーション。<br>
## `max_number_of_workers`
**タイプ**: `INT32`<br>
**プロバイダー名**: `properties.maxNumberOfWorkers`<br>
**説明**: 最大ワーカー数。Functions コンテナにのみ適用されます。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソース名。<br>
## `outbound_ip_addresses`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.outboundIpAddresses`<br>
**説明**: アプリが送信接続 (データベースへのアクセスなど) に使用する IP アドレスのリスト。現在の設定でサイトをホストできるテナントからの VIP が含まれます。読み取り専用です。<br>
## `possible_outbound_ip_addresses`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.possibleOutboundIpAddresses`<br>
**説明**: アプリが送信接続 (データベースへのアクセスなど) に使用する IP アドレスのリスト。dataComponent 以外のすべてのテナントからの VIP を含みます。読み取り専用です。<br>
## `redundancy_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.redundancyMode`<br>
**説明**: サイト冗長化モード<br>
## `repository_site_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.repositorySiteName`<br>
**説明**: リポジトリサイトの名前。<br>
## `reserved`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.reserved`<br>
**説明**: 予約されている場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `scm_site_also_stopped`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.scmSiteAlsoStopped`<br>
**説明**: アプリ停止時に SCM (KUDU) サイトを停止する場合は <code>true</code>、それ以外の場合は <code>false</code>。デフォルトは <code>false</code> です。<br>
## `server_farm_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.serverFarmId`<br>
**説明**: 関連付けられたアプリサービスプランのリソース ID。形式: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}"<br>
## `site_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.siteConfig`<br>
**説明**: アプリの構成。<br>
   - `acr_use_managed_identity_creds`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `acrUseManagedIdentityCreds`<br>
    **説明**: ACR プルに Managed Identity Creds を使用するフラグ<br>
   - `acr_user_managed_identity_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `acrUserManagedIdentityID`<br>
    **説明**: ユーザー管理アイデンティティを使用する場合、ユーザー管理アイデンティティの ClientId<br>
   - `always_on`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `alwaysOn`<br>
    **説明**: Always On が有効な場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
   - `app_command_line`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `appCommandLine`<br>
    **説明**: 起動するアプリのコマンドライン。<br>
   - `auto_heal_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `autoHealEnabled`<br>
    **説明**: Auto Heal が有効な場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
   - `ftps_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ftpsState`<br>
    **説明**: FTP / FTPS サービスの状態<br>
   - `function_app_scale_limit`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `functionAppScaleLimit`<br>
    **説明**: サイトがスケールアウトできる最大ワーカー数。この設定は、 Consumption プランと Elastic Premium プランにのみ適用されます<br>
   - `functions_runtime_scale_monitoring_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `functionsRuntimeScaleMonitoringEnabled`<br>
    **説明**: 関数ランタイムスケールモニタリングを有効にするかどうかを示す値を取得または設定します。有効にすると、ScaleController はイベントソースを直接監視しなくなり、代わりにランタイムを呼び出してスケールのステータスを取得します。<br>
   - `http20_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `http20Enabled`<br>
    **説明**: Http20Enabled: クライアントが http2.0 で接続できるように Web サイトを構成します<br>
   - `http_logging_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `httpLoggingEnabled`<br>
    **説明**: HTTP ロギングが有効な場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
   - `java_container`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `javaContainer`<br>
    **説明**: Java コンテナ。<br>
   - `java_container_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `javaContainerVersion`<br>
    **説明**: Java コンテナのバージョン。<br>
   - `java_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `javaVersion`<br>
    **説明**: Java のバージョン。<br>
   - `limits`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `limits`<br>
    **説明**: サイトの制限。<br>
       - `max_disk_size_in_mb`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `maxDiskSizeInMb`<br>
        **説明**: ディスクサイズの最大許容使用量 (MB 単位)。<br>
       - `max_memory_in_mb`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `maxMemoryInMb`<br>
        **説明**: メモリの最大許容使用量 (MB 単位)。<br>
       - `max_percentage_cpu`<br>
        **タイプ**: `DOUBLE`<br>
        **プロバイダー名**: `maxPercentageCpu`<br>
        **説明**: CPU の最大許容使用率。<br>
   - `linux_fx_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `linuxFxVersion`<br>
    **説明**: Linux アプリのフレームワークとバージョン<br>
   - `load_balancing`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `loadBalancing`<br>
    **説明**: サイトのロードバランシング。<br>
   - `local_my_sql_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `localMySqlEnabled`<br>
    **説明**: ローカル MySQL を有効にする場合は <code>true</code>、それ以外の場合は <code>false</code>。<br>
   - `logs_directory_size_limit`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `logsDirectorySizeLimit`<br>
    **説明**: HTTP ログのディレクトリサイズ制限。<br>
   - `machine_key`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `machineKey`<br>
    **説明**: サイト MachineKey。<br>
       - `decryption`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `decryption`<br>
        **説明**: 復号に使用するアルゴリズム。<br>
       - `decryption_key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `decryptionKey`<br>
        **説明**: 復号化キー。<br>
       - `validation`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `validation`<br>
        **説明**: MachineKey の検証。<br>
       - `validation_key`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `validationKey`<br>
        **説明**: 検証キー。<br>
   - `managed_pipeline_mode`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `managedPipelineMode`<br>
    **説明**: マネージドパイプラインモード。<br>
   - `managed_service_identity_id`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `managedServiceIdentityId`<br>
    **説明**: マネージドサービスアイデンティティ ID<br>
   - `min_tls_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `minTlsVersion`<br>
    **説明**: MinTlsVersion: SSL リクエストに必要な TLS の最小バージョンを構成します<br>
   - `minimum_elastic_instance_count`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `minimumElasticInstanceCount`<br>
    **説明**: サイトの最小インスタンス数。この設定は、Elastic Plans にのみ適用されます<br>
   - `net_framework_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `netFrameworkVersion`<br>
    **説明**: .NET Framework のバージョン。<br>
   - `node_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `nodeVersion`<br>
    **説明**: Node.js のバージョン。<br>
   - `number_of_workers`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `numberOfWorkers`<br>
    **説明**: ワーカーの数。<br>
   - `php_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `phpVersion`<br>
    **説明**: PHP のバージョン。<br>
   - `power_shell_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `powerShellVersion`<br>
    **説明**: PowerShell のバージョン。<br>
   - `pre_warmed_instance_count`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `preWarmedInstanceCount`<br>
    **説明**: preWarmed インスタンスの数。この設定は、Consumption プランと Elastic プランにのみ適用されます。<br>
   - `public_network_access`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `publicNetworkAccess`<br>
    **説明**: すべての公共トラフィックを許可またはブロックするプロパティ。<br>
   - `publishing_username`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `publishingUsername`<br>
    **説明**: パブリッシングユーザー名。<br>
   - `python_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `pythonVersion`<br>
    **説明**: Python のバージョン。<br>
   - `remote_debugging_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `remoteDebuggingEnabled`<br>
    **説明**: リモートデバッグが有効な場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
   - `remote_debugging_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `remoteDebuggingVersion`<br>
    **説明**: リモートデバッグのバージョン。<br>
   - `request_tracing_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `requestTracingEnabled`<br>
    **説明**: リクエストトレースが有効な場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
   - `scm_ip_security_restrictions_use_main`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `scmIpSecurityRestrictionsUseMain`<br>
    **説明**: scm が main を使用するための IP セキュリティの制限。<br>
   - `scm_min_tls_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `scmMinTlsVersion`<br>
    **説明**: ScmMinTlsVersion: SCM サイトへの SSL リクエストに必要な TLS の最小バージョンを構成します<br>
   - `scm_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `scmType`<br>
    **説明**: SCM タイプ。<br>
   - `tracing_options`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tracingOptions`<br>
    **説明**: トレースオプション。<br>
   - `use32_bit_worker_process`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `use32BitWorkerProcess`<br>
    **説明**: 32 ビットワーカープロセスを使用する場合は <code>true</code>、それ以外の場合は <code>false</code>。<br>
   - `vnet_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `vnetName`<br>
    **説明**: 仮想ネットワーク名。<br>
   - `vnet_private_ports_count`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `vnetPrivatePortsCount`<br>
    **説明**: このアプリに割り当てられているプライベートポートの数。これらはランタイム時に動的に割り当てられます。<br>
   - `vnet_route_all_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `vnetRouteAllEnabled`<br>
    **説明**: Virtual Network Route All を有効にします。これにより、すべてのアウトバウンドトラフィックに Virtual Network Security Groups と User Defined Routs が適用されるようになります。<br>
   - `web_sockets_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `webSocketsEnabled`<br>
    **説明**: WebSocket が有効な場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
   - `website_time_zone`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `websiteTimeZone`<br>
    **説明**: サイトがタイムスタンプを生成する際に使用するタイムゾーンを設定します。Linux と Windows のアプリサービスと互換性があります。WEBSITE_TIME_ZONE アプリの設定は、この設定より優先されます。Linux の場合、tz データベースの値として https://www.iana.org/time-zones (クイックリファレンスは https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) を期待します。Windows の場合、HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones にあるタイムゾーンのいずれかを期待します<br>
   - `windows_fx_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `windowsFxVersion`<br>
    **説明**: Xenon アプリのフレームワークとバージョン<br>
   - `x_managed_service_identity_id`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `xManagedServiceIdentityId`<br>
    **説明**: 明示的なマネージドサービスアイデンティティ ID<br>
## `state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.state`<br>
**説明**: 現在のアプリの状態。<br>
## `storage_account_required`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.storageAccountRequired`<br>
**説明**: 顧客から提供されたストレージアカウントが必要かどうか確認します<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `suspended_till`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.suspendedTill`<br>
**説明**: メモリ時間制限を超えた場合、アプリが一時停止します。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `target_swap_slot`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.targetSwapSlot`<br>
**説明**: このアプリがどのデプロイメントスロットにスワップされるかを指定します。読み取り専用です。<br>
## `traffic_manager_host_names`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `properties.trafficManagerHostNames`<br>
**説明**: アプリに関連付けられた Azure Traffic Manager のホスト名。読み取り専用です。<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースタイプ。<br>
## `usage_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.usageState`<br>
**説明**: アプリが割り当て使用量を超過しているかどうかを示す状態。読み取り専用です。<br>
## `virtual_network_subnet_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.virtualNetworkSubnetId`<br>
**説明**: Regional VNET Integration で参加する仮想ネットワークおよびサブネットの Azure Resource Manager ID。これは、次のような形式でなければなりません: /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}<br>
## `web_auth_settings`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `SiteAuthSettings`<br>
   - `aad_claims_authorization`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.aadClaimsAuthorization`<br>
    **説明**: Azure AD Acl 設定を含む JSON 文字列を取得します。<br>
   - `auth_file_path`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.authFilePath`<br>
    **説明**: 認証設定を含むコンフィギュレーションファイルのパス。相対パスの場合は、サイトのルートディレクトリがベースとなります。<br>
   - `client_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.clientId`<br>
    **説明**: client_id と呼ばれる、この依拠当事者アプリケーションのクライアント ID。この設定は、Azure Active Directory または他のサードパーティ OpenID Connect プロバイダーで OpenID Connection 認証を有効にするために必要です。OpenID Connect の詳細については、こちらをご覧ください: http://openid.net/specs/openid-connect-core-1_0.html<br>
   - `client_secret`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.clientSecret`<br>
    **説明**: この依拠当事者アプリケーションのクライアントシークレット (Azure Active Directory では、これはキーとも呼ばれます)。この設定はオプションです。クライアントシークレットが構成されていない場合、エンドユーザーの認証には OpenID Connect の暗黙認証フローが使用されます。それ以外の場合は、エンドユーザーの認証に OpenID Connect 認可コードフローが使用されます。OpenID Connect の詳細については、こちらをご覧ください: http://openid.net/specs/openid-connect-core-1_0.html<br>
   - `client_secret_certificate_thumbprint`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.clientSecretCertificateThumbprint`<br>
    **説明**: クライアントシークレットに代わるもので、署名のために使用される証明書のサムプリント。このプロパティは、クライアントシークレットの代わりとして動作します。また、オプションです。<br>
   - `client_secret_setting_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.clientSecretSettingName`<br>
    **説明**: 依拠当事者アプリケーションのクライアントシークレットを含むアプリ設定名。<br>
   - `config_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.configVersion`<br>
    **説明**: 現在のアプリで使用されている認証/認可機能の ConfigVersion。この値の設定は、認証/認可のためのコントロールプレーンの動作を制御することができます。<br>
   - `default_provider`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.defaultProvider`<br>
    **説明**: 複数のプロバイダーが構成されている場合に使用するデフォルトの認証プロバイダー。この設定は、複数のプロバイダーを構成し、かつ未認証のクライアントに対するアクションを "RedirectToLoginPage" に設定した場合のみ必要です。<br>
   - `enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.enabled`<br>
    **説明**: 現在のアプリで認証/認可機能が有効な場合は <code>true</code>、そうでない場合は <code>false</code>。<br>
   - `facebook_app_secret`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.facebookAppSecret`<br>
    **説明**: Facebook ログインに使用する Facebook アプリのアプリシークレット。この設定は、Facebook ログインを有効にするために必要です。Facebook ログインのドキュメントを参照してください: https://developers.facebook.com/docs/facebook-login<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID。<br>
   - `is_auth_from_file`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.isAuthFromFile`<br>
    **説明**: 認証構成設定をファイルから読み込む場合は "true"、そうでない場合は "false"。<br>
   - `issuer`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.issuer`<br>
    **説明**: このアプリケーションのアクセストークンを発行するエンティティを表す、OpenID Connect Issuer URI。Azure Active Directory を使用する場合、この値はディレクトリテナントの URI になります (例: https://sts.windows.net/{tenant-guid}/) 。この URI は、トークン発行者の大文字と小文字を区別する識別子です。OpenID Connect Discovery の詳細はこちら: http://openid.net/specs/openid-connect-discovery-1_0.html<br>
   - `kind`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kind`<br>
    **説明**: リソースの種類。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名。<br>
   - `runtime_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.runtimeVersion`<br>
    **説明**: 現在のアプリで使用されている認証/認可機能の RuntimeVersion。この値の設定は、認証/認可モジュールの特定の機能の動作を制御することができます。<br>
   - `token_refresh_extension_hours`<br>
    **タイプ**: `DOUBLE`<br>
    **プロバイダー名**: `properties.tokenRefreshExtensionHours`<br>
    **説明**: セッショントークンの有効期限が切れてから、トークンリフレッシュ API を呼び出すために使用できる時間数。デフォルトは 72 時間です。<br>
   - `token_store_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.tokenStoreEnabled`<br>
    **説明**: ログインフローで取得したプラットフォーム固有のセキュリティトークンを永続的に保存する場合は <code>true</code>、それ以外の場合は <code>false</code>。デフォルトは <code>false</code> です。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: リソースタイプ。<br>
   - `unauthenticated_client_action`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.unauthenticatedClientAction`<br>
    **説明**: 未認証のクライアントがアプリにアクセスしようとしたときに取るべきアクション。<br>
   - `validate_issuer`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.validateIssuer`<br>
    **説明**: 発行者が有効な HTTPS URL であり、そのように検証されるべきかどうかを示す値を取得します。<br>