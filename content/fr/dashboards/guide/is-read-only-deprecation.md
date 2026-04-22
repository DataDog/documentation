---
description: Migrer depuis l'attribut obsolète is_read_only vers restricted_roles
  ou les politiques de restriction pour le contrôle d'accès aux dashboards.
further_reading:
- link: /dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
  tag: Guide
  text: Utiliser Terraform pour restreindre la modification d'un dashboard
- link: /api/latest/restriction-policies/
  tag: API
  text: Politiques de restriction
title: 'API Dashboards : migrer depuis is_read_only'
---

## Présentation

Datadog supprime la prise en charge de l'attribut `is_read_only` dans les API Dashboards. Pour les clients qui gèrent les dashboards directement avec l'API, Datadog recommande de passer à `restricted_roles`](#migrer-vers-restricted_roles) ou aux [politiques de restriction](#politiques-de-restriction).

## Actions à entreprendre

Migrez depuis `is_read_only` vers `restricted_roles` ou envisagez de participer à la préversion des politiques de restriction.

### Migrer vers `restricted_roles`

Le paramètre `restricted_roles` permet aux propriétaires de dashboards d'attribuer des autorisations spécifiques aux utilisateurs avec des rôles.

La migration vers `restricted_roles` peut être effectuée de manière indépendante. Pour en savoir plus, consultez la section [API Dashboards][1].

### Politiques de restriction

Les politiques de restriction pour les dashboards définissent les règles de contrôle d'accès pour une ressource. Elles mappent un ensemble de relations (éditeur et visualiseur) à un ensemble de principaux autorisés (rôles, équipes ou utilisateurs).

Si vous gérez les dashboards via Terraform :
1. Assurez-vous que vous utilisez le fournisseur Datadog Terraform v3.27.0 ou une version supérieure.
2. Supprimez `is_read_only` et `restricted_role` de vos ressources Terraform de dashboards.
3. Créez une nouvelle ressource [datadog_restriction_policy][2], en référençant l'ID de dashboard respectif et les principaux des attributs récemment supprimés.
4. Exécutez `terraform apply`.

Pour un exemple de ressources Terraform, consultez la section [Comment utiliser Terraform pour restreindre la modification d'un dashboard][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[3]: /fr/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/#restricting-a-dashboard-using-a-restriction-policy