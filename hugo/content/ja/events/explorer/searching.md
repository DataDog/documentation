---
aliases:
- /ja/service_management/events/explorer/searching/
further_reading:
- link: /getting_started/search/
  tag: ドキュメント
  text: Datadog での検索の開始
- link: logs/explorer/search_syntax
  tag: ドキュメント
  text: ログ検索構文
title: 検索構文
---
## 概要 {#overview}

イベント検索では、[ログ検索構文][1] を使用します。ログ検索と同様に、イベント検索では次のことが許可されます。

- `AND`、`OR`、および `-` 演算子
- ワイルドカード
- エスケープ文字
- `key:value` を使用したタグとファセットの検索
- `@` プレフィックスを使用した属性内の検索

## クエリの例 {#example-queries}

`source:(github OR chef)`
: GitHub または Chef からのイベントを表示します。

`host:(i-0ade23e6 AND db.myapp.com)`
: `i-0ade23e6` および `db.myapp.com` からのイベントを表示します。

`service:kafka`
: `kafka` サービスからのイベントを表示します。

`status:error`
: `error` ステータスのイベントを表示します (: `emergency`、`alert`、`critical`、`error`、`warn`、`notice`、`info`、`debug`、`ok` をサポート)。

`availability-zone:us-east-1a`
: `us-east-1a` AWS アベイラビリティゾーン (AZ) のイベントを表示します。

`container_id:foo*`
: ID が `foo` で始まるすべてのコンテナからのイベントを表示します。

`@evt.name:foo`
: 属性 `evt.name` が `foo` に等しいイベントを表示します。

詳細については、[ログ検索構文][1] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search_syntax/