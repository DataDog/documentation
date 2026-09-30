Datadog APM supports AWS Lambda Durable Functions. To maintain retention consistency for spans across a long-running durable execution, create a [retention filter][3001] with the retention query `operation_name:aws.durable.execute`. Note that standard [trace retention][3002] limits still apply.

By default, the tracer creates additional checkpoints named `_datadog_{N}` to propagate trace context across function invocations. This keeps spans from multiple invocations in a single intact trace for each durable execution. To disable this behavior and treat each invocation as an individual trace, set the environment variable `DD_DURABLE_CROSS_INVOCATION_TRACING_ENABLED` to `false`.

[3001]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[3002]: /tracing/trace_pipeline/trace_retention/
