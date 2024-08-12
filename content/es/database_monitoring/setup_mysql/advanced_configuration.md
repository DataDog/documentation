---
description: Configuración avanzada de la monitorización de bases de datos MySQL
title: Configuración avanzada de la monitorización de bases de datos MySQL
---

## Truncar `events_statements_summary_by_digest`

Determinadas cargas de trabajo requieren cierto mantenimiento en las tablas de `performance_schema`. Las estadísticas de consulta se agregan en la tabla `performance_schema.events_statements_summary_by_digest`, que tiene un límite en el número de filas. Este límite se especifica mediante la [variable de sistema `performance_schema_digests_size`][1]. Si la tabla está llena, los nuevos compendios de consulta se rastrean en una fila comodín con esquema nulo y compendio de consulta nulo, lo que impide que el Agent distinga entre las consultas que componen esa fila.

Para evitar esta pérdida de precisión por métricas de consulta, trunca periódicamente esta tabla como paso de mantenimiento para poder recopilar todas las consultas nuevas:

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

Para determinar la frecuencia de truncamiento, ejecuta la siguiente consulta para determinar el número de sentencias enviadas a esta fila comodín por segundo. Un valor superior a cero significa que la tabla está llena y debe truncarse.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## Manejo de muchas tablas idénticas

Particionar la base de datos en tablas, de forma que las definiciones de las tablas sean idénticas salvo por el nombre, puede dar lugar a un gran número de consultas normalizadas:

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

En este casos, realiza el seguimiento de estas consultas como una única consulta normalizada utilizando la opción `replace_digits`, de modo que todas las métricas de esas consultas se agrupen en una única consulta:

```sql
SELECT * FROM daily_aggregates_?
```

Añade la opción `replace_digits` a la configuración de tu instancia de base de datos en el Datadog Agent:

```yaml
init_config:

instances:
  - dbm: true
    ...
    replace_digits: true
```

## Aumento de la frecuencia de muestreo

Si tienes consultas relativamente poco frecuentes o que se ejecutan con rapidez, aumenta la frecuencia de muestreo reduciendo el valor de `collection_interval` para recopilar muestras con mayor frecuencia.

Establece el `collection_interval` en la configuración de tu instancia de base de datos del Datadog Agent . El valor por defecto es 1. Reduce el valor a un intervalo menor:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-system-variables.html#sysvar_performance_schema_digests_size