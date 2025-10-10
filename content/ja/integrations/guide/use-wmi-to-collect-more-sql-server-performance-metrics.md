---
aliases:
- /ja/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
title: WMI を使用して、より多くの SQL Server パフォーマンスメトリクスを収集する
---

Datadog の [SQL Server チェック][1]は、[sys.dm_os_performance_counters テーブル][2]からメトリクスを収集することに限定されています。デフォルトでは、Datadog が関連性が高いと考えるメトリクスのみを収集します。簡単な設定を行えば、[このテーブルから収集するメトリクスを拡張][3]できますが、場合によってはそのテーブルに存在しないものも含め、さらに多くのメトリクスを収集したいケースがあるかもしれません。

そのような場合には、SQL Server の追加のメトリクスソースとして [WMI チェック][4]を検討してみてください (WMI チェックにまだ詳しくない方は、[WMI メトリクスを取得する方法][5]をご参照ください)。いくつかの WMI クラス (たとえば [Win32_PerfFormattedData_SQLSERVERAGENT_SQLAgentJobs][6] など) を使用すると、SQL Server に関する追加のパフォーマンスデータを取得できる可能性があります。これらを WMI チェックでクエリし、追加のメトリクスを収集することができるかもしれません。

たとえば、一部のユーザーは WMI チェックを以下のように設定し、SQL Server のジョブ失敗数をゲージメトリクスとして収集しています。

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

[1]: /ja/integrations/sqlserver/
[2]: https://github.com/DataDog/dd-agent/blob/5.9.x/conf.d/sqlserver.yaml.example#L3-L5
[3]: /ja/integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: /ja/integrations/wmi_check/
[5]: /ja/integrations/guide/retrieving-wmi-metrics/
[6]: http://wutils.com/wmi/root/cimv2/win32_perfformatteddata_sqlserveragent_sqlagentjobs