---
aliases:
- /fr/graphing/widgets/funnel/
description: Suivez les taux de conversion et identifiez les goulots d'étranglement
  dans les workflows utilisateurs grâce à la visualisation d'analyse d'entonnoir.
further_reading:
- link: https://docs.datadoghq.com/product_analytics/journeys/funnel_analysis/
  tag: Documentation
  text: En savoir plus sur l'analyse en entonnoir
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliser l'analyse de l'entonnoir pour comprendre et optimiser vos flux utilisateur
    clés
title: Widget Funnel
widget_type: funnel
---

L'analyse en entonnoir vous aide à suivre les taux de conversion à travers les workflows clés afin d'identifier et de traiter les goulots d'étranglement dans les parcours utilisateurs de bout en bout. Le widget Funnel visualise les taux de conversion à travers les workflows utilisateurs et les parcours utilisateurs de bout en bout.

{{< img src="dashboards/widgets/funnel/funnel.png" alt="Widget Funnel visualisant les taux d'abandon d'un utilisateur sur un site e-commerce" >}}

## Configuration

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="Écran de configuration du widget Funnel" >}}

### Configuration

1. Choisissez les données à représenter :
    * RUM : consultez la [documentation sur la recherche d'événements RUM][1] pour configurer une requête RUM.
2. Sélectionnez **View** ou **Action** et choisissez une requête dans le menu déroulant.
3. Cliquez sur le bouton **+** et sélectionnez une autre requête dans le menu déroulant pour visualiser l'entonnoir. Consultez la [documentation RUM Visualize][2] pour plus d'informations sur la visualisation de l'analyse en entonnoir.

### Options

#### Intervalle global

Sur les screenboards et les notebooks, choisissez si votre widget doit utiliser un intervalle personnalisé ou l'intervalle global.

## API

Ce widget peut être utilisé avec l'[API Dashboards][3]. Consultez le tableau suivant pour la [définition du schéma JSON du widget][4] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/search/
[2]: /fr/product_analytics/journeys/funnel_analysis
[3]: /fr/api/latest/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/