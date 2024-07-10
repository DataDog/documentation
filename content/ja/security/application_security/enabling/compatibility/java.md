---
code_lang: java
code_lang_weight: 0
title: Java 互換性要件
type: multi-code-lang
---

## ASM の機能

Java ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | Java トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.8.0  |
| Threat Protection| 1.9.0 |
| オープンソースソフトウェア (OSS) の脆弱性管理 | 1.1.4 |
| コードレベルの脆弱性管理 (ベータ版) | 1.15.0|

Java でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 1.15.0 です。

**注**: Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

### サポートされるデプロイメントタイプ
|タイプ           | Threat Detection のサポート |  OSS の脆弱性管理のサポート |
| ---           |   ---             |           ----            |
| Docker        | {{< X >}}         | {{< X >}}                 |
| Kubernetes    | {{< X >}}         | {{< X >}}                 | 
| AWS ECS       | {{< X >}}         | {{< X >}}                 |
| AWS Fargate   | {{< X >}}         | {{< X >}}                 |
| AWS Lambda    | {{< X >}}         |                           |   
| Azure App Service | {{< X >}}     | {{< X >}}                 |

**注**: Azure App Service は **Web アプリケーションでのみ**サポートされています。ASM は Azure Functions をサポートしていません。

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

##### ASM の機能に関する備考
- **Vulnerability Management for OSS** はすべてのフレームワークでサポートされています
- **Vulnerability Management for Code-level** がご利用のフレームワークをサポートしていない場合でも、Weak Cipher、Weak Hashing、Insecure Cookie、Cookie without HttpOnly Flag、Cookie without SameSite Flag の脆弱性は検知します。



| フレームワーク                  | バージョン   | Threat Detection のサポートの有無 | Threat Detection のサポートの有無 | Vulnerability Management for Code-level のサポートの有無 |
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

- アプリケーションの分散トレーシング
- リクエストベースのブロッキング

##### ASM の機能に関する備考
- **Vulnerability Management for OSS** はすべてのフレームワークでサポートされています
- **Vulnerability Management for Code-level** がご利用のフレームワークをサポートしていない場合でも、Weak Cipher、Weak Hashing、Insecure Cookie、Cookie without HttpOnly Flag、Cookie without SameSite Flag の脆弱性は検知されます。


| フレームワーク                | バージョン    | Threat Detection のサポートの有無 | Threat Detection のサポートの有無 | Vulnerability Management for Code-level のサポートの有無 |
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

##### ASM の機能に関する備考
- **Vulnerability Management for OSS** はすべてのフレームワークでサポートされています
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。
- ご利用のフレームワークが下記でサポートされていない場合、**Vulnerability Management for Code-level** は SQL インジェクションの脆弱性を検知しませんが、[こちら][3]に挙げられている残りの脆弱性タイプは依然として検知します。

| データベース                | バージョン | Threat Detection のサポートの有無 |  Vulnerability Management for Code-level のサポートの有無 |
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


[1]: /ja/tracing/trace_collection/compatibility/java/
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: security/application_security/vulnerability_management/#detect-custom-code-vulnerabilities