---
description: Examinez les rôles, les autorisations et les politiques de restriction
  qui contrôlent l'accès aux parcours et à leurs ressources associées.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/configuring_journeys/
  tag: Documentation
  text: Configurez les parcours dans Datadog Journey Monitoring
- link: /account_management/rbac/permissions/
  tag: Documentation
  text: Examinez la liste complète des autorisations de rôle Datadog
title: Rôles et autorisations de parcours
---
## Présentation {#overview}

Un parcours peut inclure des ressources provenant de [Product Analytics][2], de [Real User Monitoring (RUM)][3] et de [Synthetic Monitoring & Testing][4]. Pour gérer un parcours ou l'une de ses ressources, vous avez besoin des [autorisations Journey Monitoring][1] correspondantes et des autorisations du produit.

## Créer et modifier des parcours {#create-and-edit-journeys}

| Action | Accès requis |
|--------|-----------------|
| Créer ou modifier un parcours | Journey Monitoring write |
| Créer une [collection de tests Synthetic][5] pour un parcours | Journey Monitoring write et Synthetic Monitoring write |
| Lier ou modifier des [RUM operations][6] | Journey Monitoring write et RUM write |

L'accès Journey Monitoring write suffit pour créer un parcours. Datadog ne crée sa collection de tests Synthetic que si vous disposez également de l'accès Synthetic Monitoring write. Sinon, Datadog crée le parcours sans collection de tests. Ajoutez une collection de tests ultérieurement, une fois les autorisations nécessaires obtenues.

## Afficher les parcours et les ressources liées {#view-journeys-and-linked-assets}

| Action | Accès requis |
|--------|-----------------|
| Afficher un parcours basé sur des événements et ses détails | Journey Monitoring read et RUM read sur l'application RUM du parcours |
| Afficher un parcours reposant uniquement sur Synthetics | Journey Monitoring read |
| Afficher une collection de tests, ses tests et son [SLO de disponibilité][7] | Synthetic Monitoring read et une politique de restriction de lecture sur la collection |
| Afficher les opérations RUM liées | Journey Monitoring read et RUM read |
| Afficher le SLO d'une opération | SLO read |
| Afficher les [Session Replays][8] du parcours | RUM read, sous réserve des contrôles d'accès aux données RUM |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#digital-experience-monitoring
[2]: /fr/product_analytics/
[3]: /fr/real_user_monitoring/
[4]: /fr/synthetics/
[5]: /fr/synthetics/test_suites/
[6]: /fr/real_user_monitoring/operations_monitoring/
[7]: /fr/synthetics/test_suites/#service-level-objectives
[8]: /fr/session_replay/