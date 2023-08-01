---
title: Tagging SQL Statements
kind: guide
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

This guide assumes that you have configured [Database Monitoring][1].

[Datadog Database Monitoring (DBM)][1] allows you to view explain plans and query samples running on your database hosts. This guide shows you how to add tags as SQL comments to your database queries, which can then be surfaced and leveraged in DBM.

## Before you begin

Supported databases
: postgres, mysql, sqlserver

Supported Agent versions
: 7.36.1+


## Manual tag injection
Using any database API supporting execution of SQL statements, add a comment in your statement with tags formatted as `<YOUR_KEY>:'<YOUR_VALUE>'`. The value must be in quotes.

```sql
/*key='val'*/ SELECT * from FOO
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

	// Tag SQL statement with key:'val'
	rows, err := db.Query("/*key='val'*/ SELECT * from FOO")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
}
```

## Explore the tags in DBM

On the [**DBM > Samples**][4] page, filter the **Explain Plans** and **Query Samples** views by custom tag.

{{< img src="database_monitoring/dbm_filter_explain_plans_by_custom_tag.png" alt="Filter explain plans by custom tag.">}}

You can also view a timeseries of explain plan costs filtered by tag.

{{< img src="database_monitoring/dbm_timeseries_by_custom_tag.png" alt="Explain plan cost by custom tag.">}}

When you select a query, the custom tags are shown on the **Sample Details** page under Propagated Tags.

{{< img src="database_monitoring/dbm_explain_plan_with_custom_tags.png" alt="View custom tags on explain plans.">}}

[1]: /database_monitoring/#getting-started
[4]: /database_monitoring/query_samples/