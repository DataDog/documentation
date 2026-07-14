---
aliases:
- /es/integrations/google_app_engine
app_id: google-app-engine
categories:
- nube
- configuración y despliegue
- google cloud
custom_kind: integración
description: 'Google App Engine: Plataforma como servicio de Google. Monitoriza tu
  aplicación que se ejecuta en la nube.'
media: []
title: Google App Engine
---
## Información general

Instala la integración Google App Engine en tu proyecto para:

- Consulta métricas de tus servicios Google App Engine: memcache, colas de tareas, almacenes de datos.
- Consulta métricas sobre solicitudes: percentiles de visualización, latencia, costo.
- Etiqueta métricas de Google App Engine por versión y compara el rendimiento de las diferentes versiones.

También puedes enviar métricas personalizadas a Datadog a través de la [API](https://docs.datadoghq.com/api/latest/using-the-api/) o [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/).

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más steps (UI) / pasos (generic) de instalación.

### Recopilación de logs

Los logs de Google App Engine se recopilan con Google Cloud Logging y se envían a un job (generic) de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google App Engine desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [page (página) Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google App Engine.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al receptor.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.gae.flex.autoscaler.capacity** <br>(gauge) | Capacidad de utilización multiplicada por el número de máquinas virtuales de servicio.|
| **gcp.gae.flex.autoscaler.connections.current** <br>(gauge) | El número de connctions (conexiones) de lectura y escritura actuales por instancia de entorno flexible de App Engine. Destinado a ser utilizado para el autoescalado.<br>_Mostrado como connection (conexión)_ |
| **gcp.gae.flex.autoscaler.current_utilization** <br>(gauge) | La suma de la utilización de una métrica especificada para todas las máquinas virtuales de servicio.|
| **gcp.gae.flex.autoscaler.server.request_count** <br>(count) | Counts de solicitudes para una instancia de entorno flexible de App Engine. Destinado a ser utilizado para el autoescalado.|
| **gcp.gae.flex.connections.current** <br>(gauge) | El número de connections (conexiones) activas actuales por versión de entorno flexible de App Engine.<br>_Mostrado como connection (conexión)_ |
| **gcp.gae.flex.cpu.reserved_cores** <br>(gauge) | El número total de núcleos de CPU asignados a una versión de entorno flexible de App Engine.<br>_Mostrado como núcleo_ |
| **gcp.gae.flex.cpu.utilization** <br>(gauge) | Utilización fraccional de la CPU asignada en una versión de entorno flexible de AppEngine. Los valores suelen ser números entre 0,0 y 1,0 (pero algunos tipos de máquinas permiten expansiones por encima de 1,0).<br>_Mostrado como porcentaje_. |
| **gcp.gae.flex.disk.read_bytes_count** <br>(count) | El count de bytes leídos desde el disco a través de una versión de entorno flexible de App Engine.<br>_Mostrado como byte_ |
| **gcp.gae.flex.disk.write_bytes_count** <br>(count) | El count de bytes escritos desde el disco a través de una versión de entorno flexible de App Engine.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.connections.current** <br>(count) | El número de connections (conexiones) activas actuales por instancia de entorno flexible App Engine.<br>_Mostrado como connection (conexión)_ |
| **gcp.gae.flex.instance.container.cpu.limit** <br>(gauge) | Límite de tiempo de la CPU (si procede).<br>_Mostrado como unidad_ |
| **gcp.gae.flex.instance.container.cpu.usage_time** <br>(gauge) | Uso de CPU por contenedor en segundos de CPU.<br>_Mostrado como segundo_ |
| **gcp.gae.flex.instance.container.memory.limit** <br>(gauge) | Memoria total que puede utilizar el contenedor.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.container.memory.usage** <br>(gauge) | Memoria total que está utilizando el contenedor.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.container.network.received_bytes_count** <br>(count) | Bytes recibidos por el contenedor a través de todas las interfaces de red.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.container.network.sent_bytes_count** <br>(count) | Bytes enviados por el contenedor a través de todas las interfaces de red.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.container.restart_count** <br>(count) | Número de veces que se ha reiniciado el contenedor.|
| **gcp.gae.flex.instance.container.uptime** <br>(gauge) | Tiempo durante el cual el contenedor ha estado activo.<br>_Mostrado como segundo_ |
| **gcp.gae.flex.instance.cpu.usage_time** <br>(count) | Uso de CPU virtual Detla para todas las CPU virtuales, en segundos de CPU virtual. Este valor se informa a través del hipervisor para la máquina virtual y puede diferir de `agent.googleapis.com/cpu/usage_time`, que se informa desde dentro de la máquina virtual.<br>_Mostrado como segundo_. |
| **gcp.gae.flex.instance.cpu.utilization** <br>(gauge) | Utilización de la CPU fraccional para todos los núcleos en una única instancia flexible de AppEngine. Los valores suelen estar entre 0,0 y 1,0 para un único núcleo (pero pueden superar 1,0 en total).|
| **gcp.gae.flex.instance.disk.io.read_bytes_count** <br>(count) | El count de bytes leídos del disco.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.disk.io.write_bytes_count** <br>(count) | El count de bytes escritos en disco.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.guest.disk.bytes_used** <br>(gauge) | El número de bytes utilizados en el disco para los sistemas de archivos.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.guest.memory.bytes_used** <br>(gauge) | El uso de memoria por cada estado de memoria, en bytes. Sumando los valores de todos los estados se obtiene la memoria total de la máquina.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.healthcheck.liveness.request_count** <br>(count) | El número de solicitudes de check del estado de ejecución de una instancia flexible con estado y código de error.<br>_Mostrado como solicitud_ |
| **gcp.gae.flex.instance.healthcheck.readiness.request_count** <br>(count) | El número de solicitudes de check del estado de preparación de una instancia flexible con estado y código de error.<br>_Mostrado como solicitud_ |
| **gcp.gae.flex.instance.jvm.gc.count** <br>(count) | El número total de recolección de elementos no utilizados que se han producido.<br>_Mostrado como recolección de elementos no utilizados_ |
| **gcp.gae.flex.instance.jvm.gc.time** <br>(count) | El tiempo acumulado de recolección de elementos no utilizados transcurrido en milisegundos.<br>_Mostrado en milisegundos_ |
| **gcp.gae.flex.instance.jvm.memory.usage** <br>(gauge) | El uso de la memoria.|
| **gcp.gae.flex.instance.jvm.os.cpu_time** <br>(count) | El tiempo de CPU utilizado por el proceso en el que se está ejecutando la máquina virtual de Java.<br>_Mostrado como nanosegundo_. |
| **gcp.gae.flex.instance.jvm.thread.num_live** <br>(gauge) | El número actual de subprocesos dinámicos.<br>_Mostrado como subproceso_ |
| **gcp.gae.flex.instance.jvm.thread.peak** <br>(gauge) | El número máximo de subprocesos dinámiocos.<br>_Mostrado como subproceso_ |
| **gcp.gae.flex.instance.jvm.uptime** <br>(count) | El tiempo de actividad de la máquina virtual Java.<br>_Mostrado en milisegundos_ |
| **gcp.gae.flex.instance.log_entry_count** <br>(count) | El count de entradas de logs escritas por el agente de registro.<br>_Mostrado como entrada_ |
| **gcp.gae.flex.instance.log_entry_retry_count** <br>(count) | El count de escrituras de entrada de logs que reintentó el agente de registro.<br>_Mostrado como escritura_ |
| **gcp.gae.flex.instance.network.received_bytes_count** <br>(count) | El count de bytes de red entrantes en una instancia flexible de App Engine.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.network.sent_bytes_count** <br>(count) | El count de bytes de red salientes en una instancia flexible de App Engine.<br>_Mostrado como byte_ |
| **gcp.gae.flex.instance.nginx.connections.accepted_count** <br>(count) | El total de connections (conexiones) aceptadas.<br>_Mostrado como connection (conexión)_ |
| **gcp.gae.flex.instance.nginx.connections.current** <br>(gauge) | El número de connections (conexiones) actualmente conectadas a NGINX.<br>_Mostrado como connection (conexión)_ |
| **gcp.gae.flex.instance.nginx.connections.handled_count** <br>(count) | El total de connections (conexiones) gestionadas.|
| **gcp.gae.flex.instance.uptime** <br>(gauge) | Cuánto tiempo se ha estado ejecutando la máquina virtual, en segundos.<br>_Mostrado como segundo_ |
| **gcp.gae.flex.instance.web_socket.closed_connections_count** <br>(count) | Count de connections (conexiones) websocket cerradas.|
| **gcp.gae.flex.instance.web_socket.durations.avg** <br>(count) | La media de las duraciones de las connections (conexiones) websocket medidas en NGINX.<br>_Mostrado como segundo_ |
| **gcp.gae.flex.instance.web_socket.durations.samplecount** <br>(count) | El count de ejemplos para las duraciones de las connections (conexiones) websocket medidas en NGINX.<br>_Mostrado como segundo_ |
| **gcp.gae.flex.instance.web_socket.durations.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para las duraciones de las connections (conexiones) websocket medidas en NGINX.<br>_Mostrado como segundo_ |
| **gcp.gae.flex.instance.ws.avg_duration** <br>(gauge) | El promedio de solicitudes websocket para una instancia flexible de App Engine dada.<br>_Mostrado como segundo_ |
| **gcp.gae.flex.network.received_bytes_count** <br>(count) | El count de bytes de red entrantes en todas las máquinas virtuales en una versión de entorno flexible de App Engine.<br>_Mostrado como byte_ |
| **gcp.gae.flex.network.sent_bytes_count** <br>(count) | El count de bytes de red salientes en todas las máquinas virtuales en una versión de entorno flexible de App Engine.<br>_Mostrado como byte_ |
| **gcp.gae.http.server.dos_intercept_count** <br>(count) | El count de intercepciones realizadas para evitar ataques DoS.<br>_Mostrado como ocurrencia_ |
| **gcp.gae.http.server.quota_denial_count** <br>(count) | El count de solicitudes fallidas debido a que la aplicación ha superado la cuota.<br>_Mostrado como solicitud_ |
| **gcp.gae.http.server.response_count** <br>(count) | El count de respuestas HTTP.<br>_Mostrado como respuesta_ |
| **gcp.gae.http.server.response_latencies.avg** <br>(gauge) | La latencia media de la respuesta HTTP.<br>_Mostrado en milisegundos_ |
| **gcp.gae.http.server.response_latencies.p95** <br>(gauge) | El percentil 95 de la latencia de respuesta HTTP.<br>_Mostrado en milisegundos_ |
| **gcp.gae.http.server.response_latencies.p99** <br>(gauge) | El percentil 99 de la latencia de respuesta HTTP.<br>_Mostrado en milisegundos_ |
| **gcp.gae.http.server.response_latencies.samplecount** <br>(count) | El count de ejemplos para la latencia de respuesta HTTP.<br>_Mostrado como milisegundo_ |
| **gcp.gae.http.server.response_latencies.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para la latencia de respuesta HTTP.<br>_Mostrado como milisegundo_ |
| **gcp.gae.http.server.response_style_count** <br>(count) | El count de respuestas HTTP por estilo de servicio.<br>_Mostrado como respuesta_ |
| **gcp.gae.infrastructure.cloudsql.connection_latencies.avg** <br>(count) | La distribución media de la latencia en microsegundos para las connections (conexiones) originadas desde App Engine a Cloud SQL.<br>_Mostrado como microsegundo_ |
| **gcp.gae.infrastructure.cloudsql.connection_latencies.samplecount** <br>(count) | El count de ejemplos para la distribución de latencia en microsegundos para connections (conexiones) originadas desde App Engine a Cloud SQL.<br>_Mostrado como microsegundo_ |
| **gcp.gae.infrastructure.cloudsql.connection_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de la latencia en microsegundos para las connections (conexiones) originadas desde App Engine a Cloud SQL.<br>_Mostrado como microsegundo_ |
| **gcp.gae.infrastructure.cloudsql.connection_refused_count** <br>(count) | Número total de connections (conexiones) rechazadas originadas desde App Engine a Cloud SQL.|
| **gcp.gae.infrastructure.cloudsql.connection_request_count** <br>(count) | Número total de solicitudes de connection (conexión) originadas desde App Engine a Cloud SQL.|
| **gcp.gae.infrastructure.cloudsql.received_bytes_count** <br>(count) | Número de bytes recibidos por App Engine desde Cloud SQL a través de la red.<br>_Mostrado como byte_ |
| **gcp.gae.infrastructure.cloudsql.sent_bytes_count** <br>(count) | Número de bytes enviados por App Engine a Cloud SQL a través de la red.<br>_Mostrado como byte_ |
| **gcp.gae.memcache.access_ages.avg** <br>(count) | La antigüedad media de los elementos almacenados en caché cuando se accede a ellos.<br>_Mostrado como segundo_ |
| **gcp.gae.memcache.access_ages.samplecount** <br>(count) | El count de ejemplos de las antigüedades de los elementos almacenados en caché cuando se accede a ellos.<br>_Mostrado como segundo_ |
| **gcp.gae.memcache.access_ages.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de las antigüedades de los elementos almacenados en caché cuando se accede a ellos.<br>_Mostrado como segundo_ |
| **gcp.gae.memcache.backend_request_count** <br>(count) | Count de solicitudes de caché registradas por los backends.<br>_Mostrado como solicitud_ |
| **gcp.gae.memcache.cache_size_limit** <br>(gauge) | Tamaño máximo posible esperado de caché en función de la configuración de la aplicación.<br>_Mostrado como byte_ |
| **gcp.gae.memcache.centi_mcu_count** <br>(count) | Utilización de Memcache como 1/100 unidades de cálculo de Memcache.<br>_Mostrado como unidad_ |
| **gcp.gae.memcache.centi_mcu_limit** <br>(gauge) | Tamaño máximo esperado de memcache en centésimas de unidades de cálculo de Memcache.<br>_Mostrado como unidad_. |
| **gcp.gae.memcache.eviction_count** <br>(count) | Tasa de elementos desalojados de la caché por falta de espacio.<br>_Mostrado como elemento_ |
| **gcp.gae.memcache.hit_bytes_count** <br>(count) | Count de bytes de servicio desde accesos a la caché.<br>_Mostrado como byte_ |
| **gcp.gae.memcache.hit_count** <br>(count) | Tasa de aciertos en la caché.<br>_Mostrado como solicitud_ |
| **gcp.gae.memcache.hit_ratio** <br>(gauge) | El porcentaje de aciertos comparado con todas las operaciones de memcache.<br>_Mostrado como acierto_ |
| **gcp.gae.memcache.hot_keys.avg** <br>(count) | La distribución media de qps de teclas rápidas.<br>_Mostrado como solicitud_ |
| **gcp.gae.memcache.hot_keys.samplecount** <br>(count) | El count de ejemplos para la distribución de qps de teclas rápidas.<br>_Mostrado como solicitud_ |
| **gcp.gae.memcache.hot_keys.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de qps de teclas rápidas.<br>_Mostrado como solicitud_ |
| **gcp.gae.memcache.miss_count** <br>(count) | Tasa de fallos de caché.<br>_Mostrado como solicitud_ |
| **gcp.gae.memcache.operation_count** <br>(count) | El count de operaciones clave de memcache, agrupadas por comando y estado.<br>_Mostrado como operación_ |
| **gcp.gae.memcache.received_bytes_count** <br>(count) | El número de bytes recibidos por la aplicación desde la API memcache, agrupados por estado y comando memcache.<br>_Mostrado como byte_ |
| **gcp.gae.memcache.sent_bytes_count** <br>(count) | El número de bytes enviados por la aplicación a través de la API memcache, agrupados por comando memcache.<br>_Mostrado como byte_ |
| **gcp.gae.memcache.set_bytes_count** <br>(count) | Count de bytes recibidos de conjuntos.<br>_Mostrado como byte_ |
| **gcp.gae.memcache.used_cache_size** <br>(gauge) | El tamaño de la caché, calculado como el tamaño total de todos los elementos almacenados.|
| **gcp.gae.system.billed_instance_estimate_count** <br>(gauge) | Una estimación del número de instancias que se cobran al cliente.<br>_Mostrado como instancia_ |
| **gcp.gae.system.cpu.usage** <br>(gauge) | Uso de la CPU en megaciclos en todas las instancias.|
| **gcp.gae.system.cpu.utilization** <br>(gauge) | Utilización media de la CPU en todas las instancias activas.|
| **gcp.gae.system.instance_count** <br>(gauge) | El número de instancias que existen.<br>_Mostrado como instancia_ |
| **gcp.gae.system.memory.usage** <br>(gauge) | La memoria total utilizada por las instancias en ejecución.<br>_Mostrado como byte_ |
| **gcp.gae.system.network.received_bytes_count** <br>(count) | El count del ancho de banda de red entrante.<br>_Mostrado como byte_ |
| **gcp.gae.system.network.sent_bytes_count** <br>(count) | El count del ancho de banda de red saliente.<br>_Mostrado como byte_ |
| **gcp.gae.system.pending_queue.pending_requests** <br>(gauge) | Número de solicitudes pendientes.|

### Eventos

La integración de Google App Engine no incluye eventos.

### Checks de servicio

La integración de Google App Engine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).