---
title: Widget Résumé des SLO
kind: documentation
description: Faites un suivi de vos SLO.
aliases:
  - /fr/monitors/monitor_uptime_widget/
  - /fr/monitors/slo_widget/
  - /fr/graphing/widgets/slo/
  - /fr/dashboards/faq/how-can-i-graph-host-uptime-percentage/
further_reading:
  - link: 'https://www.datadoghq.com/blog/slo-monitoring-tracking/'
    tag: Blog
    text: Faire un suivi du statut de tous vos SLO dans Datadog
---
## Configuration

Utilisez le widget Résumé des SLO pour surveiller vos [SLO (Service Level Objectives)][1] à partir de screenboards et de timeboards. Vous pouvez utiliser la [page des Service Level Objectives][2] de Datadog pour afficher les SLO existants et en créer d'autres. Vous pouvez ensuite sélectionner un SLO actif et utiliser le widget Résumé des SLO pour l'afficher sur n'importe quel dashboard.

{{< img src="dashboards/widgets/slo/slo_summary_editor.png" alt="widget Résumé des SLO"  >}}

### Configuration

1. Sur la page du dashboard, ajoutez un widget Résumé des SLO.
2. Sélectionnez un SLO dans le menu déroulant.
3. Sélectionnez jusqu'à trois intervalles de temps différents.

**Remarque :** les SLO peuvent être configurés avec des intervalles de temps de 7, 30 ou 90 jours. Pour tous les SLO, vous pouvez également sélectionner `Week to date` comme intervalle de temps. Si un intervalle de temps de 30 jours au moins est configuré pour un SLO, vous pouvez également sélectionner `Previous week` comme intervalle de temps. Si un intervalle de temps de 90 jours est configuré pour un SLO, vous pouvez également sélectionner `Month to date` ou `Previous month` comme intervalle de temps.

### Options

#### Préférences d'affichage

Choisissez d'afficher ou de masquer le budget d'indisponibilité restant en cliquant sur l'option `Show error budget`. Si vous visualisez un SLO basé sur un monitor avec plusieurs groupes ou monitors, sélectionnez votre mode de visualisation via l'option `View mode` :

- Pour les SLO basés sur des monitors configurés avec un seul monitor divisé en plusieurs groupes, les trois modes de visualisation suivants sont proposés :
  - `Status` : affiche les pourcentages de statuts et les cibles du SLO global
  - `Groups` : affiche un tableau des pourcentages de statuts pour chaque groupe
  - `Both` : affiche les pourcentages de statuts et les cibles du SLO global ainsi qu'un tableau des pourcentages de statuts pour chaque groupe

- Pour les SLO basés sur des monitors configurés avec plusieurs monitors, les trois modes de visualisation suivants sont proposés :
  - `Status` : affiche les pourcentages de statuts et les cibles du SLO global
  - `Monitors` : affiche un tableau des pourcentages de statuts pour chaque monitor
  - `Both` : affiche les pourcentages de statuts et les cibles du SLO global ainsi qu'un tableau des pourcentages de statuts pour chaque monitor

{{< img src="dashboards/widgets/slo/slo_summary-view_mode.png" alt="mode de visualisation"  >}}

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a title` :

{{< img src="dashboards/widgets/slo/slo_summary-show_title.png" alt="titre du widget"  >}}

Vous pouvez aussi définir sa taille et son alignement si vous le souhaitez.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/service_level_objectives/
[2]: https://app.datadoghq.com/slo