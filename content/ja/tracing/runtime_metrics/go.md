---
description: Go アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
further_reading:
- link: tracing/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/manual_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/opentracing
  tag: ドキュメント
  text: アプリケーション全体に Opentracing を実装します。
- link: tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: Go ランタイムメトリクス
---

## 自動コンフィギュレーション

Go ランタイムメトリクスの収集を有効にするには、`WithRuntimeMetrics` オプションを使用してトレーサーを起動します。

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

Datadog の[サービス詳細画面][1]でランタイムメトリクスを Go サービスと相関して表示します。

デフォルトでは、アプリケーションからのランタイムメトリクスは、DogStatsD で Datadog Agent に 10 秒ごとに送信されます。[Agent で DogStatsD が有効になっていること][2]を確認してください。Datadog Agent の DogStatsD のアドレスがデフォルトの `localhost:8125` と異なる場合は、[`WithDogstatsdAddress`][3] オプション (1.18.0 以降で使用可能) か環境変数 `DD_AGENT_HOST` と `DD_DOGSTATSD_PORT` を使用するようにしてください。

`WithDogstatsdAddress` が使われていない場合、トレーサーは以下のルールに従って statsd サービスのアドレスを決定しようとします。
  1. `/var/run/datadog/dsd.socket` を探し、存在すればそれを使用します。ない場合は、#2 へ進みます。
  2. ホストは `DD_AGENT_HOST` によって決定され、デフォルトは "localhost" です。
  3. ポートは Agent から取得されます。存在しない場合は `DD_DOGSTATSD_PORT` によって決定され、デフォルトは `8125` です。

Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [が `true` に設定されている][4]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。また、Kubernetes または ECS の場合は、以下のガイドラインに従ってください。

- **Kubernetes**: [DogstatsD ポートをホストポートにバインドする][5] _必要があります_。
- **ECS**。[タスク定義で適切なフラグを設定します][6]。

## 収集データ

以下のメトリクスは Go メトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "go" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの Go ランタイムダッシュボード][7]を提供します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/developers/dogstatsd/#setup
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[4]: /ja/agent/docker/#dogstatsd-custom-metrics
[5]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[6]: /ja/agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30587/go-runtime-metrics