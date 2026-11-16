---
description: Conecte las acciones de Datadog con su propia GitHub App en lugar de
  la integración de Datadog para GitHub.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentación
  text: Conexiones
title: Conexión de GitHub App
---
## Descripción general {#overview}

Utilice una conexión de GitHub App cuando desee incorporar su propia GitHub App en lugar de autenticar acciones con el mosaico de integración de Datadog para GitHub.

Con esta conexión, Datadog se autentica como una instalación de su GitHub App. Usted proporciona el ID de la GitHub App, el ID de instalación y la clave privada, y Datadog utiliza estas credenciales para solicitar automáticamente tokens de acceso de corta duración. Este enfoque le permite controlar los repositorios y los permisos disponibles para sus flujos de trabajo y aplicaciones.

## Cree e instale una GitHub App {#create-and-install-a-github-app}

Si ya tiene una GitHub App instalada con los permisos requeridos por sus acciones, pase a [Reúna las credenciales de conexión](#gather-the-connection-credentials). Para obtener detalles completos sobre las opciones de creación de GitHub Apps, consulte la guía [Registering a GitHub App][5] de GitHub.

1. En GitHub, navegue a **Settings** > **Developer settings** > **GitHub Apps** de su organización.
1. Haga clic en **New GitHub App**.
1. Ingrese un nombre para la aplicación y una URL de página de inicio.
1. En **Webhook**, desmarque la casilla **Active** a menos que utilice el webhook de la aplicación para otro propósito. Una conexión de GitHub App no requiere un webhook.
1. En **Permissions**, otorgue acceso solo a los recursos que requieran sus acciones, como contenido de repositorios, solicitudes de extracción (pull requests) o problemas (issues).
1. Haga clic en **Create GitHub App**.
1. En la página de configuración de la aplicación, haga clic en **Install App**.
1. Seleccione la organización donde desea instalar la aplicación y, luego, seleccione si la aplicación puede acceder a todos los repositorios o solo a los repositorios seleccionados.
1. Haga clic en **Install**.

Dependiendo de la política de GitHub Apps de su organización, es posible que la instalación de la aplicación requiera la aprobación de un propietario de la organización.

## Reúna las credenciales de conexión {#gather-the-connection-credentials}

Reúna los siguientes valores de GitHub:

- **ID de la aplicación**: En la página de configuración de la aplicación de GitHub, copie el ID de la aplicación numérico que se muestra cerca de la parte superior de la página.
- **ID de instalación**: Abra la configuración de instalación de la aplicación. El ID de instalación es el valor numérico al final de la URL, como `github.com/organizations/<org>/settings/installations/12345678`.
- **Clave privada**: En la página de configuración de la aplicación de GitHub, en **Claves privadas**, haga clic en **Generar una clave privada**. GitHub descarga un archivo `.pem`. Guarde el archivo de forma segura; no puede volver a descargar la misma clave privada desde GitHub.

## Cree la conexión en Datadog {#create-the-connection-in-datadog}

Después de configurar la aplicación de GitHub, cree la conexión en Datadog:

1. Desde la [página de Action Catalog][1], haga clic en la pestaña {{< ui >}}Connections{{< /ui >}}.
1. Haga clic en {{< ui >}}New Connection{{< /ui >}}.
1. Seleccione el tipo de conexión {{< ui >}}GitHub{{< /ui >}}.
1. Seleccione el tipo de credencial {{< ui >}}GitHub App{{< /ui >}}.
1. Ingrese un nombre de conexión.
1. Ingrese el ID de la aplicación y el ID de instalación que copió de GitHub.
1. En el campo {{< ui >}}Private Key{{< /ui >}}, pegue el contenido completo del archivo `.pem`.
1. Si utiliza GitHub Enterprise Server, ingrese su nombre de host en el campo {{< ui >}}GitHub Hostname{{< /ui >}}. Deje este campo en blanco para `github.com`.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

La conexión es privada de forma predeterminada. Para permitir que otros usuarios la utilicen en flujos de trabajo o aplicaciones, configure el acceso desde la configuración de permisos de la conexión. Para obtener más información, consulte Acceso y autenticación para [Workflow Automation][2] o [App Builder][3].

## Actualice los permisos de la aplicación de GitHub {#update-github-app-permissions}

Si agrega permisos a una aplicación de GitHub después de instalarla, las instalaciones existentes no reciben los permisos automáticamente. Abra la configuración de instalación de la aplicación para cada organización o cuenta y acepte los nuevos permisos antes de utilizarlos en una acción.

## Solución de problemas {#troubleshooting}

### Las acciones utilizan la organización o los repositorios incorrectos {#actions-use-the-wrong-organization-or-repositories}

Verifique que el ID de instalación en la conexión coincida con la instalación de la organización y los repositorios esperados. Puede encontrar el ID de instalación en la URL de configuración de instalación de la aplicación.

### Una acción devuelve un error de permiso {#an-action-returns-a-permission-error}

Verifique los permisos configurados para la aplicación de GitHub y los repositorios disponibles para su instalación. Si agregó permisos después de instalar la aplicación, abra la configuración de instalación y acepte la nueva solicitud de permisos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** o **#app-builder** en el [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/actions/action-catalog
[2]: /es/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[3]: /es/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection
[4]: https://chat.datadoghq.com/
[5]: https://docs.github.com/apps/creating-github-apps/registering-a-github-app/registering-a-github-app