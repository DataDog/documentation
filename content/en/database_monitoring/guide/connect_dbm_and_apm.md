---
title: Connecting DBM and APM
kind: guide
beta: true
private: true
---

<div class="alert alert-warning">
The features discussed on this page are in private beta. Contact your Customer Success Manager to learn more about it.
</div>

This guide assumes that you have configured [Datadog Monitoring][1] and are using [APM][2].

## Before you begin

Supported tracers
: [dd-trace-go][3] >= 1.42.0 (support for [database/sql][4] and [sqlx][5] packages)

Supported databases
: postgres, mysql

Supported Agent versions
: 7.36.1+

Data privacy
: Enabling sql comment propagation results in potentially confidential data (service names) being stored in the databases which can then be accessed by other 3rd parties that have been granted access to the database.

## Setup

{{< tabs >}}
{{% tab "Go" %}}

Update your app dependencies to include dd-trace-go@v1.42.0 or greater
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.42.0
```

Update your code to import the `contrib/database/sql` package
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)
```

Enable the dbm propagation feature using one of the 3 methods:
1. Env variable: 
DD_TRACE_SQL_COMMENT_INJECTION_MODE=full

2. Via code during the driver registration
```go
sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithSQLCommentInjection(tracer.SQLInjectionModeFull), sqltrace.WithServiceName("my-db-service"))
```

3. Via code on sql.Open
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
{{% /tab %}}

[1]: /database_monitoring/#getting-started
[2]: /tracing/
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1
[4]: https://pkg.go.dev/database/sql
[5]: https://pkg.go.dev/github.com/jmoiron/sqlx