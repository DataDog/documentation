---
aliases:
- /es/integrations/awsswf/
app_id: amazon_swf
categories:
- nube
- configuración y despliegue
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea las métricas clave de Amazon Simple Workflow Service.
title: Amazon Simple Workflow Service
---
## Información general

Amazon SWF ayuda a los desarrolladores a crear, ejecutar y escalar trabajos en segundo plano con pasos paralelos o secuenciales.

Habilita esta integración para ver en Datadog todas tus métricas de SWF.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `SWF` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon SWF](https://app.datadoghq.com/integrations/amazon-swf).

### Recopilación de logs

#### Activar logging

Configura Amazon SWF para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_swf` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon SWF en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.swf.activity_task_schedule_to_close_time** <br>(gauge) | El intervalo de tiempo, en milisegundos, entre el momento en que se programó la actividad y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_schedule_to_close_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el momento en que se programó la actividad y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_schedule_to_close_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el momento en que se programó la actividad y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_schedule_to_start_time** <br>(gauge) | El intervalo de tiempo, en milisegundos, entre el momento en que se programó la tarea de actividad y cuando se inició.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_schedule_to_start_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el momento en que se programó la tarea de actividad y el momento en que se inició.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_schedule_to_start_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el momento en que se programó la tarea de actividad y el momento en que se inició.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_start_to_close_time** <br>(gauge) | El intervalo de tiempo, en milisegundos, entre el momento en que se inició la tarea de decisión y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_start_to_close_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el momento en que se inició la tarea de decisión y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_task_start_to_close_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el momento en que se inició la tarea de decisión y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.activity_tasks_canceled** <br>(count) | Recuento de tareas de actividad canceladas.|
| **aws.swf.activity_tasks_completed** <br>(count) | Recuento de tareas de actividad completadas.|
| **aws.swf.activity_tasks_failed** <br>(count) | Recuento de tareas de actividad que han fallado.|
| **aws.swf.consumed_capacity** <br>(count) | El recuento de solicitudes por segundo.<br>_Se muestra como solicitud_ |
| **aws.swf.decision_task_schedule_to_start_time** <br>(gauge) | El intervalo de tiempo, en milisegundos, entre el momento en que la tarea de decisión fue programada y el momento en que fue recopilada por un worker e iniciada.<br>_Se muestra como milisegundo_ |
| **aws.swf.decision_task_schedule_to_start_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el momento en que se programó la tarea de decisión y el momento en que fue recopilada por un worker e iniciada.<br>_Se muestra como milisegundo_ |
| **aws.swf.decision_task_schedule_to_start_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el momento en que se programó la tarea de decisión y el momento en que fue recopilada por un worker e iniciada.<br>_Se muestra como milisegundo_ |
| **aws.swf.decision_task_start_to_close_time** <br>(gauge) | El intervalo de tiempo, en milisegundos, entre el momento en que se inició la tarea de decisión y el momento en que se cerró.|
| **aws.swf.decision_task_start_to_close_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el momento en que se inició la tarea de decisión y el momento en que se cerró.|
| **aws.swf.decision_task_start_to_close_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el momento en que se inició la tarea de decisión y el momento en que se cerró.|
| **aws.swf.decision_tasks_completed** <br>(count) | Recuento de las tareas de decisión que se han completado.|
| **aws.swf.pending_tasks** <br>(count) | El recuento de tareas pendientes en un intervalo de 1 minuto para una lista de tareas específica.<br>_Se muestra como tarea_ |
| **aws.swf.provisioned_bucket_size** <br>(count) | El recuento de solicitudes disponibles por segundo.<br>_Se muestra como solicitud_ |
| **aws.swf.provisioned_refill_rate** <br>(count) | El número de solicitudes por segundo permitidas en el bucket.<br>_Se muestra como solicitud_ |
| **aws.swf.scheduled_activity_tasks_timed_out_on_close** <br>(count) | El recuento de tareas de actividad que se programaron pero se agotaron al cierre.|
| **aws.swf.scheduled_activity_tasks_timed_out_on_start** <br>(count) | Recuento de tareas de actividad que se programaron pero caducaron al iniciarse.|
| **aws.swf.started_activity_tasks_timed_out_on_close** <br>(count) | Recuento de las tareas de actividad que se iniciaron pero se cerraron antes de tiempo.|
| **aws.swf.started_activity_tasks_timed_out_on_heartbeat** <br>(count) | Recuento de las tareas de actividad que se iniciaron, pero expiraron debido a un tiempo de espera del latido.|
| **aws.swf.started_decision_tasks_timed_out_on_close** <br>(count) | El recuento de las tareas de decisión que se iniciaron, pero expiraron al cerrarse.|
| **aws.swf.throttled_events** <br>(count) | El recuento de solicitudes que han sido limitadas.<br>_Se muestra como solicitud_ |
| **aws.swf.workflow_start_to_close_time** <br>(gauge) | El tiempo, en milisegundos, entre el momento en que se inició el proceso y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.workflow_start_to_close_time.maximum** <br>(gauge) | Tiempo máximo, en milisegundos, entre el momento en que se inició el proceso y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.workflow_start_to_close_time.minimum** <br>(gauge) | Tiempo mínimo, en milisegundos, entre el momento en que se inició el proceso y el momento en que se cerró.<br>_Se muestra como milisegundo_ |
| **aws.swf.workflows_canceled** <br>(count) | Recuento de procesos cancelados.|
| **aws.swf.workflows_completed** <br>(count) | Recuento de procesos completados.|
| **aws.swf.workflows_continued_as_new** <br>(count) | El recuento de procesos que continuaron como nuevos.|
| **aws.swf.workflows_failed** <br>(count) | Recuento de procesos que han fallado.|
| **aws.swf.workflows_terminated** <br>(count) | Recuento de procesos finalizados.|
| **aws.swf.workflows_timed_out** <br>(count) | Recuento de procesos que se han interrumpido por cualquier motivo.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon SWF no incluye ningún evento.

### Checks de servicio

La integración de Amazon SWF no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).