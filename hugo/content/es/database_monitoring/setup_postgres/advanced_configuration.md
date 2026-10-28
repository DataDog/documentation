---
description: Configuración avanzada para Database Monitoring de Postgres
title: Configuración avanzada para Database Monitoring de Postgres
---
## Manejo de muchas relaciones {#handling-many-relations}

Si su base de datos Postgres tiene una gran cantidad de relaciones (en los miles), Datadog recomienda agregar `collect_database_size_metrics: false` a la configuración de su instancia para esa base de datos. Cuando esta configuración está deshabilitada, el Agent no ejecutará la función `pg_database_size()` para recopilar estadísticas de tamaño de base de datos, lo cual tiene peor rendimiento en instancias con una gran cantidad de tablas.

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

Además, si particiona sus datos en tablas, de modo que las definiciones de las tablas sean idénticas excepto por el nombre, esto puede resultar en una gran cantidad de consultas normalizadas:

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

En estos casos, rastree estas consultas como una única consulta normalizada utilizando la opción `replace_digits`, de modo que todas las métricas para esas consultas se agrupen en una sola consulta:

```sql
SELECT * FROM daily_aggregates_?
```

Agregue la opción `replace_digits` a la configuración de su instancia de base de datos en el Datadog Agent:

```yaml
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

La partición también afecta la recopilación de esquemas. Las tablas particionadas con particionamiento declarativo nativo (`PARTITION BY`) cuentan como una sola tabla para el límite de `max_tables` para `collect_schemas`, independientemente del recuento de particiones. Las tablas particionadas mediante herencia de tablas (`INHERITS`), como las tablas `daily_aggregates_*` anteriores, cuentan cada partición individualmente, por lo que las bases de datos que utilizan este patrón pueden necesitar un límite de `max_tables` más alto para una cobertura completa. Consulte [Tuning schema collection][2] para obtener más detalles.

## Aumento de la tasa de muestreo {#raising-the-sampling-rate}

Si tiene consultas que son relativamente poco frecuentes o que se ejecutan rápidamente, aumente la tasa de muestreo reduciendo el valor de `collection_interval` para recopilar planes de explicación con mayor frecuencia.

Establezca el `collection_interval` en la configuración de su instancia de base de datos del Datadog Agent. El valor predeterminado es 1 segundo y se puede ver en el <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example" target="_blank">`postgres/conf.yaml.example`</a>.

Reduzca el valor a un intervalo más pequeño:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

## Configuración de la recopilación de estadísticas de columnas {#configuring-column-statistics-collection}

La recopilación de estadísticas de columnas lee las estadísticas por columna de `pg_stats` (`n_distinct`, `null_frac`, `avg_width`, `correlation`, `most_common_freqs`) en un horario periódico. Esto requiere que la función `datadog.column_statistics()` exista en cada base de datos monitoreada; consulte [Setting Up Database Monitoring for Self-Hosted Postgres][1] para ver la definición de la función.

Una vez que exista la función, habilite y ajuste la recopilación en la configuración de su instancia de Postgres:

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
      collection_interval: 3600   # seconds between collection runs; default 3600 (hourly)
      max_tables: 500              # maximum tables to collect per run; default 500
```

| Opción | Predeterminado | Cuándo cambiarla |
| --- | --- | --- |
| `enabled` | `false` | Establezca en `true` para habilitar la recopilación de estadísticas de columnas. |
| `collection_interval` | `3600` | Reduzca para obtener estadísticas más receptivas (a costa de más consultas contra `pg_stats`); aumente en clústeres muy grandes o ocupados para reducir la carga de consultas. |
| `max_tables` | `500` | Aumente si hace un seguimiento de una base de datos con más de 500 tablas y desea una cobertura completa; reduzca para limitar el costo de recopilación. Este límite es independiente de la opción `max_tables` en `collect_schemas`, que tiene como valor predeterminado `300`. |

Para que las estadísticas de columna se completen, las tablas subyacentes deben haber ejecutado `ANALYZE` (o autoanalyze) al menos una vez; `pg_stats` está vacío para tablas sin estadísticas recopiladas.

[1]: /es/database_monitoring/setup_postgres/selfhosted/#create-the-column-statistics-function
[2]: /es/database_monitoring/schema_explorer/#tuning-schema-collection