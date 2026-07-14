---
app_id: amazon_sagemaker
categories:
- automatización
- aws
- nube
- recopilación de logs
- ia/ml
custom_kind: integración
description: Rastrea métricas clave de Amazon SageMaker.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: Blog
  text: 'CloudHealth + Datadog: gestiona eficazmente tus activos en la nube'
title: Amazon SageMaker
---
## Información general

Amazon SageMaker es un servicio de machine learning totalmente gestionado. Con Amazon SageMaker, los científicos de datos y los desarrolladores pueden crear y entrenar modelos de machine learning y, a continuación, desplegarlos directamente en un entorno alojado listo para la producción.

Habilita esta integración para ver todas tus métricas de SageMaker en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `SageMaker` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon SageMaker](https://app.datadoghq.com/integrations/amazon-sagemaker).

### Recopilación de logs

#### Activar logging

Configura Amazon SageMaker para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_sagemaker` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de AWS Lambda de recopilación de logs de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#log-collection).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon SageMaker en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.sagemaker.consumed_read_requests_units** <br>(count) | El número medio de unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_read_requests_units.maximum** <br>(count) | El número máximo de unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_read_requests_units.minimum** <br>(count) | El número mínimo de unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_read_requests_units.p90** <br>(count) | El percentil 90 de las unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_read_requests_units.p95** <br>(count) | El percentil 95 de las unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_read_requests_units.p99** <br>(count) | El percentil 99 de las unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_read_requests_units.sample_count** <br>(count) | El recuento de muestras de unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_read_requests_units.sum** <br>(count) | La suma de las unidades de lectura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units** <br>(count) | El número medio de unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units.maximum** <br>(count) | El número máximo de unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units.minimum** <br>(count) | El número mínimo de unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units.p90** <br>(count) | El percentil 90 de las unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units.p95** <br>(count) | El percentil 95 de las unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units.p99** <br>(count) | El percentil 99 de unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units.sample_count** <br>(count) | El recuento de muestra de unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.consumed_write_requests_units.sum** <br>(count) | La suma de las unidades de escritura consumidas durante el periodo especificado.|
| **aws.sagemaker.endpoints.cpuutilization** <br>(gauge) | Porcentaje medio de unidades CPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.cpuutilization.maximum** <br>(gauge) | El porcentaje máximo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.cpuutilization.minimum** <br>(gauge) | El porcentaje mínimo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.disk_utilization** <br>(gauge) | El porcentaje medio de espacio en disco utilizado por los contenedores en una instancia utiliza.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.disk_utilization.maximum** <br>(gauge) | El porcentaje máximo de espacio en disco utilizado por los contenedores en una instancia utiliza.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.disk_utilization.minimum** <br>(gauge) | El porcentaje mínimo de espacio en disco utilizado por los contenedores en una instancia utiliza.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.gpu_memory_utilization** <br>(gauge) | Porcentaje medio de memoria GPU utilizada por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.gpu_memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.gpu_memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.gpu_utilization** <br>(gauge) | Porcentaje medio de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.gpu_utilization.maximum** <br>(gauge) | Porcentaje máximo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.gpu_utilization.minimum** <br>(gauge) | Porcentaje mínimo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.loaded_model_count** <br>(count) | Número de modelos cargados en los contenedores del endpoint multimodelo. Esta métrica se emite por instancia.|
| **aws.sagemaker.endpoints.loaded_model_count.maximum** <br>(count) | El número máximo de modelos cargados en los contenedores del endpoint multimodelo. Esta métrica se emite por instancia.|
| **aws.sagemaker.endpoints.loaded_model_count.minimum** <br>(count) | El número mínimo de modelos cargados en los contenedores del endpoint multimodelo. Esta métrica se emite por instancia.|
| **aws.sagemaker.endpoints.loaded_model_count.sample_count** <br>(count) | El recuento de muestra de modelos cargados en los contenedores del endpoint multimodelo. Esta métrica se emite por instancia.|
| **aws.sagemaker.endpoints.loaded_model_count.sum** <br>(count) | La suma de modelos cargados en los contenedores del endpoint multimodelo. Esta métrica se emite por instancia.|
| **aws.sagemaker.endpoints.memory_utilization** <br>(gauge) | Porcentaje medio de memoria utilizado por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.endpoints.memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.invocation_4xx_errors** <br>(count) | Número medio de solicitudes InvokeEndpoint en las que el modelo ha devuelto un código de respuesta HTTP 4xx.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocation_4xx_errors.sum** <br>(count) | La suma del número de solicitudes InvokeEndpoint en las que el modelo devolvió un código de respuesta HTTP 4xx.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocation_5xx_errors** <br>(count) | Número medio de solicitudes InvokeEndpoint en las que el modelo ha devuelto un código de respuesta HTTP 5xx.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocation_5xx_errors.sum** <br>(count) | Suma del número de solicitudes InvokeEndpoint en las que el modelo ha devuelto un código de respuesta HTTP 5xx.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocation_model_errors** <br>(count) | Número de solicitudes de invocación del modelo que no han dado lugar a una respuesta HTTP 2XX. Esto incluye códigos de estado 4XX/5XX, errores de socket de bajo nivel, respuestas HTTP malformadas y tiempos de espera de solicitud.|
| **aws.sagemaker.invocations** <br>(count) | Número de solicitudes InvokeEndpoint enviadas a un endpoint del modelo.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocations.maximum** <br>(count) | El máximo del número de solicitudes InvokeEndpoint enviadas a un endpoint del modelo.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocations.minimum** <br>(count) | El mínimo del número de solicitudes InvokeEndpoint enviadas a un endpoint del modelo.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocations.sample_count** <br>(count) | El recuento de muestra del número de solicitudes InvokeEndpoint enviadas a un endpoint del modelo.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.invocations_per_instance** <br>(count) | El número de invocaciones enviadas a un modelo normalizado por InstanceCount en cada ProductionVariant.|
| **aws.sagemaker.invocations_per_instance.sum** <br>(count) | La suma de invocaciones enviadas a un modelo normalizado por InstanceCount en cada ProductionVariant.|
| **aws.sagemaker.jobs_failed** <br>(count) | El número medio de veces que ha fallado un único trabajo de etiquetado.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.jobs_failed.sample_count** <br>(count) | El recuento de muestra de ocurrencias de un solo trabajo de etiquetado falló.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.jobs_failed.sum** <br>(count) | La suma de veces que ha fallado un trabajo de etiquetado único.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.jobs_stopped** <br>(count) | El número medio de veces que se detuvo un trabajo de etiquetado único.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.jobs_stopped.sample_count** <br>(count) | El recuento de muestras de ocurrencias de un trabajo único etiquetado se detuvo.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.jobs_stopped.sum** <br>(count) | La suma de veces que se detuvo un trabajo de etiquetado único.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.labelingjobs.dataset_objects_auto_annotated** <br>(count) | Número medio de objetos del conjunto de datos autoanotados en un trabajo de etiquetado.|
| **aws.sagemaker.labelingjobs.dataset_objects_auto_annotated.max** <br>(count) | Número máximo de objetos del conjunto de datos autoanotados en un trabajo de etiquetado.|
| **aws.sagemaker.labelingjobs.dataset_objects_human_annotated** <br>(count) | Número medio de objetos del conjunto de datos anotados por un humano en un trabajo de etiquetado.|
| **aws.sagemaker.labelingjobs.dataset_objects_human_annotated.max** <br>(count) | Número máximo de objetos del conjunto de datos anotados por un humano en un trabajo de etiquetado.|
| **aws.sagemaker.labelingjobs.dataset_objects_labeling_failed** <br>(count) | Número de objetos del conjunto de datos cuyo etiquetado ha fallado en un trabajo de etiquetado.|
| **aws.sagemaker.labelingjobs.dataset_objects_labeling_failed.max** <br>(count) | Número de objetos del conjunto de datos cuyo etiquetado ha fallado en un trabajo de etiquetado.|
| **aws.sagemaker.labelingjobs.jobs_succeeded** <br>(count) | El número medio de veces que un único trabajo de etiquetado ha tenido éxito.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.labelingjobs.jobs_succeeded.sample_count** <br>(count) | El recuento de muestra de ocurrencias que un único trabajo de etiquetado tuvo éxito.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.labelingjobs.jobs_succeeded.sum** <br>(count) | La suma de veces que un trabajo de etiquetado único ha tenido éxito.<br>_Se muestra como trabajo_ |
| **aws.sagemaker.labelingjobs.total_dataset_objects_labeled** <br>(count) | Número medio de objetos del conjunto de datos etiquetados con éxito en un trabajo de etiquetado.|
| **aws.sagemaker.labelingjobs.total_dataset_objects_labeled.maximum** <br>(count) | Número máximo de objetos del conjunto de datos etiquetados con éxito en un trabajo de etiquetado.|
| **aws.sagemaker.model_cache_hit** <br>(count) | Número de solicitudes InvokeEndpoint enviadas al endpoint multimodelo cuyo modelo ya estaba cargado.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.model_cache_hit.maximum** <br>(count) | El número máximo de solicitudes InvokeEndpoint enviadas al endpoint multimodelo cuyo modelo ya estaba cargado.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.model_cache_hit.minimum** <br>(count) | El número mínimo de solicitudes InvokeEndpoint enviadas al endpoint multimodelo cuyo modelo ya estaba cargado.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.model_cache_hit.sample_count** <br>(count) | El recuento de muestras de solicitudes InvokeEndpoint enviadas al endpoint multimodelo cuyo modelo ya estaba cargado.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.model_cache_hit.sum** <br>(count) | La suma de solicitudes InvokeEndpoint enviadas al endpoint multimodelo cuyo modelo ya estaba cargado.<br>_Se muestra como solicitud_ |
| **aws.sagemaker.model_downloading_time** <br>(gauge) | El intervalo de tiempo que se tarda en descargar el modelo de Amazon Simple Storage Service (Amazon S3).<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_downloading_time.maximum** <br>(gauge) | El intervalo de tiempo máximo que se tarda en descargar el modelo de Amazon Simple Storage Service (Amazon S3).<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_downloading_time.minimum** <br>(gauge) | El intervalo de tiempo mínimo que se tarda en descargar el modelo de Amazon Simple Storage Service (Amazon S3).<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_downloading_time.sample_count** <br>(count) | El intervalo de tiempo de recuento de muestras que tarda en descargarse el modelo de Amazon Simple Storage Service (Amazon S3).<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_downloading_time.sum** <br>(gauge) | El intervalo de tiempo sumado que tarda en descargarse el modelo de Amazon Simple Storage Service (Amazon S3).<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_latency** <br>(gauge) | El intervalo medio de tiempo que tarda un modelo en responder visto desde Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_latency.maximum** <br>(gauge) | El intervalo máximo de tiempo que tarda un modelo en responder visto desde Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_latency.minimum** <br>(gauge) | El intervalo mínimo de tiempo que tarda un modelo en responder visto desde Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_latency.sample_count** <br>(count) | El intervalo de recuento de muestras del tiempo que tarda un modelo en responder visto desde Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_latency.sum** <br>(gauge) | La suma del intervalo de tiempo que tarda un modelo en responder visto desde Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_time** <br>(gauge) | El intervalo de tiempo que tarda en cargarse el modelo a través de la llamada a la API LoadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_time.maximum** <br>(gauge) | El intervalo de tiempo máximo que se tarda en cargar el modelo a través de la llamada a la API LoadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_time.minimum** <br>(gauge) | El intervalo de tiempo mínimo que se tarda en cargar el modelo a través de la llamada a la API LoadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_time.sample_count** <br>(count) | El intervalo de tiempo del recuento de muestras que tarda en cargarse el modelo a través de la llamada a la API LoadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_time.sum** <br>(gauge) | El intervalo de tiempo sumado que tarda en cargarse el modelo a través de la llamada a la API LoadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_wait_time** <br>(gauge) | El intervalo de tiempo que una solicitud de invocación ha esperado a que el modelo de destino se descargue, o se cargue, o ambas cosas, para realizar la inferencia.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_wait_time.maximum** <br>(gauge) | El intervalo máximo de tiempo que una solicitud de invocación ha esperado a que el modelo de destino se descargue, o se cargue, o ambas cosas, para realizar la inferencia.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_wait_time.minimum** <br>(gauge) | El intervalo mínimo de tiempo que una solicitud de invocación ha esperado a que el modelo de destino se descargue, o se cargue, o ambas cosas, para poder realizar la inferencia.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_wait_time.sample_count** <br>(count) | El intervalo de tiempo de recuento de muestras que una solicitud de invocación ha esperado a que el modelo de destino se descargue, se cargue o ambas cosas para realizar la inferencia.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_loading_wait_time.sum** <br>(gauge) | La suma del intervalo de tiempo que una solicitud de invocación ha esperado a que el modelo de destino se descargue, o se cargue, o ambas cosas, para realizar la inferencia.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_setup_time** <br>(gauge) | El tiempo medio que se tarda en lanzar nuevos recursos informáticos para un endpoint sin servidor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_setup_time.maximum** <br>(gauge) | El intervalo de tiempo máximo que se tarda en lanzar nuevos recursos informáticos para un endpoint sin servidor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_setup_time.minimum** <br>(gauge) | El intervalo de tiempo mínimo que se tarda en lanzar nuevos recursos informáticos para un endpoint sin servidor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_setup_time.sample_count** <br>(count) | El recuento_de_muestras de la cantidad de tiempo que se tarda en lanzar nuevos recursos informáticos para un endpoint sin servidor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_setup_time.sum** <br>(gauge) | La cantidad total de tiempo que se tarda en lanzar nuevos recursos informáticos para un endpoint sin servidor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_unloading_time** <br>(gauge) | El intervalo de tiempo que se tarda en descargar el modelo a través de la llamada a la API UnloadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_unloading_time.maximum** <br>(gauge) | El intervalo máximo de tiempo que se tarda en descargar el modelo a través de la llamada a la API UnloadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_unloading_time.minimum** <br>(gauge) | El intervalo de tiempo mínimo que se tarda en descargar el modelo a través de la llamada a la API UnloadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_unloading_time.sample_count** <br>(count) | El intervalo de tiempo del recuento de muestras que se tarda en descargar el modelo a través de la llamada a la API UnloadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.model_unloading_time.sum** <br>(gauge) | El intervalo de tiempo sumado que se tarda en descargar el modelo a través de la llamada a la API UnloadModel del contenedor.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.modelbuildingpipeline.execution_duration** <br>(gauge) | La duración media en milisegundos de la ejecución de pipeline.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.execution_duration.maximum** <br>(gauge) | La duración máxima en milisegundos que duró la ejecución de pipeline.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.execution_duration.minimum** <br>(gauge) | Duración mínima en milisegundos de la ejecución de pipeline.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.execution_duration.sample_count** <br>(count) | La duración del recuento de muestras en milisegundos que duró la ejecución de pipeline.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.execution_duration.sum** <br>(gauge) | La duración total en milisegundos de la ejecución de pipeline.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.execution_failed** <br>(count) | El número medio de pasos que fallaron.|
| **aws.sagemaker.modelbuildingpipeline.execution_failed.sum** <br>(count) | La suma de pasos que fallaron.|
| **aws.sagemaker.modelbuildingpipeline.execution_started** <br>(count) | El número medio de ejecuciones de pipeline que se iniciaron.|
| **aws.sagemaker.modelbuildingpipeline.execution_started.sum** <br>(count) | La suma de las ejecuciones de pipeline que se iniciaron.|
| **aws.sagemaker.modelbuildingpipeline.execution_stopped** <br>(count) | El número medio de ejecuciones de pipeline que se detuvieron.|
| **aws.sagemaker.modelbuildingpipeline.execution_stopped.sum** <br>(count) | La suma de las ejecuciones de pipeline que se detuvieron.|
| **aws.sagemaker.modelbuildingpipeline.execution_succeeded** <br>(count) | El número medio de ejecuciones de pipeline que han tenido éxito.|
| **aws.sagemaker.modelbuildingpipeline.execution_succeeded.sum** <br>(count) | La suma de las ejecuciones de pipeline que han tenido éxito.|
| **aws.sagemaker.modelbuildingpipeline.step_duration** <br>(gauge) | La duración media en milisegundos de la ejecución del paso.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.step_duration.maximum** <br>(gauge) | Duración máxima en milisegundos de la ejecución del paso.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.step_duration.minimum** <br>(gauge) | Duración mínima en milisegundos de la ejecución del paso.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.step_duration.sample_count** <br>(count) | La duración del recuento de muestras en milisegundos dela ejecución del paso.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.step_duration.sum** <br>(gauge) | La duración total en milisegundos de la ejecución del paso.<br>_Se muestra en milisegundos_ |
| **aws.sagemaker.modelbuildingpipeline.step_failed** <br>(count) | El número medio de pasos que fallaron.|
| **aws.sagemaker.modelbuildingpipeline.step_failed.sum** <br>(count) | La suma de pasos que fallaron.|
| **aws.sagemaker.modelbuildingpipeline.step_started** <br>(count) | El número medio de pasos que se iniciaron.|
| **aws.sagemaker.modelbuildingpipeline.step_started.sum** <br>(count) | La suma de los pasos que empezaron.|
| **aws.sagemaker.modelbuildingpipeline.step_stopped** <br>(count) | El número medio de pasos que se detuvieron.|
| **aws.sagemaker.modelbuildingpipeline.step_stopped.sum** <br>(count) | La suma de pasos que se detuvieron.|
| **aws.sagemaker.modelbuildingpipeline.step_succeeded** <br>(count) | El número medio de pasos que tuvieron éxito.|
| **aws.sagemaker.modelbuildingpipeline.step_succeeded.sum** <br>(count) | La suma de pasos que tuvieron éxito.|
| **aws.sagemaker.overhead_latency** <br>(gauge) | El intervalo medio de tiempo añadido al tiempo que se tarda en responder a una solicitud de cliente por los gastos generales de Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.overhead_latency.maximum** <br>(gauge) | El intervalo máximo de tiempo añadido al tiempo que se tarda en responder a una solicitud de cliente por los gastos generales de Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.overhead_latency.minimum** <br>(gauge) | El intervalo de tiempo mínimo añadido al tiempo que se tarda en responder a una solicitud de cliente por los gastos generales de Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.overhead_latency.sample_count** <br>(count) | El recuento de muestras del intervalo de tiempo añadido al tiempo que se tarda en responder a una solicitud de cliente por los gastos generales de Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.overhead_latency.sum** <br>(gauge) | La suma del intervalo de tiempo añadido al tiempo que se tarda en responder a una solicitud de cliente por los gastos generales de Amazon SageMaker.<br>_Se muestra en microsegundos_ |
| **aws.sagemaker.processingjobs.cpuutilization** <br>(gauge) | Porcentaje medio de unidades CPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.cpuutilization.maximum** <br>(gauge) | El porcentaje máximo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.cpuutilization.minimum** <br>(gauge) | El porcentaje mínimo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.disk_utilization** <br>(gauge) | El porcentaje medio de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.disk_utilization.maximum** <br>(gauge) | El porcentaje máximo de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.disk_utilization.minimum** <br>(gauge) | El porcentaje mínimo de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.gpu_memory_utilization** <br>(gauge) | Porcentaje medio de memoria GPU utilizada por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.gpu_memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.gpu_memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.gpu_utilization** <br>(gauge) | Porcentaje medio de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.gpu_utilization.maximum** <br>(gauge) | Porcentaje máximo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.gpu_utilization.minimum** <br>(gauge) | Porcentaje mínimo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.memory_utilization** <br>(gauge) | Porcentaje medio de memoria utilizado por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.processingjobs.memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.tasks_returned** <br>(count) | Número medio de veces que se ha devuelto una misma tarea.|
| **aws.sagemaker.tasks_returned.sample_count** <br>(count) | El recuento de muestras de las veces que se ha devuelto una única tarea.|
| **aws.sagemaker.tasks_returned.sum** <br>(count) | La suma de las veces que se ha devuelto una sola tarea.|
| **aws.sagemaker.trainingjobs.cpuutilization** <br>(gauge) | Porcentaje medio de unidades CPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.cpuutilization.maximum** <br>(gauge) | El porcentaje máximo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.cpuutilization.minimum** <br>(gauge) | El porcentaje mínimo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.disk_utilization** <br>(gauge) | El porcentaje medio de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.disk_utilization.maximum** <br>(gauge) | El porcentaje máximo de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.disk_utilization.minimum** <br>(gauge) | El porcentaje mínimo de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.gpu_memory_utilization** <br>(gauge) | Porcentaje medio de memoria GPU utilizada por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.gpu_memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.gpu_memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.gpu_utilization** <br>(gauge) | Porcentaje medio de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.gpu_utilization.maximum** <br>(gauge) | Porcentaje máximo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.gpu_utilization.minimum** <br>(gauge) | Porcentaje mínimo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.memory_utilization** <br>(gauge) | Porcentaje medio de memoria utilizado por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.trainingjobs.memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.cpuutilization** <br>(gauge) | Porcentaje medio de unidades CPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.cpuutilization.maximum** <br>(gauge) | El porcentaje máximo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.cpuutilization.minimum** <br>(gauge) | El porcentaje mínimo de unidades CPU que son utilizadas por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.disk_utilization** <br>(gauge) | El porcentaje medio de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.disk_utilization.maximum** <br>(gauge) | El porcentaje máximo de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.disk_utilization.minimum** <br>(gauge) | El porcentaje mínimo de espacio en disco utilizado por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.gpu_memory_utilization** <br>(gauge) | Porcentaje medio de memoria GPU utilizada por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.gpu_memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.gpu_memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria GPU utilizada por los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.gpu_utilization** <br>(gauge) | Porcentaje medio de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.gpu_utilization.maximum** <br>(gauge) | Porcentaje máximo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.gpu_utilization.minimum** <br>(gauge) | Porcentaje mínimo de unidades GPU utilizadas por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.memory_utilization** <br>(gauge) | Porcentaje medio de memoria utilizado por los contenedores de una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.transformjobs.memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de memoria que utilizan los contenedores en una instancia.<br>_Se muestra como porcentaje_ |
| **aws.sagemaker.workteam.active_workers** <br>(count) | El número medio de workers activos individuales en un equipo de trabajo privado que enviaron, liberaron o rechazaron una tarea.|
| **aws.sagemaker.workteam.active_workers.sample_count** <br>(count) | El recuento de muestra de workers activos individuales en un equipo de trabajo privado que enviaron, liberaron o rechazaron una tarea.|
| **aws.sagemaker.workteam.active_workers.sum** <br>(count) | La suma de workers activos individuales en un equipo de trabajo privado que enviaron, liberaron o rechazaron una tarea.|
| **aws.sagemaker.workteam.tasks_accepted** <br>(count) | Número medio de veces que un worker acepta una misma tarea.|
| **aws.sagemaker.workteam.tasks_accepted.sample_count** <br>(count) | Recuento por muestreo de las veces que un worker ha aceptado una tarea.|
| **aws.sagemaker.workteam.tasks_accepted.sum** <br>(count) | La suma de veces que un worker ha aceptado una misma tarea.|
| **aws.sagemaker.workteam.tasks_declined** <br>(count) | Número medio de veces que un worker ha rechazado una misma tarea.|
| **aws.sagemaker.workteam.tasks_declined.sample_count** <br>(count) | Recuento por muestreo de las veces que un worker ha rechazado una tarea.|
| **aws.sagemaker.workteam.tasks_declined.sum** <br>(count) | Número de veces que un worker ha rechazado una tarea.|
| **aws.sagemaker.workteam.tasks_submitted** <br>(count) | Número medio de veces que un worker privado ha enviado/realizado una tarea.|
| **aws.sagemaker.workteam.tasks_submitted.sample_count** <br>(count) | Número medio de veces que un worker privado ha enviado/realizado una tarea.|
| **aws.sagemaker.workteam.tasks_submitted.sum** <br>(count) | Número medio de veces que un worker privado ha enviado/realizado una tarea.|
| **aws.sagemaker.workteam.time_spent** <br>(count) | Tiempo medio dedicado a una tarea realizada por un worker privado.|
| **aws.sagemaker.workteam.time_spent.sample_count** <br>(count) | Tiempo medio dedicado a una tarea realizada por un worker privado.|
| **aws.sagemaker.workteam.time_spent.sum** <br>(count) | Tiempo medio dedicado a una tarea realizada por un worker privado.|

### Eventos

La integración de Amazon SageMaker no incluye ningún evento.

### Checks de servicio

La integración de Amazon SageMaker no incluye ningún check de servicio.

## Monitorización predefinida

Datadog proporciona dashboards predefinidos para los endpoints y trabajos de SageMaker.

### Endpoints de SageMaker

Utiliza el [dashboard de endpoints de SageMaker](https://app.datadoghq.com/dash/integration/31076/amazon-sagemaker-endpoints) para ayudarte a empezar inmediatamente a supervisar el estado y el rendimiento de tus endpoints de SageMaker sin ninguna configuración adicional. Determina qué endpoints tienen errores, latencia superior a la esperada o picos de tráfico. Revisa y corrige tus selecciones de tipo de instancia y política de escalado utilizando métricas de utilización de CPU, GPU, memoria y disco.

{{< img src="integrations/amazon_sagemaker/sagemaker_endpoints_2.png" alt="Dashboard de endpoints de SageMaker predefinido" style="width:80%;">}}

### Trabajos de SageMaker

Puedes utilizar el [dashboard de trabajos de SageMaker](https://app.datadoghq.com/dash/integration/31077/amazon-sagemaker-jobs) para obtener información sobre la utilización de recursos (por ejemplo, encontrar cuellos de botella de CPU, GPU y almacenamiento) de tus trabajos de formación, procesamiento o transformación. Utiliza esta información para optimizar tus instancias de computación.

{{< img src="integrations/amazon_sagemaker/sagemaker_jobs_2.png" alt="Dashboard de trabajos de SageMaker predefinidos" style="width:80%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).