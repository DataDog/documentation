---
aliases:
- /fr/guides/billing
- /fr/account_management/settings
cascade:
  algolia:
    rank: 70
description: Gérer votre organisation et votre compte Datadog
title: Gestion de compte
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Le site gouvernemental Datadog prend uniquement en charge la connexion via le protocole SAML.</div>
{{< /site-region >}}

## Paramètres personnels

Les pages des paramètres personnels Datadog vous permettent de contrôler les informations à votre sujet que les autres membres de votre organisation peuvent consulter, de changer d'organisation, de quitter une organisation et de gérer vos préférences de notification.

### Profil

Votre profil permet aux autres membres de votre organisation de vous reconnaître dans Datadog. Vous pouvez définir ou modifier votre nom, votre adresse e-mail et votre poste depuis l'[onglet Profile][11] de la page **Personal Settings**.

Pour modifier votre photo, créez un compte sur [Gravatar][1] et associez-le à votre adresse e-mail.

Si vous vous connectez à Datadog à l'aide de l'authentification Google, votre adresse e-mail est fournie par votre compte Google et n'est **pas** modifiable dans Datadog. Pour modifier votre adresse e-mail dans Google, consultez la [documentation Google][2].

### Préférences

{{% site-region region="us,us3,us5,eu,ap1" %}}
Vous pouvez gérer votre fuseau horaire, vos préférences d'accessibilité visuelle et vos abonnements aux services de messagerie depuis l'onglet [Preferences tab][3] de la page **Personal Settings**. 

#### Abonnements aux services de messagerie

La section E-mail subscriptions vous donne accès aux rapports suivants :

* Daily Digest (Synthèse quotidienne)
* Weekly Digest (Synthèse hebdomadaire)

Pour savoir si un e-mail de synthèse est susceptible de vous intéresser, consultez un exemple en cliquant sur le lien **Example** en regard de chaque abonnement. Vous pouvez également utiliser le bouton **Unsubscribe From all** pour vous désabonner de toutes les synthèses.
{{% /site-region %}}


{{% site-region region="gov" %}}
Vous pouvez gérer votre fuseau horaire, vos préférences d'accessibilité visuelle et vos abonnements aux services de messagerie depuis l'onglet [**Preferences** tab][3] de la page **Personal Settings**.
{{% /site-region %}}

#### Accessibilité visuelle

Les préférences d'accessibilité visuelle offrent cinq paramètres différents conçus pour répondre aux besoins des personnes souffrant d'une anomalie de la vision des couleurs, de troubles de l'acuité visuelle ou d'une sensibilité aux couleurs vives. Si vous activez l'un de ces paramètres d'accessibilité, tous les graphiques qui utilisent la palette de couleurs classique seront convertis pour afficher des couleurs adaptées à vos besoins visuels.

**Remarque** : vos préférences d'accessibilité visuelle sont enregistrées en local dans votre navigateur. Si vous changez de navigateur ou effacez votre cache, le paramètre par défaut sera rétabli.

### Organisations

L'[onglet Organizations][12] de la page **Personal Settings** répertorie toutes les organisations auxquelles vous êtes associé. Passez d'une organisation à une autre à partir de cette page ou en survolant le menu des comptes de la barre de navigation sur la gauche.

**Remarque** : si vous quittez une organisation, vous ne pourrez pas la rejoindre à nouveau à moins d'être invité par un administrateur de cette organisation.

Pour rejoindre une organisation existante, un administrateur doit vous inviter. Vous recevrez alors un e-mail avec l'objet "You've been invited to join <Nom de l'organisation>". Cliquez sur le bouton **Join Account** de l'e-mail.

Si vous êtes un administrateur d'organisation, consultez les ressources suivantes pour obtenir davantage d'informations :

* [Gérer les utilisateurs de votre organisation][4]
* [Configurer l'authentification unique avec SAML][5]
* [Renommer votre organisation][6]
* [Gérer des comptes multi-organisations][7]
* [Modifier votre formule Datadog et consulter l'historique d'utilisation et de facturation][8]

### Sécurité

#### Clés d'application

Vous pouvez gérer vos clés d'application depuis l'[onglet Application Keys][13] de la page **Personal Settings**. Pour copier une clé, passez le curseur dessus jusqu'à ce que l'icône **Copy Key** s'affiche sur la droite, et cliquez sur cette icône. Vous pouvez également cliquer sur la clé de votre choix pour modifier son nom, consulter sa date de création, afficher le profil de son propriétaire ou la révoquer.

#### Apps

L'[onglet Apps][14] de la page **Personal Settings** vous permet de gérer les apps qui ont été installées ou créées par des membres de votre organisation. Vous pouvez filtrer les apps en recherchant du texte, ou utiliser les cases à cocher pour afficher uniquement les apps activées ou désactivées.

Lorsque vous passez votre curseur sur une app, une option vous permettant de l'activer ou la désactiver apparaît à droite de son nom.

## Apparence

Pour activer le mode sombre dans Datadog, passez votre curseur sur votre avatar dans la barre latérale ou appuyez sur `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Pour faire en sorte que l'apparence du site s'adapte automatiquement à celle de votre système, sélectionnez l'option *System*. Ainsi, le thème défini sur Datadog correspondra toujours au thème défini sur votre système.

## Connexion à GitHub

Si vous avez installé l'[intégration GitHub][9] pour créer des événements dans Datadog, associez votre compte GitHub personnel à votre compte utilisateur Datadog. Ainsi, les commentaires que vous publierez dans les événements GitHub de Datadog seront automatiquement publiés dans l'issue ou la pull request correspondante dans GitHub.

## Désactivation du compte de votre organisation

Pour désactiver le compte Datadog de votre organisation, contactez l'[assistance Datadog][10].

[1]: https://gravatar.com
[2]: https://support.google.com/accounts/answer/19870?hl=en
[3]: https://app.datadoghq.com/personal-settings/preferences
[4]: /fr/account_management/users/
[5]: /fr/account_management/saml/
[6]: /fr/account_management/org_settings/#change-your-organization-name
[7]: /fr/account_management/multi_organization/
[8]: /fr/account_management/org_settings/
[9]: /fr/integrations/github/
[10]: /fr/help/
[11]: https://app.datadoghq.com/personal-settings/profile
[12]: https://app.datadoghq.com/personal-settings/organizations
[13]: https://app.datadoghq.com/personal-settings/application-keys
[14]: https://app.datadoghq.com/personal-settings/apps