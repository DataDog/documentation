---
aliases:
- /fr/journey_monitoring/uptime/
description: Inspectez les performances de chaque parcours avec un rapport détaillé
  combinant les données de Product Analytics, de Real User Monitoring, de Synthetic
  Monitoring & Testing et de Session Replay.
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
    avec les opérations RUM
title: Rapport détaillé du parcours
---
## Présentation {#overview}

Le rapport détaillé du parcours combine les données de comportement utilisateur et de performance technique issues de [Product Analytics][3], [Session Replay][4], [Real User Monitoring (RUM)][1] et [Synthetic Monitoring & Testing][2].

{{< img src="journey_monitoring/journey-monitoring-details-report-2.png" alt="Le rapport détaillé de Journey Monitoring affichant les indicateurs clés de performance, les informations sur le comportement utilisateur et les mesures de performance technique d'un parcours spécifique." style="width:100%;" >}}

### Filtres de parcours et de variantes {#journey-and-variant-filters}

Le parcours et ses [variantes][5] servent de filtres de rapport. Le parcours est sélectionné par défaut et inclut les données de toutes les variantes. Sélectionnez une variante pour filtrer le rapport sur ce chemin.

### Filtres d'attributs {#attribute-filters}

Les [filtres d'attributs][22] s'appliquent conjointement au parcours sélectionné ou à la variante sélectionnée. Ils filtrent le rapport pour ne conserver que les sessions ayant déclenché le parcours et correspondant aux attributs sélectionnés.

### Funnel {#funnel}

Le [tunnel][6] affiche le trafic, le taux de conversion et le temps moyen de conversion pour chaque étape. Le tunnel liste également les facteurs associés à la conversion et à l'abandon. Cliquez sur **View Details** pour analyser les modèles d'abandon.

### Tendances du trafic et de la conversion {#traffic-and-conversion-trends}

La section des tendances du trafic et de la conversion affiche ces indicateurs clés de performance (KPI) :

- **Volume de démarrages** : Nombre total de tentatives de parcours sur l'ensemble des sessions utilisateur
- **Volume de conversion** : Nombre total de tentatives de parcours terminées sur l'ensemble des sessions utilisateur
- **Temps moyen de conversion** : Temps moyen requis pour terminer le parcours
- **Taux de conversion** : Pourcentage de tentatives de parcours ayant abouti

Chaque KPI compare la période sélectionnée avec la période immédiatement précédente de même durée. Par exemple, si vous sélectionnez une semaine, la comparaison utilise la semaine précédente. Si vous sélectionnez un jour, elle utilise le jour précédent. Les métriques de volume et de temps de conversion indiquent des variations en pourcentage, tandis que le taux de conversion indique la variation en points de pourcentage.

#### Source des KPI et durée de conservation des données {#kpi-source-and-retention}

La source des données des KPI et leur durée de conservation dépendent de l'accès à Product Analytics :

- **Preview** : Utilise toutes les données de Product Analytics d'une fenêtre glissante de 30 jours
- **Trial** : Utilise toutes les données de Product Analytics de la période d'essai complète
- **Paid** : Utilise toutes les données de Product Analytics sur une période glissante de 15 mois
- **Product Analytics not enabled** : Utilise les métriques [RUM without Limits&trade;][18]

Avec RUM without Limits, le volume de démarrages, le volume de conversion et le taux de conversion utilisent la métrique `rum.measure.journey`. Le temps moyen de conversion utilise `rum.measure.journey.duration`.

## Product Analytics {#product-analytics}

<div class="alert alert-info">Les données de cette section ne sont disponibles qu'avec un essai actif de Product Analytics ou un abonnement payant.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-product-analytics.png" alt="La section du rapport détaillé de Journey Monitoring affichant les principaux chemins et utilisateurs d'un parcours donné pour les sessions converties et abandonnées." style="width:100%;" >}}

### Principaux chemins {#top-paths}

La [visualisation Top Paths][12] montre comment les utilisateurs se déplacent dans le parcours entre les étapes sélectionnées. Comparez les chemins des utilisateurs qui ont effectué une conversion avec ceux des utilisateurs qui ont abandonné.

La visualisation affiche les chemins les plus courants, qui peuvent ne pas représenter 100 % des parcours terminés. Le pied de page indique le pourcentage et le nombre de sessions représentés par les chemins restants.

### Utilisateurs {#users}

Le tableau des utilisateurs répertorie les principaux utilisateurs ayant effectué une conversion ou abandonné au cours du parcours. Cliquez sur un utilisateur pour voir ses Session Replays issus des sessions au cours desquelles il a effectué le parcours.

## Real User Monitoring {#real-user-monitoring}

<div class="alert alert-info">Les données de cette section ne sont disponibles qu'avec un essai actif ou un abonnement payant à RUM without Limits&trade;.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-real-user-monitoring.png" alt="La section du rapport détaillé de Journey Monitoring affichant les opérations RUM d'un parcours donné et une série chronologique des problèmes frontend." style="width:100%;" >}}

### Opérations {#operations}

Le tableau [opérations][7] inclut les opérations RUM liées et non liées. Il les regroupe selon l'état de leurs [objectifs de niveau de service (SLO)][19] :

- **Critical** : Opérations liées au parcours qui ont au moins un SLO avec un taux de consommation élevé.
- **OK** : Opérations liées au parcours qui possèdent au moins un SLO et dont tous les SLO sont dans un état OK.
- **Matching** : Opérations non liées que Datadog identifie par corrélation temporelle. Les opérations correspondantes peuvent ne pas avoir de SLO.

Les opérations liées dans les catégories **Critical** et **OK** sont les mêmes opérations dont les SLO contribuent au [statut du parcours][15].

Examinez et liez les opérations correspondantes que les utilisateurs rencontrent au cours du parcours. Pour obtenir des conseils de configuration, consultez [Examiner les opérations correspondantes][14].

Lorsqu'aucune opération correspondante ne représente une action critique, suivez [Créer des opérations][23]. Si vous en créez une à partir du tableau, Datadog la lie au parcours et crée un SLO de disponibilité avec un objectif de 99 %.

Chaque ligne d'opération affiche également son nombre d'exécutions et son taux de réussite, calculés à l'aide de la métrique `rum.measure.operation`, ainsi que sa latence p75, calculée à l'aide de la métrique `rum.measure.operation.duration`.

<div class="alert alert-tip">Si Bits AI est activé pour votre organisation, lancez une <a href="/real_user_monitoring/ai_investigations/operation_ai_investigation/">Bits Investigation</a> à partir d'une opération pour résoudre les échecs ou les régressions de latence.</div>

Cliquez sur une opération pour ouvrir son panneau latéral de performance. Le panneau affiche :
- La liste des SLO et des moniteurs configurés pour l'opération
- Le volume, le taux de réussite et la latence de l'opération
- Où l'opération a été exécutée dans le cycle de vie du parcours

Si RUM est connecté aux [traces Application Performance Monitoring (APM)][11], le panneau latéral répertorie également les dépendances des services backend et leurs métriques de performance. Cliquez sur un service backend pour ouvrir son entrée dans le [Catalog][8] APM.

### Nombre d'erreurs {#error-count}

Le graphique du nombre d'erreurs représente les problèmes frontend issus d'[Error Tracking][9] survenus pendant le parcours. Cliquez sur **Investigate** pour examiner les principaux problèmes, puis sélectionnez un problème pour l'ouvrir dans Error Tracking.

## Synthetic Monitoring & Testing {#synthetic-monitoring-testing}

<div class="alert alert-info">Les données de cette section ne sont disponibles qu'avec un essai actif ou un abonnement payant à <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> ou à <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-synthetics.png" alt="La section du rapport détaillé de Journey Monitoring présentant les tests Synthetic d'un parcours donné." style="width:100%;" >}}

### Couverture de la suite de tests et du parcours {#test-suite-and-journey-coverage}

Pour les parcours basés sur des événements, Datadog crée une [suite de tests][10] lorsque le créateur du parcours dispose d'un accès en écriture à Synthetic Monitoring. La suite porte le même nom que le parcours. Dans une configuration reposant uniquement sur Synthetics, la suite de tests existante définit le parcours.

Le widget de suite de tests affiche les performances de la suite et le [temps de disponibilité][13]. Le SLO de temps de disponibilité de la suite représente le temps de disponibilité du parcours et contribue au statut du parcours. Un taux de consommation élevé sur ce SLO place le parcours dans un état **Degraded**. Le SLO a un objectif par défaut modifiable de 99,9 %.

Un parcours possède une [couverture Synthetic][20] lorsque sa suite contient au moins un test qui couvre ce parcours. Pour les parcours basés sur des événements, Datadog identifie les nouveaux [tests correspondants][21] à mesure que l'application évolue. Ajoutez ou supprimez des tests pour maintenir la couverture de la suite alignée avec le parcours.

### Tableau des tests {#tests-table}

Le tableau des tests Synthetic inclut les tests qui appartiennent à la suite de tests du parcours et les tests correspondants qui n'en font pas partie. Il les regroupe par état :

- **Alert** : Tests de la suite de tests du parcours qui sont dans un état d'alerte.
- **OK** : Tests de la suite de tests du parcours qui sont dans un état OK.
- **Matching** : Tests que Datadog identifie comme couvrant le parcours mais qui ne sont pas dans sa suite de tests.

Chaque ligne de test affiche également son nom, son domaine et sa disponibilité.

<div class="alert alert-tip">Si Bits AI est activé pour votre organisation, lancez une <a href="/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page">Bits Investigation</a> à partir d'un test à l'état <strong>Alert</strong> pour en identifier la cause première.</div>

Cliquez sur **Manage Tests** pour ajouter ou supprimer des tests de la suite, ou sur **New Test** pour créer un test.

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