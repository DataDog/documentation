---
categories:
- cloud
- aws
- ログの収集
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

## 計画と使用

### インフラストラクチャーリスト

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

### 収集データ

1. AWS Step Functions を [CloudWatch にログを送信する][6]ように構成します。**注**: Datadog がログのソースを識別し、自動的にパースするために、CloudWatch のロググループのデフォルトのプレフィックス `/aws/vendedlogs/states` を使用します。
2. [Datadog にログを送信します][7]。

### トレースの収集

#### AWS X-Ray トレーシングを有効にする

AWS Step Functions の分散型トレーシングを有効にするには

1. [Datadog AWS X-Ray インテグレーション][8]を有効にします。
1. AWS コンソールにログインします。
2. **Step Functions** にアクセスします。
3. Step Functions の 1 つを選択して、**Edit** をクリックします。
4. ページの下部にある **Tracing** セクションまでスクロールし、**Enable X-Ray tracing** チェックボックスをオンにします。
5. 推奨: より詳細なトレースを行うには、関数に [AWS X-Ray トレーシングライブラリをインストール][9]してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_step_functions" >}}


### ヘルプ

AWS Step Functions インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Step Functions インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: /ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-step-functions
[4]: /ja/tagging/
[5]: /ja/serverless/
[6]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[7]: /ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[8]: /ja/tracing/serverless_functions/enable_aws_xray
[9]: /ja/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[11]: /ja/help/