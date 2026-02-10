---
title: Services déduits
description: "Découvrez automatiquement les dépendances des services comme les bases de données et les files d'attente grâce à l'analyse des requêtes sortantes."
aliases:
  - /tracing/guide/inferred-service-opt-in
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "En savoir plus sur les services dans Datadog"
---

## Présentation

Datadog découvre automatiquement les dépendances d'un service instrumenté, telles que les bases de données, les files d'attente ou les API tierces, même si cette dépendance n'a pas été directement instrumentée. En analysant les requêtes sortantes de vos services instrumentés, Datadog infère la présence de ces dépendances et collecte les métriques de performance associées.

...

...

Explorez les services inférés dans le [Catalogue de logiciels][1] en filtrant les entrées par type d'entité, comme base de données, file d'attente ou API tierce. Chaque [page de service][2] est adaptée au type de service que vous examinez. Par exemple, les pages de service de base de données montrent des informations spécifiques aux bases de données et incluent des données de surveillance des bases de données si vous utilisez [Surveillance des bases de données][3].

## Configurer les services déduits
{{< tabs >}} {{% tab "Agent v7.60.0+" %}} À partir de la version [7.60.0][1] de l'Agent Datadog, aucune configuration manuelle n'est nécessaire pour voir les services inférés. Les configurations requises—`apm_config.compute_stats_by_span_kind` et `apm_config.peer_tags_aggregation`—sont activées par défaut.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

...

Pour les versions de l'Agent Datadog [7.55.1][1] à [7.59.1][2], ajoutez ce qui suit à votre fichier de configuration `datadog.yaml` :

...

apm_config :
  compute_stats_by_span_kind : true
  peer_tags_aggregation : true

...

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

...

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true

...

Si vous utilisez Helm, incluez ces variables d'environnement dans votre `values.yaml` [fichier][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
...

Pour les versions de l'Agent Datadog [7.50.3][1] à [7.54.1][2], ajoutez ce qui suit à votre fichier de configuration `datadog.yaml` :

...

apm_config : compute_stats_by_span_kind : vrai peer_tags_aggregation : vrai peer_tags : \["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

...

Vous pouvez aussi définir ces variables d'environnement dans la configuration de votre Agent Datadog :

...

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='\["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "cassandra.keyspace", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]".

...

Si vous utilisez Helm, incluez ces variables d'environnement dans votre `values.yaml` [fichier][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
...

Pour le Collecteur OpenTelemetry, la version minimale recommandée est `opentelemetry-collector-contrib` [v0.95.0][1] ou ultérieure. Dans ce cas, mettez à jour cette configuration :

...

connecteurs :
  datadog/connecteur :
    traces :
      compute_stats_by_span_kind : true
      peer_tags_aggregation : true
      peer_tags : \["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]

...

Si votre version de Collector est inférieure à v0.95.0, mettez à jour la configuration suivante de Collector :

...

exportateurs :
  datadog :
    traces :
      compute_stats_by_span_kind : true
      peer_tags_aggregation : true
      peer_tags : \["_dd.base_service", "amqp.destination", "amqp.exchange", "amqp.queue", "aws.queue.name", "aws.s3.bucket", "bucketname", "db.cassandra.contact.points", "db.couchbase.seed.nodes", "db.hostname", "db.instance", "db.name", "db.namespace", "db.system", "grpc.host", "hostname", "http.host", "http.server_name", "messaging.destination", "messaging.destination.name", "messaging.kafka.bootstrap.servers", "messaging.rabbitmq.exchange", "messaging.system", "mongodb.db", "msmq.queue.path", "net.peer.name", "network.destination.name", "peer.hostname", "peer.service", "queuename", "rpc.service", "rpc.system", "server.address", "streamname", "tablename", "topicname"]   

...

\*\*Exemple** : \[collector.yaml]\[2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
...

## Nommer les entités inférées

Pour déterminer les noms et types des dépendances de service inférées, Datadog utilise des attributs de span standard et les mappe aux attributs `peer.*`. Par exemple, les API externes inférées utilisent le schéma de nommage par défaut `net.peer.name` comme `api.stripe.com`, `api.twilio.com` et `us6.api.mailchimp.com`. Les bases de données inférées utilisent le schéma de nommage par défaut `db.instance`. Vous pouvez renommer les entités inférées en créant [règles de renommage][5].

### Étiquettes Peer

Étiquette Peer | Attributs source
--------------------|-------------------
... | ...
... | ...
... | ...
... | ...
... | ...
... | ...
... | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
... | ...
... | ...
... | ...
... | ...
... | ...
... | ...
... | ...
... | ...

note Les valeurs d'attributs de pair qui correspondent aux formats d'adresse IP (par exemple, 127.0.0.1) sont modifiées et masquées avec `blocked-ip-address` pour éviter le bruit inutile et le balisage des métriques avec des dimensions à haute cardinalité. En conséquence, vous pouvez rencontrer certains `blocked-ip-address` services apparaissant comme des dépendances en aval de vos services instrumentés.

#### Priorité des étiquettes peer

Pour attribuer un nom aux entités inférées, Datadog utilise un ordre de priorité spécifique entre les étiquettes peer, notamment lorsque les entités sont définies par une combinaison de plusieurs attributs. 

Type d'entité | Ordre de priorité
-----------|----------------
Base de données | `peer.db.name` > `peer.aws.s3.bucket` (Pour AWS S3) / `peer.aws.dynamodb.table` (Pour AWS DynamoDB) / `peer.cassandra.contact.points` (Pour Cassandra) / `peer.couchbase.seed.nodes` (Pour Couchbase) > `peer.hostname` > `peer.db.system`
Queue | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (pour Kafka) / `peer.aws.sqs.queue` (pour AWS SQS) / `peer.aws.kinesis.stream` (Pour AWS Kinesis) > `peer.messaging.system`
Service déduit | `peer.service` > `peer.rpc.service` > `peer.hostname`

Si la balise de la plus haute priorité, comme `peer.db.name`, n'est pas capturée dans le cadre de l'instrumentation, Datadog utilise la balise de la deuxième plus haute priorité, comme `peer.hostname`, et continue dans cet ordre.

note Datadog ne définit jamais le `peer.service` pour les bases de données et les files d'attente inférées. `peer.service` est l'attribut de pair de la plus haute priorité. Si défini, il prend la priorité sur tous les autres attributs.

## Migrer vers la dénomination globale par défaut des services

Avec les services inférés, les dépendances de service sont automatiquement détectées à partir des attributs de span existants. En conséquence, changer les noms de service (en utilisant la balise `service`) n'est pas nécessaire pour identifier ces dépendances. 

Activez `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` pour vous assurer qu'aucune intégration Datadog ne définit des noms de service différents du nom de service global par défaut. Cela améliore également la façon dont les connexions de service à service et les services inférés sont représentés dans les visualisations Datadog, à travers tous les langages de bibliothèque de traçage et intégrations pris en charge.

<div class="alert alert-danger">Activer cette option peut avoir un impact sur les métriques APM existantes, les métriques de span personnalisées, l'analyse des traces, les filtres de rétention, les analyses de données sensibles, les moniteurs, les tableaux de bord ou les carnets qui font référence aux anciens noms de service. Mettez à jour ces actifs pour utiliser le tag de service par défaut global (<code>service:&lt;DD_SERVICE></code>).</div>

Pour savoir comment supprimer les remplacements de service et migrer vers les services inférés, consultez le \[guide sur les remplacements de service]\[4].

[1]: /software_catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/
[4]: /tracing/guide/service_overrides
[5]: /tracing/services/renaming_rules/

...
<div class="alert alert-info">La fonctionnalité des Services Inférés n'est pas disponible par défaut dans votre centre de données. Remplissez ce <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">formulaire</a> pour demander l'accès.</div>

...

## Pour aller plus loin

...
