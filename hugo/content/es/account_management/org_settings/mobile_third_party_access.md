---
aliases:
- /es/account_management/org_settings/oauth_apps/
description: Administre y haga un seguimiento de las aplicaciones OAuth en su organización,
  incluidos los permisos, la Gestión de Contexto de la Aplicación, el acceso de los
  usuarios y los controles de estado de la aplicación.
further_reading:
- link: /account_management/org_settings/
  tag: Documentación
  text: Obtenga más información sobre la configuración de la organización
- link: /account_management/rbac/permissions/
  tag: Documentación
  text: Permisos de roles de Datadog
title: Acceso móvil y de terceros
---
## Descripción general {#overview}

Utilice la página {{< ui >}}Mobile and Third-Party Access{{< /ui >}} en [Configuración de la organización][1] para administrar y obtener visibilidad de las aplicaciones OAuth de su organización, como los contextos y permisos otorgados a una aplicación y los usuarios que han autorizado el acceso a ella.

{{< img src="account_management/mobile_third_party_access/org-management-page.png" alt="Página de gestión de Acceso móvil y de terceros en Datadog" style="width:100%;">}}

## Configuración {#setup}
### Permisos{#permissions}

De forma predeterminada, los usuarios con el [rol de Datadog Admin][2] pueden acceder a la página de Acceso móvil y de terceros. Si su organización tiene [roles personalizados][3] definidos, agregue a su usuario a cualquier rol personalizado con los permisos `org_authorized_apps_read` y `org_authorized_apps_write`.

Solo los usuarios con el rol de Datadog Admin o los permisos `org_authorized_apps_read` y `org_authorized_apps_write` pueden administrar aplicaciones OAuth en esta página, como deshabilitar aplicaciones o revocar el acceso OAuth para un usuario.

### Habilitar {#enable}

Las aplicaciones OAuth habilitadas permiten a los usuarios con los permisos necesarios autorizar el acceso en su nombre. Las aplicaciones OAuth incluyen la Aplicación móvil de Datadog.

### Deshabilitar {#disable}

Deshabilitar el acceso OAuth para una aplicación revoca el acceso a esta aplicación para todos los usuarios de su organización. Aunque la aplicación permanece instalada, los usuarios ya no pueden usarla y reciben un error si intentan autorizarla.

Para deshabilitar una aplicación desde la página de Acceso móvil y de terceros:
1. Pase el cursor sobre su aplicación en la tabla para mostrar el botón {{< ui >}}Disable{{< /ui >}} en el lado derecho de la fila.
{{< img src="account_management/mobile_third_party_access/disable-app-table.png" alt="Tabla que muestra el botón Deshabilitar al pasar el cursor" style="width:100%;">}}

2. Haga clic en su aplicación para abrir la vista detallada de la aplicación y haga clic en el botón {{< ui >}}Disable Application{{< /ui >}}.
{{< img src="account_management/mobile_third_party_access/app-detail-scopes.png" alt="Vista detallada de la aplicación que muestra los contextos y el botón Deshabilitar aplicación" style="width:100%;">}}

**Nota**: Al volver a habilitar, los usuarios que autorizaron previamente la aplicación deben volver a autorizarla para recuperar el acceso.

### Revocar acceso {#revoke-access}

Revocar el acceso OAuth de un usuario a una aplicación elimina todo el acceso a esa aplicación. Si el usuario tiene los permisos necesarios para autorizar la aplicación, puede recuperar el acceso volviéndola a autorizar.

{{< img src="account_management/mobile_third_party_access/revoke-user.png" alt="Vista de detalles de la aplicación que muestra la pestaña Usuarios con la opción de revocar el acceso de un usuario" style="width:100%;">}}

### Gestión de Contexto de la Aplicación {#application-scope-management}

Habilite la Gestión de Contexto de la Aplicación para modificar los contextos permitidos para una aplicación.

Agregar o eliminar un contexto afecta el acceso a la aplicación para todos los usuarios de su organización. Deshabilitar un contexto revoca las autorizaciones existentes que incluyen ese contexto. Los usuarios afectados deben volver a autorizar la aplicación para recuperar el acceso con los contextos permitidos restantes. Habilitar un contexto no lo agrega a las autorizaciones existentes. Los usuarios deben volver a autorizar la aplicación para conceder el contexto recién permitido.

Use {{< ui >}}Automatically allow new scopes{{< /ui >}} para elegir cómo Datadog maneja los contextos que la aplicación comienza a solicitar después de que usted guarde la configuración:

- Cuando está seleccionado, Datadog permite automáticamente los contextos recién solicitados. Los contextos que usted deshabilita explícitamente permanecen bloqueados.
- Cuando está desmarcado, Datadog bloquea los contextos recién solicitados hasta que un administrador los permita.

Para la aplicación móvil de Datadog, los contextos requeridos siempre están permitidos y no se pueden deshabilitar.

1. En la página {{< ui >}}Mobile and Third-Party Access{{< /ui >}}, haga clic en una aplicación para abrir su vista detallada.

2. Seleccione la pestaña {{< ui >}}Scopes{{< /ui >}} y use la casilla de verificación {{< ui >}}Allowed{{< /ui >}} para cada contexto para controlar si se le concede ese contexto a la aplicación.

3. Seleccione o desmarque {{< ui >}}Automatically allow new scopes{{< /ui >}} para elegir si Datadog permite automáticamente los nuevos contextos que la aplicación solicita después de que usted guarde.

4. Haga clic en {{< ui >}}Enable{{< /ui >}} o {{< ui >}}Save{{< /ui >}} para guardar la configuración del contexto.

{{< img src="account_management/mobile_third_party_access/scope-restrictions-enable-2.png" alt="Vista de Gestión de Contexto de la Aplicación que muestra Permitir automáticamente nuevos contextos y los controles de contexto permitido." style="width:100%;">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /es/account_management/rbac/permissions/#general-permissions
[3]: /es/account_management/rbac/?tab=datadogapplication#custom-role