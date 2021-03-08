---
title: サーバーレスの請求
kind: documentation
---
## 概要

サーバーレス機能は [Datadog Pro および Enterprise プラン][1]で購入します。請求は、アカウントの 1 か月間の 1 時間あたりの平均機能数に基づきます。Pro および Enterprise プランには、請求対象の機能ごとに 15 万個の Indexed Spans と 5 個のカスタムメトリクスが含まれます。アカウントにサーバーレスを追加する方法の詳細については、[営業担当者][2]または[カスタマーサクセスマネージャー][3]にお問い合わせください。

**注:** Analyzed Span は、2020 年 10 月 20 日の Tracing Without Limits のローンチに伴い、Indexed Span と改名しました。

## サーバーレス関数

1 時間ごとに、Datadog は 1 回以上実行され、Datadog アカウントによって監視された機能の数を記録します。月末に、Datadog は、記録された機能の 1 時間ごとの数の平均を計算することにより課金します。

請求される機能の数は、1 時間ごとの平均的な測定のため、ほとんどの場合、サーバーレスページまたは AWS コンソールに表示される数よりも大幅に少なくなります。まれにしか実行されない機能は請求に影響を与える可能性が低く、またトラフィックの急激な増加によって余分な費用がかかることもありません。

サーバーレスの料金情報については、[Datadog の料金ページ][1]のインフラストラクチャーセクションを参照してください。

## 使用量の追跡

[Datadog 使用量ページ][4]を確認すれば、アカウントの請求対象のサーバーレス機能の数を追跡できます。過去 1 か月間の概要と、経時的な使用量の両方を確認できます。

Datadog が監視している機能の数を制御するには、[UI](#ui) を使用してタグでソートするか、[API](#api) を使用して特定の機能を除外します。

### UI

UI を使用して Datadog が監視している機能の上限を制御するには、[AWS インテグレーションページ][5]に移動し、`key:value` セットとしてタグを **to Lambdas with tag:** フィールドに追加します。

特定のタグを持つ関数を除外するには、タグキーの前に `!` を追加します。例:

`!env:staging,!env:test1`

このフィルターは、`env:staging` または `env:test1` でタグ付けされたものをすべて除外します。

### API

AWS API は、米国サイトのエンドポイントでのみサポートされています。

**現在のタグフィルタールールの一覧表示**:

```shell
curl -X GET 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<API_キー>&application_key=<アプリケーションキー>' --data '{"account_id": "<AWS_アカウント_ID>"}'

>{"filters":[{"tag_filter_str":"!copper:educated","namespace":"application_elb"}]}
```

**ネームスペースのタグフィルタールールの設定**: ネームスペースオプションは、`"application_elb"`、`"elb"`、`"lambda"`、`"network_elb"`、`"rds"`、`"sqs"`、`"custom"` です。

```shell
curl -X POST 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<API_キー>&application_key=<アプリケーションキー>' --data '{"account_id": "<AWS_アカウント_ID>", "namespace": "application_elb", "tag_filter_str": "!copper:educated"}'  -H "Content-Type: text/plain"
```

**ネームスペースのタグフィルタールールの削除**:

```shell
curl -X DELETE 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<API_キー>&application_key=<アプリケーションキー>'  --data '{"account_id": "<AWS_アカウント_ID>","namespace":"<ネームスペース>"}'
```

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][6]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][3]マネージャーにお問い合わせください。

[1]: https://www.datadoghq.com/pricing/#section-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /ja/help/