---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: ドキュメント
  text: CloudPrem Ingress を設定する
- link: /cloudprem/ingest/
  tag: ドキュメント
  text: ログ取り込みを設定する
title: Google Kubernetes Engine (GKE) 上の CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このインストール ガイドでは、Datadog CloudPrem を Google Kubernetes Engine (GKE) にデプロイする手順を説明します。

GKE 上の CloudPrem では、次の Google Cloud サービスを使用します:
- **Google Kubernetes Engine (GKE)**: CloudPrem の各コンポーネントを実行するためのコンテナ オーケストレーション基盤
- **Cloud Storage (GCS)**: テレメトリー データとインデックスを保存するオブジェクト ストレージ
- **Cloud SQL for PostgreSQL**: メタデータ保存用のマネージド PostgreSQL データベース
- **Workload Identity**: GKE ワークロードと Google Cloud サービスの間で安全な認証を実現する仕組み

## 前提条件

開始する前に、次の項目を確認してください:

1. **Google Cloud CLI** がインストールされ、設定済みであること
   ```shell
   gcloud version
   ```

2. **kubectl** がインストールされていること
   ```shell
   kubectl version --client
   ```

3. **Helm 3.x** がインストールされていること
   ```shell
   helm version
   ```

4. 課金が有効な **GCP Project** があること
   ```shell
   gcloud config set project YOUR_PROJECT_ID
   ```

5. **必要な IAM 権限**:
   - `roles/container.admin` (Kubernetes Engine Admin)
   - `roles/iam.serviceAccountAdmin` (Service Account Admin)
   - `roles/compute.admin` (Compute Admin)

6. **[API キーを作成または取得する][1]**

7. **必要な API が有効になっていること**:
   ```shell
   gcloud services enable container.googleapis.com \
     compute.googleapis.com \
     sqladmin.googleapis.com \
     storage.googleapis.com
   ```

## インストール手順

### ステップ 1: 環境変数を設定する

後続のコマンドを簡潔にし、コピー & ペースト時のミスを減らすため、次の環境変数を設定します。

```shell
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export CLUSTER_NAME="cloudprem-cluster"
export DATADOG_SITE="datadoghq.com"  # または datadoghq.eu, us3.datadoghq.com, us5.datadoghq.com
export BUCKET_NAME="${PROJECT_ID}-cloudprem"
```

### ステップ 2: GKE クラスターを作成する

Workload Identity を有効にした GKE クラスターを作成します:

```shell
gcloud container clusters create ${CLUSTER_NAME} \
  --region ${REGION} \
  --num-nodes 1 \
  --workload-pool=${PROJECT_ID}.svc.id.goog \
  --machine-type n1-standard-4
```

{{% collapse-content title="クラスターのサイジングに関する推奨事項" level="h4" %}}
- **Small (Dev/Test)**: ノード 3 台、n1-standard-4 (1 日あたり約 100 GB) 
- **Medium (Production)**: ノード 5 台、n1-standard-8 (1 日あたり約 500 GB) 
- **Large (Enterprise)**: ノード 7 台以上、n1-standard-16 (1 日あたり 1 TB 以上)
{{% /collapse-content %}}

クラスターの認証情報を取得します:
```shell
gcloud container clusters get-credentials ${CLUSTER_NAME} --region ${REGION}
```

GKE 認証プラグインをインストールします:
```shell
gcloud components install gke-gcloud-auth-plugin
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
```

クラスターにアクセスできることを確認します:
```shell
kubectl cluster-info
kubectl get nodes
```

### ステップ 3: Cloud Storage バケットを作成する

CloudPrem のデータ保存用に GCS バケットを作成します:

```shell
export BUCKET_NAME="cloudprem-data-${PROJECT_ID}"

gcloud storage buckets create gs://${BUCKET_NAME} \
  --project=${PROJECT_ID} \
  --location=${REGION} \
  --uniform-bucket-level-access
```

### ステップ 4: Cloud SQL for PostgreSQL インスタンスを作成する

メタデータ保存用の Cloud SQL for PostgreSQL インスタンスを作成します:

```shell
# 安全なパスワードを生成する
export DB_PASSWORD=$(openssl rand -base64 32)
echo "Database password: ${DB_PASSWORD}"
# このパスワードは安全な場所に保存してください。後で必要になります

# Cloud SQL インスタンスを作成する
gcloud sql instances create cloudprem-postgres \
  --database-version=POSTGRES_15 \
  --region=${REGION} \
  --root-password="${DB_PASSWORD}"
```

完了まで数分かかることがあります。インスタンスの準備が整ってから、次を実行します:

```shell
gcloud sql instances describe cloudprem-postgres \
  --format="value(state)"
# 出力例: RUNNABLE
```

CloudPrem 用のデータベースを作成します:
```shell
gcloud sql databases create cloudprem \
  --instance=cloudprem-postgres
```

接続情報を取得します:
```shell
export DB_CONNECTION_NAME=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(connectionName)")
export DB_PUBLIC_IP=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(ipAddresses[0].ipAddress)")

echo "Connection Name: ${DB_CONNECTION_NAME}"
echo "Public IP: ${DB_PUBLIC_IP}"
```

GKE ノードから Cloud SQL に接続できるように許可します:
```shell
# GKE ノードの外部 IP を取得する
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')

# 取得した IP を許可する
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

### ステップ 5: IAM と Workload Identity を設定する

CloudPrem 用の GCP サービス アカウントを作成します:

```shell
export SERVICE_ACCOUNT_NAME="cloudprem-sa"

gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
  --display-name="CloudPrem Service Account" \
  --project=${PROJECT_ID}
```

必要な IAM ロールを付与します:

```shell
# Cloud SQL Client ロール
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# GCS バケット用の Storage Object Admin ロール
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

Kubernetes の名前空間とサービス アカウントを作成します:

```shell
kubectl create namespace datadog-cloudprem

kubectl create serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem

kubectl annotate serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem \
  iam.gke.io/gcp-service-account=${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

GCP サービス アカウントを Kubernetes サービス アカウントにバインドします:

```shell
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

### ステップ 6: Kubernetes シークレットを作成する

Datadog API キー用のシークレットを作成します:

```shell
kubectl create secret generic datadog-secret \
  --from-literal=api-key=${DD_API_KEY} \
  --namespace=datadog-cloudprem
```

PostgreSQL 接続情報用のシークレットを作成します:

<div class="alert alert-danger">パスワードは URL エンコードする必要があります。例: <code>/</code> → <code>%2F</code>、<code>+</code> → <code>%2B</code>、<code>=</code> → <code>%3D</code>。</div>

```shell
# まずパスワードを URL エンコードします
# 例: パスワードが "abc/def+ghi=" の場合、"abc%2Fdef%2Bghi%3D" になります

kubectl create secret generic cloudprem-metastore-config \
  --from-literal=QW_METASTORE_URI="postgresql://postgres:${DB_PASSWORD}@${DB_PUBLIC_IP}:5432/cloudprem" \
  --namespace=datadog-cloudprem
```

### ステップ 7: Helm を使って CloudPrem をインストールする

Datadog Helm リポジトリを追加します:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

`values.yaml` ファイルを作成します:

使用する [Datadog サイト][2] を {{< region-param key="dd_site" code="true" >}} に設定します。

```yaml
# Datadog の設定
datadog:
   # 接続先の Datadog サイトです。既定値は `datadoghq.com` です。
   # site: datadoghq.com
   # Datadog API キーを格納した既存の Secret 名です。シークレットのキー名は `api-key` である必要があります。
   apiKeyExistingSecret: datadog-secret

# Workload Identity を使用するサービス アカウント
serviceAccount:
  create: false
  name: cloudprem-ksa
  extraAnnotations:
    iam.gke.io/gcp-service-account: cloudprem-sa@${YOUR_PROJECT_ID}.iam.gserviceaccount.com

# CloudPrem ノードの設定
config:
  # インデックス データを保存するルート URI です。gs パスを指定してください。
  # CloudPrem で作成されるすべてのインデックスは、この場所の下に保存されます。
  default_index_root_uri: gs://${BUCKET_NAME}/indexes

# VPC 内からアクセスするための内部 Ingress の設定
# Helm チャートは、まだ GKE Ingress をサポートしていません。
#
# 追加のアノテーションを使って ALB の動作をカスタマイズできます。
ingress:
  internal:
    enabled: false

# Metastore の設定
# Metastore は、インデックス メタ データの保存と管理を担います。
# Kubernetes シークレットで PostgreSQL データベースの接続文字列を渡す必要があります。
# このシークレットには、次の形式の値を持つ `QW_METASTORE_URI` という名前のキーが必要です:
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# Secret を参照するために extraEnvFrom を使い、Metastore の接続文字列を Pod にマウントします。
metastore:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-metastore-uri

# Indexer の設定
# Indexer は、さまざまなソース (例: Datadog Agent、ログ コレクター) から受け取ったデータを処理してインデックス化し、
# それを S3 に保存される "splits" と呼ばれる検索可能なファイルに変換します。
#
# Indexer は水平スケールに対応しています。より高いインデックス処理スループットが必要な場合は、`replicaCount` を増やしてください。リソースの要求量と上限は、実際のインデックス ワークロードに合わせて調整する必要があります。
#
# `podSize` パラメーターを使うと、vCPU、メモリ、コンポーネント固有の設定が自動的に決まります。既定値は、indexer Pod あたり最大 20 MB/s 程度の中規模なインデックス負荷に適しています。
# 利用可能なティアとその構成については、サイジング ガイドを参照してください。
indexer:
  replicaCount: 2
  podSize: xlarge

# Searcher の設定
# `podSize` パラメーターを使うと、vCPU、メモリ、コンポーネント固有の設定が自動的に決まります。
# クエリの複雑さ、同時実行数、データ アクセス パターンに応じてティアを選択してください。
searcher:
  replicaCount: 2
  podSize: xlarge
```

CloudPrem をインストールする:

```shell
helm install cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml
```

### ステップ 8: 内部 GCE Ingress を追加する

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cloudprem-internal
  namespace: datadog-cloudprem
  annotations:
    kubernetes.io/ingress.class: "gce-internal"
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: cloudprem-indexer
            port:
              number: 7280
```

```shell
kubectl apply -f ingress-values.yaml
```

### ステップ 9: Datadog Agent をインストールする (推奨)

CloudPrem コンポーネントからメトリクスを収集し、Datadog に送信するために Datadog Agent をインストールします。

Datadog Agent 用に別の名前空間を作成します:

```shell
kubectl create namespace datadog

# API キーのシークレットを Agent 用の名前空間にコピーする
kubectl get secret datadog-secret -n datadog-cloudprem -o yaml | \
  sed 's/namespace: datadog-cloudprem/namespace: datadog-agent/' | \
  kubectl apply -f -
```

Datadog Operator をインストールします:

```yaml
# GKE Autopilot 向け Datadog Agent の Helm values
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "1000000h"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    dogstatsd:
        port: 8125
        useHostPort: false  # Autopilot では false である必要があります
        nonLocalTraffic: true

```

Datadog Agent をインストールします:

```shell
kubectl apply -f datadog-operator-values.yaml
```

Datadog Agent が稼働していることを確認します:

```shell
kubectl get pods -n datadog
```

CloudPrem が Datadog Agent の DogStatsD サービスにメトリクスを送信するように更新します。次の設定を `values.yaml` に追加してください:

```yaml
# DogStatsD の設定 - メトリクスを Datadog Agent に送信する
dogstatsdServer:
  host:
    value: "datadog-agent.datadog.svc.cluster.local"
  port: 8125
```

新しい設定を反映して CloudPrem をアップグレードします:

```shell
helm upgrade cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml \
  --timeout 10m
```

DogStatsD の設定を確認します:

```shell
kubectl get pod -n datadog-cloudprem -l app.kubernetes.io/component=metastore -o jsonpath='{.items[0].spec.containers[0].env[?(@.name=="CP_DOGSTATSD_SERVER_HOST")].value}'
# 出力例: datadog-agent.datadog.svc.cluster.local
```

### ステップ 10: デプロイを確認する

Pod の状態を確認します:
```shell
kubectl get pods -n datadog-cloudprem
```

すべての Pod が `Running` 状態で、`READY` 列にも適切な値が表示されているはずです:
```
NAME                                   READY   STATUS    RESTARTS   AGE
cloudprem-control-plane-xxx            1/1     Running   0          5m
cloudprem-indexer-0                    1/1     Running   0          5m
cloudprem-indexer-1                    1/1     Running   0          5m
cloudprem-janitor-xxx                  1/1     Running   0          5m
cloudprem-metastore-xxx                1/1     Running   0          5m
cloudprem-metastore-yyy                1/1     Running   0          5m
cloudprem-searcher-0                   1/1     Running   0          5m
cloudprem-searcher-1                   1/1     Running   0          5m
```

データベースへの接続が正常に確立されていることを metastore のログで確認します:
```shell
kubectl logs -n datadog-cloudprem -l app.kubernetes.io/component=metastore --tail=50
```

## アンインストール

CloudPrem を完全に削除するには、次のコマンドを実行します:

```shell
# Helm リリースをアンインストールする
helm uninstall cloudprem --namespace datadog-cloudprem

# 名前空間を削除する
kubectl delete namespace datadog-cloudprem

# Cloud SQL インスタンスを削除する
gcloud sql instances delete cloudprem-postgres --quiet

# GCS バケットを削除する
gsutil -m rm -r gs://${BUCKET_NAME}

# GCP サービス アカウントを削除する
gcloud iam service-accounts delete \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --quiet

# GKE クラスターを削除する
gcloud container clusters delete ${CLUSTER_NAME} \
  --region ${REGION} \
  --quiet
```

## ベスト プラクティス

- **Workload Identity を使用する**: セキュリティを高めるため、サービス アカウント キーではなくこちらを利用します。
- **Cloud SQL のバックアップを有効にする**: 障害復旧に備えます。
- **リージョナル GKE クラスターを使用する**: 高可用性を確保しやすくなります。
- **indexer ノードのディスク使用量を監視する**: あわせてオート スケーリングも有効にします。
- **Datadog でアラートを設定する**: CloudPrem コンポーネントの健全性を継続的に監視します。
- **本番環境ではプライベート GKE クラスターを使用する**: セキュリティをさらに強化できます。
- **CloudPrem を定期的に更新する**: バグ修正と新機能を取り込むため、最新バージョンを維持します。
- **本番変更の前にステージング環境でスケーリングを検証する**: 予期しない性能問題を避けやすくなります。
- **データベースのパスワードは Secret Manager に保存する**: External Secrets Operator (ESO) または Secrets Store CSI Driver を使って、metastore Pod にパスワードを渡します。

## 次のステップ

- アプリケーションがテレメトリーを CloudPrem に送信するよう設定する
- Datadog で CloudPrem のパフォーマンスを監視するダッシュボードを用意する
- Datadog アカウントで CloudPrem のログとメトリクスを確認する
- データ量に応じてキャパシティ計画を立てる

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/