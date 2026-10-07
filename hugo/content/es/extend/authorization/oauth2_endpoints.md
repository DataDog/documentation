---
aliases:
- /es/developers/authorization/oauth2_endpoints/
description: Aprenda a utilizar los puntos de conexión de autorización de OAuth2.
further_reading:
- link: /extend/authorization/
  tag: Documentación
  text: Obtenga información sobre la autorización de OAuth2
title: Referencia de puntos de conexión de autorización de OAuth2
---
## Descripción general {#overview}

Las aplicaciones que utilizan recursos protegidos de Datadog deben ser autorizadas por un usuario antes de que puedan acceder a las API de Datadog en nombre del usuario. Estos endpoints dirigen a la aplicación a través del flujo de concesión de código de autorización. 

{{< tabs >}}
{{% tab "Puntos de conexión de autorización" %}}

## Solicite autorización a un usuario {#request-authorization-from-a-user}

### `GET /oauth2/v1/authorize` {#get-oauth2v1authorize}

#### Descripción general {#overview-1}

Para iniciar el flujo de concesión de código de autorización, una aplicación realiza una solicitud `GET` al punto de conexión de autorización de Datadog. Esto redirige al usuario al flujo de concesión de autorización de Datadog y muestra una página de consentimiento con la lista de alcances solicitados por su aplicación y una solicitud para que el usuario autorice el acceso. Esto también devuelve el [sitio de Datadog][1] desde el cual se realiza la solicitud. 

#### Solicitud {#request}
En la solicitud de autorización, la aplicación construye el URI de redireccionamiento añadiendo los siguientes parámetros al componente de consulta del URI utilizando el formato `application/x-www-form-urlencoded`: 

| Parámetro de URL                               | Descripción                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | El punto de conexión de redireccionamiento de su aplicación después de que un usuario concede o deniega el acceso.                              |
| `client_id`                                   | El ID de cliente de su cliente OAuth2.                                                                       |
| `response_type`                               | El tipo de respuesta debe ser `code` para este flujo de concesión.                                                        |
| `code_challenge`  (si PKCE está habilitado)        | Una transformación de `code_verifier`. Datadog recomienda utilizar `SHA-256` para calcular el desafío de código.     |
| `code_challenge_method`  (si PKCE está habilitado) | Se admite el método utilizado para calcular el desafío de código. `SHA-256`, o `S256`.  |

#### Ejemplo de solicitud {#example-request}

Para mostrar la página de consentimiento de Datadog, redirija a los usuarios al punto de conexión con los parámetros especificados: 

```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### Respuesta de éxito {#success-response}

Si un usuario concede correctamente la solicitud de acceso, su aplicación [obtiene un código de autorización](#obtain-an-authorization-code) y redirige al usuario al URI de redireccionamiento con la autorización `code`, así como el parámetro `domain`, en el componente de consulta. 

#### Respuesta de error {#error-response}

Si la solicitud falla debido a un `redirect_uri` o `client_id` no válido, el usuario no es redirigido al URI especificado; en su lugar, se muestra una página de error de Datadog.

Si un usuario deniega la autorización, o la solicitud falla por otros motivos, el usuario es redirigido al `redirect_uri` con un parámetro [error][2] en el componente de consulta.

## Obtener un código de autorización {#obtain-an-authorization-code}

### `POST /oauth2/v1/authorize` {#post-oauth2v1authorize}

#### Descripción general {#overview-2}
Cuando un usuario hace clic en el botón **Autorizar** en la página de consentimiento, se envía automáticamente una solicitud `POST` al [punto de conexión de autorización][3] para verificar la solicitud y devolver un código de autorización único. El usuario es redirigido al `redirect_uri` de su aplicación con el parámetro de código de autorización en el componente de consulta.

#### Solicitud {#request-1}
Su aplicación no necesita realizar esta solicitud de autorización. Este paso es una respuesta a la solicitud de autorización de usuario anterior y es solicitado automáticamente por Datadog cuando un usuario autoriza correctamente una aplicación. 


[1]: https://docs.datadoghq.com/es/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "Puntos de conexión de token" %}}

## Intercambiar código de autorización por token de acceso {#exchange-authorization-code-for-access-token}

### `POST /api/v2/oauth2/token` {#post-apiv2oauth2token}

#### Descripción general {#overview-3}

Una vez que se devuelve un código de autorización de la solicitud de autorización, su aplicación puede intercambiar este código por un token de acceso y un token de actualización. El código de autorización se extrae del URI de redireccionamiento y se envía en una solicitud `POST` al [punto de conexión de token][1] de OAuth2 de Datadog. 

Los [tokens de acceso][2] de Datadog son tokens de corta duración con un tiempo de vida (TTL) de 1 hora que otorgan acceso a las API de Datadog. Los [tokens de actualización][3] para clientes OAuth de Marketplace son tokens de larga duración sin expiración (TTL de infinito) que se utilizan para obtener automáticamente un nuevo token de acceso cada vez que caduca. Cuando un usuario revoca su autorización, debe volver a autorizar un nuevo conjunto de tokens de acceso y de actualización para la aplicación (el token de actualización caduca). 

#### Solicitud {#request-2}

La [solicitud de token de acceso][4] se realiza con los siguientes parámetros en el cuerpo de la solicitud `POST` con el formato `application/x-www-form-urlencoded`:

|  Parámetro de cuerpo HTTP               | Descripción                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | El mismo [punto de conexión de redireccionamiento][5] enviado en las solicitudes de autorización.                                                                                                                                   |
| `client_id`                          | El ID de cliente de su cliente OAuth2.                                                                                                                                                                |
| `client_secret` (si se emitió)          | El secreto de cliente de su cliente confidencial OAuth2.                                                                                                                                                    |
| `grant_type`                         | El tipo de concesión debe ser `authorization_code` para recibir su token de acceso y token de actualización iniciales, y el tipo de concesión debe ser `refresh_token` para recibir cualquier token de acceso y actualización posterior. |
| `code_verifier` (si PKCE está habilitado) | El [verificador de código][6] sin procesar utilizado para derivar el desafío de código enviado en las solicitudes de autorización.                                                                                                         |
| `code`                               | El código de autorización generado y devuelto desde la solicitud POST de autorización anterior.                                                                                                         |

#### Ejemplo de solicitud {#example-request-1}

Utilice este comando cURL para realizar una solicitud de token de acceso:

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/api/v2/oauth2/token"
```

#### Respuesta de éxito {#success-response-1}

Si la solicitud de token de acceso es válida y está autorizada, la [respuesta del token][7] devuelve un código de estado `200 OK` con el token de acceso y el token de actualización contenidos en el cuerpo de la respuesta HTTP. 

#### Respuesta de error {#error-response-1}

Las solicitudes fallidas realizadas a los puntos de conexión de token deben ser manejadas por la aplicación, como redirigir a los usuarios a una página de error adecuada en la aplicación. 

Si un cliente confidencial con un secreto de cliente emitido realiza una solicitud de token sin proporcionar el parámetro `client_secret`, se devuelve un código de estado `401 Unauthorized`.

Si una solicitud de token falla por otros motivos, como una solicitud mal formada o un código de autorización no válido, se devuelve un código de estado `400 Bad Request` (a menos que se especifique lo contrario) con un parámetro [`error`][8]. 

## Revocar tokens {#revoke-tokens}

### `POST /oauth2/v1/revoke` {#post-oauth2v1revoke}

#### Descripción general {#overview-4}

Los usuarios pueden revocar los tokens de acceso o de actualización en cualquier momento. Cuando se revocan, los tokens ya no se pueden usar para acceder a las API de Datadog. Para revocar un token determinado, su aplicación realiza una solicitud POST al [punto de conexión de revocación de tokens][9] de Datadog. 

#### Solicitud {#request-3}
La [solicitud de revocación][10] se realiza con los siguientes parámetros en el **cuerpo** de la solicitud `HTTP POST` con el formato `application/x-www-form-urlencoded`:

| Parámetro del cuerpo HTTP          | Descripción                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | El ID de cliente de su cliente OAuth2.                                                                                      |
| `client_secret` (si se emitió)                    | El secreto de cliente de su cliente confidencial OAuth2.                                                                                       |
| `token`                        | La cadena de token que se va a revocar.                                                                                           |
| `token_type_hint` (opcional)   | Una sugerencia sobre el tipo de token que se va a revocar para ayudar a optimizar la búsqueda de tokens. Por ejemplo, `access_token` o `refresh_token`.  |

#### Ejemplo de código {#code-example}

Utilice este comando cURL para realizar una solicitud de revocación:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### Respuesta de éxito {#success-response-2}

Si un token se ha revocado correctamente, o si el parámetro `token` no es válido, la [respuesta de revocación][11] devuelve un código de estado `200 OK`.

#### Respuesta de error {#error-response-2}

Si una solicitud de token falla por cualquier motivo, como parámetros faltantes o no válidos, se devuelve un código de estado 400 Bad Request (a menos que se especifique lo contrario) con un parámetro [`error`][8].

[1]: https://tools.ietf.org/html/rfc6749#section-3.2
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-1.4
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-1.5
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
[5]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2
[6]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
[7]: https://datatracker.ietf.org/doc/html/rfc6749#section-5.1
[8]: https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
[9]: https://datatracker.ietf.org/doc/html/rfc7009#section-2
[10]: https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
[11]: https://datatracker.ietf.org/doc/html/rfc7009#section-2.2
{{% /tab %}}
{{% tab "Puntos de conexión de creación de clave de API" %}}

## Crear una clave de API en nombre de un usuario {#create-an-api-key-on-behalf-of-a-user}

### `POST /api/v2/api_keys/marketplace` {#post-apiv2api-keysmarketplace}

#### Descripción general {#overview-5}

Una vez que haya recibido un token de acceso o de actualización de OAuth válido, puede usarlo para crear una clave de API en nombre del usuario que autoriza. 

Una clave de API, creada a través de este punto de conexión, es la única forma de enviar datos a Datadog a través de OAuth. Solo puede existir una clave de API por organización de Datadog, y el valor de la clave de API se muestra una vez después de la creación, así que guárdelo adecuadamente.

**Para acceder a este punto de conexión, el contexto privado `API_KEYS_WRITE` debe estar asociado con su cliente OAuth**. 

<div class="alert alert-info">Si tiene problemas para configurar este contexto, comuníquese con marketplace@datadog.com. </div>

#### Ejemplo de solicitud {#example-request-2}

Utilice este comando cURL para realizar una solicitud al punto de conexión `api_keys`:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### Respuesta de éxito {#success-response-3}

Si la solicitud de token de acceso o de token de actualización es válida y está autorizada, se devuelve lo siguiente:

```
{
  "data": {
    "type": "api_keys",
    "attributes": {
      "created_at": "2021-05-06T16:32:07.411970+00:00",
      "key": "ffffffffffffffffffffffffffffffff",
      "last4": "ffff",
      "modified_at": "2021-05-06T16:32:07.411970+00:00",
      "name": "Marketplace Key for App foobar"
    },
    "relationships": {
      "created_by": {
        "data": {
          "type": "users",
          "id": "abcdefgh-abcd-abcd-abcd-abcdefghijkl"
        }
      },
      "modified_by": {
        "data": {
          "type": "users",
          "id": "abcdefgh-abcd-abcd-abcd-abcdefghijkl"
        }
      }
    },
    "id": "abcdefgh-abcd-abcd-abcd-abcdefghijkl01234"
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}