---
title: Créer des rôles Datadog personnalisés
kind: documentation
private: true
beta: true
description: Création de rôles personnalisés et modification des autorisations d'un rôle existant.
further_reading:
  - link: account_management/users
    tag: Documentation
    text: Gérer vos utilisateurs Datadog
  - link: account_management/saml
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: account_management/multi_organization
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
<div class="alert alert-warning">
La création et la modification de rôles personnalisés sont réservées aux utilisateurs Enterprise en version bêta. <a href="/help">Contactez l'assistance Datadog</a> pour activer ces fonctionnalités sur votre compte.
</div>

## Créer un rôle personnalisé

Pour créer un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez **New Role** en haut à droite.
3. Attribuez un nom à votre rôle.
4. Sélectionnez les autorisations associées à ce rôle.

{{< img src="account_management/users/create_role.png" alt="Créer un rôle personnalisé" responsive="true" style="width:90%;">}}

Une fois votre rôle créé, vous pouvez l'[ajouter aux utilisateurs existants][2].

## Modifier un rôle

Pour modifier un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez le bouton de modification pour le rôle de votre choix.
3. Modifiez les autorisations associées à ce rôle.
4. Enregistrez vos modifications.

{{< img src="account_management/users/edit_role.png" alt="Modifier un rôle" responsive="true" style="width:90%;">}}

Une fois votre rôle modifié, les autorisations sont mises à jour pour tous les utilisateurs qui disposent de ce rôle.

## Supprimer un rôle

Pour supprimer un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez le bouton de suppression pour le rôle de votre choix.
3. Confirmez l'action.

{{< img src="account_management/users/delete_role.png" alt="Supprimer un rôle" responsive="true" style="width:90%;">}}
{{< img src="account_management/users/delete_role_confirmation.png" alt="Supprimer un rôle" responsive="true" style="width:90%;">}}

Une fois votre rôle supprimé, les autorisations sont mises à jour pour tous les utilisateurs qui disposent de ce rôle. Les utilisateurs sans autre rôle ne peuvent pas exploiter toutes les fonctionnalités de Datadog, mais conservent un accès limité. Vous devez toujours vous assurer que les utilisateurs possèdent un rôle, ou qu'ils sont désactivés s'ils n'ont pas besoin d'accéder à votre organisation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rbac
[2]: /fr/account_management/users/#edit-a-user-roles