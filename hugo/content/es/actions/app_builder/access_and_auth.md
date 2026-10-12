---
aliases:
- /es/service_management/app_builder/auth
- /es/actions/app_builder/auth
description: Acceso y autenticación para App Builder
title: Acceso y autenticación
---
Unas cuantas herramientas controlan el acceso y la autenticación para las aplicaciones y sus componentes.

## Identidad de ejecución de la aplicación {#app-execution-identity}

Una aplicación publicada se ejecuta utilizando la identidad de usuario de Datadog de su autor, o una cuenta de servicio asociada con la aplicación. El autor aparece tanto en la opción visualizar {{< ui >}}All Apps{{< /ui >}} como en {{< ui >}}App Properties{{< /ui >}}.

En el modo de edición, una aplicación se ejecuta como el editor actual.

### Utilice una cuenta de servicio {#use-a-service-account}

Se puede asociar una cuenta de servicio con una aplicación y actuar como la identidad de la aplicación cuando se ejecuta. Una cuenta de servicio puede:
- resolver las conexiones definidas en las consultas de la aplicación en tiempo de ejecución
- proporcionar una identidad para las ejecuciones de la aplicación
- proporcionar una identidad para los [registros de auditoría][7] de la aplicación

Para crear una cuenta de servicio para una aplicación, debe tener el rol Datadog Admin o un rol personalizado con el permiso {{< ui >}}Service Account Write{{< /ui >}}. La cuenta de servicio que cree adopta su rol y sus permisos. Para obtener más información sobre las cuentas de servicio y los permisos, consulte [Cuentas de servicio][2] o [Control de acceso basado en roles][3].

#### Configure su aplicación para que se ejecute como una cuenta de servicio {#configure-your-app-to-run-as-a-service-account}

1. Haga clic en el icono de engranaje ({{< ui >}}Settings{{< /ui >}}).
1. Haga clic en {{< ui >}}Manage app identity{{< /ui >}}.
1. Seleccione {{< ui >}}Run as Service Account{{< /ui >}}.
1. Seleccione un rol para su usuario de cuenta de servicio o seleccione una cuenta de servicio existente.
1. Haga clic en {{< ui >}}Save{{< /ui >}} para guardar la cuenta de servicio y aplicar los cambios.

Cuando ejecuta una aplicación, el usuario de la cuenta de servicio resuelve las conexiones definidas en las consultas de la aplicación. Por lo tanto, el usuario de la cuenta de servicio necesita el permiso `connections_resolve`. El rol Datadog Admin y el rol Datadog Standard incluyen el permiso `connections_resolve`.

#### Visualizar detalles de la cuenta de servicio {#view-service-account-details}

1. Haga clic en el icono de engranaje ({{< ui >}}Settings{{< /ui >}}).
1. Seleccione {{< ui >}}Manage app identity{{< /ui >}}.
1. Haga clic en su cuenta de servicio junto a *Run As*

#### Eliminar una cuenta de servicio asociada con una aplicación {#remove-a-service-account-associated-with-an-app}

1. Haga clic en el icono de engranaje ({{< ui >}}Settings{{< /ui >}}).
1. Seleccione {{< ui >}}Manage app identity{{< /ui >}}.
1. Haga clic en {{< ui >}}Remove service account{{< /ui >}}.

## Credenciales de acción {#action-credentials}

Debido a que las [acciones][1] de la aplicación se conectan con sistemas de software externos, es posible que deba autenticar su cuenta de Datadog en la integración correspondiente. Una aplicación solo puede ejecutarse correctamente si cada acción que requiere autenticación puede verificar la identidad de su cuenta de Datadog.

Las acciones se pueden autenticar de las siguientes maneras:
- Credenciales y permisos configurados en el mosaico de integración
- Credenciales de conexión

De forma predeterminada, los visores de una aplicación publicada no necesitan acceso a las conexiones de la aplicación. En su lugar, las acciones utilizan la identidad del autor de la aplicación. Esto simplifica el uso compartido y mejora la seguridad al evitar que las aplicaciones realicen operaciones confidenciales utilizando la identidad de visores arbitrarios.
Para obtener más información sobre la configuración de credenciales, consulte [Conexiones][8]. App Builder comparte el Action Catalog y las credenciales de conexión para cada integración con [Datadog Workflow Automation][9].

## Permisos de la aplicación {#app-permissions}

De forma predeterminada:
- Mientras la aplicación está en borrador, el autor de la aplicación es el único usuario que tiene acceso a ella.
- Después de publicar la aplicación, el autor mantiene el acceso {{< ui >}}Editor{{< /ui >}}, mientras que el resto de la organización de Datadog del autor recibe el acceso {{< ui >}}Viewer{{< /ui >}} a la aplicación.

Puede ampliar el acceso a una aplicación en borrador o publicada mediante el control de acceso.

### Permisos y control de acceso {#permissions-and-access-control}

Utilice el [control de acceso basado en roles (RBAC)][3] para controlar el acceso a sus aplicaciones y conexiones.

Los permisos generales que se aplican a las aplicaciones incluyen los siguientes:

{{< ui >}}Apps View{{< /ui >}}
: Visualizar y ejecutar aplicaciones. Los roles Datadog Standard y Datadog Admin tienen acceso para visualizar App Builder de forma predeterminada.

{{< ui >}}Apps Write{{< /ui >}}
: Crear y editar aplicaciones nuevas y existentes. Los roles Datadog Standard y Datadog Admin tienen acceso de escritura a App Builder de forma predeterminada.

{{< ui >}}Connections Read{{< /ui >}}
: Listar y visualizar las conexiones disponibles. Los roles Datadog Read Only, Datadog Standard y Datadog Admin tienen acceso de lectura a las conexiones de forma predeterminada.

### Restringir el acceso a una aplicación específica {#restrict-access-to-a-specific-app}

Establezca permisos en cada aplicación para restringir las modificaciones a la misma.

App Builder proporciona los siguientes permisos para cada aplicación:

{{< ui >}}Viewer{{< /ui >}}
: Ejecutar y visualizar la aplicación.

{{< ui >}}Contributor{{< /ui >}}
: Editar, ejecutar y visualizar la aplicación.

{{< ui >}}Editor{{< /ui >}}
: Editar, ejecutar, visualizar, publicar y eliminar la aplicación.

Para restringir el acceso a la aplicación, realice los siguientes pasos en el lienzo de la aplicación:
1. Navegue a la opción 'visualizar' en la edición detallada de la aplicación a la que desea restringir el acceso.
1. En el editor de aplicaciones, haga clic en el icono de engranaje ({{< ui >}}Settings{{< /ui >}}).
1. Seleccione {{< ui >}}Permissions{{< /ui >}} del menú desplegable.
1. Seleccione {{< ui >}}Restrict Access{{< /ui >}}.
1. Seleccione un rol del menú desplegable. Haga clic en {{< ui >}}Add{{< /ui >}}. El rol que seleccionó aparece en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, seleccione el permiso deseado en el menú desplegable.
1. Si desea eliminar el acceso de un rol, haga clic en el icono de papelera a la derecha del nombre del rol.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Restrinja el acceso a la aplicación mediante la API o Terraform {#restrict-app-access-using-the-api-or-terraform}

Al utilizar la [API de política de restricción][10] o Terraform, un usuario o cuenta de servicio no puede disminuir su propio nivel de acceso. Este es un comportamiento intencional aplicado por [Granular Access] para evitar bloqueos autoinfligidos.

Para transferir el acceso de `editor` fuera del usuario o la cuenta de servicio que realiza la llamada:

1. Agregue al nuevo principal como `editor` mientras mantiene al usuario o la cuenta de servicio actual como `editor`:

   ```terraform
   bindings {
       principals = ["user:<SERVICE_ACCOUNT_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

1. Usando una **diferente** clave de API o cuenta de administrador (no la que se está degradando), elimine el enlace del usuario o la cuenta de servicio original:

   ```terraform
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

### Restringir el acceso a una conexión específica {#restrict-access-to-a-specific-connection}

Establezca permisos en conexiones individuales para restringir su uso o limitar las modificaciones. App Builder proporciona los siguientes permisos para cada conexión:

{{< ui >}}Viewer{{< /ui >}}
: Visualizar la conexión

{{< ui >}}Resolver{{< /ui >}}
: Resolver y visualizar la conexión

{{< ui >}}Editor{{< /ui >}}
: Editar, resolver y visualizar la conexión

De forma predeterminada, solo el autor de la conexión recibe acceso de {{< ui >}}Editor{{< /ui >}}. El autor puede optar por otorgar acceso a usuarios, roles o equipos adicionales.

**Nota**: El permiso para resolver una conexión incluye el permiso para obtener el objeto de conexión asignado a un paso y recuperar el secreto asociado con él.

Siga los siguientes pasos para modificar los permisos de una conexión específica:

1. Vaya a la [página de App Builder][5].
1. Haga clic en la pestaña {{< ui >}}Connections{{< /ui >}}. Aparece una lista de conexiones.
1. Pase el cursor sobre la conexión en la que desea establecer permisos granulares. Aparecen los iconos {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}} y {{< ui >}}Delete{{< /ui >}} a la derecha.
1. Haga clic en el icono de candado ({{< ui >}}Permissions{{< /ui >}}).
1. Seleccione {{< ui >}}Restrict Access{{< /ui >}}.
1. Seleccione un rol en el menú desplegable y haga clic en {{< ui >}}Add{{< /ui >}}. El rol que seleccionó aparece en la parte inferior del cuadro de diálogo.
1. Junto al nombre del rol, seleccione el permiso deseado en el menú desplegable.
1. Si desea eliminar el acceso de un rol, haga clic en el icono de papelera a la derecha del nombre del rol.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][6].

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /es/account_management/org_settings/service_accounts#permissions
[3]: /es/account_management/rbac/?tab=datadogapplication#role-based-access-control
[4]: /es/account_management/rbac/granular_access
[5]: https://app.datadoghq.com/app-builder/
[6]: https://chat.datadoghq.com/
[7]: /es/account_management/audit_trail/#overview
[8]: /es/actions/connections/
[9]: /es/actions/workflows/
[10]: /es/api/latest/restriction-policies/