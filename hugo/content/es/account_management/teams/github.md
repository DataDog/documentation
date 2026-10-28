---
description: Habilite el aprovisionamiento automático de Datadog Teams basado en la
  estructura de equipos de GitHub de una organización, incluidos los equipos anidados.
  Permita que Datadog utilice GitHub como fuente para los datos de Datadog Teams.
further_reading:
- link: /integrations/github/
  tag: Documentación
  text: Integración con GitHub
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Mantenga actualizada la propiedad del servicio con la integración de GitHub
    de Datadog Teams
title: Aprovisione Datadog Teams con GitHub
---
## Descripción general {#overview}

Vincule sus equipos de GitHub a Datadog Teams para aprovisionar automáticamente Datadog Teams. Las siguientes funciones son compatibles:
- Cree Datadog Teams según la configuración de sus equipos de GitHub.
- Sincronice la membresía de Datadog Teams entre Datadog y GitHub. Requiere que los usuarios individuales conecten sus cuentas de Datadog a GitHub.

Datadog vincula los equipos existentes realizando una coincidencia exacta de nombres entre los slugs de equipo de GitHub y los [handles][1] de equipo de Datadog Teams. La coincidencia no distingue entre mayúsculas y minúsculas e ignora las diferencias de espacios en blanco.

Si sus equipos de GitHub tienen una estructura jerárquica, Datadog replica esa misma estructura durante el aprovisionamiento.

**Nota:** En Datadog, un subequipo debe ser tan restrictivo o más restrictivo que su equipo principal. Por ejemplo, un subequipo no puede ser [abierto][2] si el equipo principal es [solo por invitación][2].

Datadog solo lee los equipos de GitHub. Datadog nunca modifica, crea ni elimina equipos de GitHub.

## Requisitos previos {#prerequisites}

### Integración con GitHub {#github-integration}
Asegúrese de que su organización de Datadog esté [conectada][3] a una organización de GitHub. Su integración de GitHub debe tener el permiso `members_read` para leer datos de Datadog Teams.

<div class="alert alert-info">Se admiten clientes de GitHub Enterprise Cloud y GitHub Enterprise Server. Sin embargo, los equipos administrados por la empresa (equipos gestionados a nivel de empresa de GitHub en varias organizaciones) no son compatibles. Solo los equipos de GitHub a nivel de organización pueden aprovisionarse en Datadog.</div>

### Permisos {#permissions}
- Para vincular y crear Datadog Teams, su usuario de Datadog debe tener el permiso `teams_manage`. 
- Para administrar la membresía de Datadog Teams, su usuario de Datadog debe tener el permiso `user_access_manage`.

## Configuración {#setup}

### Conecte equipos de GitHub a Datadog Teams {#connect-github-teams-to-datadog-teams}
1. Navegue a [Teams][4].
1. En la parte superior derecha, haga clic en {{< ui >}}GitHub Connections{{< /ui >}}.
1. Configure su conexión seleccionando opciones para el tipo de importación, sincronización de miembros y cadencia.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Visualizar Datadog Teams {#view-datadog-teams}
1. Navegue a [GitHub Connections][5].
1. Si la lista de Datadog Teams creados y vinculados está vacía, haga clic en {{< ui >}}Refresh{{< /ui >}}.
1. Opcionalmente, actualice manualmente Datadog Teams para alcanzar el estado deseado. 

### Configuración de usuario {#user-configuration}

Después de que un administrador habilite el aprovisionamiento de equipos desde GitHub, aparece una notificación en la página de detalles del equipo. La notificación solicita a los usuarios {{< ui >}}Log in to GitHub{{< /ui >}} que conecten sus cuentas de Datadog a GitHub a través de OAuth.

{{< img src="account_management/teams/github/connect-to-github-v2.png" alt="Cuadro 'Not Connected to GitHub' con botón para 'Log in to GitHub'" style="width:60%;">}}

Cada usuario debe vincular manualmente su cuenta de GitHub a Datadog para establecer la conexión entre Datadog y GitHub. Este comportamiento es requerido por las políticas de privacidad de usuario y OAuth de GitHub.

Después de que un usuario vincula sus cuentas, Datadog agrega al usuario a cualquier Datadog Teams que corresponda a los equipos de GitHub en los que el usuario sea miembro.

Por ejemplo, suponga que el usuario B es miembro del equipo A en GitHub. La siguiente secuencia ocurre en Datadog:
1. Un administrador habilita el aprovisionamiento de Datadog Teams y la sincronización de usuarios desde GitHub.
1. El equipo A se crea en Datadog, vacío.
1. El usuario B ve una notificación para {{< ui >}}Log in to GitHub{{< /ui >}} y la sigue.
1. El usuario B es aprovisionado en el equipo A en Datadog.

## Eliminación de equipos {#deleting-teams}

Eliminar un equipo de GitHub no elimina el Datadog Teams correspondiente. En su lugar, Datadog:
- Elimina a todos los miembros sincronizados de Datadog Teams.
- Elimina la conexión entre Datadog Teams y el equipo de GitHub eliminado.
- Elimina cualquier vínculo jerárquico (relaciones padre/hijo) que se haya sincronizado desde GitHub.

El Datadog Teams en sí permanece y puede seguir gestionándose de forma independiente.

### Ejemplo {#example}
1. El equipo A existe en GitHub y está sincronizado con Datadog (ya sea creado automáticamente o vinculado manualmente).
1. El equipo A se elimina en GitHub.
1. En Datadog, se eliminan los miembros sincronizados del equipo A, la conexión de GitHub y los vínculos jerárquicos.
1. El equipo A permanece en Datadog y puede gestionarse de forma independiente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/teams/#team-handle
[2]: /es/account_management/teams/manage/#team-modification-permissions
[3]: /es/integrations/github/#connect-github-teams-to-datadog-teams
[4]: https://app.datadoghq.com/organization-settings/teams
[5]: https://app.datadoghq.com/organization-settings/teams/github-connections?github-connections__view=synced