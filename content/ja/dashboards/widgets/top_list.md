---
title: トップリストウィジェット
kind: documentation
widget_type: トップリスト
aliases:
  - /ja/graphing/widgets/top_list/
further_reading:
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
  - link: /notebooks/
    tag: ドキュメント
    text: ノートブック
---
トップリスト可視化機能を使用すると、`hostname`、`service` などのタグ値のリストを任意のメトリクス値の最大値または最小値と共に表示できます。たとえば、CPU を多く使用しているサービス、ディスクの空き容量が少ないホストなどをリストできます。

{{< img src="dashboards/widgets/toplist/toplist.png" alt="トップリスト" >}}

## セットアップ

{{< img src="dashboards/widgets/toplist/toplist_setup.png" alt="トップリスト"  style="width:80%;">}}

### コンフィギュレーション

1. グラフ化するデータを選択します。
    * メトリクス: メトリクスのクエリを構成するには、[クエリ作成][1]のドキュメントを参照してください。
    * Indexed Span : Indexed Span クエリの構成については、[トレース検索に関するドキュメント][2]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][3]を参照してください。

2. オプション: エントリの値に応じて、条件付き書式を構成します。

### オプション

#### グローバルタイム

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][4] ドキュメントをご参照ください。

トップリストウィジェットの[ウィジェット JSON スキーマ定義][5]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/
[2]: /ja/tracing/app_analytics/search/#search-bar
[3]: /ja/logs/search_syntax/
[4]: /ja/api/v1/dashboards/
[5]: /ja/dashboards/graphing_json/widget_json/