---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - http
  - http test
  - http tests
aliases:
- /fr/synthetics/http_test
- /fr/synthetics/http_check
- /fr/synthetics/guide/or-logic-api-tests-assertions
description: Simulez des requêtes HTTPS pour surveiller les endpoints d'API publics
  et internes.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de Datadog Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Débuter avec les tests HTTP
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécuter des tests HTTP sur des endpoints internes
- link: /synthetics/multistep
  tag: Documentation
  text: Exécuter des tests HTTP à plusieurs étapes
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
title: Test HTTP
---
## Présentation {#overview}

Les tests HTTP vous permettent d'envoyer des requêtes HTTP aux endpoints d'API de vos applications pour vérifier les réponses et les conditions définies, y compris le temps de réponse global, le code de statut attendu, l'en-tête ou le contenu du corps.

Les tests HTTP peuvent être exécutés à partir d'emplacements [gérés](#select-locations) et [privés][1] selon que vous préférez exécuter le test depuis l'extérieur ou l'intérieur de votre réseau. Les tests HTTP peuvent être exécutés selon un planning, à la demande ou directement au sein de vos [pipelines CI/CD][2].

## Configuration {#configuration}

Vous pouvez créer un test en utilisant l'une des options suivantes :

   - **Créer un test à partir d'un modèle** :
   
     1. Survolez l'un des modèles pré-remplis et cliquez sur {{< ui >}}View Template{{< /ui >}}. Cela ouvre un panneau latéral affichant des informations de configuration pré-remplies, notamment : {{< ui >}}Test Details{{< /ui >}}, {{< ui >}}Request Details{{< /ui >}}, {{< ui >}}Assertions{{< /ui >}}, {{< ui >}}Alert Conditions{{< /ui >}} et {{< ui >}}Monitor Settings{{< /ui >}}. 
     2. Cliquez sur {{< ui >}}+Create Test{{< /ui >}} pour ouvrir la page {{< ui >}}Define Request{{< /ui >}}, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
     3. Cliquez sur {{< ui >}}Save Details{{< /ui >}} pour soumettre votre test d'API. <br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vidéo de la page d'accueil des tests d'API Synthetics avec des modèles" video="true" >}}

  - **Créer un test à partir de zéro** :
    
     1. Pour créer un test à partir de zéro, cliquez sur le modèle {{< ui >}}+ Start from scratch{{< /ui >}}, puis sélectionnez le type de requête `HTTP` et spécifiez l'{{< ui >}}URL{{< /ui >}} à interroger. 
        Les méthodes disponibles sont : `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS`. Les URL `http` et `https` sont toutes deux prises en charge.

        <div class="alert alert-info">Consultez <a href=#advanced-options>Options avancées</a> pour plus d'options.</div>

     2. {{< ui >}}Name{{< /ui >}} votre test HTTP.

     3. Add Environment {{< ui >}}Tags{{< /ui >}} ainsi que tout autre tag à votre test HTTP. Vous pouvez ensuite utiliser ces tags pour filtrer vos tests Synthetic sur la [page Synthetic Monitoring & Continuous Testing][3]. 
     
     4. Click {{< ui >}}Send{{< /ui >}} pour essayer la configuration de la requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Définir la requête HTTP" style="width:90%;" >}}

     5. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### Extraits {#snippets}

{{% synthetics-api-tests-snippets %}}

### Options avancées {#advanced-options}

   {{< tabs >}}

   {{% tab "Options de requête" %}}
   * {{< ui >}}HTTP version{{< /ui >}} : Sélectionnez `HTTP/1.1 only`, `HTTP/2 only` ou `HTTP/2 fallback to HTTP/1.1`.

     Pour les endpoints utilisant un CDN (comme Akamai, CloudFront ou Fastly), définissez la version HTTP sur `HTTP/2 only` ou `HTTP/1.1 only` au lieu de la valeur par défaut `HTTP/2 with fallback to HTTP/1.1`. La prise en charge de la version HTTP varie selon les sondes, et le paramètre par défaut peut entraîner des [erreurs HTTP][1] intermittentes telles que :
     - `MALFORMED_RESPONSE: Unable to parse HTTP response`
     - `Session closed without receiving a SETTINGS frame`
     - `Error HTTP2: Error performing HTTP/2 request`
   * {{< ui >}}Follow redirects{{< /ui >}} : Sélectionnez cette option pour que votre test HTTP suive jusqu'à dix redirections lors de l'exécution de la requête.
   * {{< ui >}}Ignore server certificate error{{< /ui >}} : Sélectionnez cette option pour que votre test HTTP poursuive la connexion même en cas d'erreurs lors de la validation du certificat SSL.
   * {{< ui >}}Timeout{{< /ui >}} : Spécifiez la durée en secondes avant l'expiration du test.
   * {{< ui >}}Request headers{{< /ui >}} : Définissez les en-têtes à ajouter à votre requête HTTP. Vous pouvez également remplacer les en-têtes par défaut (par exemple, l'en-tête `user-agent`).
   * {{< ui >}}Cookies{{< /ui >}} : Définissez les cookies à ajouter à votre requête HTTP. Définissez plusieurs cookies en utilisant le format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

[1]: /fr/synthetics/api_tests/errors/#http-errors

   {{% /tab %}}

   {{% tab "Authentification" %}}

   * {{< ui >}}Client Certificate{{< /ui >}} : Authentifiez-vous via mTLS en téléchargeant votre certificat client (`.crt`) et la clé privée associée (`.key`) au format `PEM`. Vous pouvez utiliser la bibliothèque `openssl` pour convertir vos certificats. Par exemple, convertissez un certificat `PKCS12` en clés privées et certificats au format `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * {{< ui >}}HTTP Basic Auth{{< /ui >}} : Ajoutez des identifiants d'authentification HTTP de base.
   * {{< ui >}}Digest Auth{{< /ui >}} : Ajoutez des identifiants d'authentification Digest.
   * {{< ui >}}NTLM{{< /ui >}} : Ajoutez des identifiants d'authentification NTLM. Prend en charge NTLMv2 et NTLMv1.
   * {{< ui >}}AWS Signature v4{{< /ui >}} : Saisissez votre ID de clé d'accès et votre clé d'accès secrète. Datadog génère la signature pour votre requête. Cette option utilise l'implémentation de base de SigV4. Les signatures spécifiques telles qu'Amazon S3 ne sont pas prises en charge nativement.
     Pour les requêtes de transfert « Single Chunk » vers des buckets Amazon S3, ajoutez `x-amz-content-sha256` contenant le corps de la requête encodé en sha256 en tant qu'en-tête (pour un corps vide : `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * {{< ui >}}OAuth 2.0{{< /ui >}} : Choisissez entre l'octroi d'identifiants client ou d'un mot de passe de propriétaire de ressource et saisissez une URL de jeton d'accès. Selon votre sélection, saisissez un identifiant client et un secret, ou un nom d'utilisateur et un mot de passe. Dans le menu déroulant, sélectionnez une option pour envoyer le jeton API en tant qu'en-tête d'authentification de base, ou pour envoyer les identifiants client dans le corps. En option, vous pouvez fournir des informations supplémentaires telles que l'audience, la ressource et le périmètre (ainsi que l'identifiant client et le secret, si vous avez sélectionné {{< ui >}}Resource Owner Password{{< /ui >}}).
   * {{< ui >}}JWT{{< /ui >}} : Générez un jeton JWT Bearer signé pour l'authentification. Sélectionnez un algorithme de signature (`HS256`, `RS256` ou `ES256`) et fournissez une clé de signature : saisissez un secret textuel pour `HS256`, ou téléchargez une clé privée au format PEM pour `RS256` et `ES256`. Tous deux acceptent `{{ GLOBAL_VARIABLE }}` references. Enter payload claims as a JSON object; claims can be strings, numbers, Booleans, arrays, or nested objects. The `iat` (issued at) and `exp` (expiration) claims are auto-added by default. If you include `iat` or `exp` in the payload JSON, those values take precedence over the auto-generated ones. Optionally, set the expiration window in seconds (default: `3600`), add custom JWT header fields such as `kid` or `x5t`, and customize the token prefix in the `Authorization` header (default: `Bearer`).

   {{% /tab %}}

   {{% tab "Paramètres de requête" %}}

   * {{< ui >}}Encode parameters{{< /ui >}} : Ajoutez le nom et la valeur des paramètres de requête qui nécessitent un encodage.

   {{% /tab %}}

   {{% tab "Corps de la requête" %}}

   * {{< ui >}}Body type{{< /ui >}} : Sélectionnez le type de corps de requête (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL` ou `None`) que vous souhaitez ajouter à votre requête HTTP.
   * {{< ui >}}Request body{{< /ui >}} : Ajoutez le contenu du corps de votre requête HTTP.
       * Le corps de la requête est limité à une taille maximale de 50 kilo-octets pour `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`.
       * Le corps de la requête est limité à un fichier de 3 méga-octets pour `application/octet-stream`.
       * Le corps de la requête est limité à trois fichiers de 3 méga-octets chacun pour `multipart/form-data`.
   {{% /tab %}}

   {{% tab "Proxy" %}}

   * {{< ui >}}Proxy URL{{< /ui >}} : Spécifiez l'URL du proxy par lequel la requête HTTP doit passer (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * {{< ui >}}Proxy header{{< /ui >}} : Ajoutez des en-têtes à inclure dans la requête HTTP vers le proxy.

   {{% /tab %}}

   {{% tab "Confidentialité" %}}

   * {{< ui >}}Do not save response body{{< /ui >}} : Sélectionnez cette option pour empêcher l'enregistrement du corps de la réponse lors de l'exécution et pour tronquer le message d'erreur des assertions JavaScript ayant échoué. Cela permet de garantir qu'aucune donnée sensible n'est affichée dans vos résultats de test, mais cela peut rendre le dépannage des échecs plus difficile. Pour obtenir des recommandations de sécurité complètes, consultez [Synthetic Monitoring Data Security][1].


[1]: /fr/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

Définissez des variables pour vos tests d'API HTTP avec JavaScript :

{{< img src="synthetics/api_tests/http_javascript.png" alt="Définir un test d'API HTTP avec JavaScript" style="width:90%;" >}}

<div class="alert alert-info">Les fonctionnalités JavaScript ne sont pas prises en charge pour les tests d'API dans les emplacements privés Windows.</div>

   {{% /tab %}}

   {{< /tabs >}}

### Définissez des assertions {#define-assertions}

Les assertions définissent ce qu'est un résultat de test attendu. Après avoir cliqué sur {{< ui >}}Test URL{{< /ui >}}, des assertions de base sur `response time`, `status code` et `header` `content-type` sont ajoutées en fonction de la réponse obtenue. Vous devez définir au moins une assertion pour que votre test puisse effectuer une surveillance.

<div class="alert alert-info">Les sections en-tête, corps et JavaScript des assertions servent uniquement à définir des assertions. Elles ne peuvent pas être utilisées pour effectuer des requêtes HTTP supplémentaires.</div>

{{< tabs >}}
{{% tab "Assertions de réponse" %}}

| Type          | Opérateur                                                                                               | Type de valeur                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| corps          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5], <br> [`jsonschema`][7] | _Chaîne_ <br> _[Regex][6]_ <br> _Chaîne_, _[Regex][6]_ <br> _Chaîne_ |
| hachage du corps     | `md5`, `sha1`, `sha256`                                                                                 | _Chaîne_                                                        |
| en-tête        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> `does not exist`, <br> `is less than`, `is less than or equal`, `is more than`, `is more than or equal` | _Chaîne_ <br> _[Regex][6]_ <br> _Aucun_ <br> _Entier_ |
| temps de réponse | `is less than`                                                                                         | _Entier (ms)_                                                  |
| code d'état   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _Entier_ <br> _[Regex][6]_                                                     |

Les tests HTTP peuvent décompresser les corps avec les en-têtes `content-encoding` suivants : `br`, `deflate`, `gzip` et `identity`.

Vous pouvez créer jusqu'à 20 assertions par test d'API en cliquant sur {{< ui >}}New Assertion{{< /ui >}} ou en cliquant directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_http.png" alt="Définissez les assertions qui détermineront si votre test HTTP réussit ou échoue" style="width:90%;" >}}

Pour effectuer une logique `OR` dans une assertion, utilisez le comparateur `matches regex` pour définir une expression régulière avec plusieurs valeurs attendues comme `(200|302)`. Par exemple, vous pouvez souhaiter que votre test HTTP réussisse lorsqu'un serveur doit répondre avec un code d'état `200` ou `302`. L'assertion `status code` réussit si le code d'état est 200 ou 302. Vous pouvez également ajouter une logique `OR` sur une assertion `body` ou `header` avec le comparateur `matches regex`.

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le Synthetics Worker.

Le corps de la réponse n'est renvoyé que si vous avez ajouté des assertions sur son contenu et que ces assertions ont échoué. Si un test contient une assertion sur le corps de la réponse et réussit, la charge utile du corps est supprimée et seul un extrait des 50 premiers caractères du corps de la réponse est affiché.

Si un test contient une assertion sur le corps de la réponse et que la limite de délai d'attente est atteinte, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: https://json-schema.org/

{{% /tab %}}
{{% tab "JavaScript" %}}

Utilisez les assertions JavaScript lorsque les assertions de réponse standard ne répondent pas à vos besoins de validation. Synthetic Monitoring utilise la [bibliothèque d'assertion Chai][20], qui fournit `dd.expect()`, `dd.should` et `dd.assert()` pour des styles d'assertion flexibles.

Lorsque vous travaillez avec des réponses JSON, utilisez `JSON.parse(dd.response.body)` pour analyser le corps de la réponse avant d'accéder à ses propriétés. Ceci est requis pour toutes les méthodes d'assertion (`dd.assert()`, `dd.expect()` et `dd.should`) lors de la validation de données JSON.

{{< img src="synthetics/api_tests/JS_assertion.png" alt="Assertion JavaScript pour test d'API HTTP" style="width:90%;" >}}

<div class="alert alert-info">
  <ul>
    <li>Les fonctionnalités JavaScript ne sont pas prises en charge pour les tests d'API dans les emplacements privés Windows.</li>
    <li>Si le message d'erreur d'une assertion JavaScript échouée peut contenir des données sensibles, sous {{< ui >}}Advanced Options{{< /ui >}} > {{< ui >}}Privacy{{< /ui >}}, activez {{< ui >}}Do not save response body{{< /ui >}}. Ceci tronque le message d'erreur de l'assertion.</li>
  </ul>
</div>

#### Utilisation de dd.assert() {#using-ddassert}

Utilisez `dd.assert()` pour une syntaxe d'assertion traditionnelle :

Par exemple, pour affirmer qu'un champ `status.code` fait partie de plusieurs valeurs autorisées :

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
// Assert that the status code is 200, 210, 320, or 330
dd.assert.include([200, 210, 320, 330], response.status.code);
{{< /code-block >}}

Exemple de réponse :

```json
{
  "status": {
    "code": 200,
    "message": "Success"
  }
}
```

Cette assertion :
- Analyse le corps de la réponse JSON
- Vérifie que `status.code` est inclus dans le tableau des valeurs autorisées (200, 210, 320 ou 330)

Le test **réussit** car `status.code` est `200`, ce qui est inclus dans le tableau des valeurs autorisées.

Pour plus d'informations sur `assert.include()`, consultez la [documentation de Chai assert.include()][21].

#### Utilisation de dd.expect() {#using-ddexpect}

Utilisez `dd.expect()` pour les assertions avec validation de propriété imbriquée.

Par exemple, pour affirmer qu'un champ `status.indicator` correspond à l'une des valeurs attendues :

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
const regex = /^(major|critical|minor|none)$/;

dd.expect(response)
  .to.have.nested.property('status.indicator')
  .that.matches(regex);
{{< /code-block >}}

Exemple de réponse :

```json
{
  "status": {
    "indicator": "none"
  }
}
```
Cette assertion :
- Analyse le corps de la réponse JSON
- Valide que la propriété imbriquée `status.indicator` existe
- Vérifie que la valeur correspond au motif regex (l'un des suivants : `major`, `critical`, `minor` ou `none`)

Avec le regex `/^(major|critical|minor|none)$/`, le test **réussit** car `status.indicator` est `"none"`, ce qui correspond au motif.

Avec le regex `/^(major|critical|minor)$/`, le test **échoue** car `"none"` n'est pas inclus dans les valeurs autorisées.

Pour plus d'informations sur `expect()`, consultez la [documentation de Chai expect()][22].

#### Utilisation de dd.should {#using-ddshould}

Utilisez `dd.should` pour écrire des assertions avec une syntaxe en langage naturel :

Par exemple, pour affirmer qu'un champ `status.indicator` existe et est égal à une valeur spécifique :

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
response.status.should.exist();
const indicator = response.status.indicator;
indicator.should.equal('none');
{{< /code-block >}}

Exemple de réponse :

```json
{
  "status": {
    "indicator": "none"
  }
}
```

Cette assertion :
- Analyse le corps de la réponse JSON
- Vérifie que la propriété `status` existe
- Extrait la valeur de l'indicateur dans une variable
- Vérifie que `status.indicator` est égal à `"none"`

Le test **réussit** car `status` existe et `status.indicator` est `"none"`.

Pour plus d'informations sur `should()`, consultez la [documentation de Chai should()][23].

[20]: https://www.chaijs.com/api/
[21]: https://www.chaijs.com/api/assert/#method_include
[22]: https://www.chaijs.com/guide/styles/#expect
[23]: https://www.chaijs.com/guide/styles/#should

{{% /tab %}}
{{< /tabs >}}

### Sélectionnez des emplacements {#select-locations}

Sélectionnez le {{< ui >}}Locations{{< /ui >}} à partir duquel exécuter votre test HTTP. Les tests HTTP peuvent être exécutés à partir d'emplacements gérés et [privés][1] selon que vous préférez exécuter le test depuis l'extérieur ou l'intérieur de votre réseau.

{{% managed-locations %}}

### Spécifiez la fréquence du test {#specify-test-frequency}

Les tests HTTP peuvent être exécutés :

* **Selon un planning** pour garantir que vos endpoints les plus importants sont toujours accessibles à vos utilisateurs. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test HTTP.
* [**Au sein de vos pipelines CI/CD**][2] pour commencer à livrer sans craindre qu'un code défectueux n'impacte l'expérience de vos clients.
* **À la demande** pour exécuter vos tests au moment le plus opportun pour votre équipe.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

## En un clic {#one-click}

La création de test d'API suggère des endpoints à partir du [Catalogue][17] et des tests d'API existants pour préremplir votre formulaire de test avec des options pertinentes.
Utilisez des sources de données Datadog existantes telles que les traces APM, la découverte d'endpoints du Catalogue et des tests Synthetic similaires existants créés par les utilisateurs.

Commencez à saisir dans le champ {{< ui >}}URL{{< /ui >}} de test d'API pour obtenir des suggestions d'endpoints ou des tests similaires dans Synthetic Monitoring :

   {{< img src="synthetics/api_tests/api-one-click.png" alt="Test d'API HTTP montrant une recherche GET pour un test d'API existant" style="width:90%;" >}}

Ensuite, sélectionnez une suggestion pour préremplir votre configuration de test (options de requête et en-têtes, authentification et variables) :

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="Sélectionner" style="width:90%;" >}}

{{% synthetics-variables %}}

### Utilisez des variables {#use-variables}

Vous pouvez utiliser les [variables globales définies sur la page {{< ui >}}Settings{{< /ui >}}][11] dans l'URL, les options avancées et les assertions de vos tests HTTP.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité :

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="Utilisation de variables dans un test HTTP" video="true" width="100%" >}}

## Échec du test {#test-failure}

Un test est considéré comme `FAILED` s'il ne satisfait pas une ou plusieurs assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut échouer sans tester les assertions par rapport à l'endpoint.

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="Page de détails du test d'API HTTP affichant l'onglet Activité avec la disponibilité globale, la chronologie des alertes et une liste des exécutions de test récentes en état d'alerte" style="width:100%;">}}

### Résumé de la chronologie {#timeline-summary}

Le panneau {{< ui >}}Summary{{< /ui >}} identifie les problèmes uniques provoquant des échecs lors des exécutions de test dans la période sélectionnée. Pour chaque problème, le panneau affiche :

- {{< ui >}}First seen{{< /ui >}} : moment où le problème est apparu pour la première fois dans les exécutions de test.
- {{< ui >}}Last seen{{< /ui >}} : moment où le problème est apparu le plus récemment dans les exécutions de test.
- {{< ui >}}Classification{{< /ui >}}: indique si le problème est un {{< ui >}}True failure{{< /ui >}} (un vrai problème avec votre application) ou un {{< ui >}}Test Misconfiguration{{< /ui >}} (un problème avec la configuration du test), basé sur le résumé d'échec par IA.
- {{< ui >}}Description{{< /ui >}} : une brève description de l'erreur.
- {{< ui >}}Latest alerts{{< /ui >}} : une liste des alertes les plus récentes liées au problème.

Pour obtenir une liste complète des codes d'erreur HTTP et SSL, consultez [API Testing Errors][12].

## Lancer Bits Investigation {#launch-a-bits-investigation}

Pour identifier la cause première d'un test HTTP Synthetic en échec, lancez [Bits Investigation][18]. Bits Investigation analyse les résultats de test, les traces, les logs et les métriques pour faire ressortir une cause première et signaler si l'échec est dû à une régression ou à une mauvaise configuration.

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant des [rôles Datadog Admin et Datadog Standard][13] peuvent créer, modifier et supprimer des tests HTTP Synthetic. Pour obtenir un accès de création, de modification et de suppression aux tests HTTP Synthetic, mettez à niveau votre utilisateur vers l'un de ces deux [rôles par défaut][13].

Si vous utilisez la [fonctionnalité de rôle personnalisé][14], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès {#restrict-access}

{{% synthetics_grace_permissions %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations
[2]: /fr/synthetics/cicd_integrations
[3]: /fr/synthetics/search/#search
[7]: /fr/monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /fr/synthetics/guide/synthetic-test-monitors
[11]: /fr/synthetics/settings/#global-variables
[12]: /fr/synthetics/api_tests/errors/
[13]: /fr/account_management/rbac/
[14]: /fr/account_management/rbac#custom-roles
[15]: /fr/account_management/rbac/#create-a-custom-role
[16]: /fr/synthetics/api_tests/errors/#http-errors
[17]: /fr/api_catalog
[18]: /fr/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page