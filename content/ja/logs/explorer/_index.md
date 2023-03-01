---
aliases:
- /ja/logs/explore
- /ja/logs/patterns
- /ja/logs/graph
- /ja/logs/analytics
- /ja/logs/explorer/list
- /ja/logs/explorer/patterns
- /ja/logs/explorer/analytics
- /ja/logs/explorer/transactions/
description: すべてのログを検索し、ログ分析を実行します
further_reading:
- link: logs/explorer/live_tail
  tag: Documentation
  text: ライブテールでログをプレビューする
- link: logs/explorer/saved_views/
  tag: Documentation
  text: ログエクスプローラーの自動構成
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: ログエクスプローラーの URL をクリップボードに追加する
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: ブログ
  text: Amazon VPC フローログを Amazon Kinesis Data Firehose と Datadog に送信する
kind: documentation
title: ログエクスプローラー
---

## 概要

[**ログエクスプローラー**][1]は、ログのトラブルシューティングと調査のホームベースです。ゼロから開始する場合でも、[保存ビュー][2]から開始する場合でも、モニター通知やダッシュボードウィジェットなどの他のコンテキストからここに到達する場合でも、ログエクスプローラーは繰り返し検索とフィルター処理、グループ化、視覚化、エクスポートを行います。


### 検索とフィルター

ログを**検索**および**フィルター**して、現在の関心に合わせて調整されたログのサブセットに焦点を絞り、拡大、またはシフトします。

  - ログエクスプローラーでのログの検索については、[ログの検索に関する資料][3]を参照してください。
  - ログエクスプローラーでクエリを作成し、ファセットを使用するには、[ログ検索構文ドキュメント][4]をお読みください。
  - Watchdog Insights が検索コンテキスト内で異常なログを表示する方法の詳細については、[ログ異常検出のドキュメント][5]をお読みください。

### グループ

情報を取得または統合するために、クエリされたログを上位レベルのエンティティに**グループ化**します。パターンの識別とイベントのサブセットによるログの集計を開始するには、[グループログのドキュメント][6]を参照してください。

### 視覚化

フィルタと集計の結果を**視覚化**して、ログを正しい視点に置き、決定的な情報をバブルアップします。たとえば、ログをリストで表示したり、ログデータを列に整理したり、時系列で表示したりして、ログデータを経時的に測定します。ログエクスプローラーでログデータの視覚化を開始するには、[ログ視覚化のドキュメントの作成][7]を参照してください。

### エクスポート

また、ログエクスプローラーのビューを**エクスポート**して、後で、または別のコンテキストで再利用することができます。[ログのエクスポートに関するドキュメント][8]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /ja/logs/explorer/saved_views/
[3]: /ja/logs/explorer/search
[4]: /ja/logs/explorer/search_syntax/
[5]: /ja/logs/explorer/insights
[6]: /ja/logs/explorer/group
[7]: /ja/logs/explorer/visualize
[8]: /ja/logs/explorer/export