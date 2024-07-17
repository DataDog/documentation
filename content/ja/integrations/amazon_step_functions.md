---
categories:
- cloud
- aws
- ログの収集
custom_kind: integration
dependencies: []
description: AWS Step Functions のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_step_functions/
draft: false
git_integration_title: amazon_step_functions
has_logo: true
integration_id: ''
integration_title: AWS Step Functions
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_step_functions
public_title: Datadog-AWS Step Functions インテグレーション
short_description: AWS Step Functions のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Step Functions では、ビジュアルなワークフローを使用して、分散アプリケーションおよびマイクロサービスのコンポーネントを調整できます。

このインテグレーションを有効にすると、Datadog にすべての Step Functions メトリクスを表示できます。

<div class="alert alert-warning">Datadog のネイティブ AWS Step Function モニタリングは、公開ベータ版で利用可能です。強化されたメトリクスとトレースで Step Function をインスツルメンテーションするには、<a href="https://docs.datadoghq.com/serverless/step_functions">サーバーレスのドキュメント<a>をご覧ください。</div>

## Setup

### Installation

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。次に、AWS/Datadog ロールのポリシードキュメントに以下のアクセス許可を追加します。

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### メトリクスの収集

1. [AWS インテグレーションページ][2]の `Metric Collection` タブで、`States` を有効にします。ステートマシンが AWS Lambda を使用している場合は、`Lambda` がチェックされていることも確認してください。
2. [Datadog - AWS Step Functions インテグレーション][3]をインストールします。

#### AWS Lambda メトリクスの増強

Step Functions ステートが Lambda 関数である場合、このインテグレーションをインストールすると、Lambda メトリクスに[タグ][4] `statemachinename`、`statemachinearn`、`stepname` が追加されます。これにより、Lambda 関数がどのステートマシンに属しているかを確認でき、[サーバーレスページ][5]でこれを視覚化できます。

### メトリクス収集の強化

Datadog は、Step Functions のメトリクスを生成して、個々のステップ時間の平均や p99 を追跡することもできます。[AWS Step Functions の拡張メトリクス][6]を収集するには、Datadog APM を使用する必要があります。

### Log collection

1. AWS Step Functions を [CloudWatch にログを送信する][7]ように構成します。**注**: Datadog がログのソースを識別し、自動的にパースするために、CloudWatch のロググループのデフォルトのプレフィックス `/aws/vendedlogs/states` を使用します。
2. [Datadog にログを送信します][8]。

### Trace collection

トレース収集を有効にするには、Datadog APM for Step Functions を利用する方法と、AWS X-Ray を利用する方法の二つがあります。

#### Datadog APM for AWS Step Functions を利用してトレースを有効にする

<div class="alert alert-warning">
この機能は公開ベータ版です。
</div>
AWS Step Functions の分散型トレーシングを有効にするには、[サーバーレスのドキュメント][9]のインストール手順を参照してください。



#### AWS X-Ray を利用してトレースを有効にする



<div class="alert alert-warning">このオプションは、<a href="https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics">AWS Step Functions の拡張メトリクス</a> を収集しません。これらのメトリクスを収集するには、<a href="https://docs.datadoghq.com/serverless/step_functions">Datadog APM for AWS Step Functions</a> を利用してトレースを有効にする必要があります。</div>

AWS X-Ray を利用して AWS Step Functions のトレースを収集するには

1. [Datadog AWS X-Ray インテグレーション][10]を有効にします。
1. Log in to the AWS Console.
2. Browse to **Step Functions.**
3. Select one of your Step Functions and click **Edit.**
4. Scroll to the **Tracing** section at the bottom of the page and check the box to **Enable X-Ray tracing.**
5. 推奨: より詳細なトレースを行うには、関数に [AWS X-Ray トレーシングライブラリをインストール][11]してください。

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_step_functions" >}}


### Events

The AWS Step Functions integration does not include any events.

### Service Checks

The AWS Step Functions integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][13].

[1]: /ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-step-functions
[4]: /ja/tagging/
[5]: /ja/serverless/
[6]: https://docs.datadoghq.com/ja/serverless/step_functions/enhanced-metrics
[7]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[8]: /ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[9]: https://docs.datadoghq.com/ja/serverless/step_functions
[10]: /ja/tracing/serverless_functions/enable_aws_xray
[11]: /ja/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[13]: /ja/help/