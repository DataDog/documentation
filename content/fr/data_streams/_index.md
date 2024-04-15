---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /tracing/service_catalog/
  tag: Documentation
  text: Service Catalog
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: Blog
  text: Suivez et améliorez les performances de vos pipelines de données en streaming
    avec la solution Data Streams Monitoring de Datadog

title: Data Streams Monitoring
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

{{< img src="data_streams/data_streams_hero_feature.jpg" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

La solution Data Streams Monitoring permet aux équipes d'analyser et de gérer leurs pipelines à grande échelle via un outil centralisé. Vous pourrez ainsi facilement :
* Analyser la santé des pipelines en mesurant les latences de bout en bout des événements qui transitent par votre système.
* Identifier les producteurs, les consommateurs et les files d'attente défectueux, puis visualiser les logs ou clusters associés pour accélérer le dépannage.
* Empêcher les ralentissements en cascade en offrant aux propriétaires de services les outils dont ils ont besoin pour empêcher les événements en retard de surcharger les services en aval.

## Implémentation

Pour commencer, suivez les instructions d'installation pour configurer Data Streams Monitoring sur vos services :

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

| Runtime | Technologies prises en charge |
|---|----|
| Java | Kafka (auto-hébergé, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, HTTP, gRPC |
| .NET | Kafka (auto-hébergé, Amazon MSK, Confluent Cloud / Platform), RabbitMQ |
| Python | Kafka (auto-hébergé, Amazon MSK, Confluent Cloud / Platform) |
| Go | Toutes (avec l'[instrumentation manuelle][1]) |


## Explorer Data Streams Monitoring

### Mesurez la santé de vos pipelines de bout en bout avec de nouvelles métriques

Une fois Data Streams Monitoring configuré, vous pouvez mesurer le temps que mettent généralement vos événements pour passer d'un point à l'autre de votre système asynchrone :

| Nom de la métrique | Tags notables | Description |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | Latence de bout en bout d'un chemin entre une source spécifiée et un service de destination |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | Délai mesuré entre le producteur et le consommateur, en secondes. Nécessite l'Agent Java v1.9.0 ou une version ultérieure. |

Vous pouvez également représenter graphiquement et visualiser ces métriques sur n'importe quel dashboard ou notebook :

{{< img src="data_streams/data_streams_monitor.jpg" alt="Monitor Datadog Data Streams Monitoring" style="width:100%;" >}}

### Surveiller la latence de bout en bout d'un chemin

En fonction de la façon dont les événements transitent par votre système, certains chemins peuvent entraîner une latence plus élevée. Utilisez l'onglet **Pathways** pour visualiser la latence entre deux points de votre choix parmi vos pipelines, tels que des files d'attente, des producteurs ou des consommateurs, de façon à identifier les goulots d'étranglement et optimiser les performances. Vous pouvez facilement créer un monitor dédié à un chemin ou exporter les données vers un dashboard.

{{< img src="data_streams/data_streams_pathway.jpg" alt="Onglet Pathway de la solution Data Streams Monitoring de Datadog" style="width:100%;" >}}

### Attribuez des messages entrants à une file d'attente, un service ou un cluster

Un délai important sur un service consommateur, une utilisation accrue des ressources sur un broker Kafka ou une augmentation de la taille d'une file d'attente RabbitMQ s'explique souvent par des changements dans la manière dont les services adjacents produisent ou consomment auprès de ces entités.

Cliquez sur l'onglet **Throughput** à partir d'un service ou d'une file d'attente dans Data Streams Monitoring pour identifier rapidement les variations de débits, ainsi que le service en amont ou en aval qui en est à l'origine. Si vous avez configuré le [Service Catalog][2], vous pouvez instantanément accéder au canal Slack de l'équipe concernée ou à l'ingénieur d'astreinte.

En affichant les données propres à un certain cluster Kafka ou RabbitMQ, vous pouvez détecter les variations du trafic entrant ou sortant pour l'ensemble des topics ou files d'attente détectés sur le cluster en question :

{{< img src="data_streams/data_streams_throughput.jpg" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

### Visualisez rapidement les données d'infrastructure, de logs ou de traces associées pour identifier la cause fondamentale

Datadog associe automatiquement l'infrastructure de vos services et les logs connexes via le [tagging de service unifié][3], vous permettant ainsi d'identifier facilement les goulots d'étranglement. Cliquez sur l'onglet **Infra** ou **Logs** pour approfondir votre enquête et tenter de comprendre pourquoi la latence d'un chemin ou le délai d'un consommateur a augmenté. Pour visualiser les traces au sein de vos chemins, cliquez sur l'onglet **Processing Latency**.

{{< img src="data_streams/data_streams_infra.jpg" alt="Onglet Infra de la solution Data Streams Monitoring de Datadog" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_streams/go#manual-instrumentation
[2]: /fr/tracing/service_catalog/
[3]: /fr/getting_started/tagging/unified_service_tagging
