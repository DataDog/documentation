---
title: Can I collect SQL Server performance metrics beyond what is available in the sys.dm_os_performance_counters table? Try WMI
kind: faq
customnav: main_references
---

Our [SQL Server check](/integrations/sqlserver) is currently limited to collecting metrics from the [sys.dm_os_performance_counters table](https://github.com/DataDog/dd-agent/blob/5.9.x/conf.d/sqlserver.yaml.example#L3-L5), and by default it only collects what metrics we think are the most likely to be relevant. True, with some simple configuration, you can [extend what metrics are collected from that table](https://help.datadoghq.com/hc/en-us/articles/209280186-How-can-I-collect-more-metrics-from-my-SQL-Server-integration-), but there may be cases where you're interested in collecting more than what is available in that table at all. 

In these cases, you might consider our [WMI check](/integrations/wmi_check) as an additional source of SQL Server metrics (and if you're not familiar with the WMI check yet, you can find a great guide for implementing that [here](https://help.datadoghq.com/hc/en-us/articles/205016075-How-to-retrieve-WMI-metrics)). Some WMI classes may be available that can contain additional performance data about your SQL Server (such as [Win32_PerfFormattedData_SQLSERVERAGENT_SQLAgentJobs](http://wutils.com/wmi/root/cimv2/win32_perfformatteddata_sqlserveragent_sqlagentjobs/)), and you may be able to use our WMI check to query them for additional metric collection.

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
