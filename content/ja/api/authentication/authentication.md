---
title: Authentication
type: apicontent
order: 2
external_redirect: /api/#authentication
---

## Authentication

Datadog の API へのすべてのリクエストに認証が必要です。データ書き込みリクエストには、レポートアクセス権と `API キー`が必要です。データ読み取りリクエストには、フルアクセス権のほかに`アプリケーションキー`も必要です。

**注**: すべての Datadog API クライアントは、Datadog US サイト API を使用するようにデフォルトで構成されています。Datadog EU サイトにいる場合、環境変数 `DATADOG_HOST` を `https://api.datadoghq.eu` に変更するか、クライアントの作成時にこの値を直接上書きします。

[アカウントの API とアプリケーションキーはこちらで管理できます][1]。

[1]: https://app.datadoghq.com/account/settings#api
