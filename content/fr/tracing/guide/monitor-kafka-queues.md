---
further_reading:
- link: /tracing/trace_collection
  tags: Documentation
  text: Configurer la collecte de trace
- link: /integrations/kafka
  tags: Documentation
  text: Intégration de Kafka
- link: /data_streams/
  tags: Documentation
  text: Data Streams Monitoring
kind: guide
title: Surveiller des files d'attente de Kafka
---

## Présentation

Dans les pipelines basés sur les événements, la mise en file dʼattente et les technologies de streaming telles que Kafka sont essentielles au bon fonctionnement de vos systèmes. Lʼéchange fiable et rapide de messages entre des services peut être difficile à assurer en raison du grand nombre de technologies et dʼéquipes quʼun tel environnement implique. Lʼintégration de Kafka et la solution APM de Datadog permettent à votre équipe de surveiller la santé et lʼefficacité de votre infrastructure et de vos pipelines.

### L'intégration de Kafka

Visualisez les performances de votre cluster en temps réel corrélez les performances de Kafka avec le reste de vos applications en utilisant [l'intégration de Kafka de Datadog][1]. Datadog propose également une [intégration de MSK][2].

{{< img src="tracing/guide/monitor_kafka_queues/kafka_dashboard.png" alt="Dashboard de Kafka">}}

### Surveillance de flux de données

[La surveillance des flux de données de Datadog][3] propose une méthode standardisée permettant à vos équipes de mesurer la santé des pipelines et la latence de bout en bout des événements traversant votre système. La visibilité en profondeur proposée par la surveillance des flux de données vous permet de repérer précisément des producteurs, consommateurs ou files dʼattentes non fonctionnels entraînant des retards et des ralentissements dans le pipeline. Vous pouvez découvrir des problèmes compliqués liés au pipeline, comme des messages bloqués, des partitions surchargées ou des consommateurs hors ligne. Vous pouvez également collaborer efficacement au sein dʼéquipes travaillant sur des infrastructures ou des apps.

{{< img src="tracing/guide/monitor_kafka_queues/dash-2022-data-streams-compressed-blurb.mp4" alt="Démonstration de la surveillance d'un flux de données" video="true">}}

### Traces distribuées

Le tracing distribué de la solution APM vous permet de bénéficier d'une visibilité accrue sur les performances de vos services en mesurant le volume et la latence des requêtes. Créez des graphiques et des alertes pour surveiller les données de votre APM et visualisez l'activité d'une requête dans un flamegraph, comme dans l'exemple ci-dessous, afin de mieux comprendre les origines de la latence et des erreurs.

{{< img src="tracing/guide/monitor_kafka_queues/kafka_trace.png" alt="La span dʼun utilisateur de Kafka" >}}

La solution APM peut tracer automatiquement les requêtes entrantes et sortantes de clients Kafka. Cela signifie que vous pouvez recueillir des traces sans modifier votre code source. Datadog ajoute des en-têtes aux messages de Kafka afin de véhiculer le contexte de la trace entre le créateur et lʼutilisateur.

Vérifiez les bibliothèques Kafka qui sont compatibles dans nos [pages relatives à la compatibilité][4].

#### Configuration

Pour tracer des applications Kafka, Datadog trace les appels de production et de consommation dans le SDK Kafka. Ainsi, pour surveiller Kafka, vous devez simplement configurer la solution APM dans vos services. Consultez la [documentation relative à la collecte de trace dans lʼAPM][5] pour bien débuter avec la solution APM et le tracing distribué.

## Surveiller votre application dans la solution APM

Une configuration standard de Kafka montre une trace avec une span producer et une span consumer enfant. Tout travail générant une trace au niveau de la consommation est représenté par des spans enfants de la span consumer. Chaque span possède un ensemble de tags avec le préfixe `messaging`. Le tableau suivant décrit les tags que vous pouvez trouver dans des spans Kafka.

<div class="alert alert-info">
  <div class="alert-info">
    <div>Pour une compréhension plus globale des métadonnées de spans dans Datadog, lisez la section <a href="/tracing/trace_collection/tracing_naming_convention">Sémantique des tags de spans</a></strong>.</div>
  </div>
</div>

| **Nom**                         | **Type** | **Description**                                                                                                     |
|----------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | `Kafka`                                                                                                             |
| `messaging.destination`          | `string` | Le topic auquel le message est envoyé.                                                                                   |
| `messaging.destination_kind`     | `string` | `Queue`                                                                                                             |
| `messaging.protocol`             | `string` | Le nom du protocole de transport.                                                                                 |
| `messaging.protocol_version`     | `string` | La version du protocole de transport.                                                                              |
| `messaging.url`                  | `string` | La chaîne de connexion au système de messagerie.                                                                      |
| `messaging.message_id`           | `string` | La valeur utilisée par le système de messagerie comme identifiant du message. Cette valeur est représentée sous forme de chaîne.                     |
| `messaging.conversation_id`      | `string` | LʼID de conversation de la conversation à laquelle le message appartient, représenté par une chaîne.             |
| `messaging.message_payload_size` | `number` | La taille en octets de la charge utile du message sans compression.                                                              |
| `messaging.operation`            | `string` | Une chaîne identifiant le type de consommation du message. <br>Exemples : `send` (un message est envoyé à un producteur), `receive` (un message est reçu par un consommateur) ou `process` (un message précédemment reçu est traité par un consommateur).                                                                |
| `messaging.consumer_id`          | `string` | `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}` Si les deux sont présents.<br>`messaging.kafka.consumer_group` si ce nʼest pas le cas.                                                                                                                                                                |
| `messaging.kafka.message_key`    | `string` |  Les clés des messages dans Kafka servent à regrouper des messages similaires afin dʼassurer leur traitement sur la même partition.<br> Elles diffèrent des `messaging.message_id` car elles ne sont pas uniques.                                                                                                             |
| `messaging.kafka.consumer_group` | `string` |  Nom du groupe de consommateurs Kafka qui gère le message. Ne sʼapplique quʼaux consommateurs et non aux producteurs.
| `messaging.kafka.client_id`      | `string` |  ID de client du consommateur ou du producteur qui gère le message.                                               |
| `messaging.kafka.partition`      | `string` |  La partition à laquelle le message est envoyé.                                                                                  |
| `messaging.kafka.tombstone`      | `string` |  Une valeur booléenne qui est « true » si le message est une tombstone.                                                              |
| `messaging.kafka.client_id`      | `string` |  ID de client du consommateur ou du producteur qui gère le message.                                               |

## Cas particuliers

{{< tabs >}}

{{% tab "Java" %}}

L'intégration de Kafka de Datadog fonctionne avec Kafka version 0.11+, qui prend en charge l'API Header. Cette API est utilisée pour injecter et extraire le contexte de tracing. Si vous utilisez un environnement à versions mixtes, le broker Kafka peut transmettre la version la plus récente de Kafka par erreur, et le traceur tente alors d'injecter des en-têtes qui ne sont pas pris en charge par le producer local. En outre, les consommateurs plus anciens ne sont pas en mesure de consommer le message à cause de la présence des en-têtes. Pour éviter ces problèmes, si vous utilisez un environnement Kafka à versions mixtes avec des versions antérieures à 0.11, désactivez la propagation du contexte avec la variable d'environnement suivante : `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

{{% /tab %}}

{{% tab ".NET" %}}

La [documentation client relative à Kafka .NET][1] stipule quʼune application client typique de Kafka est conçue autour dʼune boucle de consommation, qui appelle la méthode Consume de façon répétée pour récupérer les entrées individuellement. La méthode `Consume`  récupère des messages dans le système. Ainsi, la span consumer est crée par défaut lorsquʼun message est renvoyé et fermé avant de consommer le message suivant. La durée de la span représente donc le calcul effectué entre la consommation dʼun message et celle du suivant.

Lorsquʼun message nʼest pas entièrement traité avant de consommer le suivant, ou lorsque plusieurs messages sont consommés simultanément, vous pouvez indiquer `false` pour `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` dans votre application de consommation. Lorsque `false` est défini pour ce réglage, la span consumer est créée et immédiatement fermée. Si vous possédez des spans enfants à tracer, consultez la [documentation relative à lʼextraction et à lʼinjection des en-têtes pour lʼinstrumentation personnalisée .NET][2] pour extraire le contexte de la trace.

Le traceur .NET permet de tracer Confluent.Kafka depuis la version [v1.27.0][3]. LʼAPI de propagation de contexte de trace est disponible depuis la version [v2.7.0][4].

[1]: https://docs.confluent.io/kafka-clients/dotnet/current/overview.html#the-consume-loop
[2]: /fr/tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.27.0
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.7.0
{{% /tab %}}

{{% tab "Ruby" %}}

Lʼintégration de Kafka permet de tracer le gem `ruby-kafka`. Consultez la [documentation relative au traceur de Ruby][1] pour lʼactiver.

[1]: /fr/tracing/trace_collection/dd_libraries/ruby/#kafka
{{% /tab %}}

{{< /tabs >}}

### Désactiver le tracing pour Kafka

Si vous souhaitez désactiver le tracing de Kafka pour une application, indiquez la valeur `false` pour `DD_TRACE_KAFKA_ENABLED`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/kafka
[2]: /fr/integrations/amazon_msk/
[3]: https://app.datadoghq.com/data-streams/onboarding
[4]: /fr/tracing/trace_collection/compatibility/
[5]: /fr/tracing/trace_collection/