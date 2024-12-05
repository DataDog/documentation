---
further_reading:
- link: /account_management/org_settings/
  tag: Documentación
  text: Más información sobre los parámetros de organización
title: Aplicaciones de OAuth
---
## Información general

Usa la página de gestión **OAuth Apps** en [Parámetros de organización[1] para gestionar y consultar las aplicaciones de OAuth de tu organización, como los contextos y permisos concedidos o los usuarios que tienen acceso autorizado a cada aplicación.

{{< img src="account_management/oauth_apps/org-management-page.png" alt="Página de gestión de aplicaciones de OAuth en Datadog" style="width:100%;">}}

## Configuración
### Permisos

De forma predeterminada, los usuarios con [roles estándar y de administrador de Datadog][2] pueden acceder a la página de gestión de aplicaciones de OAuth. Si tu organización tiene definidos [roles personalizados][3], añade al usuario que corresponda con los permisos `org_authorized_apps_read` y `org_authorized_apps_write`.

Solo los usuarios que sean administradores o tengan permisos de `org_authorized_apps_write` en Datadog podrán gestionar aplicaciones de OAuth en esta página, como desactivar aplicaciones o revocar el acceso a OAuth de algún usuario.

### Activar

Las aplicaciones OAuth habilitadas sirven para que los usuarios con los permisos necesarios autoricen el acceso en su nombre. Las aplicaciones OAuth incluyen la aplicación móvil Datadog y tus [Extensiones de interfaz de usuario][4] personalizadas que tengan [Acceso a la API de OAuth][5]. 

### Desactivar

Al desactivar el acceso a OAuth para una aplicación, se revoca el acceso a ella para todos los usuarios de tu organización. Aunque la aplicación siga instalada, los usuarios ya no podrán utilizarla y verán un mensaje de error si intentan autorizarla.

Hay dos formas de desactivar una aplicación desde la página de gestión de aplicaciones de OAuth:
1. Coloca el cursor sobre tu aplicación en la tabla de aplicaciones y verás el botón **Disable** (Desactivar) a la derecha de la fila.
{{< img src="account_management/oauth_apps/disable-app-table.png" alt="Botón de desactivación en la tabla de aplicaciones" style="width:100%;">}}

2. Haz clic en tu aplicación para abrir la vista detallada y, a continuación, selecciona **Disable Application** (Desactivar aplicación).
{{< img src="account_management/oauth_apps/disable-app-detailed.png" alt="Botón de desactivación en la vista detallada de la aplicación" style="width:100%;">}}

**Nota**: Cuando se vuelva a activar, los usuarios que hayan autorizado la aplicación anteriormente deberán volver a autorizarla para recuperar el acceso.

### Revocar el acceso

Al revocar el acceso a una aplicación de OAuth para un usuario, se restringe todo acceso a esa aplicación. Si el usuario tiene los permisos necesarios para autorizar la aplicación, podrá recuperar el acceso volviendo a autorizarla.
{{< img src="account_management/oauth_apps/revoke-user.png" alt="Botón de desactivación en la vista detallada de aplicaciones" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /es/account_management/rbac/permissions/#general-permissions
[3]: /es/account_management/rbac/?tab=datadogapplication#custom-role
[4]: /es/developers/ui_extensions/
[5]: /es/developers/ui_extensions/#oauth-api-access