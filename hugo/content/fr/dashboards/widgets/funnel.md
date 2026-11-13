---
aliases:
- /fr/graphing/widgets/funnel/
description: Suivez les taux de conversion et identifiez les goulots d'étranglement
  dans les flux de travail des utilisateurs grâce à la visualisation de l'analyse
  d'entonnoir.
further_reading:
- link: https://docs.datadoghq.com/product_analytics/journeys/funnel_analysis/
  tag: Documentation
  text: En savoir plus sur l'analyse d'entonnoir
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliser l'analyse de l'entonnoir pour comprendre et optimiser vos flux utilisateur
    clés
title: Widget d'entonnoir
widget_type: funnel
---
L'analyse d'entonnoir vous aide à suivre les taux de conversion à travers les flux de travail clés pour identifier et résoudre tout goulot d'étranglement dans les parcours utilisateur de bout en bout. Le widget d'entonnoir visualise les taux de conversion à travers les flux de travail des utilisateurs et les parcours utilisateur de bout en bout.

{{< img src="dashboards/widgets/funnel/funnel.png" alt="Widget d'entonnoir visualisant les taux d'abandon d'un utilisateur sur un site de commerce électronique" >}}

## Configuration {#setup}

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="Écran de configuration du widget d'entonnoir" >}}

### Configuration {#configuration}

1. Choisissez les données à représenter graphiquement :
    * RUM : Consultez la [documentation sur les Search RUM Events][1] pour configurer une requête RUM.
2. Sélectionnez {{< ui >}}View{{< /ui >}} ou {{< ui >}}Action{{< /ui >}} et choisissez une requête dans le menu déroulant.
3. Cliquez sur le bouton {{< ui >}}\+{{< /ui >}} et sélectionnez une autre requête dans le menu déroulant pour visualiser l'entonnoir. Consultez la [RUM Visualize documentation][2] pour plus d'informations sur la visualisation de l'analyse d'entonnoir.

### Options {#options}

#### Temps global {#global-time}

Sur les screenboards et les notebooks, choisissez si votre widget doit utiliser un intervalle personnalisé ou l'intervalle global.

## API {#api}

Ce widget peut être utilisé avec le [Dashboards API][3]. Consultez le tableau suivant pour la [widget JSON schema definition][4] :

{{< dashboards-widgets-api >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/search/
[2]: /fr/product_analytics/journeys/funnel_analysis
[3]: /fr/api/latest/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/