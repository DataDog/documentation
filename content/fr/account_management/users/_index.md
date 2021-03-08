---
title: Gestion des utilisateurs
kind: documentation
description: Ajoutez ou supprimez des utilisateurs et modifiez leurs rôles.
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
{{< site-region region="gov" >}}
<div class="alert alert-warning">Le site gouvernemental Datadog prend uniquement en charge la connexion via le protocole SAML.</div>
{{< /site-region >}}

La section **User Management** de Datadog vous permet de gérer vos utilisateurs et les rôles qui leur sont associés. Basculez entre la vue sous forme de liste et la vue sous forme de tableau en cliquant sur **List View** ou **Grid View** à droite :

{{< img src="account_management/users/user_page_list.png" alt="Page User Management avec vue sous forme de liste" >}}

## Ajouter de nouveaux membres et gérer les invitations

Pour ajouter des membres à votre organisation :

1. Accédez à la page User Management.
2. Cliquez sur **Invite Users** en haut à droite de la page.
3. Saisissez l'adresse e-mail de l'utilisateur que vous souhaitez inviter à rejoindre votre compte Datadog.
4. Attribuez-lui au moins un [rôle d'utilisateur][1].
**Remarque** : les utilisateurs disposant de l'autorisation Invite User peuvent attribuer à un utilisateur un rôle dont ils disposent. Les utilisateurs qui disposent à la fois des autorisations Invite User et Access Management peuvent attribuer à un utilisateur n'importe quel rôle.
5. Cliquez sur **Send Invites**.

{{< img src="account_management/users/invite_user.png" alt="Ajouter un utilisateur à votre organisation"  style="width:80%;">}}

Le nouvel utilisateur reçoit alors un e-mail contenant un lien lui permettant de se connecter. Tant qu'il ne se connecte pas, il possède le statut `Invite Pending`. Pour annuler son invitation avant qu'il se connecte, cliquez sur le bouton *Delete Invite* à droite de la ligne de l'utilisateur en question dans la vue sous forme de liste, ou sur la case de l'utilisateur dans la vue sous forme de tableau.

{{< img src="account_management/users/delete_invite_grid.png" alt="Supprimer une invitation dans la vue sous forme de tableau"  style="width:50%;">}}

Pour renvoyer une invitation dans la vue sous forme de liste, cliquez sur l'utilisateur pour ouvrir le volet latéral dédié, puis cliquez sur **Resend Invite** :

{{< img src="account_management/users/resend_invite_list.png" alt="Renvoyer l'invitation dans la vue sous forme de liste"  style="width:80%;">}}

Dans la vue sous forme de tableau, passez votre curseur sur la case de l'utilisateur et cliquez sur **Resend Invite** :

{{< img src="account_management/users/resend_invite_grid.png" alt="Renvoyer l'invitation dans la vue sous forme de tableau"  style="width:50%;">}}

## Modifier les rôles d'un utilisateur

Seuls les utilisateurs disposant de l'autorisation Access Management, comme les utilisateurs avec le rôle Admin Datadog, peuvent modifier le rôle d'un utilisateur :

1. Accédez à la page User Management.
2. Sélectionnez le bouton *Edit* à droite de la ligne de l'utilisateur en question.
3. Sélectionnez les nouveaux [rôles d'utilisateur][2] à attribuer.
4. Enregistrez vos modifications à l'aide de l'option **Save**.

{{< img src="account_management/users/user_role_update.png" alt="Modification du rôle d'un utilisateur"  style="width:80%;">}}

Consultez la section dédiée au [contrôle d'accès en fonction des rôles][2] pour découvrir tous les rôles disponibles et savoir comment en créer des personnalisés.

## Désactiver des membres existants

Seuls les utilisateurs disposant de l'autorisation Access Management, comme les utilisateurs avec le rôle Admin Datadog, peuvent désactiver des membres. Il est impossible de supprimer définitivement des utilisateurs, car ils peuvent être propriétaires de dashboards ou de monitors. De plus, leur ID est utilisé pour consigner leurs actions. Lorsqu'un utilisateur est désactivé, toutes les clés d'application qu'il a générées sont automatiquement révoquées.

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