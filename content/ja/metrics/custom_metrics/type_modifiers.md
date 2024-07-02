---
title: Metric Type Modifiers
aliases:
 - /developers/metrics/metric_type_modifiers
 - /graphing/faq/as_count_validation
 - /developers/metrics/type_modifiers/
 - /metrics/type_modifiers
further_reading:
- link: /developers/dogstatsd/
  tag: Documentation
  text: Learn more about DogStatsD
- link: /developers/community/libraries/
  tag: Documentation
  text: Official and Community created API and DogStatsD client libraries
---

メトリクスタイプは、メトリクスとそのエミッションソースで表す指標です。`COUNT` および `RATE` メトリクスタイプは、同じコンセプトである「経時的なメトリクス値の変化」を表すため、お互いとてもよく似ていますが、それぞれ異なるロジックを使用します。

* `RATE`: 正規化された値の経時的な変化（1秒ごと）。
* `COUNT`: 特定の時間間隔における絶対値の変化。

送信に適したメトリクスタイプは、使用例や送信方法によりそれぞれ異なります。たとえば、

| 送信されたメトリクスタイプ | 使用例                                                                                                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RATE`                | 複数のホストにおいて受信したリクエストの数を経時的にモニターしたい場合。                                                                                                    |
| `RATE`                | ソースでの経時的なカウント送信の一貫性をコントロールできないため、アップストリームで比較できるように個々の間隔で正規化します。 |
| `COUNT`               | 関数が呼び出された回数をカウントしたい場合。                                                                                                                            |
| `COUNT`               | 指定された期間内の収益を数える場合。                                                                                                        |

`RATE` および `COUNT` は同じメトリクスタイプではないため、Datadog のグラフおよびモニターにおける行動や形状が異なります。`RATE` と `COUNT` が表すメトリクスを調整するには、グラフやモニターで Datadog のアプリケーション内モディファイアー関数を使用します。

## アプリ内モディファイアー

主要なアプリ内モディファイアーは `as_count()` と `as_rate()` の2つです。

| モディファイアー    | 説明                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | `COUNT` 形式で指定されたメトリクスを表示するのに必要な操作を設定し、[rollup 間隔][2]のメトリクス値の絶対変数を取得します。**注:** Rollup 間隔に依存するため、[長めの間隔でグラフを作成するとグラフの形が変化します][3]。 |
| `as_rate()`  | `RATE` 形式で指定されたメトリクスを表示するのに必要な操作を設定し、1秒あたりのメトリクス値の絶対変数を取得します。                                                                                                                                     |

適用したメトリクスタイプに応じて、動作は異なります。

{{< tabs >}}
{{% tab "COUNT" %}}

* `as_count()` の効果
  * [補間][1]を無効にします。
  * 時間集計関数を `SUM` に設定します。
* `as_rate()` の効果
  * [補間][1]を無効にします。
  * 時間集計関数を `SUM` に設定します。
  * 正規化するため、集計後の結果をサンプル間隔で除算します。たとえば、rollup 間隔が 20 秒で毎秒  `[1,1,1,1].as_rate()` を送信する次のポイントは、`[0.05, 0.05, 0.05, 0.05]` を生成します。

**注**: 間隔が短くて時間集計が発生しない場合、正規化は行われず、未加工のメトリクス値カウントが戻されます。

[1]: /metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* `as_count()` の効果
  * [補間][1]を無効にします。
  * 時間集計関数を SUM に設定します。
  * 集計後の結果をサンプル間隔で乗算します。たとえば、rollup 間隔が 20 秒で毎秒 `[0.05, 0.05, 0.05, 0.05].as_count()` を送信する次のポイントは、`[1,1,1,1]` を生成します。
* `as_rate()` の効果
  * [補間][1]を無効にします。
  * 時間集計関数を `SUM` に設定します。

[1]: /metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "GAUGE" %}}

`GAUGE` メトリクスタイプはメトリクスの絶対値と最終値を表します。`as_count()` や `as_rate()` モディファイアーは影響しません。

{{% /tab %}}
{{< /tabs >}}

### 修飾子 `weighted()`

Tags such as `pod name` or `container_name` cause high tag churn, especially when creating queries for cost management, capacity planning, or autoscaling for containerized applications. To ensure mathematical accuracy of queries on gauges regardless of tag churn, you can use a `.weighted()` in-application modifier. The `.weighted()` modifier enables Datadog to properly weight metric values based on the lifespan of these frequently churning tags. 

The `.weighted()` modifier is automatically appended to queries on gauges only if both of the following conditions are met:

- 隙間なく補間することができるように、ゲージメトリクスが定期的に送信されている。
- 送信間隔が正しく定義され、設定されている。

Datadog Agent またはインテグレーションのいずれかが、取り込み時にメトリクスの送信間隔を設定します。[Metrics Summary ページ][4]で送信間隔を変更します。

## Modify a metric's type within Datadog

通常は必要ありませんが、[Metrics Summary ページ][4]でメトリクスのタイプを変更することができます。

{{< img src="metrics/custom_metrics/type_modifiers/metric_type.png" alt="メトリクスタイプ" style="width:70%;">}}

Example use case:

1. 処理されたリクエスト数をカウントする `app.requests.served` というメトリクスを、誤って StatsD から `GAUGE` として送信しました。そのため、そのメトリクスの Datadog タイプは `GAUGE` になっています。

2. 時間集計のため、`app.requests.served` は、StatsD の `COUNT` メトリクスとして送信するつもりでした。そうすれば、「昨日処理されたリクエスト数の合計はいくつか」という質問には、`sum:app.requests.served{*}` というクエリで答えることができます (`GAUGE` メトリクスタイプでは意味がないクエリです)。

3. しかし、`app.requests.served` という名前を引き続き使いたいので、適切な `COUNT` タイプの新しいメトリクス名を送信するのではなく、`app.requests.served` のタイプを変更することにしました。
  * N 個のリクエストが処理された後で `dogstatsd.increment('app.requests.served', N)` を呼び出すように、送信コードを更新します。
  * メトリクスサマリーページから Datadog アプリ内タイプを `RATE` に更新します。

この結果、`app.requests.served` のタイプを変更する前に送信されたデータは、正しく動作しません。これは、アプリ内タイプ `RATE` ではなく `GAUGE` として解釈される形式で保存されているためです。手順 3 の後に送信されるデータは、正しく解釈されます。

`GAUGE` として送信された履歴データを失いたくない場合は、`app.requests.served` のタイプは変更せずに、適切なタイプの新しいメトリクス名を作成します。

**注**: Agent チェックの `self.increment` は、単調増加カウンターの増分を計算するのではなく、チェック実行時に渡された値を報告します。単調増加カウンターの増分値を送信する場合は、`self.monotonic_count` を使用してください。

[1]: /metrics/types/
[2]: /metrics/introduction/#time-aggregation
[3]: /dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/summary
