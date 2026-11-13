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
## Présentation {#overview}

Lorsque vous créez une application RUM, Datadog [recueille des données][1] et génère des dashboards sur les performances, erreurs, ressources et sessions utilisateur de votre application. 

{{< img src="real_user_monitoring/dashboards/rum-dashboards-performance-summary.png" alt="Page Vue d'ensemble de l'application RUM" style="width:90%;" >}}

Accédez à vos dashboards RUM en filtrant par `RUM` dans la requête de recherche du [{{< ui >}}Dashboard List{{< /ui >}}][2] ou depuis les pages de résumé de votre application ({{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}} et {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Analytics Summary{{< /ui >}}).

{{< img src="real_user_monitoring/dashboards/available-rum-dashboards.png" alt="Dashboards RUM prêts à l'emploi" style="width:90%;" >}}

{{< whatsnext desc="Vous pouvez explorer les dashboards RUM prêts à l'emploi suivants :" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>Vues d'ensemble des performances</u> : Obtenez une vue globale des performances et des données démographiques de votre site web/application. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>Tests et déploiement</u> : Évaluez la couverture applicative de vos tests de navigateur et identifiez les éléments populaires de votre application à suivre à l'aide des données RUM et Synthetics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>Utilisation</u> : Analysez les données de session utilisateur et d'utilisation de vos applications RUM, y compris les signaux de frustration. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>Erreurs</u> : Observez les erreurs qui apparaissent dans les consoles utilisateur par type de navigateur et d'appareil. {{< /nextlink >}}
{{< /whatsnext >}}

## Interagir avec les dashboards RUM {#interact-with-rum-dashboards}

Vous pouvez dupliquer et personnaliser des [dashboards][3] afin d'explorer les données de votre application dans le [RUM Explorer][4].

### Variables de modèle{#template-variables}

Les dashboards RUM générés contiennent automatiquement un ensemble de variables de modèle par défaut. Utilisez les menus déroulants des variables de modèle pour sélectionner des valeurs et affiner votre recherche. Pour plus d'informations, consultez la documentation sur les [Variables de modèle][5].

### Afficher les événements RUM{#view-rum-events}

Pour explorer des événements individuels, cliquez sur un graphique puis cliquez sur {{< ui >}}View RUM events{{< /ui >}}. Cela vous redirige vers le RUM Explorer avec des filtres de recherche présélectionnés.

{{< img src="real_user_monitoring/dashboards/rum-view-events-2.mp4" alt="Événements de vue RUM" video=true style="width:80%;" >}}

### Personnaliser les dashboards{#customize-dashboards}

Pour cloner vos dashboards RUM, cliquez sur l'icône {{< ui >}}Settings{{< /ui >}} et sélectionnez {{< ui >}}Clone dashboard{{< /ui >}}. Pour ajouter plus de widgets, de powerpacks ou d'applications, faites défiler vers le bas et cliquez sur l'icône {{< ui >}}\+{{< /ui >}}. 

Vous pouvez également modifier les variables de modèle et créer une [vue enregistrée][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /fr/dashboards/
[4]: /fr/real_user_monitoring/explorer/
[5]: /fr/dashboards/template_variables
[6]: /fr/real_user_monitoring/explorer/saved_views/