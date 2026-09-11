---
description: Organisez les ressources d'équipe, filtrez l'expérience Datadog et gérez
  l'appartenance à l'équipe avec des identifiants d'équipe, des notifications et des
  associations de ressources.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Maintenez la propriété des services à jour grâce à l'intégration GitHub de
    Datadog Teams.
title: Teams
---
## Présentation {#overview}
Datadog Teams permet à des groupes d'utilisateurs d'organiser leurs ressources d'équipe au sein de Datadog et de filtrer automatiquement leur expérience Datadog globale pour donner la priorité à ces ressources.

Utilisez Teams pour lier des ressources telles que des dashboards, services, monitors et incidents à un groupe d'utilisateurs. Vous pouvez également ajouter des liens spécifiques à l'équipe vers des canaux Slack, des tableaux Jira, des dépôts GitHub, et plus encore.

L'appartenance à une équipe est flexible. Les utilisateurs peuvent rejoindre des équipes, être ajoutés par d'autres membres ou être ajoutés par un administrateur. Les utilisateurs peuvent appartenir à plusieurs équipes.

## Configuration {#setup}

### Navigation {#navigation}

Accédez à la page de l'annuaire des équipes depuis [Paramètres de l'organisation][1] ou depuis [**Teams**][2]. La [page de l'annuaire des équipes][1] répertorie toutes les équipes au sein de votre organisation.

### Créer une équipe {#create-team}

1. Sur la [page de l'annuaire des équipes][1], cliquez sur {{< ui >}}New Team{{< /ui >}} en haut à droite.
1. Choisissez un {{< ui >}}Team Name{{< /ui >}}.
1. Le {{< ui >}}Handle{{< /ui >}} se remplit en fonction du nom de votre équipe.
1. Utilisez le menu déroulant pour sélectionner les membres et les responsables d'équipe.
1. Fournissez un {{< ui >}}Description{{< /ui >}} facultatif.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

**Notes**: 

- Les caractères autorisés pour les noms d'équipe sont `a-z`, `A-Z`, `0-9` et `._-:/`. Remplacez les espaces par des traits de soulignement. 
- Les caractères autorisés pour les identifiants d'équipe sont `a-z`, `0-9` et `._-:/`. Le dernier caractère ne peut pas être un trait de soulignement.

### Modifier l'équipe {#modify-team}

1. Sur la [page de l'annuaire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier. La [page de détails de l'équipe][3] s'affiche. 
1. Cliquez sur la roue dentée {{< ui >}}Settings{{< /ui >}} en haut de l'écran. Une fenêtre contextuelle s'affiche.
1. Sélectionnez l'élément que vous souhaitez modifier.
1. Effectuez vos modifications, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

### Choisissez la source de provisionnement {#choose-provisioning-source}

Choisissez parmi trois options pour déterminer comment les administrateurs et les responsables d'équipe peuvent mettre à jour l'appartenance à l'équipe :

UI et API
: Mettre à jour l'appartenance uniquement via les actions de l'interface utilisateur et les appels API

SAML
: Utilisez un modèle *SAML strict* afin que les données du fournisseur d'identité déterminent l'appartenance à l'équipe

Toutes les sources
: Utilisez SAML comme point de départ et autorisez les remplacements via l'interface utilisateur et l'API

1. Sur la [page de l'annuaire des équipes][1], cliquez sur {{< ui >}}Teams Settings{{< /ui >}}.
1. Sélectionnez l'une des options sous {{< ui >}}Team Provisioning Sources{{< /ui >}}.

Si vous avez des équipes avec des membres existants, le choix de l'option SAML strict remplace vos paramètres et supprime les membres de ces équipes. Choisir l'option Toutes les sources préserve les appartenances existantes. Pour gérer les équipes et l'appartenance aux équipes à l'aide d'attributs SAML, consultez [Mapper des attributs SAML avec des équipes][4].

## Hiérarchies d'équipes {#team-hierarchies}

Imbriquez les équipes les unes dans les autres (sous-équipes) pour refléter la structure de votre organisation et visualisez le résultat sous forme de carte des équipes. Pour définir des relations hiérarchiques entre les équipes avec GitHub Teams, l'API Teams, Terraform ou l'interface utilisateur Datadog, consultez [Hiérarchies d'équipes][39].

## Identifiants d'équipe {#team-handle}

Un identifiant d'équipe lie les équipes aux ressources Datadog. Les identifiants d'équipe apparaissent dans les barres de recherche et les facettes au format `team:<team-handle>` ou `teams:<team-handle>`. 

Pour trouver un identifiant d'équipe :
1. Cliquez sur le nom de l'équipe dans la page du répertoire des équipes. La page de détails de l'équipe s'affiche.
1. L'identifiant d'équipe apparaît à droite du nom, en haut de la page.

Pour associer une ressource à une équipe définie, une équipe doit exister dans Datadog avec un identifiant d'équipe correspondant. Lorsque vous cliquez sur une ressource associée à une équipe définie, une petite fenêtre apparaît avec l'identifiant d'équipe et des informations supplémentaires. Les équipes définies offrent des fonctionnalités supplémentaires telles que le filtre d'équipe ci-dessous. 

Les identifiants d'équipe qui ne sont pas associés à une équipe définie dans Datadog se comportent de la même manière que les tags. Convertissez tous les identifiants d'équipe non définis en équipes définies pour tirer parti des fonctionnalités de Teams.

### Associer des ressources à des identifiants d'équipe {#associate-resources-with-team-handles}

Datadog prend en charge l'association des ressources suivantes avec des identifiants d'équipe :

- [Tableaux de bord][5]
- [Incidents][6]
- [Monitors][7]
- [Resource Catalog][8]
- [Catalogue][9]
- [Service Level Objectives][10]
- Tests Synthetic, variables globales, emplacements privés

### Envoyez des notifications vers un canal de communication spécifique {#send-notifications-to-a-specific-communication-channel}

Ajoutez un canal de notification à votre équipe pour acheminer les alertes vers des canaux de communication tels que Slack ou Microsoft Teams. Les alertes de monitor ciblant `@team-<handle>` sont redirigées vers le canal sélectionné. 

1. Sur la [page de l'annuaire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier. 
1. Cliquez sur la roue dentée {{< ui >}}Settings{{< /ui >}} en haut de l'écran. Une fenêtre contextuelle s'affiche.
1. Sélectionnez {{< ui >}}Notifications{{< /ui >}}.
1. Ajoutez un canal, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

## Filtre d'équipe {#team-filter}

Le filtre d'équipe personnalise votre expérience dans Datadog en vous montrant le contenu associé à vos équipes. La liste {{< ui >}}My Teams{{< /ui >}} inclut les équipes dont vous êtes membre et les équipes que vous avez sélectionnées comme favorites.

{{< img src="/account_management/teams/team-filter.png" alt="Page de liste des monitors avec un cadre rouge autour du filtre d'équipe. Deux équipes sur trois sélectionnées dans My Teams.">}}

Lorsque vous activez le filtre d'équipe, vous ne voyez que les ressources associées à vos équipes ou aux services appartenant à vos équipes. L'état du filtre d'équipe est global et persistant, de sorte que Datadog applique votre contexte d'équipe lorsque vous naviguez entre différents produits.

Le filtre d'équipe fonctionne en ajoutant des termes de recherche basés sur l'équipe à la requête de recherche. Lorsque vous activez le filtre d'équipe, vous pouvez voir les termes de recherche basés sur l'équipe qu'il ajoute dans la barre de recherche.

### Équipes favorites {#favorite-teams}

Vous pouvez être intéressé par les ressources d'une équipe particulière sans en être membre. Ajouter une équipe à vos équipes favorites vous permet d'obtenir des vues filtrées sur les ressources de cette équipe sans rejoindre l'équipe.

Vos équipes favorites apparaissent aux côtés des équipes auxquelles vous appartenez en haut de la page de l'annuaire des équipes et dans le filtre d'équipe.

#### Ajouter ou supprimer des équipes favorites {#add-or-remove-favorite-teams}

Vous pouvez ajouter ou supprimer une équipe de vos favoris depuis la page de l'annuaire des équipes ou depuis le filtre d'équipe.

Depuis la [page de l'annuaire des équipes][1] :
1. Cliquez sur l'équipe que vous souhaitez ajouter aux favoris. La [page de détails de l'équipe][3] s'affiche.
1. Cliquez sur {{< ui >}}Add Favorite{{< /ui >}} ou {{< ui >}}Remove Favorite{{< /ui >}} dans le coin supérieur droit.

Alternativement, toujours depuis la page de l'annuaire des équipes :
1. Survolez l'équipe que vous souhaitez ajouter ou supprimer. Des icônes en ligne apparaissent à droite du nom de l'équipe.
1. Cliquez sur l'icône étoile ({{< ui >}}Add to Favorites{{< /ui >}} ou {{< ui >}}Remove from Favorites{{< /ui >}}).

Depuis le filtre d'équipe :
1. Si le filtre est réduit, cliquez sur {{< ui >}}My Teams{{< /ui >}} pour le développer.
1. Cliquez sur {{< ui >}}Add Favorites{{< /ui >}}. Une zone de recherche et une liste d'équipes apparaissent.
1. Pour restreindre la liste des équipes, commencez à saisir un nom d'équipe dans la zone de recherche.
1. Cliquez sur l'étoile à côté de l'équipe souhaitée pour l'ajouter à vos favoris ou la supprimer.

### Produits pris en charge {#supported-products}

Le tableau suivant décrit les produits dans lesquels vous pouvez utiliser le filtre d'équipe :

| Page de liste des produits              | Base de filtrage                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | Service appartenant à des équipes (déterminé par la propriété dans le [Catalog][12]) |
| [Apps][21]                     | Identifiant d'équipe                                                                        |
| [Work Management projects][22] | Identifiant d'équipe                                                                        |
| [Connections][23]              | Identifiant d'équipe                                                                        |
| [Connection Groups][24]        | Identifiant d'équipe                                                                        |
| [Cross Org Connections][25]    | Identifiant d'équipe                                                                        |
| [Datastores][26]               | Identifiant d'équipe                                                                        |
| [Data Streams Monitoring][18]  | Identifiant d'équipe                                                                        |
| [Dashboards][11]               | Identifiant d'équipe                                                                        |
| [Incidents][13]                | Identifiant d'équipe                                                                        |
| [Integrations][27]             | Identifiant d'équipe                                                                        |
| [Logs Error Tracking][16]      | Service appartenant à des équipes (déterminé par la propriété dans le [Catalog][12]) |
| [Logs Pipelines][28]           | Identifiant d'équipe                                                                        |
| [Monitors][14]                 | Identifiant d'équipe                                                                        |
| [Notebooks][20]                | Identifiant d'équipe                                                                        |
| [Observability Pipelines][29]  | Identifiant d'équipe                                                                        |
| [On-Call][30]                  | Service appartenant à des équipes (déterminé par la propriété dans le [Catalog][12]) |
| [Powerpacks][32]               | Identifiant d'équipe                                                                        |
| [Private Action Runner][31]    | Identifiant d'équipe                                                                        |
| [Tables de référence][33]         | Identifiant d'équipe                                                                        |
| [Resource Catalog][8]          | Identifiant d'équipe                                                                        |
| [Applications RUM][34]                 | Identifiant d'équipe                                                                        |
| [Règles de sécurité][35]           | Identifiant d'équipe                                                                        |
| [Suppressions de sécurité][36]    | Identifiant d'équipe                                                                        |
| [Service Level Objectives][17] | Identifiant d'équipe                                                                        |
| [Sheets][37]                   | Identifiant d'équipe                                                                        |
| [Catalogue][12]         | Identifiant d'équipe                                                                        |
| [Tests Synthetic][19]          | Identifiant d'équipe                                                                        |
| [Workflows][38]                | Identifiant d'équipe                                                                        |


## Autorisations {#permissions}

Tout utilisateur disposant d'un rôle avec l'autorisation de gestion des équipes peut créer, renommer, supprimer des équipes et modifier les identifiants d'équipe. Les utilisateurs disposant de `user_access_manage` peuvent ajouter, supprimer et promouvoir des membres et des responsables d'équipe.

## Gérer les équipes {#manage-teams}

Pour personnaliser votre équipe, consultez [Gestion d'équipe][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /fr/account_management/teams/manage/
[4]: /fr/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /fr/dashboards/#dashboard-details
[6]: /fr/incident_response/incident_management/
[7]: /fr/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /fr/internal_developer_portal/catalog/entity_model/
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
[22]: https://app.datadoghq.com/work
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
[39]: /fr/account_management/teams/manage/#team-hierarchies