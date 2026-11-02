---
aliases:
- /es/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
description: Configure Google como un proveedor de identidad SAML para Datadog con
  los detalles del proveedor de servicio y el mapeo de atributos para un inicio de
  sesión único seguro.
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configure SAML para su cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configuración de Teams y organizaciones con múltiples cuentas
title: IdP SAML de Google
---
## Configuración de Google como IdP SAML {#setting-up-google-as-a-saml-idp}

[Consulte las instrucciones dedicadas de Google][1]

## Detalles del proveedor de servicio {#service-provider-details}

Como requisito previo, {{< ui >}}IDP initiated SSO{{< /ui >}} debe estar marcado en la [página de configuración de SAML][2] de Datadog.

Application Name
: Puede ser cualquier cosa

Descripción
: Puede ser cualquier cosa

ACS URL
: Utilice la URL que se muestra en {{< ui >}}Assertion Consumer Service URL for IdP Initiated Login{{< /ui >}} en la [página de configuración de SAML][2] (la que contiene `/id/`). Si se muestra más de un valor para Assertion Consumer Service URL, ingrese solo uno de ellos aquí.

Entity ID
: Utilice la URL que se muestra en {{< ui >}}Entity ID{{< /ui >}} en la [página de configuración de SAML][2].

Start URL
: Puede dejarse en blanco o utilizar la {{< ui >}}Single Sign On Login URL{{< /ui >}} que aparece en la [página de configuración de SAML][2].

Signed Response
: Deje la casilla sin marcar

Name ID
: Seleccione {{< ui >}}Basic Information{{< /ui >}} y {{< ui >}}Primary Email{{< /ui >}}

## Asignación de atributos {#attribute-mapping}

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Basic Information" "Primary Email"

También agregue:

* "urn:oid:2.5.4.4" "Basic Information" "Last Name"
* "urn:oid:2.5.4.42" "Basic Information" "First Name"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup