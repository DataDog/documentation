---
title: ウィジェット
kind: documentation
aliases:
  - /ja/graphing/dashboards/widgets
  - /ja/graphing/faq/widgets
  - /ja/graphing/widgets
---
## 概要

{{< whatsnext desc="ウィジェットを選択して、Datadog と API で使用する方法を学習します。">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" >}}アラートグラフ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" >}}アラート値{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/change" >}}変更{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" >}}チェックのステータス{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution" >}}ディストリビューション{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_stream" >}}イベントストリーム{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_timeline" >}}イベントタイムライン{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/free_text" >}}フリーテキスト{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" >}}ジオマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/group" >}}グループ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map" >}}ヒートマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/hostmap" >}}ホストマップ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" >}}Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" >}}イメージ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/log_stream" >}}ログストリーム{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" >}}モニターサマリー{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/network" >}}ネットワーク{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" >}}ノート &amp; リンク{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value" >}}クエリ値{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot" >}}散布図{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" >}}サービスレベル目標 (SLO){{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_map" >}}サービスマッピング{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" >}}サービスサマリー{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table" >}}テーブル{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries" >}}時系列{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list" >}}トップリスト{{< /nextlink >}}
{{< /whatsnext >}}

## 全画面

ほとんどのウィジェットには全画面モードがあります。このビューにアクセスするには、ウィジェットの右上にある全画面ボタンをクリックします。

全画面モードでは、次のことができます。

* タイムフレームを変更する
* 選択したタイムフレームだけ前後に移動する
* 現在の時間にグラフを一時停止するか、ライブグラフを表示する
* タイムフレームをリセットする
* ダッシュボードやノートブックにグラフをエクスポートしたり、クエリをコピーする
* グラフを生成するデータを CSV 形式でダウンロードする

[時系列ウィジェット][1]では追加のオプションが利用可能です。

## カスタムリンク
ほとんどのウィジェットには、コンテキストメニューにカスタムリンクのオプションがあります。この機能を追加するには、ウィジェットを編集して **カスタムリンク** タブを選択するか、コンテキストメニューから **新しいカスタムリンク** を選択します。

カスタムリンクは、Datadog ページや AWS コンソールなどの URL にデータの値を接続するのに役立ちます。カスタムリンクは、`group by` フィールドで使用される属性やテンプレート変数およびタグをサポートします。

### 例

`region` でグループ化されたグラフの関連ログを表示します。
```text
http://app.datadoghq.com/logs?query={{region}}
```

テンプレート変数 `region` で、ダッシュボード上のグラフの関連ログを表示します。
```text
http://app.datadoghq.com/logs?query={{$region.value}}
```

## ウィジェットのコピー/貼り付け

ウィジェットを[ダッシュボード][2]、[ノートブック][3]、[APM サービス][4]、および [APM リソース][5]ページにコピーするには、`Ctrl + C`（Mac の場合は `Cmd + C`）を使用するか、共有アイコンを選択して "Copy" を選択します。

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

[1]: /ja/dashboards/widgets/timeseries/#full-screen
[2]: /ja/dashboards/
[3]: /ja/notebooks/
[4]: /ja/tracing/visualization/service/
[5]: /ja/tracing/visualization/resource/