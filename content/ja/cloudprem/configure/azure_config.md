---
description: CloudPrem 向けに Azure を設定する方法を説明します
further_reading:
- link: /cloudprem/install/azure_aks/
  tag: ドキュメント
  text: Azure AKS に CloudPrem をインストールする
- link: /cloudprem/ingest_logs/
  tag: ドキュメント
  text: ログ取り込みを設定する
title: Azure 設定
---

## 概要

Azure に CloudPrem をインストールする前に、関連するインフラストラクチャ リソースを一式準備する必要があります。これらのコンポーネントは、CloudPrem の稼働に必要なコンピュート、ストレージ、データ ベース、ネットワークの基盤となるサービスを提供します。このドキュメントでは、[Azure AKS インストール ガイド][1] に記載されたインストール手順に進む前に、Azure アカウント上で準備しておくべきリソースをまとめています。

### 必要なインフラストラクチャー
用意すべきコンポーネントは次のとおりです:

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): 想定される CloudPrem のワークロードに見合うサイズで稼働している AKS クラスター。
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): CloudPrem がメタデータの保存に使用する Azure Database for PostgreSQL インスタンス。
- [**Blob Storage コンテナ**](#blob-storage-container): CloudPrem のログを保管する Azure Storage コンテナ。
- [**クライアント ID と権限**](#client-identity-and-permissions): ストレージ コンテナへの読み取り / 書き込みアクセス権を持つ Azure AD アプリケーション。
- [**NGINX Ingress Controller**](#nginx-ingress-controller): 外部トラフィックを CloudPrem のサービスへルーティングするために AKS クラスターへインストールするコンポーネント。
- **Datadog Agent**: AKS クラスターにデプロイし、ログを収集して CloudPrem に送信するコンポーネント。

## Azure Kubernetes Service (AKS)

CloudPrem は Kubernetes 上で完全に動作します。利用するワークロードに合わせて、十分な CPU、メモリ、ディスク容量を備えた AKS クラスターが必要です。詳しくは、Kubernetes クラスターのサイジングに関する推奨事項を参照してください。

### AKS クラスターをデプロイする

- [Azure CLI を使用して AKS クラスターをデプロイする][2]
- [Terraform を使用して AKS クラスターをデプロイする][3]

### クラスターへの接続と状態を確認する
クラスターに到達でき、ノードが `Ready` 状態になっていることを確認するには、次のコマンドを実行します:
```shell
kubectl get nodes -o wide
```

## Azure PostgreSQL Flexible Server

CloudPrem は、メタデータと設定情報を PostgreSQL データベースに保存します。Datadog では、Azure Database for PostgreSQL Flexible Server の利用を推奨しています。このデータベースは AKS クラスターから接続できる必要があり、できればプライベート ネットワークを有効にした構成にしてください。詳しくは、PostgreSQL のサイジングに関する推奨事項を参照してください。

### PostgreSQL データベースを作成する

- [Azure CLI を使用して Azure Database for PostgreSQL Flexible Server を作成する][4]
- [Terraform を使用して Azure Database for PostgreSQL Flexible Server を作成する][5]

### データベースへの接続を確認する

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

## Blob Storage コンテナ

CloudPrem は、ログを永続化するために Azure Blob Storage を使用します。この用途専用のコンテナを作成してください。

### Blob Storage コンテナを作成する
環境ごとに専用のコンテナを用意し (たとえば `cloudprem-prod` や `cloudprem-staging`)、ストレージ アカウント単位ではなく、コンテナ単位で最小権限の RBAC ロールを割り当ててください。

- [Azure CLI を使用して Blob Storage コンテナを作成する][6]
- [Terraform を使用して Blob Storage コンテナを作成する][7]

## クライアント ID と権限

Blob Storage コンテナには、Azure AD アプリケーションに読み取り / 書き込みアクセス権を付与する必要があります。CloudPrem 専用のアプリケーションを登録し、それに対応するサービス プリンシパルに、上で作成した Blob Storage コンテナの `Contributor` ロールを割り当ててください。

### アプリケーションを登録する
[Microsoft Entra ID でアプリケーションを登録する][8]

### Contributor ロールを割り当てる
[Blob データへのアクセス用 Azure ロールを割り当てる][9]

## NGINX Ingress Controller

### パブリック NGINX Ingress Controller

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

### 内部 NGINX Ingress Controller

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

## DNS

必要に応じて、パブリック ロード バランサーの IP を指す DNS エントリを追加できます。これにより、今後 IP が変わっても Datadog 側の設定を更新せずに済みます。

## 次のステップ

Azure の設定が完了したら

1. **CloudPrem を Azure AKS にインストールする** - [Azure AKS インストール ガイド][1] に沿って CloudPrem をデプロイします 
2. **ログ取り込みを設定する** - [ログ取り込み][10] を構成して、CloudPrem へのログ送信を開始します 

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloudprem/install/azure_aks
[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /ja/cloudprem/ingest_logs/