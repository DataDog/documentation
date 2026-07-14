---
aliases:
- /es/dashboards/faq/how-to-use-terraform-to-restrict-dashboards
- /es/dashboards/guide/how-to-use-terraform-to-restrict-dashboards
description: Utiliza el atributo restricted_roles en Terraform para controlar los
  permisos de edición de dashboards para roles de usuario específicos.
title: Cómo utilizar Terraform para restringir la edición de un dashboard
---


## Restringir un dashboard utilizando el atributo restricted_roles

El atributo `restricted_roles` puede utilizarse para restringir la edición del dashboard a determinados roles. El campo toma una lista de ID de roles, y autoriza a cualquier usuario asociado.

Ejemplo de uso:

```hcl
recurso "datadog_dashboard" "ejemplo" {
  título         = "Dashboard de ejemplo"
  restricted_roles = ["<role_id_1>", "<role_id_2>"]
}
```

**Nota**: El atributo `is_read_only` está obsoleto. Se recomienda utilizar el atributo `restricted_roles` o políticas de restricción para gestionar el acceso a tus dashboards.

## Restringir un dashboard utilizando una política de restricción

<div class="alert alert-danger">Las políticas de restricción están en vista previa. Ponte en contacto con el <a href="/help/">servicio de asistencia de Datadog</a> o con tu asesor de clientes para obtener acceso.</div>

Las [políticas de restricción][1] te permiten restringir la edición de dashboards y otros recursos a responsables específicos, incluyendo roles, equipos, usuarios y cuentas de servicio.

Ejemplo de uso:

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

Los ID de rol se pueden recuperar desde la [API de roles][2], [Roles UI][5], o utilizando el ID de rol definido en Terraform para los recursos [datadog_role][3].

El ID de org. puede obtenerse de la petición [OBTENER API /api/v2/current_user][4]. Encuéntralo en el campo `data.relationships.org.data.id`. 




[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[2]: /es/api/latest/roles/#list-roles
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[4]: https://app.datadoghq.com/api/v2/current_user
[5]: https://app.datadoghq.com/organization-settings/roles