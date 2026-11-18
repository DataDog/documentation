---
aliases:
- /fr/journey_monitoring/uptime/
description: Inspectez les performances de chaque parcours avec un rapport détaillé
  combinant les données de Product Analytics, Real User Monitoring, Synthetic Monitoring
  & Testing et Session Replay.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/map/
  tag: Documentation
  text: En savoir plus sur la carte
- link: /journey_monitoring/suggested_journeys/
  tag: Documentation
  text: En savoir plus sur les parcours suggérés
- link: /journey_monitoring/variants/
  tag: Documentation
  text: En savoir plus sur les variantes de parcours
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: Blog
  text: Surveillez les performances des étapes critiques des parcours utilisateur
    avec des opérations RUM
title: Rapport détaillé du parcours
---
## Présentation {#overview}

Le rapport détaillé du parcours combine les données de comportement des utilisateurs et de performance technique issues de [Product Analytics][3], [Session Replay][4], [Real User Monitoring (RUM)][1] et [Synthetic Monitoring & Testing][2].

{{< img src="journey_monitoring/journey-monitoring-details-report-2.png" alt="Le rapport détaillé de Journey Monitoring présentant les indicateurs clés de performance, les données sur le comportement des utilisateurs et les mesures de performance technique d'un parcours spécifique." style="width:100%;" >}}

### Filtres de parcours et de variantes {#journey-and-variant-filters}

Le parcours et ses [variantes][5] servent de filtres de rapport. Le parcours est sélectionné par défaut et inclut les données de toutes les variantes. Sélectionnez une variante pour filtrer le rapport sur ce chemin.

### Filtres d'attributs {#attribute-filters}

Les [filtres d'attributs][22] s'appliquent conjointement au parcours ou à la variante sélectionnée. Ils filtrent le rapport sur les sessions qui ont déclenché le parcours et correspondent aux attributs sélectionnés.

### Funnel {#funnel}

Le [tunnel][6] affiche le trafic, le taux de conversion et le temps moyen de conversion pour chaque étape. Le tunnel liste également les facteurs associés à la conversion et à l'abandon. Cliquez sur **View Details** pour analyser les tendances d'abandon.

### Tendances du trafic et de la conversion {#traffic-and-conversion-trends}

La section des tendances du trafic et de la conversion affiche ces indicateurs clés de performance (KPI) :

- **Starts volume** : nombre total de tentatives de parcours sur l'ensemble des sessions utilisateur
- **Conversion volume** : nombre de tentatives de parcours terminées sur l'ensemble des sessions utilisateur
- **Average time to convert** : temps moyen nécessaire pour terminer le parcours
- **Conversion rate** : pourcentage de tentatives de parcours terminées

Chaque KPI compare la période sélectionnée avec la période immédiatement précédente de même durée. Par exemple, si vous sélectionnez une semaine, la comparaison utilise la semaine précédente. Si vous sélectionnez un jour, elle utilise le jour précédent. Les métriques de volume et de temps de conversion indiquent des variations en pourcentage, tandis que le taux de conversion indique la variation en points de pourcentage.

#### Source et rétention des KPI {#kpi-source-and-retention}

La source des données KPI et la période de rétention dépendent de l'accès à Product Analytics :

- **Preview** : utilise toutes les données de Product Analytics sur une fenêtre glissante de 30 jours
- **Trial** : utilise toutes les données de Product Analytics sur l'ensemble de la période d'essai
- **Paid** : utilise toutes les données de Product Analytics sur une fenêtre glissante de 15 mois
- **Product Analytics not enabled** : utilise les métriques de [RUM without Limits&trade;][18]

Avec RUM without Limits, le volume de démarrages, le volume de conversions et le taux de conversion utilisent la métrique `rum.measure.journey`. Le temps moyen de conversion utilise `rum.measure.journey.duration`.

## Product Analytics {#product-analytics}

<div class="alert alert-info">Les données de cette section ne sont disponibles qu'avec un essai ou un abonnement payant actif à Product Analytics.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-product-analytics.png" alt="La section du rapport détaillé Journey Monitoring affichant les principaux chemins et utilisateurs d'un parcours spécifique pour les sessions converties et abandonnées." style="width:100%;" >}}

### Principaux chemins {#top-paths}

La [visualisation Top Paths][12] montre comment les utilisateurs progressent dans le parcours entre les étapes sélectionnées. Comparez les chemins des utilisateurs ayant converti avec ceux des utilisateurs ayant abandonné.

La visualisation affiche les chemins les plus courants, qui peuvent ne pas représenter 100 % des parcours terminés. Le pied de page affiche le pourcentage et le nombre de sessions représentés par les chemins restants.

### Utilisateurs {#users}

Le tableau des utilisateurs répertorie les principaux utilisateurs qui ont converti ou abandonné au cours du parcours. Cliquez sur un utilisateur pour afficher ses Session Replay des sessions au cours desquelles il a suivi le parcours.

## Real User Monitoring {#real-user-monitoring}

<div class="alert alert-info">Les données de cette section ne sont disponibles qu'avec un essai actif ou un abonnement payant à RUM without Limits&trade;.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-real-user-monitoring.png" alt="La section du rapport détaillé Journey Monitoring affichant les opérations RUM d'un parcours spécifique et une série temporelle des problèmes frontend." style="width:100%;" >}}

### Opérations {#operations}

Le tableau [opérations][7] inclut les opérations RUM liées et non liées. Il les regroupe selon l'état des [Service Level Objectives (SLO)][19] :

- **Critical** : opérations liées au parcours qui ont au moins un SLO avec un taux de consommation élevé.
- **OK** : Opérations liées au parcours qui ont au moins un SLO et dont tous les SLO sont dans un état OK.
- **Matching** : opérations non liées que Datadog identifie par corrélation temporelle. Les opérations correspondantes peuvent ne pas avoir de SLO.

Les opérations liées dans les catégories **Critical** et **OK** sont celles dont les SLO contribuent au [statut du parcours][15].

Examinez et liez les opérations correspondantes que les utilisateurs rencontrent au cours du parcours. Pour obtenir des conseils de configuration, consultez [Examiner les opérations correspondantes][14].

Lorsqu'aucune opération correspondante ne représente une action critique, suivez [Créer des opérations][23]. Si vous en créez une à partir du tableau, Datadog la lie au parcours et crée un SLO de disponibilité avec un objectif de 99 %.

Chaque ligne d'opération affiche également son nombre d'exécutions et son taux de réussite, calculés à l'aide de la métrique `rum.measure.operation`, ainsi que sa latence p75, calculée à l'aide de la métrique `rum.measure.operation.duration`.

<div class="alert alert-tip">Si Bits AI est activé pour votre organisation, lancez une <a href="/real_user_monitoring/bits_ai/optimize_performance/#operations-monitoring">Bits Investigation</a> à partir d'une opération pour résoudre les échecs ou les régressions de latence.</div>

Cliquez sur une opération pour ouvrir son panneau latéral de performance. Le panneau affiche :
- La liste des SLO et des moniteurs configurés pour l'opération
- Le volume, le taux de réussite et la latence de l'opération
- Où l'opération a été exécutée dans le cycle de vie du parcours

Si RUM est connecté à des [traces d'Application Performance Monitoring (APM)][11], le panneau latéral liste également les dépendances des services backend et leurs métriques de performance. Cliquez sur un service backend pour ouvrir son entrée dans le [Catalog][8] APM.

### Nombre d'erreurs {#error-count}

Le graphique du nombre d'erreurs trace les problèmes frontend issus d'[Error Tracking][9] survenus pendant le parcours. Cliquez sur **Investigate** pour examiner les principaux problèmes, puis sélectionnez un problème pour l'ouvrir dans Error Tracking.

## Synthetic Monitoring & Testing {#synthetic-monitoring-testing}

<div class="alert alert-info">Les données de cette section ne sont disponibles qu'avec un essai actif ou un abonnement payant à <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> ou <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-synthetics.png" alt="La section du rapport de détails de Journey Monitoring affichant les tests Synthetic d'un parcours spécifique." style="width:100%;" >}}

### Couverture de la collection de tests et du parcours {#test-suite-and-journey-coverage}

Pour les parcours basés sur des événements, Datadog crée une [collection de tests][10] lorsque le créateur du parcours dispose d'un accès en écriture à Synthetic Monitoring. La collection porte le même nom que le parcours. Dans une configuration basée uniquement sur Synthetics, la collection de tests existante définit le parcours.

Le widget de collection de tests affiche les performances de la collection et le [temps de disponibilité][13]. Le SLO de temps de disponibilité de la collection représente le temps de disponibilité du parcours et contribue à l'état du parcours. Un taux de consommation élevé pour ce SLO place le parcours dans l'état **Degraded**. Le SLO a un objectif par défaut modifiable de 99.9 %.

Un parcours dispose d'une [couverture Synthetic][20] lorsque sa collection contient au moins un test qui le couvre. Pour les parcours basés sur des événements, Datadog identifie les nouveaux [tests correspondants][21] à mesure que l'application évolue. Ajoutez ou supprimez des tests pour maintenir la couverture de la collection de tests en adéquation avec le parcours.

### Tableau des tests {#tests-table}

Le tableau des tests Synthetic inclut les tests qui appartiennent à la collection de tests du parcours et les tests correspondants qui n'en font pas partie. Il les groupe par état :

- **Alert** : tests de la collection de tests du parcours qui sont dans un état d'alerte.
- **OK** : tests de la collection de tests du parcours qui sont dans un état OK.
- **Matching** : tests que Datadog identifie comme couvrant le parcours mais qui ne sont pas dans sa collection de tests.

Chaque ligne de test affiche également son nom, son domaine et sa disponibilité.

<div class="alert alert-tip">Si Bits AI est activé pour votre organisation, lancez une <a href="/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page">Bits Investigation</a> à partir d'un test à l'état <strong>Alert</strong> pour en identifier la cause première.</div>

Cliquez sur **Manage Tests** pour ajouter ou supprimer des tests de la collection de tests, ou sur **New Test** pour créer un test.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/
[2]: /fr/synthetics/
[3]: /fr/product_analytics/
[4]: /fr/session_replay/
[5]: /fr/journey_monitoring/variants/
[6]: /fr/product_analytics/charts/funnel_analysis/
[7]: /fr/real_user_monitoring/operations_monitoring/
[8]: /fr/internal_developer_portal/catalog/
[9]: /fr/error_tracking/
[10]: /fr/synthetics/test_suites/
[11]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[12]: /fr/product_analytics/charts/journey_paths/
[13]: /fr/synthetics/test_suites/#service-level-objectives
[14]: /fr/journey_monitoring/configuring_journeys/#review-matching-operations
[15]: /fr/journey_monitoring/status/#rum-operation-slos
[18]: /fr/real_user_monitoring/rum_without_limits/
[19]: /fr/service_level_objectives/
[20]: /fr/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[21]: /fr/journey_monitoring/configuring_journeys/#review-matching-tests
[22]: /fr/journey_monitoring/configuring_journeys/#attribute-filters
[23]: /fr/journey_monitoring/configuring_journeys/#create-operations