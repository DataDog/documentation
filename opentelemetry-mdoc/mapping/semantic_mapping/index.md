---
title: OpenTelemetry Semantic Conventions and Datadog Conventions
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Semantic Mapping > OpenTelemetry Semantic
  Conventions and Datadog Conventions
---

# OpenTelemetry Semantic Conventions and Datadog Conventions

OpenTelemetry makes use of [semantic conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/) that specify names for different types of data. This page lists mappings for OpenTelemetry semantic conventions to Datadog's semantic conventions.

| OpenTelemetry convention             | Datadog convention                    | Type                    |
| ------------------------------------ | ------------------------------------- | ----------------------- |
| `deployment.environment.name` \*     | `env`                                 | Unified service tagging |
| `service.name`                       | `service`                             | Unified service tagging |
| `service.version`                    | `version`                             | Unified service tagging |
| `container.id`                       | `container_id`                        | Containers              |
| `container.name`                     | `container_name`                      | Containers              |
| `container.image.name`               | `image_name`                          | Containers              |
| `container.image.tag`                | `image_tag`                           | Containers              |
| `cloud.provider`                     | `cloud_provider`                      | Cloud                   |
| `cloud.region`                       | `region`                              | Cloud                   |
| `cloud.availability_zone`            | `zone`                                | Cloud                   |
| `aws.ecs.task.family`                | `task_family`                         | ECS                     |
| `aws.ecs.task.arn`                   | `task_arn`                            | ECS                     |
| `aws.ecs.cluster.arn`                | `ecs_cluster_name`                    | ECS                     |
| `aws.ecs.task.revision`              | `task_version`                        | ECS                     |
| `aws.ecs.container.arn`              | `ecs_container_name`                  | ECS                     |
| `k8s.container.name`                 | `kube_container_name`                 | Kubernetes              |
| `k8s.cluster.name`                   | `kube_cluster_name`                   | Kubernetes              |
| `k8s.deployment.name`                | `kube_deployment`                     | Kubernetes              |
| `k8s.replicaset.name`                | `kube_replica_set`                    | Kubernetes              |
| `k8s.statefulset.name`               | `kube_stateful_set`                   | Kubernetes              |
| `k8s.daemonset.name`                 | `kube_daemon_set`                     | Kubernetes              |
| `k8s.job.name`                       | `kube_job`                            | Kubernetes              |
| `k8s.cronjob.name`                   | `kube_cronjob`                        | Kubernetes              |
| `k8s.namespace.name`                 | `kube_namespace`                      | Kubernetes              |
| `k8s.pod.name`                       | `pod_name`                            | Kubernetes              |
| `app.kubernetes.io/name`             | `kube_app_name`                       | Kubernetes labels       |
| `app.kubernetes.io/instance`         | `kube_app_instance`                   | Kubernetes labels       |
| `app.kubernetes.io/version`          | `kube_app_version`                    | Kubernetes labels       |
| `app.kuberenetes.io/component`       | `kube_app_component`                  | Kubernetes labels       |
| `app.kubernetes.io/part-of`          | `kube_app_part_of`                    | Kubernetes labels       |
| `app.kubernetes.io/managed-by`       | `kube_app_managed_by`                 | Kubernetes labels       |
| `client.address`                     | `http.client_ip`                      | HTTP                    |
| `http.response.body.size`            | `http.response.content_length`        | HTTP                    |
| `http.response.header.<header-name>` | `http.response.headers.<header-name>` | HTTP                    |
| `http.response.status_code`          | `http.status_code`                    | HTTP                    |
| `http.request.body.size`             | `http.request.content_length`         | HTTP                    |
| `http.request.header.referrer`       | `http.referrer`                       | HTTP                    |
| `http.request.header.<header-name>`  | `http.request.headers.<header-name>`  | HTTP                    |
| `http.request.method`                | `http.method`                         | HTTP                    |
| `http.route`                         | `http.route`                          | HTTP                    |
| `network.protocol.version`           | `http.version`                        | HTTP                    |
| `server.address`                     | `http.server_name`                    | HTTP                    |
| `url.full`                           | `http.url`                            | HTTP                    |
| `user_agent.original`                | `http.useragent`                      | HTTP                    |

\*Replaces the deprecated `deployment.environment` convention. Requires Datadog Agent 7.58.0+ and Datadog Exporter v0.110.0+.

## Span type mapping{% #span-type-mapping %}

Datadog has a vendor-specific convention of "span type" represented by the `span.type` attribute.

Based on the attributes included in your span, the Datadog Agent and Datadog OpenTelemetry components attempt to infer the appropriate span type for better compatibility with other Datadog services. You may also explicitly set the `span.type` attribute on any given span to override this logic using an [attributes](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor) or a [transform](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor) processor, as well as by setting appropriate configuration values in OpenTelemetry SDKs.

### Map OpenTelemetry span attribute to Datadog span type{% #map-opentelemetry-span-attribute-to-datadog-span-type %}

The following table shows the span type mapping logic that is used if the feature flag `enable_receive_resource_spans_v2` is set in the Datadog Agent or both the Datadog Exporter and Connector, if using the OpenTelemetry Collector. The chart lists mappings in order of precedence.

| \# | Span Attribute                                                                    | Datadog span.type                                                                   |
| -- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1  | `span.type`                                                                       | `span.type` attribute value                                                         |
| 2  | [Span kind server](https://opentelemetry.io/docs/concepts/signals/traces/#server) | `web`                                                                               |
| 3  | [Span kind client](https://opentelemetry.io/docs/concepts/signals/traces/#client) | see 3a/b                                                                            |
| 3a | Client span kind, `db.system` attribute not found                                 | `http`                                                                              |
| 3b | Client span kind, `db.system` attribute found                                     | See the table below Mapping OpenTelemetry database system type to Datadog span type |
| 4  | None of above conditions were fulfilled                                           | `custom`                                                                            |

### Mapping OpenTelemetry database system type to Datadog span type{% #mapping-opentelemetry-database-system-type-to-datadog-span-type %}

In the table above, if a span is a "client" kind and contains [`db.system` attribute](https://opentelemetry.io/docs/specs/semconv/attributes-registry/db/#db-system), the following mapping applies for the span type in Datadog. Setting a `span.type` attribute on your span overrides this logic.

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

## Metrics attribute mapping{% #metrics-attribute-mapping %}

For metrics, by default, Datadog only maps the OpenTelemetry resource attributes listed in the previous sections to Datadog metric tags. To map all resource attributes to tags, enable the `metrics::resource_attributes_as_tags` setting:

{% tab title="Datadog exporter" %}

```yaml
exporters:
    datadog:
        # Other configuration goes here...
        metrics:
            # Add all resource attributes as tags for metrics
            resource_attributes_as_tags: true
```

{% /tab %}

{% tab title="Datadog Agent" %}

```yaml
otlp_config:
    # Other configuration goes here...
    metrics:
        # Add all resource attributes as tags for metrics
        resource_attributes_as_tags: true
```

{% /tab %}

Enabling this option adds both the OpenTelemetry resource attributes and the Datadog semantic conventions to the metric tags.

## Further reading{% #further-reading %}

- [Metrics mapping from OpenTelemetry to Datadog](http://localhost:1313/opentelemetry/guide/metrics_mapping)
- [OpenTelemetry metric types](http://localhost:1313/metrics/open_telemetry/otlp_metric_types)
- [Implementation code for these mappings](https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go)
