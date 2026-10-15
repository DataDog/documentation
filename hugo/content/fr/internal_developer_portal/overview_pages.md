---
aliases:
- /fr/software_catalog/overview_pages
description: Les pages de présentation d'Internal Developer Portal offrent aux développeurs
  une vue de leurs éléments d'action et de l'état de santé des services, et donnent
  aux responsables de l'ingénierie une vue d'ensemble de la fiabilité et des performances
  des scorecards.
further_reading:
- link: actions/app_builder
  tag: Documentation
  text: App Builder
- link: monitors/
  tag: Documentation
  text: Monitors Datadog
- link: /incident_response/incident_management/
  tag: Documentation
  text: Incident Management
- link: /service_level_objectives/
  tag: Documentation
  text: Service Level Objectives
- link: error_tracking
  tag: Documentation
  text: Error Tracking
- link: watchdog
  tag: Documentation
  text: Watchdog
site_support_id: idp
title: Pages de présentation
---
{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" header="Rejoignez l'aperçu de la page de présentation du développeur !" >}}
{{< /callout >}}

## Présentation {#overview}

La plateforme interne pour développeurs (IDP) de Datadog est livrée avec des **pages de présentation** qui mettent en avant les informations les plus pertinentes pour chaque partie prenante :
- Les développeurs obtiennent une vue centralisée de leurs éléments d'action, de leurs problèmes et des informations sur les services de leur équipe.
- Les SRE et les responsables de l'ingénierie obtiennent une vue d'ensemble de la fiabilité des produits, de l'état de santé des services, des performances des scorecards et d'autres métriques clés pour leurs équipes.

## Page de présentation du développeur {#developer-overview-page}

{{< img src="tracing/eng_reports/developer-overview-page.png" alt="La page de présentation du développeur dans la section My Workspace d'Internal Developer Portal, avec une présentation affichant des métriques de haut niveau sur les alertes, les incidents et les SLO, et une section My Tasks affichant les tickets JIRA" style="width:100%;" >}}

La page de présentation du développeur centralise les informations suivantes sur votre équipe et vos services :
- Les monitors, incidents et SLO de votre équipe
- Vos PR GitHub
- Les services et les performances des scorecards de votre équipe
- Vos problèmes, erreurs et alertes Watchdog

### Utilisation de la page de présentation du développeur {#using-the-developer-overview-page}

#### Démarrez {#get-started}

Le widget « Mes demandes de tirage » affiché sur la page de présentation du développeur est alimenté par [Datadog App Builder][9] et affiche initialement des données de démonstration.

Pour utiliser la page de présentation du développeur avec vos données, [connectez vos sources de données][10] :
1. Trouvez la page de présentation du développeur en sélectionnant l'onglet **Présentation** dans l'IDP et en sélectionnant **Mon espace de travail** dans le menu de gauche.
1. Pour ce widget:

   1. Cliquez sur **+ Connect Data**.
   1. Créez une nouvelle connexion ou sélectionnez-en une existante.

   <br>
   Une fois votre sélection enregistrée, le widget affiche les données de votre connexion. Vous pouvez modifier la connexion sélectionnée en cliquant sur Change Connection dans le widget.

<div class="alert alert-info">La connexion des données est une tâche de configuration unique ; les connexions sélectionnées s'appliquent à toute votre équipe.</div>

#### Personnalisez votre vue {#personalize-your-view}

Fournissez des valeurs pour les filtres en haut de la page afin de personnaliser votre vue:
- **Équipe** : Nom de votre [Équipe Datadog][8]
- **Github_Org** : Nom de votre organisation GitHub
- **Github_Username** : Votre nom d'utilisateur GitHub

<div class="alert alert-info">Ces valeurs de filtre sont conservées lorsque vous revenez à « Mon espace de travail ».</div>

### Fonctionnalités de la page {#page-features}

Les widgets suivants sont inclus par défaut sur la page de présentation du développeur.

#### Monitors, incidents et SLO {#monitors-incidents-and-slos}

Affiche les signaux en direct des [Monitors][6], d'[Incident Management][3] et des [SLO][7] de Datadog. Les widgets restent vides tant que ces produits ne sont pas activés.

#### Pull requests GitHub {#github-pull-requests}

Répertorie les pull requests ouvertes que vous avez créées et celles pour lesquelles vous êtes désigné comme réviseur, en fonction de l'organisation GitHub et du nom d'utilisateur que vous avez fournis.

#### Services d'équipe et performances des scorecards {#team-services-and-scorecard-performance}

- **Services de mon équipe** : Répertorie les services appartenant au filtre **Équipe** sélectionné.
- **Performance des scorecards par service** : Affiche le score moyen de toutes les scorecards pour chaque service appartenant au filtre **Équipe** sélectionné.

#### Problèmes et erreurs {#issues-and-errors}

Fait apparaître les problèmes et les erreurs détectés par [Datadog Incidents][3] et [Error Tracking][4]. Les widgets restent vides tant que ces produits ne sont pas activés.

#### Alertes Watchdog {#watchdog-alerts}

Capture les alertes de [Datadog Watchdog][5].

### Cloner pour une personnalisation ultérieure {#clone-for-further-customization}

Si vous devez personnaliser votre vue, cliquez sur **Clone as dashboard** en haut à droite. Cela crée un dashboard prérempli avec le contenu de la page **Mon espace de travail**.

Voici quelques exemples de personnalisations que vous pouvez effectuer avec le dashboard cloné :
- Créez des [Applications intégrées][2] à l'aide de l'[Action Catalog][11] de Datadog pour afficher des données tierces supplémentaires (par exemple, afficher les informations d'astreinte PagerDuty).
- Mettez à jour la mise en page et la conception globales de votre vue en redimensionnant, en réorganisant et en ajoutant/supprimant des [widgets][12].
- Utilisez un widget [Note][13] pour ajouter une section d'annonces et de mises à jour contenant des informations pertinentes pour votre organisation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/app_builder
[2]: /fr/actions/app_builder/embedded_apps/
[3]: /fr/incident_response/incident_management/
[4]: /fr/error_tracking/
[5]: /fr/watchdog/
[6]: /fr/monitors/
[7]: /fr/service_level_objectives/
[8]: /fr/account_management/teams/
[9]: /fr/actions/app_builder/#apps-created-by-datadog
[10]: /fr/actions/connections
[11]: /fr/actions/actions_catalog/
[12]: /fr/dashboards/widgets/
[13]: /fr/dashboards/widgets/note/