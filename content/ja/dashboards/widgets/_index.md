---
aliases:
- /ja/graphing/dashboards/widgets
- /ja/graphing/faq/widgets
- /ja/graphing/widgets
further_reading:
- link: /dashboards/guide/context-links/
  tag: Documentation
  text: Custom Links
title: Widgets
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
{{< whatsnext desc="Display your widgets under groups: ">}}
    {{< nextlink href="/dashboards/widgets/group"
        img="dashboards/widgets/icons/group_default_light_large.svg">}} Group{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/powerpack"
        img="dashboards/widgets/icons/group_powerpack_light_large.svg">}} Powerpack{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/split_graph"
        img="dashboards/widgets/icons/group-split_light_small.svg">}} Split Graph{{< /nextlink >}}
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
{{< nextlink href="/dashboards/widgets/profiling_flame_graph"
        img="dashboards/widgets/icons/profiling_flame_graph.svg">}} プロファイリングフレームグラフ{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" 
        img="dashboards/widgets/icons/slo-summary_light_large.png">}} サービスレベル目標 (SLO) サマリー{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" 
        img="dashboards/widgets/icons/slo-list_light_large.png">}} サービスレベル目標 (SLO){{< /nextlink >}}
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

## 単位のオーバーライド

Customize unit values displayed on widgets to add context to your data. For more use cases and information, see the [Customize your visualizations with unit overrides][3].
- **Unit override**: 選択することで、「メモリ」ファミリーの単位が表示され、Datadog がデータに応じて適切なスケールを表示するようにします (メガバイトやギガバイトなど)。
- **Unit and scale override**: 単位を単一のスケールに固定します (値に関係なくデータをメガバイトで表示)。
- **Define custom units**: 完全にカスタマイズされた単位を定義します (一般的なカウントの代わりに「テスト」のような)。

これは、データに単位を割り当てるための代替手段ではありません。
{{< whatsnext desc="組織レベルでの単位設定: ">}}
    {{< nextlink href="/metrics/units/">}} メトリクス単位の設定{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} イベントベースクエリの単位設定{{< /nextlink >}}
{{< /whatsnext >}}

## グローバルタイムセレクター

グローバルタイムセレクターを使うには、1 つ以上の時間ベースのウィジェットが `Global Time` を使うように設定されている必要があります。**Set display preferences** でウィジェットのエディターで選択するか、またはウィジェットを追加します (グローバルタイムはデフォルトの時間設定です)。

グローバルタイムセレクターは、同一のダッシュボード上で `Global Time` オプションを使用するすべてのウィジェットに対して同一のタイムフレームを設定します。過去の移動ウィンドウ (例: `Past 1 Hour`、`Past 1 Day`) を選択するか、固定期間を選択します。固定期間は、`Select from calendar...` オプションを使用します。または、[カスタムタイムフレームを入力][11]します。移動ウィンドウを選択した場合、ウィジェットはタイムウィンドウに沿って移動します。

グローバルタイムにリンクされていないウィジェットは、グローバルウィンドウに適用されたローカルタイムフレームに対応するデータを表示します。たとえば、グローバルタイムセレクターが 2019 年 1 月 1 日から 2019 年 1 月 2 日に設定されている場合、ローカルタイムフレームが `Past 1 Minute` に設定されているウィジェットには、2019 年 1 月 2 日の午後 11 時 59 分からの最後の 1 分が表示されます。

## ウィジェットのコピーと貼り付け

<div class="alert alert-warning">You must have <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#dashboards"><code>dashboard_public_share</code> permissions</a> and enable <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>Static Public Data Sharing</strong></a> in your Organization Settings to use this feature.</div>

Widgets can be copied on [Dashboards][4], [Notebooks][5], [APM Service][6], and the [APM resource][7] page by using `Ctrl + C` (`Cmd + C` for Mac), or by selecting the share icon and choosing "Copy".

コピーされたウィジェットは、次の場所で `Ctrl + V`（Mac の場合は `Cmd + V`）を使用して Datadog 内に貼り付けることができます。

* **ダッシュボード**: マウスカーソルの下に新しいウィジェットを追加します。
* **ノートブック**: ノートブックの最後に新しいセルを追加します。

また、リンクのプレビューを表示するお気に入りのチャットプログラム（Slack や Microsoft Teams など）にウィジェットを貼り付けることもできます。これにより、グラフのスナップショット画像とウィジェットへの直接リンクが表示されます。

### ウィジェットのグループ

タイムボードグループウィジェットをコピーするには、グループウィジェット領域にカーソルを合わせて `Ctrl + C`（Mac の場合は `Cmd + C`）を使用するか、共有アイコンを選択して "Copy" を選択します。

**注**: スクリーンボードまたはノートブックにグラフを貼り付ける場合、グループ内の個々のウィジェットが貼り付けられます。

複数のスクリーンボードウィジェットをコピーするには（編集モードのみ）、ウィジェットを `shift + クリック`し、`Ctrl + C`（Mac の場合は `Cmd + C`）を使用します。

**注**: これは、Datadog 内で共有する場合にのみ機能します。プレビュー画像は生成されません。

## ウィジェットグラフ

### エクスポート

| 形式 | 手順            |
| -----  | ----------------------- |
| PNG    | ウィジェットを PNG 形式でダウンロードするには、ウィジェットの右上にあるエクスポートボタンをクリックし、**Download as PNG** を選択します。 |
| CSV    | 時系列、テーブル、またはトップリストウィジェットからデータを CSV 形式でダウンロードするには、ウィジェットの右上にあるエクスポートボタンをクリックし、**Download as CSV** を選択します。|

### グラフメニュー

ダッシュボードグラフをクリックするとオプションメニューが開きます。

| オプション                 | 説明                                                        |
|------------------------|--------------------------------------------------------------------|
| スナップショットを送信          | グラフのスナップショットを作成および送信します。                          |
| 相関関係のあるメトリクスを検索| APM サービス、インテグレーション、ダッシュボードの相関関係を検索します。 |
| View in full screen    | グラフを[全画面モード][5]で表示します。                           |
| カーソルをロック            | ページに配置されたカーソルをロックします。                              |
| View related processes | グラフ参照範囲の[ライブプロセス][6]ページへジャンプします。         |
| View related hosts     | グラフ参照範囲の[ホストマップ][7]ページへジャンプします。               |
| View related logs      | グラフ参照範囲の[ログエクスプローラー][8]ページへジャンプします。           |
| 関連トレースを表示    | グラフ参照範囲の[トレース][9]パネルに入力します。                 |
| 関連プロファイルを表示  | グラフ参照範囲の[プロファイリング][10]ページへジャンプします。             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/timeseries/#full-screen
[2]: /ja/dashboards/guide/context-links/
[3]: /ja/dashboards/guide/unit-override
[4]: /ja/dashboards/
[5]: /ja/notebooks/
[6]: /ja/tracing/services/service_page/
[7]: /ja/tracing/services/resource_page/
[8]: /ja/logs/explorer/
[9]: /ja/tracing/trace_explorer/
[10]: /ja/profiler/profile_visualizations/
[11]: /ja/dashboards/guide/custom_time_frames/