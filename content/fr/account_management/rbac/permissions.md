---
title: Autorisations des rôles Datadog
kind: documentation
aliases:
  - /fr/account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
  - link: /account_management/rbac/
    tag: Documentation
    text: 'Découvrir comment créer, mettre à jour et supprimer un rôle'
  - link: '/api/v2/roles/#enumerer-les-autorisations'
    tag: Documentation
    text: Gérer vos autorisations avec l'API Permission
---
Une fois votre rôle créé, vous pouvez attribuer ou supprimer des autorisations pour ce rôle directement en [le mettant à jour depuis l'application Datadog][1] ou via [l'API Permission de Datadog][2]. Vous trouverez ci-dessous la liste des autorisations disponibles.

## Présentation

### Autorisations générales

Les autorisations générales définissent les niveaux d'accès minimum pour votre rôle. Les [autorisations avancées](#autorisations-avancees) permettent ensuite d'accorder des droits supplémentaires.

{{< permissions group="Géneral" >}}

**Remarque** : il n'existe pas d'autorisation `read-only` étant donné qu'elle est définie par l'absence des autorisations `admin` et `standard` pour un rôle.

### Autorisations avancées

Par défaut, les utilisateurs existants sont déjà associés à l'un des trois rôles Datadog par défaut : Admin, Standard ou Read-Only. Tous les utilisateurs sont donc déjà autorisés à lire l'ensemble des types de données. Les utilisateurs avec le rôle Admin ou Standard disposent quant à eux d'un droit d'écriture sur ces ressources.

**Remarque** : lorsque vous attribuez un nouveau rôle personnalisé à un utilisateur, assurez-vous de supprimer le rôle Datadog par défaut attribué à cet utilisateur afin d'appliquer les nouvelles autorisations de rôle.

En plus des autorisations générales, il est possible de définir des autorisations plus granulaires pour des ressources ou des types de données spécifiques. Les autorisations peuvent être globales ou limitées à un sous-ensemble d'éléments. Vous trouverez ci-dessous les détails de ces options et leur impact sur chacune des autorisations disponibles.

{{% permissions %}}
{{< permissions group="Logs" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration est une marque déposée de Datadog, Inc.

[1]: /fr/account_management/users/#edit-a-user-s-roles
[2]: /fr/api/v2/roles/#list-permissions