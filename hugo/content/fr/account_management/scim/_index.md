---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
description: Automatisez le provisionnement et le déprovisionnement des utilisateurs
  dans Datadog à l'aide de l'intégration SCIM avec les fournisseurs d'identité Microsoft
  Entra ID et Okta.
further_reading:
- link: /account_management/scim/azure/
  tag: Documentation
  text: Configurez SCIM avec Azure Active Directory
- link: account_management/scim/okta
  tag: Documentation
  text: Configurer SCIM avec Okta
title: Provisionnement des utilisateurs avec SCIM
---
<div class="alert alert-info">
SCIM est disponible avec les plans Infrastructure Pro, Infrastructure Enterprise et Startup.
</div>

## Présentation {#overview}

Le System for Cross-domain Identity Management, ou [SCIM][9], est une norme ouverte qui permet l'automatisation du provisionnement des utilisateurs. Grâce à SCIM, vous pouvez automatiquement provisionner et déprovisionner des utilisateurs dans votre organisation Datadog en synchronisation avec le fournisseur d'identité (IdP) de votre organisation.

### Fonctionnalités prises en charge {#supported-capabilities}

- Créez des utilisateurs dans Datadog
- Supprimez les utilisateurs dans Datadog lorsqu'ils n'ont plus besoin d'accès
- Authentification unique à Datadog (recommandée)
- Managed Teams : créez des Datadog Teams à partir des groupes du fournisseur d'identité et maintenez leur composition synchronisée avec celle de ces groupes.
- Provisionnement des rôles : provisionnez le rôle Datadog d'un utilisateur (intégré ou personnalisé) à partir d'un attribut de fournisseur d'identité et maintenez-le synchronisé. Lorsque l'attribut change dans votre fournisseur d'identité, le rôle Datadog de l'utilisateur est mis à jour en temps réel.

Datadog implémente le protocole de serveur SCIM. Datadog prend en charge l'utilisation de SCIM avec les fournisseurs d'identité Microsoft Entra ID et Okta. D'autres fournisseurs d'identité peuvent fonctionner, mais ne sont pas explicitement pris en charge.

Pour configurer SCIM pour les fournisseurs d'identité pris en charge, consultez la documentation de votre IdP :
- [Microsoft Entra ID][2]
- [Okta][3]

### Prérequis {#prerequisites}

SCIM dans Datadog est une fonctionnalité avancée disponible avec les plans Infrastructure Pro, Infrastructure Enterprise et Startup.

Cette documentation suppose que votre organisation gère les identités des utilisateurs à l'aide d'un fournisseur d'identité.

Datadog recommande vivement d'utiliser une clé d'application de compte de service lors de la configuration de SCIM pour éviter toute interruption de l'accès. Pour plus de détails, consultez [l'utilisation d'un compte de service avec SCIM][4].

Lorsque vous utilisez SAML et SCIM ensemble, Datadog recommande vivement de désactiver le provisionnement juste-à-temps (JIT) SAML pour éviter les divergences d'accès. Gérez le provisionnement des utilisateurs uniquement via SCIM.

### Comportement de provisionnement des rôles {#role-provisioning-behavior}

Lorsqu'une requête SCIM inclut un ou plusieurs rôles, Datadog provisionne uniquement les rôles qui correspondent à un rôle dans votre organisation. Si aucun des rôles ne correspond, l'utilisateur se voit attribuer le rôle par défaut de votre organisation (Standard). Les rôles sans correspondance sont enregistrés dans [Audit Trail][11].

SCIM est la source de vérité pour l'attribution des rôles et prévaut sur les [mappages de rôles SAML][12]. Les événements de provisionnement de rôles SCIM sont enregistrés dans Audit Trail et en tant que métriques StatsD.

Les rôles suivent la convention d'attribut à valeurs multiples SCIM définie dans la [RFC 7643][13]. Okta et Microsoft Entra ID prennent tous deux en charge ce mappage nativement, sans nécessiter de script personnalisé. Pour obtenir des instructions de configuration, consultez la documentation de votre fournisseur d'identité.

## Utilisation d'un compte de service avec SCIM {#using-a-service-account-with-scim}

Pour activer SCIM, vous devez utiliser une [clé d'application][5] afin de sécuriser la connexion entre votre fournisseur d'identité et votre compte Datadog. Chaque clé d'application est contrôlée par un utilisateur ou un compte de service donné.

Si vous utilisez une clé d'application liée à un utilisateur pour activer SCIM et que cet utilisateur quitte votre organisation, son compte Datadog est déprovisionné. Cette clé d'application spécifique à l'utilisateur est révoquée, ce qui interrompt définitivement votre intégration SCIM et empêche les utilisateurs de votre organisation d'accéder à Datadog.

Pour éviter de perdre l'accès à vos données, Datadog recommande vivement de créer un [compte de service][6] dédié à SCIM. Au sein de ce compte de service, créez une clé d'application à utiliser dans l'intégration SCIM.

Le compte de service nécessite au minimum les autorisations `user_access_invite` et `user_access_manage`. Pour obtenir la liste complète des autorisations requises, consultez la [documentation de l'API SCIM][10].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/scim/#email-verification
[2]: /fr/account_management/scim/azure
[3]: /fr/account_management/scim/okta
[4]: /fr/account_management/scim/#using-a-service-account-with-scim
[5]: /fr/account_management/api-app-keys
[6]: /fr/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /fr/help/
[9]: https://scim.cloud/
[10]: /fr/api/latest/scim/
[11]: /fr/account_management/audit_trail/
[12]: /fr/account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
[13]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2