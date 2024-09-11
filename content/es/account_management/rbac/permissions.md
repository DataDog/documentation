---
algolia:
  category: Documentación
  rank: 80
  subcategory: Permisos de Rol en Datadog
aliases:
- /es/account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: Documentación
  text: Aprende cómo crear, actualizar y borrar un rol.
- link: /api/v2/roles/#list-permissions
  tag: Documentación
  text: Gestiona tus permisos con la API de permisos.
title: Permisos de rol en Datadog
---

## Información general

Los permisos definen el tipo de acceso que tiene un usuario a un determinado recurso. Normalmente, los permisos otorgan a un usuario el derecho a leer, editar o eliminar un objeto. Los permisos son la base de los derechos de acceso de todos los roles, incluidos los tres roles predefinidos y los roles personalizados.

### Roles predefinidos

Por defecto, los usuarios existentes están asociados a uno de los tres roles predefinidos:

- Administrador Datadog
- Datadog Estándar
- Datadog Solo lectura

Todos los usuarios con uno de estos roles pueden leer todos los tipos de datos, excepto los recursos [individually read-restricted (de lectura restringida individualmente)][1]. Los usuarios Admin y Estándar tienen permisos de escritura sobre los activos. Los usuarios Admin tienen permisos adicionales de lectura y escritura para los activos sensibles relacionados con la gestión de usuarios, la gestión de la organización, facturación y el uso. 

### Roles personalizados

Crea un rol personalizado para combinar permisos en nuevos roles. Un rol personalizado te permite definir una persona, por ejemplo, un administrador de facturación, y luego asignar los permisos apropiados para ese rol. Después de crear un rol, asigna permisos a este rol o elimínalos directamente [updating the role in Datadog (actualizando el rol en Datadog)][2], o a través de la [Datadog Permission API (API de permiso de Datadog)][3].

**Nota**: Cuando añadas un nuevo rol personalizado a un usuario, asegúrate de eliminar el rol Datadog predefinido a ese usuario para imponer los permisos del nuevo rol.

## Lista de permisos

La siguiente tabla enumera el nombre, la descripción y el rol predeterminado de todos los permisos disponibles en Datadog. Cada tipo de activo tiene sus correspondientes permisos de lectura y escritura. 

Cada rol predefinido hereda todos los permisos de los roles menos potentes. Por lo tanto, el rol Datadog Estándar tiene todos los permisos listados en la tabla con Datadog Solo lectura como rol por defecto. Además, el rol Admin Datadog contiene todos los permisos de los roles Datadog Estándar y Datadog Solo lectura.

{{% permissions %}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration es una marca registrada de Datadog, Inc.

[1]: /es/account_management/rbac/granular_access
[2]: /es/account_management/users/#edit-a-user-s-roles
[3]: /es/api/latest/roles/#list-permissions