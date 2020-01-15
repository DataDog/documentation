---
title: Contrôle d'accès à base de rôles (RBAC)
kind: documentation
private: true
beta: true
aliases:
  - /fr/guides/rbac
further_reading:
  - link: account_management/rbac/log_management/
    tag: Documentation
    text: RBAC pour Log Management
  - link: account_management/rbac/role_api
    tag: Documentation
    text: Gérer des rôles et des autorisations avec l’API Rôle
---
<div class="alert alert-warning">
La fonctionnalité RBAC est uniquement disponible pour Log Management. Demandez à votre représentant commercial ou responsable du succès client d'activer cette fonctionnalité.
</div>

## Rôles

Les rôles permettent de classifier les utilisateurs et de définir les autorisations d'accès qu'ils possèdent. Cela permet par exemple de choisir le type de données qu'ils peuvent lire ou le type de ressources de compte qu'ils peuvent modifier. Par défaut, Datadog propose trois rôles. Vous pouvez cependant créer des rôles personnalisés afin de vous assurer que vos utilisateurs possèdent le bon niveau d'autorisation.

Lorsque vous attribuez des autorisations à un rôle, tous les utilisateurs associés à ce rôle bénéficient de ces autorisations. Lorsque les utilisateurs sont associés à plusieurs rôles, ils bénéficient de l'ensemble des autorisations correspondant à chacun de ces rôles. Plus un utilisateur dispose de rôles, plus il peut accéder aux différentes fonctionnalités d'un compte Datadog.

## Rôles par défaut

Les rôles suivants sont disponibles par défaut. Les utilisateurs sont associés à l'un de ces trois rôles :

| Rôle                   | Description                                                                                 |
|------------------------|---------------------------------------------------------------------------------------------|
| Admin Datadog          | Dispose des autorisations de lecture/écriture sur toutes les données et ressources d'un compte Datadog.                 |
| Rôle Standard Datadog  | Dispose des autorisations de lecture sur toutes les données et des autorisations d'écriture sur la plupart des ressources d'un compte Datadog. |
| Rôle Read-Only Datadog | Dispose des autorisations de lecture sur toutes les données, mais ne possède aucune autorisation d'écriture sur les ressources d'un compte Datadog.   |

## Rôles personnalisés

Les rôles personnalisés sont importés par le biais des intégrations SAML à partir des fournisseurs d'identité. Datadog reçoit les groupes d'utilisateurs depuis votre fournisseur d'identité et génère automatiquement les rôles afin de les faire correspondre à ces groupes d'utilisateurs. Ainsi, les utilisateurs qui se connectent via le fournisseur d'identité sont automatiquement associés à ces rôles et bénéficient des autorisations correspondant à ces rôles.

Vous pouvez également utiliser [l'API Role][1] pour créer des rôles et associer des utilisateurs à ces rôles.

Vous pouvez accorder des autorisations pour des rôles existants, ou les révoquer, via [l'API Role][1]. Cela vous permet ainsi de gérer l'accès des utilisateurs associés à ces rôles.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/role_api