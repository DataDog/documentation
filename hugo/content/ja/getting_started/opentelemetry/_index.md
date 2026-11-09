---
description: サンプルアプリケーションを構成し、OpenTelemetry のメトリクス、トレース、ログを Datadog に送信します。
further_reading:
- link: https://opentelemetry.io/docs/
  tag: 外部サイト
  text: OpenTelemetry ドキュメント
- link: /opentelemetry
  tag: ドキュメント
  text: Datadog OpenTelemetry ドキュメント
- link: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
  tag: ドキュメント
  text: OpenTelemetry を使ったカスタムインスツルメンテーション
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog
  tag: ブログ
  text: Datadog APM で OTel インスツルメントされたアプリのランタイムメトリクスを監視する
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: ブログ
  text: Datadog RUM イベントと OTel インスツルメントされたアプリケーションのトレースを相関させる
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter
  tag: ブログ
  text: OpenTelemetry コレクターから Datadog エクスポーター経由で Datadog にメトリクスとトレースを送信する
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: ブログ
  text: Datadog Exporter で OpenTelemetry Collector からログを転送する
title: Datadog で OpenTelemetry を始める
---
{{< learning-center-callout header="ラーニングセンターの「OpenTelemetry について理解する」を試す" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry" hide_image="false" >}}
  OpenTelemetry の基礎として、機能やメリット、主要コンポーネント、OTel と Datadog の連携方法などを学びます。
{{< /learning-center-callout >}}

## 概要 {#overview}

[OpenTelemetry][11] は、ソフトウェアアプリケーションから可観測性データを収集およびルーティングするための標準化されたプロトコルとツールを IT チームに提供するオープンソースの可観測性フレームワークです。OpenTelemetry は次の一貫したフォーマットを監視プラットフォームに提供し、分析およびインサイトの取得を可能にします。アプリケーションの可観測性データ (メトリクス、ログ、トレース) の {{< tooltip text="instrumenting" tooltip="インスツルメンテーションとは、トレース、メトリクス、ログなどの可観測性データをキャプチャして Datadog にレポートするためにコードをアプリケーションに追加するプロセスです。">}}、生成、収集、エクスポート。

このガイドでは、OpenTelemetry SDK、OpenTelemetry Collector、および [Datadog Exporter][14] を使って Datadog に可観測性データを送信する [OpenTelemetry のサンプルアプリケーション][12]の構成方法を紹介します。また、このデータを Datadog UI で確認する方法も説明します。

<div class="alert alert-info">このガイドでは、Datadog Exporter と Datadog Connector を使用します。新しい Collector 構成については、Datadog は <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector のセットアップ</a>の OTLP パイプラインを推奨しています。</div>

このガイドに従うことで、以下を行うことができます。

1. [OpenTelemetry API を使用してアプリケーションをインスツルメントします](#instrumenting-the-application)。
2. [Datadog に可観測性データを送信するアプリケーションを構成します](#configuring-the-application)。
3. [unified service tagging を使用して可観測性データを相関させます](#correlating-observability-data)。
4. [可観測性データを生成するアプリケーションを実行します](#running-the-application)。
5. [Datadog UI で可観測性データを確認します](#exploring-observability-data-in-datadog)。

## 前提条件{#prerequisites}

このガイドの手順を実行するには、以下の準備が必要です。

1. まだの場合は、[Datadog アカウントを作成][1]します。
2. Datadog API キーを設定します。
   1. [Datadog API キー][2]を見つけるか、作成します。
   2. Datadog API キーを環境変数にエクスポートします。
    {{< code-block lang="sh" >}}
export DD_API_KEY=<Your API Key>
{{< /code-block >}}
3. サンプルの[カレンダー][12]アプリケーションを入手します。
   1. `opentelemetry-examples` リポジトリをデバイスに複製します。
    {{< code-block lang="sh" >}}
git clone https://github.com/DataDog/opentelemetry-examples.git
{{< /code-block >}}
   2. `/calendar` ディレクトリに移動します。
    {{< code-block lang="sh" >}}
cd opentelemetry-examples/apps/rest-services/java/calendar
{{< /code-block >}}
4. [Docker Compose][3] をインストールします。
5. (オプション) インフラストラクチャーメトリクスを送信するために Linux を使用します。

カレンダーアプリケーションは、OpenTelemetry ツールを使用してメトリクス、ログ、トレースを生成および収集します。以下のステップで、この可観測性データを Datadog に取り込む方法を説明します。

## アプリケーションのインスツルメンテーション {#instrumenting-the-application}

サンプルのカレンダーアプリケーションは、すでに部分的に[インスツルメントされています][15]。

1. `./src/main/java/com/otel/service/CalendarService.java` にあるメインの `CalendarService.java` ファイルに移動します。
2. 以下のコードは、OpenTelemetry のアノテーションと API を使用して `getDate()` をインスツルメントします。

   {{< code-block lang="java" disable_copy="true" filename="CalendarService.java" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}

カレンダーアプリケーションの実行時に、`getDate()` コールが[トレース][8]およびスパンを生成します。

## アプリケーションの構成 {#configuring-the-application}

### OTLP レシーバー {#otlp-receiver}

カレンダーアプリケーションは、OpenTelemetry SDK から OpenTelemetry コレクター内の [OpenTelemetry Protocol (OTLP) レシーバー][10]へデータを送信するようにすでに構成されています。

1. `./src/main/resources/otelcol-config.yaml` にあるコレクターの構成ファイルに移動します。
2. 以下の行は、メトリクス、トレース、ログを受信するように OTLP レシーバーを構成します。

    {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
...
service:
  pipelines:
    traces:
      receivers: [otlp]
    metrics:
      receivers: [otlp]
    logs:
      receivers: [otlp]
{{< /code-block >}}

### Datadog Exporter {#datadog-exporter}

Datadog Exporter は、OTLP レシーバーが収集したデータを Datadog のバックエンドへ送信します。

1. `otelcol-config.yaml` ファイルに移動します。
2. 以下のコードにより、Datadog Exporter が可観測性データを Datadog に送信するように構成します。

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      trace_buffer: 500
    hostname: "otelcol-docker"
    api:
      key: ${DD_API_KEY}
      site: datadoghq.com

connectors:
    datadog/connector:
      traces:
        compute_stats_by_span_kind: true

service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector] # <- update this line
      exporters: [datadog]
    traces:
      exporters: [datadog, datadog/connector]
    logs:
      exporters: [datadog]
{{< /code-block >}}
3. `exporters.datadog.api.site` を [Datadog サイト][16]に設定します。そうでない場合、デフォルトは US1 になります。

この構成により、Datadog Exporter がランタイムのメトリクス、トレース、ログを Datadog に送信できるようになります。ただし、インフラストラクチャーメトリクスの送信には追加の構成が必要です。

### OpenTelemetry Collector {#opentelemetry-collector}

この例では、OpenTelemetry Collector がインフラストラクチャーメトリクスを送信するように構成します。

<div class="alert alert-info">OpenTelemetry Collector から Datadog にインフラストラクチャーメトリクスを送信するには、Linux を使用する必要があります。これは Docker 統計レシーバー側の制約です。</div>

コンテナメトリクスを収集するには、OpenTelemetry Collector で [Docker 統計レシーバー][5]を構成します。

1. `otel-config.yaml` の `receivers` セクションに `docker_stats` ブロックを追加します。

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      # add the following block
      docker_stats:
        endpoint: unix:///var/run/docker.sock # default; if this is not the Docker socket path, update to the correct path
        metrics:
          container.network.io.usage.rx_packets:
            enabled: true
          container.network.io.usage.tx_packets:
            enabled: true
          container.cpu.usage.system:
            enabled: true
          container.memory.rss:
            enabled: true
          container.blockio.io_serviced_recursive:
            enabled: true
          container.uptime:
            enabled: true
          container.memory.hierarchical_memory_limit:
            enabled: true
{{< /code-block >}}

2. `service.pipelines.metrics.receivers`を更新して `docker_stats` を含めます。

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector, docker_stats] # <- update this line
{{< /code-block >}}

この構成により、カレンダーアプリケーションがコンテナメトリクスを Datadog に送信できるようになり、Datadog でこのメトリクスを確認できるようになります。

### OTLP を使った可観測性データの送信 {#sending-observability-data-with-otlp}

カレンダーアプリケーションは、Logback コンフィギュレーション内の OpenTelemetry ロギングエクスポーターを使って、OpenTelemetry レイヤープロセッサー (OTLP) でログを送信します。

1. `/src/main/resources/logback.xml` にあるカレンダーアプリケーションの Logback XML 構成ファイルに移動します。
2. 以下の行で `OpenTelemetry` アペンダーを定義します。

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
    <captureExperimentalAttributes>true</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. `<appender-ref ref="OpenTelemetry"/>` の行は、ルートレベルの構成の `OpenTelemetry` アペンダーを参照しています。

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

さらに、環境変数を使って OpenTelemetry 環境を構成し、ログ、メトリクス、トレースをエクスポートできるようにします。

1. `./deploys/docker/docker-compose-otelcol.yml` にあるカレンダーアプリケーションの Docker Compose ファイルに移動します。
2. `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` の構成により、メトリクス、トレース、ログが OTLP で送信されます。

## 可観測性データの相関付け {#correlating-observability-data}

[Unified service tagging][6] により、Datadog 内の可観測性データ同士が結び付けられ、一貫性のあるタグを使用してメトリクス、トレース、ログを横断的に確認することができます。

カレンダーアプリケーションはすでに unified service tagging で構成されています。

1. `./deploys/docker/docker-compose-otelcol.yml` にあるカレンダーアプリケーションの Docker Compose ファイルに移動します。
2. 以下のコードにより、アプリケーションのトレースとその他の可観測性データを相関付けすることができます。

   {{< code-block lang="yaml" filename="docker-compose-otelcol.yml" collapsible="true" disable_copy="true" >}}
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker,service.version=<IMAGE_TAG>
{{< /code-block >}}

## アプリケーションの実行 {#running-the-application}

可観測性データの生成と Datadog への転送を開始するには、OpenTelemetry SDK を使ってカレンダーアプリケーションを実行する必要があります。

1. `calendar/` フォルダーからアプリケーションを実行します。

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otelcol.yml up
{{< /code-block >}}
   このコマンドにより、OpenTelemetry Collector およびカレンダーサービスを持つ Docker コンテナが作成されます。

2. カレンダーアプリケーションが正常に動作しているかをテストするには、別のターミナルウィンドウから次のコマンドを実行します。

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar
{{< /code-block >}}

3. 次のような応答を受信したことを確認します。

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. `curl` コマンドを複数回実行し、少なくとも 1 つのトレースが Datadog バックエンドにエクスポートされることを確認します。

   <div class="alert alert-info">カレンダーアプリケーションは、確率的サンプラープロセッサーを使用するため、アプリケーションを通じて送信されるトレースの 30% しかターゲットのバックエンドに到達しません。</div>

カレンダーアプリケーションに対する呼び出しのたびに、メトリクス、トレース、ログが OpenTelemetry コレクターに転送され、次に Datadog エクスポーターに、最後に Datadog バックエンドに転送されます。

## Datadog での可観測性データの確認 {#exploring-observability-data-in-datadog}

カレンダーアプリケーションの可観測性データを確認するには、Datadog UI を使用します。

**注**: トレースデータが表示されるまで、数分かかる場合があります。

### ランタイムおよびインフラストラクチャーメトリクス {#runtime-and-infrastructure-metrics}

ランタイムおよびインフラストラクチャーメトリクスを表示して、アプリケーション、ホスト、コンテナ、プロセスのパフォーマンスを視覚化、監視、測定します。

1. {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} に移動します。
2. `calendar-otel` サービスにカーソルを合わせ、{{< ui >}}Full Page{{< /ui >}} を選択します。
3. 一番下のパネルまでスクロールし、以下を選択します。

   * {{< ui >}}Infrastructure Metrics{{< /ui >}} では、CPU やメモリの使用量などの Docker コンテナメトリクスを確認できます。
   * {{< ui >}}JVM Metrics{{< /ui >}} では、ヒープ使用量やスレッド数などのランタイムメトリクスを確認できます。

   {{< img src="/getting_started/opentelemetry/infra_and_jvm2.png" alt="カレンダーアプリケーションのインフラストラクチャーメトリクスおよび JVM ランタイムメトリクスの表示" style="width:90%;" >}}

### ログ {#logs}

アプリケーションおよびシステムの運用を監視してトラブルシューティングを行うにはログを表示します。

1. {{< ui >}}Logs{{< /ui >}} に移動します。
2. 他のログがリストにある場合は、{{< ui >}}Search for{{< /ui >}} フィールドに `@service.name:calendar-otel `を追加し、カレンダーアプリケーションからのログのみを表示します。
2. リストからログを選択し、詳細を確認します。

{{< img src="/getting_started/opentelemetry/logs2.png" alt="カレンダーアプリケーションのログの表示" style="width:90%;" >}}

### トレース {#traces}

アプリケーションが処理したリクエストの状態とパフォーマンスを把握するため、トレースとスパンを表示します。

1.  {{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}} に移動します。
2. フィルターメニューで {{< ui >}}Service{{< /ui >}} セクションを見つけ、`calendar-otel` ファセットを選択して、すべての `calendar-otel` トレースを表示します。

   {{< img src="/getting_started/opentelemetry/traces2.png" alt="カレンダーアプリケーションのトレースの表示" style="width:90%;" >}}

3. [`calendar-otel` トレースを探索][8]します。

   開始するには、トレースをクリックしてトレースサイドパネルを開き、トレースおよびそのスパンについての詳細を確認します。たとえば、[フレームグラフ][9]は、カレンダー実行パスの各コンポーネントで費やされた時間を取得します。

   {{< img src="/getting_started/opentelemetry/flame_graph2.png" alt="カレンダーアプリケーショントレースのフレームグラフの表示" style="width:90%;" >}}

4. 一番下のパネルでは、{{< ui >}}Infrastructure{{< /ui >}}、{{< ui >}}Metrics{{< /ui >}}、または {{< ui >}}Logs{{< /ui >}} を選択して、トレースとその他の可観測性データの相関付けが可能であることに注目してください。

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="カレンダーアプリケーションのトレースとログの相関付け" style="width:90%;" >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.docker.com/compose/install/
[4]: /ja/opentelemetry/collector_exporter/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: /ja/tracing/glossary/#trace
[9]: https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/
[10]: /ja/opentelemetry/collector_exporter/otlp_receiver/
[11]: https://opentelemetry.io/
[12]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[14]: /ja/opentelemetry/setup/collector_exporter/datadog_exporter/
[15]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /ja/getting_started/site/