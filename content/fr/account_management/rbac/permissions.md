---
aliases:
- /fr/account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: Documentation
  text: Découvrir comment créer, mettre à jour et supprimer un rôle
- link: /api/v2/roles/#enumerer-les-autorisations
  tag: Documentation
  text: Gérer vos autorisations avec l'API Permission
title: Autorisations des rôles Datadog
algolia:
    rank: 80
    category: Documentation
    subcategory: Autorisations des rôles Datadog
---

Une fois votre rôle créé, attribuez-lui ou retirez-lui directement des autorisations en [le modifiant dans Datadog][1] ou via [l'API Permission de Datadog][2]. Vous trouverez ci-dessous la liste des autorisations disponibles.

## Présentation

### Autorisations générales

Les autorisations générales définissent les niveaux d'accès minimum pour votre rôle. Les [autorisations avancées](#autorisations-avancees) permettent ensuite d'accorder des droits supplémentaires.

{{< permissions group="Géneral" >}}

**Remarque** : il n'existe pas d'autorisation `read-only`. Pour obtenir un accès en lecture seule, il suffit de ne pas accorder l'autorisation `standard`.

### Autorisations avancées

Par défaut, les utilisateurs existants sont associés à l'un des trois rôles prêts à l'emploi :

- Admin Datadog
- Standard Datadog
- Read-Only Datadog

Tous les utilisateurs peuvent lire l'ensemble des types de données. Les utilisateurs Admin et Standard sont autorisés à écrire des données sur des ressources.

**Remarque** : lorsque vous attribuez un nouveau rôle personnalisé à un utilisateur, assurez-vous de supprimer le rôle Datadog par défaut attribué à cet utilisateur afin d'appliquer les nouvelles autorisations de rôle.

En plus des autorisations générales, vous pouvez définir des autorisations plus granulaires pour des ressources ou des types de données spécifiques. Les autorisations peuvent être globales ou limitées à un sous-ensemble d'éléments. Vous trouverez ci-dessous les détails de ces options et leur impact sur chacune des autorisations disponibles.

{{% permissions %}}
{{< permissions group="Logs" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration est une marque déposée de Datadog, Inc.

[1]: /fr/account_management/users/#edit-a-user-s-roles
[2]: /fr/api/latest/roles/#list-permissions