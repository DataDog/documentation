---
aliases:
- /fr/dashboards/faq/how-to-use-terraform-to-restrict-dashboards
- /fr/dashboards/guide/how-to-use-terraform-to-restrict-dashboards
description: Utiliser l'attribut restricted_roles dans Terraform pour contrôler les
  autorisations de modification de dashboard pour des rôles d'utilisateur spécifiques.
title: Utiliser Terraform pour restreindre la modification d'un dashboard
---


## Restreindre un dashboard en utilisant l'attribut restricted_roles

L'attribut `restricted_roles` peut être utilisé pour restreindre la modification du dashboard à des rôles spécifiques. Le champ prend une liste d'ID de rôles et autorise tous les utilisateurs associés.

Exemple d'utilisation :

```hcl
resource "datadog_dashboard" "example" {
  title         = "Example dashboard"
  restricted_roles = ["<role_id_1>", "<role_id_2>"]
}
```

**Remarque** : l'attribut `is_read_only` est obsolète. Il est recommandé d'utiliser l'attribut `restricted_roles` ou les politiques de restriction pour gérer l'accès à vos dashboards.

## Restreindre un dashboard en utilisant une politique de restriction

<div class="alert alert-danger">Les politiques de restriction sont en préversion. Contactez l'<a href="/help/">assistance Datadog</a> ou votre Customer Success Manager pour y accéder.</div>

Les [politiques de restriction][1] vous permettent de restreindre la modification de dashboards et d'autres ressources à des principaux spécifiques, notamment les rôles, les équipes, les utilisateurs et les comptes de service.

Exemple d'utilisation :

```hcl
resource "datadog_dashboard" "example" {
  title         = "Example dashboard"
  # Do not use restricted_roles or is_read_only attributes
}

resource "datadog_restriction_policy" "example" {
 resource_id = "dashboard:${datadog_dashboard.example.id}"
  bindings {
     principals = ["org:<org_id>"]
     relation = "viewer"
  }
  bindings {
     principals = ["role:<role_id_1>", "role:<role_id_2>"]
     relation = "editor"
  }
}
```

Les ID de rôles peuvent être récupérés depuis l'[API Roles][2], l'[interface utilisateur Roles][5], ou en utilisant l'ID de rôle défini dans Terraform pour les ressources [datadog_role][3].

L'ID d'organisation peut être obtenu depuis la requête [API GET /api/v2/current_user][4]. Trouvez-le dans le champ `data.relationships.org.data.id`.




[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[2]: /fr/api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[4]: https://app.datadoghq.com/api/v2/current_user
[5]: https://app.datadoghq.com/organization-settings/roles