---
kind: documentation
title: OpenTelemetry のセマンティック規則と Datadog の規則
---

OpenTelemetry では、さまざまなデータタイプの名前を指定する、多くの[セマンティック規則][1]を使用しています。このページでは、OpenTelemetry のセマンティック規則と Datadog のセマンティック規則のマッピングをリストアップします。

### 統合サービスタグ付け

| OpenTelemetry 規則 | Datadog 規則 |
| --- | --- |
| `deployment.environment` | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

詳しくは、[統合サービスタグ付け][2]をご覧ください。

### コンテナ

| OpenTelemetry 規則 | Datadog 規則 |
| --- | --- |
| `container.id` | `container_id` |
| `container.name` | `container_name` |
| `container.image.name` | `image_name` |
| `container.image.tag` | `image_tag` |

### クラウド

| OpenTelemetry 規則 | Datadog 規則 |
| --- | --- |
| `cloud.provider` | `cloud_provider` |
| `cloud.region` | `region` |
| `cloud.availability_zone` | `zone` |

### ECS

| OpenTelemetry 規則 | Datadog 規則 |
| --- | --- |
| `aws.ecs.task.family` | `task_family` |
| `aws.ecs.task.arn` | `task_arn` |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` |
| `aws.ecs.task.revision` | `task_version` |
| `aws.ecs.container.arn` | `ecs_container_name` |

### Kubernetes

| OpenTelemetry 規則 | Datadog 規則 |
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

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /ja/getting_started/tagging/unified_service_tagging