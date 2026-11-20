---
description: Simplifiez le dépannage avec Change Tracking en surveillant les déploiements,
  les feature flags, les modifications de configuration et les autres changements
  apportés à vos services.
further_reading:
- link: https://www.datadoghq.com/blog/change-tracking/
  tag: Blog
  text: Unifiez la visibilité sur les changements apportés à vos services et dépendances
- link: https://www.datadoghq.com/blog/ai/investigate-production-alerts/
  tag: Blog
  text: Apprendre à un modèle 9B à enquêter sur les alertes de production
- link: /monitors/status/
  tag: Documentation
  text: Page d'état du monitor
- link: /dashboards/
  tag: Documentation
  text: Dashboards
- link: /tracing/services/service_page/
  tag: Documentation
  text: Page Service
title: Change Tracking
---
## Présentation {#overview}

Change Tracking simplifie le dépannage et la réponse aux incidents en mettant en évidence les changements pertinents apportés à votre service et à ses dépendances, ce qui permet de détecter et de résoudre les problèmes plus rapidement.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="Les détails d'un changement sur la chronologie Recent Changes dans le résumé du service" style="width:100%;" >}}

Change Tracking permet de surveiller différents types de modifications apportées à votre service et à ses dépendances, notamment :
- Déploiements
- Feature Flags
- Pics de trafic
- Modifications de configuration
- Modifications de base de données
- Modifications de schéma
- Ajustements d'échelle
- Ajustements Kubernetes
- Plantages de pods Kubernetes
- Alertes Watchdog

Pour plus de détails sur les types de changements pris en charge et les exigences de configuration, consultez [Types de changements suivis][16].

## Utilisation de Change Tracking {#using-change-tracking}

Change Tracking est disponible sur plusieurs pages de Datadog :

### Page d'état du monitor {#monitor-status-page}

Affichez et analysez les changements depuis la [page d'état du monitor][1].

{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Change Tracking affiché sur la page d'état du monitor" style="width:100%;" >}}

#### Prérequis {#prerequisites}

Pour utiliser Change Tracking sur la page d'état du monitor, assurez-vous que le service concerné a été :
- Spécifié dans la requête du monitor.
- Sélectionné dans le cadre d'un groupe.
- Ajouté au monitor sous forme de tag `service`.

#### Pour analyser les changements depuis la page d'état du monitor : {#to-analyze-changes-from-the-monitor-status-page}

1. Accédez à la page d'état du monitor que vous analysez.
1. Localisez la chronologie de Change Tracking en haut de la page.
   - Pour les monitors comportant plusieurs graphiques (déterminés par le group by dans la requête du monitor), filtrez les résultats pour n'afficher qu'un seul groupe.
1. Utilisez la chronologie avec les graphiques d'événements pour corréler les événements de changement avec l'alerte.
1. Cliquez sur l'indicateur de changement dans la chronologie pour afficher plus de détails sur le changement dans le panneau latéral.
1. Dans le panneau latéral, vous pouvez examiner le changement plus en détail et effectuer les actions suivantes :
   - Affichez le déploiement dans votre système CI/CD.
   - Affichez les derniers commits dans votre dépôt.
   - Comparez les changements entre les déploiements pour identifier les problèmes potentiels.
   - Configurez des liens personnalisés supplémentaires dans le panneau latéral de déploiement pour accéder rapidement à d'autres ressources pertinentes pour vous.

### Services {#services}

Affichez et analysez les changements depuis la [page de service][2].

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="Composant Recent Changes dans la section Service Summary, avec les changements apportés aux dépendances affichés" style="width:100%;" >}}

#### Pour analyser les changements depuis la page du service : {#to-analyze-changes-from-the-service-page}

1. Accédez à la page du service que vous souhaitez examiner.
1. Localisez la chronologie des changements dans la section {{< ui >}}Service Summary{{< /ui >}}.
1. Utilisez les onglets du service et des dépendances pour afficher, au choix :
   - Les changements limités au service concerné ({{< ui >}}Changes by Service{{< /ui >}})
   - Les changements apportés au service concerné et aux services dont il dépend, susceptibles d'avoir un impact sur ce service ({{< ui >}}Changes by Service + Dependencies{{< /ui >}})
1. Cliquez sur l'indicateur de changement pour afficher des informations détaillées et prendre des mesures correctives.

### Dashboards {#dashboards}

Affichez et analysez les changements depuis n'importe quel [dashboard][3].

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Change Tracking affiché sur le Dashboard" style="width:100%;" >}}

#### Prérequis {#prerequisites-1}
Pour voir les changements pertinents dans la chronologie et sous forme de superpositions sur votre dashboard, assurez-vous d'avoir configuré au moins un widget de série temporelle.

#### Pour analyser les changements depuis les dashboards : {#to-analyze-changes-from-dashboards}

1. Accédez à votre dashboard.
2. Cliquez sur {{< ui >}}Show Overlays{{< /ui >}} en haut de la page pour activer la chronologie des changements et les superpositions de changements sur les widgets pris en charge.
3. Survolez un indicateur ou une superposition de changement pour afficher un résumé du changement.
4. Cliquez sur l'indicateur ou la superposition de changement pour afficher des informations détaillées et prendre des mesures correctives.

### Widgets {#widgets}

En plus des intégrations prêtes à l'emploi, Change Tracking est disponible comme source de données pour les widgets dans Datadog, notamment dans Dashboards et Notebooks.

{{< img src="/change_tracking/change-tracking-datasource-examples.png" alt="Exemples de sources de données Change Tracking" style="width:100%;" >}}

Pour configurer un widget à l'aide des données de Change Tracking :

1.	Dans un dashboard ou un notebook, ajoutez ou modifiez un type de widget pris en charge (série temporelle, valeur de requête, tableau, treemap, top list, graphique à secteurs, évolution ou graphique à barres).
3.	Depuis le menu déroulant {{< ui >}}data source{{< /ui >}}, sélectionnez {{< ui >}}Change Tracking{{< /ui >}}.
4.	Configurez vos filtres ({{< ui >}}Service{{< /ui >}} est requis).
5.	(Facultatif) Pour les widgets qui prennent en charge le regroupement, utilisez {{< ui >}}Group by{{< /ui >}} pour répartir les résultats.

{{< img src="/change_tracking/change-tracking-datasource-edit-widget.png" alt="Widgets utilisant la source de données Change Tracking" style="width:100%;" >}}

Pour les widgets Timeseries, vous pouvez également activer Change Tracking en tant que {{< ui >}}Event Overlay{{< /ui >}}, ce qui affiche les changements par-dessus les séries temporelles afin de les corréler avec le comportement des métriques.

{{< img src="/change_tracking/change-tracking-datasource-edit-overlay.png" alt="Source de données Change Tracking en tant qu'Event Overlay" style="width:100%;" >}}


#### Afficher les détails du changement {#view-change-details}

Pour afficher des informations sur un changement ou un ensemble de changements, cliquez sur un point de données dans le widget et sélectionnez {{< ui >}}View Changes{{< /ui >}}. Cela ouvre le panneau latéral Change Tracking avec des détails supplémentaires.

## Types de changements que vous pouvez suivre {#change-types-you-can-track}

Change Tracking couvre les déploiements, les feature flags, les changements apportés aux bases de données, le comportement du streaming et des applications, les changements d'infrastructure et tous les changements personnalisés que vous envoyez vous-même.

Pour obtenir la liste complète des types de changements, la fonctionnalité Datadog dont chacun provient et les conditions nécessaires pour activer chacun d'eux, consultez [Types de changements suivis][16].
  

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/status/
[2]: /fr/tracing/services/service_page/
[3]: /fr/dashboards/
[4]: /fr/tracing/services/deployment_tracking/
[5]: /fr/integrations/launchdarkly/#feature-flag-tracking-integration/
[6]: /fr/api/latest/events/
[7]: /fr/watchdog/
[8]: /fr/database_monitoring/
[9]: /fr/data_streams/
[10]: /fr/database_monitoring/connect_dbm_and_apm/
[11]: /fr/actions/connections/#work-with-connections
[12]: /fr/database_monitoring/schema_explorer
[13]: /fr/infrastructure/resource_catalog/resource_changes/
[15]: /fr/tracing
[16]: /fr/change_tracking/change_types/