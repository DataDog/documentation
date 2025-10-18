---
algolia:
  category: Documentación
  rank: 80
  subcategory: Permisos de Rol en Datadog
aliases:
- /es/account_management/faq/managing-global-role-permissions
description: Referencia completa de los permisos de Datadog, incluidas los roles gestionados,
  los roles personalizados, los permisos confidenciales y la lista de permisos.
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

## Permisos

Los permisos definen el tipo de acceso que tiene un usuario a un recurso determinado. Por lo general, los permisos otorgan a un usuario el derecho a leer, editar o eliminar un objeto. Los permisos son la base de los derechos de acceso de todos los roles, incluidos los tres roles gestionados y los roles personalizados.

### Permisos sensibles

Algunos permisos de Datadog proporcionan acceso a funcionalidades más privilegiadas, que es importante conocer, como por ejemplo:

- Acceso para cambiar parámetros de la organización
- Acceso para leer datos potencialmente confidenciales
- Acceso para realizar operaciones privilegiadas

Los permisos sensibles se marcan en las interfaces de Roles y Permisos para identificar que pueden necesitar un mayor análisis. Como práctica recomendada, los administradores que configuran las funciones deben prestar especial atención a estos permisos y confirmar cuáles de ellos están asignados a sus funciones y usuarios.

### Permisos del modo de vista previa

Algunos permisos aparecen en "modo de vista previa" antes de aplicarse plenamente. Durante este periodo:

- Los permisos de vista previa se marcan en la aplicación con un distintivo de "Vista previa".
- No restringen el acceso hasta que finaliza el periodo de vista previa
- La vista previa suele durar de 2 a 4 semanas antes de que comience la ejecución.
- Los administradores deben configurar roles apropiados durante este período

El modo de vista previa ofrece a los administradores de tu organización la posibilidad de optar por determinados permisos nuevos, de modo que puedan evitar perder el acceso a recursos que antes no tenían restricciones. Las notas de la versión asociadas a cada permiso del modo de vista previa indican cuándo se crea el permiso y cuándo se aplicará. Aunque estos permisos no restringen el acceso durante la vista previa, Datadog recomienda actualizar las configuraciones de roles antes de que entren en vigor para evitar interrupciones.

## Roles

### Roles gestionados

Por defecto, los usuarios existentes están asociados a uno de los tres roles gestionados:

- Rol de administrador de Datadog
- Rol estándar de Datadog
- Rol de sólo lectura de Datadog

Todos los usuarios con uno de estos roles pueden leer datos, excepto los recursos [con restricción de lectura individual][1]. Los usuarios Admin y Standard tienen permisos de escritura sobre los recursos. Los usuarios Admin tienen permisos adicionales de lectura y escritura para activos confidenciales relacionados con la gestión de usuarios, la gestión de la organización, la facturación y el uso.

Los roles gestionados son creados y mantenidos por Datadog. Sus permisos pueden ser actualizados automáticamente por Datadog a medida que se añaden nuevas funciones o cambian los permisos. Los usuarios no pueden modificar los roles gestionados directamente, pero pueden clonarlos para crear [roles personalizados](#custom-roles) con permisos específicos. Si es necesario, los usuarios pueden eliminar roles gestionados de sus cuentas.

### Roles personalizados

Crea un rol personalizado para combinar permisos en nuevos roles. Un rol personalizado te permite definir una persona, por ejemplo, un administrador de facturación, y luego asignar los permisos apropiados para ese rol. Después de crear un rol, asigna permisos a este rol o elimínalos directamente [updating the role in Datadog (actualizando el rol en Datadog)][2], o a través de la [Datadog Permission API (API de permiso de Datadog)][3].

A diferencia de los roles gestionados, los roles personalizados no reciben nuevos permisos cuando Datadog lanza nuevos productos y funciones. Los roles personalizados solo reciben nuevos permisos para mantener la compatibilidad cuando Datadog lanza un nuevo permiso que bloquea una funcionalidad existente.

**Nota**: Al añadir un nuevo rol personalizado a un usuario, asegúrate de eliminar el rol de Datadog gestionado, asociado a ese usuario, para aplicar los permisos del nuevo rol.

## Lista de permisos

La siguiente tabla muestra el nombre, la descripción y el rol predeterminado de todos los permisos disponibles en Datadog. Cada tipo de recurso tiene sus correspondientes permisos de lectura y escritura.

Cada rol gestionado hereda todos los permisos de los roles menos potentes. Por lo tanto, el rol Estándar de Datadog tiene todos los permisos que se indican en la tabla con Datadog Sólo Lectura como rol por defecto. Además, el rol Administrador de Datadog contiene todos los permisos del rol Estándar de Datadog y del rol de Sólo lectura de Datadog.

{{% permissions %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration es una marca registrada de Datadog, Inc.

[1]: /es/account_management/rbac/granular_access
[2]: /es/account_management/users/#edit-a-user-s-roles
[3]: /es/api/latest/roles/#list-permissions