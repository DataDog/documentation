---
title: Serverless Billing
---

## 使用量の管理

Datadog 使用量ページを確認すれば、アカウントの請求対象およびサーバーレス使用量の合計を追跡できます。過去 1 か月間の概要と、経時的な使用量の両方を確認できます。

Datadog サーバーレスモニタリングは、Datadog 内で追跡・監視されている呼び出しとアクティブな Lambda 関数の組み合わせに基づいて請求されます。プランに基づく関連メトリクスは、Plan and Usage ページの Serverless タブにある[課金フィルター][1]で確認できます。プランと使用量の詳細については、[カスタマーサクセス][3]マネージャーにお問い合わせください。

Lambda 関数は、[Datadog AWS インテグレーション][10]を通して、または [Lambda 拡張機能][11]や [Forwarder][12] レイヤーで直接インストルメンテーションを行い監視することが可能です。

## インテグレーション

インテグレーションを通じて監視する関数を制御するには、[Lambda インテグレーション][13]のメトリクス収集コントロールを UI と API を通じて使用できます。

### UI

UI を使用して、Datadog が監視している AWS Lambda 関数を制御するには、[AWS インテグレーションページ][5]に移動します。左サイドバーから、関連する AWS アカウントを選択し、**Metric Collection タブ**に移動します。**Limit Metric Collection to Specific Resources** までスクロールダウンし、**Select AWS Service** のドロップダウンから Lambda を選択します。次に、右側のフィールドに `key:value` セットとしてタグを追加できます。

このフィールドでのタグの使い方については、以下の[タグ](#Tags)のセクションを参照してください。

### API

API を使用して Datadog が監視する AWS Lambda 関数を制限するには、[API タグフィルターのドキュメント][6]を参照してください。

### タグ

Datadog は、`key:value` の形式でタグのカンマ区切りのリストを受け付けます。このリストは、関連する AWS サービスからメトリクスを収集する際に使用されるフィルターを定義します。これらの `key:value` のペアは、タグを許可することも除外することもできます。除外を示すには、タグキーの前に `!` を追加します。また、`?` (1文字) や `*` (複数文字) などのワイルドカードを使用することもできます。

このフィルターは、許可されたすべてのタグがないリソース、つまり、許可されたタグのリストが "OR" ステートメントを形成するリソースのみを除外します。

例: `datadog:monitored,env:production`

このフィルターは、`datadog:monitored` または `env:production` というタグを含む EC2 インスタンスのみを収集します。

リストに除外タグを追加すると、それが優先されます。つまり、除外タグを追加すると、"AND" ステートメントが追加されます。

例: `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

このフィルターは、`datadog:monitored` タグまたは `env:production` タグまたは `c1.*` 値を持つインスタンスタイプタグを含み、かつ `region:us-east-1` タグでない EC2 インスタンスのみを収集します。

## インスツルメンテーション

Datadog は、[Lambda 拡張機能][14]と複数の異なる Lambda Layer を提供し、ランタイムに基づいて関数をトレースおよび監視することができます。これらのライブラリでインスツルメンテーションおよびモニタリングされたアクティブな関数は、AWS インテグレーションが無効になっている場合も含め、請求対象となる使用量が発生します。

Datadog は、これらのライブラリのインストールや構成を管理するためのツールを複数提供しています。これらを使用することで、Datadog の Lambda ライブラリのインストールや管理をスケールして自動化することができます。詳細については、[AWS Lambda のサーバーレスモニタリングのインストール][15]を参照してください。

## アクティブ関数の定義

請求は、アカウントの 1 か月間の 1 時間あたりの平均関数の数に基づきます。Datadog では、1 回以上実行された、Datadog アカウントで監視されている関数の数を 1 時間ごとに記録します。月末に、記録された関数の時間当たり平均数が算出され、請求に反映されます。Pro プランと Enterprise プランには、請求対象関数ごとに 5 つのカスタムメトリクスが含まれています。単一の請求対象の関数は、一意の関数 ARN によって定義されます。Lambda@Edge 関数の場合、異なるリージョン内の各関数は、個別の請求対象の関数としてカウントされます。

サーバーレス APM の請求は、ある月の APM 取り込みスパンに接続された AWS Lambda の呼び出しの合計に基づきます。また、月末に Datadog APM サービスに送信された[インデックス化スパン][4]の合計がバンドル数量を超えた場合、請求されます。サーバーレス利用時に請求対象となる [APM ホスト][4]はありません。

## トラブルシューティング

技術的なご質問は、[Datadog サポート][7]までご連絡ください。
請求の詳細、またはプランや使用量に関するお問い合わせについては、[カスタマーサクセス][3]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/billing/usage?category=serverless&data_source=billable
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /help/
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/metric/explorer?exp_metric=aws.lambda.invocations&exp_group=functionname&exp_agg=sum
[10]: /integrations/amazon_billing/
[11]: /serverless/libraries_integrations/extension/
[12]: /logs/guide/forwarder/
[13]: /integrations/amazon_lambda/
[14]: /serverless/aws_lambda
[15]: /serverless/installation/

