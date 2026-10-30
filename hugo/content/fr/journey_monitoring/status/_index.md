---
description: Comprenez comment Datadog détermine le statut d'un parcours.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /real_user_monitoring/operations_monitoring/
  tag: Documentation
  text: En savoir plus sur RUM Operations Monitoring
- link: /journey_monitoring/details_report/#synthetic-monitoring--testing
  tag: Documentation
  text: En savoir plus sur la couverture des tests Synthetic
title: Statut du parcours
---
## Présentation {#overview}

Le statut du parcours indique si l'état technique d'un parcours est **Healthy**, **Degraded** ou **Missing coverage**. Datadog calcule le statut à partir de deux types d'entrées d'[objectifs de niveau de service (SLO)][10] :

- SLO sur les [opérations de Real User Monitoring (RUM)][1] liées au parcours
- Le [SLO de disponibilité][11] de la [collection de tests Synthetic][2] du parcours

Le statut du parcours reflète l'état le plus récent de ces entrées. Il ne fournit pas d'historique des statuts et ne définit pas d'objectif ou de fenêtre d'évaluation distinct.

{{< img src="journey_monitoring/journey-monitoring-status.png" alt="Vue d'ensemble du parcours montrant un statut dégradé causé par des tests en échec et un taux de consommation élevé de la collection de tests." style="width:100%;" >}}

## Entrées de statut {#status-inputs}

Datadog évalue le [taux de consommation][3] de chaque entrée SLO :

- **Taux de consommation élevé** : le SLO consomme son budget d'erreur plus rapidement que ne le permet son objectif et dépasse cet objectif ou est sur le point de le faire.
- **Taux de consommation faible ou état OK** : le SLO consomme son budget d'erreur à un rythme acceptable.
- **Aucune donnée** : Datadog exclut le SLO du calcul.

Le statut du parcours ne nécessite pas les deux types d'entrées. Un seul SLO à consommation élevée de l'un ou l'autre type rend le parcours **Degraded**.

### SLO d'opérations RUM {#rum-operation-slos}

<div class="alert alert-info">La création d'opérations RUM nécessite un essai actif ou un abonnement payant à <a href="/real_user_monitoring/rum_without_limits/">RUM without Limits&trade;</a>. Une fois que vous avez associé une opération à un parcours, ses SLO peuvent contribuer au statut du parcours.</div>

L'entrée relative aux opérations RUM a un taux de consommation élevé lorsqu'au moins un SLO d'une opération associée a un taux de consommation élevé. Elle est saine lorsqu'au moins un SLO d'opération est inclus et que chaque SLO inclus a un faible taux de consommation ou est OK.

Une opération RUM associée est explicitement identifiée comme faisant partie du chemin critique du parcours. L'association permet de distinguer les opérations que les utilisateurs rencontrent au cours du parcours des opérations non liées qui s'exécutent en même temps.

Datadog exclut les opérations non associées et les opérations associées sans SLO du calcul du statut. Lorsque vous associez une opération sans SLO, Datadog crée un SLO de disponibilité avec un objectif de 99%. Personnalisez ce SLO ou ajoutez d'autres SLO de disponibilité et de latence selon vos besoins. Pour obtenir des conseils, consultez les [Meilleures pratiques pour la création de SLO pour les opérations RUM][4].

Gérez les liens depuis le rapport de détails de l'opération, le [rapport de détails][5] du parcours ou la [RUM Operations API][7].

### SLO de disponibilité de la collection de tests {#test-suite-uptime-slo}

<div class="alert alert-info">La création ou la gestion de la collection de tests et des tests qui fournissent cette entrée de statut nécessite un essai actif ou un abonnement payant à <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> ou <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>.</div>

La collection de tests dispose d'un SLO de disponibilité par tranches de temps qui évalue ses tests critiques. Les tests sont critiques par défaut. Marquez un test comme non critique pour l'exclure du SLO de disponibilité tout en le conservant dans la collection.

L'entrée de la collection de tests a un taux de consommation élevé lorsque son SLO de disponibilité a un taux de consommation élevé. Elle est saine lorsque le SLO de disponibilité a un faible taux de consommation ou est en état OK. Si la collection ne contient aucune donnée de test, Datadog exclut cette entrée du calcul.

## Calcul du statut {#status-calculation}

Datadog combine les entrées de l'opération RUM et de la collection de tests incluses :

- **Degraded** : au moins un SLO inclus a un taux de consommation élevé
- **Healthy** : au moins un SLO est inclus, et chaque SLO inclus a un faible taux de consommation ou est en état OK
- **Missing coverage** : aucune entrée SLO n'est prise en compte dans le calcul. Cela se produit lorsque le parcours n'a aucune entrée configurée ou lorsque toutes les entrées configurées signalent **No Data**

Les modifications apportées aux entrées du parcours affectent automatiquement son statut. Cela inclut la liaison des opérations RUM et l'ajout ou la suppression de tests de la collection de tests.

## Étudier le statut du parcours {#investigate-journey-status}

Affichez le statut du parcours dans le [catalogue][12], la [carte][13] et le rapport de détails :

- Pour un parcours **Degraded**, Datadog renvoie vers les opérations **Critical** ou les tests Synthetic à l'état **Alert** qui contribuent au statut. Si Bits AI est activé pour votre organisation, lancez une [Bits Investigation][14] depuis l'opération ou le test pour identifier la cause première.
- Pour un parcours avec le statut **Missing coverage**, [associez une opération à un SLO][8] ou [ajoutez un test de couverture][9]. Si la couverture est configurée, vérifiez que les entrées SLO correspondantes fournissent des données.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/operations_monitoring/
[2]: /fr/journey_monitoring/details_report/#synthetic-monitoring--testing
[3]: /fr/service_level_objectives/#slo-burn-rate-indicator
[4]: /fr/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[5]: /fr/journey_monitoring/details_report/
[7]: /fr/api/latest/rum-operations/
[8]: /fr/journey_monitoring/configuring_journeys/#review-matching-operations
[9]: /fr/journey_monitoring/configuring_journeys/#manage-tests
[10]: /fr/service_level_objectives/
[11]: /fr/synthetics/test_suites/#service-level-objectives
[12]: /fr/journey_monitoring/overview/#journey-catalog
[13]: /fr/journey_monitoring/map/
[14]: /fr/bits_ai/bits_investigation/