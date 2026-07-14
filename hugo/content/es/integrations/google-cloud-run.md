---
aliases:
- /es/integrations/google_cloud_run
app_id: google-cloud-run
categories:
- nube
- contenedores
- google cloud
- recopilación de logs
- orquestación
custom_kind: integración
description: Ejecuta contenedores sin estado invocados mediante solicitudes HTTP en
  una plataforma informática gestionada.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  tag: blog
  text: Monitorizar Cloud Run con Datadog
- link: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  tag: blog
  text: Cómo recopilar métricas de Google Cloud Run
- link: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  tag: blog
  text: Métricas clave para monitorizar Google Cloud Run
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: documentación
  text: Documentación de Google Cloud Run
media: []
title: Google Cloud Run
---
## Información general

Cloud Run es una plataforma de computación administrada que permite ejecutar contenedores sin estado que se pueden invocar mediante solicitudes HTTP.

Habilita esta integración e instrumenta tu contenedor para ver todas tus métricas, trazas (traces) y logs de Cloud Run en Datadog.

Para obtener más información sobre Cloud Run para Anthos, consulta la [documentación de Google Cloud Run para Anthos](https://docs.datadoghq.com/integrations/google-cloud-run-for-anthos/).

## Configuración

### Recopilación de métricas

#### Instalación

Configura la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/) para empezar a recopilar métricas predefinidas. Para configurar métricas personalizadas, consulta la [Documentación de Serverless](https://docs.datadoghq.com/serverless/google_cloud_run).

### Recopilación de logs

#### Integración

Google Cloud Run también expone [logs de auditoría](https://cloud.google.com/run/docs/audit-logging).
Los logs de Google Cloud Run se recopilan con Google Cloud Logging y se envían a un job (generic) de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Run de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [page (página) Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Run.

1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.

1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporta logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

#### Registro directo

Para obtener más información sobre el registro de aplicación directa a Datadog desde tus servicios Cloud Run, consulta la [documentación Serverless](https://docs.datadoghq.com/serverless/google_cloud_run).

### Rastreo

Para obtener más información sobre las instrucciones de configuración especializadas del Agent para Google Cloud Run totalmente gestionado, consulta la [Documentación serverless](https://docs.datadoghq.com/serverless/google_cloud_run).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.run.container.billable_instance_time** <br>(rate) | Tiempo facturable agregado de todas las instancias de contenedor de la revisión (ms/s).<br>_Mostrado como milisegundo_ |
| **gcp.run.container.completed_probe_attempt_count** <br>(count) | Número de intentos de sondeo de check de estado completados y sus resultados.|
| **gcp.run.container.completed_probe_count** <br>(count) | Número de sondeos de check de estado completadas y sus resultados.|
| **gcp.run.container.containers** <br>(gauge) | Número de instancias de contenedor existentes, desglosadas por estado.|
| **gcp.run.container.cpu.allocation_time** <br>(rate) | Asignación de CPU del contenedor de la revisión en segundos.<br>_Mostrado como núcleo_ |
| **gcp.run.container.cpu.usage.avg** <br>(gauge) | El uso medio real de la CPU del contenedor en segundos de CPU desglosado por el campo de métricas, el nombre del contenedor.<br>_Mostrado como segundo_ |
| **gcp.run.container.cpu.usage.samplecount** <br>(gauge) | El count de ejemplo para el uso real de la CPU del contenedor en segundos de CPU desglosado por el campo de métricas, el nombre del contenedor.<br>_Mostrado como segundo_ |
| **gcp.run.container.cpu.usage.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para el uso real de la CPU del contenedor en segundos de CPU desglosada por el campo de métricas, el nombre del contenedor.<br>_Mostrado como segundo_ |
| **gcp.run.container.cpu.utilizations.avg** <br>(gauge) | La distribución media de la distribución de la utilización de la CPU del contenedor en todas las instancias del contenedor de la revisión.<br>_Mostrado como fracción_ |
| **gcp.run.container.cpu.utilizations.p95** <br>(gauge) | La distribución del percentil 95 de la distribución de la utilización de la CPU del contenedor en todas las instancias del contenedor de la revisión.<br>_Mostrado como fracción_. |
| **gcp.run.container.cpu.utilizations.p99** <br>(gauge) | La distribución del percentil 99 de la utilización de la CPU del contenedor en todas las instancias del contenedor de la revisión.<br>_Mostrado como fracción_. |
| **gcp.run.container.cpu.utilizations.samplecount** <br>(count) | Count de ejemplos de la distribución de los tiempos de solicitud de servicio en milisegundos.<br>_Mostrado como fracción_ |
| **gcp.run.container.gpu.memory_usages.avg** <br>(gauge) | La distribución media del uso de memoria GPU del contenedor en todas las instancias del contenedor.<br>_Mostrado como byte_ |
| **gcp.run.container.gpu.memory_usages.samplecount** <br>(gauge) | El count de ejemplos para la distribución del uso de memoria GPU del contenedor en todas las instancias del contenedor.<br>_Mostrado como byte_ |
| **gcp.run.container.gpu.memory_usages.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado de la distribución del uso de memoria GPU del contenedor en todas las instancias del contenedor.<br>_Mostrado como byte_ |
| **gcp.run.container.gpu.memory_utilizations.avg** <br>(gauge) | Distribución de la utilización media de la memoria GPU del contenedor en todas las instancias del contenedor.|
| **gcp.run.container.gpu.memory_utilizations.samplecount** <br>(gauge) | El count de ejemplos para la distribución de la utilización de la memoria GPU del contenedor en todas las instancias del contenedor.|
| **gcp.run.container.gpu.memory_utilizations.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para la distribución de la utilización de la memoria GPU del contenedor en todas las instancias del contenedor.|
| **gcp.run.container.gpu.utilizations.avg** <br>(gauge) | Distribución de la utilización media de la GPU del contenedor en todas las instancias del contenedor.|
| **gcp.run.container.gpu.utilizations.samplecount** <br>(gauge) | El count de ejemplos para la distribución de la utilización de la GPU del contenedor en todas las instancias del contenedor.|
| **gcp.run.container.gpu.utilizations.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado de la distribución de la utilización de la GPU del contenedor en todas las instancias del contenedor.|
| **gcp.run.container.instance_count** <br>(gauge) | El número de instancias del contenedor que existen, desglosadas por estado.<br>_Mostrado como contenedor_ |
| **gcp.run.container.max_request_concurrencies.avg** <br>(gauge) | Media del número máximo de solicitudes concurrentes atendidas por cada instancia del contenedor durante un minuto.<br>_Mostrado como solicitud_ |
| **gcp.run.container.max_request_concurrencies.p95** <br>(gauge) | Distribución del percentil 95 del número máximo de solicitudes concurrentes atendidas por cada instancia del contenedor durante un minuto.<br>_Mostrado como solicitud_ |
| **gcp.run.container.max_request_concurrencies.p99** <br>(gauge) | Distribución del percentil 99 del número máximo de solicitudes concurrentes atendidas por cada instancia del contenedor durante un minuto.<br>_Mostrado como solicitud_ |
| **gcp.run.container.max_request_concurrencies.samplecount** <br>(count) | Count de ejemplos de la distribución del número máximo de solicitudes concurrentes atendidas por cada instancia del contenedor durante un minuto.<br>_Mostrado como solicitud_ |
| **gcp.run.container.memory.allocation_time** <br>(rate) | Asignación de memoria del contenedor de la revisión en Gigabyte-segundos.<br>_Mostrado como gibibyte_ |
| **gcp.run.container.memory.usage.avg** <br>(gauge) | El uso medio real de la memoria del contenedor en bytes desglosado por el campo de métricas, el nombre del contenedor.<br>_Mostrado como byte_ |
| **gcp.run.container.memory.usage.samplecount** <br>(gauge) | El count de ejemplos para el uso real de la memoria del contenedor en bytes desglosado por el campo de métricas, el nombre del contenedor.<br>_Mostrado como byte_ |
| **gcp.run.container.memory.usage.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para el uso real de memoria del contenedor en bytes desglosado por el campo de métricas, el nombre del contenedor.<br>_Mostrado como byte_ |
| **gcp.run.container.memory.utilizations.avg** <br>(gauge) | Media de la distribución de la utilización de la memoria del contenedor en todas las instancias del contenedor de la revisión.<br>_Mostrado como fracción_ |
| **gcp.run.container.memory.utilizations.p95** <br>(gauge) | Distribución del percentil 95 de la distribución de la utilización de la memoria del contenedor en todas las instancias del contenedor de la revisión.<br>_Mostrado como fracción_. |
| **gcp.run.container.memory.utilizations.p99** <br>(gauge) | Distribución del percentil 99 de la distribución de la utilización de la memoria del contenedor en todas las instancias del contenedor de la revisión.<br>_Mostrado como fracción_. |
| **gcp.run.container.memory.utilizations.samplecount** <br>(count) | Count de ejemplos de la distribución de la utilización de la memoria del contenedor en todas las instancias del contenedor de la revisión.<br>_Mostrado como fracción_. |
| **gcp.run.container.network.received_bytes_count** <br>(count) | El socket entrante y el tráfico de respuesta HTTP de revisión, en bytes.<br>_Mostrado como byte_ |
| **gcp.run.container.network.sent_bytes_count** <br>(count) | El socket saliente y el tráfico de respuesta HTTP de revisión, en bytes.<br>_Mostrado como byte_ |
| **gcp.run.container.network.throttled_inbound_bytes_count** <br>(count) | Bytes entrantes perdidos debido a la alternancia de la red.<br>_Mostrado como byte_ |
| **gcp.run.container.network.throttled_inbound_packets_count** <br>(count) | Paquetes entrantes perdidos debido a la alternancia de la red.<br>_Mostrado como byte_ |
| **gcp.run.container.network.throttled_outbound_bytes_count** <br>(count) | Bytes salientes perdidos debido a la alternancia de la red.<br>_Mostrado como byte_ |
| **gcp.run.container.network.throttled_outbound_packets_count** <br>(count) | Paquetes salientes perdidos debido a la alternancia de la red.<br>_Mostrado como byte_ |
| **gcp.run.container.probe_attempt_latencies.avg** <br>(count) | La distribución media del tiempo empleado en ejecutar un único intento de sondeo antes del éxito o el fracaso en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.probe_attempt_latencies.samplecount** <br>(count) | El count de ejemplos para la distribución del tiempo empleado en ejecutar un único intento de sondeo antes del éxito o el fracaso en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.probe_attempt_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución del tiempo empleado en ejecutar un único intento de sondeo antes del éxito o el fracaso en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.probe_latencies.avg** <br>(count) | La distribución media del tiempo empleado en ejecutar un sondeo antes del éxito o el fracaso en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.probe_latencies.samplecount** <br>(count) | El count de ejemplos para la distribución del tiempo empleado en ejecutar un sondeo antes del éxito o el fracaso en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.probe_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución del tiempo empleado en ejecutar un sondeo antes del éxito o el fracaso en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.startup_latencies.avg** <br>(count) | La distribución media del tiempo empleado en iniciar una nueva instancia del contenedor en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.startup_latencies.samplecount** <br>(count) | El count de ejemplos para la distribución del tiempo empleado en iniciar una nueva instancia del contenedor en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.container.startup_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución del tiempo empleado en iniciar una nueva instancia del contenedor en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.infrastructure.cloudsql.connection_latencies.avg** <br>(count) | La distribución media de la latencia en microsegundos para las connections (conexiones) originadas desde Cloud Run a CloudSQL.<br>_Mostrado como microsegundo_ |
| **gcp.run.infrastructure.cloudsql.connection_latencies.samplecount** <br>(count) | El count de ejemplos para la distribución de latencia en microsegundos para connections (conexiones) originadas desde Cloud Run a CloudSQL.<br>_Mostrado como microsegundo_ |
| **gcp.run.infrastructure.cloudsql.connection_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de la latencia en microsegundos para connections (conexiones) originadas desde Cloud Run a CloudSQL.<br>_Mostrado como microsegundo_ |
| **gcp.run.infrastructure.cloudsql.connection_refused_count** <br>(count) | Número total de connections (conexiones) rechazadas originadas desde Cloud Run a CloudSQL.|
| **gcp.run.infrastructure.cloudsql.connection_request_count** <br>(count) | Número total de solicitudes de connection (conexión) originadas desde Cloud Run a CloudSQL.|
| **gcp.run.infrastructure.cloudsql.received_bytes_count** <br>(count) | Número de bytes recibidos por Cloud Run desde CloudSQL a través de la red.<br>_Mostrado como byte_ |
| **gcp.run.infrastructure.cloudsql.sent_bytes_count** <br>(count) | Número de bytes enviados por Cloud Run a CloudSQL a través de la red.<br>_Mostrado como byte_ |
| **gcp.run.job.completed_execution_count** <br>(count) | Número de ejecuciones completadas de job (generic) y su resultado.|
| **gcp.run.job.completed_task_attempt_count** <br>(count) | Número de intentos de tarea completados y su correspondiente resultado de salida.|
| **gcp.run.job.running_executions** <br>(gauge) | Número de ejecuciones de job (generic) en curso.|
| **gcp.run.job.running_task_attempts** <br>(gauge) | Número de intentos de tareas en ejecución.|
| **gcp.run.pending_queue.pending_requests** <br>(gauge) | Número de solicitudes pendientes.|
| **gcp.run.request_count** <br>(count) | El número de solicitudes de servicio.<br>_Mostrado como solicitud_ |
| **gcp.run.request_latencies.avg** <br>(gauge) | Distribución media de los tiempos de solicitud de servicio en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.request_latencies.p95** <br>(gauge) | La distribución del percentil 95 de los tiempos de solicitud de servicio en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.request_latencies.p99** <br>(gauge) | La distribución del percentil 99 de los tiempos de solicitud de servicio en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.request_latencies.samplecount** <br>(count) | Count de ejemplos de la distribución de los tiempos de solicitud de servicio en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.request_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la distribución de los tiempos de solicitud de servicio en milisegundos.<br>_Mostrado como milisegundo_ |
| **gcp.run.enhanced.cold_start** <br>(count) | Número de veces que un contenedor o función se inicializó con un arranque en frío.|
| **gcp.run.enhanced.shutdown** <br>(count) | Número de veces que se apaga un contenedor o una función.|
| **gcp.run.job.enhanced.task.started** <br>(count) | Número de veces que se ha iniciado una tarea.|
| **gcp.run.job.enhanced.task.ended** <br>(count) | Número de veces que ha finalizado una tarea.|
| **gcp.run.job.enhanced.task.duration** <br>(gauge) | Duración media de una tarea en la ejecución.<br>_Mostrado como milisegundo_ |

### Eventos

La integración Google Cloud Functions no incluye eventos.

### Checks de servicio

La integración Google Cloud Functions no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}