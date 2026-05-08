---
algolia:
  tags:
  - flujo de trabajo
  - flujos de trabajo
  - automatización del flujo de trabajo
aliases:
- /es/workflows/access
- /es/workflows/service_accounts
description: Acceso y autenticación para Workflow Automation
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Empezando con Workflow Automation
- link: /integrations/
  tag: Documentación
  text: Más información sobre integraciones
- link: /actions/actions_catalog
  tag: Documentación
  text: Consulta la lista de acciones de flujo de trabajo
title: Acceso y autenticación
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de los flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Algunas herramientas controlan el acceso y la autenticación de los flujos de trabajo y sus componentes.

## Identidad del flujo de trabajo

Un flujo de trabajo puede ejecutarse utilizando la identidad del propietario del flujo de trabajo o una cuenta de servicio asociada al flujo de trabajo. Por defecto, un flujo de trabajo utiliza la identidad de usuario Datadog de su autor.

### Utiliza una cuenta de servicio 

Una cuenta de servicio puede asociarse a un flujo de trabajo y actuar como la identidad del flujo de trabajo cuando se ejecuta. Una cuenta de servicio puede:
- resolver las conexiones definidas en las acciones del flujo de trabajo en tiempo de ejecución
- proporcionar una identidad para las ejecuciones del flujo de trabajo
- proporcionar una identidad para el flujo de trabajo [audit trails (pistas de auditoría)][1]

Para crear una cuenta servicio para un flujo de trabajo, debes tener el rol de administrador Datadog, o un rol personalizado con el permiso **Service Account Write** (Escritura de cuenta de servicio). La cuenta servicio que crees adoptará tu rol y permisos. Para obtener más información sobre las cuentas y permisos de servicio, consulta [Service accounts (cuentas de servicio)][2] o [Role based access control (control de acceso basado en roles)][3].

#### Asociar una cuenta de servicio a un flujo de trabajo

Puedes crear dinámicamente una cuenta de servicio para tu flujo de trabajo cuando [add an automatic trigger (añadas un activador automático)][4].

1. Haz clic en el icono de engranaje (**Settings** [ajustes]).
1. Haz clic en **Create a service account** (crear una cuenta de servicio).
1. Selecciona un rol para el usuario de tu cuenta de servicio.
1. Haz clic en **Create** (crear) para guardar la cuenta de servicio.
1. Guarda tu flujo de trabajo para aplicar los cambios.

Cuando se ejecuta un flujo de trabajo, el usuario de la cuenta de servicio resuelve las conexiones definidas en las acciones del flujo de trabajo. Por lo tanto, el usuario de la cuenta de servicio necesita el permiso `connections_resolve`. El rol de administrador Datadog y el rol estándar Datadog incluyen el permiso `connections_resolve`.

#### Ver los detalles de la cuenta de servicio 

1. Haz clic en el icono de engranaje (**Settings** [ajustes]).
1. Selecciona tu cuenta de servicio en el menú desplegable.

#### Eliminar una cuenta de servicio asociada a un flujo de trabajo

1. Haz clic en el icono de engranaje (**Settings** [ajustes]).
1. Selecciona tu cuenta de servicio en el menú desplegable.
1. Haz clic en **Remove service account** (eliminar cuenta de servicio).

## Credenciales de acción

Dado que las [actions (acciones)][5] del flujo de trabajo se conectan con sistemas de software externos, es posible que tengas que autenticar tu cuenta Datadog en la integración correspondiente. Un flujo de trabajo solo puede ejecutarse correctamente si todas las acciones de flujo de trabajo que requieren autenticación pueden verificar la identidad de tu cuenta Datadog.

Las acciones de flujo de trabajo pueden autenticarse de dos maneras:
- Credenciales y permisos configurados en el cuadro de integración
- Credenciales de conexión

Para obtener más información sobre la configuración de credenciales, consulta [Connections (conexiones)][6].

## Permisos de flujo de trabajo

Utiliza [role-based access control (RBAC) (control de acceso basado en roles [RBAC])][3] para controlar el acceso a tus flujos de trabajo y conexiones. Para ver la lista de permisos que se aplican a los flujos de trabajo y las conexiones, consulta [Datadog Role Permissions (permisos de rol de Datadog)][7].

Por defecto, el autor de un flujo de trabajo o conexión es el único usuario que recibe acceso de **Editor**. El resto de la organización Datadog recibe acceso de **Viewer** (visor) al flujo de trabajo o conexión.

### Restringir el acceso a una conexión específica

Establece permisos en cada conexión para limitar las modificaciones o restringir su uso. Los permisos granulares incluyen **Viewer** (visor), **Resolver** (Resolvedor) y **Editor**. Por defecto, solo el autor de la conexión recibe acceso de **Editor**. El autor puede optar por conceder acceso a usuarios, funciones o equipos adicionales.

Visor
: Puede ver la conexión

Resolvedor
: Puede resolver y ver la conexión

Editor
: Puede editar, resolver y ver la conexión

Resolver una conexión incluye obtener el objeto de conexión asignado a un paso y recuperar el secreto asociado a él.

Sigue los pasos a continuación para modificar los permisos de una conexión específica:

1. Navega hasta la [Workflow Automation page (página Workflow Automation)][8].
1. Haz clic en **Connections** (conexiones) en la parte superior derecha. Aparece una lista de conexiones.
1. Pasa el cursor sobre la conexión en la que deseas establecer permisos granulares. Aparecerán a la derecha los iconos **Edit** (editar), **Permissions** (permisos) y **Delete** (eliminar).
1. Haz clic en el icono del candado (**Permissions** [Permisos]).
1. Selecciona **Restrict Access** (Restringir el acceso).
1. Selecciona un rol en el menú desplegable. Haz clic en **Add** (Añadir). El rol seleccionado aparecerá en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, selecciona el permiso deseado en el menú desplegable.
1. Si quieres eliminar el acceso a un rol, haz clic en el icono de la papelera situado a la derecha del nombre del rol.
1. Haz clic en **Save** (Guardar).

### Restringir el acceso a un flujo de trabajo específico

Establece permisos en cada flujo de trabajo para restringir las modificaciones o el uso del flujo de trabajo. Los permisos granulares incluyen **Visor**, **Runner** (ejecutor) y **Editor**. Por defecto, solo el autor del flujo de trabajo recibe acceso de **Editor**. El autor puede optar por conceder acceso a usuarios, roles o equipos adicionales.

Visor
: Puede ver el flujo de trabajo

Ejecutor
: Puede ejecutar y visualizar el flujo de trabajo

Editor
: Puede editar, ejecutar y ver el flujo de trabajo

Puedes restringir el acceso a un flujo de trabajo específico desde la página de lista o desde el lienzo del flujo de trabajo mientras lo editas.

**Restricting permissions from the workflow list page** (Restricción de permisos desde la página de lista de flujo de trabajo)
1. Navega hasta la [Workflow Automation page (página Workflow Automation)][8].
1. Pasa el cursor sobre el flujo de trabajo en el que deseas establecer permisos granulares. Los iconos **Editar**, **Permisos** y **Eliminar** aparecen a la derecha.
1. Haz clic en el icono del candado (**Permissions** [Permisos]).
1. Selecciona **Restrict Access** (Restringir el acceso).
1. Selecciona un rol en el menú desplegable. Haz clic en **Add** (Añadir). El rol seleccionado aparecerá en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, selecciona el permiso deseado en el menú desplegable.
1. Si quieres eliminar el acceso a un rol, haz clic en el icono de la papelera situado a la derecha del nombre del rol.
1. Haz clic en **Save** (Guardar).

**Restringir permisos desde el editor de flujos de trabajo**
1. En el editor de flujos de trabajo, haz clic en el icono de engranaje (**Configuración**).
1. Selecciona **Editar permisos** en el menú desplegable.
1. Selecciona **Restrict Access** (Restringir el acceso).
1. Selecciona un rol en el menú desplegable. Haz clic en **Add** (Añadir). El rol seleccionado aparecerá en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, selecciona el permiso deseado en el menú desplegable.
1. Si quieres eliminar el acceso a un rol, haz clic en el icono de la papelera situado a la derecha del nombre del rol.
1. Haz clic en **Save** (Guardar).

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][9].

[1]: /es/account_management/audit_trail/#overview
[2]: /es/account_management/org_settings/service_accounts/
[3]: /es/account_management/rbac/
[4]: /es/service_management/workflows/trigger/
[5]: /es/actions/actions_catalog/
[6]: /es/service_management/workflows/connections/
[7]: /es/account_management/rbac/permissions/#workflow-automation
[8]: https://app.datadoghq.com/workflow
[9]: https://datadoghq.slack.com/