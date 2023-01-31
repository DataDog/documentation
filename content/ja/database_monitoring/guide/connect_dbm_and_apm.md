---
beta: true
kind: ガイド
private: true
title: DBM と APM の接続
---

<div class="alert alert-warning">
このページで説明されている機能はベータ版です。詳細については、カスタマーサクセスマネージャーにお問い合わせください。
</div>

このガイドでは、[Datadog Monitoring][1] を構成し、[APM][2] を使用していることを前提にしています。

## はじめに

対応トレーサー
: [dd-trace-go][3] >= 1.42.0 ([database/sql][4] および [sqlx][5] パッケージのサポート)<br />
[dd-trace-rb][6] >= 1.6.0 ([mysql2][7] および [pg][8] Gems のサポート)

対応データベース
: postgres、mysql

サポート対象の Agent バージョン
: 7.36.1+

データプライバシー
: SQL コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がアクセスすることが可能になります。

## セットアップ

{{< tabs >}}
{{% tab "Go" %}}

アプリの依存関係を更新して、[dd-trace-go@v1.42.0][1] 以上を含むようにします。
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.42.0
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
   `DD_TRACE_SQL_COMMENT_INJECTION_MODE=full`

2. ドライバー登録時にコードを使用する:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithSQLCommentInjection(tracer.SQLInjectionModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. `sqltrace.Open` のコードを使用する:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithServiceName("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithSQLCommentInjection(tracer.SQLInjectionModeFull))
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

{{< /tabs >}}

{{% tab "Ruby" %}}

Gemfile で [dd-trace-rb][1] を `1.6.0` 以上のバージョンにインストールまたはアップデートします。

```rb
source 'https://rubygems.org'
gem 'ddtrace', '>= 1.6.0'

# 使用による
gem 'mysql2'
gem 'pg'
```

以下のいずれかの方法で、データベースモニタリングの伝搬機能を有効にします。
1. 環境変数:
   `DD_DBM_PROPAGATION_MODE=service`

2. オプション `comment_propagation` (デフォルト: `ENV['DD_DBM_PROPAGATION_MODE']`)、[mysql2][2] または [pg][3] 用:
   ```rb
    Datadog.configure do |c|
        c.tracing.instrument :mysql2, comment_propagation: 'service'
        c.tracing.instrument :pg, comment_propagation: 'disabled'
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

{{< /tabs >}}

{{< /tabs >}}


[1]: /ja/database_monitoring/#getting-started
[2]: /ja/tracing/
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1
[4]: https://pkg.go.dev/database/sql
[5]: https://pkg.go.dev/github.com/jmoiron/sqlx
[6]: https://github.com/dataDog/dd-trace-rb
[7]: https://github.com/brianmario/mysql2
[8]: https://github.com/ged/ruby-pg