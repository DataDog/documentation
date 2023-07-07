---
dependencies: []
disable_edit: true
---
# azure_aks_cluster

## `api_server_access_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.apiServerAccessProfile`<br>
**説明**: マネージドクラスター API サーバーのアクセスプロファイル。<br>
   - `authorized_ip_ranges`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `authorizedIPRanges`<br>
    **説明**: kubernetes API サーバーへの認可 IP 範囲。<br>
   - `enable_private_cluster`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enablePrivateCluster`<br>
    **説明**: クラスターをプライベートクラスターとして作成するかどうか。<br>
   - `private_dns_zone`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `privateDNSZone`<br>
    **説明**: プライベートクラスター用のプライベート DNS ゾーンモード。<br>
## `azure_portal_fqdn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.azurePortalFQDN`<br>
**説明**: プロキシ構成に使用するマスタープールの FQDN。<br>
## `disable_local_accounts`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.disableLocalAccounts`<br>
**説明**: true に設定すると、このクラスターでは、静的資格情報の取得が無効になります。AAD クラスターにのみ使用されることが想定されます。<br>
## `disk_encryption_set_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.diskEncryptionSetID`<br>
**説明**: 静止時の暗号化を有効にするために使用するディスク暗号化セットの ResourceId。<br>
## `dns_prefix`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.dnsPrefix`<br>
**説明**: マネージドクラスターの作成時に指定した DNS プレフィックス。<br>
## `enable_pod_security_policy`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enablePodSecurityPolicy`<br>
**説明**: (廃止) Kubernetes ポッドセキュリティポリシーを有効にするかどうか (プレビュー)。この機能は 2020 年 10 月 15 日に削除されることが決定しています。詳細は aka.ms/aks/azpodpolicy でご確認ください。<br>
## `enable_rbac`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `properties.enableRBAC`<br>
**説明**: Kubernetes Role-Based Access Control を有効にするかどうか。<br>
## `fqdn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.fqdn`<br>
**説明**: マスタープールの FQDN。<br>
## `fqdn_subdomain`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.fqdnSubdomain`<br>
**説明**: カスタムプライベート DNS ゾーンでプライベートクラスターを作成する際に指定した FQDN サブドメイン。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソース ID<br>
## `kubernetes_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.kubernetesVersion`<br>
**説明**: マネージドクラスターの作成時に指定した Kubernetes のバージョン。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースロケーション<br>
## `max_agent_pools`
**タイプ**: `INT64`<br>
**プロバイダー名**: `properties.maxAgentPools`<br>
**説明**: マネージドクラスターの Agent プールの最大数。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソース名<br>
## `network_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.networkProfile`<br>
**説明**: ネットワーク構成のプロファイル。<br>
   - `dns_service_ip`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `dnsServiceIP`<br>
    **説明**: Kubernetes DNS サービスに割り当てられた IP アドレス。serviceCidr で指定された Kubernetes サービスのアドレス範囲内である必要があります。<br>
   - `docker_bridge_cidr`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `dockerBridgeCidr`<br>
    **説明**: Docker ブリッジネットワークに割り当てられた CIDR 表記の IP 範囲。Subnet IP 範囲や Kubernetes サービスアドレス範囲と重なってはいけません。<br>
   - `load_balancer_sku`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `loadBalancerSku`<br>
    **説明**: マネージドクラスターのロードバランサー sku。<br>
   - `network_mode`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `networkMode`<br>
    **説明**: Kubernetes のネットワークを構築する際に使用するネットワークモード。<br>
   - `network_plugin`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `networkPlugin`<br>
    **説明**: Kubernetes のネットワークを構築する際に使用するネットワークプラグイン。<br>
   - `network_policy`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `networkPolicy`<br>
    **説明**: Kubernetes のネットワークを構築する際に使用するネットワークポリシー。<br>
   - `outbound_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `outboundType`<br>
    **説明**: アウトバウンド (egress) のルーティング方法。<br>
   - `pod_cidr`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `podCidr`<br>
    **説明**: kubenet 使用時にポッド IP を割り当てるための CIDR 表記の IP 範囲。<br>
   - `service_cidr`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `serviceCidr`<br>
    **説明**: サービスクラスター IP を割り当てるための CIDR 表記の IP 範囲。サブネットの IP 範囲と重なってはいけません。<br>
## `node_resource_group`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.nodeResourceGroup`<br>
**説明**: Agent プールノードを含むリソースグループの名前。<br>
## `power_state`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.powerState`<br>
**説明**: クラスターの Power State を表します<br>
   - `code`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `code`<br>
    **説明**: クラスターが Running か Stopped かを伝えます<br>
## `private_fqdn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.privateFQDN`<br>
**説明**: プライベートクラスターの FQDN。<br>
## `provisioning_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.provisioningState`<br>
**説明**: レスポンスにのみ表示される、現在のデプロイメントまたはプロビジョニングの状態。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `service_principal_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.servicePrincipalProfile`<br>
**説明**: Azure API の操作に使用するクラスターのサービスプリンシパルアイデンティティに関する情報。<br>
   - `client_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `clientId`<br>
    **説明**: サービスプリンシパルの ID。<br>
## `sku`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `sku`<br>
**説明**: マネージドクラスター SKU。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: マネージドクラスター SKU の名前。<br>
   - `tier`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tier`<br>
    **説明**: マネージドクラスター SKU のティア。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースタイプ<br>
## `windows_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.windowsProfile`<br>
**説明**: コンテナサービスクラスター内の Windows VM のプロファイル。<br>
   - `admin_username`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `adminUsername`<br>
    **説明**: 管理者アカウントの名前を指定します。 <br><br> **制限:** "." で終わることはできません <br><br> **禁止される値:** "administrator"、"admin"、"user"、"user1"、"test"、"user2"、"test1"、"user3"、"admin1"、"1"、"123"、"a"、"actuser"、"adm"、"admin2"、"aspnet"、"backup"、"console"、"david"、"guest"、"john"、"owner"、"root"、"server"、"sql"、"support"、"support_388945a0"、"sys"、"test2"、"test3"、"user4"、"user5" <br><br> **最小長:** 1 文字 <br><br> **最大長:** 20 文字<br>
   - `enable_csi_proxy`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableCSIProxy`<br>
    **説明**: CSI プロキシを有効にするかどうか。<br>
   - `license_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `licenseType`<br>
    **説明**: Windows VM に使用する licenseType。Windows_Server は、Windows VM の Azure Hybrid User Benefits を有効にするために使用します。<br>