---
title: Gestion de compte
kind: documentation
description: Gérer votre organisation et votre compte Datadog
aliases:
  - /fr/guides/billing
  - /fr/account_management/settings
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Le site gouvernemental Datadog prend uniquement en charge la connexion via le protocole SAML.</div>
{{< /site-region >}}

## Paramètres du compte

La *[page des paramètres du compte][1]* de Datadog vous permet de contrôler les informations à votre sujet que les autres membres de votre organisation peuvent consulter, de changer d'organisation, de quitter une organisation, de gérer vos préférences de notification et plus encore.

### Profil

Votre profil permet aux autres membres de votre organisation de vous reconnaître dans Datadog. Vous pouvez y définir ou modifier votre nom, votre adresse e-mail et votre rôle dans l'organisation.

Pour modifier votre photo, créez un compte sur [Gravatar][2] et associez-le à votre adresse e-mail.

Si vous vous connectez à Datadog à l'aide de l'authentification Google, votre adresse e-mail est fournie par votre compte Google et n'est *pas* modifiable dans Datadog. Pour modifier votre adresse e-mail dans Google, consultez la [documentation Google][3].

### Organisations

La page *des paramètres du compte* répertorie également toutes les organisations auxquelles vous êtes associé. Passez d'une organisation à une autre à partir de cette page ou survolez le menu Account de la barre de navigation de gauche.

**Remarque** : si vous quittez une organisation, vous ne pourrez pas la rejoindre à nouveau à moins d'être invité par un administrateur de cette organisation.

Pour rejoindre une organisation existante, un administrateur doit vous inviter. Vous recevez alors un e-mail avec l'objet `You've been invited to join <nom_organisation>`. Cliquez sur le bouton **Join Account** de l'e-mail.

Si vous êtes un administrateur d'organisation, consultez les ressources suivantes pour obtenir davantage d'informations :

* [Gérer les utilisateurs de votre organisation][4]
* [Configurer l'authentification unique avec SAML][5]
* [Renommer votre organisation][6]
* [Gérer des comptes multi-organisations][7]
* [Modifier votre formule Datadog et consulter l'historique d'utilisation et de facturation][8]

### Préférences

Vous pouvez définir votre fuseau horaire, vos notifications sur ordinateur et vos abonnements par e-mail dans l'[onglet *Preferences*][9] de la page des *paramètres du compte*. Vous pouvez également choisir de recevoir les rapports suivants :

* Daily Digest
* Weekly Digest
* Weekly Monitor Report
* Weekly Pagerduty Report
* Weekly Nagios Report

## Apparence

Pour activer le mode sombre dans Datadog, passez votre curseur sur votre avatar dans la barre latérale ou appuyez sur `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Pour faire en sorte que l'apparence du site s'adapte automatiquement à celle de votre système, sélectionnez l'option *System*. Ainsi, le thème défini sur Datadog correspondra toujours au thème défini sur votre système :

{{< img src="account_management/dark-mode-toggle.png" alt="Mode sombre" style="width:60%;">}}

## Connexion à GitHub

Si vous avez installé l'[intégration GitHub][10] pour créer des événements dans Datadog, associez votre compte GitHub personnel à votre compte utilisateur Datadog. Ainsi, les commentaires que vous publierez dans les événements GitHub de Datadog seront automatiquement publiés dans l'issue ou la pull request correspondante dans GitHub.

## Supprimer votre compte

Pour supprimer complètement votre compte Datadog, [contactez notre équipe d'assistance][11].

[1]: https://app.datadoghq.com/account/profile
[2]: https://gravatar.com
[3]: https://support.google.com/accounts/answer/19870?hl=en
[4]: /fr/account_management/users/
[5]: /fr/account_management/saml/
[6]: /fr/account_management/org_settings/#change-your-organization-name
[7]: /fr/account_management/multi_organization/
[8]: /fr/account_management/org_settings/
[9]: https://app.datadoghq.com/account/preferences
[10]: /fr/integrations/github/
[11]: /fr/help/