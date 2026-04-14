---
title: Equipos
---

## Información general
Datadog Teams permite a los grupos de usuarios organizar los activos de sus equipos dentro de Datadog y filtrarlos automáticamente en Datadog para clasificarlos por relevancia.

Puedes utilizar Teams para vincular recursos como dashboards, servicios, monitores e incidencias a un grupo de usuarios. También puedes añadir enlaces específicos para equipos a los canales de Slack, paneles de Jira o repositorios de GitHub, entre otros.

Existen varias formas de ser miembro de un equipo. Los usuarios pueden unirse a los equipos, o pueden agregarlos otros miembros o un administrador. Además, un usuario puede estar en varios equipos al mismo tiempo.

{{< callout url="https://www.datadoghq.com/product-preview/github-integration-for-teams/" header="Únete a la Vista previa.">}}
  La integración de Github para Teams está en Vista previa.
{{< /callout >}}

## Configuración

### Navegación

Accede a la página del directorio de equipos desde los [parámetros de organización][1] o consulta [**Service Management > Teams**][2] (Gestión de servicios > Teams). La [página del directorio de equipos][1] enumera todos los equipos de tu organización.

### Crear un equipo

1. En la [página del directorio de equipos][1], haz clic en **New Team** (Nuevo equipo), en la parte superior derecha.
1. Elige un **Team Name** (Nombre de equipo).
1. El **Handle** (Identificador) se rellena según el nombre de tu equipo.
1. Usa el menú desplegable para seleccionar miembros y administradores del equipo.
1. Escribe una descripción opcional en **Description**.
1. Haz clic en **Create** (Crear).

**Notas**: 

- Los caracteres permitidos para los nombres de equipos son `a-z`, `A-Z`, `0-9` y `._-:/`. Sustituye los espacios por guiones bajos. 
- Los caracteres permitidos para los identificadores de equipos son `a-z`, `0-9` y `._-:/`. El último carácter no puede ser un guion bajo.

### Modificar el equipo

1. En la [página del directorio de equipos][1], haz clic en el equipo que quieres modificar. Aparecerá la [página de detalles del equipo][3]. 
1. Haz clic en el botón **Parámetros**, situado en la parte superior de la pantalla. Aparecerá una ventana emergente.
1. Selecciona el elemento que quieres modificar.
1. Realiza los cambios y pulsa **Guardar**.

### Elige la fuente de suministro

Elige entre tres opciones para determinar cómo los administradores y los jefes de equipo pueden actualizar los miembros de un equipo:

Interfaz de usuario y API
: Actualiza los miembros de un equipo únicamente mediante acciones de interfaz de usuario y llamadas a la API.

SAML
: Utiliza un modelo *SAML estricto* para que los datos del proveedor de identidad determinen los miembros del equipo.

Todas las fuentes
: Utiliza SAML como punto de partida y permite anulaciones a través de la interfaz de usuario y la API.

1. En la [página del directorio de equipos][1], haz clic en **Parámetros de equipo**.
1. Selecciona una de las opciones en **Fuentes de suministro de los equipos**.

Si tienes equipos con miembros existentes, al elegir la opción de SAML strict (SALM estricto) se anulan los parámetros y se elimina a los miembros de esos equipos. Si eliges la opción All Sources (Todos los orígenes), se conservarán los miembros existentes. Para gestionar los equipos y sus miembros mediante atributos SAML, consulta [Asignar atributos SAML a equipos][4].

## Identificador de equipos

Un identificador de equipos sirve para vincular los equipos a los recursos de Datadog. Estos identificadores aparecen en las barras y facetas de búsqueda con el formato `team:<team-handle>` o `teams:<team-handle>`. 

Para buscar un identificador de equipos:
1. Haz clic en el nombre del equipo en la página del directorio de equipos. Aparecerá la página de detalles del equipo.
1. El identificador del equipo aparece a la derecha del nombre, en la parte superior de la página.

Para asociar un recurso con un equipo definido, el equipo debe tener en Datadog un identificador coincidente. Al hacer clic en un recurso asociado a un equipo definido, aparecerá una ventanita con el identificador del equipo y otros datos adicionales. Los equipos definidos tienen funcionalidades adicionales, como el filtro que te mostramos más abajo. 

Los identificadores de equipos que no están asociados con un equipo definido en Datadog se comportan de forma similar a las etiquetas (tags). Para aprovechar todas las ventajas de Teams, puedes convertir los identificadores que no están definidos en definidos.

### Asociar recursos con identificadores de equipos

Datadog permite asociar los siguientes recursos con identificadores de equipos:

- [Dashboards][5]
- [Incidencias][6]
- [Monitores][7]
- [Catálogo de recursos][8]
- [Software Catalog][9]
- [Objetivos de nivel de servicio (SLOs)][10]
- Monitoreos de Sintético, variables globales, ubicaciones privadas

### Enviar notificaciones a un canal de comunicación específico 

Añade un canal de notificación a tu equipo para redirigir las alertas a canales de comunicación como Slack o Microsoft Teams. Las alertas de monitorización dirigidas a `@team-<handle>` se redirigen al canal seleccionado. 

1. En la [página del directorio de equipos][1], haz clic en el equipo que quieres modificar. 
1. Haz clic en el botón **Parámetros**, situado en la parte superior de la pantalla. Aparecerá una ventana emergente.
1. Selecciona **Notificaciones**.
1. Añade un canal y haz clic en **Guardar**.

## Filtro de equipos

El filtro de equipos adapta tu experiencia en Datadog al mostrarte contenido asociado con tus equipos. La lista **My Teams** (Mis equipos) incluye los equipos de los que eres miembro y los que seleccionaste como favoritos.

{{< img src="/account_management/teams/team-filter.png" alt="Página de lista de monitores con un recuadro rojo alrededor del filtro de equipos. Dos de las tres opciones de Mis equipos seleccionadas.">}}

Cuando habilitas el filtro de equipos, solo ves los recursos asociados con tus equipos o con los servicios que son propiedad de tus equipos. El estado del filtro de equipos es global y persistente, por lo que Datadog aplica el contexto de tu equipo a medida que navegas por diferentes productos.

El filtro de equipos funciona al añadir términos de búsqueda basados ​​en el equipo a la consulta de búsqueda. Cuando habilitas el filtro de equipos, puedes ver los términos de búsqueda basados ​​en el equipo que se añaden en la barra de búsqueda.

### Equipos favoritos

Es posible que te interesen los recursos de un equipo en particular sin ser miembro de este. Si añades un equipo a tus equipos favoritos, podrás obtener vistas filtradas de los recursos de ese equipo sin tener que unirte.

Tus equipos favoritos aparecen junto a los equipos a los que perteneces en la parte superior de la página del directorio de equipos y en el filtro de equipos.

#### Añadir o eliminar equipos favoritos

Puedes añadir o eliminar un equipo de tus favoritos desde la página del directorio de equipos o desde el filtro de equipos.

Desde la [página del directorio de equipos][1]:
1. Haz clic en el equipo que quieres añadir como favorito. Aparecerá la [página de detalles del equipo][3].
1. Haz clic en **Add Favorite** (Añadir favorito) o **Remove Favorite** (Eliminar favorito) en la parte superior derecha.

De manera alternativa, también puedes hacerlo desde la página del directorio de equipos:
1. Pasa el ratón sobre el equipo que quieres añadir o eliminar. Aparecerán iconos en línea a la derecha del nombre del equipo.
1. Haz clic en el icono de estrella (**Add to Favorites** [Añadir a favoritos] o **Remove from Favorites** [Eliminar de favoritos]).

Desde el filtro de equipos:
1. Si el filtro está contraído, haz clic en **My Teams** (Mis equipos) para expandirlo.
1. Haz clic en **Add Favorites** (Añadir favoritos). Aparecerá un cuadro de búsqueda y una lista de equipos.
1. Para limitar la lista de equipos, comienza a escribir el nombre de un equipo en el cuadro de búsqueda.
1. Haz clic en la estrella junto al equipo que quieras para añadirlo o eliminarlo de tus favoritos.

### Productos compatibles

En la siguiente tabla se describen los productos en los que puedes usar el filtro de equipos:

| Página de listas del producto       | Base de filtro                                                                     |
|-------------------------|----------------------------------------------------------------------------------|
| [Dashboards][11]         | Identificador de equipos                                                                      |
| [Catálogo de recursos][8]   | Identificador de equipos                                                                      |
| [Software Catalog][12]    | Identificador de equipos                                                                      |
| [Incidentes][13]          | Identificador de equipos                                                                      |
| [Monitores][14]          | Identificador de equipos                                                                      |
| [Seguimiento de errores de APM][15] | Servicio propiedad de los equipos (determinado por la propiedad dentro del [Software Catalog][12]) |
| [Seguimiento de errores de logs][16] | Servicio propiedad de los equipos (determinado por la propiedad dentro del [Software Catalog][12]) |
| [Objetivos de nivel de servicio (SLOs)][17] | Identificador de equipos                                                                 |
| [Data Streams Monitoring][18]  | Identificador de equipos                                                                 |
| [Tests Synthetic][19]          | Identificador de equipos                                                                 |
| [Notebooks][20]          | Identificador de equipos                                                                      |


## Permisos

Cualquier usuario con el permiso de gestión de equipos puede crear equipos, cambiarles el nombre, borrarlos y modificar sus identificadores. Los usuarios con `user_access_manage` pueden añadir, eliminar y promocionar a miembros y jefes de equipos.

## Gestionar equipos

Para personalizar tu equipo, consulta [Gestión de equipos][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /es/account_management/teams/manage/
[4]: /es/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /es/dashboards/#dashboard-details
[6]: /es/service_management/incident_management/
[7]: /es/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: /es/infrastructure/resource_catalog/
[9]: /es/tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
[10]: /es/service_management/service_level_objectives/#slo-tags
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://app.datadoghq.com/services
[13]: https://app.datadoghq.com/incidents
[14]: https://app.datadoghq.com/monitors/manage
[15]: https://app.datadoghq.com/apm/error-tracking
[16]: https://app.datadoghq.com/logs/error-tracking
[17]: https://app.datadoghq.com/slo/manage
[18]: https://app.datadoghq.com/data-streams
[19]: https://app.datadoghq.com/synthetics
[20]: https://app.datadoghq.com/notebook/list/