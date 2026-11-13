---
aliases:
- /fr/opentelemetry/guide/semantic_mapping/
- /fr/opentelemetry/schema_semantics/semantic_mapping/
further_reading:
- link: /opentelemetry/guide/metrics_mapping
  tag: Documentation
  text: Mappage des métriques d'OpenTelemetry vers Datadog
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: Types de métriques OpenTelemetry
- link: https://github.com/DataDog/opentelemetry-mapping-go/blob/main/pkg/otlp/attributes/attributes.go
  tag: Code source
  text: Code d'implémentation pour ces mappages
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
    name: Convention OpenTelemetry
  - id: datadog_convention
    name: Convention Datadog
  - id: type
    name: Type
title: Conventions sémantiques OpenTelemetry et conventions Datadog
---
OpenTelemetry utilise des [conventions sémantiques][1] qui spécifient des noms pour différents types de données. Cette page répertorie les mappages des conventions sémantiques OpenTelemetry vers les conventions sémantiques de Datadog.

{{< multifilter-search >}}

<sup>*</sup>Remplace la convention `deployment.environment` obsolète. Nécessite Datadog Agent 7.58.0+, l'exportateur Datadog v0.110.0+ ou l'ingestion OTLP Datadog.

## Mappage du type de span {#span-type-mapping}

Datadog utilise une convention spécifique au fournisseur de « type de span » représentée par l'attribut `span.type`.

En fonction des attributs inclus dans votre span, le Datadog Agent et les composants OpenTelemetry de Datadog tentent de déduire le type de span approprié pour une meilleure compatibilité avec les autres services Datadog. Vous pouvez également définir explicitement l'attribut `span.type` sur n'importe quel span pour remplacer cette logique en utilisant un processeur [attributes][5] ou [transform][6], ainsi qu'en définissant des valeurs de configuration appropriées dans les SDK OpenTelemetry.

### Mappez l'attribut de span OpenTelemetry vers le type de span Datadog {#map-opentelemetry-span-attribute-to-datadog-span-type}

Le tableau suivant présente la logique de mappage du type de span. Le tableau répertorie les mappages par ordre de priorité.  
| # | Attribut de span | span.type Datadog |
|---|----------------|-------------------|
| 1 | `span.type` | `span.type` valeur d'attribut |
| 2 | [Type de span serveur][7] | `web` |
| 3 | [Type de span client][8] | voir 3a/b |
| 3a | Type de span client, `db.system` attribut non trouvé | `http` |
| 3b | Type de span client, `db.system` attribut trouvé | Voir le tableau ci-dessous [Mappage du type de système de base de données OpenTelemetry vers le type de span Datadog][10] |  
| 4 | Aucune des conditions ci-dessus n'a été remplie | `custom` |

### Mappage du type de système de base de données OpenTelemetry vers le type de span Datadog {#mapping-opentelemetry-database-system-type-to-datadog-span-type}

Dans le tableau ci-dessus, si un span est de type « client » et contient un [`db.system` attribut][9], le mappage suivant s'applique au type de span dans Datadog. La définition d'un attribut `span.type` sur votre span remplace cette logique.

| `db.system`                            | Datadog span.type |
| -------------------------------------- | ----------------- |
| Type SQL de SGBD (listé ci-dessous) | `sql`             |
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
| Autres types de bases de données | voir ci-dessous |
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
| toute `db.system` valeur non listée ci-dessus | `db`              |

## Mappage des attributs de métriques {#metrics-attribute-mapping}

Par défaut, Datadog mappe uniquement les attributs de ressource OpenTelemetry listés dans le tableau des conventions sémantiques ci-dessus vers des tags de métriques Datadog.

Pour associer tous les attributs de ressource de vos charges utiles de métriques OTLP en tant que tags, activez le paramètre `metrics::resource_attributes_as_tags` :
Une fois activé, ce paramètre ajoute toutes les paires `key:value` d'attributs de ressource en tant que tags Datadog, en plus des tags de conventions sémantiques mappés présentés dans le tableau ci-dessus.

**Remarque** : L'activation de cette option peut augmenter considérablement la cardinalité des tags. Pour vérifier quels tags sont ajoutés, inspectez vos métriques dans le [Metrics Explorer][12].

{{< tabs >}}
{{% tab "Exportateur Datadog" %}}

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

L'activation de cette option ajoute à la fois les attributs de ressource OpenTelemetry et les conventions sémantiques Datadog aux tags de métriques.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[2]: /fr/getting_started/tagging/unified_service_tagging#opentelemetry
[3]: https://opentelemetry.io/docs/specs/semconv/resource/container/
[4]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
[7]: https://opentelemetry.io/docs/concepts/signals/traces/#server
[8]: https://opentelemetry.io/docs/concepts/signals/traces/#client
[9]: https://opentelemetry.io/docs/specs/semconv/attributes-registry/db/#db-system
[10]: #mapping-opentelemetry-database-system-type-to-datadog-span-type
[11]: /fr/opentelemetry/schema_semantics/hostname#cloud-provider-specific-conventions
[12]: https://app.datadoghq.com/metric/explorer