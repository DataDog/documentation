---
title: Configurer les méthodes de connexion
kind: documentation
---
Les utilisateurs ont recours à diverses méthodes de connexion pour s'authentifier et se connecter à votre organisation Datadog. Si vous bénéficiez d'une autorisation adéquate, par exemple si le rôle Admin Datadog vous a été attribué, vous pouvez activer et désactiver depuis la page Login Methods les méthodes de connexion par défaut des utilisateurs de votre organisation.

Lorsqu'une méthode de connexion est activée par défaut, tous les utilisateurs dont l'accès n'a pas été explicitement interdit ([à l'aide d'un contournement de méthode de connexion][1]) peuvent utiliser la méthode de connexion en question pour accéder à Datadog. Leur nom d'utilisateur (à savoir leur adresse e-mail) doit simplement correspondre à l'utilisateur invité à rejoindre l'organisation.

Les méthodes de connexion suivantes sont disponibles :

- Datadog Username and Password (connexion standard)
- Sign in with Google
- Sign in with SAML

## Activer ou désactiver une méthode de connexion par défaut

Les responsables d'organisation peuvent activer ou désactiver les méthodes de connexion par défaut de leur organisation. Lorsqu'une organisation est créée, les méthodes de connexion **Datadog Username and Password** et **Sign in with Google** sont activées et configurées par défaut pour tous les utilisateurs. Si vous configurez la connexion SAML, l'option **Sign in with SAML** est également activée.

1. Accédez à [Login Methods][2].
2. Définissez le paramètre **Enabled by Default** sur `On` ou `Off` pour chaque méthode, en fonction des préférences ou des exigences de votre organisation en matière de connexion.
3. Confirmez votre sélection.

**Remarque** : vous ne pouvez pas désactiver toutes les méthodes de connexion d'une organisation. Celle-ci doit toujours avoir une méthode de connexion par défaut activée.

## Vérifier les contournements de certains utilisateurs

Les contournements vous permettent de modifier les méthodes de connexion disponibles pour certains utilisateurs. Dans l'exemple suivant, la méthode **Sign in with Google** est désactivée par défaut pour l'organisation, sauf pour un utilisateur, grâce à un contournement.

{{< img src="account_management/login_methods_disabled_overrides_set.png" alt="Méthode de connexion désactivée, avec un utilisateur activé" style="width:80%;">}}

Dans [User Management][3], vous pouvez filtrer les utilisateurs en fonction des contournements définis ou afficher ceux pour lesquels les méthodes de connexion par défaut sont activées :

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="Vue User Management filtrée sur les contournements de méthodes de connexion activés." style="width:80%;">}}

Vous pouvez modifier les contournements d'un utilisateur ou supprimer un contournement pour autoriser uniquement cette personne à utiliser les méthodes de connexion par défaut. Pour en savoir plus, consultez la rubrique [Modifier les méthodes de connexion d'un utilisateur][1].

[1]: /fr/account_management/users/#edit-a-users-login-methods
[2]: https://app.datadoghq.com/organization-settings/login-methods
[3]: https://app.datadoghq.com/organization-settings/users