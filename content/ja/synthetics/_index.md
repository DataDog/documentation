---
title: Synthetics
kind: documentation
description: 製品の最も重要な部分が世界各地で正常に稼働していることを確認します。
aliases:
  - /ja/integrations/synthetics/
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetics の紹介
  - link: synthetics/api_tests
    tag: Documentation
    text: APIテストの設定
  - link: synthetics/browser_tests
    tag: Documentation
    text: ブラウザーテストの設定
  - link: synthetics/identify_synthetics_bots
    tag: Documentation
    text: Synthetics ボットの特定
---
## 概要

Datadog Synthetics により、Datadog プラットフォームに新たな可視性を実現するレイヤーが追加されました。Synthetics では、ユーザーリクエストのシミュレーションとブラウザーのレンダリングを通してアプリケーションと API エンドポイントを監視することで、稼働時間を確保し、局所的な問題を特定して、アプリケーションのパフォーマンスを追跡できます。Synthetics をメトリクス、トレース、ログと統合することにより、Datadog はユーザーが経験しているとおりにすべてのシステムの動作状況を観察することができます。

{{< img src="synthetics/synthetics_home_page.png" alt="Synthetics home page" >}}

## 検索

高度な検索では、以下のチェック属性を組み合わせてチェックをクエリすることができます。

* `title` および `message` - テキスト検索
* `status` - アラート、データなし、Ok
* `creator`
* `region`
* `muted`
* `notification`
* `tags`

検索を実行するには、左側のチェックボックスまたは上部の検索バー、またはその両方を使用してクエリを作成します。チェックボックスをオンにすると、検索バーが更新され、そのクエリが表示されます。同様に、検索バーのクエリを変更すると (またはクエリを最初から記述すると)、チェックボックスが更新され、その変更が反映されます。クエリを編集すると、その結果がリアルタイムに更新されます。Search ボタンはありません。

### クエリの記述

すべてのチェック、タイトル、および通知メッセージから特定のテキストを検索するには、検索バーにテキストを入力します。

また、ブール演算子 (`AND`、`OR`、および `NOT`) とかっこを使用して、チェックフィールドを使用する複雑なクエリを記述することもできます。

* 正規表現はサポートされていません
* 単一文字のワイルドカード (`?`) はサポートされていませんが、通常のワイルドカード (`*`) はサポートされています
* 近接検索はサポートされていませんが、[fuzzy][1] 演算子はサポートされています
* 範囲はサポートされていません
* ブースティングはサポートされていません

また、`-`、`(`、`)`、`"`、`~`、`*`、`:`、`.`、およびスペースは予約されています。これらの文字を含むチェックフィールドを検索するには、そのフィールド文字列を引用符で囲みます。`status:("OK") AND "doc-check"` は有効なクエリ文字列ですが、`status:("OK") AND doc check` は有効ではありません。

## チェックの作成

[API tests][2] または[browser test][3]を作成するために、Syntheticsページの右上にある**Create a New check +** iを選択肢します。テストが失敗した場合、エンドポイントは再テストされません。稼働時間はエンドポイントを直接`down`と見なします。

{{< img src="synthetics/create_a_check.png" alt="Create a check"  style="width:80%;">}}

## メトリクス

以下のメトリクスはチェックによって生成されます。

{{< get-metrics-from-git "synthetics" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[2]: /ja/synthetics/api_tests
[3]: /ja/synthetics/browser_tests