---
title: Rastreo de estados de mapa distribuidos
---

En AWS Step Functions, puedes configurar una carga de trabajo paralela de gran escala incluyendo un [estado `Map` en modo _distribuido_][1]. Datadog admite el rastreo de tus estados map distribuidos.

{{< img src="serverless/step_functions/distributed_map.png" alt="Visualización de una Step Function con un estado de mapa distribuido en la consola de AWS." style="width:100%;" >}}

## Configurar la fusión de trazas (traces)

1. Para asegurarte de que los flujos de trabajo secundarios están correctamente vinculados a sus flujos principales, activa la opción **Item Batching** (Organización de elementos por lotes) para tu estado de mapa distribuido. Para obtener más información, consulta [ItemBatcher][2]. Si no quieres utilizar la organización de elementos por lotes, puedes configurar `MaxItemsPerBatch` en 1 como alternativa.

2. Tu definición de máquina de estado debe utilizar [JSONata][4] como lenguaje de consulta. Para activarlo, configura el campo `QueryLanguage` del nivel superior de tu definición como `JSONata`.

3. En el estado de mapa distribuido, configura `_datadog` en el campo `BatchInput` como se indica a continuación:

   {{< highlight json "hl_lines=4-4" >}}
   "ItemBatcher": {
     "MaxItemsPerBatch": N,
     "BatchInput": {
       "_datadog": "{% ($ddctx := ($states.context.**._datadog)[0];$maybeSnsCtx := ($parse($parse(($states.context.**.body)[0]).**._datadog.Value))[0];$ddctx := $exists($maybeSnsCtx) ? $maybeSnsCtx : $ddctx;$ddTraceContext := $exists($ddctx.`x-datadog-trace-id`) ? {'x-datadog-trace-id': $ddctx.`x-datadog-trace-id`, 'x-datadog-tags': $ddctx.`x-datadog-tags`} : {'RootExecutionId': $exists($ddctx.RootExecutionId) ? $ddctx.RootExecutionId : $states.context.Execution.Id};$merge([$ddTraceContext, {'serverless-version': 'v1', 'timestamp': $millis()}])) %}"
     }
   }
   {{< /highlight >}}

{{< img src="serverless/step_functions/distributed_map_trace.png" alt="Ejemplo de traza de Datadog de una Step Function con un estado de mapa distribuido." style="width:100%;" >}}

## Solucionar problemas
Si la fusión de trazas se interrumpe porque hay otro servicio aguas arriba, asegúrate de que la configuración aguas arriba es correcta de acuerdo con la [documentación sobre fusión de trazas de Step Function][3]. Asimismo, valida la configuración de cualquier invocación Lambda o Step Function anidada del mapa distribuido.


[1]: https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html
[2]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-itembatcher.html?icmpid=docs_console_unmapped
[3]: /es/serverless/step_functions/merge-step-functions-lambda
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html