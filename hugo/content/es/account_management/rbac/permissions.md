---
algolia:
  category: Documentation
  rank: 80
  subcategory: Datadog Role Permissions
aliases:
- /es/account_management/faq/managing-global-role-permissions
description: Referencia completa de los permisos de Datadog, incluyendo roles administrados,
  roles personalizados, permisos sensibles y listar permisos.
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: Documentación
  text: Aprenda a crear, actualizar y eliminar un rol
- link: /api/v2/roles/#list-permissions
  tag: Documentación
  text: Administre sus permisos con la API de Permisos
title: Permisos de roles de Datadog
---
## Permisos {#permissions}

Los permisos definen el tipo de acceso que tiene un usuario a un recurso determinado. Por lo general, los permisos le dan a un usuario el derecho de leer, editar o eliminar un objeto. Los permisos son la base de los derechos de acceso de todos los roles, incluidos los tres roles administrados y los roles personalizados.

### Permisos sensibles {#sensitive-permissions}

Algunos permisos de Datadog brindan acceso a funcionalidades más privilegiadas que es importante conocer, tales como:

- Acceso para cambiar la configuración de la organización
- Acceso para leer datos potencialmente sensibles
- Acceso para realizar operaciones privilegiadas

Los permisos sensibles están marcados en las interfaces de Roles y Permisos para identificar que pueden requerir un mayor escrutinio. Como mejor práctica, los administradores que configuran roles deben prestar especial atención a estos permisos y confirmar cuáles de ellos están asignados a sus roles y usuarios.

### Permisos en modo de vista previa {#preview-mode-permissions}

Algunos permisos aparecen en "modo de vista previa" antes de ser aplicados completamente. Durante este periodo:

- Los permisos de vista previa están marcados en la aplicación con una insignia de "Vista previa"
- No restringen el acceso hasta que termina el periodo de vista previa
- La vista previa suele durar de 2 a 4 semanas antes de que comience la aplicación
- Los administradores deben configurar los roles adecuadamente durante este periodo

El modo de vista previa brinda a los administradores de su organización la capacidad de optar por ciertos permisos nuevos, para que puedan evitar perder el acceso a recursos que anteriormente no tenían restricciones. Las notas de la versión asociadas con cada permiso del modo de vista previa indican cuándo se crea el permiso y cuándo se aplicará. Aunque estos permisos no restringen el acceso durante la vista previa, Datadog recomienda actualizar las configuraciones de roles antes de que se apliquen para evitar interrupciones.

### Permisos restringidos {#restricted-permissions}

Los permisos restringidos admiten partes fundamentales de la experiencia de Datadog y se asignan automáticamente a cada rol de forma predeterminada. Eliminar estos permisos predeterminados puede afectar la forma en que los usuarios interactúan con Datadog. Por ejemplo, es posible que los usuarios no puedan visualizar o editar su perfil, o acceder a la funcionalidad estándar de la plataforma.

Los siguientes permisos se pueden eliminar directamente en la interfaz de usuario. Para excluirlos al usar las API [Create Role][4] y [Update a Role][5], establezca `default_permissions_opt_out: true` en el cuerpo de la solicitud:

| Permiso | Identificador |
|---|---|
| Lectura de dashboards | `dashboards_read` |
| Lectura de monitores | `monitors_read` |
| Lectura de APM | `apm_read` |
| Lectura de incidentes | `incident_read` |
| Lectura de aplicaciones RUM | `rum_apps_read` |
| Lectura de Notebooks | `notebooks_read` |
| SLOs Read | `slos_read` |
| Lectura de CI Visibility | `ci_visibility_read` |
| Lectura de CD Visibility | `cd_visibility_read` |
| Vulnerability Management Read | `appsec_vm_read` |

Ejemplo de solicitud para crear un rol sin permisos restringidos:

```sh
curl -X POST "https://api.datadoghq.com/api/v2/roles" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "attributes": {
      "name": "developers",
      "default_permissions_opt_out": true
    },
    "type": "roles"
  }
}'
```

Los siguientes permisos han estado asignados implícitamente a cada rol durante mucho tiempo, pero anteriormente no estaban expuestos para su configuración a través de la interfaz de usuario o la API. Ahora, puede habilitar [Minimal Access Roles (Preview)](#minimal-access-roles-preview) para que estos permisos se puedan eliminar y excluirlos de forma predeterminada cuando `default_permissions_opt_out: true` esté configurado:

| Permiso | Identificador |
|---|---|
| Funciones integradas | `built_in_features` |
| Lectura de métricas | `metrics_read` |
| Consulta de series temporales | `timeseries_query` |
| Lectura de eventos | `events_read` |
| Lectura de hosts | `hosts_read` |
| Lectura del perfil propio del usuario | `user_self_profile_read` |
| Escritura del perfil propio del usuario | `user_self_profile_write` |
| Lectura de la configuración de análisis estático | `static_analysis_settings_read` |
| Lectura de la biblioteca de Vulnerability Management de Application Security Management | `appsec_vm_library_read` |

## Roles {#roles}

### Roles administrados {#managed-roles}

De forma predeterminada, los usuarios existentes están asociados con uno de los tres roles administrados:

- Datadog Admin
- Datadog Standard Role
- Datadog Read Only Role

Todos los usuarios con uno de estos roles pueden leer datos, excepto los recursos [con lectura restringida individualmente][1]. Los usuarios Administradores y Estándar tienen permisos de escritura en los activos. Los usuarios Administradores tienen permisos adicionales de lectura y escritura para activos confidenciales relacionados con la gestión de usuarios, gestión de la organización, facturación y uso.

Los roles administrados son creados y mantenidos por Datadog. Sus permisos pueden ser actualizados automáticamente por Datadog a medida que se agregan nuevas funciones o cambian los permisos. Los usuarios no pueden modificar los roles administrados directamente, pero pueden clonarlos para crear [roles personalizados](#custom-roles) con permisos específicos. Si es necesario, los usuarios pueden eliminar roles administrados de su cuenta.

### Roles personalizados {#custom-roles}

Cree un rol personalizado para combinar permisos en nuevos roles. Un rol personalizado le brinda la capacidad de definir una persona, por ejemplo, un administrador de facturación, y luego asignar los permisos apropiados para ese rol. Después de crear un rol, asigne o elimine permisos a este rol directamente [actualizando el rol en Datadog][2], o a través de la [API de permisos de Datadog][3]. También puede agregar un permiso a varios roles personalizados a la vez seleccionando esos roles desde la página de Roles y presionando {{< ui >}}Add Permission{{< /ui >}}.

A diferencia de los Roles Administrados, los roles personalizados no reciben nuevos permisos cuando Datadog lanza nuevos productos y funciones, a menos que estén configurados para recibir Actualizaciones Automáticas. Si las Actualizaciones Automáticas están desactivadas, los roles personalizados solo reciben nuevos permisos para mantener la compatibilidad cuando Datadog lanza un nuevo permiso que restringe la funcionalidad existente.

Para configurar las Actualizaciones Automáticas para roles personalizados:

1. Vaya a la página de Configuración de la Organización y haga clic en la pestaña {{< ui >}}Roles{{< /ui >}}.
2. Haga clic en el rol que desea actualizar y haga clic en {{< ui >}}Edit Role{{< /ui >}}.
3. En {{< ui >}}Automatically Receives Permissions{{< /ui >}}, elija una opción del menú desplegable: Ninguna, Datadog Read Only Role, Datadog Standard Role o Datadog Admin Role.

Si el rol personalizado está configurado para recibir actualizaciones automáticas, su rol personalizado recibe cualquier permiso nuevo cada vez que se lanza para la plantilla de rol seleccionada. No se agregan permisos ya lanzados. Puede agregar o eliminar cualquier permiso de este rol y seguir recibiendo actualizaciones automáticas.

**Nota**: Al agregar un nuevo rol personalizado a un usuario, asegúrese de eliminar el rol de Datadog administrado asociado con ese usuario para aplicar estrictamente los nuevos permisos del rol.

### Roles de acceso mínimo (vista previa){#minimal-access-roles-preview}

<div class="alert alert-info">Los roles de acceso mínimo están en vista previa. Comuníquese con su representante de Datadog para solicitar acceso.</div>

Los roles de acceso mínimo le brindan a su organización un control más granular sobre lo que los usuarios pueden hacer en Datadog.

De forma predeterminada, cada rol incluye un conjunto fundamental de [permisos restringidos](#restricted-permissions) que no se pueden eliminar porque admiten la funcionalidad principal en todo Datadog. Habilitar los roles de acceso mínimo hace que estos permisos se puedan eliminar de los roles personalizados en toda su organización. Los usuarios con solo un rol de acceso mínimo pueden experimentar una funcionalidad limitada o errores inesperados en ciertas páginas de Datadog.

Una vez habilitados, los siguientes permisos se pueden eliminar, lo que le permite crear roles restringidos para flujos de trabajo especializados:

| Permiso | Identificador |
|---|---|
| Funciones integradas | `built_in_features` |
| Lectura de métricas | `metrics_read` |
| Consulta de series temporales | `timeseries_query` |
| Lectura de eventos | `events_read` |
| Lectura de hosts | `hosts_read` |
| Lectura del perfil propio del usuario | `user_self_profile_read` |
| Escritura del perfil propio del usuario | `user_self_profile_write` |
| Lectura de la configuración de análisis estático | `static_analysis_settings_read` |
| Lectura de la biblioteca de Vulnerability Management de Application Security Management | `appsec_vm_library_read` |

Si utiliza `default_permissions_opt_out` en [recursos de rol de Terraform][6] o llamadas directas a la API, actualice su automatización para tener en cuenta estos permisos adicionales antes de habilitar los roles de acceso mínimo.

## Listar permisos {#permissions-list}

La siguiente tabla lista el nombre, la descripción y el rol predeterminado para todos los permisos disponibles en Datadog. Cada tipo de activo tiene los permisos de lectura y escritura correspondientes.

Cada rol administrado hereda todos los permisos de los roles con menos privilegios. Por lo tanto, Datadog Standard Role tiene todos los permisos enumerados en la tabla con Datadog Read Only Role como el rol predeterminado. Además, el rol Datadog Admin contiene todos los permisos tanto del rol estándar de Datadog como del rol Datadog Read Only.

{{% permissions %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration es una marca comercial de Datadog, Inc.

[1]: /es/account_management/rbac/granular_access
[2]: /es/account_management/users/#edit-a-user-s-roles
[3]: /es/api/latest/roles/#list-permissions
[4]: /es/api/latest/roles/#create-role
[5]: /es/api/latest/roles/#update-a-role
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role