---
aliases:
- /fr/tracing/guide/inferred-service-opt-in
description: Découvrez automatiquement les dépendances des services, telles que les
  bases de données et les files d'attente, grâce à l'analyse des requêtes sortantes.
further_reading:
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
title: Services déduits
---
## Aperçu {#overview}

Datadog découvre automatiquement les dépendances d'un service instrumenté, telles que les bases de données, les files d'attente ou les API tierces, même si cette dépendance n'a pas été directement instrumentée. En analysant les requêtes sortantes de vos services instrumentés, Datadog déduit la présence de ces dépendances et collecte les métriques de performance associées.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Carte des dépendances de la page de service" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

Explorez les services inférés dans le [Catalogue][1] en filtrant les entrées par type d'entité, telles que base de données, file d'attente ou API tierce. Chaque [page de service][2] est adaptée au type de service que vous examinez. Par exemple, les pages de service de base de données présentent des informations spécifiques aux bases de données et incluent des données de [Database Monitoring] si vous l'utilisez.

## Configurer les services inférés {#set-up-inferred-services}
{{< tabs >}}
{{% tab "Agent v7.60.0+" %}}
À partir de la version [7.60.0][1] de l'Agent Datadog, aucune configuration manuelle n'est nécessaire pour voir les services inférés. Les configurations requises—`apm_config.compute_stats_by_span_kind` et `apm_config.peer_tags_aggregation`—sont activées par défaut.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

Pour les versions de l'Agent Datadog [7.55.1][1] à [7.59.1][2], ajoutez ce qui suit à votre fichier de configuration `datadog.yaml` :

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true

{{< /code-block >}}

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Si vous utilisez Helm, incluez ces variables d'environnement dans votre `values.yaml` [fichier][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

Pour les versions de l'Agent Datadog [7.50.3][1] à [7.54.1][2], ajoutez ce qui suit à votre fichier de configuration `datadog.yaml` :

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}

Si vous utilisez Helm, incluez ces variables d'environnement dans votre `values.yaml` [fichier][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Collector OpenTelemetry" %}}

Pour le Collecteur OpenTelemetry, la version minimale recommandée est `opentelemetry-collector-contrib` [v0.95.0][1] ou ultérieure. Dans ce cas, mettez à jour cette configuration :

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Si votre version de Collector est inférieure à v0.95.0, mettez à jour la configuration suivante de Collector :

{{< code-block lang="yaml" collapsible="true" >}}

exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]   

{{< /code-block >}}

**Exemple** : [collector.yaml][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## Nommer les entités inférées {#naming-inferred-entities}

Pour déterminer les noms et types des dépendances de service inférées, Datadog utilise des attributs de span standard et les associe aux attributs `peer.*`. Par exemple, les API externes inférées utilisent le schéma de nommage par défaut `net.peer.name` comme `api.stripe.com`, `api.twilio.com` et `us6.api.mailchimp.com`. Les bases de données inférées utilisent le schéma de nommage par défaut `db.instance`. Vous pouvez renommer les entités inférées en créant des [règles de renommage][5].

### Tags de pair {#peer-tags}

Tag de pair | Attributs source
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.aws.sqs.queue` | `queuename`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`
`peer.hostname` | `peer.hostname`, `hostname`, `net.peer.name`, `db.hostname`, `network.destination.name`, `grpc.host`, `http.host`, `server.address`, `http.server_name`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `amqp.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`
`peer.rpc.service` | `rpc.service`
`peer.rpc.system` | `rpc.system`
`peer.service` | `peer.service`

**Remarque** : Les valeurs des attributs pair qui correspondent aux formats d'adresse IP sont modifiées et masquées avec `blocked-ip-address` pour éviter un bruit inutile et le marquage des métriques avec des dimensions à haute cardinalité. En conséquence, vous pouvez rencontrer certains services `blocked-ip-address` apparaissant comme des dépendances en aval de vos services instrumentés.

#### Précedence des tags de pair{#precedence-of-peer-tags}

Pour attribuer un nom aux entités inférées, Datadog utilise un ordre de priorité spécifique entre les étiquettes peer, notamment lorsque les entités sont définies par une combinaison de plusieurs attributs. 

Type d'entité | Ordre de précedence
-----------|----------------
Base de données | `peer.db.name` > `peer.aws.s3.bucket` (Pour AWS S3) / `peer.aws.dynamodb.table` (Pour AWS DynamoDB) / `peer.cassandra.contact.points` (Pour Cassandra) / `peer.couchbase.seed.nodes` (Pour Couchbase) > `peer.hostname` > `peer.db.system`
File d'attente | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (pour Kafka) / `peer.aws.sqs.queue` (pour AWS SQS) / `peer.aws.kinesis.stream` (pour AWS Kinesis) > `peer.messaging.system`
Service inféré | `peer.service` > `peer.rpc.service` > `peer.hostname`

Si le tag de la plus haute priorité, tel que `peer.db.name`, n'est pas capturé dans le cadre de l'instrumentation, Datadog utilise le tag de la deuxième plus haute priorité, comme `peer.hostname`, et poursuit dans cet ordre.

**Remarque** : Datadog ne définit jamais le `peer.service` pour les bases de données et les files d'attente inférées. `peer.service` est l'attribut de pair de la plus haute priorité. S'il est défini, il prend le pas sur tous les autres attributs.

## Migrer vers le nom de service par défaut global {#migrate-to-global-default-service-naming}

Avec les services inférés, les dépendances de service sont automatiquement détectées à partir des attributs de span existants. En conséquence, il n'est pas nécessaire de changer les noms de service (en utilisant le tag `service`) pour identifier ces dépendances. 

Activez `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` pour garantir qu'aucune intégration Datadog ne définit des noms de service différents du nom de service global par défaut. Cela améliore également la manière dont les connexions entre services et les services inférés sont représentés dans les visualisations Datadog, dans tous les langages SDK et intégrations pris en charge.

<div class="alert alert-danger">L'activation de cette option peut avoir un impact sur les métriques APM existantes, les métriques de span personnalisées, l'analyse des traces, les filtres de rétention, les analyses de données sensibles, les moniteurs, les tableaux de bord ou les carnets qui font référence aux anciens noms de service. Mettez à jour ces actifs pour utiliser le tag de service par défaut global (<code>service:&lt;DD_SERVICE&gt;</code>).</div>

Pour savoir comment supprimer les remplacements de service et migrer vers les services inférés, consultez le [guide sur les remplacements de service][4].

[1]: /fr/internal_developer_portal/catalog/
[2]: /fr/tracing/services/service_page
[3]: /fr/database_monitoring/
[4]: /fr/tracing/guide/service_overrides
[5]: /fr/tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">La fonctionnalité Services Inférés n'est pas disponible par défaut dans votre centre de données. Remplissez ce <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">formulaire</a> pour demander l'accès.</div>

{{< /site-region >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}