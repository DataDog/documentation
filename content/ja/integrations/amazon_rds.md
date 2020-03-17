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
ddtype: crawler
dependencies: []
description: Amazon RDS 関連の大量のメトリクスを追跡する。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_rds/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/'
    tag: ブログ
    text: RDS MySQL パフォーマンスメトリクスを監視する
  - link: 'https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/'
    tag: ブログ
    text: AWS RDS PostgreSQL 監視のキーメトリクス
  - link: 'https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/'
    tag: ブログ
    text: Amazon Aurora パフォーマンスメトリクスを監視する
git_integration_title: amazon_rds
has_logo: true
integration_title: Amazon RDS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_rds
public_title: Datadog-Amazon RDS インテグレーション
short_description: Amazon RDS に関連する大量のメトリクスを追跡する。
version: '1.0'
---
{{< img src="integrations/awsrds/rdsdashboard.png" alt="RDS ダッシュボード" popup="true">}}

## 概要

Amazon Relational Database Service (RDS) は、クラウドでリレーショナルデータベースのセットアップ、運用、スケーリングに使用される Web サービスです。このインテグレーションを有効にすると、Datadog にすべての RDS メトリクスを表示できます。

**注**: このインテグレーションを EU 用に設定する場合、環境変数 `DD_SITE` を `datadoghq.eu` に設定するコードの外部に設定するか、コードの内部に次のように設定します。

`DD_SITE = os.getenv("DD_SITE", default="datadoghq.eu")`

RDS インスタンスの監視には 3 つのオプションがあります。標準と拡張のどちらを使用するかを選択してから、オプションでネイティブデータベースインテグレーションを有効にします。

- **標準 RDS インテグレーション**:

    標準インテグレーションの場合、AWS インテグレーションタイルの左側で RDS を選択する必要があります。これにより、ご使用の CloudWatch インテグレーションで利用可能な回数だけ、インスタンスに関するメトリクスを受信できます。すべての RDS エンジンタイプに対応しています。
- **拡張 RDS インテグレーション**:

    拡張インテグレーションの場合、構成を追加する必要があります。また、MySQL、Aurora、PostgreSQL、MariaDB エンジンでのみ使用できます。メトリクスを追加することができますが、追加したメトリクスを Datadog に送信するには、AWS Lambda が必要です。粒度が高く、追加のサービスが必要になると AWS の追加料金が発生します。
- **RDS + ネイティブデータベースインテグレーション**:

    ネイティブデータベースインテグレーションはオプションです。MySQL、Aurora、MariaDB、SQL Server、PostgreSQL の各エンジンタイプで使用できます。RDS とネイティブインテグレーションの両方からメトリクスを取得して照合するには、RDS インスタンスに割り当てる識別子に基づいて、ネイティブインテグレーションで `dbinstanceidentifier` タグを使用します。RDS インスタンスには自動的にタグが割り当てられます。

## セットアップ

### インストール

#### 標準 RDS インテグレーション 

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

#### 拡張 RDS インテグレーション 

RDS インスタンスの拡張モニタリングを有効にするには、インスタンスの作成中または作成後に、**Instance Actions** の下にある **Modify** を選択します。監視の詳細度には 15 を選択することをお勧めします。

{{< img src="integrations/awsrds/rds-enhanced-install.png" alt="拡張 RDS のインストール" >}}

##### KMS キーの作成

1. KMS のホーム (https://console.aws.amazon.com/kms/home) を開きます。
2. **Customer managed keys** に進みます。
3. **Create Key** を選択します。
4. キーのエイリアス (例: `lambda-datadog-key`) を入力します。注: 「aws」で始まるエイリアスは使用できません。「aws」で始まるエイリアスは、ご使用のアカウントで AWS 管理の CMK を表すために Amazon Web Services によって予約されています。
5. 適切な管理者を追加して、このキーを管理できるユーザーを指定します。
6. ロールを追加する必要はありません。
7. KMS キーを保存します。

##### Lambda 関数の作成

1. Lambda マネジメントコンソールから、新しい Lambda 関数を作成します。**Lambda 関数は、作成した KMS キーと同じリージョンにある必要があります。**
2. `Serverless Application Repository` を選択し、`Datadog-RDS-Enhanced` を検索して選択します。
3. アプリケーションに一意の名前を付けます。
4. 前のセクションで作成したキーの ID を `KMSKeyId` パラメーターに貼り付け、デプロイします。
5. アプリケーションがデプロイされたら、新しく作成された Lambda 関数を開きます (「Resource」の下にある関数をクリック)。
   {{< img src="integrations/awsrds/click-function.png" alt="Lambda 関数を開く" >}}
6. `Environment variables` セクションまでスクロールダウンします。書式 `{"api_key":"<API_キー>"}` で、`<API_キー>` を [Datadog API キー][2] に置換します。
   {{< img src="integrations/awsrds/env-variables.png" alt="環境変数" >}}
7. `Encryption configuration` セクションを開き、`Enable helpers for encryption in transit` を選択します。
8. `KMS key to encrypt in transit` で、下の `KMS key to encrypt at rest` にあるキーと同じキーを選択します。
9. 入力した JSON Blob の横にある Encrypt ボタンを押します。
10. 上に移動し、Save を押します。
11. `RDSOSMetrics` Cloudwatch ロググループをソースとして使用して新しいトリガーを作成します。
12. フィルターに名前を付け、オプションでフィルターパターンを指定して、Save を押します。

Lambda 関数のテストボタンをクリックすると、次のエラーが発生する可能性があります。

```json
{
    "stackTrace": [
        [
            "/var/task/lambda_function.py",
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
   {{< img src="integrations/awsrds/rds-console.png" alt="RDS コンソール" >}}
2. エンドポイント URL をメモします (例: **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**)。これは Agent の構成に使用されます。`DB Instance identifier` もメモします (例 **mysqlrds**)。これはグラフやダッシュボードの作成に使用されます。

### コンフィギュレーション

#### 標準または拡張 RDS インテグレーション

1. [AWS インテグレーションタイル][3]で、メトリクスの収集の `RDS` にチェックが入っていることを確認します。
2. Amazon RDS のメトリクスを収集するため、次のアクセス許可を [Datadog IAM ポリシー][4]に追加します。RDS ポリシーの詳細については、[AWS Web サイトに関するドキュメント][5]をご参照ください。

    | AWS アクセス許可            | 説明                          |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | タグを追加するための RDS インスタンスを記述します。|
    | `rds:ListTagsForResource` | RDS インスタンスにカスタムタグを追加します。|
    | `rds:DescribeEvents`      | RDS データベースに関連するイベントを追加します。|

3. [Datadog - AWS RDS インテグレーション][6]をインストールします。

#### ネイティブデータベースインテグレーション {#ネイティブデータベースインテグレーションのコンフィギュレーション}

conf.d ディレクトリ内の適切な yaml ファイルを編集することで Agent を構成し、RDS インスタンスに接続します。その後、Agent を再起動します。

RDS Aurora の場合は、使用しているデータベース用の YAML ファイルを編集します。

MySQL または MariaDB を使用している場合は、`mysql.yaml` を編集します。

```yaml
init_config:

instances:
    # AWS コンソールからのエンドポイント URL
    - server: 'mysqlrds.blah.us-east1-rds.amazonaws.com'
      user: '<ユーザー名>'
      pass: '<パスワード>'
      port: 3306
      tags:
          - 'dbinstanceidentifier:<インスタンス名>'
```

PostgreSQL を使用している場合は、`postgres.yaml` を編集します。

```yaml
init_config:

instances:
    - host: 'mysqlrds.blah.us-east1-rds.amazonaws.com'
      port: 5432
      username: '<ユーザー名>'
      password: '<パスワード>'
      dbname: '<DB_名>'
      tags:
          - 'dbinstanceidentifier:<DB_インスタンス名>'
```

Microsoft SQL Server を使用している場合は、`sqlserver.yaml` を編集します。

```yaml
init_config:

instances:
    - host: 'mysqlrds.blah.us-east1-rds.amazonaws.com,1433'
      username: '<ユーザー名>'
      password: '<パスワード>'
      tags:
          - 'dbinstanceidentifier:<DB_インスタンス名>'
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

数分経つと、RDS メトリクスと [MySQL、Aurora、MariaDB、SQL Server、PostgreSQL の各メトリクス][7]が Datadog のメトリクスエクスプローラー、[ダッシュボード][8]、[アラート][9]からアクセスできようになります。
下記に RDS と MySQL 双方のインテグレーションから取得した多数のメトリクスを表示する Aurora ダッシュボードの例を示します。インスタンス `quicktestrds` で双方のインテグレーションから取得したメトリクスを `dbinstanceidentifier` タグを使用して一つにまとめています。
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="RDS Aurora" popup="true">}}

これは、Amazon RDS 上の MySQL のデフォルトのダッシュボードです。
{{< img src="integrations/awsrds/rds-mysql.png" alt="RDS MySQL デフォルトダッシュボード" responsive="true" popup="true">}}

Amazon RDS のパフォーマンスメトリクスで MySQL を監視する方法については、[ブログ記事][10]をご参照ください。キーパフォーマンスメトリクス、その収集方法、Datadog を使用して MySQL を Amazon RDS で監視する方法について詳しく解説しています。

### ログの収集

#### RDS ログの有効化

MySQL、MariaDB、Postgres のログを Amazon CloudWatch に転送できます。CloudWatch への RDS ログの送信を開始するには、[こちら][11]の手順に従ってください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][12]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、RDS ログを含む CloudWatch Logs グループに手動でトリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch Logs グループ" popup="true" style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Cloudwatch トリガー" popup="true" style="width:70%;">}}

上記の設定が完了したら、[Datadog Log セクション][13]に移動し、ログの検索を開始します。

## 収集データ

[データベースエンジンから収集されたメトリクス][14]のほかに、以下の RDS メトリクスも受信できます。

### メトリクス
{{< get-metrics-from-git "amazon_rds" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS RDS インテグレーションには、DB インスタンス、セキュリティグループ、スナップショット、およびパラメーターグループに関連するイベントが含まれます。以下はイベントの例です。

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="AWS RDS イベント" >}}

### Service Checks

**aws.rds.read_replica_status**  
[読み取りレプリケーション][16]のステータスを監視します。このチェックは、以下のいずれかのステータスを返します。

- OK - レプリケート中または接続中
- CRITICAL - エラーまたは途中終了
- WARNING - 停止
- UNKNOWN - その他

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][17]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_rds.html
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_rds
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[8]: https://docs.datadoghq.com/ja/dashboards
[9]: https://docs.datadoghq.com/ja/monitors
[10]: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics
[11]: https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch
[12]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[13]: https://app.datadoghq.com/logs
[14]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[15]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds/amazon_rds_metadata.csv
[16]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring
[17]: https://docs.datadoghq.com/ja/help