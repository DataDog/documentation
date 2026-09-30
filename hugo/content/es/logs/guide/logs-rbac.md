---
aliases:
- /es/logs/guide/restrict-access-to-log-events-with-restriction-queries
further_reading:
- link: /logs/guide/logs-rbac-permissions/
  tag: Documentación
  text: Obtener más información sobre los permisos de RBAC para logs
- link: /api/latest/logs-restriction-queries/
  tag: API
  text: Restricción de consultas de logs
- link: /account_management/rbac/permissions/#log-management
  tag: Documentación
  text: Permisos de rol en Datadog
title: Cómo configurar el control de acceso basado en roles (RBAC) para logs
---

## Información general

En muchas organizaciones, los logs pueden contener información confidencial que requiere [depuración][1] o acceso restringido para garantizar el cumplimiento y la privacidad. El control de acceso basado en roles (RBAC) permite gestionar los permisos de acceso de los usuarios de forma eficaz, permitiendo que sólo el personal autorizado acceda a logs y funciones específicos. Esta guía detalla cómo configurar RBAC para logs en Datadog, centrándose en la creación de roles personalizados y la asignación de los permisos adecuados.

Esta guía cubre los siguientes temas:

1. [**Requisitos previos para administradores**](#prerequisites): Detalla los requisitos previos necesarios.
2. [Configuración de roles para el equipo ACME**](#setting-up-roles): Instrucciones para crear roles y asignar miembros al equipo.
3. [**Limitación del acceso a logs**](#restrict-access-to-logs): Cómo emplear consultas de restricción para controlar el acceso a logs.
4. [Configuración de permisos en recursos de logs**](#restrict-access-to-log-assets): Pautas para configurar permisos en pipelines, índices y archivos.


## Gestión de varios equipos

Consideremos una organización con varios equipos, como el equipo ACME, que gestiona logs de ACME de resolución de problemas y auditoría. Dentro del equipo ACME, hay dos categorías principales de usuarios:

- **Administrador ACME:** Estos usuarios gestionan la recopilación, los pipelines y los filtros de exclusión de logs de ACME.
- **Usuario ACME:** Estos usuarios acceden a logs de ACME y crean monitores o dashboards basados en estos logs.

Puedes personalizar esta configuración para adaptarla a tus necesidades organizativas, ya sea consolidando los permisos en un único rol o creando varios roles para un control de acceso más detallado. Los principios aquí expuestos pueden adaptarse a otros equipos de tu organización. 

En Datadog, los permisos son aditivos. Los usuarios que pertenecen a varios equipos se benefician de permisos combinados en todos los roles asignados.

## Rol de administrador Datadog

Como administrador de Datadog, puedes configurar un entorno seguro para que los miembros del equipo ACME gestionen sus logs sin afectar a logs de otros equipos. En esta guía se explican los pasos para configurar los roles y los permisos para restringir el acceso a los logs específicamente a los usuarios ACME. También puedes adaptar la configuración para que los administradores ACME actúen como administradores Datadog si es necesario.

## Requisitos previos

### Etiquetado de logs entrantes

En primer lugar, etiqueta los logs de ACME entrantes con una etiqueta (tag) `team:acme`, lo que ayuda a categorizar los logs a medida que pasan por Datadog. Por ejemplo, al recopilar logs de Docker, se aplica la etiqueta (tag) `team:acme` utilizando [etiquetas (labels) de Docker como etiquetas (tags)][2]. 

Para obtener información general sobre el etiquetado, consulta [Empezando con etiquetas (tags)][3].

{{< img src="logs/guide/rbac/team_tag.png" alt="Aplicar una etiqueta (tag) de equipo a tus logs" style="width:80%;">}}

### Inicio de sesión como administrador Datadog 

Para realizar las acciones de esta guía, debes tener permisos de administrador Datadog. Asegúrate de que tu cuenta de usuario puede crear roles, asignar usuarios y gestionar pipelines, índices y archivos de logs. Para obtener más información sobre permisos, consulta [Permisos de rol en Datadog][4].

Ve a la [lista de usuarios][8] para verificar que tienes todos estos permisos. Si no los tienes, solicítalos a un administrador Datadog.

### Obtener una clave de API y una clave de aplicación

Si tienes previsto utilizar la API Datadog, necesitas una clave de API y una clave de aplicación de un usuario administrador. Puedes generar claves de API y de aplicación en tus [parámetros de organización][9]. Asegúrate de que la clave de aplicación está asociada a un usuario que dispone de los permisos necesarios. Para obtener más información, consulta [Claves de API y de aplicación][10].

En esta guía, sustituye `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` por tu clave de API y de aplicación Datadog, respectivamente. También se necesita un terminal con `CURL`.

### Obtener identificadores de permiso

**Nota**: Esta sección sólo es necesaria si tienes intención de utilizar la API Datadog para la configuración del RBAC.

Si tienes previsto utilizar la API Datadog, utiliza la [API de permisos][11] para obtener todos los permisos existentes. Necesitarás el ID del permiso para realizar acciones como conceder específicos a roles. **Nota**: Los ID de permisos cambian en función del sitio Datadog seleccionado ({{< region-param key="dd_site_name" >}}).

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

## Configuración de roles

Esta sección te guiará a través de la creación de dos roles, `ACME Admin` y `ACME User`, la concesión de permisos de log básicos y la asignación de usuarios a estos roles.


### Creación de un rol

{{< tabs >}}
{{% tab "UI" %}}

1. Ve a la sección [Roles][1] en Parámetros de organización de Datadog.
1. Haz clic en **New Role** (Nuevo rol) para crear los roles `ACME Admin` y `ACME User`.
1. Asigne acceso estándar y permisos básicos, como Logs Read Index Data y Logs Live Tail.

{{< img src="logs/guide/rbac/add_role.png" alt="Añadir un nuevo rol" style="width:90%;">}}

Para obtener más información sobre la creación de roles, consulta [Control de acceso][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /es/account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

1. Crea los roles `ACME Admin` y `ACME User` utilizando la [API de creación de roles][1]. En el siguiente ejemplo, `dcf7c550-99cb-11ea-93e6-376cebac897c` es el ID del rol.
    ```bash
    curl -X POST "https://app.datadoghq.com/api/v2/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","attributes": {"name": "ACME Admin"}}}'
    ```
    ``` json
    [...]
    "type": "roles",
    "id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
    "attributes": { "name": "ACME Admin", [...] }
    [...]
    ```
1. Asigna los permisos necesarios utilizando la [API de concesión de permisos][3]. 


[1]: /es/api/v2/roles/#create-role
[2]: /es/api/v2/roles/#list-roles
[3]: /es/api/v2/roles/#grant-permission-to-a-role
[4]: /es/api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}

### Asignación de roles a usuarios

{{< tabs >}}
{{% tab "UI" %}}

1. En la [sección de usuarios][1] de Datadog, selecciona un usuario y asígnale el rol `ACME Admin` o `ACME User`.

{{< img src="logs/guide/rbac/assign_user2.png" alt="Asignación de roles a usuarios en la pantalla de modificación de usuarios" style="width:90%;">}}

[1]: https://app.datadoghq.com/access/users
{{% /tab %}}
{{% tab "API" %}}

1. Recupera los ID de usuario utilizando la [API de listado de usuarios][1].
1. Asigna usuarios a roles con la [API de asignación de roles][2].

[1]: /es/api/v2/users/#list-all-users
[2]: /es/api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}

## Restringir el acceso a logs

Concede a los miembros del equipo ACME acceso exclusivo a los logs de `team:acme` utilizando el permiso [`logs_read_data`][12] con consultas de restricción.

Como práctica recomendada, evita ampliar los permisos de los usuarios ACME para acceder a logs adicionales. Asimismo, evita aplicar la misma consulta de restricción `team:acme` a otros roles. En su lugar, asigna usuarios a varios roles en función de sus necesidades de acceso individuales.

En esta sección se explica cómo:

1. Crear una restricción de consultas `team:acme`.
2. Adjuntar esta restricción de consultas a los roles ACME.

**Nota**: Cada rol sólo puede tener asociada una consulta de restricción. Adjuntar una nueva consulta de restricción a un rol sustituye cualquier consulta existente para ese rol.

### Definición de una consulta de restricción

{{< tabs >}}
{{% tab "UI" %}}

1. Ve a la página [Acceso a datos][1].
1. Crea una consulta de restricción `team:acme` y aplícala a los roles ACME.

{{< img src="logs/guide/rbac/restriction_queries.png" alt="Restringir el acceso a logs" style="width:90%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

1. Crea una consulta de restricción utilizando la [API de creación de consultas de restricción][1].
1. Realiza un seguimiento del ID de la consulta de restricción.
1. Adjunta la consulta de restricción a los roles ACME con la [API de consultas de restricción][2].
1. Habilita los permisos de `logs_read_data` en el rol utilizando la [API de concesión de permisos][3]. Consulta la sección [Obtención de ID de permisos](#obtaining-permission-ids) para obtener el ID correspondiente a este permiso.
1. (Opcional) Confirma la configuración:
    * Obtén la lista de los roles adjuntos a la consulta utilizando la [API de obtención de roles][4]. En los resultados, sólo deberías ver `ACME Admin` y `ACME User`.
    * A la inversa, puedes obtener la restricción de consultas adjunta a cualquiera de los roles utilizando la [API de obtención de restricciones de consultas][5]. En los resultados, deberías ver la restricción de consultas `team:acme`.

[1]: /es/api/v2/logs-restriction-queries/#create-a-restriction-query
[2]: /es/api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[3]: /es/api/v2/roles/#grant-permission-to-a-role
[4]: /es/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
[5]: /es/api/v2/logs-restriction-queries/#get-restriction-query-for-a-given-role
{{% /tab %}}
{{< /tabs >}}

## Restringir el acceso a recursos de logs

Concede al rol `ACME Admin` permisos para gestionar loguear pipelines, índices y archivos de logs sin afectar a otros equipos.

Esto garantiza que:
* Los miembros `ACME Admin` (y sólo los miembros `ACME Admin`) puedan interactuar con recursos de logs de ACME.
* Ni los miembros `ACME Admin`, ni los miembros `ACME User` puedan interferir con recursos de otros equipos.
* Ni los miembros `ACME Admin`, ni los miembros `ACME User` puedan interferir con configuraciones de "Administrador" de nivel superior, como qué logs se transfieren hacia sus recursos, las limitaciones presupuestarias o las [reglas de restricción de acceso a logs](#restrict-access-to-logs).

### Pipelines de logs

Crea un [pipeline][13] para logs `team:acme`. Concede el permiso [`logs_write_processors`][14] al rol `ACME Admin`.

### Índices de logs

Crea [índices][15] para logs `team:acme`, para un control detallado del presupuesto. Concede el permiso [`logs_write_exclusion_filters`][16] al rol `ACME Admin`.

### Archivos de logs

Crea uno o varios [archivos][17] para logs `team:acme`. Asigna el permiso [`logs_read_archives`][18] a los miembros de `ACME Admin`. Para la rehidratación, asigna el permiso [`logs_write_historical_view`][19] a `ACME Admin`.

Crea uno o varios [archivos][17] para logs `team:acme`. Asigna el permiso [Leer archivos][18] a los miembros de `ACME Admin`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /es/agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /es/getting_started/tagging/
[4]: /es/account_management/rbac/permissions/#log-management
[8]: https://app.datadoghq.com/organization-settings/users
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: /es/account_management/api-app-keys/
[11]: /es/api/v2/roles/#list-permissions
[12]: /es/account_management/rbac/permissions?tab=ui#logs_read_data
[13]: /es/logs/log_configuration/pipelines
[14]: /es/account_management/rbac/permissions?tab=ui#logs_write_processors
[15]: /es/logs/indexes/
[16]: /es/account_management/rbac/permissions?tab=ui#logs_write_exclusion_filters
[17]: /es/logs/archives/
[18]: /es/account_management/rbac/permissions?tab=ui#logs_read_archives
[19]: /es/account_management/rbac/permissions?tab=ui#logs_write_historical_view
[20]: /es/logs/archives#datadog-permissions
[21]: /es/account_management/rbac/permissions?tab=ui#logs_read_index_data