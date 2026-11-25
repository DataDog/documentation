---
aliases:
- /fr/service_management/events/usage
- /fr/service_management/events/guides/usage/
further_reading:
- link: /logs/log_configuration/processors/
  tag: Documentation
  text: En savoir plus sur les pipelines de traitement
- link: /events/explorer/
  tag: Documentation
  text: Effectuez le triage des événements avec Events Explorer
title: Utilisation d'Events
---
## Métriques personnalisées {#custom-metrics}

[Générez des métriques][5] avec une rétention de 15 mois à partir de n'importe quelle requête de recherche d'événements pour créer et surveiller des événements historiques et des alertes. Les événements ingérés avec un horodatage datant de moins de 20 minutes sont pris en compte pour l'agrégation. Pour plus d'informations, consultez [Event Analytics][6].

{{< img src="events/guides/usage/generate-metrics.png" alt="Image de métriques avec la requête de recherche d'événements." >}}

## Exemples de ce qu'il est possible de faire avec les événements {#examples-of-what-to-do-with-events}

### Fonctionnalités de triage {#triage-features}

Utilisez l'[Events Explorer][7] pour agréger et visualiser les événements entrant dans Datadog. Groupez ou filtrez les événements par attribut et représentez-les graphiquement avec Event Analytics. Utilisez la syntaxe de recherche de requête pour filtrer les événements à l'aide d'opérateurs booléens et de caractères génériques.

### Dashboards {#dashboards}

{{< img src="events/guides/usage/events-dashboard.mp4" alt="Un widget graphique qui utilise des événements comme source" video=true >}}

Vous pouvez utiliser des événements comme source de données dans les [widgets graphiques][8] pour créer des widgets de séries temporelles, de tableaux et de type Top List à partir de vos requêtes de recherche d'événements. Par exemple, le tableau de bord [Monitor Notifications Overview][9] analyse les tendances des événements d'alerte de monitor pour vous aider à améliorer votre configuration et à réduire la fatigue liée aux alertes.

#### Superpositions {#overlays}

{{< img src="events/guides/usage/event_overlays.png" alt="Option pour afficher les superpositions d'événements sur un exemple de tableau de bord" style="width:100%;" >}}

Les superpositions affichent les événements correspondants par-dessus vos graphiques. Utilisez la fonctionnalité [Event Overlays][10] du tableau de bord pour déterminer si un changement récent provoque des problèmes de performance dans votre application ou vos services et trouver la source du problème. 

### Créer un monitor {#create-a-monitor}

Envoyez des alertes et des notifications de monitor en fonction des requêtes portant sur des événements significatifs. Pour configurer une alerte, consultez la documentation du [Event Monitor][11].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/settings/pipelines
[4]: /fr/help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /fr/events/explorer/analytics
[7]: /fr/events/explorer/
[8]: /fr/dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /fr/dashboards/change_overlays/
[11]: /fr/monitors/types/event/