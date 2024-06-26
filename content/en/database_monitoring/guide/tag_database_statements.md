---
title: Tagging SQL Statements
kind: guide
---

This guide assumes that you have configured [Database Monitoring][1].

[Datadog Database Monitoring (DBM)][1] allows you to view explain plans and query samples running on your database hosts. This guide shows you how to add tags as SQL comments to your database queries, which can then be surfaced and leveraged in DBM.

## Before you begin

Supported databases
: Postgres, MySQL, SQL Server

Supported Agent versions
: 7.36.1+

Supported tagging formats
: [sqlcommenter][2], [marginalia][3]


## Manual tag injection
Using any database API supporting execution of SQL statements, add a comment in your statement with tags formatted as per the [sqlcommenter][2] or [marginalia][3] formats.

```sql
/*key='val'*/ SELECT * from FOO
```

Separate multiple tags with commas:
```sql
/*key1='val1',key2='val2'*/ SELECT * from FOO
```

Full example:
```go
import (
	"database/sql"		
)

func main() {	
	db, err := sql.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

	// Tag SQL statement with key:val
	rows, err := db.Query("/*key='val'*/ SELECT * from FOO")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
}
```

## Explore the tags in DBM

On the [Samples page][4], filter the **Explain Plans** and **Query Samples** views by custom tag.

{{< img src="database_monitoring/dbm_filter_explain_plans_by_custom_tag.png" alt="Filter explain plans by custom tag.">}}

You can also view a timeseries of explain plan costs filtered by tag.

{{< img src="database_monitoring/dbm_timeseries_by_custom_tag.png" alt="Explain plan cost by custom tag.">}}

When you select a query, the custom tags are shown on the **Sample Details** page under Propagated Tags.

{{< img src="database_monitoring/dbm_explain_plan_with_custom_tags.png" alt="View custom tags on explain plans.">}}

[1]: /database_monitoring/#getting-started
[2]: https://google.github.io/sqlcommenter
[3]: https://github.com/basecamp/marginalia
[4]: https://app.datadoghq.com/databases/samples
