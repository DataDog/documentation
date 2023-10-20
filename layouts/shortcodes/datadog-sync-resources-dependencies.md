| Resource | Dependencies |
|:---:|:---:|
| `roles` |  |
| `users` | `roles` |
| `synthetics_private_locations` |  |
| `synthetics_tests` | `synthetics_private_locations`, `synthetics_global_variables`, `roles` |
| `synthetics_global_variables` | `synthetics_tests` |
| `monitors` | `roles`, `service_level_objectives` |
| `downtimes` | `monitors` |
| `service_level_objectives` | `monitors`, `synthetics_tests` |
| `slo_corrections` | `service_level_objectives` |
| `spans_metrics` |  |
| `dashboards` | `monitors`, `roles`, `service_level_objectives` |
| `dashboard_lists` | `dashboards` |
| `logs_pipelines` |  |
| `logs_pipelines_order` | `logs_pipelines` |
| `logs_custom_pipelines` (Deprecated) |  |
| `notebooks` |  |
| `host_tags` |  |
| `logs_indexes` |  |
| `logs_metrics` |  |
| `logs_restriction_queries` | `roles` |
| `metric_tag_configurations` |  |