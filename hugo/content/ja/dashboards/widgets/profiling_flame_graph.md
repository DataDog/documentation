---
aliases:
- /ja/video-categories/flamegraph/
description: プロファイルされたコードパス全体のリソース消費を可視化します。
further_reading:
- link: /profiler/profile_visualizations/
  tag: ドキュメント
  text: プロファイルの可視化について学ぶ
- link: /dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: プロファイリングフレームグラフウィジェット
widget_type: flame_graph
---
## 概要 {#overview}

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_2.png" alt="プロファイリングフレームグラフ" >}}

[プロファイリングフレームグラフ][1]は、Continuous Profiler によって収集されたスタックトレースを可視化します。各フレームは、メソッドや行などのコードの単位を表します。フレームの幅は選択したプロファイルメトリクスの割合を表し、次の行のフレームは上のフレームによって呼び出されたコードを表します。ウィジェットを使用して、プロファイルされたアプリケーション全体のリソース集約的なコードパスを特定します。

## セットアップ {#setup}
 
 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config_2.png" alt="プロファイリングフレームグラフウィジェット設定の [Graph your data] セクション" style="width:100%;" >}}

### データをグラフ化する {#graph-your-data}

1. 検索フィールドで、タグを使用してプロファイリングデータのスコープを指定します。例として、`host`、`container_name`、`service`、`env`、`version` などがあります。
2. {{< ui >}}Show{{< /ui >}} メニューで、プロファイルタイプを選択します。[利用可能なプロファイルタイプ][2]は言語によって異なります。
3. {{< ui >}}by{{< /ui >}} メニューで、メソッドや行などのフレームの粒度を選択します。
4. {{< ui >}}color by{{< /ui >}} および {{< ui >}}sort{{< /ui >}} メニューを使用して、フレームの網掛け方法と順序を選択します。
5. スコープセクションを使用して、フレームグラフを絞り込みます。
   - {{< ui >}}Scope to methods{{< /ui >}}: 含めるメソッドを選択します。このセクションの名前は、{{< ui >}}by{{< /ui >}} メニューで選択された粒度に応じて変わります。
   - {{< ui >}}Scope to endpoints{{< /ui >}}: 特定のエンドポイントにフィルタリングします。`per Minute by Endpoint` を選択して合計リソース消費量を表示するか、`per Endpoint Call` を選択してリクエストごとのリソース消費量を表示します。

### 時間設定を行う {#set-time-preferences}

{{< ui >}}Global dashboard time{{< /ui >}} を選択してダッシュボードの時間枠を使用するか、{{< ui >}}Custom time{{< /ui >}} を選択してウィジェットの時間枠を設定します。

**注**: ウィジェットで固定の {{< ui >}}Custom time{{< /ui >}} 範囲を使用している場合、Notebooks はフレームグラフのデータを 1 年間保持します。ウィジェットを作成する際、範囲は [8 日間のプロファイリングデータ保持期間][5]内である必要があります。

### タイトルと説明を追加する {#add-a-title-and-description}

グラフにタイトルを付けるか、ボックスを空のままにして推奨タイトルを使用します。オプションで説明を追加することもできます。{{< ui >}}Save{{< /ui >}} をクリックします。

## ウィジェットを操作する {#interact-with-the-widget}

フレームにカーソルを合わせると、そのプロファイル値が表示されます。フレームを選択すると、そのコードパスにフォーカスされます。プロファイルを詳細に調査するには、フレームグラフの右上隅にあるフルページで開くアイコンをクリックします。

## API {#api}

このウィジェットは **[Dashboards API][3]** で使用できます。[ウィジェットの JSON スキーマ定義][4]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/profiler/profile_visualizations/#flame-graph
[2]: /ja/profiler/profile_types/
[3]: /ja/api/latest/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/
[5]: /ja/data_security/data_retention_periods/