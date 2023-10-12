---
aliases:
- /ja/graphing/dashboards/widgets
- /ja/graphing/faq/widgets
- /ja/graphing/widgets
further_reading:
- link: /dashboards/guide/context-links/
  tag: ドキュメント
  text: カスタムリンク
kind: documentation
title: ウィジェット
---

## 概要

ウィジェットは、ダッシュボードの構成要素です。ウィジェットによって、インフラストラクチャー全体のデータを視覚化し、相関させることができます。

### グラフ
{{< whatsnext desc="Datadog 製品のデータをグラフ化する汎用ウィジェット: ">}}
    {{< nextlink href="/dashboards/widgets/change" 
        img="dashboards/widgets/icons/change_light_large.png">}} 変化 {{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution"
        img="dashboards/widgets/icons/distribution_light_large.png">}} ディストリビューション{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/funnel"
        img="dashboards/widgets/icons/funnel_light_large.png">}} ファネル{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" 
        img="dashboards/widgets/icons/geomap_light_large.png">}} ジオマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map"
        img="dashboards/widgets/icons/heatmap_light_large.png">}} ヒートマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart"
        img="dashboards/widgets/icons/pie_light_large.png">}} 円グラフ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value"
        img="dashboards/widgets/icons/query-value_light_large.png">}} クエリ値{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot"
        img="dashboards/widgets/icons/scatter-plot_light_large.png">}} 散布図{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table"
        img="dashboards/widgets/icons/table_light_large.png">}} テーブル{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap"
        img="dashboards/widgets/icons/treemap_light_large.png">}} ツリーマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries"
        img="dashboards/widgets/icons/timeseries_light_large.png">}} Timeseries{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list"
        img="dashboards/widgets/icons/top-list_light_large.png">}} トップリスト{{< /nextlink >}}
{{< /whatsnext >}}

### グループ
{{< whatsnext desc="グループの下にウィジェットを表示: ">}}
    {{< nextlink href="/dashboards/widgets/group"
        img="dashboards/widgets/icons/group_default_light_large.svg">}} グループ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/powerpack"
        img="dashboards/widgets/icons/group_powerpack_light_large.svg">}} パワーパック{{< /nextlink >}}
{{< /whatsnext >}}

### アノテーションと埋め込み
{{< whatsnext desc="ダッシュボードを視覚的に構成し、注釈を付けるための装飾ウィジェット: ">}}
    {{< nextlink href="/dashboards/widgets/free_text" 
        img="dashboards/widgets/icons/free-text_light_large.png">}} フリーテキスト{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" 
        img="dashboards/widgets/icons/iframe_light_large.png">}} Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" 
        img="dashboards/widgets/icons/image_light_large.png">}} 画像{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" 
        img="dashboards/widgets/icons/notes_light_large.png">}} 注意事項とリンク{{< /nextlink >}}
{{< /whatsnext >}}

### リストとストリーム
{{< whatsnext desc="さまざまなソースからのイベントや問題のリストを表示します。 ">}}
    {{< nextlink href="/dashboards/widgets/list"
        img="dashboards/widgets/icons/change_light_large.png">}} リスト{{< /nextlink >}}
{{< /whatsnext >}}

### アラートと対応
{{< whatsnext desc="モニタリング情報を表示するサマリーウィジェット: ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" 
        img="dashboards/widgets/icons/alert-graph_light_large.png">}} アラートグラフ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" 
        img="dashboards/widgets/icons/alert-value_light_large.png">}}アラート値{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" 
        img="dashboards/widgets/icons/check-status_light_large.png">}} チェックステータス{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" 
        img="dashboards/widgets/icons/monitor-summary_light_large.png">}} モニターサマリー{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/run_workflow" 
img="dashboards/widgets/icons/run-workflow_light_small.svg">}} Run Workflow{{< /nextlink >}}
{{< /whatsnext >}}

### アーキテクチャ
{{< whatsnext desc="インフラストラクチャーとアーキテクチャーのデータを視覚化します。 ">}}
    {{< nextlink href="/dashboards/widgets/hostmap" 
        img="dashboards/widgets/icons/host-map_light_large.png">}} ホストマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/topology_map" 
        img="dashboards/widgets/icons/service-map_light_large.png">}} トポロジーマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" 
        img="dashboards/widgets/icons/service-summary_light_large.png">}} サービスサマリー{{< /nextlink >}}
{{< /whatsnext >}}

### パフォーマンスと信頼性
{{< whatsnext desc="サイトの信頼性の視覚化: ">}}
    {{< nextlink href="/dashboards/widgets/slo" 
        img="dashboards/widgets/icons/slo-summary_light_large.png">}} サービスレベル目標 (SLO) サマリー{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" 
        img="dashboards/widgets/icons/slo-list_light_large.png">}} サービスレベル目標 (SLO) リスト{{< /nextlink >}}
{{< /whatsnext >}}

## 全画面

ほとんどのウィジェットをフルスクリーンモードで表示し、以下の操作を行うことができます。

* タイムフレームを変更する
* 選択したタイムフレームだけ前後に移動する
* 現在の時間にグラフを一時停止するか、ライブグラフを表示する
* タイムフレームをリセットする
* ダッシュボードやノートブックにグラフをエクスポートしたり、クエリをコピーする
* グラフを生成するデータを CSV 形式でダウンロードする

ウィジェットの概要に直接アクセスするには、ウィジェットの右上にあるフルスクリーンボタンをクリックします。

[時系列ウィジェット][1]では追加のオプションが利用可能です。

## カスタムリンク

カスタムリンクは、データ値を Datadog のページや AWS コンソールなどの URL へ接続します。

一般的なウィジェットのインラインデータとのインタラクションをカスタマイズするには、[カスタムリンク][2]を参照してください。

## ウィジェットのコピーと貼り付け

ウィジェットを[ダッシュボード][3]、[ノートブック][4]、[APM サービス][5]、および [APM リソース][6]ページにコピーするには、`Ctrl + C`（Mac の場合は `Cmd + C`）を使用するか、共有アイコンを選択して "Copy" を選択します。

コピーされたウィジェットは、次の場所で `Ctrl + V`（Mac の場合は `Cmd + V`）を使用して Datadog 内に貼り付けることができます。

* **ダッシュボード**: マウスカーソルの下に新しいウィジェットを追加します。
* **ノートブック**: ノートブックの最後に新しいセルを追加します。

また、リンクのプレビューを表示するお気に入りのチャットプログラム（Slack や Microsoft Teams など）にウィジェットを貼り付けることもできます。これにより、グラフのスナップショット画像とウィジェットへの直接リンクが表示されます。

### ウィジェットのグループ

タイムボードグループウィジェットをコピーするには、グループウィジェット領域にカーソルを合わせて `Ctrl + C`（Mac の場合は `Cmd + C`）を使用するか、共有アイコンを選択して "Copy" を選択します。

**注**: スクリーンボードまたはノートブックにグラフを貼り付ける場合、グループ内の個々のウィジェットが貼り付けられます。

複数のスクリーンボードウィジェットをコピーするには（編集モードのみ）、ウィジェットを `shift + クリック`し、`Ctrl + C`（Mac の場合は `Cmd + C`）を使用します。

**注**: これは、Datadog 内で共有する場合にのみ機能します。プレビュー画像は生成されません。

## グラフのエクスポート

### PNG

ウィジェットを PNG 形式でダウンロードするには、ウィジェットの右上にあるエクスポートボタンをクリックし、**Download as PNG** を選択します。

### CSV

時系列、テーブル、またはトップリストウィジェットからデータを CSV 形式でダウンロードするには、ウィジェットの右上にあるエクスポートボタンをクリックし、**Download as CSV** を選択します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/timeseries/#full-screen
[2]: /ja/dashboards/guide/context-links/
[3]: /ja/dashboards/
[4]: /ja/notebooks/
[5]: /ja/tracing/services/service_page/
[6]: /ja/tracing/services/resource_page/