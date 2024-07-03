---
further_reading:
- link: logs/explorer/search_syntax
  tag: ドキュメント
  text: ログ検索構文
kind: ドキュメント
title: 検索構文
---

## 概要

イベント検索は[ログ検索構文][1]を使用します。ログ検索と同様に、イベント検索は以下を許可します。

- `AND`、`OR`、および `-` 演算子
- ワイルドカード
- エスケープ文字
- `key:value` でタグとファセットを検索する
- `@` プレフィックスで属性内を検索する

## クエリの例

`source:(github OR chef)`
: GitHub または Chef からのイベントを表示します。

`host:(i-0ade23e6 AND db.myapp.com)`
: `i-0ade23e6` および `db.myapp.com` からのイベントを表示します。

`service:kafka`
: `kafka` サービスからのイベントを表示します。

`status:error`
: `error` ステータスのイベントを表示します (サポートされるステータス: `error`、`warning`、`info`、`ok`)。

`availability-zone:us-east-1a`
: `us-east-1a` AWS アベイラビリティーゾーン (AZ) でイベントを表示します。

`container_id:foo*`
: ID が `foo` で始まるすべてのコンテナからのイベントを表示します。

`@evt.name:foo`
: 属性 `evt.name` が `foo` と等しいイベントを表示します。

詳細については、[ログ検索構文][1]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search_syntax/