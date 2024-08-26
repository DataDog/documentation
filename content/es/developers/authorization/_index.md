---
further_reading:
- link: https://www.datadoghq.com/blog/oauth/
  tag: Blog
  text: Autoriza tus integraciones de Datadog con OAuth
- link: /developers/integrations/oauth_for_integrations
  tag: Documentación
  text: Implementa OAuth para tu integración
- link: /developers/authorization/oauth2_in_datadog/
  tag: Documentación
  text: Más información sobre OAuth2 en Datadog
- link: /developers/authorization/oauth2_endpoints
  tag: API
  text: Referencia de endpoints de autorización de OAuth2
title: Autorización
type: documentación
---

## Información general

Datadog utiliza [OAuth 2.0 (OAuth2) Authorization Framework][1] para permitir a los usuarios autorizar de forma segura el acceso de aplicaciones de terceros a recursos restringidos de Datadog en nombre del usuario. El acceso que tienen las aplicaciones viene determinado por [contextos][2], que permite a los usuarios conceder consentimiento explícito para un conjunto específico de permisos detallados solicitados por la aplicación.

## Clientes y credenciales

Un cliente OAuth2 es el componente de una aplicación que permite a los usuarios autorizar el acceso de la aplicación a los recursos de Datadog en nombre del usuario. OAuth2 define dos tipos de clientes: públicos y [confidenciales][3].

Clientes públicos
: normalmente se utilizan para aplicaciones basadas en navegador y no son capaces de almacenar información confidencial.
<!--Algunos ejemplos de clientes públicos son clientes de OAuth para [Extensiones de interfaz de usuario][4]. -->

Clientes confidenciales
: son capaces de almacenar datos sensibles y requieren un `client_secret` adicional para realizar solicitudes de autorización. Los clientes de OAuth para integraciones son clientes confidenciales.

Al crear un cliente de OAuth, se emite un conjunto de credenciales de cliente en forma de ID de cliente y, opcionalmente, un secreto de cliente para clientes confidenciales.

ID de cliente 
: se utiliza para identificar a tu cliente cuando realiza solicitudes a los endpoints de autorización y token.

Secreto de cliente 
: si se emite, se utiliza para autenticar al cliente cuando realiza solicitudes a los endpoints de autorización. Copia inmediatamente después el secreto del cliente y guárdalo de forma segura, ya que se trata de una contraseña confidencial que solo se expone una vez al crear el cliente.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: https://docs.datadoghq.com/es/api/latest/scopes/
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[4]: https://docs.datadoghq.com/es/developers/ui_extensions/#oauth-api-access