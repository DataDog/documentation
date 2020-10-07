---
title: アルゴリズム
kind: documentation
aliases:
  - /ja/graphing/functions/algorithms/
---
## 異常値

| 関数      | 説明                                                                                | 例                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | 過去から予測される系列の挙動を示す灰色の帯をメトリクスに重ねて表示します。 | `anomalies(METRIC_NAME>{*}, '<ALGORITHM>', <BOUNDS>)` |

`anomalies()` 関数は 2 つのパラメーターを持ちます。

* `ALGORITHM`: 異常値を検出するために使用される手法。
* `BOUNDS`: 灰色の帯の幅。`bounds` は、使用するアルゴリズムに対する標準偏差と解釈できます。この値を 2 ～ 3 にすると、大半の「正常」なポイントがこの幅に収まります。

**注**: Agile または Robust 異常検知アルゴリズムを Weekly または Daily 季節性と共に使用する場合は、API と UI の両方でローカルタイムゾーンを考慮するように異常検知モニターを更新できます。

次は 2 分間の説明ビデオです。

{{< vimeo 188833506 >}}

詳細については、[異常値モニター][1]のページを参照してください。

## 外れ値

| 関数     | 説明                | 例                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | 外れ値系列をハイライトします。 | `outliers(<METRIC_NAME>{*}, '<ALGORITHM>', <TOLERANCE>, <PERCENTAGE>)` |

`outliers()` 関数は 3 つのパラメーターを持ちます。

* `ALGORITHM`: 使用する外れ値アルゴリズム
* `TOLERANCE`: 外れ値アルゴリズムの許容範囲
* `PERCENTAGE`: 系列を外れ値とするために必要な外れポイントの割合 (MAD および scaledMAD アルゴリズムのみ)

{{< img src="dashboards/functions/algorithms/outlier.mp4" alt="外れ値の検出" video="true"  width="70%" >}}

詳細については、[外れ値モニター][2]のページを参照してください。

## 予測値

| 関数     | 説明                | 例                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `forecast()`  | メトリクスが今後どこに向かうかを予測します。 | `forecast(<METRIC_NAME>{*}, '<ALGORITHM>', <DEVIATIONS>)` |

`forecast()` 関数は 2 つのパラメーターを持ちます。

* `ALGORITHM`: 使用する予測アルゴリズム。`linear` または `seasonal` を選択します。これらのアルゴリズムの詳細については、[予測値アルゴリズム][3]のセクションを参照してください。
* `DEVIATIONS`: 予測値の範囲の幅。この値を 1 ～ 2 にすると、大半の「正常」ポイントを正確に予測できます。

予測値は独自に視覚化されるため、多数のグラフ作成オプションは非表示になります。**予測値**が正常に追加されると、エディターは以下のように表示されます。

{{< img src="dashboards/functions/algorithms/forecast_query.png" alt="クエリエディター"  style="width:80%;">}}

## その他の関数

{{< whatsnext desc="他に利用できる関数を参照します。" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/monitors/monitor_types/anomaly/
[2]: /ja/monitors/monitor_types/outlier/
[3]: /ja/monitors/monitor_types/forecasts/#forecast-algorithms