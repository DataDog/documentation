---
aliases:
- /ja/security/application_security/threats/setup/compatibility/java
code_lang: java
code_lang_weight: 0
title: Java 互換性要件
type: multi-code-lang
---

## App and API Protection capabilities

指定した tracer バージョンの Java ライブラリでは、次の App and API Protection 機能を利用できます:

| App and API Protection 機能  | Java トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| API セキュリティ | 1.31.0 |
| Threat Protection| 1.9.0 |
| ブロックされたリクエストへの対応をカスタマイズする | 1.11.0 |
| ユーザーアクティビティイベントの自動追跡 | 1.20.0 |

Java でサポート対象の App and API Protection 機能をすべて使うには、最低でも tracer バージョン 1.31.0 が必要です。

**注**: Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

### サポートされるデプロイメントタイプ

Threat Detection は、次のデプロイメントタイプでサポートされています。

- Docker
- Kubernetes
- Amazon ECS
- AWS Fargate
- AWS Lambda
- Azure App Service

**注**: Azure App Service は **Web アプリケーションのみ**サポートされます。Azure Functions は App and API Protection のサポート対象外です。

## 言語とフレームワークの互換性

### サポートされている Java バージョン
Java トレーサーは、次の Oracle JDK および OpenJDK の JVM ランタイムの自動インスツルメンテーションをサポートします。

| JVM バージョン | オペレーティングシステム                                                               | サポートレベル                       | トレーサーバージョン |
| -------------| ------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8〜17      | Windows (x86-64)<br>Linux (glibc、musl) (arm64、x86-64)<br>MacOS (arm64、x86-64)               | サポート                | 最新         |


Datadog は、Java の早期アクセスバージョンを公式にサポートしていません。






### Web フレームワークの互換性

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング



| フレームワーク                  | バージョン   | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- |
| Grizzly                 | 2.0+       |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |
| gRPC                    | 1.5+       |  {{< X >}} | {{< tooltip text="N/A" tooltip="ブロッキングは gRPC ではまだ利用できません" >}} |
| Java Servlet | 2.3+、3.0+ |   {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |
| Spring Web (MVC)        | 4.0+       |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | 5.0+       |            |            |
| Tomcat                  | 5.5+       |   {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4+, 4+   |   {{< X >}} |  {{< X >}} |

**注:** 多くのアプリケーションサーバーは Servlet 互換でそのインスツルメンテーションによって自動的にカバーされます (Websphere、Weblogic、JBoss)。また、Spring Boot (バージョン 3) のようなフレームワークは、通常、Tomcat、Jetty、Netty など、サポートされた組み込みアプリケーションサーバーを使うため、本質的に機能します。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### ネットワーキングフレームワークの互換性

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

**ネットワーキングのトレーシングでは以下の確認が可能です**

- アプリケーションの分散型トレーシング
- リクエストベースのブロッキング

##### App and API Protection 機能に関する注意事項


| フレームワーク                | バージョン    | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Apache HTTP クライアント       | 4.0+        |  {{< X >}} |  |
| gRPC                     | 1.5+        |  {{< X >}} |  |
| HttpURLConnection        | すべて         |  {{< X >}} |  |
| Jax RS クライアント           | 2.0+        |  {{< X >}} |  {{< X >}} |
| Jersey サーバー            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |
| Netty HTTP サーバー        |  3.8+           |  {{< X >}} |    |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |
| Spring SessionAwareMessageListener     | 3.1+            |  {{< X >}} |  |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### App and API Protection 機能に関する注意事項

| データベース                | バージョン | Threat Detection のサポートの有無 |
| ----------------------- | -------- |  ------------------------|
| JDBC                    | N/A      |  {{< X >}} |
| Aerospike               | 4.0+     |  {{< X >}} |
| Couchbase               | 2.0+     |  {{< X >}} |
| MongoDB                 | 3.0-4.0+ |  {{< X >}} |

`dd-java-agent` は、次を含む一般的な Threat Detection のための JDBC ドライバーとも互換性があります:

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

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### User Authentication Frameworks の互換性

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーログインイベントのアカウント乗っ取り検出モニタリング

| フレームワーク         | フレームワークの最小バージョン |
|-------------------|---------------------------|
| Spring Security   | 5.5+                      |


[1]: /ja/tracing/trace_collection/compatibility/java/
[2]: /ja/tracing/guide/remote_config
[3]: /ja/security/code_security/software_composition_analysis/

これは 33 行目の新しいコンテンツ