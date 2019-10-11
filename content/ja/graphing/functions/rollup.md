---
title: ロールアップ
kind: documentation
---
`.rollup()`

上級ユーザーにのみお勧めします。Datadog は、アプリ内メトリクスタイプに基づいて自動的にデータポイントをロールアップします。たとえば、デフォルトでは、`gauge` メトリクスは平均化され、`count` および `rate` メトリクスは合計されます。この関数をクエリの末尾に付加すると、デフォルトの動作を上書きして、ロールアップ方法を制御したり、ロールアップしたポイントをグラフにプロットする元のポイントの数を指定したりすることができます。

この関数 `.rollup(method,time)` は、メソッドと時間の 2 つのパラメーターを持ちます。メソッドには sum、min、max、count、または avg を指定でき、時間は秒数です。どちらか一方、または `.rollup(sum,120)` のように両方を使用できます。Datadog には、タイムレンジあたり 350 ポイントという上限があります。たとえば、1 か月のウィンドウに対して `.rollup(20)` を要求しても、膨大な数のポイントが返されないように、20 秒よりはるかに長いロールアップでデータが返されます。

通常、[モニター][1]クエリではロールアップを避ける必要があります。ロールアップ間隔とモニターの評価ウィンドウの間に不整合が生じる可能性があるためです。ロールアップ間隔の開始と終了は、モニタークエリの開始と終了ではなく、UNIX 時間に合わせることができます。つまり、少量のデータサンプルしか入っていない不完全なロールアップ間隔をモニターが評価する (およびトリガーする) 場合があります。この問題を避けるには、(少なくとも) ロールアップ間隔の長さだけモニターの評価を遅らせる必要があります。

## .as_count() または as_rate()

これらの関数は、StatsD からレートまたはカウンターとして送信されたメトリクスに使用され、他のメトリクスタイプに影響しません。`.as_count()` と `.as_rate()` の使用方法については、[ブログ記事][2]を参照してください。

注: [`as_count()` を使用できるクエリは `sum()` だけです][3] (ロールアップサマリーを使用していない場合)。これは、このような動作に対して数学的に正確な唯一の関数です。

## その他の関数

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/monitors/monitor_types/metric
[2]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[3]: /ja/graphing/faq/as_count_validation