---
aliases:
- /ko/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
title: WMI로 더 많은 SQL Server 성능 메트릭 수집
---

[SQL Server 점검][1]은 [sys.dm_os_performance_counters 테이블][2]에서만 메트릭을 수집하며, 기본적으로 가장 관련이 높은 메트릭만 수집합니다. 몇 가지 간단한 구성으로 [해당 테이블에서 수집하는 메트릭을 확장][3]할 수 있지만, 테이블에 없는 메트릭을 수집하려는 경우도 있을 것입니다.

이러한 경우, SQL Server 메트릭의 추가 소스로 [WMI 점검][4]을 사용할 수 있습니다(WMI 점검이 처음이라면 [WMI 메트릭 수집 가이드][5] 참고). 일부 WMI 클래스(예: [Win32_PerfFormattedData_SQLSERVERAGENT_SQLAgentJobs][6])는 SQL Server의 추가 성능 데이터를 포함할 수 있으며, WMI 점검으로 해당 클래스를 쿼리하고 메트릭을 추가로 수집할 수 있습니다. 

예를 들어, 일부 사용자는 아래와 같이 WMI 점검을 구성해 SQL Server의 실패한 작업 수에의 게이지 메트릭을 수집한 경우가 있습니다.

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

[1]: /ko/integrations/sqlserver/
[2]: https://github.com/DataDog/dd-agent/blob/5.9.x/conf.d/sqlserver.yaml.example#L3-L5
[3]: /ko/integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: /ko/integrations/wmi_check/
[5]: /ko/integrations/guide/retrieving-wmi-metrics/
[6]: http://wutils.com/wmi/root/cimv2/win32_perfformatteddata_sqlserveragent_sqlagentjobs