---
aliases:
- /ja/tracing/runtime_metrics/python
code_lang: python
code_lang_weight: 20
description: Python アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: ログとトレースの接続
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
kind: documentation
title: Python ランタイムメトリクス
type: multi-code-lang
---

<div class="alert alert-warning">
これは公開ベータ版の機能です。
</div>

## 自動コンフィギュレーション

ランタイムメトリクスの収集は、`ddtrace-run` 環境で実行している場合 `DD_RUNTIME_METRICS_ENABLED=true` の環境パラメーターで有効にできます。

`ddtrace-run` を使用していない場合は、コードでランタイムメトリクスの収集を有効にできます。

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

ランタイムメトリクスは、Python サービスと相関して表示できます。Datadog の[サービス詳細画面][1]を参照してください。

**注**: ランタイム UI では、`ddtrace` >= [`0.24.0`][2] がサポートされています。

初期設定では、アプリケーションからのランタイムメトリクスは DogStatsD のポート `8125` から Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][3]を確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [true に設定されていること][4]、また Agent 上でポート `8125` が開いていることを確認してください。
Kubernetes では、[DogstatsD ポートをホストポートにバインド][5]し、ECS では[タスク定義で適切なフラグを設定][6]します。

## 収集データ

以下のメトリクスはランタイムメトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "python" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの Python ランタイムメトリクスダッシュボード][7]を提供します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[4]: /ja/agent/docker/#dogstatsd-custom-metrics
[5]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[6]: /ja/agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics
