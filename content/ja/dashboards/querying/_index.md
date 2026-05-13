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

メトリクス、ログ、トレース、モニター、ダッシュボード、ノートブックなどを使用している場合でも、Datadogのすべてのグラフは同じ基本機能を持っています。このページでは、グラフィックエディターを使用したクエリの作成について説明します。上級ユーザーは、JSONを使用してグラフを作成および編集できます。詳細については、[JSONを使用したグラフ作成][1]を参照してください。

ダッシュボードまたはノートブックページでグラフエディターを使用してクエリを作成することも、任意のページで使用可能な{{< ui >}}Quick Graphs{{< /ui >}}を使用することもできます。任意のページで`G`を押して、Quick Graphsを開きます。詳細については、[Quick Graphsガイド][2]を参照してください。

## グラフエディター {#graphing-editor}

ウィジェット上で、右上隅の鉛筆アイコンをクリックしてグラフエディターを開きます。グラフ作成エディターには以下のタブがあります。

* {{< ui >}}Share{{< /ui >}}: 任意の外部Webページにグラフを埋め込みます。
* {{< ui >}}JSON{{< /ui >}}: グラフ定義言語の知識が必要な、より柔軟性の高いエディターです。
* {{< ui >}}Edit{{< /ui >}}: グラフ作成オプションのデフォルトのUIタブです。

グラフエディターを初めて開くと、{{< ui >}}Edit{{< /ui >}}タブにいます。ここでは、UIを使用してほとんどの設定を選択できます。以下はその例です。

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="グラフ作成編集タブ" style="width:100%;" >}}

## グラフを構成する {#configuring-a-graph}

ダッシュボードでグラフを構成するには、次のプロセスに従ってください。

1. [視覚化を選択する](#select-your-visualization)
2. [メトリクスの定義](#define-the-metric)
3. [メトリクスをフィルタリングする](#filter)
4. [時間集計の構成](#configure-the-time-aggregation)
5. [スペース集計の構成](#configure-the-space-aggregation)
6. [関数を適用する](#advanced-graphing)
7. [グラフのタイトルを決める](#create-a-title)

### 可視化を選択する {#select-your-visualization}

利用可能な[ウィジェット][3]の中から視覚化したいものを選択します。

### メトリクスの定義 {#define-the-metric}

の隣にあるドロップダウン{{< ui >}}Metric{{< /ui >}}から検索または選択して、グラフ化するメトリクスを選択してください。使用するメトリクスがわからない場合、メトリクスのドロップダウンには、`unit`、`type`、`interval`、`description`、`tags`、および`tag values`の数を含む追加情報が提供されます。

DatadogまたはOpenTelemetryのソースインジケーターも表示される場合があります。環境で両方を使用している場合、Datadogの{{< ui >}}Semantic Mode{{< /ui >}}セレクターを使用して、単一のグラフで[DatadogとOpenTelemetryメトリクスを横断的にクエリする][18]ことができます。

{{< img src="dashboards/querying/metric_dropdown.png" alt="メトリクスセレクタードロップダウン" responsive="true" style="width:100%;">}}

[メトリクスエクスプローラー][4]や[ノートブック][5]でメトリクスをさらに詳しく調べたり、[メトリクスの概要][6]ページでメトリクスのリストを閲覧することができます。

### フィルター {#filter}

選択したメトリクスは、メトリクスの右側にある{{< ui >}}from{{< /ui >}}ドロップダウンを使用して、ホストまたはタグでフィルタリングできます。デフォルトのフィルターは*(すべて)*です。

{{< img src="dashboards/querying/filter-3.png" alt="テンプレート変数とブール論理を使用して、'from'フィールドでグラフをフィルタリングします。" style="width:100%;" >}}

- `from`ドロップダウン内の[高度なフィルタリング][7]を使用して、ブール型またはワイルドカードでフィルタリングされたクエリを評価します。
- テンプレート変数を使用して、クエリを動的にフィルタリングします。タグキーを使用して`$`を追加すると、グラフは自動的にテンプレート変数ドロップダウンで選択したタグを適用します。詳細については、[テンプレート変数のドキュメント][8]を参照してください。

タグの詳細は、[タグ付けに関するドキュメント][9]を参照してください。

### 集計、ロールアップする {#aggregate-and-rollup}

#### 集計の方法 {#aggregation-method}

集計の方法はフィルタードロップダウンの隣にあります。これはデフォルトで`avg by`ですが、方法を`max by`、`min by`、または`sum by`に変更できます。ほとんどの場合、メトリクスは各時間間隔に対して多くの値を持ち、多くのホストやインスタンスから来ています。選択された集計方法は、メトリクスがどのように単一の線に集約されるかを決定します。

#### 時間集計の構成 {#configure-the-time-aggregation}

上記で選択されたオプションに関係なく、グラフを保持するウィンドウの物理的なサイズ制約により、常にデータの集計があります。メトリクスが毎秒更新され、4時間分のデータを見ている場合、すべてを表示するには14,400ポイントが必要です。表示される各グラフには、常に約300ポイントが表示されています。したがって、画面に表示される各ポイントは48のデータポイントを表します。

実際には、メトリクスはエージェントによって15〜20秒ごとに収集されます。したがって、1日分のデータは4,320データポイントです。1日分のデータを単一のグラフに表示すると、Datadogは自動的にデータをロールアップします。時間集計の詳細については、[メトリクスの紹介][10]を参照してください。[ロールアップ][11]のドキュメントを参照して、ロールアップ間隔やDatadogがどのようにデータポイントを自動的にロールアップするかについて学んでください。

データを手動でロールアップするには、[ロールアップ関数][12]を使用してください。シグマアイコンをクリックして関数を追加し、ドロップダウンメニューから`rollup`を選択します。次に、データを集約する方法と秒単位の間隔を選択します。

このクエリは、全マシンにわたる利用可能なディスクスペースの平均値を 1 分間隔で集計し、それを表す単一のラインを作成します。

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="すべてのマシンにわたるsystem.disk.freeメトリクスのロールアップ例" style="width:100%;">}}

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

JSON ビューの使用方法については、[JSON を使用したグラフ作成][1]をご参照ください。

#### スペース集計の構成 {#configure-the-space-aggregation}

集計方法のドロップダウンの隣で、グラフ上の線またはグループを構成するものを選択します。例えば、`host`を選択すると、`host`ごとに1本の線があります。各線は、特定の`host`において選択したメトリクスで構成され、選択した方法で集計されます。

さらに、[メトリクスの定義](#define-the-metric)に使用されるメトリクスのドロップダウンでタグをクリックすると、データをグループ化したり、集計したりすることができます。

### ネストされたクエリ{#nested-queries}

Datadogのネストされたクエリ機能を使用すると、既存のメトリクスクエリの結果に対して、時間および/またはスペース集計の追加レイヤーを追加できます。この高度なクエリ機能により、集計されたクエリ結果に対してパーセンタイルや標準偏差を計算し、過去の時間枠にわたる高解像度のクエリにアクセスすることも可能です。

詳細については、[ネストされたクエリ][13]のドキュメントを参照してください。


### 高度なグラフの作成{#advanced-graphing}

分析のニーズに応じて、クエリに他の数学的関数を適用することを選択できます。例としては、レートや導関数、平滑化などがあります。[利用可能な関数のリスト][14]を参照してください。

Datadogは、さまざまな算術演算を使用してメトリクス、ログ、トレース、およびその他のデータソースをグラフ化する機能もサポートしています。グラフに表示される値を変更するには、`+`、`-`、`/`、`*`、`min`、および`max`を使用します。この構文は、整数値と複数のメトリクスを使用した算術演算の両方を許可します。

メトリクスを別々にグラフ化するには、カンマ（`,`）を使用します。たとえば、 `a, b, c`。

**注意**: カンマを使用したクエリは視覚化でのみサポートされており、モニターでは機能しません。[ブール演算子][15]や算術演算を使用して、モニター内で複数のメトリクスを組み合わせます。

#### 整数を使用したメトリクスの演算{#metric-arithmetic-using-an-integer}

算術演算を行うことで、グラフ上のメトリクスの表示値を変更します。例えば、特定のメトリクスの2倍を視覚化するには、グラフエディタ内の{{< ui >}}Advanced...{{< /ui >}}リンクをクリックします。次に、`Formula` ボックスに計算式を入力します。この場合は `a * 2` です。

{{< img src="dashboards/querying/arithmetic_4.png" alt="計算式の例 - 乗算" style="width:75%;" >}}

#### 2 つのメトリクス間の計算 {#arithmetic-between-two-metrics}

メトリクスの割合を視覚化するために、1 つのメトリクスをもう 1 つのメトリクスで除算します。以下に例を示します。

```text
jvm.heap_memory / jvm.heap_memory_max
```

グラフエディタで {{< ui >}}Advanced...{{< /ui >}} オプションを使用し、{{< ui >}}Add Query{{< /ui >}} を選択します。各クエリにはアルファベット順に文字が割り当てられます。最初のメトリクスは `a` で表され、2 番目のメトリクスは `b` で表されます。

次に、`Formula` ボックスに計算式を入力します（この例では `a / b`）。計算式のみをグラフで表示するには、メトリクス `a` と `b` の横のチェックマークをクリックします。

{{< img src="dashboards/querying/arithmetic_5.png" alt="計算式の例 - 比率" style="width:75%;" >}}

これは、`error` ログと `info` ログの比率をグラフ化する方法を示す別の例です。

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="計算式の例 - ログの比率" style="width:75%;" >}}

**注意**: 計算式には文字が割り当てられていません。計算式間での計算はできません。

#### 2 つのクエリ間の最小値または最大値 {#minimum-or-maximum-between-two-queries}
以下は `max` 演算子を使用して、2 つの Availability Zone 間の CPU 使用率の最大値を求める例です。 

```text
max(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2}) 
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="2 つのメトリクスクエリ間の最大カウント値を示す 'max' の計算式の例" style="width:75%;" >}}

さらに、異なる製品間での 2 つのクエリの最大値（または最小値）を計算することもできます。これは、エラーステータスと警告ステータスのログ間の最小値を求めるために `min` 演算子を使用した別の例です。

```text
min(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="2 つのログクエリ間の最小カウント値を示す 'min' の計算式の例" style="width:75%;" >}}

#### べき乗 {#exponentiation}

これで、`pow()` 関数を使用して、定数またはメトリクスを別の定数またはメトリクスのべき乗にすることができます。これにより、指数的な成長または減少をモデル化することができます。

ここでは、以前の時間ウィンドウに指数成長係数を適用してユーザーの成長を予測する方法の例を示します。

```text
users.sessions{*} * pow(1.1, timeshift(-1))
```

ここでは、べき乗を利用して値を増幅し、異常を浮き彫りにする方法の例を示します。

```text
pow(ping{region:*}, 2)
```

`pow(a, b)`、`a`、および`b`は定数またはメトリクスとして使用できます。この機能はメトリクスでのみ利用可能です。

### エイリアスを作成する{#create-an-alias}

データソースのカスタムエイリアスを作成して、ユーザーがグラフの結果を簡単に解釈できるようにすることができます。

{{< img src="dashboards/querying/custom_alias.png" alt="カスタムエイリアス" style="width:75%;" >}}

### タイトルを作成する{#create-a-title}

タイトルを入力しない場合は、選択に基づいて自動的に生成されます。ただし、グラフの目的を説明するタイトルを作成することをお勧めします。

### 保存する{#save}

{{< ui >}}Done{{< /ui >}}をクリックして作業を保存し、エディタを終了します。エディタに戻ってグラフを変更することはいつでもできます。保存したくない変更を行った場合は、{{< ui >}}Cancel{{< /ui >}}をクリックしてください。

## その他のオプション{#additional-options}

### イベントオーバーレイ{#event-overlays}

{{< img src="/dashboards/querying/event_overlay_example.png" alt="デプロイメントイベントが重ねられたRUMエラー率を示す時系列ウィジェット" style="width:100%;" >}}

[Timeseries][16]ビジュアライゼーションのグラフエディタの{{< ui >}}Event Overlays{{< /ui >}}セクションを使用してイベント相関を表示します。検索フィールドに任意のテキストまたは構造化された検索クエリを入力してください。イベント検索では、[ログ検索構文][17]を使用します。

イベントオーバーレイはすべてのソースをサポートしています。これにより、ビジネスイベントと任意のDatadogサービスからのデータとの相関が容易になります。

イベントオーバーレイを使えば、組織内のアクションがアプリケーションやインフラストラクチャーのパフォーマンスにどのような影響を与えるかを素早く確認することができます。以下に、使用例をいくつか紹介します：
- デプロイメントイベントを重ね合わせたRUMのエラーレート
- 余分なサーバーのプロビジョニングに関連するイベントとCPU使用率を相関させる
- egressトラフィックと疑わしいログインアクティビティを相関させる
- Datadogが適切なアラートで構成されていることを確認するために、あらゆる時系列データとモニターのアラートを相関させる


### スプリットグラフ {#split-graph}

スプリットグラフを使えば、メトリクスをタグごとに分けて可視化することができます。

{{< img src="dashboards/querying/split_graph_beta.png" alt="フルスクリーンウィジェットでコンテナ.cpu.usageメトリクスのスプリットグラフを表示します。" style="width:100%;" >}}

1. グラフ表示時に{{< ui >}}Split Graph{{< /ui >}}タブでこの機能にアクセスします。
1. グラフ化しているデータと他のメトリクスとの関連性を確認するために{{< ui >}}sort by{{< /ui >}}メトリクスを変更することができます。
1. 表示するグラフの数を{{< ui >}}limit to{{< /ui >}}の値で制限します。

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