---
title: How to collect metrics with a SQL Stored Procedure
kind: faq
---

### Setup a Stored Procedure
A temporary table must be setup to collect the custom metrics for reporting to Datadog. The table needs following columns:

- metric: the name of the metric as it appears in Datadog
- type: the [metric type](/developers/metrics/#metric-types) (gauge, rate, count, or [histogram](/developers/metrics/histograms/))
- value: the value of the metric (must be convertible to a float)
- tags: the tags that will appear in Datadog separated by a comma

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

### Update the SQL settings file

Configure the Datadog agent to run the stored procedure by updating the [sql yaml file](https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example):

```
# ...
  - host: 127.0.0.1,1433
    username: datadog
    password: <password>
    stored_procedure: TestProc1
    database: master
# ...
```

## Further Reading
-------------------
- [Create a stored procedure to generate and collect metrics](https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics)
