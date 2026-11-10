---
description: Examinez la santé, les KPI et la définition d'un parcours, ainsi que
  ses relations avec d'autres parcours.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/map/
  tag: Documentation
  text: Découvrez la carte Journey Monitoring
- link: /journey_monitoring/status/
  tag: Documentation
  text: Découvrez le statut des parcours
title: Page Journey Overview
---
## Explorez un parcours {#explore-a-journey}

Lorsque vous cliquez sur un parcours sur la [carte][6] ou dans le [catalogue](#journey-catalog), Journey Overview affiche son [statut][2], ses [indicateurs clés de performance (KPI)][4], ses [événements de début et de fin][5], ainsi que les parcours en amont et en aval.

Cliquez sur la vignette du parcours ciblé pour ouvrir son [rapport détaillé][1]. Cliquez sur une vignette de parcours en amont ou en aval pour ouvrir le rapport de ce parcours.

{{< img src="journey_monitoring/journey-monitoring-overview.png" alt="Présentation d'un seul parcours affichant ses indicateurs clés de performance, son statut, sa définition, ainsi que les parcours en amont et en aval." style="width:100%;" >}}

## Parcours en amont et en aval {#upstream-and-downstream-journeys}

Datadog identifie les parcours associés en fonction d'événements de début et de fin partagés :

- **Les parcours en amont** se terminent par un événement qui est l'un des événements de début du parcours ciblé.
- **Les parcours en aval** commencent par un événement qui est l'un des événements de fin du parcours ciblé.

Utilisez ces relations pour déterminer si un parcours en amont affecte le parcours ciblé ou si le parcours ciblé affecte les parcours en aval.

## Catalogue de parcours {#journey-catalog}

Le catalogue de parcours répertorie les parcours créés et [suggérés][3]. Chaque parcours créé affiche ses KPI et un statut **Healthy**, **Degraded** ou **Missing coverage**. Les parcours suggérés portent le libellé **Suggested**.

Utilisez le catalogue pour :

- Rechercher des parcours
- Filtrer et trier les parcours
- Filtrer les parcours par équipe responsable
- Identifier les parcours dégradés
- Afficher les parcours suggérés

Cliquez sur un parcours dans le catalogue pour l'afficher sur la page de présentation du parcours.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/journey_monitoring/details_report/
[2]: /fr/journey_monitoring/status/
[3]: /fr/journey_monitoring/suggested_journeys/
[4]: /fr/journey_monitoring/details_report/#traffic-and-conversion-trends
[5]: /fr/journey_monitoring/configuring_journeys/#define-start-and-end-conditions