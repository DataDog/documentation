---
aliases:
- /ja/graphing/widgets/event_timeline/
description: イベントストリームのタイムラインをウィジェットに表示する
further_reading:
- link: /events/explorer/
  tag: ドキュメント
  text: イベントエクスプローラー
- link: /dashboards/widgets/event_stream/
  tag: Documentation
  text: イベントストリームウィジェット
- link: /ja/dashboards/graphing_json/
  tag: Documentation
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: イベントタイムラインウィジェット
---

イベントタイムラインは、[イベントエクスプローラービュー][1]の上部に表示されるタイムラインのウィジェット版です。

{{< img src="dashboards/widgets/event_timeline/event_timeline_example.png" alt="過去 2 日間の Error ステータスのイベントタイムライン" >}}

## セットアップ

### コンフィギュレーション

1. [検索クエリ][1]を入力して、イベントストリームを絞り込みます。
2. ウィジェットにカスタムタイムフレームがあるか、ダッシュボードのグローバルタイムフレームがあるかを選択します。

## API

このウィジェットは、[Dashboards API][2] で使用することができます。

イベントタイムラインウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/