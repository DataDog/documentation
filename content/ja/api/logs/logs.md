---
title: ログ
type: apicontent
order: 22
external_redirect: '/api/#logs'
---
## ログ

<mark>Logs エンドポイントは、Datadog のクライアントライブラリでサポートされていません。この機能の使用を希望される場合は、[Datadog のサポートチーム][1]にお問い合わせください。</mark>

HTTP を使用して Datadog プラットフォームにログを送信します。HTTP リクエストごとの制限は以下のとおりです。

* ペイロード 1 つの最大コンテンツサイズ: 2MB
* ログ 1 つの最大サイズ: 256kB
* 複数のログを 1 つの配列で送信する場合の最大配列サイズ: 50 エントリ

**注**: Datadog EU サイト (`app.datadoghq.eu`) の場合、HTTP ログのエンドポイントは `http-intake.logs.datadoghq.eu` です。

[1]: /ja/help