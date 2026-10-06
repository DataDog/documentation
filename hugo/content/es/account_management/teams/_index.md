---
description: Organice los recursos del equipo, filtre las experiencias de Datadog
  y administre la membresía del equipo con identificadores de equipo, notificaciones
  y asociaciones de recursos.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Mantenga actualizada la propiedad del servicio con la integración de GitHub
    de Datadog Teams
title: Teams
---
## Descripción general {#overview}
Datadog Teams permite a los grupos de usuarios organizar sus recursos de equipo dentro de Datadog y filtrar automáticamente su experiencia en todo Datadog para priorizar estos recursos.

Utilice Teams para vincular recursos como paneles,servicios, monitores e incidentes a un grupo de usuarios. También puede agregar enlaces específicos del equipo a canales de Slack, tableros de Jira, repositorios de GitHub y más.

La membresía del equipo es flexible. Los usuarios pueden unirse a equipos, ser agregados por otros miembros o ser agregados por un administrador. Los usuarios pueden pertenecer a varios equipos.

## Configuración {#setup}

### Navegación {#navigation}

Acceda a la página del directorio de equipos desde [Ajustes de la organización][1] o navegando a [**Teams**][2]. La [página del directorio de equipos][1] enumera todos los equipos dentro de su organización.

### Crear equipo {#create-team}

1. En la [página del directorio de equipos][1], haga clic en {{< ui >}}New Team{{< /ui >}} en la parte superior derecha.
1. Elija un {{< ui >}}Team Name{{< /ui >}}.
1. El {{< ui >}}Handle{{< /ui >}} se completa según el nombre de su equipo.
1. Utilice el menú desplegable para seleccionar a los miembros y gerentes del equipo.
1. Proporcione un {{< ui >}}Description{{< /ui >}} opcional.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

**Notas**: 

- Los caracteres permitidos para los nombres de equipo son `a-z`, `A-Z`, `0-9` y `._-:/`. Reemplace los espacios con guiones bajos. 
- Los caracteres permitidos para los identificadores de equipo son `a-z`, `0-9` y `._-:/`. El último carácter no puede ser un guion bajo.

### Modificar equipo {#modify-team}

1. En la [página del directorio de equipos][1], haga clic en el equipo que desea modificar. Aparece la [página de detalles del equipo][3]. 
1. Haga clic en el engranaje {{< ui >}}Settings{{< /ui >}} en la parte superior de la pantalla. Aparece una ventana emergente.
1. Seleccione el elemento que desea modificar.
1. Realice sus cambios y luego haga clic en {{< ui >}}Save{{< /ui >}}.

### Elija la fuente de aprovisionamiento {#choose-provisioning-source}

Elija entre tres opciones para determinar cómo los administradores y los gerentes de equipo pueden actualizar la membresía del equipo:

UI y API
: Actualizar la membresía solo a través de acciones de la UI y llamadas a la API

SAML
: Utilice un modelo *SAML estricto* para que los datos del proveedor de identidad determinen la membresía del equipo

Todas las fuentes
: Utilice SAML como punto de partida y permita anulaciones a través de la interfaz de usuario y la API

1. En la [página del directorio de equipos][1], haga clic en {{< ui >}}Teams Settings{{< /ui >}}.
1. Seleccione una de las opciones en {{< ui >}}Team Provisioning Sources{{< /ui >}}.

Si tiene equipos con miembros existentes, elegir la opción SAML estricto anula su configuración y elimina a los miembros de esos equipos. Seleccionar la opción Todas las fuentes conserva las membresías existentes. Para administrar equipos y la membresía mediante atributos SAML, consulte [Asignar atributos SAML a Teams][4].

## Jerarquías de equipos{#team-hierarchies}

Anide equipos dentro de otros (subequipos) para reflejar la estructura de su organización y visualice el resultado como un mapa de Teams. Para definir relaciones jerárquicas entre equipos con GitHub Teams, la Teams API, Terraform o la interfaz de usuario de Datadog, consulte [Jerarquías de Teams][39].

## Identificador de equipo{#team-handle}

Un identificador de equipo vincula los equipos con los recursos de Datadog. Los identificadores de equipos aparecen en las barras de búsqueda y facetas en el formato `team:<team-handle>` o `teams:<team-handle>`. 

Para encontrar un identificador de equipo:
1. Haga clic en el nombre del equipo en la página del directorio de equipos. Aparece la página de detalles del equipo.
1. El identificador de equipo aparece a la derecha del nombre, en la parte superior de la página.

Para asociar un recurso con un equipo definido, debe existir un equipo en Datadog con un identificador de equipo coincidente. Cuando hace clic en un recurso asociado con un equipo definido, aparece una pequeña ventana con el identificador de equipo e información adicional. Los equipos definidos proporcionan funcionalidad adicional, como el filtro de equipos a continuación. 

Los identificadores de equipo que no están asociados con un equipo definido en Datadog se comportan de manera similar a las etiquetas. Convierta cualquier identificador de equipo no definido en equipos definidos para aprovechar las funciones de Teams.

### Asociar recursos con identificadores de equipos {#associate-resources-with-team-handles}

Datadog admite la asociación de los siguientes recursos con identificadores de equipos:

- [Tableros][5]
- [Incidentes][6]
- [Monitores][7]
- [Resource Catalog][8]
- [Catalog][9]
- [Service Level Objectives][10]
- Prueba Synthetic, Global Variables, Private Locations

### Enviar notificaciones a un canal de comunicación específico {#send-notifications-to-a-specific-communication-channel}

Agregue un canal de notificación a su equipo para dirigir las alertas a canales de comunicación como Slack o Microsoft Teams. Las alertas de monitores dirigidas a `@team-<handle>` se redirigen al canal seleccionado. 

1. En la [página del directorio de equipos][1], haga clic en el equipo que desea modificar. 
1. Haga clic en el engranaje {{< ui >}}Settings{{< /ui >}} en la parte superior de la pantalla. Aparece una ventana emergente.
1. Seleccione {{< ui >}}Notifications{{< /ui >}}.
1. Agregue un canal y luego haga clic en {{< ui >}}Save{{< /ui >}}.

## Filtro de equipos {#team-filter}

El filtro de equipos personaliza su experiencia en Datadog al mostrarle contenido asociado con sus equipos. La lista {{< ui >}}My Teams{{< /ui >}} incluye los equipos de los que usted es miembro y los equipos que seleccionó como favoritos.

{{< img src="/account_management/teams/team-filter.png" alt="Página de lista de monitores con un recuadro rojo alrededor del filtro de equipos. Dos de tres My Teams seleccionados.">}}

Cuando habilita el filtro de equipos, solo ve los recursos asociados con sus equipos o con los servicios que pertenecen a sus equipos. El estado del filtro de equipos es global y persistente, por lo que Datadog aplica su contexto de equipo a medida que navega por diferentes productos.

El filtro de equipos funciona añadiendo términos de búsqueda basados en el equipo a la consulta de búsqueda. Cuando habilita el filtro de equipos, puede ver los términos de búsqueda basados en el equipo que éste añade en la barra de búsqueda.

### Equipos favoritos {#favorite-teams}

Es posible que le interesen los recursos de un equipo en particular sin ser miembro de ese equipo. Añadir un equipo a sus Favoritos le permite obtener vistas filtradas de los recursos de ese equipo sin unirse al mismo.

Sus equipos favoritos aparecen junto a los equipos a los que usted pertenece en la parte superior de la página de directorio de equipos y en el filtro de equipos.

#### Agregar o eliminar equipos favoritos {#add-or-remove-favorite-teams}

Puede añadir o eliminar un equipo de sus Favoritos desde la [página de directorio de equipos] o desde el filtro de equipos.

Desde la [página de directorio de equipos][1]:
1. Haga clic en el equipo que desea añadir como Favorito. Aparece la [página de detalles del equipo][3].
1. Haga clic en {{< ui >}}Add Favorite{{< /ui >}} o {{< ui >}}Remove Favorite{{< /ui >}} en la parte superior derecha.

Alternativamente, también desde la [página de directorio de equipos]:
1. Pase el cursor sobre el equipo que desea añadir o eliminar. Aparecen iconos en línea a la derecha del nombre del equipo.
1. Haga clic en el icono de estrella ({{< ui >}}Add to Favorites{{< /ui >}} o {{< ui >}}Remove from Favorites{{< /ui >}}).

Desde el filtro de equipos:
1. Si el filtro de equipos está contraído, haga clic en {{< ui >}}My Teams{{< /ui >}} para expandirlo.
1. Haga clic en {{< ui >}}Add Favorites{{< /ui >}}. Aparecen un cuadro de búsqueda y una lista de equipos.
1. Para reducir la lista de equipos, comience a escribir el nombre de un equipo en el cuadro de búsqueda.
1. Haga clic en la estrella junto al equipo deseado para agregarlo o quitarlo de sus equipos favoritos.

### Productos compatibles {#supported-products}

La siguiente tabla describe los productos en los que puede usar el filtro de equipos:

| Product List Page              | Filter basis                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | Servicio propiedad de los equipos (determinado por la propiedad dentro del [Catálogo][12]) |
| [Apps][21]                     | Identificador de equipo                                                                        |
| [Work Management projects][22] | Identificador de equipo                                                                        |
| [Conexiones][23]              | Identificador del equipo                                                                        |
| [Grupos de conexión][24]        | Identificador del equipo                                                                        |
| [Conexiones entre organizaciones][25]    | Identificador del equipo                                                                        |
| [Datastores][26]               | Identificador del equipo                                                                        |
| [Data Streams Monitoring][18]  | Identificador del equipo                                                                        |
| [Dashboards][11]               | Identificador del equipo                                                                        |
| [Incidents][13]                | Identificador del equipo                                                                        |
| [Integrations][27]             | Identificador del equipo                                                                        |
| [Logs Error Tracking][16]      | Servicio propiedad de los equipos (determinado por la propiedad dentro del [Catálogo][12]) |
| [Logs Pipelines][28]           | Identificador del equipo                                                                        |
| [Monitors][14]                 | Identificador del equipo                                                                        |
| [Notebooks][20]                | Identificador del equipo                                                                        |
| [Observability Pipelines][29]  | Identificador del equipo                                                                        |
| [On-Call][30]                  | Servicio propiedad de los equipos (determinado por la propiedad dentro del [Catálogo][12]) |
| [Powerpacks][32]               | Identificador del equipo                                                                        |
| [Private Action Runner][31]    | Identificador del equipo                                                                        |
| [Reference tables][33]         | Identificador del equipo                                                                        |
| [Resource Catalog][8]          | Identificador del equipo                                                                        |
| [RUM apps][34]                 | Identificador del equipo                                                                        |
| [Security rules][35]           | Identificador del equipo                                                                        |
| [Security suppressions][36]    | Identificador del equipo                                                                        |
| [Service Level Objectives][17] | Identificador del equipo                                                                        |
| [Sheets][37]                   | Identificador del equipo                                                                        |
| [Catalog][12]         | Identificador del equipo                                                                        |
| [Pruebas Synthetic][19]          | Identificador del equipo                                                                        |
| [Workflows][38]                | Identificador del equipo                                                                        |


## Permisos {#permissions}

Cualquier usuario con un rol que tenga el permiso de administrar Teams puede crear, renombrar y eliminar equipos, además de cambiar los identificadores. Los usuarios con `user_access_manage` pueden agregar, eliminar y promover a miembros y gerentes de equipos.

## Administrar equipos{#manage-teams}

Para personalizar su equipo, consulte [Administración de equipos][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /es/account_management/teams/manage/
[4]: /es/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /es/dashboards/#dashboard-details
[6]: /es/incident_response/incident_management/
[7]: /es/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /es/internal_developer_portal/catalog/entity_model/
[10]: /es/service_level_objectives/#slo-tags
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
[21]: https://app.datadoghq.com/app-builder/apps/list
[22]: https://app.datadoghq.com/work
[23]: https://app.datadoghq.com/actions/connections
[24]: https://app.datadoghq.com/actions/connections?sort=-updated_at&tab=groups
[25]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[26]: https://app.datadoghq.com/actions/datastores
[27]: https://app.datadoghq.com/integrations
[28]: https://app.datadoghq.com/logs/pipelines
[29]: https://app.datadoghq.com/observability-pipelines
[30]: https://app.datadoghq.com/on-call/summary
[31]: https://app.datadoghq.com/actions/private-action-runners
[32]: /es/dashboards/widgets/powerpack/#powerpack-permissions
[33]: https://app.datadoghq.com/reference-tables
[34]: https://app.datadoghq.com/rum/list
[35]: https://app.datadoghq.com/security/configuration/notification-rules
[36]: https://app.datadoghq.com/security/configuration/suppressions
[37]: https://app.datadoghq.com/sheets
[38]: https://app.datadoghq.com/workflow
[39]: /es/account_management/teams/manage/#team-hierarchies