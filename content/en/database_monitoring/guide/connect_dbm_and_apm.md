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
The features described on this page are in beta. Contact your Customer Success Manager to learn more.
</div>

This guide assumes that you have configured [Database Monitoring][1] and are using [APM][2]. Connecting APM and DBM injects APM trace identifiers into DBM data collection, which allows for correlation of these two data sources. This enables product features showing database information in the APM product, and APM data in the DBM product.

## Before you begin

Supported databases
: postgres, mysql

Supported Agent versions
: 7.36.1+

Data privacy
: Enabling SQL comment propagation results in potentially confidential data (service names) being stored in the databases which can then be accessed by other third-parties that have been granted access to the database.


**Supported tracers**

| Language                                 | Library or Framework | Postgres  |   MySQL   |
|:-----------------------------------------|:---------------------|:---------:|:---------:|
| **Go:** [dd-trace-go][3] >= 1.44.0       |                      |           |           |
|                                          | [database/sql][4]    | {{< X >}} | {{< X >}} |
|                                          | [sqlx][5]            | {{< X >}} | {{< X >}} |
| **Java** [dd-trace-java][23] >= 1.11.0   |                      |           |           |
|                                          | [jdbc][22]           | {{< X >}} | {{< X >}} |
| **Ruby:** [dd-trace-rb][6] >= 1.8.0      |                      |           |           |
|                                          | [pg][8]              | {{< X >}} |           |
|                                          | [mysql2][7]          |           | {{< X >}} |
| **Python:** [dd-trace-py][11] >= 1.9.0   |                      |           |           |
|                                          | [psycopg2][12]       | {{< X >}} |           |
| **.NET** [dd-trace-dotnet][15] >= 2.26.0 ||                      |           |
|                                          | [Npgsql][16]         | {{< X >}} |           |
|                                          | [MySql.Data][17]     |           | {{< X >}} |
|                                          | [MySqlConnector][18] |           | {{< X >}} |
| **PHP**  [dd-trace-php][19] >= 0.86.0    |                      |           |
|                                          | [pdo][20]            | {{< X >}} | {{< X >}} |
|                                          | [MySQLi][21]         |           | {{< X >}} |
| **Node:** [dd-trace-js][9] >= 3.13.0     |                      |           |           |
|                                          | [postgres][10]       |   Alpha   |           |
|                                          | [mysql][13]          |           |   Alpha   |
|                                          | [mysql2][14]         |           |   Alpha   |




## Setup
For the best user experience, ensure the following environment variables are set in your application:

```
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

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

{{% tab "Java" %}}

Follow the [Java tracing][1] instrumentation instructions and install the `1.11.0` version, or greater, of the Agent.

You must also enable the `jdbc-datastore` [instrumentation][2].

Enable the database monitoring propagation feature using **one** of the following methods:

- Set the system property `dd.dbm.propagation.mode=full`
- Set the environment variable `DD_DBM_PROPAGATION_MODE=full`

Full example:
```
# Start the Java Agent with the required system properties
java -javaagent:/path/to/dd-java-agent.jar -Ddd.dbm.propagation.mode=full -Ddd.integration.jdbc-datasource.enabled=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
```

Test the feature in your application:
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

[1]: /tracing/trace_collection/dd_libraries/java/
[2]: /tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

In your Gemfile, install or update [dd-trace-rb][1] to version `1.8.0` or greater:

```rb
source 'https://rubygems.org'
gem 'ddtrace', '>= 1.8.0'

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

Enable the database monitoring propagation feature using one of the following methods:
1. Env variable:
   `DD_DBM_PROPAGATION_MODE=full`

2. Option `comment_propagation` (default: `ENV['DD_DBM_PROPAGATION_MODE']`), for [mysql2][2] or [pg][3]:
   ```rb
	Datadog.configure do |c|
		c.tracing.instrument :mysql2, comment_propagation: 'full'
		c.tracing.instrument :pg, comment_propagation: 'full'
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
   - `DD_DBM_PROPAGATION_MODE=full`

Full example:
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

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-warning">
Node is in alpha release and may be unstable.
</div>

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

{{% tab ".NET" %}}

<div class="alert alert-warning">
This features requires automatic instrumentation to be enabled for your .NET service.
</div>

Follow the [.NET Framework tracing instructions][1] or the [.NET Core tracing instructions][2] to install the automatic instrumentation package and enable tracing for your service.

Ensure that you are using a supported client library (e.g. `Npgsql`).

Enable the database monitoring propagation feature by setting the following environment variable:
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: /tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-warning">
This features requires the tracer extension to be enabled for your PHP service.
</div>

Follow the [PHP tracing instructions][1] to install the automatic instrumentation package and enable tracing for your service.

Ensure that you are using a supported client library. For example, `PDO`.

Enable the database monitoring propagation feature by setting the following environment variable:
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{< /tabs >}}

## Explore the APM Connection in DBM

### Attribute active database connections to the calling APM services

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="View active connections to a database broken down by the APM Service they originate from.">}}

Break down active connections for a given host by the upstream APM services making the requests. You can attribute load on a database to individual services to understand which services are most active on the database. Pivot to the most active upstream service’s service page to continue the investigation.

### Filter the Databases List for specific APM calling services.

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filter the Databases List for specific APM calling services.">}}

### View the associated trace for a query sample

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="Preview the sampled APM trace that the query sample being inspected was generated from.">}}

When viewing a Query Sample in Database Monitoring, if the associated trace has been sampled by APM, you can view the DBM Sample in the context of the APM Trace. This allows you to combine DBM telemetry, including the explain plan and historical performance of the query, alongside the lineage of the span within your infrastructure to understand if a change on the database is responsible for poor application performance.

## Explore the DBM Connection in APM

### Visualize the downstream database hosts of APM services

{{< img src="database_monitoring/dbm_apm_service_page_db_host_list.png" alt="Visualize the downstream database hosts that your APM Services depend on from the Service Page.">}}

On the APM Service Page, view the direct downstream database dependencies of the service as identified by Database Monitoring. Quickly determine if any hosts have disproportionate load that may be caused by noisy neighbors.

### Identify inefficiencies using explain plans for database queries in traces 

{{< img src="database_monitoring/dbm_explain_plans_in_traces.png" alt="Identify inefficiencies using explain plans for database queries within traces.">}}

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
