---
aliases:
- /ja/cloudprem/configure/azure_config/
- /ja/cloudprem/install/azure_aks/
description: Azure AKS で BYOC Logs をインストールおよび構成する方法を学習します
title: Azure AKS に BYOC Logs をインストールする
---
## 概要{#overview}

このドキュメントでは、Azure 環境を構成し、Azure AKS に BYOC (Bring Your Own Cloud) Logs をインストールするプロセスについて説明します。

## 前提条件{#prerequisites}

Azure に BYOC Logs をインストールする前に、サポート用インフラストラクチャーリソースをセットアップする必要があります。これらのコンポーネントは、BYOC Logs が依存する基盤となるコンピューティング、ストレージ、データベース、およびネットワークサービスを提供します。

### インフラストラクチャー要件{#infrastructure-requirements}
プロビジョニングする必要があるコンポーネントは次のとおりです。

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): 予想される BYOC Logs ワークロードに合わせてサイズ設定された、実行中の AKS クラスター。
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): BYOC Logs がメタデータの保存に使用する Azure Database for PostgreSQL インスタンス。
- [**Blob Storage コンテナ**](#blob-storage-container): BYOC Logs データを保存するための Azure Storage コンテナ。
- [**クライアント ID と権限**](#client-identity-and-permissions): ストレージコンテナへの読み取り/書き込みアクセス権を持つ Azure AD アプリケーション。
- [**NGINX Ingress Controller**](#nginx-ingress-controller): 外部トラフィックを BYOC Logs サービスにルーティングするために AKS クラスターにインストールされます。
- **Datadog Agent**: ログを収集して BYOC Logs に送信するために AKS クラスターにデプロイされます。

### Azure Kubernetes Service (AKS){#azure-kubernetes-service-aks}

BYOC Logs は完全に Kubernetes 上で実行されます。ワークロード用に構成された、十分な CPU、メモリ、ディスク容量を備えた AKS クラスターが必要です。ガイダンスについては、Kubernetes クラスターのサイジングに関する推奨事項を参照してください。

#### AKS クラスターをデプロイする{#deploy-the-aks-cluster}

- [Azure CLI を使用して AKS クラスターをデプロイする][2]
- [Terraform を使用して AKS クラスターをデプロイする][3]

#### クラスターの接続性と正常性を確認する{#verify-cluster-connectivity-and-health}
クラスターに到達可能であり、ノードが `Ready` 状態であることを確認するには、次のコマンドを実行します。

```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server{#azure-postgresql-flexible-server}

BYOC Logs は、そのメタデータと構成を PostgreSQL データベースに保存します。Datadog は、Azure Database for PostgreSQL Flexible Server を推奨します。AKS クラスターから到達可能である必要があり、理想的にはプライベートネットワークが有効になっている必要があります。詳細については、Postgres のサイジングに関する推奨事項を参照してください。

#### PostgreSQL データベースを作成する {#create-the-postgresql-database}

- [Azure CLI を使用して Azure Database for PostgreSQL Flexible Server を作成する][4]
- [Terraform を使用して Azure Database for PostgreSQL Flexible Server を作成する][5]

#### データベースの接続性を確認する {#verify-database-connectivity}

<div class="alert alert-info">セキュリティのため、BYOC Logs 専用のデータベースとユーザーを作成し、クラスター全体ではなく、そのデータベースに対してのみユーザー権限を付与してください。</div>

PostgreSQL クライアントを使用して、AKS ネットワーク内から PostgreSQL データベースに接続します `psql`。まず、`psql` を含むイメージを使用して、Kubernetes クラスター内で対話型 Pod を起動します。

```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

次に、プレースホルダーの値を実際の値に置き換えて、シェルから直接次のコマンドを実行します。

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

成功すると、次のようなプロンプトが表示されます。

```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Blob ストレージコンテナ {#blob-storage-container}

BYOC Logs は、ログを永続化するために Azure Blob Storage を使用します。この目的用に専用のコンテナを作成します。

#### Blob Storage コンテナを作成する {#create-a-blob-storage-container}
環境ごとに専用のコンテナを使用し (例: `byoc-logs-prod`、`byoc-logs-staging`)、ストレージアカウントのスコープではなく、コンテナレベルで最小権限の RBAC ロールを割り当てます。

- [Azure CLI を使用して Blob Storage コンテナを作成する][6]
- [Terraform を使用して Blob Storage コンテナを作成する][7]

### クライアント ID と権限 {#client-identity-and-permissions}

Azure AD アプリケーションには、Blob Storage コンテナへの読み取り/書き込みアクセス権を付与する必要があります。BYOC Logs 用に専用のアプリケーションを登録し、対応するサービスプリンシパルに、上記で作成した Blob Storage コンテナに対する `Contributor` ロールを割り当てます。

#### アプリケーションを登録する {#register-the-application}
[Microsoft Entra ID にアプリケーションを登録する][8]

#### 共同作成者ロールを割り当てる {#assign-contributor-role}
[blob データへのアクセスのための Azure ロールを割り当てる][9]

### NGINX Ingress Controller {#nginx-ingress-controller}

#### Public NGINX Ingress Controller {#public-nginx-ingress-controller}

パブリックイングレスは、Datadog がパブリックインターネット経由で BYOC Logs クラスターを管理およびクエリするために不可欠です。これは、以下のメカニズムを通じて BYOC Logs gRPC API への安全なアクセスを提供します。
- Datadog サービスからのトラフィックを受け入れるインターネット向け Azure Load Balancer を作成します
- Ingress コントローラーレベルでの終端処理を伴う TLS 暗号化を実装します
- Datadog と BYOC Logs クラスター間の通信に HTTP/2 (gRPC) を使用します
- Datadog サービスが有効なクライアント証明書を提示する必要がある、相互 TLS (mTLS) 認証を要求します
- コントローラーを TLS パススルーモードで構成し、`ssl-client-cert` ヘッダーを使用してクライアント証明書を BYOC Logs Pod に転送します
- 有効なクライアント証明書または証明書ヘッダーがないリクエストを拒否します

Public NGINX Ingress Controller を作成するには、次の `nginx-public.yaml` Helm 値ファイルを使用します。

{{< code-block lang="yaml" filename="nginx-public.yaml" >}}
controller:
  electionID: public-ingress-controller-leader
  ingressClass: nginx-public
  ingressClassResource:
    name: nginx-public
    enabled: true
    default: false
    controllerValue: k8s.io/public-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

次に、以下のコマンドを使用して Helm でコントローラーをインストールします。

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

コントローラー Pod が実行されていることを確認します。

```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

サービスが外部 IP を公開していることを確認します。

```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### Internal NGINX Ingress Controller {#internal-nginx-ingress-controller}

内部イングレスにより、Datadog Agents や環境内の他のログコレクターからの HTTP 経由のログ取り込みが可能になります。Public NGINX Ingress Controller を作成するには、次の `nginx-internal.yaml` Helm 値ファイルを使用します。

{{< code-block lang="yaml" filename="nginx-internal.yaml" >}}
controller:
  electionID: internal-ingress-controller-leader
  ingressClass: nginx-internal
  ingressClassResource:
    name: nginx-internal
    enabled: true
    default: false
    controllerValue: k8s.io/internal-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: true
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

次に、以下のコマンドを使用して Helm でコントローラーをインストールします。

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

コントローラー Pod が実行されていることを確認します。

```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

サービスが外部 IP を公開していることを確認します。

```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS {#dns}

オプションで、パブリックロードバランサーの IP を指す DNS エントリを追加できます。これにより、将来 IP が変更されても Datadog 側で構成を更新する必要がなくなります。

## インストール手順 {#installation-steps}

1. [BYOC Logs Helm チャートをインストールします](#install-the-byoc-logs-helm-chart)
2. [インストールを検証します](#verification)

## BYOC Logs Helm チャートをインストールする {#install-the-byoc-logs-helm-chart}

1. Datadog Helm リポジトリを追加および更新します。
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. チャート用の Kubernetes ネームスペースを作成します。
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   たとえば、`byoc-logs` ネームスペースを作成するには、
   ```shell
   kubectl create namespace byoc-logs
   ```

   **注**: 現在のコンテキストのデフォルトネームスペースを設定すると、コマンドごとに `-n <NAMESPACE_NAME>` を入力する必要がなくなります。
   ```shell
   kubectl config set-context --current --namespace=byoc-logs
   ```

1. Datadog API キーを Kubernetes シークレットとして保存します。

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. PostgreSQL データベース接続文字列を Kubernetes シークレットとして保存します。
   PostgreSQL の接続詳細を取得するには、Azure ポータルに移動し、{{< ui >}}All resources{{< /ui >}} に移動してから、_Azure Database for PostgreSQL Flexible Server_ インスタンスをクリックします。最後に、{{< ui >}}Getting started{{< /ui >}} タブで、{{< ui >}}Connect{{< /ui >}} カード内の {{< ui >}}View connection strings{{< /ui >}} リンクをクリックします。

   ```shell
   kubectl create secret generic byoc-logs-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   たとえば、`metastore-uri` シークレットを `byoc-logs` ネームスペースに保存するには、
   ```shell
   USERNAME=byoc-logs-prod
   PASSWORD=1234567890
   HOST=byoc-logs-prod.postgres.database.azure.com
   PORT=5432
   DATABASE=byoc_logs_prod
   kubectl create secret generic metastore-uri \
     -n byoc-logs \
     --from-literal QW_METASTORE_URI="postgres://$USERNAME:$PASSWORD@$HOST:$PORT/$DATABASE"
   ```

1. クライアントシークレットまたはストレージアカウントアクセスキーを Kubernetes シークレットとして保存します。
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Helm チャートをカスタマイズします。

   `datadog-values.yaml` ファイルを作成して、デフォルト値をカスタム構成で上書きします。ここでは、イメージタグ、Azure テナント ID、サービスアカウント、イングレス設定、リソースの要求と制限など、環境固有の設定を定義します。

   `datadog-values.yaml` で明示的にオーバーライドされていないパラメーターは、チャートの `values.yaml` で定義されているデフォルト値にフォールバックします。

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   Azure のオーバーライドを含む `datadog-values.yaml` ファイルの例を次に示します。

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog configuration
datadog:
  # The Datadog site (https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
  # site: datadoghq.com
  # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
  apiKeyExistingSecret: datadog-secret

azure:
  tenantId: <TENANT_ID> # required
  clientId: <CLIENT_ID> # required when using AD App to authenticate with Blob Storage
  clientSecretRef:
    name: <SECRET_NAME>
    key: <SECRET_KEY>
  storageAccount:
    name: <STORAGE_ACCOUNT_NAME> # required
    # If you are using a storage account access key to authenticate with Blob Storage,
    # comment out the `clientSecretRef` section above,
    # and uncomment the `storageAccount` section below:
    # accessKeySecretRef:
      # name: <SECRET_NAME>
      # key: <SECRET_KEY>

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: byoc-logs

# BYOC Logs node configuration
config:
  # The root URI where index data is stored. This should be an Azure path.
  # All indexes created in BYOC Logs are stored under this location.
  default_index_root_uri: azure://<CONTAINER_NAME>/indexes

# Internal ingress configuration
# The internal ingress NLB is created in private subnets.
#
# Additional annotations can be added to customize the ALB behavior.
ingress:
  # The internal ingress is used by Datadog Agents and other collectors running outside
  # the Kubernetes cluster to send their logs to BYOC Logs.
  internal:
    enabled: true
    ingressClassName: nginx-internal
    host: byoc-logs.acme.internal
    extraAnnotations: {}

# Metastore configuration
# The metastore is responsible for storing and managing index metadata.
# It requires a PostgreSQL database connection string to be provided by a Kubernetes secret.
# The secret should contain a key named `QW_METASTORE_URI` with a value in the format:
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# The metastore connection string is mounted into the pods using extraEnvFrom to reference the secret.
metastore:
  extraEnvFrom:
    - secretRef:
        name: byoc-logs-metastore-uri

# Indexer configuration
# The indexer is responsible for processing and indexing incoming data it receives data from various sources (for example, Datadog Agents, log collectors)
# and transforms it into searchable files called "splits" stored in S3.
#
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
# See the sizing guide for available tiers and their configurations.
indexer:
  replicaCount: 2
  podSize: xlarge
  persistentVolume:
    enabled: true
    storage: 250Gi
    storageClass: managed-csi

   # Searcher configuration
   # The searcher is responsible for executing search queries against the indexed data stored in S3.
   # It handles search requests from Datadog's query service and returns matching results.
   #
   # The searcher is horizontally scalable - you can increase `replicaCount` to handle more concurrent searches.
   # Resource requirements for searchers are highly workload-dependent and should be determined empirically.
   # Key factors that impact searcher performance include:
   # - Query complexity (for example, number of terms, use of wildcards or regex)
   # - Query concurrency (number of simultaneous searches)
   # - Amount of data scanned per query
   # - Data access patterns (cache hit rates)
   #
   # Memory is particularly important for searchers as they cache frequently accessed index data in memory.
   searcher:
     replicaCount: 2
     podSize: xlarge
{{< /code-block >}}

1. Helm チャートをインストールまたはアップグレードします。
    ```shell
    helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

## 検証{#verification}

### デプロイステータスの確認 {#check-deployment-status}

すべての BYOC Logs コンポーネントが実行されていることを確認します。

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## アンインストール{#uninstall}

BYOC Logs をアンインストールするには、次のコマンドを実行します。

```shell
helm uninstall <RELEASE_NAME>
```

## 次のステップ {#next-step}

**[Datadog Agent を使用したログ取り込みのセットアップ][10]** - Datadog Agent を構成してログを BYOC Logs に送信します

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /ja/byoc-logs/ingest/agent/