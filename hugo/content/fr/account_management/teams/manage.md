---
description: Personnalisez les pages d'équipe, gérez les membres, configurez des sous-équipes
  et paramétrez l'accès aux équipes via des fournisseurs d'identité ou le mappage
  d'attributs SAML.
title: Gestion d'équipe
---
## Détails de l'équipe {#team-detail}

Chaque équipe dispose d'une page de détails qui affiche des informations sur l'équipe, ses membres et ses ressources associées. Accédez à une page de détails d'équipe en cliquant sur une équipe depuis le [Teams directory][1].

La page de détails de l'équipe est organisée en trois onglets :

- **Info**: Détails principaux de l'équipe et membres.
- **Resources**: Les ressources Datadog associées à l'équipe.
- **On-Call** : la configuration [Datadog On-Call][6] de l'équipe.

L'en-tête de l'équipe affiche l'avatar, la bannière, le nom et la description de l'équipe. Personnalisez l'apparence de votre équipe en choisissant un emoji comme avatar et une bannière. L'avatar emoji s'affiche à côté du nom de l'équipe dans les listes de Datadog.

### Onglet Info {#info-tab}

Détails principaux de l'équipe : canaux de notification, liens, connexions, hiérarchie (équipe parente et sous-équipes) et membres.

### Onglet Resources {#resources-tab}

Les ressources Datadog appartenant à l'équipe, regroupées par domaine tel que la productivité, les logiciels, les performances et les coûts cloud. Si l'équipe possède des sous-équipes, utilisez le bouton à bascule **Include Subteams** pour afficher leurs ressources aux côtés de celles de l'équipe.

### Onglet On-Call {#on-call-tab}

La configuration [Datadog On-Call][6] de l'équipe : membres, plannings, politiques d'escalade, routage et automatisation des transferts.

### Personnaliser les paramètres {#customize-settings}

Pour modifier les détails d'une équipe, vous devez disposer de l'autorisation `user_access_manage` ou `teams_manage`. Vous pouvez également être membre ou responsable d'une équipe configurée pour permettre aux membres et aux responsables de modifier les détails de l'équipe.

Modifiez les détails d'une équipe directement depuis sa page de détails :

- **Avatar, nom et description** : Survolez le nom de l'équipe et cliquez sur l'icône de modification (crayon).
- **Bannière** : Survolez la bannière et cliquez sur l'icône de modification (crayon).
- **Sections de l'onglet Info** : Survolez une section, telle que Links, Members ou Notification Channels, et cliquez sur son icône de modification pour la mettre à jour sur place.

Utilisez le menu Settings (engrenage) dans l'en-tête de l'équipe pour les actions suivantes :

- **Configure Notifications** : Ajoutez ou mettez à jour les canaux de notification de l'équipe. Les cibles prises en charge incluent Slack, Microsoft Teams, PagerDuty, l'e-mail et ServiceNow.
- **Edit Roles and Permissions** : Gérez les rôles et les autorisations associés à l'équipe.
- **Edit Team Handle** : Changez l'identifiant de l'équipe.
- **Edit Connections** : Connectez l'équipe à des systèmes externes. Connectez une **GitHub team** pour associer l'équipe Datadog à une équipe GitHub, ou connectez un **ServiceNow assignment group** pour acheminer automatiquement les incidents et les demandes de changement.
- **Join Team** ou **Leave Team** : Ajoutez-vous à l'équipe ou retirez-vous de celle-ci.

## Appartenance à l'équipe {#team-membership}

### Responsable d'équipe {#team-manager}

Pour différencier les membres de votre équipe, désignez-en certains comme responsables d'équipe. Dans la liste des membres, un badge « TEAM MANAGER » apparaît à côté du nom des responsables d'équipe.

### Autorisations de modification de l'équipe {#team-modification-permissions}

Dans les paramètres des rôles et autorisations de l'équipe, spécifiez quels utilisateurs peuvent modifier l'appartenance à l'équipe. Les options suivantes sont disponibles :
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

La liste est triée par ordre de permissivité croissante. Chaque option de la liste inclut les groupes mentionnés dans les entrées précédentes. Par exemple, sélectionner « team managers » signifie que les responsables d'équipe ainsi que les utilisateurs disposant de `user_access_manage` peuvent modifier l'appartenance à l'équipe.

L'option que vous sélectionnez pour déterminer quels utilisateurs peuvent ajouter et supprimer des membres définit si vous pouvez ajouter l'équipe aux listes de contrôle d'accès. Il existe deux types d'équipes : les équipes sur invitation uniquement et les équipes ouvertes.

Équipes sur invitation uniquement
: Équipes à adhésion restreinte. Peuvent être définies comme destinataires de contrôle d'accès. Créées lorsque vous restreignez la modification de l'appartenance à l'équipe à l'une des trois premières options.

Équipes ouvertes
: Équipes à adhésion non restreinte. Ne peuvent pas être définies comme destinataires de contrôle d'accès. Créées lorsque vous autorisez {{< ui >}}Anyone in the organization{{< /ui >}} à modifier l'appartenance à l'équipe.

Les utilisateurs disposant de l'autorisation `user_access_manage` peuvent définir des règles par défaut déterminant qui peut ajouter ou supprimer des membres ou modifier les détails de l'équipe. Définissez des règles par défaut avec le bouton {{< ui >}}Default Settings{{< /ui >}} sur la page du répertoire des équipes. Définissez des exceptions à ces règles pour une équipe donnée dans le panneau des détails de l'équipe.

### Équipes gérées en dehors de Datadog {#teams-managed-outside-datadog}

Dans certains cas, personne ne peut modifier directement la composition d'une équipe dans Datadog (pas même un utilisateur disposant de `user_access_manage`) :
- Si votre organisation a sélectionné SAML comme seule source de provisionnement des équipes, les correspondances d'équipes SAML contrôlent la composition des équipes. Vous ne pouvez pas modifier l'appartenance à l'équipe via Datadog.
- Si une équipe est gérée via un fournisseur d'identité, alors le fournisseur d'identité contrôle l'appartenance à l'équipe. Vous ne pouvez pas modifier l'appartenance à l'équipe via Datadog.

Une équipe gérée en externe par un fournisseur d'identité affiche un badge **Managed** dans son en-tête.

#### Équipes avec plusieurs sources {#teams-with-multiple-sources}

Une équipe peut être connectée à plus d'une source, bien que le type de source détermine le niveau de contrôle.

**Sources qui gèrent l'équipe**
- **Sources :** SCIM et SAML en mode SAML uniquement
- Une équipe est gérée lorsque SCIM la provisionne ou lorsque votre organisation utilise le provisionnement SAML uniquement. La source contrôle le nom, l'identifiant et la composition de l'équipe. Vous ne pouvez pas les modifier via Datadog ou une autre source. D'autres sources peuvent rester connectées. Par exemple, vous pouvez acheminer des incidents depuis [ServiceNow][12].

**Sources qui synchronisent l'équipe**
- **Sources :** [GitHub][9], [ServiceNow][12] et SAML lorsqu'il ne s'agit pas de votre seule source de provisionnement
- Ces sources synchronisent une équipe sans en prendre le contrôle exclusif. Elles définissent le nom, l'identifiant et la composition de l'équipe. Vous pouvez toujours connecter d'autres sources à l'équipe et la modifier depuis l'interface utilisateur Datadog, la [Teams API][10] ou le [Terraform provider][11]. Si plusieurs sources synchronisent des membres vers la même équipe, Datadog combine les membres de chaque source.

<div class="alert alert-info">SCIM peut commencer à gérer une équipe déjà synchronisée avec GitHub ou ServiceNow. L'équipe reste connectée à cette source, mais SCIM contrôle son nom, son identifiant et ses membres.</div>

<div class="alert alert-info">GitHub et ServiceNow ne mettent à jour le nom d'une équipe que si aucune source de gestion ne contrôle l'équipe. La source doit également avoir créé l'équipe avec {{< ui >}}Import, create, and link teams{{< /ui >}}. Ils ne modifient jamais l'identifiant d'une équipe après sa création.</div>


## Hiérarchies d'équipes {#team-hierarchies}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
Cette fonctionnalité n'est pas prise en charge pour le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).
</div>
{{< /site-region >}}

Créez une Teams map pour visualiser les hiérarchies d'équipes, en imbriquant les équipes les unes dans les autres (sous-équipes) pour refléter la structure réelle de votre entreprise. Le résultat est un modèle de responsabilité plus complet qu'une simple liste d'équipes sans hiérarchie ni liens entre elles. Les équipes associées, les équipes parentes, les équipes sœurs et les sous-équipes d'une équipe apparaissent sur sa page d'équipe, dans la section **Hierarchy** de l'onglet **Info**. Pour explorer la carte complète de toutes les équipes de votre organisation, consultez la [Teams map][7] dans le Datadog Internal Developer Portal.

{{< img src="/account_management/teams/github/manage/teams-map.png" alt="Teams map présentant une hiérarchie d'équipes parentes et enfants, avec le panneau de détails de l'équipe sélectionnée affichant ses membres et ses sous-équipes" style="width:100%;" >}}

Une fois les hiérarchies définies, vous pouvez :

- **Faire remonter les problèmes** : lorsqu'un problème doit être traité au-delà de l'équipe responsable, la hiérarchie le fait remonter à l'équipe parente pour une meilleure visibilité et une résolution plus rapide, sans avoir à rechercher manuellement le prochain interlocuteur dans la chaîne.
- **Roll-up filtering** : sélectionnez une équipe parente pour voir toutes les données associées à ses sous-équipes, sans avoir à sélectionner chacune d'entre elles. Utile pour les vues au niveau des directeurs et des vice-présidents, où vous vous intéressez à l'empreinte d'une organisation entière plutôt qu'à celle d'une seule équipe.
- **Simplifier le contrôle d'accès** : accordez l'accès une fois au niveau de l'équipe parente pour appliquer automatiquement des autorisations cohérentes à toutes les sous-équipes.

{{< img src="account_management/teams/teams_filter_hierarchies2.png" alt="Menu déroulant de filtrage d'équipe avec une équipe parente déployée affichant ses sous-équipes sélectionnées à l'aide de cases à cocher" style="width:35%;" >}}

### Configurer des hiérarchies d'équipes {#set-up-team-hierarchies}

Vous pouvez définir des relations hiérarchiques entre les équipes de cinq manières :

- **GitHub Teams** : si vous avez utilisé [GitHub][9] pour configurer vos équipes Datadog et que vous avez configuré des hiérarchies d'équipes GitHub, ces liens d'équipe sont automatiquement synchronisés avec Datadog lors du provisionnement et apparaissent dans votre Teams map.
- **Groupes d'affectation ServiceNow** : si vous avez utilisé [ServiceNow][12] pour configurer vos équipes Datadog et que vos groupes d'affectation ont des groupes parents, ces liens sont automatiquement synchronisés avec Datadog lors du provisionnement et apparaissent dans votre Teams map.
- **Teams API** : voir [Créer un lien de hiérarchie d'équipe][5].
- **Terraform** : utilisez la ressource [`datadog_team_hierarchy_links`][8].
- **Datadog UI** : définissez les relations directement sur la page d'une équipe :
   1. Sur la [page du répertoire des équipes][1], cliquez sur l'équipe à laquelle vous souhaitez ajouter une relation de sous-équipe ou d'équipe parente.
   1. Dans l'onglet {{< ui >}}Info{{< /ui >}} de la page de l'équipe, cliquez sur {{< ui >}}Edit{{< /ui >}} dans la section {{< ui >}}Hierarchy{{< /ui >}}.
   1. Sélectionnez les équipes parentes ou les sous-équipes associées à l'équipe, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

## Limites {#limits}

- Une organisation peut avoir jusqu'à 5,000 équipes.
- Une hiérarchie d'équipes peut comporter jusqu'à 10 niveaux de profondeur.

## Gérer les équipes via un fournisseur d'identité {#manage-teams-through-an-identity-provider}

Lorsque vous configurez une équipe gérée, vous configurez les propriétés suivantes de l'équipe en externe via une intégration de fournisseur d'identité :
 - Nom de l'équipe
 - Identifiant de l'équipe
 - Appartenance à l'équipe (synchronisée depuis le groupe correspondant du fournisseur d'identité)

Pour maintenir la cohérence des équipes gérées avec leur configuration dans votre fournisseur d'identité, effectuez les modifications des propriétés gérées dans le fournisseur d'identité plutôt que via le site ou l'API Datadog.

Datadog prend en charge Okta et d'autres fournisseurs d'identité conformes à SCIM pour les équipes gérées.

Pour plus d'informations sur les capacités des équipes gérées et sur la façon de les configurer, consultez [SCIM][3].

## Mappage d'attributs SAML {#saml-attribute-mapping}

Pour gérer des équipes et leur composition à l'aide d'attributs SAML, consultez la rubrique [Mapper des attributs SAML avec des équipes][2].

## Déléguer la gestion des équipes {#delegate-team-management}

Pour un modèle d'adhésion ouvert, configurez vos paramètres d'équipe par défaut afin que {{< ui >}}Anyone in the organization{{< /ui >}} puisse ajouter ou supprimer des membres. Attribuez l'autorisation `teams_manage` aux rôles appropriés pour permettre à quiconque de créer des équipes ou de modifier les détails d'une équipe.

Si vous préférez un modèle d'adhésion piloté par l'équipe, configurez vos paramètres d'équipe par défaut afin que {{< ui >}}Team Managers{{< /ui >}} ou {{< ui >}}Team Managers and Members{{< /ui >}} puisse ajouter ou supprimer des membres. Attribuez l'autorisation `teams_manage` à un rôle contenant tous vos responsables d'équipe.

Pour appliquer un modèle d'adhésion strict, configurez vos paramètres d'équipe par défaut afin que {{< ui >}}Only users with user_access_manage{{< /ui >}} puisse ajouter ou supprimer des membres. Attribuez l'autorisation `teams_manage` uniquement aux administrateurs de l'organisation.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /fr/account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /fr/account_management/scim/
[5]: /fr/api/latest/teams/create-a-team-hierarchy-link/
[6]: /fr/incident_response/on-call/
[7]: https://app.datadoghq.com/software?selectedComponent=team
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_hierarchy_links
[9]: /fr/account_management/teams/github/
[10]: /fr/api/latest/teams/
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: /fr/account_management/teams/servicenow/