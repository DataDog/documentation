---
further_reading:
- link: /account_management/api-app-keys/
  tag: Documentación
  text: Claves de API y de aplicación
- link: /account_management/users/
  tag: Documentación
  text: Gestión de usuarios
- link: /account_management/org_settings/oauth_apps
  tag: Documentación
  text: Aplicaciones de OAuth
title: Centro de seguridad
---

## Información general
El Centro de seguridad de Datadog en **Organization Settings** (Parámetros de organización) es una localización centralizada para alertas de seguridad y mejores prácticas. Los [administradores][1] de una organización pueden abrir esta página para revisar las recomendaciones y tomar medidas sobre las advertencias y alertas de seguridad de alta prioridad.

{{< img src="account_management/safety_center/overview.png" alt="Página de Información general del Centro de seguridad" style="width:80%;" >}}

## Alertas de seguridad
Si tu organización tiene una alerta de seguridad de alta prioridad, aparece en la sección **Security Alerts** (Alertas de seguridad) de **Safety Center** (Centro de seguidad). El Centro de seguridad admite dos tipos de alertas: [claves de aplicación][2] filtradas y [claves de API][3] filtradas.

Una alerta de clave filtrada significa que una o más claves privadas (de aplicación o API) se han visto comprometidas o expuestas públicamente en Internet. Las claves expuestas tienen que ser [revocadas][4] lo antes posible para minimizar los riesgos de seguridad para tu organización. Eliminar el archivo que contiene la clave de un sitio público como GitHub **no garantiza** que no haya accedido a él otra persona.

{{< img src="account_management/safety_center/revoke-leaked-api-key.png" alt="Revocar clave de API filtrada" style="width:70%;" >}}

## Configuración
La pestaña **Configuration** (Configuración) en el **Safety Center** (Centro de Seguridad) permite establecer **Security Contacts** (Contactos de seguridad), direcciones de correo electrónico principales y secundarias para recibir notificaciones de seguridad para tu organización de Datadog. Cuando se detectan problemas de seguridad, como claves de Datadog expuestas públicamente que necesitan [rotación][4], se notifica a los **Security Contacts** (Contactos de seguridad) asignados.

{{< img src="account_management/safety_center/set-security-contacts.png" alt="Configuración de contactos de seguridad" style="width:70%;" >}}

Es importante mantener actualizados los **Contactos de seguridad** para garantizar que los posibles riesgos de seguridad se aborden y mitiguen de forma oportuna. La página del **Centro de seguridad** te recuerda que debes revisar los **Contactos de seguridad** asignados cada 6 meses.

## Acceso y uso compartido
La sección **Access & Sharing** (Acceso y uso compartido) del **Safety Center** (Centro de seguridad) enumera las entidades que permiten el acceso externo a tu organización de Datadog. Destaca:

- Las aplicaciones [**OAuth**][5] que llevan inactivas más de 60 días o tienen acceso de escritura y llevan inactivas más de 30 días.
- [**Claves de API**][3] no utilizadas durante más de 30 días.

### Aplicaciones de OAuth
Las aplicaciones inactivas **OAuth** pueden suponer un riesgo potencial para la seguridad de tu organización si se ven comprometidas. Deben revisarse periódicamente y desactivarse las aplicaciones que ya no se utilicen.

{{< img src="account_management/safety_center/disable-unused-oauth-app.png" alt="Desactivar la aplicación OAuthno utilizada" style="width:70%;" >}}

### API Keys (claves de API)
Las **claves de API** no utilizadas pueden facilitar el acceso no autorizado a tu organización si quedan expuestas en Internet. Las claves no utilizadas deben revisarse y revocarse si la infraestructura de tu organización no depende de ellas.

{{< img src="account_management/safety_center/revoke-unused-api-key.png" alt="Revocar clave de API no utilizada" style="width:70%;" >}}

## Usuarios
Para mantener la seguridad de tu organización es importante seguir las mejores prácticas para la gestión de usuarios. En la página **Users** (Usuarios) del **Safety Center** (Centro de seguridad) aparecen recomendaciones de seguridad relacionadas con los usuarios:

- [Invitaciones de usuarios][7] que no han sido aceptadas durante más de 30 días.
- [Usuarios administradores][1] en el caso que su número supera el 10% de todos los usuarios de una organización.

### Invitaciones pendientes
Tener cuentas de usuario inactivas o **invitaciones de usuario pendientes vigentes** aumenta la superficie para un potencial ataque de toma de control de cuenta. Esto puede ser especialmente peligroso si las cuentas de usuario inactivas tienen acceso con privilegios elevados. Para mantener al mínimo el número de usuarios inactivos, considera la posibilidad de reenviar **invitaciones pendientes antiguas** o de eliminarlas si esos usuarios no necesitan acceder a la plataforma de Datadog.

{{< img src="account_management/safety_center/resend-pending-invite.png" alt="Reenviar invitación pendiente" style="width:70%;" >}}

{{< img src="account_management/safety_center/delete-pending-invite.png" alt="Eliminar invitación pendiente" style="width:70%;" >}}

### Administradores
Dar **acceso de administrador** a los usuarios sin una consideración cuidadosa aumenta los riesgos potenciales de seguridad en casos donde una cuenta de usuario con privilegios elevados se ve comprometida. Para mantener bajo el número de usuarios con **acceso de administrador**, revisa tus usuarios administradores regularmente y revoca los privilegios de administrador si los usuarios no los necesitan.

{{< img src="account_management/safety_center/edit-admin-user.png" alt="Editar usuario de administrador" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/#datadog-default-roles
[2]: /es/account_management/api-app-keys/#application-keys
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/account_management/api-app-keys/#what-to-do-if-an-api-or-application-key-was-exposed
[5]: /es/account_management/org_settings/oauth_apps
[7]: /es/account_management/users/#add-new-members-and-manage-invites