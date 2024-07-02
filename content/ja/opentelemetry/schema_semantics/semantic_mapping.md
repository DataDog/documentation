---
title: OpenTelemetry Semantic Conventions and Datadog Conventions
aliases:
- /opentelemetry/guide/semantic_mapping/
further_reading:
- link: /opentelemetry/guide/metrics_mapping
  tag: Documentation
  text: Metrics mapping from OpenTelemetry to Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: OpenTelemetry metric types
- link: "https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go"
  tag: ソースコード
  text: Implementation code for these mappings
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

Read more about [Containers semantic conventions in the OpenTelemetry documentation][3]. 

Additional cloud provider-specific attributes are also mapped.

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

#### Kubernetes labels

| Kubernetes convention | Datadog 規則 |
| --- | --- |
| `app.kubernetes.io/name` | `kube_app_name` |
| `app.kubernetes.io/instance` | `kube_app_instance` |
| `app.kubernetes.io/version` | `kube_app_version` |
| `app.kuberenetes.io/component` | `kube_app_component` |
| `app.kubernetes.io/part-of` | `kube_app_part_of` |
| `app.kubernetes.io/managed-by` | `kube_app_managed_by` |

### HTTP

| OpenTelemetry 規則 | Datadog 規則 |
| --- | --- |
| `client.address` | `http.client_ip` |
| `http.response.body.size` | `http.response.content_length` |
| `http.response.header.<header-name>` | `http.response.headers.<header-name>` |
| `http.response.status_code` | `http.status_code` |
| `http.request.body.size` | `http.request.content_length` |
| `http.request.header.referrer` | `http.referrer` |
| `http.request.header.<header-name>` | `http.request.headers.<header-name>` |
| `http.request.method` | `http.method` |
| `http.route` | `http.route` |
| `network.protocol.version` | `http.version` |
| `server.address` | `http.server_name` |
| `url.full` | `http.url` |
| `user_agent.original` | `http.useragent` |

## Metrics attribute mapping

For metrics, by default, Datadog only maps the OpenTelemetry resource attributes listed in the previous sections to Datadog metric tags. To map all resource attributes to tags, enable the `metrics::resource_attributes_as_tags` setting:

{{< tabs >}}
{{% tab "Datadog exporter" %}}

```yaml
exporters:
  datadog:
    # Other configuration goes here...
    metrics:
      # Add all resource attributes as tags for metrics
      resource_attributes_as_tags: true
```

{{% /tab %}}

{{% tab "Datadog Agent" %}}

```yaml
otlp_config:
  # Other configuration goes here...
  metrics:
    # Add all resource attributes as tags for metrics
    resource_attributes_as_tags: true
```

{{% /tab %}}
{{< /tabs >}}

Enabling this option adds both the OpenTelemetry resource attributes and the Datadog semantic conventions to the metric tags.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /getting_started/tagging/unified_service_tagging
[3]: https://opentelemetry.io/docs/specs/semconv/resource/container/
