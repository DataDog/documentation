---
description: Instale y configure Database Monitoring para ClickHouse Cloud.
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /integrations/clickhouse/
  tag: Documentación
  text: Integración de ClickHouse
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Database Monitoring
- link: /database_monitoring/guide/database_identifier/
  tag: Documentación
  text: Especificación de un identificador de base de datos
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: Documentación
  text: Actualización de la integración de ClickHouse desde versiones de Agent anteriores
    a la 7.84.
title: Configuración de Database Monitoring para ClickHouse Cloud.
---
Esta función está en versión preliminar y requiere Datadog Agent v7.84 o posterior. Si configura Database Monitoring para ClickHouse con una versión de Agent anterior a la 7.84, consulte [Actualización de la integración de ClickHouse](/database_monitoring/guide/clickhouse_agent_upgrade/) para otorgar los permisos adicionales antes de actualizar. Los clientes que participen en la versión preliminar de Datadog Database Monitoring para ClickHouse **no recibirán cargos** por el uso incurrido durante el período de versión preliminar. No se requiere habilitación adicional; siga las instrucciones de configuración a continuación para comenzar.

Datadog Database Monitoring (DBM) para ClickHouse proporciona una visibilidad profunda de sus servicios de ClickHouse Cloud mediante la recopilación de métricas de consultas, muestras de consultas en vivo y registros de consultas completadas para ayudarle a resolver problemas y optimizar el rendimiento de las consultas en toda su flota.

## Antes de comenzar {#before-you-begin}

Versiones de Agent compatibles
: 7.84+

## Datos recopilados {#data-collected}

El Database Monitoring recopila los siguientes datos de ClickHouse:

**Instancia de base de datos**
: Recopilación periódica (cada 5 minutos) de información de la instancia, incluyendo la versión, el nombre de servidor y la configuración. Las etiquetas personalizadas definidas en la opción `tags` se adjuntan a la instancia para filtrar y agrupar por entorno, región, servicio o cualquier otra dimensión personalizada.

**Métricas de consultas**
: Métricas de rendimiento agregadas para las consultas ejecutadas, lo que permite el análisis del comportamiento y las tendencias de las consultas a lo largo del tiempo. Recopilado de `system.query_log`.

**Muestras de consultas**
: Las instantáneas puntuales de las consultas que se ejecutan actualmente se capturan de `system.processes` en un intervalo de 1 segundo. Debido a que las consultas de ClickHouse a menudo se completan en menos de un segundo, es posible que las consultas de corta duración no siempre aparezcan en las muestras.

**Finalizaciones de consultas**
: Registros de ejecuciones de consultas individuales completadas, que capturan todas las consultas ejecutadas con éxito. Utilice las finalizaciones de consultas junto con las muestras de consultas para garantizar una visibilidad completa de toda la actividad de consultas, incluidas las consultas de corta duración no observadas durante el muestreo.

**Planes de ejecución**
: Planes de ejecución de consultas, recopilados mediante la ejecución de `EXPLAIN` contra las tablas referenciadas por las consultas observadas en las finalizaciones de consultas, para ayudar a diagnosticar el rendimiento de las consultas. Solo las sentencias `SELECT` (incluyendo las consultas `WITH`) admiten la recopilación de planes de ejecución. Todos los datos recopilados, incluidos los planes de ejecución, están ofuscados. Esta recopilación requiere acceso `SELECT` a las tablas referenciadas por las consultas monitoreadas, además del acceso a la tabla del sistema descrito en [Configuración](#setup).

**Partes y fusiones**
: Datos de estado del almacenamiento, que incluyen partes activas, partes separadas, fusiones en segundo plano, mutaciones pendientes y profundidad de la cola de replicación, recopilados de `system.parts`, `system.detached_parts`, `system.merges`, `system.mutations`, `system.replication_queue` y `system.merge_tree_settings`. Esto ayuda a identificar problemas de almacenamiento y replicación, como fusiones estancadas o un creciente retraso en la replicación.

**Inserciones asíncronas**
: Actividad de inserción asíncrona, disponible con Agent 7.83 o posterior y deshabilitada de forma predeterminada. Las instantáneas de búfer pendientes de `system.asynchronous_inserts` muestran cuántos datos están esperando para ser vaciados y cuándo está programado el vaciado de cada búfer. Los registros de vaciado de `system.asynchronous_insert_log` muestran cada vaciado, si tuvo éxito y cuántos bytes y filas escribió. Esto ayuda a identificar vaciados fallidos y búferes que crecen más rápido de lo que se vacían.

## Configuración {#setup}

### Paso 1: Otorgue acceso al Datadog Agent{#step-1-grant-datadog-agent-access}

Cree un usuario `datadog` dedicado:

```sql
CREATE USER datadog IDENTIFIED BY '<PASSWORD>';
```

Otorgue los permisos necesarios en las tablas del sistema:

```sql
GRANT SELECT ON system.metrics TO datadog;
GRANT SELECT ON system.events TO datadog;
GRANT SELECT ON system.asynchronous_metrics TO datadog;
GRANT SELECT ON system.errors TO datadog;
GRANT SELECT ON system.parts TO datadog;
GRANT SELECT ON system.replicas TO datadog;
GRANT SELECT ON system.dictionaries TO datadog;
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT SELECT ON system.query_log TO datadog;
GRANT SELECT ON system.processes TO datadog;
GRANT SELECT ON system.detached_parts TO datadog;
GRANT SELECT ON system.merges TO datadog;
GRANT SELECT ON system.mutations TO datadog;
GRANT SELECT ON system.replication_queue TO datadog;
GRANT SELECT ON system.merge_tree_settings TO datadog;
GRANT SHOW ON *.* TO datadog;
```

Los permisos `system.processes` y `system.query_log` son necesarios para la recopilación de consultas de DBM. Los permisos `system.parts`, `system.detached_parts`, `system.merges`, `system.mutations`, `system.replication_queue` y `system.merge_tree_settings` son necesarios para la recopilación de partes y fusiones (estado del almacenamiento). El privilegio `SHOW` es necesario para descubrir automáticamente metadatos como nombres de bases de datos, nombres de tablas, columnas y vistas. Los permisos restantes permiten la recopilación de métricas de infraestructura principales de ClickHouse.

Otorgue los permisos `REMOTE` para permitir consultas entre réplicas:

```sql
GRANT REMOTE ON *.* TO datadog;
```

El privilegio `REMOTE` es necesario porque el Agent utiliza la función de tabla `clusterAllReplicas()` de ClickHouse para agregar datos en todas las réplicas de un servicio de ClickHouse Cloud a través del punto de conexión único. Este privilegio permite la ejecución de consultas entre nodos; **no** otorga acceso a ninguna base de datos o tabla adicional más allá de lo que se otorgó explícitamente anteriormente. La sintaxis `ON *.*` es un requisito de ClickHouse para este tipo de privilegio y no amplía el alcance del acceso a los datos.

Los permisos anteriores son suficientes para la recopilación de métricas de consultas, muestras de consultas, finalizaciones de consultas y partes y fusiones. **No** otorgan al Agent acceso a los datos de su aplicación.

#### Opcional: Otorgue acceso para la recopilación de planes de ejecución {#optional-grant-access-for-explain-plan-collection}

La recopilación de planes de ejecución requiere acceso `SELECT` en las tablas a las que hacen referencia las consultas monitoreadas, no solo en las tablas del sistema anteriores:

```sql
GRANT SELECT ON <database>.* TO datadog;
```

Si no se proporciona este permiso, el Agent no puede ejecutar `EXPLAIN` para las consultas en esas tablas. Las métricas, muestras y finalizaciones de consultas siguen funcionando, pero no se recopilan los planes de ejecución para las consultas afectadas y Datadog muestra un error de recopilación para esas consultas.

#### Opcional: Otorgue acceso para hacer un seguimiento de las inserciones asíncronas {#optional-grant-access-for-async-insert-monitoring}

Si habilita el monitoreo de inserciones asíncronas (Agent 7.83 o posterior), otorgue acceso a las tablas del sistema de inserciones asíncronas:

```sql
GRANT SELECT ON system.asynchronous_inserts TO datadog;
GRANT SELECT ON system.asynchronous_insert_log TO datadog;
```

`system.asynchronous_inserts` es necesario para las instantáneas de búfer pendientes (`collect_pending_async_inserts`). `system.asynchronous_insert_log` es necesario para los registros de vaciado (`collect_async_inserts`). Para habilitar ambos, agregue lo siguiente a la configuración de su instancia:

```yaml
    collect_pending_async_inserts:
      enabled: true
    collect_async_inserts:
      enabled: true
```

### Paso 2: Configure el Agent {#step-2-configure-the-agent}

Para ClickHouse Cloud, el Agent se conecta directamente al punto de conexión del servicio. Los datos se recopilan a nivel de servicio (agregados en todas las réplicas), no por nodo individual.

En implementaciones de ClickHouse sin servidor con suspensión automática habilitada, la actividad de recopilación de DBM puede evitar que el clúster se suspenda durante los períodos de inactividad, lo que puede afectar la facturación.

Esta integración utiliza la **interfaz HTTP** de ClickHouse (puerto 8443), no el protocolo TCP nativo (puerto 9440).

```yaml
# /etc/datadog-agent/conf.d/clickhouse.d/conf.yaml

init_config:

instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    username: datadog
    password: <PASSWORD>

    # Required for ClickHouse Cloud
    tls_verify: true
    verify: true
    single_endpoint_mode: true

    tags:
      - env:production
      - deployment:cloud

    query_metrics:
      enabled: true
      collection_interval: 10

    query_samples:
      enabled: true
      collection_interval: 1

    query_completions:
      enabled: true
      collection_interval: 10
```

`single_endpoint_mode: true` es necesario para ClickHouse Cloud. Permite que las consultas `clusterAllReplicas()` recopilen datos en todos los nodos detrás de un único punto de conexión.

Cuando está habilitado, el Agent consulta métricas de tablas del sistema (de `system.events`, `system.metrics`, `system.asynchronous_metrics` y `system.errors`) en todos los nodos detrás del punto de conexión usando `clusterAllReplicas()`. Cada serie resultante está etiquetada con `clickhouse_node` para que pueda distinguir los datos por nodo. Esta recopilación por nodo requiere la versión 7.83.0 o posterior del Agent.

Sin esta configuración, el Agent podría llegar a un nodo diferente en cada ciclo de recopilación. Para contadores acumulativos por nodo como `clickhouse.query.failed.count`, esa inconsistencia produce valores inexactos porque el contador no se lee de la misma fuente cada vez.

## Personalización del identificador de base de datos {#customizing-the-database-identifier}

La opción `database_identifier` controla cómo aparece la instancia de base de datos en DBM. Datadog recomienda usar el nombre del servicio como una etiqueta personalizada para la identificación y agrupación.

```yaml
instances:
  - dbm: true
    server: xyz.us-east-2.aws.clickhouse.cloud
    port: 8443
    # ... other settings ...

    database_identifier:
      template: "$env-$server:$port"

    tags:
      - env:production
      - service_name:user-service
```

Con `env:production`, `server: xyz.us-east-2.aws.clickhouse.cloud` y `port: 8443`, esto produce:


| Plantilla                  | Resultado                                               |
| ------------------------- | ---------------------------------------------------- |
| `$server:$port` (predeterminado) | `xyz.us-east-2.aws.clickhouse.cloud:8443`            |
| `$env-$server:$port`      | `production-xyz.us-east-2.aws.clickhouse.cloud:8443` |




## Referencia de configuración {#configuration-reference}



### Configuración de conexión {#connection-settings}


| Campo      | Tipo    | Requerido | Predeterminado   | Descripción                                                                                                                 |
| ---------- | ------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `server`   | cadena  | Sí      | -         | Nombre de servidor del servicio de ClickHouse Cloud (por ejemplo, `xyz.us-east-2.aws.clickhouse.cloud`).                                      |
| `port`     | entero | No       | `8123`    | Puerto HTTP. Use `8443` para ClickHouse Cloud (HTTPS).                                                                         |
| `username` | cadena  | No       | `default` | Cuenta de usuario de ClickHouse con la que se autentica el Agent. Datadog recomienda un usuario `datadog` dedicado con permisos limitados. |
| `password` | cadena  | No       | -         | Contraseña para el usuario especificado.                                                                                            |
| `db`       | cadena  | No       | `default` | Base de datos a la que conectarse. La mayoría de las métricas provienen de tablas del sistema, por lo que `default` suele ser apropiado.                          |




### Configuración de TLS {#tls-settings}


| Campo         | Tipo    | Predeterminado | Descripción                                                                                                     |
| ------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `tls_verify`  | Booleano | `false` | Habilitar TLS. Requerido para ClickHouse Cloud.                                                                      |
| `verify`      | Booleano | `true`  | Validar el certificado SSL del servidor. Configurar `false` en producción es un riesgo de seguridad.                        |
| `tls_ca_cert` | cadena  | -       | Ruta a un archivo de certificado de CA personalizado. No es necesario para ClickHouse Cloud, que utiliza certificados de CA públicas. |




### Configuración de DBM {#dbm-settings}


| Campo                  | Tipo    | Predeterminado | Descripción                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dbm`                  | Booleano | `false` | Habilitar Database Monitoring. Requerido para la recopilación de métricas de consultas, muestras y finalizaciones.                                                                                                                                                                                                                                              |
| `single_endpoint_mode` | Booleano | `false` | Requerido para ClickHouse Cloud. Habilita consultas `clusterAllReplicas()` para recopilar datos en todos los nodos detrás de un único punto de conexión. También recopila métricas de tablas del sistema estándar por nodo (etiquetadas con `clickhouse_node`) para que los contadores acumulativos informen valores precisos por nodo. La recopilación por nodo requiere la versión 7.83.0 o posterior de Agent. |




### Identificador de base de datos {#database-identifier}


| Campo                          | Tipo   | Predeterminado         | Descripción                                                                                                           |
| ------------------------------ | ------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `database_identifier.template` | cadena | `$server:$port` | Plantilla para el identificador único de base de datos. Admite variables: `$server`, `$port` y cualquier clave de etiqueta personalizada (por ejemplo, `$env`, `$service_name`). |




### Métricas de consulta {#query-metrics}

Recopila estadísticas de consulta agregadas desde `system.query_log`.


| Campo                               | Tipo    | Predeterminado | Descripción                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_metrics.enabled`             | Booleano | `true`  | Habilitar la recopilación de métricas de consulta. Requiere `dbm: true`. |
| `query_metrics.collection_interval` | número  | `10`    | Intervalo de recopilación en segundos.                        |




### Muestras de consultas {#query-samples}

Recopila las consultas que se están ejecutando actualmente desde `system.processes`.


| Campo                               | Tipo    | Predeterminado | Descripción                                            |
| ----------------------------------- | ------- | ------- | ------------------------------------------------------ |
| `query_samples.enabled`             | Booleano | `true`  | Habilitar la recopilación de muestras de consultas. Requiere `dbm: true`. |
| `query_samples.collection_interval` | número  | `1`     | Intervalo de recopilación en segundos.                        |
| `query_samples.payload_row_limit`   | entero | `1000`  | Número máximo de consultas activas por instantánea.         |




### Finalizaciones de consultas {#query-completions}

Recopila registros de consultas individuales completadas desde `system.query_log`.


| Campo                                          | Tipo    | Predeterminado | Descripción                                                    |
| ---------------------------------------------- | ------- | ------- | -------------------------------------------------------------- |
| `query_completions.enabled`                    | Booleano | `true`  | Habilitar la recopilación de finalizaciones de consultas. Requiere `dbm: true`.     |
| `query_completions.collection_interval`        | número  | `10`    | Intervalo de recopilación en segundos.                                |
| `query_completions.samples_per_hour_per_query` | número | `15`    | Máximo de muestras recopiladas por hora por firma de consulta única. |

### Inserciones asíncronas pendientes {#pending-async-inserts}

Recopila instantáneas de búferes de inserción asíncrona pendientes de `system.asynchronous_inserts`. Requiere Agent 7.83 o posterior.

| Campo | Tipo | Predeterminado | Descripción |
|-------|------|---------|-------------|
| `collect_pending_async_inserts.enabled` | Booleano | `false` | Habilitar la recopilación de búfer de inserción asíncrona pendiente. Requiere `dbm: true`. |
| `collect_pending_async_inserts.collection_interval` | número | `10` | Intervalo de recopilación en segundos. |
| `collect_pending_async_inserts.max_samples_per_collection` | entero | `1000` | Número máximo de búferes recopilados por ejecución. |

### Vaciados de inserción asíncrona {#async-insert-flushes}

Recopila registros de vaciados de inserción asíncrona individuales de `system.asynchronous_insert_log`. Requiere Agent 7.83 o posterior.

| Campo | Tipo | Predeterminado | Descripción |
|-------|------|---------|-------------|
| `collect_async_inserts.enabled` | Booleano | `false` | Habilitar la recopilación de vaciados de inserción asíncrona. Requiere `dbm: true`. |
| `collect_async_inserts.collection_interval` | número | `60` | Intervalo de recopilación en segundos. |
| `collect_async_inserts.max_samples_per_collection` | entero | `1000` | Número máximo de registros de vaciado recopilados por ejecución. |


{{< partial name="whats-next/whats-next.html" >}}