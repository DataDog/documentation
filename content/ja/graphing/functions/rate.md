---
title: レート
kind: documentation
---

## 毎秒

| 関数       | 説明                                                | 例                        |
| :----          | :-------                                                   | :---------                     |
| `per_second()` | 1 秒あたりのメトリクスの変化の割合をグラフ化します。 | `per_second(<METRIC_NAME>{*})` |


## 毎分

| 関数       | 説明                                                | 例                        |
| :----          | :-------                                                   | :---------                     |
| `per_minute()` | 1 分あたりのメトリクスの変化の割合をグラフ化します。 | `per_minute(<METRIC_NAME>{*})` |

## 毎時

| 関数     | 説明                                              | 例                      |
| :----        | :-------                                                 | :---------                   |
| `per_hour()` | 1 時間あたりのメトリクスの変化の割合をグラフ化します。 | `per_hour(<METRIC_NAME>{*})` |

## 時間の差分

| 関数 | 説明                                         | 例                |
| :----    | :-------                                            | :---------             |
| `dt()`   | 送信されたポイント間の時間の差 (秒単位) をグラフ化します。 | `dt(<METRIC_NAME>{*})` |

## 値の差分

| 関数 | 説明                    | 例                  |
| :----    | :-------                       | :---------               |
| `diff()` | メトリクスの差分をグラフ化します。 | `diff(<METRIC_NAME>{*})` |


## 微分係数

| 関数       | 説明                                   | 例                        |
| :----          | :-------                                      | :---------                     |
| `derivative()` | メトリクスの微分係数 (diff/dt) をグラフ化します。 | `derivative(<METRIC_NAME>{*})` |

## その他の関数

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}
