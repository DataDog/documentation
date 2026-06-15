---
title: Équipes
---

## Présentation
La solution Teams Datadog permet à des groupes d'utilisateurs d'organiser les ressources de leurs équipes au sein de Datadog, puis de mettre en avant ces ressources sur l'ensemble de la plateforme Datadog.

Grâce à Teams, vous pouvez lier des ressources, telles que des dashboards, des services, des monitors et des incidents, à un groupe d'utilisateurs. Vous avez également la possibilité d'ajouter des liens spécifiques à une équipe vers des canaux Slack, des tableaux Jira, des référentiels GitHub et bien plus encore.

La composition des équipes est gérée de manière flexible. Un utilisateur peut rejoindre des équipes, être ajouté par d'autres membres, ou être ajouté par un administrateur. Un utilisateur peut faire partie de plusieurs équipes.

## Configuration

### Navigation

Accédez à la page de répertoire des équipes depuis les [Paramètres de l'organisation][1] ou en accédant à [**Service Management > Teams**][2]. La [page de répertoire des équipes][1] répertorie toutes les équipes de votre organisation.

### Créer une équipe

1. Sur la [page du répertoire des équipes][1], cliquez sur **New Team** en haut à droite.
1. Attribuez un nom d'équipe dans le champ **Team Name**.
1. Le champ **Handle** est renseigné selon le nom que vous avez choisi.
1. Si vous le souhaitez, présentez l'équipe dans le champ **Description**.
1. Sélectionnez des membres à l'aide du menu déroulant.
1. Cliquez sur **Create**.

**Remarque :** les caractères autorisés pour les noms et identifiants d'équipe sont `a-z`, `A-Z`, `0-9` et `._-:/`. Remplacez les espaces par des traits de soulignement.

### Modifier une équipe

1. Sur la [page de répertoire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier.
1. Cliquez sur l'icône **Settings** en haut de l'écran. Une fenêtre contextuelle s'affiche.
1. Sélectionnez l'élément que vous souhaitez modifier.
1. Effectuez vos modifications, puis cliquez sur **Save**.

### Choisir la source de provisionnement

Choisissez parmi les trois options suivantes pour définir la façon dont les administrateurs et responsables d'équipe peuvent modifier la composition d'une équipe :

UI and API
: La composition de l'équipe peut uniquement être modifiée via l'interface ou des appels API.

SAML
: Utilisez un modèle *SAML strict* afin de déterminer la composition de l'équipe à partir des données du fournisseur d'identité.

All sources
: Cette option repose sur le SAML, mais permet de modifier la composition de l'équipe via l'interface et l'API.

1. Sur la [page de répertoire des équipes][1], cliquez sur **Teams Settings**.
1. Sélectionnez l'une des options disponibles sous **Team Provisioning Sources**.

Si certaines de vos équipes comptent déjà des membres, le choix de l'option SAML stricte remplace vos paramètres actuels et supprime les membres de ces équipes. L'option « All Sources » permet de conserver les appartenances existantes. Pour gérer les équipes et les membres à l'aide d'attributs SAML, consultez la section [Mapper des attributs SAML à des équipes][3].

## Handle d'équipe

Un handle permet d'associer des équipes à des ressources Datadog. Pour spécifier une équipe dans une barre de recherche ou une facette, utilisez le format `team:<team-handle>` o `teams:<team-handle>`. 

Pour rechercher le handle d'une équipe, procédez comme suit :
1. Cliquez sur le nom de l'équipe sur la page du répertoire des équipes. Un volet latéral comportant des détails sur l'équipe s'affiche alors.
1. Recherchez le champ **handle** en haut du volet.

Pour associer une ressource à une équipe donnée, une équipe Datadog doit posséder le handle d'équipe correspondant. Lorsque vous cliquez sur une ressource associée à une équipe, une petite fenêtre comportant le handle de l'équipe et des informations complémentaires apparaît. Les équipes permettent de bénéficier de fonctionnalités supplémentaires, comme le filtre d'équipe décrit ci-dessous.

Les handles qui ne sont pas associés à une équipe donnée dans Datadog fonctionnent comme des tags. Associez tous les handles d'équipes non définis à des équipes existantes pour tirer parti des fonctionnalités de Teams.

### Associer des ressources à des handles d'équipe

Datadog vous permet d'associer les ressources suivantes à des handles d'équipe :

- [Dashboards][4]
- [Incidents][5]
- [Monitors][6]
- [Resource Catalog][7]
- [Service Catalog][8]
- [Service Level Objectives][9]
- Tests Synthetic, variables globales et emplacements privés

### Envoyer des notifications à un canal de communication spécifique 

Ajoutez un canal de notification à votre équipe pour acheminer les alertes vers des canaux de communication comme Slack ou Microsoft Teams. Les alertes de monitor adressées à `@team-<handle>` sont redirigées vers le canal sélectionné.

1. Sur la [page de répertoire des équipes][1], cliquez sur l'équipe que vous souhaitez modifier.
1. Cliquez sur l'icône **Settings** en haut de l'écran. Une fenêtre contextuelle s'affiche.
1. Sélectionnez **Notifications**.
1. Ajoutez un canal, puis cliquez sur **Save**.

## Filtre d'équipe

Le filtre d'équipe permet de personnaliser l'interface Datadog d'un utilisateur, en lui proposant du contenu associé à ses équipes.

Dans chaque vue représentant une liste, vous pouvez utiliser le filtre d'équipe de deux façons différentes :
- En haut à gauche de la vue, dans la liste des facettes de recherche
- Sous la forme d'un terme de recherche dans la barre de recherche


Lorsqu'un utilisateur active un filtre d'équipe, seules les ressources associées à ses équipes ou aux services appartenant à ses équipes s'affichent. La valeur du filtre d'équipe s'applique globalement et est conservée. Ainsi, lorsqu'un utilisateur passe d'une solution Datadog compatible à une autre, le contexte d'équipe est préservé.

Le tableau ci-dessous répertorie les solutions compatibles avec le filtre d'équipe :

| Page de liste de la solution       | Base du filtre                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][10]         | Handle d'équipe                                                                      |
| [Resource Catalog][7]   | Handle d'équipe                                                                      |
| [Service Catalog][11]    | Handle d'équipe                                                                      |
| [Incidents][12]          | Handle d'équipe                                                                      |
| [Monitors][13]          | Handle d'équipe                                                                      |
| [APM Error Tracking][14] | Service détenu par des équipes (selon le [Service Catalog][11]) |
| [Logs Error Tracking][15] | Service détenu par des équipes (selon le [Service Catalog][11]) |
| [Service Level Objectives][16] | Handle d'équipe                                                                 |
| [Data Streams Monitoring][17]  | Handle d'équipe                                                                 |
| [Tests Synthetic Monitoring][18]          | Handle d'équipe                                                                 |
| [Notebooks][19]          | Handle d'équipe                                                                      |



## Autorisations

Les utilisateurs disposant d'un rôle doté de l'autorisation Teams Manage peuvent créer, renommer et supprimer des équipes, ainsi que modifier leur handle. Les utilisateurs ayant l'autorisation `user_access_manage` peuvent ajouter, retirer et promouvoir des membres d'équipes et des responsables.

## Gérer des équipes

### Composition de l'équipe

Pour différencier certains membres de votre équipe, attribuez-leur le titre de gestionnaire d'équipe. Un badge spécifique MGR figure en regard des noms des responsables d'équipe.

Sous les paramètres de l'équipe, indiquez les utilisateurs autorisés à modifier la composition de l'équipe. Vous pouvez choisir d'autoriser les utilisateurs suivants :
- Uniquement les utilisateurs disposant de l'autorisation `user_access_manage`
- Les responsables d'équipe
- Les responsables d'équipe et les membres
- N'importe quel utilisateur de l'organisation

Les utilisateurs disposant de l'autorisation `user_access_manage` peuvent définir des règles par défaut afin de déterminer les personnes pouvant ajouter ou retirer des membres, ou encore modifier les informations de l'équipe. Pour définir des règles par défaut, cliquez sur **Default Settings** depuis la page du répertoire des équipes. Le volet des informations d'une équipe vous permet d'ignorer ces stratégies pour l'équipe en question.

### Mappage d'attributs SAML

Pour gérer des équipes et leur composition à l'aide d'attributs SAML, consultez la rubrique [Associer des attributs SAML à des équipes][3].

### Déléguer la gestion d'équipe

Pour un modèle de gestion ouvert, configurez les paramètres par défaut de votre équipe afin que tous les utilisateurs (option **Anyone in the organization**) puissent ajouter ou retirer des membres. Attribuez l'autorisation `teams_manage` aux rôles appropriés pour que n'importe quel utilisateur puisse créer des équipes ou modifier leurs détails.

Pour un modèle de gestion hiérarchisé, configurez les paramètres par défaut de votre équipe afin que les responsables d'équipes (option **Team Managers**), ou les responsables d'équipe et les membres (option **Team Managers and Members**), puissent ajouter ou retirer des membres. Attribuez l'autorisation `teams_manage` à un rôle incluant tous vos responsables d'équipe.

Pour un modèle de gestion strict, configurez les paramètres par défaut de votre équipe afin que seuls les utilisateurs disposant de l'autorisation user_access_manage (option **Only users with user_access_manage**) puissent ajouter ou retirer des membres. Attribuez uniquement l'autorisation `teams_manage` aux administrateurs de votre organisation.


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /fr/account_management/saml/mapping/#map-saml-attributes-to-teams
[4]: /fr/dashboards/#dashboard-details
[5]: /fr/service_management/incident_management/incident_details#overview-section
[6]: /fr/monitors/configuration/?tab=thresholdalert#add-metadata
[7]: /fr/infrastructure/resource_catalog/
[8]: /fr/tracing/service_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[9]: /fr/service_management/service_level_objectives/#slo-tags
[10]: https://app.datadoghq.com/dashboard/lists
[11]: https://app.datadoghq.com/services
[12]: https://app.datadoghq.com/incidents
[13]: https://app.datadoghq.com/monitors/manage
[14]: https://app.datadoghq.com/apm/error-tracking
[15]: https://app.datadoghq.com/logs/error-tracking
[16]: https://app.datadoghq.com/slo/manage
[17]: https://app.datadoghq.com/data-streams
[18]: https://app.datadoghq.com/synthetics
[19]: https://app.datadoghq.com/notebook/list/