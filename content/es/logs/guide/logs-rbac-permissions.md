---
further_reading:
- link: /logs/guide/logs-rbac
  tag: Documentación
  text: Cómo configurar el control de acceso basado en roles (RBAC) para logs
- link: account_management/rbac/permissions
  tag: Documentación
  text: Obtener más información sobre los permisos de configuración del control de
    acceso basado en roles (RBAC)
kind: guía
title: Permisos de configuración del control de acceso basado en roles (RBAC) para
  logs
---

## Información general

Una vez que hayas creado [funciones de configuración del control de acceso basado en roles [RBAC] para logs][1], asigna o elimina [permisos][2] al rol.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Asigna o elimina permisos a un rol directamente [actualizando el rol en el sitio Datadog][1].


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Asigna o elimina permisos a un rol directamente utilizando la [APi de permisos de Datadog][1].

[1]: /es/api/v2/roles/
{{% /tab %}}
{{< /tabs >}}

A continuación encontrarás más información sobre los permisos individuales.

## Acceso a la configuración de logs

### `logs_generate_metrics`

Concede a un rol la capacidad de utilizar la función de [generación de métricas][3].

Este permiso es global y permite tanto la creación de nuevas métricas, como la edición o la eliminación de las métricas ya existentes.

### `logs_write_facets`

Concede a un rol la capacidad de utilizar las [facetas Create, Edit y Delete (Crear, Editar y Eliminar)][4].

Este permiso es global y permite tanto la creación de nuevas facetas, como la edición o la eliminación de las facetas existentes.

### `logs_modify_indexes`

Concede a un rol la capacidad de crear y modificar [índices de logs][5]. Esto incluye:

- Configurar [filtros de índices][6] para los que los logs deben enrutarse a un índice.
- Configura la [conservación de logs][7] para un índice.
- Concede a otro rol los permisos para [datos de índices de lectura de logs](#logs_read_index_data) y para [filtros de exclusión de escritura de logs](#logs_write_exclusion_filters), delimitados a un índice específico.

Este permiso es global y permite tanto la creación de nuevos índices, como la edición de los índices ya existentes.

### `logs_write_exclusion_filters`

Concede a un rol la capacidad de crear o modificar [filtros de exclusión][8] dentro de un índice.

Este permiso puede asignarse globalmente o restringirse a un subconjunto de índices.

**Subconjunto de índices**:

{{< tabs >}}
{{% tab "UI" (IU) %}}

1. Elimina el permiso global para el rol.
2. Concede este permiso al rol en [la página de índices del sitio Datadog][1], editando un índice y añadiendo un rol al campo "Grant editing Exclusion Filters of this index to" (Conceder filtros de exclusión de edición de este índice a" (captura de pantalla a continuación).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Filtros de exclusión de escritura de logs" style="width:75%;" >}}


[1]: /es/logs/log_configuration/indexes/
{{% /tab %}}
{{% tab "API" %}}

Esta configuración sólo es compatible a través de la interfaz de usuario.

{{% /tab %}}
{{< /tabs >}}

### `logs_write_pipelines`

Concede a un rol la capacidad de crear y modificar [pipelines de procesamiento de logs][9]. Esto incluye:

- Definir el nombre del pipeline
- Configurar filtros de pipelines para saber qué logs deben ingresar el pipeline de procesamiento
- Reordenar pipelines
- Conceder a otro rol el permiso para [procesadores de escritura de logs](#logs_write_processors), delimitados a ese pipeline
- Gestionar los [atributos estándar][10] o el [solapamiento de facetas][11]

### `logs_write_processors`

Concede a un rol la capacidad de crear, editar o eliminar procesadores y pipelines anidados.

Este permiso puede asignarse globalmente o restringirse a un subconjunto de pipelines.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Asigna la función o las funciones en el modal `Edit` de un pipeline específico.

{{% /tab %}}
{{% tab "API" %}}

1. [Obtén el ID de rol][1] del rol que quieres asignar a pipelines específicos.
2. [Obtén el ID de permiso][2] de la API de permisos para `logs_write_processors` de tu región.
3. Concede permisos a ese rol con la siguiente llamada:

```sh
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "id": "<PERMISSION_UUID>",
                "type": "permissions"
            }'
```

[1]: /es/api/v2/roles/#list-roles
[2]: /es/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}

### `logs_write_archives`

Concede la capacidad de crear, editar o eliminar [archivos de logs][12]. Esto incluye:

- Configurar filtros de archivo para determinar qué logs deben enviarse al archivo
- Definir el nombre del archivo
- Reordenar los archivos
- Restringir el permiso para [archivos de lectura de logs](#logs_read_archives) a un subconjunto de roles.

Este permiso es global y permite crear nuevos archivos, así como editar y eliminar los archivos existentes.

### `logs_read_archives`

Concede la capacidad de acceder a los detalles de configuración del archivo. Junto con las [vistas históricas de escritura en logs](#logs_write_historical_views). Este permiso también concede la capacidad de activar una [recuperación][13] a partir de archivos.

Este permiso puede aplicarse a un subconjunto de archivos. Un archivo sin restricciones es accesible para cualquier persona que pertenezca a un rol con el permiso `logs_read_archives`. Un archivo con restricciones sólo es accesible para los usuarios que pertenecen a uno de los roles registrados, siempre que estos roles tengan el permiso `logs_read_archives`.

En el siguiente ejemplo, suponiendo que todos los roles excepto `Guest` tienen el permiso `logs_read_archive`:

* La función de staging es accesible para todos los usuarios, excepto aquellos que **sólo** pertenecen al rol `Guest`.
* La producción es accesible para todos los usuarios pertenecientes a `Customer Support`.
* La auditoría de seguridad no es accesible para los usuarios que pertenecen a `Customer Support`, a menos que también pertenezcan a `Audit & Security`.

{{< img src="account_management/rbac/logs_archives_list.png" alt="Crear un rol personalizado" style="width:90%;">}}

{{< tabs >}}
{{% tab "UI" (IU) %}}

Procede a crear el archivo o actualízalo en cualquier momento mientras lo editas.

{{< img src="account_management/rbac/logs_archive_restriction.png" alt="Crear un rol personalizado" style="width:90%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utiliza la API de archivos de logs para [asignar][1] o [revocar][2] un rol en un archivo determinado.


[1]: /es/api/v2/logs-archives/#grant-role-to-an-archive
[2]: /es/api/v2/logs-archives/#revoke-role-from-an-archive
{{% /tab %}}
{{< /tabs >}}

### `logs_write_historical_views`

Concede la capacidad de escribir vistas históricas, lo que implica activar una [recuperación de logs*][13].

Este permiso es global. Permite a los usuarios activar una recuperación de los archivos en los que tienen permiso para [archivos de lectura de logs](#logs_read_archives).

{{< img src="account_management/rbac/logs_hv_roles_combination.png" alt="Escribir vista histórica" style="width:70%;">}}

En el ejemplo anterior:

* `ADMIN` Los miembros del rol **pueden** recuperar desde `Audit Archive`, ya que, para ese archivo, tienen el permiso para escribir la vista histórica (recuperar), así como el permiso para leer archivos.
* `AUDIT` Los miembros del rol **no pueden** recuperarse desde `Audit Archive`, ya que no tienen el permiso para escribir la vista histórica (recuperar).
* `PROD` Los miembros del rol **no pueden** recuperarse desde `Audit Archive`, ya que no tienen el permiso para leer archivos.


Al asignar etiquetas (tags) `team:audit` a todos los logs recuperados del `Audit Archive`, asegúrate de que los miembros con el rol `Audit`, que tienen restringida la lectura de logs `team:audit`, sólo pueden acceder al contenido recuperado. Para ver más información sobre cómo añadir etiquetas y la recuperación, consulta la sección [Configuración del archivo de log][12].

Para los logs `service:ci-cd` que se recuperan a partir del `Prod Archive`, ten en cuenta lo siguiente:

* Si **no** utilizas el permiso para [datos de índices de lectura de logs](#logs_read_index_data) heredado, estos logs son accesibles para los miembros del rol `CI-CD`.
* Si **sí** utilizas el permiso para [datos de índices de lectura de logs](#logs_read_index_data) heredado, estos logs no son accesibles para los miembros del rol `CI-CD`, ya que la vista histórica resultante está restringida a miembros con los roles `PROD` y `ADMIN`.

### Eliminado: `logs_public_config_api`

Datadog ha eliminado el permiso `logs_public_config_api`.

Cinco permisos distintos controlan la capacidad de ver, crear o modificar configuraciones de logs a través de la API Datadog:
* [`logs_generate_metrics`](#logs_generate_metrics)
* [`logs_modify_indexes`](#logs_modify_indexes)
* [`logs_write_archives`](#logs_escribir_archivos)
* [`logs_write_pipelines`](#logs_write_pipelines)
* [`user_access_manage`][14]

## Acceso a datos de logs

Concede los siguientes permisos para gestionar el acceso de lectura a subconjuntos de datos de logs:

* Los [datos de lectura de logs](#logs_read_data) (recomendado) ofrecen un control de acceso más detallado al restringir el acceso de un rol a los logs que coincidan con las consultas de restricción de un log.
* Los [datos de índices de lectura de logs](#logs_read_index_data) son el enfoque heredado para restringir el acceso a los datos indexados de logs en función del índice (sigue siendo necesario tener este permiso habilitado para acceder a los datos indexados).

### `logs_read_data`

Acceso de lectura a datos de logs. Si se concede, se aplican otras restricciones como `logs_read_index_data` o con la [consulta de restricción][15].

Los roles son aditivos. Si un usuario pertenece a varios roles, los datos a los que tiene acceso son la unión de todos los permisos de cada uno de los roles.

**Ejemplo**:

* Si un usuario pertenece a un rol con datos de lectura de logs y también pertenece a un rol sin datos de lectura de logs, tiene permiso para leer datos.
* Si un usuario tiene restringido el acceso a `service:sandbox` a través de un rol y tiene restringido el acceso a `env:prod` a través de otro rol, puede acceder a todos los logs `env:prod` y `service:sandbox`.

{{< img src="account_management/rbac/logs_rq_roles_combination.png" alt="Acceso a datos de lectura" style="width:70%;">}}


{{< tabs >}}
{{% tab "UI" (IU) %}}

Para restringir a los usuarios y que sólo vean los logs que coinciden con una consulta de restricción, utiliza la [página de acceso a datos][1]:

1. [Crea](#create-a-restriction-query) una consulta de restricción.
2. [Asigna](#assign-a-role-to-a-restriction-query) uno o múltiples roles a esa consulta de restricción.
3. [Comprueba](#check-restriction-queries) qué roles y usuarios están asignados a qué consultas de restricción.

Esta vista muestra:

* **Sección `Restricted Access`**: todas las consultas de restricción y qué roles tienen adjuntos
* **Sección `Unrestricted Access`**: todos los roles que tienen permiso `log_read_data` sin más restricciones
* ** Sección`No Access`**: todos los roles que no tienen el permiso `log_read_data`.

## Crear una consulta de restricción

Crea una nueva consulta de restricción definiendo su filtro de consulta. La nueva consulta aparece en lista de restricciones sin ningún rol asociado.

{{< img src="account_management/rbac/logs_rq-create.mp4" alt="Vídeo 'Crear una consulta de restricción'"=true style="width:70%;">}}

### Asignar un rol a una consulta de restricción

Elige el rol donde se encuentre y asígnalo a la consulta de restricción prevista.

**Nota**: Ten en cuenta que a un rol no se le puede asignar más de una consulta de restricción. Es decir, cuando se asigna un rol a una consulta de restricción, pierde la conexión con la consulta de restricción a la que estaba asignado.

{{< img src="account_management/rbac/logs_rq-assign_roles.mp4" alt="Vídeo 'Asignar un rol a una consulta de restricción'"=true style="width:70%;">}}

Del mismo modo, utiliza la misma interacción "Move" (Mover) para conceder `Unrestricted Access` a un rol o, a la inversa, para convertirlo en un rol `No Access`.

### Comprobar restricciones de consultas

La página de acceso a datos muestra un máximo de 50 restricciones de consultas y 50 roles por sección. Si tiene más funciones y restricciones de consultas de las que puede mostrar la página, utiliza los filtros para acotar esta vista:

* con el filtro de restricción de consultas

{{< img src="account_management/rbac/logs_rq-filter.png" alt="Filtrar la restricción de consultas" style="width:70%;">}}

* con el filtro de roles:

{{< img src="account_management/rbac/logs_rq-view_as_role.png" alt="Estilo 'Ver como roles'" style="width:70%;">}}

* con el filtro de usuario, que es una forma práctica de ver a qué tiene acceso realmente un usuario específico que pertenece a varios roles:

{{< img src="account_management/rbac/logs_rq-view_as_user.png" alt="Estilo 'Ver como roles'" style="width:70%;">}}

[1]: https://app.datadoghq.com/logs/pipelines/data-access
{{% /tab %}}
{{% tab "API" %}}

Revoca o concede este permiso desde un rol con [la API de roles][1].
Utiliza las [restricciones de consultas][2] para delimitar el permiso a un subconjunto de datos de logs.

[1]: /es/api/#roles
[2]: /es/api/?lang=bash#roles-restriction-queries-for-logs
{{% /tab %}}
{{< /tabs >}}

## Permisos heredados

Estos permisos están globalmente habilitados por defecto para todos los usuarios.

El permiso para [datos de lectura de logs](#logs_read_data) se añade a estos permisos heredados. Por ejemplo, supongamos que un usuario tiene restringida la consulta `service:api`.

* Si este usuario tiene un permiso para [datos de lectura de logs](#logs_read_index_data) restringido en los índices `audit` y `errors`, sólo verá logs `service:api` dentro de estos índices.
* Si este usuario tiene un permiso [Live Tail](#logs_live_tail), sólo verá logs `service:api` en Live Tail.


### `logs_read_index_data`

Concede a un rol acceso de lectura a un número determinado de índices de logs. Esto puede configurarse globalmente o limitarse a un subconjunto de índices de logs.

Para acotar este permiso a un subconjunto de índices, primero elimina los permisos `logs_read_index_data` y `logs_modify_indexes` del rol. A continuación:

{{< tabs >}}
{{% tab "UI" (IU) %}}

Concede a este rol acceso al índice en la [página de configuración][1].

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Conceder acceso de lectura de índices a roles específicos" style="width:75%;" >}}


[1]: https://app.datadoghq.com/logs/indexes
{{% /tab %}}
{{% tab "API" %}}

* [Obtén el ID de rol][1] del rol que quieres asignar a pipelines específicos.
* [Obtén el ID de permiso][2] para la API de permisos `logs_write_processors` de tu región.
* Concede permiso a ese rol con la siguiente llamada:

```bash
curl -X POST \
        https://app.datadoghq.com/api/v2/roles/<ROLE_UUID>/permissions \
        -H "Content-Type: application/json" \
        -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
        -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
        -d '{
                "id": "<PERMISSION_UUID>",
                "type": "permissions"
            }'
```


[1]: /es/api/v2/roles/#list-roles
[2]: /es/api/v2/roles/#list-permissions
{{% /tab %}}
{{< /tabs >}}

### `logs_live_tail`

Concede a un rol la capacidad de utilizar la función [Live Tail][16].

Este permiso es global y concede acceso a Live Tail independientemente del permiso para [datos de índice de lectura de logs](#logs_read_index_data).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

<br>*Log Rehydration es una marca registrada de Datadog, Inc.

[1]: /es/logs/guide/logs-rbac/
[2]: /es/account_management/rbac/permissions
[3]: /es/logs/logs_to_metrics/
[4]: /es/logs/explorer/facets/#overview
[5]: /es/logs/indexes
[6]: /es/logs/indexes#indexes-filters
[7]: /es/logs/indexes#update-log-retention
[8]: /es/logs/indexes#exclusion-filters
[9]: /es/logs/log_configuration/pipelines
[10]: /es/logs/log_configuration/attributes_naming_convention/#standard-attributes
[11]: /es/logs/explorer/facets/#alias-facets
[12]: /es/logs/archives
[13]: /es/logs/archives/rehydrating
[14]: /es/account_management/rbac/permissions/#access-management
[15]: /es/api/v2/logs-restriction-queries/
[16]: /es/logs/explorer/live_tail/