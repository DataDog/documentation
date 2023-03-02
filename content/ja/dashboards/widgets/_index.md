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

ウィジェットは、ダッシュボードを構成するブロックです。ウィジェットは 3 つのタイプに分類されます。

{{< whatsnext desc="Datadog 製品のデータをグラフ化する汎用ウィジェット: ">}}
    {{< nextlink href="/dashboards/widgets/change" >}}変更{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution" >}}分布{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_stream" >}}イベントストリーム{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_timeline" >}}イベントタイムライン{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" >}}ジオマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map" >}}ヒートマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/hostmap" >}}ホストマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/list" >}}リスト{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/log_stream" >}}ログストリーム{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart" >}}円グラフ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value" >}}クエリ値{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot" >}}散布図{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table" >}}テーブル{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap" >}}ツリーマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries" >}}時系列{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list" >}}トップリスト{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Synthetic Monitoring の情報を表示するサマリーウィジェット: ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" >}}アラートグラフ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" >}}アラート値{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" >}}ステータス確認{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" >}}モニター概要{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" >}}サービスレベル目標 (SLO) 概要{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" >}}サービスレベル目標 (SLO) リスト{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_map" >}}サービスマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" >}}サービス概要{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="ダッシュボードを視覚的に構成し、注釈を付けるための装飾ウィジェット: ">}}
    {{< nextlink href="/dashboards/widgets/free_text" >}}フリーテキスト{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/group" >}}グループ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" >}}画像{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" >}}Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" >}}注意事項とリンク{{< /nextlink >}}
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

ウィジェットを PNG 形式でダウンロードするには、ウィジェットの右上にあるエクスポートボタンをクリックし、“Download as PNG” を選択します。

### CSV

時系列、テーブル、またはトップリストウィジェットからデータを CSV 形式でダウンロードするには、ウィジェットの右上にあるエクスポートボタンをクリックし、“Download as CSV” を選択します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/timeseries/#full-screen
[2]: /ja/dashboards/guide/context-links/
[3]: /ja/dashboards/
[4]: /ja/notebooks/
[5]: /ja/tracing/services/service_page/
[6]: /ja/tracing/services/resource_page/