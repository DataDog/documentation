#### Filter query syntax

Each processor has a corresponding filter query in their fields. Processors only process metrics that match their filter query. And for all processors except the Filter processor, metrics that do not match the query are sent to the next step of the pipeline. For the Filter processor, metrics that do not match the query are dropped.

The following are metrics filter query examples:

- `NOT system.cpu.user`: This filters for metrics that do not have the status `name:system.cpu.user`.
- `system.cpu.user OR system.cpu.user.total`: This filter query only matches metrics that have either `name:system.cpu.user` or `name:system.cpu.user.total`.
- `tags:(env\:prod OR env\:test)`: This filters for metrics with `env:prod` or `env:test` in `tags`.

Learn more about writing metrics filter queries in [Observability Pipelines Metrics Search Syntax][4002].

[4002]: /observability_pipelines/search_syntax/metrics/
