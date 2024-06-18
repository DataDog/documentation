---
aliases:
- /es/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: Azure Active Directory SAML IdP
---

## Configuración

Sigue el tutorial de [Azure Active Directory single sign-on (SSO) integration with Datadog (Integración del inicio de sesión único (SSO) de Azure Active Directory con Datadog)][1] para configurar Azure AD como proveedor de identidades (IdP) SAML. **Nota**: Es necesario tener una suscripción de Azure AD. Si no la tienes, crea una [free account (cuenta gratuita)][2].

### Datadog

1. Accede a la [Datadog SAML page (página SAML de Datadog)][3].

2. Selecciona e importa el archivo **SAML XML Metadata** (Metadatos SAML XML) descargado de Azure.

3. Te deberían aparecer los mensajes **SAML is ready** (SAML está listo) y **Valid IdP metadata installed** (metadatos de IdP válidos instalados):

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" style="width:70%;">}}

4. Haz clic en **Enable** (Activar) para comenzar a usar el inicio de sesión único de Azure AD con SAML:

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" style="width:70%;">}}

### URL avanzada

Si inicias sesión a través de SSO mediante un botón o un enlace de Datadog, es obligatorio tener una URL de inicio de sesión único:

1. Recupera la URL de inicio de sesión único de la [Datadog SAML page (página SAML de Datadog)][3]:

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" style="width:70%;">}}

2. En Azure, abre la sección Configuración de SSO de tu aplicación de Azure, revisa **Show advanced URL settings** (Mostrar configuración avanzada de URL) y añade tu URL de inicio de sesión único.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/datadog-tutorial
[2]: https://azure.microsoft.com/free/
[3]: https://app.datadoghq.com/saml/saml_setup