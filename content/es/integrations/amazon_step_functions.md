---
app_id: amazon_step_functions
categories:
- nube
- AWS
- recopilación de logs
custom_kind: integración
description: Seguimiento de métricas AWS Step Functions clave.
title: AWS Step Functions
---
## Información general

AWS Step Functions te permite coordinar los componentes de aplicaciones distribuidas y microservicios mediante flujos (flows) de trabajo visuales.

Esta integración te permite ver métricas básicas de AWS Step Functions en Datadog. Para el rastreo y las métricas mejoradas, consulta [Monitorización serverless de Datadog para AWS Step Functions](https://docs.datadoghq.com/serverless/step_functions).

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/). A continuación, añade los siguientes permisos al documento de la política de tu rol AWS/Datadog:

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `States` está habilitado en la pestaña `Metric Collection`. Si tus máquinas de estado utilizan AWS Lambda, asegúrate también de que `Lambda` está seleccionado.
1. Instala la [integración Datadog - AWS Step Functions](https://app.datadoghq.com/integrations/amazon-step-functions).

#### Para enriquecer las métricas AWS Lambda

Si tus estados de Step Functions son funciones Lambda, al instalar esta integración se añaden las [etiquetas (tags)](https://docs.datadoghq.com/getting_started/tagging/) `statemachinename`, `statemachinearn` y `stepname` adicionales a tus métricas Lambda. Esto te permite ver a qué máquinas de estado pertenecen tus funciones Lambda: Puedes visualizarlo en la [página Serverless](https://docs.datadoghq.com/serverless/).

### Recopilación de métricas mejorada

Datadog también puede generar [métricas mejoradas](https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics) para tus Step Functions para ayudarte a realizar un seguimiento del promedio o p99 de las duraciones de pasos individuales. Para utilizar estas métricas mejoradas, consulta [Monitorización serverless de Datadog para AWS Step Functions](https://docs.datadoghq.com/serverless/step_functions).

### Recopilación de logs

1. Configura AWS Step Functions para [enviar logs a CloudWatch](https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html). **Nota**: Utiliza el prefijo del grupo de logs de CloudWatch predeterminado `/aws/vendedlogs/states` de Datadog para identificar el origen de los logs y analizarlos automáticamente.
1. [Envía los logs a Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#log-collection).

### Recopilación de trazas

Puedes habilitar la recopilación de trazas de dos formas: a través de [Datadog APM para AWS Step Functions](https://docs.datadoghq.com/serverless/step_functions) o a través de AWS X-Ray.

#### Habilitar el rastreo a través de Datadog APM para AWS Step Functions

Para habilitar el rastreo distribuido para tus AWS Step Functions. Consulta [Monitorización serverless de Datadog para AWS Step Functions](https://docs.datadoghq.com/serverless/step_functions).

#### Habilitar el rastreo a través de AWS X-Ray

<div class="alert alert-danger">Esta opción no recopila <a href="https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics">métricas mejoradas para AWS Step Functions</a>. Para recopilar estas métricas, debes habilitar el rastreo a través de <a href="https://docs.datadoghq.com/serverless/step_functions">Datadog APM para AWS Step Functions</a>.</div>

Para recopilar trazas de tus AWS Step Functions a través de AWS X-Ray:

1. Habilita la [integración Datadog - AWS X-Ray](https://docs.datadoghq.com/tracing/guide/serverless_enable_aws_xray/).
1. Inicia sesión en la consola de AWS.
1. Ve a **Step Functions.**
1. Selecciona una de tus Step Functions y haz clic en **Edit** (Editar).
1. Desplázate a la sección **Rastreo** en la parte inferior de la página y selecciona la casilla para **Habilitar el rastreo X-Ray**.
1. Recomendado: [Instala la librería de rastreo AWS X-Ray](https://docs.datadoghq.com/tracing/guide/serverless_enable_aws_xray/#installing-the-x-ray-client-libraries) en tus funciones para obtener trazas más detalladas.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.states.activities_failed** <br>(count) | Número de actividades fallidas.|
| **aws.states.activities_heartbeat_timed_out** <br>(count) | Número de actividades interrumpidas debido a un tiempo de espera de latido.|
| **aws.states.activities_scheduled** <br>(count) | Número de actividades programadas.|
| **aws.states.activities_started** <br>(count) | Número de actividades iniciadas.|
| **aws.states.activities_succeeded** <br>(count) | Número de actividades completadas con éxito.|
| **aws.states.activities_timed_out** <br>(count) | Número de actividades interrumpidas en el momento del cierre.|
| **aws.states.activity_run_time** <br>(gauge) | Intervalo de tiempo medio, en milisegundos, entre el momento del inicio de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_run_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el momento del inicio de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_run_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el momento del inicio de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_run_time.p95** <br>(gauge) | Intervalo de tiempo del percentil 95, en milisegundos, entre el momento del inicio de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_run_time.p99** <br>(gauge) | Intervalo de tiempo del percentil 99, en milisegundos, entre el momento del inicio de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_schedule_time** <br>(gauge) | Intervalo de tiempo medio, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_schedule_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_schedule_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_schedule_time.p95** <br>(gauge) | Intervalo de tiempo del percentil 95, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_schedule_time.p99** <br>(gauge) | Intervalo de tiempo del percentil 99, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_time** <br>(gauge) | Intervalo de tiempo medio, en milisegundos, entre el momento de la programación de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el momento de la programación de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el momento de la programación de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_time.p95** <br>(gauge) | Intervalo de tiempo del percentil 95, en milisegundos, entre el momento de la programación de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.activity_time.p99** <br>(gauge) | Intervalo de tiempo del percentil 99, en milisegundos, entre el momento de la programación de la actividad y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.enhanced.execution.execution_time** <br>(gauge) | Tiempo medio de ejecución de la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.execution.execution_time.maximum** <br>(gauge) | Tiempo máximo de ejecución de la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.execution.execution_time.minimum** <br>(gauge) | Tiempo mínimo de ejecución de la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.execution.execution_time.p95** <br>(gauge) | Percentil 95 del tiempo de ejecución de la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.execution.execution_time.p99** <br>(gauge) | Percentil 99 del tiempo de ejecución de la máquina de estados.<br>_Se muestra como nanosegundo_. |
| **aws.states.enhanced.execution.failed** <br>(count) | Número de ejecuciones de máquinas de estados fallidas.|
| **aws.states.enhanced.execution.started** <br>(count) | Número de ejecuciones de máquinas de estado iniciadas.|
| **aws.states.enhanced.execution.succeeded** <br>(count) | Número de ejecuciones de máquinas de estado exitosas.|
| **aws.states.enhanced.task.execution.task_duration** <br>(gauge) | Duración media de una tarea en la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.task.execution.task_duration.maximum** <br>(gauge) | Duración máxima de una tarea en la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.task.execution.task_duration.minimum** <br>(gauge) | Duración mínima de una tarea en la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.task.execution.task_duration.p95** <br>(gauge) | Percentil 95 de la duración de una tarea en la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.task.execution.task_duration.p99** <br>(gauge) | Percentil 99 de la duración de una tarea en la máquina de estados.<br>_Se muestra como nanosegundo_ |
| **aws.states.enhanced.task.execution.task_failed** <br>(count) | Número de ejecuciones de tareas de máquinas de estado fallidas.|
| **aws.states.enhanced.task.execution.task_started** <br>(count) | Número de ejecuciones de tareas de máquinas de estado iniciadas.|
| **aws.states.enhanced.task.execution.task_succeeded** <br>(count) | Número de ejecuciones de tareas de máquinas de estado exitosas.|
| **aws.states.execution_throttled** <br>(count) | Número de eventos StateEntered además de los reintentos.|
| **aws.states.execution_time** <br>(gauge) | Intervalo de tiempo medio, en milisegundos, entre el comienzo de la ejecución y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.execution_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el comienzo de la ejecución y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.execution_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el comienzo de la ejecución y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.execution_time.p95** <br>(gauge) | Intervalo del percentil 95, en milisegundos, entre el comienzo de la ejecución y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.execution_time.p99** <br>(gauge) | Intervalo del percentil 99, en milisegundos, entre el comienzo de la ejecución y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.executions_aborted** <br>(count) | Número de ejecuciones abortadas/terminadas.|
| **aws.states.executions_failed** <br>(count) | Número de ejecuciones fallidas.|
| **aws.states.executions_started** <br>(count) | Número de ejecuciones iniciadas.|
| **aws.states.executions_succeeded** <br>(count) | Número de ejecuciones completadas con éxito.|
| **aws.states.executions_timed_out** <br>(count) | Número de ejecuciones interrumpidas por cualquier motivo.|
| **aws.states.lambda_function_run_time** <br>(gauge) | Intervalo de tiempo medio, en milisegundos, entre el inicio de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_run_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre el inicio de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_run_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre el inicio de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_run_time.p95** <br>(gauge) | Intervalo de tiempo del percentil 95, en milisegundos, entre el inicio de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_run_time.p99** <br>(gauge) | Intervalo de tiempo del percentil 99, en milisegundos, entre el inicio de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_schedule_time** <br>(gauge) | Intervalo de tiempo medio, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_schedule_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_schedule_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_schedule_time.p95** <br>(gauge) | Intervalo de tiempo del percentil 95, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_schedule_time.p99** <br>(gauge) | Intervalo de tiempo del percentil 99, en milisegundos, en que la actividad ha permanecido en estado de programación.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_time** <br>(gauge) | Intervalo de tiempo medio, en milisegundos, entre la programación de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_time.maximum** <br>(gauge) | Intervalo de tiempo máximo, en milisegundos, entre la programación de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_time.minimum** <br>(gauge) | Intervalo de tiempo mínimo, en milisegundos, entre la programación de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_time.p95** <br>(gauge) | Intervalo de tiempo del percentil 95, en milisegundos, entre la programación de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_function_time.p99** <br>(gauge) | Intervalo de tiempo del percentil 99, en milisegundos, entre la programación de la función Lambda y su cierre.<br>_Se muestra como milisegundo_ |
| **aws.states.lambda_functions_failed** <br>(count) | Número de funciones Lambda fallidas.|
| **aws.states.lambda_functions_heartbeat_timed_out** <br>(count) | Número de funciones Lambda interrumpidas debido a un tiempo de espera de latido.|
| **aws.states.lambda_functions_scheduled** <br>(count) | Número de funciones Lambda programadas.|
| **aws.states.lambda_functions_started** <br>(count) | Número de funciones Lambda iniciadas.|
| **aws.states.lambda_functions_succeeded** <br>(count) | Número de funciones Lambda completadas con éxito.|
| **aws.states.lambda_functions_timed_out** <br>(count) | Número de funciones Lambda interrumpidas al cerrarse.|

### Eventos

La integración AWS Step Functions no incluye eventos.

### Checks de servicio

La integración AWS Step Functions no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).
