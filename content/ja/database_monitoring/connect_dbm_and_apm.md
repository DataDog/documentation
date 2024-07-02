---
title: Correlate Database Monitoring and Traces
aliases:
- /database_monitoring/guide/connect_dbm_and_apm/
further_reading:
  - link: "https://www.datadoghq.com/blog/link-dbm-and-apm/"
    tag: Blog
    text: Seamlessly correlate DBM and APM telemetry to understand end-to-end query performance
---

このガイドは、[データベースモニタリング][1]を構成し、[APM][2] を使用していることを前提にしています。APM と DBM を接続すると、APM のトレース識別子が DBM のデータ収集に挿入され、これら 2 つのデータソースを相関させることができます。これにより、APM 製品ではデータベース情報を、DBM 製品では APM データを表示する製品機能が実現します。

## はじめに

対応データベース:
Postgres、MySQL、SQL Server、Oracle

サポート対象の Agent バージョン
: 7.46+

データプライバシー
: SQL コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がアクセスすることが可能になります。


APM トレーサーインテグレーションは、アプリケーションからデータベースに渡される情報量を制御する*伝搬モード*をサポートしています。

- `full` モードは完全なトレース情報をデータベースに送信し、DBM 内で個々のトレースを調査できるようにします。これはほとんどのインテグレーションで推奨されるソリューションです。
- `service` モードはサービス名を送信し、どのサービスがデータベース負荷に寄与しているかを把握できます。このモードは Oracle と SQL Server アプリケーションで唯一サポートされているモードです。
- `disabled` モードは伝搬を無効にし、アプリケーションからの情報を送信しません。

SQL Server と Oracle は、ステートメントキャッシュの動作により、完全なトレースコンテキストを含むとパフォーマンスの問題が発生する可能性があるため、`full` 伝搬モードをサポートしていません。

| DD_DBM_PROPAGATION_MODE | Postgres  |   MySQL     | SQL Server |  Oracle   |
|:------------------------|:---------:|:-----------:|:----------:|:---------:|
| `full`                  | {{< X >}} | {{< X >}} * |            |           |
| `service`               | {{< X >}} | {{< X >}}   | {{< X >}}  | {{< X >}} |

\* Full propagation mode on Aurora MySQL requires version 3.

**サポート対象のアプリケーショントレーサーとドライバー**

| 言語                                 | ライブラリまたはフレームワーク   | Postgres  |   MySQL   |     SQL Server      |       Oracle        |
|:-----------------------------------------|:-----------------------|:---------:|:---------:|:-------------------:|:-------------------:|
| **Go:** [dd-trace-go][3] >= 1.44.0       |                        |           |           |                     |                     |
|                                          | [database/sql][4]      | {{< X >}} | {{< X >}} | `service` モードのみ | `service` mode only |
|                                          | [sqlx][5]              | {{< X >}} | {{< X >}} | `service` モードのみ | `service` mode only |
| **Java** [dd-trace-java][23] >= 1.11.0   |                        |           |           |                     |                     |
|                                          | [jdbc][22]             | {{< X >}} | {{< X >}} | `service` モードのみ | `service` mode only |
| **Ruby:** [dd-trace-rb][6] >= 1.8.0      |                        |           |           |                     |                     |
|                                          | [pg][8]                | {{< X >}} |           |                     |                     |
|                                          | [mysql2][7]            |           | {{< X >}} |                     |                     |
| **Python:** [dd-trace-py][11] >= 1.9.0   |                        |           |           |                     |                     |
|                                          | [psycopg2][12]         | {{< X >}} |           |                     |                     |
|             [dd-trace-py][11] >= 2.9.0   |                        |           |           |                     |                     |
|                                          | [asyncpg][27]          | {{< X >}} |           |                     |                     |
|                                          | [aiomysql][28]         |           | {{< X >}} |                     |                     |
|                                          | [mysql-connector-python][29] |     | {{< X >}} |                     |                     |
|                                          | [mysqlclient][30]      |           | {{< X >}} |                     |                     |
|                                          | [pymysql][31]          |           | {{< X >}} |                     |                     |
| **.NET** [dd-trace-dotnet][15] >= 2.35.0 |                        |           |           |                     |                     |
|                                          | [Npgsql][16] *         | {{< X >}} |           |                     |                     |
|                                          | [MySql.Data][17] *     |           | {{< X >}} |                     |                     |
|                                          | [MySqlConnector][18] * |           | {{< X >}} |                     |                     |
|                                          | [ADO.NET][24] *        |           |           | `service` モードのみ |                     |
| **PHP**  [dd-trace-php][19] >= 0.86.0    |                        |           |           |                     |                     |
|                                          | [pdo][20]              | {{< X >}} | {{< X >}} |                     |                     |
|                                          | [MySQLi][21]           |           | {{< X >}} |                     |                     |
| **Node.js:** [dd-trace-js][9] >= 3.17.0  |                        |           |           |                     |                     |
|                                          | [postgres][10]         | {{< X >}} |           |                     |                     |
|                                          | [mysql][13]            |           | {{< X >}} |                     |                     |
|                                          | [mysql2][14]           |           | {{< X >}} |                     |                     |

\* [CommandType.StoredProcedure][25] はサポートされていません

## セットアップ
最高のユーザーエクスペリエンスを得るために、アプリケーションで以下の環境変数が設定されていることを確認してください。

```
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

{{< tabs >}}
{{% tab "Go" %}}

アプリの依存関係を更新して、[dd-trace-go@v1.44.0][1] 以上を含むようにします。
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.44.0
```

コードを更新して `contrib/database/sql` パッケージをインポートします。
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)
```

以下のいずれかの方法で、データベースモニタリングの伝搬機能を有効にします。
1. 環境変数:
   `DD_DBM_PROPAGATION_MODE=full`

2. ドライバー登録時にコードを使用する:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. `sqltrace.Open` のコードを使用する:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithServiceName("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
   if err != nil {
       log.Fatal(err)
   }
   ```

完全な例:
```go
import (
    "database/sql"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
    sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)

func main() {
    // まず、ドライバの登録時に dbm 伝搬モードを設定します。これは sqltrace.Open で行うこともでき、
    // この機能をより詳細に制御できることに注意してください。
    sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))

    // 続いて、Open へのコール。
    db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }

    // そして、データベース/SQL パッケージを通常通り、トレースしながら使い続けます。
    rows, err := db.Query("SELECT name FROM users WHERE age=?", 27)
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1

{{% /tab %}}

{{% tab "Java" %}}

[Java トレーシング][1]のインスツルメンテーションの説明に従い、Agent の `1.11.0` またはそれ以上のバージョンをインストールする必要があります。

また、`jdbc-datasource` [インスツルメンテーション][2]を有効にする必要があります。

以下の**いずれか**の方法で、データベースモニタリングの伝搬機能を有効にします。

- システムプロパティ `dd.dbm.propagation.mode=full` を設定する
- 環境変数 `DD_DBM_PROPAGATION_MODE=full` を設定する

完全な例:
```
# 必要なシステムプロパティでJava Agentを起動します
java -javaagent:/path/to/dd-java-agent.jar -Ddd.dbm.propagation.mode=full -Ddd.integration.jdbc-datasource.enabled=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
```

アプリケーションで機能をテストします。
```java
public class Application {
    public static void main(String[] args) {
        try {
            Connection connection = DriverManager
                    .getConnection("jdbc:postgresql://127.0.0.1/foobar?preferQueryMode=simple", "user", "password");
            Statement stmt = connection.createStatement();
            String sql = "SELECT * FROM foo";
            stmt.execute(sql);
            stmt.close();
            connection.close();
        } catch (SQLException exception) {
            //  例外ロジック
        }
    }
}
```

**注**: プリペアドステートメントは `full` モードではサポートされていません。プリペアドステートメントを使用するすべての JDBC API 呼び出しは自動的に `service` モードにダウングレードされます。ほとんどの Java SQL ライブラリはデフォルトでプリペアドステートメントを使用するため、**ほとんどの** Java アプリケーションは `service` モードしか使用できません。

[1]: /tracing/trace_collection/dd_libraries/java/
[2]: /tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Gemfile で [dd-trace-rb][1] をバージョン `1.8.0` 以降にインストールまたはアップデートします。

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

以下のいずれかの方法で、データベースモニタリングの伝搬機能を有効にします。
1. 環境変数:
   `DD_DBM_PROPAGATION_MODE=full`

2. オプション `comment_propagation` (デフォルト: `ENV['DD_DBM_PROPAGATION_MODE']`)、[mysql2][2] または [pg][3] 用:
   ```rb
    Datadog.configure do |c|
        c.tracing.instrument :mysql2, comment_propagation: 'full'
        c.tracing.instrument :pg, comment_propagation: 'full'
    end
   ```

完全な例:
```rb
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
    c.service = 'billing-api'
    c.env = 'production'
    c.version = '1.3-alpha'

    c.tracing.instrument :mysql2, comment_propagation: ENV['DD_DBM_PROPAGATION_MODE']
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT 1;")
```

[1]: https://github.com/dataDog/dd-trace-rb
[2]: /tracing/trace_collection/dd_libraries/ruby/#mysql2
[3]: /tracing/trace_collection/dd_libraries/ruby/#postgres

{{% /tab %}}

{{% tab "Python" %}}

アプリの依存関係を更新して、[dd-trace-py>=1.9.0][1] を含むようにします。
```
pip install "ddtrace>=1.9.0"
```

[psycopg2][2] をインストールします。
```
pip install psycopg2
```

以下の環境変数を設定して、データベースモニタリングの伝搬機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

完全な例:
```python

import psycopg2

POSTGRES_CONFIG = {
    "host": "127.0.0.1",
    "port": 5432,
    "user": "postgres_user",
    "password": "postgres_password",
    "dbname": "postgres_db_name",
}

# postgres db に接続する
conn = psycopg2.connect(**POSTGRES_CONFIG)
cursor = conn.cursor()
# sql クエリを実行する
cursor.execute("select 'blah'")
cursor.executemany("select %s", (("foo",), ("bar",)))
```

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-warning">
この機能を使用するには、.NET サービスの自動インスツルメンテーションが有効である必要があります。
</div>

[.NET Framework のトレース手順][1]または [.NET Core のトレース手順][2]に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。例えば、`Npgsql` などです。

以下の環境変数を設定して、データベースモニタリングの伝搬機能を有効にします。
   - Postgres および MySQL の場合: `DD_DBM_PROPAGATION_MODE=full`
   - SQL Server の場合: `DD_DBM_PROPAGATION_MODE=service`

[1]: /tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-warning">
この機能を使用するには、PHP サービスでトレーサー拡張機能が有効になっていることが必要です。
</div>

[PHP トレース手順][1]に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。例えば、`PDO` などです。

以下の環境変数を設定して、データベースモニタリングの伝搬機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

[dd-trace-js][1] を `3.17.0` (または Node.js 12 を使用している場合は `2.30.0`) 以上のバージョンにインストールまたは更新してください。

```
npm install dd-trace@^3.17.0
```

トレーサーをインポートして初期化するようにコードを更新してください。
```javascript
// の行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
const tracer = require('dd-trace').init();
```

以下のいずれかの方法で、データベースモニタリングの伝搬機能を有効にします。
* 以下の環境変数を設定します。
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* トレーサーが `dbmPropagationMode` オプションを使用するように設定します (デフォルト: `ENV['DD_DBM_PROPAGATION_MODE']`)。
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* Enable only at the integration level:
   ```javascript
   const tracer = require('dd-trace').init();
   tracer.use('pg', {
      dbmPropagationMode: 'full'
   })
   ```


完全な例:
```javascript
const pg = require('pg')
const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })

const client = new pg.Client({
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
})

client.connect(err => {
    console.error(err);
    process.exit(1);
});

client.query('SELECT $1::text as message', ['Hello world!'], (err, result) => {
    // 結果を処理します
})
```

[1]: https://github.com/DataDog/dd-trace-js

{{% /tab %}}

{{< /tabs >}}

## DBM で APM 接続を探る

### 呼び出した APM サービスにアクティブなデータベース接続を属性付けする

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="データベースへのアクティブな接続を、APM サービスごとに分類して表示します。">}}

特定のホストのアクティブな接続を、リクエストを行うアップストリーム APM サービス別に分解します。データベースの負荷を個々のサービスに属性付けして、どのサービスがデータベース上で最もアクティブかを理解できます。最もアクティブなアップストリームサービスのサービスページにピボットして、調査を続行します。

### データベースホストを呼び出す APM サービスによってフィルターにかける

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="データベースホストを呼び出す APM サービスによって、フィルターにかけます。">}}

データベースリストをすばやくフィルターして、特定の APM サービスが依存するデータベースホストのみを表示します。ダウンストリームの依存関係に、サービスのパフォーマンスに影響を与える可能性のあるブロックアクティビティがあるかどうかを簡単に識別できます。

### クエリサンプルの関連付けられたトレースを表示する

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="検査中のクエリーサンプルが生成されたサンプル APM トレースをプレビューします。">}}

Database Monitoring で Query Sample を表示するとき、関連付けられたトレースが APM によってサンプリングされている場合、DBM Sample を APM Trace のコンテキストで表示することができます。これにより、クエリの実行計画や過去のパフォーマンスを含む DBM テレメトリーと、インフラストラクチャー内のスパンの系統を組み合わせて、データベース上の変更がアプリケーションパフォーマンスの低下の原因になっているかどうかを理解することができます。

## APM で DBM 接続を探る

### APM サービスのダウンストリームデータベースホストの可視化

{{< img src="database_monitoring/dbm_apm_service_page_db_host_list.png" alt="サービスページから、APM サービスが依存するダウンストリームデータベースホストを視覚化します。">}}

On the APM page for a given service, view the direct downstream database dependencies of the service as identified by Database Monitoring. Quickly determine if any hosts have disproportionate load that may be caused by noisy neighbors. To view a service's page, click on the service in the [Service Catalog][26] to open a details panel, then click **View Service Page** in the panel.

### データベースクエリの実行計画をトレースで確認し、最適化の可能性を特定する

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="Identify inefficiencies using explain plans for database queries within traces.">}}

トレースで実行されたクエリと同様のクエリの履歴ビュー (サンプルの待機イベント、平均レイテンシー、最近キャプチャした実行計画など) を表示し、クエリがどのように実行されると予想されるかを説明します。動作が異常であるかどうかを判断し、データベースモニタリングにピボットして、基礎となるデータベースホストに関する追加のコンテキストを得ることで、調査を継続します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/#getting-started
[2]: /tracing/
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1
[4]: https://pkg.go.dev/database/sql
[5]: https://pkg.go.dev/github.com/jmoiron/sqlx
[6]: https://github.com/dataDog/dd-trace-rb
[7]: https://github.com/brianmario/mysql2
[8]: https://github.com/ged/ruby-pg
[9]: https://github.com/DataDog/dd-trace-js
[10]: https://node-postgres.com/
[11]: https://github.com/DataDog/dd-trace-py
[12]: https://www.psycopg.org/docs/index.html
[13]: https://github.com/mysqljs/mysql
[14]: https://github.com/sidorares/node-mysql2
[15]: https://github.com/DataDog/dd-trace-dotnet
[16]: https://www.nuget.org/packages/npgsql
[17]: https://www.nuget.org/packages/MySql.Data
[18]: https://www.nuget.org/packages/MySqlConnector
[19]: https://github.com/DataDog/dd-trace-php
[20]: https://www.php.net/manual/en/book.pdo.php
[21]: https://www.php.net/manual/en/book.mysqli.php
[22]: https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/
[23]: https://github.com/DataDog/dd-trace-java
[24]: https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/ado-net-overview
[25]: https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[...]%20should%20set
[26]: https://app.datadoghq.com/services
[27]: https://pypi.org/project/asyncpg/
[28]: https://pypi.org/project/aiomysql/
[29]: https://pypi.org/project/mysql-connector-python/
[30]: https://pypi.org/project/mysqlclient/
[31]: https://github.com/PyMySQL/PyMySQL
