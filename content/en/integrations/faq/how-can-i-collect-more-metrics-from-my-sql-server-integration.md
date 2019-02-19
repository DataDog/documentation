---
title: How can I collect more metrics from my SQL Server integration?
kind: faq
---

## Answer

By default, the SQL Server integration only collects [the metrics listed in the documentation page][1]. But you can collect additional metrics from your SQL Server integration by configuring your `sqlserver.d/conf.yaml` following [the syntax in our example file][2] (these goes under "init_config").

Note that, at this time, our sqlserver check only queries data from the [sys.dm_os_performance_counters][3] table (although you can [use WMI to expose metrics][4] from other counter tables). So the trick to collecting specific is to find which counter_name and (if appropriate) instance_name correspond to the kind of metric you're interested in collecting. To get a list of what count_names are available in that table in your SQL Server, once you access your server from [powershell's sqlcmd][5], you can run the following or similar query (just know that it gives you a very long list indeed):
```
1> SELECT counter_name, instance_name, cntr_value, cntr_type FROM sys.dm_os_performance_counters;
2> go
```

From there you can pick out the counter_names that are most interesting to you, add them to your custom metric section of the sqlserver.yaml in the "counter_name" options, and give your metric an appropriate name in the "- name:" options (you may want to start them with "sqlserver." like all the other sqlserver metrics).

## Example:

An example of what your `sqlserver.d/conf.yaml` might look like if you wanted to collect metrics for the CLR Execution, Queued requests, and Active requests properties is as follows:
```yaml
init_config:

  custom_metrics:

    - name: sqlserver.clr.execution
      counter_name: CLR Execution
    - name: sqlserver.requests.queued
      counter_name: Queued requests
      instance_name: internal
    - name: sqlserver.requests.active
      counter_name: Active requests
      instance_name: internal

instances:
  - host: 127.0.0.1,1433
    username: datadog
    password: *******
    tags:
      - test:sqlserver
```

[1]: /integrations/sqlserver
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://msdn.microsoft.com/en-us/library/ms187743.aspx
[4]: /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[5]: https://msdn.microsoft.com/en-us/library/ms188247.aspx
