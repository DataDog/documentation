---
title: クエリからグラフまで
kind: documentation
aliases:
  - /ja/examples/
  - /ja/examples/aws-metrics/
  - /ja/examples/month_before/
  - /ja/examples/graphing-functions/
  - /ja/examples/day_before/
  - /ja/examples/json-editing/
  - /ja/examples/nginx-metrics/
  - /ja/examples/dashboards/
  - /ja/examples/hour_before/
  - /ja/examples/os-metrics/
  - /ja/examples/week_before/
  - /ja/examples/cassandra-metrics/
  - /ja/graphing/miscellaneous/functions
  - /ja/graphing/miscellaneous/
  - /ja/getting_started/from_the_query_to_the_graph
  - /ja/graphing/miscellaneous/from_the_query_to_the_graph
---
Datadog ではグラフを簡単に設定できますが、ここでは、Datadog のグラフ作成システムの価値をさらに活用することを目指します。

この記事では主に、さまざまなグラフ設定を選択する際の参考になるように、クエリからグラフまで、Datadog のグラフ作成システムを実行する手順について説明します。

例として、メトリクス **system.disk.total** を使用します。このメトリクスに関連付けられて、特定のサーバー (`host:moby`) から取得されたデータをグラフ化するとします。

[Timeboard][1]/[Screenboard][2]で新しいグラフを設定する際はエディターを使用できますが、JSON タブに切り替えて高度なクエリを設定することもできます。

{{< img src="graphing/miscellaneous/from_query_to_graph/graph_metric.png" alt="graph_metric"  style="width:75%;">}}

ここでは、Datadog のバックエンドがクエリを実行してダッシュボード上にグラフ線を描画するために実行する手順を、1 つずつ見ていきます。

それぞれの手順で、各クエリパラメーターが及ぼす影響に着目します。
**クエリを実行する前に、ストレージデータがタグに基づいて別途保存されます。**

メトリクス `system.disk.total` ([Datadog Agent][3] によってデフォルトで収集される) は、さまざまなソースから取得されます。

これは、このメトリクスがさまざまなホストから報告され、各 Datadog Agent がこのメトリクスをデバイスごとに収集するためです。たとえば、tmpfs という名前のディスクに関連付けられたデータを送信する際は、メトリクス `system.disk.total` にタグ `device:tmpfs` が追加されます。

このように、このメトリクスはさまざまな `{host, device}` タグの組み合わせで取得されます。

データは、ソース (ホストとタグセットで定義される) ごとに別々に保存されます。
この例では、`host:moby` に 5 つのデバイスがあります。したがって、以下の 5 つの時系列 (各ソースから送信されたすべてのデータポイントの履歴) が保存されます。

* `{host:moby, device:tmpfs}`
* `{host:moby, device:cgroup_root}`
* `{host:moby, device:/dev/vda1}`
* `{host:moby, device:overlay}`
* `{host:moby, device:shm}`

次に、上述のクエリに対してバックエンドが実行する一連の手順を説明しましょう。

## クエリに必要な時系列を見つける

このクエリでは、`host:moby` に関連するデータのみを要求しました。したがって、Datadog のバックエンドが最初に行う手順は、すべてのソース (この例の場合はメトリクス `system.disk.total` を送信したすべての `{host, device}` の組み合わせ) をスキャンして、クエリのスコープに該当するソースのみを保持することです。

おわかりのように、バックエンドは一致するソースを 5 つ見つけます (前項を参照)。

{{< img src="graphing/miscellaneous/from_query_to_graph/metrics_graph_2.png" alt="metrics_graph_2"  style="width:70%;">}}

目標は、これらのソースから取得したデータを集計して、ホストの `system.disk.total` を表すメトリクスを得ることです。これは、[手順 3][4] で行われます。

**注**: Datadog が採用しているタグ付けシステムはシンプルかつ強力です。結合するソースを知っている必要も、指定する必要もありません。ソースの ID となるタグを指定するだけで、Datadog がその ID を持つすべてのデータを結合し、その他のデータは除外します。たとえば、`system.disk.total{*}` をクエリする際に、ホストやデバイスの数を知っている必要はありません。Datadog が自動的にすべてのソースからデータを取得して集計します。

[時系列とタグの粒度の詳細][5]

**関連パラメーター: スコープ**  
複数のタグを使用できます。たとえば、2 つのタグに対応するデータを取得する場合は、`{host:moby, device:udev}` のようにします。

## 時間集計に進む

Datadog のバックエンドは、グラフの時間範囲に対応するすべてのデータを選択します。

しかし、さまざまなソースから取得したすべてのデータを結合 (手順 3) する前に、時間集計を行う必要があります。

### 理由

Datadog はデータを 1 秒の粒度で保存するため、グラフに実際のデータをすべて表示することはできません。グラフのデータがどのように集計されるかについては、[こちらの記事をご参照ください][6]。

たとえば、1 週間のタイムウィンドウでグラフを表示する場合、ブラウザに数十万個の値を送信する必要があります。しかも、画面のごく一部を占めるだけのウィジェット内にすべてのポイントをグラフにして表示することは不可能です。このような理由から、グラフを描画するにはデータの集計手順に進み、ブラウザに送信するポイント数を制限する必要があります。

### 粒度

たとえば、'lines' (折れ線グラフ) を表示する 1 日ビューの場合、データポイントは 5 分ごとに 1 つです。Datadog のバックエンドは、1 日を 288 個の 5 分バケットにスライスします。そして、バケットごとにすべてのデータを 1 つの値に集約 (rollup) します。たとえば、07:00 というタイムスタンプでグラフに描画されたデータポイントは、実際にはその日の 07:00:00 から 07:05:00 までの間に送信されたすべてのデータポイントの総計です。

### 方法

デフォルトでは、Datadog のバックエンドはすべての実際の値の平均を求めることで rollup 集計を計算します。これでズームアウトしたときにもグラフが滑らかになります。タイムフレームをズームアウトしてもグラフが滑らかになる理由については、[こちらをご参照ください][7]。
大きなタイムウィンドウでデータを表示する限り、ソースの数が 1 個でも 1,000 個でも、データ集計を行う必要があります。通常、グラフに表示されるのは送信された実際の値ではなく、ローカルな集計値です。

{{< img src="graphing/miscellaneous/from_query_to_graph/metrics_graph_3.png" alt="metrics_graph_3"  style="width:75%;">}}

バックエンドは、クエリに対応するソースごとにローカルな集計値からなる系列を計算します。

ただし、この集計の実行方法は制御できます。

**関連パラメーター: ロールアップ (任意)**
'rollup' 関数の使用方法については、[こちらをご参照ください][8]。

この例の `rollup(avg,60)` は、60 秒の集計期間を定義しています。したがって、X 分間は 1 分単位の Y 個の時間間隔にスライスされます。特定の 1 分間のデータは 1 つのポイントに集約され、(手順 3 の空間集計後に) グラフに表示されます。

Datadog のバックエンドは、時間間隔の数を最大 300 個に抑えようとします。そのため、2 か月のタイムウィンドウに対して `rollup(60)` を行っても、要求した 1 分の粒度は得られません。

## 空間集計に進む

さまざまなソースから取得したデータを 1 つの折れ線グラフにまとめます。

ソースごとに最大 300 個のポイントがあり、それぞれのポイントが 1 分を表します。
この例では、Datadog は 1 分ごとにすべてのソースの平均を計算し、その結果、以下のようなグラフが作成されます。

{{< img src="graphing/miscellaneous/from_query_to_graph/metrics_graph_4.png" alt="metrics_graph_4"  style="width:75%;">}}

取得された値 (25.74GB) は、すべてのソースによって報告された値の平均です (前の画像を参照)。

注: もちろん、ソースが 1 つしかない場合 (たとえば、クエリのスコープとして `{host:moby, device:/dev/disk}` を選択した場合)、空間集計を行う必要がないため、`sum`/`avg`/`max`/`min` を使用しても影響はありません。[詳細はこちらをご参照ください][9]。

**関連パラメーター: 空間集計関数**

Datadog は、次の 4 つの空間集計関数を提供しています。

* `max`
* `min`
* `avg`
* `sum` 

## 関数の適用 (任意)

ほとんどの関数は最後の手順で適用されます。関数は、時間集計 (手順 2) と空間集計 (手順 3) の後に取得された最大 300 個のポイントから、グラフ内に表示できる新しい値を計算します。

この例では、関数 `abs` を使用して、結果を正の数で表示します。

**関連パラメーター: 関数**

{{< whatsnext desc="関数の種類を選択してください。" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}カウント: メトリクスの 0 または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}回帰: メトリクスに機械学習機能を適用します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

### クエリのグループ化、算術演算、as_count/rate

#### クエリのグループ化 

{{< img src="graphing/miscellaneous/from_query_to_graph/metric_graph_6.png" alt="metric_graph_6"  style="width:75%;">}}

ロジックは同じです。

1. Datadog のバックエンドは、選択されたソースに関連付けられているすべてのデバイスを見つけます。
2. バックエンドは、この記事で説明されているようにデバイスごとにクエリ `system.disk.total{host:example, device:<device>}` を実行します。
3. 最終的な結果が、すべて同じグラフ内でグラフ化されます。

{{< img src="graphing/miscellaneous/from_query_to_graph/metric_graph_7.png" alt="metric_graph_2"  style="width:75%;">}}

**注**: `rollup` または `as_count` モディファイアーは、「by {`device`}」の記述の後に置く必要があります。

**注 2**: `system.disk.in_use{*} by {host,device}` のように複数のタグを使用できます。

#### 算術演算

時間集計と空間集計の後に算術演算も適用されます ([手順 4: 関数の適用](#apply-functions-optional)を参照)。

{{< img src="graphing/miscellaneous/from_query_to_graph/metric_graph_8.png" alt="metric_graph_8"  style="width:75%;">}}

#### as_count と as_rate

`as_count` と `as_rate` は、StatsD/DogStatsD から送信されたレートとカウンターに固有の時間集計関数です。これらを使用して、メトリクスを 1 秒あたりのレートとして表示したり、元のカウント数として表示したりすることができます。
構文: rollup を追加する代わりに、`.as_count()` または `.as_rate()` を使用できます。

詳細は、[こちらのブログ記事][10]
および [StatsD/DogStatsD に関するドキュメント][11]をご参照ください。


[1]: /ja/graphing/dashboards/timeboard
[2]: /ja/graphing/dashboards/screenboard
[3]: /ja/agent
[4]: #proceed-to-space-aggregation
[5]: /ja/developers/metrics/custom_metrics
[6]: /ja/graphing/faq/how-is-data-aggregated-in-graphs
[7]: /ja/graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
[8]: /ja/graphing/functions/rollup
[9]: /ja/graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
[10]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[11]: /ja/developers/dogstatsd