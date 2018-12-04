---
title: Gestion de compte
kind: documentation
description: Gérer votre organisation et votre compte Datadog
aliases:
  - /fr/guides/billing
  - /fr/account_management/settings
---
## Paramètres du compte

La *[page des paramètres du compte][1]* de Datadog vous permet de contrôler les informations à votre sujet que les autres membres de votre organisation peuvent consulter, de changer d'organisation, de quitter une organisation, de gérer vos préférences de notification et plus encore.

## Création de votre profil

Votre profil permet aux autres membres de votre organisation de vous reconnaître dans Datadog. Depusi votre profil, vous pouvez définir ou modifier votre nom, votre adresse e-mail et votre rôle au sein de l'organisation.

Pour modifier votre photo, créez un compte sur [Gravatar][2] et associez-le à votre adresse e-mail.

Si vous vous connectez à Datadog à l'aide de l'authentification Google, votre adresse e-mail est fournie par votre compte Google et n'est *pas* modifiable dans Datadog. Pour modifier votre adresse e-mail dans Google, consultez la [documentation Google][3].

## Gestion de vos organisations

La page *Account settings* répertorie également toutes les organisations auxquelles vous êtes associé. Basculez entre ces organisations à partir de cette page ou en survolant le menu du compte dans la navigation de gauche.

**Remarque** : si vous quittez une organisation, vous ne pourrez pas la rejoindre à nouveau à moins d'être invité par un administrateur de cette organisation.

Pour rejoindre une organisation existante, vous devez être invité par un administrateur. Pour demander une invitation :

1. Déconnectez-vous de Datadog en cliquant sur le bouton sur la [page des paramètres du compte][12].
2. Visitez la [page *d'inscription des nouveaux utilisateurs*][4] et cliquez sur le lien *Join an existing team*.
3. Saisissez l'adresse e-mail associée à votre compte Datadog, votre nom et l'adresse e-mail d'un administrateur de l'organisation que vous souhaitez rejoindre.
4. Cliquez sur "Request Invite" pour envoyer la demande. L'administrateur de l'organisation recevra alors une notification lui indiquant comme vous ajouter.

Si vous êtes un administrateur d'organisation, consultez les ressources suivantes pour obtenir davantage d'informations :

* [Gérer les membres d'équipe][5]
* [Configurer l'authentification unique avec SAML][6]
* [Renommer votre organisation][7]
* [Gérer les comptes multi-organisations][8]
* [Modifier votre plan Datadog et afficher l'historique d'utilisation et de facturation][9]

## Connexion à Github

Si vous avez installé [l'intégration GitHub][10] pour créer des événements dans Datadog, associez votre compte GitHub personnel à votre compte utilisateur Datadog. Une fois vos comptes reliés, tous les commentaires que vous publierez sur les événements GitHub dans Datadog seront automatiquement réintégrés dans l'issue correspondante ou dans la pull request dans GitHub.

## Préférences

Vous pouvez définir votre fuseau horaire, vos notification de bureau et vos préférences de notification par e-mail à partir de l'onglet [Préférences de la page des paramètres du compte][11].

[1]: https://app.datadoghq.com/account/profile
[2]: https://gravatar.com/
[3]: https://support.google.com/accounts/answer/19870?hl=en
[4]: https://app.datadoghq.com/signup
[5]: /account_management/team
[6]: /account_management/saml
[7]: /account_management/org_settings#change-your-organization-name
[8]: /account_management/multi_organization
[9]: /account_management/org_settings
[10]: https://docs.datadoghq.com/integrations/github/
[11]: https://app.datadoghq.com/account/preferences
[12]: https://app.datadoghq.com/account/profile