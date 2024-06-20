---
title: カウント
aliases:
  - /ja/graphing/functions/count/
---
## 0 以外のカウント

| 関数          | 説明                           | 例                           |
| :----             | :-------                              | :---------                        |
| `count_nonzero()` | すべての 0 以外の値の個数を計算します。 | `count_nonzero(<METRIC_NAME>{*})` |

1 つ以上の[タグキー][1]によってグループ化されたクエリの場合は、各ポイントで 0 以外のメトリクス値を持つタグ値の数をカウントします。

例: `count_nonzero(system.cpu.user{*} by {host})` は、各ポイントでシステム負荷が 0 以外のホストの数を表す時系列を返します。

{{< img src="dashboards/functions/count/count_nonzero.png" alt="非ゼロをカウント" style="width:80%;">}}

注: `count_nonzero_finite()` は、`count_nonzero()` のエイリアスとして使用できます。

## null 以外のカウント

| 関数           | 説明                           | 例                            |
| :----              | :-------                              | :---------                         |
| `count_not_null()` | すべての null 以外の値の個数を計算します。 | `count_not_null(<METRIC_NAME>{*})` |

1 つ以上の[タグキー][1]によってグループ化されたクエリの場合は、各ポイントで null 以外のメトリクス値を持つタグ値の数をカウントします。メトリクス値が null になるのは、有限値がない場合です。

例: `count_not_null(system.cpu.user{*} by {host})` は、各ポイントでシステム負荷が null 以外のホストの数を表す時系列を返します。

{{< img src="dashboards/functions/count/count_not_null.png" alt="非 null をカウント" style="width:80%;">}}

## その他の関数

{{< whatsnext desc="他に利用できる関数を参照します。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/getting_started/tagging/