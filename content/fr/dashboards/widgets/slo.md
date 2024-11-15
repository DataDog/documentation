---
title: Widget Résumé des SLO
description: Suivi de vos SLO
aliases:
  - /fr/monitors/monitor_uptime_widget/
  - /fr/monitors/slo_widget/
  - /fr/graphing/widgets/slo/
  - /fr/dashboards/faq/how-can-i-graph-host-uptime-percentage/
further_reading:
  - link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
    tag: Blog
    text: Faire un suivi du statut de tous vos SLO dans Datadog
---
## Configuration

Utilisez le widget Résumé des SLO pour surveiller vos [SLO (Service Level Objectives)][1] à partir de screenboards et de timeboards. Vous pouvez utiliser la page [Service Level Objectives][2] de Datadog pour afficher les SLO existants et en créer d'autres. Il est également possible de sélectionner un SLO et d'utiliser le widget Résumé des SLO pour l'afficher sur n'importe quel dashboard.

{{< img src="dashboards/widgets/slo/slo_summary_editor.png" alt="widget Résumé des SLO"  >}}

### Configuration

1. Sur la page du dashboard, ajoutez un widget Résumé des SLO.
2. Sélectionnez un SLO dans le menu déroulant.
3. Sélectionnez jusqu'à trois intervalles de temps différents.

**Remarque :** l'intervalle `Global Time` vous permet d'afficher le statut et la marge d'erreur pour des périodes arbitraires au cours des 90 derniers jours. De plus, vous pouvez également spécifier une cible SLO unique (facultative) pour la période arbitraire. Pour afficher une marge d'erreur et appliquer un code couleur à la valeur du statut du SLO (rouge ou vert), il est nécessaire d'appliquer une cible SLO. Si vous ne spécifiez aucune cible, seul le statut s'affiche, et le texte demeure gris.

### Options

#### Préférences d'affichage

Choisissez d'afficher ou de masquer la marge d'erreur restante en cliquant sur l'option `Show error budget`. Si vous visualisez un SLO basé sur un monitor avec plusieurs groupes ou monitors, sélectionnez votre mode de visualisation via l'option `View mode` :

- Pour les SLO basés sur des monitors configurés avec un seul monitor divisé en plusieurs groupes, les trois modes de visualisation suivants sont proposés :
  - `Status` : affiche les pourcentages de statuts et les cibles du SLO global
  - `Groups` : affiche un tableau des pourcentages de statuts pour chaque groupe
  - `Both` : affiche les pourcentages de statuts et les cibles du SLO global ainsi qu'un tableau des pourcentages de statuts pour chaque groupe

- Pour les SLO basés sur des monitors configurés avec plusieurs monitors, les trois modes de visualisation suivants sont proposés :
  - `Status` : affiche les pourcentages de statuts et les cibles du SLO global
  - `Monitors` : affiche un tableau des pourcentages de statuts pour chaque monitor
  - `Both` : affiche les pourcentages de statuts et les cibles du SLO global ainsi qu'un tableau des pourcentages de statuts pour chaque monitor

**Remarque :** lorsque l'option d'intervalle `Global Time` est sélectionnée, vous pouvez uniquement utiliser le mode de vue `Status`.

{{< img src="dashboards/widgets/slo/slo_summary-view_mode.png" alt="mode de visualisation"  >}}

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a title` :

{{< img src="dashboards/widgets/slo/slo_summary-show_title.png" alt="titre du widget"  >}}

Vous pouvez aussi définir sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][3] pour en savoir plus.

Le [schéma JSON][4] utilisé pour le widget Service Map est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/service_level_objectives/
[2]: https://app.datadoghq.com/slo
[3]: /fr/api/v1/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/