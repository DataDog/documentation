---
app_id: hive
categories:
- recopilación de logs
custom_kind: integración
description: Recopila diversas métricas JMX de HiveServer2 y de Hive MetaStore
integration_version: 2.1.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Hive
---
## Información general

Este check monitoriza dos partes de [Hive](https://cwiki.apache.org/confluence/display/Hive/Home): Hive Metastore y HiveServer2.

## Configuración

### Instalación

El check de Hive se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Configuración de Hive

1. Edita el archivo de configuración de Hive en [`HIVE_HOME/conf/hive-site.xml`](https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Metrics) para activar las métricas de Hive Metastore y HiveServer2 añadiendo estas propiedades:

   ```xml
   <property>
     <name>hive.metastore.metrics.enabled</name>
     <value>true</value>
   </property>
   <property>
     <name>hive.server2.metrics.enabled</name>
     <value>true</value>
   </property>
   ```

1. Habilita una conexión JMX remota para HiveServer2 o para Hive Metastore. Por ejemplo, configura la variable de entorno `HADOOP_CLIENT_OPTS`:

   ```conf
   export HADOOP_CLIENT_OPTS="$HADOOP_CLIENT_OPTS -Dcom.sun.management.jmxremote \
   -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false \
   -Dcom.sun.management.jmxremote.port=8808"
   ```

   A continuación, reinicia HiveServer2 o Hive Metastore. Hive Metastore y HiveServer2 no pueden compartir la misma conexión JMX.

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [En contenedores](#containerized).

##### Recopilación de métricas

1. Edita el archivo `hive.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Hive. Consulta el [hive.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information). Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para saber cómo personalizar las métricas a recopilar, consulta la [documentación de JMX Checks](https://docs.datadoghq.com/integrations/java/) para obtener instrucciones más detalladas. Si necesitas monitorizar más métricas, ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `hive.d/conf.yaml` para empezar a recopilar tus logs de Hive:

   ```yaml
     logs:
       - type: file
         path: /tmp/<USER>/hive.log
         source: hive
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [hive.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

Para recopilar métricas con la integración Datadog-Hive, consulta la guía [Autodiscovery con JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hive", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `Hive` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hive.metastore.api.alter_table** <br>(rate) | Llamada a la API para alterar la tabla.<br>_Se muestra como tarea_ |
| **hive.metastore.api.alter_table.active_call** <br>(gauge) | Llamada activa a la API para alterar la tabla.<br>_Se muestra como unidad_ |
| **hive.metastore.api.create_table** <br>(rate) | Llamada a la API para crear una tabla.<br>_Se muestra como tarea_ |
| **hive.metastore.api.create_table.active_call** <br>(gauge) | Llamada activa a la API para crear una tabla.<br>_Se muestra como unidad_ |
| **hive.metastore.api.drop_table** <br>(rate) | Llamada a la API para eliminar una tabla.<br>_Se muestra como tarea_ |
| **hive.metastore.api.drop_table.active_call** <br>(gauge) | Llamada activa a la API para eliminar una tabla.<br>_Se muestra como unidad_ |
| **hive.metastore.api.flushcache** <br>(rate) | API flushcache.<br>_Se muestra como tarea_ |
| **hive.metastore.api.flushcache.active_call** <br>(gauge) | API flushcache activa.<br>_Se muestra como unidad_ |
| **hive.metastore.api.get_all_databases** <br>(rate) | Llamada a la API para obtener todas las bases de datos.<br>_Se muestra como tarea_ |
| **hive.metastore.api.get_all_databases.active_call** <br>(gauge) | Llamada activa a la API para obtener todas las bases de datos.<br>_Se muestra como unidad_ |
| **hive.metastore.api.get_all_functions** <br>(rate) | Llamada a la API para obtener todas las funciones.<br>_Se muestra como tarea_ |
| **hive.metastore.api.get_all_functions.active_call** <br>(gauge) | Llamada activa a la API para obtener todas las funciones.<br>_Se muestra como unidad_ |
| **hive.metastore.api.get_all_tables** <br>(rate) | Llamada a la API para obtener todas las tablas.<br>_Se muestra como tarea_ |
| **hive.metastore.api.get_all_tables.active_call** <br>(gauge) | Llamada activa a la API para obtener todas las tablas.<br>_Se muestra como unidad_ |
| **hive.metastore.api.get_database** <br>(rate) | Llamada a la API para obtener una base de datos.<br>_Se muestra como tarea_ |
| **hive.metastore.api.get_database.active_call** <br>(gauge) | Llamada activa a la API para obtener una base de datos.<br>_Se muestra como unidad_ |
| **hive.metastore.api.get_table** <br>(rate) | Llamada a la API para obtener una tabla.<br>_Se muestra como tarea_ |
| **hive.metastore.api.get_table.active_call** <br>(gauge) | Llamada activa a la API para obtener una tabla.<br>_Se muestra como unidad_ |
| **hive.metastore.api.get_table_req** <br>(rate) | <br>_Se muestra como tarea_ |
| **hive.metastore.api.get_table_req.active_call** <br>(gauge) | <br>_Se muestra como unidad_ |
| **hive.metastore.api.init** <br>(rate) | Inicialización de la API.<br>_Se muestra como tarea_ |
| **hive.metastore.api.init.active_call** <br>(gauge) | Inicialización de la API activa.<br>_Se muestra como unidad_ |
| **hive.metastore.api.shutdown** <br>(rate) | API shutdown.<br>_Se muestra como tarea_ |
| **hive.metastore.api.shutdown.active_call** <br>(gauge) | API shutdown activa.<br>_Se muestra como unidad_ |
| **hive.metastore.db.created** <br>(rate) | Número total de bases de datos creadas.<br>_Se muestra como elemento_ |
| **hive.metastore.db.deleted** <br>(rate) | Número total de bases de datos eliminadas.<br>_Se muestra como elemento_ |
| **hive.metastore.db.init** <br>(rate) | Número de base de datos inicializada.<br>_Se muestra como elemento_ |
| **hive.metastore.directsql_errors** <br>(gauge) | Número de errores SQL.<br>_Se muestra como unidad_ |
| **hive.metastore.open_connections** <br>(gauge) | Número de conexiones abiertas.<br>_Se muestra como conexión_ |
| **hive.metastore.partition.created** <br>(rate) | Número total de particiones creadas.<br>_Se muestra como elemento_ |
| **hive.metastore.partition.deleted** <br>(rate) | Número total de particiones borradas.<br>_Se muestra como elemento_ |
| **hive.metastore.partition.init** <br>(rate) | Número de partición inicializada.<br>_Se muestra como elemento_ |
| **hive.metastore.table.created** <br>(rate) | Número total de tablas creadas.<br>_Se muestra como tabla_ |
| **hive.metastore.table.deleted** <br>(rate) | Número total de tablas borradas.<br>_Se muestra como tabla_ |
| **hive.metastore.table.init** <br>(rate) | Número de tabla inicializada.<br>_Se muestra como tabla_ |
| **hive.server.api.operation.initialized.75percentile** <br>(gauge) | Tiempo P75 para iniciar una operación.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.initialized.95percentile** <br>(gauge) | Tiempo P95 para iniciar una operación.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.initialized.active_call** <br>(gauge) | Operación inicializada activa.<br>_Se muestra como usuario_ |
| **hive.server.api.operation.initialized.count** <br>(rate) | Número de operación inicializada.<br>_Se muestra como operación_ |
| **hive.server.api.operation.initialized.max** <br>(gauge) | Tiempo máximo para iniciar una operación.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.initialized.mean** <br>(gauge) | Tiempo medio para iniciar una operación.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.initialized.meanrate** <br>(gauge) | Tasa de inicialización de la operación.<br>_Se muestra como operación_ |
| **hive.server.api.operation.initialized.min** <br>(gauge) | Tiempo mínimo para iniciar una operación.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.pending.75percentile** <br>(gauge) | Tiempo P75 en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.operation.pending.95percentile** <br>(gauge) | Tiempo P95 en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.operation.pending.active_call** <br>(gauge) | Operación activa pendiente.<br>_Se muestra como operación_ |
| **hive.server.api.operation.pending.count** <br>(rate) | Número de operación en estado pendiente.<br>_Se muestra como operación_ |
| **hive.server.api.operation.pending.max** <br>(gauge) | Tiempo máximo en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.operation.pending.mean** <br>(gauge) | Tiempo medio en estado pendiente para una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.pending.meanrate** <br>(gauge) | Tasa de operación pendiente.<br>_Se muestra como operación_ |
| **hive.server.api.operation.pending.min** <br>(gauge) | Tiempo mínimo en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.operation.running.75percentile** <br>(gauge) | Tiempo P75 en estado de ejecución para una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.running.95percentile** <br>(gauge) | Tiempo P95 en estado de ejecución para una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.running.active_call** <br>(gauge) | Operación activa en ejecución.<br>_Se muestra como operación_ |
| **hive.server.api.operation.running.count** <br>(rate) | Número de operación en estado de ejecución.<br>_Se muestra como milisegundo_ |
| **hive.server.api.operation.running.max** <br>(gauge) | Tiempo máximo en estado de ejecución para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.operation.running.mean** <br>(gauge) | Tiempo medio en estado de ejecución de una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.operation.running.meanrate** <br>(gauge) | Tasa de estado en ejecución de la operación.<br>_Se muestra como operación_ |
| **hive.server.api.operation.running.min** <br>(gauge) | Tiempo mínimo en estado de ejecución para una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.queries.executing.active_call** <br>(gauge) | Consultas activas en ejecución.<br>_Se muestra como consulta_ |
| **hive.server.api.sql_operation.pending.75percentile** <br>(gauge) | Tiempo P75 en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.sql_operation.pending.95percentile** <br>(gauge) | Tiempo P95 en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.sql_operation.pending.active_call** <br>(gauge) | Operación sql activa pendiente.<br>_Se muestra como operación_ |
| **hive.server.api.sql_operation.pending.count** <br>(rate) | Número de operaciones sql en estado pendiente.<br>_Se muestra como operación_ |
| **hive.server.api.sql_operation.pending.max** <br>(gauge) | Tiempo máximo en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.sql_operation.pending.mean** <br>(gauge) | Tiempo medio en estado pendiente para una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.sql_operation.pending.meanrate** <br>(gauge) | Tasa de operaciones sql pendientes.<br>_Se muestra como operación_ |
| **hive.server.api.sql_operation.pending.min** <br>(gauge) | Tiempo mínimo en estado pendiente para una operación sql.<br>_Se muestra como milisegundo_ |
| **hive.server.api.sql_operation.running.75percentile** <br>(gauge) | Tiempo P75 de estado de ejecución para una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.sql_operation.running.95percentile** <br>(gauge) | Tiempo P95 de estado de ejecución de una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.sql_operation.running.active_call** <br>(gauge) | Operación sql activa en ejecución.<br>_Se muestra como operación_ |
| **hive.server.api.sql_operation.running.count** <br>(rate) | Número de operaciones sql en estado de ejecución.<br>_Se muestra como operación_ |
| **hive.server.api.sql_operation.running.max** <br>(gauge) | Tiempo máximo de estado de ejecución de una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.sql_operation.running.mean** <br>(gauge) | Tiempo medio del estado de ejecución de una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.api.sql_operation.running.meanrate** <br>(gauge) | Tasa de operación sql en ejecución.<br>_Se muestra como operación_ |
| **hive.server.api.sql_operation.running.min** <br>(gauge) | Tiempo mínimo para el estado de ejecución de una operación sql.<br>_Se muestra en milisegundos_ |
| **hive.server.memory.heap.committed** <br>(gauge) | Memoria comprometida para HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.heap.init** <br>(gauge) | Memoria utilizada en la inicialización por el HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.heap.max** <br>(gauge) | Memoria máxima que puede utilizar HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.heap.used** <br>(gauge) | Memoria utilizada por HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.non_heap.committed** <br>(gauge) | Memoria comprometida para HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.non_heap.init** <br>(gauge) | Memoria utilizada en la inicialización por HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.non_heap.max** <br>(gauge) | Memoria máxima que puede utilizar HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.non_heap.used** <br>(gauge) | Memoria utilizada por HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.total.committed** <br>(gauge) | Memoria comprometida total para HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.total.init** <br>(gauge) | Memoria total en la inicialización por parte de HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.total.max** <br>(gauge) | Memoria máxima total que puede utilizarse para HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra como byte_ |
| **hive.server.memory.total.used** <br>(gauge) | Memoria total utilizada por HiveServer2 o Metastore. Depende del tipo de instancia conectada<br>_Se muestra en bytes_ |
| **hive.server.open_operations** <br>(gauge) | Operación abierta en el HiveServer2.<br>_Se muestra como operación_ |
| **hive.server.operation.completed.closed** <br>(rate) | Número de operación cerrada.<br>_Se muestra como operación_ |
| **hive.server.operation.completed.finished** <br>(rate) | Número de operación finalizada.<br>_Se muestra como operación_ |
| **hive.server.queries.compiling.75percentile** <br>(gauge) | Tiempo P75 de compilación de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.compiling.95percentile** <br>(gauge) | Tiempo P95 de compilación de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.compiling.active_call** <br>(gauge) | Consultas de compilación activas.<br>_Se muestra como consulta_ |
| **hive.server.queries.compiling.count** <br>(rate) | Número de consulta compilada.<br>_Se muestra como consulta_ |
| **hive.server.queries.compiling.max** <br>(gauge) | Tiempo máximo para compilar una consulta.<br>_Se muestra como milisegundo_ |
| **hive.server.queries.compiling.mean** <br>(gauge) | Tiempo medio de compilación de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.compiling.meanrate** <br>(gauge) | Compilación de la tasa de consulta.<br>_Se muestra como consulta_ |
| **hive.server.queries.compiling.min** <br>(gauge) | Tiempo mínimo de compilación de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.executing.75percentile** <br>(gauge) | Tiempo de ejecución P75 de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.executing.95percentile** <br>(gauge) | Tiempo P95 de ejecución de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.executing.count** <br>(rate) | Número de consultas ejecutadas.<br>_Se muestra como consulta_ |
| **hive.server.queries.executing.max** <br>(gauge) | Tiempo máximo de ejecución de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.executing.mean** <br>(gauge) | Tiempo medio de ejecución de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.executing.meanrate** <br>(gauge) | Tasa de ejecución de consulta.<br>_Se muestra como consulta_ |
| **hive.server.queries.executing.min** <br>(gauge) | Tiempo mínimo de ejecución de una consulta.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.submitted.75percentile** <br>(gauge) | Tiempo P75 para una consulta enviada.<br>_Se muestra como milisegundo_ |
| **hive.server.queries.submitted.95percentile** <br>(gauge) | Tiempo P95 para una consulta enviada.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.submitted.active_call** <br>(gauge) | Consultas activas enviadas.<br>_Se muestra como consulta_ |
| **hive.server.queries.submitted.count** <br>(rate) | Número de consultas enviadas.<br>_Se muestra como consulta_ |
| **hive.server.queries.submitted.max** <br>(gauge) | Tiempo máximo para una consulta enviada.<br>_Se muestra como milisegundo_ |
| **hive.server.queries.submitted.mean** <br>(gauge) | Tiempo medio de una consulta enviada.<br>_Se muestra en milisegundos_ |
| **hive.server.queries.submitted.meanrate** <br>(gauge) | Tasa de consulta enviada.<br>_Se muestra como consulta_ |
| **hive.server.queries.submitted.min** <br>(gauge) | Tiempo mínimo para una consulta enviada.<br>_Se muestra como milisegundo_ |
| **hive.server.queries.succeeded.count** <br>(rate) | Número de consultas realizadas con éxito.<br>_Se muestra como consulta_ |
| **hive.server.queries.succeeded.meanrate** <br>(gauge) | Tasa de consultas con éxito.<br>_Se muestra como consulta_ |
| **hive.server.session.active** <br>(gauge) | Número de sesión activa.<br>_Se muestra como sesión_ |
| **hive.server.session.active.time_mean** <br>(gauge) | Tiempo medio que ha estado activa una sesión.<br>_Se muestra en milisegundos_ |
| **hive.server.session.open** <br>(gauge) | Número de sesión abierta.<br>_Se muestra como sesión_ |
| **hive.server.session.open.time_mean** <br>(gauge) | Tiempo medio de apertura de una sesión.<br>_Se muestra en milisegundos_ |
| **hive.server.sql_operation.completed.closed** <br>(rate) | Número de operaciones sql cerradas.<br>_Se muestra como operación_ |
| **hive.server.sql_operation.completed.finished** <br>(rate) | Número de operaciones sql finalizadas.<br>_Se muestra como operación_ |
| **hive.server.sql_operation.user.active** <br>(gauge) | Número de usuario activo.<br>_Se muestra como usuario_ |

### Eventos

El check de Hive no incluye eventos.

### Checks de servicio

**hive.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia HiveServer2/Hive Metastore supervisada, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, critical, warning_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).