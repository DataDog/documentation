---
description: Découvrez comment utiliser les endpoints d'autorisation OAuth2.
further_reading:
- link: /developers/authorization/
  tag: Documentation
  text: En savoir plus sur l'autorisation OAuth2
title: Référence des endpoints d'autorisation OAuth2
---

## Présentation

Les applications utilisant des ressources Datadog protégées doivent être autorisées par un utilisateur avant de pouvoir accéder aux API Datadog en son nom. Ces endpoints dirigent l'application à travers le flux d'octroi de code d'autorisation.

{{< tabs >}}
{{% tab "Authorization Endpoints" %}}

## Demander l'autorisation d'un utilisateur

### `GET /oauth2/v1/authorize`

#### Présentation

Pour démarrer le flux d'octroi de code d'autorisation, une application effectue une requête `GET` vers l'endpoint d'autorisation de Datadog. Cela redirige l'utilisateur vers le flux d'octroi d'autorisation de Datadog et affiche une page de consentement présentant la liste des périmètres demandés par votre application ainsi qu'une invite invitant l'utilisateur à autoriser l'accès. Cela renvoie également le [site Datadog][1] depuis lequel la demande est effectuée.

#### Requête
Dans la demande d'autorisation, l'application construit l'URI de redirection en ajoutant les paramètres suivants au composant de requête de l'URI au format `application/x-www-form-urlencoded` :

| Paramètre d'URL                               | Rôle                                                                                               |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `redirect_uri`                                | L'endpoint de redirection de votre application après qu'un utilisateur accorde ou refuse l'accès.                              |
| `client_id`                                   | L'ID client de votre client OAuth2.                                                                       |
| `response_type`                               | Le type de réponse doit être `code` pour ce flux d'octroi.                                                        |
| `code_challenge` (si PKCE est activé)        | Une transformation de `code_verifier`. Datadog recommande d'utiliser `SHA-256` pour calculer le code challenge.     |
| `code_challenge_method` (si PKCE est activé) | La méthode utilisée pour calculer le code challenge. `SHA-256`, ou `S256`, est pris en charge.  |

#### Exemple de requête

Pour afficher la page de consentement de Datadog, redirigez les utilisateurs vers l'endpoint avec les paramètres spécifiés :
```
https://app.datadoghq.com/oauth2/v1/authorize?redirect_uri=http://localhost:500/oauth_redirect&client_id=abcdefghijklmnopqrstuvwxyz_123456789&response_type=code&code_challenge=12345&code_challenge_method=S256
```

#### Réponse en cas de succès

Si un utilisateur accorde la demande d'accès, votre application [obtient un code d'autorisation](#obtenir-un-code-dautorisation) et redirige l'utilisateur vers l'URI de redirection avec le `code` d'autorisation, ainsi que le paramètre `domain`, dans le composant de requête.

#### Réponse en cas d'erreur

Si la demande échoue en raison d'un `redirect_uri` ou d'un `client_id` invalide, l'utilisateur n'est pas redirigé vers l'URI spécifiée ; une page d'erreur Datadog s'affiche à la place.

Si un utilisateur refuse l'autorisation, ou si la demande échoue pour d'autres raisons, l'utilisateur est redirigé vers le `redirect_uri` avec un paramètre [error][2] dans le composant de requête.

## Obtenir un code d'autorisation

### `POST /oauth2/v1/authorize`

#### Présentation
Lorsqu'un utilisateur clique sur le bouton **Authorize** de la page de consentement, une requête `POST` est automatiquement envoyée à l'[endpoint d'autorisation][3] pour vérifier la demande et renvoyer un code d'autorisation unique. L'utilisateur est redirigé vers le `redirect_uri` de votre application avec le paramètre de code d'autorisation dans le composant de requête.

#### Requête
Votre application n'a pas besoin d'effectuer cette demande d'autorisation. Cette étape est une réponse à la demande d'autorisation utilisateur précédente et est automatiquement effectuée par Datadog lorsqu'un utilisateur autorise une application.


[1]: https://docs.datadoghq.com/fr/getting_started/site/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
{{% /tab %}}
{{% tab "Token Endpoints" %}}

## Échanger le code d'autorisation contre un token d'accès

### `POST /oauth2/v1/token`

#### Présentation

Une fois qu'un code d'autorisation est renvoyé par la demande d'autorisation, votre application peut l'échanger contre un token d'accès et un token de rafraîchissement. Le code d'autorisation est extrait de l'URI de redirection et envoyé dans une requête `POST` vers l'[endpoint de token][1] OAuth2 de Datadog.

Les [tokens d'accès][2] Datadog sont des tokens de courte durée avec une durée de vie (TTL) d'1 heure qui accordent l'accès aux API Datadog. Les [tokens de rafraîchissement][3] pour les clients OAuth du Marketplace sont des tokens de longue durée sans expiration (TTL infini) utilisés pour obtenir automatiquement un nouveau token d'accès à chaque expiration. Lorsqu'un utilisateur révoque son autorisation, il doit réautoriser un nouvel ensemble de tokens d'accès et de rafraîchissement pour l'application (le token de rafraîchissement expire).

#### Requête

La [demande de token d'accès][4] est effectuée avec les paramètres suivants dans le corps de la requête `POST` au format `application/x-www-form-urlencoded` :

|  Paramètre du corps HTTP               | Rôle                                                                                                                                                                                        |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `redirect_uri`                       | Le même [endpoint de redirection][5] envoyé dans les demandes d'autorisation.                                                                                                                                   |
| `client_id`                          | L'ID client de votre client OAuth2.                                                                                                                                                                |
| `client_secret` (si émis)          | Le secret client de votre client OAuth2 confidentiel.                                                                                                                                                    |
| `grant_type`                         | Le type d'octroi doit être `authorization_code` pour recevoir votre token d'accès et token de rafraîchissement initiaux, et `refresh_token` pour recevoir les tokens d'accès et de rafraîchissement ultérieurs. |
| `code_verifier` (si PKCE est activé) | Le [code verifier][6] brut utilisé pour dériver le code challenge envoyé dans les demandes d'autorisation.                                                                                                         |
| `code`                               | Le code d'autorisation généré et renvoyé par la requête POST d'autorisation précédente.                                                                                                         |

#### Exemple de requête

Utilisez cette commande cURL pour effectuer une demande de token d'accès :

```
curl -X POST \
    -d "grant_type=authorization_code&client_id=$CLIENT_ID
    client_secret=$CLIENT_SECRET&redirect_uri=$REDIRECT_URI
    code_verifier=$CODE_VERIFIER&code=$CODE" \
    "https://api.datadoghq.com/oauth2/v1/token"
```

#### Réponse en cas de succès

Si la demande de token d'accès est valide et autorisée, la [réponse de token][7] renvoie un code de statut `200 OK` avec le token d'accès et le token de rafraîchissement dans le corps de la réponse HTTP.

#### Réponse en cas d'erreur

Les demandes échouées aux endpoints de token doivent être gérées par l'application, par exemple en redirigeant les utilisateurs vers une page d'erreur appropriée de l'application. 

Si un client confidentiel disposant d'un secret client émis effectue une demande de token sans fournir le paramètre `client_secret`, un code de statut `401 Unauthorized` est renvoyé.

Si une demande de token échoue pour d'autres raisons, telles qu'une demande malformée ou un code d'autorisation invalide, un code de statut `400 Bad Request` (sauf indication contraire) est renvoyé avec un paramètre [`error`][8].

## Révoquer des tokens

### `POST /oauth2/v1/revoke`

#### Présentation

Les utilisateurs peuvent révoquer des tokens d'accès ou de rafraîchissement à tout moment. Une fois révoqués, les tokens ne peuvent plus être utilisés pour accéder aux API Datadog. Pour révoquer un token donné, votre application effectue une requête POST vers l'[endpoint de révocation de token][9] de Datadog.

#### Requête
La [demande de révocation][10] est effectuée avec les paramètres suivants dans le **corps** de la requête `HTTP POST` au format `application/x-www-form-urlencoded` :

| Paramètre du corps HTTP          | Rôle                                                                                                              |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `client_id`                    | L'ID client de votre client OAuth2.                                                                                      |
| `client_secret` (si émis)                    | Le secret client de votre client OAuth2 confidentiel.                                                                                       |
| `token`                        | La chaîne du token à révoquer.                                                                                           |
| `token_type_hint` (facultatif)   | Une indication sur le type de token à révoquer pour optimiser la recherche du token. Par exemple, `access_token` ou `refresh_token`.  |

#### Exemple de code 

Utilisez cette commande cURL pour effectuer une demande de révocation :

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d 'client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&token=$TOKEN_TO_REVOKE' \
    "https://api.datadoghq.com/oauth2/v1/revoke" \ 
```

#### Réponse en cas de succès

Si un token a été révoqué avec succès, ou si le paramètre `token` est invalide, la [réponse de révocation][11] renvoie un code de statut `200 OK`.

#### Réponse en cas d'erreur

Si une demande de token échoue pour quelque raison que ce soit, tels que des paramètres manquants ou invalides, un code de statut 400 Bad Request (sauf indication contraire) est renvoyé avec un paramètre [`error`][8].

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

## Créer une clé d'API au nom d'un utilisateur

### `POST /api/v2/api_keys/marketplace`

#### Présentation

Une fois que vous avez reçu un token d'accès ou de rafraîchissement OAuth valide, vous pouvez l'utiliser pour créer une clé d'API au nom de l'utilisateur autorisateur.

Une clé d'API, créée via cet endpoint, est le seul moyen d'envoyer des données dans Datadog via OAuth. Il ne peut exister qu'une seule clé d'API par organisation Datadog, et la valeur de la clé d'API n'est affichée qu'une seule fois après sa création ; stockez-la en conséquence.

**Pour accéder à cet endpoint, le périmètre privé `API_KEYS_WRITE` doit être associé à votre client OAuth.**

<div class="alert alert-info">Si vous rencontrez des problèmes pour définir ce périmètre, contactez marketplace@datadog.com. </div>

#### Exemple de requête

Utilisez cette commande cURL pour effectuer une demande vers l'endpoint `api_keys` :

```
curl -X POST \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.datadoghq.com/api/v2/api_keys/marketplace"
```

#### Réponse en cas de succès

Si la demande de token d'accès ou de rafraîchissement est valide et autorisée, les éléments suivants sont renvoyés :

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}