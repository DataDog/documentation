---
aliases:
- /es/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
title: Auth0 SAML IdP
---

## Configuración

Consulta los documentos [Configure Auth0 as Identity Provider for Datadog (Configurar Auth0 como Proveedor de identidades para Datadog)][1] para configurar Auth0 como proveedor de identidades SAML.

## Información adicional

`first_name` y `give_name` son los atributos raíz de un usuario Auth0. Solo se pueden configurar al crear con la API de gestión Auth0. Como referencia, consulta [Normalized User Profiles (perfiles de usuarios normalizados)][2].

La sección `user_metadata` del perfil de usuario se utiliza para especificar información adicional, como, por ejemplo:

{{< img src="account_management/saml/auth0_metadata.png" alt="Actualizar esto" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[2]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema