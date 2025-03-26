---
title: Tracing Distributed Map states
---

This page explains our support for tracing your Map states in AWS Step Functions set to [Distributed mode][1].

{{< img src="serverless/step_functions/distributed_map.png" alt="A visualization of a Step Function with a Distributed Map state." style="width:100%;" >}}

## Trace Merging
To ensure that the child workflows correctly parent the Distributed map, you must enable the "Export Map state results to Amazon S3" option.

## Limitations
- We don't support parenting for failed child workflows. Meaning they'll be in the same trace as the parent Distributed map but as an orphan.
- We cannot propagate trace context if there is another Step Function or a Lambda upstream from the Distributed map. The child workflow will be in its own trace.
- Currently, the executions from the child map run will be in the same invocation table as the parent Step Function. The child table in the Step Functions page will be empty as a result.

## Troubleshooting
- If trace merging is broken because there is another upstream service, you can use the `fan_out_children_trace_id` span attribute in the Distributed map span to look for the child workflow traces.


[1]: https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html
