---
title: Connecting DBM and APM
kind: guide
beta: true
private: true
---

<div class="alert alert-warning">
The features described on this page are in beta. Contact your Customer Success Manager to learn more about them.
</div>

This guide assumes that you have configured [Datadog Monitoring][1] and are using [APM][2].

## Before you begin

Supported tracers
: [dd-trace-go][3] >= 1.42.0 (support for [database/sql][4] and [sqlx][5] packages)
: [dd-trace-rb][6] >= 1.6.0 (support for [mysql2][7] and [ruby-pg][8] gems)

Supported databases
: postgres, mysql

Supported Agent versions
: 7.36.1+

Data privacy
: Enabling SQL comment propagation results in potentially confidential data (service names) being stored in the databases which can then be accessed by other third-parties that have been granted access to the database.

## Setup

{{< tabs >}}
{{% tab "Go" %}}

Update your app dependencies to include [dd-trace-go@v1.42.0][1] or greater:
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.42.0
```

Update your code to import the `contrib/database/sql` package:
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)
```

Enable the database monitoring propagation feature using one of the following methods:
1. Env variable: 
   `DD_TRACE_SQL_COMMENT_INJECTION_MODE=full`

2. Using code during the driver registration:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithSQLCommentInjection(tracer.SQLInjectionModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. Using code on `sqltrace.Open`:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithServiceName("my-db-service"))
   
   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithSQLCommentInjection(tracer.SQLInjectionModeFull))
   if err != nil {
	   log.Fatal(err)
   }
   ```

Full example:
```go
import (
	"database/sql"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
	sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
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

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1

{{% /tab %}}

{{% tab "Ruby" %}}

Update your app dependencies to include [dd-trace-rb 1.6.0][1] or greater:
```
<TODO>
```

Enable the database monitoring propagation feature using one of the following methods:
1. Env variable: 
   `DD_DBM_PROPAGATION_MODE=service`

2. Using code during the driver configuration:
   ```rb
	Datadog.configure do |c|
    	c.tracing.sql_comment_propagation = 'full'
		c.tracing.instrument :mysql2, **options
	end
   ```

Full example:
```rb
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
	c.tracing.sql_comment_propagation = 'full'
	c.tracing.instrument :mysql2, **options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

[1]: https://github.com/dataDog/dd-trace-rb

{{% /tab %}}

{{< /tabs >}}


[1]: /database_monitoring/#getting-started
[2]: /tracing/
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1
[4]: https://pkg.go.dev/database/sql
[5]: https://pkg.go.dev/github.com/jmoiron/sqlx
[6]: https://github.com/dataDog/dd-trace-rb
[7]: https://github.com/brianmario/mysql2
[8]: https://github.com/ged/ruby-pg