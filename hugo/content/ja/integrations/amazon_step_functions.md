---
categories:
- cloud
- aws
- ログの収集
custom_kind: インテグレーション
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

このインテグレーションにより、AWS Step Functions の基本的なメトリクスを Datadog で確認できるようになります。トレーシングと拡張メトリクスについては、[Datadog Serverless Monitoring for AWS Step Functions][1] を参照してください。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。次に、AWS/Datadog ロールのポリシードキュメントに以下のアクセス許可を追加します。

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### メトリクスの収集

1. [AWS インテグレーションページ][3]の `Metric Collection` タブで、`States` が有効になっていることを確認します。ステートマシンが AWS Lambda を使用している場合は、`Lambda` がチェックされていることも確認してください。
2. [Datadog - AWS Step Functions インテグレーション][4]をインストールします。

#### AWS Lambda メトリクスの増強

Step Functions ステートが Lambda 関数である場合、このインテグレーションをインストールすると、Lambda メトリクスに[タグ][5] `statemachinename`、`statemachinearn`、`stepname` が追加されます。これにより、Lambda 関数がどのステートマシンに属しているかを確認でき、[サーバーレスページ][6]でこれを視覚化できます。

### メトリクス収集の強化

Datadog は、Step Functions の[拡張メトリクス][7]を生成して、個々のステップ時間の平均や p99 を追跡することもできます。これらの拡張メトリクスを利用するには、[Datadog Serverless Monitoring for AWS Step Functions][1] を参照してください。

### ログ収集

1. AWS Step Functions を [CloudWatch にログを送信する][8]ように構成します。**注**: Datadog がログのソースを識別し、自動的にパースするために、CloudWatch のロググループのデフォルトのプレフィックス `/aws/vendedlogs/states` を使用します。
2. [Datadog にログを送信します][9]。

### トレースの収集

トレース収集を有効にするには、[Datadog APM for AWS Step Functions][1] を利用する方法と、AWS X-Ray を利用する方法の二つがあります。

#### Datadog APM for AWS Step Functions を利用してトレースを有効にする

AWS Step Functions の分散型トレーシングを有効にするには、[Datadog Serverless Monitoring for AWS Step Functions][1] を参照してください。

#### AWS X-Ray によるトレースの有効化


<div class="alert alert-danger">このオプションは、<a href="https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics">AWS Step Functions の拡張メトリクス</a> を収集しません。これらのメトリクスを収集するには、<a href="https://docs.datadoghq.com/serverless/step_functions">Datadog APM for AWS Step Functions</a> を利用してトレースを有効にする必要があります。</div>

AWS X-Ray を利用して AWS Step Functions のトレースを収集するには

1. [Datadog AWS X-Ray インテグレーション][10]を有効にします。
1. AWS コンソールにログインします。
2. **Step Functions** にアクセスします。
3. Step Functions の 1 つを選択して、**Edit** をクリックします。
4. ページの下部にある **Tracing** セクションまでスクロールし、**Enable X-Ray tracing** チェックボックスをオンにします。
5. 推奨: より詳細なトレースを行うには、関数に [AWS X-Ray トレーシングライブラリをインストール][11]してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_step_functions" >}}


### イベント

AWS Step Functions インテグレーションには、イベントは含まれません。

### サービスチェック

AWS Step Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://docs.datadoghq.com/ja/serverless/step_functions
[2]: https://app.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-step-functions
[5]: https://app.datadoghq.com/tagging/
[6]: https://app.datadoghq.com/serverless/
[7]: https://docs.datadoghq.com/ja/serverless/step_functions/enhanced-metrics
[8]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[9]: https://app.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#log-collection
[10]: https://app.datadoghq.com/tracing/serverless_functions/enable_aws_xray
[11]: https://app.datadoghq.com/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[13]: https://app.datadoghq.com/help/