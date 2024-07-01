---
description: Conoce cómo Datadog utiliza OAuth 2.0.
further_reading:
- link: /developers/authorization/oauth2_endpoints
  tag: Documentación
  text: Aprende a utilizar los endpoints de autorización OAuth 2.0
kind: documentación
title: OAuth2 en Datadog
---

## Información general

Esta página proporciona una visión general paso a paso sobre cómo implementar el protocolo OAuth de extremo a extremo en tu aplicación una vez creado tu **cliente confidencial**.

{{< img src="developers/authorization/oauth_process.png" alt="Un diagrama que explica cómo funciona mejor el proceso de autenticación OAuth después de que un usuario hace clic en el botón Connect Account (Conectar cuenta) en un cuadro de integración." style="width:100%;">}}

## Implementar el protocolo OAuth

1. Dentro de tu cuenta de Datadog Partner Sandbox, crea y configura tu cliente OAuth en la [Plataforma de desarrolladores][16].

2. Después de que un usuario instale tu integración, puedes hacer clic en el botón **Connect Accounts** (Conectar cuentas) para conectar tu cuenta en la pestaña **Configure** (Configurar) del cuadro de integración.

   {{< img src="developers/authorization/connect-accounts.png" alt="Haz clic en el botón Connect Accounts (Conectar cuentas)" style="width:100%;" >}}

   Cuando un usuario hace clic en este botón, se le dirige a la página `onboarding_url` que proporcionaste como parte del proceso de creación del cliente OAuth. Esta página debería ser la página de inicio de sesión de tu plataforma.

3. Una vez que un usuario inicia sesión, redirígelo al [endpoint OAuth2 Authorization][6] con los parámetros de URL adecuados, que incluyen el parámetro añadido `code_challenge` generado por tu aplicación.

   Para saber cómo obtener el parámetro `code_challenge`, consulta la sección [PKCE](#authorization-code-grant-flow-with-pkce). Tu aplicación debe guardar `code_verifier` para la solicitud de token en el paso 5.

   - Para crear la URL de esta solicitud GET, utiliza el parámetro de consulta `site` que se proporciona en la redirección a tu `onboarding_url`.
   - Este parámetro solo se proporciona si el usuario inicia la autorización desde el cuadro de integración de Datadog. Consulta la sección [Iniciar autorización desde una localización de terceros](#Initiate-authorization-from-a-third-party-location) para obtener más opciones si el usuario elige iniciar la autorización externamente.
   - El parámetro de consulta `site` proporciona el [sitio de Datadog][17] en el que se encuentra el usuario autorizante, así como cualquier subdominio que pueda estar utilizando, y es necesario para crear la URL de esta solicitud GET al endpoint de autorización: `<site>/oauth2/v1/authorize?...`.

4. Una vez que el usuario hace clic en **Authorize** (Autorizar), Datadog realiza una solicitud POST al endpoint de autorización. El usuario es redirigido al `redirect_uri` que proporcionaste al configurar el cliente OAuth con el parámetro `code` de autorización en el componente de consulta.

5. Desde `redirect_uri`, haz una solicitud POST al [endpoint de token de Datadog][10] que incluya el código de autorización del paso 4, el `code_verifier` del paso 3, tu ID de cliente OAuth y el secreto de cliente.

   - Para crear la URL de esta solicitud de entrada, utiliza el parámetro de consulta `domain` que se proporciona en la redirección a tu `redirect_uri`.
   - Es necesario para crear la URL de esta solicitud POST al endpoint de token: `https://api.<domain>/oauth2/v1/token`.

6. Si tiene éxito, recibirás tu `access_token` y `refresh_token` en el cuerpo de la respuesta. Tu aplicación debería mostrar una página de confirmación con el siguiente mensaje: `You may now close this tab`.

7. Utiliza `access_token` para realizar llamadas a los endpoints de la API de Datadog enviándolo como parte del título de autorización de tu solicitud: ```headers = {"Authorization": "Bearer {}".format(access_token)}```.
    - **Nota***: Los endpoints de la API son diferentes en cada sitio de Datadog. Por ejemplo, si un usuario se encuentra en la región EU, el endpoint de eventos es `https://api.datadoghq.eu/api/v1/events`, mientras que para los usuarios de US1, el endpoint de eventos es `https://api.datadoghq.com/api/v1/events`.
    - Utiliza el parámetro de consulta `domain` directamente en estas llamadas a la API para asegurarte de que se está contactando con el endpoint correcto. Por ejemplo, para realizar una llamada al endpoint de eventos, deberías crear tu URL de solicitud como `https://api.<domain>/api/v1/events`.
    - Algunos endpoints también pueden requerir una clave de API, que se crea en el paso 8.

8. Llame al [endpoint de creación de claves de API][7] para generar una clave de API que te permita enviar datos en nombre de los usuarios de Datadog.

   Si el contexto `API_KEYS_WRITE` no ha sido añadido a tu cliente, este paso falla. Este endpoint genera una clave de API que solo se muestra una vez, y no puede volver a generarse a menos que el usuario la elimine dentro de su cuenta de Datadog. **Almacena este valor en una base de datos o localización segura**.

Para más información sobre la creación, prueba y publicación de clientes OAuth, consulta [OAuth para integraciones de Datadog][5].

### Iniciar la autorización de una localización de terceros

Los usuarios pueden iniciar el proceso de autorización en Datadog haciendo clic en **Connect Accounts** (Conectar cuentas) en el cuadro de integración. Cuando un usuario hace clic en Connect Accounts (Conectar cuentas) en Datadog, la información relativa a su [sitio de Datadog][17] se envía como redirección a `onboarding_url` y como redirección a `redirect_uri`. El sitio de Datadog del usuario debe realizar llamadas a la API en nombre del usuario y recibir un código de autorización. Si un usuario inicia la autorización desde el sitio web externo de la _integración_, no se proporciona la información del sitio del usuario.

Además, cuando los usuarios inician la autorización desde el cuadro de integración de Datadog, se les exige que dispongan de los permisos correspondientes para todos los contextos solicitados. Si la autorización se inicia desde otro lugar que no sea el cuadro de integración, los usuarios que no dispongan de todos los permisos necesarios podrán completar la autorización (pero se les pedirá que vuelvan a autorizarse con los permisos adecuados cuando regresen al cuadro de integración de Datadog).

Datadog recomienda que los socios pidan a los usuarios que inicien la autorización desde Datadog, en lugar de desde su propia plataforma.

Aunque Datadog no recomienda iniciar la autorización desde una localización de terceros fuera del cuadro de integración de Datadog, si decides seguir este camino, debes asegurarte de que puedes dar soporte a los usuarios de todos los sitios de Datadog y de que podrás seguir dando soporte a los nuevos sitios de Datadog que se creen. Esto suele incluir la implementación de una forma para que el usuario introduzca manualmente su sitio en tu plataforma durante la autorización.

Ten en cuenta que las organizaciones también pueden tener subdominios (por ejemplo, https://subdomain.datadoghq.com). Los subdominios no deben incluirse en las llamadas a la API, por lo que el uso del parámetro de consulta `domain` que se devuelve en la redirección a `redirect_uri` es recomendado a la hora de crear la URL para cualquier llamada a la API. Para asegurarte de que los usuarios se autorizan en el sitio correcto, dirígelos siempre al sitio de Datadog de US1 (`app.datadoghq.com`), y desde allí podrán seleccionar su región.

## Flujo de concesión de códigos de autorización con PKCE

Aunque el protocolo OAuth2 admite varios flujos de concesión, el [flujo de concesión de código de autorización][8] [con PKCE](#authorization-code-grant-flow-with-pkce) es el tipo de concesión recomendado para aplicaciones de larga duración en las que un usuario concede su consentimiento explícito una vez y las credenciales del cliente pueden almacenarse de forma segura.

Este tipo de concesión permite a las aplicaciones obtener de forma segura un código de autorización único e intercambiarlo por un token de acceso que les permite realizar solicitudes a las API de Datadog. El flujo de concesión de código de autorización consta de tres pasos:

1. La aplicación [solicita autorización a un usuario][6] para acceder a un conjunto de contextos de Datadog.
2. Cuando un usuario pulsa **Authorize** (Autorizar), la aplicación [obtiene un código de autorización único][12].
3. La aplicación [intercambia el código de autorización por un token de acceso][10], que se utiliza para acceder a las API de Datadog.

### Utilizar la extensión PKCE

[Proof key for code exchange (PKCE)][11] es una extensión del flujo de concesión de código de autorización OAuth2 para proteger a los clientes OAuth2 de ataques de interceptación. Si un atacante intercepta el flujo y obtiene acceso al código de autorización antes de que se devuelva a la aplicación, puede obtener tokens de acceso y acceder a las API de Datadog.

Para mitigar estos ataques, la extensión PKCE incluye los siguientes parámetros para correlacionar de forma segura una solicitud de autorización con una solicitud de token a lo largo del flujo de concesión:

| Parámetro             | Definición                                                                                                                           |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Verificador de códigos         | Cadena aleatoria criptográfica generada dinámicamente.                                                                                 |
| Impugnación del código        | Una transformación del verificador de código. El `code_challenge` debe utilizar una codificación `base64url`.                                           |
| Método de impugnación de códigos | El método utilizado para derivar el `code_challenge` del `code_verifier`. Debes utilizar [SHA-256][16] para calcular el `code_challenge`. |

El [protocolo PKCE][11] se integra con el flujo de concesión del código de autorización realizando las siguientes acciones:

- La aplicación genera una cadena aleatoria `code_verifier` y obtiene el correspondiente `code_challenge` utilizando el `code_challenge_method`.

- La aplicación envía una solicitud de autorización a Datadog con los parámetros `code_challenge` y `code_challenge_method` para obtener un código de autorización.

- La aplicación envía una solicitud de token a Datadog con el código de autorización y `code_verifier` para obtener un token de acceso. El endpoint de token verifica el código de autorización transformando el `code_verifier` mediante el `code_challenge_method` y comparándolo con el valor original de `code_challenge`.

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: /es/api/latest/scopes/
[3]: /es/developers/datadog_apps/#oauth-api-access
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[5]: /es/developers/integrations/oauth_for_integrations
[6]: /es/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#request-authorization-from-a-user
[7]: /es/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints#create-an-api-key-on-behalf-of-a-user
[8]: https://tools.ietf.org/html/rfc6749#section-4.1
[9]: /es/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#obtain-an-authorization-code
[10]: /es/developers/authorization/oauth2_endpoints/?tab=tokenendpoints#exchange-authorization-code-for-access-token
[11]: https://datatracker.ietf.org/doc/html/rfc7636
[12]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
[13]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.2
[14]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.3
[15]: https://datatracker.ietf.org/doc/html/rfc6234#section-4.1
[16]: https://app.datadoghq.com/apps
[17]: /es/getting_started/site/