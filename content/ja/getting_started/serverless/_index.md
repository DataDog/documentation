---
further_reading:
- link: /agent/basic_agent_usage/
  tag: ドキュメント
  text: 基本的な Agent の利用方法
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: サーバーレスモニタリングについて詳しく知ることができるインタラクティブなセッションに参加できます
kind: documentation
title: AWS Lambda サーバーレスモニタリングの概要
---

## 概要

サーバーレスとは、開発者が自分でインフラストラクチャーを管理するのではなく、クラウドプロバイダーを使ってアプリケーションやサービスを構築し、実行するモデルです。Datadog [サーバーレスモニタリング][1]は、サーバーレスインフラクチャーからメトリクス、ログ、トレースを収集し、アプリケーションの健全性とパフォーマンスを監視することを可能にします。

このガイドでは、ワンクリックで起動できるサーバーレスの[サンプルアプリ][2]を利用します。このアプリには、サーバーレスモニタリングがあらかじめ構成されています。このガイドに従って、サンプルアプリの問題をどのようにトラブルシューティングするか、また、サーバーレスモニタリングがどのような可視性を提供できるかを確認します。

### サンプルアプリをインストールする

1. [CloudFormation Stack を起動します][3]。このリンクから **Create stack** ページが表示されます。
2. [Datadog API キー][4] と [Datadog サイト][5]を入力します ({{< region-param key="dd_site" code="true" >}})。

  {{< img src="getting_started/serverless/aws_create_stack.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

   次に、IAM 機能を確認し、**Create Stack** をクリックします。

3. スタック作成後、Outputs タブを開きます。

  {{< img src="getting_started/serverless/aws_outputs.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

  `ApiGatewayInvokeURL` にアクセスして、サンプルアプリを数回起動します。すると、"Sent message to SNS" という成功メッセージが返ってきます。

各呼び出しは以下のように実行されます。

```python
import boto3, os

def handler(event, context):
    sns = boto3.client('sns')

    sns.publish(
        TopicArn=os.environ.get("SNS_TOPIC_ARN"),
        Message='Message sent to SNS'
        )

    return {
        "body": "Sent message to SNS",
        "statusCode": 200
    }
```

[サーバーレスビューでサンプルアプリの関数を見る][6]ことができます。

{{< img src="getting_started/serverless/serverless_view_2024.png" alt="サーバーレスモニタリング: エクスプローラーページ「サーバーレスビュー」" style="width:80%;">}}

## サーバーレスビュー

サーバーレスビューは、AWS 環境内のすべてのサーバーレスリソースからのテレメトリーを表示します。このページは、アプリケーションの監視、デバッグ、最適化のための出発点として使用できます。

サンプルアプリを一度でも起動したことがあれば、`datadog-sample-entry-function` と `datadog-sample-sqs-consumer-function` が表示されるはずです。

{{< img src="getting_started/serverless/functions_view.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

### サーバーレスインサイト
サーバーレスビューでは、一番右の列に ** Insights** というタイトルがあります。Datadog は、サーバーレスアプリケーションの[高エラー][7]や[高継続時間][8]などの潜在的な問題を自動的にハイライトし、これらの問題は Insights 列に表示されます。

サーバーレスサンプルアプリケーションについて、Datadog は[コールドスタート][9]を検出した可能性が高いです。コールドスタートは、サーバーレスアプリケーションがトラフィックの急激な増加を受け取ったときに発生します。これは、関数が以前は比較的一定の数のリクエストを受け取っていたのに、突然、より多くのリクエストを受け取るようになった場合や、このケースのように、関数が以前は非アクティブで、初めて呼び出された場合に発生する可能性があります。

## 調査するためのエラーを作成する

サンプルアプリのスタックにある `datadog-sample-entry-function` を編集することで、意図的にエラーを発生させることができます。

```python
  # エントリー Lambda 関数コード
  def handler(event, context):

    raise Exception('Throw an error.')
```

{{< img src="getting_started/serverless/aws_error.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}


この変更をデプロイして、サンプルアプリを再度起動し、Datadog でこのエラーを調査する方法を確認します。

{{< img src="getting_started/serverless/dd_serverless_view_error.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

`datadog-sample-entry-function` には 5 つのエラーがあることに注意してください。

## 関数の詳細
関数をクリックすると、呼び出しや最近のデプロイメントに関する詳細が表示されます。

{{< img src="getting_started/serverless/details_error.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

上図のように、詳細ビューには3つのグラフが表示されます。これらは、利用可能な任意のメトリクスを表示するように設定できます。デフォルトでは、3 つの[拡張 Lambda メトリクス ][10]: 呼び出し、エラー、継続時間が表示されます。

Datadog は、低レイテンシー、数秒単位の粒度、コールドスタートやカスタムタグの詳細なメタデータを備えた拡張 Lambda メトリクスをすぐに生成します。また、デフォルトの[拡張 Lambda メトリクスダッシュボード][11]を表示することができます。


### Invocations
**Invocations** タブには、関数の最新の呼び出しが表示されます。

各呼び出しは、トレースと関連付けられています。**Open Trace** をクリックすると、各呼び出しのトレースが表示されます。

{{< img src="getting_started/serverless/dd_flame_graph.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

**Flame Graph** タブには、実行時間全体の中で最も高い割合を占めたサービスを含め、この呼び出しの間に何が起こったかを正確に表示します。フレームグラフは、リクエストが APIGateway から `datadog-sample-entry-function` を経て、SNS、SQS、そして最後に `datadog-sample-sqs-function` を通過したときの様子を表示します。

{{< img src="getting_started/serverless/trace_map.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

**Trace Map** タブでは、サービスの流れや相互の接続を視覚化することができます。

詳細トレースビューの下半分には、スタックトレースが表示され、エラーをスローしたコードの行が明らかにされます。

```
Traceback (most recent call last):
  File /opt/python/lib/python3.9/site-packages/datadog_lambda/wrapper.py, line 142, in __call__
    self.response = self.func(event, context, **kwargs)
File /var/task/index.py, line 17, in handler
    raise Exception('Throw an error.')
Exception: Throw an error.
```

その下で、Lambda のリクエストとレスポンスのペイロードを調べることもできます。Datadog は、Lambda の起動ごとにイベントペイロードを収集します。

### ログ管理

サーバーレスのサンプルアプリは、デフォルトでログが有効になっています。各関数のログは、その **Logs** タブで見ることができます。

{{< img src="getting_started/serverless/dd_logs_view.png" alt="2 つの関数のクローズアップ" style="width:80%;">}}

これらのログをフィルタリングしてエラーだけを表示したり、[ログエクスプローラー][12]で表示したりすることができます。


[1]: /ja/serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-serverless-sample-app&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-sample-app/latest.yaml
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/ja/getting_started/site
[6]: https://app.datadoghq.com/functions?cloud=aws&text_search=datadog-serverless-sample-app
[7]: https://docs.datadoghq.com/ja/serverless/guide/insights/#high-errors
[8]: https://docs.datadoghq.com/ja/serverless/guide/insights/#high-duration
[9]: https://docs.datadoghq.com/ja/serverless/guide/insights/#cold-starts
[10]: https://docs.datadoghq.com/ja/serverless/enhanced_lambda_metrics
[11]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[12]: https://docs.datadoghq.com/ja/logs/explorer/