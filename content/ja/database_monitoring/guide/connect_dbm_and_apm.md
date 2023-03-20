---
beta: true
kind: ガイド
private: true
title: DBM と APM の接続
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-warning">
このページで説明されている機能はベータ版です。詳細については、カスタマーサクセスマネージャーにお問い合わせください。
</div>

このガイドは、[データベースモニタリング][1]を構成し、[APM][2] を使用していることを前提にしています。APM と DBM を接続すると、APM のトレース識別子が DBM のデータ収集に挿入され、これら 2 つのデータソースを相関させることができます。これにより、APM 製品ではデータベース情報を、DBM 製品では APM データを表示する製品機能が実現します。

## はじめに

対応データベース
: postgres、mysql

サポート対象の Agent バージョン
: 7.36.1+

データプライバシー
: SQL コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がアクセスすることが可能になります。


**サポートされるトレーサー**

| 言語 | ライブラリまたはフレームワーク           | Postgres    | MySQL       |
| :----    | :----                          | :----:      |  :----:     |
| **Go:** [dd-trace-go][3] >= 1.44.0 |      |             |             |
|          | [database/sql][4]              | {{< X >}}   | {{< X >}}   |
|          | [sqlx][5]                      | {{< X >}}   | {{< X >}}   |
| **Ruby:** [dd-trace-rb][6] >= 1.8.0 |     |             |             |
|          | [pg][8]                        | {{< X >}}   |             |
|          | [mysql2][7]                    |             | {{< X >}}   |
| **Node:** [dd-trace-js][9] >= 3.13.0 |    |             |             |
|          | [postgres][10]                 | {{< X >}}   |             |
|          | [mysql][13]                    |             | {{< X >}}   |
|          | [mysql2][14]                   |             | {{< X >}}   |
| **Python:** [dd-trace-py][11] >= 1.9.0 |  |             |             |
|          | [psycopg2][12]                 | {{< X >}}   |             |
| **.NET** [dd-trace-dotnet][15] >= 2.26.0 ||             |             |
|          | [Npgsql][16]                   | {{< X >}}   |             |
|          | [MySql.Data][17]               |             | {{< X >}}   |
|          | [MySqlConnector][18]           |             | {{< X >}}   |
| **Java**     |                            |             |             |
|          | jdbc                           | 間もなく対応 | 間もなく対応 |




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

{{% tab "Ruby" %}}

Gemfile で [dd-trace-rb][1] をバージョン `1.8.0` 以降にインストールまたはアップデートします。

```rb
source 'https://rubygems.org'
gem 'ddtrace', '>= 1.8.0'

# 使用による
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
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#mysql2
[3]: /ja/tracing/trace_collection/dd_libraries/ruby/#postgres

{{% /tab %}}

{{% tab "Python" %}}

アプリの依存関係を更新して、[dd-trace-py>=1.7.0][1] を含むようにします。
```
pip install "ddtrace>=1.7.0"
```

[psycopg2][2] をインストールします (**注**: DBM と APM の接続は MySQL クライアントではサポートされていません)。
```
pip install psycopg2
```

以下の環境変数を設定して、データベースモニタリングの伝搬機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

完全な例:
```python

import psycopg2

#TODO: postgres の構成を更新する
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

{{% tab "Node.js" %}}

[dd-trace-js][1] を `3.9.0` (または Node.js 12 を使用している場合は `2.22.0`) 以上のバージョンにインストールまたは更新してください。

```
npm install dd-trace@^3.9.0
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

{{% tab ".NET" %}}

<div class="alert alert-warning">
この機能を使用するには、.NET サービスの自動インスツルメンテーションが有効である必要があります。
</div>

[.NET Framework のトレース手順][1]または [.NET Core のトレース手順][2]に従って、自動インスツルメンテーションパッケージをインストールし、サービスのトレースを有効にしてください。

サポートされているクライアントライブラリ (例: `Npgsql`) を使用していることを確認します。

以下の環境変数を設定して、データベースモニタリングの伝搬機能を有効にします。
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{< /tabs >}}

## APM 接続を探る

### 呼び出した APM サービスにアクティブなデータベース接続を属性付けする

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="データベースへのアクティブな接続を、APM サービスごとに分類して表示します。">}}

特定のホストのアクティブな接続を、リクエストを行うアップストリーム APM サービス別に分解します。データベースの負荷を個々のサービスに属性付けして、どのサービスがデータベース上で最もアクティブかを理解できます。最もアクティブなアップストリームサービスのサービスページにピボットして、調査を続行します。

### クエリサンプルの関連付けられたトレースを表示する

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="検査中のクエリーサンプルが生成されたサンプル APM トレースをプレビューします。">}}

Database Monitoring で Query Sample を表示するとき、関連付けられたトレースが APM によってサンプリングされている場合、DBM Sample を APM Trace のコンテキストで表示することができます。これにより、クエリの実行計画や過去のパフォーマンスを含む DBM テレメトリーと、インフラストラクチャー内のスパンの系統を組み合わせて、データベース上の変更がアプリケーションパフォーマンスの低下の原因になっているかどうかを理解することができます。

### APM サービスのダウンストリームデータベースホストの特定

{{< img src="database_monitoring/dbm_apm_service_page_db_host_list.png" alt="サービスページから、APM サービスが依存するダウンストリームデータベースホストを視覚化します。">}}

APM サービスページで、データベースモニタリングによって特定された、サービスの直接的なダウンストリームデータベース依存を表示します。ノイズの多いネイバーが原因で負荷が不均衡になっているホストがあるかどうかを迅速に判断できます。


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