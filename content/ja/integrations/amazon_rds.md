---
aliases:
  - /ja/integrations/awsrds/
  - /ja/integrations/rds/
  - /ja/integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon RDS 関連の豊富なメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_rds/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/'
    tag: ブログ
    text: RDS MySQL パフォーマンスメトリクスの監視
  - link: 'https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/'
    tag: ブログ
    text: AWS RDS PostgreSQL 監視のキーメトリクス
  - link: 'https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/'
    tag: ブログ
    text: Amazon Aurora パフォーマンスメトリクスの監視
git_integration_title: amazon_rds
has_logo: true
integration_title: Amazon RDS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_rds
public_title: Datadog-Amazon RDS インテグレーション
short_description: Amazon RDS 関連の豊富なメトリクスを追跡
version: '1.0'
---
{{< img src="integrations/awsrds/rdsdashboard.png" alt="RDS Dashboard"  >}}

## 概要

Amazon Relational Database Service (RDS) は、クラウドでのリレーショナルデータベースのセットアップ、運用、およびスケーリングに使用される Web サービスです。このインテグレーションを有効にすると、Datadog にすべての RDS メトリクスを表示できます。

RDS インスタンスの監視には 3 つのオプションがあります。標準と拡張のどちらを使用するかを選択してから、オプションでネイティブデータベースインテグレーションを有効にします。

* **標準 RDS インテグレーション** - 標準インテグレーションの場合は、AWS インテグレーションタイルの左側で RDS を選択する必要があります。これにより、ご使用の CloudWatch インテグレーションで利用可能な回数だけ、インスタンスについてのメトリクスを受信できます。すべての RDS Engine タイプがサポートされます。

* **拡張 RDS インテグレーション** - 拡張インテグレーションの場合は、追加の構成が必要です。MySQL、Aurora、PostgreSQL、および MariaDB エンジンでのみ使用できます。追加のメトリクスを使用できますが、それらのメトリクスを Datadog に送信するには、AWS Lambda が必要です。詳細度が高く、追加サービスが必要になると AWS の追加料金が発生する場合があります。

* **RDS + ネイティブデータベースインテグレーション** - ネイティブデータベースインテグレーションはオプションです。MySQL、Aurora、MariaDB、SQL Server、および PostgreSQL エンジンタイプで使用できます。RDS とネイティブインテグレーションの両方からメトリクスを取得して照合するには、RDS インスタンスに割り当てる識別子に基づいて、ネイティブインテグレーションで `dbinstanceidentifier` タグを使用します。RDS インスタンスには自動的にタグが割り当てられます。

## セットアップ
### インストール

#### 標準 RDS インテグレーション 

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

#### 拡張 RDS インテグレーション 

RDS インスタンスの拡張モニタリングを有効にするには、インスタンスの作成中または作成後に、**Instance Actions** の下にある **Modify** を選択します。監視の詳細度には 15 を選択することをお勧めします。

{{< img src="integrations/awsrds/rds-enhanced-install.png" alt="RDS enhanced install" >}}

##### KMS キーの作成

1. KMS のホーム (https://console.aws.amazon.com/kms/home) を開きます。
2. **Customer managed keys** に進みます。
2. **Create Key** を選択します。
3. たとえば、キーのエイリアス (例: `lambda-datadog-key`) を入力します。注: 「aws」で始まるエイリアスは使用できません。「aws」で始まるエイリアスは、ご使用のアカウントで AWS が管理する CMK を表すために Amazon Web Services によって予約されています。
4. 適切な管理者を追加して、このキーを管理できるユーザーを指定します。
5. ロールを追加する必要はありません。
6. KMS キーを保存します。

##### Lambda 関数の作成

7. Lambda マネジメントコンソールから、新しい Lambda 関数を作成します。**Lambda 関数は、作成した KMS キーと同じリージョンにある必要があります。**
8. `Serverless Application Repository` を選択し、`Datadog-RDS-Enhanced` を検索して選択します。
9. アプリケーションに一意の名前を付けます。
10. 前のセクションで作成したキーの ID を `KMSKeyId` パラメーターに貼り付け、デプロイします。
11. アプリケーションがデプロイされたら、新しく作成された Lambda 関数を開きます (「Resource」の下にある関数をクリック)。
 {{< img src="integrations/awsrds/click-function.png" alt="Open Lambda Function" >}}
12. 下にスクロールして `Environment variables` セクションを見つけます。`<YOUR_API_KEY>` は、`{"api_key":"<YOUR_API_KEY>"}` の形式を使用して [Datadog API キー][17]に置き換えます。
{{< img src="integrations/awsrds/env-variables.png" alt="Environment Variables" >}}
13. `Encryption configuration` セクションを開き、`Enable helpers for encryption in transit` を選択します。
14. `KMS key to encrypt in transit` で、下の `KMS key to encrypt at rest` にあるキーと同じキーを選択します。
15. 入力した JSON Blob の横にある Encrypt ボタンを押します。
16. 上に移動し、Save を押します。
17. `RDSOSMetrics` Cloudwatch ロググループをソースとして使用して新しいトリガーを作成します。
18. フィルターに名前を付け、オプションでフィルターパターンを指定して、Save を押します。

---- 

Lambda 関数のテストボタンをクリックすると、次のエラーが発生する可能性があります。

```json
{ 
  "stackTrace": [ [ "/var/task/lambda_function.py", 
    109, 
    "lambda_handler", 
    "event = json.loads(gzip.GzipFile(fileobj=StringIO(event['awslogs']['data'].decode('base64'))).read())" 
    ] 
  ], 
  "errorType": "KeyError", 
  "errorMessage": "'awslogs'" 
}
```

これは無視してかまいません。Test ボタンはこのセットアップでは機能しません。

#### ネイティブデータベースインテグレーション

1. AWS コンソールに移動し、RDS セクションを開いて、監視するインスタンスを見つけます。
  {{< img src="integrations/awsrds/rds-console.png" alt="RDS console" >}}
2. エンドポイント URL をメモします (例: **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**)。これは Agent の構成に使用されます。`DB Instance identifier` もメモします (例 **mysqlrds**)。これはグラフやダッシュボードの作成に使用されます。

### コンフィグレーション

#### 標準または拡張 RDS インテグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`RDS` をオンにします。

2. Amazon RDS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。RDS ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

| AWS アクセス許可            | 説明                          |
|---------------------------|--------------------------------------|
| `rds:DescribeDBInstances` | タグを追加する RDS インスタンスを記述します。  |
| `rds:ListTagsForResource` | RDS インスタンスにカスタムタグを追加します。    |
| `rds:DescribeEvents`      | RDS データベースに関連するイベントを追加します。 |

3. [Datadog - AWS RDS インテグレーション][5]をインストールします。

#### ネイティブデータベースインテグレーション
conf.d ディレクトリ内の適切な yaml ファイルを編集することで Agent を構成し、RDS インスタンスに接続します。その後、Agent を再起動します。

RDS Aurora の場合は、使用しているデータベース用の YAML ファイルを編集します。

MySQL または MariaDB を使用している場合は、`mysql.yaml` を編集します。

```yaml
init_config:

instances:
  - server: mysqlrds.blah.us-east1-rds.amazonaws.com # AWS コンソールからのエンドポイント URL
    user: <USERNAME>
    pass: <PASSWORD>
    port: 3306
    tags:
      - dbinstanceidentifier:<INSTANCE_NAME>
```

PostgreSQL を使用している場合は、`postgres.yaml` を編集します。

```yaml
init_config:

instances:
  - host: mysqlrds.blah.us-east1-rds.amazonaws.com
    port: 5432
    username: <USERNAME>
    password: <PASSWORD>
    dbname: <DB_NAME>
    tags:
      - dbinstanceidentifier:<DB_INSTANCE_NAME>
```

Microsoft SQL Server を使用している場合は、`sqlserver.yaml` を編集します。

```yaml
init_config:

instances:
  - host: mysqlrds.blah.us-east1-rds.amazonaws.com,1433
    username: <USERNAME>
    password: <PASSWORD>
    tags:
      - dbinstanceidentifier:<DB_INSTANCE_NAME>
```

### 検証

ネイティブデータベースインテグレーションが動作していることを検証するには、`sudo /etc/init.d/datadog-agent info` を実行します。次のように表示されたら成功です。

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

### 使用方法

数分後、RDS メトリクスおよび [MySQL、Aurora、MariaDB、SQL Server、または PostgreSQL からのメトリクス][6]が Datadog で Metrics Explorer、[Graphs][7] および [Alerts][8] からアクセス可能になります。
以下に、RDS と MySQL インテグレーションからの多数のメトリクスを表示する Aurora ダッシュボードの例を挙げます。インスタンス `quicktestrds` 上の両方のインテグレーションから取得されたメトリクスは、`dbinstanceidentifier` タグを使用してまとめられます。
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="rds aurora dash"  >}}

以下は、Amazon RDS 上の MySQL のデフォルトのダッシュボードです。
{{< img src="integrations/awsrds/rds-mysql.png" alt="RDS MySQL default dashboard"  >}}

Amazon RDS のパフォーマンスメトリクスで MySQL を監視する方法については、[一連の記事][9]を参照してください。キーパフォーマンスメトリクス、その収集方法、Datadog を使用して MySQL on Amazon RDS を監視する方法について詳述されています。

### ログの収集
#### RDS ログの有効化

MySQL、MariaDB、および Postgres のログを Amazon CloudWatch に転送することができます。CloudWatch への RDS ログの送信を開始するには、[この手順][10]に従います。

#### Datadog へのログの送信

1. [Datadog ログコレクション AWS Lambda 関数][11]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で、ログを含む CloudWatch ロググループにトリガーを追加します。
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="cloudwatch log group"   style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="cloudwatch trigger"   style="width:70%;">}}

完了したら、[Datadog Log セクション][12]に移動し、ログを確認します。

## 収集データ
[データベースエンジンから収集されたメトリクス][13]のほかに、以下の RDS メトリクスも受信します。

### メトリクス
{{< get-metrics-from-git "amazon_rds" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント
AWS RDS インテグレーションには、DB インスタンス、セキュリティグループ、スナップショット、およびパラメーターグループに関連するイベントが含まれます。以下はイベントの例です。

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="AWS RDS Events" >}}

### サービスのチェック
**aws.rds.read_replica_status**  
[読み取りレプリケーション][16]のステータスを監視します。このチェックは、以下のいずれかのステータスを返します。

* OK - レプリケート中または接続中
* CRITICAL - エラーまたは途中終了
* WARNING - 停止
* UNKNOWN - その他

## トラブルシューティング
ご不明な点は [Datadog サポート][15]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_rds.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_rds
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[7]: https://docs.datadoghq.com/ja/graphing
[8]: https://docs.datadoghq.com/ja/monitors
[9]: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics
[10]: https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch
[11]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[12]: https://app.datadoghq.com/logs
[13]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[14]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds/amazon_rds_metadata.csv
[15]: https://docs.datadoghq.com/ja/help
[16]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring
[17]: https://app.datadoghq.com/account/settings#api


{{< get-dependencies >}}