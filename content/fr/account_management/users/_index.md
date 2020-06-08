---
title: Gestion des utilisateurs
kind: documentation
description: 'Ajoutez des utilisateurs, modifiez leurs rôles ou supprimez des utilisateurs.'
aliases:
  - /fr/account_management/team/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: /account_management/rbac/
    tag: Documentation
    text: 'Créer, mettre à jour et supprimer un rôle'
  - link: /account_management/rbac/permissions/
    tag: Documentation
    text: Découvrir la liste des permissions disponibles
  - link: /api/v1/users/
    tag: Documentation
    text: Gérer les utilisateurs à l'aide de l'API Utilisateurs
---
<div class="alert alert-warning">
La nouvelle interface de gestion des utilisateurs est en version bêta privée. <a href="/help">Contactez l'assistance Datadog</a> afin de l'activer pour votre compte.
</div>

La section **User Management** de Datadog vous permet de gérer vos utilisateurs et les rôles qui leur sont associés :

{{< img src="account_management/users/user_page.png" alt="Page User Management" >}}

## Ajouter de nouveaux membres

Pour ajouter des membres à votre organisation :

1. Accédez à la page User Management.
2. Sélectionnez **Invite Users** en haut à droite de la page.
3. Saisissez l'adresse e-mail de l'utilisateur que vous souhaitez inviter à rejoindre votre compte Datadog.
4. Attribuez-lui au moins un [rôle d'utilisateur][1].
**Remarque** : les utilisateurs disposant d'un Standard Access peuvent inviter un utilisateur en lui attribuant le même rôle qui leur est attribué. Les utilisateurs disposant d'un Privileged Access peuvent inviter un utilisateur en lui attribuant le rôle de leur choix.
5. Cliquez sur **Send Invites**.

{{< img src="account_management/users/invite_user.png" alt="Ajouter un utilisateur à votre organisation"  style="width:80%;">}}

Le nouvel utilisateur reçoit alors un e-mail contenant un lien lui permettant de se connecter. Tant qu'il ne se connecte pas, il possède le statut `Pending`.
Pour renvoyer une invitation, sélectionnez le bouton *Edit* à droite de la ligne de l'utilisateur en question, puis cliquez sur *Resend Invite* :

{{< img src="account_management/users/resend_invite.png" alt="Renvoyer l'invitation"  style="width:80%;">}}

## Modifier les rôles d'un utilisateur

Seuls les utilisateurs disposant d'un Privileged Access, comme les utilisateurs avec le rôle Admin Datadog, peuvent modifier le rôle d'un utilisateur :

1. Accédez à la page User Management.
2. Sélectionnez le bouton *Edit* à droite de la ligne de l'utilisateur en question.
3. Sélectionnez les nouveaux [rôles d'utilisateur][2] à attribuer.
4. Enregistrez vos modifications à l'aide de l'option **Save**.

{{< img src="account_management/users/user_role_update.png" alt="Modification du rôle d'un utilisateur"  style="width:80%;">}}

Consultez la section dédiée au [contrôle d'accès en fonction des rôles][2] pour découvrir tous les rôles disponibles et savoir comment en créer des personnalisés.

## Désactiver des membres existants

Seuls les utilisateurs disposant d'un Privileged Access, comme les utilisateurs avec le rôle Admin Datadog, peuvent désactiver des membres. Vous ne pouvez pas supprimer définitivement les utilisateurs, car ils peuvent être propriétaires d'événements ou encore de dashboards à ne pas supprimer. Lorsqu'un utilisateur est désactivé, toutes les clés d'application qu'il a générées sont automatiquement révoquées.

1. Accédez à la page User Management.
2. Sélectionnez le bouton *Edit* à droite de la ligne de l'utilisateur en question.
3. Cliquez sur le bouton **Disable**.
4. Enregistrez vos modifications à l'aide de l'option **Save**.
5. Confirmez l'action.

{{< img src="account_management/users/disable_user.png" alt="Désactiver un utilisateur"  style="width:80%;" >}}

**Remarque** : par défaut, les utilisateurs désactivés ne figurent pas dans la liste des utilisateurs de la page User Management.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/users/default_roles/
[2]: /fr/account_management/rbac/