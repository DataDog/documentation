---
aliases:
- /es/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
title: Recopilar más métricas de la integración de SQL Server
---

## Información general

Por defecto, la integración de SQL Server sólo recopila [las métricas enumeradas en la página de documentación][1]. Pero puedes recopilar métricas adicionales de tu integración de SQL Server configurando tu `sqlserver.d/conf.yaml` siguiendo [la sintaxis de nuestro archivo de ejemplo][2] (esto va en "init_config").

En este momento, el check de Datadog sqlserver sólo consulta datos de la tabla [sys.dm_os_performance_counters][3], aunque puedes [utilizar WMI para exponer métricas][4] de otras tablas de contador. Para recopilar datos específicos, busca `counter_name` y, si corresponde, `instance_name` para que se correspondan con la métrica que te interese recopilar. Una vez que accedas a tu servidor desde [sqlcmd de powershell][5], ejecuta la siguiente consulta o una similar para obtener una lista de qué `count_names` están disponibles en esa tabla de tu SQL Server. 

**Nota**: Esto devuelve una lista larga.

```text
1> SELECT counter_name, instance_name, cntr_value, cntr_type FROM sys.dm_os_performance_counters;
2> go
```

A partir de ahí, puedes elegir los counter_names que más te interesen, añadirlos a tu sección de métrica personalizada de sqlserver.yaml en las opciones "counter_name" y dar a tu métrica un nombre apropiado en las opciones "- name:" (puedes empezar con "sqlserver." como el resto de las métricas de sqlserver).

## Ejemplo

Un ejemplo de lo que podría ser tu `sqlserver.d/conf.yaml` si quisieras recopilar métricas para las propiedades CLR Execution, Queued requests y Active requests es el siguiente:

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

[1]: /es/integrations/sqlserver/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://msdn.microsoft.com/en-us/library/ms187743.aspx
[4]: /es/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/
[5]: https://msdn.microsoft.com/en-us/library/ms188247.aspx