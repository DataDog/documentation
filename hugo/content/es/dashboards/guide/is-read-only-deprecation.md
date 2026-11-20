---
description: Migra del atributo obsoleto is_read_only a restricted_roles o políticas
  de restricción para el control de acceso al dashboard.
further_reading:
- link: /dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
  tag: Guía
  text: Cómo utilizar Terraform para restringir la edición de un dashboard
- link: /api/latest/restriction-policies/
  tag: API
  text: Políticas de restricción
title: 'API de dashboards: Migrar desde is_read_only'
---

## Información general

Datadog está eliminando la compatibilidad con el atributo `is_read_only` en las API de dashboards. Para los clientes que gestionan dashboards con la API directamente, Datadog recomienda que pasen a [`restricted_roles`](#migrate-to-restricted_roles) o a [políticas de restricción](#restriction-policies). 

## Medidas que deben tomarse

Migra de `is_read_only` a `restricted_roles` o considera la posibilidad de participar en la vista previa de las políticas de restricción.

### Migrar a `restricted_roles`

El parámetro `restricted_roles` permite a los propietarios del dashboard asignar permisos específicos a usuarios con roles.

La migración a `restricted_roles` puede realizarse de forma independiente. Para obtener más información, consulta la documentación del la [API de dashboards][1].

### Políticas de restricción

Las políticas de restricción para dashboards definen las reglas de control del acceso a un recurso. Asigna un conjunto de relaciones (editor y visualizador) a un conjunto de elementos principales permitidos (roles, equipos o usuarios).

Si estás gestionando dashboards a través de Terraform: 
1. Asegúrate de que estás utilizando Datadog Terraform Provider v3.27.0 o posterior.
2. Elimina `is_read_only` y `restricted_role` de los recursos Terraform de tu dashboard. 
3. Crea un nuevo recurso [datadog_restriction_policy][2], mencionando el ID del dashboard respectivo y los elementos principales de los atributos recientemente eliminados. 
4. Ejecuta `terraform apply`.

Para ver un ejemplo de recursos de Terraform, consulta la guía sobre el [Uso de Terraform para restringir la edición de un dashboard][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[3]: /es/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/#restricting-a-dashboard-using-a-restriction-policy