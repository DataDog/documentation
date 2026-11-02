---
title: Tracked Change Types
description: Learn which types of changes Change Tracking monitors, which Datadog feature each type comes from, and how to turn on tracking for each.
---

Change Tracking collects changes from multiple Datadog products. There is no separate Change Tracking product to buy and, in most cases, no separate Agent or integration to install. If you are sending the underlying telemetry, the changes are already being tracked.

Use the information on this page to confirm:

- Which Datadog feature the change type comes from.
- What, if anything, you need to configure.

## Supported change types

### Deployments

| Change type | Comes from | How to enable |
| --- | --- | --- |
| Backend code deployments | APM | A `version` tag must be present on the service. See [Unified Service Tagging][11] to set up the tag. |
| Frontend deployments | RUM | Set up [RUM deployment tracking][2]. |
| Kubernetes deployment manifest updates | Datadog Agent on Kubernetes | Add a `service` label to your Kubernetes YAML where possible. |

### Feature flags

| Change type | Comes from | How to enable |
| --- | --- | --- |
| Datadog Feature Flags | Datadog Feature Flags | Tracked automatically. |
| LaunchDarkly | LaunchDarkly integration | Set up the [LaunchDarkly integration][3]. |
| Any other feature flag provider | Events API | Send flag changes as custom events using the [Events API][4]. |
| Frontend feature flag evaluations | RUM | Set up [RUM feature flag tracking][5]. |

See [Track Feature Flag Changes][6] for setup and advanced options.

### Infrastructure changes

| Change type | Comes from | How to enable |
| --- | --- | --- |
| Cloud resource and configuration changes (AWS) {{< tooltip text="in Preview" tooltip="This feature is in Preview and limited to a small sample of cloud resource changes. To request access, see the Resource Collection documentation." >}} | Infrastructure Monitoring | Enable [Resource Collection][12], and optionally cloud provider event forwarding. |
| Kubernetes deployment scale events | Kubernetes integration | Enable [Kubernetes audit logging][13]. |
| CrashLoopBackOff pod crashes | Kubernetes integration | Add a `service` label to your Kubernetes YAML where possible. |

### Database changes

| Change type | Comes from | How to enable |
| --- | --- | --- |
| PostgreSQL, SQL Server, and MySQL schema changes | Database Monitoring | See [Exploring Database Schemas][7] and [Correlate Database Monitoring and Traces][8]. |
| MongoDB index and search index changes, PostgreSQL and SQL Server settings changes | Database Monitoring | [Correlate Database Monitoring and Traces][8]. |

See [Database Monitoring][14] for setup and advanced options.

### Streaming and application behavior

| Change type | Comes from | How to enable |
| --- | --- | --- |
| Kafka schema updates | Data Streams Monitoring | Set up [Data Streams Monitoring][9]. |
| Traffic spikes | APM | Tracked automatically with [APM][15]. |
| Watchdog alerts | Watchdog | Tracked automatically. See [Watchdog][10] for per-alert requirements. |

### Custom changes

| Change type | Comes from | How to enable |
| --- | --- | --- |
| Any other change you want to track | Events API | Send change events using the [Events API][4]. |

[2]: /real_user_monitoring/guide/setup-rum-deployment-tracking/
[3]: /integrations/launchdarkly/#setup
[4]: /api/latest/events/
[5]: /real_user_monitoring/feature_flag_tracking/
[6]: /change_tracking/change_types/feature_flags/
[7]: /database_monitoring/schema_explorer/
[8]: /database_monitoring/connect_dbm_and_apm/
[9]: /data_streams/
[10]: /watchdog/
[11]: /getting_started/tagging/unified_service_tagging/
[12]: /infrastructure/resource_catalog/resource_changes/
[13]: /integrations/kubernetes_audit_logs/
[14]: /database_monitoring/
[15]: /tracing/
