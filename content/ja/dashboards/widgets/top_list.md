---
aliases:
- /ja/graphing/widgets/top_list/
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /notebooks/
  tag: ドキュメント
  text: ノートブック
- link: /dashboards/guide/context-links/#overview/
  tag: Documentation
  text: コンテキストリンク
title: トップリストウィジェット
widget_type: toplist
---

トップリスト可視化機能を使用すると、`hostname`、`service` などのタグ値のリストを任意のメトリクス値の最大値または最小値と共に表示できます。たとえば、CPU を多く使用しているサービス、ディスクの空き容量が少ないホストなどをリストできます。

{{< img src="dashboards/widgets/toplist/toplist_w_colors.png" alt="条件に応じた視覚化の書式設定ルールを適用したトップリストウィジェット" >}}

## セットアップ

{{< img src="dashboards/widgets/toplist/toplist_config.png" alt="トップリストの視覚化の書式設定ルールのセットアップ画面" style="width:80%;">}}

### コンフィギュレーション

1. グラフ化するデータを選択します。
    * メトリクス: メトリクスのクエリを構成するには、[クエリ作成][1]のドキュメントを参照してください。
    * Indexed Span: Indexed Span クエリの構成については、[トレース検索に関するドキュメント][2]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][3]を参照してください。

2. オプション: *視覚化の書式設定ルール**で、エントリの値に応じた*条件付き書式を構成します。Datadog 全体で視覚化データ同士を結び付けるには、[コンテキストリンク][6]を追加します。

### オプション

#### グローバルタイム

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル" style="width:80%;">}}

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
[6]: /ja/dashboards/guide/context-links/#overview
