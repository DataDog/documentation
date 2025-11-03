---
aliases:
- /fr/tracing/guide/inferred-service-opt-in
further_reading:
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
title: Services déduits
---

## Section Overview

Datadog découvre automatiquement les dépendances d'un service instrumenté, telles que les bases de données, files d'attente ou API tierces, même si ces dépendances ne sont pas directement instrumentées. En analysant les requêtes sortantes des services instrumentés, Datadog déduit la présence de ces dépendances et collecte les métriques de performance associées.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Carte des dépendances de la page des services" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

Explorez les services déduits dans le [Software Catalog][1] en filtrant les entrées par type d'entité, comme une base de données, une file d'attente ou une API tierce. Chaque [page des services][2] est adaptée au type de service que vous analysez. Par exemple, les pages de services de base de données affichent des informations spécifiques à la base et incluent des données de surveillance si vous utilisez [Database Monitoring][3].

## Configurer les services déduits
{{< tabs >}}
{{% tab "Agent v7.60.0+" %}}
À partir de la version [7.60.0][1] de l'Agent Datadog, aucune configuration manuelle n'est nécessaire pour visualiser les services déduits. Les options requises (`apm_config.compute_stats_by_span_kind` et `apm_config.peer_tags_aggregation`) sont activées par défaut.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

Pour les versions de l'Agent Datadog allant de [7.55.1][1] à [7.59.1][2], ajoutez ce qui suit dans votre fichier de configuration `datadog.yaml` :

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config :
  compute_stats_by_span_kind : true
  peer_tags_aggregation : true

{{< /code-block >}}

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Si vous utilisez Helm, incluez ces variables d'environnement dans votre [fichier][3] `values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

Pour les versions de l'Agent Datadog allant de [7.50.3][1] à [7.54.1][2], ajoutez ce qui suit dans votre fichier de configuration `datadog.yaml` :

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config :
  compute_stats_by_span_kind : true
  peer_tags_aggregation : true
  peer_tags : ["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "cassandra.keyspace", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]

{{< /code-block >}}

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "cassandra.keyspace", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]".

{{< /code-block >}}

Si vous utilisez Helm, incluez ces variables d'environnement dans votre [fichier][3] `values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Pour OpenTelemetry Collector, la version minimale recommandée est `opentelemetry-collector-contrib` [v0.95.0][1] ou ultérieure. Dans ce cas, mettez à jour cette configuration :

{{< code-block lang="yaml"  collapsible="true" >}}

connecteurs :
  datadog/connecteur :
    traces :
      compute_stats_by_span_kind : true
      peer_tags_aggregation : true
      peer_tags : ["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]

{{< /code-block >}}

Si votre version de Collector est inférieure à v0.95.0, mettez à jour la configuration suivante de Collector :

{{< code-block lang="yaml" collapsible="true" >}}

exportateurs :
  datadog :
    traces :
      compute_stats_by_span_kind : true
      peer_tags_aggregation : true
      peer_tags : ["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]   

{{< /code-block >}}

**Exemple** : [collector.yaml][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## Nommer les entités inférées

Pour déterminer les noms et les types des dépendances de service déduites, Datadog utilise les attributs standard de span et les associe aux attributs `peer.*`. Par exemple, les API externes déduites utilisent le schéma de dénomination par défaut `net.peer.name`, comme `api.stripe.com`, `api.twilio.com` et `us6.api.mailchimp.com`. Les bases de données déduites utilisent le schéma de dénomination par défaut `db.instance`.

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

**Remarque** : les valeurs d'attribut peer qui correspondent à des adresses IP (par exemple, 127.0.0.1) sont modifiées et remplacées par `blocked-ip-address` afin d'éviter les données inutiles et de ne pas étiqueter les métriques avec des dimensions à forte cardinalité. En conséquence, certains services `blocked-ip-address` peuvent apparaître comme des dépendances en aval de vos services instrumentés.

#### Priorité des étiquettes peer

Pour attribuer un nom aux entités inférées, Datadog utilise un ordre de priorité spécifique entre les étiquettes peer, notamment lorsque les entités sont définies par une combinaison de plusieurs attributs.

Type d'entité | Ordre de priorité
-----------|----------------
Base de données | `peer.db.name` > `peer.aws.s3.bucket` (Pour AWS S3) / `peer.aws.dynamodb.table` (Pour AWS DynamoDB) / `peer.cassandra.contact.points` (Pour Cassandra) / `peer.couchbase.seed.nodes` (Pour Couchbase) > `peer.hostname` > `peer.db.system`
Queue | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (pour Kafka) / `peer.aws.sqs.queue` (pour AWS SQS) / `peer.aws.kinesis.stream` (pour AWS Kinesis) > `peer.messaging.system`
Service déduit | `peer.service` > `peer.rpc.service` > `peer.hostname`

Si l'attribut ayant la priorité la plus élevée, comme `peer.db.name`, n'est pas capturé par l'instrumentation, Datadog utilise l'attribut de priorité suivante (ex. `peer.hostname`), et ainsi de suite.

**Remarque** : Datadog ne définit jamais `peer.service` pour les bases de données et les files d'attente inférées. `peer.service` est l'attribut peer ayant la plus haute priorité. S'il est défini, il prévaut sur tous les autres attributs.

## Migrer vers la dénomination globale par défaut des services

Avec les services inférés, les dépendances sont automatiquement détectées à partir des attributs de span existants. Il n'est donc **pas nécessaire** de modifier les noms de service (via le tag `service`) pour identifier ces dépendances.

Activez la variable `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` pour vous assurer qu'aucune intégration Datadog ne définisse de noms de service différents du nom global par défaut. Cela améliore également la représentation des connexions service-à-service et des services déduits dans les visualisations Datadog, pour tous les langages et intégrations de bibliothèques de traçage pris en charge.

<div class="alert alert-danger">L'activation de cette option peut affecter les métriques APM existantes, les métriques personnalisées de span, l'analytique de trace, les filtres de rétention, les analyses de données sensibles, les monitors, les tableaux de bord ou les notebooks qui référencent les anciens noms de service. Mettez à jour ces éléments pour utiliser le tag global par défaut <code>service:&lt;DD_SERVICE&gt;</code>.</div>

Pour savoir comment supprimer les remplacements de service et migrer vers les services inférés, consultez le [guide sur les remplacements de service][4].

[1]: /fr/software_catalog/
[2]: /fr/tracing/services/service_page
[3]: /fr/database_monitoring/
[4]: /fr/tracing/guide/service_overrides
{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-info">La fonctionnalité des services déduits n'est pas activée par défaut dans votre datacenter. Veuillez remplir ce <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">formulaire</a> pour demander l'accès.</div>

{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}