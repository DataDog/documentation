---
aliases:
- /ja/tracing/runtime_metrics/java
code_lang: java
code_lang_weight: 10
description: Java アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
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
title: Java ランタイムメトリクス
type: multi-code-lang
---

## 自動コンフィギュレーション

JVM メトリクス収集は、初期設定で Java トレーサー v0.29.0+ に有効になっています。トレースクライアントの設定パラメーターで、システムプロパティ `-Ddd.jmxfetch.enabled=false` または環境変数 `DD_JMXFETCH_ENABLED=false` を使用して無効にすることも可能です。v0.64.0+ では、`DD_RUNTIME_METRICS_ENABLED=false` 環境変数を使用して無効にすることもできます。

JVM メトリクスは、Java サービスと相関して表示できます。Datadog の[サービスカタログ][1]を参照してください。

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="JVM ランタイム" >}}

初期設定では、アプリケーションからのランタイムメトリクスは、ポート `8125` を介して DogStatsD と共に Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。

Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [が `true` に設定されている][3]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。また、

- **Kubernetes**: [DogstatsD ポートをホストポートにバインドする][4] _必要があります_。
- **ECS**。[タスク定義で適切なフラグを設定します][5]。

Alternatively, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport. For more information, read [DogStatsD over Unix Domain Socket][9].

**注**:

- ランタイム UI では、`dd-trace-java` >= [`0.24.0`][6] がサポートされています。
- フレームグラフ内で JVM メトリクスを関連付けるには、環境全体で `env: tag`（大文字と小文字を区別）が設定され、一致していることを確認してください。
- Fargate 使用時に、JVM メトリクスがサービス詳細画面に表示されるようにするには、Agent タスクに `DD_DOGSTATSD_TAGS` が設定されていて、そのサービスの `env: tag` が一致することを確認します。

## 収集データ

以下のメトリクスは JVM メトリクスを有効にした後、デフォルトで JVM プロセスごとに収集されます。

{{< get-metrics-from-git "java" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの JVM ランタイムダッシュボード][7]を提供します。

Additional JMX metrics can be added using configuration files that are passed on using `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`. You can also enable existing Datadog JMX integrations individually with the `dd.jmxfetch.<INTEGRATION_NAME>.enabled=true` parameter. This auto-embeds configuration from Datadog's existing JMX configuration files. See the [JMX Integration][8] for further details on configuration.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/developers/dogstatsd/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ja/agent/amazon_ecs/#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[7]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[8]: /ja/integrations/java/#configuration
[9]: /ja/developers/dogstatsd/unix_socket/
