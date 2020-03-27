---
title: メトリクスの検索
type: apicontent
order: 26.6
external_redirect: '/api/#search-metrics'
---
## メトリクスの検索

このエンドポイントを使用して、Datadog にある過去 24 時間のメトリクスを検索できます。

**引数**:

* `q` [必須]:
  メトリクスを検索するクエリ文字列。
  先頭に `metrics:` を付ける必要があります。

**注**: ホスト名をクエリ検索する場合は接頭辞 `host:` もサポートされますが、これは推奨されません。代替として[ホスト検索エンドポイント][1]の利用をお勧めします。
[1]: /ja/api/?lang=bash#search-hosts