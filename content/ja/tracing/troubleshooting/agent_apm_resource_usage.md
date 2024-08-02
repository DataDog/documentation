---
title: APM による Agent のリソース使用量
---


Agent は CPU バウンドで、その CPU 使用量は 1 秒間に受信するスパンの数に相関しています。

Agent は未処理のペイロードをメモリ上にバッファリングするため、CPU の上限が足りないために Agent のプロセスをスロットルすると、メモリ不足の問題が発生する可能性があります。

## CPU の外れの検出

CPU 使用量を監視し、CPU 不足の問題を検出するには、Agent に構成された[最大 CPU 割合][1]と `datadog.trace_agent.cpu_percent` メトリクスを比較します。`datadog.trace_agent.cpu_percent` メトリクスは、CPU 使用量をコアに対する割合で表示します。例えば、`50` の値は半分のコア、`200` は 2 つのコアです。

[Agent APM メトリクス][2]の全リストをご覧ください。



## リソース要件

Agent の適切なリソース制限を計算するための良い指標は、`datadog.trace_agent.receiver.spans_received` メトリクスで報告される、1 秒あたりの受信スパンの数です。
このメトリクスの値に基づいて、以下の表に従い、適切な CPU とメモリの制限を選択します。

| 1 秒あたりのスパン数  | CPU (コア)   | メモリ (MB)  |
|----------|--------------|--------------|
| 2000       | 0.05         | 35           |
| 11 000      | 0.2          | 40           |
| 32 000      | 0.6          | 60           |
| 58 000      | 1            | 70           |
| 130 000     | 2            | 130          |

**注:**
- 値は Agent `7.39.0` のベンチマークに基づくものです。
- ベンチマークは AWS の `c5.2xlarge` インスタンス (8 VCPU/ 16GiB RAM) で実行されました。

[1]: /ja/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[2]: /ja/tracing/send_traces/agent-apm-metrics/