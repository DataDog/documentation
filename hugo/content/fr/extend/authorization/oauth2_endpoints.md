---
aliases:
- /fr/developers/authorization/oauth2_endpoints/
description: Apprenez à utiliser les endpoints d'autorisation OAuth2.
further_reading:
- link: /extend/authorization/
  tag: Documentation
  text: Découvrez l'autorisation OAuth2
title: Référence des endpoints d'autorisation OAuth2
---
## Présentation {#overview}

Les applications utilisant des ressources Datadog protégées doivent être autorisées par un utilisateur avant de pouvoir accéder aux API Datadog pour le compte de l'utilisateur. Ces endpoints dirigent l'application à travers le flux d'octroi de code d'autorisation. 

{{< tabs >}}
{{% tab "Endpoints d'autorisation" %}}

## Demandez l'autorisation à un utilisateur {#request-authorization-from-a-user}

### `GET /oauth2/v1/authorize` {#get-oauth2v1authorize}

#### Présentation {#overview-1}

Pour démarrer le flux d'octroi de code d'autorisation, une application effectue une requête `GET` vers l'endpoint d'autorisation de Datadog. Cela redirige un utilisateur vers le flux d'octroi d'autorisation de Datadog et affiche une page de consentement présentant la liste des scopes demandés par votre application et invite l'utilisateur à autoriser l'accès. Cela renvoie également le [site Datadog][1] à partir duquel la requête est effectuée. 

#### Requête {#request}
Dans la requête d'autorisation, l'application construit l'URI de redirection en ajoutant les paramètres suivants au composant de requête de l'URI en utilisant le format `application/x-www-form-urlencoded` : 

| Paramètre d'URL                               | Description                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | L'endpoint de redirection de votre application après qu'un utilisateur a accordé ou refusé l'accès.                              |
| `client_id`                                   | L'identifiant client de votre client OAuth2.                                                                       |
| `response_type`                               | Le type de réponse doit être `code` pour ce flux d'octroi.                                                        |
| `code_challenge`  (si PKCE est activé)        | Une transformation de `code_verifier`. Datadog recommande d'utiliser `SHA-256` pour calculer le défi de code.     |
| `code_challenge_method`  (si PKCE est activé) | La méthode utilisée pour calculer le défi de code. `SHA-256` ou `S256` est prise en charge.  |

#### Exemple de requête {#example-request}

Pour afficher la page de consentement de Datadog, redirigez les utilisateurs vers l'endpoint avec les paramètres spécifiés : 

```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### Réponse de succès {#success-response}

Si un utilisateur accorde avec succès la demande d'accès, votre application [obtient un code d'autorisation](#obtain-an-authorization-code) et redirige l'utilisateur vers l'URI de redirection avec l'autorisation `code`, ainsi que le paramètre `domain`, dans le composant de requête. 

#### Réponse d'erreur {#error-response}

Si la requête échoue en raison d'un `redirect_uri` ou `client_id` invalide, l'utilisateur n'est pas redirigé vers l'URI spécifié ; à la place, une page d'erreur Datadog s'affiche.

Si un utilisateur refuse l'autorisation, ou si la requête échoue pour d'autres raisons, l'utilisateur est redirigé vers le `redirect_uri` avec un paramètre [error][2] dans le composant de requête.

## Obtenir un code d'autorisation {#obtain-an-authorization-code}

### `POST /oauth2/v1/authorize` {#post-oauth2v1authorize}

#### Présentation {#overview-2}
Lorsque l'utilisateur clique sur le bouton **Autoriser** sur la page de consentement, une requête `POST` est automatiquement envoyée à l'[endpoint d'autorisation][3] pour vérifier la requête et renvoyer un code d'autorisation unique. L'utilisateur est redirigé vers l'`redirect_uri` de votre application avec le paramètre de code d'autorisation dans le composant de requête.

#### Requête {#request-1}
Votre application n'a pas besoin d'effectuer cette requête d'autorisation. Cette étape est une réponse à la requête d'autorisation précédente de l'utilisateur et est automatiquement demandée par Datadog lorsqu'un utilisateur autorise avec succès une application. 


[1]: https://docs.datadoghq.com/fr/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "Endpoints de jeton" %}}

## Échangez le code d'autorisation contre un jeton d'accès {#exchange-authorization-code-for-access-token}

### `POST /api/v2/oauth2/token` {#post-apiv2oauth2token}

#### Présentation {#overview-3}

Une fois qu'un code d'autorisation est renvoyé par la demande d'autorisation, votre application peut échanger ce code contre un jeton d'accès et un jeton de rafraîchissement. Le code d'autorisation est extrait de l'URI de redirection et envoyé dans une demande `POST` à l'[endpoint de jeton][1] OAuth2 de Datadog. 

Les [jetons d'accès][2] Datadog sont des jetons à courte durée de vie avec une durée de vie (TTL) de 1 heure qui accordent l'accès aux API Datadog. Les [jetons de rafraîchissement][3] pour les clients OAuth Marketplace sont des jetons à longue durée de vie sans expiration (TTL infini) qui sont utilisés pour obtenir automatiquement un nouveau jeton d'accès chaque fois qu'il expire. Lorsqu'un utilisateur révoque son autorisation, il doit réautoriser un nouvel ensemble de jetons d'accès et de rafraîchissement pour l'application (le jeton de rafraîchissement expire). 

#### Requête {#request-2}

La [demande de jeton d'accès][4] est effectuée avec les paramètres suivants dans le corps de la demande `POST` avec le format `application/x-www-form-urlencoded` :

|  Paramètre de corps HTTP               | Description                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | Le même [endpoint de redirection][5] envoyé dans les demandes d'autorisation.                                                                                                                                   |
| `client_id`                          | L'identifiant client de votre client OAuth2.                                                                                                                                                                |
| `client_secret` (si émis)          | Le secret client de votre client confidentiel OAuth2.                                                                                                                                                    |
| `grant_type`                         | Le type d'octroi doit être `authorization_code` pour recevoir votre jeton d'accès initial et votre jeton de rafraîchissement, et le type d'octroi doit être `refresh_token` pour recevoir tout jeton d'accès et de rafraîchissement ultérieur. |
| `code_verifier` (si PKCE est activé) | Le [vérificateur de code][6] brut utilisé pour dériver le défi de code envoyé dans les demandes d'autorisation.                                                                                                         |
| `code`                               | Le code d'autorisation généré et renvoyé par la demande POST d'autorisation précédente.                                                                                                         |

#### Exemple de requête {#example-request-1}

Utilisez cette commande cURL pour effectuer une demande de jeton d'accès :

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/api/v2/oauth2/token"
```

#### Réponse de succès {#success-response-1}

Si la demande de jeton d'accès est valide et autorisée, la [réponse de jeton][7] renvoie un code d'état `200 OK` avec le jeton d'accès et le jeton de rafraîchissement contenus dans le corps de la réponse HTTP. 

#### Réponse d'erreur {#error-response-1}

Les demandes échouées adressées aux endpoints de jeton doivent être gérées par l'application, par exemple en redirigeant les utilisateurs vers une page d'erreur appropriée sur l'application. 

Si un client confidentiel avec un secret client émis effectue une demande de jeton sans fournir le paramètre `client_secret`, un code d'état `401 Unauthorized` est renvoyé.

Si une demande de jeton échoue pour d'autres raisons, telles qu'une demande mal formée ou un code d'autorisation invalide, un code d'état `400 Bad Request` (sauf indication contraire) est renvoyé avec un paramètre [`error`][8]. 

## Révoquez des jetons {#revoke-tokens}

### `POST /oauth2/v1/revoke` {#post-oauth2v1revoke}

#### Présentation {#overview-4}

Les utilisateurs peuvent révoquer des jetons d'accès ou de rafraîchissement à tout moment. Une fois révoqués, les jetons ne peuvent plus être utilisés pour accéder aux API Datadog. Pour révoquer un jeton donné, votre application effectue une requête POST vers l'[endpoint de révocation de jeton][9] de Datadog. 

#### Requête {#request-3}
La [demande de révocation][10] est effectuée avec les paramètres suivants dans le **corps** de la `HTTP POST` requête avec le format `application/x-www-form-urlencoded` :

| Paramètre de corps HTTP          | Description                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | L'identifiant client de votre client OAuth2.                                                                                      |
| `client_secret` (si émis)                    | Le secret client de votre client confidentiel OAuth2.                                                                                       |
| `token`                        | La chaîne de jeton à révoquer.                                                                                           |
| `token_type_hint` (facultatif)   | Une indication sur le type de jeton à révoquer pour aider à optimiser la recherche de jeton. Par exemple, `access_token` ou `refresh_token`.  |

#### Exemple de code {#code-example}

Utilisez cette commande cURL pour effectuer une demande de révocation :

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### Réponse de succès {#success-response-2}

Si un jeton a été révoqué avec succès, ou si le paramètre `token` est invalide, la [réponse de révocation][11] renvoie un code d'état `200 OK`.

#### Réponse d'erreur {#error-response-2}

Si une demande de jeton échoue pour une raison quelconque, telle que des paramètres manquants ou invalides, un code d'état 400 Bad Request (sauf indication contraire) est renvoyé avec un paramètre [`error`][8].

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
{{% tab "Endpoints de création de clé d'API" %}}

## Créez une clé d'API pour le compte d'un utilisateur {#create-an-api-key-on-behalf-of-a-user}

### `POST /api/v2/api_keys/marketplace` {#post-apiv2api-keysmarketplace}

#### Présentation {#overview-5}

Une fois que vous avez reçu un jeton d'accès ou de rafraîchissement OAuth valide, vous pouvez l'utiliser pour créer une clé d'API pour le compte de l'utilisateur qui a autorisé l'accès. 

Une clé d'API, créée via cet endpoint, est le seul moyen d'envoyer des données dans Datadog via OAuth. Une seule clé d'API peut exister par organisation Datadog, et la valeur de la clé d'API n'est affichée qu'une seule fois après sa création ; veillez donc à la conserver en conséquence.

**Afin d'accéder à cet endpoint, le périmètre `API_KEYS_WRITE` privé doit être associée à votre client OAuth**. 

<div class="alert alert-info">Si vous rencontrez des problèmes lors de la configuration de ce périmètre, contactez marketplace@datadog.com. </div>

#### Exemple de requête {#example-request-2}

Utilisez cette commande cURL pour effectuer une requête vers l'endpoint `api_keys` :

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### Réponse de succès {#success-response-3}

Si la requête de jeton d'accès ou de rafraîchissement est valide et autorisée, ce qui suit est renvoyé :

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

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}