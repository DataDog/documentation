---
title: Java 互換性要件
kind: ドキュメント
description: Java トレーサーの互換性要件
further_reading:
  - link: tracing/setup/java
    tag: Documentation
    text: アプリケーションのインスツルメンテーション
---
## 互換性

Java Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

Datadog は、Oracle JDK と OpenJDK の両方の Java JRE 1.7 以上を公式にサポートしています。Datadog は Java のアーリーアクセスバージョンを公式にサポートしていません。

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
| Grizzly                 | 2.0+       | [ベータ][2]       | `grizzly`                                      |
| Grizzly-HTTP            | 2.3.20+    | [ベータ][2]       | `grizzly-filterchain`                          |
| Java Servlet 互換 | 2.3+、3.0+ | 完全対応 | `servlet`、`servlet-2`、`servlet-3`            |
| Jax-RS アノテーション      | JSR311-API | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-annotations`、`jax-rs-filter` |
| Jetty (非 Servlet)     | 8+         | [ベータ][2]       | `jetty`、`jetty-8`                             |
| Netty HTTP サーバー       | 3.8+       | 完全対応 | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1` |
| Play                    | 2.3-2.8    | 完全対応 | `play`、`play-action`                          |
| Ratpack                 | 1.5+       | 完全対応 | `ratpack`                                      |
| Spark Java              | 2.3+       | [ベータ][2]       | `sparkjava` (要 `jetty`)                 |
| Spring Web (MVC)        | 4.0+       | 完全対応 | `spring-web`                                   |
| Spring WebFlux          | 5.0+       | 完全対応 | `spring-webflux`                               |

**注:** 多くのアプリケーションサーバーは Servlet 互換でそのインスツルメンテーションによって自動的にカバーされます (Tomcat、Jetty、Websphere、Weblogic、JBoss)。
また、Spring Boot のようなフレームワークは、通常サポートされた組み込みアプリケーションサーバーを使うため、本質的に機能します (Tomcat/Jetty/Netty)。

希望するウェブフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### ネットワーキングフレームワークの互換性

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

**ネットワーキングのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- リクエスト用のタグ (応答コードなど)
- エラーとスタックトレースの取得
- 分散型トレーシング


| フレームワーク                | バージョン    | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用) |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Apache HTTP クライアント       | 4.0+        | 完全対応 | `httpclient`、`apache-httpclient`、`apache-http-client` |
| Apache HTTP 非同期クライアント | 4.0+        | 完全対応 | `httpasyncclient`、`apache-httpasyncclient`    |
| AWS Java SDK             | 1.11+、2.2+ | 完全対応 | `aws-sdk`                                      |
| Commons HTTP クライアント      | 2.0+        | 完全対応 | `commons-http-client`                          |
| Google HTTP クライアント       | 1.19.0+     | 完全対応 | `google-http-client`                           |
| Grizzly HTTP クライアント      | 1.9+        | [ベータ][3]         | `grizzly-client`                               |
| gRPC                     | 1.5+        | 完全対応 | `grpc`、`grpc-client`、`grpc-server`           |
| HttpURLConnection        | すべて         | 完全対応 | `httpurlconnection`、`urlconnection`           |
| Kafka-Clients            | 0.11+       | 完全対応 | `kafka`                                        |
| Kafka-Streams            | 0.11+       | 完全対応 | `kafka`、`kafka-streams`                       |
| Java RMI                 | すべて         | 完全対応 | `rmi`、`rmi-client`、`rmi-server`              |
| Jax RS クライアント           | 2.0+        | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-client`             |
| Jersey クライアント            | 1.9+        | 完全対応 | `jax-rs`、`jaxrs`、`jax-rs-client`             |
| JMS                      | 1 と 2     | 完全対応 | `jms`、`jms-1`、`jms-2`                        |
| Netty HTTP クライアント        | 4.0+        | 完全対応 | `netty`、`netty-4.0`、`netty-4.1`              |
| Ning HTTP クライアント         | 1.9.0+      | [ベータ][3]         | `ning`                                         |
| OkHTTP                   | 2.2+        | 完全対応 | `okhttp`、`okhttp-2`、`okhttp-3`                |
| Play WSClient            | 1.0+        | 完全対応 | `play-ws`                                      |
| Rabbit AMQP              | 2.7+        | 完全対応 | `amqp`、`rabbitmq`                             |
| Spring SessionAwareMessageListener              | 3.1+        | 完全対応 | `spring-jms-3.1`                             |
| Spring WebClient         | 5.0+        | 完全対応 | `spring-webflux`、`spring-webflux-client`      |

**注**: Datadog's Kafka インテグレーションは、ヘッダー API をサポートする Kafka のバージョン `0.11+` で機能します。この API はトレースコンテキストの挿入と抽出に使用されます。バージョンが混在する環境でシステムを稼働させている場合は、Kafka ブローカーが Kafka のより新しいバージョンを間違って報告する場合があります。この場合、トレーサーがローカルのプロデューサーでサポートされていないヘッダーを挿入しようとしたときに問題が発生することがあります。また、古いバージョンのコンシューマーはヘッダーが存在するためにメッセージを収集することができません。これらの問題を回避するために、0.11 より前の Kafka のバージョンが混在している環境では、環境変数: `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false` を伴うコンテキストの伝搬を無効化するようにしてください。

希望するネットワーキングフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### データストアの互換性

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

| データベース                | バージョン | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用)                                           |
| ----------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------- |
| Couchbase               | 2.0+     | 完全対応 | `couchbase`                                                                              |
| Cassandra               | 3.X      | 完全対応 | `cassandra`                                                                              |
| Elasticsearch Transport | 2.0-6.x  | 完全対応 | `elasticsearch`、`elasticsearch-transport`、`elasticsearch-transport-{2,5,6}` (1 つ選択) |
| Elasticsearch Rest      | 5.0-6.x  | 完全対応 | `elasticsearch`、`elasticsearch-rest`、`elasticsearch-rest-5`、`elasticsearch-rest-6`    |
| JDBC                    | N/A      | 完全対応 | `jdbc`、`jdbc-datasource`                                                                |
| Jedis                   | 1.4+     | 完全対応 | `jedis`、`redis`                                                                         |
| Lettuce                 | 4.0+     | 完全対応 | `lettuce`、`lettuce-4-async`、`lettuce-5-rx`                                             |
| MongoDB                 | 3.0+     | 完全対応 | `mongo`                                                                                  |
| RediScala               | 1.5+     | 完全対応 | `rediscala`、`redis`                                                                     |
| SpyMemcached            | 2.12+    | 完全対応 | `spymemcached`                                                                           |

`dd-java-agent` は、次を含む一般的な JDBC ドライバーとも互換性があります:

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

希望するデータストアが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

### 他のフレームワークの互換性

`dd-java-agent` には、次の他のフレームワークの自動トレースのサポートが含まれます。

| フレームワーク         | バージョン | サポートの種類    | インスツルメンテーション名 (コンフィギュレーションに使用) |
| ----------------- | -------- | --------------- | ---------------------------------------------- |
| Dropwizard Views  | 0.7+     | 完全対応 | `dropwizard`、`dropwizard-view`                |
| Hibernate         | 3.5+     | 完全対応 | `hibernate`、`hibernate-core`                  |
| Hystrix           | 1.4+     | 完全対応 | `hystrix`                                      |
| JSP Rendering     | 2.3+     | 完全対応 | `jsp`、`jsp-render`、`jsp-compile`             |
| Slf4J MDC         | 1+       | 完全対応 | `mdc` (`dd.logs.injection` コンフィギュレーションも参照してください) |
| プロジェクトリアクタ   | 3.1+     | 完全対応 | `reactor-core`                                 |
| Spring Data       | 1.8+     | 完全対応 | `spring-data`                                  |
| Spring Scheduling | 3.1+     | 完全対応 | `spring-scheduling`                            |
| Twilio SDK        | 0+       | 完全対応 | `twilio-sdk`                                   |

希望するフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。フレームワークのリクエストは、[サポートチーム][2]までお気軽にお問い合わせください。

サポートされていないフレームワークを使ったアプリケーションの可視性を向上させるには、次のことを検討してください:

- [カスタムインスツルメンテーションの追加][4]。
- 将来のリリースに含めるためのインスツルメンテーションによる[プルリクエストの送信][5]。
- [Datadog サポート][2]へのお問い合わせと機能リクエストの提供。

### インテグレーションの無効化

大半のインテグレーションはデフォルトで有効になっています。次の設定により、デフォルトを無効に変更できます。

- システムプロパティ: `-Ddd.integrations.enabled=false`
- 環境変数: `DD_INTEGRATIONS_ENABLED=false`

インテグレーション箱別に有効または無効にできます (上記のデフォルトをオーバーライド)。

- システムプロパティ: `-Ddd.integration.<インテグレーション名>.enabled=true`
- 環境変数: `DD_INTEGRATION_<インテグレーション名>_ENABLED=true`

(各インテグレーションの名前については上記を参照してください。)


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: /ja/help/
[3]: http://bytebuddy.net
[4]: /ja/tracing/manual_instrumentation/java
[5]: https://github.com/DataDog/documentation#outside-contributors