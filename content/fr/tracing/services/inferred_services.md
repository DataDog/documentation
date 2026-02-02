---
title: Services déduits
description: "Détectez automatiquement les dépendances des services, telles que les bases de données et les files d'attente, grâce à l'analyse des requêtes sortantes."
aliases:
  - /tracing/guide/inferred-service-opt-in
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "En savoir plus sur les services dans Datadog"
---

## Présentation

Datadog détecte automatiquement les dépendances d'un service instrumenté, telles que les bases de données, les files d'attente ou les API tierces, même si ces dépendances n'ont pas été directement instrumentées. En analysant les requêtes sortantes de vos services instrumentés, Datadog déduit la présence de ces dépendances et collecte les métriques de performance associées.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Carte des dépendances de la page des services" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

Explorez les services déduits dans le [catalogue de logiciels][1] en filtrant les entrées par type d'entité, telle que base de données, file d'attente ou API tierce. Chaque [page de service][2] est adaptée au type de service que vous recherchez. Par exemple, les pages de service de base de données affichent des informations spécifiques à la base de données et incluent des données de surveillance de la base de données si vous utilisez [la surveillance de base de données][3].

## Configurer les services déduits
{{< tabs >}} {{% tab "Agent v7.60.0+" %}} À partir de la version [7.60.0][1] de Datadog Agent, aucune configuration manuelle n'est nécessaire pour voir les services déduits. Les configurations requises —`apm_config.compute_stats_by_span_kind` et `apm_config.peer_tags_aggregation`— sont activées par défaut.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

Pour les versions [7.55.1][1] à [7.59.1][2] de Datadog Agent, ajoutez ce qui suit à votre fichier de configuration d'`datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config :
  compute_stats_by_span_kind : true
  peer_tags_aggregation : true

{{< /code-block >}}

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Si vous utilisez Helm, incluez ces variables d'environnement dans votre [fichier][3] d'`values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

Pour les versions [7.50.3][1] à [7.54.1][2] de Datadog Agent, ajoutez ce qui suit à votre fichier de configuration d'`datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config :
  compute_stats_by_span_kind : true
  peer_tags_aggregation : true
  peer_tags : \["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "cassandra.keyspace", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]

{{< /code-block >}}

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='\["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "cassandra.keyspace", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]".

{{< /code-block >}}

Si vous utilisez Helm, incluez ces variables d'environnement dans votre [fichier][3] d'`values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Pour OpenTelemetry Collector, la version minimale recommandée est `opentelemetry-collector-contrib` r [v0.95.0][1] ou ultérieure. Dans ce cas, mettez à jour cette configuration :

{{< code-block lang="yaml" collapsible="true" >}}

connecteurs :
  datadog/connecteur :
    traces :
      compute_stats_by_span_kind : true
      peer_tags_aggregation : true
      peer_tags : \["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]

{{< /code-block >}}

Si votre version de Collector est inférieure à v0.95.0, mettez à jour la configuration suivante de Collector :

{{< code-block lang="yaml" collapsible="true" >}}

exportateurs :
  datadog :
    traces :
      compute_stats_by_span_kind : true
      peer_tags_aggregation : true
      peer_tags : \["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]   

{{< /code-block >}}

\*\*Exemple** : \[collector.yaml]\[2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## Nommer les entités inférées

Pour déterminer les noms et les types des dépendances de service déduites, Datadog utilise des attributs de span standard et les mappe à des attributs d'`peer.*`. Par exemple, les API externes déduites utilisent le schéma de nommage par défaut `net.peer.name`, comme `api.stripe.com`, `api.twilio.com` et `us6.api.mailchimp.com`. Les bases de données déduites utilisent le schéma de nommage par défaut `db.instance`. Vous pouvez renommer les entités déduites en créant [des règles de renommage][5].

### Étiquettes Peer

Étiquette Peer | Attributs source
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

note Les valeurs d'attributs pairs qui correspondent aux formats d'adresses IP (par exemple, 127.0.0.1) sont modifiées et expurgées à l'aide d'un masquage de type « masque de réseau » ( `blocked-ip-address` ) afin d'éviter tout bruit inutile et tout marquage des métriques avec des dimensions à cardinalité élevée. Par conséquent, vous pouvez rencontrer certains services d'`blocked-ip-address` s apparaissant comme des dépendances en aval de vos services instrumentés.

#### Priorité des étiquettes peer

Pour attribuer un nom aux entités inférées, Datadog utilise un ordre de priorité spécifique entre les étiquettes peer, notamment lorsque les entités sont définies par une combinaison de plusieurs attributs. 

Type d'entité | Ordre de priorité
-----------|----------------
Base de données | `peer.db.name` > `peer.aws.s3.bucket` (pour AWS S3) / `peer.aws.dynamodb.table` (pour AWS DynamoDB) / `peer.cassandra.contact.points` (pour Cassandra) / `peer.couchbase.seed.nodes` (pour Couchbase) > `peer.hostname` > `peer.db.system`
Queue | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (pour Kafka) / `peer.aws.sqs.queue` (pour AWS SQS) / `peer.aws.kinesis.stream` (pour AWS Kinesis) > `peer.messaging.system`
Service déduit | `peer.service` > `peer.rpc.service` > `peer.hostname`

Si la balise de priorité la plus élevée, telle que `peer.db.name`, n'est pas capturée dans le cadre de l'instrumentation, Datadog utilise la balise de priorité la plus élevée suivante, telle que `peer.hostname`, et continue dans cet ordre.

note Datadog ne définit jamais l'attribut « `peer.service` » (priorité de la file d'attente) pour les bases de données et les files d'attente déduites. L'attribut « `peer.service` » (priorité du pair) est l'attribut de pair ayant la priorité la plus élevée. S'il est défini, il a priorité sur tous les autres attributs.

## Migrer vers la dénomination globale par défaut des services

Avec les services déduits, les dépendances de service sont automatiquement détectées à partir des attributs de span existants. Par conséquent, il n'est pas nécessaire de modifier les noms des services (à l'aide de la balise \` `service` `) pour identifier ces dépendances. 

Activez l'option « `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` » (Empêcher les intégrations de définir des noms de service) pour vous assurer qu'aucune intégration Datadog ne définit des noms de service différents du nom de service global par défaut. Cela améliore également la manière dont les connexions de service à service et les services déduits sont représentés dans les visualisations Datadog, pour tous les langages et intégrations de bibliothèques de traçage pris en charge.

<div class="alert alert-danger">L'activation de cette option peut avoir un impact sur les métriques APM existantes, les métriques de portée personnalisées, les analyses de trace, les filtres de conservation, les analyses de données sensibles, les moniteurs, les tableaux de bord ou les blocs-notes qui font référence aux anciens noms de service. Mettez à jour ces ressources afin d'utiliser la balise de service par défaut globale (<code>service:&lt;DD_SERVICE></code>).</div>

Pour savoir comment supprimer les remplacements de service et migrer vers les services inférés, consultez le \[guide sur les remplacements de service]\[4].

[1]: /software_catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/
[4]: /tracing/guide/service_overrides
[5]: /tracing/services/renaming_rules/

{{</ site-region>}}
{{< site-region region="gov" >}}
<div class="alert alert-info">La fonctionnalité Services déduits n'est pas disponible par défaut dans votre centre de données. Remplissez ce <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">formulaire</a> pour demander l'accès.</div>

{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
