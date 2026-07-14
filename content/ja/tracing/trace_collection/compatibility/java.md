---
aliases:
- /ja/tracing/compatibility_requirements/
- /ja/tracing/compatibility_requirements/java
- /ja/tracing/setup_overview/compatibility_requirements/java
code_lang: java
code_lang_weight: 0
description: Java トレーサーの互換性要件
further_reading:
- link: tracing/trace_collection/dd_libraries/java
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
title: Java 互換性要件
type: multi-code-lang
---
## 互換性 {#compatibility}

Java Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

### サポートされている Java ランタイム {#supported-java-runtimes}

Java トレーサーは、Oracle JDK、OpenJDK JVM、および [GraalVM](#graalvm-native-image-support) の次のランタイムの自動インスツルメンテーションをサポートします。

#### Java トレーサー v1 (最新) {#java-tracer-v1-latest}

<table>
  <thead>
    <th>Java バージョン</th>
    <th>オペレーティングシステム</th>
    <th>サポートレベル</th>
  </thead>
  <tr>
    <td>27 以上</td>
    <td>Windows (x86、x86-64)<br>Linux (x86、x86-64、arm64)<br>Mac (x86、x86-64、arm64)</td>
    <td><a href="#levels-of-support">プレビュー</a></td>
  </tr>
  <tr>
    <td>18 ～ 26</td>
    <td>Windows (x86、x86-64)<br>Linux (x86、x86-64、arm64)<br>Mac (x86、x86-64、arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">8 ～ 17</td>
    <td>Windows (x86、x86-64)<br>Linux (x86、x86-64)<br>Mac (x86、x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">プレビュー</a></td>
  </tr>
</table>

Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。

#### Java トレーサー v0 {#java-tracer-v0}

| Java バージョン      | オペレーティングシステム                                                               | サポートレベル                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| 7 のみ             | Windows (x86、x86-64)<br>Linux (x86、x86-64)<br>Mac (x86、x86-64)               | [サポート終了](#levels-of-support) |
| 7 のみ             | Linux (arm64)<br>Mac (arm64)                                                    | [サポート終了](#levels-of-support) |

### サポートのレベル {#levels-of-support}

| **レベル**                                              | **サポート内容**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。特別なご要望は [Datadog サポート][2]にお問い合わせください。                                                                             |
| <span id="support-beta">プレビュー</span>                 |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。|
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能、バグやセキュリティの修正を完全サポート。                                                    |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は追加されません。バグとセキュリティの修正のみの対応となります。                                 |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                                       |

## インテグレーション {#integrations}

プレビューのインテグレーションはデフォルトで無効になっていますが、個別に有効にできます。

- システムプロパティ: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- 環境変数: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Web フレームワークの互換性 {#web-framework-compatibility}

`dd-java-agent` には、次の Web フレームワークの自動トレースのサポートが含まれます。

**Web フレームワークのトレーシングでは以下の確認が可能です。**

- HTTP リクエストの応答タイミング
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- エラーとスタックトレースの取得
- Web リクエスト内で作成された作業と分散型トレーシングの関連付け

| サーバー                  | バージョン     | サポートの種類                                           | インスツルメンテーション名 (構成で使用される)             |
|-------------------------|--------------|--------------------------------------------------------|------------------------------------------------------------|
| Akka-Http サーバー        | 10.0+        | 完全対応                                        | `akka-http`, `akka-http-server`                            |
| Apache Pekko            | 1.0+         | 完全対応                                        | `pekko-http`, `pekko-http-server`                          |
| Finatra Web             | 2.9+         | 完全対応                                        | `finatra`                                                  |
| Grizzly                 | 2.0+         | 完全対応                                        | `grizzly`                                                  |
| Grizzly-HTTP            | 2.3.20+      | 完全対応                                        | `grizzly-filterchain`                                      |
| Java Servlet 互換 | 2.3+、3.0+   | 完全対応                                        | `servlet`、`servlet-2`、`servlet-3`                        |
| Jax-RS アノテーション      | JSR311-API   | 完全対応                                        | `jax-rs`、`jaxrs`、`jax-rs-annotations`、`jax-rs-filter`   |
| Jetty                   | 7.0-12.x     | 完全対応                                        | `jetty`                                                    |
| Micronaut HTTP サーバー   | 2.x+         | 完全対応                                        | `micronaut`                                                |
| Mulesoft                | 4.5.0+       | 完全対応                                        | `mule`                                                     |
| Netty HTTP サーバー       | 3.8+         | 完全対応                                        | `netty`、`netty-3.8`、`netty-4.0`、`netty-4.1`             |
| Play                    | 2.3～2.8      | 完全対応                                        | `play`、`play-action`                                      |
| Ratpack                 | 1.5+         | 完全対応                                        | `ratpack`                                                  |
| Restlet HTTP サーバー     | 2.2～2.4    | 完全対応                                        | `restlet-http`.                                           |
| Spark Java              | 2.3+         | [プレビュー](#framework-integrations-disabled-by-default) | `sparkjava` (要 `jetty`)                             |
| Spring Boot             | 1.5+         | 完全対応                                        | `spring-web` または `spring-webflux`                           |
| Spring Web (MVC)        | 4.0+         | 完全対応                                        | `spring-web`                                               |
| Spring WebFlux          | 5.0+         | 完全対応                                        | `spring-webflux`                                           |
| Tomcat                  | 5.5+         | 完全対応                                        | `tomcat`                                                   |
| Undertow                | 2.0+         | 完全対応                                        | `undertow`                                                 |
| Vert.x                  | 3.4 ～ 5.x    | 完全対応                                        | `vertx`、`vertx-3.4`、`vertx-3.9`、`vertx-4.0`、`vertx-5.0`|
| Websocket (JSR356)      | 1.0+         | [プレビュー](#framework-integrations-disabled-by-default) | `websocket`                                                |

**注:** 多くのアプリケーションサーバーは Servlet 互換で、そのインスツルメンテーションによって自動的にカバーされます (Websphere、Weblogic、JBoss)。
また、Spring Boot (バージョン 3) のようなフレームワークは、通常、Tomcat、Jetty、Netty など、サポートされた組み込みアプリケーションサーバーを使用するため、本質的に機能します。

### フレームワークインテグレーションがデフォルトで無効 {#framework-integrations-disabled-by-default}

以下のインスツルメンテーションはデフォルトでは無効になっており、以下の設定により有効にすることができます。

| インスツルメンテーション              | 有効にするには 									                                                                              |
|------------------------------|----------------------------------------------------------------------------------------------------------|
| Grizzly                      | `-Ddd.integration.grizzly-client.enabled=true`                                                           |
| Grizzly-HTTP                 | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                      |
| Hazelcast (クライアント側のみ) | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`         |
| Ignite                       | `-Ddd.integration.ignite.enabled=true`                                                                   |
| JAX-WS                       | `-Ddd.integration.jax-ws.enabled=true`                                                                   |
| JDBC Datasource              | `-Ddd.integration.jdbc-datasource.enabled=true`                                                          |
| Mulesoft                     | `-Ddd.integration.mule.enabled=true`                                                                     |
| Netty Promise                | `-Ddd.integration.netty-promise.enabled=true`                                                            |
| Ning                         | `-Ddd.integration.ning.enabled=true`                                                                     |
| Spark Java                   | `-Ddd.integration.sparkjava.enabled=true`                                                                |
| TIBCO BusinessWorks          | `-Ddd.integration.tibco.enabled=true`                                                                    |
| URL Connection               | `-Ddd.integration.urlconnection.enabled=true` </br> `-Ddd.integration.httpurlconnection.enabled=true`    |
| Websocket                    | `-Ddd.trace.websocket.messages.enabled=true`                                                             |
| ZIO                          | `-Ddd.integration.zio.experimental.enabled=true`                                                         |


**注**: JAX-WS インテグレーションは、@WebService (JAX-WS 1.x) および @WebServiceProvider (JAX-WS 2.x) でアノテーションされたエンドポイントをインスツルメントします。

希望する Web フレームワークが見つかりませんか?Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### ネットワーキングフレームワークの互換性 {#networking-framework-compatibility}

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

**ネットワーキングのトレーシングでは以下の確認が可能です。**

- リクエストの応答タイミング
- リクエスト用のタグ (応答コードなど)
- エラーとスタックトレースの取得
- 分散型トレーシング

| フレームワーク                          | バージョン    | サポートの種類                                           | インスツルメンテーション名 (構成で使用される)          |
|------------------------------------|-------------|--------------------------------------------------------|---------------------------------------------------------|
| Apache HTTP クライアント                 | 4.0+        | 完全対応                                        | `httpclient`、`apache-httpclient`、`apache-http-client` |
| Apache HTTP 非同期クライアント           | 4.0+        | 完全対応                                        | `httpasyncclient`、`apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+、2.2+ | 完全対応                                        | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | プレビュー                                                | [opentelemetry-1][5]                                    |
| Commons HTTP クライアント                | 2.0+        | 完全対応                                        | `commons-http-client`                                   |
| Google HTTP クライアント                 | 1.19.0+     | 完全対応                                        | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | 完全対応                                        | `google-pubsub`                                         |
| Grizzly HTTP クライアント                | 1.9+        | [プレビュー](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | 完全対応                                        | `grpc`、`grpc-client`、`grpc-server`                    |
| HttpURLConnection                  | すべて         | 完全対応                                        | `httpurlconnection`、`urlconnection`                    |
| Kafka-Clients                      | 0.11+       | 完全対応                                        | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | 完全対応                                        | `kafka`、`kafka-streams`                                |
| Java RMI                           | すべて         | 分散型トレーシング非対応                      | `rmi`、`rmi-client`、`rmi-server`                       |
| Jax RS クライアント                     | 2.0+        | 完全対応                                        | `jax-rs`、`jaxrs`、`jax-rs-client`                      |
| Jersey クライアント                      | 1.9 ～ 2.29    | 完全対応                                        | `jax-rs`、`jaxrs`、`jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1 ～ 3.0+      | 完全対応                                        | `jms`、`jms-1`、`jms-2`、`jakarta-jms`                  |
| Netty HTTP クライアント                  | 4.0+        | 完全対応                                        | `netty`、`netty-4.0`、`netty-4.1`                       |
| Ning HTTP クライアント                   | 1.9.0+      | [プレビュー](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | 完全対応                                        | `okhttp`、`okhttp-2`、`okhttp-3`                         |
| Play WSClient                      | 1.0+        | 完全対応                                        | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | 完全対応                                        | `amqp`、`rabbitmq`                                      |
| SOFA RPC                           | 5.0+        | 完全対応                                        | `sofarpc`                                               |
| Spring SessionAwareMessageListener | 3.1+        | 完全対応                                        | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | 完全対応                                        | `spring-webflux`、`spring-webflux-client`               |

**Kafka に関する注記**: Datadog の Kafka インテグレーションは、ヘッダー API をサポートする Kafka のバージョン `0.11+` で機能します。この API は、トレースコンテキストの挿入と抽出に使用されます。バージョンが混在する環境でシステムを稼働させている場合は、Kafka ブローカーが Kafka のより新しいバージョンを間違って報告する場合があります。この場合、SDK がローカルのプロデューサーでサポートされていないヘッダーを挿入しようとすると問題が発生します。また、古いバージョンのコンシューマーは、ヘッダーが存在するためにメッセージを収集することができません。これらの問題を回避するために、0.11 より前のバージョンの Kafka が混在している環境では、環境変数 `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false` を使用してコンテキストの伝搬を無効化するようにしてください。

**JMS に関する注記**: Datadog の JMS インテグレーションでは、コンシューマーサービスとプロデューサーサービス間のコンテキスト伝搬を維持するために、メッセージオブジェクトプロパティ `x__dash__datadog__dash__trace__dash__id` と `x__dash__datadog__dash__parent__dash__id` の追加と読み取りが自動的に行われます。

**Camel に関する注記**: Camel のルートを使った分散型トレースの伝搬はサポートされていません。

**SOFA RPC に関する注記**: Datadog の SOFA RPC インテグレーションは、トランスポートプロトコルの Bolt、Triple、REST をサポートしています。Triple は gRPC トランスポートを使用するため、Triple 呼び出しの分散型トレーシングでは、`grpc` インテグレーションを有効にしたままにする必要があります。

希望するネットワーキングフレームワークが見つかりませんか?Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### データストアの互換性 {#data-store-compatibility}

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

**データストアのトレーシングでは以下の確認が可能です。**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

| データベース                | バージョン | サポートの種類    | インスツルメンテーション名 (構成で使用される)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | 完全対応 | `aerospike`                                                                                |
| Couchbase               | 2.0+     | 完全対応 | `couchbase`                                                                                |
| Cassandra               | 3.0+     | 完全対応 | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | 完全対応 | `elasticsearch`、`elasticsearch-transport`、`elasticsearch-transport-{2,5,6,7}` (1 つ選択) |
| Elasticsearch Rest      | 5.0+     | 完全対応 | `elasticsearch`、`elasticsearch-rest`、`elasticsearch-rest-{5,6,7}` (1 つ選択)             |
| Ignite                  | 2.0 ～ 3.0  | [プレビュー](#framework-integrations-disabled-by-default) | `ignite`                                            |
| JDBC                    | N/A      | 完全対応 | `jdbc`、`jdbc-datasource`                                                                  |
| Jedis                   | 1.4+     | 完全対応 | `jedis`、`redis`                                                                           |
| Lettuce                 | 4.0+     | 完全対応 | `lettuce`、`lettuce-4-async`、`lettuce-5-rx`                                               |
| MongoDB                 | 3.0 ～ 4.0+ | 完全対応 | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x ～ 2.x  | 完全対応 | `opensearch`、`opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x ～ 2.x  | 完全対応 | `opensearch`、`opensearch-transport`                                                       |
| RediScala               | 1.5+     | 完全対応 | `rediscala`、`redis`                                                                       |
| Redisson                | 2.x ～ 3.x  | 完全対応 | `redisson`、`redis`                                                                        |
| SpyMemcached            | 2.12+    | 完全対応 | `spymemcached`                                                                             |
| Vert.x Cassandra クライアント | 3.9 ～ 4.x  | 完全対応 | `cassandra`																			                                                             |
| Vert.x Redis クライアント     | 3.9 ～ 4.x  | 完全対応 | `vertx-redis-client`                                                                       |
| Vert.x MySQL クライアント    | 3.9 ～ 4.x  | 完全対応 | `vertx-sql-client`																		                                                       |

**注**: Redis 6.0+ は、`HELLO`、`MIGRATE`、`ACL SETUSER` などのコマンドでインライン認証をサポートしています。

  - **Datadog Trace Agent**: 必要最小限の推奨バージョンは `7.76.1` です。これは、トレースメタデータ内の認証パラメーターが自動的に難読化されるようにするためです。
  - **Datadog Lambda Extension** (Serverless 環境): 必要最小限のバージョンは `v28.0.0` です。

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

### データベースインテグレーションがデフォルトで無効 {#database-integrations-disabled-by-default}

以下のインスツルメンテーションはデフォルトでは無効になっており、以下の設定により有効にすることができます。

| インスツルメンテーション   | 有効にするには 									                             |
|-------------------|-------------------------------------------------|
| JDBC-Datasource		 | - システムプロパティ: `-Ddd.integration.jdbc-datasource.enabled=true`<br /> - 環境変数: `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED=true` |

希望するデータストアが見つかりませんか?Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### その他のフレームワークの互換性 {#additional-framework-compatibility}

`dd-java-agent` には、次のフレームワークの自動トレースのサポートが含まれます。

| フレームワーク           | バージョン         | サポートの種類                                           | インスツルメンテーション名 (構成で使用される) |
|---------------------|------------------|--------------------------------------------------------|------------------------------------------------|
| Apache CXF (Jax-WS) | 3.0+             | [OpenTelemetry 拡張機能][10]                          | `cxf`                                          |
| Datanucleus JDO     | 4.0+             | 完全対応                                        | `datanucleus`                                  |
| Dropwizard Views    | 0.7+             | 完全対応                                        | `dropwizard`、`dropwizard-view`                |
| GraphQL             | 14.0+            | 完全対応                                        | `graphql-java`                                 |
| Hazelcast (クライアント)  | 3.6+             | [プレビュー](#framework-integrations-disabled-by-default) | `hazelcast`、`hazelcast_legacy`                |
| Hibernate           | 3.5+             | 完全対応                                        | `hibernate`、`hibernate-core`                  |
| Hystrix             | 1.4+             | 完全対応                                        | `hystrix`                                      |
| JSP Rendering       | 2.3+             | 完全対応                                        | `jsp`、`jsp-render`、`jsp-compile`             |
| JUnit               | 4.1+、5.3+       | 完全対応                                        | `junit`、`junit-4`、`junit-5`                  |
| Kotlin Coroutines   | 1.3+             | 完全対応                                        | `kotlin_coroutine`                             |
| Project Reactor     | 3.1+             | 完全対応                                        | `reactor-core`                                 |
| Quartz              | 2.x              | 完全対応                                        | `quartz`                                       |
| RxJava              | 2.x              | 完全対応                                        | `rxjava`                                       |
| Spring Data         | 1.8+             | 完全対応                                        | `spring-data`                                  |
| Spring Scheduling   | 3.1+             | 完全対応                                        | `spring-scheduling`                            |
| TIBCO BusinessWorks | 5.14.0 ～ 6.11.0  | [プレビュー](#framework-integrations-disabled-by-default) | `tibco`、`tibco_bw`                            |
| Twilio SDK          | < 8.0            | 完全対応                                        | `twilio-sdk`                                   |

希望するフレームワークが見つかりませんか?Datadog では継続的にサポートを追加しています。フレームワークのリクエストは、[サポートチーム][2]までお気軽にお問い合わせください。

サポートされていないフレームワークを使用したアプリケーションの可視性を向上させるには、次のことを検討してください。

- [カスタムインスツルメンテーションの追加][3]。
- 将来のリリースに含めるためのインスツルメンテーションによる[プルリクエストの送信][4]。
- [Datadog サポート][2]へのお問い合わせと機能リクエストの提供。

### インテグレーションの無効化 {#disabling-integrations}

大半のインテグレーションはデフォルトで有効になっています。次の設定により、デフォルトを無効に変更できます。

- システムプロパティ: `-Ddd.integrations.enabled=false`
- 環境変数: `DD_INTEGRATIONS_ENABLED=false`

インテグレーションは個別に有効または無効にできます (上記のデフォルトを上書き)。

- システムプロパティ: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- 環境変数: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(各インテグレーションの名前については上記を参照してください。)

### 既知の問題 {#known-issues}

- Bitbucket での Java トレーサーの実行はサポートされていません。
- APM/トレース機能を実行する複数の Java Agent を読み込む構成は、推奨およびサポートされていません。
- Java 24 以降で SDK を実行すると、JNI のネイティブアクセスに関連する警告が表示されることがあります。これらの警告を抑制するには `--enable-native-access=ALL-UNNAMED` フラグを追加します。詳細については、[JEP 472][13] を参照してください。

## 事前コンパイル (AOT) クラスの読み込みとリンクのサポート {#ahead-of-time-aot-class-loading-linking-support}

起動時間を改善するために、事前コンパイル (AOT) クラスの読み込みとリンクにより、JVM の起動時にアプリケーションクラスが、読み込まれてリンクされた状態ですぐに利用できるようになります。詳細については、[JEP 483][14] および [JEP 514][15] を参照してください。

### 要件 {#requirements}

以下のものを使用します。

- Java 25 以降
- [Datadog Java SDK][1] 1.57.0 以降

### セットアップ {#setup}

AOT クラスの読み込みとリンクを APM 用に設定するには、トレーニング実行時に Datadog Java SDK を追加します。

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCacheOutput=app.aot -jar App.jar
```

#### 使用方法 {#usage}

本番環境で同じ Datadog Java SDK を、以前にキャッシュされたトレーニングデータと共に追加します。

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCache=app.aot -jar App.jar
```

[Trace Explorer][9] を使用してトレースを表示できます。

{{% collapse-content title="トラブルシューティング" level="h4" %}}
##### トレーニング実行時に Datadog Java SDK がアタッチされていない {#not-attaching-the-datadog-java-sdk-during-the-training-run}

本番環境で以下の警告が表示される場合、トレーニング時に Datadog Java SDK がアタッチされていなかったことを表します。

```
Mismatched values for property jdk.module.addmods: java.instrument specified during runtime but not during dump time
```
そのため、JVM は AOT キャッシュを使用して起動時間を改善することができません。解決策は、トレーニング時に SDK をアタッチすることです。

{{% /collapse-content %}}

## GraalVM Native Image のサポート {#graalvm-native-image-support}

GraalVM Native Image は、Java アプリケーションをネイティブ実行可能ファイルにコンパイルする技術です。Datadog Java SDK は GraalVM Native Image をサポートしています。これにより、ライブラリが提供するトレース機能の恩恵を受けながら、アプリケーションをネイティブ実行可能ファイルにコンパイルできます。

### 要件 {#requirements-1}

以下のものを使用します。

- [GraalVM JDK 21 または JDK 25][7]
- [Datadog Java SDK][1]

### セットアップ {#setup-1}

{{< tabs >}}
{{% tab "GraalVM" %}}
GraalVM Native Image を使用して Datadog Java SDK をセットアップするには、次の手順に従ってください。

1. [Java アプリケーションのトレース][6]に記載されている手順に従ってアプリケーションをインスツルメントします。
2. `native-image` コマンドでネイティブ実行可能ファイルをビルドする際に `-J-javaagent:/path/to/dd-java-agent.jar` 引数を追加します。たとえば、次のようになります。
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (オプション) 次の引数を追加してプロファイラーインテグレーションを有効にします: 
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`。
   - トレーサーのバージョンが `1.39.1` より前の場合は、生成されたネイティブ実行可能ファイルを実行する際に、`DD_PROFILING_START_FORCE_FIRST=true` を環境変数として設定してください。

[6]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
Quarkus Native を使用して Datadog Java SDK をセットアップするには、次の手順に従ってください。

1. [Java アプリケーションのトレース][6]に記載されている手順に従ってアプリケーションをインスツルメントします。
2. ネイティブ実行可能ファイルをビルドする際に `quarkus.native.additional-build-args` プロパティを使用します。たとえば、次のようになります。
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (オプション) 次の引数を追加してプロファイラーインテグレーションを有効にします: 
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`。
   - トレーサーのバージョンが `1.39.1` より前の場合は、生成されたネイティブ実行可能ファイルを実行する際に、`DD_PROFILING_START_FORCE_FIRST=true` を環境変数として設定してください。

[6]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
Spring Native を使用して Datadog Java SDK をセットアップするには、次の手順に従ってください。

1. [Java アプリケーションのトレース][6]に記載されている手順に従ってアプリケーションをインスツルメントします。
2. Buildpacks に基づく Spring Native ビルドの場合、`BP_DATADOG_ENABLED=true` を使用して [Datadog 用 Paketo Buildpack][8] を有効にします。
    - Maven などのビルドツールのレベルでこれを行うことができます。
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
   - または、`pack build` コマンドを `--env BP_DATADOG_ENABLED=true` オプションと共に使用して Datadog ビルドパックを有効にできます。
3. (オプション) プロファイラーインテグレーションを有効にするには環境変数 `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true --enable-monitoring=jfr’` を設定します。
   - トレーサーのバージョンが `1.39.1` より前の場合は、生成されたネイティブ実行可能ファイルを実行する際に、`DD_PROFILING_START_FORCE_FIRST=true` を環境変数として設定してください。

[6]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-info">GraalVM 25 では、 <code>Use of Unsafe</code> に関連するエラーが発生することがあります。これに対処するには、ネイティブ実行可能ファイルをビルドする際に  <code>-Dnet.bytebuddy.safe=false</code>  を追加します。</div>

#### 使用方法 {#usage-1}

セットアップが完了すると、Datadog にトレースが送信されるはずです。

[Trace Explorer][9] を使用してトレースを表示できます。

{{% collapse-content title="トラブルシューティング" level="h4" %}}
##### ネイティブイメージで機能が有効化されない、または正しく構成されない {#features-are-not-enabled-or-configured-correctly-for-native-images}

Graal Native Image を使用してビルドされたバイナリから実行時にシステムプロパティにアクセスする際に既知の問題があります。

- ランタイム構成で、システムプロパティ (`-Ddd.property.name=value`) の代わりに環境変数 (`DD_PROPERTY_NAME=value`) を使用します。
- このルールの例外は、プロファイラーを有効にする場合です。この場合は、_ビルド時_に `native-image` ツールに `-J-Ddd.profiling.enabled=true` を渡します。

##### ネイティブイメージビルドパックのバージョンが 5.12.2 未満の場合 {#native-image-buildpack-versions-older-than-5122}

ネイティブイメージビルドパックの古いバージョンでは、次のオプションを利用できます: `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`。

このオプションが `false` の場合、次のような例外が発生することがあります。

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError:
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException:
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap
as this class should be initialized at image runtime. To see how this object got
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

この問題に対する解決策は次の通りです。

- イメージの env の構成で、`USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` を明示的に true に設定します。
- または、`native-image` ビルドパックをバージョン 5.12.2 以降にアップグレードします。これを行う最良の方法は、`java-native-image` ビルドパックを 8.13.0 以降にアップグレードすることです。

##### Datadog 用 Paketo Buildpack のバージョンが 4.6.0 未満の場合 {#paketo-buildpack-for-datadog-versions-older-than-460}

Datadog 用 Paketo Buildpack の古いバージョンには、次のエラーメッセージが表示されるバグがありました。

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

この問題の解決策は、バージョン 4.6.0 以降にアップグレードすることです。

##### Spring Native のビルドが exec.d/toggle エラーでクラッシュする {#spring-native-build-crashes-with-execdtoggle-error}

Spring Boot ネイティブイメージをビルドする際には、ビルドパックのバージョンが 4.6.0 以降でも、上記と同様のエラーが発生することがあります。

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

その原因は、通常、Datadog ビルドパックがネイティブイメージビルドパックの前に実行されたために、ネイティブイメージビルドが意図されていることが認識されないことです。その結果、最終的なネイティブ実行可能ファイルと互換性のない、JVM ビルド用のトグルスクリプトが誤って追加されます。

解決策は、`spring-boot-maven-plugin` の構成で `BP_NATIVE_IMAGE` 環境変数を明示的に `true` に設定することです。これにより、すべてのビルドパックで、ネイティブイメージビルドであることが最初から認識されるようになります。

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
            <BP_NATIVE_IMAGE>true</BP_NATIVE_IMAGE>
            ...
          </env>
        </image>
      </configuration>
    </plugin>
  </plugins>
</build>
```

##### Datadog SDK のアクティブ化に関する問題 {#problem-activating-datadog-sdk}

トレーサーの構成が Unix ドメインソケット (UDS) に依存している場合、初期化エラーが発生する可能性があります。UDS は、ネイティブイメージではサポートされていません。

```text
dd.trace 2024-12-30 08:34:43:306 +0000] [main] WARN datadog.trace.agent.tooling.nativeimage.TracerActivation - Problem activating datadog tracer
java.lang.NoClassDefFoundError: Could not initialize class jnr.unixsocket.UnixSocketChannel
```

解決策は、ソケットベースの通信 (`socket` モード) ではなくホストベースの通信 (`hostip` モードまたは `service` モード) を使用するように Java トレーサーを構成することです。

詳細については、[APM と DogstatsD の通信モードの構成][11]を参照してください。Admission Controller に依存しないセットアップについては、[DD_TRACE_AGENT_URL][12] のドキュメントを参照してください。

{{% /collapse-content %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /ja/tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /ja/tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /ja/tracing/trace_explorer/
[10]: /ja/opentelemetry/interoperability/instrumentation_libraries/?tab=java
[11]: /ja/containers/cluster_agent/admission_controller/?tab=datadogoperator#configure-apm-and-dogstatsd-communication-mode
[12]: /ja/tracing/trace_collection/library_config/#agent
[13]: https://openjdk.org/jeps/472
[14]: https://openjdk.org/jeps/483
[15]: https://openjdk.org/jeps/514