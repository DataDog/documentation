---
aliases:
- /es/integrations/google_cloud_vertex_ai
app_id: google-cloud-vertex-ai
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
- ia/ml
custom_kind: integración
description: Permite a los desarrolladores entrenar modelos de Machine Learning personalizados
  de alta calidad con un mínimo de experiencia y de esfuerzo.
further_reading:
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitorización-Datadog/
  tag: blog
  text: Monitorizar Google Cloud Vertex AI con Datadog
media: []
title: Google Cloud Vertex AI
---
## Información general

Google Cloud Vertex AI permite a los desarrolladores de machine learning, científicos de datos e ingenieros de datos realizar sus proyectos,
desde la ideación hasta el despliegue, de forma rápida y rentable. Entrena modelos de machine learning personalizados de alta calidad con
experiencia y esfuerzo mínimos en machine learning.

## Configuración

### Instalación

#### Recopilación de métricas

Google Cloud Vertex AI se incluye en el paquete de la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/).
Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/) para empezar a recopilar métricas listas para usar.

#### Configuración

Para recopilar etiquetas (labels) de Vertex AI como etiquetas (tags), activa el rol de Visor de recursos en la nube.

Puedes utilizar [suplantación de cuenta de servicio](https://cloud.google.com/iam/docs/service-account-overview#impersonation) y la detección automática del proyecto para integrar Datadog con [Google Cloud](https://docs.datadoghq.com/integrations/google-cloud-platform/).

Este método te permite monitorizar todos los proyectos visibles para una cuenta de servicio mediante la asignación de roles de IAM
en los proyectos pertinentes. Puedes asignar estos roles a proyectos individualmente, o puedes configurar
Datadog para monitorizar grupos de proyectos asignando estos roles a nivel de organización o carpeta.
Asignar roles de esta manera permite a Datadog detectar automáticamente y monitorizar todos los proyectos en el
ámbito determinado, incluidos los nuevos proyectos que puedan añadirse al grupo en el futuro.

#### Recopilación de logs

Los logs de Google Cloud Vertex AI se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Vertex AI desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Vertex AI.
1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.aiplatform.executing_vertexai_pipeline_jobs** <br>(gauge) | Número de trabajos de pipeline en ejecución.|
| **gcp.aiplatform.executing_vertexai_pipeline_tasks** <br>(gauge) | Número de tareas de pipeline en ejecución.|
| **gcp.aiplatform.featureonlinestore.online_serving.request_count** <br>(count) | Número de solicitudes recibidas.|
| **gcp.aiplatform.featureonlinestore.online_serving.serving_bytes_count** <br>(count) | Recuento de bytes de respuesta de servicio.<br>_Se muestra como byte_ |
| **gcp.aiplatform.featureonlinestore.online_serving.serving_latencies.avg** <br>(count) | La latencia media de las solicitudes del lado del servidor.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.featureonlinestore.online_serving.serving_latencies.samplecount** <br>(count) | El recuento de muestras para la latencia de solicitudes del lado del servidor.<br>_Se muestra como milisegundo_ |
| **gcp.aiplatform.featureonlinestore.online_serving.serving_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la latencia de la solicitud del lado del servidor.<br>_Se muestra como milisegundo_ |
| **gcp.aiplatform.featureonlinestore.running_sync** <br>(gauge) | Número de sincronizaciones en curso en un momento dado.|
| **gcp.aiplatform.featureonlinestore.serving_data_ages.avg** <br>(count) | Medida media de la antigüedad de los datos de servicio en segundos. Hora actual menos hora sincronizada.<br>_Se muestra en segundos_ |
| **gcp.aiplatform.featureonlinestore.serving_data_ages.samplecount** <br>(count) | El recuento de muestras para medir la antigüedad de los datos de servicio en segundos. Hora actual menos hora sincronizada.<br>_Se muestra en segundos_ |
| **gcp.aiplatform.featureonlinestore.serving_data_ages.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para medir la antigüedad de los datos de servicio en segundos. Hora actual menos hora sincronizada.<br>_Se muestra como segundo_ |
| **gcp.aiplatform.featureonlinestore.serving_data_by_sync_time** <br>(gauge) | Desglose de datos en Feature Online Store por fecha y hora de sincronización.|
| **gcp.aiplatform.featureonlinestore.storage.bigtable_cpu_load** <br>(gauge) | La carga media de la CPU de los nodos de Feature Online Store.|
| **gcp.aiplatform.featureonlinestore.storage.bigtable_cpu_load_hottest_node** <br>(gauge) | La carga de CPU del nodo más reciente de Feature Online Store.|
| **gcp.aiplatform.featureonlinestore.storage.bigtable_nodes** <br>(gauge) | El número de nodos de Feature Online Store (Bigtable).|
| **gcp.aiplatform.featureonlinestore.storage.multi_region_bigtable_cpu_load** <br>(gauge) | Carga media de la CPU de los nodos de Feature Online Store con réplicas multirregionales.|
| **gcp.aiplatform.featureonlinestore.storage.multi_region_bigtable_nodes** <br>(gauge) | El número de nodos para Feature Online Store (Bigtable) con réplicas multirregionales.|
| **gcp.aiplatform.featureonlinestore.storage.optimized_nodes** <br>(gauge) | Número de nodos de Feature Online Store (optimizada).|
| **gcp.aiplatform.featureonlinestore.storage.stored_bytes** <br>(gauge) | Bytes almacenados en Feature Online Store.<br>_Se muestra como byte_ |
| **gcp.aiplatform.featurestore.cpu_load** <br>(gauge) | La carga media de la CPU para un nodo en el almacenamiento en línea de Featurestore.|
| **gcp.aiplatform.featurestore.cpu_load_hottest_node** <br>(gauge) | La carga de la CPU para el nodo más reciente en el almacenamiento en línea de Featurestore.|
| **gcp.aiplatform.featurestore.node_count** <br>(gauge) | El número de nodos para el almacenamiento en línea de Featurestore.|
| **gcp.aiplatform.featurestore.online_entities_updated** <br>(count) | Número de entidades actualizadas en el almacenamiento en línea de Featurestore.<br>_Se muestra como byte_ |
| **gcp.aiplatform.featurestore.online_serving.latencies.avg** <br>(count) | Las latencias medias de servicio en línea por EntityType.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.featurestore.online_serving.latencies.samplecount** <br>(count) | Recuento de muestras de latencias de servicio en línea por EntityType.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.featurestore.online_serving.latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de las latencias de servicio en línea por EntityType.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.featurestore.online_serving.request_bytes_count** <br>(count) | Tamaño de la solicitud por EntityType.<br>_Se muestra como byte_ |
| **gcp.aiplatform.featurestore.online_serving.request_count** <br>(count) | Recuento de servicios en línea de Featurestore por tipo de entidad.|
| **gcp.aiplatform.featurestore.online_serving.response_size** <br>(count) | Tamaño de la respuesta por EntityType.<br>_Se muestra como byte_ |
| **gcp.aiplatform.featurestore.storage.billable_processed_bytes** <br>(gauge) | Número de bytes facturados por los datos fuera de línea procesados.<br>_Se muestra como byte_ |
| **gcp.aiplatform.featurestore.storage.stored_bytes** <br>(gauge) | Bytes almacenados en Featurestore.<br>_Se muestra como byte_ |
| **gcp.aiplatform.featurestore.streaming_write.offline_processed_count** <br>(count) | Número de solicitudes de escritura en streaming procesadas para el almacenamiento fuera de línea.|
| **gcp.aiplatform.featurestore.streaming_write.offline_write_delays.avg** <br>(count) | El tiempo medio (en segundos) desde que se llama a la API de escritura hasta que se escribe en el almacenamiento fuera de línea.<br>_Se muestra como segundo_ |
| **gcp.aiplatform.featurestore.streaming_write.offline_write_delays.samplecount** <br>(count) | El recuento de muestras para el tiempo (en segundos) desde que se llama a la API de escritura hasta que se escribe en el almacenamiento fuera de línea.<br>_Se muestra como segundo_ |
| **gcp.aiplatform.featurestore.streaming_write.offline_write_delays.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para el tiempo (en segundos) desde que se llama a la API de escritura hasta que se escribe en el almacenamiento fuera de línea.<br>_Se muestra como segundo_ |
| **gcp.aiplatform.generate_content_input_tokens_per_minute_per_base_model** <br>(count) | Generación de tokens de entrada de contenido por minuto por proyecto por modelo base.|
| **gcp.aiplatform.generate_content_requests_per_minute_per_project_per_base_model** <br>(count) | Generación de solicitudes de contenidos por minuto por proyecto por modelo de base.|
| **gcp.aiplatform.matching_engine.cpu.request_utilization** <br>(gauge) | La fracción de la CPU solicitada que está actualmente en uso en un contenedor de servidor coincidente.|
| **gcp.aiplatform.matching_engine.current_replicas** <br>(gauge) | Número de réplicas activas utilizadas por el DeployedIndex.|
| **gcp.aiplatform.matching_engine.current_shards** <br>(gauge) | Número de fragmentos del DeployedIndex.|
| **gcp.aiplatform.matching_engine.memory.used_bytes** <br>(gauge) | La memoria utilizada en bytes para un contenedor de servidor de coincidencias.<br>_Se muestra como byte_ |
| **gcp.aiplatform.matching_engine.query.latencies.avg** <br>(count) | La latencia media de las solicitudes del lado del servidor.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.matching_engine.query.latencies.samplecount** <br>(count) | El recuento de muestras para la latencia de solicitudes del lado del servidor.<br>_Se muestra como milisegundo_ |
| **gcp.aiplatform.matching_engine.query.latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la latencia de la solicitud del lado del servidor.<br>_Se muestra como milisegundo_ |
| **gcp.aiplatform.matching_engine.query.request_count** <br>(count) | Número de solicitudes recibidas.|
| **gcp.aiplatform.matching_engine.stream_update.datapoint_count** <br>(count) | Número de puntos de datos insertados o eliminados correctamente.|
| **gcp.aiplatform.matching_engine.stream_update.latencies.avg** <br>(count) | La media de las latencias entre que el usuario recibe un UpsertDatapointsResponse o RemoveDatapointsResponse y que la actualización surte efecto.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.matching_engine.stream_update.latencies.samplecount** <br>(count) | El recuento de muestras para las latencias entre que el usuario recibe un UpsertDatapointsResponse o RemoveDatapointsResponse y esa actualización surte efecto.<br>_Se muestra como milisegundo_ |
| **gcp.aiplatform.matching_engine.stream_update.latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de las latencias entre que el usuario recibe un UpsertDatapointsResponse o RemoveDatapointsResponse y que la actualización surte efecto.<br>_Se muestra como milisegundo_ |
| **gcp.aiplatform.matching_engine.stream_update.request_count** <br>(count) | Número de solicitudes de actualización de flujo.|
| **gcp.aiplatform.online_prediction_dedicated_requests_per_base_model_version** <br>(count) | Solicitudes dedicadas de predicción en línea por minuto por proyecto por versión del modelo base.|
| **gcp.aiplatform.online_prediction_dedicated_tokens_per_base_model_version** <br>(count) | Tokens dedicados de predicción en línea por minuto por proyecto por versión del modelo base.|
| **gcp.aiplatform.online_prediction_requests_per_base_model** <br>(count) | Solicitudes de predicción en línea por minuto por proyecto por modelo base.<br>_Se muestra como solicitud_ |
| **gcp.aiplatform.online_prediction_tokens_per_minute_per_base_model** <br>(count) | Tokens de predicción en línea por minuto por proyecto por modelo de base.|
| **gcp.aiplatform.pipelinejob.duration** <br>(gauge) | Segundos de ejecución del trabajo de pipeline que se está ejecutando (desde la creación hasta el final).<br>_Se muestra como segundo_ |
| **gcp.aiplatform.pipelinejob.task_completed_count** <br>(count) | Número acumulado de PipelineTasks completados.|
| **gcp.aiplatform.prediction.online.accelerator.duty_cycle** <br>(gauge) | Fracción de CPU asignada por la réplica del modelo desplegado y actualmente en uso. Puede superar el 100 % si el tipo de máquina tiene varias CPUs. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles durante 360 segundos.<br>_Se muestra como fracción_ |
| **gcp.aiplatform.prediction.online.accelerator.memory.bytes_used** <br>(gauge) | Cantidad de memoria del acelerador asignada por la réplica del modelo desplegado.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.cpu.utilization** <br>(gauge) | Fracción de CPU asignada por la réplica del modelo desplegado y actualmente en uso. Puede superar el 100 % si el tipo de máquina tiene varias CPUs. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles durante 360 segundos.<br>_Se muestra como fracción_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.accelerator.duty_cycle** <br>(gauge) | Fracción media de tiempo durante el último periodo de muestreo en el que el acelerador o aceleradores estuvieron procesando activamente.|
| **gcp.aiplatform.prediction.online.deployment_resource_pool.accelerator.memory.bytes_used** <br>(gauge) | Cantidad de memoria del acelerador asignada por la réplica del grupo de recursos de despliegue.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.cpu.utilization** <br>(gauge) | Fracción de CPU asignada por la réplica del grupo de recursos de despliegue y actualmente en uso. Puede superar el 100 % si el tipo de máquina tiene varias CPUs.<br>_Se muestra como porcentaje_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.memory.bytes_used** <br>(gauge) | Cantidad de memoria asignada por la réplica del grupo de recursos de despliegue y actualmente en uso.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.network.received_bytes_count** <br>(count) | Número de bytes recibidos a través de la red por la réplica del grupo de recursos de despliegue.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.network.sent_bytes_count** <br>(count) | Número de bytes enviados a través de la red por la réplica del grupo de recursos de despliegue.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.replicas** <br>(gauge) | Número de réplicas activas utilizadas por el conjunto de recursos de despliegue.|
| **gcp.aiplatform.prediction.online.deployment_resource_pool.target_replicas** <br>(gauge) | Número objetivo de réplicas activas necesarias para el grupo de recursos de despliegue.|
| **gcp.aiplatform.prediction.online.error_count** <br>(count) | Número de errores de predicción en línea.<br>_Se muestra como error_ |
| **gcp.aiplatform.prediction.online.memory.bytes_used** <br>(gauge) | Cantidad de memoria asignada por la réplica del modelo desplegado y actualmente en uso. Muestreo cada 60 segundos. Después del muestreo, los datos no son visibles hasta 360 segundos.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.network.received_bytes_count** <br>(count) | Número de bytes recibidos a través de la red por la réplica del modelo desplegado. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles hasta 360 segundos.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.network.sent_bytes_count** <br>(count) | Número de bytes enviados a través de la red por la réplica del modelo desplegado. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles hasta 360 segundos.<br>_Se muestra como byte_ |
| **gcp.aiplatform.prediction.online.prediction_count** <br>(count) | Número de predicciones en línea.<br>_Se muestra como predicción_ |
| **gcp.aiplatform.prediction.online.prediction_latencies.avg** <br>(gauge) | Latencia media de predicción en línea del modelo desplegado.<br>_Se muestra como microsegundo_ |
| **gcp.aiplatform.prediction.online.prediction_latencies.samplecount** <br>(count) | Latencia de predicción en línea del modelo público desplegado. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles hasta 360 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.aiplatform.prediction.online.private.prediction_latencies.avg** <br>(gauge) | Latencia media de predicción en línea del modelo privado desplegado.<br>_Se muestra como microsegundo_ |
| **gcp.aiplatform.prediction.online.private.prediction_latencies.samplecount** <br>(count) | Latencia de predicción en línea del modelo privado desplegado. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles hasta 360 segundos.<br>_Se muestra como microsegundo_ |
| **gcp.aiplatform.prediction.online.private.response_count** <br>(count) | Recuento de respuestas de predicción en línea del modelo privado desplegado.<br>_Se muestra como respuesta_ |
| **gcp.aiplatform.prediction.online.replicas** <br>(count) | Número de réplicas activas utilizadas por el modelo desplegado. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles durante un máximo de 120 segundos.<br>_Se muestra como worker_ |
| **gcp.aiplatform.prediction.online.response_count** <br>(count) | Número de códigos de respuesta de predicción en línea diferentes.<br>_Se muestra como respuesta_ |
| **gcp.aiplatform.prediction.online.target_replicas** <br>(count) | Número objetivo de réplicas activas necesarias para el modelo desplegado. Muestreo cada 60 segundos. Tras el muestreo, los datos no son visibles durante un máximo de 120 segundos.<br>_Se muestra como worker_ |
| **gcp.aiplatform.publisher.online_serving.character_count** <br>(count) | Recuento acumulado de caracteres de entrada/salida.|
| **gcp.aiplatform.publisher.online_serving.characters.avg** <br>(count) | La distribución media del recuento de caracteres de entrada/salida.|
| **gcp.aiplatform.publisher.online_serving.characters.samplecount** <br>(count) | El recuento de muestras para la distribución del recuento de caracteres de entrada/salida.|
| **gcp.aiplatform.publisher.online_serving.characters.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución del recuento de caracteres de entrada/salida.|
| **gcp.aiplatform.publisher.online_serving.consumed_throughput** <br>(count) | Rendimiento global utilizado (teniendo en cuenta la tasa de consumo) en términos de caracteres.|
| **gcp.aiplatform.publisher.online_serving.first_token_latencies.avg** <br>(count) | Duración media desde que se recibe la solicitud hasta que se devuelve el primer token al cliente.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.publisher.online_serving.first_token_latencies.samplecount** <br>(count) | Recuento de muestras de la duración desde la recepción de la solicitud hasta el envío del primer token al cliente.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.publisher.online_serving.first_token_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de la duración desde que se recibe la solicitud hasta que se envía el primer token al cliente.<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.publisher.online_serving.model_invocation_count** <br>(count) | Número de invocaciones del modelo (solicitudes de predicción).|
| **gcp.aiplatform.publisher.online_serving.model_invocation_latencies.avg** <br>(count) | La media de las latencias de invocación del modelo (latencias de predicción).<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.publisher.online_serving.model_invocation_latencies.samplecount** <br>(count) | El recuento de muestras para las latencias de invocación del modelo (latencias de predicción).<br>_Se muestra como milisegundo_ |
| **gcp.aiplatform.publisher.online_serving.model_invocation_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de las latencias de invocación del modelo (latencias de predicción).<br>_Se muestra en milisegundos_ |
| **gcp.aiplatform.publisher.online_serving.token_count** <br>(count) | Recuento acumulado de token de entrada/salida.|
| **gcp.aiplatform.publisher.online_serving.tokens.avg** <br>(count) | La distribución media del recuento de tokens de entrada/salida.|
| **gcp.aiplatform.publisher.online_serving.tokens.samplecount** <br>(count) | El recuento de muestras para la distribución del recuento de tokens de entrada/salida.|
| **gcp.aiplatform.publisher.online_serving.tokens.sumsqdev** <br>(count) | La suma de la desviación cuadrática para la distribución de recuento de tokens de entrada/salida.|
| **gcp.aiplatform.quota.generate_content_input_tokens_per_minute_per_base_model.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `aiplatform.googleapis.com/generate_content_input_tokens_per_minute_per_base_model`.|
| **gcp.aiplatform.quota.generate_content_input_tokens_per_minute_per_base_model.limit** <br>(gauge) | Límite actual de la métrica de cuota `aiplatform.googleapis.com/generate_content_input_tokens_per_minute_per_base_model`.|
| **gcp.aiplatform.quota.generate_content_input_tokens_per_minute_per_base_model.usage** <br>(count) | Uso actual de la métrica de cuota `aiplatform.googleapis.com/generate_content_input_tokens_per_minute_per_base_model`.|
| **gcp.aiplatform.quota.generate_content_requests_per_minute_per_project_per_base_model.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model`.|
| **gcp.aiplatform.quota.generate_content_requests_per_minute_per_project_per_base_model.limit** <br>(gauge) | Límite actual de la métrica de cuota `aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model`.|
| **gcp.aiplatform.quota.generate_content_requests_per_minute_per_project_per_base_model.usage** <br>(count) | Uso actual de la métrica de cuota `aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model`.|
| **gcp.aiplatform.quota.online_prediction_dedicated_requests_per_base_model_version.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `aiplatform.googleapis.com/online_prediction_dedicated_requests_per_base_model_version`.|
| **gcp.aiplatform.quota.online_prediction_dedicated_requests_per_base_model_version.limit** <br>(gauge) | Límite actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_dedicated_requests_per_base_model_version`.|
| **gcp.aiplatform.quota.online_prediction_dedicated_requests_per_base_model_version.usage** <br>(count) | Uso actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_dedicated_requests_per_base_model_version`.|
| **gcp.aiplatform.quota.online_prediction_dedicated_tokens_per_base_model_version.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `aiplatform.googleapis.com/online_prediction_dedicated_tokens_per_base_model_version`.|
| **gcp.aiplatform.quota.online_prediction_dedicated_tokens_per_base_model_version.limit** <br>(gauge) | Límite actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_dedicated_tokens_per_base_model_version`.|
| **gcp.aiplatform.quota.online_prediction_dedicated_tokens_per_base_model_version.usage** <br>(count) | Uso actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_dedicated_tokens_per_base_model_version`.|
| **gcp.aiplatform.quota.online_prediction_requests_per_base_model.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `aiplatform.googleapis.com/online_prediction_requests_per_base_model`.<br>_Se muestra como error_ |
| **gcp.aiplatform.quota.online_prediction_requests_per_base_model.limit** <br>(gauge) | Límite actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_requests_per_base_model`.<br>_Se muestra como solicitud_ |
| **gcp.aiplatform.quota.online_prediction_requests_per_base_model.usage** <br>(count) | Uso actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_requests_per_base_model`.<br>_Se muestra como solicitud_ |
| **gcp.aiplatform.quota.online_prediction_tokens_per_minute_per_base_model.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `aiplatform.googleapis.com/online_prediction_tokens_per_minute_per_base_model`.|
| **gcp.aiplatform.quota.online_prediction_tokens_per_minute_per_base_model.limit** <br>(gauge) | Límite actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_tokens_per_minute_per_base_model`.|
| **gcp.aiplatform.quota.online_prediction_tokens_per_minute_per_base_model.usage** <br>(count) | Uso actual de la métrica de cuota `aiplatform.googleapis.com/online_prediction_tokens_per_minute_per_base_model`.|

### Checks de servicio

Google Cloud Vertex AI no incluye checks de servicios.

### Eventos

Google Cloud Vertex AI no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}