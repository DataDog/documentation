---
aliases:
- /ja/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: ブログ
  text: DBM と APM のテレメトリを相関させて、エンドツーエンドのクエリパフォーマンスを把握できます。
title: Database Monitoring とトレースの相関付け
---
このガイドでは、[Database Monitoring][1] を構成し、[APM][2] を使用していることを前提にしています。APM と DBM を接続すると、APM トレース識別子が DBM データ収集に挿入され、これら二つのデータソースの相関が可能になります。これにより、APM 製品でデータベース情報を表示し、DBM 製品で APM データを表示する機能が有効になります。

## はじめに {#before-you-begin}

対応データベース
: Postgres, MySQL, SQL Server, Oracle, MongoDB

サポートされている Agent バージョン
: 7.46+

データプライバシー
: SQL コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がそのデータにアクセスできるようになります。


Datadog SDK インテグレーションは、*伝播モード*をサポートしており、アプリケーションからデータベースに渡される情報量を制御します。

| 伝播モード | 説明 |
|:-----------------|:------------|
| `full` | データベースに完全なトレース情報を送信し、DBM 内で個々のトレースを調査できるようにします。これは、ほとんどのインテグレーションに推奨されるソリューションです。|
| `service` | サービス名を送信し、どのサービスがデータベースの負荷に寄与しているかを理解できるようにします。|
| `disabled` | 伝播を無効にし、アプリケーションからの情報を送信しません。|


**対応データベース**

{{< tabs >}}
{{% tab "Postgres" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [Npgsql](https://www.nuget.org/packages/npgsql) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [postgres](https://node-postgres.com/) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 1.9.0 | [psycopg2](https://www.psycopg.org/docs/index.html)<br>[psycopg](https://www.psycopg.org/psycopg3/) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [asyncpg](https://pypi.org/project/asyncpg/) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [pg](https://github.com/ged/ruby-pg) | `full`<br>`service` |

**注意**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) は .NET ドライバーではサポートされていません。

{{% /tab %}}

{{% tab "MySQL" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [MySql.Data](https://www.nuget.org/packages/MySql.Data)<br>[MySqlConnector](https://www.nuget.org/packages/MySqlConnector) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [mysql](https://github.com/mysqljs/mysql)<br>[mysql2](https://github.com/sidorares/node-mysql2) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php)<br>[MySQLi](https://www.php.net/manual/en/book.mysqli.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [aiomysql](https://pypi.org/project/aiomysql/)<br>[mysql-connector-python](https://pypi.org/project/mysql-connector-python/)<br>[mysqlclient](https://pypi.org/project/mysqlclient/)<br>[pymysql](https://github.com/PyMySQL/PyMySQL) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [mysql2](https://github.com/brianmario/mysql2) | `full`<br>`service` |

**注意：**[CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) は .NET ドライバーではサポートされていません。

**注意：**Aurora MySQL の完全伝播モードにはバージョン 3 が必要です。

{{% /tab %}}

{{% tab "SQL Server" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [System.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server)<br>[Microsoft.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace) | `full`<br>`service` |

**注意：**[CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) は .NET ドライバーではサポートされていません。

Java と .NET の `full` モードの場合:

<div class="alert alert-danger">アプリケーションが使用している場合、 <code>context_info</code> インスツルメンテーションのために、Datadog SDK が上書きします。</div>

- インスツルメンテーションは、クライアントがクエリを発行する際に `SET context_info` コマンドを実行し、これによりデータベースとの追加のラウンドトリップが発生します。
- 前提条件:
  - エージェントバージョン 7.55.0 以降
  - Java トレーサーバージョン 1.39.0 以降
  - .NET トレーサーバージョン 3.3 以降

{{% /tab %}}

{{% tab "Oracle" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |

Java の `full` モードの場合:
- インスツルメンテーションは `V$SESSION.ACTION` を上書きします。
- 必要条件: Java トレーサー 1.45 以上

{{% /tab %}}

{{% tab "MongoDB" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.58.0 | [mongo-java-driver](https://www.mongodb.com/docs/drivers/java/sync/current/) v3.8+ | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 5.80.0 | [mongodb](https://github.com/mongodb/node-mongodb-native) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 3.5.0 | [pymongo](https://pymongo.readthedocs.io/en/stable/) | `full`<br>`service` |

{{% /tab %}}

{{< /tabs >}}

## セットアップ {#setup}
アプリケーションに以下の環境変数を設定します:

```shell
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

これらのタグは、APM 相関ビューおよび DBM アクティブ接続の内訳でサービスを識別します。

Datadog は、エージェントバージョン `7.63` 以上の obfuscation モードを `obfuscate_and_normalize` に設定することを推奨します。APM エージェントの設定ファイルの `apm_config` セクションに以下のパラメータを追加します:

```yaml
  sql_obfuscation_mode: "obfuscate_and_normalize"
```

<div class="alert alert-warning">obfuscation モードを変更すると、正規化された SQL テキストが変更される可能性があります。APM トレース内の SQL テキストに基づくモニターがある場合は、それらを更新する必要があるかもしれません。</div>

{{< tabs >}}
{{% tab "Go" %}}

アプリの依存関係を更新して、[dd-trace-go v2][1] を含むようにします。{{% tracing-go-v2 %}}

```shell
go get github.com/DataDog/dd-trace-go/v2 # 2.x
```

コードを更新して `contrib/database/sql` パッケージをインポートします：

```go
import (
   "database/sql"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)
```

以下のいずれかの方法で、データベースモニタリングの伝播機能を有効にします。
- 環境変数：
   `DD_DBM_PROPAGATION_MODE=full`

- ドライバー登録時にコードを使用する：
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithService("my-db-service"))
   ```

- でコードを使用する：`sqltrace.Open`
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithService("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
   if err != nil {
	   log.Fatal(err)
   }
   ```

完全な例:

```go
import (
	"database/sql"
	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)

func main() {
	// The first step is to set the dbm propagation mode when registering the driver. Note that this can also
	// be done on sqltrace.Open for more granular control over the feature.
	sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))

	// Followed by a call to Open.
	db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

	// Then, we continue using the database/sql package as we normally would, with tracing.
	rows, err := db.Query("SELECT name FROM users WHERE age=?", 27)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
}
```

[1]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2

{{% /tab %}}

{{% tab "Java" %}}

[Java トレーシング][1]のインスツルメンテーションの説明に従い、エージェントの `1.11.0` バージョンまたはそれ以上をインストールします：

`jdbc-datasource`の [インスツルメンテーション][2] も有効にする必要があります：

以下の **いずれか**の方法で、DBM の伝播機能を有効にします：

- システムプロパティ `dd.dbm.propagation.mode=full` を設定します：
- 環境変数 `DD_DBM_PROPAGATION_MODE=full` を設定します：

完全な例:

```shell
# Start the Java Agent with the required system properties
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
            //  exception logic
        }
    }
}
```

**トレーサーバージョン 1.44 以上**：
Postgres でのプリペアドステートメントのトレースを有効にするには、以下の **いずれか**の方法を使用してください：
- システムプロパティ `dd.dbm.trace_prepared_statements=true` を設定します：
- 環境変数 `export DD_DBM_TRACE_PREPARED_STATEMENTS=true` を設定します：

**注意**：プリペアドステートメントのインスツルメンテーションは、`Application` プロパティをテキスト `_DD_overwritten_by_tracer` で上書きし、データベースへの追加のラウンドトリップを引き起こします。この追加のラウンドトリップは、SQL ステートメントの実行時間に最小限の影響を与えます。

<div class="alert alert-danger">準備されたステートメントのトレースを有効にすると、Amazon RDS Proxyを使用する際にコネクションのピン留めが増加し、コネクションプールの効率が低下する可能性があります。詳細については、<a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html">RDS Proxyのコネクションピン留め</a>を参照してください。</div>

**トレーサーのバージョンが1.44未満**：
PostgresおよびMySQLの`full`モードではプリペアドステートメントはサポートされておらず、プリペアドステートメントを使用するすべてのJDBC API呼び出しは自動的に`service`モードにダウングレードされます。ほとんどのJava SQLライブラリはデフォルトでプリペアドステートメントを使用するため、これは**ほとんど**のJavaアプリケーションが`service`モードのみを使用できることを意味します。

[1]: /ja/tracing/trace_collection/dd_libraries/java/
[2]: /ja/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Gemfileで[dd-trace-rb][1]をバージョン`1.8.0`以上にインストールまたは更新します：

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

以下のいずれかの方法で、データベースモニタリングの伝播機能を有効にします。
1. 環境変数：
   `DD_DBM_PROPAGATION_MODE=full`

2. オプション`comment_propagation`（デフォルト：`ENV['DD_DBM_PROPAGATION_MODE']`）、[mysql2][2]または[pg][3]の場合：
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
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#mysql2
[3]: /ja/tracing/trace_collection/dd_libraries/ruby/#postgres

{{% /tab %}}

{{% tab "Python " %}}

アプリの依存関係を更新して、[dd-trace-py>=1.9.0][1] を含むようにします。

```
pip install "ddtrace>=1.9.0"
```

Postgresの場合、[psycopg2][2]をインストールします：

```
pip install psycopg2
```

MongoDBの場合、pymongoをインストールします：

```
pip install pymongo
```

**注意**：MongoDBのサポートには`dd-trace-py` >= 3.5.0が必要です。アップグレードが必要な場合：`pip install "ddtrace>=3.5.0"`。

以下の環境変数を設定して、データベースモニタリングの伝播機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

Postgresの例：

```python
import psycopg2

POSTGRES_CONFIG = {
    "host": "127.0.0.1",
    "port": 5432,
    "user": "postgres_user",
    "password": "postgres_password",
    "dbname": "postgres_db_name",
}

# connect to postgres db
conn = psycopg2.connect(**POSTGRES_CONFIG)
cursor = conn.cursor()
# execute sql queries
cursor.execute("select 'blah'")
cursor.executemany("select %s", (("foo",), ("bar",)))
```

MongoDBの例：

```python
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['test_database']
collection = db['test_collection']

# Insert a document
collection.insert_one({"name": "test", "value": 1})

# Query documents
results = collection.find({"name": "test"})
for doc in results:
    print(doc)
```

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">
この機能を使用するには、.NETサービスの自動インスツルメンテーションが有効である必要があります。
</div>

[.NET Framework のトレース手順][1]または [.NET Core のトレース手順][2]に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。たとえば、 `Npgsql`。

以下の環境変数を設定して、データベースモニタリングの伝播機能を有効にします。
   - PostgresおよびMySQLの場合：`DD_DBM_PROPAGATION_MODE=full`
   - SQL Serverの場合：`DD_DBM_PROPAGATION_MODE=service`または`DD_DBM_PROPAGATION_MODE=full`でJavaおよび.NETトレーサーを使用
   - Oracleの場合：`DD_DBM_PROPAGATION_MODE=service`

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
この機能を使用するには、PHPサービスのトレーサー拡張が有効である必要があります。
</div>

[PHP トレース手順][1]に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。たとえば、 `PDO`。

以下の環境変数を設定して、データベースモニタリングの伝播機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

[dd-trace-js][1]を`3.17.0`より大きいバージョンにインストールまたは更新します（または、エンドオブライフのNode.jsバージョン12を使用している場合は`2.30.0`）：

```shell
npm install dd-trace@^3.17.0
```

トレーサーをインポートして初期化するようにコードを更新してください。

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

以下のいずれかの方法で、データベースモニタリングの伝播機能を有効にします。
* 以下の環境変数を設定します：
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* SDK を `dbmPropagationMode` オプション (デフォルト: `ENV['DD_DBM_PROPAGATION_MODE']`) に設定します。
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* インテグレーションレベルでのみ有効にします。
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
	// handle result
})
```

[1]: https://github.com/DataDog/dd-trace-js

{{% /tab %}}

{{< /tabs >}}

有効にした後に伝播を無効にするには、`DD_DBM_PROPAGATION_MODE=disabled` を設定します。

## インテグレーション {#verify-the-integration} を確認します。

インテグレーションが機能していることを確認するには:
1. インスツルメンテーションされたアプリケーションを実行し、データベースクエリを実行します。
1. Datadog で、[**DBM > クエリサンプル**][37] に移動します。
1. クエリサンプルに **APM** 相関バッジが表示されることを確認します。

## DBM で APM コネクションを探る {#explore-the-apm-connection-in-dbm}

### 呼び出した APM サービスにアクティブなデータベースコネクションを属性付けする {#attribute-active-database-connections-to-the-calling-apm-services}

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="データベースへのアクティブなコネクションを、それらが発生した APM サービスごとに分解して表示します。">}}

特定のホストのアクティブなコネクションを、リクエストを行っている上流の APM サービスごとに分解します。データベースへの負荷を個々のサービスに属性付けして、どのサービスがデータベースで最もアクティブであるかを理解できます。最もアクティブな上流サービスのサービスページに移動して、調査を続けます。

### 呼び出す APM サービスによってデータベースホストをフィルターにかける {#filter-your-database-hosts-by-the-apm-services-that-call-them}

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="呼び出す APM サービスによってデータベースホストをフィルターにかけます。">}}

データベースリストをフィルターにかけて、特定の APM サービスが依存しているデータベースホストのみを表示します。下流の依存関係にサービスパフォーマンスに影響を与える可能性のあるブロッキングアクティビティがあるかどうかを特定します。

### クエリサンプルの関連付けられたトレースを表示する {#view-the-associated-trace-for-a-query-sample}

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="検査中のクエリサンプルから生成されたサンプリングされた APM トレースをプレビューします。">}}

DBMで[クエリサンプル][37]を表示する際、関連するトレースがAPMによってサンプリングされている場合、APMトレースのコンテキストでDBMサンプルを表示できます。これにより、クエリの実行計画や過去のパフォーマンスを含むDBMテレメトリを、インフラストラクチャー内のスパンの系譜と組み合わせて、データベースの変更がアプリケーションのパフォーマンス低下の原因であるかどうかを理解できます。

## APMでDBMコネクションを探る{#explore-the-dbm-connection-in-apm}

### APMサービスのダウンストリームデータベースホストの可視化{#visualize-the-downstream-database-hosts-of-apm-services}

特定のサービスのAPMページで、DBMによって特定されたサービスの直接的なダウンストリームデータベース依存を表示し、ノイズの多いネイバーが原因で負荷が不均衡になっているホストがあるかどうかを判断します。サービスのデータベース依存を表示するには：
1. [Software Catalog][26]でサービスを選択して詳細パネルを開きます。
1. パネルで{{< ui >}}Service Page{{< /ui >}}を選択します。
1. サービスページで、{{< ui >}}Databases{{< /ui >}}セクションを選択します。
1. データベースセクション内で、{{< ui >}}Databases{{< /ui >}}タブを選択します。

### スパンの期間を可視化し、クエリの詳細を表示します{#visualize-span-durations-and-view-query-details}

APMサービスページの{{< ui >}}Databases{{< /ui >}}セクションから{{< ui >}}Queries{{< /ui >}}タブを選択して、遅延の外れ値と選択した時間間隔のクエリの完全なリストを表示します。テーブル内のクエリを選択して、クエリパネルを表示し、診断、エラーの詳細、およびトレース情報にアクセスします。

### トレース内のデータベースクエリの実行計画を使用して、最適化の可能性を特定します{#identify-potential-optimizations-using-explain-plans-for-database-queries-in-traces}

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="トレース内のデータベースクエリの実行計画を使用して、非効率性を特定します。">}}

トレース内で実行されたクエリに類似したクエリの過去のパフォーマンスを表示し、サンプリングされた待機イベント、平均遅延、最近キャプチャされた実行計画を含めることで、クエリがどのようなパフォーマンスを発揮するかを把握できます。動作が異常かどうかを判断し、基盤となるDBMホストに関する追加のコンテキストを得るために[DBM][1]に移行して調査を続けます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/#getting-started
[2]: /ja/tracing/
[3]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2
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
[24]: https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server
[25]: https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set
[26]: https://app.datadoghq.com/services
[27]: https://pypi.org/project/asyncpg/
[28]: https://pypi.org/project/aiomysql/
[29]: https://pypi.org/project/mysql-connector-python/
[30]: https://pypi.org/project/mysqlclient/
[31]: https://github.com/PyMySQL/PyMySQL
[32]: https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace
[33]: https://github.com/mongodb/node-mongodb-native
[34]: https://www.psycopg.org/psycopg3/
[35]: https://pymongo.readthedocs.io/en/stable/
[36]: https://www.mongodb.com/docs/drivers/java/sync/current/
[37]: /ja/database_monitoring/query_samples/