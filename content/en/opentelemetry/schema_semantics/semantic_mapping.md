---
title: OpenTelemetry Semantic Conventions and Datadog Conventions
aliases:
- /opentelemetry/guide/semantic_mapping/
further_reading:
- link: "/opentelemetry/guide/metrics_mapping"
  tag: "Documentation"
  text: "Metrics mapping from OpenTelemetry to Datadog"
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OpenTelemetry metric types"
- link: "https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go"
  tag: "Source Code"
  text: "Implementation code for these mappings"
---

OpenTelemetry makes use of a number of [semantic conventions][1] that specify names for different types of data. This page lists mappings for OpenTelemetry semantic conventions to Datadog's semantic conventions.

### Unified service tagging

| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `deployment.environment` <sup>1</sup>  | `env` |
| `deployment.environment.name` <sup>2</sup> | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

For more information, see [Unified Service Tagging][2].

1: `deployment.environment` has been deprecated in favor of `deployment.environment.name` in [OpenTelemetry semantic conventions v1.27.0][4]  
2: `deployment.environment.name` is supported in Datadog Agent 7.58.0+ and Datadog Exporter v0.110.0+

### Containers

| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `container.id` | `container_id` |
| `container.name` | `container_name` |
| `container.image.name` | `image_name` |
| `container.image.tag` | `image_tag` |

Read more about [Containers semantic conventions in the OpenTelemetry documentation][3]. 

Additional cloud provider-specific attributes are also mapped.

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

#### Kubernetes labels

| Kubernetes convention | Datadog convention |
| --- | --- |
| `app.kubernetes.io/name` | `kube_app_name` |
| `app.kubernetes.io/instance` | `kube_app_instance` |
| `app.kubernetes.io/version` | `kube_app_version` |
| `app.kuberenetes.io/component` | `kube_app_component` |
| `app.kubernetes.io/part-of` | `kube_app_part_of` |
| `app.kubernetes.io/managed-by` | `kube_app_managed_by` |

### HTTP

| OpenTelemetry convention | Datadog convention |
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

## Span Type and Resource mapping
Datadog has a vendor-specific convention of "Span Type" represented by `span.type` attribute.

Based on the attributes included in your span, Datadog Agent and Datadog OpenTelemetry Components will attempt to infer the appropriate span type for better compatibility with other Datadog services. You may also explicitly set `span.type` attribute on any given span to override this logic using an [attributes][5] or [transform][6] processor, as well as by setting appropriate configuration values in OTel SDKs. 

### OTel Span Attributes -> Datadog Span Type
The following table shows the Span Type mapping logic that is used if feature flag `enable_receive_resource_spans_v2` is set. The chart is in order of precedence.
| # | Span Attribute | Datadog span.Type |
|---|----------------|-------------------|
| 1 | `span.type` | `span.type` attribute value |
| 2 | [Span Kind Server][7] | `web` |
| 3 | [Span Kind Client][8] | see 3a/b |
| 3a | Client span kind, `db.system` attribute not found | `http` |
| 3b | Client span kind, `db.system` attribute found | see table below [OTel Database System Types -> Datadog Span Type][10] |
| 4 | None of above conditions were fulfilled | `custom` |

### OTel Database System Types -> Datadog Span Type
In the table above, if a span is "client" kind and contains [`db.system` attribute][9], the following mapping applies for the Span Type in Datadog. As mentioned above, setting a `span.type` attribute on your span will override this logic.

| `db.system` | Datadog span.Type |
|-------------|-------------------|
| SQL Type DBMS (listed below) | `sql` |
| `adabas` | `sql` |
| `cache` | `sql` |
| `clickhouse` | `sql` |
| `cloudscape` | `sql` |
| `cockroachdb` | `sql` |
| `coldfusion` | `sql` |
| `db2` | `sql` |
| `derby` | `sql` |
| `edb` | `sql` |
| `firebird` | `sql` |
| `firstsql` | `sql` |
| `filemaker` | `sql` |
| `hanadb` | `sql` |
| `h2` | `sql` |
| `hsqldb` | `sql` |
| `informix` | `sql` |
| `ingres` | `sql` |
| `instantdb` | `sql` |
| `interbase` | `sql` |
| `mariadb` | `sql` |
| `maxdb` | `sql` |
| `mssql` | `sql` |
| `mysql` | `sql` |
| `netezza` | `sql` |
| `oracle` | `sql` |
| `other_sql` | `sql` |
| `pervasive` | `sql` |
| `pointbase` | `sql` |
| `postgresql` | `sql` |
| `progress` | `sql` |
| `redshift` | `sql` |
| `sqlite` | `sql` |
| `sybase` | `sql` |
| `teradata` | `sql` |
| `vertica` | `sql` |
| Other DB types | see below |
| `cassandra` | `cassandra` |
| `couchbase` | `db` |
| `couchdb` | `db` |
| `cosmosdb` | `db` |
| `dynamodb` | `db` |
| `elasticsearch` | `elasticsearch` |
| `geode` | `db` |
| `hive` | `db` |
| `memcached` | `memcached` |
| `mongodb` | `mongodb` |
| `opensearch` | `opensearch` |
| `redis` | `redis` |
| any `db.system` value not listed above | `db` |

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /getting_started/tagging/unified_service_tagging#opentelemetry
[3]: https://opentelemetry.io/docs/specs/semconv/resource/container/
[4]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
[7]: https://opentelemetry.io/docs/concepts/signals/traces/#server
[8]: https://opentelemetry.io/docs/concepts/signals/traces/#client
[9]: https://opentelemetry.io/docs/specs/semconv/attributes-registry/db/#db-system
[10]: #otel-database-system-types---datadog-span-type
