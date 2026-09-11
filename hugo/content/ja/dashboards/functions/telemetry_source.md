---
aliases:
- /ja/graphing/functions/telemetry_source/
description: メトリクスクエリがクエリされたメトリクスのみを使用するか、同等の Datadog および OpenTelemetry メトリクスを結合するかを制御します。
further_reading:
- link: /metrics/open_telemetry/query_metrics
  tag: ドキュメント
  text: Datadog メトリクスと OpenTelemetry メトリクスを合わせてクエリする
title: テレメトリソース
---
テレメトリソースクエリ修飾子は、メトリクスクエリがクエリされたメトリクスのみを使用するか、同等の Datadog および OpenTelemetry メトリクスを結合するかを制御します。両方のソースを合わせてクエリする方法の詳細については、[Datadog メトリクスと OpenTelemetry メトリクスを合わせてクエリする][1]を参照してください。

クエリエディタで、[**Modify**] (修正) を選択し、次に [**Telemetry sources**] (テレメトリソース) セクションでオプションを選択します。

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="[Combined telemetry] (結合テレメトリ) が選択されている状態のテレメトリソースクエリ修飾子。" style="width:75%;" >}}

| UI オプション| JSON値 | 動作|
|---|---|---|
| **ネイティブテレメトリ**(デフォルト) | `"semantic_mode": "native"` | クエリされたメトリクスのみを返します。別のテレメトリソースからの同等のメトリクスは含めません。|
| **結合テレメトリ** | `"semantic_mode": "combined"` | 同等の Datadog メトリクスと OpenTelemetry メトリクスを単一のクエリ結果に結合します。|

JSON エディタでテレメトリソースを設定するには、クエリオブジェクトに `semantic_mode` キーを追加します。

{{< highlight json "hl_lines=6" >}}
"queries": [
    {
        "name": "query1",
        "data_source": "metrics",
        "query": "sum:go.goroutine.count{*}",
        "semantic_mode": "combined"
    }
]
{{< /highlight >}}

## その他の関数 {#other-functions}

{{< whatsnext desc="他の利用可能な関数については、以下を参照してください。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: 異常または外れ値検出を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術演算: 算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: ゼロ以外または NULL 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: デフォルト値を入力または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスのサブセットのみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: 機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: 使用する生データポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムージング: メトリクスの変動をスムーズにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: タイムラインに沿ってメトリクスデータポイントをシフトします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}ベータ: メトリクスのローリング平均を計算します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/open_telemetry/query_metrics