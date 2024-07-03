---
aliases:
- /ja/graphing/using_graphs/
description: Query your data to gain insight
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Learning Center
  text: Building Better Dashboards
title: Querying
---

## 概要

Datadog では、メトリクス、ログ、トレース、モニター、ダッシュボード、ノートブックなどのすべてのグラフで同じ基本機能は使用しています。このページでは、グラフエディターのクエリについて説明します。上級レベルのユーザーは、JSON を使用したグラフの作成や編集が可能です。詳細については、[JSON を使用したグラフ作成][1]をご参照ください。

ダッシュボードやノートブックページにあるグラフエディターを使ってクエリを実行することもできますが、どのページでも利用可能な**クイックグラフ**を使うこともできます。クイックグラフは、任意のページで `G` をクリックすると開きます。詳しくは、[クイックグラフガイド][2]をご覧ください。

## グラフエディター

ウィジェットで、右上の鉛筆アイコンをクリックしてグラフエディターを開きます。グラフエディターには以下のタブがあります。

* **Share**: 任意の外部 Web ページにグラフを埋め込みます。
* **JSON**: より柔軟性の高いエディター。グラフ定義言語の知識が必要です。
* **Edit**: グラフ作成オプションのデフォルトの UI タブ。

初めてグラフエディターを開くと、**Edit** タブが表示されます。UI からほとんどの設定を選択できます。以下に例を示します。

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="グラフエディターの Edit タブ" style="width:100%;" >}}

## グラフを構成する

ダッシュボードでグラフを構成するには、次のプロセスに従ってください。

1. [視覚化の方法を選択](#select-your-visualization)
2. [メトリクスの定義](#define-the-metric)
3. [メトリクスのフィルタリング](#filter)
4. [時間集計の構成](#configure-the-time-aggregation)
5. [空間集計の構成](#configure-the-space-aggregation)
6. [関数の適用](#advanced-graphing)
7. [グラフのタイトルを作成](#create-a-title)

### 視覚化に使用するウィジェットを選択する

利用可能な[ウィジェット][3]の中から視覚化したいものを選択します。

### メトリクスを定義する

検索するか、**Metric** の隣にあるドロップダウンから選択して、グラフ化したいメトリクスを選択します。使用するメトリクスが分からない場合は、メトリクスのドロップダウンから `unit`、`type`、`interval`、`description`、`tags`、および `tag values` の数などの追加情報を得ることができます。

{{< img src="dashboards/querying/metric_dropdown.png" alt="メトリクス選択ドロップダウン" responsive="true" style="width:100%;">}}

[メトリクスエクスプローラー][4]や[ノートブック][5]でメトリクスをさらに詳しく調べたり、[メトリクスの概要][6]ページでメトリクスのリストを閲覧することができます。

### フィルター

選択したメトリクスには、メトリクスの右側にある **from** ドロップダウンからホストまたはタグによるフィルターを設定することができます。デフォルトでは *(everywhere)* に設定されています。

{{< img src="dashboards/querying/filter-3.png" alt="テンプレート変数とブール値ロジックを使用し、'from' フィールドでグラフをフィルター" style="width:100%;" >}}

- `from` ドロップダウン内の[高度なフィルタリング][7]を使用して、ブール型またはワイルドカードでフィルタリングされたクエリを評価します。
- テンプレート変数を使用して、クエリを動的にフィルターします。タグキーと一緒に `$` を追加すると、グラフはテンプレート変数のドロップダウンで選択したタグを自動的に適用します。詳細は[テンプレート変数のドキュメント][16]を参照してください。

タグの詳細は、[タグ付けに関するドキュメント][8]を参照してください。

### 集計、ロールアップする

#### 集計の方法

集計方法は、フィルターのドロップダウンの隣に表示されます。デフォルトでは `avg by` に設定されていますが、`max by`、`min by`、`sum by` に変更できます。ほとんどの場合、メトリクスは多数のホストやインスタンスから集計されるため、時間間隔ごとに多数の値が含まれています。選択した集計方法によって、メトリクスを 1 本の線に集計する方法が決まります。

#### 時間集計の構成

前述の手順で選択したオプションに関係なく、グラフの表示ウィンドウに物理的なサイズ制約があることから、データは常にある程度集約されています。メトリクスが毎秒更新され、4 時間分のデータを表示する場合、全データを表示するには 14,400 ポイントが必要です。この期間内に各グラフで表示できるポイント数は 300 です。そのため、画面上の 1 ポイントは 48 データポイントに相当します。

実際には、メトリクスは Agent によって 15～20 秒ごとに収集されます。そのため、1 日分のデータは 4,320 データポイントとなります。1 つのグラフで 1 日分のデータを表示する場合、Datadog は自動的にデータをロールアップします。時間集計の詳細については、[メトリクスのはじめに][9]をご参照ください。ロールアップの間隔や Datadog が自動的にデータポイントをロールアップする方法については、[ロールアップ][10]ドキュメントを参照してください。

手動でデータをロールアップするには、[rollup 関数][11]を使用します。シグマのアイコンをクリックして関数を追加し、ドロップダウンメニューから `rollup` を選択します。次に、データを集計する方法と間隔 (秒) を選択します。

このクエリは、全マシンにわたる利用可能なディスクスペースの平均値を 1 分間隔で集計し、それを表す単一のラインを作成します。

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="マシン全体の system.disk.free メトリクスのロールアップ例" style="width:100%;">}}

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

#### 空間集計の構成

集約方法のドロップダウンの隣から、グラフ上で線またはグループを構成する要素を選択します。たとえば、`host` を選択すると、各 `host`  につき 1 本の線が表示されます。各線は、特定の `host` に関する選択されたメトリクスで構成されており、選択した方法により集約されます。

さらに、[メトリクスの定義](#define-the-metric)で使用されるメトリクスのドロップダウンでタグをクリックすると、データをグループ化したり、集計したりすることができます。

### 高度なグラフの作成

分析のニーズに応じて、割合、微分係数、平滑化など、他の数学関数をクエリに適用することもできます。詳細については、[使用可能な関数のリスト][12]をご参照ください。

また、Datadog では、さまざまな算術演算によりメトリクス、ログ、トレース、その他のデータソースをグラフ化できます。グラフに表示される 値を変更するには、`+`、`-`、`/`、`*`、`min`、および `max` を使用します。この構文では、整数値、および複数のメトリクスを使用した演算の両方を使用できます。

各メトリクスを別々にグラフに表示するには、コンマ (`,`) を使用します（例: `a, b, c`）。

**注**: コンマを使用したクエリは視覚化でのみサポートされ、モニターでは機能しません。モニターで複数のメトリクスを組み合わせるには、[ブール演算子][13]または算術演算子を使用します。

#### 整数を使用したメトリクスの演算

グラフでメトリクス値の表示方法を変更するには、算術演算を実行します。たとえば、特定のメトリクスの 2 倍の値を視覚化するには、グラフエディターで **Advanced...** リンクをクリックします。次に、`Formula` ボックスに計算式 (この例では `a * 2`) を入力します。

{{< img src="dashboards/querying/arithmetic_4.png" alt="数式の例 - 乗算" style="width:75%;" >}}

#### 2 つのメトリクス間の計算

メトリクスの割合を視覚化するには、1 つのメトリクスをもう 1 つのメトリクスで除算します。以下に例を示します。

```text
jvm.heap_memory / jvm.heap_memory_max
```

グラフエディターの **Advanced...** オプションから **Add Query** を選択します。クエリにはアルファベット順に文字が割り当てられ、最初のメトリクスは `a` 、2 番目のメトリクスは `b` のように表示されます。

次に、`Formula` ボックスに算術演算 (この例では `a / b`) を入力します。グラフに数式のみを表示するには、メトリクス `a` および `b` の横にあるチェックマークをクリックします。

{{< img src="dashboards/querying/arithmetic_5.png" alt="数式の例 - 比率" style="width:75%;" >}}

これは、`error` ログと `info` ログの比率をグラフ化する方法を示す別の例です。

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="数式の例 - ログ比率" style="width:75%;" >}}

**注**: 数式に文字は割り当てられません。数式間では演算できません。

#### Minimum or Maximum between two queries
Here is an example using the `max` operator to find the maximum CPU usage between two availability zones.  

```text
max(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2}) 
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="Formula example for 'max' showing max count value between two metric queries" style="width:75%;" >}}

Additionally, you can also calculate the maximum (or minimum) between two queries on different products. Here is another example using the `min` operator to find the minimum between logs with error statuses and warning statuses.

```text
min(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="Formula example for 'min' showing min count value between two log queries" style="width:75%;" >}}

### エイリアスを作成する

データソースのカスタムエイリアスを作成して、ユーザーがグラフの結果を簡単に解釈できるようにすることができます。

{{< img src="dashboards/querying/custom_alias.png" alt="カスタムエイリアス" style="width:75%;" >}}

### タイトルの作成

タイトルを入力しなくても、選択内容に基づいてタイトルが自動的に生成されますが、グラフの内容を表すタイトルをご自身で作成することをお勧めします。

### 保存

作業内容を保存してエディターを終了するには **Done** をクリックします。いつでもエディターに戻ってグラフを変更できます。変更を加えた一方で、その内容を保存しない場合は、**Cancel** をクリックします。

## その他のオプション

### イベントオーバーレイ

{{< img src="/dashboards/querying/event_overlay_example.png" alt="RUM のエラーレートをデプロイイベントと重ね合わせて表示する時系列ウィジェット" style="width:100%;" >}}

[時系列][15]可視化のグラフエディタで **Event Overlays** セクションを使用して、イベントの相関関係を表示します。検索フィールドに、任意のテキストまたは構造化検索クエリを入力します。イベント検索では、[ログ検索構文][14]を使用します。

イベントオーバーレイは、すべてのデータソースをサポートしています。これにより、ビジネスイベントと Datadog のあらゆるサービスからのデータとの相関を容易にすることができます。

イベントオーバーレイを使えば、組織内のアクションがアプリケーションやインフラストラクチャーのパフォーマンスにどのような影響を与えるかを素早く確認することができます。以下に、使用例をいくつか紹介します。
- デプロイメントイベントを重ね合わせた RUM のエラーレート
- 余分なサーバーのプロビジョニングに関連するイベントと CPU 使用率を相関させる
- egress トラフィックと疑わしいログインアクティビティを相関させる
- Datadog が適切なアラートで構成されていることを確認するために、あらゆる時系列データとモニターアラートを相関させる


### スプリットグラフ

スプリットグラフを使えば、メトリクスをタグごとに分けて可視化することができます。

{{< img src="dashboards/querying/split_graph_beta.png" alt="フルスクリーンウィジェットでメトリクス container.cpu.usage のスプリットグラフを表示する" style="width:100%;" >}}

1. グラフ表示時に **Split Graph** タブでこの機能にアクセスします。
1. また、*sort by* メトリクスを変更することで、グラフ化しているデータと他のメトリクスとの関連性を確認することができます。
1. 表示するグラフの数を *limit to* の値で制限します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/graphing_json/
[2]: /ja/dashboards/guide/quick-graphs/
[3]: /ja/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /ja/metrics/advanced-filtering/
[8]: /ja/getting_started/tagging/
[9]: /ja/metrics/#time-aggregation
[10]: /ja/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /ja/dashboards/functions/rollup/
[12]: /ja/dashboards/functions/#function-types
[13]: /ja/metrics/advanced-filtering/#boolean-filtered-queries
[14]: /ja/logs/explorer/search_syntax/
[15]: /ja/dashboards/widgets/timeseries/#event-overlay
[16]: /ja/dashboards/template_variables/