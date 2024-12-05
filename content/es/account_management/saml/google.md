---
aliases:
- /es/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: Google SAML IdP
---

## Configurar Google como proveedor de identidades SAML

[See the dedicated Google instructions (consulta las instrucciones específicas de Google)][1]

## Detalles del proveedor de servicios

Como requisito previo, se debe realizar una comprobación de **IDP initiated SSO** (Inicio de sesión único con IDP) en la [SAML configuration page (página de configuración SAML)][2] de Datadog.

Nombre de aplicación
: cualquiera

Descripción
: cualquiera

ACS URL
: utiliza la URL que aparece en **Assertion Consumer Service URL** (URL del servicio de consumidor de afirmaciones) en la [SAML setup page (página de configuración de SAML)][2] (la que contiene `/id/`). Si hay más de un valor que se muestra para Assertion Consumer Service URL, introduce únicamente uno de ellos aquí.

ID de la entidad
: utiliza la URL que se muestra en **Entity ID** (ID de identidad) en la [SAML setup page (página de configuración de SAML)][2].

URL de inicio
: déjala en blanco o utiliza la **Single Sign On Login URL** (URL de inicio de sesión único) que aparece en la [SAML setup page (página de configuración de SAML)][2].

Respuesta firmada
: déjala sin marcar

Identificador de nombres
: selecciona **Basic Information** (Información básica) e **Primary Email** (Correo electrónico principal)

## Asignación de atributos

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Información básica" "Correo electrónico principal"

Además, añade:

* "urn:oid:2.5.4.4" "Información básica" "Apellido"
* "urn:oid:2.5.4.42" "Información básica" "Nombre"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup