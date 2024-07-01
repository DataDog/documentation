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

JVM メトリクスは、Java サービスと相関して表示できます。Datadog の[サービス詳細画面][1]を参照してください。

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="JVM ランタイム" >}}

初期設定では、アプリケーションからのランタイムメトリクスは、ポート `8125` を介して DogStatsD と共に Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっていること][2]を確認してください。

Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [が `true` に設定されている][3]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。また、

- **Kubernetes**: [DogstatsD ポートをホストポートにバインドする][4] _必要があります_。
- **ECS**。[タスク定義で適切なフラグを設定します][5]。

**注**:

- ランタイム UI では、`dd-trace-java` >= [`0.24.0`][6] がサポートされています。
- フレームグラフ内で JVM メトリクスを関連付けるには、環境全体で `env: tag`（大文字と小文字を区別）が設定され、一致していることを確認してください。
- Fargate 使用時に、JVM メトリクスがサービス詳細画面に表示されるようにするには、Agent タスクに `DD_DOGSTATSD_TAGS` が設定されていて、そのサービスの `env: tag` が一致することを確認します。

## 収集データ

以下のメトリクスは JVM メトリクスを有効にした後、デフォルトで JVM プロセスごとに収集されます。

{{< get-metrics-from-git "java" >}}

APM サービス詳細画面にこれらのメトリクスを表示するだけでなく、Datadog は[デフォルトの JVM ランタイムダッシュボード][7]を提供します。

`dd.jmxfetch.config.dir` と `dd.jmxfetch.config` を使用して引き継がれる設定ファイルを使用すると、さらに JMX メトリクスを追加できます。`dd.jmxfetch.<INTEGRATION_NAME>.enabled=true` パラメータを使用して、既存の Datadog JMX インテグレーションを個別に有効にすることもできます。これにより、Datadog の[既存の JMX 設定ファイル] [8]からコンフィギュレーションが自動的に埋め込まれます。設定の詳細については、[JMX インテグレーション][9]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/developers/dogstatsd/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[4]: /ja/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ja/agent/amazon_ecs/#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[7]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[8]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[9]: /ja/integrations/java/#configuration