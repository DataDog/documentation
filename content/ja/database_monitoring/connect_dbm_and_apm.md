---
aliases:
- /ja/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: ブログ
  text: DBM と APM のテレメトリーをシームレスに相関させ、エンドツーエンドのクエリパフォーマンスを把握する
kind: documentation
title: Database Monitoring とトレースの相関付け
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring はこのサイトではサポートされていません。</div>
{{< /site-region >}}

このガイドでは、[Database Monitoring][1] を構成し、[APM][2] を使用していることを前提としています。APM と DBM を接続すると、DBM のデータ収集に APM トレース識別子が注入され、これによりこれら 2 つのデータソースの相関が可能になります。これにより、APM 製品ではデータベース情報を、DBM 製品では APM データを表示する製品機能が有効になります。

## 始める前に

対応データベース
: Postgres、MySQL、SQL Server

対応 Agent バージョン
: 7.46+

データプライバシー
: SQL コメントの伝播を有効にすると、潜在的に機密のデータ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他のサードパーティがアクセスできるようになります。


APM トレーサーインテグレーションは、アプリケーションからデータベースに渡される情報の量を制御する *Propagation Mode* をサポートしています。

- `full` モードは完全なトレース情報をデータベースに送信し、DBM 内で個々のトレースを調査できるようにします。これはほとんどのインテグレーションで推奨される方法です。
- `service` モードはサービス名を送信し、これによりどのサービスがデータベース負荷の原因となっているかを知ることができます。これは SQL Server アプリケーションでサポートされている唯一のモードです。
- `none` モードは伝播を無効にし、アプリケーションからの情報を送信しません。

ステートメントキャッシングの動作が完全なトレースコンテキストを含む場合にパフォーマンスの問題を引き起こす可能性があるため、SQL Server は `full` 伝播モードをサポートしていません。

| DD_DBM_PROPAGATION_MODE  | Postgres  |   MySQL   |  SQL Server  |
|:-------------------------|:---------:|:---------:|:------------:|
| `full`                   | {{< X >}} | {{< X >}} |          |
| `service`                | {{< X >}} | {{< X >}} | {{< X >}}    |

**対応アプリケーショントレーサーおよびドライバー**

| 言語                                 | ライブラリまたはフレームワーク | Postgres  |   MySQL   |                SQL Server              |
|:-----------------------------------------|:---------------------|:---------:|:---------:|:--------------------------------------:|
| **Go:** [dd-trace-go][3] >= 1.44.0       |                      |           |           |                                        |
|                                          | [database/sql][4]    | {{< X >}} | {{< X >}} | `service` モードのみ                    |
|                                          | [sqlx][5]            | {{< X >}} | {{< X >}} | `service` モードのみ                    |
| **Java** [dd-trace-java][23] >= 1.11.0   |                      |           |           |                                        |
|                                          | [jdbc][22]           | {{< X >}} | {{< X >}} | `service` モードのみ                    |
| **Ruby:** [dd-trace-rb][6] >= 1.8.0      |                      |           |           |                                        |
|                                          | [pg][8]              | {{< X >}} |           |                                        |
|                                          | [mysql2][7]          |           | {{< X >}} |                                        |
| **Python:** [dd-trace-py][11] >= 1.9.0   |                      |           |           |                                        |
|                                          | [psycopg2][12]       | {{< X >}} |           |                                        |
| **.NET** [dd-trace-dotnet][15] >= 2.35.0 |                      |           |           |                                        |
|                                          | [Npgsql][16] *         | {{< X >}} |           |                                        |
|                                          | [MySql.Data][17] *     |           | {{< X >}} |                                        |
|                                          | [MySqlConnector][18] * |           | {{< X >}} |                                        |
|                                          | [ADO.NET][24] *        |           |           | `service` モードのみ                    |
| **PHP**  [dd-trace-php][19] >= 0.86.0    |                      |           |           |                                        |
|                                          | [pdo][20]            | {{< X >}} | {{< X >}} |                                        |
|                                          | [MySQLi][21]         |           | {{< X >}} |                                        |
| **Node.js:** [dd-trace-js][9] >= 3.17.0  |                      |           |           |                                        |
|                                          | [postgres][10]       | {{< X >}} |           |                                        |
|                                          | [mysql][13]          |           | {{< X >}} |                                        |
|                                          | [mysql2][14]         |           | {{< X >}} |                                        |

\* [CommandType.StoredProcedure][25] はサポートされていません

## セットアップ
最高のユーザーエクスペリエンスを得るためには、以下の環境変数がアプリケーションに設定されていることを確認してください。

```
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

{{< tabs >}}
{{% tab "Go" %}}

アプリの依存関係を更新して、[dd-trace-go@v1.44.0][1] 以上を含めます。
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.44.0
```

`contrib/database/sql` パッケージをインポートするようにコードを更新します。
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)
```

以下のいずれかの方法を使用して、データベースモニタリングの伝播機能を有効にします。
1. 環境変数:
   `DD_DBM_PROPAGATION_MODE=full`

2. ドライバー登録時のコードの使用
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. `sqltrace.Open` のコードの使用
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
    // 最初のステップは、ドライバーの登録時に dbm 伝搬モードを設定することです。これは
    // sqltrace.Open でも行うことができ、この機能をより細かく制御することができます。
    sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))

    // 続いて Open の呼び出し。
    db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }

    // 次に、database/sql パッケージをトレースしながら通常通り使用します。
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

[Java トレース][1]インスツルメンテーションの説明に従い、Agent の `1.11.0` またはそれ以上のバージョンをインストールします。

また、`jdbc-datastore` [インスツルメンテーション][2]を有効にする必要があります。

以下の方法の**いずれか**を使用して、データベースモニタリングの伝播機能を有効にします。

- システムプロパティ `dd.dbm.propagation.mode=full` を設定する
- 環境変数 `DD_DBM_PROPAGATION_MODE=full` を設定する

完全な例:
```
# 必要なシステムプロパティで Java Agent を起動します
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

**注**: プリペアドステートメントは `full` モードではサポートされておらず、プリペアドステートメントを使用するすべての JDBC API 呼び出しは自動的に `service` モードにダウングレードされます。ほとんどの Java SQL ライブラリはデフォルトでプリペアドステートメントを使用するため、**ほとんどの** Java アプリケーションは `service` モードしか使用できません。

[1]: /ja/tracing/trace_collection/dd_libraries/java/
[2]: /ja/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Gemfile で、[dd-trace-rb][1] をバージョン `1.8.0` 以上にインストールまたは更新します。

```rb
source 'https://rubygems.org'
gem 'ddtrace', '>= 1.8.0'

# 使用状況により異なります
gem 'mysql2'
gem 'pg'
```

以下のいずれかの方法を使用して、データベースモニタリングの伝播機能を有効にします。
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

アプリの依存関係を更新して、[dd-trace-py>=1.9.0][1] を含めます。
```
pip install "ddtrace>=1.9.0"
```

[psycopg2][2] をインストールします (**注**: DBM と APM の接続は MySQL クライアントではサポートされていません)。
```
pip install psycopg2
```

以下の環境変数を設定して、データベースモニタリングの伝播機能を有効にします。
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

# Postgres DB に接続します
conn = psycopg2.connect(**POSTGRES_CONFIG)
cursor = conn.cursor()
# SQL クエリを実行します
cursor.execute("select 'blah'")
cursor.executemany("select %s", (("foo",), ("bar",)))
```

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-warning">
この機能を使用するには、.NET サービスの自動インスツルメンテーションを有効にする必要があります。
</div>

[.NET Framework のトレース手順][1]または [.NET Core のトレース手順][2]に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。例えば、`Npgsql` などです。

以下の環境変数を設定して、データベースモニタリングの伝搬機能を有効にします。
   - Postgres および MySQL の場合: `DD_DBM_PROPAGATION_MODE=full`
   - SQL Server の場合: `DD_DBM_PROPAGATION_MODE=service`

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-warning">
この機能を使用するには、PHP サービスでトレーサー拡張機能が有効になっていることが必要です。
</div>

[PHP トレース手順][1]に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリを使用していることを確認します。例えば、`PDO` などです。

以下の環境変数を設定して、データベースモニタリングの伝搬機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/php?tab=containers

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
1. 環境変数:
   `DD_DBM_PROPAGATION_MODE=full`

2. オプション `dbmPropagationMode` (デフォルト: `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```javascript
   tracer.use('pg', { dbmPropagationMode: 'full', service: 'my-db-service' })
   ```

完全な例:
```javascript
const pg = require('pg')
const tracer = require('dd-trace').init()

tracer.use('pg', { dbmPropagationMode: 'full', service: 'my-db-service' })

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
    // 処理結果
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

指定したサービスの APM ページで、Database Monitoring により特定されたサービスの直接的なダウンストリームデータベース依存関係を確認できます。ノイジーなネイバーが原因と思われる不均衡な負荷がかかっているホストがあるかどうかをすばやく判断できます。サービスのページを表示するには、[サービスカタログ][26]でサービスをクリックして詳細パネルを開き、パネル内の **View Service Page** をクリックします。

### データベースクエリの実行計画をトレースで確認し、最適化の可能性を特定する

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="トレース内のデータベースクエリに対する実行計画を使用して非効率を特定します。">}}

トレースで実行されたクエリと同様のクエリの履歴ビュー (サンプルの待機イベント、平均レイテンシー、最近キャプチャした実行計画など) を表示し、クエリがどのように実行されると予想されるかを説明します。動作が異常であるかどうかを判断し、データベースモニタリングにピボットして、基礎となるデータベースホストに関する追加のコンテキストを得ることで、調査を継続します。

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
[24]: https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/ado-net-overview
[25]: https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[...]%20should%20set
[26]: https://app.datadoghq.com/services