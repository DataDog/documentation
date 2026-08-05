---
aliases:
- /es/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
further_reading:
- link: /integrations/mysql
  tag: Documentación
  text: Integración Datadog MySQL
title: Consultas personalizadas de MySQL
---

La integración Datadog MySQL puede recopilar métricas de consultas personalizadas.

## Configuración

Sigue las instrucciones de configuración en el archivo [conf.yaml de MySQL][1]. A continuación se indican otros elementos a tener en cuenta.

### Cualificar tu base de datos

Cuando se añade una consulta personalizada al [conf.yaml de MySQL][1], cada tabla citada debe tener la base de datos cualificada. Esto se hace anteponiendo a la tabla su nombre de base de datos con el siguiente formato:

```sql
SELECT * FROM database_name.table_name WHERE...
```

Si omites el nombre de la base de datos, el Agent no podrá ejecutar la consulta con el error: `No database selected`.

### Nombrar tu métrica

Los nombres aplicados a tus métricas de consulta se interpretan tal y como se proporcionan (no hay prefijos). Por ejemplo, tu nombre de métrica podría ser: `myapp.custom_query.test`.

### Frecuencia de recopilación

Por defecto, tus métricas son recopiladas por el check de MySQL cada 15-20 segundos. Para consultar estas métricas con una frecuencia diferente, reduce la frecuencia de todo el check de MySQL (esto afecta a la frecuencia de tus métricas `mysql.*` generales) o ejecuta un script CRON programado personalizado para enviar métricas con la [API][2] o [DogStatsD][3].

### Número de consultas personalizadas

La ejecución de un gran número de consultas personalizadas desde el check de MySQL puede retrasar otros checks del Agent. Si necesitas recopilar métricas de un gran número de consultas personalizadas de MySQL, ejecuta un script CRON programado personalizado para enviar métricas con la [API][2] o [DogStatsD][3].

## Ejemplo

Tienes una base de datos llamada `tester` con la tabla `test_table` que contiene los siguientes datos:

```text
col_1 | col_2 | col_3
---------------------
1     | a     | a
2     | b     | b
3     | c     | c
```

Si añades la siguiente consulta personalizada a tu MySQL `conf.yaml` recopilará la métrica `myapp.custom_query.test.b` con un valor de `2`.

```yaml
    custom_queries:
      - query: SELECT col_1 FROM tester.test_table WHERE col_2 = 'b'
        columns:
        - name: myapp.custom_query.test.b
          type: gauge
        tags:
        - tester:mysql
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[2]: /es/api/
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/