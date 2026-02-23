---
title: Tracing Distributed Map States
---

In AWS Step Functions, you can set up a large-scale parallel workload by including a [`Map` state in _Distributed_ mode][1]. Datadog supports tracing your Distributed Map states.

{{< img src="serverless/step_functions/distributed_map.png" alt="A visualization of a Step Function with a Distributed Map state in the AWS console." style="width:100%;" >}}

## Set up trace merging

1. To ensure that child workflows are correctly linked to their parents, enable the **Item Batching** option for your Distributed Map state. For more information, see [ItemBatcher][2]. If you don't want to use Item Batching, you can set `MaxItemsPerBatch` to 1 as a workaround.

2. Your State Machine definition must use [JSONata][4] as the query language. To enable this, set your definition's top-level `QueryLanguage` field to `JSONata`.

3. On the Distributed Map state, set `_datadog` in the `BatchInput` field as follows:

   {{< highlight json "hl_lines=4-4" >}}
   "ItemBatcher": {
     "MaxItemsPerBatch": N,
     "BatchInput": {
       "_datadog": "{% ($ddctx := ($states.context.**._datadog)[0];$maybeSnsCtx := ($parse($parse(($states.context.**.body)[0]).**._datadog.Value))[0];$ddctx := $exists($maybeSnsCtx) ? $maybeSnsCtx : $ddctx;$ddTraceContext := $exists($ddctx.`x-datadog-trace-id`) ? {'x-datadog-trace-id': $ddctx.`x-datadog-trace-id`, 'x-datadog-tags': $ddctx.`x-datadog-tags`} : {'RootExecutionId': $exists($ddctx.RootExecutionId) ? $ddctx.RootExecutionId : $states.context.Execution.Id};$merge([$ddTraceContext, {'serverless-version': 'v1', 'timestamp': $millis()}])) %}"
     }
   }
   {{< /highlight >}}

{{< img src="serverless/step_functions/distributed_map_trace.png" alt="An example Datadog trace of a Step Function with a Distributed Map state." style="width:100%;" >}}

## Troubleshooting
If trace merging is broken because there is another upstream service, ensure the upstream setup is correct according to the [Step Function Trace Merging documentation][3]. Also, validate the setup of any Lambda or nested Step Function invocations from within the Distributed Map.


[1]: https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html
[2]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-itembatcher.html?icmpid=docs_console_unmapped
[3]: /serverless/step_functions/merge-step-functions-lambda
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html
