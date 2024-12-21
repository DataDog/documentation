---
further_reading:
- link: /account_management/org_settings/
  tag: Documentación
  text: Más información sobre los parámetros de organización
title: Aplicaciones de OAuth
---
## Información general

Usa la página de gestión de **Aplicaciones de OAuth** en [Parámetros de organización][1] para gestionar y obtener visibilidad de las aplicaciones de OAuth de tu organización, como los contextos y permisos otorgados a una aplicación y los usuarios que tienen acceso autorizado para esta.

{{< img src="account_management/oauth_apps/org-management-page.png" alt="Página de gestión de aplicaciones de OAuth en Datadog" style="width:100%;">}}

## Configuración
### Permisos

De manera predeterminada, los usuarios con [roles estándar y de administrador de Datadog][2] pueden acceder a la página de gestión de aplicaciones de OAuth. Si tu organización tiene [roles personalizados][3] definidos, añade tu usuario a cualquier rol personalizado con los permisos `org_authorized_apps_read` y `org_authorized_apps_write`. 

Solo los usuarios con el rol de administrador de Datadog o el permiso `org_authorized_apps_write` pueden gestionar las aplicaciones de OAuth en esta página, como deshabilitar aplicaciones o revocar el acceso de OAuth de un usuario.

### Activar

Las aplicaciones de OAuth habilitadas permiten que los usuarios con los permisos necesarios autoricen el acceso en su nombre. Las aplicaciones de OAuth incluyen la aplicación móvil de Datadog<!-- y tus [extensiones de interfaz de usuario][4] personalizadas que tienen [acceso a la API de OAuth][5]-->. 

### Desactivar

Si deshabilitas el acceso de OAuth para una aplicación, se revocará su acceso a todos los usuarios de tu organización. Mientras la aplicación permanezca instalada, los usuarios ya no podrán usarla y recibirán un mensaje de error si intentan autorizarla. 

Hay dos formas de deshabilitar una aplicación desde la página de gestión de aplicaciones de OAuth:
1. Coloca el ratón sobre tu aplicación en la tabla de aplicaciones para revelar el botón **Disable** (Deshabilitar) en el lado derecho de la fila.
{{< img src="account_management/oauth_apps/disable-app-table.png" alt="Botón de desactivación en la tabla de aplicaciones" style="width:100%;">}}

2. Haz clic en tu aplicación para abrir su vista detallada y haz clic en el botón **Disable Application** (Deshabilitar aplicación).
{{< img src="account_management/oauth_apps/disable-app-detailed.png" alt="Botón de desactivación en la vista detallada de la aplicación" style="width:100%;">}}

**Nota**: Cuando se vuelve a habilitar, los usuarios que previamente autorizaron la aplicación deberán volver a autorizarla para recuperar el acceso.

### Revocar el acceso

Al revocar el acceso de OAuth de un usuario a una aplicación, se elimina todo acceso a dicha aplicación. Si el usuario tiene los permisos necesarios para autorizar la aplicación, puede recuperar el acceso al volver a autorizarla.
{{< img src="account_management/oauth_apps/revoke-user.png" alt="Botón Deshabilitar en la vista detallada de las aplicaciones" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /es/account_management/rbac/permissions/#general-permissions
[3]: /es/account_management/rbac/?tab=datadogapplication#custom-role
[4]: /es/developers/ui_extensions/
[5]: /es/developers/ui_extensions/#oauth-api-access