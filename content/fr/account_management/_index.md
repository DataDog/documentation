---
title: Gestion de compte
description: Gérer votre organisation et votre compte Datadog
aliases:
  - /fr/guides/billing
  - /fr/account_management/settings
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Le site gouvernemental Datadog prend uniquement en charge la connexion via le protocole SAML.</div>
{{< /site-region >}}

## Paramètres personnels

Les pages des paramètres personnels Datadog vous permettent de contrôler les informations à votre sujet que les autres membres de votre organisation peuvent consulter, de changer d'organisation, de quitter une organisation et de gérer vos préférences de notification.

### Profil

Votre profil permet aux autres membres de votre organisation de vous reconnaître dans Datadog. Vous pouvez y définir ou modifier votre nom, votre adresse e-mail et votre poste.

Pour modifier votre photo, créez un compte sur [Gravatar][1] et associez-le à votre adresse e-mail.

Si vous vous connectez à Datadog à l'aide de l'authentification Google, votre adresse e-mail est fournie par votre compte Google et n'est **pas** modifiable dans Datadog. Pour modifier votre adresse e-mail dans Google, consultez la [documentation Google][2].

### Préférences

Vous pouvez définir votre fuseau horaire, vos notifications sur ordinateur et vos abonnements par e-mail dans l'[onglet **Preferences**][3] de la page **Personal Settings**. Vous pouvez également choisir de recevoir les rapports suivants :

* Daily Digest
* Weekly Digest
* Weekly Monitor Report
* Weekly Pagerduty Report
* Weekly Nagios Report

Pour savoir si un rapport ou un e-mail de synthèse vous intéresse, consultez un exemple en cliquant sur le lien **Example** en regard de chaque abonnement. Vous pouvez également utiliser le bouton **Unsubscribe From all** pour vous désabonner de tous les rapports et toutes les synthèses.

### Organisations

La page **Organizations** de l'onglet **Personal Settings** répertorie toutes les organisations auxquelles vous êtes associé. Passez d'une organisation à une autre à partir de cette page ou survolez le menu de compte de la barre de navigation de gauche.

**Remarque** : si vous quittez une organisation, vous ne pourrez pas la rejoindre à nouveau à moins d'être invité par un administrateur de cette organisation.

Pour rejoindre une organisation existante, un administrateur doit vous inviter. Vous recevez alors un e-mail avec l'objet `You've been invited to join <Nom_Organisation>`. Cliquez sur le bouton **Join Account** de l'e-mail.

Si vous êtes un administrateur d'organisation, consultez les ressources suivantes pour obtenir davantage d'informations :

* [Gérer les utilisateurs de votre organisation][4]
* [Configurer l'authentification unique avec SAML][5]
* [Renommer votre organisation][6]
* [Gérer des comptes multi-organisations][7]
* [Modifier votre formule Datadog et consulter l'historique d'utilisation et de facturation][8]

### Sécurité

Vous pouvez gérer vos clés d'application depuis l'onglet **Application Keys** de la page **Personal Settings**. Pour copier une clé, passez le curseur dessus jusqu'à ce que l'icône **Copy Key** s'affiche sur la droite, et cliquez sur cette icône. Vous pouvez également cliquer sur la clé de votre choix pour modifier son nom, consulter sa date de création, afficher le profil de son propriétaire ou la révoquer.
## Apparence

Pour activer le mode sombre dans Datadog, passez votre curseur sur votre avatar dans la barre latérale ou appuyez sur `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Pour faire en sorte que l'apparence du site s'adapte automatiquement à celle de votre système, sélectionnez l'option *System*. Ainsi, le thème défini sur Datadog correspondra toujours au thème défini sur votre système.

## Connexion à GitHub

Si vous avez installé l'[intégration GitHub][9] pour créer des événements dans Datadog, associez votre compte GitHub personnel à votre compte utilisateur Datadog. Ainsi, les commentaires que vous publierez dans les événements GitHub de Datadog seront automatiquement publiés dans l'issue ou la pull request correspondante dans GitHub.

## Supprimer votre compte

Pour supprimer complètement votre compte Datadog, contactez l'[assistance Datadog][10].

[1]: https://gravatar.com
[2]: https://support.google.com/accounts/answer/19870?hl=en
[3]: https://app.datadoghq.com/account/preferences
[4]: /fr/account_management/users/
[5]: /fr/account_management/saml/
[6]: /fr/account_management/org_settings/#change-your-organization-name
[7]: /fr/account_management/multi_organization/
[8]: /fr/account_management/org_settings/
[9]: /fr/integrations/github/
[10]: /fr/help/