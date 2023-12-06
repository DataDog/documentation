---
title: OpenTelemetry Semantic Conventions and Datadog Conventions
kind: documentation
further_reading:
- link: "/opentelemetry/guide/metrics_mapping"
  tag: "Documentation"
  text: "Metrics mapping from OpenTelemetry to Datadog"
---

OpenTelemetry makes use of a number of [semantic conventions][1] that specify names for different types of data. This page lists mappings for OpenTelemetry semantic conventions to Datadog's semantic conventions.

### Unified Service Tagging

| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `deployment.environment` | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

For more information, see [Unified Service Tagging][2].

### Containers

| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `container.id` | `container_id` |
| `container.name` | `container_name` |
| `container.image.name` | `image_name` |
| `container.image.tag` | `image_tag` |

### Cloud

| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `cloud.provider` | `cloud_provider` |
| `cloud.region` | `region` |
| `cloud.availability_zone` | `zone` |

### ECS

| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `aws.ecs.task.family` | `task_family` |
| `aws.ecs.task.arn` | `task_arn` |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` |
| `aws.ecs.task.revision` | `task_version` |
| `aws.ecs.container.arn` | `ecs_container_name` |

### Kubernetes

| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `k8s.container.name` | `kube_container_name` |
| `k8s.cluster.name` | `kube_cluster_name` |
| `k8s.deployment.name` | `kube_deployment` |
| `k8s.replicaset.name` | `kube_replica_set` |
| `k8s.statefulset.name` | `kube_stateful_set` |
| `k8s.daemonset.name` | `kube_daemon_set` |
| `k8s.job.name` | `kube_job` |
| `k8s.cronjob.name` | `kube_cronjob` |
| `k8s.namespace.name` | `kube_namespace` |
| `k8s.pod.name` | `pod_name` |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /getting_started/tagging/unified_service_tagging