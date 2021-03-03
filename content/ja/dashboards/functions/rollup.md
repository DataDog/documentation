---
title: ロールアップ
kind: documentation
aliases:
  - /ja/graphing/functions/rollup/
---
`.rollup()`

*上級ユーザーを対象とした説明です。*

クエリの末尾に `.rollup()` 関数を付けると、カスタムな[時間集計][1]を実行することができます。この関数では以下を定義できます。

* グラフ内の時間間隔（[クエリの制限よりもロールアップ間隔が長い場合](#rollup-interval-enforced-vs-custom)）。
* 指定した時間間隔でのデータポイントの集計方法。

この関数は `<METHOD>` と、オプションで `<TIME>`: `.rollup(<METHOD>,<TIME>)` または `.rollup(<METHOD>)` の 2 つのパラメーターをとります。

| パラメーター  | 説明                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<METHOD>` | `sum`/`min`/`max`/`count`/`avg` から選択し、指定した時間間隔でのデータポイントの集計方法を定義します。 |
| `<TIME>`   | 表示するデータポイント間の間隔（秒）。設定は任意。                                            |

この 2 つは別々に使用することも、あるいは `.rollup(sum,120)` のように一度に使用することもできます。次の画像は、あるホストの 1 週間分の CPU 使用率を、`.rollup()` 関数を**使わずに**棒グラフで表示したものです。

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1"  style="width:60%;" >}}

次の棒グラフは、同じメトリクスを、`.rollup(avg,86400)` を使用して 1 日ごとにロールアップしたものです。

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2"  style="width:60%;" >}}

## ロールアップの移動


| 関数        | 説明                                    | 例 |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | ロールアップして最後の X 秒中のポイントを結合します。 | `moving_rollup(<METRIC_NAME>, <TIME> , <METHOD>)` |


`moving_rollup()` 関数をクエリに適用することで、「最後の X 秒」など最も直近の特定の時間範囲にあるポイントを結合することができます。`.rollup()` を使用した場合と同様、`<METHOD>` には `sum`/`min`/`max`/`count`/`avg` が入り、指定された時間間隔の中で収集されるデータポイントを定義します。

## ロールアップ間隔: 強制またはカスタム

Datadog では、グラフごとに表示できるデータポイントは最大 350 に制限されています。そのため、`avg` メソッドによってデータポイントが自動的にロールアップされ、メトリクスのすべてのデータポイントが時間間隔の平均値で表示されます。

`.rollup()` 関数を作成して使用すると、時間集計のタイプ（`avg`、`min`、`max`、`count`、`sum`）とロールアップの時間間隔を指定できますが、その関数を適用することによって、Datadog の制限を超えて時間間隔が短くなる場合、時間集計のタイプは関数で指定したものが使われますが、時間間隔については Datadog による制限の方が優先されます。たとえば、1 か月分のメトリクスを `.rollup(20)` を使用してリクエストすると、ポイントの数が 350 を超えないように、20 秒よりも長い間隔でデータが戻されます。

**注**: `COUNT` と `RATE` のタイプのメトリクスは、自動的に `.as_count()` のモディファイアー付きで画面に表示されます。これにより、`sum` を設定したロールアップ関数が実行され、補間が無効になります。この `.as_count()` はクエリの末尾に明示的に表示されます。

  {{< img src="dashboards/functions/rollup/as_count.png" alt="as_count"  style="width:50%;">}}

`.as_count()` と `.as_rate()` の使用方法について詳しくは、[こちらのブログ記事][2]を参照してください。また、これらの関数の影響について詳しくは、[アプリ内モディファイアーに関するドキュメント][3]を参照してください。

## モニターでのロールアップ

通常は、[モニター][4]クエリでロールアップを使用することは避けるべきです。ロールアップ間隔とモニターの評価期間の整合性が取れなくなる可能性があるためです。ロールアップ間隔は、モニタークエリの開始や終了の時間ではなく、UNIX 時間に合わせて開始および終了します。そのため、ロールアップ間隔が短くなり、少量のサンプルデータだけでモニターが評価を行う（そしてトリガーする）可能性があります。これを避けるために、（少なくとも）設定されたロールアップの間隔だけモニターの評価を遅らせる必要があります。

## その他の関数

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/dashboards/functions/#proceed-to-time-aggregation
[2]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[3]: /ja/developers/metrics/type_modifiers/
[4]: /ja/monitors/monitor_types/metric/