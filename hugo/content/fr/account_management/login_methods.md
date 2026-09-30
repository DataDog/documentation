---
description: Activez ou désactivez les méthodes d'authentification comme nom d'utilisateur/mot
  de passe, Google OAuth et SAML pour votre organisation Datadog avec des options
  d'application MFA.
title: Configurer les méthodes de connexion
---

Les méthodes de connexion déterminent la manière dont les utilisateurs s'authentifient et se connectent à leur organisation Datadog. Pour activer ou désactiver les méthodes de connexion par défaut, vous devez disposer d'un des éléments suivants :

- Le rôle Admin Datadog
- L'autorisation de gestion de l'organisation (`org_management`) 

Lorsqu'une méthode de connexion est activée par défaut, tous les utilisateurs dont l'accès n'a pas été explicitement interdit ([à l'aide d'un contournement de méthode de connexion][1]) peuvent utiliser la méthode de connexion en question pour accéder à Datadog. Leur nom d'utilisateur (à savoir leur adresse e-mail) doit simplement correspondre à l'utilisateur invité à rejoindre l'organisation.

Les méthodes de connexion suivantes sont disponibles :

- Datadog Username and Password (connexion standard)
- Sign in with Google
- [Se connecter avec SAML][2]

## Activer ou désactiver une méthode de connexion par défaut

Les responsables d'organisation peuvent activer ou désactiver les méthodes de connexion par défaut de leur organisation. Lorsqu'une organisation est créée, les méthodes de connexion **Datadog Username and Password** et **Sign in with Google** sont activées et configurées par défaut pour tous les utilisateurs. Si vous configurez la connexion SAML, l'option **Sign in with SAML** est également activée.

1. Accédez à [Login Methods][3].
2. Définissez le paramètre **Enabled by Default** sur `On` ou `Off` pour chaque méthode, en fonction des préférences ou des exigences de votre organisation en matière de connexion.
3. Confirmez votre sélection.

**Remarque** : vous ne pouvez pas désactiver toutes les méthodes de connexion d'une organisation. Celle-ci doit toujours avoir une méthode de connexion par défaut activée.

## Exiger l'authentification multifacteur

Pour renforcer la sécurité, les responsables d'organisation peuvent imposer [l'authentification multifacteur][4] (MFA) pour tous les utilisateurs de l'organisation qui se connectent avec un e-mail et un mot de passe.

1. Accédez à [Login Methods][3].
2. Définissez le paramètre **Require Multi-Factor Authentication** sur `On` ou `Off`, en fonction des préférences ou des exigences de votre organisation en matière de connexion.
3. Confirmez votre sélection.

Définir **Require Multi-Factor Authentication** sur `On` a deux effets :
- Les utilisateurs qui se connectent avec un e-mail et un mot de passe doivent enregistrer un second facteur d'authentification avant d'accéder à l'organisation.
- Dans Login Methods, un lien vers [**View users without MFA**][5] apparaît. Cliquez sur ce lien pour voir la liste des utilisateurs, filtrée sur ceux sans MFA.

Le paramètre imposant l'authentification multifacteur est indépendant des paramètres de méthode de connexion par défaut. Peu importe les méthodes de connexion que vous activez par défaut, l'application du MFA exige un second facteur d'authentification pour les utilisateurs qui se connectent avec un e-mail et un mot de passe.

## Vérifier les contournements de certains utilisateurs

Les contournements vous permettent de modifier les méthodes de connexion disponibles pour certains utilisateurs. Dans l'exemple suivant, la méthode **Sign in with Google** est désactivée par défaut pour l'organisation, sauf pour un utilisateur, grâce à un contournement.

{{< img src="account_management/login_methods_enabled_off.png" alt="Méthode de connexion désactivée, avec un utilisateur activé" style="width:80%;">}}

Dans [User Management][6], vous pouvez filtrer les utilisateurs en fonction des contournements définis ou afficher ceux pour lesquels les méthodes de connexion par défaut sont activées :

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="Vue User Management filtrée de façon à afficher les utilisateurs par méthode de connexion." style="width:80%;">}}

Vous pouvez modifier les contournements d'un utilisateur ou supprimer un contournement pour autoriser uniquement cette personne à utiliser les méthodes de connexion par défaut. Pour en savoir plus, consultez la rubrique [Modifier les méthodes de connexion d'un utilisateur][1].

[1]: /fr/account_management/users/#edit-a-users-login-methods
[2]: /fr/account_management/saml/
[3]: https://app.datadoghq.com/organization-settings/login-methods
[4]: /fr/account_management/multi-factor_authentication/
[5]: https://app.datadoghq.com/organization-settings/users?filter%5Ballowed_login_methods%5D=standard&filter%5Bmfa_enabled%5D=false&filter%5Bstatus%5D=Active
[6]: https://app.datadoghq.com/organization-settings/users