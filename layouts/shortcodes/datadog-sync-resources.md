| Resource | Description | Notes |
|:---:|:---:|---|
| `roles` | Sync Datadog roles. |  |
| `users` | Sync Datadog users. |  |
| `synthetics_private_locations` | Sync Datadog Synthetic private locations. |  |
| `synthetics_tests` | Sync Datadog Synthetic tests. |  |
| `synthetics_global_variables` | Sync Datadog Synthetic global variables. |  |
| `monitors` | Sync Datadog monitors. |  |
| `downtimes` | Sync Datadog downtimes. |  |
| `service_level_objectives` | Sync Datadog SLOs. |  |
| `slo_corrections` | Sync Datadog SLO corrections. |  |
| `spans_metrics` | Sync Datadog span-based metrics. |  |
| `dashboards` | Sync Datadog dashboards. |  |
| `dashboard_lists` | Sync Datadog dashboard lists. |  |
| `logs_pipelines` | Sync Datadog log integrations and custom pipelines. | To migrate from the `logs_custom_pipelines` resource, rename the existing state files from `logs_custom_pipelines.json` to `logs_pipelines.json` for both source and destination files. |
| `logs_pipelines_order` | Sync Datadog log pipelines order. |  |
| `logs_custom_pipelines` (Deprecated) | Sync Datadog log custom pipelines. | `logs_custom_pipelines` has been deprecated, use `logs_pipelines` which supports log integrations and custom pipelines. |
| `notebooks` | Sync Datadog notebooks. |  |
| `host_tags` | Sync Datadog host tags. |  |
| `logs_indexes` | Sync Datadog log indexes. |  |
| `logs_metrics` | Sync Datadog log metrics. |  |
| `logs_restriction_queries` | Sync Datadog log restriction queries. |  |
| `metric_tag_configurations` | Sync Datadog metric tags configurations. |  |