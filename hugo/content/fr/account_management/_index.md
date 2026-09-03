---
aliases:
- /fr/guides/billing
- /fr/account_management/settings
cascade:
  algolia:
    rank: 70
description: Gérez votre compte et votre organisation Datadog
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Meilleures pratiques pour gérer les organisations Datadog à grande échelle
title: Gestion de compte
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La plateforme Datadog pour le gouvernement ne prend en charge que l'authentification SAML ou l'authentification de base utilisant un nom d'utilisateur/email et un mot de passe. Avant de configurer l'authentification SAML, assurez-vous qu'au moins un compte avec nom d'utilisateur/email et mot de passe est établi pour maintenir l'accès pendant le processus de configuration. Datadog recommande d'activer l'authentification multi-facteurs (MFA) pour les comptes basés sur un mot de passe.

Si vous avez besoin que SAML soit activé pour un compte d'essai, contactez <a href="https://docs.datadoghq.com/getting_started/support/">Datadog Support</a>.</div>

{{< /site-region >}}

## Paramètres personnels {#personal-settings}

Les pages des paramètres personnels Datadog vous permettent de contrôler les informations à votre sujet que les autres membres de votre organisation peuvent consulter, de changer d'organisation, de quitter une organisation et de gérer vos préférences de notification.

### Profil {#profile}

Votre profil est la façon dont les autres dans votre organisation vous reconnaissent dans Datadog. Définissez ou mettez à jour votre nom, votre adresse e-mail et votre titre depuis l'onglet [Profil][11] dans la page {{< ui >}}Personal Settings{{< /ui >}}.

Pour modifier votre photo, créez un compte sur [Gravatar][1] et associez-le à votre adresse e-mail.

Si vous vous connectez à Datadog en utilisant l'authentification Google, votre adresse e-mail est fournie par votre compte Google et est **non** modifiable dans Datadog. Pour changer votre adresse e-mail dans Google, consultez la [documentation Google][2].

### Préférences {#preferences}

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
Vous pouvez gérer votre fuseau horaire, votre format horaire, vos préférences d'accessibilité visuelle et vos abonnements par e-mail depuis l'onglet [Préférences][3] dans la {{< ui >}}Personal Settings{{< /ui >}} page.

#### Abonnements par e-mail {#email-subscriptions}

La section E-mail subscriptions vous donne accès aux rapports suivants :
{{< site-region region="us3,us5,gov,gov2,ap1,ap2" >}}
<div class="alert alert-danger">Les résumés par e-mail ne sont pas disponibles sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

* Résumé quotidien
* Résumé hebdomadaire

Si vous n'êtes pas sûr qu'un résumé par e-mail vous concerne, vous pouvez voir un exemple en cliquant sur le {{< ui >}}Example{{< /ui >}} lien à côté de chaque abonnement par e-mail. Vous pouvez également utiliser le bouton {{< ui >}}Unsubscribe From All{{< /ui >}} pour vous désinscrire de tous les abonnements par e-mail.
{{% /site-region %}}


{{% site-region region="gov,gov2" %}}
Vous pouvez gérer votre fuseau horaire, votre format horaire et votre préférence d'accessibilité visuelle depuis l'onglet [**Préférences**][3] dans la page {{< ui >}}Personal Settings{{< /ui >}}.
{{% /site-region %}}

#### Format horaire {#time-format}

Choisissez si les heures sont affichées au format 12 heures ou 24 heures dans Datadog (par exemple, "2:30 pm" ou "14:30"). Les nouveaux comptes sont par défaut au format 12 heures. Les graphiques et certaines données tabulaires s'affichent en format 24 heures à tout moment.

#### Accessibilité visuelle {#visual-accessibility}

La préférence d'accessibilité visuelle a cinq paramètres différents pour répondre aux déficiences de la vision des couleurs, à une faible acuité visuelle et à la sensibilité aux couleurs vives. Si vous optez pour un paramètre de couleur accessible, Datadog traduit tous les graphiques utilisant la palette de couleurs classique en un ensemble de couleurs accessibles adapté à vos besoins visuels.

**Remarque** : Votre préférence d'accessibilité visuelle est enregistrée localement dans votre navigateur. Si vous utilisez un autre navigateur ou si vous videz votre cache, la préférence est réinitialisée aux paramètres par défaut.

### Organisations {#organizations}

L'onglet [Organisations][12] dans {{< ui >}}Personal Settings{{< /ui >}} répertorie toutes les organisations auxquelles vous appartenez. Alternez entre ces organisations depuis cette page ou en survolant le menu de compte dans la navigation à gauche.

**Remarque** : Si vous quittez une organisation, vous ne pouvez pas la rejoindre à nouveau à moins d'être invité par un administrateur de cette organisation.

Pour rejoindre une organisation existante, vous devez être invité par un administrateur. Après avoir été invité, vous recevez un e-mail avec pour objet "Vous avez été invité à rejoindre \<Nom de l'organisation>". Cliquez sur le bouton {{< ui >}}Join Account{{< /ui >}} dans l'e-mail.

Si vous êtes un administrateur d'organisation, consultez les ressources suivantes pour obtenir davantage d'informations :

* [Gérer les utilisateurs dans votre organisation][4]
* [Configurer l'authentification unique avec SAML][5]
* [Renommer votre organisation][6]
* [Gérer des comptes multi-organisations][7]
* [Changer votre plan Datadog et consulter l'historique d'utilisation et de facturation][8]
* [Choisir la topologie de votre organisation (organisation unique vs. multi-organisations)][15]

### Sécurité {#security}

#### Clés d'application {#application-keys}

L'onglet [Clés d'application][13] dans {{< ui >}}Personal Settings{{< /ui >}} vous permet de gérer vos clés d'application. Pour copier une clé, survolez-la jusqu'à ce que l'icône {{< ui >}}Copy Key{{< /ui >}} apparaisse à droite, puis cliquez dessus. Vous pouvez également cliquer sur une clé spécifique pour modifier son nom, voir quand elle a été créée, consulter le profil du propriétaire de la clé, la copier ou la révoquer.

#### Applications {#apps}

L'onglet [Applications][14] dans {{< ui >}}Personal Settings{{< /ui >}} vous permet de gérer les applications qui ont été installées ou créées par des membres de votre organisation. Vous pouvez filtrer les applications avec une chaîne de recherche, ou choisir de voir uniquement les applications activées ou désactivées à l'aide de cases à cocher.

Lorsque vous passez votre curseur sur une app, une option vous permettant de l'activer ou la désactiver apparaît à droite de son nom.

#### Vérification de l'email {#email-verification}
Vérifiez votre adresse e-mail pour renforcer la sécurité de votre compte et accéder à des fonctionnalités de gestion supplémentaires. Les utilisateurs vérifiés ont un meilleur contrôle sur la sécurité de leur compte et peuvent voir toutes les organisations auxquelles ils appartiennent.

- **Les utilisateurs de connexion Google** sont automatiquement vérifiés lors de leur première connexion.
- **Les utilisateurs basés sur un mot de passe** vérifient leur adresse e-mail lors de la définition de leur mot de passe pour la première fois.
- **Les utilisateurs SAML** doivent vérifier manuellement leur adresse e-mail via Datadog.

Après avoir été vérifié, vous accédez à :
- La possibilité de **se déconnecter de toutes les sessions web actives** sur tous les appareils, garantissant la sécurité en cas de compromission des identifiants.
- La possibilité de **voir et de basculer entre les organisations** en dehors de votre hiérarchie organisationnelle actuelle.

Les utilisateurs non vérifiés peuvent toujours accéder à Datadog, mais sont limités à la visualisation des organisations au sein de leur hiérarchie et ne peuvent pas révoquer les sessions actives.

#### Vérifiez votre adresse e-mail {#verify-your-email}

Pour vérifier votre adresse e-mail :
1. Accédez à votre {{< ui >}}Profile Settings{{< /ui >}}.
2. Cliquez sur {{< ui >}}Verify Account{{< /ui >}}.
3. Entrez le **code de vérification** envoyé à votre email enregistré.
4. Cliquez {{< ui >}}Submit{{< /ui >}} pour compléter le processus de vérification.

#### Déconnectez-vous de toutes les sessions web actives {#log-out-of-all-active-web-sessions}

Pour vous déconnecter de toutes les sessions web actives :
Se déconnecter de toutes les sessions web actives vous déconnecte de toutes les sessions en cours sur les appareils, y compris celui que vous utilisez.


Pour vous déconnecter de toutes les sessions actives :
1. Allez à {{< ui >}}Personal Settings{{< /ui >}}.
2. Cliquez {{< ui >}}Log Out of All Web Sessions{{< /ui >}}.
3. Confirmez l'action.

Après confirmation, vous êtes déconnecté de tous les appareils et devez vous reconnecter.

## Apparence {#appearance}

Affichez Datadog en mode sombre en survolant votre avatar dans la barre latérale, ou en appuyant sur `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Pour s'adapter au paramètre d'apparence de votre ordinateur, sélectionnez l'option {{< ui >}}System{{< /ui >}}. Cela fait automatiquement correspondre l'apparence de Datadog au thème que vous avez défini au niveau du système d'exploitation.

## Connexion à GitHub {#connecting-to-github}

Si vous avez installé l'[intégration GitHub][9] pour créer des événements dans Datadog, liez votre compte GitHub personnel à votre compte utilisateur Datadog. En liant vos comptes, tous les commentaires que vous publiez sur les événements GitHub dans Datadog sont automatiquement repostés dans le ticket ou la pull request correspondante sur GitHub.

## Désactivation du compte de votre organisation {#disabling-your-organizations-account}

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
[15]: /fr/getting_started/organization_topology/