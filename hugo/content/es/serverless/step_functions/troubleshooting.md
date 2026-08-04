---
title: Solución de problemas de Serverless Monitoring para AWS Step Functions
---
## No puedo ver ninguna traza {#i-cannot-see-any-traces}

#### Verifique que su Step Function esté configurada para enviar todos los registros {#verify-that-your-step-function-is-configured-to-send-all-logs}
- Asegúrese de que la etiqueta `DD_TRACE_ENABLED` esté configurada en `true` en la Step Function en su consola de AWS.
- En su consola de AWS, abra la pestaña de registro de su Step Function. Asegúrese de que {{< ui >}}Log level{{< /ui >}} esté configurado en `ALL` y que {{< ui >}}Include execution data{{< /ui >}} esté seleccionado.
- Asegúrese de que el grupo de registros de CloudWatch (que también se encuentra en la pestaña de registro) tenga un filtro de suscripción al Datadog Lambda Forwarder en la misma región.

#### Verifique que los registros se reenvíen correctamente a Datadog {#verify-that-logs-are-forwarded-successfully-to-datadog}
- Compruebe si hay mensajes de error en el Datadog Lambda Forwarder. Asegúrese de haber configurado correctamente su clave de API y su sitio de Datadog.
- Habilite los registros `DEBUG` en el Datadog Lambda Forwarder configurando la variable de entorno `DD_LOG_LEVEL` en `debug`.

#### Verifique que los registros se puedan buscar en Live Search y tengan la etiqueta DD_TRACE_ENABLED {#verify-that-logs-are-searchable-on-live-search-and-have-dd-trace-enabled-tag}
En Datadog, vaya a [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Log Stream{{< /ui >}}][2]. Busque `source:stepfunction`. Es posible que deba activar la máquina de estados algunas veces. Si necesita actualizar el Datadog Lambda Forwarder desde una versión anterior, verifique que después de la actualización, el Forwarder tenga la etiqueta `DD_FETCH_STEP_FUNCTIONS_TAGS` configurada en `true`. Si el Forwarder actualizado no tiene la etiqueta `DD_FETCH_STEP_FUNCTIONS_TAGS`, es posible que su Forwarder no se haya actualizado correctamente.

Si las etiquetas del Forwarder y de la máquina de estados están configuradas correctamente con los pasos anteriores, los registros se etiquetan con `DD_TRACE_ENABLED:true`.

#### Verifique que su Step Function esté utilizando la versión más reciente {#verify-that-your-step-function-is-using-the-latest-version}
- AWS puede publicar actualizaciones de la API de Step Function o introducir versiones más recientes de las definiciones de Step Function. Las versiones anteriores pueden resultar en un formato de registro o comportamiento inesperado.
- También se recomienda que utilice la versión más reciente del Datadog Lambda Forwarder para evitar discrepancias en cómo se reenvían los registros.

#### Precaución al utilizar pipelines de registro personalizadas {#caution-when-using-custom-log-pipelines}
- Las pipelines de registro personalizadas pueden ofrecer flexibilidad en el procesamiento de registros, pero alterar demasiado el formato de registro puede provocar problemas posteriores, como que los registros no sean analizados o reconocidos.
- Evite realizar cambios significativos en la estructura de registro de Step Function que cambien el formato JSON.

## Las trazas de Lambda no se están fusionando con las trazas de Step Function {#lambda-traces-are-not-merging-with-step-function-traces}
- Verifique que pueda ver tanto las trazas de Lambda como las trazas de Step Function en Datadog.
- Verifique que esté utilizando la capa o la versión de trazador correcta de acuerdo con la guía de [fusión de trazas][6]. Asegúrese también de que el paso de Lambda esté instrumentado en la definición de su máquina de estados.
- Ejecute su Step Function una vez y verifique que el `TaskScheduled` registro de eventos del paso de Lambda tenga la carga útil que contiene datos del [objeto de contexto de Step Function][4].
- Si su Lambda tiene establecida la variable de entorno `DD_TRACE_EXTRACTOR`, sus trazas no pueden fusionarse.

## Puedo ver el `aws.stepfunctions` tramo raíz pero no puedo ver ningún tramo de paso {#i-can-see-the-awsstepfunctions-root-span-but-i-cannot-see-any-step-spans}
Por favor, habilite la opción {{< ui >}}Include execution data{{< /ui >}} en el registro de la máquina de estados. Después de habilitar esta opción, se registran la entrada de ejecución, los datos pasados entre estados y la salida de ejecución. El backend de Datadog utiliza los registros para construir estos tramos de paso para usted.

## Las trazas faltan de forma intermitente {#traces-are-missing-intermittently}
Al buscar trazas, seleccione la opción {{< ui >}}Live Search{{< /ui >}} en la esquina superior derecha. Si Live Search muestra su traza, agregue \"@trace_type:stepfunctions\" al [filtro de retención](https://docs.datadoghq.com/es/tracing/trace_pipeline/trace_retention/#retention-filters) y establezca la tasa de retención deseada. Para la depuración, Datadog recomienda establecer la tasa de retención al 100%. El filtro puede desactivarse después de que se complete la depuración.

## Faltan algunos tramos de paso en las trazas {#some-step-spans-are-missing-in-the-traces}
- Se admiten acciones de Lambda, DynamoDB, Step Functions y la mayoría de los demás servicios de AWS.
- `Wait`, `Choice`, `Success`, `Fail`, `Pass`, `Inline MapState` y `Parallel` son compatibles, mientras que [`Distributed MapState`][8] tiene soporte limitado.

## Buscar registros históricos {#search-historic-logs}
Para habilitar la búsqueda de registros históricos, agregue un índice temporal a los registros reenviados. En Datadog, abra la pestaña Logs [{{< ui >}}Indexes{{< /ui >}}][3]. Haga clic en el botón {{< ui >}}New Index{{< /ui >}} en la parte superior derecha.

Elija un nombre, establezca el filtro de índice en `Source:stepfunction`, deje todo lo demás con los valores predeterminados y guarde.

{{< img src="serverless/step_functions/log_index.png" alt="Nuevo índice de registro" style="width:80%;" >}}

Si su organización tiene un índice existente que abarca todo con un límite bajo, coloque su nuevo índice en la parte superior.

**Nota**: Indexar registros no es un requisito para obtener trazas y puede generar costos adicionales. Si está solucionando un problema específico, es posible que desee enviar registros temporalmente a un índice, depurar y eliminar el índice después. Consulte [Índices][5] para obtener más información.

## Registros faltantes dentro de una ejecución {#missing-logs-within-an-execution}
Puede usar [filtros de exclusión][7] para excluir un cierto porcentaje de todos los registros con un `execution_arn` en particular. El uso de filtros de exclusión no afecta la generación de trazas.

En el siguiente ejemplo, el filtro excluye registros para el 90% del `@execution_arn`.

{{< img src="serverless/step_functions/exclusion_filter.png" alt="Un filtro de exclusión llamado Step Functions. El cuadro 'Define exclusion query' contiene 'source:stepfunction'. En 'Set exclusion percentage', el filtro está configurado para excluir el 90% de @execution_arn." style="width:80%;" >}}

## Forma personalizada de implementar Datadog Lambda Forwarder {#customized-way-to-deploy-datadog-lambda-forwarder}
Si está utilizando su forma personalizada de implementar Datadog Lambda Forwarder, aquí tiene algunos consejos que pueden ayudarle a depurar la activación de las trazas de Step Functions:
- En el forwarder, establezca la variable de entorno `DD_FETCH_STEP_FUNCTIONS_TAGS` en `true`.
- Para habilitar la generación de trazas de Step Functions en el backend de Datadog, la versión de la capa Datadog-Forwarder debe ser superior a 31. Esta versión puede obtener etiquetas de máquina de estado, incluida la etiqueta `DD_TRACE_ENABLED` requerida.
- También puede establecer la etiqueta `DD_STEP_FUNCTIONS_TRACE_ENABLED` a nivel de Forwarder para habilitar el trazado en todas las Step Functions que utilicen ese Forwarder en v3.121.0+.
- El rol de IAM para el forwarder debe tener el permiso `tags:getResources`.
- Configure un filtro de suscripción en su grupo de registros de CloudWatch de la máquina de estado hacia el forwarder de Datadog.
- Para verificar si los registros están llegando al backend de Datadog, abra la página {{< ui >}}Log Explorer{{< /ui >}} y busque `source:stepfunction` con el marco de tiempo de búsqueda {{< ui >}}Live{{< /ui >}} (que muestra todos los registros que ingresan a la ingesta de registros de Datadog). Si no puede ver ningún registro, verifique si hay registros de error en el Datadog Forwarder, como una clave de API incorrecta o no válida. Agregar la variable de entorno `DD_LOG_LEVEL` de `DEBUG` le ayuda a depurar el problema del Forwarder. Si ve registros de Step Functions, verifique que los registros tengan la etiqueta `dd_trace_enable:true` (todas las etiquetas están normalizadas) y debería ver las trazas de Step Function asociadas con el registro en unos minutos.


[1]: /es/logs
[2]: /es/logs/livetail
[3]: /es/logs/pipelines/indexes
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[5]: /es/logs/log_configuration/indexes/
[6]: /es/serverless/step_functions/merge-step-functions-lambda/?tab=serverlessframework#merge-step-functions-traces-with-downstream-lambda-traces
[7]: /es/logs/log_configuration/indexes/#exclusion-filters
[8]: /es/serverless/step_functions/distributed-maps