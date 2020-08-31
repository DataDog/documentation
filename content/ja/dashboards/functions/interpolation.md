---
title: 補間
kind: documentation
aliases:
  - /ja/graphing/functions/interpolation/
---
## フィル

| 関数 | 説明                                       | 例                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | メトリクスに欠落しているメトリクス値を補間します。 | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

`fill()` 関数は 2 つのパラメーターを持ちます。

* **`METHOD`**: 補間方法として使用する関数。以下から選択します。
    * **linear**: ギャップの最初から最後までを線形補間します。
    * **last**: ギャップの最後の値でギャップを埋めます。
    * **zero**: ゼロ値でギャップを埋めます。
    * **null**: 補間を無効にします。

* `LIMIT` [*任意*、*デフォルト*=**300**、*最大*=**600**]: 補間するギャップの最大サイズを表す補間制限 (秒単位)。

## その他の関数

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}