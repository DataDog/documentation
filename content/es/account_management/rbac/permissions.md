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
  text: Aprende cómo crear, actualizar y eliminar un rol
- link: /api/v2/roles/#list-permissions
  tag: Documentación
  text: Gestiona tus permisos con la API de Permisos
title: Permisos de roles de Datadog
---
## Permisos {#permissions}

Los permisos definen el tipo de acceso que un usuario tiene a un recurso determinado. Típicamente, los permisos otorgan a un usuario el derecho a leer, editar o eliminar un objeto. Los permisos son la base de los derechos de acceso de todos los roles, incluyendo los tres roles gestionados y los roles personalizados.

### Permisos sensibles {#sensitive-permissions}

Algunos permisos de Datadog proporcionan acceso a funcionalidades más privilegiadas que es importante conocer, tales como:

- Acceso para cambiar la configuración de la organización
- Acceso para leer datos potencialmente sensibles
- Acceso para realizar operaciones privilegiadas

Los permisos sensibles están marcados en las interfaces de Roles y Permisos para identificar que pueden necesitar un mayor escrutinio. Como mejor práctica, los administradores que configuran roles deben prestar especial atención a estos permisos y confirmar cuáles de estos permisos están asignados a sus roles y usuarios.

### Permisos de modo de vista previa {#preview-mode-permissions}

Algunos permisos aparecen en "modo de vista previa" antes de ser completamente aplicados. Durante este período:

- Los permisos de vista previa están marcados en la aplicación con una insignia de "Vista previa"
- No restringen el acceso hasta que finalice el período de vista previa
- La vista previa generalmente dura de 2 a 4 semanas antes de que comience la aplicación
- Los administradores deben configurar los roles adecuadamente durante este período

El modo de vista previa otorga a los administradores de su organización la capacidad de optar por ciertos nuevos permisos, para que puedan evitar perder el acceso a recursos que anteriormente no estaban restringidos. Las notas de la versión asociadas con cada permiso de modo de vista previa indican cuándo se crea el permiso y cuándo se aplicará. Si bien estos permisos no restringen el acceso durante la vista previa, Datadog recomienda actualizar las configuraciones de roles antes de que se apliquen para evitar interrupciones.

## Roles {#roles}

### Roles gestionados {#managed-roles}

Por defecto, los usuarios existentes están asociados con uno de los tres roles gestionados:

- Datadog Admin Role
- Datadog Standard Role
- Datadog Read Only Role

Todos los usuarios con uno de estos roles pueden leer datos, excepto por los recursos [individualmente restringidos para lectura][1]. Los usuarios de Datadog Admin y Datadog Standard tienen permisos de escritura sobre los activos. Los usuarios de Datadog Admin tienen permisos adicionales de lectura y escritura para activos sensibles relacionados con la gestión de usuarios, la gestión de organizaciones, la facturación y el uso.

Los roles gestionados son creados y mantenidos por Datadog. Sus permisos pueden ser actualizados automáticamente por Datadog a medida que se agregan nuevas funciones o cambian los permisos. Los usuarios no pueden modificar los roles gestionados directamente, pero pueden clonarlos para crear [roles personalizados](#custom-roles) con permisos específicos. Si es necesario, los usuarios pueden eliminar roles gestionados de su cuenta.

### Roles personalizados {#custom-roles}

Crea un rol personalizado para combinar permisos en nuevos roles. Un rol personalizado te da la capacidad de definir una persona, por ejemplo, un administrador de facturación, y luego asignar los permisos apropiados para ese rol. Después de crear un rol, asigna o elimina permisos a este rol directamente actualizando el rol en Datadog, o a través del Datadog Permission API. También puedes agregar un permiso a múltiples roles personalizados a la vez seleccionando esos roles desde la página de Roles y presionando {{< ui >}}Add Permission{{< /ui >}}.

A diferencia de los roles gestionados, los roles personalizados no reciben nuevos permisos cuando Datadog lanza nuevos productos y características, a menos que estén configurados para recibir Actualizaciones Automáticas. Si las Actualizaciones Automáticas están desactivadas, los roles personalizados solo reciben nuevos permisos para mantener la compatibilidad cuando Datadog lanza un nuevo permiso que limita la funcionalidad existente.

Para configurar Actualizaciones Automáticas para roles personalizados:

1. Ve a la página de Configuración de la Organización y haz clic en la pestaña {{< ui >}}Roles{{< /ui >}}.
2. Haz clic en el rol que deseas actualizar y haz clic en {{< ui >}}Edit Role{{< /ui >}}.
3. En {{< ui >}}Automatically Receives Permissions{{< /ui >}}, elige una opción del menú desplegable: Ninguno, Rol de Solo Lectura de Datadog, Rol Estándar de Datadog o Rol de Administrador de Datadog.

Si el rol personalizado está configurado para recibir actualizaciones automáticas, recibirá nuevos permisos cada vez que se publiquen en la plantilla de rol seleccionada. No se añaden permisos ya publicados. Puedes agregar o eliminar cualquier permiso de este rol y continuar recibiendo actualizaciones automáticas.

**Nota**: Al agregar un nuevo rol personalizado a un usuario, asegúrate de eliminar el rol administrado de Datadog asociado con ese usuario para hacer cumplir estrictamente los nuevos permisos del rol.

## Lista de permisos {#permissions-list}

La siguiente tabla enumera el nombre, la descripción y el rol predeterminado para todos los permisos disponibles en Datadog. Cada tipo de activo tiene permisos de lectura y escritura correspondientes.

Cada rol gestionado hereda todos los permisos de los roles menos poderosos. Por lo tanto, el Datadog Standard Role tiene todos los permisos listados en la tabla, con el Datadog Read Only Role como rol predeterminado. Además, el Datadog Admin Role contiene todos los permisos tanto del Datadog Standard Role como del Datadog Read Only Role.

{{% permissions %}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration es una marca registrada de Datadog, Inc.

[1]: /es/account_management/rbac/granular_access
[2]: /es/account_management/users/#edit-a-user-s-roles
[3]: /es/api/latest/roles/#list-permissions