---
description: Configuración avanzada para Database Monitoring de MariaDB
title: Configuración avanzada para Database Monitoring de MariaDB
---
## Truncando `events_statements_summary_by_digest` {#truncating-events-statements-summary-by-digest}

Ciertas cargas de trabajo requieren algo de mantenimiento en las tablas en `performance_schema`. Las estadísticas de consultas se agregan en la tabla `performance_schema.events_statements_summary_by_digest`, la cual tiene un límite en la cantidad de filas. Este límite se especifica mediante la [`performance_schema_digests_size`variable de sistema][1]. Si la tabla está llena, los nuevos resúmenes de consultas se rastrean en una fila general con esquema nulo y resumen de consulta nulo, lo que impide que el Agent distinga entre las consultas que conforman esa fila.

Para evitar esta pérdida de métricas precisas por consulta, trunque periódicamente esta tabla como un paso de mantenimiento para que todas las consultas nuevas puedan ser recopiladas:

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

Para determinar la frecuencia de truncamiento, ejecute la consulta a continuación para determinar la cantidad de sentencias enviadas a esta fila general por segundo. Un valor mayor que cero significa que la tabla está llena y debe truncarse.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## Manejo de muchas tablas idénticas {#handling-many-identical-tables}

Particionar su base de datos en tablas, de tal manera que las definiciones de las tablas sean idénticas excepto por el nombre, puede resultar en una gran cantidad de consultas normalizadas:

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

En estos casos, rastree estas consultas como una sola consulta normalizada usando la opción `replace_digits`, para que todas las métricas de esas consultas se agrupen en una sola consulta. Esto reduce la cantidad de consultas normalizadas distintas contabilizadas en su cuota de DBM y no afecta los límites de resumen en el lado del esquema de rendimiento de MariaDB:

```sql
SELECT * FROM daily_aggregates_?
```

Agregue la opción `replace_digits` bajo `obfuscator_options` en la configuración de su instancia de base de datos en el Datadog Agent:

```yaml
init_config:

instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## Aumento de la tasa de muestreo {#raising-the-sampling-rate}

Si tiene consultas que son relativamente poco frecuentes o que se ejecutan rápido, aumente la tasa de muestreo disminuyendo el valor de `collection_interval` para recopilar muestras con mayor frecuencia.

Establezca el `collection_interval` en la configuración de su instancia de base de datos en el Datadog Agent. El valor predeterminado es 1. Disminuya el valor a un intervalo más pequeño:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

**Nota**: Si ejecuta varias instancias de la verificación de integración de MariaDB contra la misma base de datos, use el mismo valor de `collection_interval` para todas ellas. Los intervalos de recopilación mixtos para la misma métrica pueden causar anomalías en las métricas.

[1]: https://mariadb.com/docs/server/reference/system-tables/performance-schema/performance-schema-system-variables#performance_schema_digests_size