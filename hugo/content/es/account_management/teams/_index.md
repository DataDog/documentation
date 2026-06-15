---
description: Organiza los activos del equipo, filtra las experiencias de Datadog y
  gestiona la membresía del equipo con identificadores de equipo, notificaciones y
  asociaciones de recursos.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Mantén la propiedad del servicio actualizada con la integración de GitHub
    de los Equipos de Datadog
title: Equipos
---
## Resumen {#overview}
Los Equipos de Datadog permiten a grupos de usuarios organizar sus activos de equipo dentro de Datadog y filtrar automáticamente su experiencia en Datadog para priorizar estos activos.

Utiliza Equipos para vincular recursos como tableros, servicios, seguimientos e incidentes a un grupo de usuarios. También puedes agregar enlaces específicos del equipo a canales de Slack, tableros de Jira, repositorios de GitHub y más.

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

1. En la [página del directorio de equipos][1], haz clic en el equipo que deseas modificar. Aparece la [página de detalles del equipo][3]. 
1. Haz clic en el engranaje {{< ui >}}Settings{{< /ui >}} en la parte superior de la pantalla. Aparece una ventana emergente.
1. Selecciona el elemento que deseas modificar.
1. Realiza tus cambios, luego haz clic en {{< ui >}}Save{{< /ui >}}.

### Elige la fuente de aprovisionamiento {#choose-provisioning-source}

Elige entre tres opciones para determinar cómo los administradores y gerentes de equipo pueden actualizar la membresía del equipo:

UI y API
: Actualice la membresía solo a través de acciones de UI y llamadas a la API

SAML
: Utilice un modelo *SAML estricto* para que los datos del proveedor de identidad determinen la membresía del equipo.

Todas las fuentes
: Utiliza SAML como punto de partida y permite sobrescrituras a través de la interfaz de usuario y la API

1. En la [página del directorio de equipos][1], haz clic en {{< ui >}}Teams Settings{{< /ui >}}.
1. Selecciona una de las opciones bajo {{< ui >}}Team Provisioning Sources{{< /ui >}}.

Si tienes equipos con miembros existentes, elegir la opción estricta de SAML sobrescribe tus configuraciones y elimina a los miembros de esos equipos. Elegir la opción Todas las fuentes preserva las membresías existentes. Para gestionar equipos y la membresía de equipos utilizando atributos SAML, consulta [Mapear atributos SAML a Equipos][4].

## Identificador de equipo {#team-handle}

Un identificador de equipo vincula equipos a recursos de Datadog. Los identificadores de equipo aparecen en las barras de búsqueda y facetas en el formato `team:<team-handle>` o `teams:<team-handle>`. 

Para encontrar un identificador de equipo:
1. Haz clic en el nombre del equipo en la página del directorio de equipos. Aparece la página de detalles del equipo.
1. El identificador de equipo aparece a la derecha del nombre, en la parte superior de la página.

Para asociar un recurso con un equipo definido, debe existir un equipo en Datadog con un identificador de equipo coincidente. Cuando haces clic en un recurso asociado con un equipo definido, aparece una ventana pequeña con el identificador de equipo y información adicional. Los equipos definidos proporcionan funcionalidad adicional, como el filtro de equipo a continuación. 

Los identificadores de equipo que no están asociados con un equipo definido en Datadog se comportan de manera similar a las etiquetas. Convierte cualquier identificador de equipo indefinido en equipos definidos para aprovechar las características de Teams.

### Asocia recursos con identificadores de equipo {#associate-resources-with-team-handles}

Datadog admite asociar los siguientes recursos con los identificadores de equipo:

- [Dashboards][5]
- [Incidentes][6]
- [Seguimientos][7]
- [Resource Catalog][8]
- [Software Catalog][9]
- [SLO][10]
- Pruebas Synthetic, Variables Globales, Ubicaciones Privadas

### Enviar notificaciones a un canal de comunicación específico {#send-notifications-to-a-specific-communication-channel}

Agrega un canal de notificación a tu equipo para dirigir alertas a canales de comunicación como Slack o Microsoft Teams. Las alertas de seguimiento dirigidas a `@team-<handle>` se redirigen al canal seleccionado. 

1. En la [página del directorio de equipos][1], haz clic en el equipo que deseas modificar. 
1. Haz clic en el {{< ui >}}Settings{{< /ui >}} engranaje en la parte superior de la pantalla. Aparece una ventana emergente.
1. Selecciona {{< ui >}}Notifications{{< /ui >}}.
1. Agrega un canal, luego haz clic en {{< ui >}}Save{{< /ui >}}.

## Filtro de equipo {#team-filter}

El filtro de equipo adapta tu experiencia en Datadog al mostrarte contenido asociado con tus equipos. La lista {{< ui >}}My Teams{{< /ui >}} incluye equipos de los que eres miembro y equipos que seleccionaste como favoritos.

{{< img src="/account_management/teams/team-filter.png" alt="Página de lista de seguimientos con un cuadro rojo alrededor del filtro de equipo. Dos de tres Mis Equipos seleccionados.">}}

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

La siguiente tabla describe los productos en los que puedes usar el filtro de equipos:

| Página de lista de productos              | Base de filtro                                                                       |
|--------------------------------|------------------------------------------------------------------------------------|
| [APM Error Tracking][15]       | Service owned by teams (determined by ownership inside the [Software Catalog][12]) |
| [Apps][21]                     | Identificador de equipo                                                                        |
| [Case Management projects][22] | Identificador de equipo                                                                        |
| [Connections][23]              | Identificador de equipo                                                                        |
| [Connection Groups][24]        | Identificador de equipo                                                                        |
| [Cross Org Connections][25]    | Identificador de equipo                                                                        |
| [Datastores][26]               | Identificador de equipo                                                                        |
| [Data Streams Monitoring][18]  | Identificador de equipo                                                                        |
| [Dashboards][11]               | Identificador de equipo                                                                        |
| [Incidentes][13]                | Identificador de equipo                                                                        |
| [Integrations][27]             | Identificador de equipo                                                                        |
| [Logs Error Tracking][16]      | Servicio propiedad de equipos (determinado por la propiedad dentro del [Software Catalog][12]) |
| [Logs Pipelines][28]           | Identificador de equipo                                                                        |
| [Monitors][14]                 | Identificador de equipo                                                                        |
| [Notebooks][20]                | Identificador de equipo                                                                        |
| [Observability Pipelines][29]  | Identificador de equipo                                                                        |
| [On-Call][30]                  | Servicio propiedad de equipos (determinado por la propiedad dentro del [Software Catalog][12]) |
| [Powerpacks][32]               | Identificador de equipo                                                                        |
| [Private Action Runner][31]    | Identificador de equipo                                                                        |
| [Tablas de referencia][33]         | Identificador de equipo                                                                        |
| [Resource Catalog][8]          | Identificador de equipo                                                                        |
| [RUM apps][34]                 | Identificador de equipo                                                                        |
| [Security rules][35]           | Identificador de equipo                                                                        |
| [Security suppressions][36]    | Identificador de equipo                                                                        |
| [Service Level Objectives][17] | Identificador de equipo                                                                        |
| [Sheets][37]                   | Identificador de equipo                                                                        |
| [Software Catalog][12]         | Identificador de equipo                                                                        |
| [Synthetic Tests][19]          | Identificador de equipo                                                                        |
| [Flujos de trabajo][38]                | Identificador de equipo                                                                        |


## Permisos {#permissions}

Cualquier usuario en un rol con el permiso Teams Manage puede crear equipos, renombrar equipos, eliminar equipos y cambiar los identificadores de equipo. Los usuarios con `user_access_manage` pueden agregar, eliminar y promover miembros y gerentes de equipo.

## Manage teams {#manage-teams}

Para personalizar tu equipo, consulta [Team Management][3].


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