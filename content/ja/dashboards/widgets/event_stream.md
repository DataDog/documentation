---
title: イベントストリームウィジェット
kind: documentation
description: イベントストリームからイベントを絞り込んで表示する
aliases:
  - /ja/graphing/widgets/event_stream/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
{{< site-region region="us" >}}

イベントストリームは、[イベントストリームビュー][1]に表示されるイベントストリームのウィジェット版です。

注: **このウィジェットには、直近の 100 イベントだけが表示されます**。

{{< img src="dashboards/widgets/event_stream/event_stream.png" alt="イベントストリーム" >}}

## セットアップ

{{< img src="dashboards/widgets/event_stream/event_stream_setup.png" alt="イベントストリームのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. [検索クエリ][1]を入力して、イベントストリームを絞り込みます。
2. スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。
3. Size パラメーターを使用して、イベントタイトルのみを表示するか、イベント本文全体を表示するかを選択します。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

イベントストリームウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

[1]: /ja/events/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/
[4]: /ja/events/#event-explorer

{{< /site-region >}}

{{< site-region region="eu" >}}

イベントストリームは、[イベントストリームビュー][1]に表示されるイベントストリームのウィジェット版です。

注: **このウィジェットには、直近の 100 イベントだけが表示されます**。

{{< img src="dashboards/widgets/event_stream/event_stream.png" alt="イベントストリーム" >}}

## セットアップ

{{< img src="dashboards/widgets/event_stream/event_stream_setup.png" alt="イベントストリームのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. [検索クエリ][1]を入力して、イベントストリームを絞り込みます。
2. スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。
3. Size パラメーターを使用して、イベントタイトルのみを表示するか、イベント本文全体を表示するかを選択します。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

イベントストリームウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

[1]: /ja/events/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/
[4]: /ja/events/#event-explorer

{{< /site-region >}}

{{< site-region region="gov" >}}

イベントストリームは、[Event Explorer ビュー][4]に表示されるイベントストリームのウィジェット版です。

## セットアップ

### コンフィギュレーション

1. [検索クエリ][4]を入力して、イベントストリームを絞り込みます。
2. スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。
3. Size パラメーターを使用して、イベントタイトルのみを表示するか、イベント本文全体を表示するかを選択します。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

イベントストリームウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

[1]: /ja/events/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/
[4]: /ja/events/#event-explorer

{{< /site-region >}}

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/
[4]: /ja/events/#event-explorer