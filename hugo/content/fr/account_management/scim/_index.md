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

<div class="alert alert-info">
SCIM est disponible avec les offres Infrastructure Pro et Infrastructure Enterprise.
</div>

## Présentation

Le protocole SCIM (System for Cross-domain Identity Management) est un standard ouvert qui permet d'automatiser le provisionnement des utilisateurs. Grâce à SCIM, vous pouvez provisionner et déprovisionner automatiquement les utilisateurs de votre organisation Datadog en synchronisation avec le fournisseur d'identité (IdP) de votre organisation.

### Fonctionnalités prises en charge

- Créer des utilisateurs dans Datadog (la vérification de l'adresse e-mail est requise lors de la première connexion, consultez la section relative à la [vérification de l'adresse électronique][1])
- Supprimer des utilisateurs dans Datadog lorsqu'ils n'ont plus besoin d'un accès
- Assurer la synchronisation des attributs utilisateur entre le fournisseur d'identité et Datadog
- Connexion SSO à Datadog (recommandé)
- Équipes gérées : créer des équipes Datadog à partir des groupes du fournisseur d'identité et maintenir la synchronisation des membres des équipes Datadog avec les groupes du fournisseur d'identité.

Datadog prend en charge l'utilisation de SCIM avec les fournisseurs d'identité Microsoft Entra ID et Okta. Pour configurer SCIM, consultez la documentation de votre fournisseur d'identité :
- [Microsoft Entra ID][2]
- [Okta][3]

### Prérequis

SCIM dans Datadog est une fonctionnalité avancée incluse dans les offres Infrastructure Pro et Infrastructure Enterprise.

Cette documentation part du principe que votre organisation gère les identités utilisateur à l'aide d'un fournisseur d'identité.

Datadog recommande fortement d'utiliser une clé d'application de compte de service lors de la configuration de SCIM afin d'éviter toute interruption d'accès. Pour plus de détails, consultez la section [Utiliser un compte de service avec SCIM][4].

Lorsque SAML et SCIM sont utilisés conjointement, Datadog recommande fortement de désactiver le provisionnement SAML juste-à-temps (JIT) afin d'éviter les incohérences d'accès. Gérez le provisionnement des utilisateurs uniquement via SCIM.

## Utiliser un compte de service avec SCIM

Pour activer SCIM, vous devez utiliser une [clé d'application][5] afin de sécuriser la connexion entre votre fournisseur d'identité et votre compte Datadog. Chaque clé d'application est contrôlée par un utilisateur ou un compte de service spécifique.

Si vous utilisez une clé d'application liée à un utilisateur pour activer SCIM et que cet utilisateur quitte votre organisation, son compte Datadog est déprovisionné. La clé d'application liée à cet utilisateur est alors révoquée, ce qui rompt définitivement votre intégration SCIM et empêche les utilisateurs de votre organisation d'accéder à Datadog.

Pour éviter toute perte d'accès à vos données, Datadog recommande fortement de créer un [compte de service][6] dédié à SCIM. Depuis ce compte de service, créez une clé d'application à utiliser pour l'intégration SCIM.

## Vérifier l'adresse électronique

La création d'un nouvel utilisateur via SCIM déclenche l'envoi d'un e-mail à cet utilisateur. Pour un premier accès, il est nécessaire de se connecter en utilisant le lien d'invitation reçu par e-mail. Ce lien est actif pendant 2 jours. S'il expire, accédez à la [page des paramètres utilisateur][7] et sélectionnez un utilisateur pour renvoyer un lien d'invitation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/scim/#email-verification
[2]: /fr/account_management/scim/azure
[3]: /fr/account_management/scim/okta
[4]: /fr/account_management/scim/#using-a-service-account-with-scim
[5]: /fr/account_management/api-app-keys
[6]: /fr/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /fr/help/