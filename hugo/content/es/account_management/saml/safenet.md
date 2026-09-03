---
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
title: SafeNet SAML IdP
---

## Configuración

Sigue las [main SAML configuration instructions (instrucciones de configuración generales de SAML)][1] y luego consulta los documentos [SafeNet Trusted Access for Datadog (SafeNet Trusted Access para Datadog)][2] para configurar SafeNet como tu proveedor de identidades SAML.

## Datadog

* Haz clic en el botón **Download Metadata** para descargar los metadados del proveedor de identidades desde la consola SafeNet Trusted Access.
* En Datadog, asegúrate de que está marcada la casilla **Identity Provider (IdP) Initiated Login** (inicio de sesión iniciado a través del proveedor de identidades).
* Se necesitan los [Service Provider metadata (metadatos del proveedor de servicios)][3] de Datadog.

## Verificar la autenticación

### Uso de la consola STA

Ve a la URL de inicio de sesión Datadog. Una vez redirigido a la página de inicio de sesión de SafeNet Trusted Access, introduce la información de inicio de sesión de tu directorio principal y aprueba la autenticación de dos pasos. Esto te redirigirá de nuevo a Datadog después de la autenticación.

**Nota**: Para el modo iniciado por IdP, introduce la **Assertion Consumer Service URL** (URL del servicio de consumidor de afirmación) que se encuentra en Datadog en la consola de SafeNet Trusted Access.

### Uso del portal de usuario STA

Navega hasta la URL del Portal del usuario para iniciar sesión en el dashboard del Portal del usuario de STA. El dashboard te muestra una lista de las aplicaciones a las que tienes acceso. Haz clic en el icono de la aplicación Datadog, que te redirige a Datadog tras la autenticación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/saml/#configure-saml
[2]: https://resources.safenetid.com/help/Datadog/Index.htm
[3]: https://app.datadoghq.com/account/saml/metadata.xml