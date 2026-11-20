---
dependencies: []
disable_edit: true
---
# aws_eks_cluster

## `account_id`
**タイプ**: `STRING`<br>
## `arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `arn`<br>
**説明**: クラスターの Amazon Resource Name (ARN)。<br>
## `certificate_authority`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `certificateAuthority`<br>
**説明**: クラスターの <code>certificate-authority-data</code>。<br>
   - `data`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `data`<br>
    **説明**: クラスターとの通信に必要な Base64 エンコードされた証明書データ。これをクラスター用の <code>kubeconfig</code> ファイルの <code>certificate-authority-data</code> セクションに追加します。<br>
## `client_request_token`
**タイプ**: `STRING`<br>
**プロバイダー名**: `clientRequestToken`<br>
**説明**: リクエストの idempotency を確保するために提供する一意の大文字・小文字を区別する識別子。<br>
## `connector_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `connectorConfig`<br>
**説明**: 登録のためにクラスターに接続する際に使用する構成。<br>
   - `activation_code`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `activationCode`<br>
    **説明**: 登録のためにクラスターに関連付けられた一意のコード。<br>
   - `activation_expiry`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `activationExpiry`<br>
    **説明**: 接続されているクラスターの有効期限。クラスターの YAML ファイルは、ネイティブプロバイダーを通じて適用する必要があります。<br>
   - `activation_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `activationId`<br>
    **説明**: 登録のためにクラスターに関連付けられた一意の ID。<br>
   - `provider`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `provider`<br>
    **説明**: クラスターのクラウドサービスプロバイダー。<br>
   - `role_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `roleArn`<br>
    **説明**: 接続されている Kubernetes クラスターからのサービスと通信するためのロールの Amazon Resource Name (ARN)。<br>
## `created_at`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `createdAt`<br>
**説明**: クラスターが作成されたときの Unix エポックタイムスタンプ (秒単位)。<br>
## `encryption_config`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `encryptionConfig`<br>
**説明**: クラスターの暗号化構成。<br>
   - `provider`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `provider`<br>
    **説明**: Key Management Service (KMS) のキー。ARN またはエイリアスのいずれかを使用することができます。<br>
       - `key_arn`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `keyArn`<br>
        **説明**: KMS キーの Amazon Resource Name (ARN) またはエイリアス。KMS キーは対称であること、クラスターと同じリージョンで作成されていること、そして KMS キーが別のアカウントで作成された場合、そのユーザーが KMS キーへのアクセス権を持っていることが必要です。詳細については、<i>Key Management Service デベロッパーガイド</i>の<a href="https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html">他のアカウントのユーザーに KMS キーを使用させる</a>を参照してください。<br>
   - `resources`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `resources`<br>
    **説明**: 暗号化するリソースを指定します。サポートされる値は "secrets" のみです。<br>
## `endpoint`
**タイプ**: `STRING`<br>
**プロバイダー名**: `endpoint`<br>
**説明**: Kubernetes API サーバーのエンドポイント。<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
**説明**: クラスターの ID プロバイダー情報。<br>
   - `oidc`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `oidc`<br>
    **説明**: <a href="https://openid.net/connect/">OpenID Connect</a> の ID プロバイダー情報を表すオブジェクト。<br>
       - `issuer`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `issuer`<br>
        **説明**: OIDC ID プロバイダーの発行者 URL。<br>
## `kubernetes_network_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `kubernetesNetworkConfig`<br>
**説明**: クラスターの Kubernetes ネットワーク構成。<br>
   - `ip_family`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ipFamily`<br>
    **説明**: Kubernetes ポッドとサービスの IP アドレスの割り当てに使用される IP ファミリー。Amazon VPC CNI アドオンのバージョン 1.10.0 以降を実行している <code>1.21</code> 以降のクラスターで、クラスターの作成時に <code>ipv6</code> を指定しない限り、IP ファミリーは常に <code>ipv4</code> です。<br>
   - `service_ipv4_cidr`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `serviceIpv4Cidr`<br>
    **説明**: Kubernetes のポッドとサービスの IP アドレスが割り振られる CIDR ブロック。Kubernetes は、ノードが属するサブネットに割り当てられた IPv4 CIDR ブロックからアドレスを割り当てます。クラスター作成時に CIDR ブロックを指定しなかった場合、Kubernetes は 10.100.0.0/16 または 172.20.0.0/16 CIDR ブロックのどちらかからアドレスを割り当てます。これが指定されている場合は、クラスター作成時に指定されているので、変更することはできません。<br>
   - `service_ipv6_cidr`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `serviceIpv6Cidr`<br>
    **説明**: Amazon VPC CNI アドオンのバージョン 1.10.0 以降で 1.21 以降のクラスターを作成し、クラスター作成時に <b>ipFamily</b> に <code>ipv6</code> を指定した場合に Kubernetes のポッドとサービスの IP アドレスが割り当てられる CIDR ブロック。Kubernetes は、独自のローカルアドレス範囲 (fc00::/7) からアドレスを割り当てます。<br>
## `logging`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `logging`<br>
**説明**: クラスターのロギング構成。<br>
   - `cluster_logging`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `clusterLogging`<br>
    **説明**: クラスターのコントロールプレーンロギング構成。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: ログタイプが有効な場合、そのログタイプは CloudWatch Logs にそのコントロールプレーンログをエクスポートします。ログタイプが有効でない場合、そのログタイプはそのコントロールプレーンログをエクスポートしません。個々のログタイプは、独立して有効または無効にすることができます。<br>
       - `types`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `types`<br>
        **説明**: 利用可能なクラスターコントロールプレーンのログタイプ。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: クラスターの名前。<br>
## `platform_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `platformVersion`<br>
**説明**: Amazon EKS クラスターのプラットフォームバージョン。詳細については、<i><i>Amazon EKS ユーザーガイド</i></i>の<a href="https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html">プラットフォームバージョン</a>を参照してください。<br>
## `resources_vpc_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `resourcesVpcConfig`<br>
**説明**: クラスターコントロールプレーンで使用される VPC 構成。Amazon EKS の VPC リソースは、Kubernetes で適切に動作するための特定の要件があります。詳細については、<i>Amazon EKS ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html">クラスター VPC に関する考慮事項</a>および<a href="https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html">クラスターセキュリティグループに関する考慮事項</a>を参照してください。<br>
   - `cluster_security_group_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `clusterSecurityGroupId`<br>
    **説明**: Amazon EKS によってクラスター用に作成されたクラスターセキュリティグループ。マネージドノードグループは、コントロールプレーンからデータプレーンへの通信にこのセキュリティグループを使用します。<br>
   - `endpoint_private_access`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `endpointPrivateAccess`<br>
    **説明**: このパラメーターは、Amazon EKS プライベート API サーバーエンドポイントが有効であるかどうかを示します。Amazon EKS プライベート API サーバーエンドポイントが有効な場合、クラスターの VPC 内から発信された Kubernetes API リクエストは、インターネットをトラバースするのではなく、プライベート VPC エンドポイントを使用します。この値が無効で、クラスターにノードまたは Fargate ポッドがある場合は、<code>publicAccessCidrs</code> にノードまたは Fargate ポッドとの通信に必要な CIDR ブロックが含まれていることを確認します。詳細については、<i><i>Amazon EKS ユーザーガイド</i></i>の <a href="https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html">Amazon EKS クラスターエンドポイントアクセス制御</a>を参照してください。<br>
   - `endpoint_public_access`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `endpointPublicAccess`<br>
    **説明**: このパラメーターは、Amazon EKS パブリック API サーバーエンドポイントが有効であるかどうかを示します。Amazon EKS パブリック API サーバーエンドポイントが無効な場合、クラスターの Kubernetes API サーバーは、クラスター VPC 内から発信されたリクエストのみを受信することができます。<br>
   - `public_access_cidrs`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `publicAccessCidrs`<br>
    **説明**: クラスターのパブリック Kubernetes API サーバーエンドポイントへのアクセスが許可されている CIDR ブロック。リストされた CIDR ブロックの外側のアドレスからエンドポイントへの通信は拒否されます。デフォルト値は <code>0.0.0.0/0</code> です。プライベートエンドポイントアクセスを無効にし、クラスターにノードまたは Fargate ポッドがある場合、必要な CIDR ブロックがリストされていることを確認します。詳細については、<i><i>Amazon EKS ユーザーガイド</i></i>の <a href="https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html">Amazon EKSクラスターエンドポイントアクセス制御</a>を参照してください。<br>
   - `security_group_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `securityGroupIds`<br>
    **説明**: ノードと Kubernetes コントロールプレーン間の通信を許可するために使用される、クロスアカウントのエラスティックネットワークインターフェイスに関連するセキュリティグループ。<br>
   - `subnet_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `subnetIds`<br>
    **説明**: クラスターに関連付けられたサブネット。<br>
   - `vpc_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `vpcId`<br>
    **説明**: クラスターに関連付けられた VPC。<br>
## `role_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `roleArn`<br>
**説明**: Kubernetes コントロールプレーンが Amazon Web Services の API 操作を代わりに呼び出すための権限を提供する IAM ロールの Amazon Resource Name (ARN)。<br>
## `status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `status`<br>
**説明**: クラスターの現在のステータス。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `version`<br>
**説明**: クラスターの Kubernetes サーバーのバージョン。<br>