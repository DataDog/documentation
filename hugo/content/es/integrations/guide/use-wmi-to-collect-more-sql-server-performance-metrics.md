---
aliases:
- /es/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
title: Uso de WMI para recopilar más métricas de rendimiento de SQL Server
---

Nuestro [check de SQL Server][1] se limita a recopilar métricas de la [tabla sys.dm_os_performance_counters][2] y, por defecto, sólo recopila las métricas que Datadog considera más relevantes. Con algunas configuraciones sencillas, puedes [ampliar qué métricas se recopilan de esa tabla][3], pero puede haber casos en los que te interese recopilar más de lo que está disponible en esa tabla en absoluto.

En estos casos, podrías considerar nuestro [check de WMI][4] como una fuente adicional de métricas de SQL Server (y si aún no estás familiarizado con el check de WMI, consulta la [guía de recuperación de métricas de WMI][5]). Pueden haber disponibles algunas clases de WMI que pueden contener datos de rendimiento adicionales acerca de tu SQL Server (como [Win32_PerfFormattedData_SQLSERVERAGENT_SQLAgentJobs][6]), y puedes utilizar nuestro check de WMI para consultarlos para obtener una recopilación de métricas adicional.

Por ejemplo, hemos tenido algunos usuarios que emplean nuestro check de WMI con la siguiente configuración para recopilar una métrica gauge para el número de trabajos fallidos en tu SQL Server:

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

[1]: /es/integrations/sqlserver/
[2]: https://github.com/DataDog/dd-agent/blob/5.9.x/conf.d/sqlserver.yaml.example#L3-L5
[3]: /es/integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: /es/integrations/wmi_check/
[5]: /es/integrations/guide/retrieving-wmi-metrics/
[6]: http://wutils.com/wmi/root/cimv2/win32_perfformatteddata_sqlserveragent_sqlagentjobs