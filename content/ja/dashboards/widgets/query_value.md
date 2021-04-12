---
title: クエリ値ウィジェット
kind: documentation
description: 1 つのメトリクスクエリの集計値を表示する
aliases:
  - /ja/graphing/widgets/query_value/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
クエリ値は、1 つのメトリクス、APM、またはログクエリの現在の値を表示します。値は条件付き書式 (緑/黄/赤色の背景など) を使用して表示され、値が期待される範囲内にあるかどうかを示します。クエリ値によって表示される値は、必ずしもある瞬間の測定値を表しているわけではありません。

このウィジェットは、最新の報告値を表示することも、タイムウィンドウ全体のすべてのクエリ値から計算された集計値を表示することもできます。この可視化機能は、小さくてもはっきりとしたインフラストラクチャークエリへのウィンドウを提供します。

{{< img src="dashboards/widgets/query_value/query_value.png" alt="クエリ値ウィジェット"  >}}

## セットアップ

{{< img src="dashboards/widgets/query_value/query-value-widget-setup.png" alt="クエリ値ウィジェットのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. グラフ化するデータを選択します。
    * メトリクス:  メトリクスクエリの構成については、[クエリ][1]に関するドキュメントを参照してください。
    * Indexed Span : Indexed Span クエリの構成については、[トレース検索に関するドキュメント][2]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][3]を参照してください。
2. 単位とフォーマットを選択します。自動フォーマットは、単位に基づいてダッシュボードをスケーリングします。
3. オプション: 表示される値に応じて条件付き書式を構成します。

### オプション

#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][4] ドキュメントをご参照ください。

クエリ値ウィジェットの[ウィジェット JSON スキーマ定義][5]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/#overview
[2]: /ja/tracing/app_analytics/search/#search-bar
[3]: /ja/logs/search_syntax/
[4]: /ja/api/v1/dashboards/
[5]: /ja/dashboards/graphing_json/widget_json/