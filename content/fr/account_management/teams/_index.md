---
description: Organisez les ressources de l'équipe, filtrez les expériences Datadog
  et gérez l'appartenance à l'équipe avec des identifiants d'équipe, des notifications
  et des associations de ressources.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Maintenez la propriété du service à jour avec l'intégration GitHub des équipes
    Datadog.
title: Équipes
---
## Aperçu {#overview}
Les équipes Datadog permettent à des groupes d'utilisateurs d'organiser leurs ressources d'équipe au sein de Datadog et de filtrer automatiquement leur expérience à l'échelle de Datadog pour prioriser ces ressources.

Utilisez les équipes pour lier des ressources telles que des tableaux de bord, des services, des moniteurs et des incidents à un groupe d'utilisateurs. Vous pouvez également ajouter des liens spécifiques à l'équipe vers des canaux Slack, des tableaux Jira, des dépôts GitHub, et plus encore.

L'appartenance à l'équipe est flexible. Les utilisateurs peuvent rejoindre des équipes, être ajoutés par d'autres membres ou être ajoutés par un administrateur. Les utilisateurs peuvent appartenir à plusieurs équipes.

## Configuration {#setup}

### Navigation {#navigation}

Accédez à la page du répertoire des équipes depuis [Paramètres de l'organisation][1] ou en naviguant vers [**Équipes**][2]. La [page du répertoire des équipes][1] répertorie toutes les équipes au sein de votre organisation.

### Créer une équipe {#create-team}

1. Sur la [page du répertoire des équipes][1], cliquez sur {{< ui >}}New Team{{< /ui >}} en haut à droite.
1. Choisissez un {{< ui >}}Team Name{{< /ui >}}.
1. Le {{< ui >}}Handle{{< /ui >}} se remplit en fonction du nom de votre équipe.
1. Utilisez le menu déroulant pour sélectionner les membres de l'équipe et les responsables d'équipe.
1. Fournissez un {{< ui >}}Description{{< /ui >}} facultatif.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

**Notes**: 

- Les caractères autorisés pour les noms d'équipe sont `a-z`, `A-Z`, `0-9` et `._-:/`. Remplacez les espaces par des traits de soulignement. 
- Les caractères autorisés pour les identifiants d'équipe sont `a-z`, `0-9` et `._-:/`. Le dernier caractère ne peut pas être un trait de soulignement.

### Modifier l'équipe {#modify-team}

1. Sur la [page du répertoire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier. La [page de détails de l'équipe][3] apparaît. 
1. Cliquez sur l'icône d'engrenage {{< ui >}}Settings{{< /ui >}} en haut de l'écran. Une fenêtre contextuelle apparaît.
1. Sélectionnez l'élément que vous souhaitez modifier.
1. Apportez vos modifications, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

### Choisissez la source de provisionnement {#choose-provisioning-source}

Choisissez parmi trois options pour déterminer comment les administrateurs et les gestionnaires d'équipe peuvent mettre à jour l'appartenance à l'équipe:

UI et API
: Mettre à jour l'appartenance uniquement par des actions de l'interface utilisateur et des appels API

SAML
: Utilisez un modèle *SAML strict* afin que les données du fournisseur d'identité déterminent l'appartenance à l'équipe

Toutes les sources
: Utilisez SAML comme point de départ et autorisez les remplacements via l'interface utilisateur et l'API

1. Sur la [page du répertoire des équipes][1], cliquez sur {{< ui >}}Teams Settings{{< /ui >}}.
1. Sélectionnez l'une des options sous {{< ui >}}Team Provisioning Sources{{< /ui >}}.

Si vous avez des équipes avec des membres existants, choisir l'option SAML stricte remplace vos paramètres et retire les membres de ces équipes. Choisir l'option Toutes les sources préserve l'appartenance existante des équipes. Pour gérer les équipes et l'appartenance à celles-ci en utilisant les attributs SAML, voir [Mapper les attributs SAML aux équipes][4].

## Identifiant d'équipe {#team-handle}

Un identifiant d'équipe lie les équipes aux ressources Datadog. Les identifiants d'équipe apparaissent dans les barres de recherche et les facettes au format `team:<team-handle>` ou `teams:<team-handle>`. 

Pour trouver un identifiant d'équipe :
1. Cliquez sur le nom de l'équipe dans la page du répertoire d'équipe. La page de détails de l'équipe apparaît.
1. L'identifiant d'équipe apparaît à droite du nom, en haut de la page.

Pour associer une ressource à une équipe définie, une équipe doit exister dans Datadog avec un identifiant d'équipe correspondant. Lorsque vous cliquez sur une ressource associée à une équipe définie, une petite fenêtre apparaît avec l'identifiant d'équipe et des informations supplémentaires. Les équipes définies offrent des fonctionnalités supplémentaires telles que le filtre d'équipe ci-dessous. 

Les identifiants d'équipe qui ne sont pas associés à une équipe définie dans Datadog se comportent de manière similaire aux tags. Convertissez tous les identifiants d'équipe non définis en équipes définies pour profiter des fonctionnalités des équipes.

### Associez des ressources avec des identifiants d'équipe {#associate-resources-with-team-handles}

Datadog prend en charge l'association des ressources suivantes avec des identifiants d'équipe :

- [Tableaux de bord][5]
- [Incidents][6]
- [Moniteurs][7]
- [Catalogue de ressources][8]
- [Catalogue de logiciels][9]
- [Objectifs de niveau de service][10]
- Tests synthétiques, variables globales, emplacements privés

### Envoyer des notifications à un canal de communication spécifique {#send-notifications-to-a-specific-communication-channel}

Ajoutez un canal de notification à votre équipe pour acheminer les alertes vers des canaux de communication tels que Slack ou Microsoft Teams. Les alertes ciblant `@team-<handle>` sont redirigées vers le canal sélectionné. 

1. Sur la [page du répertoire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier. 
1. Cliquez sur l'icône d'engrenage {{< ui >}}Settings{{< /ui >}} en haut de l'écran. Une fenêtre contextuelle apparaît.
1. Sélectionnez {{< ui >}}Notifications{{< /ui >}}.
1. Ajoutez un canal, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

## Filtre d'équipe {#team-filter}

Le filtre d'équipe personnalise votre expérience sur Datadog en vous montrant le contenu associé à vos équipes. La liste {{< ui >}}My Teams{{< /ui >}} comprend les équipes dont vous êtes membre et les équipes que vous avez sélectionnées comme favorites.

{{< img src="/account_management/teams/team-filter.png" alt="Page de liste de surveillance avec une boîte rouge autour du filtre d'équipe. Deux sur trois de mes équipes sélectionnées.">}}

Lorsque vous activez le filtre d'équipe, vous ne voyez que les ressources associées à vos équipes ou aux services détenus par vos équipes. L'état du filtre d'équipe est global et persistant, donc Datadog applique votre contexte d'équipe lorsque vous naviguez à travers différents produits.

Le filtre d'équipe fonctionne en ajoutant des termes de recherche basés sur l'équipe à la requête de recherche. Lorsque vous activez le filtre d'équipe, vous pouvez voir les termes de recherche basés sur l'équipe qu'il ajoute dans la barre de recherche.

### Équipes favorites {#favorite-teams}

Vous pouvez être intéressé par les ressources d'une équipe particulière sans en être membre. Ajouter une équipe à vos équipes favorites vous permet d'obtenir des vues filtrées sur les ressources de cette équipe sans rejoindre l'équipe.

Vos équipes favorites apparaissent aux côtés des équipes auxquelles vous appartenez en haut de la page du répertoire d'équipe et dans le filtre d'équipe.

#### Ajouter ou retirer des équipes favorites {#add-or-remove-favorite-teams}

Vous pouvez ajouter ou retirer une équipe de vos favoris depuis la page du répertoire des équipes ou depuis le filtre d'équipe.

Depuis la [page du répertoire d'équipe][1] :
1. Cliquez sur l'équipe que vous souhaitez ajouter comme favorite. La [page de détails de l'équipe][3] apparaît.
1. Cliquez sur {{< ui >}}Add Favorite{{< /ui >}} ou {{< ui >}}Remove Favorite{{< /ui >}} en haut à droite.

Alternativement, également depuis la page du répertoire des équipes :
1. Survolez l'équipe que vous souhaitez ajouter ou retirer. Des icônes en ligne apparaissent à droite du nom de l'équipe.
1. Cliquez sur l'icône étoile ({{< ui >}}Add to Favorites{{< /ui >}} ou {{< ui >}}Remove from Favorites{{< /ui >}}).

Depuis le filtre d'équipe :
1. Si le filtre est réduit, cliquez sur {{< ui >}}My Teams{{< /ui >}} pour l'agrandir.
1. Cliquez sur {{< ui >}}Add Favorites{{< /ui >}}. Une boîte de recherche et une liste d'équipes apparaissent.
1. Pour affiner la liste des équipes, commencez à taper un nom d'équipe dans la boîte de recherche.
1. Cliquez sur l'étoile à côté de l'équipe souhaitée pour l'ajouter ou la retirer de vos favoris.

### Produits pris en charge {#supported-products}

Le tableau suivant décrit les produits dans lesquels vous pouvez utiliser le filtre d'équipe :

| Page de liste des produits              | Base de filtrage                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [Suivi des erreurs APM][15]       | Service détenu par des équipes (déterminé par la propriété dans le [Catalogue de logiciels][12]) |
| [Applications][21]                     | Identifiant d'équipe                                                                        |
| [Projets de gestion de cas][22] | Identifiant d'équipe                                                                        |
| [Connexions][23]              | Identifiant d'équipe                                                                        |
| [Groupes de connexions][24]        | Identifiant d'équipe                                                                        |
| [Connexions inter-organisationnelles][25]    | Identifiant d'équipe                                                                        |
| [Magasins de données][26]               | Identifiant d'équipe                                                                        |
| [Surveillance des flux de données][18]  | Identifiant d'équipe                                                                        |
| [Tableaux de bord][11]               | Identifiant d'équipe                                                                        |
| [Incidents][13]                | Identifiant d'équipe                                                                        |
| [Intégrations][27]             | Identifiant d'équipe                                                                        |
| [Suivi des erreurs de journaux][16]      | Service détenu par des équipes (déterminé par la propriété dans le [Catalogue de logiciels][12]) |
| [Logs Pipelines][28]           | Team handle (Identifiant de l'équipe)                                                                        |
| [Monitors][14]                 | Team handle (Identifiant de l'équipe)                                                                        |
| [Notebooks][20]                | Team handle (Identifiant de l'équipe)                                                                        |
| [Observability Pipelines][29]  | Team handle (Identifiant de l'équipe)                                                                        |
| [On-Call][30]                  | Service géré par les équipes (défini par la propriété dans le [Software Catalog][12]) |
| [Powerpacks][32]               | Team handle (Identifiant de l'équipe)                                                                        |
| [Private Action Runner][31]    | Team handle (Identifiant de l'équipe)                                                                        |
| [Reference tables][33]         | Team handle (Identifiant de l'équipe)                                                                        |
| [Resource Catalog][8]          | Team handle (Identifiant de l'équipe)                                                                        |
| [RUM apps][34]                 | Team handle (Identifiant de l'équipe)                                                                        |
| [Security rules][35]           | Team handle (Identifiant de l'équipe)                                                                        |
| [Security suppressions][36]    | Team handle (Identifiant de l'équipe)                                                                        |
| [Service Level Objectives][17] | Team handle (Identifiant de l'équipe)                                                                        |
| [Sheets][37]                   | Team handle (Identifiant de l'équipe)                                                                        |
| [Software Catalog][12]         | Team handle (Identifiant de l'équipe)                                                                        |
| [Synthetic Tests][19]          | Team handle (Identifiant de l'équipe)                                                                        |
| [Workflows][38]                | Team handle (Identifiant de l'équipe)                                                                        |


## Permissions {#permissions}

Tout utilisateur dont le rôle inclut l’autorisation Teams Manage peut créer des équipes, renommer des équipes, supprimer des équipes et modifier les team handles (identifiants d'équipe). Les utilisateurs disposant de `user_access_manage` peuvent ajouter, supprimer et promouvoir des membres et managers d’équipe.

## Manage teams (Gérer les équipes) {#manage-teams}

Pour personnaliser votre équipe, consultez [Team Management (Gestion des équipes)][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /fr/account_management/teams/manage/
[4]: /fr/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /fr/dashboards/#dashboard-details
[6]: /fr/incident_response/incident_management/
[7]: /fr/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /fr/tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[10]: /fr/service_level_objectives/#slo-tags
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
[21]: https://app.datadoghq.com/app-builder/apps/list
[22]: https://app.datadoghq.com/cases
[23]: https://app.datadoghq.com/actions/connections
[24]: https://app.datadoghq.com/actions/connections?sort=-updated_at&tab=groups
[25]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[26]: https://app.datadoghq.com/actions/datastores
[27]: https://app.datadoghq.com/integrations
[28]: https://app.datadoghq.com/logs/pipelines
[29]: https://app.datadoghq.com/observability-pipelines
[30]: https://app.datadoghq.com/on-call/summary
[31]: https://app.datadoghq.com/actions/private-action-runners
[32]: /fr/dashboards/widgets/powerpack/#powerpack-permissions
[33]: https://app.datadoghq.com/reference-tables
[34]: https://app.datadoghq.com/rum/list
[35]: https://app.datadoghq.com/security/configuration/notification-rules
[36]: https://app.datadoghq.com/security/configuration/suppressions
[37]: https://app.datadoghq.com/sheets
[38]: https://app.datadoghq.com/workflow