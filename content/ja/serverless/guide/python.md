---
title: エンドツーエンドの Python サーバーレスモニタリングガイド
aliases:
  - /ja/infrastructure/serverless/azure_app_services/python
kind: ガイド
---
このガイドでは、サーバーレスエコシステムのメトリクス、トレース、ログ全体を可視化するためのすべての手順について説明します。まず、**Datadog Lambda Enhanced Metrics** を設定して、Lambda インフラストラクチャー全体でコールドスタートをグラフ化する方法を示します。次に、Lambda の**ログ取り込み**を有効にして、Lambda エラーログをナビゲートする方法について学びます。3 番目に、Lambda **分散型トレーシング**を使用して根本原因分析を実行するツールについて学びます。そして、**カスタムメトリクス**とサーバーレスエコシステムのモニタリングを開始します。

## Lambda コールドスタートのグラフ化

### Lambda メトリクスの取り込み

Lambda 関数から CloudWatch メトリクスの収集を開始するには、Amazon Web Services インテグレーションを有効にする必要があります。これを行うには、[Amazon Web Services のドキュメントに記載の手順に従ってください][1]。

このガイドをお読みになる前に AWS インテグレーションの設定を行っていた場合は、以下のことをご確認ください。
- AWS インテグレーションタイルで、メトリクス収集の下の Lambda にチェックがついていること。
- インストール中に設定した Datadog IAM ポリシーに `lambda:List*` および `tag:GetResources` アクセス許可が含まれていること。

このステップで、Datadog は、呼び出し、期間、エラーなどの主要な Lambda メトリクスの収集を自動的に開始します。ダッシュボードの下にある[すぐに使える Lambda ダッシュボード][2]でこれらを視覚化できます。

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_1-compressed.mp4" video="true" alt="Lambda デフォルトダッシュボード"  style="width:90%;">}}

Datadog サーバーレスビューですべての Lambda 関数を表示することもできます。現時点では、CloudWatch メトリクスのみが表示されています。このガイドではサーバーレスアプリケーションを実行している AWS Lambda 関数からの拡張メトリクス、トレース、ログを一箇所にまとめる方法をご説明します。

### 拡張メトリクスによる Lambda コールドスタートのグラフ化

このガイドでは Datadog が開発した次の 2 つのツールを参照しています。
- Datadog Forwarder (ログ、拡張メトリクス、カスタムメトリクス、トレースに使用されます)  
- Datadog Lambda レイヤー (拡張メトリクスとトレースに使用されます)  

Lambda レイヤーは、Forwarder によって Datadog に送信されるデータを生成します。Datadog Lambda レイヤーは、ランタイム用に Datadog のトレースライブラリ `dd-trace` もパッケージ化します。

これら 2 つのツールを設定して、コールドスタートなどの追加のメトリクスとタグを取り込むために必要な拡張 Lambda メトリクスを有効にします。

拡張 Lambda メトリクスとは？
- リアルタイムの第 2 レベル粒度のサーバーレスランタイムメトリクス
- `cold_start` などの新しいタグを含む
- 請求期間や推定コストなどの新しいメトリクスを含む

#### Datadog Forwarder のインストール

Datadog Forwarder をインストールするには、以下の手順に従います。Datadog Forwarder が、監視している Lambda 関数と同じ AWS リージョンにあることを確認します。

1. 管理者 AWS アカウント/ロールにログインし、リンクをクリックしてこの [CloudFormation Stack][3] をデプロイします。
2. Datadog API キーに `DdApiKey` を入力し、適切な `DdSite` を選択します。他のすべてのパラメーターはオプションとなります。`DdApiKey` の値は、Datadog アカウントのインテグレーションセクションの API タブに表示されます。
3. **Create stack** をクリックし、作成が完了するまで待ちます。
4. スタックの **Resources** タブで、論理 ID が Forwarder のインストール済みの Forwarder Lambda 関数を見つけます。
5. Datadog の AWS インテグレーションタイルの **Collect Logs** タブに移動します。
6. ログを収集する必要がある AWS アカウントを選択し、前のセクションで作成された Lambda の ARN を入力します。
7. “Lambda Cloudwatch Logs” と、ログを収集するその他のサービスを選択し、保存を押します。

CloudFormation Stack なしで Datadog Forwarder をインストールするか、既存の Forwarder をアップグレードするには、[このドキュメントを参照してください][4]。

#### Datadog Lambda レイヤーのインストール

{{< tabs >}}
{{< tab "Serverless Framework" >}}

[Serverless Framework][1] は AWS Lambda 関数と、それが必要とする AWS インフラストラクチャーリソースの開発とデプロイに役立ちます。このフレームワークはサーバーレスアプリケーションのパッケージ化とデプロイで一般的に使用されており、Datadog では Serverless Framework を使用して構築されたサーバーレスアプリケーションを簡単に監視できるように特別に設計されたプラグインが用意されています。

プラグインは、Node.js と Python 用の Datadog Lambda レイヤーを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda レイヤーを初期化します。

Datadog Lambda レイヤーをインストールするには、次の手順に従います。

1. Python パッケージに Serverless プラグイン `yarn add --dev serverless-plugin-datadog` をインストールします。

2. `serverless.yml` に以下を追加します。

```bash
plugins:
            - serverless-plugin-datadog
```

3. また、`serverless.yml` に以下のセクションを追加します。

```bash
custom:
        datadog:
            addLayers: true
            flushMetricsToLogs: true
            logLevel: 'INFO'
            enableDDTracing: true
```

4. サーバーレスアプリケーションを再度デプロイします。

Lambda レイヤーをプロジェクトに直接含める場合は、[この GitHub リポジトリからリンクされている指示に従って][2]、Python 用のオープンソースの Lambda レイヤーを使用してインストールを完了します。

これで、すべての関数に Lambda レイヤーが自動的にインストールされます。Datadog Lambda レイヤーのさまざまなコンフィギュレーションフィールドの詳細については、[このドキュメントを参照][3]してください。

[1]: https://www.serverless.com/framework/docs/providers/aws/guide/intro/
[2]: https://github.com/DataDog/datadog-lambda-layer-python
[3]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{< /tab >}}
{{< tab "AWS コンソール" >}}

Datadog Lambda レイヤー ARN には、リージョン、言語ランタイム、バージョンが含まれます。次の形式で作成します。

```text
arn:aws:lambda:<AWS_リージョン>:464622532012:layer:Datadog-<ランタイム>:<バージョン>
```

例:

```text
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:11
```

| 言語 | ランタイム                                        | リリース             |
| -------- | ---------------------------------------------- | -------------------- |
| Python   | `Python27`、`Python36`、`Python37`、`Python38` | [最新リリース][1]  |
| Node.js  | `Node8-10`、`Node10-x`、`Node12-x`             | [最新リリース][2]  |

1. AWS コンソールでレイヤーを追加する対象の Lambda 関数に移動します。
2. 関数のメインページで **Layers** をクリックします。
3. 下にスクロールして、**Add a Layer** をクリックします。
3. オプション **Provide a layer version ARN** を選択します。
4. 上記の表から Datadog Lambda レイヤー ARN を入力します。
5. 関数の **Environment Variables** セクションに移動し、Edit ボタンをクリックします。
6. 新しい `DD_FLUSH_TO_LOG` 変数を `true` に設定して追加し、Save をクリックします。


これで、この関数に Lambda レイヤーがインストールされました。それぞれの手順を繰り返して、各関数に Lambda レイヤーをインストールします。Datadog Lambda レイヤーのさまざまなコンフィギュレーションフィールドの詳細については、[Datadog の Amazon Lambda に関するドキュメントを参照][3]してください。

[1]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{< /tab >}}
{{< /tabs >}}


### Lambda コールドスタートのグラフ化

Datadog Forwarder と Datadog Lambda レイヤーの両方を適切に構成したら、すぐに使用可能な[拡張 Lambda メトリクスダッシュボード][8]に移動します。

ここに “Cold Starts by Function” という名前のグラフが表示されます。これを展開して、たとえば provisioned concurrency を追加したい関数の詳細を確認することができます。

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_2-compressed.mp4" video="true" alt="拡張メトリクスダッシュボード"  style="width:90%;">}}

拡張 Lambda メトリクスにはすべて `aws.lambda.enhanced.*` というプレフィックスがついているため、簡単に識別することができます。たとえば、上記のグラフではタグ `cold_start:true` で `aws.lambda.enhanced.invocations` を測定しています。

## Lambda エラーログのナビゲート

### Lambda ログ取り込みを有効にする

前のセクションでは、拡張メトリクスを有効にするために Datadog Forwarder をセットアップしました。Lambda 関数から Datadog にログを送信するには、Datadog Forwarder も必要です。

{{< tabs >}}
{{< tab "Serverless Framework" >}}

ここまでの手順を実行している場合、Datadog Forwarder が既に有効化されており、Lambda ログは既に Datadog へ自動的に流れているはずです。手順をすべて実行してもログが Datadog に表示されていない場合は、[Lambda ログのトラブルシューティング手順を参照][1]してください。

Datadog Lambda 関数を使用して監視するロググループにすでに何かがサブスクライブしている場合は、serverless.yml ファイルの ‘forwarder’ フィールドに Forwarder の ARN を追加できます。設定すると、プラグインは関数の CloudWatch ロググループを Forwarder にサブスクライブしようとします。たとえば、`serverless.yml` は次のようになります。

```bash
custom:
    datadog:
        addLayers: true
        flushMetricsToLogs: true
        logLevel: 'INFO'
        enableDDTracing: true
        # Forwarder の ARN を追加します。
        forwarder:
```

[1]: https://docs.datadoghq.com/ja/logs/guide/lambda-logs-collection-troubleshooting-guide/

{{< /tab >}}
{{< tab "AWS コンソール" >}}

ここまでの手順を実行している場合、Datadog Forwarder が既に有効化されており、Lambda ログは既に Datadog へ自動的に流れているはずです。手順をすべて実行してもログが Datadog に表示されていない場合は、[Lambda ログのトラブルシューティング手順を参照][1]してください。

Datadog の Lambda 関数で監視したいロググループが既にサブスクライブされている場合は、AWS コンソールから既存のサブスクリプションを削除することができます。

1. Lambda 関数でログソースを選択します。
2. Actions プルダウンで Remove Subscription Filter を選択します

[1]: https://docs.datadoghq.com/ja/logs/guide/lambda-logs-collection-troubleshooting-guide/

{{< /tab >}}
{{< /tabs >}}

それでもログが Datadog に表示されない場合は、[こちらのトラブルシューティング手順に従ってください][9]。

### ログエクスプローラーで Lambda エラーをトリアージする

Datadog サーバーレスビューに再度アクセスして、すべての Lambda 関数を確認します。特定の関数を開くと、その関数から出力されているログを確認することができます。次に、ログエクスプローラーに移動して、ログの詳細を確認します。

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_3-compressed.mp4" video="true" alt="サーバーレスページログ"  style="width:90%;">}}

どのエラーがユーザーに最も頻繁に影響を与えているかを知りたい場合があります。ログをすばやくフィルタリングして、Lambda 関数から浮上するエラーログのパターンをボリューム順に見つけることができます。

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_4-compressed.mp4" video="true" alt="ログパターン"  style="width:90%;">}}

## Lambda 関数の根本原因分析

### Lambda 分散型トレーシングを有効にする

最初のセクションでは、拡張メトリクスを有効にするために Datadog Forwarder と Lambda レイヤーをセットアップしました。Datadog Forwarder と Lambda レイヤーの両方が、Datadog の関数から分散型トレースを表面化させるためにも必要です。

{{< tabs >}}
{{< tab "Serverless Framework" >}}

ここまでの手順を実行したら、この時点で Datadog Forwarder と Lambda レイヤーは既に有効になっています。Serverless Framework を使用すると、追加のコードインスツルメンテーションなしで、トレースが自動的に Datadog に流れます。

{{< /tab >}}
{{< tab "コードインスツルメンテーション" >}}

ここまでの手順を実行したら、この時点で Datadog Forwarder と Lambda レイヤーは既に有効になっています。手順に従って Python の APM を設定してください。

1. プロジェクトに手動でトレーシングライブラリを追加するか、プロジェクトの `requirements.txt` に `datadog-lambda` を追加します。

```bash
pip install datadog-lambda
```

2. コードをインスツルメントします。

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

from ddtrace import tracer

@datadog_lambda_wrapper
def hello(event, context):
    return {
        "statusCode": 200,
        "body": get_message()
    }

@tracer.wrap()
def get_message():
    return "Hello from serverless!"
```

Python ライブラリをインスツルメントし、トレースをカスタマイズするには、[Datadog Python APM のドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/tracing/setup/python/

{{< /tab >}}
{{< /tabs >}}

### トレース、メトリクス、ログを使用した根本原因分析

Datadog サーバーレスビューに再度アクセスして、すべての Lambda 関数を確認します。特定の関数を開くと、その関数から出力されているトレースを確認することができます。各トレースを展開して、Lambda 関数のリクエスト全体の期間を対象とするフレームグラフ、およびリクエスト時の相関ログと Lambda メトリクスを確認できます。

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_5-compressed.mp4" video="true" alt="フレームグラフ"  style="width:90%;">}}

フレームグラフに表示されたトレースを使用して、後続の関数呼び出しから発生したエラーが原因で現在の Lambda 関数にエラーがあることを特定します。リクエスト内のその関数に移動し、エラートレースと対応するエラーログを確認してタイムアウトになったものを特定します。

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_6-compressed.mp4" video="true" alt="根本原因分析"  style="width:90%;">}}

ログ、トレース、拡張メトリクスがすべて 1 か所にあるため、サーバーレスリクエスト全体で問題の根本原因を効率的に特定できます。

## サーバーレスインテグレーションとカスタムメトリクス

### Datadog のサーバーレスインテグレーション

Datadog の[サーバーレスの状態レポート][10]に概要が示されているように、サーバーレスエコシステム全体の健全性を監視するには、Lambda 関数だけでなく、それ以上の可視性が必要です。特に、Lambda 関数は、多くの場合、同じリクエストで SQS および DynamoDB とやり取りします。Datadog は、Lambda 関数とやり取りするすべてのサービスとのインテグレーションとダッシュボードを提供します。

たとえば、Datadog には、DynamoDB テーブルのパフォーマンスメトリクスとログを収集する [DynamoDB インテグレーション][11]があります。また Datadog は、SQS メトリクスを取り込み、SQS API 呼び出し中にログを収集するための Amazon SQS インテグレーションも提供しています。両方のインテグレーションは、[DynamoDB テーブル][11]および [SQS][12] のすぐに使えるダッシュボードとそれぞれペアになっています。他の一般的なサーバーレスサービスのインテグレーションを以下に示します。

**Data Stores:** RDS、Aurora、self-hosted、S3  
**Message Queues:** SNS、SQS、Kinesis  
**Lambda Features:** [AWS Step Functions][13]  

さまざまなサービスの情報をすべて同じダッシュボードに取り込むことにより、上記のインテグレーションによって提供されるデフォルトのダッシュボードをカスタマイズできます。

### カスタムメトリクスの送信

カスタムメトリクスは、ユーザーのアプリケーションへのログイン、商品の購入、ユーザープロファイルの更新など、アプリケーションワークフローに固有のユースケースに関する追加情報を提供します。

最初のセクションでは、拡張メトリクスを有効にするために Datadog Lambda レイヤーをセットアップしました。Datadog Lambda レイヤーは、Datadog の関数から分散型トレースを表面化させるために必要です。

ここまでの手順を実行したら、Datadog Lambda レイヤーは既に有効化されています。Datadog Lambda レイヤーから送信されたカスタムメトリクスは自動的にディストリビューションとして作成されるため、すぐに avg、sum、 max、min、count をグラフ化できます。また、ディストリビューションメトリクスページで独自のパーセンタイルを有効にすることもできます。

{{< tabs >}}
{{< tab "Serverless Framework" >}}

関数からカスタムメトリクスを取り込むには

1. `serverless.yml` に `flushMetricsToLogs: true` が設定されていることを確認します。
2. 次の例に従ってコードをインスツルメントします (メトリクス値は数値でなければなりません)。

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
        lambda_metric(
            "coffee_house.order_value",             # メトリクス名
            12.45,                                  # メトリクス値
            tags=['product:latte', 'order:online']  # 関連付けられたタグ
        )
```

{{< /tab >}}
{{< tab "AWS コンソール" >}}

関数からカスタムメトリクスを取り込むには

1. AWS Lambda 環境変数 `DD_FLUSH_TO_LOG` が `true` に設定されていることを確認します。
2. 関数コードで、Lambda レイヤーから必要なメソッドをインポートし、関数ハンドラーのラッパーを追加します。

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

# You only need to wrap your function handler (Not helper functions). 
@datadog_lambda_wrapper
def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # メトリクススタック名
        12.45,                                  # メトリクス値
        tags=['product:latte', 'order:online']  # 関連付けられたタグ
    )
```

{{< /tab >}}
{{< /tabs >}}

メトリクスのモニターを作成すると、サーバーレスアプリケーションの主要な問題について通知を受けることができます。次に、Lambda 関数、データストア、メッセージキュー全体でメトリクス、トレース、ログを組み合わせることにより、このガイドで前述したように根本原因を特定できます。

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_7-compressed.mp4" video="true" alt="カスタムメトリクス"  style="width:90%;">}}

ユースケースに合わせて Lambda を設定する方法について詳しく知りたい場合は、[こちら][14]の AWS Lambda のドキュメントを参照してください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/screen/integration/98/aws-lambda
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml
[4]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[7]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer
[8]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[9]: https://docs.datadoghq.com/ja/logs/guide/lambda-logs-collection-troubleshooting-guide/
[10]: https://www.datadoghq.com/state-of-serverless/
[11]: https://docs.datadoghq.com/ja/integrations/amazon_dynamodb/#overview
[12]: https://docs.datadoghq.com/ja/integrations/amazon_sqs/#overview
[13]: https://docs.datadoghq.com/ja/integrations/amazon_step_functions/#overview
[14]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/