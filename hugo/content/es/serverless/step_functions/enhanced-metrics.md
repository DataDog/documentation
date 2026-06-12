---
title: Métricas mejoradas para AWS Step Functions
---

Además de [ingerir métricas de integración de AWS][3], Datadog genera métricas mejoradas para AWS Step Functions, similares a las [métricas mejoradas para AWS Lambda][1]. Las métricas mejoradas de Step Functions se distinguen por estar en el espacio de nombres `aws.states.enhanced.*`. Para añadir métricas mejoradas, sigue las [instrucciones de instalación de la monitorización de AWS Step Function][3] y asegúrate de que `DD_ENHANCED_METRICS` esté configurado como `true`. 

Están disponibles las siguientes métricas mejoradas de Step Functions.

`aws.states.enhanced.execution.started`
: Counts el número total de ejecuciones que se han iniciado.

`aws.states.enhanced.execution.succeeded`
: Counts el número total de ejecuciones que han tenido éxito.

`aws.states.enhanced.execution.failed`
: Counts el número total de ejecuciones que fallaron.

`aws.states.enhanced.execution.execution_time`
: Distribución de la duración de las ejecuciones individuales.

`aws.states.enhanced.task.execution.tasks_started`
: Counts el número total de tareas que se han iniciado.

`aws.states.enhanced.task.execution.tasks_succeeded`
: Counts el número total de tareas que han tenido éxito.

`aws.states.enhanced.task.execution.tasks_failed`
: Counts el número total de tareas que han fallado.

`aws.states.enhanced.task.execution.task_duration`
: Distribución de las duraciones de las tareas individuales.

`aws.states.enhanced.state.run_duration`
: gauge para las duraciones de las ejecuciones de un estado.

`aws.states.enhanced.state.duration`: Gauge para la duración de las ejecuciones de un estado, incluidos los reintentos.

`aws.states.enhanced.state.invocation_count`
: Recuento del número de veces que se invoca un estado.

`aws.states.enhanced.state.retry_count`
: Gauge del número de reintentos de un estado.

[1]: /es/serverless/aws_lambda/metrics#enhanced-lambda-metrics
[2]: /es/integrations/amazon_web_services/
[3]: /es/serverless/step_functions/installation