Version 87+ of the Datadog Lambda Extension allows users to send logs to [Observability Pipelines][101].

To enable this feature, set these environment variables:
- `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`: `true`
- `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`: `<YOUR_OBSERVABILITY_PIPELINE_URL>`

**Note**: Your Observability Pipeline must use `Http Server` as the source to process logs from the Lambda extension. Do not use `Datadog Agent` as the source.

[101]: https://www.datadoghq.com/product/observability-pipelines/