---
title: Gestion des utilisateurs
description: Ajoutez ou supprimez des utilisateurs et modifiez leurs rôles.
aliases:
  - /fr/account_management/team/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: /account_management/rbac/
    tag: Documentation
    text: Créer, mettre à jour et supprimer un rôle
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

L'onglet **User** de la page **Organization Settings** de Datadog vous permet de gérer vos utilisateurs et les rôles qui leur sont associés. Basculez entre les vues sous forme de liste et sous forme de grille en cliquant respectivement sur l'option **List View** ou **Grid View** à droite de la page.

## Ajouter de nouveaux membres et gérer les invitations

Pour ajouter des membres à votre organisation :

1. Accédez à la page Organization Settings, puis cliquez sur l'onglet **Users**.
2. Cliquez sur **Invite Users** en haut à droite de la page.
3. Saisissez l'adresse e-mail de l'utilisateur que vous souhaitez inviter à rejoindre votre compte Datadog.
4. Attribuez-lui au moins un [rôle d'utilisateur][1].
**Remarque** : les utilisateurs disposant de l'autorisation Invite User peuvent attribuer à un utilisateur un rôle dont ils disposent. Les utilisateurs qui disposent à la fois des autorisations Invite User et Access Management peuvent attribuer à un utilisateur n'importe quel rôle.
5. Cliquez sur **Send Invites**.

Le nouvel utilisateur reçoit alors un e-mail contenant un lien lui permettant de se connecter. Tant qu'il ne se connecte pas, il possède le statut `Invite Pending`. Pour annuler son invitation avant qu'il se connecte, cliquez sur le bouton **Delete Invite** à droite de la ligne de l'utilisateur en question dans la vue en forme de liste, ou cliquez sur la case de l'utilisateur dans la vue en forme de grille.

Pour renvoyer une invitation dans la vue sous forme de liste, ouvrez le volet latéral de l'utilisateur, puis cliquez sur **Resend Invite**. Sinon, dans la vue en forme de grille, passez votre curseur sur la case de l'utilisateur, puis cliquez sur **Resend Invite**.

## Modifier les rôles d'un utilisateur

Seuls les utilisateurs disposant de l'autorisation User Access Management, comme les utilisateurs avec le rôle Admin Datadog, peuvent modifier le rôle d'un autre utilisateur.

Pour modifier les rôles d'un utilisateur, procédez comme suit :

1. Accédez à l'onglet **Users** de la page **Organization Settings**.
2. Cliquez sur le bouton **Edit** à droite de la ligne de l'utilisateur.
3. Sélectionnez les nouveaux [rôles][2] à attribuer à cet utilisateur, ou cliquez sur la croix 'X' en regard d'un rôle existant pour le supprimer.
4. Enregistrez vos modifications à l'aide de l'option **Save**.

{{< img src="account_management/users/user_role_update.png" alt="Modification des rôles d'un utilisateur" style="width:80%;">}}

Pour consulter tous les rôles disponibles et découvrir comment personnaliser des rôles, consultez la section [Contrôle d'accès à base de rôles (RBAC)][2].

## Modifier les méthodes de connexion d'un utilisateur

Seuls les utilisateurs disposant de l'autorisation User Access Management, comme les utilisateurs avec le rôle Admin Datadog, peuvent modifier les méthodes de connexion d'un autre utilisateur.

Les méthodes de connexion par défaut d'une organisation se configurent depuis la page Login Methods. Vous pouvez autoriser ou ne plus autoriser l'ensemble des utilisateurs de votre organisation à utiliser un nom d'utilisateur et un mot de passe Datadog, une connexion Google ou une connexion SAML. Depuis la page User Management, il est également possible de contourner les paramètres globaux pour certains utilisateurs, afin de leur permettre d'utiliser une ou plusieurs méthodes. Cette fonctionnalité vous permet d'imposer une connexion SAML à l'ensemble de vos utilisateurs et d'autoriser un certain nombre d'entre eux à se connecter à l'aide de leur nom d'utilisateur et de leur mot de passe en cas d'urgence.

Pour modifier les méthodes de connexion d'un utilisateur, procédez comme suit :

1. Accédez à l'onglet **Users** de la page **Organization Settings**.
2. Cliquez sur **Edit** à droite de la ligne de l'utilisateur.
3. Cliquez sur le bouton de l'option **Override Default Login Methods** pour activer ou désactiver des paramètres spécifiques pour cet utilisateur.
4. Si vous activez cette option, choisissez les méthodes de connexion que l'utilisateur peut utiliser pour accéder à Datadog. Vous pouvez définir une seule méthode ou encore toutes les méthodes configurées pour votre organisation.
5. Cliquez sur **Save**.


**Remarque** : vous pouvez uniquement définir des méthodes de connexion valides. Si vous n'avez pas configuré le SAML, il est impossible d'activer cette méthode pour un utilisateur.

## Désactiver des membres existants

Seuls les utilisateurs disposant de l'autorisation Access Management, comme les utilisateurs avec le rôle Admin Datadog, peuvent désactiver des membres. Il est impossible de supprimer définitivement des utilisateurs, car ils peuvent être propriétaires de dashboards ou de monitors. De plus, leur ID est utilisé pour consigner leurs actions. Lorsqu'un utilisateur est désactivé, toutes les clés d'application qu'il a générées sont automatiquement révoquées.

1. Accédez à l'onglet **Users** de la page **Organization Settings**.
2. Cliquez sur le bouton **Edit** à droite de la ligne de l'utilisateur.
3. Cliquez sur le bouton **Disable**.
4. Enregistrez vos modifications à l'aide de l'option **Save**.
5. Confirmez l'action.

**Remarque** : par défaut, tous les utilisateurs désactivés ne sont pas affichés dans la liste de la page User Management. Si vous disposez des autorisations requises, vous pouvez filtrer cette liste afin d'afficher les utilisateurs `Disabled`, puis réactiver ces utilisateurs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/users/default_roles/
[2]: /fr/account_management/rbac/