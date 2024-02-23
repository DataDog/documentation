---
kind: documentación
title: Equipos
---

## Información general
Datadog Teams permite a los grupos de usuarios organizar los activos de sus equipos dentro de Datadog y filtrarlos automáticamente en Datadog para clasificarlos por relevancia.

Puedes utilizar Teams para vincular recursos como dashboards, servicios, monitores e incidencias a un grupo de usuarios. También puedes añadir enlaces específicos para equipos a los canales de Slack, paneles de Jira o repositorios de GitHub, entre otros.

Existen varias formas de unirse a un equipo: puedes unirte por tu cuenta, o bien pueden agregarte otros miembros o un administrador. Además, un usuario puede estar en varios equipos al mismo tiempo.

## Configuración

### Navegación

Para acceder a la [página del directorio de equipos][1]:

1. Dirígete a **Organization Settings** (Parámetros de organización) desde el menú de tu cuenta.
1. En **Groups** (Grupos), selecciona **Teams** (Equipos).

La [página del directorio de equipos][1] detalla todos los equipos que hay en tu organización. Utiliza el control deslizante **Only My Teams** (Solo mis equipos) de la parte superior derecha para alternar la vista entre tus equipos y todos los equipos de la organización.

{{< img src="account_management/teams-directory.jpg" alt="Pestaña Teams de la página Organization Settings, que muestra un panel con el equipo en caché" >}}

### Crear un equipo

1. En la [página del directorio de equipos][1], haz clic en **New Team** (Nuevo equipo), en la parte superior derecha.
1. Elige un **Team Name** (Nombre de equipo).
1. El **Handle** (Identificador) se rellena según el nombre de tu equipo.
1. Escribe una descripción opcional en **Description**.
1. Utiliza el menú desplegable para seleccionar a los miembros del equipo.
1. Haz clic en **Create** (Crear).

### Modificar el equipo

1. En la [página del directorio de equipos][1], haz clic en el equipo que te gustaría modificar. Aparecerá un panel lateral con todos los detalles.
1. Pasa el cursor sobre el elemento que te gustaría modificar; se mostrará el icono de un lápiz.
1. Haz clic en el lápiz y se cargará una ventana emergente.
1. Haz los cambios que quieras y, luego, haz clic en el botón apropiado para guardar tus cambios.

## Identificador de equipos

Un identificador de equipos sirve para vincular los equipos a los recursos de Datadog. Estos identificadores aparecen en las barras y facetas de búsqueda con el formato `team:<team-handle>` o `teams:<team-handle>`. 

Para buscar un identificador de equipos:
1. Haz clic en el nombre del equipo, en la página del directorio de equipos; se cargará un panel lateral con todos los detalles.
1. Busca el campo **handle** en la parte superior del panel. 

Para asociar un recurso con un equipo definido, el equipo debe tener en Datadog un identificador coincidente. Al hacer clic en un recurso asociado a un equipo definido, aparecerá una ventanita con el identificador del equipo y otros datos adicionales. Los equipos definidos tienen funcionalidades adicionales, como el filtro que te mostramos más abajo. 

Los identificadores de equipos que no están asociados con un equipo definido en Datadog se comportan de forma similar a las etiquetas (tags). Para aprovechar todas las ventajas de Teams, puedes convertir los identificadores que no están definidos en definidos.

### Asociar recursos con identificadores de equipos

Datadog permite asociar los siguientes recursos con identificadores de equipos:

- [Dashboards][2]
- [Incidencias][3]
- [Monitores][4]
- [Catálogo de recursos][14]
- [Catálogo de servicios][5]
- [Objetivos de nivel de servicio][6]
- Tests Synthetic, variables globales, localizaciones privadas

## Filtro

El filtro de equipos adapta la experiencia del usuario en Datadog al contenido asociado a sus equipos.

El filtro de equipos aparece en dos sitios en cada vista de lista: 
- En la lista de facetas de búsqueda de la parte superior izquierda
- Como término de búsqueda en la barra de búsqueda


Cuando un usuario activa un filtro de equipos, solo ve los recursos asociados a sus equipos o a los servicios que estos poseen. El filtro actúa de forma global y se mantiene, así que el usuario visualizará la información de sus equipos en Datadog cuando navegue por los productos aplicables.

La tabla de abajo describe los productos en los que puedes utilizar el filtro de equipos:

| Página de listas del producto       | Base del filtro                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][7]         | Identificador de equipos                                                                      |
| [Catálogo de recursos][14]   | Identificador de equipos                                                                      |
| [Catálogo de servicios][8]    | Identificador de equipos                                                                      |
| [Incidencias][9]          | Identificador de equipos                                                                      |
| [Monitores][10]          | Identificador de equipos                                                                      |
| [Seguimiento de errores APM][11] | Servicio propiedad de los equipos (determinado por la propiedad dentro del [catálogo de servicios][8]) |
| [Seguimiento de errores en logs][12] | Servicio propiedad de los equipos (determinado por la propiedad dentro del [catálogo de servicios][8]) |
| [Objetivos de nivel de servicio][13] | Identificador de equipos                                                                 |
| [Monitorización de secuencias de datos][15]  | Identificador de equipos                                                                 |
| [Tests Synthetic][16]          | Identificador de equipos                                                                 |


## Permisos

Cualquier usuario con el permiso de gestión de equipos puede crear equipos, cambiarles el nombre, borrarlos y modificar sus identificadores. Los usuarios con `user_access_manage` pueden añadir, eliminar y promocionar a miembros y gestores de equipos.

## Gestionar equipos

### Pertenencia a los equipos

Para diferenciar a los miembros de tu equipo, desígnalos como gestores del equipo. En la lista de miembros, aparecerá un distintivo con el texto "TEAM MANAGER" junto a los nombres de los gestores de los equipos.

En los parámetros del equipo, define qué usuarios pueden modificar quién pertenece al equipo. Puedes elegir entre las siguientes opciones:
- Solo usuarios con el permiso `user_access_manage` 
- Gestores del equipo
- Gestores y miembros del equipo
- Cualquier persona de la organización

Los usuarios con el permiso `user_access_manage` pueden definir reglas predeterminadas sobre quién puede añadir o eliminar miembros, o editar los detalles del equipo. Define reglas predeterminadas con el botón **Default Settings** (Parámetros predeterminados), en la página del directorio de equipos. Reemplaza estas políticas para un equipo determinado en el panel de detalles del equipo.

### Delegar la gestión de equipos

Para crear un modelo de equipo abierto, configura los parámetros del equipo para que **cualquier persona de la organización** pueda añadir o eliminar miembros de forma predeterminada. Asigna el permiso `teams_manage` a los roles apropiados para que cualquiera pueda crear equipos o editar sus detalles.

Si prefieres crear un modelo basado en una gestión por parte de los propios equipos, configura los parámetros del equipo para que los **gestores del equipo** o los **gestores y miembros del equipo** puedan añadir o eliminar miembros. Asigna el permiso `teams_manage` a un rol que abarque a todos los gestores de tu equipo.

Si te interesa un modelo estricto, configura tus parámetros de equipo predeterminados para que **solo usuarios con el permiso user_access_manage** puedan añadir o eliminar miembros. Asigna el permiso `teams_manage` solo a administradores de la organización.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /es/dashboards/#edit-details
[3]: /es/service_management/incident_management/incident_details#overview-section
[4]: /es/monitors/configuration/?tab=thresholdalert#add-metadata
[5]: /es/tracing/service_catalog/setup#add-service-definition-metadata
[6]: /es/service_management/service_level_objectives/#slo-tags
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/incidents
[10]: https://app.datadoghq.com/monitors/manage
[11]: https://app.datadoghq.com/apm/error-tracking
[12]: https://app.datadoghq.com/logs/error-tracking
[13]: https://app.datadoghq.com/slo/manage
[14]: /es/security/cspm/resource_catalog
[15]: https://app.datadoghq.com/data-streams
[16]: https://app.datadoghq.com/synthetics