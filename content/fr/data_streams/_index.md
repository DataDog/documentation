---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /integrations/amazon_sqs/
  tag: Documentation
  text: Intégration Amazon SQS
- link: /tracing/service_catalog/
  tag: Documentation
  text: Catalogue des services
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: Blog
  text: Suivez et améliorez les performances de vos pipelines de données en streaming
    avec la solution Data Streams Monitoring de Datadog
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: Blog
  text: Dépanner des pipelines de diffusion de données directement depuis la solution
    APM avec Data Streams Monitoring de Datadog
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: Blog
  text: Surveiller SQS avec Data Streams Monitoring
title: Data Streams Monitoring
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

La solution Data Streams Monitoring permet aux équipes d'analyser et de gérer leurs pipelines à grande échelle via un outil centralisé. Vous pourrez ainsi facilement :
* Analyser la santé des pipelines en mesurant les latences de bout en bout des événements qui transitent par votre système.
* Identifier les producteurs, les consommateurs et les files d'attente défectueux, puis visualiser les logs ou clusters associés pour accélérer le dépannage.
* Empêcher les ralentissements en cascade en offrant aux propriétaires de services les outils dont ils ont besoin pour empêcher les événements en retard de surcharger les services en aval.

## Configuration

Pour commencer, suivez les instructions d'installation pour configurer Data Streams Monitoring sur vos services :

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

| Runtime | Technologies prises en charge |
|---|----|
| Java/Scala | Kafka (auto-hébergé, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, HTTP, gRPC, Amazon SQS |
| Python | Kafka (auto-hébergé, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, Amazon SQS |
| .NET | Kafka (auto-hébergé, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, Amazon SQS |
| Node.js | Kafka (auto-hébergé, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, Amazon SQS |
| Go | Toutes (avec l'[instrumentation manuelle][1]) |

## Explorer Data Streams Monitoring

### Mesurez la santé de vos pipelines de bout en bout avec de nouvelles métriques

Une fois Data Streams Monitoring configuré, vous pouvez mesurer le temps que mettent généralement vos événements pour passer d'un point à l'autre de votre système asynchrone :

| Nom de la métrique | Tags notables | Rôle |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | Latence de bout en bout d'un chemin entre une source spécifiée et un service de destination. |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Délai mesuré entre le producteur et le consommateur, en secondes. Nécessite l'Agent Java v1.9.0 ou une version ultérieure. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | Débit entrant et sortant en octets|


Vous pouvez également représenter graphiquement et visualiser ces métriques sur n'importe quel dashboard ou notebook :

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Monitor de la solution Data Streams Monitoring de Datadog" style="width:100%;" >}}

### Surveiller la latence de bout en bout d'un chemin

En fonction de la façon dont les événements transitent par votre système, certains chemins peuvent entraîner une latence plus élevée. Utilisez l'onglet [**Measure**][7] pour sélectionner un service de début et de fin pour obtenir des informations sur la latence de bout en bout, de façon à identifier les goulots d'étranglement et optimiser les performances. Vous pouvez facilement créer un monitor dédié à ce chemin ou exporter les données vers un dashboard.

Vous pouvez aussi cliquer sur un service pour ouvrir un volet latéral détaillé et consulter lʼonglet **Pathways** pour vérifier la latence entre le service et les services en amont.

### Alerte sur les ralentissements dans les applications pilotées par des événements

Les ralentissements causés par des retards des consommateurs ou des messages trop anciens peuvent entraîner des défaillances en cascade et augmenter la fréquence des temps dʼarrêt. Grâce aux alertes prêtes à l'emploi, vous pouvez localiser les goulets d'étranglement dans vos pipelines et réagir immédiatement. Pour obtenir des métriques supplémentaires, Datadog propose des intégrations supplémentaires pour les technologies de file d'attente de messages telles que [Kafka][4] et [SQS][5].

Grâce aux moniteurs recommandés et prêts à l'emploi de Data Stream Monitoring, vous pouvez configurer en un clic des moniteurs sur des métriques tels que les retards des utilisateurs, le débit et la latence. 

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Monitors recommandés de la solution Data Streams Monitoring de Datadog" style="width:100%;" caption="Cliquez sur 'Add Monitors and Synthetic Tests' pour consulter les monitors recommandés" >}}

### Attribuez des messages entrants à une file d'attente, un service ou un cluster

Un délai important sur un service consommateur, une utilisation accrue des ressources sur un broker Kafka ou une augmentation de la taille d'une file d'attente RabbitMQ ou Amazon SQS s'explique souvent par des changements dans la manière dont les services adjacents produisent ou consomment auprès de ces entités.

Cliquez sur lʼonglet **Throughput** de n'importe quel service ou file d'attente dans Data Streams Monitoring pour détecter rapidement les changements de débit, et de quel service en amont ou en aval ces changements proviennent. Une fois que le [catalogue des services][2] est configuré, vous pouvez immédiatement pivoter vers le canal Slack de l'équipe correspondante ou vers l'ingénieur de garde.

En affichant les données propres à un certain cluster Kafka, RabbitMQ ou Amazon SQS, vous pouvez détecter les variations du trafic entrant ou sortant pour l'ensemble des sujets ou files d'attente détectés sur le cluster en question :

### Visualisez rapidement les données d'infrastructure, de logs ou de traces associées pour identifier la cause fondamentale

Datadog associe automatiquement l'infrastructure de vos services et les logs connexes via le [tagging de service unifié][3], vous permettant ainsi d'identifier facilement les goulots d'étranglement. Cliquez sur l'onglet **Infra**, **Logs** ou **Traces** pour approfondir votre enquête et tenter de comprendre pourquoi la latence d'un chemin ou le délai d'un consommateur a augmenté.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_streams/go#manual-instrumentation
[2]: /fr/tracing/service_catalog/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/integrations/kafka/
[5]: /fr/integrations/amazon_sqs/
[6]: /fr/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure