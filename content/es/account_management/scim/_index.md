---
algolia:
  tags:
  - scim
  - proveedor de identidad
  - IdP
further_reading:
- link: /account_management/scim/azure/
  tag: Documentación
  text: Configurar el SCIM con Azure Active Directory
- link: account_management/scim/okta
  tag: Documentación
  text: Configurar el SCIM con Okta
title: Suministro de usuarios con el SCIM
---

## Información general

El Sistema de administración de identidades entre dominios, o SCIM, es un estándar abierto que permite automatizar el suministro de usuarios. Con el SCIM, puedes suministrar y quitar automáticamente usuarios en tu organización Datadog, de manera sincronizada con el proveedor de identidad (IdP) de tu organización.

### Funciones compatibles

- Crear usuarios en Datadog (se requiere verificación de correo electrónico para el primer inicio de sesión, consulta [verificación de correo electrónico][1])
- Eliminar usuarios en Datadog cuando ya no necesiten acceso
- Mantener sincronizados los atributos del usuario entre el proveedor de identidad y Datadog
- Inicio de sesión único en Datadog (recomendado)

Datadog admite el uso del SCIM con los proveedores de identidad Azure Active Directory (Azure AD) y Okta. Para configurar el SCIM, consulta la documentación de tu proveedor de identidad (IdP):
- [Azure AD][2]
- [Okta][3]

### Requisitos previos

SCIM en Datadog es una función avanzada incluida en el plan Enterprise.

Esta documentación presupone que tu organización gestiona las identidades de los usuarios utilizando un proveedor de identidad.

Datadog recomienda encarecidamente utilizar la clave de aplicación de una cuenta de servicio al configurar el SCIM, para evitar cualquier interrupción en el acceso. Para obtener más información, consulta el [uso de cuentas de servicio con el SCIM][4].

Al utilizar SAML y SCIM conjuntamente, Datadog recomienda encarecidamente deshabilitar el suministro justo-a-tiempo (JIT) de SAML, para evitar discrepancias en el acceso. Gestiona el suministro de usuarios únicamente a través del SCIM.

## Uso de una cuenta de servicio con el SCIM

Para activar el SCIM, debes utilizar una [clave de aplicación][5] para proteger la conexión entre tu proveedor de identidad y su cuenta de Datadog. Un usuario específico o una cuenta de servicio controla cada clave de aplicación.

Si utilizas una clave de aplicación vinculada a un usuario para habilitar el SCIM y ese usuario abandona tu organización, su cuenta de Datadog se vacía. La clave de aplicación específica de ese usuario se revoca y puedes romper permanentemente tu integración del SCIM, lo que impide a los usuarios de tu organización acceder a Datadog.

Para evitar perder el acceso a tus datos, Datadog te recomienda encarecidamente que crees una [cuenta de servicio][6] exclusiva para SCIM. Dentro de esa cuenta de servicio, crea una clave de aplicación para utilizarla en la integración SCIM.

## Verificación del correo electrónico

Al crear un nuevo usuario con SCIM, se le envía un correo electrónico. Para acceder por primera vez, se requiere iniciar sesión a través del enlace de invitación compartido por correo electrónico. El enlace está activo durante 30 días. Si caduca, ve a la [página de configuración de usuarios][7] y selecciona un usuario para volver a enviarle un enlace de invitación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/scim/#email-verification
[2]: /es/account_management/scim/azure
[3]: /es/account_management/scim/okta
[4]: /es/account_management/scim/#using-a-service-account-with-scim
[5]: /es/account_management/api-app-keys
[6]: /es/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users