---
algolia:
  tags:
  - anomaly
  - anomaly graph
aliases:
- /ja/graphing/functions/algorithms/
title: Algorithms
---

## 異常値

| 関数      | 説明                                                                                | 例                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | 過去から予測される系列の挙動を示す灰色の帯をメトリクスに重ねて表示します。 | `anomalies(<METRIC_NAME>{*}, '<ALGORITHM>', <BOUNDS>)` |

`anomalies()` 関数は 2 つのパラメーターを持ちます。

* `ALGORITHM`: 異常値を検出するために使用される手法。
* `BOUNDS`: 灰色の帯の幅。`bounds` は、使用するアルゴリズムに対する標準偏差と解釈できます。この値を 2 ～ 3 にすると、大半の「正常」なポイントがこの幅に収まります。

**注**: Agile または Robust 異常検知アルゴリズムを Weekly または Daily 季節性と共に使用する場合は、API と UI の両方でローカルタイムゾーンを考慮するように異常検知モニターを更新できます。

次は 2 分間の説明ビデオです。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/188833506/rendition/1080p/file.mp4?loc=external&signature=96eacc46a18438ce0f45d5b57952cd924482f8f18e011ceb7b76b6ce1b4587a2" poster="/images/poster/algorithms.png" >}}

**季節性**: デフォルトでは、`robust` と `agile` アルゴリズムは[週ごとの季節性][4]を使用します。これは、ベースラインを計算するために 3 週間の履歴データを必要とします。

詳細については、[異常値モニター][1]のページを参照してください。

## 外れ値

| 関数     | 説明                | 例                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | 外れ値系列をハイライトします。 | `outliers(<METRIC_NAME>{*}, '<ALGORITHM>', <TOLERANCE>, <PERCENTAGE>)` |

`outliers()` 関数は 3 つのパラメーターを持ちます。

* `ALGORITHM`: 使用する外れ値アルゴリズム
* `TOLERANCE`: 外れ値アルゴリズムの許容範囲
* `PERCENTAGE`: 系列を外れ値とするために必要な外れポイントの割合 (MAD および scaledMAD アルゴリズムのみ)

{{< img src="dashboards/functions/algorithms/outlier.mp4" alt="外れ値の検出" video="true" width="70%" >}}

詳細については、[外れ値モニター][2]のページを参照してください。

## 予測

| 関数     | 説明                | 例                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `forecast()`  | メトリクスが今後どこに向かうかを予測します。 | `forecast(<METRIC_NAME>{*}, '<ALGORITHM>', <DEVIATIONS>)` |

`forecast()` 関数は 2 つのパラメーターを持ちます。

* `ALGORITHM`: 使用する予測アルゴリズム。`linear` または `seasonal` を選択します。これらのアルゴリズムの詳細については、[予測値アルゴリズム][3]のセクションを参照してください。
* `DEVIATIONS`: 予測値の範囲の幅。この値を 1 ～ 2 にすると、大半の「正常」ポイントを正確に予測できます。

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

[1]: /ja/monitors/types/anomaly/
[2]: /ja/monitors/types/outlier/
[3]: /ja/monitors/types/forecasts/?tab=linear#algorithms
[4]: /ja/monitors/types/anomaly/?s=anomaly%20algorithm#seasonality