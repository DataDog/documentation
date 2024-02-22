---
aliases:
- /ja/integrations/awsrds/
- /ja/integrations/rds/
- /ja/integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances/
categories:
- aws
- cloud
- data stores
- log collection
- network
dependencies: []
description: Amazon RDS に関連する大量のメトリクスを追跡する。
doc_link: https://docs.datadoghq.com/integrations/amazon_rds/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/
  tag: ブログ
  text: RDS MySQL パフォーマンスメトリクスを監視する
- link: https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/
  tag: ブログ
  text: AWS RDS PostgreSQL 監視のキーメトリクス
- link: https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/
  tag: ブログ
  text: Amazon Aurora パフォーマンスメトリクスを監視する
git_integration_title: amazon_rds
has_logo: true
integration_id: amazon-rds
integration_title: Amazon RDS
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
monitors:
  rds_cpu_utilization: assets/monitors/rds_cpu_utilization.json
  rds_database_connections_anomaly: assets/monitors/rds_database_connections_anomaly.json
  rds_storage_utilization: assets/monitors/rds_storage_utilization.json
name: amazon_rds
public_title: Datadog-Amazon RDS インテグレーション
short_description: Amazon RDS に関連する大量のメトリクスを追跡する。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awsrds/rdsdashboard.png" alt="RDS ダッシュボード" popup="true">}}

## 概要

Amazon Relational Database Service (RDS) は、クラウドでリレーショナルデータベースのセットアップ、運用、スケーリングに使用される Web サービスです。このインテグレーションを有効にすると、Datadog にすべての RDS メトリクスを表示できます。

**注**: 環境変数 `DD_SITE` がコード {{< region-param key="dd_site" code="true" >}} の外のリージョンに設定されていることを確認するか、または次のようにコードで変数を設定します。

`DD_SITE = os.getenv("DD_SITE", default="{{< region-param key="dd_site" code="true" >}}")`

RDS インスタンスを監視するには、Standard、Enhanced、Native の 3 つのオプションがあります。**コンフィギュレーションを選択する前に、[メトリクスのリスト](#data-collected)全体を確認してください**。各メトリクスには対応するコンフィギュレーションのラベルが付いているためです。さらに、以下の情報を確認して、各コンフィギュレーションの要件とプリセットダッシュボードの詳細を確認してください。

{{< tabs >}}
{{% tab "標準" %}}

標準インテグレーションの場合、[AWS インテグレーションページ][1]の `Metric Collection` タブで RDS を有効にする必要があります。これにより、ご使用の CloudWatch インテグレーションで利用可能な回数だけ、インスタンスに関するメトリクスを受信できます。すべての RDS エンジンタイプに対応しています。

このインテグレーションのプリセットダッシュボードには、接続、レプリケーションラグ、読み取り操作とレイテンシー、コンピューター、RAM、書き込み操作とレイテンシー、ディスクメトリクスのメトリクス情報が含まれています。


[1]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{% tab "Enhanced" %}}

 拡張インテグレーションの場合、構成を追加する必要があります。また、MySQL、Aurora、MariaDB、SQL Server、Oracle、PostgreSQL エンジンで使用できます。メトリクスを追加することができますが、追加したメトリクスを Datadog に送信するには、AWS Lambda が必要です。粒度が高く、追加のサービスが必要になると AWS の追加料金が発生します。

このインテグレーションのプリセットダッシュボードには、負荷、アップタイム、CPU 使用率、タスク、メモリ、SWAP、ネットワーク受信、ネットワーク送信、プロセスごとに使用される CPU、プロセスごとに使用されるメモリ、ディスク操作、使用されるファイルシステム (pct)、 実行中のタスク、システム CPU 使用率のメトリクス情報が含まれています。

{{% /tab %}}
{{% tab "Native" %}}

ネイティブデータベースインテグレーションはオプションです。MySQL、Aurora、MariaDB、SQL Server、PostgreSQL の各エンジンタイプで使用できます。RDS とネイティブインテグレーションの両方からメトリクスを取得して照合するには、RDS インスタンスに割り当てる識別子に基づいて、ネイティブインテグレーションで `dbinstanceidentifier` タグを使用します。RDS インスタンスには自動的にタグが割り当てられます。

このコンフィギュレーションで使用できるプリセットダッシュボードは、MySQL、Aurora、PostgreSQL の 3 つです。各ダッシュボードには、クエリボリューム、ディスク I/O、接続、レプリケーション、AWS リソースのメトリクスが含まれています。

**注**: これらのダッシュボードには、AWS CloudWatch と個々のデータベースエンジン自体の両方からのメトリクスが表示されます。すべてのインテグレーションメトリクスに対して、インテグレーション ([MySQL][1]、[Aurora][2]、[PostgreSQL][3]) の 1 つを有効にします。


[1]: https://docs.datadoghq.com/ja/integrations/mysql/
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html
[3]: https://docs.datadoghq.com/ja/integrations/postgres/
{{% /tab %}}
{{< /tabs >}}

## セットアップ

### インストール

{{< tabs >}}
{{% tab "標準" %}}

標準 RDS インテグレーションの場合、最初に [Amazon Web Services インテグレーション][1] をセットアップします。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
{{% /tab %}}
{{% tab "Enhanced" %}}

インスタンスの作成中または作成後に RDS インスタンスの拡張モニタリングを有効にするには、**Instance Actions** の下にある **Modify** を選択します。監視の詳細度には `15` を選択することをお勧めします。

次の手順では、KMS と Lambda Management Console を使用して、RDS Enhanced Monitoring Lambda 関数でのみ使用できる Datadog API キーの暗号化バージョンを作成します。[Log Forwarder][1] などの別の Lambda からの暗号化された API キーを既にお持ちの場合、他のオプションについては [Lambda 関数の README][2] を参照してください。

#### KMS キーの作成

1. KMS のホーム (https://console.aws.amazon.com/kms/home) を開きます。
2. **Customer managed keys** に進みます。
3. **Create Key** を選択します。
4. キーのエイリアス (例: `lambda-datadog-key`) を入力します。注: 「aws」で始まるエイリアスは使用できません。「aws」で始まるエイリアスは、ご使用のアカウントで AWS 管理の CMK を表すために Amazon Web Services によって予約されています。
5. 適切な管理者を追加して、このキーを管理できるユーザーを指定します。
6. ロールを追加する必要はありません。
7. KMS キーを保存します。

#### Lambda 関数の作成

1. Lambda マネジメントコンソールから、新しい Lambda 関数を作成します。**Lambda 関数は、作成した KMS キーと同じリージョンにある必要があります。**
2. `Serverless Application Repository` を選択し、`Datadog-RDS-Enhanced` を検索して選択します。
3. アプリケーションに一意の名前を付けます。
4. 前のセクションで作成したキーの ID を `KMSKeyId` パラメーターに貼り付け、デプロイします。
5. アプリケーションがデプロイされたら、新しく作成された Lambda 関数を開きます (「Resource」の下にある関数をクリック)。
6. `Configuration` タブをクリックし、`Environment variables` セクションに移動します。環境変数 `kmsEncryptedKeys` の `value` フィールドに、以下のように完全な JSON 形式で [Datadog API キー][3] を追加します: `{"api_key":"<YOUR_API_KEY>"}`
7. `Encryption configuration` セクションを開き、`Enable helpers for encryption in transit` を選択します。
8. `KMS key to encrypt at rest` セクションで、`Use a customer master key` を選択し、先に作成したものと同じ KMS キーを入力します。
9. 先ほど入力した JSON blob の横にある Encrypt ボタンを押し、ポップアップで、先ほど作成したものと同じ KMS キーを選択します。
10. Save を押します。
11. `RDSOSMetrics` CloudWatch ロググループをソースとして使用して新しいトリガーを作成します。
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


[1]: https://docs.datadoghq.com/ja/serverless/forwarder/
[2]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/rds_enhanced_monitoring#setup
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Native" %}}

1. AWS コンソールに移動し、RDS セクションを開いて、監視するインスタンスを見つけます。
  {{< img src="integrations/awsrds/rds-console.png" alt="RDS コンソール" >}}
2. エンドポイント URL をメモします (例: **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**)。これは Agent の構成に使用されます。`DB Instance identifier` もメモします (例 **mysqlrds**)。これはグラフやダッシュボードの作成に使用されます。

{{% /tab %}}
{{< /tabs >}}

### コンフィギュレーション

{{< tabs >}}
{{% tab "標準" %}}

1. [AWS インテグレーションページ][1]で、`Metric Collection` タブの下にある `RDS` が有効になっていることを確認します。
2. Amazon RDS のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][2]に追加します。詳細については、AWS ウェブサイト上の [RDS ポリシー][3]を参照してください。

    | AWS アクセス許可            | 説明                          |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | タグを追加するための RDS インスタンスを記述します。|
    | `rds:ListTagsForResource` | RDS インスタンスにカスタムタグを追加します。|
    | `rds:DescribeEvents`      | RDS データベースに関連するイベントを追加します。|

3. [Datadog - Amazon RDS インテグレーション][4]をインストールします。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Enhanced" %}}

1. [AWS インテグレーションページ][1]で、`Metric Collection` タブの下にある `RDS` が有効になっていることを確認します。
2. Amazon RDS のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][2]に追加します。詳細については、AWS ウェブサイト上の [RDS ポリシー][3]を参照してください。

    | AWS アクセス許可            | 説明                          |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | タグを追加するための RDS インスタンスを記述します。|
    | `rds:ListTagsForResource` | RDS インスタンスにカスタムタグを追加します。|
    | `rds:DescribeEvents`      | RDS データベースに関連するイベントを追加します。|

3. [Datadog - Amazon RDS インテグレーション][4]をインストールします。


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Native" %}}

conf.d ディレクトリ内の適切な yaml ファイルを編集することで Agent を構成し、RDS インスタンスに接続します。その後、Agent を再起動します。

RDS Aurora の場合は、使用しているデータベース用の YAML ファイルを編集します。

MySQL または MariaDB を使用している場合は、`mysql.yaml` を編集します。

```yaml
init_config:

instances:
    # AWS コンソールからのエンドポイント URL
    - server: 'mysqlrds.blah.us-east-1.rds.amazonaws.com'
      user: '<USERNAME>'
      pass: '<PASSWORD>'
      port: 3306
      tags:
          - 'dbinstanceidentifier:<INSTANCE_NAME>'
```

PostgreSQL を使用している場合は、`postgres.yaml` を編集します。

```yaml
init_config:

instances:
    - host: 'postgresqlrds.blah.us-east-1.rds.amazonaws.com'
      port: 5432
      username: '<USERNAME>'
      password: '<PASSWORD>'
      dbname: '<DB_NAME>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

Microsoft SQL Server を使用している場合は、`sqlserver.yaml` を編集します。

```yaml
init_config:

instances:
    - host: 'sqlserverrds.blah.us-east-1.rds.amazonaws.com,1433'
      username: '<USERNAME>'
      password: '<PASSWORD>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

### 検証

[Agent の status サブコマンドを実行][1]し、Checks セクションでこれに似た値を探します。

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-information
{{% /tab %}}
{{< /tabs >}}

### 使用方法

数分経つと、RDS メトリクスと [MySQL、Aurora、MariaDB、SQL Server、Oracle、PostgreSQL の各メトリクス][1]が Datadog のメトリクスエクスプローラー、[ダッシュボード][2]、[アラート][3]からアクセスできようになります。
下記に RDS と MySQL 双方のインテグレーションから取得した複数のメトリクスを表示する Aurora ダッシュボードの例を示します。インスタンス `quicktestrds` で双方のインテグレーションから取得したメトリクスを `dbinstanceidentifier` タグを使用して一つにまとめています。
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="rds aurora dash" popup="true">}}

### ログの収集

#### ログの有効化

MySQL、MariaDB、および Postgres のログを Amazon CloudWatch に転送することができます。[Amazon CloudWatch で Amazon Aurora MySQL、Amazon RDS for MySQL、MariaDB のログを監視][4]の指示に従って、RDS のログを CloudWatch に送信します。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数をインストールしたら、RDS ログを含む CloudWatch ロググループにトリガーを手動で追加します。対応する CloudWatch ロググループを選択し、フィルター名 (オプション) を追加して、トリガーを追加します。

完了したら、[Datadog Log セクション][6]に移動し、ログを確認します。

## 収集データ

[データベースエンジンから収集されたメトリクス][1]のほかに、以下の RDS メトリクスも受信します。

### メトリクス
{{< get-metrics-from-git "amazon_rds" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon RDS インテグレーションには、DB インスタンス、セキュリティグループ、スナップショット、およびパラメーターグループに関連するイベントが含まれます。以下はイベントの例です。

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="Amazon RDS イベント" >}}

### サービスのチェック

**aws.rds.read_replica_status**  
[読み取りレプリケーション][8]のステータスを監視します。このチェックは、以下のいずれかのステータスを返します。

- OK - レプリケート中または接続中
- CRITICAL - エラーまたは途中終了
- WARNING - 停止
- UNKNOWN - その他

## すぐに使える監視

Amazon RDS インテグレーションは、パフォーマンスを監視し最適化するために、すぐに使える監視機能を提供します。

- Amazon RDS ダッシュボード: すぐに使える [Amazon RDS ダッシュボード][9]を使用して、RDS インスタンスの包括的な概要を得ることができます。
- 推奨モニター: [Amazon RDS の推奨モニター][10]を有効にすると、問題をプロアクティブに検出し、タイムリーなアラートを受信することができます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[2]: https://docs.datadoghq.com/ja/dashboards/
[3]: https://docs.datadoghq.com/ja/monitors/
[4]: https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds/amazon_rds_metadata.csv
[8]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring
[9]: https://app.datadoghq.com/dash/integration/62/aws-rds
[10]: https://app.datadoghq.com/monitors/recommended
[11]: https://docs.datadoghq.com/ja/help/