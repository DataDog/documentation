---
description: Organisez les ressources d'équipe, filtrez les expériences Datadog et
  gérez les membres de l'équipe à l'aide d'identifiants d'équipe, de notifications
  et d'associations de ressources.
title: Équipes
---

## Présentation
Les équipes Datadog permettent à des groupes d'utilisateurs d'organiser leurs ressources d'équipe dans Datadog et de filtrer automatiquement leur expérience sur l'ensemble de Datadog afin de prioriser ces ressources.

Utilisez les équipes pour associer des ressources telles que des dashboards, services, monitors et incidents à un groupe d'utilisateurs. Vous pouvez également ajouter des liens propres à l'équipe vers des canaux Slack, des tableaux Jira, des référentiels GitHub et plus encore.

L'appartenance à une équipe est flexible. Les utilisateurs peuvent rejoindre des équipes, être ajoutés par d'autres membres ou par un administrateur. Un utilisateur peut appartenir à plusieurs équipes.

{{< callout url="https://www.datadoghq.com/product-preview/github-integration-for-teams/" header="Profitez de l'aperçu !" >}}
  L'intégration GitHub pour les équipes est disponible en préversion.
{{< /callout >}}

## Configuration

### Navigation

Accédez à la page de répertoire des équipes depuis les [Paramètres de l'organisation][1] ou en accédant à [**Service Management > Teams**][2]. La [page de répertoire des équipes][1] répertorie toutes les équipes de votre organisation.

### Créer une équipe

1. Sur la [page de l'annuaire des équipes][1], cliquer sur **New Team** en haut à droite.
1. Choisissez un **nom d'équipe**.
1. Le **Handle** est renseigné automatiquement en fonction du nom de votre équipe.
1. Utilisez le menu déroulant pour sélectionner les membres de l'équipe et les chefs d'équipe.
1. Fournissez une **Description** facultative.
1. Cliquez sur **Create**.

**Remarques** : 

- Les caractères autorisés pour les noms d'équipe sont `a-z`, `A-Z`, `0-9`, et `._-:/`. Remplacez les espaces par des traits de soulignement. 
- Les caractères autorisés pour les poignées d'équipe sont `a-z`, `0-9`, et `._-:/`. Le dernier caractère ne peut être un trait de soulignement.

### Modifier l'équipe

1. Sur la [page de l'annuaire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier. La [page de détails de l'équipe][3] s'affiche.
1. Cliquez sur l'icône **Settings** en haut de l'écran. Une fenêtre contextuelle s'affiche.
1. Sélectionnez l'élément que vous souhaitez modifier.
1. Effectuez vos modifications, puis cliquez sur **Save**.

### Choisir la source de provisionnement

Choisissez parmi trois options pour déterminer comment les administrateurs et les gestionnaires d'équipe peuvent mettre à jour les membres de l'équipe :

UI and API
: Mettre à jour l'appartenance uniquement via les actions de l'interface utilisateur et les appels à l'API

SAML
: Utiliser un modèle *SAML strict* où les données du fournisseur d'identité déterminent l'appartenance à l'équipe

All sources
: utiliser SAML comme point de départ et autoriser les remplacements via l'interface utilisateur et l'API

1. Sur la [page de répertoire des équipes][1], cliquez sur **Teams Settings**.
1. Sélectionnez l'une des options sous **Team Provisioning Sources**.

Si certaines de vos équipes comptent déjà des membres, le choix de l'option SAML stricte remplace vos paramètres actuels et supprime les membres de ces équipes. L'option « All Sources » permet de conserver les appartenances existantes. Pour gérer les équipes et les membres à l'aide d'attributs SAML, consultez la section [Mapper des attributs SAML à des équipes][4].

## Handle d'équipe

Un handle d'équipe relie les équipes aux ressources Datadog. Les handles d'équipe apparaissent dans les barres de recherche et les facettes au format `team:<team-handle>` ou `teams:<team-handle>`. 

Pour trouver un handle d'équipe :
1. Cliquez sur le nom de l'équipe dans la page du répertoire des équipes. La page de détails de l'équipe s'affiche.
1. Le handle de l'équipe apparaît à droite du nom, en haut de la page.

Pour associer une ressource à une équipe donnée, une équipe Datadog doit posséder le handle d'équipe correspondant. Lorsque vous cliquez sur une ressource associée à une équipe, une petite fenêtre comportant le handle de l'équipe et des informations complémentaires apparaît. Les équipes permettent de bénéficier de fonctionnalités supplémentaires, comme le filtre d'équipe décrit ci-dessous.

Les handles d'équipe qui ne sont pas associés à une équipe définie dans Datadog se comportent de manière similaire aux tags. Convertir les handles d'équipe non définis en équipes définies pour tirer parti des fonctionnalités des équipes.

### Associer des ressources à des handles d'équipe

Datadog prend en charge l'association des ressources suivantes avec des handles d'équipe :

- [Dashboards][5]
- [Incidents][6]
- [Monitors][7]
- [Resource Catalog][8]
- [Software Catalog][9]
- [Service Level Objectives][10]
- Tests Synthetic Monitoring, variables globales, emplacements privés

### Envoyer des notifications à un canal de communication spécifique 

Ajoutez un canal de notification à votre équipe pour acheminer les alertes vers des canaux de communication comme Slack ou Microsoft Teams. Les alertes de monitor adressées à `@team-<handle>` sont redirigées vers le canal sélectionné.

1. Sur la [page de répertoire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier.
1. Cliquez sur l'icône **Settings** en haut de l'écran. Une fenêtre contextuelle s'affiche.
1. Sélectionnez **Notifications**.
1. Ajoutez un canal, puis cliquez sur **Save**.

## Filtre d'équipe

Le filtre d'équipe personnalise votre expérience sur Datadog en vous montrant le contenu associé à votre Teams. La liste **My Teams** comprend les équipes dont vous êtes membre et celles que vous avez sélectionnées comme favorites.

{{< img src="/account_management/teams/team-filter.png" alt="Page de la liste des monitors avec un encadré rouge autour du filtre d'équipe. Deux équipes de My Teams sont sélectionnées." >}}

Lorsque vous activez le filtre d'équipe, vous voyez uniquement les ressources associées à vos équipes ou aux services détenus par vos équipes. L'état du filtre d'équipe est global et persistant, ce qui permet à Datadog d'appliquer votre contexte d'équipe pendant la navigation entre les différents produits.

Le filtre d'équipe fonctionne en ajoutant des termes de recherche basés sur l'équipe à la requête de recherche. Lorsque vous activez le filtre d'équipe, vous pouvez voir les termes de recherche associés dans la barre de recherche.

### Ajouter une équipe aux favoris

Vous pouvez vous intéresser aux ressources d'une équipe sans en être membre. Ajouter une équipe à vos équipes favorites permet d'obtenir une vue filtrée de ses ressources sans avoir à rejoindre l'équipe.

Vos équipes favorites apparaissent aux côtés des équipes auxquelles vous appartenez en haut de la page du répertoire des équipes et dans le filtre d'équipe.

#### Ajouter ou supprimer une équipe des favoris

Vous pouvez ajouter ou retirer une équipe de vos favoris depuis la page du répertoire des équipes ou depuis le filtre d'équipe.

Depuis la [page du répertoire des équipes][1] :
1. Cliquez sur l'équipe que vous souhaitez ajouter aux favoris. La [page de détails de l'équipe][3] s'affiche.
1. Cliquez sur **Add Favorite** ou **Remove Favorite** en haut à droite.

Vous pouvez également procéder depuis la page du répertoire des équipes :
1. Placez le pointeur sur l'équipe à ajouter ou à retirer. Des icônes contextuelles s'affichent à droite du nom de l'équipe.
1. Cliquez sur l'étoile (**Add to Favorites** ou **Remove from Favorites**).

À partir du filtre de l'équipe :
1. Si le filtre est réduit, cliquez sur **My Teams** pour le développer.
1. Cliquez sur **Add Favorites**. Un champ de recherche et une liste d'équipes apparaissent.
1. Pour réduire la liste des équipes, commencez à saisir le nom d'une équipe dans le champ de recherche.
1. Cliquez sur l'étoile à côté de l'équipe souhaitée pour l'ajouter ou la supprimer de vos favoris.

### Produits pris en charge

Le tableau suivant décrit les produits dans lesquels vous pouvez utiliser le filtre d'équipe :

| Page de la liste des produits       | Filtre de base                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][11]         | Handle d'équipe                                                                      |
| [Resource Catalog][8]   | Handle d'équipe                                                                      |
| [Software Catalog][12]    | Handle d'équipe                                                                      |
| [Incidents][13]          | Handle d'équipe                                                                      |
| [Monitors][14]          | Handle d'équipe                                                                      |
| [APM Error Tracking][15] | Service détenu par des équipes (selon le [Software Catalog][12]) |
| [Logs Error Tracking][15] | Service détenu par des équipes (selon le [Software Catalog][12]) |
| [Service Level Objectives][17] | Handle d'équipe                                                                 |
| [Data Streams Monitoring][18]  | Handle d'équipe                                                                 |
| [Tests Synthetic Monitoring][19]          | Handle d'équipe                                                                 |
| [Notebooks][20]          | Handle d'équipe                                                                      |


## Autorisations

Tout utilisateur disposant du rôle avec l'autorisation Teams Manage peut créer des équipes, renommer des équipes, supprimer des équipes et modifier les identifiants d'équipe. Les utilisateurs disposant de `user_access_manage` peuvent ajouter, retirer et promouvoir des membres et des responsables d'équipe.

## Gérer des équipes

Pour personnaliser votre équipe, consultez la rubrique relative à la [gestion des équipes][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /fr/account_management/teams/manage/
[4]: /fr/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /fr/dashboards/#dashboard-details
[6]: /fr/service_management/incident_management/
[7]: /fr/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: /fr/infrastructure/resource_catalog/
[9]: /fr/tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[10]: /fr/service_management/service_level_objectives/#slo-tags
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://app.datadoghq.com/services
[13]: https://app.datadoghq.com/incidents
[14]: https://app.datadoghq.com/monitors/manage
[15]: https://app.datadoghq.com/apm/error-tracking
[16]: https://app.datadoghq.com/logs/error-tracking
[17]: https://app.datadoghq.com/slo/manage
[18]: https://app.datadoghq.com/data-streams
[19]: https://app.datadoghq.com/synthetics
[20]: https://app.datadoghq.com/notebook/list/