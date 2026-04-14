---
app_id: mapr
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Recopila las métricas de monitorización de MapR.
integration_version: 3.0.0
media: []
supported_os:
- linux
title: MapR
---
## Información general

Este check monitoriza [MapR](https://mapr.com) 6.1+ a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

### Instalación

El check de MapR está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), pero requiere operaciones de configuración adicionales.

#### Requisitos previos

- [La monitorización de MapR](https://mapr.com/docs/61/AdministratorGuide/Monitoring.html) se está ejecutando correctamente.
- Tienes un [usuario MapR](https://mapr.com/docs/61/AdministratorGuide/c-managing-users-and-groups.html) disponible (con nombre, contraseña, UID y GID) con el permiso 'consumir' en el flujo (stream) `/var/mapr/mapr.monitoring/metricstreams`. Puede tratarse de un usuario ya existente o de un usuario recién creado.
- **En un clúster no seguro**: Sigue [Configuración de suplantación sin seguridad del clúster](https://docs.datafabric.hpe.com/52/SecurityGuide/t_config_impersonation_notsecure.html?hl=secure%2Ccluster) para que el usuario de `dd-agent` pueda suplantar a este usuario de MapR.
- **En un clúster seguro**: Genera un [ticket de servicio de duración prolongada](https://mapr.com/docs/61/SecurityGuide/GeneratingServiceTicket.html) para este usuario que sea legible por el usuario `dd-agent`.

Pasos de instalación para cada nodo:

1. [Instala el Agent](https://app.datadoghq.com/account/settings/agent/latest).

1. Instala la biblioteca _librdkafka_, requerida por la _biblioteca de flujos (streams) de MapR_, siguiendo [estas instrucciones](https://github.com/confluentinc/librdkafka#installing-prebuilt-packages).

1. Instala la biblioteca _biblioteca de flujos (streams) de MapR_ con el siguiente comando:0

   `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python`.

   Si utilizas Python 3 con el Agent v7, sustituye `pip` por `pip3`.

1. Añade `/opt/mapr/lib/` a `/etc/ld.so.conf` (o un archivo en `/etc/ld.so.conf.d/`). Esto es necesario para que la _biblioteca de flujos (streams) de MapR_ que utiliza el Agent encuentre las bibliotecas compartidas de MapR.

1. Vuelve a cargar las bibliotecas ejecutando `sudo ldconfig`.

1. Configura la integración mediante la especificación de la localización del ticket.

#### Notas adicionales

- Si no tienes habilitada la "seguridad" en el clúster, puedes continuar sin un ticket.
- Si tu entorno de producción no admite herramientas de compilación como gcc (necesarias para compilar la biblioteca de flujos (stremas) de MapR), es posible generar un archivo wheel compilado de la biblioteca en una instancia de desarrollo y distribuir el archivo wheel compilado a producción. Los hosts de desarrollo y producción tienen que ser lo suficientemente similares para que el archivo wheel compilado sea compatible. Puedes ejecutar `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip wheel --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python` para crear el archivo de wheel en la máquina de desarrollo. Luego, debes ejecutar `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <THE_WHEEL_FILE>` en la máquina de producción.
- Si utilizas Python 3 con el Agent v7, asegúrate de reemplazar `pip` por `pip3` al instalar la _biblioteca de flujos (streams) de MaprR_.

### Configuración

#### Recopilación de métricas

1. Edita el archivo `mapr.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para recopilar tus datos de rendimiento de MapR. Consulta [ejemplo mapr.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mapr/datadog_checks/mapr/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.
1. Define el parámetro `ticket_location` de la configuración como la ruta del ticket de larga duración que creaste.
1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Recopilación de logs

MapR utiliza fluentD para los logs. Utiliza el [complemento de fluentD Datadog](https://www.rubydoc.info/gems/fluent-plugin-datadog) para recopilar los logs de MapR. El siguiente comando descarga e instala el complemento en el directorio correcto.

`curl https://raw.githubusercontent.com/DataDog/fluent-plugin-datadog/master/lib/fluent/plugin/out_datadog.rb -o /opt/mapr/fluentd/fluentd-<VERSION>/lib/fluentd-<VERSION>-linux-x86_64/lib/app/lib/fluent/plugin/out_datadog.rb`

Luego, actualiza `/opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/fluentd.conf` con la siguiente sección.

```text
<match *>
  @type copy
  <store> # This section is here by default and sends the logs to ElasticCache for Kibana.
    @include /opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/es_config.conf
    include_tag_key true
    tag_key service_name
  </store>
  <store> # This section also forwards all the logs to Datadog:
    @type datadog
    @id dd_agent
    include_tag_key true
    dd_source mapr  # Sets "source: mapr" on every log to allow automatic parsing on Datadog.
    dd_tags "<KEY>:<VALUE>"
    service <YOUR_SERVICE_NAME>
    api_key <YOUR_API_KEY>
  </store>
```

Consulta [fluent_datadog_complemento](https://www.rubydoc.info/gems/fluent-plugin-datadog) para obtener más información sobre las opciones que puedes utilizar.

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `mapr` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **mapr.alarms.alarm_raised** <br>(gauge) | El número de subprocesos que están esperando a ser ejecutados. Esto puede ocurrir cuando un subproceso debe esperar a que otro subproceso realice una acción antes de continuar.<br>_Se muestra como subproceso_. |
| **mapr.cache.lookups_data** <br>(count) | Número de búsquedas en la caché de bloques.<br>_Se muestra como operación_ |
| **mapr.cache.lookups_dir** <br>(count) | El número de búsquedas en la caché de la tabla LRU. La tabla LRU se utiliza para almacenar páginas de hojas internas del árbol B.<br>_Se muestra como operación_. |
| **mapr.cache.lookups_inode** <br>(count) | El número de búsquedas en la caché de inodo.|
| **mapr.cache.lookups_largefile** <br>(count) | El número de búsquedas en la caché LRU de archivos grandes. La LRU de archivos grandes se utiliza para almacenar archivos con un tamaño superior a 64 K y páginas de datos de bases de datos de MapR.<br>_Se muestra como operación_. |
| **mapr.cache.lookups_meta** <br>(count) | El número de búsquedas en la caché de meta LRU. La meta LRU se utiliza para almacenar páginas internas del árbol B.<br>_Se muestra como operación_. |
| **mapr.cache.lookups_smallfile** <br>(count) | El número de búsquedas en la caché de LRU de archivos pequeños. Esta LRU se utiliza para almacenar archivos con un tamaño inferior a 64 K y páginas de índice de bases de datos de MapR.<br>_Se muestra como operación_. |
| **mapr.cache.lookups_table** <br>(count) | El número de búsquedas en la caché de la tabla LRU. La tabla LRU se utiliza para almacenar páginas de hojas internas del árbol B.<br>_Se muestra como operación_. |
| **mapr.cache.misses_data** <br>(count) | El número de pérdidas de caché en la caché de bloques.<br>_Se muestra como pérdida_ |
| **mapr.cache.misses_dir** <br>(count) | El número de pérdidas de caché en la tabla LRU de caché.<br>_Se muestra como pérdida_ |
| **mapr.cache.misses_inode** <br>(count) | El número de pérdidas de caché en la caché de inodo.<br>_Se muestra como pérdida_ |
| **mapr.cache.misses_largefile** <br>(count) | Número de pérdidas de caché en la caché LRU de archivos grandes.<br>_Se muestra como pérdida_ |
| **mapr.cache.misses_meta** <br>(count) | Número de pérdidas de caché en la caché meta LRU.<br>_Se muestra como pérdida_ |
| **mapr.cache.misses_smallfile** <br>(count) | Número de pérdidas de caché en la caché LRU de archivos pequeños.<br>_Se muestra como pérdida_ |
| **mapr.cache.misses_table** <br>(count) | El número de pérdidas de caché en la tabla LRU de caché.<br>_Se muestra como pérdida_ |
| **mapr.cldb.cluster_cpu_total** <br>(gauge) | El número de CPU físicas en el clúster.<br>_Se muestra como CPU_ |
| **mapr.cldb.cluster_cpubusy_percent** <br>(gauge) | El porcentaje agregado de CPU ocupadas en el clúster.<br>_Se muestra como porcentaje_ |
| **mapr.cldb.cluster_disk_capacity** <br>(gauge) | La capacidad de almacenamiento de los discos de MapR en GB.<br>_Se muestra como gibibyte_ |
| **mapr.cldb.cluster_diskspace_used** <br>(gauge) | La cantidad de discos de MapR utilizados en GB.<br>_Se muestra como gibibyte_ |
| **mapr.cldb.cluster_memory_capacity** <br>(gauge) | La capacidad de memoria en MB.<br>_Se muestra como mebibyte_ |
| **mapr.cldb.cluster_memory_used** <br>(gauge) | La cantidad de memoria utilizada en MB.<br>_Se muestra como mebibyte_ |
| **mapr.cldb.containers** <br>(gauge) | El número de contenedores actualmente en el clúster.<br>_Se muestra como contenedor_ |
| **mapr.cldb.containers_created** <br>(count) | Número acumulado de contenedores creados en el clúster. Este valor incluye los contenedores que se han eliminado.<br>_Se muestra como contenedor_. |
| **mapr.cldb.containers_unusable** <br>(gauge) | El número de contenedores que ya no son utilizables. La CLDB marca un contenedor como no utilizable cuando el nodo que almacena el contenedor está desconectado durante 1 hora o más.<br>_Se muestra como contenedor_ |
| **mapr.cldb.disk_space_available** <br>(gauge) | La cantidad de espacio disponible en disco en GB.<br>_Se muestra como gibibyte_ |
| **mapr.cldb.nodes_in_cluster** <br>(gauge) | El número de nodos en el clúster.<br>_Se muestra como nodo_ |
| **mapr.cldb.nodes_offline** <br>(gauge) | El número de nodos del clúster que están desconectados.<br>_Se muestra como nodo_ |
| **mapr.cldb.rpc_received** <br>(count) | El número de RPC recibidos.<br>_Se muestra como operación_ |
| **mapr.cldb.rpcs_failed** <br>(count) | El número de RPC fallidas.<br>_Se muestra como operación_ |
| **mapr.cldb.storage_pools_cluster** <br>(gauge) | El número de grupos de almacenamiento.|
| **mapr.cldb.storage_pools_offline** <br>(gauge) | El número de grupos de almacenamiento desconectados.|
| **mapr.cldb.volumes** <br>(gauge) | El número de volúmenes creados, incluidos los volúmenes del sistema.<br>_Se muestra como volumen_ |
| **mapr.db.append_bytes** <br>(count) | El número de bytes escritos por RPC anexados<br>_Se muestra como byte_ |
| **mapr.db.append_rpcrows** <br>(count) | El número de filas escritas por RPC anexados<br>_Se muestra como objeto_ |
| **mapr.db.append_rpcs** <br>(count) | El número de RPC anexados finalizados de la base de datos de MapR<br>_Se muestra como operación_ |
| **mapr.db.cdc.pending_bytes** <br>(gauge) | El número de bytes de datos de CDC que quedan por enviar<br>_Se muestra como byte_ |
| **mapr.db.cdc.sent_bytes** <br>(count) | El número de bytes de datos de CDC enviados<br>_Se muestra como byte_ |
| **mapr.db.checkandput_bytes** <br>(count) | El número de bytes escritos por los RPC check y vendidos<br>_Se muestra como byte_ |
| **mapr.db.checkandput_rpcrows** <br>(count) | El número de filas escritas por RPC check y vendidos<br>_Se muestra como objeto_ |
| **mapr.db.checkandput_rpcs** <br>(count) | Número de RPC check y vendidos finalizados de la base de datos de MapR<br>_Se muestra como operación_ |
| **mapr.db.flushes** <br>(count) | El número de descargas que reorganizan los datos de los archivos de buckets (datos sin clasificar) a los archivos perdidos (datos clasificados) cuando el tamaño del bucket supera un umbral.<br>_Se muestra como descarga_ |
| **mapr.db.forceflushes** <br>(count) | El número de descargas que reorganizan los datos de los archivos de buckets (datos sin clasificar) a los archivos perdidos (datos clasificados) cuando se llena la caché de archivos de buckets en memoria.<br>_Se muestra como descarga_. |
| **mapr.db.fullcompacts** <br>(count) | El número de compactaciones que combinan varios archivos de datos de la base de datos de MapR que contienen datos clasificados (denominados pérdidas) en un único archivo de pérdida.<br>_Se muestra como operación_. |
| **mapr.db.get_bytes** <br>(count) | El número de bytes leídos por RPC obtenidos<br>_Se muestra como byte_ |
| **mapr.db.get_currpcs** <br>(gauge) | El número de RPC obtenidos de la base de datos de MapR en progreso<br>_Se muestra como operación_ |
| **mapr.db.get_readrows** <br>(count) | El número de filas leídas por RPC obtenidos<br>_Se muestra como objeto_ |
| **mapr.db.get_resprows** <br>(count) | El número de filas devueltas desde RPC obtenidos<br>_Se muestra como objeto_ |
| **mapr.db.get_rpcs** <br>(count) | Número de RPC de obtención de bases de datos de MapR finalizadas<br>_Se muestra como operación_ |
| **mapr.db.increment_bytes** <br>(count) | El número de bytes escritos por RPC de incremento<br>_Se muestra como byte_ |
| **mapr.db.increment_rpcrows** <br>(count) | El número de filas escritas por RPC de incremento<br>_Se muestra como objeto_ |
| **mapr.db.increment_rpcs** <br>(count) | El número de RPC de incremento de la base de datos de MapR completado<br>_Se muestra como operación_ |
| **mapr.db.index.pending_bytes** <br>(gauge) | El número de bytes de datos de índice secundario que quedan por enviar<br>_Se muestra como byte_ |
| **mapr.db.minicompacts** <br>(count) | El número de compactaciones que combinan varios archivos de datos pequeños que contienen datos clasificados (denominados pérdidas) en un único archivo de pérdida.<br>_Se muestra como operación_ |
| **mapr.db.put_bytes** <br>(count) | El número de bytes escritos por RPC vendidos<br>_Se muestra como byte_ |
| **mapr.db.put_currpcs** <br>(gauge) | El número de RPC vendidos de la base de datos de MapR en progreso<br>_Se muestra como operación_ |
| **mapr.db.put_readrows** <br>(count) | El número de filas leídas por RPC vendidos<br>_Se muestra como objeto_ |
| **mapr.db.put_rpcrows** <br>(count) | El número de filas escritas por RPC vendidos. Cada RPC vendido de la base de datos de MapR puede incluir varias filas vendidas.<br>_Se muestra como objeto_. |
| **mapr.db.put_rpcs** <br>(count) | El número de RPC vendidos finalizados de la base de datos de MapR<br>_Se muestra como operación_ |
| **mapr.db.repl.pending_bytes** <br>(gauge) | El número de bytes de datos de replicación que quedan por enviar<br>_Se muestra como byte_ |
| **mapr.db.repl.sent_bytes** <br>(count) | El número de bytes enviados para replicar los datos<br>_Se muestra como byte_ |
| **mapr.db.scan_bytes** <br>(count) | El número de bytes leídos por RPC de scan<br>_Se muestra como byte_ |
| **mapr.db.scan_currpcs** <br>(gauge) | El número de RPC de scan de la base de datos de MapR en curso<br>_Se muestra como operación_ |
| **mapr.db.scan_readrows** <br>(count) | El número de filas leídas por RPC de scan<br>_Se muestra como objeto_ |
| **mapr.db.scan_resprows** <br>(count) | El número de filas devueltas por los RPC de scan.<br>_Se muestra como objeto_ |
| **mapr.db.scan_rpcs** <br>(count) | El número de RPC de scan de la base de datos de MapR finalizados<br>_Se muestra como operación_ |
| **mapr.db.table.latency** <br>(gauge) | La latencia de las operaciones de RPC en las tablas, representada como un histograma. Los endpoints identifican los límites de los buckets del histograma.<br>_Se muestra en milisegundos_. |
| **mapr.db.table.read_bytes** <br>(count) | El número de bytes leídos de las tablas<br>_Se muestra como byte_ |
| **mapr.db.table.read_rows** <br>(count) | El número de filas leídas de las tablas<br>_Se muestra como objeto_. |
| **mapr.db.table.resp_rows** <br>(count) | El número de filas devueltas de las tablas<br>_Se muestra como objeto_ |
| **mapr.db.table.rpcs** <br>(count) | El número de llamadas de RPC finalizadas en las tablas<br>_Se muestra como operación_ |
| **mapr.db.table.value_cache_hits** <br>(count) | Número de operaciones de la base de datos de MapR en tablas que utilizaron la caché de valores de la base de datos de MapR<br>_Se muestra como operación_. |
| **mapr.db.table.value_cache_lookups** <br>(count) | Número de operaciones de la base de datos de MapR en tablas que realizaron una búsqueda en la caché de valores de la base de datos de MapR<br>_Se muestra como operación_. |
| **mapr.db.table.write_bytes** <br>(count) | El número de bytes escritos en las tablas<br>_Se muestra como byte_ |
| **mapr.db.table.write_rows** <br>(count) | El número de filas escritas en las tablas<br>_Se muestra como objeto_ |
| **mapr.db.ttlcompacts** <br>(count) | Número de compactaciones que dan lugar a la recuperación de espacio en disco debido a la eliminación de datos obsoletos.<br>_Se muestra como operación_ |
| **mapr.db.updateandget_bytes** <br>(count) | El número de bytes escritos por RPC actualizados y obtenidos<br>_Se muestra como byte_ |
| **mapr.db.updateandget_rpcrows** <br>(count) | El número de filas escritas por RPC actualizados y obtenidos<br>_Se muestra como objeto_ |
| **mapr.db.updateandget_rpcs** <br>(count) | Número de RPC actualizados y obtenidos de la base de datos de MapR finalizado<br>_Se muestra como operación_ |
| **mapr.db.valuecache_hits** <br>(count) | Número de operaciones de la base de datos de MapR que utilizaron la caché de valores de la base de datos de MapR<br>_Se muestra como operación_. |
| **mapr.db.valuecache_lookups** <br>(count) | Número de operaciones de la base de datos de MapR que realizaron una búsqueda en la caché de valores de la base de datos de MapR<br>_Se muestra como operación_. |
| **mapr.db.valuecache_usedSize** <br>(gauge) | El tamaño de la caché de valores de la base de datos de MapR en MB<br>_Se muestra como mebibyte_ |
| **mapr.drill.allocator_root_peak** <br>(gauge) | La cantidad máxima de memoria utilizada en bytes por el asignador de memoria interna.<br>_Se muestra como byte_ |
| **mapr.drill.allocator_root_used** <br>(gauge) | La cantidad de memoria utilizada en bytes por el asignador de memoria interna.<br>_Se muestra como byte_ |
| **mapr.drill.blocked_count** <br>(gauge) | El número de subprocesos que están bloqueados porque están esperando un bloqueo de monitor (noun).<br>_Se muestra como subproceso_ |
| **mapr.drill.count** <br>(gauge) | El número de subprocesos activos (incluidos los subprocesos daemon y no daemon).<br>_Se muestra como subproceso_ |
| **mapr.drill.fd_usage** <br>(gauge) | Relación de descriptores de archivo utilizados con respecto al total.|
| **mapr.drill.fragments_running** <br>(gauge) | El número de fragmentos de consulta que se están ejecutando actualmente en el bit de exploración.<br>_Se muestra como byte_ |
| **mapr.drill.heap_used** <br>(gauge) | La cantidad de memoria de montón utilizada en bytes por la JVM.<br>_Se muestra como byte_ |
| **mapr.drill.non_heap_used** <br>(gauge) | La cantidad de memoria que no son montones utilizada en bytes por la JVM.<br>_Se muestra como byte_ |
| **mapr.drill.queries_completed** <br>(count) | El número de consultas finalizadas, canceladas o fallidas para las que este bit de exploración es el capataz.<br>_Se muestra como byte_ |
| **mapr.drill.queries_running** <br>(gauge) | El número de consultas en ejecución para las que este bit de exploración es el capataz.<br>_Se muestra como byte_ |
| **mapr.drill.runnable_count** <br>(gauge) | El número de subprocesos que se están ejecutando en la JVM.<br>_Se muestra como subproceso_ |
| **mapr.drill.waiting_count** <br>(gauge) | El número de subprocesos que están esperando a ser ejecutados. Esto puede ocurrir cuando un subproceso debe esperar a que otro subproceso realice una acción antes de continuar.<br>_Se muestra como subproceso_. |
| **mapr.fs.bulk_writes** <br>(count) | El número de operaciones de escritura masiva. Las operaciones de escritura masiva se producen cuando el contenedor maestro del sistema de archivos de MapR agrega varias escrituras de archivos de uno o más clientes en una RPC antes de replicar las escrituras.<br>_Se muestra como escritura_ |
| **mapr.fs.bulk_writesbytes** <br>(count) | El número de bytes escritos por las operaciones de escritura masiva. Las operaciones de escritura masiva se producen cuando el contenedor maestro del sistema de archivos de MapR agrega varias escrituras de archivos de uno o más clientes en una RPC antes de replicar las escrituras.<br>_Se muestra como byte_ |
| **mapr.fs.kvstore_delete** <br>(count) | Número de operaciones de eliminación en archivos de almacén de valores clave que utilizan la base de datos de CLDB y de MapR.<br>_Se muestra como operación_ |
| **mapr.fs.kvstore_insert** <br>(count) | Número de operaciones de inserción en archivos de almacén de valores clave que utilizan la base de datos de CLDB y de MapR.<br>_Se muestra como operación_ |
| **mapr.fs.kvstore_lookup** <br>(count) | Número de operaciones de búsqueda en archivos de almacén de valores clave que utilizan la base de datos de CLDB y de MapR.<br>_Se muestra como operación_ |
| **mapr.fs.kvstore_scan** <br>(count) | Número de operaciones de scan en archivos de almacén de valores clave que utilizan la base de datos de CLDB y de MapR.<br>_Se muestra como operación_ |
| **mapr.fs.local_readbytes** <br>(count) | Número de bytes leídos por las aplicaciones que se ejecutan en el nodo del sistema de archivos de MapR.<br>_Se muestra como byte_ |
| **mapr.fs.local_reads** <br>(count) | Número de operaciones de lectura de archivos realizadas por aplicaciones que se ejecutan en el nodo del sistema de archivos de MapR.<br>_Se muestra como leído_ |
| **mapr.fs.local_writebytes** <br>(count) | Número de bytes escritos por las aplicaciones que se ejecutan en el nodo del sistema de archivos de MapR.<br>_Se muestra como byte_ |
| **mapr.fs.local_writes** <br>(count) | Número de operaciones de escritura de archivos realizadas por aplicaciones que se ejecutan en el nodo del sistema de archivos de MapR.<br>_Se muestra como operación_ |
| **mapr.fs.read_bytes** <br>(count) | La cantidad de datos leídos a distancia en MB.<br>_Se muestra como mebibyte_ |
| **mapr.fs.read_cachehits** <br>(count) | Número de aciertos de caché para lecturas de archivos. Este valor incluye las páginas que el sistema de archivos de MapR rellena utilizando el mecanismo de lectura de un encabezado.<br>_Se muestra como acierto_ |
| **mapr.fs.read_cachemisses** <br>(count) | Número de pérdidas de caché en operaciones de lectura de archivos.<br>_Se muestra como pérdida_ |
| **mapr.fs.reads** <br>(count) | El número de lecturas remotas.<br>_Se muestra como lectura_ |
| **mapr.fs.statstype_create** <br>(count) | El número de operaciones de creación de archivos.<br>_Se muestra como operación_ |
| **mapr.fs.statstype_lookup** <br>(count) | El número de operaciones de búsqueda.<br>_Se muestra como operación_ |
| **mapr.fs.statstype_read** <br>(count) | El número de operaciones de lectura de archivos.<br>_Se muestra como lectura_ |
| **mapr.fs.statstype_write** <br>(count) | El número de operaciones de escritura de archivos.<br>_Se muestra como escritura_ |
| **mapr.fs.write_bytes** <br>(count) | La cantidad de datos escritos a distancia en MB.<br>_Se muestra como mebibyte_ |
| **mapr.fs.writes** <br>(count) | El número de escrituras remotas.<br>_Se muestra como escritura_ |
| **mapr.io.read_bytes** <br>(gauge) | El número de MB leídos del disco.<br>_Se muestra como mebibyte_ |
| **mapr.io.reads** <br>(gauge) | El número de operaciones de lectura del disco del sistema de archivos de MapR.<br>_Se muestra como lectura_ |
| **mapr.io.write_bytes** <br>(count) | El número de MB escritos en el disco.<br>_Se muestra como mebibyte_ |
| **mapr.io.writes** <br>(count) | Número de operaciones de escritura en disco del sistema de archivos de MapR.<br>_Se muestra como escritura_ |
| **mapr.metrics.submitted** <br>(gauge) | Número de métricas enviadas en cada ejecución de check.|
| **mapr.process.context_switch_involuntary** <br>(count) | El número de cambios de contexto involuntarios para los procesos de MapR.<br>_Se muestra como operación_ |
| **mapr.process.context_switch_voluntary** <br>(count) | El número de cambios de contexto voluntarios para los procesos de MapR.<br>_Se muestra como proceso_ |
| **mapr.process.cpu_percent** <br>(gauge) | El porcentaje de CPU utilizado para los procesos de MapR.<br>_Se muestra como porcentaje_ |
| **mapr.process.cpu_time.syst** <br>(count) | La cantidad de tiempo medido en segundos que el proceso ha estado en modo kernel.<br>_Se muestra como segundo_ |
| **mapr.process.cpu_time.user** <br>(count) | La cantidad de tiempo medida en segundos que el proceso ha estado en modo usuario<br>_Se muestra como segundo_ |
| **mapr.process.data** <br>(gauge) | La cantidad de memoria en MB utilizada por los segmentos de datos de los procesos de MapR.<br>_Se muestra como mebibyte_ |
| **mapr.process.disk_octets.read** <br>(count) | El número de bytes leídos desde el disco para los procesos de MapR.<br>_Se muestra como byte_ |
| **mapr.process.disk_octets.write** <br>(count) | El número de bytes escritos en disco para los procesos de MapR.<br>_Se muestra como byte_ |
| **mapr.process.disk_ops.read** <br>(count) | El número de operaciones de lectura para los procesos de MapR.<br>_Se muestra como lectura_ |
| **mapr.process.disk_ops.write** <br>(count) | El número de operaciones de escritura para los procesos de MapR.<br>_Se muestra como escritura_ |
| **mapr.process.mem_percent** <br>(gauge) | Porcentaje de la memoria total del sistema (no limitada por los procesos de MapR) utilizada por los procesos de MapR.<br>_Se muestra como porcentaje_. |
| **mapr.process.page_faults.majflt** <br>(count) | Número de fallos importantes del proceso de MapR que requirieron cargar una page (página) de memoria desde el disco.<br>_Se muestra como error_ |
| **mapr.process.page_faults.minflt** <br>(count) | El número de fallos menores del proceso de MapR que requirieron cargar una page (página) de memoria desde el disco.<br>_Se muestra como error_ |
| **mapr.process.rss** <br>(gauge) | La cantidad real de memoria en MB utilizada por los procesos de MapR.<br>_Se muestra como mebibyte_ |
| **mapr.process.vm** <br>(gauge) | La cantidad de memoria virtual en MB utilizada por los procesos de MapR.<br>_Se muestra como mebibyte_ |
| **mapr.rpc.bytes_recd** <br>(count) | El número de bytes recibidos por el sistema de archivos de MapR a través de RPC.<br>_Se muestra como byte_ |
| **mapr.rpc.bytes_sent** <br>(count) | El número de bytes enviados por el sistema de archivos de MapR a través de RPC.<br>_Se muestra como byte_ |
| **mapr.rpc.calls_recd** <br>(count) | Número de llamadas RPC recibidas por el sistema de archivos de MapR.<br>_Se muestra como mensaje_ |
| **mapr.streams.listen_bytes** <br>(count) | El número de megabytes consumidos por los mensajes de Streams.<br>_Se muestra como mebibyte_ |
| **mapr.streams.listen_currpcs** <br>(gauge) | El número de RPC simultáneos del consumidor de Stream.<br>_Se muestra como objeto_ |
| **mapr.streams.listen_msgs** <br>(count) | El número de mensajes de Streams leídos por el consumidor.<br>_Se muestra como objeto_ |
| **mapr.streams.listen_rpcs** <br>(count) | El número de RPC del consumidor de Streams.<br>_Se muestra como objeto_ |
| **mapr.streams.produce_bytes** <br>(count) | El número de megabytes producidos por los mensajes de Streams.<br>_Se muestra como mebibyte_ |
| **mapr.streams.produce_msgs** <br>(count) | El número de mensajes de Streams producidos.<br>_Se muestra como objeto_ |
| **mapr.streams.produce_rpcs** <br>(count) | El número de RPC del productor de Streams.<br>_Se muestra como objeto_ |
| **mapr.topology.disks_total_capacity** <br>(gauge) | La capacidad del disco en gigabytes.<br>_Se muestra como gibibyte_ |
| **mapr.topology.disks_used_capacity** <br>(gauge) | La cantidad de espacio de disco utilizada en gigabytes.<br>_Se muestra como gibibyte_ |
| **mapr.topology.utilization** <br>(gauge) | El porcentaje agregado de utilización de la CPU.<br>_Se muestra como porcentaje_ |
| **mapr.volmetrics.read_latency** <br>(gauge) | La latencia de lectura por volumen en milisegundos<br>_Se muestra como milisegundo_ |
| **mapr.volmetrics.read_ops** <br>(count) | Un count de las operaciones de lectura por volumen<br>_Se muestra como operación_ |
| **mapr.volmetrics.read_throughput** <br>(gauge) | El rendimiento de lectura por volumen en KB<br>_Se muestra como kibibyte_ |
| **mapr.volmetrics.write_latency** <br>(gauge) | La latencia de escritura por volumen en milisegundos<br>_Se muestra como milisegundo_ |
| **mapr.volmetrics.write_ops** <br>(count) | Un count de las operaciones de escritura por volumen<br>_Se muestra como operación_ |
| **mapr.volmetrics.write_throughput** <br>(gauge) | El rendimiento de escritura por volumen en KB<br>_Se muestra como kibibyte_ |
| **mapr.volume.logical_used** <br>(gauge) | El número de MB utilizados para los volúmenes lógicos antes de aplicar la compresión a los archivos.<br>_Se muestra como mebibyte_ |
| **mapr.volume.quota** <br>(gauge) | El número de megabytes (MB) utilizados para la cuota de volumen.<br>_Se muestra como mebibyte_ |
| **mapr.volume.snapshot_used** <br>(gauge) | El número de MB utilizados para las instantáneas.<br>_Se muestra como mebibyte_ |
| **mapr.volume.total_used** <br>(gauge) | El número de MB utilizados para volúmenes e instantáneas.<br>_Se muestra como mebibyte_ |
| **mapr.volume.used** <br>(gauge) | El número de MB utilizados para los volúmenes después de aplicar la compresión a los archivos.<br>_Se muestra como mebibyte_ |

### Eventos

El check de MapR no incluye eventos.

### Checks de servicio

**mapr.can_connect**

Devuelve `CRITICAL` si el Agent no consigue conectarse y suscribirse al tema del flujo (stream), `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

- **El Agent entra en un bucle de error luego de configurar la integración de MapR.**

  Ha habido algunos casos en los que la biblioteca de C dentro de _mapr-streams-python_ genera errores de segmentación debido a problemas de permisos. Asegúrate de que el usuario del `dd-agent` tenga permiso de lectura en el archivo del ticket y que dicho usuario del `dd-agent` pueda ejecutar comandos de la `maprcli` cuando la variable de entorno `MAPR_TICKETFILE_LOCATION` esté apuntando hacia el ticket.

- **La integración parece funcionar correctamente, pero no envía ninguna métrica.**

  Asegúrate de dejar que el Agent se ejecute durante al menos un par de minutos, ya que la integración extrae datos de un tema y MapR necesita introducir datos en ese tema.
  Si eso no funciona, pero al ejecutar el Agent manualmente con `sudo` se muestran datos, se trata de un problema con los permisos. Revisa todo. El usuario de Linux del `dd-agent` debe ser capaz de utilizar un ticket almacenado localmente, lo que le permite ejecutar consultas en MapR como usuario X (que puede o no ser el mismo `dd-agent`). Además, el usuario X debe tener el permiso `consume` en el flujo (stream) `/var/mapr/mapr.monitoring/metricstreams`.

- **Ves el mensaje `confluent_kafka was not imported correctly ...`**

  El entorno integrado del Agent no pudo ejecutar el comando `import confluent_kafka`. Esto significa que la _biblioteca de flujos (streams) de MapR_ no se instaló dentro del entorno integrado o que no puede encontrar las bibliotecas mapr-core. El mensaje de error debería incluir más detalles.

¿Necesitas más ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).