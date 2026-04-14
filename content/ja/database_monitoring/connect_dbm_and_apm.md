---
aliases:
- /ja/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: ブログ
  text: DBM と APM のテレメトリーをシームレスに相関させ、エンドツーエンドのクエリパフォーマンスを把握する
title: Database Monitoring とトレースの相関付け
---

このガイドは、[データベースモニタリング][1]を構成し、[APM][2] を使用していることを前提にしています。APM と DBM を接続すると、APM のトレース識別子が DBM のデータ収集に挿入され、これら 2 つのデータソースを相関させることができます。これにより、APM 製品ではデータベース情報を、DBM 製品では APM データを表示する製品機能が実現します。

## はじめに

対応データベース:
Postgres、MySQL、SQL Server、Oracle

サポート対象の Agent バージョン
: 7.46+

データプライバシー
: SQL コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、それにアクセスする権限を与えられた他の第三者がそのデータにアクセスできるようになります。


APM トレーサーインテグレーションは、アプリケーションからデータベースに渡される情報量を制御する*伝播モード*をサポートしています。

- `full` モードは完全なトレース情報をデータベースに送信し、DBM 内で個々のトレースを調査できるようにします。これはほとんどのインテグレーションで推奨されるソリューションです。
- `service` モードはサービス名を送信し、データベースの負荷に貢献しているサービスを把握することができます。これは Oracle アプリケーションでサポートされている唯一のモードです。
- `disabled` モードは伝播を無効にし、アプリケーションからの情報を送信しません。

| DD_DBM_PROPAGATION_MODE | Postgres  |   MySQL     | SQL Server |  Oracle   |
|:------------------------|:---------:|:-----------:|:----------:|:---------:|
| `full`                  | {{< X >}} | {{< X >}} * | {{< X >}}  | {{< X >}} |
| `service`               | {{< X >}} | {{< X >}}   | {{< X >}}  | {{< X >}} |

\* Aurora MySQL の完全伝播モードにはバージョン 3 が必要です。

**サポート対象のアプリケーショントレーサーとドライバー**

| 言語                                 | ライブラリまたはフレームワーク   | Postgres  |   MySQL   |     SQL Server      |       Oracle        |
|:-----------------------------------------|:-----------------------|:---------:|:---------:|:-------------------:|:-------------------:|
| **Go:** [dd-trace-go][3] >= 1.44.0       |                        |           |           |                     |                     |
|                                          | [database/sql][4]      | {{< X >}} | {{< X >}} | `service` モードのみ | `service` モードのみ |
|                                          | [sqlx][5]              | {{< X >}} | {{< X >}} | `service` モードのみ | `service` モードのみ |
| **Java** [dd-trace-java][23] >= 1.11.0   |                        |           |           |                     |                     |
|                                          | [jdbc][22]             | {{< X >}} | {{< X >}} | {{< X >}} **        | {{< X >}} ***       |
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
|                                          | [System.Data.SqlClient][24] * |    |           | {{< X >}} **        |                     |
|                                          | [Microsoft.Data.SqlClient][32] * | |           | {{< X >}} **        |                     |
| **PHP**  [dd-trace-php][19] >= 0.86.0    |                        |           |           |                     |                     |
|                                          | [pdo][20]              | {{< X >}} | {{< X >}} |                     |                     |
|                                          | [MySQLi][21]           |           | {{< X >}} |                     |                     |
| **Node.js:** [dd-trace-js][9] >= 3.17.0  |                        |           |           |                     |                     |
|                                          | [postgres][10]         | {{< X >}} |           |                     |                     |
|                                          | [mysql][13]            |           | {{< X >}} |                     |                     |
|                                          | [mysql2][14]           |           | {{< X >}} |                     |                     |

\* [CommandType.StoredProcedure][25] はサポートされていません

\*\* Java/.NET トレーサーにおける SQL Server のフルモード:
  - インスツルメンテーションは、クライアントがクエリを発行する際に `SET context_info` コマンドを実行し、これによりデータベースとの追加のラウンドトリップが発生します。
  - アプリケーションが `context_info` を使用してインスツルメンテーションを行っている場合、APM トレーサーによって上書きされます。
  - 前提条件:
    - Agent バージョン 7.55.0 以降
    - Java トレーサーバージョン 1.39.0 以降
    - .NET トレーサーバージョン 3.3 以降

\*\*\* Java 向け Full mode の Oracle:
  - このインスツルメンテーションは `V$SESSION.ACTION` を上書きします。
  - 必要条件: Java トレーサー 1.45 以上

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
```shell
go get gopkg.in/DataDog/dd-trace-go.v1@v1.44.0 # 1.x
# go get github.com/DataDog/dd-trace-go/v2 # 2.x
```

コードを更新して `contrib/database/sql` パッケージをインポートします。
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer" // 1.x
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql" // 1.x
   // "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer" // 2.x
   // sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2" // 2.x
)
```

以下のいずれかの方法で、データベースモニタリングの伝播機能を有効にします。
- 環境変数:
   `DD_DBM_PROPAGATION_MODE=full`

- ドライバー登録時にコードを使用する:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithService("my-db-service"))
   ```

- `sqltrace.Open` のコードを使用する:
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
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer" // 1.x
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql" // 1.x
   // "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer" // 2.x
   // sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2" // 2.x
)

func main() {
    // まず、ドライバの登録時に dbm 伝播モードを設定します。これは sqltrace.Open で行うこともでき、
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

[Java トレーシング][1]のインスツルメンテーションの説明に従い、Agent の `1.11.0` またはそれ以上のバージョンをインストールします。

また、`jdbc-datasource` [インスツルメンテーション][2]を有効にする必要があります。

以下の**いずれか**の方法で、データベースモニタリングの伝播機能を有効にします。

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

**トレーサーバージョン 1.44 以上**:
Postgres でのプリペアドステートメントのトレースを有効にするには、以下のいずれかの方法を使用してください:
- システムプロパティ `dd.dbm.trace_prepared_statements=true` を設定する
- 環境変数 `export DD_DBM_TRACE_PREPARED_STATEMENTS=true` を設定する 

**注**: プリペアドステートメントのインスツルメンテーションは `Application` プロパティを上書きし、データベースへの追加の往復 (ラウンドトリップ) が発生します。この追加の往復はレイテンシーに与える影響がごくわずかです。

**トレーサーバージョン 1.44 未満**:
Postgres と MySQL では、`full` モードでプリペアドステートメントはサポートされていません。そのため、プリペアドステートメントを使用するすべての JDBC API 呼び出しは自動的に `service` モードにダウングレードされます。ほとんどの Java SQL ライブラリはデフォルトでプリペアドステートメントを使用するため、ほとんどの Java アプリケーションは `service` モードのみを使用できることを意味します。

[1]: /ja/tracing/trace_collection/dd_libraries/java/
[2]: /ja/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Gemfile 内で、[dd-trace-rb][1] をバージョン `1.8.0` 以上にインストールまたは更新してください:

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# 使用状況に応じて
gem 'mysql2'
gem 'pg'
```

以下のいずれかの方法を使用して、データベースモニタリングのプロパゲーション機能を有効にしてください:
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
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#mysql2
[3]: /ja/tracing/trace_collection/dd_libraries/ruby/#postgres

{{% /tab %}}

{{% tab "Python" %}}

アプリ依存関係を更新して、[dd-trace-py>=1.9.0][1] を含めてください:
```
pip install "ddtrace>=1.9.0"
```

[psycopg2][2] をインストールします:
```
pip install psycopg2
```

次の環境変数を設定して、データベースモニタリングのプロパゲーション機能を有効にします:
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

# postgres DB に接続
conn = psycopg2.connect(**POSTGRES_CONFIG)
cursor = conn.cursor()
# SQL クエリを実行
cursor.execute("select 'blah'")
cursor.executemany("select %s", (("foo",), ("bar",)))
```

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">
この機能を利用するには、.NET サービスで自動インスツルメンテーションが有効になっている必要があります。
</div>

[.NET Framework のトレース手順][1]または [.NET Core のトレース手順][2]に従って、自動インスツルメンテーションパッケージをインストールし、サービスに対するトレースを有効にしてください。

サポートされるクライアントライブラリを使用していることを確認してください。例えば、`Npgsql` などです。

以下の環境変数を設定して、データベースモニタリングのプロパゲーション機能を有効にします:
   - Postgres および MySQL: `DD_DBM_PROPAGATION_MODE=full` 
   - SQL Server: `DD_DBM_PROPAGATION_MODE=service` または Java と .NET のトレーサーで `DD_DBM_PROPAGATION_MODE=full` 
   - Oracle: `DD_DBM_PROPAGATION_MODE=service`

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
この機能を利用するには、PHP サービスでトレーサー拡張が有効になっている必要があります。
</div>

[PHP トレーシングの説明][1]に従って自動インスツルメンテーションパッケージをインストールし、サービスでトレーシングを有効にしてください。

サポートされているクライアントライブラリ (例: `PDO` など) を使用していることを確認してください。

次の環境変数を設定して、データベースモニタリングのプロパゲーション機能を有効にします:
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

[dd-trace-js][1] を `3.17.0` より新しいバージョン (あるいはサポート終了となった Node.js バージョン 12 を使用している場合は `2.30.0` 以上) にインストールまたは更新してください:

```
npm install dd-trace@^3.17.0
```

コードを更新し、トレーサーをインポートして初期化してください:
```javascript
// インスツルメンテーション対象のモジュールをインポートする前に、この行を必ず配置してください。
const tracer = require('dd-trace').init();
```

以下のいずれかの方法で、データベースモニタリングのプロパゲーション機能を有効にします:
* 環境変数を設定する
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* トレーサーで `dbmPropagationMode` オプションを使用する (デフォルト値は `ENV['DD_DBM_PROPAGATION_MODE']`)
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* インテグレーションレベルのみで有効にする
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
// 結果を処理する
})
```

[1]: https://github.com/DataDog/dd-trace-js

{{% /tab %}}

{{< /tabs >}}

## DBM で APM の接続を調査する

### アクティブなデータベース接続を呼び出し元 APM サービスに関連付ける

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="APM サービスごとに分類されたデータベースのアクティブな接続状況を表示します。">}}

特定のホストに対するアクティブな接続を、リクエストを送信する上流の APM サービスごとに分類して表示します。どのサービスがデータベース上で最もアクティブであるかを把握できるように、データベースへの負荷を各サービスに紐付けることができます。最もアクティブな上流サービスのサービスページに移動し、調査を続行できます。

### 呼び出し元となる APM サービス別にデータベースホストをフィルタリングする

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="呼び出し元 APM サービスごとにデータベースホストをフィルタリングします。">}}

Database List をすばやくフィルタして、特定の APM サービスが依存しているデータベースホストのみを表示できます。下流の依存関係でブロッキングアクティビティが発生していないかを簡単に確認し、サービスパフォーマンスへの影響を把握できます。

### クエリサンプルに関連するトレースを表示する

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="検証中のクエリサンプルが生成されたもとの APM トレースをプレビューします。">}}

Database Monitoring でクエリサンプルを閲覧する際、関連するトレースが APM によってサンプリングされている場合は、DBM サンプルを APM トレースのコンテキストで確認できます。これにより、Explain Plan やクエリの履歴パフォーマンスなどの DBM のテレメトリーを、インフラストラクチャー内でのスパンの系譜と併せて確認し、データベースの変更がアプリケーションパフォーマンス低下の原因になっているかを把握することができます。

## APM での DBM 接続を調査する

### APM サービスの下流データベースホストを可視化する

{{< img src="database_monitoring/dbm_apm_service_page_db_host_list.png" alt="サービスページから、APM サービスが依存している下流のデータベースホストを可視化します。">}}

特定のサービスに対応する APM ページでは、Database Monitoring によって識別された、そのサービスが依存する直接の下流データベースを表示します。ノイジー・ネイバー (同一環境上で動く他のアプリケーションなど) によって負荷が偏っていないかを迅速に判断できます。サービスのページを表示するには、[Service Catalog][26] で当該サービスをクリックし詳細パネルを開いた上で、パネル内の **View Service Page** をクリックしてください。

### トレース内のデータベースクエリに対する Explain Plan を利用して最適化の可能性を特定する

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="トレース内のデータベースクエリに対する Explain Plan を使用して非効率を特定します。">}}

トレース内で実行されるクエリと同様のクエリの過去のパフォーマンスを表示し、サンプリングされた待機イベントや平均レイテンシー、最近取得された Explain Plan などの情報を参照して、そのクエリが期待通りに動作しているかどうかを把握できます。挙動が異常かどうかを判断し、さらなる調査が必要であれば Database Monitoring に移動して、基盤となるデータベースホストについて追加のコンテキストを確認してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/#getting-started
[2]: /ja/tracing/
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
[24]: https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server
[25]: https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[...]%20should%20set
[26]: https://app.datadoghq.com/services
[27]: https://pypi.org/project/asyncpg/
[28]: https://pypi.org/project/aiomysql/
[29]: https://pypi.org/project/mysql-connector-python/
[30]: https://pypi.org/project/mysqlclient/
[31]: https://github.com/PyMySQL/PyMySQL
[32]: https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace