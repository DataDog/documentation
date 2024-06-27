---
description: Aprende a utilizar los endpoints de autorización OAuth2.
further_reading:
- link: /developers/authorization/
  tag: Documentación
  text: Más información sobre la autorización OAuth2
kind: documentación
title: Referencia de endpoints de autorización OAuth2
---

## Información general

Las aplicaciones que utilizan recursos protegidos de Datadog deben ser autorizadas por un usuario antes de poder acceder a las API de Datadog en nombre del usuario. Estos endpoints dirigen la aplicación a través del flujo de concesión del código de autorización.

{{< tabs >}}
{{% tab "Authorization Endpoints" %}}

## Solicitar autorización a un usuario

### `GET /oauth2/v1/authorize`

#### Información general

Para iniciar el flujo de concesión de código de autorización, una aplicación realiza una solicitud `GET` al endpoint de autorización de Datadog. Esto redirige a un usuario a un flujo de concesión de autorización de Datadog y muestra una página de consentimiento que tiene la lista de contextos solicitada por tu aplicación y una solicitud para que el usuario autorice el acceso. También devuelve el [sitio de Datadog][1] desde el que se realiza la solicitud.

#### Solicitud
En la solicitud de autorización, la aplicación crea el URI de redirección añadiendo los siguientes parámetros al componente de consulta del URI con el formato `application/x-www-form-urlencoded`:

| Parámetro URL                               | Descripción                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | El endpoint de redirección de tu aplicación después de que un usuario conceda o deniegue el acceso.                              |
| `client_id`                                   | El ID de cliente de tu cliente OAuth2.                                                                       |
| `response_type`                               | El tipo de respuesta debe ser un código para este flujo de concesión.                                                        |
| `code_challenge` (si PKCE está activado)        | Una transformación de `code_verifier`. Datadog recomienda utilizar `SHA-256` para calcular el desafío del código.     |
| `code_challenge_method` (si PKCE está activado) | El método utilizado para calcular el desafío de código. `SHA-256`, o `S256`, es compatible.  |

#### Ejemplo de solicitud

Para mostrar la página de consentimiento de Datadog, redirige a los usuarios al endpoint con los parámetros especificados:
```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### Éxito de la respuesta

Si un usuario concede con éxito la solicitud de acceso, tu aplicación [obtiene un código de autorización](#obtain-an-authorization-code) y redirige al usuario al URI de redirección con la autorización `code`, así como el parámetro `domain`, en el componente de consulta.

#### Respuesta de error

Si la solicitud falla debido a un `redirect_uri` o `client_id` no válido, el usuario no es redirigido al URI especificado; en su lugar, se muestra una página de error de Datadog.

Si un usuario deniega la autorización, o la solicitud falla por otros motivos, el usuario es redirigido a `redirect_uri` con un parámetro [error][2] en el componente de consulta.

## Obtener un código de autorización

### `POST /oauth2/v1/authorize`

#### Información general
Cuando un usuario hace clic en el botón **Authorize** (Autorizar) de la página de consentimiento, se envía automáticamente una solicitud `POST` al [endpoint de autorización][3] para verificar la solicitud y devolver un código de autorización único. El usuario es redirigido a la página `redirect_uri` de tu aplicación con el parámetro de código de autorización en el componente de consulta.

#### Solicitud
Tu aplicación no necesita realizar esta solicitud de autorización. Este paso es una respuesta a la solicitud de autorización de usuario anterior y es solicitado automáticamente por Datadog cuando un usuario autoriza correctamente una aplicación.


[1]: https://docs.datadoghq.com/es/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "Token Endpoints" %}}

## Intercambiar código de autorización por código de acceso

### `POST /oauth2/v1/token`

#### Información general

Una vez que se devuelve un código de autorización desde la solicitud de autorización, tu aplicación puede intercambiar este código por un token de acceso y un token de actualización. El código de autorización se extrae del URI de redirección y se envía en una solicitud `POST` al [endpoint de token][1] OAuth2 de Datadog.

Los [tokens de acceso][2] de Datadog son tokens efímeros con un tiempo de vida (TTL) de 1 hora que conceden acceso a las API de Datadog. Los [tokens de actualización][3] para clientes de Marketplace OAuth son tokens de larga duración sin caducidad (TTL: infinito) que se utilizan para obtener automáticamente un nuevo token de acceso cada vez que caduca. Cuando un usuario revoca su autorización, tiene que volver a autorizar un nuevo conjunto de tokens de acceso y actualización para la aplicación (el token de actualización caduca).

#### Solicitud

La [solicitud de token de acceso][4] se realiza con los siguientes parámetros en el cuerpo de la solicitud `POST` con el formato `application/x-www-form-urlencoded`:

|  Parámetro del cuerpo HTTP               | Descripción                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | El mismo [endpoint de redireccionamiento][5] enviado en las solicitudes de autorización.                                                                                                                                   |
| `client_id`                          | El ID de cliente de tu cliente OAuth2.                                                                                                                                                                |
| `client_secret` (si se expide)          | El secreto de cliente de tu cliente confidencial OAuth2.                                                                                                                                                    |
| `grant_type`                         | El tipo de concesión debe ser `authorization_code` para recibir tu token de acceso inicial y token de actualización, y el tipo de concesión debe ser `refresh_token` para recibir cualquier token de acceso y actualización posterior. |
| `code_verifier` (si PKCE está activado) | El [verificador de código][6] sin formato utilizado para derivar el desafío de código enviado en las solicitudes de autorización.                                                                                                         |
| `code`                               | El código de autorización generado y devuelto por la solicitud POST de autorización anterior.                                                                                                         |

#### Ejemplo de solicitud 

Utiliza este comando cURL para realizar una solicitud de token de acceso:

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/oauth2/v1/token"
```

#### Éxito de la respuesta

Si la solicitud de token de acceso es válida y está autorizada, la [respuesta del token][7] devuelve un código de estado `200 OK` con el token de acceso y el token de actualización contenidos en el cuerpo de la respuesta HTTP.

#### Respuesta de error

Las solicitudes fallidas realizadas a los endpoints de token deben ser gestionadas por la aplicación, como redirigir a los usuarios a una página de error apropiada en la aplicación.

Si un cliente confidencial con un secreto de cliente emitido realiza una solicitud de token sin proporcionar el parámetro `client_secret`, se devuelve un código de estado `401 Unauthorized`.

Si una solicitud de token falla por otros motivos, como una solicitud malformada o un código de autorización no válido, se devuelve un código de estado `400 Bad Request` (a menos que se especifique lo contrario) con un parámetro [`error`][8].

## Revocar tokens

### `POST /oauth2/v1/revoke`

#### Información general

Los usuarios pueden revocar el acceso o actualizar los tokens en cualquier momento. Una vez revocados, los tokens ya no pueden utilizarse para acceder a las API de Datadog. Para revocar un token determinado, la aplicación realiza una solicitud POST al [endpoint de revocación de tokens][9] de Datadog.

#### Solicitud
La [solicitud de revocación][10] se realiza con los siguientes parámetros en el **cuerpo** de la solicitud `HTTP POST` con el formato `application/x-www-form-urlencoded`:

| Parámetro del cuerpo HTTP          | Descripción                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | El ID de cliente de tu cliente OAuth2.                                                                                      |
| `client_secret` (si se expide)                    | El secreto de cliente de tu cliente confidencial OAuth2.                                                                                       |
| `token`                        | La cadena de tokens a revocar.                                                                                           |
| `token_type_hint` (opcional)   | Una pista sobre el tipo de token que debe revocarse para ayudar a optimizar la búsqueda de tokens. Por ejemplo, `access_token` o `refresh_token`.  |

#### Ejemplo de código 

Utiliza este comando cURL para realizar una solicitud de revocación:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### Éxito de la respuesta

Si un token se ha revocado correctamente, o si el parámetro `token` no es válido, la [respuesta de revocación][11] devuelve un código de estado `200 OK`.

#### Respuesta de error

Si una solicitud de token falla por cualquier motivo, como parámetros no válidos o que faltan, se devuelve el código de estado 400 Bad Request (a menos que se especifique lo contrario) con un parámetro [`error`][8].

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
{{% tab "API Key Creation Endpoints" %}}

## Crear una clave de API en nombre de un usuario

### `POST /api/v2/api_keys/marketplace`

#### Información general

Una vez que hayas recibido un token de acceso o actualización OAuth válido, puedes utilizarlo para crear una clave de API en nombre del usuario autorizante.

Una clave de API, creada a través de este endpoint, es la única forma de enviar datos a Datadog a través de OAuth. Solo puede existir una clave de API por organización de Datadog, y el valor de la clave de API se muestra una vez tras su creación, así que guárdala en consecuencia.

**Para acceder a este endpoint, el contexto `API_KEYS_WRITE` privado debe estar asociado a tu cliente OAuth**.

<div class="alert alert-info">Si tienes problemas para configurar este contexto, ponte en contacto con marketplace@datadog.com. </div>

#### Ejemplo de solicitud

Utiliza este comando cURL para realizar una solicitud al endpoint `api_keys`:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### Éxito de la respuesta

Si la solicitud de token de acceso o actualización es válida y está autorizada, se devuelve lo siguiente:

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

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}