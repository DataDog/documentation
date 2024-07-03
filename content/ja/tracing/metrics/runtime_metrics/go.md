---
aliases:
- /ja/tracing/runtime_metrics/go
code_lang: go
code_lang_weight: 60
description: Gain additional insights into your Go application's performance with
  the runtime metrics associated to your traces.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Connect your Logs and Traces together
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Manually instrument your application to create traces.
- link: tracing/glossary/
  tag: Documentation
  text: Explore your services, resources, and traces
title: Go Runtime Metrics
type: multi-code-lang
---

## 自動コンフィギュレーション

Go ランタイムメトリクスの収集を有効にするには、`WithRuntimeMetrics` オプションを使用してトレーサーを起動します。

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

View runtime metrics in correlation with your Go services on the [Service Catalog][1] in Datadog.

デフォルトでは、アプリケーションからのランタイムメトリクスは、DogStatsD で Datadog Agent に 10 秒ごとに送信されます。[Agent で DogStatsD が有効になっていること][2]を確認してください。Datadog Agent の DogStatsD のアドレスがデフォルトの `localhost:8125` と異なる場合は、[`WithDogstatsdAddress`][3] オプション (1.18.0 以降で使用可能) か環境変数 `DD_AGENT_HOST` と `DD_DOGSTATSD_PORT` を使用するようにしてください。

`WithDogstatsdAddress` が使われていない場合、トレーサーは以下のルールに従って statsd サービスのアドレスを決定しようとします。
  1. `/var/run/datadog/dsd.socket` を探し、存在すればそれを使用します。ない場合は、#2 へ進みます。
  2. ホストは `DD_AGENT_HOST` によって決定され、デフォルトは "localhost" です。
  3. ポートは Agent から取得されます。存在しない場合は `DD_DOGSTATSD_PORT` によって決定され、デフォルトは `8125` です。

Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [が `true` に設定されている][4]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。また、Kubernetes または ECS の場合は、以下のガイドラインに従ってください。

- **Kubernetes**: [DogstatsD ポートをホストポートにバインドする][5] _必要があります_。
- **ECS**。[タスク定義で適切なフラグを設定します][6]。

Alternatively, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport. For more information, read [DogStatsD over Unix Domain Socket][8].

## 収集データ

以下のメトリクスは Go メトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "go" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの Go ランタイムダッシュボード][7]を提供します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/developers/dogstatsd/#setup
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[4]: /ja/agent/docker/#dogstatsd-custom-metrics
[5]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[6]: /ja/agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30587/go-runtime-metrics
[8]: /ja/developers/dogstatsd/unix_socket/