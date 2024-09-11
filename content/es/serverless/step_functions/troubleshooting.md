---
title: Solucionar problemas de monitorización serverless de AWS Step Functions
---

## No veo ninguna traza (trace)

### Verificar que tu Step Function esté configurado para enviar todos los logs

- Asegúrate de que la variable de entorno `DD_TRACE_ENABLED` esté configurada en `true` en la función lambda en tu consola de AWS.
- En tu consola de AWS, abre la pestaña del registro de tu Step Function. Asegúrate de que _Log level_ esté configurado en `ALL` y de que _Include execution data_ esté seleccionado.
- Asegúrate de que el grupo de logs de CloudWatch (que también se encuentra en la pestaña del registro) tenga un filtro de suscripción a Datadog Lambda Forwarder en la misma región.

### Verificar que los logs se reenvíen correctamente a Datadog
- Check el Datadog Lambda Forwarder para los mensajes de error. Asegúrate de que hayas configurado correctamente tu clave de la API y el sitio Datadog.
- Activa `DEBUG` logs en el Datadog Lambda Forwarder configurando la variable de entorno `DD_LOG_LEVEL` en `debug`.

### Verificar que los logs se puedan buscar en Búsqueda en vivo y que tengas la etiqueta DD_TRACE_ENABLED
En Datadog, ve a [**Logs > Flujo (stream) de logs**][2]. Busca `source:stepfunction`. Es posible que tengas que activar la máquina de estados varias veces. Si necesitas actualizar Datadog Lambda Forwarder desde una versión anterior, check que después de la actualización, el Forwarder tenga la etiqueta `DD_FETCH_STEP_FUNCTIONS_TAGS` configurada en `true`. Si el Forwarder actualizado no tiene la etiqueta `DD_FETCH_STEP_FUNCTIONS_TAGS`, puede que tu Forwarder no se haya actualizado correctamente. 

Si el Forwarder y la máquina de estados etiquetas (tags) se configuran correctamente con los pasos anteriores, los Logs se etiquetan con `DD_TRACE_ENABLED:true`.

#### Buscar logs históricos
Para activar la búsqueda de logs históricos, añade un índice temporal al los logs reenviados. En Datadog, abre la pestaña de Logs [**Índices**][3]. Haz clic en el botón **Nuevo índice** en la parte superior derecha.

Elige un nombre, configura el filtro de índice en `Source:stepfunction`, deja todo lo demás con los valores por defecto y guarda.

{{< img src="serverless/step_functions/log_index.png" alt="Nuevo índice de logs" style="width:80%;" >}}

Si tu organización ya dispone de un índice global con un límite bajo, coloca tu nuevo índice en la parte superior.

**Nota**: Indexar logs no es un requisito para obtener trazas y puede suponer un costo adicional. Si estás solucionando un problema específico, es posible que desees enviar temporalmente logs a un índice, depurar y eliminar el índice después. Consulta [Índices][6] para obtener más información.

## Las trazas de Lambda no se fusionan con las trazas de Step Function
- Verifica que puedas ver las trazas de Lambda y las trazas de Step Function en Datadog.
- Verrifica que estés utilizando la capa de Python v95+ o la capa de Node.js v112+.
- En tu consola de AWS, abre tu Step Function y asegúrate de que tu máquina de estados tenga `"Payload.$": "States.JsonMerge($$, $, false)"` en los pasos de Lambda.
- Ejecuta tu Step Function una vez y verifica que el log del evento `TaskScheduled` del paso de Lambda tenga la carga útil que contiene los datos del [objeto de contexto de Step Function][4]. Si no tienes un evento `TaskScheduled` y solo tienes un evento `LambdaFunctionScheduled`, actualiza la tarea en la definición de Step Functions para utilizar la integración d Lambda recomendada. Consulta la [documentación de AWS][5] para obtener instrucciones sobre cómo hacerlo.

## Puedo ver el tramo (span) raíz de `aws.stepfunctions`, pero no puedo ver ningún tramo de paso
Activa la opción `Include execution data` en el registro de la máquina de estados. Después de activar esta opción, se registra la entrada de la ejecución de logs, los datos pasados entre estados y la salida de la ejecución. El backend de Datadog utiliza los logs para construir estos tramos de pasos para ti.

## Faltan algunos tramos de pasos en las trazas
- Se admiten acciones de Lambda, DynamoDB, StepFunction y la mayoría de los demás servicios de AWS.
- Las actividades de AWS Step Functions no son compatibles.
- `Wait`, `Choice`, `Success`, `Fail`, `Pass`, `Inline MapState` y `Parallel` son compatibles, mientras que `Distributed MapState` no es compatible. 

## Forma personalizada de desplegar Datadog Lambda Forwarder
Si estás utilizando tu forma personalizada de desplegar Datadog Lambda Forwarder, aquí tienes algunos consejos que te pueden ayudar a depurar activando el rastreo de Step Functions:
- En Forwarder, configura la variable de entorno `DD_FETCH_STEP_FUNCTIONS_TAGS` en `true`. 
- Para activar la generación de trazas de Step Functions en el backend de Datadog, la versión de la capa de Datadog-Forwarder debe ser superior a 31. Esta versión puede acceder a las etiquetas de la máquina de estados, incluida la etiqueta necesaria `DD_TRACE_ENABLED`.
- El rol de IAM para Forwarder debe tener permiso para `tags:getResources`.
- Configura un filtro de suscripción en el grupo de logs de CloudWatch de tu máquina de estados al Datadog Forwarder .
- Para verificar si los logs están llegando al backend de Datadog, abre la página de Log Explorer y busca `source:stepfunction` con el período de tiempo de búsqueda `Live` (que muestra todos los logs que entran en la ingesta de los logs de Datadog). Si no puedes ver ningún log, check si hay algún log con errores en el Datadog Forwarder como una clave de la API incorrecta/inválida. Añadir la variable de entorno `DD_LOG_LEVEL` de `DEBUG` te ayuda a depurar el problema de Forwarder. Si ves logs de Step Functions, verifica que los logs tengan la etiqueta `dd_trace_enable:true` (todas las etiquetas están normalizadas) y deberías ver las trazas de Step Functions asociadas al log en unos minutos.


#### Notas
Los pasos de Lambda que utilizan la API Lambda legacy no se pueden fusionar. Si la definición de tu paso Lambda es `"Resource": "<Lambda function ARN>"` en lugar de `"Resource": "arn:aws:states:::lambda:invoke"`, entonces tu paso está utilizando la API Lambda legacy.

Si tu Lambda tiene configurada la variable de entorno `DD_TRACE_EXTRACTOR`, tus trazas no podrán fusionarse.

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[5]: https://docs.aws.amazon.com/step-functions/latest/dg/connect-lambda.html
[6]: /es/logs/log_configuration/indexes/