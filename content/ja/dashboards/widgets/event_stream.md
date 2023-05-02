---
aliases:
- /ja/graphing/widgets/event_stream/
description: イベントストリームからイベントを絞り込んで表示する
further_reading:
- link: /events/explorer/
  tag: ドキュメント
  text: イベントエクスプローラー
- link: /ja/dashboards/graphing_json/
  tag: Documentation
  text: JSON を使用したダッシュボードの構築
- link: /dashboards/graphing_json/widget_json/
  tag: Documentation
  text: ウィジェット JSON スキーマ
- link: /dashboards/graphing_json/request_json/
  tag: Documentation
  text: リクエスト JSON スキーマ
kind: documentation
title: イベントストリームウィジェット
---

イベントストリームは、[Event Explorer ビュー][1]に表示されるイベントストリームのウィジェット版です。

**注**: このウィジェットには、直近の 100 イベントだけが表示されます。

## セットアップ

### コンフィギュレーション

1. [検索クエリ][2]を入力して、イベントストリームを絞り込みます。
1. Size パラメーターを使用して、イベントタイトルのみを表示するか、イベント本文全体を表示するかを選択します。
1. ウィジェットにカスタムタイムフレームがあるか、グローバルタイムフレームがあるかを選択します。
1. グラフにタイトルをつけます。

## API

このウィジェットは、[Dashboards API][3] で使用することができます。

イベントストリームウィジェット専用の[ウィジェット JSON スキーマ定義][4]は次に従います。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/
[2]: /ja/events/explorer/#search-syntax
[3]: /ja/api/latest/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/