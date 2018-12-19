---
title: How to collect metrics with a SQL Stored Procedure?
kind: faq
further_reading:
- link: "https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics"
  tag: "Blog"
  text: "Create a stored procedure to generate and collect metrics"
- link: "integrations/mysql/"
  tag: "Documentation"
  text: "Datadog-MySQL integration"
---

## Setup a Stored Procedure

A temporary table must be setup to collect the custom metrics for reporting to Datadog. The table needs the following columns:

| Column | Description                                                                                                                 |
| -----  | ----                                                                                                                        |
| metric | The name of the metric as it appears in Datadog.                                                                            |
| type   | The [metric type][1] (gauge, rate, or [histogram][2]). |
| value  | The value of the metric (must be convertible to a float).                                                                   |
| tags   | The tags that appear in Datadog separated by a comma.                                                                  |

The following stored procedure is created within the master database:

```
-- Create a stored procedure with the name TestProc1
CREATE PROCEDURE [dbo].[TestProc1]
AS
BEGIN

  -- Create a temporary table per integration instructions
  CREATE TABLE #DataDog
  (
    [metric] varchar(255) not null,
    [type] varchar(50) not null,
    [value] float not null,
    [tags] varchar(255)
  )

  -- Remove row counts from result sets
  SET NOCOUNT ON;

  -- Create variable count and set it equal to the number of User Connections
  DECLARE @count float;
  SET @count = (select cntr_value from sys.dm_os_performance_counters where counter_name = 'User Connections');

  -- Insert custom metrics into the table #Datadog
  INSERT INTO #Datadog (metric, type, value, tags)
  VALUES ('sql.test.test', 'gauge', @count, 'db:master,env:staging')
        ,('sql.test.gauge', 'gauge', FLOOR(RAND()*20), 'tag:test')
        ,('sql.test.rate', 'rate', FLOOR(RAND()*20), 'metric:gauge')
        ,('sql.test.histogram', 'histogram', FLOOR(RAND()*20), 'metric:histogram')
  SELECT * from #DataDog
END
GO

-- Grant permission to run the stored procedure
GRANT EXECUTE ON [dbo].[TestProc1] To Public
GO
```

The stored procedure outputs the following custom metrics:

- `sql.test.test`
- `sql.test.gauge`
- `sql.test.rate`
- `sql.test.histogram.95percentile`
- `sql.test.histogram.avg`
- `sql.test.histogram.count`
- `sql.test.histogram.max`
- `sql.test.histogram.median`

## Update the SQL Server integration configuration

Configure the Datadog Agent to run the stored procedure by updating the [SQL YAML file][3].

**Note**: The stored procedure must be defined in its own instance as seen below:

```
# ...
  - host: 127.0.0.1,1433
    username: datadog
    password: <PASSWORD>
    stored_procedure: TestProc1
    database: master
# ...
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/#metric-types
[2]: /developers/metrics/histograms
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
