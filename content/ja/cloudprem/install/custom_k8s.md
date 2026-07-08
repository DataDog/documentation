---
description: メタ データ保存に PostgreSQL、オブジェクト ストレージに MinIO を用いて、任意の Kubernetes クラスターに CloudPrem
  をインストールして設定する方法を説明します。
further_reading:
- link: /cloudprem/configure/ingress/
  tag: ドキュメント
  text: CloudPrem Ingress を設定する
- link: /cloudprem/ingest/
  tag: ドキュメント
  text: ログ取り込みを設定する
- link: /cloudprem/operate/troubleshooting
  tag: ドキュメント
  text: CloudPrem のトラブルシューティング
title: PostgreSQL と MinIO を使って Kubernetes に CloudPrem をインストールする
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このドキュメントでは、メタ データ保存に PostgreSQL、S3 互換のオブジェクト ストレージに MinIO を使用して、任意の Kubernetes クラスターに CloudPrem をインストールする手順を説明します。

この構成は、自前でインフラストラクチャを運用している環境や、主要なクラウド プロバイダーのマネージド サービスを使わない環境に適しています。

## 前提条件

開始する前に、次の項目を確認してください:

- **kubectl** がインストール済みで、Kubernetes クラスターにアクセスできるよう設定されていること
  ```shell
  kubectl version --client
  ```

- **Helm 3.x** がインストールされていること
  ```shell
  helm version
  ```

- **Kubernetes クラスター** (v1.25 以降) が稼働していること
  ```shell
  kubectl get nodes
  ```

- CloudPrem 機能が有効な **Datadog アカウント** があること

- **[Datadog API キー][1]** があること

- Kubernetes クラスターからアクセス可能な **PostgreSQL データベース** (v13 以降) があること。次の接続情報を控えておいてください:
  - ホスト
  - ポート (既定値: `5432`)
  - データベース名
  - ユーザー名
  - パスワード

- Kubernetes クラスターからアクセス可能な **MinIO インスタンス** があり、次の条件を満たしていること:
  - CloudPrem データ用のバケットが作成済みであること (例: `cloudprem`)
  - そのバケットに対する読み取り / 書き込み権限を持つアクセス キーとシークレット キーがあること
  - MinIO のエンドポイント URL がわかっていること (例: `http://minio.minio.svc.cluster.local:9000`)

### 接続を確認する

先に進む前に、Kubernetes クラスターから PostgreSQL と MinIO の両方に接続できることを確認してください。

**PostgreSQL**:
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

成功すると、`psql` のプロンプトが表示されます。

**MinIO**:
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

成功すると、コマンドの出力に MinIO バケットの内容が一覧表示されます。

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

   <div class="alert alert-danger">パスワードに特殊文字が含まれている場合は、先に URL エンコードしてください。例: <code>/</code> → <code>%2F</code>、<code>+</code> → <code>%2B</code>、<code>=</code> → <code>%3D</code>。</div>

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"
   ```

1. MinIO の認証情報を Kubernetes シークレットとして保存します:

   ```shell
   kubectl create secret generic cloudprem-minio-credentials \
   -n <NAMESPACE_NAME> \
   --from-literal AWS_ACCESS_KEY_ID="<MINIO_ACCESS_KEY>" \
   --from-literal AWS_SECRET_ACCESS_KEY="<MINIO_SECRET_KEY>"
   ```

1. Helm チャートをカスタマイズします:

   `datadog-values.yaml` ファイルを作成し、既定値を環境に合わせた設定で上書きします。このファイルでは、サービス アカウント、Ingress の設定、リソースの要求量と上限など、環境固有の項目を定義します。

   `datadog-values.yaml` で明示的に上書きしていないパラメーターには、チャートの `values.yaml` に定義された既定値が適用されます。

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   以下は、MinIO を使う標準的な Kubernetes 環境向けに上書き設定を加えた `datadog-values.yaml` の例です:

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog の設定
datadog:
  # 接続先の Datadog サイト (https://docs.datadoghq.com/getting_started/site/) です。既定値は `datadoghq.com` です。
  # site: datadoghq.com
  # Datadog API キーを格納した既存の Secret 名です。キー名は `api-key` である必要があります。
  apiKeyExistingSecret: datadog-secret

# 環境変数
# MinIO の認証情報は Kubernetes シークレットからマウントされます。
# ここで定義した環境変数は、デプロイメント内のすべての Pod で利用できます。
environment:
  AWS_REGION: us-east-1

# サービス アカウントの設定
serviceAccount:
  create: true
  name: cloudprem

# CloudPrem ノードの設定
config:
  # インデックス データを保存するルート URI です。MinIO バケットを指す S3 互換パスを指定してください。
  # CloudPrem で作成されるすべてのインデックスは、この場所の下に保存されます。
  default_index_root_uri: s3://<BUCKET_NAME>/indexes
  storage:
    s3:
      endpoint: <MINIO_ENDPOINT>
      # MinIO では force_path_style_access を true にする必要があります。
      force_path_style_access: true

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
    - secretRef:
        name: cloudprem-minio-credentials

# Indexer の設定
# Indexer は、さまざまなソース (例: Datadog Agent、ログ コレクター) から受け取ったデータを処理してインデックス化し、
# それを MinIO に保存される "splits" と呼ばれる検索可能なファイルに
# 変換します。
#
# Indexer は水平スケールに対応しています。`replicaCount` を増やすと、より高いインデックス処理スループットに対応できます。
# `podSize` パラメーターを使うと、vCPU、メモリ、コンポーネント固有の設定が自動で決まります。
# 利用可能なティアとその構成については、サイジング ガイドを参照してください。
indexer:
  replicaCount: 2
  podSize: xlarge
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Searcher の設定
# Searcher は、MinIO に保存されたインデックス済みデータに対して検索クエリを実行します。
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
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# コントロール プレーンの設定
controlPlane:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Janitor の設定
janitor:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials
{{< /code-block >}}

   次のプレースホルダーは実際の値に置き換えてください:
   - `<BUCKET_NAME>`: MinIO バケット名 (例: `cloudprem`)
   - `<MINIO_ENDPOINT>`: MinIO のエンドポイント URL (例: `http://minio.minio.svc.cluster.local:9000`)

1. Helm チャートをインストールまたはアップグレードします:

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

すべての Pod は `Running` 状態になっているはずです:
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

### Metastore の接続を確認する

metastore のログを確認して、PostgreSQL に接続できていることを確認します:
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=metastore --tail=50
```

接続エラーがなく、クラスターへの参加や split 処理が正常に行われたことを示すログが出力されているはずです。

### ストレージ接続を確認する

indexer のログを確認して、MinIO に書き込めていることを確認します:
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=indexer --tail=50
```

## アンインストール

CloudPrem をアンインストールするには、次のコマンドを実行します:

```shell
helm uninstall <RELEASE_NAME> -n <NAMESPACE_NAME>
```

さらに、名前空間と関連するシークレットも削除するには、次のコマンドを実行します:

```shell
kubectl delete namespace <NAMESPACE_NAME>
```

## 次のステップ

**[Datadog Agent でログ取り込みを設定する][2]** - Datadog Agent から CloudPrem にログを送信するように構成します

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/cloudprem/ingest/agent/