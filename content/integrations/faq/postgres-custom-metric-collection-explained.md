---
title: Postgres custom metric collection explained
kind: faq
---

## Context

We use the example of a postgres "testdb" database with a dummy table "company" containing employee records (3 rows):
```
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

## From a SQL query to the YAML configuration

Goal: capture the age and salary of Paul as metric values, add his name and address as tags.

SQL query:
```
SELECT age,salary,name,address FROM company WHERE name = 'Paul'
```

We tell the `dd-agent` to capture the content of columns age and salary as metrics, and name and address as tags.

Corresponding custom metric yaml configuration:
```
- # Capture simple data
query: SELECT name, address, %s from company where name = 'Paul'; # this query is run and "%s" replaced with the parameters defined in the metrics section just below
metrics:
    age: [postgresql.employee_age, GAUGE] # the value contained in column "age" is captured and submitted as a gauge metric named "postgresql.employee.age" 
    salary: [postgresql.employee_salary, GAUGE]
relation: false #  when relation is not an empty list, it gathers per-relation metrics on top of that.
descriptors:
    - [name, name] # captures the content of the "name" column as a tag for the 2 metrics defined
    - [address, localisation] #captures the content of "address" column as a tag and renames this tag "localisation"
```
Result:
{{< img src="integrations/faq/sql_metric_explorer.png" alt="sql_metric_explorer" responsive="true" >}}

## Full postgres.yaml file with more queries

You can set up more advanced sql queries, see example below:
```yaml
init_config:

instances:
  - host: localhost
    port: 5432
    username: datadog
    password: asdlvnasljvndslv
    dbname: testdb

    custom_metrics:
    - # Capture simple data
      query: SELECT name, address, %s from company where name = 'Paul'; # this query is run and %s replaced by the parameters defined in the metrics section
      metrics:
          age: [postgresql.employee_age, GAUGE] # the value contained in column age is captured and submitted as a gauge metric named postgresql.  employee.age
          salary: [postgresql.employee_salary, GAUGE]
      relation: false
      descriptors:
          - [name, name] # captures the content of the name column as a tag for the 2 metrics defined
          - [address, localisation] # captures the content of address column as a tag and rename this tag localisation
    - # avg query
      descriptors: [] # because we don't want any tag to be captured this time
      metrics:
         avg(entry_date - last_raise_time): [postgresql.stupid_avg, GAUGE]
      query: SELECT %s FROM company WHERE id <= 2;
      relation: false
    - # Lag
      descriptors: []
      metrics:
        EXTRACT(EPOCH FROM lag): [postgres.custom_m.lag, GAUGE]
      query: SELECT %s FROM mylag LIMIT 1;
      relation: false
```

Find below an image to visualize a what's happening:

{{< img src="integrations/faq/postgres_custom_metric_collection.png" alt="postgres_custom_metric_collection" responsive="true" >}}
