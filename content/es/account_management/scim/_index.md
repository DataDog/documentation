---
algolia:
  tags:
  - scim
  - proveedor de identidad
  - IdP
description: Automatiza el suministro y la quita de usuarios en Datadog mediante la
  integración de SCIM con los proveedores de identidades Microsoft Entra ID y Okta.
further_reading:
- link: /account_management/scim/azure/
  tag: Documentación
  text: Configurar el SCIM con Azure Active Directory
- link: account_management/scim/okta
  tag: Documentación
  text: Configurar el SCIM con Okta
title: Suministro de usuarios con el SCIM
---

<div class="alert alert-info">
SCIM está disponible con los planes Infrastructure Pro e Infrastructure Enterprise.
</div>

## Información general

El Sistema para la Gestión de Identidades entre Dominios, o [SCIM][9], es un estándar abierto que permite la automatización del aprovisionamiento de usuarios. Con SCIM, puedes aprovisionar y desaprovisionar usuarios automáticamente en tu organización de Datadog de forma sincronizada con el proveedor de identidades (IdP) de tu organización.

### Funciones compatibles

- Crear usuarios en Datadog (se requiere verificación de correo electrónico para el primer inicio de sesión, consulta [verificación de correo electrónico][1])
- Eliminar usuarios en Datadog cuando ya no necesiten acceso
- Mantener sincronizados los atributos del usuario entre el proveedor de identidad (IdP) y Datadog
- Inicio de sesión único en Datadog (recomendado)
- Teams gestionados: crea Teams de Datadog a partir de grupos del proveedor de identidades y mantén sincronizada la pertenencia a los Teams de Datadog con la pertenencia a grupos en el proveedor de identidades.

Datadog implementa el protocolo de servidor de SCIM. Datadog admite el uso de SCIM con los proveedores de identidad de Microsoft Entra ID y Okta. Otros proveedores de identidad pueden funcionar, pero no son explícitamente compatibles.

Para configurar SCIM para los proveedores de identidad compatibles, consulta la documentación de tu IdP:
- [Microsoft Entra ID][2]
- [Okta][3]

### Requisitos previos

SCIM en Datadog es una función avanzada incluida en los planes Infrastructure Pro e Infrastructure Enterprise.

Esta documentación presupone que tu organización gestiona las identidades de los usuarios utilizando un proveedor de identidad (IdP).

Datadog recomienda encarecidamente utilizar la clave de aplicación de una cuenta de servicio al configurar el SCIM, para evitar cualquier interrupción en el acceso. Para obtener más información, consulta el [uso de cuentas de servicio con el SCIM][4].

Al utilizar SAML y SCIM conjuntamente, Datadog recomienda encarecidamente deshabilitar el suministro justo-a-tiempo (JIT) de SAML, para evitar discrepancias en el acceso. Gestiona el suministro de usuarios únicamente a través del SCIM.

## Uso de una cuenta de servicio con el SCIM

Para activar el SCIM, debes utilizar una [clave de aplicación][5] para proteger la conexión entre tu proveedor de identidad (IdP) y su cuenta de Datadog. Un usuario específico o una cuenta de servicio controla cada clave de aplicación.

Si utilizas una clave de aplicación vinculada a un usuario para habilitar el SCIM y ese usuario abandona tu organización, su cuenta de Datadog se vacía. La clave de aplicación específica de ese usuario se revoca y puedes romper permanentemente tu integración del SCIM, lo que impide a los usuarios de tu organización acceder a Datadog.

Para evitar perder el acceso a tus datos, Datadog te recomienda encarecidamente que crees una [cuenta de servicio][6] exclusiva del SCIM. Dentro de esa cuenta de servicio, crea una clave de aplicación para utilizarla en la integración del SCIM.

## Verificación del correo electrónico

Al crear un nuevo usuario con SCIM, se le envía un correo electrónico. Para acceder por primera vez, se requiere loguear a través del enlace de invitación compartido por correo electrónico. El enlace está activo durante 2 días. Si caduca, ve a la [página de configuración de usuarios][7] y selecciona un usuario para volver a enviarle un enlace de invitación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/scim/#email-verification
[2]: /es/account_management/scim/azure
[3]: /es/account_management/scim/okta
[4]: /es/account_management/scim/#using-a-service-account-with-scim
[5]: /es/account_management/api-app-keys
[6]: /es/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /es/help/
[9]: https://scim.cloud/