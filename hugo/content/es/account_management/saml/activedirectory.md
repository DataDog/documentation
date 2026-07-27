---
aliases:
- /es/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: Microsoft Active Directory Federation Services SAML IdP
---

La integración de SAML Datadog para el inicio de sesión único permite asociar una organización a un sistema externo de gestión de usuarios para que las credenciales se puedan mantener y gestionar desde un sistema central. Esta guía completa el documento [Single Sign On With SAML (Inicio de sesión único con SAML)][1], que brinda una información general sobre cómo funciona el inicio de sesión único desde la perspectiva de Datadog.

Para comenzar con la configuración de SAML para Active Directory Federation Service (AD FS), consulta el documento de Microsoft [Configure a SAML 2.0 provider for portals with AD FS (configurar un proveedor SAML 2.0 para portales con AD FS)][2].

Con SAML configurado, los usuarios pueden iniciar sesión a través del enlace que aparece en la [SAML configuration page (página de configuración de SAML)][3]. Ten en cuenta que deben contar con una invitación y estar activos antes de poder iniciar sesión. Asegúrate de invitarlos mediante la dirección de correo electrónico correspondiente a sus registros de usuario de Active Directory; de lo contrario, se les podría denegar como se muestra a continuación.

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla" style="width:60%;">}}

En la mayoría de configuraciones la dirección `user@domain` de un usuario es su credencial de Microsoft, pero podría no ser el caso. Puedes confirmar el correo electrónico utilizada en el registro de usuario según se indica a continuación.

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK" style="width:60%;">}}

Si tienes preguntas sobre errores en la aplicación de Datadog relacionados con SAML, ponte en contacto con [the Datadog support team (el equipo de soporte de Datadog)][4]. Para errores sobre la configuración y errores de SAML para AD FS, ponte en contacto con el [Microsoft support (soporte de Microsoft)][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/saml/
[2]: https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-saml2-settings
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: /es/help/
[5]: https://powerapps.microsoft.com/en-us/support/