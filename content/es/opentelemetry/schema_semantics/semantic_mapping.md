---
aliases:
- /opentelemetry/guide/semantic_mapping/
further_reading:
- link: /opentelemetry/guide/metrics_mapping
  tag: Documentación
  text: Asignación de métricas de OpenTelemetry a Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de métrica de OpenTelemetry
- link: https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go
  tag: Código fuente
  text: Código de implementación de estas asignaciones
title: Convenciones semánticas de OpenTelemetry y convenciones de Datadog
---

OpenTelemetry hace uso de una serie de [convenciones semánticas][1] que especifican los nombres de los diferentes tipos de datos. Esta página enumera las asignaciones de las convenciones semánticas de OpenTelemetry con las convenciones semánticas de Datadog.

### Etiquetado de servicios unificado

| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| `deployment.environment` | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

Para más información, consulta [etiquetado de servicios unificado][2].

### Contenedores

| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| `container.id` | `container_id` |
| `container.name` | `container_name` |
| `container.image.name` | `image_name` |
| `container.image.tag` | `image_tag` |

Más información sobre las [Convenciones semánticas de los contenedores en la documentación de OpenTelemetry][3]. 

También se asignan atributos adicionales específicos del proveedor de la nube.

### Nube

| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| `cloud.provider` | `cloud_provider` |
| `cloud.region` | `region` |
| `cloud.availability_zone` | `zone` |

### ECS

| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| `aws.ecs.task.family` | `task_family` |
| `aws.ecs.task.arn` | `task_arn` |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` |
| `aws.ecs.task.revision` | `task_version` |
| `aws.ecs.container.arn` | `ecs_container_name` |

### Kubernetes

| Convención de OpenTelemetry | Convención de Datadog |
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

#### Etiquetas de Kubernetes

| Convención de Kubernetes | Convención de Datadog |
| --- | --- |
| `app.kubernetes.io/name` | `kube_app_name` |
| `app.kubernetes.io/instance` | `kube_app_instance` |
| `app.kubernetes.io/version` | `kube_app_version` |
| `app.kuberenetes.io/component` | `kube_app_component` |
| `app.kubernetes.io/part-of` | `kube_app_part_of` |
| `app.kubernetes.io/managed-by` | `kube_app_managed_by` |

### HTTP

| Convención de OpenTelemetry | Convención de Datadog |
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

## Asignación de atributos de métricas

Para las métricas, por defecto, Datadog solo asigna los atributos de recursos de OpenTelemetry enumerados en las secciones anteriores a etiquetas (tags) de métrica de Datadog. Para asignar todos los atributos de recursos a etiquetas, activa el ajuste `metrics::resource_attributes_as_tags`:

{{< tabs >}}
{{% tab "Exportador de Datadog" %}}

```yaml
exporters:
  datadog:
    # Aquí va otra configuración...
    metrics:
      # Añade todos los atributos de recurso como etiquetas para métricas
      resource_attributes_as_tags: true
```

{{% /tab %}}

{{% tab "Datadog Agent" %}}

```yaml
otlp_config:
  # Aquí va otra configuración...
  metrics:
    # Añade todos los atributos de recurso como etiquetas para métricas
    resource_attributes_as_tags: true
```

{{% /tab %}}
{{< /tabs >}}

Al activar esta opción, se añaden tanto los atributos de recursos de OpenTelemetry como las convenciones semánticas de Datadog a las etiquetas de métrica.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /es/getting_started/tagging/unified_service_tagging#opentelemetry
[3]: https://opentelemetry.io/docs/specs/semconv/resource/container/