---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: Kafka メトリクス
---
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="Kafka ダッシュボード内の OpenTelemetry Kafka メトリクス" style="width:100%;" >}}

[Kafka メトリクスレシーバー][1] と [JMX Scraper][2] は、標準搭載の [Kafka ダッシュボード][3]である **Kafka, Zookeeper, and Kafka Consumer Overview**用の Kafka メトリクスを収集します。

これら 2 つは異なるデータを収集するので、ほとんどのセットアップでは両方を実行します。Kafka メトリクスレシーバーは、Kafka 管理 API を通してクラスターの状態を読み取ります。JMX Scraper は、ブローカー、プロデューサー、およびコンシューマーによって公開される JMX Bean を読み取ります。

## Kafka メトリクスレシーバー {#kafka-metrics-receiver}

`KAFKA_BROKER_ADDRESS` を、`host:port` 形式のブローカーアドレスに設定します。複数のブローカーをリストするには、複数のアドレスをカンマで区切ります。

{{< tabs >}}
{{% tab "ホスト" %}}

次のようにして Collector 構成にレシーバーを追加します。

```yaml
receivers:
  kafkametrics:
    brokers: "${env:KAFKA_BROKER_ADDRESS}"
    protocol_version: 2.0.0
    scrapers:
      - brokers
      - topics
      - consumers
```

メトリクスパイプラインの `receivers` リストに `kafkametrics` を追加します。Collector は、パイプラインで使用されるレシーバーのみを開始します。例として、推奨されるホスト構成では次のようになります。

```yaml
service:
  pipelines:
    metrics:
      receivers: [otlp, host_metrics, kafkametrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

メトリクスの重複を防ぐため、単一のレプリカ Collector デプロイメントで Kafka メトリクスレシーバーを実行してください。Collector は、OTLP HTTP を介してメトリクスを Datadog に直接エクスポートすることも、別の Collector に転送することもできます。

`values.yaml` でデプロイメントモードを設定します。

```yaml
mode: deployment
```

次のようにして Collector 構成にレシーバーを追加します。

```yaml
receivers:
  kafkametrics:
    brokers: ${env:KAFKA_BROKER_ADDRESS}
    protocol_version: 2.0.0
    scrapers:
      - brokers
      - topics
      - consumers
```

同じ構成内のメトリクスパイプラインに `kafkametrics` を追加します。Collector は、パイプラインで使用されるレシーバーのみを開始します。Datadog に直接エクスポートするには、[推奨されるセットアップ][101] に示されているように `otlp_http` エクスポーターを構成します。

```yaml
service:
  pipelines:
    metrics:
      receivers: [kafkametrics]
      exporters: [otlp_http]
```

[101]: /ja/opentelemetry/setup/collector_exporter/#otlp-http-exporter

{{% /tab %}}

{{< /tabs >}}

## JMX Scraper {#jmx-scraper}

JMX Scraper はスタンドアロンの Java アプリケーションとして稼働し、Collector の OTLP レシーバーにメトリクスを送信します。

[推奨される Collector セットアップ][4]ではポート 4317 で gRPC を介して OTLP を受信し、そのメトリクスパイプラインに OTLP レシーバーが含まれているので、レシーバー構成を変更する必要がありません。

JMX Scraper は、累積テンポラリティのカウンターを送信します。`cumulativetodelta` プロセッサーを推奨メトリクスパイプラインに残してください。このプロセッサーは、[Datadog OTLP メトリクスインテーク][8] で必要となるデルタテンポラリティにカウンターを変換します。

### Kafka ブローカーの設定 {#configure-kafka-brokers}

1. 評価に適した非セキュア JMX エンドポイントを開始するために、以下の JVM オプションを各 Kafka ブローカーに追加します。

   ```shell
   -Dcom.sun.management.jmxremote=true
   -Dcom.sun.management.jmxremote.port=9999
   -Dcom.sun.management.jmxremote.rmi.port=9999
   -Dcom.sun.management.jmxremote.local.only=false
   -Dcom.sun.management.jmxremote.authenticate=false
   -Dcom.sun.management.jmxremote.ssl=false
   -Djava.rmi.server.hostname=<BROKER_HOSTNAME_OR_IP>
   ```

   <div class="alert alert-warning">これらのオプションにより、JMX 認証と TLS が無効になります。この設定は評価目的でのみ使用してください。本番環境では、認証と TLS を有効にし、資格情報とトラストストア設定を使用してスクレイパーを設定してください。</div>

   `jmxremote.authenticate` と `jmxremote.ssl` はデフォルトで `true` になるので、この評価設定では両方のプロパティを明示的に設定してください。パスワードファイルがない場合、認証を行うとブローカーは `Password file not found` を伴って失敗します。`jmxremote.rmi.port` が `jmxremote.port` と一致する場合、RMI レジストリが TLS で保護されておらずポートを共有できないため、SSL によって `Port already in use` が発生します。

   本番環境用に認証と TLS を有効にするには、`com.sun.management.jmxremote.registry.ssl=true` を追加して、レジストリとコネクタがポートを共有できるようにします。スクレイパーで `otel.jmx.username`、`otel.jmx.password`、`otel.jmx.remote.registry.ssl`、`javax.net.ssl.trustStore`、および `javax.net.ssl.trustStorePassword` プロパティを設定します。

2. `java.rmi.server.hostname` には、スクレイパーが接続に使用するホスト名または IP アドレスを設定します。ブローカーはこの値を RMI スタブに含め、スクレイパーはその値への 2 番目の接続を開きます。

   - ループバックアドレスは、スクレイパーがブローカー自身のホストまたは Pod 上で実行されている場合にのみ使用してください。Confluent Platform を含むいくつかの Kafka ディストリビューションやコンテナイメージでは、デフォルトでループバックが使用されます。
   - `0.0.0.0` を使用しないでください。これはバインドアドレスであり、スクレイパーはこれに接続できません。
   - Kubernetes では、ブローカー Pod IP または DNS 名を使用してください。

   Kafka コンテナイメージでは、`KAFKA_JMX_HOSTNAME` が `java.rmi.server.hostname` を設定します。これを同じアドレスに設定してください。

   到達不可能なアドレスでも最初の接続は成功する可能性がありますが、その後のスクレイプは `Failed to retrieve RMIServer stub` または `Connection refused to host: <UNREACHABLE_ADDRESS>` を伴って失敗します。

3. `jmxremote.rmi.port` を、`jmxremote.port` と同じポートに設定してください。固定の RMI ポートがない場合、2 回目の接続ではランダムなポートが使用され、ファイアウォールやポートマッピングによってブロックされる可能性があります。

プロデューサーとコンシューマーをスクレイプするには、それらのアプリケーションに同じ JVM オプションを追加してください。

### JMX Scraper の実行 {#run-the-jmx-scraper}

既存のダッシュボードやモニターが想定している JVM メトリクス名を保持するには、`otel.jmx.target.source` を `legacy` に設定してください。これがないと、スクレイパーはデフォルトで `auto` を使用し、すべての JVM メトリクス名が変更されます。

{{< tabs >}}
{{% tab "ホスト" %}}

JMX Scraper を実行するホストに JRE をインストールします。Debian または Ubuntu で、以下を実行します。

```shell
apt-get update && \
apt-get -y install default-jre-headless
```

[OpenTelemetry Java Contrib リリース][201] から JMX Scraper JAR をダウンロードします。各アドレス変数を `host:port` 形式で設定します。

各スクレイパープロセスは、単一の JMX エンドポイントをスクレイプします。各ブローカー、プロデューサー、コンシューマーに対して、その JVM のアドレスを使って 1 つのプロセスを実行します。

```shell
# Kafka broker
java \
  -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://${KAFKA_BROKER_JMX_ADDRESS}/jmxrmi \
  -Dotel.jmx.target.system=kafka,jvm \
  -Dotel.jmx.target.source=legacy \
  -Dotel.metrics.exporter=otlp \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -jar /path/to/opentelemetry-jmx-scraper.jar

# Kafka producer
java \
  -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://${KAFKA_PRODUCER_JMX_ADDRESS}/jmxrmi \
  -Dotel.jmx.target.system=kafka-producer \
  -Dotel.jmx.target.source=legacy \
  -Dotel.metrics.exporter=otlp \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -jar /path/to/opentelemetry-jmx-scraper.jar

# Kafka consumer
java \
  -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://${KAFKA_CONSUMER_JMX_ADDRESS}/jmxrmi \
  -Dotel.jmx.target.system=kafka-consumer \
  -Dotel.jmx.target.source=legacy \
  -Dotel.metrics.exporter=otlp \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -jar /path/to/opentelemetry-jmx-scraper.jar
```

[201]: https://github.com/open-telemetry/opentelemetry-java-contrib/releases

{{% /tab %}}

{{% tab "Kubernetes" %}}

以下の Dockerfile を使用して、JRE と JMX Scraper JAR を含むイメージをビルドします。

```Dockerfile
FROM alpine:latest AS prep

# JMX Scraper JAR
ARG JMX_SCRAPER_JAR_VERSION=1.60.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_SCRAPER_JAR_VERSION}/opentelemetry-jmx-scraper.jar /opt/opentelemetry-jmx-scraper.jar
ARG USER_UID=65532
RUN chown ${USER_UID} /opt/opentelemetry-jmx-scraper.jar

FROM gcr.io/distroless/java17-debian11:nonroot

COPY --from=prep /opt/opentelemetry-jmx-scraper.jar /opt/opentelemetry-jmx-scraper.jar

ENTRYPOINT ["java"]
CMD ["-Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://kafka:9999/jmxrmi", \
"-Dotel.jmx.target.system=kafka,jvm", \
"-Dotel.jmx.target.source=legacy", \
"-Dotel.metrics.exporter=otlp", \
"-Dotel.exporter.otlp.endpoint=http://otelcol:4317", \
"-jar", \
"/opt/opentelemetry-jmx-scraper.jar"]
```

`kafka:9999` をブローカーの JMX アドレスに、`otelcol:4317` を Collector の OTLP gRPC エンドポイントに置き換えてください。

プロデューサーまたはコンシューマーをスクレイプするには、`otel.jmx.target.system` を `kafka-producer` または `kafka-consumer` に設定し、その JVM の JMX エンドポイントを参照するように `otel.jmx.service.url` を設定します。

JMX エンドポイントごとに 1 つのインスタンスを実行してください。同じエンドポイントをスクレイプする複数のレプリカは、重複したメトリクスを生成します。

{{% /tab %}}

{{< /tabs >}}

## ログ収集 {#log-collection}

OpenTelemetry Collector でログを収集するには、[ログ収集][5]を参照してください。

標準搭載の Kafka ダッシュボードに Kafka ログを含めるには、属性プロセッサーを使用して `source:kafka` タグを追加します。

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

この属性のみを Kafka ログに追加するには、属性プロセッサーで[包含/除外フィルター][6]を使用します。

## 収集されるデータ {#data-collected}

### Kafka メトリクスレシーバー {#kafka-metrics-receiver-1}

{{< mapping-table resource="kafkametrics.csv">}}

### JMX Scraper {#jmx-scraper-1}

#### Kafka ブローカー {#kafka-broker}

{{< mapping-table resource="kafka.csv">}}

#### Kafka プロデューサー {#kafka-producer}

{{< mapping-table resource="kafka-producer.csv">}}

#### Kafka コンシューマー {#kafka-consumer}

{{< mapping-table resource="kafka-consumer.csv">}}

**注**: Datadog では、メトリクス名に含まれるハイフン (`-`) をアンダースコア (`_`) に置き換えます。たとえば、`kafka.producer.request-rate` は `kafka.producer.request_rate` になります。

OpenTelemetry と Datadog の間のメトリクス名の詳細なマッピングについては、[OpenTelemetry メトリクスマッピング][7] を参照してください。

## ログ出力例 {#example-logging-output}

```
Metric #0
Descriptor:
     -> Name: kafka.message.count
     -> Description: The number of messages received by the broker
     -> Unit: {messages}
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
StartTimestamp: 2024-01-22 15:50:24.212 +0000 UTC
Timestamp: 2024-01-22 15:51:24.218 +0000 UTC
Value: 25
```

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-java-contrib/tree/main/jmx-scraper
[3]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[4]: /ja/opentelemetry/setup/collector_exporter/
[5]: /ja/opentelemetry/config/log_collection
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[7]: /ja/opentelemetry/mapping/metrics_mapping/
[8]: /ja/opentelemetry/setup/otlp_ingest/metrics/#ensure-only-delta-metrics-are-sent