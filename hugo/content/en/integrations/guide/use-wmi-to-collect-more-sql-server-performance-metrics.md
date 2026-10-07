---
title: Use WMI to Collect More SQL Server Performance Metrics

aliases:
    - /integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
---

Our [SQL Server check][1] is limited to collecting metrics from the [sys.dm_os_performance_counters table][2], and by default it only collects the metrics that Datadog believes are most likely to be relevant. With some simple configurations, you can [extend what metrics are collected from that table][3], but there may be cases where you're interested in collecting more than what is available in that table at all.

In these cases, you might consider our [WMI check][4] as an additional source of SQL Server metrics (and if you're not familiar with the WMI check yet, see the [retrieving WMI metrics guide][5]). Some WMI classes may be available that can contain additional performance data about your SQL Server (such as [Win32_PerfFormattedData_SQLSERVERAGENT_SQLAgentJobs][6]), and you may be able to use our WMI check to query them for additional metric collection.

For example, we've had some users employ our WMI check with the following configuration to collect a gauge metric for the number of failed jobs in their SQL Server:

```yaml
init_config: 

instances: 
    - class: Win32_PerfRawData_SQLSERVERAGENT_SQLAgentJobs
      metrics:
        - [Failedjobs, sqlserver.failed_jobs, gauge]
      filters:
        - Name: _Total
      tag_by: Name
```

[1]: /integrations/sqlserver/
[2]: https://github.com/DataDog/dd-agent/blob/5.9.x/conf.d/sqlserver.yaml.example#L3-L5
[3]: /integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: /integrations/wmi_check/
[5]: /integrations/guide/retrieving-wmi-metrics/
[6]: http://wutils.com/wmi/root/cimv2/win32_perfformatteddata_sqlserveragent_sqlagentjobs
