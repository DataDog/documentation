---
description: Organiza los activos del equipo, filtra las experiencias de Datadog y
  gestiona la membresía del equipo con manejadores de equipo, notificaciones y asociaciones
  de recursos.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Mantén la propiedad del servicio actualizada con la integración de GitHub
    de los Equipos de Datadog
title: Teams
---
## Resumen {#overview}
Los Equipos de Datadog permiten a grupos de usuarios organizar sus activos de equipo dentro de Datadog y filtrar automáticamente su experiencia en Datadog para priorizar estos activos.

Utiliza Equipos para vincular recursos como tableros, servicios, monitores e incidentes a un grupo de usuarios. También puedes agregar enlaces específicos del equipo a canales de Slack, tableros de Jira, repositorios de GitHub y más.

La membresía del equipo es flexible. Los usuarios pueden unirse a equipos, ser añadidos por otros miembros o ser añadidos por un administrador. Los usuarios pueden pertenecer a múltiples equipos.

## Configuración {#setup}

### Navegación {#navigation}

Accede a la página del directorio del equipo desde [Configuraciones de la Organización][1] o navegando a [**Equipos**][2]. La [página del directorio del equipo][1] lista todos los equipos dentro de tu organización.

### Crear equipo {#create-team}

1. En la [página del directorio del equipo][1], haz clic en {{< ui >}}New Team{{< /ui >}} en la esquina superior derecha.
1. Elige un {{< ui >}}Team Name{{< /ui >}}.
1. El {{< ui >}}Handle{{< /ui >}} se completa según el nombre de tu equipo.
1. Utiliza el menú desplegable para seleccionar miembros del equipo y gerentes del equipo.
1. Proporciona un {{< ui >}}Description{{< /ui >}} opcional.
1. Haz clic en {{< ui >}}Create{{< /ui >}}.

**Notas**: 

- Los caracteres permitidos para los nombres de equipo son `a-z`, `A-Z`, `0-9` y `._-:/`. Reemplace los espacios con guiones bajos. 
- Los caracteres permitidos para los identificadores de equipo son `a-z`, `0-9` y `._-:/`. El último carácter no puede ser un guion bajo.

### Modifica el equipo {#modify-team}

1. En la [página del directorio del equipo][1], haz clic en el equipo que deseas modificar. Aparece la [página de detalles del equipo][3]. 
1. Haz clic en el engranaje {{< ui >}}Settings{{< /ui >}} en la parte superior de la pantalla. Aparece una ventana emergente.
1. Selecciona el elemento que deseas modificar.
1. Realiza tus cambios, luego haz clic en {{< ui >}}Save{{< /ui >}}.

### Elija la fuente de aprovisionamiento {#choose-provisioning-source}

Elija entre tres opciones para determinar cómo los administradores y gerentes de equipo pueden actualizar la membresía del equipo:

UI y API
: Actualice la membresía solo a través de acciones de UI y llamadas a la API

SAML
: Usa un *SAML estricto* para que los datos del proveedor de identidad determinen la membresía del equipo.

Todas las fuentes
: Utiliza SAML como punto de partida y permite sobrescrituras a través de la interfaz de usuario y la API

1. En la [página del directorio de equipos][1], haz clic en {{< ui >}}Teams Settings{{< /ui >}}.
1. Selecciona una de las opciones bajo {{< ui >}}Team Provisioning Sources{{< /ui >}}.

Si tienes equipos con miembros existentes, elegir la opción estricta de SAML sobrescribe tus configuraciones y elimina a los miembros del equipo de esos equipos. Elegir la opción Todas las Fuentes preserva las membresías existentes. Para gestionar equipos y la membresía del equipo utilizando atributos SAML, consulta [Mapear atributos SAML a Equipos][4].

## Manejador de equipo {#team-handle}

Un manejador de equipo vincula equipos a recursos de Datadog. Los manejadores de equipo aparecen en las barras de búsqueda y facetas en el formato `team:<team-handle>` o `teams:<team-handle>`. 

Para encontrar un manejador de equipo:
1. Haz clic en el nombre del equipo en la página del directorio de equipos. Aparece la página de detalles del equipo.
1. El manejador de equipo aparece a la derecha del nombre, en la parte superior de la página.

Para asociar un recurso con un equipo definido, debe existir un equipo en Datadog con un manejador de equipo coincidente. Cuando haces clic en un recurso asociado con un equipo definido, aparece una ventana pequeña con el manejador de equipo y información adicional. Los equipos definidos proporcionan funcionalidad adicional, como el filtro de equipo a continuación. 

Los manejadores de equipo que no están asociados con un equipo definido en Datadog se comportan de manera similar a las etiquetas. Convierte cualquier manejador de equipo indefinido en equipos definidos para aprovechar las características de Equipos.

### Asocia recursos con manejadores de equipo {#associate-resources-with-team-handles}

Datadog admite asociar los siguientes recursos con manejadores de equipo:

- [Dashboards][5]
- [Incidentes][6]
- [Monitors][7]
- [Resource Catalog][8]
- [Software Catalog][9]
- [Service Level Objectives][10]
- Pruebas Synthetic, variables globales, ubicaciones privadas

### Enviar notificaciones a un canal de comunicación específico {#send-notifications-to-a-specific-communication-channel}

Agrega un canal de notificación a tu equipo para dirigir alertas a canales de comunicación como Slack o Microsoft Teams. Las alertas de monitor dirigidas a `@team-<handle>` se redirigen al canal seleccionado. 

1. En la [página del directorio de equipos][1], haz clic en el equipo que deseas modificar. 
1. Haz clic en el engranaje {{< ui >}}Settings{{< /ui >}} en la parte superior de la pantalla. Aparece una ventana emergente.
1. Selecciona {{< ui >}}Notifications{{< /ui >}}.
1. Agrega un canal, luego haz clic en {{< ui >}}Save{{< /ui >}}.

## Filtro de equipo {#team-filter}

El filtro de equipo adapta tu experiencia en Datadog al mostrarte contenido asociado con tus equipos. La lista {{< ui >}}My Teams{{< /ui >}} incluye equipos de los que eres miembro y equipos que seleccionaste como favoritos.

{{< img src="/account_management/teams/team-filter.png" alt="Página de lista de monitores con un cuadro rojo alrededor del filtro de equipo. Dos de tres My Teams seleccionados.">}}

Cuando habilitas el filtro de equipo, solo ves los recursos asociados con tus equipos o con los servicios que pertenecen a tus equipos. El estado del filtro de equipo es global y persistente, por lo que Datadog aplica tu contexto de equipo mientras navegas por diferentes productos.

El filtro de equipo funciona añadiendo términos de búsqueda basados en el equipo a la consulta de búsqueda. Cuando habilitas el filtro de equipo, puedes ver los términos de búsqueda basados en el equipo que se añaden en la barra de búsqueda.

### Equipos favoritos {#favorite-teams}

Puedes estar interesado en los recursos de un equipo en particular sin ser miembro de ese equipo. Agregar un equipo a tus equipos favoritos te permite obtener vistas filtradas de los recursos de ese equipo sin unirte al equipo.

Tus equipos favoritos aparecen junto a los equipos a los que perteneces en la parte superior de la página del directorio de equipos y en el filtro de equipo.

#### Agregar o quitar equipos favoritos {#add-or-remove-favorite-teams}

Puedes agregar o quitar un equipo de tus favoritos desde la página del directorio de equipos o desde el filtro de equipo.

Desde la [página del directorio de equipos][1]:
1. Haz clic en el equipo que deseas agregar como favorito. Aparece la [página de detalles del equipo][3].
1. Haz clic en {{< ui >}}Add Favorite{{< /ui >}} o {{< ui >}}Remove Favorite{{< /ui >}} en la esquina superior derecha.

Alternativamente, también desde la página del directorio de equipos:
1. Pasa el cursor sobre el equipo que deseas agregar o quitar. Los íconos en línea aparecen a la derecha del nombre del equipo.
1. Haz clic en el ícono de estrella ({{< ui >}}Add to Favorites{{< /ui >}} o {{< ui >}}Remove from Favorites{{< /ui >}}).

Desde el filtro de equipo:
1. Si el filtro está colapsado, haz clic en {{< ui >}}My Teams{{< /ui >}} para expandirlo.
1. Haz clic en {{< ui >}}Add Favorites{{< /ui >}}. Aparece un cuadro de búsqueda y una lista de equipos.
1. Para reducir la lista de equipos, comienza a escribir el nombre de un equipo en el cuadro de búsqueda.
1. Haz clic en la estrella junto al equipo deseado para agregarlo o quitarlo de tus favoritos.

### Productos soportados {#supported-products}

La siguiente tabla describe los productos en los que puede usar el filtro de equipos:

| Página de lista de productos              | Base de filtro                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | Servicio propiedad de Teams (determinado por la propiedad dentro del [Software Catalog][12]) |
| [Apps][21]                     | Team handle                                                                        |
| [Case Management projects][22] | Team handle                                                                        |
| [Connections][23]              | Team handle                                                                        |
| [Connection Groups][24]        | Team handle                                                                        |
| [Cross Org Connections][25]    | Team handle                                                                        |
| [Datastores][26]               | Team handle                                                                        |
| [Data Streams Monitoring][18]  | Team handle                                                                        |
| [Dashboards][11]               | Team handle                                                                        |
| [Incidents][13]                | Team handle                                                                        |
| [Integrations][27]             | Team handle                                                                        |
| [Logs Error Tracking][16]      | Servicio propiedad de Teams (determinado por la propiedad dentro del [Software Catalog][12]) |
| [Logs Pipelines][28]           | Team handle                                                                        |
| [Monitors][14]                 | Team handle                                                                        |
| [Notebooks][20]                | Team handle                                                                        |
| [Observability Pipelines][29]  | Team handle                                                                        |
| [On-Call][30]                  | Servicio propiedad de Teams (determinado por la propiedad dentro del [Software Catalog][12]) |
| [Powerpacks][32]               | Team handle                                                                        |
| [Private Action Runner][31]    | Team handle                                                                        |
| [Reference tables][33]         | Team handle                                                                        |
| [Resource Catalog][8]          | Team handle                                                                        |
| [RUM apps][34]                 | Team handle                                                                        |
| [Security rules][35]           | Team handle                                                                        |
| [Security suppressions][36]    | Team handle                                                                        |
| [Service Level Objectives][17] | Team handle                                                                        |
| [Sheets][37]                   | Team handle                                                                        |
| [Software Catalog][12]         | Team handle                                                                        |
| [Synthetic Tests][19]          | Team handle                                                                        |
| [Workflows][38]                | Team handle                                                                        |


## Permisos {#permissions}

Cualquier usuario en un rol con el permiso Teams Manage puede crear Teams, renombrar Teams, eliminar Teams y cambiar Team handles. Los usuarios con `user_access_manage` pueden agregar, eliminar y promover miembros y managers de Teams.

## Manage teams {#manage-teams}

Para personalizar su equipo, consulte [Team Management][3].


[1]: https://app.datadoghq.com/organization-settings/teams
[2]: https://app.datadoghq.com/teams
[3]: /es/account_management/teams/manage/
[4]: /es/account_management/saml/mapping/#map-saml-attributes-to-teams
[5]: /es/dashboards/#dashboard-details
[6]: /es/incident_response/incident_management/
[7]: /es/monitors/configuration/?tab=thresholdalert#add-metadata
[8]: https://app.datadoghq.com/infrastructure/catalog
[9]: /es/tracing/software_catalog/adding_metadata/#add-metadata-from-the-datadog-ui
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
[22]: https://app.datadoghq.com/cases
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