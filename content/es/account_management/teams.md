---
kind: documentación
title: Equipos
---

## Información general
Datadog Teams permite a los grupos de usuarios organizar los activos de sus equipos dentro de Datadog y filtrarlos automáticamente en Datadog para clasificarlos por relevancia.

Puedes utilizar Teams para vincular recursos como dashboards, servicios, monitores e incidencias a un grupo de usuarios. También puedes añadir enlaces específicos para equipos a los canales de Slack, paneles de Jira o repositorios de GitHub, entre otros.

Existen varias formas de ser miembro de un equipo. Los usuarios pueden unirse a los equipos, o pueden agregarlos otros miembros o un administrador. Además, un usuario puede estar en varios equipos al mismo tiempo.

## Configuración

### Navegación

Accede a la página del directorio de equipos, desde los [parámetros de la organización][1] o navegando hasta [**Service Management > Teams** (Gestión de servicios > Equipos][2]. La [página del directorio de equipos][1] enumera todos los equipos de tu organización.

### Crear un equipo

1. En la [página del directorio de equipos][1], haz clic en **New Team** (Nuevo equipo), en la parte superior derecha.
1. Elige un **Team Name** (Nombre de equipo).
1. El **Handle** (Identificador) se rellena según el nombre de tu equipo.
1. Escribe una descripción opcional en **Description**.
1. Utiliza el menú desplegable para seleccionar a los miembros del equipo.
1. Haz clic en **Create** (Crear).

**Nota:** Los caracteres permitidos para los nombres de equipos y los nombres de identificadores de equipos son `a-z`, `A-Z`, `0-9` y `._-:/`. Sustituye los espacios por guiones bajos.

### Modificar el equipo

1. En la [página del directorio de equipos][1], haz clic en el equipo que quieres modificar. 
1. Haz clic en el botón **Settings** (Configuración) situado en la parte superior de la pantalla. Aparecerá una ventana emergente.
1. Selecciona el elemento que quieres modificar.
1. Realiza los cambios y pulsa **Save** (Guardar).

### Elige la fuente de suministro

Elige entre tres opciones para determinar cómo los administradores y los jefes de equipos pueden actualizar los miembros de un equipo:

IU y API
: Actualiza los miembros de un equipo únicamente mediante acciones de IU y llamadas a la API.

SAML
: Utiliza un modelo SAML Strict (SAML estricto) para que los datos del proveedor de identidad determinen los miembros de un equipo.

Todas las fuentes
: Utiliza SAML como punto de partida y permite anulaciones a través de la IU y la API.

1. En la [página del directorio de equipos][1], haz clic en **Teams Settings** (Configuración de equipos).
1. Selecciona una de las opciones en **Team Provisioning Sources** (Fuentes de suministro de los equipos).

Si tienes equipos con miembros existentes, al elegir la opción SAML Strict (SAML estricto) se anula la configuración y se eliminan los miembros de esos equipos. Si eliges la opción All Sources (Todos los orígenes), se conservarán los miembros existentes. Para gestionar equipos y miembros de equipos mediante atributos SAML, consulta [Asignar atributos SAML a equipos][3].

## Identificador de equipos

Un identificador de equipos sirve para vincular los equipos a los recursos de Datadog. Estos identificadores aparecen en las barras y facetas de búsqueda con el formato `team:<team-handle>` o `teams:<team-handle>`. 

Para buscar un identificador de equipos:
1. Haz clic en el nombre del equipo, en la página del directorio de equipos. Aparecerá un panel lateral con todos los detalles.
1. Busca el campo **handle** (Identificador) en la parte superior del panel. 

Para asociar un recurso con un equipo definido, el equipo debe tener en Datadog un identificador coincidente. Al hacer clic en un recurso asociado a un equipo definido, aparecerá una ventanita con el identificador del equipo y otros datos adicionales. Los equipos definidos tienen funcionalidades adicionales, como el filtro que te mostramos más abajo. 

Los identificadores de equipos que no están asociados con un equipo definido en Datadog se comportan de forma similar a las etiquetas (tags). Para aprovechar todas las ventajas de Teams, puedes convertir los identificadores que no están definidos en definidos.

### Asociar recursos con identificadores de equipos

Datadog permite asociar los siguientes recursos con identificadores de equipos:

- [Dashboards][4]
- [Incidentes][5]
- [Monitores][6]
- [Catálogo de recursos][7]
- [Catálogo de servicios][8]
- [Objetivos de nivel de servicio (SLOs)][9]
- Tests Synthetic, variables globales, ubicaciones privadas

### Enviar notificaciones a un canal de comunicación específico 

Añade un canal notificación a tu equipo para redirigir las alertas a canales de comunicación como Slack o Microsoft Teams. Las alertas de monitor dirigidas a `@team-<handle>` se redirigen al canal seleccionado. 

1. En la [página del directorio de equipos][1], haz clic en el equipo que quieres modificar. 
1. Haz clic en el botón con forma de engranaje **Settings** (Configuración), situado en la parte superior de la pantalla. Aparecerá una ventana emergente.
1. Selecciona **Notifications** (Notificaciones).
1. Añade un canal y haz clic en **Save** (Guardar).

## Filtro

El filtro de equipos adapta la experiencia del usuario en Datadog al contenido asociado a sus equipos.

El filtro de equipos aparece en dos sitios en cada vista de lista: 
- En la lista de facetas de búsqueda de la parte superior izquierda
- Como término de búsqueda en la barra de búsqueda


Cuando un usuario activa un filtro de equipos, solo ve los recursos asociados a sus equipos o a los servicios que estos poseen. El filtro actúa de forma global y se mantiene, así que el usuario visualizará la información de sus equipos en Datadog cuando navegue por los productos aplicables.

La tabla de abajo describe los productos en los que puedes utilizar el filtro de equipos:

| Página de listas del producto       | Base de filtro                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][10]         | Identificador de equipos                                                                      |
| [Catálogo de recursos][7]   | Identificador de equipos                                                                      |
| [Catálogo de servicios][11]    | Identificador de equipos                                                                      |
| [Incidentes][12]          | Identificador de equipos                                                                      |
| [Monitors (Monitores)][13]          | Identificador de equipos                                                                      |
| [Seguimiento de errores de APM][14] | Servicio de propiedad de los equipos (determinado por la propiedad del [catálogo de servicios][11]) |
| [Seguimiento de errores de logs][15] | Servicio de propiedad de los equipos (determinado por la propiedad del [catálogo de servicios][11]) |
| [Objetivos de nivel de servicio (SLOs)][16] | Identificador de equipos                                                                 |
| [Data Streams Monitoring][17]  | Identificador de equipos                                                                 |
| [Tests de Synthetic][18]          | Identificador de equipos                                                                 |
| [Notebooks][19]          | Identificador de equipos                                                                      |



## Python

Cualquier usuario con el permiso de gestión de equipos puede crear equipos, cambiarles el nombre, borrarlos y modificar sus identificadores. Los usuarios con `user_access_manage` pueden añadir, eliminar y promocionar a miembros y gestores de equipos.

## Gestionar equipos

### Miembros de equipos

Para diferenciar a los miembros de tu equipo, desígnalos como gestores del equipo. En la lista de miembros, aparecerá un distintivo con el texto "TEAM MANAGER" junto a los nombres de los gestores de los equipos.

En los parámetros del equipo, define qué usuarios pueden modificar los miembros de un equipo. Puedes elegir entre las siguientes opciones:
- Solo usuarios con el permiso `user_access_manage` 
- Gestores del equipo
- Gestores y miembros del equipo
- Cualquier persona de la organización

Los usuarios con el permiso `user_access_manage` pueden definir reglas predeterminadas sobre quién puede añadir o eliminar miembros, o editar los detalles del equipo. Define reglas predeterminadas con el botón **Default Settings** (Parámetros predeterminados), en la página del directorio de equipos. Sustituye estas políticas para un equipo determinado en el panel de detalles del equipo.

### Asignación de atributos SAML

Para gestionar equipos y miembros de equipos mediante atributos SAML, consulta [Asignar atributos SAML a equipos][3].

### Delegar la gestión de equipos

Si quieres crear un modelo abierto para definir los miembros de un equipo, configura los parámetros del equipo para que **cualquier persona de la organización** pueda añadir o eliminar miembros de forma predeterminada. Asigna el permiso `teams_manage` a los roles apropiados para que cualquiera pueda crear equipos o editar sus detalles.

Si prefieres un modelo gestionado por los propios equipos para definir los miembros de un equipo, configura los parámetros del equipo para que los **Administradores del equipo** o los **Administradores y miembros del equipo** puedan añadir o eliminar miembros. Asigna el permiso `teams_manage` a un rol que contenga a todos los administradores de tu equipo.

Si quieres reforzar un modelo estricto para definir los miembros de un equipo, configura tus parámetros de equipo predeterminados para que **Solo usuarios con el permiso user_access_manage** puedan añadir o eliminar miembros. Asigna el permiso `teams_manage` sólo a administradores de la organización.


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /es/account_management/saml/mapping/#map-saml-attributes-to-teams
[4]: /es/dashboards/#dashboard-details
[5]: /es/service_management/incident_management/incident_details#overview-section
[6]: /es/monitors/configuration/?tab=thresholdalert#add-metadata
[7]: /es/infrastructure/resource_catalog/
[8]: /es/tracing/service_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[9]: /es/service_management/service_level_objectives/#slo-tags
[10]: https://app.datadoghq.com/dashboard/lists
[11]: https://app.datadoghq.com/services
[12]: https://app.datadoghq.com/incidents
[13]: https://app.datadoghq.com/monitors/manage
[14]: https://app.datadoghq.com/apm/error-tracking
[15]: https://app.datadoghq.com/logs/error-tracking
[16]: https://app.datadoghq.com/slo/manage
[17]: https://app.datadoghq.com/data-streams
[18]: https://app.datadoghq.com/synthetics
[19]: https://app.datadoghq.com/notebook/list/