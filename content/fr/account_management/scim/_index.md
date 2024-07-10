---
algolia:
  tags:
  - scim
  - fournisseur d'identité
  - IdP
further_reading:
- link: /account_management/scim/azure/
  tag: Documentation
  text: Configurer SCIM avec Azure Active Directory
- link: account_management/scim/okta
  tag: Documentation
  text: Configurer SCIM avec Okta
title: Provisionnement d'utilisateurs SCIM
---

## Présentation

SCIM (System for Cross-domain Identity Management) est un standard ouvert visant à automatiser le provisionnement d'utilisateurs. Grâce à SCIM, vous pouvez provisionner et déprovisionner automatiquement des utilisateurs dans votre organisation Datadog tout en synchronisant les données avec le fournisseur d'identité de votre organisation.

### Fonctionnalités prises en charge

- Création d'utilisateurs dans Datadog (la vérification de l'adresse e-mail est requise lors de la première connexion, consultez la rubrique [Vérification de l'adresse e-mail][1])
- Suppression d'utilisateurs dans Datadog lorsqu'ils n'ont plus besoin d'un accès
- Synchronisation des attributs utilisateur entre le fournisseur d'identité et Datadog
- SSO pour Datadog (conseillé)

Datadog prend en charge l'utilisation de SCIM avec les fournisseurs d'identité Azure Active Directory (Azure AD) et Okta. Pour configurer SCIM, consultez la documentation de votre fournisseur d'identité :
- [Azure AD][2]
- [Okta][3]

### Prérequis

Pour utiliser SCIM avec Datadog, vous devez disposer d'un compte Enterprise.

Cette documentation part du principe que votre organisation gère les identités de ses utilisateurs à l'aide d'un fournisseur d'identité.

Datadog vous conseille fortement d'utiliser une clé d'application de compte de service lors de la configuration de SCIM, afin d'éviter toute perte d'accès. Pour en savoir plus, consultez la rubrique [Utiliser un compte de service avec SCIM][4].

Si vous utilisez à la fois SAML et SCIM, Datadog vous conseille fortement de désactiver le provisionnement juste à temps pour éviter toute disparité au niveau de l'accès. Gérez uniquement le provisionnement des utilisateurs via SCIM.

## Utiliser un compte de service avec SCIM

Pour activer SCIM, vous devez utiliser une [clé d'application][5] afin de sécuriser la connexion entre votre fournisseur d'identité et votre compte Datadog. Chaque clé d'application est contrôlée par un utilisateur ou compte de service spécifique.

Si vous activez SCIM en utilisant une clé d'application associée à un utilisateur et que ce dernier quitte votre organisation, son compte Datadog sera déprovisionné. La clé d'application propre à cet utilisateur sera alors révoquée et votre intégration SCIM ne sera plus valide, ce qui empêchera les utilisateurs de votre organisation d'accéder à Datadog.

Pour éviter de perdre l'accès à vos données, Datadog vous conseille fortement de créer un [compte de service][6] dédié à SCIM et de créer dans ce dernier une clé d'application pour l'intégration SCIM.

## Vérification de l'adresse e-mail

Lorsque vous créez un utilisateur avec SCIM, un e-mail est envoyé à cet utilisateur. Pour son premier accès, ce dernier doit se connecter via le lien d'invitation envoyé par e-mail. Ce lien est actif pendant 30 jours. S'il expire, accédez à la [pages des paramètres utilisateur][7] et sélectionnez un utilisateur pour lui renvoyer un lien d'invitation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/scim/#email-verification
[2]: /fr/account_management/scim/azure
[3]: /fr/account_management/scim/okta
[4]: /fr/account_management/scim/#using-a-service-account-with-scim
[5]: /fr/account_management/api-app-keys
[6]: /fr/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users