---
title: Connecting DBM and APM
kind: guide
beta: true
private: true
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-warning">
The features described on this page are in beta. Contact your Customer Success Manager to learn more about them.
</div>

This guide assumes that you have configured [Datadog Monitoring][1] and are using [APM][2].

## Before you begin

Supported tracers
: [dd-trace-go][3] >= 1.44.0 (support for [database/sql][4] and [sqlx][5] packages)<br />
[dd-trace-rb][6] >= 1.6.0 (support for [mysql2][7] and [pg][8] gems)<br />
[dd-trace-js][9] >= 3.9.0 or >= 2.22.0 (support for [postgres client][10])<br />
[dd-trace-py][11] >= 1.7.0 (support for [psycopg2][12])

Supported databases
: postgres, mysql

Supported Agent versions
: 7.36.1+

Data privacy
: Enabling SQL comment propagation results in potentially confidential data (service names) being stored in the databases which can then be accessed by other third-parties that have been granted access to the database.

## Setup

{{< tabs >}}
{{% tab "Go" %}}

Update your app dependencies to include [dd-trace-go@v1.44.0][1] or greater:
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.44.0
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
   `DD_DBM_PROPAGATION_MODE=full`

2. Using code during the driver registration:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. Using code on `sqltrace.Open`:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithServiceName("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
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

In your Gemfile, install or udpate [dd-trace-rb][1] to version greater than `1.6.0`:

```rb
source 'https://rubygems.org'
gem 'ddtrace', '>= 1.6.0'

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

Enable the database monitoring propagation feature using one of the following methods:
1. Env variable:
   `DD_DBM_PROPAGATION_MODE=service`

2. Option `comment_propagation` (default: `ENV['DD_DBM_PROPAGATION_MODE']`), for [mysql2][2] or [pg][3]:
   ```rb
	Datadog.configure do |c|
		c.tracing.instrument :mysql2, comment_propagation: 'service'
		c.tracing.instrument :pg, comment_propagation: 'disabled'
	end
   ```

Full example:
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

Update your app dependencies to include [dd-trace-py>=1.7.0][1]:
```
pip install "ddtrace>=1.7.0"
```

Install [psycopg2][2] (**Note**: Connecting DBM and APM is not supported for MySQL clients):
```
pip install psycopg2
```

Enable the database monitoring propagation feature by setting the following environment variable:
   - `DD_TRACE_SQL_COMMENT_INJECTION_MODE=full`

For the best user experience ensure the following environment variables are set in your application:
   - `DD_SERVICE=(application name)`
   - `DD_ENV=(application environment)`
   - `DD_VERSION=(application version)`

Full example:
```python

import psycopg2

#TODO: update postgres configurations
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

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab "Node.js" %}}

Install or udpate [dd-trace-js][1] to version greater than `3.9.0` (or `2.22.0` if using end-of-life Node.js version 12):

```
npm install dd-trace@^3.9.0
```

Update your code to import and initialize the tracer:
```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

Enable the database monitoring propagation feature using one of the following methods:
1. Env variable:
   `DD_DBM_PROPAGATION_MODE=full`

2. Option `dbmPropagationMode` (default: `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```javascript
   tracer.use('pg', { dbmPropagationMode: 'full', service: 'my-db-service' })
   ```

Full example:
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
	// handle result
})
```

[1]: https://github.com/DataDog/dd-trace-js

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
[9]: https://github.com/DataDog/dd-trace-js
[10]: https://node-postgres.com/
[11]: https://github.com/DataDog/dd-trace-py
[12]: https://www.psycopg.org/docs/index.html
