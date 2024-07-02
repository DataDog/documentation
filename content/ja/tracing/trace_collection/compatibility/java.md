---
title: Java Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the Java tracer'
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
    - /tracing/compatibility_requirements/
    - /tracing/compatibility_requirements/java
    - /tracing/setup_overview/compatibility_requirements/java
further_reading:
    - link: tracing/trace_collection/dd_libraries/java
      tag: Documentation
      text: Instrument Your Application
---

## Compatibility

The Java Datadog Trace library is open source - view the [GitHub repository][1] for more information.

### Supported Java runtimes

The Java Tracer supports automatic instrumentation for the following Oracle JDK, OpenJDK JVM, and [GraalVM](#graalvm-native-image-support) runtimes.

#### Java Tracer v1 (latest)

<table>
  <thead>
    <th>Java versions</th>
    <th>Operating Systems</th>
    <th>Support level</th>
  </thead>
  <tr>
    <td>from 22 and upward</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
  <tr>
    <td>from 18 to 21</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">from 8 to 17</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
</table>

Datadog does not officially support any early-access versions of Java.

#### Java Tracer v0 (maintenance)

| Java versions      | Operating Systems                                                               | Support level                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| 7 only             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Maintenance](#levels-of-support) |
| 7 only             | Linux (arm64)<br>Mac (arm64)                                                    | [End-of-life](#levels-of-support) |

### Levels of support

| **Level**                                              | **Support provided**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. Contact [Datadog support][2] for special requests.                                                                              |
| <span id="support-beta">Beta</span>                    |  Initial implementation. May not yet contain all features. Support for new features and bug and security fixes are provided on a best-effort basis. |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features and bug and security fixes.                                                     |
| <span id="support-maintenance">Maintenance</span>      |  Full implementation of existing features. Does not receive new features. Support for bug and security fixes only.                                  |
| <span id="support-eol">End-of-life (EOL)</span>        |  No support.                                                                                                                                        |

## インテグレーション

Beta integrations are disabled by default but can be enabled individually:

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Environment Variable: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Web framework compatibility

`dd-java-agent` includes support for automatically tracing the following web frameworks.

**Web Framework tracing provides:**

- timing HTTP request to response
- tags for the HTTP request (status code, method, etc.)
- error and stacktrace capturing
- linking work created within a web request and Distributed Tracing

| Server                  | Versions   | Support Type                                        | Instrumentation Names (used for configuration)           |
|-------------------------|------------|-----------------------------------------------------|----------------------------------------------------------|
| Akka-Http Server        | 10.0+      | Fully Supported                                     | `akka-http`, `akka-http-server`                          |
| Finatra Web             | 2.9+       | Fully Supported                                     | `finatra`                                                |
| Grizzly                 | 2.0+       | Fully Supported                                     | `grizzly`                                                |
| Grizzly-HTTP            | 2.3.20+    | Fully Supported                                     | `grizzly-filterchain`                                    |
| Java Servlet Compatible | 2.3+, 3.0+ | Fully Supported                                     | `servlet`, `servlet-2`, `servlet-3`                      |
| Jax-RS Annotations      | JSR311-API | Fully Supported                                     | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter` |
| Jetty                   | 7.0-12.x   | Fully Supported                                     | `jetty`                                                  |
| Micronaut HTTP Server   | 2.x        | Fully Supported                                     | `micronaut`                                              |
| Mulesoft                | 4          | Fully Supported                                     | `mule`                                                   |
| Netty HTTP Server       | 3.8+       | Fully Supported                                     | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`           |
| Play                    | 2.3-2.8    | Fully Supported                                     | `play`, `play-action`                                    |
| Ratpack                 | 1.5+       | Fully Supported                                     | `ratpack`                                                |
| Restlet HTTP Server     | 2.2 - 2.4  | Fully Supported                                     | `restlet-http`.                                          |
| Spark Java              | 2.3+       | [Beta](#framework-integrations-disabled-by-default) | `sparkjava` (requires `jetty`)                           |
| Spring Boot             | 1.5+       | 完全対応                                     | `spring-web` または `spring-webflux`                         |
| Spring Web (MVC)        | 4.0+       | 完全対応                                     | `spring-web`                                             |
| Spring WebFlux          | 5.0+       | 完全対応                                     | `spring-webflux`                                         |
| Tomcat                  | 5.5+       | 完全対応                                     | `tomcat`                                                 |
| Vert.x                  | 3.4+       | 完全対応                                     | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`           |

**注:** 多くのアプリケーションサーバーは Servlet 互換でそのインスツルメンテーションによって自動的にカバーされます (Websphere、Weblogic、JBoss)。
また、Spring Boot (バージョン 3) のようなフレームワークは、通常、Tomcat、Jetty、Netty など、サポートされた組み込みアプリケーションサーバーを使うため、本質的に機能します。

### フレームワークインテグレーションがデフォルトで無効

以下のインスツルメンテーションはデフォルトでは無効になっており、以下の設定により有効にすることができます。

| インスツルメンテーション | 有効にするには                                                                                                                                                          |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| JAX-WS                | `-Ddd.integration.jax-ws.enabled=true`                                                                                                    |
| Mulesoft            | `-Ddd.integration.mule.enabled=true`, `-Ddd.integration.grizzly-client.enabled=true`, `-Ddd.integration.grizzly-filterchain.enabled=true` |
| Grizzly         | `-Ddd.integration.grizzly-client.enabled=true`                                                                                            |
| Grizzly-HTTP    | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                                                       |
| Ning            | `-Ddd.integration.ning.enabled=true`                                                                                                      |
| Spark Java      | `-Ddd.integration.sparkjava.enabled=true`                                                                                                 |
| Hazelcast       | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`                                               |

**注**: JAX-WS インテグレーションは、@WebService (JAX-WS 1.x) および @WebServiceProvider (JAX-WS 2.x) でアノテーションされたエンドポイントを使用します。

希望する Web フレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### ネットワーキングフレームワークの互換性

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

**ネットワーキングのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- リクエスト用のタグ (応答コードなど)
- エラーとスタックトレースの取得
- 分散型トレーシング

| フレームワーク                          | バージョン    | サポートの種類                                        | インスツルメンテーション名 (構成に使用)          |
|------------------------------------|-------------|-----------------------------------------------------|---------------------------------------------------------|
| Apache HTTP クライアント                 | 4.0+        | 完全対応                                     | `httpclient`、`apache-httpclient`、`apache-http-client` |
| Apache HTTP 非同期クライアント           | 4.0+        | 完全対応                                     | `httpasyncclient`、`apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+、2.2+ | 完全対応                                     | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | ベータ                                                | [opentelemetry-1][5]                                    |
| Commons HTTP クライアント                | 2.0+        | 完全対応                                     | `commons-http-client`                                   |
| Google HTTP クライアント                 | 1.19.0+     | 完全対応                                     | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | 完全対応                                     | `google-pubsub`                                         |
| Grizzly HTTP クライアント                | 1.9+        | [ベータ版](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | 完全対応                                     | `grpc`、`grpc-client`、`grpc-server`                    |
| HttpURLConnection                  | すべて         | 完全対応                                     | `httpurlconnection`、`urlconnection`                    |
| Kafka-Clients                      | 0.11+       | 完全対応                                     | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | 完全対応                                     | `kafka`、`kafka-streams`                                |
| Java RMI                           | すべて         | 分散型トレーシング非対応                   | `rmi`、`rmi-client`、`rmi-server`                       |
| Jax RS クライアント                     | 2.0+        | 完全対応                                     | `jax-rs`、`jaxrs`、`jax-rs-client`                      |
| Jersey クライアント                      | 1.9-2.29    | 完全対応                                     | `jax-rs`、`jaxrs`、`jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1-3.0+      | 完全対応                                     | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Netty HTTP クライアント                  | 4.0+        | 完全対応                                     | `netty`、`netty-4.0`、`netty-4.1`                       |
| Ning HTTP クライアント                   | 1.9.0+      | [ベータ版](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | 完全対応                                     | `okhttp`、`okhttp-2`、`okhttp-3`                         |
| Play WSClient                      | 1.0+        | 完全対応                                     | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | 完全対応                                     | `amqp`、`rabbitmq`                                      |
| Spring SessionAwareMessageListener | 3.1+        | 完全対応                                     | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | 完全対応                                     | `spring-webflux`、`spring-webflux-client`               |

**Kafka に関する注記**: Datadog の Kafka インテグレーションは、ヘッダー API をサポートする Kafka のバージョン `0.11+` で機能します。この API はトレースコンテキストの挿入と抽出に使用されます。バージョンが混在する環境でシステムを稼働させている場合は、Kafka ブローカーが Kafka のより新しいバージョンを間違って報告する場合があります。この場合、トレーサーがローカルのプロデューサーでサポートされていないヘッダーを挿入しようとしたときに問題が発生することがあります。また、古いバージョンのコンシューマーはヘッダーが存在するためにメッセージを収集することができません。これらの問題を回避するために、0.11 より前の Kafka のバージョンが混在している環境では、環境変数: `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false` を伴うコンテキストの伝搬を無効化するようにしてください。

**JMS に関する注記**: Datadog の JMS インテグレーションでは、コンシューマーサービスとプロデューサーサービス間のコンテキスト伝播を維持するために、メッセージオブジェクトのプロパティ `x__dash__datadog__dash__trace__dash__id` と `x__dash__datadog__dash__parent__dash__id` を自動的に追加して読み込みを行うようにします。

**Camel に関する注記**: Camel のルートを使った分散型トレースの伝播はサポートされていません。

希望するネットワーキングフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### データストアの互換性

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

| データベース                | バージョン | サポートの種類    | インスツルメンテーション名 (構成に使用)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | 完全対応 | `aerospike`                                                                                |
| Couchbase               | 2.0+     | 完全対応 | `couchbase`                                                                                |
| Cassandra               | 3.0+     | 完全対応 | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | 完全対応 | `elasticsearch`、`elasticsearch-transport`、`elasticsearch-transport-{2,5,6,7}` (1 つ選択) |
| Elasticsearch Rest      | 5.0+     | 完全対応 | `elasticsearch`、`elasticsearch-rest`、`elasticsearch-rest-{5,6,7}` (1 つ選択)             |
| JDBC                    | N/A      | 完全対応 | `jdbc`、`jdbc-datasource`                                                                  |
| Jedis                   | 1.4+     | 完全対応 | `jedis`、`redis`                                                                           |
| Lettuce                 | 4.0+     | 完全対応 | `lettuce`、`lettuce-4-async`、`lettuce-5-rx`                                               |
| MongoDB                 | 3.0-4.0+ | 完全対応 | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x-2.x  | 完全対応 | `opensearch`、`opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x-2.x  | 完全対応 | `opensearch`、`opensearch-transport`                                                       |
| RediScala               | 1.5+     | 完全対応 | `rediscala`、`redis`                                                                       |
| Redisson                | 2.x-3.x  | 完全対応 | `redisson`、`redis`                                                                        |
| SpyMemcached            | 2.12+    | 完全対応 | `spymemcached`                                                                             |
| Vert.x Cassandra クライアント | 3.9+           | 完全対応 | `cassandra`                                                                                                                                       |
| Vert.x Redis クライアント     | 3.9      | 完全対応 | `vertx-redis-client`                                                                       |
| Vert.x MySQL クライアント     | 3.9+     | 完全対応 | `vertx-sql-client`                                                                                                                            |

`dd-java-agent` は、次を含む一般的な JDBC ドライバーとも互換性があります。

- Apache Derby
- Firebird SQL
- H2 データベースエンジン
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

### データベースインテグレーションがデフォルトで無効

以下のインスツルメンテーションはデフォルトでは無効になっており、以下の設定により有効にすることができます。

| インスツルメンテーション   | 有効にするには                                                                  |
|-------------------|-------------------------------------------------|
| JDBC-Datasource        | `-Ddd.integration.jdbc-datasource.enabled=true` |

希望するデータストアが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### フレームワーク互換性の追加

`dd-java-agent` には、次のフレームワークの自動トレースのサポートが含まれます。

| フレームワーク         | バージョン   | サポートの種類                                                     | インスツルメンテーション名 (構成に使用) |
|-------------------|------------|------------------------------------------------------------------|------------------------------------------------|
| Datanucleus JDO   | 4.0+       | 完全対応                                                  | `datanucleus`                                  |
| Dropwizard Views  | 0.7+       | 完全対応                                                  | `dropwizard`、`dropwizard-view`                |
| GraphQL           | 14.0+      | 完全対応                                                  | `graphql-java`                                 |
| Hazelcast         | 3.6+       | [ベータ版](#framework-integrations-disabled-by-default)              | `hazelcast`, `hazelcast_legacy`                |
| Hibernate         | 3.5+       | 完全対応                                                  | `hibernate`、`hibernate-core`                  |
| Hystrix           | 1.4+       | 完全対応                                                  | `hystrix`                                      |
| JSP Rendering     | 2.3+       | 完全対応                                                  | `jsp`、`jsp-render`、`jsp-compile`             |
| JUnit             | 4.1+、5.3+ | 完全対応                                                  | `junit`、`junit-4`、`junit-5`                  |
| プロジェクトリアクタ   | 3.1+       | 完全対応                                                  | `reactor-core`                                 |
| Quartz            | 2.x        | 完全対応                                                  | `quartz`                                       |
| RxJava            | 2.x        | 完全対応                                                  | `rxjava`                                       |
| Spring Data       | 1.8+       | 完全対応                                                  | `spring-data`                                  |
| Spring Scheduling | 3.1+       | 完全対応                                                  | `spring-scheduling`                            |
| Twilio SDK        | < 8.0      | 完全対応                                                  | `twilio-sdk`                                   |

希望するフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。フレームワークのリクエストは、[サポートチーム][2]までお気軽にお問い合わせください。

サポートされていないフレームワークを使ったアプリケーションの可視性を向上させるには、次のことを検討してください。

- [カスタムインスツルメンテーションの追加][3]。
- 将来のリリースに含めるためのインスツルメンテーションによる[プルリクエストの送信][4]。
- [Datadog サポート][2]へのお問い合わせと機能リクエストの提供。

### インテグレーションの無効化

大半のインテグレーションはデフォルトで有効になっています。次の設定により、デフォルトを無効に変更できます。

- システムプロパティ: `-Ddd.integrations.enabled=false`
- 環境変数: `DD_INTEGRATIONS_ENABLED=false`

インテグレーション箱別に有効または無効にできます (上記のデフォルトをオーバーライド)。

- システムプロパティ: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- 環境変数: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(各インテグレーションの名前については上記を参照してください。)

### 既知の問題

- Bitbucket での Java トレーサーの実行はサポートされていません。
- Loading multiple Java Agents that perform APM/tracing functions is not a recommended or supported configuration.

## GraalVM Native Image support

GraalVM Native Image is a technology that allows you to compile Java applications into native executables. The Datadog Java tracer supports GraalVM Native Image. This allows you to compile your applications into native executables while still benefiting from the tracing capabilities offered by the library.

### 要件

Use the latest versions of:

- [GraalVM][7]
- [Datadog Java tracer][1]

### セットアップ

{{< tabs >}}
{{% tab "GraalVM" %}}
To set up the Datadog Java tracer with GraalVM Native Image, follow these steps:

1. Instrument your application, following the steps described on [Tracing Java Applications][6].
2. When you build a native executable with the `native-image` command, add the `-J-javaagent:/path/to/dd-java-agent.jar` argument. For example:
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Optional) Enable the profiler integration by adding the following argument:
`-J-Ddd.profiling.enabled=true –enable-monitoring=jfr`.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
To set up the Datadog Java tracer with Quarkus Native, follow these steps:

1. Instrument your application, following the steps described in [Tracing Java Applications][6].
2. When you build a native executable, use the `quarkus.native.additional-build-args` property. For example:
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Optional) Enable the profiler integration by adding the following argument:
`-J-Ddd.profiling.enabled=true –enable-monitoring=jfr`.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
To set up the Datadog Java tracer with Spring Native, follow these steps:

1. Instrument your application, following the steps described on [Tracing Java Applications][6].
2. For Spring Native builds based on Buildpacks, enable the [Paketo Buildpack for Datadog][8] using `BP_DATADOG_ENABLED=true`.
   - You can do this at the build tool level, like Maven:
     ```yaml
     <build>
     <plugins>
       <plugin>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-maven-plugin</artifactId>
         <configuration>
           <image>
             ...
             <env>
               ...
               <BP_DATADOG_ENABLED>true</BP_DATADOG_ENABLED>
               ...
             </env>
           </image>
         </configuration>
       </plugin>
     </plugins>
     </build>
     ```
   - Alternatively, you can use the `pack build` command with `--env BP_DATADOG_ENABLED=true` option to enable the Datadog buildpack.
3. (Optional) Enable the profiler integration by setting the environment variable `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true –enable-monitoring=jfr’`.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

#### 使用方法

After completing the setup, the service should send traces to Datadog.

You can view traces using the [Trace Explorer][9].

{{% collapse-content title="Troubleshooting" level="h4" %}}
##### Native-image buildpack versions older than 5.12.2

Older native-image buildpack versions expose the following option: `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

When this option is `false`, exceptions like the following can occur:

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError: 
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException: 
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap 
as this class should be initialized at image runtime. To see how this object got 
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Solutions to this issue are:

- Set `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explicitly to true in the image env configuration,
- Or upgrade the `native-image` buildpack to version 5.12.2 or later. The best way to do this is by upgrading the `java-native-image` buildpack to 8.13.0 or later.

##### Paketo buildpack for Datadog versions older than 4.6.0

Paketo buildpack for Datadog had a bug in older versions that materialized with the following error message:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

The solution to this issue is to upgrade to version 4.6.0 or later.

{{% /collapse-content %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /tracing/trace_explorer/
