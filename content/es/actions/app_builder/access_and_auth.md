---
aliases:
- /es/service_management/app_builder/auth
- /es/actions/app_builder/auth
description: Acceso y autenticación para App Builder
title: Acceso y autenticación
---

Algunas herramientas controlan el acceso y la autenticación de las aplicaciones y sus componentes.

## Identidad de ejecución de la aplicación

Una aplicación publicada se ejecuta utilizando la identidad de usuario de Datadog de su autor, o una cuenta de servicio asociada a la aplicación. El autor aparece tanto en la vista **All Apps** (Todas las aplicaciones) como en **App Properties** (Propiedades de la aplicación).

En el modo de edición, una aplicación se ejecuta como el editor actual.

### Utiliza una cuenta de servicio 

Una cuenta de servicio puede asociarse a una aplicación y actuar como la identidad de la aplicación cuando se ejecuta. Una cuenta de servicio puede:
- resolver las conexiones definidas en las consultas de la aplicación en tiempo de ejecución
- proporcionar una identidad para las ejecuciones de aplicación
- proporcionar una identidad para los [registros de seguimiento de auditoría][7] de la aplicación

Para crear una cuenta de servicio para una aplicación, debes tener el rol de administrador de Datadog o un rol personalizado con el permiso **Service Account Write** (Escritura de cuenta de servicio). La cuenta de servicio que crees adoptará tu rol y permisos. Para más información sobre cuentas de servicio y permisos, consulta [Cuentas de servicio][2] o [Control de acceso basado en roles][3].

#### Configurar tu aplicación para que se ejecute como una cuenta de servicio

1. Haz clic en el icono de engranaje (**Settings** [ajustes]).
1. Haz clic en **Manage app identity** (Gestionar identidad de la aplicación).
1. Selecciona **Run as Service Account** (Ejecutar como cuenta de servicio).
1. Selecciona un rol para tu usuario de cuenta de servicio o selecciona una cuenta de servicio existente.
1. Haz clic en **Save** (Guardar) para guardar la cuenta de servicio y aplicar los cambios.

Cuando ejecutas una aplicación, el usuario de la cuenta de servicio resuelve las conexiones definidas en las consultas de la aplicación. Por lo tanto, el usuario de la cuenta de servicio necesita el permiso `connections_resolve`. El rol de administrador de Datadog y el rol estándar de Datadog incluyen el permiso `connections_resolve`.

#### Ver los detalles de la cuenta de servicio 

1. Haz clic en el icono de engranaje (**Settings** [ajustes]).
1. Selecciona en **Manage app identity** (Gestionar identidad de la aplicación).
1. Haz clic en tu cuenta de servicio junto a **Run As** (Ejecutar como).

#### Eliminar una cuenta de servicio asociada a una aplicación

1. Haz clic en el icono de engranaje (**Settings** [ajustes]).
1. Selecciona en **Manage app identity** (Gestionar identidad de la aplicación).
1. Haz clic en **Remove service account** (eliminar cuenta de servicio).

## Credenciales de acción

Dado que las [acciones][1] de la aplicación se conectan con sistemas de software externos, es posible que tengas que autenticar tu cuenta de Datadog para una integración correspondiente. Una aplicación sólo puede ejecutarse correctamente si todas las acciones que requieren autenticación pueden verificar la identidad de tu cuenta de Datadog.

Las acciones pueden autenticarse de las siguientes maneras:
- Credenciales y permisos configurados en el cuadro de integración
- Credenciales de conexión

Por defecto, los espectadores de una aplicación publicada no necesitan acceder a las conexiones de la aplicación. En su lugar, las acciones utilizan la identidad del autor de la aplicación. Esto simplifica la compartición y mejora la seguridad al evitar que las aplicaciones realicen operaciones confidenciales utilizando la identidad de espectadores arbitrarios.
Para obtener más información sobre la configuración de credenciales, consulta [Conexiones][8]. App Builder comparte el Action Catalog y las credenciales de conexión para cada integración con [Datadog Workflow Automation][9].

## Permisos de la aplicación

Por defecto:
- Mientras la aplicación está en fase de borrador, el autor de una aplicación es el único usuario que tiene acceso a ella.
- Una vez publicada la aplicación, el autor mantiene el acceso de **Editor**, mientras que el resto de la organización Datadog del autor recibe acceso como **Visor** a la aplicación.

Puedes ampliar el acceso a un borrador de aplicación publicado mediante el control de acceso.

### Permisos y control de acceso

Utiliza [control de acceso basado en roles (RBAC)][3] para controlar el acceso a tus aplicaciones y conexiones.

Los rudimentarios permisos que se aplican a las aplicaciones son los siguientes:

Apps View (Vista de aplicaciones)
: Visualiza y ejecuta aplicaciones. Los roles estándar y de administrador de Datadog tienen acceso de visualización en App Builder por defecto.

Apps Write (Escritura de aplicaciones)
: Crea y edita aplicaciones nuevas y existentes. Los roles estándar y de administrador de Datadog tienen acceso de escritura a App Builder por defecto.

Connections Read (Lectura de conexiones)
: Enumera y visualiza las conexiones disponibles. Los roles de sólo lectura, estándar y de administrador de Datadog tienen acceso de lectura a las conexiones por defecto.

### Restringir el acceso a una conexión específica

Establece permisos en conexiones individuales para restringir su uso o limitar las modificaciones. App Builder proporciona los siguientes permisos para cada conexión:

Viewer (Visor)
: Visualizar la conexión

Resolver (Solucionador)
: Resolver y visualizar la conexión

Editor
: Editar, resolver y visualizar la conexión

Por defecto, sólo el autor de la conexión recibe el acceso **Editor**. El autor puede optar por conceder acceso a otros usuarios, roles o equipos.

**Nota**: El permiso para resolver una conexión incluye el permiso para asignar el objeto de conexión a un paso y recuperar el secreto asociado a él.

Sigue los siguientes pasos para modificar los permisos de una conexión específica:

1. Ve a la [página del App Builder][5].
1. Haz clic en la pestaña **Connections** (Conexiones). Aparecerá una lista de conexiones.
1. Pasa el cursor sobre la conexión en la que quieres establecer permisos específicos. A la derecha, aparecerán los iconos **Edit**, **Permissions** y **Delete** (Editar, Permisos y Eliminar).
1. Haz clic en el icono del candado (**Permissions** [Permisos]).
1. Selecciona **Restrict Access** (Restringir el acceso).
1. Selecciona un rol del menú desplegable y haz clic en **Add** (Añadir). El rol seleccionado aparecerá en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, selecciona el permiso deseado en el menú desplegable.
1. Si quieres eliminar el acceso a un rol, haz clic en el icono de la papelera situado a la derecha del nombre del rol.
1. Haz clic en **Save** (Guardar).

### Restringir el acceso a una aplicación específica

Establece permisos en cada aplicación para restringir su modificación. Por defecto:
- El autor de una aplicación es el único usuario que tiene acceso a ella.
- Una vez publicada la aplicación, el autor mantiene el acceso de **Editor**, mientras que el resto de la organización Datadog del autor recibe acceso como **Visor** a la aplicación.

App Builder proporciona los siguientes permisos para cada aplicación:

Viewer (Visor)
: Ejecuta y visualiza la aplicación

Editor
: Edita, ejecuta y visualiza la aplicación

Para restringir el acceso a la aplicación, realiza los siguientes pasos en el lienzo de la aplicación:
1. Ve a la vista de edición detallada de la aplicación a la cual quieres restringir el acceso.
1. En el editor de aplicaciones, haz clic en el icono de engranaje (**Settings** [Configuración]).
1. Selecciona **Permissions** (Permisos) en el menú desplegable.
1. Selecciona **Restrict Access** (Restringir el acceso).
1. Selecciona un rol en el menú desplegable. Haz clic en **Add** (Añadir). El rol seleccionado aparecerá en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, selecciona el permiso deseado en el menú desplegable.
1. Si quieres eliminar el acceso a un rol, haz clic en el icono de la papelera situado a la derecha del nombre del rol.
1. Haz clic en **Save** (Guardar).

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][6].

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /es/account_management/org_settings/service_accounts#permissions
[3]: /es/account_management/rbac/?tab=datadogapplication#role-based-access-control
[5]: https://app.datadoghq.com/app-builder/
[6]: https://datadoghq.slack.com/
[7]: /es/account_management/audit_trail/#overview
[8]: /es/actions/connections/
[9]: /es/actions/workflows/