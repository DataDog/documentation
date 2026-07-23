---
description: Découvrez comment Datadog utilise le protocole OAuth 2.0.
further_reading:
- link: /developers/authorization/oauth2_endpoints
  tag: Documentation
  text: Utiliser les endpoints d'autorisation OAuth 2.0
title: OAuth2 dans Datadog
---

## Présentation

Cette page explique de façon détaillée comment implémenter le protocole OAuth de bout en bout dans votre application après la création de votre client **confidentiel**. 

{{< img src="developers/authorization/oauth_process.png" alt="Diagramme expliquant le fonctionnement du processus d'authentification OAuth après qu'un utilisateur a cliqué sur le bouton Connect Account dans un carré d'intégration." style="width:100%;">}}

## Implémenter le protocole OAuth

1. Dans votre compte sandbox partenaire Datadog, créez et configurez votre client OAuth dans la [plateforme de développement][16].

2. Après avoir installé votre intégration, les utilisateurs peuvent cliquer sur le bouton **Connect Accounts** pour connecter leur compte dans l'onglet **Configure** du carré d'intégration. 

   {{< img src="developers/authorization/connect-accounts.png" alt="Cliquer sur le bouton Connect Accounts" style="width:100%;" >}}

   Lorsqu'un utilisateur clique sur ce bouton, il est redirigé vers la page spécifiée via le paramètre `onboarding_url` que vous avez défini dans le cadre du processus de création du client OAuth. Cette page doit correspondre à la page de connexion de votre plateforme.

3. Lorsqu'un utilisateur se connecte, redirigez-le vers l'[endpoint d'autorisation OAuth2][6] avec les paramètres d'URL appropriés, notamment le paramètre `code_challenge` supplémentaire généré par votre application.

   Pour savoir comment obtenir le paramètre `code_challenge`, consultez la rubrique [PKCE](#flux-d-octroi-de-code-d-autorisation-avec-pkce). Votre application doit enregistrer la valeur `code_verifier` pour la requête de token à l'étape 5.

   - Pour construire l'URL de cette requête GET, utilisez le paramètre de requête `site` fourni lors de la redirection vers votre `onboarding_url`.
   - Ce paramètre n'est fourni que si l'utilisateur initie l'autorisation depuis le carré d'intégration Datadog. Consultez la rubrique [Initier l'autorisation depuis un emplacement tiers](#initier-l-autorisation-depuis-un-emplacement-tiers) pour connaître les autres options disponibles si l'utilisateur choisit d'initier l'autorisation depuis un emplacement externe.  
   - Le paramètre de requête `site` fournit le [site Datadog][17] dans lequel se trouve l'utilisateur autorisateur, ainsi que tout sous-domaine qu'il utilise éventuellement. Il est nécessaire pour construire l'URL de cette requête GET vers l'endpoint d'autorisation : `<site>/oauth2/v1/authorize?...`.

4. Lorsqu'un utilisateur clique sur **Authorize**, Datadog envoie une requête POST à l'endpoint d'autorisation. L'utilisateur est alors redirigé vers la ressource spécifiée via le paramètre `redirect_uri` que vous avez défini lors de la configuration du client OAuth, avec le paramètre `code` d'autorisation dans le composant de requête.

5. Depuis la ressource spécifiée via le paramètre `redirect_uri`, envoyez à l'[endpoint de token Datadog][10] une requête POST comprenant le code d'autorisation de l'étape 4, la valeur `code_verifier` de l'étape 3, l'identifiant de votre client OAuth, ainsi que le secret du client.

   - Pour construire l'URL de cette requête POST, utilisez le paramètre de requête `domain` fourni lors de la redirection vers votre `redirect_uri`.
   - Il est nécessaire pour construire l'URL de cette requête POST vers l'endpoint de token : `https://api.<domain>/oauth2/v1/token`.

6. Une fois l'opération réussie, vous recevez vos tokens `access_token` et `refresh_token` dans le corps de la réponse. Votre application devrait afficher une page de confirmation avec le message suivant : `You may now close this tab`.

7. Utilisez le token `access_token` pour appeler les endpoints d'API Datadog en l'envoyant dans l'en-tête d'autorisation de votre requête : ```headers = {"Authorization": "Bearer {}".format(access_token)}```.
    - **Remarque*** : les endpoints d'API diffèrent selon le site Datadog. Par exemple, si un utilisateur se trouve dans la région EU, l'endpoint Events est `https://api.datadoghq.eu/api/v1/events`, tandis que pour les utilisateurs en US1, l'endpoint Events est `https://api.datadoghq.com/api/v1/events`.
    - Utilisez le paramètre de requête `domain` directement dans ces appels d'API pour vous assurer que le bon endpoint est contacté. Par exemple, pour effectuer un appel vers l'endpoint Events, construisez l'URL de votre requête comme suit : `https://api.<domain>/api/v1/events`.
    - Certains endpoints peuvent également nécessiter une clé d'API, créée à l'étape 8.

8. Appelez l'[endpoint de création de clé d'API][7] pour générer une clé d'API vous permettant d'envoyer des données pour le compte des utilisateurs Datadog.

   Si le périmètre `API_KEYS_WRITE` n'a pas été ajouté à votre client, cette étape échoue. Cet endpoint génère une clé d'API qui n'est affichée qu'une seule fois et ne peut pas être régénérée sauf si l'utilisateur la supprime dans son compte Datadog. **Stockez cette valeur dans une base de données ou un emplacement sécurisé**.

Pour en savoir plus sur la création, le test et la publication de clients OAuth, consultez la section [Créer une intégration basée sur une API][5]. 

### Initier l'autorisation depuis un emplacement tiers 

Les utilisateurs peuvent démarrer le processus d'autorisation dans Datadog en cliquant sur **Connect Accounts** dans le carré d'intégration. Lorsqu'un utilisateur clique sur Connect Accounts dans Datadog, des informations concernant son [site Datadog][17] sont envoyées lors de la redirection vers l'`onboarding_url` et lors de la redirection vers le `redirect_uri`. Le site Datadog de l'utilisateur est nécessaire pour effectuer des appels d'API en son nom et recevoir un code d'autorisation. Si un utilisateur initie l'autorisation depuis le _site web externe de l'intégration_, les informations sur le site de l'utilisateur ne sont pas fournies.

De plus, lorsque les utilisateurs initient l'autorisation depuis le carré d'intégration Datadog, ils doivent disposer des autorisations correspondantes pour tous les périmètres demandés. Si l'autorisation est initiée depuis un autre emplacement que le carré d'intégration, les utilisateurs ne disposant pas de toutes les autorisations requises peuvent terminer l'autorisation (mais sont invités à réautoriser avec les autorisations appropriées lorsqu'ils retournent au carré d'intégration Datadog).

Datadog recommande aux partenaires d'inviter les utilisateurs à initier l'autorisation depuis Datadog plutôt que depuis leur propre plateforme.

Bien que Datadog ne recommande pas de prendre en charge l'initiation de l'autorisation depuis un emplacement tiers en dehors du carré d'intégration Datadog, si vous choisissez cette voie, vous devez vous assurer de pouvoir prendre en charge les utilisateurs sur tous les sites Datadog, et être prêt à continuer à prendre en charge les nouveaux sites Datadog au fur et à mesure de leur création. Cela implique généralement de mettre en place un moyen pour l'utilisateur de saisir manuellement son site sur votre plateforme lors de l'autorisation.

Gardez à l'esprit que les organisations peuvent également avoir des sous-domaines (par exemple, https://subdomain.datadoghq.com). Les sous-domaines ne doivent pas être inclus dans les appels d'API, c'est pourquoi l'utilisation du paramètre de requête `domain` renvoyé lors de la redirection vers le `redirect_uri` est recommandée lors de la construction de l'URL pour tout appel d'API. Pour vous assurer que les utilisateurs s'autorisent sur le bon site, redirigez-les toujours vers le site Datadog US1 (`app.datadoghq.com`) ; depuis là, ils peuvent sélectionner leur région.

## Flux d'octroi de code d'autorisation avec PKCE

Bien que le protocole OAuth2 prenne en charge plusieurs flux d'octroi, le [flux d'octroi de code d'autorisation][8] [avec PKCE](#flux-d-octroi-de-code-d-autorisation-avec-pkce) est recommandé pour les applications à exécution longue, où un utilisateur accorde son consentement explicite une fois et où les identifiants du client sont ensuite conservés de façon sécurisée. 

Ce type d'octroi permet aux applications d'obtenir de façon sécurisée un code d'autorisation unique et de l'échanger contre un token d'accès leur permettant d'envoyer des requêtes aux API Datadog. Le flux d'octroi de code d'autorisation comporte trois étapes :

1. L'application [demande l'autorisation à un utilisateur][6] d'accéder à un ensemble de contextes Datadog.
2. Lorsqu'un utilisateur clique sur **Authorize**, l'application [obtient un code d'autorisation unique][12].
3. L'application [échange le code d'autorisation contre un token d'accès][10], qui est utilisé pour accéder aux API Datadog.

### Utiliser l'extension PKCE

[Proof Key for Code Exchange (PKCE)][11] est une extension du flux d'octroi de code d'autorisation OAuth2 destinée à protéger les clients OAuth2 des attaques par interception. Si une personne malveillante intercepte le flux et parvient à accéder au code d'autorisation avant que celui-ci soit renvoyé à l'application, il peut accéder aux tokens et aux API Datadog.

Pour limiter ces risques, l'extension PKCE inclut les paramètres suivants pour associer de façon sécurisée une requête d'autorisation à une requête de token tout au long du flux d'octroi : 

| Paramètre             | Définition                                                                                                                           |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Code Verifier         | Une chaîne aléatoire de chiffrement générée de façon dynamique.                                                                                 |
| Code Challenge        | Une transformation du code verifier. Le `code_challenge` doit utiliser un encodage `base64url`.                                           |
| Code Challenge Method | La méthode utilisée pour dériver le `code_challenge` à partir de la valeur `code_verifier`. Vous devez utiliser le hachage [SHA-256][16] pour calculer le `code_challenge`. |

Le [protocole PKCE][11] s'intègre au flux d'octroi de code d'autorisation en effectuant les actions suivantes :

- L'application génère une chaîne aléatoire `code_verifier` et obtient le `code_challenge` correspondant en utilisant la méthode définie via le paramètre `code_challenge_method`.

- L'application envoie à Datadog une requête d'autorisation contenant les paramètres `code_challenge` et `code_challenge_method` pour obtenir un code d'autorisation.

- L'application envoie à Datadog une requête de token contenant le code d'autorisation et la chaîne `code_verifier` pour obtenir un token d'accès. L'endpoint de token vérifie le code d'autorisation en transformant la chaîne `code_verifier` à l'aide de la méthode définie via le paramètre `code_challenge_method` et compare la valeur obtenue à la valeur `code_challenge` d'origine.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: /fr/api/latest/scopes/
[3]: /fr/developers/datadog_apps/#oauth-api-access
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[5]: /fr/developers/integrations/api_integration
[6]: /fr/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#request-authorization-from-a-user
[7]: /fr/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints#create-an-api-key-on-behalf-of-a-user
[8]: https://tools.ietf.org/html/rfc6749#section-4.1
[9]: /fr/developers/authorization/oauth2_endpoints/?tab=authorizationendpoints#obtain-an-authorization-code
[10]: /fr/developers/authorization/oauth2_endpoints/?tab=tokenendpoints#exchange-authorization-code-for-access-token
[11]: https://datatracker.ietf.org/doc/html/rfc7636
[12]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
[13]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.2
[14]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.3
[15]: https://datatracker.ietf.org/doc/html/rfc6234#section-4.1
[16]: https://app.datadoghq.com/apps
[17]: /fr/getting_started/site/