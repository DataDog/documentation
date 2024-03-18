---
further_reading:
- link: /logs/log_configuration/processors/
  tag: Documentation
  text: En savoir plus sur les pipelines de traitement
- link: /service_management/events/explorer/
  tag: Documentation
  text: Trier les événements avec l'Events Explorer
kind: Documentation
title: Utiliser des événements
---

## Enrichissement et normalisation

Un _processeur_ exécute des opérations de structuration de données sur les attributs des événements au moment de leur ingestion. Un _pipeline_ regroupe un ou plusieurs processeurs, qui sont exécutés l'un après l'autre. Les pipelines de traitement d'événements vous permettent d'accomplir ce qui suit :

- Normaliser des sources d'événements distinctes, en remappant des attributs. Vous pouvez par exemple utiliser les mêmes [tags de service][1] réservés pour tous vos événements.
- Enrichir des événements avec des données externes stockées dans un [tableau de référence][2] (version bêta). Vous pouvez par exemple mapper un nom de service au répertoire de votre service, de façon à ajouter aux événements des informations sur l'équipe à qui appartient l'événement, des liens vers des dashboards ou encore des références à une documentation.

Pour ajouter et configurer des pipelines de traitement d'événements, consultez l'onglet **[Enrichir et normaliser][3]**d'Event Management. Si vous avez besoin d'aide supplémentaire, contactez l'[assistance][4] Datadog.

## Métriques custom

[Générez des métriques][5] avec une période de rétention de 15 mois à partir de n'importe quelle requête de recherche d'événements pour créer et surveiller des événements historiques ainsi que des alertes. Consultez la section sur l'[analyse d'événements][6] pour en savoir plus.

{{< img src="service_management/events/usage/generate-metrics.png" alt="Image de métriques avec la requête de recherche d'événements." >}}

## Exemples d'actions possibles avec les événements

### Fonctionnalités de triage

L'[Events Explorer][7] vous permet d'agréger et de visualiser les événements reçus par Datadog. Vous pouvez regrouper ou filtrer des événements en fonction d'un attribut et les représenter sur un graphique avec les outils d'analyse d'événements. Grâce à la syntaxe de recherche de requête, il est même possible de filtrer des événements à l'aide d'opérateurs booléens et de wildcards.

### Dashboards

{{< img src="service_management/events/usage/events-dashboard.mp4" alt="Un widget de graphique utilisant une source basée sur des événements" video=true >}}

Dans les [widgets de graphique][8], vous pouvez utiliser une source de données basée sur des événements afin de créer des widgets de vos requêtes de recherche d'événements sous forme de séries temporelles, de tableaux et de top lists. Par exemple, le dashboard [Monitor Notifications Overview][9] permet d'analyser les tendances des événements d'alerte de monitor afin de vous aider à améliorer votre configuration et à réduire les alertes superflues.

#### Superpositions

{{< img src="service_management/events/usage/event_overlays.png" alt="Option d'affichage des superpositions d'événements sur un exemple de dashboard" style="width:100%;" >}}

Les superpositions permettent de visualiser les événements correspondants sur vos graphiques. Utilisez la fonction de [superposition des événements][10] du dashboard pour déterminer à quel moment une modification récente a entraîné des problèmes de performance au sein de votre application ou de vos services et identifier la source du problème.

### Créer un monitor

Envoyez des alertes et notifications de monitors en fonction de requêtes d'événements importantes. Pour configurer une alerte, consultez la documentation relative au [monitor d'événements][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/pipelines
[4]: /fr/help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /fr/service_management/events/explorer/analytics
[7]: /fr/service_management/events/explorer/
[8]: /fr/dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /fr/dashboards/change_overlays/
[11]: /fr/monitors/types/event/