---
description: Acceso y autenticación para App builder
kind: documentación
title: Acceso y autenticación
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
App Builder de Datadog está en fase beta privada. Rellena el formulario para solicitar acceso.
{{< /callout >}}

Algunas herramientas controlan el acceso y la autenticación de las aplicaciones y sus componentes.

## Credenciales de acción

Dado que las [acciones][1] de la aplicación se conectan con sistemas de software externos, es posible que tengas que autenticar tu cuenta de Datadog en una integración correspondiente. Una aplicación sólo puede ejecutarse correctamente si todas las acciones que requieren autenticación pueden verificar la identidad de tu cuenta de Datadog.

Las acciones pueden autenticarse de las siguientes maneras:
- Credenciales y permisos configurados en el cuadro de la integración
- Credenciales de conexión

Para obtener más información sobre la configuración de credenciales, consulta [Conexiones][2]. App Builder comparte el catálogo de acciones y las credenciales de conexión para cada integración con la [automatización de flujos de trabajo de Datadog][3].

## Permisos de la aplicación

Por defecto:
- Mientras la aplicación está en fase de borrador, el autor de una aplicación es el único usuario que tiene acceso a ella.
- Una vez publicada la aplicación, el autor mantiene el acceso de **Editor**, mientras que el resto de la organización Datadog del autor recibe acceso de **Visor** a la aplicación.

Puedes ampliar el acceso a un borrador de aplicación publicado mediante el control de acceso.

### Permisos y control de acceso

Utiliza el [control de acceso basado en roles (RBAC)][4] para controlar el acceso a tus aplicaciones y conexiones.

Los toscos permisos que se aplican a las aplicaciones son los siguientes:

Apps View (Vista de aplicaciones)
: Visualiza y ejecuta aplicaciones. Los roles estándar y de administrador de Datadog tienen acceso a la vista en App Builder por defecto.

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
1. Pasa el cursor sobre la conexión en la que quieres establecer permisos granulares. A la derecha aparecerán los iconos **Edit**, **Permissions** y **Delete** (Editar, Permisos y Eliminar).
1. Haz clic en el icono del candado (**Permissions** [Permisos]).
1. Seleccione **Restrict Access** (Restringir el acceso).
1. Selecciona un rol del menú desplegable y haz clic en **Add** (Añadir). El rol seleccionado aparecerá en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, selecciona el permiso deseado en el menú desplegable.
1. Si quieres eliminar el acceso a un rol, haz clic en el icono de la papelera situado a la derecha del nombre del rol.
1. Haz clic en **Save** (Guardar).

### Restringir el acceso a una aplicación específica

Establece permisos en cada aplicación para restringir su modificación. Por defecto:
- El autor de una aplicación es el único usuario que tiene acceso a ella.
- Una vez publicada la aplicación, el autor mantiene el acceso de **Editor**, mientras que el resto de la organización Datadog del autor recibe acceso de **Visor** a la aplicación.

App Builder proporciona los siguientes permisos para cada aplicación:

Viewer (Visor)
: Ejecuta y visualiza la aplicación

Editor
: Edita, ejecuta y visualiza la aplicación

Para restringir el acceso a la aplicación, realiza los siguientes pasos en el lienzo de la aplicación:
1. Ve a la vista de edición detallada de la aplicación a la cual quieres restringir el acceso.
1. En el editor de aplicaciones, haz clic en el icono de engranaje (**Settings** [Configuración]).
1. Selecciona **Permissions** (Permisos) en el menú desplegable.
1. Selecciona **Restrict Access* (Restringir el acceso).
1. Selecciona un rol en el menú desplegable. Haz clic en **Add** (Añadir). El rol seleccionado aparecerá en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, selecciona el permiso deseado en el menú desplegable.
1. Si quieres eliminar el acceso a un rol, haz clic en el icono de la papelera situado a la derecha del nombre del rol.
1. Haz clic en **Save** (Guardar).

[1]: /es/service_management/workflows/actions_catalog/
[2]: /es/service_management/workflows/connections/
[3]: /es/service_management/workflows/
[4]: /es/account_management/rbac/
[5]: https://app.datadoghq.com/app-builder/