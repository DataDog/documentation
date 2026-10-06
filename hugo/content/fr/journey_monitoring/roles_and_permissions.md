---
description: Examinez les rôles, les autorisations et les politiques de restriction
  qui contrôlent l'accès aux parcours et à leurs ressources associées.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/guide/configuring_journeys/
  tag: Documentation
  text: Configurez les parcours dans Datadog Journey Monitoring
- link: /account_management/rbac/permissions/
  tag: Documentation
  text: Examinez la liste complète des autorisations de rôle Datadog
title: Rôles et autorisations
---
## Présentation {#overview}

Un parcours connecte des ressources issues de Product Analytics, RUM et Synthetic Monitoring. La plupart des actions nécessitent à la fois une autorisation Journey Monitoring et l'autorisation pour la ressource sous-jacente sur laquelle l'action porte.

## Créer et modifier des parcours {#create-and-edit-journeys}

| Action | Accès requis |
|--------|-----------------|
| Créer ou modifier un parcours | [Journey Monitoring write][perms] |
| Créer la collection de tests Synthetic d'un parcours | [Journey Monitoring write][perms] et Synthetic Monitoring write |
| Ajouter ou modifier le monitor de taux de conversion | [Journey Monitoring write][perms] et monitor write |
| Ajouter ou modifier le SLO du parcours | [Journey Monitoring write][perms] et SLO write |
| Modifier les opérations RUM fortement liées | [Journey Monitoring write][perms] et RUM write |

La création de ressources est effectuée au mieux : la création d'un parcours réussit avec le seul accès [Journey Monitoring write][perms]. Datadog crée une ressource liée, telle que la collection de tests, uniquement si vous disposez également de l'autorisation pour cette ressource. Sinon, Datadog passe outre, et vous pourrez l'ajouter ultérieurement. Un parcours sans collection de tests est un état valide.

## Afficher les parcours et les ressources liées {#view-journeys-and-linked-assets}

| Action | Accès requis |
|--------|-----------------|
| Afficher un parcours et ses détails | [Journey Monitoring read][perms] et RUM read sur l'application RUM du parcours |
| Afficher une collection de tests, ses tests et le SLO de disponibilité | Synthetic Monitoring read et une politique de restriction de lecture sur la collection |
| Afficher les opérations RUM fortement liées | [Journey Monitoring read][perms] et RUM read |
| Afficher le SLO d'une opération | SLO read |
| Afficher les replays de session de parcours | RUM read, sous réserve des contrôles d'accès aux données RUM |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[perms]: /account_management/rbac/permissions/#digital-experience-monitoring