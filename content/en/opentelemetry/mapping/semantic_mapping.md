---
title: OpenTelemetry Semantic Conventions and Datadog Conventions
aliases:
    - /opentelemetry/guide/semantic_mapping/
    - /opentelemetry/schema_semantics/semantic_mapping/
further_reading:
    - link: '/opentelemetry/guide/metrics_mapping'
      tag: 'Documentation'
      text: 'Metrics mapping from OpenTelemetry to Datadog'
    - link: '/metrics/open_telemetry/otlp_metric_types'
      tag: 'Documentation'
      text: 'OpenTelemetry metric types'
    - link: 'https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go'
      tag: 'Source Code'
      text: 'Implementation code for these mappings'

multifiltersearch:
  # "id" must match the corresponding key in the "data" object
  headers:
    - name: OpenTelemetry convention
      id: opentelemetry_convention
    - name: Datadog convention
      id: datadog_convention
    - name: Type
      id: type
  data:
    - opentelemetry_convention: '`deployment.environment.name` <sup>*</sup>'
      datadog_convention: '`env`'
      type: Unified service tagging
    - opentelemetry_convention: '`service.name`'
      datadog_convention: '`service`'
      type: Unified service tagging
    - opentelemetry_convention: '`service.version`'
      datadog_convention: '`version`'
      type: Unified service tagging
    - opentelemetry_convention: '`container.id`'
      datadog_convention: '`container_id`'
      type: Containers
    - opentelemetry_convention: '`container.name`'
      datadog_convention: '`container_name`'
      type: Containers
    - opentelemetry_convention: '`container.image.name`'
      datadog_convention: '`image_name`'
      type: Containers
    - opentelemetry_convention: '`container.image.tag`'
      datadog_convention: '`image_tag`'
      type: Containers
    - opentelemetry_convention: '`cloud.provider`'
      datadog_convention: '`cloud_provider`'
      type: Cloud
    - opentelemetry_convention: '`cloud.region`'
      datadog_convention: '`region`'
      type: Cloud
    - opentelemetry_convention: '`cloud.availability_zone`'
      datadog_convention: '`zone`'
      type: Cloud
    - opentelemetry_convention: '`aws.ecs.task.family`'
      datadog_convention: '`task_family`'
      type: ECS
    - opentelemetry_convention: '`aws.ecs.task.arn`'
      datadog_convention: '`task_arn`'
      type: ECS
    - opentelemetry_convention: '`aws.ecs.cluster.arn`'
      datadog_convention: '`ecs_cluster_name`'
      type: ECS
    - opentelemetry_convention: '`aws.ecs.task.revision`'
      datadog_convention: '`task_version`'
      type: ECS
    - opentelemetry_convention: '`aws.ecs.container.arn`'
      datadog_convention: '`ecs_container_name`'
      type: ECS
    - opentelemetry_convention: '`k8s.container.name`'
      datadog_convention: '`kube_container_name`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.cluster.name`'
      datadog_convention: '`kube_cluster_name`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.deployment.name`'
      datadog_convention: '`kube_deployment`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.replicaset.name`'
      datadog_convention: '`kube_replica_set`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.statefulset.name`'
      datadog_convention: '`kube_stateful_set`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.daemonset.name`'
      datadog_convention: '`kube_daemon_set`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.job.name`'
      datadog_convention: '`kube_job`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.cronjob.name`'
      datadog_convention: '`kube_cronjob`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.namespace.name`'
      datadog_convention: '`kube_namespace`'
      type: Kubernetes
    - opentelemetry_convention: '`k8s.pod.name`'
      datadog_convention: '`pod_name`'
      type: Kubernetes
    - opentelemetry_convention: '`app.kubernetes.io/name`'
      datadog_convention: '`kube_app_name`'
      type: Kubernetes labels
    - opentelemetry_convention: '`app.kubernetes.io/instance`'
      datadog_convention: '`kube_app_instance`'
      type: Kubernetes labels
    - opentelemetry_convention: '`app.kubernetes.io/version`'
      datadog_convention: '`kube_app_version`'
      type: Kubernetes labels
    - opentelemetry_convention: '`app.kubernetes.io/component`'
      datadog_convention: '`kube_app_component`'
      type: Kubernetes labels
    - opentelemetry_convention: '`app.kubernetes.io/part-of`'
      datadog_convention: '`kube_app_part_of`'
      type: Kubernetes labels
    - opentelemetry_convention: '`app.kubernetes.io/managed-by`'
      datadog_convention: '`kube_app_managed_by`'
      type: Kubernetes labels
    - opentelemetry_convention: '`client.address`'
      datadog_convention: '`http.client_ip`'
      type: HTTP
    - opentelemetry_convention: '`http.response.body.size`'
      datadog_convention: '`http.response.content_length`'
      type: HTTP
    - opentelemetry_convention: '`http.response.header.<header-name>`'
      datadog_convention: '`http.response.headers.<header-name>`'
      type: HTTP
    - opentelemetry_convention: '`http.response.status_code`'
      datadog_convention: '`http.status_code`'
      type: HTTP
    - opentelemetry_convention: '`http.request.body.size`'
      datadog_convention: '`http.request.content_length`'
      type: HTTP
    - opentelemetry_convention: '`http.request.header.referrer`'
      datadog_convention: '`http.referrer`'
      type: HTTP
    - opentelemetry_convention: '`http.request.header.<header-name>`'
      datadog_convention: '`http.request.headers.<header-name>`'
      type: HTTP
    - opentelemetry_convention: '`http.request.method`'
      datadog_convention: '`http.method`'
      type: HTTP
    - opentelemetry_convention: '`http.route`'
      datadog_convention: '`http.route`'
      type: HTTP
    - opentelemetry_convention: '`network.protocol.version`'
      datadog_convention: '`http.version`'
      type: HTTP
    - opentelemetry_convention: '`server.address`'
      datadog_convention: '`http.server_name`'
      type: HTTP
    - opentelemetry_convention: '`url.full`'
      datadog_convention: '`http.url`'
      type: HTTP
    - opentelemetry_convention: '`user_agent.original`'
      datadog_convention: '`http.useragent`'
      type: HTTP


---

OpenTelemetry makes use of [semantic conventions][1] that specify names for different types of data. This page lists mappings for OpenTelemetry semantic conventions to Datadog's semantic conventions.

{{< multifilter-search >}}

<sup>*</sup>Replaces the deprecated `deployment.environment` convention. Requires Datadog Agent 7.58.0+ and Datadog Exporter v0.110.0+.

## Span type mapping

Datadog has a vendor-specific convention of "span type" represented by the `span.type` attribute.

Based on the attributes included in your span, the Datadog Agent and Datadog OpenTelemetry components attempt to infer the appropriate span type for better compatibility with other Datadog services. You may also explicitly set the `span.type` attribute on any given span to override this logic using an [attributes][5] or a [transform][6] processor, as well as by setting appropriate configuration values in OpenTelemetry SDKs.

### Map OpenTelemetry span attribute to Datadog span type

The following table shows the span type mapping logic that is used if the feature flag `enable_receive_resource_spans_v2` is set in the Datadog Agent or both the Datadog Exporter and Connector, if using the OpenTelemetry Collector. The chart lists mappings in order of precedence.  
| # | Span Attribute | Datadog span.type |
|---|----------------|-------------------|
| 1 | `span.type` | `span.type` attribute value |
| 2 | [Span kind server][7] | `web` |
| 3 | [Span kind client][8] | see 3a/b |
| 3a | Client span kind, `db.system` attribute not found | `http` |
| 3b | Client span kind, `db.system` attribute found | See the table below [Mapping OpenTelemetry database system type to Datadog span type][10] |  
| 4 | None of above conditions were fulfilled | `custom` |

### Mapping OpenTelemetry database system type to Datadog span type

In the table above, if a span is a "client" kind and contains [`db.system` attribute][9], the following mapping applies for the span type in Datadog. Setting a `span.type` attribute on your span overrides this logic.

| `db.system`                            | Datadog span.type |
| -------------------------------------- | ----------------- |
| SQL Type DBMS (listed below)           | `sql`             |
| `adabas`                               | `sql`             |
| `cache`                                | `sql`             |
| `clickhouse`                           | `sql`             |
| `cloudscape`                           | `sql`             |
| `cockroachdb`                          | `sql`             |
| `coldfusion`                           | `sql`             |
| `db2`                                  | `sql`             |
| `derby`                                | `sql`             |
| `edb`                                  | `sql`             |
| `firebird`                             | `sql`             |
| `firstsql`                             | `sql`             |
| `filemaker`                            | `sql`             |
| `hanadb`                               | `sql`             |
| `h2`                                   | `sql`             |
| `hsqldb`                               | `sql`             |
| `informix`                             | `sql`             |
| `ingres`                               | `sql`             |
| `instantdb`                            | `sql`             |
| `interbase`                            | `sql`             |
| `mariadb`                              | `sql`             |
| `maxdb`                                | `sql`             |
| `mssql`                                | `sql`             |
| `mysql`                                | `sql`             |
| `netezza`                              | `sql`             |
| `oracle`                               | `sql`             |
| `other_sql`                            | `sql`             |
| `pervasive`                            | `sql`             |
| `pointbase`                            | `sql`             |
| `postgresql`                           | `sql`             |
| `progress`                             | `sql`             |
| `redshift`                             | `sql`             |
| `sqlite`                               | `sql`             |
| `sybase`                               | `sql`             |
| `teradata`                             | `sql`             |
| `vertica`                              | `sql`             |
| Other DB types                         | see below         |
| `cassandra`                            | `cassandra`       |
| `couchbase`                            | `db`              |
| `couchdb`                              | `db`              |
| `cosmosdb`                             | `db`              |
| `dynamodb`                             | `db`              |
| `elasticsearch`                        | `elasticsearch`   |
| `geode`                                | `db`              |
| `hive`                                 | `db`              |
| `memcached`                            | `memcached`       |
| `mongodb`                              | `mongodb`         |
| `opensearch`                           | `opensearch`      |
| `redis`                                | `redis`           |
| any `db.system` value not listed above | `db`              |

## Metrics attribute mapping

By default, Datadog maps only the OpenTelemetry resource attributes listed in the semantic conventions table above to Datadog metric tags.

To attach all resource attributes from your OTLP metric payloads as tags, enable the `metrics::resource_attributes_as_tags` setting:
When enabled, this setting adds all resource attribute key/value pairs as Datadog tags, in addition to the mapped semantic convention tags shown in the table above.

**Note**: Enabling this option may significantly increase tag cardinality. To verify which tags are being added, inspect your metrics in the [Metrics Explorer][12].

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
[10]: #mapping-opentelemetry-database-system-type-to-datadog-span-type
[11]: /opentelemetry/schema_semantics/hostname#cloud-provider-specific-conventions
[12]: https://app.datadoghq.com/metric/explorer
