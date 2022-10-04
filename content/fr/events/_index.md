---
aliases:
- /fr/guides/eventcorrelation/
- /fr/guides/markdown/
- /fr/graphing/event_stream/
further_reading:
- link: /api/v1/events/
  tag: Documentation
  text: API d'événements Datadog
kind: documentation
title: Événements
---

{{< img src="events/events-overview.png" alt="Events Explorer" >}}

## Prise en main

Les _événements_ correspondent à des entrées signalant des modifications importantes en lien avec la gestion et le dépannage des opérations IT. Ils concernent par exemple les déploiements de code, la santé des services, les changements de configuration ou les alertes de surveillance.

Les événements Datadog sont consolidés au sein d'une interface unique vous permettant de les rechercher, les analyser et les filtrer depuis n'importe quelle source.

Datadog recueille automatiquement les événements recueillis par l'Agent et les intégrations installées, sans qu'aucune configuration supplémentaire ne soit requise.

La collecte d'événements est prise en charge par plus d'une centaine d'intégrations Datadog, notamment [Kubernetes][1], [Docker][2], [Jenkins][3], [Chef][4], [Puppet][5], [AWS ECS][6] ou [AWS Auto Scaling][7], [Sentry][8] et [Nagios][9]. 

## Envoyer des événements personnalisés à Datadog

Vous pouvez également envoyer vos propres événements personnalisés à l'aide de l'[API Datadog][10], de [checks d'Agent custom][11], de [DogStatsD][12] ou de l'[API d'e-mail pour les événements][13].

## Explorer les événements Datadog

### Flux d'événements

Le flux d'événements Datadog offre un apercu instantané des événements de votre infrastructure et de vos services. Il vous permet de résoudre des problèmes actuels ou passés.

Le flux d'événements affiche les événements les plus récents générés par votre infrastructure ainsi que les monitors associés.

{{< img src="events/the-event-stream.jpg" alt="Le flux d'événements" >}}

### Events Explorer et analyses

<div class="alert alert-warning">L'Events Explorer et les fonctionnalités répertoriées ci-dessous ont été mis à disposition de tous les clients au premier trimestre 2022.</div>

L'[Events Explorer][14] vous permet d'agréger et de visualiser les événements reçus par Datadog. Vous pouvez regrouper ou filtrer des événements en fonction d'un attribut et les représenter sur un graphique avec les [outils d'analyse d'événements][15]. Grâce à la [syntaxe de requête][16], il est même possible de filtrer des événements à l'aide d'opérateurs booléens et de wildcards.

{{< img src="events/events-explorer.mp4" alt="Tri d'événements en fonction d'attributs et exploration d'analyse" video=true >}}

### Événements en tant que source dans les widgets de dashboard

Vous pouvez configurer une source de données correspondant à vos événements dans les [widgets de graphique][17], afin de créer des séries temporelles, des tableaux et des top lists à partir de vos requêtes de recherche d'événements.

{{< img src="events/events-dashboard.mp4" alt="Un widget de graphique utilisant une source basée sur des événements" video=true >}}

Par exemple, le dashboard [Monitor Notifications Overview][18] permet d'analyser les tendances des événements d'alerte de monitor afin de vous aider à améliorer votre configuration et à réduire les alertes superflues.

### Générer des métriques custom à partir d'événements

[Générez des métriques][3] avec une période de rétention de 15 mois à partir de n'importe quelle requête de recherche d'événements pour créer des monitors et des alertes basés sur des événements historiques.

{{< img src="events/generate-metrics.png" alt="Image de métriques avec la requête de recherche d'événements." >}}

### Normaliser et enrichir des événements avec des pipelines de traitement

Un _processeur_ exécute des opérations de structuration de données sur les attributs des événements au moment de leur ingestion. Un _pipeline_ regroupe un ou plusieurs processeurs, qui sont exécutés l'un après l'autre. Les pipelines de traitement d'événements vous permettent d'accomplir ce qui suit :

- Normaliser des sources d'événements distinctes, en remappant des attributs. Vous pouvez par exemple utiliser les mêmes [tags de service][19] réservés pour tous vos événements.
- Enrichir des événements avec des données externes stockées dans un [tableau de référence][20] (version bêta). Vous pouvez par exemple mapper un nom de service au répertoire de votre service, de façon à ajouter aux événements des informations sur l'équipe à qui appartient l'événement, des liens vers des dashboards ou encore des références à une documentation.

Datadog prévoit de prendre en charge un nombre croissant de types de processeurs. Pour en savoir plus, [contactez l'assistance][21].

[En savoir plus sur les pipelines de traitement][22].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/agent/kubernetes/#event-collection
[2]: /fr/agent/docker/#events
[3]: /fr/integrations/jenkins/#events
[4]: /fr/integrations/chef/#report-handler
[5]: /fr/integrations/puppet/#events
[6]: /fr/integrations/amazon_ecs/#events
[7]: /fr/integrations/amazon_auto_scaling/#events
[8]: /fr/integrations/sentry/
[9]: /fr/integrations/nagios/#events
[10]: /fr/api/latest/events/#post-an-event
[11]: /fr/events/guides/agent/
[12]: /fr/events/guides/dogstatsd/
[13]: /fr/events/guides/email/
[14]: /fr/events/explorer/
[15]: /fr/events/explorer/#event-analytics
[16]: /fr/logs/explorer/search_syntax/
[17]: /fr/dashboards/widgets/alert_graph/
[18]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[19]: /fr/getting_started/tagging/unified_service_tagging/
[20]: /fr/logs/guide/reference-tables/
[21]: /fr/help/
[22]: /fr/logs/log_configuration/processors/