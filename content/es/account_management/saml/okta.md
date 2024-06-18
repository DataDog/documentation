---
aliases:
- /es/account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: Okta SAML IdP
---

## Configuración

Sigue las instrucciones de Okta [Create custom SAML app integrations (crear integraciones de aplicación SAML personalizada)][1] para configurar Okta como IdP SAML.

**Nota**: Configura Datadog como una aplicación Okta manualmente. No utilices la aplicación Datadog preconfigurada.

{{% site-region region="us" %}}

**Nota**: Los clientes de US1 pueden utilizar la aplicación preconfigurada Configuración en las instrucciones [add existing app integraciones][7] de Okta para Configurar Okta como IdP SAML. Utiliza la última aplicación preconfigurada de Datadog en la [Okta Integration Network (OIN) (red de integración de Okta [OIN])][2].

[7]: https://help.okta.com/en-us/content/topics/apps/apps-add-applications.htm
[2]: https://www.okta.com/integrations/
{{% /site-region %}}

## Detalles generales

| Campo de entrada del proveedor de identificación Okta        | Valor esperado                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| URL de inicio de sesión único          | URL del servicio de consumidor de afirmaciones (Encuentra esta URL en la [Configure SAML page (configurar página SAML)][3], en el campo *Assertion Consumer Service URL* [URL del servicio de consumidor de afirmaciones]). |
| URL del receptor               | URL del servicio de consumidor de afirmaciones (o haz clic en *Use this for Recipient URL and Destination URL* [Utilizar esta URL del receptor y URL de destino])                        |
| URL de destino             | URL del servicio de consumidor de afirmaciones (o haz clic en la casilla *Use this for Recipient URL and Destination URL* [Utilizar esta URL del receptor y URL de destino])                        |
| URI de audiencia (ID de entidad del proveedor de servicios) | ID de entidad proveedora de servicios (Encuentra este ID en la [Configure SAML page (página Configurar SAML)][3], en el campo *Service Provider Entity ID* [ID de entidad proveedora de servicios]).         |
| Formato de ID de nombre              | EmailAddress                                                                                                                   |
| Respuesta                    | Firmada                                                                                                                         |
| Firma de la aserción         | Firmada                                                                                                                         |
| Algoritmo de firma         | SHA256                                                                                                                         |
| Cifrado de la afirmación        | Es posible que las afirmaciones estén cifradas, aunque si están sin cifrar también son compatibles.                                                     |
| Cierre de sesión único SAML          | Desactivado                                                                                                                       |
| authnContextClassRef        | PasswordProtectedTransport                                                                                                     |
| Autenticación Honor Force  | Sí                                                                                                                            |
| ID del emisor SAML              | `http://www.okta.com/${org.externalKey}`                                                                                       |

## Detalles de las declaraciones de atributos

| Nombre       | Formato de nombre (opcional) | Valor                                             |
|------------|------------------------|---------------------------------------------------|
| NameFormat | Referencia URI          | `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` |
| sn         | Referencia URI          | `user.lastName`                                   |
| givenName  | Referencia URI          | `user.firstName`                                  |

## Declaración de atributos de grupo (opcional)

Esto solo es necesario si utilizas [AuthN Mapping (Asignación de AuthN)][4].

| Nombre     | Formato de nombre (opcional) | Valor                                                                                                                     |
|----------|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| memberOf | Sin especificar            | Coincide con la expresión regular `.*`. (Este método recupera todos los grupos. Ponte en contacto con el administrador de tu proveedor de identidades si no es adecuado para ti). |


Encontrarás información adicional sobre la configuración de SAML para tu cuenta de Datadog en la [SAML documentation page (página de documentación de SAML)][5].

En el caso de que necesitas para cargar un archivo `IDP.XML` a Datadog antes de ser capaz de completamente configurar la aplicación en Okta, ve [acquiring the idp.xml metadata file for a SAML template App article (el artículo sobre la adquisición del archivo de metadatos idp.xml para una app de plantilla SAML][6] para las instrucciones de marcador de posición de campo.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm?cshid=ext_Apps_App_Integration_Wizard-saml
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: /es/account_management/saml/mapping
[5]: /es/account_management/saml/
[6]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App