---
title: OAuth2 Authorization Endpoints Reference
description: Learn how to use the OAuth2 authorization endpoints.
further_reading:
- link: /developers/authorization/
  tag: Documentation
  text: Learn about OAuth2 Authorization
---

## Overview

Applications using protected Datadog resources must be authorized by a user before they can access Datadog APIs on the user's behalf. These endpoints direct the application through the authorization code grant flow. 

{{< tabs >}}
{{% tab "Authorization Endpoints" %}}

## Request authorization from a user

### `GET /oauth2/v1/authorize`

#### Overview

To start the authorization code grant flow, an application makes a `GET` request to Datadog's authorization endpoint. This redirects a user to Datadog's authorization-grant flow and renders a consent page displaying the list of scopes requested by your application and a prompt for the user to authorize access. This also returns the [Datadog site][1] that the request is being made from. 

#### Request 
In the authorization request, the application constructs the redirect URI by adding the following parameters to the query component of the URI using the `application/x-www-form-urlencoded` format: 

| URL Parameter                               | Description                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | Your application's redirection endpoint after a user grants or denies access.                              |
| `client_id`                                   | The Client ID of your OAuth2 client.                                                                       |
| `response_type`                               | The response type must be code for this grant flow.                                                        |
| `code_challenge`  (if PKCE is enabled)        | A transformation of `code_verifier`. Datadog recommends using `SHA-256` to compute the code challenge.     |
| `code_challenge_method`  (if PKCE is enabled) | The method used to compute the code challenge. `SHA-256`, or `S256`, is supported.  |

#### Example Request

To render Datadog's consent page, redirect users to the endpoint with the specified parameters: 
```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### Success Response

If a user successfully grants the access request, your application [obtains an authorization code](#obtain-an-authorization-code) and redirects the user to the redirect URI with the authorization `code`, as well as the `domain` parameter, in the query component. 

#### Error Response

If the request fails due to an invalid `redirect_uri` or `client_id`, the user is not redirected to the specified URI; instead, a Datadog error page displays.

If a user denies authorization, or the request fails due to other reasons, the user is redirected to the `redirect_uri` with an [error][2] parameter in the query component.

## Obtain an authorization code

### `POST /oauth2/v1/authorize`

#### Overview
When a user clicks the **Authorize** button on the consent page, a `POST` request is automatically sent to the [authorization endpoint][3] to verify the request and return a unique authorization code. The user is redirected to your application's `redirect_uri` with the authorization code parameter in the query component.

#### Request 
Your application does not need to make this authorization request. This step is a response to the previous user authorization request and is automatically requested by Datadog when a user successfully authorizes an application. 


[1]: https://docs.datadoghq.com/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "Token Endpoints" %}}

## Exchange authorization code for access token

### `POST /oauth2/v1/token`

#### Overview

Once an authorization code is returned from the authorization request, your application can exchange this code for an access token and a refresh token. The authorization code is extracted from the redirect URI and sent in a `POST` request to Datadog's OAuth2 [token endpoint][1]. 

Datadog [access tokens][2] are short-lived tokens with a time-to-live (TTL) of 1 hour that grant access to Datadog APIs. [Refresh tokens][3] for Marketplace OAuth clients are long-lived tokens with no expiration (TTL of infinity) that are used to automatically obtain a new access token each time it expires. When a user revokes their authorization, they have to re-authorize a new set of access and refresh tokens for the application (the refresh token expires). 

#### Request

The [access token request][4] is made with the following parameters in the body of the `POST` request with the `application/x-www-form-urlencoded` format:

|  HTTP Body Parameter               | Description                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | The same [redirection endpoint][5] sent in the authorization requests.                                                                                                                                   |
| `client_id`                          | The client ID of your OAuth2 client.                                                                                                                                                                |
| `client_secret` (if issued)          | The client secret of your OAuth2 confidential client.                                                                                                                                                    |
| `grant_type`                         | The grant type should be `authorization_code` to receive your initial access token and refresh token, and the grant type should be `refresh_token` to receive any subsequent access and refresh tokens. |
| `code_verifier` (if PKCE is enabled) | The raw [code verifier][6] used to derive the code challenge sent in the authorization requests.                                                                                                         |
| `code`                               | The authorization code generated and returned from the previous authorization POST request.                                                                                                         |

#### Example Request 

Use this cURL command to make an access token request:

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/oauth2/v1/token"
```

#### Success Response

If the access token request is valid and authorized, the [token response][7] returns a `200 OK` status code with the access token and refresh token contained in the body of the HTTP response. 

#### Error Response

Failed requests made to token endpoints should be handled by the application, such as redirecting users to an appropriate error page on the application. 

If a confidential client with an issued client secret makes a token request without providing the `client_secret` parameter, a `401 Unauthorized` status code is returned.

If a token request fails for other reasons, such as a malformed request or an invalid authorization code, a `400 Bad Request` status code (unless specified otherwise) is returned with an [`error`][8] parameter. 

## Revoke tokens 

### `POST /oauth2/v1/revoke`

#### Overview

Users can revoke access or refresh tokens at any time. When revoked, tokens can no longer be used to access Datadog APIs. To revoke a given token, your application makes a POST request to Datadog's [token revocation endpoint][9]. 

#### Request
The [revocation request][10] is made with the following parameters in the **body** of the `HTTP POST` request with the `application/x-www-form-urlencoded` format:

| HTTP Body Parameter          | Description                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | The client ID of your OAuth2 client.                                                                                      |
| `client_secret` (if issued)                    | The client secret of your OAuth2 confidential client.                                                                                       |
| `token`                        | The token string to be revoked.                                                                                           |
| `token_type_hint` (optional)   | A hint about the token type to be revoked to help optimize token lookup. For example, `access_token` or `refresh_token`.  |

#### Code Example 

Use this cURL command to make a revocation request:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### Success Response

If a token has been revoked successfully, or if the `token` parameter is invalid, the [revocation response][11] returns an `200 OK` status code.

#### Error Response

If a token request fails for any reason, such as missing or invalid parameters, 400 Bad Request status code (unless specified otherwise) is returned with an [`error`][8] parameter.

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

## Create an API Key on behalf of a user

### `POST /api/v2/api_keys/marketplace`

#### Overview

Once you've received a valid OAuth access or refresh token, you can use it to create an API key on behalf of the authorizing user. 

An API key, created through this endpoint, is the only way to send data into Datadog through OAuth. Only one API key can exist per Datadog organization, and the API Key value is shown once after creation, so store it accordingly.

**In order to access this endpoint, the private `API_KEYS_WRITE` scope must be associated with your OAuth client**. 

<div class="alert alert-info">If you are having issues setting this scope, reach out to marketplace@datadog.com. </div>

#### Example Request

Use this cURL command to make a request to the `api_keys` endpoint:

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### Success Response

If the access or refresh token request is valid and authorized, the following is returned:

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
