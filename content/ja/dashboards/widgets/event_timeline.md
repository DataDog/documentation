---
title: イベントタイムラインウィジェット
kind: documentation
description: イベントストリームのタイムラインをウィジェットに表示する
aliases:
  - /ja/graphing/widgets/event_timeline/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
イベントタイムラインは、[イベントストリームビュー][1]の上部に表示されるタイムラインのウィジェット版です。

{{< img src="dashboards/widgets/event_timeline/event_timeline.png" alt="イベントのタイムラインの例"  >}}

## セットアップ

{{< img src="dashboards/widgets/event_timeline/event_timeline_setup.png" alt="イベントのタイムラインの例"  style="width:80%;">}}

### コンフィギュレーション

1. [検索クエリ][1]を入力して、イベントストリームを絞り込みます。
2. スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

イベントタイムラインウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/