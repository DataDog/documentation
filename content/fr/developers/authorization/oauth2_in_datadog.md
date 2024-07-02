---
description: Découvrez comment Datadog utilise le protocole OAuth 2.0.
further_reading:
- link: /developers/authorization/oauth2_endpoints
  tag: Documentation
  text: Utiliser les endpoints d'autorisation OAuth 2.0
title: OAuth2 dans Datadog
---

{{< callout btn_hidden="true" >}}
  La plateforme de développement Datadog est en version bêta. Si vous n'y avez pas accès, envoyez un e-mail à l'adresse apps@datadoghq.com.
{{< /callout >}} 

## Présentation

Cette page explique de façon détaillée comment implémenter le protocole OAuth de bout en bout dans votre application après la création de votre client **confidentiel**. 

### Implémenter le protocole OAuth

1. Créez et configurez votre client OAuth sur la [plateforme de développement][16]. 

2. Après avoir installé votre intégration, les utilisateurs peuvent cliquer sur le bouton **Connect Accounts** pour connecter leur compte dans l'onglet **Configure** du carré d'intégration. 

   Lorsqu'un utilisateur clique sur ce bouton, il est redirigé vers la page spécifiée via le paramètre `onboarding_url` que vous avez défini dans le cadre du processus de création du client OAuth. Cette page doit correspondre à la page de connexion de votre plateforme.

3. Lorsqu'un utilisateur se connecte, redirigez-le vers l'[endpoint d'autorisation OAuth2][6] avec les paramètres d'URL appropriés, notamment le paramètre `code_challenge` supplémentaire généré par votre application.

   Pour savoir comment obtenir le paramètre `code_challenge`, consultez la rubrique [PKCE](#flux-d-octroi-de-code-d-autorisation-avec-pkce). Votre application doit enregistrer la valeur `code_verifier` pour la requête de token à l'étape 5.

   - Pour créer l'URL de cette requête POST, utilisez le paramètre de requête `site` fourni dans la redirection vers votre page `onboarding_url`. 
   - Ce paramètre n'est fourni que si l'utilisateur initie l'autorisation depuis le carré d'intégration Datadog. Consultez la rubrique [Initier l'autorisation depuis un emplacement tiers](#initier-l-autorisation-depuis-un-emplacement-tiers) pour connaître les autres options disponibles si l'utilisateur choisit d'initier l'autorisation depuis un emplacement externe.  
   - Par exemple, `site` peut correspondre à `https://app.datadoghq.com`, `https://app.datadoghq.eu`, `https://us5.datadoghq.com`, ou il peut s'agir d'un sous-domaine personnalisé qui doit être pris en compte, comme `https://<sous-domaine_personnalisé>.datadoghq.com`. 
   - Pour gérer plusieurs sites Datadog de façon dynamique, vous pouvez ajouter le chemin `authorize` Datadog à l'URL ainsi créée.

4. Lorsqu'un utilisateur clique sur **Authorize**, Datadog envoie une requête POST à l'endpoint d'autorisation. L'utilisateur est alors redirigé vers la ressource spécifiée via le paramètre `redirect_uri` que vous avez défini lors de la configuration du client OAuth, avec le paramètre `code` d'autorisation dans le composant de requête.

5. Depuis la ressource spécifiée via le paramètre `redirect_uri`, envoyez à l'[endpoint de token Datadog][10] une requête POST comprenant le code d'autorisation de l'étape 4, la valeur `code_verifier` de l'étape 3, l'identifiant de votre client OAuth, ainsi que le secret du client.

   - Pour créer l'URL de cette requête POST, utilisez le paramètre de requête `site` fourni dans la redirection vers votre ressource `redirect_uri`. 
   - Par exemple, `site` peut correspondre à `https://app.datadoghq.com`, `https://app.datadoghq.eu`, `https://us5.datadoghq.com`, ou il peut s'agir d'un sous-domaine personnalisé qui doit être pris en compte, comme `https://<sous-domaine_personnalisé>.datadoghq.com`. 
   - Pour gérer plusieurs sites Datadog de façon dynamique, vous pouvez ajouter le chemin `token` Datadog à l'URL ainsi créée.

6. Une fois l'opération réussie, vous recevez vos tokens `access_token` et `refresh_token` dans le corps de la réponse. Votre application devrait afficher une page de confirmation avec le message suivant : `You may now close this tab`.

7. Utilisez le token `access_token` pour appeler les endpoints d'API Datadog en l'envoyant dans l'en-tête d'autorisation de votre requête : ```headers = {"Authorization": "Bearer {}".format(access_token)}```.
    - Lors des appels vers les endpoints d'API, assurez-vous que le site Datadog de l'utilisateur est pris en compte. Par exemple, si un utilisateur se trouve dans un pays de l'UE, l'endpoint d'événements est `https://api.datadoghq.eu/api/v1/events`, tandis que pour les utilisateurs situés dans la région US1, l'endpoint d'événements est `https://api.datadoghq.com/api/v1/events`. Certains endpoints peuvent également nécessiter une clé d'API, qui est créée à l'étape 8 ci-dessous. 

8. Appelez l'[endpoint de création de clé d'API][7] pour générer une clé d'API vous permettant d'envoyer des données pour le compte des utilisateurs Datadog.

   Cette étape échouera si le contexte `API_KEYS_WRITE` n'a pas été ajouté à votre client. Cet endpoint génère une clé d'API qui n'est affichée qu'une seule fois. **Conservez cette valeur dans une base de données ou un emplacement sécurisé**. 

Pour en savoir plus sur la création et la publication de clients, consultez la section [OAuth pour les intégrations Datadog][5].

### Initier l'autorisation depuis un emplacement tiers 

Vous pouvez lancer le processus d'autorisation dans Datadog en cliquant sur **Connect Accounts** dans le carré d'intégration, ou depuis le site Web externe de l'intégration. Par exemple, si une page de configuration de l'intégration que les utilisateurs Datadog doivent utiliser est disponible sur votre site Web, vous pouvez permettre aux utilisateurs de lancer le processus d'autorisation depuis cette page.

Lorsque le processus d'autorisation est lancé depuis un emplacement tiers, c'est-à-dire depuis tout emplacement autre que le carré d'intégration Datadog, vous devez prendre en compte le [site Datadog][17] (exemple : EU, US1, US3 ou US5) lors de la redirection des utilisateurs dans le cadre du flux d'autorisation et pour la création des URL des endpoints `authorization` et `token`. 

Pour garantir l'authentification des utilisateurs auprès du site approprié, redirigez-les toujours vers le site Datadog US1 (`app.datadoghq.com`), où ils pourront sélectionner leur région. Une fois le flux d'autorisation terminé, assurez-vous que tous les appels d'API suivants utilisent le site approprié renvoyé sous forme de paramètre de requête avec le `redirect_uri` (voir l'étape 5 de la rubrique [Implémenter le protocole OAuth](#Implementer-le-protocole-OAuth)).

Lorsque les utilisateurs initient l'autorisation depuis le carré d'intégration Datadog, ils doivent disposer des autorisations appropriées pour tous les contextes demandés. Si l'autorisation est initiée depuis un emplacement autre que le carré d'intégration, les utilisateurs ne disposant pas de toutes les autorisations requises pourront s'authentifier (mais devront à nouveau s'authentifier avec les autorisations appropriées lors de leur retour au carré d'intégration). Pour éviter cela, les utilisateurs doivent être redirigés depuis les plateformes tierces vers le carré d'intégration Datadog pour lancer le processus d'autorisation. 

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
| Code Challenge        | Une transformation de la valeur Code Verifier.                                                                                               |
| Code Challenge Method | La méthode utilisée pour dériver le `code_challenge` à partir de la valeur `code_verifier`. Vous devez utiliser le hachage [SHA-256][16] pour calculer le `code_challenge`. |

Le [protocole PKCE][11] s'intègre au flux d'octroi de code d'autorisation en effectuant les actions suivantes :

- L'application génère une chaîne aléatoire `code_verifier` et obtient le `code_challenge` correspondant en utilisant la méthode définie via le paramètre `code_challenge_method`.

- L'application envoie à Datadog une requête d'autorisation contenant les paramètres `code_challenge` et `code_challenge_method` pour obtenir un code d'autorisation.

- L'application envoie à Datadog une requête de token contenant le code d'autorisation et la chaîne `code_verifier` pour obtenir un token d'accès. L'endpoint de token vérifie le code d'autorisation en transformant la chaîne `code_verifier` à l'aide de la méthode définie via le paramètre `code_challenge_method` et compare la valeur obtenue à la valeur `code_challenge` d'origine.



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: /fr/api/latest/scopes/
[3]: /fr/developers/datadog_apps/#oauth-api-access
[4]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[5]: /fr/developers/integrations/oauth_for_data_integrations
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