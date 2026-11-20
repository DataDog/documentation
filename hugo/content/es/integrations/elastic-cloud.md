---
aliases:
- /es/integrations/elastic_cloud
app_id: elastic-cloud
categories:
- métricas
custom_kind: integración
description: Monitorización de métricas de servicios Elasticsearch alojados en Elastic
  Cloud.
integration_version: 1.0.0
media: []
title: Elastic Cloud
---
## Información general

Integración con Elastic Cloud para mantenerte al día con tus servicios Elasticsearch alojados.

La integración proporciona métricas de tus servicios Elastic Cloud, incluyendo lo siguiente:

- Estadísticas de clúster
- Estados de clúster
- Estadísticas de nodos e índices
- Métricas de uso de recursos

## Configuración

### Instalación

No requiere pasos de instalación.

### Configuración

#### Recopilación de métricas

Crea un usuario de Elastic Cloud de solo lectura para tu despliegue e introduce las credenciales de usuario en el [ícono de integración de Elastic Cloud](https://app.datadoghq.com/account/settings#integrations/elastic-cloud).

1. Accede a todos tus [despliegues de Elastic Cloud](https://cloud.elastic.co/deployments).
1. Selecciona el nombre de tu despliegue.
1. Haz clic en **Manage permissions** (Gestionar permisos) en **Management** (Gestión).
1. En la pestaña **Roles**, crea un rol haciendo clic en **Create role** (Crear rol).
   1. Introduce **Datadog-Role** (Rol de Datadog) en **Role Name** (Nombre del rol).
   1. Introduce **Monitor, read_slm** en **Privilegios de clúster de Elasticsearch**.
   1. En **Índices**, introduce los índices de los que quieres obtener métricas.
   1. En **Privilegios**, introduce **Monitor**.
   1. Haz clic en **Create role** (Crear rol).
1. Selecciona la pestaña **Usuarios**.
   1. Haz clic en **Create user** (Crear usuario).
   1. Rellena el formulario con un nombre de usuario, un correo electrónico y una contraseña.
   1. En **Privilegios**, selecciona **Datadog-Role** en el desplegable **Roles**.
   1. Haz clic en **Create user** (Crear usuario).

Obtén la URL de tu despliegue de Elastic Cloud a través de los siguientes pasos:

1. Accede a todos tus [despliegues de Elastic Cloud](https://cloud.elastic.co/deployments).
1. Selecciona tu despliegue.
1. Busca **Elasticsearch** en **Aplicaciones**.
1. Haz clic en **Copy Endpoint** (Copiar endpoint) para copiar la URL de tu despliegue.

Por defecto, la integración recopilará estadísticas de los nodos de tus clústeres, como el número de nodos o el número de
documentos en cada nodo.

Los siguientes son indicadores configurables que puedes definir en el cuadro de la integración para recibir métricas específicas:

Estadísticas de fragmentos primarios
: Sólo métricas de los fragmentos de clúster primarios.

Apagado ordenado de fragmentos primarios
: Las métricas de fragmentos primarios de clúster pueden llegar a ser muy grandes, por lo que existe la posibilidad de que se agote el tiempo de espera de la solicitud. Habilita este
indicador para seguir recopilando todas las demás métricas a pesar del tiempo de espera.

Estadísticas detalladas de índices
: Habilita esta opción para obtener estadísticas de fragmentos primarios específicas de índices.

Estadísticas de tareas pendientes
: Métricas de cambios de nivel de clúster que aún no se han ejecutado.

Estadísticas de asignación de fragmentos
: Métricas del número de fragmentos asignados a cada nodo de datos y su espacio en disco.

Estadísticas de gestión del ciclo de vida de snapshots
: Métricas de acciones llevadas a cabo por la gestión del ciclo de vida de snapshots.

Estadísticas de índices
: Habilítalas para recopilar métricas de índices individuales.

### Filtro de tráfico IP

Elastic Cloud permite filtrar el tráfico, ya sea por dirección IP o por bloque CIDR, como capa de seguridad. Limita la forma en que
se puede acceder a los despliegues.
Deben permitirse determinados prefijos de direcciones IP para que Datadog pueda recuperar métricas del despliegue.

Sigue estos [pasos](https://www.elastic.co/guide/en/cloud-enterprise/current/ece-traffic-filtering-ip.html) para crear un conjunto de reglas de filtrado de tráfico. Después de crear el conjunto de reglas, asócialo
a tu despliegue.

Para incluir los prefijos IP de Datadog:

1. Busca los rangos de IP de Datadog [aquí](https://docs.datadoghq.com/api/latest/ip-ranges/).
1. Introduce cada prefijo bajo **webhooks** en el conjunto de reglas de tráfico como **fuente**.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **elastic_cloud.active_primary_shards** <br>(gauge) | El número de particiones primarias activas en el clúster.<br>_Mostrado como partición_ |
| **elastic_cloud.active_shards** <br>(gauge) | El número de particiones activas en el clúster.<br>_Mostrado como partición_ |
| **elastic_cloud.breakers.fielddata.estimated_size_in_bytes** <br>(gauge) | El tamaño estimado en bytes del interruptor de datos de campo \[v1.4.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.breakers.fielddata.overhead** <br>(gauge) | El multiplicador constante para las estimaciones de bytes del interruptor de datos de campo \[v1.4.0+\].|
| **elastic_cloud.breakers.fielddata.tripped** <br>(gauge) | El número de veces que se ha disparado el interruptor de datos de campo \[v1.4.0+\\].|
| **elastic_cloud.breakers.parent.estimated_size_in_bytes** <br>(gauge) | El tamaño estimado en bytes del interruptor principal \[v1.4.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.breakers.parent.overhead** <br>(gauge) | El multiplicador constante para las estimaciones de bytes del interruptor principal \[v1.4.0+\].|
| **elastic_cloud.breakers.parent.tripped** <br>(calibre) | El número de veces que se ha disparado el interruptor principal.|
| **elastic_cloud.breakers.request.estimated_size_in_bytes** <br>(gauge) | El tamaño estimado en bytes del interruptor de solicitud \[v1.4.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.breakers.request.overhead** <br>(gauge) | El multiplicador constante para las estimaciones de bytes del interruptor de solicitud \[v1.4.0+\].|
| **elastic_cloud.breakers.request.tripped** <br>(gauge) | El número de veces que se ha disparado el interruptor de solicitud \[v1.4.0+\\].|
| **elastic_cloud.breakers.inflight_requests.tripped** <br>(gauge) | El número de veces que se ha disparado el interruptor de a bordo \[v5+\].|
| **elastic_cloud.breakers.inflight_requests.overhead** <br>(gauge) | El multiplicador constante para las estimaciones de bytes del interruptor de a bordo \[v5+\].|
| **elastic_cloud.breakers.inflight_requests.estimated_size_in_bytes** <br>(gauge) | El tamaño estimado en bytes del interruptor de a bordo \[v5+\].<br>_Mostrado como byte_ |
| **elastic_cloud.cache.field.evictions** <br>(gauge) | El número total de desalojos de la caché de datos de campo \[pre v0.90.5\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.cache.field.size** <br>(gauge) | El tamaño de la caché de campo [pre v0.90.5].<br>_Mostrado como byte_ |
| **elastic_cloud.cache.filter.count** <br>(gauge) | El número de elementos en la caché del filtro \[pre v0.90.5\].<br>_Mostrado como elemento_ |
| **elastic_cloud.cache.filter.evictions** <br>(gauge) | El número total de desalojos de la caché del filtro \[pre 2.0\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.cache.filter.evictions.count** <br>(count) | El número total de desalojos de la caché de filtros como un count \[v0.90.5 pre 2.0\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.cache.filter.size** <br>(gauge) | El tamaño de la caché del filtro \[pre 2.0\].<br>_Mostrado como byte_ |
| **elastic_cloud.cluster_status** <br>(gauge) | El estado del clúster de elastic_cloud como un número: rojo = 0, amarillo = 1, verde = 2.|
| **elastic_cloud.docs.count** <br>(gauge) | El número total de documentos en el clúster en todas las particiones.<br>_Mostrado como documento_ |
| **elastic_cloud.docs.deleted** <br>(gauge) | El número total de documentos eliminados del clúster en todas las particiones.<br>_Mostrado como documento_ |
| **elastic_cloud.disk.avail** <br>(gauge) | El espacio libre en disco disponible para elastic_cloud.<br>_Mostrado como byte_ |
| **elastic_cloud.disk.indices** <br>(gauge) | El espacio de disco utilizado por los fragmentos del nodo.<br>_Mostrado como byte_ |
| **elastic_cloud.disk.percent** <br>(gauge) | El porcentaje total de espacio de disco en uso. Calculado como disk.used / disk.total.<br>_Mostrado como porcentaje_. |
| **elastic_cloud.disk.total** <br>(gauge) | El espacio total de disco para el nodo, incluido el espacio en uso y el disponible.<br>_Mostrado como byte_ |
| **elastic_cloud.disk.used** <br>(gauge) | El espacio total de disco en uso.<br>_Mostrado como byte_ |
| **elastic_cloud.fielddata.evictions** <br>(gauge) | El número total de desalojos de la caché de datos de campo \[v0.90.5+\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.fielddata.evictions.count** <br>(count) | El número total de desalojos de la caché de datos de campo como count \[v0.90.5+\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.fielddata.size** <br>(gauge) | El tamaño de la caché de datos de campo \[v0.90.5+\].<br>_Mostrado como byte_ |
| **elastic_cloud.flush.total** <br>(gauge) | El número total de descargas de índices al disco desde el inicio.<br>_Mostrado como descarga_ |
| **elastic_cloud.flush.total.count** <br>(count) | El número total de descargas de índices al disco desde el inicio en forma de count.<br>_Mostrado como descarga_ |
| **elastic_cloud.flush.total.time** <br>(gauge) | El tiempo total empleado en descargar el índice al disco.<br>_Mostrado como segundo_ |
| **elastic_cloud.flush.total.time.count** <br>(count) | El tiempo total empleado en descargar el índice al disco como un count.<br>_Mostrado como segundo_ |
| **elastic_cloud.fs.total.available_in_bytes** <br>(gauge) | El número total de bytes disponibles para esta máquina virtual Java en este almacén de archivos.<br>_Mostrado como byte_ |
| **elastic_cloud.fs.total.disk_io_op** <br>(gauge) | El total de operaciones de E/S en el almacén de archivos \[v1.0+\].<br>_Mostrado como operación_ |
| **elastic_cloud.fs.total.disk_io_size_in_bytes** <br>(gauge) | Total de bytes utilizados para todas las operaciones de E/S en el almacén de archivos \[v1.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.fs.total.disk_read_size_in_bytes** <br>(gauge) | El total de bytes leídos del almacén de archivos \[v1.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.fs.total.disk_reads** <br>(gauge) | El número total de lecturas del almacén de archivos \[v1.0+\].<br>_Mostrado como lectura_ |
| **elastic_cloud.fs.total.disk_write_size_in_bytes** <br>(gauge) | El total de bytes escritos en el almacén de archivos \[v1.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.fs.total.disk_writes** <br>(gauge) | El número total de escrituras en el almacén de archivos \[v1.0+\].<br>_Mostrado como escritura_ |
| **elastic_cloud.fs.total.free_in_bytes** <br>(gauge) | El número total de bytes sin asignar en el almacén de archivos.<br>_Mostrado como byte_ |
| **elastic_cloud.fs.total.total_in_bytes** <br>(gauge) | El tamaño total en bytes del almacén de archivos.<br>_Mostrado como byte_ |
| **elastic_cloud.get.current** <br>(gauge) | El número de solicitudes get actualmente en ejecución.<br>_Mostrado como solicitud_ |
| **elastic_cloud.get.exists.time** <br>(gauge) | El tiempo total empleado en las solicitudes get en las que existía el documento.<br>_Mostrado como segundo_ |
| **elastic_cloud.get.exists.time.count** <br>(count) | El tiempo total empleado en las solicitudes get en las que el documento existía como count.<br>_Mostrado como segundo_ |
| **elastic_cloud.get.exists.total** <br>(gauge) | El número total de solicitudes get en las que existía el documento.<br>_Mostrado como solicitud_ |
| **elastic_cloud.get.exists.total.count** <br>(count) | El número total de solicitudes get en las que existía el documento como coiunt.<br>_Mostrado como solicitud_ |
| **elastic_cloud.get.missing.time** <br>(gauge) | El tiempo total empleado en las solicitudes get en las que faltaba el documento.<br>_Mostrado como segundo_ |
| **elastic_cloud.get.missing.time.count** <br>(count) | El tiempo total empleado en las solicitudes get en las que faltaba el documento en forma de count.<br>_Mostrado como segundo_ |
| **elastic_cloud.get.missing.total** <br>(gauge) | El número total de solicitudes get en las que faltaba el documento.<br>_Mostrado como solicitud_ |
| **elastic_cloud.get.missing.total.count** <br>(count) | El número total de solicitudes get en las que faltaba el documento en forma de count.<br>_Mostrado como solicitud_ |
| **elastic_cloud.get.time** <br>(gauge) | El tiempo total empleado en las solicitudes get.<br>_Mostrado como segundo_ |
| **elastic_cloud.get.time.count** <br>(count) | El tiempo total empleado en las solicitudes get en forma de count.<br>_Mostrado como segundo_ |
| **elastic_cloud.get.total** <br>(gauge) | El número total de solicitudes get.<br>_Mostrado como solicitud_ |
| **elastic_cloud.get.total.count** <br>(count) | El número total de solicitudes get en forma de count.<br>_Mostrado como solicitud_ |
| **elastic_cloud.http.current_open** <br>(gauge) | El número de conexiones HTTP abiertas actualmente.<br>_Mostrado como connection (conexión)_ |
| **elastic_cloud.http.total_opened** <br>(gauge) | El número total de conexiones HTTP abiertas.<br>_Mostrado como connection (conexión)_ |
| **elastic_cloud.http.total_opened.count** <br>(count) | El número total de conexiones HTTP abiertas en forma de count.<br>_Mostrado connection (conexión)_ |
| **elastic_cloud.id_cache.size** <br>(gauge) | El tamaño de la caché de id \[v0.90.5 pre 2.0\].<br>_Mostrado como byte_ |
| **elastic_cloud.indexing.delete.current** <br>(gauge) | El número de documentos que se están borrando actualmente de un índice.<br>_Mostrado como documento_ |
| **elastic_cloud.indexing.delete.time** <br>(gauge) | El tiempo total empleado en borrar documentos de un índice.<br>_Mostrado como segundo_ |
| **elastic_cloud.indexing.delete.time.count** <br>(count) | El tiempo total empleado en eliminar documentos de un índice en forma de count.<br>_Mostrado como segundo_ |
| **elastic_cloud.indexing.delete.total** <br>(gauge) | El número total de documentos eliminados de un índice.<br>_Mostrado como documento_ |
| **elastic_cloud.indexing.delete.total.count** <br>(count) | El número total de documentos eliminados de un índice en forma de count.<br>_Mostrado como documento_ |
| **elastic_cloud.indexing.index.current** <br>(gauge) | El número de documentos indexados actualmente en un índice.<br>_Mostrado como documento_ |
| **elastic_cloud.indexing.index.time** <br>(gauge) | El tiempo total empleado en indexar documentos en un índice.<br>_Mostrado como segundo_ |
| **elastic_cloud.indexing.index.time.count** <br>(count) | El tiempo total empleado en indexar documentos en un índice en forma de count.<br>_Mostrado como segundo_ |
| **elastic_cloud.indexing.index.total** <br>(gauge) | El número total de documentos indexados en un índice.<br>_Mostrado como documento_ |
| **elastic_cloud.indexing.index.total.count** <br>(count) | El número total de documentos indexados en un índice en forma de count.<br>_Mostrado como documento_ |
| **elastic_cloud.indices.count** <br>(gauge) | El número de índices en el clúster.<br>_Mostrado como índice_ |
| **elastic_cloud.indices.indexing.index_failed** <br>(gauge) | El número de operaciones de indexación fallidas \[v2.1+\].|
| **elastic_cloud.indices.indexing.index_failed.count** <br>(count) | El número de operaciones de indexación fallidas como count \[v2.1+\].|
| **elastic_cloud.indices.indexing.throttle_time** <br>(gauge) | El tiempo total de indexación esperado debido a la limitación \[v1.4.0+\].<br>_Mostrado como milisegundo_ |
| **elastic_cloud.indices.indexing.throttle_time.count** <br>(count) | El tiempo total de espera de indexación debido a la limitación como un count \[v1.4.0+\].<br>_Mostrado como milisegundo_ |
| **elastic_cloud.indices.query_cache.cache_count** <br>(count) | \[v2.0+\].|
| **elastic_cloud.indices.query_cache.cache_size** <br>(gauge) | \[v2.0+\].|
| **elastic_cloud.indices.query_cache.evictions** <br>(gauge) | El número de desalojos de la caché de consultas \[v1.4.0+\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.indices.query_cache.evictions.count** <br>(count) | El número de desalojos de la caché de consultas como count \[v1.4.0+\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.indices.query_cache.hit_count** <br>(gauge) | El número de aciertos en la caché de consultas \[v1.4.0+\].<br>_Mostrado como acierto_ |
| **elastic_cloud.indices.query_cache.hit_count.count** <br>(count) | El número de aciertos en la caché de consultas como count \[v1.4.0+\].<br>_Mostrado como acierto_ |
| **elastic_cloud.indices.query_cache.memory_size_in_bytes** <br>(gauge) | La memoria utilizada por la caché de consultas \[v1.4.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.indices.query_cache.miss_count** <br>(gauge) | El número de fallos de la caché de consultas \[v1.4.0+\].<br>_Mostrado como fallo_ |
| **elastic_cloud.indices.query_cache.miss_count.total** <br>(count) | El número de fallos de la caché de consultas \[v1.4.0+\].<br>_Mostrado como fallo_ |
| **elastic_cloud.indices.query_cache.total_count** <br>(count) | \[v2.0+\].|
| **elastic_cloud.indices.recovery.current_as_source** <br>(gauge) | El número de recuperaciones en curso para las que un fragmento sirve como source (fuente) \[v1.5.0+\].|
| **elastic_cloud.indices.recovery.current_as_target** <br>(gauge) | El número de recuperaciones en curso para las que una partición sirve de objetivo \[v1.5.0+\]. |
| **elastic_cloud.indices.recovery.throttle_time** <br>(gauge) | El tiempo total que han esperado las recuperaciones debido a la limitación \[v1.5.0+\].<br>_Mostrado en milisegundos_ |
| **elastic_cloud.indices.recovery.throttle_time.count** <br>(count) | El tiempo total que han esperado las recuperaciones debido a la limitación como count \[v1.5.0+\].<br>_Mostrado como milisegundo_ |
| **elastic_cloud.indices.request_cache.evictions** <br>(gauge) | El número de desalojos de la caché de solicitudes \[v2.0+\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.indices.request_cache.evictions.count** <br>(count) | El número de desalojos de la caché de solicitudes como count \[v2.0+\].<br>_Mostrado como desalojo_ |
| **elastic_cloud.indices.request_cache.hit_count** <br>(gauge) | El número de aciertos en la caché de solicitudes \[v2.0+\].<br>_Mostrado como acierto_ |
| **elastic_cloud.indices.request_cache.hit_count.count** <br>(count) | El número de aciertos en la caché de solicitudes como count \[v2.0+\].<br>_Mostrado como acierto_ |
| **elastic_cloud.indices.request_cache.memory_size_in_bytes** <br>(gauge) | La memoria utilizada por la caché de solicitudes \[v2.0+\].<br>_Mostrada como byte_ |
| **elastic_cloud.indices.request_cache.miss_count** <br>(gauge) | El número de solicitudes fallidas de caché \[v2.0+\].<br>_Mostrado como fallo_ |
| **elastic_cloud.indices.request_cache.miss_count.count** <br>(count) | El número de solicitudes fallidas de caché como un count \[v2.0+\].<br>_Mostrado como fallo_ |
| **elastic_cloud.indices.segments.count** <br>(gauge) | El número de segmentos en una partición de índice.<br>_Mostrado como segmento_ |
| **elastic_cloud.indices.segments.doc_values_memory_in_bytes** <br>(gauge) | La memoria utilizada por los valores documento.<br>_Mostrado como byte_ |
| **elastic_cloud.indices.segments.fixed_bit_set_memory_in_bytes** <br>(gauge) | La memoria utilizada por el conjunto de bits fijos \[v1.4.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.indices.segments.index_writer_max_memory_in_bytes** <br>(gauge) | La memoria máxima utilizada por el escritor de índices \[v1.4.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.indices.segments.index_writer_memory_in_bytes** <br>(gauge) | La memoria utilizada por el escritor de índices \[v1.3.0+\].<br>_Mostrado como byte_ |
| **elastic_cloud.indices.segments.memory_in_bytes** <br>(gauge) | La memoria utilizada por los segmentos de índice.<br>_Mostrada como byte_ |
| **elastic_cloud.indices.segments.norms_memory_in_bytes** <br>(gauge) | La memoria utilizada por las normas \[v2.0+\].<br>_Mostrada como byte_ |
| **elastic_cloud.indices.segments.stored_fields_memory_in_bytes** <br>(gauge) | La memoria utilizada por los campos almacenados \[v2.0+\].<br>_Mostrada como byte_ |
| **elastic_cloud.indices.segments.term_vectors_memory_in_bytes** <br>(gauge) | La memoria utilizada por los vectores de términos.<br>_Mostrada como byte_ |
| **elastic_cloud.indices.segments.terms_memory_in_bytes** <br>(gauge) | La memoria utilizada por los términos \[v2.0+\].<br>_Mostrada como byte_ |
| **elastic_cloud.indices.segments.version_map_memory_in_bytes** <br>(gauge) | La memoria utilizada por el mapa de la versión del segmento \[v1.3.0+\].<br>_Mostrada como byte_ |
| **elastic_cloud.indices.translog.operations** <br>(gauge) | El número de operaciones del log de la transacción.<br>_Mostrado como operación_ |
| **elastic_cloud.indices.translog.size_in_bytes** <br>(gauge) | El tamaño del log de la transacción.<br>_Mostrado como byte_ |
| **elastic_cloud.initializing_shards** <br>(gauge) | El número de particiones que se están inicializando actualmente.<br>_Mostrado como partición_ |
| **elastic_cloud.merges.current** <br>(gauge) | El número de fusiones de segmentos actualmente activas.<br>_Mostrado como fusión_ |
| **elastic_cloud.merges.current.docs** <br>(gauge) | El número de documentos en todos los segmentos que se están fusionando actualmente.<br>_Mostrado como documento_ |
| **elastic_cloud.merges.current.size** <br>(gauge) | El tamaño de los segmentos que se están fusionando actualmente.<br>_Mostrado como byte_ |
| **elastic_cloud.merges.total** <br>(gauge) | El número total de fusiones de segmentos.<br>_Mostrado como fusión_ |
| **elastic_cloud.merges.total.count** <br>(count) | El número total de fusiones de segmentos en forma de count.<br>_Mostrado como fusión_ |
| **elastic_cloud.merges.total.docs** <br>(gauge) | El número total de documentos en todos los segmentos fusionados.<br>_Mostrado como documento_ |
| **elastic_cloud.merges.total.docs.count** <br>(count) | El número total de documentos en todos los segmentos fusionados como un count.<br>_Mostrado como documento_ |
| **elastic_cloud.merges.total.size** <br>(gauge) | El tamaño total de todos los segmentos fusionados.<br>_Mostrado como byte_ |
| **elastic_cloud.merges.total.size.count** <br>(count) | El tamaño total de todos los segmentos fusionados como un count.<br>_Mostrado como byte_ |
| **elastic_cloud.merges.total.time** <br>(gauge) | El tiempo total empleado en la fusión de segmentos.<br>_Mostrado como segundo_ |
| **elastic_cloud.merges.total.time.count** <br>(count) | El tiempo total empleado en la fusión de segmentos como count.<br>_Mostrado como segundo_ |
| **elastic_cloud.number_of_data_nodes** <br>(gauge) | El número de nodos de datos en el clster.<br>_Mostrado como nodo_ |
| **elastic_cloud.number_of_nodes** <br>(gauge) | El número total de nodos en el clúster.<br>_Mostrado como nodo_ |
| **elastic_cloud.pending_tasks_priority_high** <br>(gauge) | El número de tareas pendientes de alta prioridad.<br>_Mostrado como tarea_ |
| **elastic_cloud.pending_tasks_priority_urgent** <br>(gauge) | El número de tareas pendientes de prioridad urgente.<br>_Mostrado como tarea_ |
| **elastic_cloud.pending_tasks_time_in_queue** <br>(gauge) | El tiempo medio empleado por las tareas en la cola.<br>_Mostrado en milisegundos_ |
| **elastic_cloud.pending_tasks_total** <br>(gauge) | El número total de tareas pendientes.<br>_Mostrado como tarea_ |
| **elastic_cloud.primaries.docs.count** <br>(gauge) | El número total de documentos en las particiones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.docs.deleted** <br>(gauge) | El número total de documentos eliminados de las particiones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.flush.total** <br>(gauge) | El número total de descargas de índices al disco desde las particiones primarias desde el inicio.<br>_Mostrado como descarga_ |
| **elastic_cloud.primaries.flush.total.time** <br>(gauge) | El tiempo total empleado en enviar el índice al disco desde las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.get.current** <br>(gauge) | El número de solicitudes get que se están ejecutando actualmente en las particiones primarias.<br>_Mostrado como solicitud_ |
| **elastic_cloud.primaries.get.exists.time** <br>(gauge) | El tiempo total empleado en las solicitudes get de las particiones primarias donde existía el documento.<br>_Mostrado como solicitud_ |
| **elastic_cloud.primaries.get.exists.total** <br>(gauge) | El número total de solicitudes get en las particiones primarias donde existía el documento.<br>_Mostrado como solicitud_ |
| **elastic_cloud.primaries.get.missing.time** <br>(gauge) | El tiempo total empleado en las solicitudes get de las particiones primarias en las que faltaba el documento.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.get.missing.total** <br>(gauge) | El número total de solicitudes get de las particiones primarias en las que faltaba el documento.<br>_Mostrado como solicitud_ |
| **elastic_cloud.primaries.get.time** <br>(gauge) | El tiempo total empleado en las solicitudes get de las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.get.total** <br>(gauge) | El número total de solicitudes get de las particiones primarias.<br>_Mostrado como solicitud_ |
| **elastic_cloud.primaries.indexing.delete.current** <br>(gauge) | El número de documentos que se están eliminando actualmente de un índice en las particiones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.indexing.delete.time** <br>(gauge) | El tiempo total empleado en la eliminación de documentos de un índice en las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.indexing.delete.total** <br>(gauge) | El número total de documentos eliminados de un índice en las particiones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.indexing.index.current** <br>(gauge) | El número de documentos indexados actualmente en un índice de las particiones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.indexing.index.time** <br>(gauge) | El tiempo total empleado en indexar documentos en un índice de las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.indexing.index.total** <br>(gauge) | El número total de documentos indexados a un índice en las particiones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.merges.current** <br>(gauge) | El número de fusiones de segmentos actualmente activas en las particiones primarias.<br>_Mostrado como fusión_ |
| **elastic_cloud.primaries.merges.current.docs** <br>(gauge) | El número de documentos de todos los segmentos que se están fusionando actualmente en las partiicones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.merges.current.size** <br>(gauge) | El tamaño de los segmentos que se están fusionando actualmente en las particiones primarias.<br>_Mostrado como byte_ |
| **elastic_cloud.primaries.merges.total** <br>(gauge) | El número total de fusiones de segmentos en las particiones primarias.<br>_Mostrado como fusión_ |
| **elastic_cloud.primaries.merges.total.docs** <br>(gauge) | El número total de documentos de todos los segmentos fusionados en las particiones primarias.<br>_Mostrado como documento_ |
| **elastic_cloud.primaries.merges.total.size** <br>(gauge) | El tamaño total de todos los segmentos fusionados en las particiones primarias.<br>_Mostrado como byte_ |
| **elastic_cloud.primaries.merges.total.time** <br>(gauge) | El tiempo total empleado en la fusión de segmentos en las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.refresh.total** <br>(gauge) | El número total de actualizaciones de índices en las particiones primarias.<br>_Mostrado como actualización_ |
| **elastic_cloud.primaries.refresh.total.time** <br>(gauge) | El tiempo total empleado en la actualización de índices en las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.refresh.external.total** <br>(gauge) | El número total de actualizaciones de índices externos en las particiones primarias.<br>_Mostrado como actualización_ |
| **elastic_cloud.primaries.refresh.external.total.time** <br>(gauge) | El tiempo total empleado en las actualizaciones de índices externos en las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.search.fetch.current** <br>(gauge) | El número de accesos a consultas que se están ejecutando actualmente en las particiones primarias.<br>_Mostrado como acceso_ |
| **elastic_cloud.primaries.search.fetch.time** <br>(gauge) | El tiempo total empleado en accesos a consultas en las particiones primarias.<br>_Mostrado como segundo_ |
| **elastic_cloud.primaries.search.fetch.total** <br>(gauge) | El número total de accesos a consultas en las particiones primarias.<br>_Mostrado como acceso_ |
| **elastic_cloud.primaries.search.query.current** <br>(gauge) | El número de consultas activas actualmente en las particiones primarias.<br>_Mostrado como consulta_ |
| **elastic_cloud.primaries.search.query.time** <br>(gauge) | El tiempo total empleado en consulta en las particiones primarias.<br>_Se muestra como segundo_ |
| **elastic_cloud.primaries.search.query.total** <br>(gauge) | El número total de consultas a las particiones primarias.<br>_Mostrado como consulta_ |
| **elastic_cloud.primaries.store.size** <br>(gauge) | El tamaño total de todas las particiones primarias.<br>_Mostrado como byte_ |
| **elastic_cloud.process.open_fd** <br>(gauge) | El número de descriptores de archivo abiertos asociados al proceso actual o -1 si no es compatible.<br>_Mostrado como archivo_ |
| **elastic_cloud.refresh.total** <br>(gauge) | El número total de actualizaciones del índice.<br>_Mostrado como actualización_ |
| **elastic_cloud.refresh.total.count** <br>(count) | El número total de actualizaciones del índice en forma de count<br>_Mostrado como actualización_ |
| **elastic_cloud.refresh.total.time** <br>(gauge) | El tiempo total empleado en actualizar el índice.<br>_Mostrado como segundo_ |
| **elastic_cloud.refresh.total.time.count** <br>(count) | El tiempo total empleado en la actualización del índice en forma de count.<br>_Mostrado como segundo_ |
| **elastic_cloud.refresh.external.total** <br>(gauge) | El número total de actualizaciones de índices externos \[v7.2+\].<br>_Mostrado como actualización_ |
| **elastic_cloud.refresh.external.total.time** <br>(gauge) | El tiempo total empleado en las actualizaciones del índice externo \[v7.2+\].<br>_Mostrado como segundo_ |
| **elastic_cloud.relocating_shards** <br>(gauge) | El número de particiones que se están reubicando de un nodo a otro.<br>_Mostrado como partición_ |
| **elastic_cloud.search.fetch.current** <br>(gauge) | El número de accesos a búsquedas que se están ejecutando actualmente.<br>_Mostrado como acceso_ |
| **elastic_cloud.search.fetch.open_contexts** <br>(gauge) | El número de búsquedas activas \[v0.90.5+\].<br>_Mostrado como consulta_ |
| **elastic_cloud.search.fetch.time** <br>(gauge) | El tiempo total empleado en el acceso a la búsqueda.<br>_Mostrado en segundos_ |
| **elastic_cloud.search.fetch.time.count** <br>(count) | El tiempo total empleado en el acceso a la búsqueda en forma de count.<br>_Mostrado como segundo_ |
| **elastic_cloud.search.fetch.total** <br>(gauge) | El número total de accesos a búsquedas.<br>_Mostrado como acceso_ |
| **elastic_cloud.search.fetch.total.count** <br>(count) | El número total de accesos a búsquedas en forma de count.<br>_Mostrado como acceso_ |
| **elastic_cloud.search.query.current** <br>(gauge) | El número de consultas activas actualmente.<br>_Mostrado como consulta_ |
| **elastic_cloud.search.query.time** <br>(gauge) | El tiempo total empleado en las consultas.<br>_Mostrado como segundo_ |
| **elastic_cloud.search.query.time.count** <br>(count) | El tiempo total empleado en las consultas en forma de count.<br>_Mostrado como segundo_ |
| **elastic_cloud.search.query.total** <br>(gauge) | El número total de consultas.<br>_Mostrado como consulta_ |
| **elastic_cloud.search.query.total.count** <br>(count) | El número total de consultas en forma de count.<br>_Mostrado como consulta_ |
| **elastic_cloud.search.scroll.current** <br>(gauge) | El número de consultas de desplazamiento activas actualmente \[v5+\].<br>_Mostrado como consulta_ |
| **elastic_cloud.search.scroll.time** <br>(gauge) | El tiempo total empleado en las consultas de desplazamiento \[v5+\].<br>_Mostrado como segundo_ |
| **elastic_cloud.search.scroll.time.count** <br>(count) | El tiempo total empleado en las consultas de desplazamiento como count \[v5+\].<br>_Mostrado como segundo_ |
| **elastic_cloud.search.scroll.total** <br>(gauge) | El número total de consultas de desplazamiento \[v5+\].<br>_Mostrado como consulta_ |
| **elastic_cloud.search.scroll.total.count** <br>(count) | El número total de consultas de desplazamiento como count \[v5+\].<br>_Mostrado como consulta_ |
| **elastic_cloud.shards** <br>(gauge) | Número de particiones primarias y réplicas asignados al nodo.<br>_Mostrado como partición_ |
| **elastic_cloud.slm.snapshot_deletion_failures** <br>(gauge) | El número total de fallos en la eliminación de instantáneas.<br>_Mostrado como error_ |
| **elastic_cloud.slm.snapshots_deleted** <br>(gauge) | El número total de instantáneas eliminadas.|
| **elastic_cloud.slm.snapshots_failed** <br>(gauge) | El número total de instantáneas fallidas.<br>_Mostrado como error_ |
| **elastic_cloud.slm.snapshots_taken** <br>(gauge) | El número total de instantáneas.|
| **elastic_cloud.store.size** <br>(gauge) | El tamaño total en bytes del almacén.<br>_Mostrado como byte_ |
| **elastic_cloud.thread_pool.bulk.active** <br>(gauge) | El número de subprocesos activos en el conjunto de subprocesos \[v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.bulk.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de subprocesos [v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.bulk.threads** <br>(gauge) | El número total de subprocesos en el conjunto de subprocesos \[v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.bulk.threads.count** <br>(count) | El número total de subprocesos en el conjunto de subprocesos en forma de count \[v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.bulk.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de subprocesos \[v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.bulk.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de subprocesos en forma de count \[v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.bulk.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de subprocesos \[v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.bulk.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto de subprocesos en forma de count \[v\<6.3\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_started.active** <br>(gauge) | El número de subprocesos activos en el conjunto de subprocesos iniciados del acceso de partición \[v1.6.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_started.threads** <br>(gauge) | El número total de subprocesos en el conjunto de subprocesos de acceso de partición \[v1.6.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_started.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de subprocesos iniciados de partición de acceso \[v1.6.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_started.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto iniciado de particiones de acceso \[v1.6.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_store.active** <br>(gauge) | El número de subprocesos activos en el conjunto de almacén de particiones de acceso.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_store.threads** <br>(gauge) | El número total de subprocesos en el conjunto de almacenamiento de particiones de acceso \[v1.6.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_store.queue** <br>(gauge) | El número de subprocesos en cola en el almacén de particiones de acceso.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.fetch_shard_store.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de almacenamiento de particiones de acceso \[v1.6.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.active** <br>(gauge) | El número de subprocesos activos en la cola de descarga.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de descarga.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.threads** <br>(gauge) | El número total de subprocesos en el conjunto de descarga.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.threads.count** <br>(count) | El número total de subprocesos en el conjunto de descarga de descarga como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de descarga.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de descarga como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de descarga.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.flush.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto de descarga como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.force_merge.active** <br>(gauge) | El número de subprocesos activos para las operaciones de fusión forzada \[v2.1+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.force_merge.threads** <br>(gauge) | El número total de subprocesos para las operaciones de fusión forzada \[v2.1+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.force_merge.queue** <br>(gauge) | El número de subprocesos en cola para operaciones de fusión forzada \[v2.1+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.force_merge.rejected** <br>(gauge) | El número de subprocesos rechazados para operaciones de fusión forzada \[v2.1+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.force_merge.rejected.count** <br>(count) | El número de subprocesos rechazados para operaciones de fusión forzada como count \[v2.1+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.active** <br>(gauge) | El número de subprocesos activos en el conjunto genérico.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto genérico.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.threads** <br>(gauge) | El número total de subprocesos en el conjunto genérico.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.threads.count** <br>(count) | El número total de subprocesos en el conjunto genérico como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.rejected** <br>(calibre) | El número de subprocesos rechazados en el conjunto genérico.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto genérico como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto genérico.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.generic.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto genérico como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.active** <br>(gauge) | El número de subprocesos activos en el conjunto de obtención.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de get.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.threads** <br>(gauge) | El número total de subprocesos en el conjunto de get.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.threads.count** <br>(count) | El número total de subprocesos en el conjunto de get como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de get.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de get como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de get.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.get.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto de get como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.index.active** <br>(gauge) | El número de subprocesos activos en el conjunto de índices \[v\<7.0\].<br>_Se muestra como subproceso_ |
| **elastic_cloud.thread_pool.index.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de índices \[v\<7.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.index.threads** <br>(gauge) | El número total de subprocesos en el conjunto de índices \[v\<7.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.index.threads.count** <br>(count) | El número total de subprocesos en el conjunto de índices como count \[v\<7.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.index.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de índices \[v\<7.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.index.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de índices como count \[v\<7.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.index.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de índices \[v\<7.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.index.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto de índices como un count \[v\<7.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.active** <br>(gauge) | El número de subprocesos activos en el grupo de escuchas.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de escuchas \[v1.4.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.threads** <br>(gauge) | El número total de subprocesos en el conjunto de escuchas \[v1.4.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.threads.count** <br>(count) | El número total de subprocesos en el grupo de escucha como un count \[v1.4.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de escuchas \[v1.4.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de escuchas como un count \[v1.4.0+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de escuchas.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.listener.completed.count** <br>(count) | El número de subprocesos finalizados en el grupo de escucha como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.active** <br>(gauge) | El número de subprocesos activos en el conjunto de gestión.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de gestión.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.threads** <br>(gauge) | El número total de subprocesos en el conjunto de gestión.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.threads.count** <br>(count) | El número total de subprocesos en el conjunto de gestión como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de gestión.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de gestión como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de gestión.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.management.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto de gestión como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.merge.active** <br>(gauge) | El número de subprocesos activos en el conjunto de fusión \[v\<2.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.merge.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de fusión \[v\<2.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.merge.threads** <br>(gauge) | El número total de subprocesos en el conjunto de fusión \[v\<2.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.merge.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de fusión \[v\<2.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.percolate.active** <br>(gauge) | El número de subprocesos activos en el conjunto de percolación \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.percolate.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de percolación \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.percolate.threads** <br>(gauge) | El número total de subprocesos en el conjunto de percolación \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.percolate.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de percolación \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.percolate.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de percolación como un count \[v<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.suggest.active** <br>(gauge) | El número de subprocesos activos en el grupo de sugerencia \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.suggest.threads** <br>(gauge) | El número de subprocesos en el grupo de sugerencia \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.suggest.queue** <br>(gauge) | El número de subprocesos en cola en el grupo de sugerencia [v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.suggest.rejected** <br>(gauge) | El número de subprocesos rechazados en el grupo de sugerencia \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.suggest.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de sugerencias como un count \[v\<5.0\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.active** <br>(gauge) | El número de subprocesos activos en el conjunto de actualización.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.queue** <br>(gauge) | El número de subprocesos en cola en el grupo de actualización.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.threads** <br>(gauge) | El número total de subprocesos en el conjunto de actualización.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.threads.count** <br>(count) | El número total de subprocesos en el conjunto de actualización como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de actualización.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de actualización como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de actualización.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.refresh.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto de actualización como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.active** <br>(gauge) | El número de subprocesos activos en el grupo de búsqueda.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.queue** <br>(gauge) | El número de subprocesos en cola en el grupo de búsqueda.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.threads** <br>(gauge) | El número total de subprocesos en el grupo de búsqueda.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.threads.count** <br>(count) | El número total de subprocesos en el grupo de búsqueda como un recuento.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.rejected** <br>(gauge) | El número de subprocesos rechazados en el grupo de búsqueda.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.rejected.count** <br>(count) | El número de subprocesos rechazados en el grupo de búsqueda en forma de count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.completed** <br>(gauge) | El número de subprocesos finalizados en el grupo de búsqueda.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.search.completed.count** <br>(count) | El número de subprocesos finalizados en el grupo de búsqueda como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.active** <br>(gauge) | El número de subprocesos activos en el grupo de instantáneas.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.queue** <br>(gauge) | El número de subprocesos en cola en el grupo de instantáneas.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.threads** <br>(gauge) | El número total de subprocesos en el conjunto de instantáneas.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.threads.count** <br>(count) | El número total de subprocesos en el grupo de instantáneas como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de instantáneas.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.rejected.count** <br>(count) | El número de subprocesos rechazados en el grupo de instantáneas como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de instantáneas.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.snapshot.completed.count** <br>(count) | El número de subprocesos finalizados en el grupo de instantáneas como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.warmer.active** <br>(gauge) | El número de subprocesos activos en el conjunto de calentadores.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.warmer.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de calentadores.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.warmer.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de calentadores.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.warmer.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de calentadores.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.warmer.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de calentadores como un count.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.warmer.threads** <br>(gauge) | El número total de subprocesos en el conjunto de calentamiento.<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.active** <br>(gauge) | El número de subprocesos activos en el conjunto de escritura \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.queue** <br>(gauge) | El número de subprocesos en cola en el conjunto de escritura \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.threads** <br>(gauge) | El número total de subprocesos en el conjunto de escritura \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.threads.count** <br>(count) | El número total de subprocesos en el conjunto de escritura como un count \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.rejected** <br>(gauge) | El número de subprocesos rechazados en el conjunto de escritura \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.rejected.count** <br>(count) | El número de subprocesos rechazados en el conjunto de escritura como un count \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.completed** <br>(gauge) | El número de subprocesos finalizados en el conjunto de escritura \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.thread_pool.write.completed.count** <br>(count) | El número de subprocesos finalizados en el conjunto de escritura como un count \[v6.3+\].<br>_Mostrado como subproceso_ |
| **elastic_cloud.transport.rx_count** <br>(gauge) | El número total de paquetes recibidos en la comunicación en clúster.<br>_Mostrado como paquete_ |
| **elastic_cloud.transport.rx_count.count** <br>(count) | El número total de paquetes recibidos en la comunicación en clúster como un recuento.<br>_Mostrado como paquete_ |
| **elastic_cloud.transport.rx_size** <br>(gauge) | El tamaño total de los datos recibidos en la comunicación en clúster.<br>_Mostrado como byte_ |
| **elastic_cloud.transport.rx_size.count** <br>(count) | El tamaño total de los datos recibidos en la comunicación en clúster como un recuento.<br>_Mostrado como byte_ |
| **elastic_cloud.transport.server_open** <br>(gauge) | El número de conexiones abiertas para la comunicación en clúster.<br>_Mostrado como connection (conexión)_ |
| **elastic_cloud.transport.tx_count** <br>(gauge) | El número total de paquetes enviados en la comunicación en clúster.<br>_Mostrado como paquete_ |
| **elastic_cloud.transport.tx_count.count** <br>(count) | El número total de paquetes enviados en la comunicación en clúster como un count.<br>_Mostrado como paquete_ |
| **elastic_cloud.transport.tx_size** <br>(gauge) | El tamaño total de los datos enviados en la comunicación en clúster.<br>_Mostrado como byte_ |
| **elastic_cloud.transport.tx_size.count** <br>(count) | El tamaño total de los datos enviados en la comunicación en clúster como un count.<br>_Mostrado como byte_ |
| **elastic_cloud.unassigned_shards** <br>(gauge) | Número de particiones no asignadas a un nodo.<br>_Mostrado como partición_ |
| **elastic_cloud.delayed_unassigned_shards** <br>(gauge) | El número de particiones cuya asignación se ha retrasado \[v2.4+\].<br>_Mostrado como partición_ |
| **elastic_cloud.index.health** <br>(gauge) | El estado del índice como número: verde = 0, amarillo = 1, rojo = 2.|
| **elastic_cloud.index.health.reverse** <br>(gauge) | El estado del índice como número: rojo = 0, amarillo = 1, verde = 2.|
| **elastic_cloud.index.docs.count** <br>(gauge) | El número de documentos del índice.<br>_Mostrado como documento_ |
| **elastic_cloud.index.docs.deleted** <br>(gauge) | El número de documentos borrados en el índice.<br>_Mostrado como documento_ |
| **elastic_cloud.index.primary_shards** <br>(gauge) | Número de particiones primarias del índice.<br>_Mostrado como partición_ |
| **elastic_cloud.index.replica_shards** <br>(gauge) | El número de particiones de réplica del índice.<br>_Mostrado como partición_ |
| **elastic_cloud.index.primary_store_size** <br>(gauge) | El tamaño de almacenamiento de las particiones primarias del índice.<br>_Mostrado como byte_ |
| **elastic_cloud.index.store_size** <br>(gauge) | El tamaño de almacenamiento de las particiones primarias y de réplica del índice.<br>_Mostrado como byte_ |
| **elastic_cloud.cgroup.cpu.stat.number_of_elapsed_periods** <br>(gauge) | El número de periodos de información que han transcurrido \[v5+\].|
| **elastic_cloud.cgroup.cpu.stat.number_of_times_throttled** <br>(gauge) | El número de veces que se han limitado todas las tareas en el mismo grupo que el proceso de elastic_cloud \[v5+\].|
| **elastic_cloud.process.cpu.percent** <br>(gauge) | Uso de la CPU en porcentaje o -1 si no se conoce en el momento en que se calculan las estadísticas.<br>_Mostrado como porcentaje_ |
| **elastic_cloud.indexing_pressure.memory.current.coordinating_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la stage (UI) / fase (generic) de coordinación \[v7.9+\].<br>_Mostrado como byte_ |
| **elastic_cloud.indexing_pressure.memory.current.primary_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la stage (UI) / fase (generic) primaria \[v7.9+\].<br>_Mostrado como byte_ |
| **elastic_cloud.indexing_pressure.memory.current.replica_in_bytes** <br>(gauge) | Memoria consumida por las solicitudes de indexación en la stage (UI) / fase (generic) de réplica \[v7.9+\].<br>_Mostrado como byte_ |

### Logs

La integración Elastic Cloud no incluye logs.

### Eventos

La integración Elastic Cloud no incluye eventos.

### Checks de servicio

La integración Elastic Cloud no incluye checks de servicios.

## Solucionar problemas

¿Necesita sayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help).