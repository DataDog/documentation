---
aliases:
- /ja/cloudprem/configure/aws_config/
description: AWS EKS 上で CloudPrem をインストールして設定する方法を説明します。
further_reading:
- link: /cloudprem/configure/ingress/
  tag: ドキュメント
  text: CloudPrem Ingress を設定する
- link: /cloudprem/ingest/
  tag: ドキュメント
  text: ログ取り込みを設定する
title: AWS EKS に CloudPrem をインストールする
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このドキュメントでは、AWS 環境の構成から AWS EKS への CloudPrem のインストールまでを順を追って説明します。

## 前提条件

AWS に CloudPrem をデプロイするには、次の項目を構成する必要があります:
- AWS 認証情報と認証
- AWS リージョンの選択
- S3 オブジェクト ストレージ用の IAM 権限
- RDS PostgreSQL データベース (推奨)
- AWS Load Balancer Controller を備えた EKS クラスター

### AWS 認証情報

ノードの起動時、CloudPrem は [rusoto_core::ChainProvider][2] が実装する認証情報プロバイダー チェーンを使って AWS 認証情報を探し、次の順番で参照します:

1. 環境変数 `AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY`、または `AWS_SESSION_TOKEN` (任意)
2. 認証情報プロファイル ファイル。通常は `~/.aws/credentials` に配置されます。`AWS_SHARED_CREDENTIALS_FILE` と `AWS_PROFILE` 環境変数が設定されていて空でない場合は、それらで指定されたものが使われます。
3. Amazon ECS コンテナの認証情報。環境変数 `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` が設定されている場合、Amazon ECS コンテナから読み込まれます。
4. インスタンス プロファイル認証情報。Amazon EC2 インスタンスで使用され、Amazon EC2 メタ データ サービス経由で提供されます。

このチェーン内で認証情報が見つからない場合は、エラーが返されます。

### AWS リージョン

CloudPrem は複数のソースから AWS リージョンを取得しようとし、次の優先順位で判定します:

1. **環境変数**: `AWS_REGION` を確認し、その後 `AWS_DEFAULT_REGION` を確認します。
2. **AWS config ファイル**: 通常は `~/.aws/config` にあります。`AWS_CONFIG_FILE` 環境変数が設定されていて空でない場合は、そのパスが使われます。
3. **EC2 インスタンスのメタ データ**: 現在実行中の Amazon EC2 インスタンスのリージョンを使用します。
4. **既定値**: ほかのソースからリージョンが取得できない場合は、`us-east-1` が使われます。

### S3 用の IAM 権限

許可が必要なアクションは次のとおりです:

* `ListBucket` (バケット自体に対して)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

以下はバケット ポリシーの例です:

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

### RDS データベースを作成する

次のコマンドで micro RDS インスタンスを作成できます。本番環境では、複数の Availability Zone にまたがって配置した小規模インスタンス (multi-AZ) で十分です。

```shell
# テスト用途の micro RDS インスタンスです。作成には約 5 分かかります。
aws rds create-db-instance --db-instance-identifier cloudprem-postgres --db-instance-class db.t3.micro --engine postgres --engine-version 16.3 --master-username cloudprem --master-user-password 'FixMeCloudPrem' --allocated-storage 20 --storage-type gp2 --db-subnet-group-name <VPC-ID> --vpc-security-group-ids <VPC-SECURITY-GROUP-ID> --db-name cloudprem --backup-retention-period 0 --no-multi-az
```

次の shell コマンドを実行すると、RDS 情報を取得できます:

```shell
# RDS インスタンスの詳細を取得する
RDS_INFO=$(aws rds describe-db-instances --db-instance-identifier cloudprem-demo-postgres --query 'DBInstances[0].{Status:DBInstanceStatus,Endpoint:Endpoint.Address,Port:Endpoint.Port,Database:DBName}' --output json 2>/dev/null)

STATUS=$(echo $RDS_INFO | jq -r '.Status')
ENDPOINT=$(echo $RDS_INFO | jq -r '.Endpoint')
PORT=$(echo $RDS_INFO | jq -r '.Port')
DATABASE=$(echo $RDS_INFO | jq -r '.Database')

echo ""
echo "🔗 Full URI:"
echo "postgres://cloudprem:FixMeCloudPrem@$ENDPOINT:$PORT/$DATABASE"
echo ""
```

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
   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>"
   ```

1. Helm チャートをカスタマイズする

   `datadog-values.yaml` ファイルを作成し、既定値を環境に合わせた設定で上書きします。このファイルでは、イメージ タグ、AWS アカウント ID、サービス アカウント、Ingress の設定、リソースの要求量と上限など、環境固有の項目を定義します。

   `datadog-values.yaml` で明示的に上書きしていないパラメーターには、チャートの `values.yaml` に定義された既定値が適用されます。

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   以下は、そのような上書き設定を含む `datadog-values.yaml` ファイルの例です:

   ```yaml
   aws:
     accountId: "123456789012"

   # Environment variables
   # Any environment variables defined here are available to all pods in the deployment
   environment:
     AWS_REGION: us-east-1

   # Datadog configuration
   datadog:
      # The Datadog [site](https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
      # site: datadoghq.com
      # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
      apiKeyExistingSecret: datadog-secret

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # The service account will be annotated with the IAM role ARN if `aws.accountId` and serviceAccount.eksRoleName` are set.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem
     # The name of the IAM role to use for the service account. If set, the following annotations will be added to the service account:
     # - eks.amazonaws.com/role-arn: arn:aws:iam::<aws.accountId>:role/<serviceAccount.eksRoleName>
     # - eks.amazonaws.com/sts-regional-endpoints: "true"
     eksRoleName: cloudprem
     extraAnnotations: {}

   # CloudPrem node configuration
   config:
     # The root URI where index data is stored. This should be an S3 path.
     # All indexes created in CloudPrem are stored under this location.
     default_index_root_uri: s3://<BUCKET_NAME>/indexes

   # Internal ingress configuration for access within the VPC
   # The ingress provisions an Application Load Balancers (ALBs) in AWS which is created in private subnets.
   #
   # Additional annotations can be added to customize the ALB behavior.
   ingress:
     internal:
       enabled: true
       name: cloudprem-internal
       host: cloudprem.acme.internal
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: cloudprem-internal

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
           name: cloudprem-metastore-uri

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
   ```

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

**[Datadog Agent でログ取り込みを設定する][8]** - Datadog Agent から CloudPrem にログを送信するように構成します

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/eks/
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: https://aws.amazon.com/rds/
[8]: /ja/cloudprem/ingest/agent/