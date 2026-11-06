---
description: Personalice las páginas de equipo, administre la membresía, configure
  subequipos y configure el acceso del equipo a través de proveedores de identidad
  o mapeo de atributos SAML.
title: Gestión de equipos
---
## Detalle del equipo {#team-detail}

Cada equipo tiene una página de detalles que muestra información sobre el equipo, sus miembros y sus recursos asociados. Navegue a la página de detalles de un equipo haciendo clic en un equipo del [Teams directory][1].

La página de detalles del equipo está organizada en tres pestañas:

- **Info**: Detalles principales del equipo y membresía.
- **Resources**: Los recursos de Datadog asociados con el equipo.
- **On-Call**: la configuración del equipo en [Datadog On-Call][6].

El encabezado del equipo muestra el avatar, el banner, el nombre y la descripción del equipo. Personalice la apariencia de su equipo eligiendo un avatar de emoji y un banner. El avatar de emoji se muestra junto al nombre del equipo en las listas de todo Datadog.

### Pestaña Info {#info-tab}

Detalles principales del equipo: canales de notificación, enlaces, conexiones, jerarquía (equipo principal y subequipos) y miembros.

### Pestaña Resources {#resources-tab}

Los recursos de Datadog que posee el equipo, agrupados por área como productividad, software, rendimiento y costo en la nube. Si el equipo tiene subequipos, use el interruptor **Include Subteams** para mostrar los recursos de los subequipos junto con los del propio equipo.

### Pestaña On-Call {#on-call-tab}

La configuración de [Datadog On-Call][6] del equipo: miembros, horarios, políticas de escalamiento, enrutamiento y automatización de traspasos.

### Personalizar configuración {#customize-settings}

Para modificar los detalles de un equipo, debe tener el permiso `user_access_manage` o `teams_manage`. Alternativamente, puede ser miembro o gerente de un equipo que esté configurado para permitir que los miembros y gerentes editen los detalles del equipo.

Edite los detalles de un equipo directamente desde su página de detalles:

- **Avatar, nombre y descripción**: pase el cursor sobre el nombre del equipo y haga clic en el icono de edición (lápiz).
- **Banner**: pase el cursor sobre el banner y haga clic en el icono de edición (lápiz).
- **Secciones de la pestaña Info**: pase el cursor sobre una sección, como Links, Members o Notification Channels, y haga clic en su icono de edición para actualizarla directamente.

Utilice el menú Settings (engranaje) en el encabezado del equipo para las siguientes acciones:

- **Configure Notifications**: Agregue o actualice los canales de notificación del equipo. Los destinos admitidos incluyen Slack, Microsoft Teams, PagerDuty, correo electrónico y ServiceNow.
- **Edit Roles and Permissions**: Administre los roles y permisos asociados con el equipo.
- **Edit Team Handle**: Cambie el identificador del equipo.
- **Edit Connections**: Conecte el equipo a sistemas externos. Conecte un **equipo de GitHub** para asociar el equipo de Datadog con un equipo de GitHub, o conecte un **grupo de asignación de ServiceNow** para enrutar incidentes y solicitudes de cambio automáticamente.
- **Join Team** o **Leave Team**: Incorpórese al equipo o salga de él.

## Membresía del equipo {#team-membership}

### Gerente del equipo {#team-manager}

Para diferenciar a los miembros de su equipo, designe a algunos de ellos como gerentes de equipo. En la lista de miembros, aparece una insignia de "TEAM MANAGER" junto a los nombres de los gerentes de equipo.

### Permisos de modificación del equipo {#team-modification-permissions}

En la configuración de roles y permisos del equipo, especifique qué usuarios pueden modificar la membresía del equipo. Las siguientes opciones están disponibles:
- Solo usuarios con el permiso `user_access_manage`
- Gerentes de equipo
- Gerentes de equipo y miembros
- Cualquiera de la organización

La lista está ordenada en orden de permisividad creciente. Cada opción de la lista incluye los grupos de las opciones anteriores. Por ejemplo, seleccionar "team managers" significa que tanto los gerentes de equipo como los usuarios con `user_access_manage` pueden modificar la membresía.

La opción que seleccione para determinar qué usuarios pueden agregar y eliminar miembros determina si puede agregar el equipo a las listas de control de acceso. Existen dos tipos de equipos: equipos solo por invitación y equipos abiertos.

Equipos solo por invitación
: Equipos con membresía restringida. Pueden establecerse como destinatarios de control de acceso. Se crean cuando restringe la modificación de la membresía del equipo a una de las tres primeras opciones.

Equipos abiertos
: Equipos con membresía sin restricciones. No pueden establecerse como destinatarios de control de acceso. Se crean cuando permite que {{< ui >}}Anyone in the organization{{< /ui >}} modifique la membresía del equipo.

Los usuarios con el permiso `user_access_manage` pueden establecer reglas predeterminadas sobre quién puede agregar o eliminar miembros o editar los detalles del equipo. Establezca reglas predeterminadas con el botón {{< ui >}}Default Settings{{< /ui >}} en la página del directorio de equipos. Anule estas políticas para un equipo individual en el panel de detalles del equipo.

### Equipos administrados fuera de Datadog {#teams-managed-outside-datadog}

En algunos casos, la membresía de un equipo no puede ser modificada directamente dentro de Datadog por nadie (incluyendo a un usuario con `user_access_manage`):
- Si su organización ha seleccionado SAML como la única fuente de aprovisionamiento de equipos, entonces las asignaciones de equipos de SAML controlan la membresía del equipo. Usted no puede modificar la membresía del equipo a través de Datadog.
- Si un equipo es gestionado a través de un proveedor de identidad, entonces el proveedor de identidad controla la membresía del equipo. Usted no puede modificar la membresía del equipo a través de Datadog.

Un equipo gestionado externamente por un proveedor de identidad muestra una insignia **Managed** en su encabezado.

#### Equipos con múltiples fuentes {#teams-with-multiple-sources}

Un equipo puede estar conectado a más de una fuente, aunque el tipo de fuente determina el nivel de control.

**Fuentes que gestionan el equipo**
- **Fuentes:** SCIM y SAML en modo exclusivo de SAML
- Un equipo se gestiona cuando SCIM lo aprovisiona o cuando su organización utiliza el aprovisionamiento exclusivo de SAML. La fuente controla el nombre, el identificador y la membresía del equipo. Usted no puede cambiarlos a través de Datadog u otra fuente. Otras fuentes pueden permanecer conectadas. Por ejemplo, usted puede enrutar incidentes desde [ServiceNow][12].

**Fuentes que sincronizan el equipo**
- **Fuentes:** [GitHub][9], [ServiceNow][12] y SAML cuando no es su única fuente de aprovisionamiento
- Estas fuentes sincronizan un equipo sin tomar el control exclusivo. Establecen el nombre, el identificador y la membresía del equipo. Usted aún puede conectar otras fuentes al equipo y cambiarlo desde la interfaz de usuario de Datadog, la [Teams API][10] o el [proveedor de Terraform][11]. Si más de una fuente sincroniza miembros al mismo equipo, Datadog combina los miembros de cada fuente.

<div class="alert alert-info">SCIM puede comenzar a administrar un equipo que ya se sincroniza desde GitHub o ServiceNow. El equipo permanece conectado a esa fuente, pero SCIM controla su nombre, identificador y membresía.</div>

<div class="alert alert-info">GitHub y ServiceNow actualizan el nombre de un equipo solo si ninguna fuente que lo administre controla el equipo. La fuente también debe haber creado el equipo con {{< ui >}}Import, create, and link teams{{< /ui >}}. Nunca cambian el identificador de un equipo después de que este se crea.</div>


## Jerarquías de equipos{#team-hierarchies}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
Esta función no es compatible con el sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).
</div>
{{< /site-region >}}

Cree un mapa de Teams para visualizar las jerarquías de equipos, anidando equipos dentro de otros (subequipos) para reflejar la estructura real de su empresa. El resultado es un modelo de propiedad más completo que una lista de equipos plana y desconectada. Los equipos relacionados, equipos principales, equipos hermanos y subequipos de un equipo aparecen en su página de equipo, en la sección **Hierarchy** de la pestaña **Info**. Para explorar el mapa completo de todos los equipos de su organización, consulte el [Teams map][7] en el Datadog Internal Developer Portal.

{{< img src="/account_management/teams/github/manage/teams-map.png" alt="Teams map que muestra una jerarquía de equipos principales y secundarios, con el panel de detalles de un equipo seleccionado que muestra sus miembros y subequipos" style="width:100%;" >}}

Con las jerarquías definidas, usted puede:

- **Escalar problemas**: Cuando un problema debe ir más allá del equipo propietario, la jerarquía lo dirige al equipo principal para una mayor visibilidad y una resolución más rápida, sin tener que buscar manualmente quién es el siguiente en la cadena.
- **Filtrado acumulativo**: Seleccione un equipo principal para ver todos los datos conectados a cualquiera de sus subequipos, sin tener que seleccionar cada uno. Útil para vistas de nivel de director y vicepresidente, donde le interesa la huella de toda una organización en lugar de la de un solo equipo.
- **Simplificar el control de acceso**: Otorgue acceso una vez a nivel de equipo principal para aplicar automáticamente permisos consistentes a todos los subequipos.

{{< img src="account_management/teams/teams_filter_hierarchies2.png" alt="Menú desplegable de filtro de equipo con un equipo principal expandido para mostrar sus subequipos seleccionados como casillas de verificación" style="width:35%;" >}}

### Configurar jerarquías de equipos {#set-up-team-hierarchies}

Puede definir relaciones jerárquicas entre equipos de cinco maneras:

- **GitHub Teams**: Si utilizó [GitHub][9] para configurar sus Datadog Teams y tiene jerarquías de equipos de GitHub configuradas, esos enlaces de equipo se sincronizan con Datadog automáticamente durante el aprovisionamiento y aparecen en su Teams map.
- **Grupos de asignación de ServiceNow**: Si utilizó [ServiceNow][12] para configurar sus Datadog Teams y sus grupos de asignación tienen grupos principales, esos enlaces se sincronizan con Datadog automáticamente durante el aprovisionamiento y aparecen en su Teams map.
- **API de Teams**: Consulte [Crear un vínculo de jerarquía entre equipos][5].
- **Terraform**: Utilice el recurso [`datadog_team_hierarchy_links`][8].
- **Interfaz de usuario de Datadog**: Defina las relaciones directamente en la página de un equipo:
   1. En la [página del directorio de equipos][1], haga clic en el equipo al que desea agregar una relación de subequipo o equipo principal.
   1. En la pestaña {{< ui >}}Info{{< /ui >}} de la página del equipo, haga clic en {{< ui >}}Edit{{< /ui >}} en la sección {{< ui >}}Hierarchy{{< /ui >}}.
   1. Seleccione los equipos principales o secundarios asociados con el equipo y, luego, haga clic en {{< ui >}}Save{{< /ui >}}.

## Límites {#limits}

- Una organización puede tener hasta 5,000 equipos.
- Una jerarquía de equipos puede tener hasta 10 niveles de profundidad.

## Administrar equipos a través de un proveedor de identidad {#manage-teams-through-an-identity-provider}

Cuando configura un equipo administrado, configura las siguientes propiedades del equipo externamente a través de una integración de proveedor de identidad:
 - Nombre del equipo
 - Identificador de equipo
 - Pertenencia al equipo (sincronizada desde el grupo correspondiente del proveedor de identidad)

Para mantener los equipos administrados consistentes con su configuración en su proveedor de identidad, realice cambios en las propiedades administradas en el proveedor de identidad en lugar de a través del sitio o la API de Datadog.

Datadog admite Okta y otros proveedores de identidad compatibles con SCIM para equipos administrados.

Para obtener más información sobre las capacidades de los equipos administrados y cómo configurarlos, consulte [SCIM][3].

## Asignación de atributos SAML {#saml-attribute-mapping}

Para administrar equipos y la pertenencia a los equipos mediante atributos SAML, consulte [Asignar atributos SAML a Teams][2].

## Delegar la gestión de equipos {#delegate-team-management}

Para un modelo de membresía abierta, configure los ajustes predeterminados de su equipo para que {{< ui >}}Anyone in the organization{{< /ui >}} puedan agregar o eliminar miembros. Asigne el permiso `teams_manage` a los roles correspondientes para permitir que cualquier persona cree equipos o edite los detalles del equipo.

Si prefiere un modelo en el que el equipo gestione la pertenencia de sus miembros, configure los ajustes predeterminados de su equipo para que {{< ui >}}Team Managers{{< /ui >}} o {{< ui >}}Team Managers and Members{{< /ui >}} puedan agregar o eliminar miembros. Asigne el permiso `teams_manage` a un rol que contenga a todos sus gerentes de equipo.

Para aplicar un modelo de membresía estricto, configure los ajustes predeterminados de su equipo para que {{< ui >}}Only users with user_access_manage{{< /ui >}} puedan agregar o eliminar miembros. Asigne el permiso `teams_manage` solo a los administradores de la organización.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /es/account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /es/account_management/scim/
[5]: /es/api/latest/teams/create-a-team-hierarchy-link/
[6]: /es/incident_response/on-call/
[7]: https://app.datadoghq.com/software?selectedComponent=team
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_hierarchy_links
[9]: /es/account_management/teams/github/
[10]: /es/api/latest/teams/
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: /es/account_management/teams/servicenow/