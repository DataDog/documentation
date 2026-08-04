---
aliases:
- /ja/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: ブログ
  text: DBM と APM のテレメトリを相関させ、エンドツーエンドのクエリパフォーマンスを把握する
title: Database Monitoring とトレースの相関付け
---
このガイドでは、[Database Monitoring][1] を構成し、[APM][2] を使用していることを前提にしています。APM と DBM を接続すると、APM のトレース識別子が DBM のデータ収集に挿入され、これら 2 つのデータソースを相関させることができます。これにより、APM 製品ではデータベース情報を、DBM 製品では APM データを表示する製品機能が有効になります。

## はじめに {#before-you-begin}

サポートされるデータベース
: Postgres、MySQL、SQL Server、Oracle、MongoDB

サポート対象の Agent バージョン
: 7.46 以上

データプライバシー
: SQL コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、それにアクセスする権限を与えられた、ほかの第三者がそのデータにアクセスできるようになります。


Datadog SDK インテグレーションは、アプリケーションからデータベースに渡される情報量を制御する*伝播モード*をサポートしています。

| 伝播モード | 説明 |
|:-----------------|:------------|
| `full` | 完全なトレース情報をデータベースに送信し、DBM 内で個々のトレースを調査できるようにします。これはほとんどのインテグレーションで推奨されるソリューションです。|
| `service` | サービス名を送信し、どのサービスがデータベースの負荷に寄与しているかを理解できるようにします。|
| `disabled` | 伝播を無効にし、アプリケーションからの情報を送信しません。|


**サポートされるデータベース**

{{< tabs >}}
{{% tab "Postgres" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) 1.11.0 以上 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) 2.35.0 以上 | [Npgsql](https://www.nuget.org/packages/npgsql) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) 3.17.0 以上 | [postgres](https://node-postgres.com/) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) 0.86.0 以上 | [pdo](https://www.php.net/manual/en/book.pdo.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) 1.9.0 以上 | [psycopg2](https://www.psycopg.org/docs/index.html)<br>[psycopg](https://www.psycopg.org/psycopg3/) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) 2.9.0 以上 | [asyncpg](https://pypi.org/project/asyncpg/) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) 1.8.0 以上 | [pg](https://github.com/ged/ruby-pg) | `full`<br>`service` |

**注**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) は .NET ドライバーではサポートされていません。

{{% /tab %}}

{{% tab "MySQL" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) 1.11.0 以上 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) 2.35.0 以上 | [MySql.Data](https://www.nuget.org/packages/MySql.Data)<br>[MySqlConnector](https://www.nuget.org/packages/MySqlConnector) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) 3.17.0 以上 | [mysql](https://github.com/mysqljs/mysql)<br>[mysql2](https://github.com/sidorares/node-mysql2) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) 0.86.0 以上 | [pdo](https://www.php.net/manual/en/book.pdo.php)<br>[MySQLi](https://www.php.net/manual/en/book.mysqli.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) 2.9.0 以上 | [aiomysql](https://pypi.org/project/aiomysql/)<br>[mysql-connector-python](https://pypi.org/project/mysql-connector-python/)<br>[mysqlclient](https://pypi.org/project/mysqlclient/)<br>[pymysql](https://github.com/PyMySQL/PyMySQL) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) 1.8.0 以上 | [mysql2](https://github.com/brianmario/mysql2) | `full`<br>`service` |

**注**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) は .NET ドライバーではサポートされていません。

**注**: Aurora MySQL の完全伝播モードにはバージョン 3 が必要です。

{{% /tab %}}

{{% tab "SQL Server" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) 1.11.0 以上 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) 2.35.0 以上 | [System.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server)<br>[Microsoft.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace) | `full`<br>`service` |

**注**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) は .NET ドライバーではサポートされていません。

Java と .NET の `full` モードの場合:

<div class="alert alert-danger">アプリケーションで <code>context_info</code> をインスツルメンテーションに使用している場合、Datadog SDK はそれを上書きします。</div>

- インスツルメンテーションは、クライアントがクエリを発行する際に `SET context_info` コマンドを実行し、これによりデータベースとの追加のラウンドトリップが発生します。
- 前提条件:
  - Agent バージョン 7.55.0 以降
  - Java トレーサーバージョン 1.39.0 以降
  - .NET トレーサーバージョン 3.3 以降

{{% /tab %}}

{{% tab "Oracle" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) 1.11.0 以上 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |

Java の `full` モードの場合:
- このインスツルメンテーションは `V$SESSION.ACTION` を上書きします。
- 前提条件: Java トレーサー 1.45 以降

{{% /tab %}}

{{% tab "MongoDB" %}}

| 言語 | 最小トレーサーバージョン | ライブラリ/フレームワーク | モード |
|:---------|:-------------------|:------------------|:-----|
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) 1.58.0 以上 | [mongo-java-driver](https://www.mongodb.com/docs/drivers/java/sync/current/) v3.8+ | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) 5.80.0 以上 | [mongodb](https://github.com/mongodb/node-mongodb-native) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) 3.5.0 以上 | [pymongo](https://pymongo.readthedocs.io/en/stable/) | `full`<br>`service` |

{{% /tab %}}

{{< /tabs >}}

## セットアップ {#setup}
アプリケーションに以下の環境変数を設定します。

```shell
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

これらのタグは、APM 相関ビューおよび DBM アクティブ接続の内訳でサービスを識別します。

Datadog では、Agent のバージョンが `7.63` 以上の場合、難読化モードを `obfuscate_and_normalize` に設定することを推奨しています。APM エージェント構成ファイルの `apm_config` セクションに以下のパラメーターを追加します。

```yaml
  sql_obfuscation_mode: "obfuscate_and_normalize"
```

<div class="alert alert-warning">難読化モードを変更すると、正規化された SQL テキストが変更される可能性があります。APM トレース内の SQL テキストに基づくモニターがある場合は、それらを更新する必要が生じることがあります。</div>

{{< tabs >}}
{{% tab "Go" %}}

アプリの依存関係を更新して、[dd-trace-go v2][1] を含むようにします。{{% tracing-go-v2 %}}

```shell
go get github.com/DataDog/dd-trace-go/v2 # 2.x
```

`contrib/database/sql` パッケージをインポートするようにコードを更新します。

```go
import (
   "database/sql"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)
```

以下のいずれかの方法で、Database Monitoring の伝播機能を有効にします。
- 環境変数:
   `DD_DBM_PROPAGATION_MODE=full`

- ドライバー登録時にコードを使用する:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithService("my-db-service"))
   ```

- `sqltrace.Open` でコードを使用する:
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

[Java トレーシング][1] のインスツルメンテーションの説明に従い、Agent の `1.11.0` 以上のバージョンをインストールします。

また、`jdbc-datasource` [インスツルメンテーション][2] を有効にする必要があります。

以下の**いずれか**の方法で、Database Monitoring の伝播機能を有効にします。

- システムプロパティ `dd.dbm.propagation.mode=full` を設定する
- 環境変数 `DD_DBM_PROPAGATION_MODE=full` を設定する

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

**トレーサーバージョン 1.44 以上**:
Postgres でのプリペアドステートメントのトレースを有効にするには、以下の**いずれか**の方法を使用してください。
- システムプロパティ `dd.dbm.trace_prepared_statements=true` を設定する
- 環境変数 `export DD_DBM_TRACE_PREPARED_STATEMENTS=true` を設定する

**注**: プリペアドステートメントのインスツルメンテーションは、`Application` プロパティを `_DD_overwritten_by_tracer` というテキストで上書きし、データベースへの追加のラウンドトリップが発生します。この追加のラウンドトリップがレイテンシーに与える影響はごくわずかです。

<div class="alert alert-danger">プリペアドステートメントのトレースを有効にすると、Amazon RDS Proxy を使用する際に接続の固定が増加し、接続プールの効率が低下する可能性があります。詳細については、<a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html">RDS Proxy の接続の固定</a>を参照してください。</div>

**トレーサーのバージョンが 1.44 未満の場合**:
Postgres と MySQL では、`full` モードでプリペアドステートメントはサポートされていません。そのため、プリペアドステートメントを使用するすべての JDBC API 呼び出しは自動的に `service` モードにダウングレードされます。ほとんどの Java SQL ライブラリはデフォルトでプリペアドステートメントを使用するため、**ほとんどの** Java アプリケーションは `service` モードのみを使用できることを意味します。

[1]: /ja/tracing/trace_collection/dd_libraries/java/
[2]: /ja/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Gemfile で [dd-trace-rb][1] をバージョン`1.8.0` 以上にインストールまたは更新してください。

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

以下のいずれかの方法で、Database Monitoring の伝播機能を有効にします。
1. 環境変数:
   `DD_DBM_PROPAGATION_MODE=full`

2. オプション`comment_propagation` (デフォルト: `ENV['DD_DBM_PROPAGATION_MODE']`)、[mysql2][2] または [pg][3] 用:
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

{{% tab "Python" %}}

アプリの依存関係を更新して、[dd-trace-py>=1.9.0][1] を含むようにします。

```
pip install "ddtrace>=1.9.0"
```

Postgres の場合は、[psycopg2][2] をインストールします。

```
pip install psycopg2
```

MongoDB の場合は、pymongo をインストールします。

```
pip install pymongo
```

**注**: MongoDB のサポートには `dd-trace-py` 3.5.0 以上が必要です。アップグレードが必要な場合: `pip install "ddtrace>=3.5.0"`。

以下の環境変数を設定して、Database Monitoring の伝播機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

Postgres の例:

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

MongoDB の例:

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
この機能を使用するには、.NET サービスの自動インスツルメンテーションが有効である必要があります。
</div>

[.NET Framework のトレース手順][1] または [.NET Core のトレース手順][2] に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。たとえば、`Npgsql` です。

以下の環境変数を設定して、Database Monitoring の伝播機能を有効にします。
   - Postgres および MySQL の場合: `DD_DBM_PROPAGATION_MODE=full`
   - SQL Server の場合: `DD_DBM_PROPAGATION_MODE=service` または `DD_DBM_PROPAGATION_MODE=full` と Java および .NET トレーサー
   - Oracle の場合: `DD_DBM_PROPAGATION_MODE=service`

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
この機能を使用するには、PHP サービスでトレーサー拡張機能が有効になっている必要があります。
</div>

[PHP トレース手順][1] に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。たとえば、`PDO` です。

以下の環境変数を設定して、Database Monitoring の伝播機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

`3.17.0` より新しいバージョン (あるいはサポート終了となった Node.js バージョン 12 を使用している場合は `2.30.0` 以上) の [dd-trace-js][1] をインストールするか、これらのバージョンに更新してください。

```shell
npm install dd-trace@^3.17.0
```

トレーサーをインポートして初期化するようにコードを更新します。

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

以下のいずれかの方法で、Database Monitoring の伝播機能を有効にします。
* 以下の環境変数を設定します:
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* SDK を `dbmPropagationMode` オプション (デフォルト: `ENV['DD_DBM_PROPAGATION_MODE']`) を使用するように設定します。
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* インテグレーションレベルのみで有効にします。
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

## インテグレーションを確認する {#verify-the-integration}

インテグレーションが機能していることを確認するには、次のようにします。
1. インスツルメンテーションされたアプリケーションを実行し、データベースクエリを実行します。
1. Datadog で、[**Database Monitoring > Query Samples**][37] に移動します。
1. クエリサンプルに **APM** 相関バッジが表示されることを確認します。

## DBM で APM 接続を調べる {#explore-the-apm-connection-in-dbm}

### 呼び出し元の APM サービスとアクティブなデータベース接続と関連付ける {#attribute-active-database-connections-to-the-calling-apm-services}

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="データベースへのアクティブな接続を、その接続元の APM サービス別に表示します。">}}

特定のホストのアクティブな接続を、リクエスト元の上流の APM サービス別に表示します。データベースへの負荷を個々のサービスと関連付けて、どのサービスがデータベースで最もアクティブであるかを把握できます。最もアクティブな上流サービスのサービスページに移動して、さらに詳しく調べます。

### 呼び出し元の APM サービスでデータベースホストをフィルターする {#filter-your-database-hosts-by-the-apm-services-that-call-them}

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="呼び出し元の APM サービスでデータベースホストをフィルターします。">}}

特定の APM サービスが依存しているデータベースホストのみを表示するように、データベースリストをフィルターします。下流の依存関係にサービスのパフォーマンスに影響を与える可能性のあるブロックアクティビティがあるかどうかを特定します。

### クエリサンプルに関連するトレースを表示する {#view-the-associated-trace-for-a-query-sample}

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="調査対象のクエリサンプルの生成元である、サンプリングされた APM トレースをプレビューします。">}}

Database Monitoring で [クエリサンプル][37] を表示する際、関連するトレースが APM によってサンプリングされている場合は、DBM サンプルを APM トレースのコンテキストで確認できます。これにより、クエリの実行計画や過去のパフォーマンスを含む DBM テレメトリと、インフラストラクチャー内のスパンの系統を組み合わせて、データベース上の変更がアプリケーションパフォーマンスの低下の原因になっているかどうかを理解することができます。

## APM での DBM 接続を調査する {#explore-the-dbm-connection-in-apm}

### APM サービスの下流データベースホストを可視化する {#visualize-the-downstream-database-hosts-of-apm-services}

特定のサービスの APM ページでは、Database Monitoring によって識別された、そのサービスの直接的なダウンストリームデータベース依存関係を表示し、ノイジーネイバーによって負荷が偏っている可能性のあるホストを判別できます。サービスのデータベース依存関係を表示するには、次のようにします。
1. [Software Catalog][26] でサービスを選択して詳細パネルを開きます。
1. パネルで [{{< ui >}}Service Page{{< /ui >}}] (サービスページ) を選択します。
1. [Service] (サービス) ページで、[{{< ui >}}Databases{{< /ui >}}] (データベース) セクションを選択します。
1. [Databases] セクション内で [{{< ui >}}Databases{{< /ui >}}] タブを選択します。

### スパンの期間を可視化し、クエリの詳細を表示する {#visualize-span-durations-and-view-query-details}

APM サービスページの [{{< ui >}}Databases{{< /ui >}}] セクションで [{{< ui >}}Queries{{< /ui >}}] (クエリ) タブを選択して、レイテンシー外れ値と選択した期間のすべてのクエリのリストを表示します。テーブル内のクエリを選択してクエリパネルを表示し、診断、エラーの詳細、およびトレース情報にアクセスします。

### トレースでデータベースクエリの実行計画を使用して、最適化の可能性を特定する {#identify-potential-optimizations-using-explain-plans-for-database-queries-in-traces}

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="トレース内のデータベースクエリの実行計画を使用して、非効率な部分を特定します。">}}

トレース内で実行されたクエリと同様のクエリの過去のパフォーマンス (サンプリングされた待機イベントや平均レイテンシー、最近取得された実行計画など) を表示して、そのクエリが期待通りに動作しているかどうかを把握します。動作が異常かどうかを判断し、[Database Monitoring][1] に移動して、基盤となるデータベースホストについての追加コンテキストを確認し、さらに詳しく調べます。

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