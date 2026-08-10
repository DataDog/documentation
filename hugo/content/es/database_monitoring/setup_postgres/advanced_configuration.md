---
description: Configuración avanzada de la monitorización de bases de datos Postgres
title: Configuración avanzada de la monitorización de bases de datos Postgres
---

## Manejo de múltiples relaciones

Si tu base de datos Postgres tiene un gran número de relaciones (miles), Datadog recomienda añadir `collect_database_size_metrics: false` a la configuración de tu instancia para esa base de datos. Cuando esta configuración está deshabilitada, el Agent no ejecuta la función `pg_database_size()` para recopilar estadísticas del tamaño de las bases de datos, lo que pone en evidencia un peor rendimiento en instancias con un gran número de tablas.

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

Además, si particionas los datos entre tablas, de forma que las definiciones de las tablas sean idénticas salvo por el nombre, esto puede dar lugar a un gran número de consultas normalizadas:

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
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## Aumento de la frecuencia de muestreo

Si tienes consultas relativamente poco frecuentes o que se ejecutan con rapidez, aumenta la frecuencia de muestreo reduciendo el valor de `collection_interval` para recopilar muestras con mayor frecuencia.

Defone el `collection_interval` en la configuración de tu instancia de base de datos del Datadog Agent. El valor por defecto es 1 segundo y se puede ver en <a href="https://github.com/Datadog/integraciones-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L332C9-L336" target="_blank">`postgres/conf.yaml.example`</a>.

Reduce el valor a un intervalo menor:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```