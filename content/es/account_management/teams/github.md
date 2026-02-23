---
description: Permite el aprovisionamiento automático de Datadog Teams en función de
  la estructura del equipo de GitHub de una organización, incluyendo los equipos anidados.
  Permite que Datadog utilice GitHub como fuente de datos de Teams.
further_reading:
- link: /integrations/github/
  tag: Documentación
  text: Integración de GitHub
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Mantener al día la propiedad de la integración de GitHub con Datadog Teams
title: Aprovisionar Datadog Teams con GitHub
---

## Información general

Vincula tus equipos de GitHub con Datadog Teams para aprovisionar automáticamente Datadog Teams. Se admiten las siguientes funciones:
- Crear Datadog Teams en función de tu configuración de equipos de GitHub.
- Sincronizar la pertenencia a un equipo entre Datadog y GitHub. Requiere que los usuarios individuales conecten sus cuentas de Datadog a GitHub.

Datadog vincula los equipos existentes mediante una coincidencia de nombres exacta entre slugs de equipo de GitHub e [identificadores][1] de Datadog Teams. La coincidencia no tiene en cuenta mayúsculas y minúsculas e ignora las diferencias de espacios en blanco.

Si tus equipos de GitHub tienen una estructura de equipo jerárquica, Datadog replica esa misma estructura durante el aprovisionamiento.

**Nota:** En Datadog, un subequipo debe ser tan restrictivo o más que su equipo principal. Por ejemplo, un subequipo no puede ser [abierto][2] si el equipo principal es [solo con invitación][2].

Datadog solo lee equipos de GitHub. Datadog nunca modifica, crea o borra equipos de GitHub.

## Requisitos previos

### Integración de GitHub
Asegúrate de que tu organización Datadog está [conectada][3] a una organización GitHub. Tu integración de GitHub debe tener el permiso `members_read` para leer datos del equipo.

### Permisos
- Para vincular y crear equipos, tu usuario de Datadog debe tener el permiso `teams_manage`. 
- Para gestionar la pertenencia a un equipo, el usuario de Datadog debe tener el permiso `user_access_manage`.

## Instalación

### Conectar equipos de GitHub a Datadog Teams
1. Ve a [Teams][4].
1. En la parte superior derecha, haz clic en **GitHub Connections** (Conexiones GitHub).
1. Configura tu conexión seleccionando las opciones de tipo de importación, miembros de sincronización y cadencia.
1. Haz clic en **Save** (Guardar).

### Visualizar Datadog Teams
1. Ve a [GitHub Connections (Conexiones GitHub)][5].
1. Si la lista de equipos creados y vinculados está vacía, haz clic en **Refresh** (Actualizar).
1. Opcionalmente, actualiza manualmente Datadog Teams para alcanzar el estado deseado. 

### Configuración del usuario

Una vez que un administrador habilite el aprovisionamiento de equipos desde GitHub, aparecerá una notificación en la página de información del equipo. La notificación pide a los usuarios que **inicien sesión en GitHub** para que conecten sus cuentas de Datadog a GitHub a través de OAuth.

{{< img src="account_management/teams/github/connect-to-github.png" alt="'Cuadro 'Not Connected to GitHub' (No conectado a GitHub) con el botón para 'iniciar sesión en GitHub'" style="width:60%;">}}

Cada usuario debe vincular manualmente su cuenta de GitHub a Datadog para establecer la conexión entre Datadog y GitHub. Este comportamiento es requerido por las políticas OAuth y de privacidad del usuario de GitHub.

Después de que un usuario vincule sus cuentas, Datadog añade el usuario a cualquier Datadog Teams que corresponda a equipos de GitHub donde el usuario es miembro.

Por ejemplo, supongamos que el usuario B es miembro del equipo A en GitHub. La siguiente secuencia se produce en Datadog:
1. Un administrador habilita el aprovisionamiento y la sincronización de usuarios de Datadog Teams desde GitHub.
1. El equipo A se crea en Datadog, vacío.
1. El usuario B ve una notificación para **iniciar sesión en GitHub** y la sigue.
1. El usuario B es aprovisionado en el equipo A en Datadog.

## Eliminación de equipos

La conexión automática de GitHub solo gestiona los recursos que ha creado.

Si un equipo se ha creado manualmente en Datadog y posteriormente se ha vinculado a un equipo de GitHub, al eliminar ese equipo de GitHub no se elimina el Datadog Team.

Sin embargo, si un equipo fue creado originalmente por la sincronización automática de GitHub, y ese equipo de GitHub se elimina, Datadog también elimina el equipo correspondiente para mantener la coherencia.

### Ejemplos
Los siguientes ejemplos muestran los diferentes resultados al eliminar equipos creados en Datadog con respecto a GitHub. 

Equipo creado en Datadog:
1. Un administrador crea el equipo A en Datadog.
1. El equipo A está vinculado a un equipo de GitHub.
1. El equipo A se elimina en GitHub.
1. El equipo A permanece en Datadog, pero no está vinculado a ningún equipo de GitHub.

Equipo creado automáticamente desde GitHub:
1. En Datadog, el equipo B se crea automáticamente a partir de GitHub.
1. El equipo B se elimina en GitHub.
1. El equipo B se elimina automáticamente en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/teams/#team-handle
[2]: /es/account_management/teams/manage/#team-modification-permissions
[3]: /es/integrations/github/#connect-github-teams-to-datadog-teams
[4]: https://app.datadoghq.com/organization-settings/teams
[5]: https://app.datadoghq.com/organization-settings/teams/github-connections?github-connections__view=synced