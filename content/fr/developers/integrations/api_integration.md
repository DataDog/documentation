---
aliases:
- /fr/developers/integrations/oauth_for_data_integrations/
- /fr/developers/integrations/oauth_for_integrations/
description: Découvrez comment développer et publier une intégration basée sur l'API
  Datadog.
further_reading:
- link: /developers/authorization/oauth2_in_datadog/
  tag: Documentation
  text: OAuth2 dans Datadog
- link: /developers/integrations/
  tag: Documentation
  text: Créer une intégration
- link: https://www.datadoghq.com/blog/oauth/
  tag: Blog
  text: Autorisez vos intégrations Datadog avec OAuth (en anglais)
title: Créer une intégration basée sur l'API
---

## Présentation

Cette page guide les partenaires technologiques dans la création d'une intégration basée sur l'API Datadog. 

Utilisez les [endpoints de l'API Datadog][21] pour améliorer l'expérience client en soumettant des données depuis votre backend ou en récupérant des données depuis le compte Datadog de l'utilisateur. Le code est développé et hébergé par les partenaires technologiques dans leur propre infrastructure. 

Les intégrations d'API sont idéales pour les partenaires technologiques SaaS disposant d’une plateforme existante permettant d’authentifier les utilisateurs.

Les intégrations d'API peuvent envoyer les types de données suivants à Datadog :

- [Métriques][22]
- [Logs][23]
- [Événements][24]
- [Checks de service][25]
- [Traces][26]
- [Incidents][27]

## Processus de développement

### OAuth

Au lieu de demander des clés d'API et des clés d’application à l’utilisateur, Datadog impose l’utilisation d’un [client OAuth][14] pour gérer l’autorisation et l’accès dans les intégrations API. Les implémentations OAuth doivent être compatibles avec tous les [sites Datadog][12].

OAuth permet aux utilisateurs de Datadog d'accorder un accès sécurisé à leur organisation à des services tiers. Cette autorisation permet aux intégrations d'envoyer ou d'extraire des données vers ou depuis Datadog, sans que les utilisateurs aient à fournir de clés API ou de clés d'application. Par exemple, un utilisateur peut accorder à un outil d'alerte en astreinte l'accès en lecture aux monitors de son organisation Datadog.

Remarque : cette fonctionnalité est uniquement disponible pour les partenaires technologiques approuvés souhaitant créer des intégrations. Les clients OAuth créés à d'autres fins ne sont pas pris en charge.

La publication d'un client OAuth n'entraîne pas automatiquement la publication de l'intégration. Votre intégration ne s'affichera sur la [page des intégrations][16] qu'après avoir mené à bien un processus de publication distinct. Pour en savoir plus sur la création et la publication d'une intégration, consultez la section [Créer une intégration][18].

### Quand utiliser OAuth dans une intégration

La prise en charge d'OAuth est requise pour toutes les intégrations SaaS créées par des partenaires qui soumettent ou consultent directement des données via les [endpoints publics de l'API][12] de Datadog. OAuth ne s'applique pas aux logiciels déployés sur site, ni aux check de l'Agent Datadog.

Vous pouvez inclure OAuth dans une nouvelle intégration (ou l'ajouter à une intégration existante) depuis le [Marketplace][2] ou la page [Intégrations][3], en suivant les étapes ci-dessous.

### Créer un client OAuth
Le client est un composant qui permet aux utilisateurs d'autoriser l'application à accéder à leurs données dans Datadog. Pour pouvoir accéder à ces données, le client doit disposer du token d'accès approprié.
1. Avant de configurer OAuth, suivez la documentation de la plateforme de développement d'intégrations pour configurer votre intégration. Sélectionnez **API with OAuth** comme méthode de configuration.
2. Saisissez les détails de votre client, tels que le nom, l'URL d'intégration et les URI de redirection.
3. Générez le secret du client OAuth.
4. Conservez bien le secret de votre client : il ne sera affiché qu'une seule fois. En cas de perte, vous pouvez en générer un nouveau.

   Le client que vous créez à cette étape est une version privée, et ses identifiants peuvent être utilisés uniquement pour des tests au sein de votre propre organisation. Une fois votre intégration publiée, une version publique du client sera générée, avec de nouveaux identifiants valides pour toutes les organisations Datadog.

5. Sélectionnez les portées appropriées.

   Les portées déterminent les types de données auxquels votre application peut accéder dans le compte Datadog du client. Cela permet à votre intégration d'accéder uniquement aux ressources nécessaires. Ne sélectionnez que les portées essentielles à votre intégration. Il est possible d'en ajouter davantage ultérieurement si nécessaire. Pour soumettre des données dans Datadog, vous devez sélectionner la portée `api_keys_write`.
6. Enregistrez vos modifications.

### Implémenter le protocole OAuth

Consultez la section [Datadog OAuth2][1] pour découvrir les étapes spécifiques d'implémentation du protocole OAuth.

### Tester le client OAuth

Une fois le protocole OAuth implémenté, testez votre client OAuth afin de vérifier que vous pouvez envoyer ou extraire des données selon votre cas d'usage.

**Remarque** : tant que votre vignette d'intégration n'est pas publiée, vous ne pouvez autoriser le client OAuth que depuis votre organisation sandbox. Cela signifie que vous ne pouvez envoyer ou extraire des données qu'à partir de votre compte sandbox.

Pour tester votre client OAuth, procédez comme suit :
1. Tester le fonctionnement de l'autorisation
2. Créer une clé d'API
3. Tester plusieurs sites Datadog
4. Confirmer la compatibilité entre régions
5. Confirmer le flux de données pour toutes les portées
6. Soumettre votre intégration et votre client OAuth pour examen

#### Tester le fonctionnement de l'autorisation

1. Depuis la page du client OAuth sur la plateforme de développement, sélectionnez **Test Authorization**. Cela vous redirige vers l'URL d'onboarding et déclenche le flux d'autorisation du point de vue utilisateur. En cliquant sur ce bouton, le paramètre `domain` est transmis dans la redirection vers l'`onboarding_url`.
2. Complétez le processus OAuth pour accorder l'accès à votre intégration.

#### Créer une clé d'API

Si votre client OAuth demande la portée `api_keys_write`, assurez-vous que vous pouvez effectuer une requête vers l'endpoint `marketplace` en incluant votre jeton dans les en-têtes de la requête. Pour plus d'informations, consultez [la documentation sur les endpoints d’autorisation OAuth2][20].

Si la requête aboutit, une API key est renvoyée et disponible sur la [page de gestion des clés d'API][10]. Vous devez enregistrer cette clé de manière sécurisée afin de pouvoir soumettre des données à Datadog au nom de l'utilisateur. **La valeur de cette clé d'API ne sera plus visible après sa création initiale**.

#### Tester plusieurs sites Datadog

Les tests [multi‑sites Datadog][8] ne sont accessibles qu'après approbation et mise en ligne de votre intégration dans votre sandbox développeur.
1. Si vous n'avez pas accès à un compte sandbox sur un autre site, contactez `ecosystems@datadog.com`.
2. Votre intégration sera rendue disponible dans cette autre sandbox.
3. Connectez l'intégration et lancez le flux OAuth.


##### Confirmer la compatibilité entre régions

Pour que OAuth fonctionne pour les utilisateurs dans toutes les régions Datadog, vous devez vous assurer que les appels API effectués correspondent à la région de l'utilisateur. Lorsque l'utilisateur lance l'autorisation depuis le carré Datadog, un paramètre de site est transmis dans la redirection depuis l'URL d'intégration. Vous devez utiliser cette valeur de site pour cibler les bons endpoints d'autorisation et de jeton.

Si un utilisateur lance l'autorisation directement depuis votre plateforme, ce paramètre de site n'est pas transmis et l'utilisateur est invité à sélectionner son site sur la page d'autorisation de Datadog.

Assurez-vous de tester les appels vers l'API Datadog correspondant à la région de l'utilisateur. Par exemple, `https://trace.browser-intake-datadoghq.com` pour les États‑Unis, et `https://public-trace-http-intake.logs.datadoghq.eu` pour l'Europe.

La page [Trafic réseau][19] répertorie toutes les destinations disponibles par région. Utilisez le menu **DATADOG SITE** à droite pour afficher celles correspondant à chaque zone.

#### Confirmer le flux de données pour toutes les portées

Assurez-vous de pouvoir envoyer, extraire ou modifier des données pour chaque portée que vous avez demandée.

### Publier le client OAuth

#### Soumettre votre intégration et votre client OAuth pour examen
1. Une fois tous les champs requis de votre intégration remplis, soumettez-la pour examen.
2. Une fois votre intégration soumise, Datadog génère de nouveaux identifiants pour sa version publique. **Vous ne pourrez plus consulter ces identifiants. Enregistrez-les dans un endroit sûr.**
3. Quand votre intégration est approuvée par Datadog et prête à être publiée, votre client OAuth est également publié. Une fois la publication effective, votre carré d'intégration sera visible dans votre environnement sandbox uniquement. De plus, votre client OAuth pourra être autorisé par n'importe quelle organisation Datadog, et non plus seulement par votre sandbox.
4. À ce stade, Datadog recommande d'effectuer des tests finaux avec votre client OAuth pour vérifier que l'autorisation fonctionne correctement.

#### Modifier le client après sa soumission pour publication

Vous ne pouvez pas modifier directement un client OAuth déjà publié. Pour mettre à jour le client OAuth après sa publication, vous devez repasser par le processus de publication et le soumettre à nouveau.

## Dépannage

### La liste des portées API n'inclut pas l'envoi de métriques, d'événements ou de logs

Pour envoyer des données vers Datadog, utilisez la portée `api_keys_write` lors de la génération d'une clé d'API au nom de l'utilisateur. Pour en savoir plus, consultez la section [Créer une clé d'API](#creer-une-cle-d-api).


### ID client non valide

Erreur
: `invalid_request - Invalid client_id parameter value`

Tant qu'un client OAuth n'est pas publié, vous ne pouvez l'autoriser que depuis le compte dans lequel il a été créé (le compte sandbox du partenaire). Cette erreur se produit si vous essayez d'autoriser le client depuis un autre compte avant qu'il ne soit publié.

Si votre client OAuth est déjà publié, utilisez bien l'ID client et le secret client reçus lors de la soumission. Le secret client n'a été affiché qu'une seule fois. Si vous l'avez perdu, contactez [ecosystems@datadog.com][11] pour obtenir de l'aide.

### Erreurs Forbidden

Erreur
: `{"errors":["Forbidden"]}`

Cette erreur peut être liée à une clé d'application ou à un problème d'authentification de l'API.

#### Utilisation de la clé d'application

Les clients OAuth utilisent un `access_token` pour l'authentification. Utilisez le `access_token` pour effectuer des appels aux endpoints de l'API Datadog, en l'envoyant dans l'en-tête Authorization de votre requête :

```python
headers = {"Authorization": "Bearer {}".format(access_token)}
```

Pour en savoir plus, consultez la section [Implémenter le protocole OAuth][17].

### Requêtes d'API

Si vous obtenez une erreur forbidden lors d'un appel d'API vers un endpoint spécifique, alors que la portée correcte est activée, il est possible que votre clé d'API, votre session ou votre token OAuth soit invalide ou expiré.

#### Expiration de la clé d'API et du jeton

Les jetons d'actualisation n'expirent pas, sauf si l'utilisateur révoque l'autorisation ou si le partenaire révoque le jeton. Si le partenaire révoque le token, l'utilisateur doit réautoriser l'intégration pour générer de nouveaux jetons d'actualisation et d'accès. Pour plus d'informations, consultez la [documentation sur les endpoints d’autorisation OAuth2][13].

#### Récupération des clés d'API dans votre compte sandbox partenaire

Après avoir créé une clé via l'endpoint [api_keys/marketplace][14], la clé est renvoyée dans la réponse. La clé ne peut pas être régénérée ni consultée à nouveau. Conservez cette clé en lieu sûr pour maintenir l'envoi de données sans interruption. Si vous perdez votre clé d'API, suivez les étapes suivantes pour la révoquer et en recréer une :

1. Accédez à la [page de gestion des clés d'API Datadog][15].
1. Recherchez la clé d'API nommée `OAuth Client API Key` et sélectionnez-la.
1. Cliquez sur **Revoke** pour désactiver la clé d'API.
1. Suivez les étapes de la section [Créer une clé d'API](#creer-une-cle-d-api) pour générer une nouvelle clé.
1. Réinstallez l'intégration et relancez le flux OAuth.


### Hostname/IP ne correspond pas aux noms alternatifs du certificat

Erreur
: `Hostname/IP does not match certificate's altnames`

Lors de la connexion à l'API Datadog, n'incluez pas le sous-domaine dans l'appel d'API Par exemple, utilisez `datadoghq.eu` plutôt que `bigcorp.datadoghq.eu`.

### URI de redirection non conforme

Erreur
: `invalid_request - Mismatching redirect URI`

Cette erreur est généralement due à des différences de configuration entre votre client de test et votre client publié. Vérifiez les éléments suivants :
- Assurez-vous d'utiliser le bon `client_id` lors de l'autorisation. Par exemple, vous utilisez peut-être le `client_id` de votre client de test au lieu de celui de votre client publié.
- Confirmez que vous utilisez la bonne URI de redirection. Par exemple, si votre client est publié, l'URI de redirection doit correspondre à celle configurée pour l'environnement de production, et non à celle utilisée pendant les tests.
- Assurez-vous d'utiliser le bon client. Utilisez votre client de test tant que l'intégration n'est pas publiée dans votre compte sandbox.

### Applications avec sous-domaines

Datadog ne prend pas en charge les applications multi-tenant où les clients autorisent via des sous-domaines individuels. L'autorisation est uniquement prise en charge via un domaine unique.

### OAuth avec PKCE

Erreur
: `Invalid code or code verifier`

En cas de problème avec le flux OAuth PKCE, assurez-vous que l'en-tête `content-type` est bien défini sur `application/json` ou `application/x-www-form-urlencoded`.

### Régénération des secrets client et rotation des secrets

Si votre secret a été compromis et doit être remplacé, contactez [ecosystems@datadog.com][11]. Un seul secret peut être actif à la fois. Après régénération, l'ancien secret est supprimé. Vous n'avez pas besoin de réautoriser l'intégration après rotation du secret.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: /fr/developers/integrations/marketplace_offering/#list-an-offering
[8]: /fr/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: mailto:ecosystems@datadog.com
[12]: /fr/api/latest/using-the-api/
[13]: /fr/developers/authorization/oauth2_endpoints/#exchange-authorization-code-for-access-token
[14]: /fr/developers/authorization/oauth2_endpoints/#post-apiv2api_keysmarketplace
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/integrations
[17]: /fr/developers/authorization/oauth2_in_datadog/#implement-the-oauth-protocol
[18]: /fr/developers/integrations/
[19]: /fr/agent/configuration/network/
[20]: /fr/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints
[21]: https://docs.datadoghq.com/fr/api/latest/using-the-api/
[22]: https://docs.datadoghq.com/fr/api/latest/metrics/
[23]: https://docs.datadoghq.com/fr/logs/faq/partner_log_integration/
[24]: https://docs.datadoghq.com/fr/api/latest/events/
[25]: https://docs.datadoghq.com/fr/api/latest/service-checks/
[26]: https://docs.datadoghq.com/fr/tracing/guide/send_traces_to_agent_by_api/
[27]: https://docs.datadoghq.com/fr/api/latest/incidents/