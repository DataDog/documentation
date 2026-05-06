---
algolia:
  category: Documentation
  rank: 80
  subcategory: Datadog Role Permissions
aliases:
- /es/account_management/faq/managing-global-role-permissions
description: Referencia completa de los permisos de Datadog, incluyendo roles gestionados,
  roles personalizados, permisos sensibles y la lista de permisos.
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: Documentación
  text: Aprenda cómo crear, actualizar y eliminar un Rol
- link: /api/v2/roles/#list-permissions
  tag: Documentación
  text: Administre sus permisos con la API de Permisos
title: Permisos de Rol de Datadog
---
## Permisos {#permissions}

Los permisos definen el tipo de acceso que un usuario tiene a un recurso determinado. Típicamente, los permisos otorgan a un usuario el derecho a leer, editar o eliminar un objeto. Los permisos subyacen a los derechos de acceso de todos los roles, incluyendo los tres roles gestionados y los roles personalizados.

### Permisos sensibles {#sensitive-permissions}

Algunos permisos de Datadog proporcionan acceso a funcionalidades más privilegiadas que es importante conocer, tales como:

- Acceso para cambiar la configuración de la organización
- Acceso para leer datos potencialmente sensibles
- Acceso para realizar operaciones privilegiadas

Los permisos sensibles están marcados en las interfaces de Roles y Permisos para identificar que pueden necesitar un mayor escrutinio. Como mejor práctica, los administradores que configuran roles deben prestar especial atención a estos permisos y confirmar cuáles de estos permisos están asignados a sus roles y usuarios.

### Permisos en modo de vista previa {#preview-mode-permissions}

Algunos permisos aparecen en "modo de vista previa" antes de ser completamente aplicados. Durante este período:

- Los permisos de vista previa se marcan en la aplicación con una insignia de "Vista previa"
- No restringen el acceso hasta que finaliza el período de vista previa
- La vista previa generalmente dura de 2 a 4 semanas antes de que comience la aplicación
- Los administradores deben configurar los roles adecuadamente durante este período

El modo de vista previa le da a los administradores de su organización la capacidad de optar por ciertos nuevos permisos, para que puedan evitar perder acceso a recursos que anteriormente no estaban restringidos. Las notas de la versión asociadas con cada permiso de modo de vista previa indican cuándo se crea el permiso y cuándo se aplicará. Si bien estos permisos no restringen el acceso durante la vista previa, Datadog recomienda actualizar las configuraciones de roles antes de que se apliquen para evitar interrupciones.

## Roles {#roles}

### Roles gestionados {#managed-roles}

Por defecto, los usuarios existentes están asociados con uno de los tres roles gestionados:

- Rol de Administrador de Datadog
- Rol Estándar de Datadog
- Rol de Datadog Read Only

Todos los usuarios con uno de estos roles pueden leer datos, excepto por los recursos [individualmente restringidos para lectura][1]. Los usuarios de Datadog Admin y de Datadog Standard tienen permisos de escritura sobre los activos. Los usuarios de Datadog Admin tienen permisos adicionales de lectura y escritura para activos sensibles relacionados con la gestión de usuarios, la gestión de organizaciones, la facturación y el uso.

Los roles gestionados son creados y mantenidos por Datadog. Sus permisos pueden ser actualizados automáticamente por Datadog a medida que se agregan nuevas funciones o cambian los permisos. Los usuarios no pueden modificar roles administrados directamente, pero pueden clonarlos para crear [roles personalizados](#custom-roles) con permisos específicos. Si es necesario, los usuarios pueden eliminar roles administrados de su cuenta.

### Roles personalizados {#custom-roles}

Crea un rol personalizado para combinar permisos en nuevos roles. Un rol personalizado te da la capacidad de definir una persona, por ejemplo, un administrador de facturación, y luego asignar los permisos apropiados para ese rol. Después de crear un rol, asigna o elimina permisos a este rol directamente [actualizando el rol en Datadog][2], o a través de la [API de Permisos de Datadog][3]. También puedes agregar un permiso a múltiples roles personalizados a la vez seleccionando esos roles desde la página de Roles y presionando {{< ui >}}Add Permission{{< /ui >}}.

A diferencia de los roles gestionados, los roles personalizados no reciben nuevos permisos cuando Datadog lanza nuevos productos y características, a menos que estén configurados para recibir Actualizaciones Automáticas. Si las Actualizaciones Automáticas están desactivadas, los roles personalizados solo reciben nuevos permisos para mantener la compatibilidad cuando Datadog lanza un nuevo permiso que limita la funcionalidad existente.

Para configurar Actualizaciones Automáticas para roles personalizados:

1. Ve a la página de Configuración de la Organización y haz clic en la {{< ui >}}Roles{{< /ui >}} pestaña.
2. Haz clic en el rol que deseas actualizar y haz clic en {{< ui >}}Edit Role{{< /ui >}}.
3. Bajo {{< ui >}}Automatically Receives Permissions{{< /ui >}}, elige una opción del menú desplegable: Ninguno, Rol de Datadog Read Only, Rol Estándar de Datadog o Rol de Administrador de Datadog.

Si el rol personalizado está configurado para recibir actualizaciones automáticas, tu rol personalizado recibe cualquier nuevo permiso cada vez que se lanzan a la plantilla de rol seleccionada. No se añaden permisos ya lanzados. Puedes agregar o eliminar cualquier permiso de este rol y continuar recibiendo actualizaciones automáticas.

**Nota**: Al agregar un nuevo rol personalizado a un usuario, asegúrate de eliminar el rol gestionado de Datadog asociado con ese usuario para hacer cumplir estrictamente los nuevos permisos del rol.

## Lista de permisos {#permissions-list}

La siguiente tabla enumera el nombre, la descripción y el rol predeterminado para todos los permisos disponibles en Datadog. Cada tipo de activo tiene permisos de lectura y escritura correspondientes.

Cada rol gestionado hereda todos los permisos de los roles menos poderosos. Por lo tanto, el Rol Estándar de Datadog tiene todos los permisos listados en la tabla con Datadog Read Only como rol predeterminado. Además, el Rol de Datadog Admin contiene todos los permisos tanto del Rol de Datadog Standard como del Rol de Datadog Read Only.

{{% permissions %}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration es una marca registrada de Datadog, Inc.

[1]: /es/account_management/rbac/granular_access
[2]: /es/account_management/users/#edit-a-user-s-roles
[3]: /es/api/latest/roles/#list-permissions