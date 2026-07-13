---
aliases:
- /ja/logs/explore
- /ja/logs/patterns
- /ja/logs/graph
- /ja/logs/analytics
- /ja/logs/explorer/list
- /ja/logs/explorer/patterns
- /ja/logs/explorer/transactions/
description: すべてのログを検索し、ログ分析を実行します
further_reading:
- link: logs/explorer/live_tail
  tag: ドキュメント
  text: Live Tail でログをプレビューする
- link: logs/explorer/saved_views/
  tag: ドキュメント
  text: ログエクスプローラーの自動構成
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: ログエクスプローラーの URL をクリップボードに追加する
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: ブログ
  text: Amazon VPC フローログを Amazon Kinesis Data Firehose と Datadog に送信する
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: ブログ
  text: AI を活用したログパースで調査を加速
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: ラーニングセンター
  text: ログエクスプローラーの概要
title: ログエクスプローラー
---
## 概要 {#overview}

[**ログエクスプローラー**][1]は、ログのトラブルシューティングと調査のホームベースです。ゼロから開始する場合でも、[保存ビュー][2]から開始する場合でも、モニター通知やダッシュボードウィジェットなどの他のコンテキストからここに到達する場合でも、ログエクスプローラーではログを検索、フィルター、グループ化、視覚化、エクスポートすることができます。

{{< img src="/logs/explore.png" alt="取り込んだログを探索する" style="width:100%;">}}

## 検索とフィルター {#search-and-filter}

ログを{{< ui >}}Search{{< /ui >}}および{{< ui >}}Filter{{< /ui >}}して、現在の関心に合わせて調整されたログのサブセットに焦点を絞り、拡大、またはシフトします。

  - ログエクスプローラーでのログの検索については、[ログの検索][3]をお読みください。
  - ログエクスプローラーでクエリを作成し、ファセットを使用するには、[ログ検索構文][4]をお読みください。
  - [Watchdog Insights][9] が、検索コンテキスト内の異常なログやエラーログの外れ値を表面化する方法については、[Watchdog Insights for Logs][5] をお読みください。

## 分析 {#analyze}

情報を取得または統合するために、クエリされたログをフィールド、パターン、トランザクションなどの上位レベルのエンティティに{{< ui >}}Group{{< /ui >}}します。

パターンの特定やイベントのサブセットによるログの集計を始めるには、[Log Analytics][6] をご覧ください。

## 視覚化 {#visualize}

フィルターや集計の結果を{{< ui >}}Visualize{{< /ui >}}することで、ログをより理解し、決定的な情報を収集することができます。たとえば、ログをリストで表示してログデータを列で整理したり、時系列グラフでログデータを時系列で測定したりすることができます。

ログエクスプローラーでログデータの視覚化を開始するには、[ログの視覚化][7]を参照してください。

## エクスポート {#export}

また、ログエクスプローラーのビューを{{< ui >}}export{{< /ui >}}して、後で、または別のコンテキストで再利用することもできます。

ログのクエリや視覚化したデータをエクスポートする方法については、[ログのエクスポート][8]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /ja/logs/explorer/saved_views/
[3]: /ja/logs/explorer/search
[4]: /ja/logs/explorer/search_syntax/
[5]: /ja/logs/explorer/insights
[6]: /ja/logs/explorer/analytics
[7]: /ja/logs/explorer/visualize
[8]: /ja/logs/explorer/export
[9]: /ja/watchdog/insights