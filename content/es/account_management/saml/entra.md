---
aliases:
- /es/account_management/saml/azure/
- /es/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: IdP SAML Microsoft Entra ID
---

## Configuración

Sigue el tutorial de la [integración del inicio de sesión único (SSO) de Microsoft Entra con Datadog][1] para configurar Entra ID como proveedor de identidad (IdP) SAML. **Nota**: Se requiere una suscripción a Entra ID. Si no tienes una suscripción, regístrate para obtener una [cuenta gratuita][2].

### Datadog

1. Ve a la [página de Datadog SAML][3].

2. Elige y carga el archivo **SAML XML Metadata** descargado de Microsoft.

3. Deberías ver los mensajes **SAML está listo** y **Metadatos de IdP válidos instalados**:

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" style="width:70%;">}}

4. Haz clic en **Enable** (Habilitar) para empezar a utilizar el inicio de sesión único Entra ID con SAML:

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" style="width:70%;">}}

### URL avanzada

Si inicias sesión a través de SSO mediante un botón o un enlace de Datadog, necesitas una URL de inicio de sesión:

1. Recupera la URL de inicio de sesión único de la [página SAML de Datadog)][3]:

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" style="width:70%;">}}

2. En Microsoft Entra ID, ve a la sección de configuración del inicio de sesión único de tu aplicación, selecciona **Mostrar configuración de URL avanzada** y añade tu URL de inicio de sesión único.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/entra/identity/saas-apps/datadog-tutorial
[2]: https://azure.microsoft.com/free/
[3]: https://app.datadoghq.com/saml/saml_setup