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
  text: Bonnes pratiques pour gérer les organisations Datadog à grande échelle
title: Gestion de compte
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La plateforme Datadog for Government prend uniquement en charge l'authentification SAML ou l'authentification de base utilisant un nom d'utilisateur/e-mail et un mot de passe. Avant de configurer l'authentification SAML, assurez-vous qu'au moins un compte avec nom d'utilisateur/e-mail et mot de passe a été créé pour maintenir l'accès pendant le processus de configuration. Datadog recommande d'activer l'authentification multifacteur (MFA) pour les comptes utilisant un mot de passe.

Si vous avez besoin d'activer SAML pour un compte d'essai, contactez <a href="https://docs.datadoghq.com/getting_started/support/">Datadog Support</a>.</div>

{{< /site-region >}}

## Paramètres personnels {#personal-settings}

Les pages des paramètres personnels Datadog vous permettent de contrôler les informations à votre sujet que les autres membres de votre organisation peuvent consulter, de changer d'organisation, de quitter une organisation et de gérer vos préférences de notification.

### Profil {#profile}

Votre profil est la façon dont les autres membres de votre organisation vous reconnaissent dans Datadog. Définissez ou mettez à jour votre nom, votre adresse e-mail et votre titre depuis l'[onglet Profile][11] sur la page {{< ui >}}Personal Settings{{< /ui >}}.

Pour modifier votre photo, créez un compte sur [Gravatar][1] et associez-le à votre adresse e-mail.

Si vous vous connectez à Datadog en utilisant l'authentification Google, votre adresse e-mail est fournie par votre compte Google et n'est **pas** modifiable dans Datadog. Pour modifier votre adresse e-mail dans Google, consultez la [documentation Google][2].

### Préférences {#preferences}

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
Vous pouvez gérer votre fuseau horaire, votre format horaire, votre préférence d'accessibilité visuelle et vos abonnements aux e-mails depuis l'[onglet Preferences][3] sur la page {{< ui >}}Personal Settings{{< /ui >}}.

#### Abonnements aux e-mails {#email-subscriptions}

La section E-mail subscriptions vous donne accès aux rapports suivants :
{{< site-region region="us3,us5,gov,gov2,ap1,ap2,uk1" >}}
<div class="alert alert-danger">Les résumés par e-mail ne sont pas disponibles sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

* Daily Digest
* Weekly Digest

Si vous ne savez pas si un résumé par e-mail vous concerne, vous pouvez en voir un exemple en cliquant sur le lien {{< ui >}}Example{{< /ui >}} à côté de chaque abonnement aux e-mails. Vous pouvez également utiliser le bouton {{< ui >}}Unsubscribe From All{{< /ui >}} pour vous désabonner de tous les abonnements aux e-mails.

Les utilisateurs désactivés ne reçoivent pas de résumés par e-mail. Si un utilisateur actif ne reçoit pas de résumé par e-mail, consultez [Dépannage de la distribution des e-mails][17].
{{% /site-region %}}


{{% site-region region="gov,gov2" %}}
Vous pouvez gérer votre fuseau horaire, votre format horaire et votre préférence d'accessibilité visuelle depuis l'[onglet **Preferences**][3] sur la page {{< ui >}}Personal Settings{{< /ui >}}.
{{% /site-region %}}

#### Format de l'heure {#time-format}

Choisissez si les heures sont affichées au format 12 heures ou 24 heures dans Datadog (par exemple, « 2:30 pm » ou « 14:30 »). Les nouveaux comptes utilisent le format 12 heures par défaut. Les graphiques et certaines données tabulaires s'affichent en permanence au format 24 heures.

#### Accessibilité visuelle {#visual-accessibility}

La préférence d'accessibilité visuelle propose cinq paramètres différents pour répondre aux besoins liés au daltonisme, à une faible acuité visuelle et à la sensibilité aux couleurs vives. Si vous optez pour un paramètre de couleur accessible, Datadog applique à tous les graphiques utilisant la palette de couleurs classique une palette de couleurs accessibles adaptée à vos besoins visuels.

**Remarque** : Votre préférence d'accessibilité visuelle est enregistrée localement dans votre navigateur. Si vous utilisez un autre navigateur ou si vous videz votre cache, la préférence est réinitialisée sur le paramètre par défaut.

### Organisations {#organizations}

L'[onglet Organizations][12] dans {{< ui >}}Personal Settings{{< /ui >}} répertorie toutes les organisations auxquelles vous êtes associé. Passez d'une organisation à l'autre depuis cette page ou en survolant le menu du compte dans la navigation de gauche.

**Remarque** : Si vous quittez une organisation, vous ne pouvez pas la rejoindre à moins d'y être invité par un administrateur.

Pour rejoindre une organisation existante, vous devez être invité par un administrateur. Une fois invité, vous recevez un e-mail ayant pour objet « You've been invited to join \<Organization Name> ». Cliquez sur le bouton {{< ui >}}Join Account{{< /ui >}} dans l'e-mail.

Si vous êtes un administrateur d'organisation, consultez les ressources suivantes pour obtenir davantage d'informations :

* [Gérer les utilisateurs de votre organisation][4]
* [Configurer l'authentification unique avec SAML][5]
* [Renommer votre organisation][6]
* [Gérer les comptes multi-organisations][7]
* [Modifier votre forfait Datadog et consulter l'historique de votre utilisation et de votre facturation][8]
* [Choisir la topologie de votre organisation (organisation unique ou multi-organisation)][15]
* [Gérer les contrôles d'accès et le déploiement de l'entreprise][16]

### Security {#security}

#### Application Keys {#application-keys}

L'[onglet Application Keys][13] dans {{< ui >}}Personal Settings{{< /ui >}} vous permet de gérer vos clés d'application. Pour copier une clé, survolez-la jusqu'à ce que l'icône {{< ui >}}Copy Key{{< /ui >}} apparaisse à droite, puis cliquez dessus. Vous pouvez également cliquer sur une clé spécifique pour modifier son nom, voir quand elle a été créée, voir le profil du propriétaire de la clé, la copier ou la révoquer.

#### Apps {#apps}

L'[onglet Apps][14] dans {{< ui >}}Personal Settings{{< /ui >}} vous permet de gérer les applications qui ont été installées ou créées par les membres de votre organisation. Vous pouvez filtrer les applications avec une chaîne de recherche, ou choisir de n'afficher que les applications activées ou désactivées à l'aide des cases à cocher.

Lorsque vous passez votre curseur sur une app, une option vous permettant de l'activer ou la désactiver apparaît à droite de son nom.

#### Vérification de l'adresse e-mail {#email-verification}
Vérifiez votre adresse e-mail pour renforcer la sécurité de votre compte et accéder à des fonctionnalités de gestion supplémentaires. Les utilisateurs vérifiés ont un meilleur contrôle sur la sécurité de leur compte et peuvent voir toutes les organisations auxquelles ils appartiennent.

- **Les utilisateurs connectés via Google** sont automatiquement vérifiés lors de leur première connexion.
- **Les utilisateurs qui se connectent avec un mot de passe** vérifient leur adresse e-mail lorsqu'ils définissent leur mot de passe pour la première fois.
- **Les utilisateurs SAML** doivent vérifier manuellement leur e-mail via Datadog.

Une fois votre adresse e-mail vérifiée, vous avez accès aux fonctionnalités suivantes :
- La possibilité de **vous déconnecter de toutes les sessions Web actives** sur tous les appareils, afin de protéger votre compte en cas de compromission de vos identifiants.
- La possibilité de **consulter les organisations et de passer de l'une à l'autre** en dehors de votre hiérarchie d'organisations actuelle.

Les utilisateurs non vérifiés peuvent toujours accéder à Datadog, mais ne peuvent consulter que les organisations de leur hiérarchie et ne peuvent pas révoquer les sessions actives.

#### Vérifiez votre adresse e-mail {#verify-your-email}

Pour vérifier votre adresse e-mail :
1. Accédez à votre {{< ui >}}Profile Settings{{< /ui >}}.
2. Cliquez sur {{< ui >}}Verify Account{{< /ui >}}.
3. Saisissez le **code de vérification** envoyé à votre adresse e-mail enregistrée.
4. Cliquez sur {{< ui >}}Submit{{< /ui >}} pour terminer le processus de vérification.

#### Déconnectez-vous de toutes les sessions Web actives {#log-out-of-all-active-web-sessions}

Pour vous déconnecter de toutes les sessions Web actives :
La déconnexion de toutes les sessions Web actives vous déconnecte de toutes les sessions actuelles sur tous les appareils, y compris celui que vous utilisez.


Pour vous déconnecter de toutes les sessions actives :
1. Accédez à {{< ui >}}Personal Settings{{< /ui >}}.
2. Cliquez sur {{< ui >}}Log Out of All Web Sessions{{< /ui >}}.
3. Confirmez l'action.

Après confirmation, vous êtes déconnecté de tous les appareils et devez vous reconnecter.

## Apparence {#appearance}

Affichez Datadog en mode sombre en survolant votre avatar dans la barre latérale ou en appuyant sur `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Pour adapter l'apparence de Datadog aux paramètres d'apparence de votre ordinateur, sélectionnez l'option {{< ui >}}System{{< /ui >}}. Cela adapte automatiquement l'apparence de Datadog au thème que vous avez défini au niveau du système d'exploitation.

## Connexion à GitHub {#connecting-to-github}

Si vous avez installé l'[intégration GitHub][9] pour créer des événements dans Datadog, associez votre compte GitHub personnel à votre compte utilisateur Datadog. En associant vos comptes, tous les commentaires que vous publiez sur des événements GitHub dans Datadog sont automatiquement publiés dans l'issue ou la pull request correspondante sur GitHub.

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
[15]: /fr/account_management/organization_topology/
[16]: /fr/getting_started/access_for_enterprises/
[17]: /fr/account_management/email_delivery/troubleshooting_email_delivery/