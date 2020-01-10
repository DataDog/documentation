---
title: ランタイムメトリクス
kind: documentation
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: トレースの加工
    text: ログとトレースの接続
  - link: tracing/manual_instrumentation
    tags: トレースの加工
    text: アプリケーションを手動でインストルメントしてトレースを作成します。
  - link: tracing/opentracing
    tags: トレースの加工
    text: アプリケーション全体に Opentracing を実装します。
  - link: tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースの詳細
---
トレースクライアントでランタイムメトリクス収集を有効にすると、アプリケーションのパフォーマンスに関する詳細情報を得られます。ランタイムメトリクスは、[サービス][1]のコンテクストで表示することが可能で、要求された時点でのトレースビューに関連付けられ、プラットフォームのあらゆる場所で使用できます。

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

## 自動コンフィギュレーション

{{< tabs >}}
{{% tab "Java" %}}

JVM メトリクス収集は、初期設定で Java トレーサー v0.29.0+ に有効になっています。トレースクライアントの設定パラメーターで、システムプロパティ `-Ddd.jmxfetch.enabled=false` または環境変数 `DD_JMXFETCH_ENABLED=false` を使用して無効にすることも可能です。

JVM メトリクスは、Java サービスと相関して表示できます。Datadog の[サービス詳細画面][1]を参照してください。

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="JVM Runtime"  >}}

初期設定では、アプリケーションからのランタイムメトリクスは、ポート `8125` を介して DogStatsD と共に Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。

Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [が `true` に設定されている][3]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。また、

* **Kubernetes**: [DogstatsD ポートをホストポートにバインドする][4] *必要があります*。
* **ECS**。[タスク定義で適切なフラグを設定します][5]。

**注**:

* ランタイム UI では、`dd-trace-java` >= [`0.24.0`][6] がサポートされています。
* フレームグラフ内で JVM メトリクスを関連付けるには、環境全体で `env: tag`（大文字と小文字を区別）が設定され、一致していることを確認してください。

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/developers/dogstatsd/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /ja/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
{{% /tab %}}
{{% tab "Python" %}}

<div class="alert alert-warning">
この機能はクローズドベータ版です。ご使用のアカウントでこの機能を有効にするには、<a href="https://docs.datadoghq.com/help/">サポートチームまでお問い合わせください。</a>
</div>

ランタイムメトリクスの収集は、`ddtrace-run` 環境で実行している場合 `DD_RUNTIME_METRICS_ENABLED=true` の環境パラメーターで有効にできます。

ランタイムメトリクスは、Python サービスと相関して表示できます。Datadog の[サービス詳細画面][1]を参照してください。

**注**: ランタイム UI では、`ddtrace` >= [`0.24.0`][2] がサポートされています。

初期設定では、アプリケーションからのランタイムメトリクスは DogStatsD のポート `8125` から Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][3]を確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [true に設定されていること][4]、また Agent 上でポート `8125` が開いていることを確認してください。
Kubernetes では、[DogstatsD ポートをホストポートにバインド][5]し、ECS では[タスク定義で適切なフラグを設定][6]します。


[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /ja/developers/metrics/dogstatsd_metrics_submission/#setup
[4]: /ja/agent/docker/#dogstatsd-custom-metrics
[5]: /ja/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[6]: /ja/integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-warning">
この機能はクローズドベータ版です。ご使用のアカウントでこの機能を有効にするには、<a href="https://docs.datadoghq.com/help/">サポートチームまでお問い合わせください。</a>
</div>

ランタイムメトリクスの収集は [`dogstatsd-ruby`][1] gemを使用し、DogStatsD を介して Agent にメトリクスを送信します。ランタイムメトリクスを収集するには、この gem を Ruby アプリケーションに追加し、[DogStatsD が Agent に対して有効になっていること][2]を確認する必要があります。

メトリクス収集は初期設定では無効になっています。`DD_RUNTIME_METRICS_ENABLED` 環境変数を `true` に設定するか、Ruby アプリケーションで次のコンフィギュレーションを行うと有効にできます。

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
# ランタイムメトリクス収集を有効にするには、`true` を設定します。デフォルトは `false` です。
# DD_RUNTIME_METRICS_ENABLED=true に設定して構成することもできます。
c.runtime_metrics_enabled = true

# 必要に応じて、ランタイムメトリクスの送信に使用される DogStatsD インスタンスを構成できます。
# `dogstatsd-ruby` が利用可能な場合、DogStatsD は自動的にデフォルト設定になります。
# Datadog Agent のホストとポートを使用して構成できます。デフォルトは 'localhost:8125' です。
c.runtime_metrics statsd: Datadog::Statsd.new
end
```

ランタイムメトリクスは、Ruby サービスと相関して表示できます。Datadog の[サービス詳細画面][3]を参照してください。

初期設定では、アプリケーションからのランタイムメトリクスは DogStatsD のポート `8125` から Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [true に設定されていること][4]、また Agent 上でポート `8125` が開いていることを確認してください。
Kubernetes では、[DogstatsD ポートをホストポートにバインド][5]し、ECS では[タスク定義で適切なフラグを設定][6]します。


[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/#setup
[3]: https://app.datadoghq.com/apm/service
[4]: /ja/agent/docker/#dogstatsd-custom-metrics
[5]: /ja/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[6]: /ja/integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Go" %}}

近日公開予定。ベータ版のご利用は、[Datadog サポートチーム][1]までお問い合わせください。


[1]: /ja/help
{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-warning">
この機能はクローズドベータ版です。ご使用のアカウントでこの機能を有効にするには、<a href="https://docs.datadoghq.com/help/">サポートチームまでお問い合わせください。</a>
</div>

ランタイムメトリクスの収集は、トレースクライアントの設定パラメーターで、トレーサーオプション `tracer.init({ runtimeMetrics: true })` または環境変数 `DD_RUNTIME_METRICS_ENABLED=true` を使用して有効にすることができます。

ランタイムメトリクスは、Node サービスと相関して表示できます。Datadog の[サービス詳細画面][1]を参照してください。

初期設定では、アプリケーションからのランタイムメトリクスは DogStatsD のポート `8125` から Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [true に設定されていること][3]、また Agent 上でポート `8125` が開いていることを確認してください。
Kubernetes では、[DogstatsD ポートをホストポートにバインド][4]し、ECS では[タスク定義で適切なフラグを設定][5]します。


[1]: https://app.datadoghq.com/apm/services
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /ja/integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab ".NET" %}}

近日公開予定。ベータ版のご利用は、[Datadog サポートチーム][1]までお問い合わせください。


[1]: /ja/help
{{% /tab %}}
{{% tab "PHP" %}}

近日公開予定。ベータ版のご利用は、[Datadog サポートチーム][1]までお問い合わせください。


[1]: /ja/help
{{% /tab %}}
{{< /tabs >}}

## 収集データ

{{< tabs >}}
{{% tab "Java" %}}

以下のメトリクスは JVM メトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "java" >}}

Datadog では、APM サービス詳細画面にこれらのメトリクスを表示し、これらのメトリクスに適用された `service` および `runtime-id` タグ付きの[デフォルトの JVM ランタイムダッシュボード][1]を提供します。

`dd.jmxfetch.config.dir` と `dd.jmxfetch.config` を使用して引き継がれる設定ファイルを使用すると、さらに JMX メトリクスを追加できます。`dd.jmxfetch.<INTEGRATION_NAME>.enabled=true` パラメータを使用して、既存の Datadog JMX インテグレーションを個別に有効にすることもできます。これにより、Datadog の[既存の JMX 設定ファイル] [2]からコンフィギュレーションが自動的に埋め込まれます。設定の詳細については、[JMX インテグレーション][3]を参照してください。

[1]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[2]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[3]: /ja/integrations/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

{{< get-metrics-from-git "python" >}}

Datadog では、APM サービス詳細画面にこれらのメトリクスを表示し、これらのメトリクスに適用された `service` および `runtime-id` タグ付きの[デフォルトの Python ランタイムダッシュボード][1]を提供します。

[1]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics
{{% /tab %}}
{{% tab "Ruby" %}}

以下のメトリクスはランタイムメトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "ruby" >}}

Datadog では、APM サービス詳細画面にこれらのメトリクスを表示し、これらのメトリクスに適用された `service` および `runtime-id` タグ付きの[デフォルトの Ruby ランタイムダッシュボード][1]を提供します。


[1]: https://app.datadoghq.com/dash/integration/30268/ruby-runtime-metrics
{{% /tab %}}
{{% tab "Go" %}}

近日公開予定。ベータ版のご利用は、[Datadog サポートチーム][1]までお問い合わせください。


[1]: /ja/help
{{% /tab %}}
{{% tab "Node.js" %}}

以下のメトリクスはランタイムメトリクスを有効にした後、デフォルトで収集されます。

{{< get-metrics-from-git "node" >}}

Datadog では、APM サービス詳細画面にこれらのメトリクスを表示し、これらのメトリクスに適用された `service` および `runtime-id` タグ付きの[デフォルトの Node ランタイムダッシュボード][1]を提供します。

[1]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
{{% /tab %}}
{{% tab ".NET" %}}

近日公開予定。ベータ版のご利用は、[Datadog サポートチーム][1]までお問い合わせください。


[1]: /ja/help
{{% /tab %}}
{{% tab "PHP" %}}

近日公開予定。ベータ版のご利用は、[Datadog サポートチーム][1]までお問い合わせください。


[1]: /ja/help
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#services