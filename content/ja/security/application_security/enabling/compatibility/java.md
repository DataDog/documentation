---
code_lang: java
code_lang_weight: 0
kind: documentation
title: Java 互換性要件
type: multi-code-lang
---

## Application Security capabilities

The following application security capabilities are supported in the Java library, for the specified tracer version:

| Application Security capability  | Java トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| API Security | 1.31.0 |
| Threat Protection| 1.9.0 |
| ブロックされたリクエストへの対応をカスタマイズする | 1.11.0 |
| Software Composition Analysis (SCA) | 1.1.4 |
| Code Security  | 1.15.0|
| ユーザーアクティビティイベントの自動追跡 | 1.20.0 |

The minimum tracer version to get all supported application security capabilities for Java is 1.31.0.

**注**: Threat Protection を使用するには、[リモート構成][2]を有効にする必要があり、これはリストされている最小トレーサーバージョンに含まれています。

### サポートされるデプロイメントタイプ
| タイプ              | Threat Detection のサポート | Software Composition Analysis |
|-------------------|--------------------------|-------------------------------|
| Docker            | {{< X >}}                | {{< X >}}                     |
| Kubernetes        | {{< X >}}                | {{< X >}}                     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     |
| AWS Lambda        | {{< X >}}                |                               |
| Azure App Service | {{< X >}}                | {{< X >}}                     |

**Note**: Azure App Service is supported for **web applications only**. Application Security doesn't support Azure Functions.

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

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks
- If **Code Security** does not support your framework, it will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.



| フレームワーク                  | Versions   | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |Code Security? |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Grizzly                 | 2.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Glassfish               |            |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Java Servlet | 2.3+、3.0+ |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Jetty                   | 7.0-9.x, 10.x    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Boot             | 1.5        |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring Web (MVC)        | 4.0+       |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Spring WebFlux          | 5.0+       |            |            |  {{< X >}} |
| Tomcat                  | 5.5+       |   {{< X >}} |  {{< X >}} |  {{< X >}} |
| Vert.x                  | 3.4-3.9.x  |   {{< X >}} |  {{< X >}} |  {{< X >}} |

**注:** 多くのアプリケーションサーバーは Servlet 互換でそのインスツルメンテーションによって自動的にカバーされます (Websphere、Weblogic、JBoss)。また、Spring Boot (バージョン 3) のようなフレームワークは、通常、Tomcat、Jetty、Netty など、サポートされた組み込みアプリケーションサーバーを使うため、本質的に機能します。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### ネットワーキングフレームワークの互換性

`dd-java-agent` には、次のネットワーキングフレームワークの自動トレースのサポートが含まれます。

**ネットワーキングのトレーシングでは以下の確認が可能です**

- アプリケーションの分散型トレーシング
- リクエストベースのブロッキング

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks
- If **Code Security** does not support your framework, it will still detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.


| フレームワーク                | Versions    | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 | Code Security? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| Apache HTTP クライアント       | 4.0+        |  {{< X >}} |  |  |
| gRPC                     | 1.5+        |  {{< X >}} |  |  |
| HttpURLConnection        | すべて         |  {{< X >}} |  |  |
| Jax RS クライアント           | 2.0+        |  {{< X >}} |  {{< X >}} |  {{< X >}}  |
| Jersey サーバー            | 1.9-2.29    |  {{< X >}} |  {{< X >}} |  {{< X >}} |
| Netty HTTP サーバー        |  3.8+           |  {{< X >}} |    |  |
| RESTEasy                 |  3.0.x          |  {{< X >}} |    |  |
| Spring SessionAwareMessageListener     | 3.1+            |  {{< X >}} |  |  |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性

`dd-java-agent` には、次のデータベースフレームワーク/ドライバーの自動トレースのサポートが含まれます。

**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks
- **Threat Protection** は HTTP リクエスト (入力) レイヤーでも機能し、そのため下表に掲載されていないデータベースでもデフォルトで機能します。
- If your framework is not supported below, **Code Security** won’t detect SQL Injection vulnerabilities, but will still detect the rest of vulnerability types listed [here][3].

| データベース                | Versions | Threat Detection のサポートの有無 |  Code Security? |
| ----------------------- | -------- |  ------------------------| ---------------------------------------------------------------- |
| Aerospike               | 4.0+     |  {{< X >}} |   |
| Couchbase               | 2.0+     |  {{< X >}} |   |
| JDBC                    | N/A      |  {{< X >}} |   {{< X >}} |
| MongoDB                 | 3.0-4.0+ |  {{< X >}} |   |

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
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /ja/security/application_security/vulnerability_management/#manage-code-level-vulnerabilities