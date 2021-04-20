---
title: サーバーレスの請求
kind: documentation
---
## 概要

サーバーレス機能の呼び出しは [Datadog Pro および Enterprise プラン][1]で購入します。請求は、アカウントの 1 か月間の AWS Lambda 呼び出しの合計に基づきます。Pro および Enterprise プランには、請求対象の100万件の呼び出しごとに 150,000 件の Indexed Spans と 5 個のカスタムメトリクスが含まれます。アカウントにサーバーレスを追加する方法については、[営業担当者][2]または[カスタマーサクセスマネージャー][3]にお問い合わせください。

**注:** Datadog のサーバレスモニタリングで以前の請求モデルをご利用中のお客様で、呼び出しベースの請求モデルへの移行をご希望の場合は、担当の[カスタマーサクセスマネージャー][3]にお問い合わせください。

**注:** Analyzed Span は、2020 年 10 月 20 日の Tracing Without Limits のローンチに伴い、Indexed Span と改名しました。

## サーバーレス呼び出し

Datadog では、AWS Lambda 関数の呼び出し回数の合計を月末に計算し、請求が発生します。

サーバーレスの料金情報については、[Datadog の料金ページ][1]を参照してください。

## 使用量の追跡

[Datadog 使用量ページ][4]を確認すれば、アカウントの請求対象のサーバーレス呼び出しの数を追跡できます。過去 1 か月間の概要と、経時的な使用量の両方を確認できます。

Datadog が呼び出しを監視している関数を制御するには、[UI](#ui) を使用してタグでソートするか、[API](#api) を使用して特定の機能を除外します。

### UI

UI を使用して Datadog が監視する AWS Lambda 関数を制限するには、[AWS インテグレーションページ][5]に移動し、`key:value` セットとしてタグを **to Lambdas with tag:** フィールドに追加します。

特定のタグを持つ関数を除外するには、タグキーの前に `!` を追加します。例:

`!env:staging,!env:test1`

このフィルターは、`env:staging` または `env:test1` でタグ付けされたものをすべて除外します。

### API

API を使用して Datadog が監視する AWS Lambda 関数の上限を制限するには、[タグフィルターのドキュメント][6]を参照してください。

## トラブルシューティング

技術的な質問については、[Datadog サポートチーム][7]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][3]マネージャーにお問い合わせください。

[1]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /ja/api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /ja/help/