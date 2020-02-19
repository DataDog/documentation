---
title: Java アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/java
  - /ja/tracing/languages/java
  - /ja/agent/apm/java/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-java'
    tag: GitHub
    text: Datadog Java APM ソースコード
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
  - link: tracing/
    tag: 高度な使用方法
    text: 高度な使用方法
---
## インストールと利用開始

<div class="alert alert-info">Datadog アカウントをお持ちの場合、アプリ内ガイドで<a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=java" target=_blank>ホストベース</a>の設定や<a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=java" target=_blank>コンテナベース</a>の設定に関する詳細な手順をご確認いただけます。</div>

何らかの言語で記述されたアプリケーションのトレースを始めるには、まず [Datadog Agent をインストール、構成し][1]、[Docker アプリケーションのトレース][4]または [Kubernetes アプリケーションのトレース][5]に関する追加ドキュメントを確認します。

次に、エージェントクラスファイルが含まれる `dd-java-agent.jar` をダウンロードします:

```shell
wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

最後に、アプリケーションの起動時に IDE、Maven または Gradle アプリケーションスクリプト、または `java -jar` コマンドに次の JVM 引数を追加します:

```text
-javaagent:/path/to/the/dd-java-agent.jar
```

**注**:

* `-javaagent` は `-jar` ファイルより前に実行され、アプリケーション引数ではなく JVM オプションとして追加される必要があります。詳しくは、[Oracle ドキュメント][4]を参照してください。

* `dd-trace-java` の成果物 (`dd-java-agent.jar`、`dd-trace-api.jar`、`dd-trace-ot.jar`) は、すべての JVM ベース言語、つまり Scala、Groovy、Kotlin、Clojure などをサポートします。特定のフレームワークのサポートが必要な場合は、[オープンソースの貢献][5]を行うことを検討してください。

## 自動でデータと収集

Java の自動インスツルメンテーションは、[JVM によって提供される][6] `java-agent` インスツルメンテーション機能を使用します。`java-agent` が登録されている場合、これにはロード時間にクラスファイルを変更する能力があります。
`java-agent` は [Byte Buddy フレームワーク][7]を使ってインスツルメンテーションに対して定義されたクラスを見つけ、必要に応じてこのクラスバイトを変更します。

インスツルメンテーションの由来は自動インスツルメンテーション、OpenTracing api、または両者の混合になる場合があります。一般的に、インスツルメンテーションは次の情報を取得します:

* OpenTracing api からタイムスタンプが提供されない限り、JVM のナノタイムクロックを使ってタイミング時間が取得されます
* キー/値タグペア
* アプリケーションによって処理されていないエラーとスタックトレース
* システムを通過するトレース (リクエスト) の合計数

## 互換性

Datadog は、Oracle JDK と OpenJDK の両方の Java JRE 1.7 以上を公式にサポートしています。Datadog は Java のアーリーアクセスバージョンを公式にサポートしていません。

### インテグレーション

大半のインテグレーションはデフォルトで有効になっています。次の設定により、デフォルトを無効に変更できます。

* システムプロパティ: `-Ddd.integrations.enabled=false`
* 環境変数: `DD_INTEGRATIONS_ENABLED=false`

インテグレーション箱別に有効または無効にできます (上記のデフォルトをオーバーライド)。

* システムプロパティ: `-Ddd.integration.<インテグレーション名>.enabled=true`
* 環境変数: `DD_INTEGRATION_<インテグレーション名>_ENABLED=true`

(各インテグレーションの名前については以下を参照してください。)

ベータインテグレーションはデフォルトで無効になっていますが、個別に有効にできます。

#### Web フレームワークの互換性

`dd-java-agent` には、次のウェブフレームワークの自動トレースのサポートが含まれます。

| サーバー                  | バージョン   | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用) |
|-------------------------|------------|-----------------|------------------------------------------------|
| Akka-Http サーバー        | 10.0+      | 完全対応 | `akka-http`、`akka-http-server`                |
| Finatra Web             | 2.9+       | 完全対応 | `finatra`                                      |
| Grizzly                 | 2.0+       | [ベータ][8]       | `grizzly`                                      |
| Java Servlet 互換 | 2.3+、3.0+ | 完全対応 | `servlet`、`servlet-2`、`servlet-3`            |
| Jax-RS アノテーション      | JSR311-API | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-annotations`        |
| Jetty (非 Servlet)     | 8+         | [ベータ][8]       | `jetty`、`jetty-8`                             |
| Netty HTTP サーバー       | 4.0+       | 完全対応 | `netty`、`netty-4.0`、`netty-4.1`              |
| Play                    | 2.4-2.7    | 完全対応 | `play`                                         |
| Ratpack                 | 1.4+       | 完全対応 | `ratpack`                                      |
| Spark Java              | 2.3+       | [ベータ][8]       | `sparkjava` (要 `jetty`)                 |
| Spring Web (MVC)        | 4.0+       | 完全対応 | `spring-web`                                   |
| Spring WebFlux          | 5.0+       | 完全対応 | `spring-webflux`                               |

**ウェブフレームワークトレースは次を提供します:** HTTP リクエストから応答までの時間、HTTP リクエストのタグ (ステータスコード、メソッドなど)、エラーおよびスタックトレースの取得、ウェブリクエスト内で作成された作業のリンク、分散型トレーシング

*注:* 多くのアプリケーションサーバーは Servlet 互換でそのインスツルメンテーションによって自動的にカバーされます (Tomcat、Jetty、Websphere、Weblogic など)。
また、Spring Boot のようなフレームワークは、通常サポートされた組み込みアプリケーションサーバーを使うため、本質的に機能します (Tomcat/Jetty/Netty)。

ベータインスツルメンテーションはデフォルトで無効になっています。有効にするには、次のいずれかのコンフィギュレーションを追加します:

* システムプロパティ: `-Ddd.integration.<インテグレーション名>.enabled=true`
* 環境変数: `DD_INTEGRATION_<インテグレーション名>_ENABLED=true`

希望するウェブフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][8]にお問い合わせください。

#### ネットワーキングフレームワークの互換性

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

| フレームワーク                | バージョン    | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用) |
|--------------------------|-------------|-----------------|------------------------------------------------|
| Apache HTTP クライアント       | 4.0+        | 完全対応 | `httpclient`                                   |
| Apache HTTP 非同期クライアント | 4.0+        | 完全対応 | `httpasyncclient`、`apache-httpasyncclient`    |
| AWS Java SDK             | 1.11+、2.2+ | 完全対応 | `aws-sdk`                                      |
| Google HTTP クライアント       | 1.19.0+     | 完全対応 | `google-http-client`                           |
| gRPC                     | 1.5+        | 完全対応 | `grpc`、`grpc-client`、`grpc-server`           |
| HttpURLConnection        | すべて         | 完全対応 | `httpurlconnection`、`urlconnection`           |
| Kafka-Clients            | 0.11+       | 完全対応 | `kafka`                                        |
| Kafka-Streams            | 0.11+       | 完全対応 | `kafka`、`kafka-streams`                       |
| Java RMI                 | すべて         | 完全対応 | `rmi`、`rmi-client`、`rmi-server`              |
| Jax RS クライアント           | 2.0+        | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-client`             |
| Jersey クライアント            | 1.9+        | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-client`             |
| JMS                      | 1 と 2     | 完全対応 | `jms`                                          |
| Netty HTTP クライアント        | 4.0+        | 完全対応 | `netty`、`netty-4.0`、`netty-4.1`              |
| OkHTTP                   | 3.0+        | 完全対応 | `okhttp`、`okhttp-3`                           |
| Play WSClient            | 1.0+        | 完全対応 | `play-ws`                                      |
| Rabbit AMQP              | 2.7+        | 完全対応 | `amqp`、`rabbitmq`                             |
| Spring WebClient         | 5.0+        | 完全対応 | `spring-webflux`、`spring-webflux-client`      |

**ネットワーキングトレースは次を提供します:** リクエストから応答までの時間、リクエストのタグ (例: 応答コード)、エラーおよびスタックトレースの取得、分散型トレーシング

希望するネットワーキングフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][8]にお問い合わせください。

#### データストアの互換性

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

| データベース                | バージョン | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用)                                           |
|-------------------------|----------|-----------------|------------------------------------------------------------------------------------------|
| Couchbase               | 2.0+     | 完全対応 | `couchbase`                                                                              |
| Cassandra               | 3.X      | 完全対応 | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0+     | 完全対応 | `elasticsearch`、`elasticsearch-transport`、`elasticsearch-transport-{2,5,6}` (1 つ選択) |
| Elasticsearch Rest      | 5.0+     | 完全対応 | `elasticsearch`、`elasticsearch-rest`、`elasticsearch-rest-5`、`elasticsearch-rest-6`    |
| JDBC                    | N/A      | 完全対応 | `jdbc`                                                                                   |
| Jedis                   | 1.4+     | 完全対応 | `redis`                                                                                  |
| Lettuce                 | 5.0+     | 完全対応 | `lettuce`                                                                                |
| MongoDB                 | 3.0+     | 完全対応 | `mongo`                                                                                  |
| SpyMemcached            | 2.12+    | 完全対応 | `spymemcached`                                                                           |

`dd-java-agent` は、次を含む一般的な JDBC ドライバーとも互換性があります:

* Apache Derby
* Firebird SQL
* H2 データベースエンジン
* HSQLDB
* IBM DB2
* MariaDB
* MSSQL (Microsoft SQL Server)
* MySQL
* Oracle
* Postgres SQL

**データストアトレースは次を提供します:** リクエストから応答までの時間、クエリ情報 (例: サニタイジングされたクエリ文字列)、エラーおよびスタックトレースの取得

希望するデータストアが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][8]にお問い合わせください。

#### 他のフレームワークの互換性

`dd-java-agent` には、次の他のフレームワークの自動トレースのサポートが含まれます。

| フレームワーク        | バージョン | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用) |
|------------------|----------|-----------------|------------------------------------------------|
| Dropwizard Views | 0.7+     | 完全対応 | `dropwizard`、`dropwizard-view`                |
| Hibernate        | 3.5+     | 完全対応 | `hibernate`                                    |
| Hystrix          | 1.4+     | 完全対応 | `hystrix`                                      |
| JSP Rendering    | 2.3+     | 完全対応 | `jsp`、`jsp-render`                            |
| Slf4J MDC        | 1+       | 完全対応 | `mdc` (`dd.logs.injection` 構成も参照してください)    |
| Spring Data      | 1.8+     | 完全対応 | `spring-data`                                  |
| Twilio SDK       | 0+       | 完全対応 | `twilio-sdk`                                   |

希望するフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][8]にお問い合わせください。

サポートされていないフレームワークを使ったアプリケーションの可視性を向上させるには、次のことを検討してください:

* カスタムインスツルメンテーションの追加 (OpenTracing または `@Trace` アノテーション)。
* 将来のリリースに含めるためのインスツルメンテーションによる[プルリクエストの送信][9]。
* [Datadog サポート][8]へのお問い合わせと機能リクエストの提供。

## コンフィギュレーション

トレーサーは、システムプロパティと環境変数を使って次のように構成されます:
(上記の[インテグレーション](#integrations)セクションのインテグレーション固有の構成を参照してください。)

| システムプロパティ                        | 環境変数                   | デフォルト                           | 説明                                                                                                                                                                                                                                                            |
|----------------------------------------|----------------------------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dd.trace.enabled`                     | `DD_TRACE_ENABLED`                     | `true`                            | `false` トレースエージェントが無効の時                                                                                                                                                                                                                                |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`                            | 構成プロパティが行ごとに 1 つ提供されている、ファイルへのオプションパス。たとえば、ファイルパスは `-Ddd.trace.config=<ファイルパス>.properties` 経由として、ファイルのサービス名に `dd.service.name=<サービス名>` を設定して提供することができます。 |
| `dd.service.name`                      | `DD_SERVICE_NAME`                      | `unnamed-java-app`                | 同一のジョブを実行するプロセスセットの名前。アプリケーションの統計のグループ化に使われます。                                                                                                                                                                     |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`                            | (例: `mysql:my-service-name-db`) コンフィギュレーション経由でサービス名を動的に変更します。サービス間でデータベースの名前を区別する場合に便利です。                                                                                                        |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`                   | デフォルト値はトレースを Agent に送信します。代わりに `LoggingWriter` で構成すると、トレースがコンソールに書き出されます。                                                                                                                                                    |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`                       | トレースの送信先のホスト名。コンテナ化された環境を使う場合は、これを構成してホスト IP にします。詳しくは、[Docker アプリケーションのトレース][1]を参照してください。                                                                                                  |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`                            | 構成されたホストに対して Agent がリッスンしているポート番号。                                                                                                                                                                                                             |
| `dd.trace.agent.unix.domain.socket`    | `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`    | `null`                            | これは、トレーストラフィックをプロキシに送り、その後リモート Datadog Agent に送信するために使うことができます。                                                                                                                                                                       |
| `dd.trace.global.tags`                 | `DD_TRACE_GLOBAL_TAGS`                 | `null`                            | (例: `key1:value1,key2:value2`) すべてのスパンとすべての JMX メトリクスに追加されるデフォルトタグのリスト。この値は `trace.span.tags` と `trace.jmx.tags` にマージされ、1 つの場所で両方を構成することができます。                                                |
| `dd.trace.span.tags`                   | `DD_TRACE_SPAN_TAGS`                   | `null`                            | (例: `key1:value1,key2:value2`) すべてのスパンに追加されるデフォルトタグのリスト。同じ名前のタグがスパンに直接追加された場合、ここのデフォルトは上書きされます。                                                                                            |
| `dd.trace.jmx.tags`                    | `DD_TRACE_JMX_TAGS`                    | `null`                            | (例: `key1:value1,key2:value2`) すべての JMX メトリクスに追加されるデフォルトタグのリスト。同じ名前のタグが JMX メトリクスに追加された場合、ここのデフォルトは上書きされます。                                                                            |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`                            | (例: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) 名前をタグ付けするヘッダーキーのマップ。ヘッダー値がトレースのタグとして自動的に提供されます。                                                                                                               |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([こちらを参照][10])                | (例: `com.some.Trace;io.other.Trace`) `@Trace` として処理するメソッドアノテーションのリスト。                                                                                                                                                                          |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`                            | (例: `package.ClassName[method1,method2,...];AnonymousClass$1[call]`) トレースするクラス/インターフェイスとメソッドのリスト。`@Trace` の追加と似ていますが、コードの変更はありません。                                                                                       |
| `dd.trace.partial.flush.min.spans`     | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`     | `1000`                            | フラッシュする部分スパンの数を設定します。大量のトラフィック処理や長時間のトレース実行時にメモリのオーバーヘッドを軽減する際に役立ちます。                                                                                                                                    |
| `dd.trace.report-hostname`             | `DD_TRACE_REPORT_HOSTNAME`             | `false`                           | 有効にすると、検出されたホスト名がトレースメタデータに追加されます                                                                                                                                                                                                          |
| `dd.trace.split-by-tags`               | `DD_TRACE_SPLIT_BY_TAGS`               | `null`                            | (例: `aws.service`) 対応するサービスタグで特定されるよう、スパンの名前を変えるために使われます                                                                                                                                                                      |
| `dd.trace.db.client.split-by-instance` | `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | `false`                           | `true` に設定すると、db スパンにインスタンス名がサービス名として割り当てられます                                                                                                                                                                                         |
| `dd.trace.health.metrics.enabled`      | `DD_TRACE_HEALTH_METRICS_ENABLED`      | `false`                           | `true` に設定すると、トレーサーヘルスメトリクスが送信されます                                                                                                                                                                                                                         |
| `dd.trace.health.metrics.statsd.host`  | `DD_TRACE_HEALTH_METRICS_STATSD_HOST`  | `dd.jmxfetch.statsd.host` と同じ | ヘルスメトリクスの送信先の Statsd ホスト                                                                                                                                                                                                                                  |
| `dd.trace.health.metrics.statsd.port`  | `DD_TRACE_HEALTH_METRICS_STATSD_PORT`  | `dd.jmxfetch.statsd.port` と同じ | ヘルスメトリクスの送信先の Statsd ポート                                                                                                                                                                                                                                  |
| `dd.http.client.tag.query-string`      | `DD_HTTP_CLIENT_TAG_QUERY_STRING`      | `false`                           | `true` に設定すると、クエリ文字列パラメーターとフラグメントがウェブクライアントスパンに追加されます                                                                                                                                                                                  |
| `dd.http.client.error.statuses`        | `DD_HTTP_CLIENT_ERROR_STATUSES`        | `false`                           | 許容可能なエラーの範囲。デフォルトで 4xx エラーはエラーとしてレポートされません。このコンフィギュレーションはこれをオーバーライドします。例: `dd.http.client.error.statuses=400-499`                                                                                                     |
| `dd.http.server.tag.query-string`      | `DD_HTTP_SERVER_TAG_QUERY_STRING`      | `false`                           | `true` に設定すると、クエリ文字列パラメーターとフラグメントがウェブサーバースパンに追加されます                                                                                                                                                                                  |
| `dd.jmxfetch.enabled`                  | `DD_JMXFETCH_ENABLED`                  | `true`                            | Java トレースエージェントによる JMX メトリクスの収集を有効にします。                                                                                                                                                                                                                |
| `dd.jmxfetch.config.dir`               | `DD_JMXFETCH_CONFIG_DIR`               | `null`                            | (例: `/opt/datadog-agent/etc/conf.d`) JMX メトリクスコレクションの追加構成ディレクトリ。Java エージェントは `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探してコンフィギュレーションを変更します。                                             |
| `dd.jmxfetch.config`                   | `DD_JMXFETCH_CONFIG`                   | `null`                            | (例: `activemq.d/conf.yaml,jmx.d/conf.yaml`) JMX メトリクスコレクションの追加メトリクス構成ファイル。Java エージェントは `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探してコンフィギュレーションを変更します。                                   |
| `dd.jmxfetch.check-period`             | `DD_JMXFETCH_CHECK_PERIOD`             | `1500`                            | JMX メトリクスの送信頻度 (ms)。                                                                                                                                                                                                                                 |
| `dd.jmxfetch.refresh-beans-period`     | `DD_JMXFETCH_REFRESH_BEANS_PERIOD`     | `600`                             | 利用可能な JMX Bean のリストのリフレッシュ頻度 (秒)。                                                                                                                                                                                                          |
| `dd.jmxfetch.statsd.host`              | `DD_JMXFETCH_STATSD_HOST`              | `agent.host` と同じ              | JMX メトリクスの送信先の Statsd ホスト                                                                                                                                                                                                                                    |
| `dd.jmxfetch.statsd.port`              | `DD_JMXFETCH_STATSD_PORT`              | 8125                              | JMX メトリクスの送信先の Statsd ポート                                                                                                                                                                                                                                    |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                             | Datadog トレース ID とスパン ID に対する自動 MDC キー挿入の有効化。詳しくは、[高度な使用方法][11]を参照してください                                                                                                                                                                |

**注**:

* 両方に同じキータイプが設定された場合、システムプロパティコンフィギュレーションが優先されます。
* システムプロパティは JVM パラメーターとして使用できます。
* デフォルトで、アプリケーションからの JMX メトリクスは、DogStatsD によりポート `8125` で Datadog Agent に送信されます。[DogStatsD がエージェントに対して有効になっている][12]ことを確認してください。
Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [`true` に設定されている][13]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。
Kubernetes の場合は、[DogStatsD ポートをホストポートにバインドします][14]。ECS の場合は、[タスク定義で適当なフラグを設定します][15]。

### 構成例:

#### `dd.trace.enabled`

**システムプロパティとデバッグアプリのモードの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug -jar path/to/application.jar
```

デバッグアプリのログに、`Tracing is disabled, not installing instrumentations.` と表示されます。

#### `dd.service.name`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -jar path/to/application.jar
```

{{< img src="tracing/setup/java/dd_service_name.png" alt="サービス名" responsive="true" >}}

#### `dd.service.mapping`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="サービスマッピング" responsive="true" >}}

#### `dd.trace.global.tags`

**スパンと JMX メトリクスにグローバルな env を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="グローバルタグのトレース" responsive="true" >}}

#### `dd.trace.span.tags`

**すべてのスパンに project:test を追加する例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="スパンタグのトレース" responsive="true" >}}

#### `dd.trace.jmx.tags`

**JMX メトリクスに custom.type:2 を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="JMX タグのトレース" responsive="true" >}}

#### `dd.trace.methods`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.global.tags=env:dev -Ddd.service.name=web-app -Ddd.trace.methods=notes.app.NotesHelper[customMethod3] -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="メソッドのトレース" responsive="true" >}}

#### `dd.trace.db.client.split-by-instance`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.global.tags=env:dev -Ddd.service.name=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

これで、DB インスタンス 1 である `webappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="インスタンス 1" responsive="true" >}}

これで、DB インスタンス 2 である `secondwebappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="インスタンス 2" responsive="true" >}}

同様に、サービスマップで、1 つの Web アプリが 2 つの異なる Postgres データベースに呼び出しを行っていることがわかります。

#### `dd.http.server.tag.query-string`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service.name=web-app -Ddd.trace.global.tags=env:dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="クエリ文字列" responsive="true" >}}

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][16]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。現在、次の 2 つのスタイルがサポートされています:

* Datadog: `Datadog`
* B3: `B3`

挿入スタイルは次を使って構成できます:

* システムプロパティ: `-Ddd.propagation.style.inject=Datadog,B3`
* 環境変数: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

プロパティまたは環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

* システムプロパティ: `-Ddd.propagation.style.extract=Datadog,B3`
* 環境変数: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

プロパティまたは環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

## トレースのレポート

Datadog にトレースをレポートすると、次のことが発生します:

* トレースが完了します
* トレースはトレースの非同期キューにプッシュされます
  * キューのサイズには制限があり、設定された上限である 7000 件のトレースを超えて拡大することはありません
  * サイズの上限に達すると、トレースは破棄されます
  * 正確なスループットを実現するため、トレースの合計数が取得されます
* 独立したレポートスレッドで、トレースキューがフラッシュされ、トレースが msgpack 経由でエンコードされ、その後 http 経由で Datadog Agent に送信されます
* キューのフラッシュが 1 秒に 1 回のスケジュールで発生します

Datadog がサポートするライブラリやフレームワークの実際のコード、ドキュメント、使用例を確認したい場合は、[インテグレーション](#integrations)セクションの Java アプリケーションの自動インスツルメンテーションされたコンポーネントの全一覧を参照してください。

### トレースアノテーション

プロジェクトに `dd-trace-api` 依存関係を追加します。Maven の場合、次を `pom.xml` に追加します:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>{バージョン}</version>
</dependency>
```

Gradle の場合は、次を追加します:

```gradle
compile group: 'com.datadoghq', name: 'dd-trace-api', version: {バージョン}
```

次に `@Trace` をメソッドに追加して、`dd-java-agent.jar` での実行時にメソッドがトレースされるようにします。Agent が添付されていない場合は、このアノテーションはアプリケーションに影響しません。

`@Trace` アノテーションにはデフォルトのオペレーション名 `trace.annotation` がある一方、トレースされるメソッドにはデフォルトでリソースがあります。

## パフォーマンス

Java APM がアプリケーションのオーバーヘッドに与える影響は最小限です:

* Java APM によって維持されるコレクションがメモリで無制限に拡大することはありません
* トレースのレポートによってアプリケーションスレッドがブロックされることはありません
* Java APM は、トレースコレクションとライブラリのインスツルメンテーションのために追加クラスをロードします
* 通常、Java APM による CPU 使用率の上昇は 3% 以内です
* 通常、Java APM による JVM ヒープ使用率の上昇は 3% 以内です

## Agent ホスト名の変更

アプリケーションレベルのトレーサーを設定し、以下のカスタム Agent ホスト名にトレースを送信します。

Java Tracing Module が自動的に検索し環境変数の `DD_AGENT_HOST` や `DD_TRACE_AGENT_PORT` で初期化します。

```bash
java -javaagent:<DD-JAVA-エージェントパス>.jar -jar <アプリケーションパス>.jar
```

システムプロパティを使うこともできます:

```bash
java -javaagent:<DD-JAVA-エージェントパス>.jar \
     -Ddd.agent.host=$DD_AGENT_HOST \
     -Ddd.agent.port=$DD_TRACE_AGENT_PORT \
     -jar <アプリケーションパス>.jar
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/docker/apm
[2]: /ja/tracing/setup/docker
[3]: /ja/agent/kubernetes/daemonset_setup/#trace-collection
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: https://github.com/DataDog/dd-trace-java/blob/master/CONTRIBUTING.md
[6]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[7]: http://bytebuddy.net
[8]: /ja/help
[9]: https://github.com/DataDog/documentation#outside-contributors
[10]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[11]: /ja/tracing/connect_logs_and_traces/?tab=java
[12]: /ja/developers/dogstatsd/#setup
[13]: /ja/agent/docker/#dogstatsd-custom-metrics
[14]: /ja/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[15]: /ja/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[16]: https://github.com/openzipkin/b3-propagation