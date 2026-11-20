---
aliases:
- /ja/cloudprem/configure/azure_config/
description: Azure AKS 上で CloudPrem をインストールし、設定する手順を説明します。
title: Azure AKS に CloudPrem をインストールする
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このドキュメントでは、Azure 環境の構成から Azure AKS への CloudPrem のインストールまでを順を追って説明します。

## 前提条件

Azure に CloudPrem をインストールする前に、関連するインフラストラクチャー リソースを準備する必要があります。これらのコンポーネントは、CloudPrem の稼働に必要なコンピュート、ストレージ、データベース、ネットワークの基盤を担います。

### 必要なインフラストラクチャー
用意すべきコンポーネントは次のとおりです:

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): 想定される CloudPrem のワークロードに見合うサイズで稼働している AKS クラスター。
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): CloudPrem がメタデータの保存に使用する Azure Database for PostgreSQL インスタンス。
- [**Blob Storage コンテナ**](#blob-storage-container): CloudPrem のログを保管する Azure Storage コンテナ。
- [**クライアント ID と権限**](#client-identity-and-permissions): ストレージ コンテナへの読み取り / 書き込みアクセス権を持つ Azure AD アプリケーション。
- [**NGINX Ingress Controller**](#nginx-ingress-controller): 外部トラフィックを CloudPrem のサービスへルーティングするために AKS クラスターへインストールするコンポーネント。
- **Datadog Agent**: AKS クラスターにデプロイし、ログを収集して CloudPrem に送信するコンポーネント。

### Azure Kubernetes Service (AKS)

CloudPrem は Kubernetes 上で完全に動作します。利用するワークロードに合わせて、十分な CPU、メモリ、ディスク容量を備えた AKS クラスターが必要です。詳しくは、Kubernetes クラスターのサイジングに関する推奨事項を参照してください。

#### AKS クラスターをデプロイする

- [Azure CLI を使用して AKS クラスターをデプロイする][2]
- [Terraform を使用して AKS クラスターをデプロイする][3]

#### クラスターへの接続と状態を確認する
クラスターに到達でき、ノードが `Ready` 状態になっていることを確認するには、次のコマンドを実行します:
```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server

CloudPrem は、メタデータと設定情報を PostgreSQL データベースに保存します。Datadog では、Azure Database for PostgreSQL Flexible Server の利用を推奨しています。このデータベースは AKS クラスターから接続できる必要があり、できればプライベート ネットワークを有効にした構成にしてください。詳しくは、PostgreSQL のサイジングに関する推奨事項を参照してください。

#### PostgreSQL データベースを作成する

- [Azure CLI を使用して Azure Database for PostgreSQL Flexible Server を作成する][4]
- [Terraform を使用して Azure Database for PostgreSQL Flexible Server を作成する][5]

#### データベースへの接続を確認する

<div class="alert alert-info">セキュリティ上の理由から、CloudPrem 専用のデータベースとユーザーを作成し、そのユーザーにはクラスター全体ではなく、そのデータベースに対してのみ権限を付与してください。</div>

PostgreSQL クライアントの `psql` を使って、AKS ネットワーク内から PostgreSQL データベースに接続します。まず、`psql` が含まれるイメージを使って、Kubernetes クラスター内に対話型 Pod を起動します:
```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

次に、プレースホルダーの値を実際の値に置き換えたうえで、シェルから次のコマンドを実行します:

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

接続に成功すると、次のようなプロンプトが表示されます:
```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Blob Storage コンテナ

CloudPrem は、ログを永続化するために Azure Blob Storage を使用します。この用途専用のコンテナを作成してください。

#### Blob Storage コンテナを作成する
環境ごとに専用のコンテナを用意し (たとえば `cloudprem-prod` や `cloudprem-staging`)、ストレージ アカウント単位ではなく、コンテナ単位で最小権限の RBAC ロールを割り当ててください。

- [Azure CLI を使用して Blob Storage コンテナを作成する][6]
- [Terraform を使用して Blob Storage コンテナを作成する][7]

### クライアント ID と権限

Blob Storage コンテナには、Azure AD アプリケーションに読み取り / 書き込みアクセス権を付与する必要があります。CloudPrem 専用のアプリケーションを登録し、それに対応するサービス プリンシパルに、上で作成した Blob Storage コンテナの `Contributor` ロールを割り当ててください。

#### アプリケーションを登録する
[Microsoft Entra ID でアプリケーションを登録する][8]

#### Contributor ロールを割り当てる
[Blob データへのアクセス用 Azure ロールを割り当てる][9]

### NGINX Ingress Controller

#### パブリック NGINX Ingress Controller

パブリック Ingress は、Datadog 側のコントロール プレーンとクエリ サービスが、パブリック インターネット経由で CloudPrem クラスターを管理し、クエリを実行できるようにするために欠かせません。これにより、次の仕組みを通じて CloudPrem の gRPC API へ安全にアクセスできます:
- Datadog のサービスからのトラフィックを受け付ける、インターネット向けの Azure Load Balancer を作成します。
- Ingress Controller で TLS を終端する構成を採用します。
- Datadog と CloudPrem クラスターの間の通信に HTTP/2 (gRPC) を使用します。
- Datadog のサービスが有効なクライアント証明書を提示する必要がある相互 TLS (mTLS) 認証を必須にします。
- コントローラーを TLS passthrough モードで構成し、クライアント証明書を `ssl-client-cert` ヘッダーとして CloudPrem の Pod に転送します。
- 有効なクライアント証明書がない、または証明書ヘッダーが欠けているリクエストを拒否します。

パブリック NGINX Ingress Controller を作成するには、次の `nginx-public.yaml` を Helm の values ファイルとして使用します:

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

続いて、次のコマンドで Helm を使ってコントローラーをインストールします:

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

コントローラー Pod が起動していることを確認します:
```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Service に外部 IP が表示されていることを確認します:
```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### 内部 NGINX Ingress Controller

内部 Ingress は、HTTP 経由で Datadog Agent や環境内の他のログ コレクターからログを取り込めるようにします。内部 NGINX Ingress Controller を作成するには、次の `nginx-internal.yaml` を Helm の values ファイルとして使用します:

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

続いて、次のコマンドで Helm を使ってコントローラーをインストールします:

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

コントローラー Pod が起動していることを確認します:
```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Service に外部 IP が表示されていることを確認します:
```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS

必要に応じて、パブリック ロード バランサーの IP を指す DNS エントリを追加できます。これにより、今後 IP が変わっても Datadog 側の設定を更新せずに済みます。

## インストール手順

1. [CloudPrem Helm チャートをインストールする](#install-the-cloudprem-helm-chart)
2. [インストールを確認する](#verification)

## CloudPrem Helm チャートをインストールする

1. Datadog Helm リポジトリを追加し、更新します:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. このチャート用の Kubernetes 名前空間を作成します:
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   たとえば、`cloudprem` 名前空間を作成するには、次のようにします:
   ```shell
   kubectl create namespace cloudprem
   ```

   **注**: 現在のコンテキストに既定の名前空間を設定しておくと、各コマンドで毎回 `-n <NAMESPACE_NAME>` を入力する手間を省けます:
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Datadog API キーを Kubernetes シークレットとして保存します:

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. PostgreSQL データ ベースの接続文字列を Kubernetes シークレットとして保存します:
   PostgreSQL の接続情報を取得するには、Azure Portal で **All resources** を開き、_Azure Database for PostgreSQL flexible server_ インスタンスをクリックします。次に、**Getting started** タブで、**Connect card** 内の _View connection strings_ リンクをクリックします。

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   たとえば、`cloudprem` 名前空間に `metastore-uri` シークレットを保存するには、次のようにします:
   ```shell
   USERNAME=cloudprem-prod
   PASSWORD=1234567890
   HOST=cloudprem-prod.postgres.database.azure.com
   PORT=5432
   DATABASE=cloudprem_prod
   kubectl create secret generic metastore-uri \
     -n cloudprem \
     --from-literal QW_METASTORE_URI="postgres://$USERNAME:$PASSWORD@$HOST:$PORT/$DATABASE"
   ```

1. クライアント シークレットまたはストレージ アカウントのアクセス キーを Kubernetes シークレットとして保存します:
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Helm チャートをカスタマイズします:

   `datadog-values.yaml` ファイルを作成し、既定値を環境に合わせた設定で上書きします。このファイルでは、イメージ タグ、Azure テナント ID、サービス アカウント、Ingress の設定、リソースの要求量と上限など、環境固有の項目を定義します。

   `datadog-values.yaml` で明示的に上書きしていないパラメーターには、チャートの `values.yaml` に定義された既定値が適用されます。

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   以下は、Azure 向けの上書き設定を含む `datadog-values.yaml` の例です:

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog の設定
datadog:
  # 接続先の Datadog サイト (https://docs.datadoghq.com/getting_started/site/) です。既定値は `datadoghq.com` です。
  # site: datadoghq.com
  # Datadog API キーを格納した既存の Secret 名です。キー名は `api-key` である必要があります。
  apiKeyExistingSecret: datadog-secret

azure:
  tenantId: <TENANT_ID> # 必須
  clientId: <CLIENT_ID> # Blob Storage の認証に AD アプリを使う場合は必須
  clientSecretRef:
    name: <SECRET_NAME>
    key: <SECRET_KEY>
  storageAccount:
    name: <STORAGE_ACCOUNT_NAME> # 必須
    # Blob Storage の認証にストレージ アカウントのアクセス キーを使う場合は、
    # 上の `clientSecretRef` セクションをコメント アウトし、
    # 次の `accessKeySecretRef` セクションを有効にしてください:
    # accessKeySecretRef:
      # name: <SECRET_NAME>
      # key: <SECRET_KEY>

   # サービス アカウントの設定
   # `serviceAccount.create` を `true` にすると、指定した名前でサービス アカウントが作成されます。
   # 追加のアノテーションは serviceAccount.extraAnnotations で指定できます。
   serviceAccount:
     create: true
     name: cloudprem

# CloudPrem ノードの設定
config:
  # インデックス データを保存するルート URI です。Azure のパスを指定してください。
  # CloudPrem で作成されるすべてのインデックスは、この場所の下に保存されます。
  default_index_root_uri: azure://<CONTAINER_NAME>/indexes

# 内部 Ingress の設定
# 内部 Ingress の NLB は、プライベート サブネット内に作成されます。
#
# 追加のアノテーションを使って ALB の動作をカスタマイズできます。
ingress:
  # 内部 Ingress は、Kubernetes クラスター外で動作する Datadog Agent や他のログ コレクターが
  # CloudPrem にログを送信するために使用します。
  internal:
    enabled: true
    ingressClassName: nginx-internal
    host: cloudprem.acme.internal
    extraAnnotations: {}

# Metastore の設定
# Metastore は、インデックス メタ データの保存と管理を担います。
# Kubernetes シークレットで PostgreSQL データ ベースの接続文字列を渡す必要があります。
# Secret には `QW_METASTORE_URI` という名前のキーを含め、値は次の形式にしてください:
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# Secret を参照するために extraEnvFrom を使い、Metastore の接続文字列を Pod にマウントします。
metastore:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-metastore-uri

# Indexer の設定
# Indexer は、さまざまなソース (例: Datadog Agent、ログ コレクター) から受け取ったデータを処理してインデックス化し、
# それを S3 に保存される検索可能なファイル "splits" に変換します。
#
# Indexer は水平スケールに対応しています。`replicaCount` を増やすと、より高いインデックス処理スループットに対応できます。
# `podSize` パラメーターを使うと、vCPU、メモリ、コンポーネント固有の設定が自動で決まります。
# 利用可能なティアとその構成については、サイジング ガイドを参照してください。
indexer:
  replicaCount: 2
  podSize: xlarge

   # Searcher の設定
   # Searcher は、S3 に保存されたインデックス済みデータに対して検索クエリを実行します。
   # Datadog のクエリ サービスからの検索リクエストを処理し、一致した結果を返します。
   #
   # Searcher は水平スケールに対応しています。`replicaCount` を増やすと、同時検索数を増やせます。
   # Searcher に必要なリソースはワークロードへの依存度が高いため、実測をもとに決める必要があります。
   # Searcher の性能に影響する主な要因は次のとおりです:
   # - クエリの複雑さ (例: 語数、ワイルドカードや regex の使用)
   # - クエリの同時実行数 (同時に実行される検索の数)
   # - クエリごとのスキャン対象データ量
   # - データ アクセス パターン (キャッシュ ヒット率)
   #
   # Searcher では、頻繁に参照されるインデックス データをメモリにキャッシュするため、特にメモリが重要です。
   searcher:
     replicaCount: 2
     podSize: xlarge
{{< /code-block >}}

1. Helm チャートをインストールまたはアップグレードする
    ```shell
    helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

## 確認

### デプロイ状況を確認する

CloudPrem の各コンポーネントがすべて稼働していることを確認します:

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## アンインストール

CloudPrem をアンインストールするには、次のコマンドを実行します:

```shell
helm uninstall <RELEASE_NAME>
```

## 次のステップ

**[Datadog Agent でログ取り込みを設定する][10]** - Datadog Agent から CloudPrem にログを送信するように構成します

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /ja/cloudprem/ingest/agent/