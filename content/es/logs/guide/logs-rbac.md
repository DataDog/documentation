---
aliases:
- /es/logs/guide/restrict-access-to-log-events-with-restriction-queries
further_reading:
- link: /logs/guide/logs-rbac-permissions/
  tag: Documentación
  text: Obtener más información sobre los permisos RBAC para logs
- link: /logs/explorer/
  tag: Documentación
  text: Obtener más información sobre el Explorador de logs
- link: /logs/explorer/#patterns
  tag: Documentación
  text: Para familiarizarte con la vista de patrones de logs
- link: /logs/live_tail/
  tag: Documentación
  text: Explorar Live Tail
title: Cómo configurar RBAC para logs
---

## Información general

Los logs puede contener **información sensible** que podría ser [limpiada][1] o a la que sólo podrían acceder los usuarios autorizados de tu organización. También es posible que quieras segmentar a tus usuarios para que **no interfieran unos con otros** en lo que respecta a la configuración y al control presupuestario.

Esta guía proporciona una metodología para desarrollar roles personalizados en Datadog que permitan a los usuarios acceder a los logs y a las características de los logs, de conformidad con las normas.

### Múltiples equipos

Supongamos que tu organización está formada por varios equipos. Uno de ellos es el equipo **ACME** (Applicative Component Making Errors), cuyos miembros se encargan de logs ACME para solucionar problemas y con fines de auditoría.

En esta guía también se supone que hay dos categorías de usuarios en el equipo ACME:

* **`ACME Admin`**: rol para los usuarios que están a cargo de la recopilación de logs, de los pipelines y de los filtros de exclusión de ACME.
* **`ACME User`** : rol para que los usuarios accedan a logs de ACME y creen monitores o dashboards a partir de estos logs.

**Nota**: Puedes adaptar esta guía para un único rol de ACME (concentrando los permisos de los administradores de ACME y los usuarios de ACME) con fines de simplificación, o para más roles, con fines de asignación de permisos más específicos.

Aunque esta guía se centra en el equipo ACME, tu configuración puede replicarse a cualquier otro equipo de tu organización. Los miembros del equipo ACME **también** pueden ser miembros de otros equipos de tu organización. Los permisos son aditivos en Datadog, y los usuarios de múltiples equipos pueden beneficiarse de la unión de los permisos heredados de cada equipo al que pertenezcan.

### Rol de administrador de Datadog

Esta guía explica cómo puedes configurar, como administrador de Datadog, una zona de acción segura para que los miembros del equipo ACME interactúen con sus logs (sin interferir con otros miembros del equipo de logs) y, al mismo tiempo, restringir el acceso a estos logs sólo a los usuarios de ACME.

**Nota**: Puedes adaptar esta guía para tener en cuenta que los administradores de ACME también son administradores de Datadog.

Esta guía explora los siguientes aspectos:

1. [Requisitos previos](#prerequisites) para administradores.
2. **Configurar roles** para el equipo ACME y **asignar miembros**: [Configurar roles](#set-up-roles).
3. **Limitar el acceso a logs** en toda una aplicación Datadog con consultas de restricción: [Restringir el acceso a logs](#restrict-access-to-logs).
4. Configurar permisos por **recursos de logs** (a saber, pipelines, índices y archivos): [Restringir el acceso a recursos de logs](#restrict-access-to-log-assets).

## Requisitos previos

### Etiquetar logs entrantes

Etiqueta los logs entrantes de ACME con una etiqueta `team:acme`. Esto es útil para clasificar tus logs a medida que circulan a través de Datadog.

{{< img src="logs/guide/rbac/team_tag.png" alt="Aplica una etiqueta de equipo a tus logs" style="width:60%;">}}

Por ejemplo, en el contexto de la recopilación de logs de Docker, adjunta la etiqueta `team:acme` a los logs que provienen de ese contenedor utilizando [etiquetas (labels) de Docker como etiquetas (tags)][2]. Para obtener información más general, consulta la [sección de etiquetado][3].

### Iniciar sesión como administrador de Datadog

Para ejecutar las acciones restantes de esta guía, tu cuenta de usuario requiere el rol de administrador de Datadog o uno similar. Necesitas los siguientes permisos:

* Permisos para crear roles y asignar usuarios a roles.
* Permisos para crear [pipelines de logs][4], [índices de logs][5] y [archivos de logs][6].
* Si quieres realizar esas operaciones a través de la API, son necesarios los permisos para interactuar a través de la [API de configuración de logs][7].

Verifica en tu [lista de usuarios][8] que tienes todos estos permisos. Si te falta alguno, pide a un usuario administrador de Datadog que los configure.


### Obtener una clave de API y una clave de aplicación

**Nota**: Esta sección sólo es necesaria si tienes intención de utilizar la API de Datadog, para lo cual necesitas una clave de API y una clave de aplicación de un usuario administrador.

Las claves de API y de aplicación están disponibles en la [página de la clave de API de tu cuenta Datadog][9]. Para obtener más información, consulta la sección [Claves de API y de aplicación][10] en la documentación.

Asegúrate de que la clave de aplicación que utilizas está asociada a tu propio usuario o a un usuario que tenga permisos similares.

{{< img src="logs/guide/rbac/app-api_keys.png" alt="Comprueba las claves de API y de aplicación" style="width:60%;">}}

A lo largo de esta guía, debes sustituir todas las apariciones de `<Datadog_API_KEY>` y `<Datadog_APP_KEY>` por tu clave de API de Datadog y tu clave de aplicación de Datadog, respectivamente. Esta guía también supone que tienes un terminal con `CURL`.


### Obtener los ID de permisos

**Nota**: Esta sección sólo es necesaria si tienes intención de utilizar la API Datadog para la configuración del control de acceso basado en roles (RBAC).

Utiliza la [API de permisos][11] para obtener la lista de todos los permisos existentes. La respuesta es una matriz de permisos como la siguiente (el permiso `logs_read_data` tiene el `<PERMISSION_ID>` `1af86ce4-7823-11ea-93dc-d7cad1b1c6cb`, que es todo lo que necesitas saber sobre ese permiso).

```bash
curl -X GET "https://app.datadoghq.com/api/v2/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

```json
[...]
{
    "type": "permissions",
    "id": "1af86ce4-7823-11ea-93dc-d7cad1b1c6cb",
    "attributes": {
        "name": "logs_read_data",
        "display_name": "Logs Read Data",
        [...]
    }
}
[...]
```

**Nota**: Los ID de permisos cambian dependiendo del sitio Datadog (Datadog US, Datadog EU, etc.) que estés utilizando.

## Configurar roles
Esta sección explica cómo crear dos roles, `ACME Admin` y `ACME User`, cómo otorgar a ambos roles permisos mínimos de logs (ampliados más adelante en esta guía) y cómo asignar a los usuarios cualquiera de los dos roles.

### Crear un rol

{{< tabs >}}
{{% tab "UI" (IU) %}}

En la [sección de grupos][1] de los parámetros de la organización Datadog, utiliza el botón Add Role (Añadir rol), en la pestaña Role (Rol), para crear los nuevos roles `ACME Admin` y `ACME User`.

{{< img src="logs/guide/rbac/add_role.png" alt="Añade un nuevo rol" style="width:60%;">}}

Al crear un nuevo rol:

* Crear con acceso estándar.
* Concede permisos de lectura de datos de índice y de Live Tail. Estos son [permisos heredados][2] que puedes habilitar de forma segura.

Para obtener más información sobre la creación de roles, consulta la sección [Gestión de cuentas][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions?tab=ui#legacy-permissions
[3]: /es/account_management/rbac/?tab=datadogapplication#create-a-custom-role
{{% /tab %}}
{{% tab "API" %}}

Repite los pasos siguientes para los roles `ACME Admin` y `ACME User`:

1. Si el rol aún no existe, créalo con la [API de creación de roles][1]. En el siguiente ejemplo, `dcf7c550-99cb-11ea-93e6-376cebac897c` es el ID del rol.

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

2. **Alternativamente**, si el rol ya existe, utiliza la [API de lista de roles][2] para obtener su ID de rol.

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles?page[size]=10&page[number]=0&sort=name&filter=ACME" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"'
```

``` json
[...]
"type": "roles",
"id": "dcf7c550-99cb-11ea-93e6-376cebac897c",
"attributes": { "name": "ACME Admin", [...] }
[...]
```

3. Comprueba los permisos existentes para el rol (sólo debe tener los permisos Read Monitors [Leer Monitores] y Read Dashboards [Leer dashboards] para los roles recién creados).

``` bash
curl -X GET "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"

```

3. Asigna los permisos `standard`, `logs_read_index_data` y `logs_live_tail` al rol utilizando la [API de concesión de permisos][3]. Para obtener los ID correspondientes, consulta la sección [Obtener los ID de permisos](#get-permission-ids).

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

4. **Si es necesario**, revoca todos los demás permisos de logs con la [API de revocación de permisos][4].

``` bash
curl -X DELETE "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

[1]: /es/api/v2/roles/#create-role
[2]: /es/api/v2/roles/#list-roles
[3]: /es/api/v2/roles/#grant-permission-to-a-role
[4]: /es/api/v2/roles/#revoke-permission
{{% /tab %}}
{{< /tabs >}}

### Asociar un usuario a un rol

Ahora que tus roles están configurados con sus respectivos permisos, asigna estos roles a tus usuarios.

{{< tabs >}}
{{% tab "UI" (IU) %}}

En la [sección de equipos][1] de Datadog, ve a la pestaña User (Usuario). Elige un usuario y asígnale el rol `ACME Admin` o el rol `ACME User`, además de los roles que ya tenga asignados. Para obtener más detalles sobre la gestión de usuarios, consulta la sección [Gestión de cuentas][2].

{{< img src="logs/guide/rbac/assign_user.png" alt="Delete invite on the grid view" style="width:60%;">}}
{{< img src="logs/guide/rbac/assign_user2.png" alt="Delete invite on the grid view" style="width:60%;">}}

[1]: https://app.datadoghq.com/access/users
[2]: /es/account_management/users/
{{% /tab %}}
{{% tab "API" %}}

Utilizando la [API de usuarios de lista][1], obtén el ID del usuario que quieres asignar al rol `ACME Admin` o al rol `ACME User`. Como esta API está paginada, es posible que tengas que filtrar los resultados utilizando, por ejemplo, el apellido del usuario como parámetro de consulta. En el siguiente ejemplo, el ID de usuario es `1581e993-eba0-11e9-a77a-7b9b056a262c`.

``` bash
curl -X GET "https://api.datadoghq.com/api/v2/users?page[size]=10&page[number]=0&sort=name&filter=smith" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

``` json
[...]
"type": "users",
"id": "1581e993-eba0-11e9-a77a-7b9b056a262c",
"attributes": {
    "name": "John Smith",
    "handle": "john.smith@company.com",
    [...]
},
[...]
```

**Asociar usuarios a roles de ACME**

Para añadir cada usuario a un rol, utiliza la [API de asignación de roles][2].

``` bash
curl -X POST "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

**Eliminar usuarios de los roles predeterminados**

Comprueba si el usuario ya tiene roles y los ID correspondientes. Es posible que quieras eliminar los roles predeterminados de Datadog de estos usuarios, ya que podrían conceder permisos adicionales al usuario que no quieres que concedan

``` bash
curl -X DELETE "https://api.datadoghq.com/api/v2/roles/<ROLE_ID>/users" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"users","id":"<USER_ID>"}}'
```

[1]: /es/api/v2/users/#list-all-users
[2]: /es/api/v2/roles/#add-a-user-to-a-role
{{% /tab %}}
{{< /tabs >}}

## Restringir el acceso a logs

En esta sección se explica cómo conceder a los miembros del equipo ACME (tanto a los miembros de `ACME Admin` como a los de `ACME User`) acceso sólo a logs de `team:acme`. Utiliza el permiso [lectura de datos de logs][12], acotado mediante consultas de restricción.

Como buena práctica para obtener la máxima especificidad y facilitar el mantenimiento, **no** debes ampliar los permisos de los usuarios ACME para acceder a más logs. No restrinjas otros roles a la misma consulta de restricción `team:acme`. En su lugar, considera la posibilidad de asignar usuarios a varios roles, en función de aquello a lo que cada uno de ellos necesite acceder individualmente.

En esta sección se explica cómo:

1. Crear una consulta de restricción `team:acme`.
2. Adjuntar esa consulta de restricción a los roles de ACME.

**Nota: Los roles no pueden tener **más de una** consulta de restricción adjunta. Si adjuntas una consulta de restricción a un rol, se eliminan todas las consultas de restricción ya adjuntas a este rol.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Utiliza la [página de acceso a datos][1] de la aplicación Datadog para:

* Crear una consulta de restricción `team:acme`.
* Asignar los roles `ACME Admin` y `ACME User` a esa consulta de restricción.

{{< img src="logs/guide/rbac/restriction_queries.png" alt="Restringe el acceso a logs" style="width:60%;">}}

Para obtener más información, consulta la [sección de permisos `logs_read_data`][1].

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

Utiliza la [API de creación de consultas de restricción][1] para crear una nueva consulta de restricción. Anota el ID de la consulta de restricción (`76b2c0e6-98fa-11ea-93e6-775bd9258d59`, en el siguiente ejemplo).

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "logs_restriction_queries","attributes": {"restriction_query": "team:acme"}}}'
```

``` json
{
    "data": {
        "type": "logs_restriction_queries",
        "id": "76b2c0e6-98fa-11ea-93e6-775bd9258d59",
        "attributes": {
            "restriction_query": "team:acme",
            "created_at": "2020-05-18T11:26:48.887750+00:00",
            "modified_at": "2020-05-18T11:26:48.887750+00:00"
        }
    }
}

```

A continuación, adjunta la consulta de restricción anterior a los roles ACME con la [API de consulta de restricción][2]. Repite esta operación con los ID de los roles `ACME Admin` y `ACME User`.

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/logs/config/restriction_queries/<RESTRICTION_QUERY_ID>/roles" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type": "roles","id": "<ROLE_ID>"}}'
```

Por último, habilita los permisos de `logs_read_data` en el rol mediante la [API de concesión de permisos][3]. Para obtener el ID correspondiente a este permiso, consulta la sección [Obtener ID de permisos](#get-permission-ids).

``` bash
curl -X POST "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" -d '{"data": {"type":"permissions","id": "<PERMISSION_ID>"}}'

```

También puedes confirmar que la configuración se ha realizado correctamente:

* Obtén la lista de los roles adjuntos a la consulta con la [API de obtención de roles][4]. Sólo deberías ver `ACME Admin` y `ACME User` en los resultados.
* A la inversa, puedes obtener la consulta de restricción adjunta a cualquiera de los roles con la [API de obtención de consultas de restricción][5]. Deberías ver la consulta de restricción `team:acme`.


[1]: /es/api/v2/logs-restriction-queries/#create-a-restriction-query
[2]: /es/api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[3]: /es/api/v2/roles/#grant-permission-to-a-role
[4]: /es/api/v2/logs-restriction-queries/#list-roles-for-a-restriction-query
[5]: /es/api/v2/logs-restriction-queries/#get-restriction-query-for-a-given-role
{{% /tab %}}
{{< /tabs >}}


## Restringir el acceso a recursos de logs

En esta sección se detalla cómo conceder a los miembros del rol `ACME Admin` permiso para interactuar con recursos de logs de ACME (a saber, pipelines de logs, índices de logs y archivos de logs).

Esto garantiza que:

* Los miembros `ACME Admin` (y sólo los miembros de `ACME Admin`) puedan interactuar con recursos de logs de ACME.
* Ni los miembros `ACME Admin`, ni los miembros `ACME User` puedan interferir con recursos de otros equipos.
* Ni los miembros `ACME Admin`, ni los miembros `ACME User` puedan interferir con configuraciones de "Administrador" de nivel superior, como qué logs se transfieren hacia sus recursos, las limitaciones presupuestarias o las [reglas de restricción de acceso a logs](#restrict-access-to-logs).


Como buena práctica para obtener la máxima especificidad y facilitar el mantenimiento, no deberías conceder a otros roles el permiso para editar recursos de logs de ACME. En su lugar, considera la posibilidad de añadir (algunos) usuarios de esos otros roles al rol `ACME Admin`.

### Pipelines de logs

Crea un [pipeline][13] para `team:acme` logs. Asigna el permiso [Procesador de escritura][14] a los miembros `ACME Admin`, pero **acota** ese permiso a este pipeline "raíz" de ACME.

{{< img src="logs/guide/rbac/pipelines.png" alt="Pipeline ACME" style="width:60%;">}}

### Índices de logs

Crea uno o varios [índices][15] para logs `team:acme`. Los índices múltiples pueden ser valiosos si el equipo ACME necesita un control presupuestario detallado (por ejemplo, índices con diferentes retenciones o índices con diferentes cuotas). Asigna el permiso [Filtros de exclusión de escritura][16] a los miembros `ACME Admin`, pero **acota** ese permiso a estos índices ACME.

{{< img src="logs/guide/rbac/indexes.png" alt="Índices ACME" style="width:60%;">}}

### Archivos de logs

#### Leer los archivos

Crea uno o varios [archivos][17] para logs `team:acme`. Asigna el permiso [Leer archivos][18] a los miembros `ACME Admin`, pero **específicamente** para ese(esos) archivo(s) de ACME.

{{< img src="logs/guide/rbac/archives.png" alt="Archivos ACME" style="width:60%;">}}

Los archivos múltiples pueden ser útiles si tienes diferentes políticas de ciclo de vida dependiendo de los logs (por ejemplo, para logs de producción y de staging). Ten en cuenta que la recuperación está pensada para funcionar en un solo archivo a la vez, aunque puede activar varias recuperaciones en varios archivos a la vez.

#### Escribir vistas históricas

Asigna el permiso [Escribir vista histórica][19] a los miembros `ACME Admin`. Este permiso otorga la capacidad de realizar recuperaciones.

**Opcionalmente**, configura tus archivos de logs de forma que todos los logs recuperados desde ese archivo tengan finalmente la etiqueta `team:acme`, tanto si la tenían en el archivo, como si no. [Esta opción][20] te permite reforzar la coherencia con tus políticas de restricción existentes, así como eliminar de forma segura las restricciones obsoletas que corresponden a que no haya más logs circulando en Datadog o indexados en Datadog.

{{< img src="logs/guide/rbac/archives.png" alt="Etiquetas (tags) ACME en recuperación" style="width:60%;">}}

**Nota**: **Si** utilizas el permiso [lectura de datos de índices heredados][21], añade el rol `ACME User` al archivo o archivos de ACME junto con el rol `ACME Admin`. Como los miembros del rol `ACME User` no tienen permiso para realizar la recuperación, esto no les otorga permisos sensibles. Sin embargo, esto acota automáticamente el permiso de lectura de datos de índices a la vista histórica resultante, para que puedan acceder al contenido.

{{< img src="logs/guide/rbac/rehydration_index.png" alt="Permiso de índices de recuperación" style="width:60%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: /es/agent/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[3]: /es/getting_started/tagging/
[4]: /es/account_management/rbac/permissions?tab=ui#logs_write_pipelines
[5]: /es/account_management/rbac/permissions?tab=ui#logs_modify_indexes
[6]: /es/account_management/rbac/permissions?tab=ui#logs_write_archives
[7]: /es/account_management/rbac/permissions?tab=ui#logs_public_config_api
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