---
aliases:
- /fr/real_user_monitoring/dashboards
description: Utilisez les dashboards RUM prêts à l'emploi pour étudier en détail les
  données et performances de votre application.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
title: Dashboards RUM
---

## Présentation

Lorsque vous créez une application RUM, Datadog [recueille des données][1] et génère des dashboards sur les performances, erreurs, ressources et sessions utilisateur de votre application.

{{< img src="real_user_monitoring/rum-performance-summary-2.png" alt="Page de la vue d'ensemble de l'application RUM" style="width:90%;" >}}

Pour accéder à vos dashboards RUM, appliquez un filtre basé sur `RUM` dans la requête de recherche de la [**liste des dashboards**][2] ou à partir des pages de synthèse des applications (**Digital Experience > Performance Summary** et **Digital Experience > Product Analytics > Analytics Summary**).

{{< img src="real_user_monitoring/dashboards/available_rum_dashboards-2.png" alt="Dashboards RUM prêts à l'emploi" style="width:90%;" >}}

{{< whatsnext desc="Vous pouvez explorer les dashboards RUM suivants :" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>Résumés des performances</u> : consultez une vue d'ensemble des performances et des données démographiques de votre site Web ou application. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>Testing et déploiement</u> : évaluez la couverture de vos tests Browser vis-à-vis de votre application et identifiez les principaux éléments de votre application à surveiller à l'aide des données RUM et Synthetics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>Utilisation</u> : analysez les données relatives à l'utilisation et aux sessions utilisateur de vos applications RUM, y compris les signaux de frustration. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>Erreurs</u> : visualisez les erreurs générées dans les consoles utilisateur, en les filtrant par navigateur et type d'appareil. {{< /nextlink >}}
{{< /whatsnext >}}

## Interagir avec des dashboards RUM

Vous pouvez dupliquer et personnaliser des [dashboards][3] afin d'explorer les données de votre application dans le [RUM Explorer][4].

### Template variables

Les dashboards RUM générés contiennent automatiquement un ensemble de template variables par défaut. Utilisez les menus déroulants des template variables pour sélectionner des valeurs et affiner votre recherche. Pour en savoir plus, consulte zla documentation relative aux [template variables][5].

### Événements de vue RUM

Pour explorer des événements spécifiques, cliquez sur un graphique, puis sur **View RUM events**. Vous êtes alors redirigé vers le RUM Explorer. Les filtres de recherche présélectionnés sont appliqués.

{{< img src="real_user_monitoring/dashboards/view_rum_events.mp4" alt="Événements de vue RUM" video=true style="width:80%;" >}}

### Personnaliser les dashboards

Pour dupliquer vos dashboards RUM, cliquez sur l'icône **Settings** et sélectionnez **Clone dashboard**. Pour ajouter d'autres widgets, powerpacks ou applications, faites défiler l'écran vers le bas et cliquez sur l'icône **+**. 

Vous pouvez également modifier les template variables et créer une [vue enregistrée][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /fr/dashboards/
[4]: /fr/real_user_monitoring/explorer/
[5]: /fr/dashboards/template_variables
[6]: /fr/real_user_monitoring/explorer/saved_views/