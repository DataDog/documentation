---
title: Solucionar problemas de monitorización serverless de AWS Step Functions
---

## No veo ninguna traza (trace)

#### Verificar que tu Step Function esté configurado para enviar todos los logs
- Asegúrate de que la tag (etiqueta) `DD_TRACE_ENABLED` esté configurada en `true` en Step Function en tu consola de AWS.
- En tu consola de AWS, abre la pestaña del registro de tu Step Function. Asegúrate de que  el _Nivel de logs_ esté configurado en `ALL` y de que _Incluir datos de ejecución_ esté seleccionado.
- Asegúrate de que el grupo de logs de CloudWatch (que también se encuentra en la pestaña del registro) tenga un filtro de suscripción a Datadog Lambda Forwarder en la misma región.

#### Verificar que los logs se reenvíen correctamente a Datadog
- Check mensajes de error en el Datadog Lambda Forwarder. Asegúrate de que hayas configurado correctamente tu clave de la API y el sitio Datadog.
- Activa `DEBUG` logs en el Datadog Lambda Forwarder configurando la variable de entorno `DD_LOG_LEVEL` en `debug`.

#### Verificar que los logs se puedan buscar en Búsqueda en vivo y que tengan la etiqueta DD_TRACE_ENABLED
En Datadog, ve a [**Logs > Flujo (stream) de logs**][2]. Busca `source:stepfunction`. Es posible que tengas que activar la máquina de estados varias veces. Si necesitas actualizar Datadog Lambda Forwarder desde una versión anterior, check que después de la actualización, el Forwarder tenga la etiqueta `DD_FETCH_STEP_FUNCTIONS_TAGS` configurada en `true`. Si el Forwarder actualizado no tiene la etiqueta `DD_FETCH_STEP_FUNCTIONS_TAGS`, puede que tu Forwarder no se haya actualizado correctamente. 

Si las etiquetas (tags) de Forwarder y de la máquina de estados se configuran correctamente con los pasos anteriores, los logs se etiquetan con `DD_TRACE_ENABLED:true`.

#### Comprueba que tu Step función utilice la última versión
- AWS puede publicar actualizaciones de la API de Step Function o introducir nuevas versiones de las definiciones de Step Function. Las versiones anteriores pueden dar lugar a formatos o comportamientos inesperados en logs.
- También se recomienda que utilices la última versión de la Datadog Lambda Forwarder para evitar discrepancias en la forma en que se reenvían los logs.

#### Precaución al utilizar pipelines de logs personalizadas
- Los pipelines de logs personalizados pueden ofrecer flexibilidad en el procesamiento de logs, pero alterar demasiado el formato de los logs puede dar lugar a problemas posteriores, como que no se reconozcan o no se analicen logs.
- Evita realizar cambios significativos en la estructura de logs de Step Function que cambien el formato JSON.

## Las traces (trazas) de Lambda no se fusionan con las trazas de Step Function
- Verifica que puedas ver las trazas de Lambda y las traces (trazas) de Step Function en Datadog.
- Verifica que estés utilizando la capa o versión correcta del rastreador según la guía [fusión de traces (trazas)][6]. Asegúrate también de que el step (UI) / paso (generic) de Lambda esté instrumentado en la definición de tu máquina de estados.
- Ejecuta tu Step Function una vez y comprueba que el log de eventos `TaskScheduled` del step (UI) / paso (generic) Lambda tenga la carga útil que contiene los datos del [objeto de contexto de Step Function][4].
- Si tu Lambda tiene configurada la variable de entorno `DD_TRACE_EXTRACTOR`, tus trazas no podrán fusionarse.

## Puedo ver el tramo (span) raíz de `aws.stepfunctions`, pero no puedo ver ningún tramo de paso
Activa la opción `Include execution data` en el registro de la máquina de estados. Después de activar esta opción, se registra la entrada de la ejecución de logs, los datos pasados entre estados y la salida de la ejecución. El backend de Datadog utiliza los logs para construir estos tramos de pasos para ti.

## Faltan traces (trazas) intermitentemente
Cuando busques en traces (trazas), selecciona la opción **Live Search** en la esquina superior derecha. Si Live Search muestra tu trace (traza), añade "@trace_type:stepfunctions" al [filtro de retención](https://docs.datadoghq.com/tracing/trace_pipeline/trace_retention/#retention-filters) y establece la tasa de retención deseada. Para la depuración, Datadog recomienda establecer la tasa de retención en 100 %. El filtro puede desactivarse una vez finalizada la depuración.

## Faltan algunos tramos de pasos en las trazas
- Las acciones de Lambda, DynamoDB, StepFunction y la mayoría de los demás servicios de AWS son compatibles.
- `Wait`, `Choice`, `Success`, `Fail`, `Pass`, `Inline MapState` y `Parallel` son compatibles, mientras que [`Distributed MapState`][8] tiene compatibilidad limitada. 

## Buscar logs históricos
Para activar la búsqueda de logs históricos, añade un índice temporal a los logs reenviados. En Datadog, abre la pestaña [**Indexes** (Índices)][3] de logs. Haz clic en el botón **New Index** (Nuevo Índice en la parte superior derecha.

Elige un nombre, configura el filtro de índice en `Source:stepfunction`, deja todo lo demás con los valores por defecto y guarda.

{{< img src="serverless/step_functions/log_index.png" alt="Nuevo índice de logs" style="width:80%;" >}}

Si tu organización ya dispone de un índice global con un límite bajo, coloca tu nuevo índice en la parte superior.

**Nota**: Indexar logs no es un requisito para obtener traces (trazas) y puede suponer un costo adicional. Si estás solucionando un problema específico, es posible que desees enviar temporalmente logs a un índice, depurar y eliminar el índice después. Consulta [Índices][5] para obtener más información.

## Faltan logs en una ejecución
Puedes utilizar [filtros de exclusión][7] para excluir un determinado porcentaje de todos los logs con un `execution_arn` concreto. El uso de filtros de exclusión no afecta al rastreo.

En el siguiente ejemplo, el filtro excluye logs para el 90 % de los `@execution_arn`.

{{< img src="serverless/step_functions/exclusion_filter.png" alt="Un filtro de exclusión denominado Step Functions. La casilla 'Definir consulta de exclusión' contiene 'source:stepfunction'. En 'Configurar el porcentaje de exclusión', el filtro está configurado para excluir el 90 % of @execution_arn." style="width:80%;" >}}

## Forma personalizada de desplegar Datadog Lambda Forwarder
Si estás utilizando tu forma personalizada de desplegar Datadog Lambda Forwarder, aquí tienes algunos consejos que te pueden ayudar a depurar activando el rastreo de Step Functions:
- En Forwarder, configura la variable de entorno `DD_FETCH_STEP_FUNCTIONS_TAGS` en `true`. 
- Para activar la generación de trazas de Step Functions en el backend de Datadog, la versión de la capa de Datadog-Forwarder debe ser superior a 31. Esta versión puede acceder a las etiquetas de la máquina de estados, incluida la etiqueta necesaria `DD_TRACE_ENABLED`.
- También puedes configurar la tag (etiqueta) `DD_STEP_FUNCTIONS_TRACE_ENABLED` en el nivel Forwarder para activar el rastreo de todas las Step Functions que utilicen Forwarder en v3.121.0+.
- El rol de IAM para Forwarder debe tener permiso para `tags:getResources`.
- Configura un filtro de suscripción en el grupo de logs de CloudWatch de tu máquina de estados al Datadog Forwarder .
- Para verificar si los logs están llegando al backend de Datadog, abre la página de Log Explorer y busca `source:stepfunction` con el período de tiempo de búsqueda `Live` (que muestra todos los logs que entran en la ingesta de los logs de Datadog). Si no puedes ver ningún log, check si hay algún log con errores en el Datadog Forwarder, como una clave de la API incorrecta/inválida. Añadir la variable de entorno `DD_LOG_LEVEL` de `DEBUG` te ayuda a depurar el problema de Forwarder. Si ves logs de Step Functions, verifica que los logs tengan la etiqueta `dd_trace_enable:true` (todas las etiquetas están normalizadas) y deberías ver las trazas de Step Functions asociadas al log en unos minutos.


[1]: /es/logs
[2]: /es/logs/livetail
[3]: /es/logs/pipelines/indexes
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[5]: /es/logs/log_configuration/indexes/
[6]: /es/serverless/step_functions/merge-step-functions-lambda/?tab=serverlessframework#merge-step-functions-traces-with-downstream-lambda-traces
[7]: /es/logs/log_configuration/indexes/#exclusion-filters
[8]: /es/serverless/step_functions/distributed-maps