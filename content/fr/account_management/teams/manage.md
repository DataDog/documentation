---
description: Personnalisez les pages d'équipe, gérez les membres, configurez des sous-équipes
  et définissez l'accès aux équipes via les fournisseurs d'identité ou le mappage
  d'attributs SAML.
title: Gestion d'équipe
---

## Détail de l'équipe

Chaque équipe dispose d'une page de détails qui affiche des informations sur l'équipe, ses membres et les ressources qui lui sont associées. Accédez à une page de détails en cliquant sur une équipe depuis le [répertoire des équipes][1].

La page de l'équipe affiche les ressources suivantes associées à votre équipe :
- Dashboards
- Notebooks
- Monitors
- Services
- Liens
- Incidents en cours
- Endpoints de l'API

Vous pouvez modifier les ressources affichées et leur ordre sur la page.

Personnalisez l'apparence de votre équipe en choisissant un avatar emoji et une bannière. L'avatar emoji s'affiche à côté du nom de l'équipe dans les listes à travers Datadog.

Consultez les instructions suivantes pour personnaliser votre équipe.

### Personnaliser la mise en page

Pour modifier la présentation de la page de l'équipe, vous devez avoir l'autorisation `user_access_manage` ou `teams_manage`. Vous pouvez également être membre ou responsable d'une équipe configurée pour permettre aux membres et aux responsables de modifier les détails de l'équipe.

1. Cliquez sur **Page Layout**. La boîte de dialogue de disposition de la page s'affiche.
1. Pour réorganiser les ressources, cliquez sur les icônes de la poignée de déplacement et faites-les glisser.
1. Pour masquer une ressource, passez la souris sur un élément et cliquez sur l'icône de l'œil (**Hide content**).

Les ressources masquées s'affichent en bas de la boîte de dialogue de mise en page. Pour révéler une ressource, passez la souris dessus et cliquez sur l'icône **Masquer le contenu**.

### Customize settings

Pour modifier les détails de l'équipe, vous devez avoir l'autorisation `user_access_manage` ou `teams_manage`. Vous pouvez également être membre ou responsable d'une équipe configurée pour permettre aux membres et aux responsables de modifier les détails de l'équipe.

Cliquez sur **Settings**. La boîte de dialogue des réglages apparaît.

Dans la boîte de dialogue des paramètres, utilisez le menu pour personnaliser les paramètres suivants de l'équipe :
- Membres
- Liens
- Nom et description
- Avatar et bannière
- Disposition de la page
- Autorisations
- Section Notifications
- Connexion GitHub

## Composition de l'équipe

Pour différencier les membres de votre équipe, désignez-les comme chefs d'équipe. Dans la liste des membres, un badge « CHEF D'EQUIPE » apparaît à côté du nom des chefs d'équipe.

Sous les paramètres de l'équipe, indiquez quels utilisateurs peuvent modifier la composition de l'équipe. Les options suivantes sont disponibles :
- Seuls les utilisateurs disposant de l'autorisation `user_access_manage` 
- Chefs d'équipe
- Chefs et membres d'équipe
- Toute personne de l'organisation

Les utilisateurs disposant de l'autorisation `user_access_manage` peuvent définir des règles par défaut concernant les personnes autorisées à ajouter ou à supprimer des membres, ou à modifier les détails de l'équipe. Définissez les règles par défaut à l'aide du bouton **Default Settings** dans la page du répertoire de l'équipe. Ces règles peuvent être modifiées pour une équipe individuelle dans le panneau des détails de l'équipe.

### Sous-équipes (équipes hiérarchiques)

Avec les sous-équipes, vous pouvez imbriquer les équipes les unes dans les autres afin de reproduire la hiérarchie de votre entreprise dans Datadog, ce qui permet d'obtenir un modèle de propriété plus complet et plus précis. Les sous-équipes améliorent également l'expérience de filtrage : sélectionnez une équipe plus large (comme un groupe au niveau directeur) pour trouver toutes les données associées à l'une de ses sous-équipes.
    {{< img src="account_management/teams/teams_filter_hierarchies.png" alt="Filtrer les équipes hiérarchiques" >}}

Dans l'onglet **Subteams**, vous pouvez ajouter et supprimer des équipes existantes. Pour avoir une vision claire de la place d'une équipe dans sa hiérarchie, accédez à [**Service Management** > **Teams** > **Map View**][4], puis recherchez l'équipe avec son nom.
Pour automatiser la gestion des sous-équipes en fonction de la structure hiérarchique de votre organisation, utilisez les [API Teams][5].

## Gérer des équipes par le biais d'un fournisseur d'identité

Lorsque vous créez une équipe gérée, vous configurez les propriétés suivantes de l'équipe en externe par le biais de l'intégration d'un fournisseur d'identité :
 - Nom de l'équipe
 - Handle d'équipe
 - Appartenance à une équipe (synchronisée à partir du groupe de fournisseurs d'identité correspondant)

Pour garantir que les équipes gérées restent cohérentes avec leur configuration dans votre fournisseur d'identité, vous devez apporter les modifications aux propriétés gérées dans le fournisseur d'identité, et non via le site Datadog ou l'API.

Datadog prend en charge Okta et d'autres fournisseurs d'identité conformes au SCIM pour la gestion des équipes.

Pour en savoir plus sur les capacités des équipes gérées et leur configuration, consultez la section [SCIM][3].

## Mappage des attributs SAML

Pour gérer des équipes et leur composition à l'aide d'attributs SAML, consultez la rubrique [Associer des attributs SAML à des équipes][2].

## Déléguer la gestion d'équipe

Pour un modèle d'adhésion ouvert, configurez les paramètres par défaut de votre équipe de sorte que **N'importe qui dans l'organisation** puisse ajouter ou retirer des membres. Attribuez l'autorisation `teams_manage` aux rôles appropriés pour permettre à quiconque de créer des équipes ou de modifier les détails d'une équipe.

Si vous préférez un modèle d'adhésion piloté par les équipes, définissez les paramètres par défaut de votre équipe de sorte que les **responsables d'équipe** ou les **responsables et membres d'équipe** puissent ajouter ou retirer des membres. Attribuez l'autorisation `teams_manage` à un rôle contenant tous vos responsables d'équipe.

Pour appliquer un modèle d'adhésion strict, configurez les paramètres par défaut de votre équipe de sorte que **seuls les utilisateurs disposant de user_access_manage** puissent ajouter ou retirer des membres. Attribuez l'autorisation `teams_manage` uniquement aux administrateurs d'organisation.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /fr/account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /fr/account_management/scim/
[4]: https://app.datadoghq.com/teams/map
[5]: /fr/api/latest/teams/#add-a-member-team