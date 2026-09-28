---
aliases:
- /es/opentelemetry/guide/semantic_mapping/
- /es/opentelemetry/schema_semantics/semantic_mapping/
further_reading:
- link: /opentelemetry/guide/metrics_mapping
  tag: Documentación
  text: Asignación de métricas de OpenTelemetry a Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de métricas de OpenTelemetry
- link: https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go
  tag: Código fuente
  text: Código de implementación para estas asignaciones
multifiltersearch:
  data:
  - datadog_convention: '`env`'
    opentelemetry_convention: '`deployment.environment.name` <sup>*</sup>'
    type: Unified service tagging
  - datadog_convention: '`service`'
    opentelemetry_convention: '`service.name`'
    type: Unified service tagging
  - datadog_convention: '`version`'
    opentelemetry_convention: '`service.version`'
    type: Unified service tagging
  - datadog_convention: '`container_id`'
    opentelemetry_convention: '`container.id`'
    type: Containers
  - datadog_convention: '`container_name`'
    opentelemetry_convention: '`container.name`'
    type: Containers
  - datadog_convention: '`image_name`'
    opentelemetry_convention: '`container.image.name`'
    type: Containers
  - datadog_convention: '`image_tag`'
    opentelemetry_convention: '`container.image.tag`'
    type: Containers
  - datadog_convention: '`cloud_provider`'
    opentelemetry_convention: '`cloud.provider`'
    type: Cloud
  - datadog_convention: '`region`'
    opentelemetry_convention: '`cloud.region`'
    type: Cloud
  - datadog_convention: '`zone`'
    opentelemetry_convention: '`cloud.availability_zone`'
    type: Cloud
  - datadog_convention: '`task_family`'
    opentelemetry_convention: '`aws.ecs.task.family`'
    type: ECS
  - datadog_convention: '`task_arn`'
    opentelemetry_convention: '`aws.ecs.task.arn`'
    type: ECS
  - datadog_convention: '`ecs_cluster_name`'
    opentelemetry_convention: '`aws.ecs.cluster.arn`'
    type: ECS
  - datadog_convention: '`task_version`'
    opentelemetry_convention: '`aws.ecs.task.revision`'
    type: ECS
  - datadog_convention: '`ecs_container_name`'
    opentelemetry_convention: '`aws.ecs.container.arn`'
    type: ECS
  - datadog_convention: '`kube_container_name`'
    opentelemetry_convention: '`k8s.container.name`'
    type: Kubernetes
  - datadog_convention: '`kube_cluster_name`'
    opentelemetry_convention: '`k8s.cluster.name`'
    type: Kubernetes
  - datadog_convention: '`kube_deployment`'
    opentelemetry_convention: '`k8s.deployment.name`'
    type: Kubernetes
  - datadog_convention: '`kube_replica_set`'
    opentelemetry_convention: '`k8s.replicaset.name`'
    type: Kubernetes
  - datadog_convention: '`kube_stateful_set`'
    opentelemetry_convention: '`k8s.statefulset.name`'
    type: Kubernetes
  - datadog_convention: '`kube_daemon_set`'
    opentelemetry_convention: '`k8s.daemonset.name`'
    type: Kubernetes
  - datadog_convention: '`kube_job`'
    opentelemetry_convention: '`k8s.job.name`'
    type: Kubernetes
  - datadog_convention: '`kube_cronjob`'
    opentelemetry_convention: '`k8s.cronjob.name`'
    type: Kubernetes
  - datadog_convention: '`kube_namespace`'
    opentelemetry_convention: '`k8s.namespace.name`'
    type: Kubernetes
  - datadog_convention: '`pod_name`'
    opentelemetry_convention: '`k8s.pod.name`'
    type: Kubernetes
  - datadog_convention: '`kube_app_name`'
    opentelemetry_convention: '`app.kubernetes.io/name`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_instance`'
    opentelemetry_convention: '`app.kubernetes.io/instance`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_version`'
    opentelemetry_convention: '`app.kubernetes.io/version`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_component`'
    opentelemetry_convention: '`app.kubernetes.io/component`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_part_of`'
    opentelemetry_convention: '`app.kubernetes.io/part-of`'
    type: Kubernetes labels
  - datadog_convention: '`kube_app_managed_by`'
    opentelemetry_convention: '`app.kubernetes.io/managed-by`'
    type: Kubernetes labels
  - datadog_convention: '`http.client_ip`'
    opentelemetry_convention: '`client.address`'
    type: HTTP
  - datadog_convention: '`http.response.content_length`'
    opentelemetry_convention: '`http.response.body.size`'
    type: HTTP
  - datadog_convention: '`http.response.headers.<header-name>`'
    opentelemetry_convention: '`http.response.header.<header-name>`'
    type: HTTP
  - datadog_convention: '`http.status_code`'
    opentelemetry_convention: '`http.response.status_code`'
    type: HTTP
  - datadog_convention: '`http.request.content_length`'
    opentelemetry_convention: '`http.request.body.size`'
    type: HTTP
  - datadog_convention: '`http.referrer`'
    opentelemetry_convention: '`http.request.header.referrer`'
    type: HTTP
  - datadog_convention: '`http.request.headers.<header-name>`'
    opentelemetry_convention: '`http.request.header.<header-name>`'
    type: HTTP
  - datadog_convention: '`http.method`'
    opentelemetry_convention: '`http.request.method`'
    type: HTTP
  - datadog_convention: '`http.route`'
    opentelemetry_convention: '`http.route`'
    type: HTTP
  - datadog_convention: '`http.version`'
    opentelemetry_convention: '`network.protocol.version`'
    type: HTTP
  - datadog_convention: '`http.server_name`'
    opentelemetry_convention: '`server.address`'
    type: HTTP
  - datadog_convention: '`http.url`'
    opentelemetry_convention: '`url.full`'
    type: HTTP
  - datadog_convention: '`http.useragent`'
    opentelemetry_convention: '`user_agent.original`'
    type: HTTP
  headers:
  - id: opentelemetry_convention
    name: Convención de OpenTelemetry
  - id: datadog_convention
    name: Convención de Datadog
  - id: type
    name: Type
title: Convenciones semánticas de OpenTelemetry y convenciones de Datadog
---
OpenTelemetry utiliza [convenciones semánticas][1] que especifican nombres para diferentes tipos de datos. Esta página enumera las asignaciones de las convenciones semánticas de OpenTelemetry a las convenciones semánticas de Datadog.

{{< multifilter-search >}}

<sup>*</sup>Reemplaza la convención `deployment.environment` obsoleta. Requiere Datadog Agent 7.58.0+, Datadog Exporter v0.110.0+ o la ingesta OTLP de Datadog.

## Asignación de tipo de tramo {#span-type-mapping}

Datadog tiene una convención específica del proveedor de "tipo de tramo" representada por el atributo `span.type`.

Según los atributos incluidos en su tramo, el Datadog Agent y los componentes de OpenTelemetry de Datadog intentan inferir el tipo de tramo adecuado para una mejor compatibilidad con otros servicios de Datadog. También puede establecer explícitamente el atributo `span.type` en cualquier tramo determinado para anular esta lógica mediante un procesador de [attributes][5] o [transform][6], así como estableciendo los valores de configuración adecuados en los SDK de OpenTelemetry.

### Asignar atributo de tramo de OpenTelemetry al tipo de tramo de Datadog {#map-opentelemetry-span-attribute-to-datadog-span-type}

La siguiente tabla muestra la lógica de asignación de tipos de tramo. La tabla enumera las asignaciones en orden de precedencia.  
| # | Atributo de tramo | span.type de Datadog |
|---|----------------|-------------------|
| 1 | `span.type` | `span.type` valor del atributo |
| 2 | [Tipo de tramo de servidor][7] | `web` |
| 3 | [Tipo de tramo de cliente][8] | ver 3a/b |
| 3a | Tipo de tramo de cliente, `db.system` atributo no encontrado | `http` |
| 3b | Tipo de tramo de cliente, `db.system` atributo encontrado | Consulte la tabla a continuación [Asignación del tipo de sistema de base de datos de OpenTelemetry al tipo de tramo de Datadog][10] |  
| 4 | Ninguna de las condiciones anteriores se cumplió | `custom` |

### Asignación del tipo de sistema de base de datos de OpenTelemetry al tipo de tramo de Datadog {#mapping-opentelemetry-database-system-type-to-datadog-span-type}

En la tabla anterior, si un tramo es de tipo "cliente" y contiene el atributo [`db.system`][9], se aplica la siguiente asignación para el tipo de tramo en Datadog. Establecer un atributo `span.type` en su tramo anula esta lógica.

| `db.system`                            | Datadog span.type |
| -------------------------------------- | ----------------- |
| DBMS de tipo SQL (listado a continuación)           | `sql`             |
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
| Otros tipos de BD                         | ver a continuación         |
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
| cualquier valor `db.system` no listado anteriormente | `db`              |

## Asignación de atributos de métricas {#metrics-attribute-mapping}

De forma predeterminada, Datadog asigna solo los atributos de recursos de OpenTelemetry enumerados en la tabla de convenciones semánticas anterior a las etiquetas de métricas de Datadog.

Para adjuntar todos los atributos de recursos de sus cargas útiles de métricas OTLP como etiquetas, habilite la configuración `metrics::resource_attributes_as_tags`:
Cuando se habilita, esta configuración agrega todos los pares de `key:value` de atributos de recursos como etiquetas de Datadog, además de las etiquetas de convenciones semánticas asignadas que se muestran en la tabla anterior.

**Nota**: Habilitar esta opción puede aumentar significativamente la cardinalidad de las etiquetas. Para verificar qué etiquetas se están agregando, inspeccione sus métricas en el [Metrics Explorer][12].

{{< tabs >}}
{{% tab "Datadog Exporter" %}}

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

Habilitar esta opción agrega tanto los atributos de recursos de OpenTelemetry como las convenciones semánticas de Datadog a las etiquetas de métricas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /es/getting_started/tagging/unified_service_tagging#opentelemetry
[3]: https://opentelemetry.io/docs/specs/semconv/resource/container/
[4]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
[7]: https://opentelemetry.io/docs/concepts/signals/traces/#server
[8]: https://opentelemetry.io/docs/concepts/signals/traces/#client
[9]: https://opentelemetry.io/docs/specs/semconv/attributes-registry/db/#db-system
[10]: #mapping-opentelemetry-database-system-type-to-datadog-span-type
[11]: /es/opentelemetry/schema_semantics/hostname#cloud-provider-specific-conventions
[12]: https://app.datadoghq.com/metric/explorer