---
aliases:
- /fr/dashboards/faq/how-to-use-terraform-to-restrict-dashboards
- /fr/dashboards/guide/how-to-use-terraform-to-restrict-dashboards
title: Utiliser Terraform pour restreindre la modification d'un dashboard
---


## Introduction

Auparavant, pour restreindre la modification d'un dashboard créé et géré par [Terraform][1], vous deviez utiliser l'attribut `is_read_only`. Avec cet attribut, seuls le créateur ou les utilisateurs de votre organisation disposant de l'autorisation Access Management (`user_access_manage`) pouvaient modifier le dashboard en question. Désormais, grâce au nouvel attribut `restricted_roles`, vous pouvez énumérer les rôles de votre organisation autorisés de modifier le dashboard.

## Restreindre la modification d'un dashboard

Si vous utilisez déjà l'attribut `is_read_only` dans votre définition, cette configuration continue à être valable tant que vos utilisateurs consultent et utilisent la liste de rôles. Pour synchroniser correctement vos définitions Terraform avec l'interface de l'application Datadog, suivez les étapes ci-dessous :

1. Installez la version 3.1.0 ou une version ultérieure du fournisseur Terraform Datadog.

2. Obtenez l'UUID des rôles que vous souhaitez autoriser. Pour ce faire, récupérer les UUID depuis l'[API Roles][2] ou la page Roles, ou indiquez l'ID des rôles tel que défini dans Terraform pour les [rôles gérés][3].

3. Remplacez l'attribut `is_read_only` par `restricted_roles` dans les définitions de vos dashboards :

{{< img src="dashboards/guide/terraform_is_read_only_definition.png" alt="Dashboards en lecture seule" style="width:80%;">}}

{{< img src="dashboards/guide/terraform_restricted_role_definition.png" alt="Dashboards avec une restriction basée sur les rôles" style="width:80%;">}}

## Problèmes courants

### L'attribut `is_read_only` est toujours activé pour mon dashboard

Cette configuration est toujours valable. Chaque exécution Terraform détecte les modifications apportées à l'accès basé sur les rôles ou la lecture seule, et vous prévient si l'attribut `is_read_only` a été modifié.

### Terraform indique que `is_read_only` a été supprimé

Terraform génère cet avertissement car votre navigateur remplace l'ancien flag d'autorisation par le nouveau flag, avec un schéma d'autorisations plus avancé. Si vous installez la version 3.1.0 ou une version ultérieure de Terraform, vous aurez accès aux nouveaux champs de restriction des rôles.

Cette modification mineure n'a aucune incidence sur les fonctionnalités ni sur les paramètres de sécurité des dashboards. Lorsque vous appliquez votre nouvelle configuration Terraform, elle remplace la configuration d'origine avec l'attribut `is_read_only`.

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
[2]: /fr/api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role