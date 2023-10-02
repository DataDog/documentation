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
kind: documentation
title: Java 互換性要件
type: multi-code-lang
---

## 互換性

Java Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

### サポートされている Java ランタイム

Java トレーサーは、次の Oracle JDK および OpenJDK の JVM ランタイムの自動インスツルメンテーションをサポートします。

| Java バージョン | オペレーティングシステム                                                               | サポートレベル                       | トレーサーバージョン |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 18〜19     | Windows (x86、x86-64)<br>Linux (x86、x86-64、arm64)<br>Mac (x86、x86-64、arm64) | [ベータ版](#levels-of-support)               | 最新         |
| 8〜17      | Linux (arm64)<br>Mac (arm64)                                                    | [ベータ版](#levels-of-support)               | 最新         |
| 7            | Linux (arm64)<br>Mac (arm64)                                                    | [サポート終了](#levels-of-support)         | v0             |
| 8〜17      | Windows (x86、x86-64)<br>Linux (x86、x86-64)<br>Mac (x86、x86-64)               | [GA](#levels-of-support)                   | 最新         |
| 7            | Windows (x86、x86-64)<br>Linux (x86、x86-64)<br>Mac (x86、x86-64)               | [メンテナンス](#levels-of-support) | v0             |

Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。

### サポートレベル

| **レベル**                                              | **サポート内容**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">非対応</span>      |  実装していません。特別なご要望は [Datadog サポート][2]にお問い合わせください。                                                                              |
| <span id="support-beta">ベータ版</span>                    |  初期実装です。まだすべての機能が含まれていない可能性があります。新機能のサポート、バグやセキュリティの修正は、ベストエフォートで提供されます。 |
| <span id="support-ga">一般提供 (GA)</span> |  全機能の完全実装。新機能、バグやセキュリティの修正を完全サポート。                                                     |
| <span id="support-maintenance">メンテナンス</span>      |  既存機能の完全実装。新機能は受けません。バグフィックス、セキュリティフィックスのみの対応となります。                                  |
| <span id="support-eol">サポート終了 (EOL)</span>        |  サポートはありません。                                                                                                                                        |

## インテグレーション

ベータインテグレーションはデフォルトで無効になっていますが、個別に有効にできます。

- システムプロパティ: `-Ddd.integration.<インテグレーション名>.enabled=true`
- 環境変数: `DD_INTEGRATION_<インテグレーション名>_ENABLED=true`

### Web フレームワークの互換性

`dd-java-agent` には、次のウェブフレームワークの自動トレースのサポートが含まれます。

**Web フレームワークのトレーシングでは以下の確認が可能です。**

- HTTP リクエストの応答タイミング
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- エラーとスタックトレースの取得
- Web リクエストと分散型トレーシングの間で作成された作業のリンク

| サーバー                  | バージョン   | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用) |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- |
| Akka-Http サーバー        | 10.0+      | 完全対応 | `akka-http`、`akka-http-server`                |
| Finatra Web             | 2.9+       | 完全対応 | `finatra`                                      |
| Grizzly                 | 2.0+       | 完全対応 | `grizzly`                                      |
| Grizzly-HTTP            | 2.3.20+    | 完全対応 | `grizzly-filterchain`                          |
| Java Servlet 互換 | 2.3+、3.0+ | 完全対応 | `servlet`、`servlet-2`、`servlet-3`            |
| Jax-RS アノテーション      | JSR311-API | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-annotations`、`jax-rs-filter` |
| Jetty                   | 7.0-12.x   | 完全対応 | `jetty`                                        |
| Micronaut HTTP サーバー   | 2.x        | 完全対応 | `micronaut`                                    |
| Mulesoft                | 4          | 完全対応 | `mule`                                         |
| Netty HTTP サーバー       | 3.8+       | 完全対応 | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1` |
| Play                    | 2.3-2.8    | 完全対応 | `play`、`play-action`                          |
| Ratpack                 | 1.5+       | 完全対応 | `ratpack`                                      |
| Restlet HTTP サーバー     | 2.2 - 2.4  | 完全対応 | `restlet-http`.                                |
| Spark Java              | 2.3+       | [ベータ版](#framework-integrations-disabled-by-default) | `sparkjava` (要 `jetty`) |
| Spring Boot             | 1.5        | 完全対応 | `spring-web` または `spring-webflux`               |
| Spring Web (MVC)        | 4.0+       | 完全対応 | `spring-web`                                   |
| Spring WebFlux          | 5.0+       | 完全対応 | `spring-webflux`                               |
| Tomcat                  | 5.5+       | 完全対応 | `tomcat`                                       |
| Vert.x                  | 3.4-3.9.x  | 完全対応 | `vertx`、`vertx-3.4`                           |

**注:** 多くのアプリケーションサーバーは Servlet 互換でそのインスツルメンテーションによって自動的にカバーされます (Websphere、Weblogic、JBoss)。
また、Spring Boot (バージョン 3) のようなフレームワークは、通常、Tomcat、Jetty、Netty など、サポートされた組み込みアプリケーションサーバーを使うため、本質的に機能します。

### フレームワークインテグレーションがデフォルトで無効

以下のインスツルメンテーションはデフォルトでは無効になっており、以下の設定により有効にすることができます。

| インスツルメンテーション         | 有効にするには                                     |
| ----------------------- |---------------------------------------------- |
| JAX-WS                      | `-Ddd.integration.jax-ws.enabled=true`|
| Mulesoft                  | `-Ddd.integration.mule.enabled=true`, `-Ddd.integration.grizzly-client.enabled=true`, `-Ddd.integration.grizzly-filterchain.enabled=true`|
| Grizzly                 | `-Ddd.integration.grizzly-client.enabled=true`|
| Grizzly-HTTP            | `-Ddd.integration.grizzly-filterchain.enabled=true`|
| Ning                    | `-Ddd.integration.ning.enabled=true`|
| Spark Java              | `-Ddd.integration.sparkjava.enabled=true`|

**注**: JAX-WS インテグレーションは、@WebService (JAX-WS 1.x) および @WebServiceProvider (JAX-WS 2.x) でアノテーションされたエンドポイントを使用します。

希望する Web フレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### ネットワーキングフレームワークの互換性

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

**ネットワーキングのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- リクエスト用のタグ (応答コードなど)
- エラーとスタックトレースの取得
- 分散型トレーシング

| フレームワーク                | バージョン    | サポートの種類    | インスツルメンテーション名 (構成に使用) |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Apache HTTP クライアント       | 4.0+        | 完全対応 | `httpclient`、`apache-httpclient`、`apache-http-client` |
| Apache HTTP 非同期クライアント | 4.0+        | 完全対応 | `httpasyncclient`、`apache-httpasyncclient`    |
| AWS Java SDK             | 1.11+、2.2+ | 完全対応 | `aws-sdk`                                      |
| Camel-OpenTelemetry      | 3.12.0+     | ベータ            | [opentelemetry-1][5]                           |
| Commons HTTP クライアント      | 2.0+        | 完全対応 | `commons-http-client`                          |
| Google HTTP クライアント       | 1.19.0+     | 完全対応 | `google-http-client`                           |
| Grizzly HTTP クライアント      | 1.9+        | [ベータ版](#framework-integrations-disabled-by-default) | `grizzly-client`     |
| gRPC                     | 1.5+        | 完全対応 | `grpc`、`grpc-client`、`grpc-server`           |
| HttpURLConnection        | すべて         | 完全対応 | `httpurlconnection`、`urlconnection`           |
| Kafka-Clients            | 0.11+       | 完全対応 | `kafka`                                        |
| Kafka-Streams            | 0.11+       | 完全対応 | `kafka`、`kafka-streams`                       |
| Java RMI                 | すべて         | 分散型トレーシング非対応 | `rmi`、`rmi-client`、`rmi-server`              |
| Jax RS クライアント           | 2.0+        | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-client`             |
| Jersey クライアント            | 1.9-2.29    | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-client`             |
| JMS                      | 1 と 2     | 完全対応 | `jms`、`jms-1`、`jms-2`                        |
| Netty HTTP クライアント        | 4.0+        | 完全対応 | `netty`、`netty-4.0`、`netty-4.1`              |
| Ning HTTP クライアント         | 1.9.0+      | [ベータ版](#framework-integrations-disabled-by-default) | `ning`               |
| OkHTTP                   | 2.2+        | 完全対応 | `okhttp`、`okhttp-2`、`okhttp-3`                |
| Play WSClient            | 1.0+        | 完全対応 | `play-ws`                                      |
| Rabbit AMQP              | 2.7+        | 完全対応 | `amqp`、`rabbitmq`                             |
| Spring SessionAwareMessageListener     | 3.1+            | 完全対応 | `spring-jms-3.1`             |
| Spring WebClient         | 5.0+        | 完全対応 | `spring-webflux`、`spring-webflux-client`      |

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

| データベース                | バージョン | サポートの種類    | インスツルメンテーション名 (構成に使用)                                           |
| ----------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| Aerospike               | 4.0+     | 完全対応 | `aerospike`                                                                              |
| Couchbase               | 2.0+     | 完全対応 | `couchbase`                                                                              |
| Cassandra               | 3.0+     | 完全対応 | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0+     | 完全対応 | `elasticsearch`、`elasticsearch-transport`、`elasticsearch-transport-{2,5,6,7}` (1 つ選択)|
| Elasticsearch Rest      | 5.0+     | 完全対応 | `elasticsearch`、`elasticsearch-rest`、`elasticsearch-rest-{5,6,7}` (1 つ選択)           |
| JDBC                    | N/A      | 完全対応 | `jdbc`、`jdbc-datasource`                                                                |
| Jedis                   | 1.4+     | 完全対応 | `jedis`、`redis`                                                                         |
| Lettuce                 | 4.0+     | 完全対応 | `lettuce`、`lettuce-4-async`、`lettuce-5-rx`                                             |
| MongoDB                 | 3.0-4.0+ | 完全対応 | `mongo`                                                                                  |
| OpenSearch Rest         | 1.x-2.x  | 完全対応 | `opensearch`、`opensearch-rest`           |
| OpenSearch Transport    | 1.0+     | 完全対応 | `opensearch`、`opensearch-transport`                                                     |
| RediScala | 1.5+     | 完全対応 | `rediscala`、`redis`                                                                     |
| Redisson | 2.x-3.x      | 完全対応 | `redisson`、`redis`                                                                     |
| SpyMemcached            | 2.12+    | 完全対応 | `spymemcached`                                                                           |
| Vert.x Cassandra クライアント | 3.9      | 完全対応 | `cassandra`                                                                              |
| Vert.x Redis クライアント     | 3.9      | 完全対応 | `vertx-redis-client`                                                                     |
| Vert.x MySQL クライアント     | 3.9      | 完全対応 | `vertx-sql-client`                                                                       |

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

| インスツルメンテーション         | 有効にするには                                     |
| ----------------------- |---------------------------------------------- |
| JDBC-Datasource         | `-Ddd.integration.jdbc-datasource.enabled=true` |

希望するデータストアが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### フレームワーク互換性の追加

`dd-java-agent` には、次のフレームワークの自動トレースのサポートが含まれます。

| フレームワーク         | バージョン | サポートの種類    | インスツルメンテーション名 (構成に使用) |
| ----------------- | -------- | --------------- | ---------------------------------------------- |
| Datanucleus JDO   | 4.0+     | 完全対応 | `datanucleus`                                  |
| Dropwizard Views  | 0.7+     | 完全対応 | `dropwizard`、`dropwizard-view`                |
| GraphQL         | 14.0+     | 完全対応 | `graphql-java`                  |
| Hibernate         | 3.5+     | 完全対応 | `hibernate`、`hibernate-core`                  |
| Hystrix           | 1.4+     | 完全対応 | `hystrix`                                      |
| JSP Rendering     | 2.3+     | 完全対応 | `jsp`、`jsp-render`、`jsp-compile`             |
| JUnit             | 4.1+、5.3+ | 完全対応 | `junit`、`junit-4`、`junit-5`                 |       
| プロジェクトリアクタ   | 3.1+     | 完全対応 | `reactor-core`                                 |
| Quartz            | 2.x      | 完全対応 | `quartz`                                       |
| RxJava            | 2.x      | 完全対応 | `rxjava`                                       |
| Spring Data       | 1.8+     | 完全対応 | `spring-data`                                  |
| Spring Scheduling | 3.1+     | 完全対応 | `spring-scheduling`                            |
| Twilio SDK        | < 8.0    | 完全対応 | `twilio-sdk`                                   |

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

Bitbucket での Java トレーサーの実行はサポートされていません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /ja/tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /ja/tracing/trace_collection/otel_instrumentation/java/