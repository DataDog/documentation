---
title: Tracing Distributed Map States
---

In AWS Step Functions, you can set up a large-scale parallel workload by including a [`Map` state in _Distributed_ mode][1]. Datadog supports tracing your Distributed Map states.

{{< img src="serverless/step_functions/distributed_map.png" alt="A visualization of a Step Function with a Distributed Map state." style="width:100%;" >}}

## Trace merging
To ensure that child workflows are correctly linked to their parents, enable the **Export Map state results to Amazon S3** option for your Step Function. For more information, see [Exporting to Amazon S3][2].

## Limitations
- Datadog does not support parenting for failed child workflows. You can find these failed child workflows as orphans in the same trace as the parent Distributed Map.
- Datadog cannot propagate trace context if there is another Step Function or a Lambda upstream from the Distributed Map's Step Function. The link is broken, and the child workflow is in its own trace.
- Executions from a child map run are in the same invocation table as the parent Step Function. As a result, the child table in the Step Functions page is empty.

## Troubleshooting
- If trace merging is broken because there is another upstream service, you can use the `fan_out_children_trace_id` span attribute in the Distributed Map span to look for the child workflow traces.


[1]: https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html
[2]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-resultwriter.html?icmpid=docs_console_unmapped#input-output-resultwriter-exporting-to-S3
