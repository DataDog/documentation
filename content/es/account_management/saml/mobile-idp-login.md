---
aliases:
- /es/account_management/faq/how-do-i-use-the-mobile-app-with-saml/
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
is_public: true
title: Las aplicaciones móviles de Datadog con SAML iniciado por IdP
---

## Configuración

Para utilizar la aplicación móvil Datadog con SAML iniciado por el proveedor de identidades (IdP), debes pasar un estado de retransmisión adicional a Datadog para activar la página de destino de la aplicación móvil al iniciar sesión. Una vez habilitado, todos los inicios de sesión desde SAML para esa aplicación en particular aterrizarán en una página intersticial antes de continuar.

- En **mobile devices** (dispositivos móviles) que tengan la aplicación de Datadog instalada, **primero es necesario iniciar sesión con el proveedor de identidades a través del navegador móvil** (consulta el ejemplo de abajo con Google). Luego, la aplicación captura automáticamente la solicitud y permite al usuario iniciar sesión.

{{< img src="account_management/saml/google_idp_tile_sml.png" style="width:60%; background:none; border:none; box-shadow:none;" alt="Estado de la retransmisión de Google como proveedor de identidades" >}}

- En **Desktop devices** (dispositivos de escritorio) o en otros que no tengan la aplicación instalada, el usuario tiene que hacer clic en "Use the Datadog Website" (utilizar la página web de Datadog) para poder avanzar.

{{< img src="account_management/saml/datadog-mobile-idp-saml-landing-page.png" alt="Página intersticial SAML de Datadog para móviles" >}}

## Proveedores

**Nota:** SAML iniciado por IdP Datadog funciona con la mayoría de los proveedores de identidad. Si tienes problemas al configurar su proveedor de identidad con la aplicación móvil Datadog, ponte en contacto con [Datadog support (soporte de Datadog)][1]. 

### OneLogin

Cuando configures tu aplicación OneLogin, establece el valor del estado de retransmisión en la página **Application Details** (Detalles de la aplicación) en `dd_m_idp`.
{{< img src="account_management/saml/one-login-mobile-idp-relay-state.png" alt="Página de detalles de la aplicación de One Login" >}}

### Okta

Cuando configures tu aplicación Okta, establece el valor por defecto de RelayState en la página **Configure SAML** (Configurar SAML) en `dd_m_idp`.
{{< img src="account_management/saml/okta-mobile-idp-relay-state.png" alt="Página de configuración de SAML de Okta" >}}

### Google

Cuando configures tu aplicación de Google para SAML, establece la **Start URL** (URL de inicio) en detalles del proveedor de servicio en `dd_m_idp`.
{{< img src="account_management/saml/google-mobile-idp-relay-state.png" alt="Página de detalles de proveedor de servicio de Google" >}}

## Solucionar problemas

Si aparece un error `403 Forbidden` al iniciar sesión después de configurar el estado de retransmisión, ponte en contacto con [Support (soporte)][1] para asegurarte de que la función se ha activado para tu organización.

[1]: /es/help/