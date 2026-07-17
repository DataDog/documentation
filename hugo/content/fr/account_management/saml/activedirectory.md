---
title: Configurer Microsoft Active Directory Federation Services en tant que fournisseur d'identité SAML
aliases:
  - /fr/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: /account_management/multi_organization/
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
L'intégration SAML Datadog pour l'authentification unique permet d'associer une organisation à un système de gestion d'utilisateurs externe, afin de conserver et de gérer tous les identifiants depuis un système centralisé. Ce guide vient compléter la section [Authentification unique avec SAML][1], qui présente le fonctionnement de l'authentification unique avec Datadog.

Pour commencer la configuration du SAML pour Active Directory Federation Services (AD FS), consultez la page [Configurer un fournisseur SAML 2.0 pour les portails avec AD FS][2] de Microsoft.

Une fois le SAML configuré, les utilisateurs peuvent se connecter en utilisant le lien fourni sur la [page de configuration SAML][3]. N'oubliez pas que les utilisateurs doivent toujours être invités et activés avant de pouvoir se connecter. Invitez de nouveaux utilisateurs en saisissant l'adresse e-mail qui correspond à leur dossier d'utilisateur Active Directory, sans quoi l'accès pourrait leur être refusé, comme ci-dessous :

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla" style="width:60%;">}}

Dans la plupart des configurations, l'adresse `utilisateur@domaine` d'un utilisateur correspond à son identifiant Microsoft, mais ce n'est pas forcément le cas. Vous pouvez confirmer l'adresse e-mail utilisée au sein du dossier d'utilisateur comme indiqué ci-dessous :

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK" style="width:60%;">}}

Si vous avez des questions à propos d'erreurs dans l'application Datadog concernant le SAML, contactez l'[équipe d'assistance Datadog][4]. En cas d'erreur dans AD FS, contactez l'[assistance Microsoft][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/saml/
[2]: https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-saml2-settings
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: /fr/help/
[5]: https://powerapps.microsoft.com/en-us/support/