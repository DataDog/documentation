---
aliases:
- /ja/graphing/using_graphs/
description: データを問い合わせてインサイトを得る
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: ラーニングセンター
  text: ダッシュボードをより効果的に活用する
title: クエリ
---
## 概要 {#overview}

メトリクス、ログ、トレース、モニター、ダッシュボード、ノートブックなどを使用する場合でも、Datadog のすべてのグラフで同じ基本機能を利用できます。このページでは、グラフエディターを使用したクエリ作成について説明します。上級ユーザーは、JSON を使用してグラフを作成および編集できます。詳細については、[JSON を使用したグラフ作成][1]を参照してください。

Dashboards または Notebooks ページでは、グラフエディターを使用してクエリを作成できます。また、任意のページで利用可能な {{< ui >}}Quick Graphs{{< /ui >}} を使用することもできます。任意のページで `G` を押して Quick Graphs を開きます。詳細については、[Quick Graphs ガイド][2]を参照してください。

## グラフエディター {#graphing-editor}

ウィジェットでは、右上隅の鉛筆アイコンをクリックしてグラフエディターを開きます。グラフエディターには以下のタブがあります。

* {{< ui >}}Share{{< /ui >}}: 任意の外部 Web ページにグラフを埋め込みます。
* {{< ui >}}JSON{{< /ui >}}: より柔軟性の高いエディター。グラフ定義言語の知識が必要です。
* {{< ui >}}Edit{{< /ui >}}: グラフ作成オプションのデフォルトの UI。

グラフエディターを初めて開くと、{{< ui >}}Edit{{< /ui >}} タブが表示されます。ここでは、UI を使用してほとんどの設定を選択できます。以下はその例です。

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Graphing Edit タブ" style="width:100%;" >}}

## グラフを構成する {#configuring-a-graph}

ダッシュボードでグラフを構成するには、次のプロセスに従ってください。

1. [視覚化方法を選択する](#select-your-visualization)
2. [メトリクスを定義する](#define-the-metric)
3. [メトリクスをフィルタリングする](#filter)
4. [時間集計を構成する](#configure-the-time-aggregation)
5. [スペース集計を構成する](#configure-the-space-aggregation)
6. [関数を適用する](#advanced-graphing)
7. [グラフのタイトルを決める](#create-a-title)

### 視覚化方法を選択する {#select-your-visualization}

利用可能な[ウィジェット][3]の中から視覚化したいものを選択します。

### メトリクスを定義する {#define-the-metric}

{{< ui >}}Metric{{< /ui >}} の隣にあるドロップダウンから検索または選択して、グラフ化するメトリクスを選択します。使用するメトリクスがわからない場合、メトリクスのドロップダウンには、`unit`、`type`、`interval`、`description`、`tags`、および `tag values` の数を含む追加情報が表示されます。

Datadog または OpenTelemetry のソースインジケーターも表示される場合があります。環境で両方を使用している場合は、Datadog の[テレメトリソース][19]クエリ修飾子を使って、1 つのグラフ内で [Datadog と OpenTelemetry のメトリクスを横断的にクエリ][18]できます。

{{< img src="dashboards/querying/metric_dropdown.png" alt="Metric Selector ドロップダウン" responsive="true" style="width:100%;">}}

[Metrics Explorer][4] や[ノートブック][5]でメトリクスをさらに詳しく調べたり、[Metrics Summary][6] ページでメトリクスのリストを閲覧したりすることができます。

### フィルタリングする {#filter}

選択したメトリクスには、メトリクスの右側にある {{< ui >}}from{{< /ui >}} ドロップダウンからホストまたはタグによるフィルターを設定することができます。デフォルトでは *(すべての場所)* に設定されています。

{{< img src="dashboards/querying/filter-3.png" alt="テンプレート変数とブール論理を使用して、'from' フィールドでグラフをフィルタリングします。" style="width:100%;" >}}

- `from` ドロップダウン内の[高度なフィルタリング][7]を使用して、ブール型またはワイルドカードでフィルタリングされたクエリを評価します。
- テンプレート変数を使用して、クエリを動的にフィルタリングします。タグキーを使用して `$` を追加すると、グラフは自動的にテンプレート変数ドロップダウンで選択したタグを適用します。詳細については、[テンプレート変数のドキュメント][8]を参照してください。

タグの詳細は、[タグ付けに関するドキュメント][9]を参照してください。

### 集計、ロールアップする {#aggregate-and-rollup}

#### 集計方法 {#aggregation-method}

集計方法はフィルタードロップダウンの隣にあります。これはデフォルトで `avg by` ですが、方法を `max by`、`min by`、または `sum by` に変更できます。ほとんどの場合、メトリクスは各時間間隔に対して多数の値を持ち、複数のホストやインスタンスから取得されます。選択された集計方法は、メトリクスをどのように単一のラインに集約するかを決定します。

#### 時間集計を構成する {#configure-the-time-aggregation}

上記で選択されたオプションに関係なく、グラフを表示するウィンドウの物理的なサイズ制約により、常にデータの集約が行われます。メトリクスが毎秒更新され、4 時間分のデータを表示している場合、すべてを表示するには 14,400 ポイントが必要です。各グラフには、任意の時点で約 300 ポイントが表示されます。したがって、画面に表示される各ポイントは 48 個のデータポイントを表します。

実際には、メトリクスは Agent によって 15〜20 秒ごとに収集されます。したがって、1 日分のデータは 4,320 個のデータポイントです。1 日分のデータを単一のグラフに表示すると、Datadog は自動的にデータをロールアップします。時間集計の詳細については、[メトリクスの概要][10]を参照してください。ロールアップ間隔と Datadog がデータポイントをどのように自動的にロールアップするかについては、[ロールアップ][11]のドキュメントを参照してください。

データを手動でロールアップするには、[ロールアップ関数][12]を使用します。シグマアイコンをクリックして関数を追加し、ドロップダウンメニューから `rollup` を選択します。次に、データの集約方法と秒単位の間隔を選択します。

このクエリは、全マシンにわたる利用可能なディスクスペースの平均値を 1 分間隔で集計し、それを表す単一のラインを作成します。

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="すべてのマシンにわたる system.disk.free メトリクスのロールアップ例" style="width:100%;">}}

JSON ビューに切り替えると、以下のようなクエリが表示されます。

```text
"query": "avg:system.disk.free{*}.rollup(avg, 60)"
```

完全な JSON は次のようになります。

```text
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.disk.free{*}.rollup(avg, 60)"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

JSON ビューの使用方法については、[JSON を使用したグラフ作成][1]を参照してください。

#### スペース集計を構成する {#configure-the-space-aggregation}

集計方法のドロップダウンの隣で、グラフ上の線またはグループをどのように構成するかを選択します。たとえば、`host` を選択すると、`host` ごとに 1 本の線が表示されます。各線は、特定の `host` において選択したメトリクスを選択した方法で集計したものです。

さらに、[メトリクスの定義](#define-the-metric) で使用されるメトリクスのドロップダウンでタグをクリックすると、データをグループ化したり集計したりすることができます。

### ネストされたクエリ {#nested-queries}

Datadog のネストされたクエリ機能を使用すると、既存のメトリクスクエリの結果に対して、時間および/またはスペース集計の追加レイヤーを追加できます。この高度なクエリ機能により、カウント/レート/ゲージタイプのメトリクスの集計クエリ結果のパーセンタイルや標準偏差を計算したり、より高解像度のクエリを過去の時間枠で実行したりすることも可能です。

詳細については、[ネストされたクエリ][13]のドキュメントを参照してください。


### 高度なグラフの作成 {#advanced-graphing}

分析のニーズに応じて、クエリに他の数学関数を適用できます。例としては、レートや導関数、平滑化などがあります。[利用可能な関数のリスト][14]を参照してください。

Datadog は、さまざまな算術演算および比較関数を使用して、メトリクス、ログ、トレース、およびその他のデータソースをグラフ化する機能もサポートしています。グラフに表示される値を変更するには、`+`、`-`、`/`、`*`、`minimum()`、および `maximum()` を使用します。この構文では、整数値と複数のメトリクスを使用した算術演算の両方を使用できます。

各メトリクスを別々にグラフに表示するには、カンマ `,` を使用します。例: `a, b, c`。

**注**: カンマを使用したクエリは視覚化でのみサポートされており、モニターでは機能しません。[ブール演算子][15]や算術演算を使用して、モニター内で複数のメトリクスを組み合わせます。

#### 整数を使用したメトリクスの演算 {#metric-arithmetic-using-an-integer}

算術演算を行うことで、グラフ上のメトリクスの表示値を変更します。たとえば、特定のメトリクスの 2 倍を視覚化するには、グラフエディター内の {{< ui >}}Advanced...{{< /ui >}} リンクをクリックします。次に、`Formula` ボックスに算術式を入力します。この場合は `a * 2` です。

{{< img src="dashboards/querying/arithmetic_4.png" alt="計算式の例 - 乗算" style="width:75%;" >}}

#### 2 つのメトリクス間の計算 {#arithmetic-between-two-metrics}

メトリクスの割合を視覚化するために、1 つのメトリクスをもう 1 つのメトリクスで除算します。以下に例を示します。

```text
jvm.heap_memory / jvm.heap_memory_max
```

グラフエディターで {{< ui >}}Advanced...{{< /ui >}} オプションを使用し、{{< ui >}}Add Query{{< /ui >}} を選択します。クエリにはアルファベット順に文字が割り当てられ、最初のメトリクスは `a`、2 番目のメトリクスは `b` のように表示されます。

次に、`Formula` ボックスに計算式 (この場合は `a / b`) を入力します。数式の結果のみを表示するには、[可視化方法からクエリを非表示にする](#hide-a-query-from-the-visualization)を参照してください。

{{< img src="dashboards/querying/arithmetic_5.png" alt="計算式の例 - 比率" style="width:75%;" >}}

これは、`error` ログと `info` ログの比率をグラフ化する方法を示す別の例です。

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="計算式の例 - ログ比率" style="width:75%;" >}}

**注**: 計算式にはアルファベットのラベルが付けられていません。計算式同士での算術演算はできません。

#### 可視化方法からクエリを非表示にする {#hide-a-query-from-the-visualization}

ウィジェットに複数のクエリと 1 つの数式がある場合、個々のクエリを非表示にして数式の結果のみがグラフに表示されるようにできます。クエリの文字ラベルをクリックしてグラフ上での可視性を切り替えます。青いラベルはクエリが表示されていることを示し、灰色のラベルは非表示であることを示します。非表示のクエリは、数式の計算には引き続き使用されます。

#### 2 つのクエリ間の最小値または最大値 {#minimum-or-maximum-between-two-queries}

`minimum()` と `maximum()` を使用して、2 つのクエリをポイントごとに比較し、各タイムスタンプで低い値または高い値を返します。

**注**: 算術演算比較に `min()` と `max()` を使用することは推奨されていません。代わりに `minimum()` と `maximum()` を使用してください。この非推奨事項は、算術演算比較構文のみに適用されます。`min by`、`max by` のような集計方法や、`min` と `max` を使用したネストされたクエリ集計は変更されません。

以下は `maximum()` を使用して 2 つのアベイラビリティゾーン間の CPU 使用率の最大値を求める例です。

```text
maximum(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2})
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="2 つのメトリクスクエリ間の高い値を示す 'maximum' の計算式の例" style="width:75%;" >}}

さらに、異なる製品間で 2 つのクエリの最小値を計算することもできます。これは、`minimum()` を使用してエラーステータスと警告ステータスのログ間の最小値を求める別の例です。

```text
minimum(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="2 つのログクエリ間の低い値を示す 'minimum' の計算式の例" style="width:75%;" >}}

### エイリアスを作成する {#create-an-alias}

データソースのカスタムエイリアスを作成して、ユーザーがグラフの結果を簡単に解釈できるようにすることができます。

{{< img src="dashboards/querying/custom_alias.png" alt="カスタムエイリアス" style="width:75%;" >}}

### タイトルの作成 {#create-a-title}

タイトルを入力しない場合は、選択内容に基づいてタイトルが自動的に生成されます。ただし、グラフの目的を説明するタイトルを設定することを推奨します。

### 保存 {#save}

{{< ui >}}Done{{< /ui >}} をクリックして作業を保存し、エディターを終了します。いつでもエディターに戻ってグラフを変更できます。保存したくない変更を行った場合は、{{< ui >}}Cancel{{< /ui >}} をクリックします。

## その他のオプション {#additional-options}

### イベントオーバーレイ {#event-overlays}

{{< img src="/dashboards/querying/event_overlay_example.png" alt="デプロイメントイベントを重ね合わせた RUM のエラーレートを表示する時系列ウィジェット" style="width:100%;" >}}

[Timeseries][16] 視覚化のグラフエディターの {{< ui >}}Event Overlays{{< /ui >}} セクションを使用して、イベント相関を表示します。検索フィールドに任意のテキストまたは構造化検索クエリを入力します。イベント検索では、[ログ検索構文][17]を使用します。

イベントオーバーレイはすべてのデータソースをサポートします。これにより、ビジネスイベントと Datadog のあらゆるサービスからのデータとの相関を容易にすることができます。

イベントオーバーレイを使えば、組織内のアクションがアプリケーションやインフラストラクチャーのパフォーマンスにどのような影響を与えるかを素早く確認することができます。以下に、使用例をいくつか紹介します。
- デプロイメントイベントを重ね合わせた RUM のエラーレート
- 余分なサーバーのプロビジョニングに関連するイベントと CPU 使用率を相関させる
- egress トラフィックと疑わしいログインアクティビティを相関させる
- Datadog が適切なアラートで構成されていることを確認するために、あらゆる時系列データとモニターアラートを相関させる


### スプリットグラフ {#split-graph}

スプリットグラフを使えば、メトリクスをタグごとに分けて視覚化することができます。

{{< img src="dashboards/querying/split_graph_beta.png" alt="フルスクリーンウィジェットでメトリクス container.cpu.usage のスプリットグラフを表示する" style="width:100%;" >}}

1. グラフ表示時に {{< ui >}}Split Graph{{< /ui >}} タブでこの機能にアクセスします。
1. また、{{< ui >}}sort by{{< /ui >}} メトリクスを変更することで、グラフ化しているデータと他のメトリクスとの関連性を確認することができます。
1. 表示するグラフの数を {{< ui >}}limit to{{< /ui >}} の値で制限します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/graphing_json/
[2]: /ja/dashboards/guide/quick-graphs/
[3]: /ja/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /ja/metrics/advanced-filtering/
[8]: /ja/dashboards/template_variables/
[9]: /ja/getting_started/tagging/
[10]: /ja/metrics/#time-aggregation
[11]: /ja/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[12]: /ja/dashboards/functions/rollup/
[13]: /ja/metrics/nested_queries/
[14]: /ja/dashboards/functions/#function-types
[15]: /ja/metrics/advanced-filtering/#boolean-filtered-queries
[16]: /ja/dashboards/widgets/timeseries/#event-overlay
[17]: /ja/logs/explorer/search_syntax/
[18]: /ja/metrics/open_telemetry/query_metrics
[19]: /ja/dashboards/functions/telemetry_source/