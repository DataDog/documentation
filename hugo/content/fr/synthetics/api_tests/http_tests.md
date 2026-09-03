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
  text: Présentation de la surveillance Datadog Synthetics
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
title: Tests HTTP
---
## Aperçu {#overview}

Les tests HTTP vous permettent d'envoyer des requêtes HTTP aux endpoints d'API de vos applications pour vérifier les réponses et les conditions définies, y compris le temps de réponse global, le code de statut attendu, l'en-tête ou le contenu du corps.

Les tests HTTP peuvent être exécutés à partir d'[emplacements gérés](#select-locations) ou d'[emplacements privés][1] selon votre préférence pour exécuter le test depuis l'extérieur ou à l'intérieur de votre réseau. Les tests HTTP peuvent être exécutés selon un calendrier, à la demande, ou directement dans vos [pipelines CI/CD][2].

## Configuration {#configuration}

Vous pouvez créer un test en utilisant l'une des options suivantes :

   - **Créer un test à partir d'un modèle** :
   
     1. Survolez l'un des modèles préremplis et cliquez sur **Voir le modèle**. Cela ouvre un panneau latéral affichant les informations de configuration pré-remplies, y compris : Détails du test, Détails de la requête, Assertions, Conditions d'alerte et Paramètres de surveillance. 
     2. Cliquez sur **+Créer un test** pour ouvrir la page **Définir la requête**, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
     3. Cliquez sur **Enregistrer les détails** pour soumettre votre test API. <br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vidéo de la page d’atterrissage du test API Synthetics avec modèles" video="true" >}}

  - **Créer un test à partir de zéro** :
    
     1. Pour construire un test à partir de zéro, cliquez sur le modèle **+ Commencer à partir de zéro**, puis sélectionnez le `HTTP`type de requête et spécifiez l'**URL** à interroger. 
        Les méthodes disponibles sont : `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS`. Les URL `http` et `https` sont toutes deux prises en charge.

        <div class="alert alert-info">Voir <a href=#advanced-options>Options avancées</a> pour plus d'options.</div>

     2. **Name** your HTTP test.

     3. Add Environment **Tags** as well as any other tag to your HTTP test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3]. 
     
     4. Click **Send** to try out the request configuration. A response preview is displayed on the right side of your screen.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Définir la requête HTTP" style="width:90%;" >}}

     5. Click **Create Test** to submit your API test.

### Extraits {#snippets}

{{% synthetics-api-tests-snippets %}}

### Options avancées {#advanced-options}

   {{< tabs >}}

   {{% tab "Options de demande" %}}
   * **Version HTTP** : Sélectionnez `HTTP/1.1 only`, `HTTP/2 only` ou `HTTP/2 fallback to HTTP/1.1`.
   * **Suivre les redirections** : Sélectionnez pour que votre test HTTP suive jusqu'à dix redirections lors de l'exécution de la demande.
   * **Ignorer l'erreur de certificat serveur** : Sélectionnez pour que votre test HTTP continue la connexion même s'il y a des erreurs lors de la validation du certificat SSL.
   * **Délai d'attente** : Spécifiez la durée en secondes avant que le test ne dépasse le délai d'attente.
   * **En-têtes de demande** : Définissez les en-têtes à ajouter à votre demande HTTP. Vous pouvez également remplacer les en-têtes par défaut (par exemple, l'en-tête `user-agent`).
   * **Cookies** : Définissez les cookies à ajouter à votre demande HTTP. Définissez plusieurs cookies en utilisant le format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Authentification" %}}

   * **Certificat client** : Authentifiez-vous via mTLS en téléchargeant votre certificat client (`.crt`) et la clé privée associée (`.key`) au format `PEM`. Vous pouvez utiliser la bibliothèque `openssl` pour convertir vos certificats. Par exemple, convertissez un certificat `PKCS12` en clés privées et certificats au format `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * **Authentification HTTP Basic** : Ajoutez des identifiants d'authentification HTTP Basic.
   * **Authentification Digest** : Ajoutez des identifiants d'authentification Digest.
   * **NTLM** : Ajoutez des identifiants d'authentification NTLM. Prise en charge de NTLMv2 et NTLMv1.
   * **Signature AWS v4** : Entrez votre ID de clé d'accès et votre clé d'accès secrète. Datadog génère la signature pour votre demande. Cette option utilise l'implémentation de base de SigV4. Des signatures spécifiques telles qu'Amazon S3 ne sont pas prises en charge par défaut.
     Pour les demandes de transfert "Single Chunk" vers les buckets Amazon S3, ajoutez `x-amz-content-sha256` contenant le corps de la demande encodé en sha256 en tant qu'en-tête (pour un corps vide : `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * **OAuth 2.0** : Choisissez entre l'octroi de l'identifiant client ou d'un mot de passe de propriétaire de ressource et entrez une URL de jeton d'accès. Selon votre sélection, entrez un identifiant client et un secret, ou un nom d'utilisateur et un mot de passe. Dans le menu déroulant, sélectionnez une option pour soit envoyer le jeton API en tant qu'en-tête d'authentification de base, soit envoyer les identifiants client dans le corps. En option, vous pouvez fournir des informations supplémentaires telles que l'audience, la ressource et le périmètre (ainsi que l'identifiant client et le secret, si vous avez sélectionné **Mot de passe de propriétaire de ressource**).

   {{% /tab %}}

   {{% tab "Paramètres de requête" %}}

   * **Encoder les paramètres** : Ajoutez le nom et la valeur des paramètres de requête qui nécessitent un encodage.

   {{% /tab %}}

   {{% tab "Corps de la demande" %}}

   * **Type de corps** : Sélectionnez le type de corps de la demande (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL` ou `None`) que vous souhaitez ajouter à votre demande HTTP.
   * **Corps de la demande** : Ajoutez le contenu de votre corps de demande HTTP.
       * Le corps de la demande est limité à une taille maximale de 50 kilooctets pour `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`.
       * Le corps de la demande est limité à un fichier de 3 mégaoctets pour `application/octet-stream`.
       * Le corps de la demande est limité à trois fichiers de 3 mégaoctets chacun pour `multipart/form-data`.
   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **URL du proxy** : Spécifiez l'URL du proxy par lequel la demande HTTP doit passer (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **En-tête du proxy** : Ajoutez des en-têtes à inclure dans la demande HTTP au proxy.

   {{% /tab %}}

   {{% tab "Confidentialité" %}}

   * **Ne pas enregistrer le corps de la réponse** : Sélectionnez cette option pour empêcher le corps de la réponse d'être enregistré à l'exécution et pour tronquer le message d'erreur des assertions JavaScript échouées. Cela aide à garantir qu'aucune donnée sensible n'est affichée dans vos résultats de test, mais cela peut rendre le dépannage des échecs plus difficile. Pour des recommandations complètes en matière de sécurité, voir [Sécurité des données de surveillance synthétique][1].


[1]: /fr/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

Définissez des variables pour vos tests d'API HTTP avec JavaScript :

{{< img src="synthetics/api_tests/http_javascript.png" alt="Définissez un test d'API HTTP avec JavaScript." style="width:90%;" >}}

<div class="alert alert-info">Les capacités JavaScript ne sont pas prises en charge pour les tests API dans les emplacements privés Windows.</div>

   {{% /tab %}}

   {{< /tabs >}}

### Définissez des assertions {#define-assertions}

Les assertions définissent quel est le résultat de test attendu. Après avoir cliqué sur **Tester l'URL**, des assertions de base sur `response time`, `status code` et `header` `content-type` sont ajoutées en fonction de la réponse obtenue. Vous devez définir au moins une assertion pour que votre test soit surveillé.

<div class="alert alert-info">Les sections d'assertions d'en-tête, de corps et de JavaScript ne servent qu'à définir des assertions. Elles ne peuvent pas être utilisées pour effectuer des requêtes HTTP supplémentaires.</div>

{{< tabs >}}
{{% tab "Assertions de réponse" %}}

| Type          | Opérateur                                                                                               | Type de valeur                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| corps          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5] | _Chaîne_ <br> _[Regex][6]_ |
| en-tête        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _Chaîne_ <br> _[Regex][6]_                                      |
| temps de réponse | `is less than`                                                                                         | _Entier (ms)_                                                  |
| code d'état   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _Entier_ <br> _[Regex][6]_                                                     |

Les tests HTTP peuvent décompresser les corps avec les en-têtes suivants `content-encoding` : `br`, `deflate`, `gzip` et `identity`.

Vous pouvez créer jusqu'à 20 assertions par test API en cliquant sur **Nouvelle assertion** ou en cliquant directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_http.png" alt="Définissez des assertions pour que le test HTTP réussisse ou échoue sur" style="width:90%;" >}}

Pour appliquer une logique `OR` dans une assertion, utilisez le comparateur `matches regex` pour définir une regex comportant plusieurs valeurs attendues, par exemple `(200|302)`. Par exemple, vous pouvez vouloir que votre test HTTP réussisse lorsque le serveur doit répondre avec un code d'état `200` ou `302`. L'assertion `status code` réussit si le code d'état est 200 ou 302. Vous pouvez également ajouter une logique `OR` sur une assertion `body` ou `header` avec le comparateur `matches regex`.

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le worker Synthetic.

Le corps de la réponse n'est renvoyé que si vous avez ajouté des assertions sur son contenu et que ces assertions ont échoué. Si un test contient une assertion sur le corps de la réponse et réussit, la charge utile du corps est supprimée et seul un extrait des 50 premiers caractères du corps de la réponse est affiché.

Si un test contient une assertion sur le corps de la réponse et que la limite de temps est atteinte, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}}
{{% tab "JavaScript" %}}

Utilisez des assertions JavaScript lorsque les assertions de réponse standard ne répondent pas à vos besoins de validation. La surveillance synthétique utilise la [bibliothèque d'assertions Chai][20], qui fournit `dd.expect()`, `dd.should` et `dd.assert()` pour des styles d'assertion flexibles.

Lors de la manipulation des réponses JSON, utilisez `JSON.parse(dd.response.body)` pour analyser le corps de la réponse avant d'accéder à ses propriétés. Ceci est requis pour toutes les méthodes d'assertion (`dd.assert()`, `dd.expect()` et `dd.should`) lors de la validation des données JSON.

{{< img src="synthetics/api_tests/JS_assertion.png" alt="Assertion JavaScript pour le test d'API HTTP" style="width:90%;" >}}

<div class="alert alert-info">
  <ul>
    <li>Les capacités JavaScript ne sont pas prises en charge pour les tests d'API dans des emplacements privés Windows.</li>
    <li>Si le message d'erreur d'une assertion JavaScript échouée peut inclure des données sensibles, sous <strong>Options avancées</strong> > <strong>Confidentialité</strong>, activez <strong>Ne pas enregistrer le corps de la réponse</strong>. Cela tronque le message d'erreur d'assertion.</li>
  </ul>
</div>

#### Utilisation de dd.assert() {#using-ddassert}

Utilisez `dd.assert()` pour la syntaxe d'assertion traditionnelle :

Par exemple, pour affirmer qu'un champ `status.code` est l'une des valeurs autorisées :

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

Le test **réussit** parce que `status.code` est `200`, ce qui est inclus dans le tableau des valeurs autorisées.

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
- Vérifie que la valeur correspond au motif regex (l'un des : `major`, `critical`, `minor` ou `none`)

Avec le regex `/^(major|critical|minor|none)$/`, le test **réussit** parce que `status.indicator` est `"none"`, ce qui correspond au motif.

Avec le regex `/^(major|critical|minor)$/`, le test **échoue** parce que `"none"` n'est pas inclus dans les valeurs autorisées.

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

Le test **réussit** parce que `status` existe et que `status.indicator` est `"none"`.

Pour plus d'informations sur `should()`, consultez la [documentation de Chai should()][23].

[20]: https://www.chaijs.com/api/
[21]: https://www.chaijs.com/api/assert/#method_include
[22]: https://www.chaijs.com/guide/styles/#expect
[23]: https://www.chaijs.com/guide/styles/#should

{{% /tab %}}
{{< /tabs >}}

### Sélectionnez les emplacements {#select-locations}

Sélectionnez les **Emplacements** à partir desquels exécuter votre test HTTP. Les tests HTTP peuvent être exécutés à partir d'emplacements gérés et [privés][1] selon votre préférence pour exécuter le test de l'extérieur ou de l'intérieur de votre réseau.

{{% managed-locations %}}

### Spécifiez la fréquence des tests {#specify-test-frequency}

Les tests HTTP peuvent être exécutés :

* **Selon un calendrier** pour garantir que vos points de terminaison les plus importants sont toujours accessibles à vos utilisateurs. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test HTTP.
* [**Dans vos pipelines CI/CD**][2] pour commencer à livrer sans craindre que du code défectueux n'impacte l'expérience de vos clients.
* **À la demande** pour exécuter vos tests quand cela a le plus de sens pour votre équipe.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

## Un clic {#one-click}

La création de tests API suggère des endpoints du [Catalog][17] et des tests API existants pour préremplir votre formulaire de test avec des options pertinentes.
Utilisez des sources de données Datadog existantes telles que les traces APM, la découverte des endpoints du Catalog et les Synthetic tests similaires créés par des utilisateurs.

Commencez à taper dans le champ **URL** du test API pour obtenir des suggestions d'endpoints ou de Synthetic tests similaires dans Synthetic Monitoring :

   {{< img src="synthetics/api_tests/api-one-click.png" alt="Test API HTTP montrant une recherche GET pour un test API existant" style="width:90%;" >}}

Ensuite, sélectionnez une suggestion pour préremplir votre configuration de test (options de requête et en-têtes, authentification et variables) :

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="Sélectionner" style="width:90%;" >}}

{{% synthetics-variables %}}

### Utilisez des variables {#use-variables}

Vous pouvez utiliser les [variables globales définies sur la page **Settings**][11] dans l'URL, les options avancées et les assertions de vos tests HTTP.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité :

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="Utilisation de variables dans un test HTTP" video="true" width="100%" >}}

## Échec du test {#test-failure}

Un test est considéré comme `FAILED` s'il ne satisfait pas une ou plusieurs assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut échouer sans tester les assertions contre l'endpoint.

Pour une liste complète des codes d'erreur HTTP et SSL, consultez [API Testing Errors][12].

## Permissions {#permissions}

Par défaut, seuls les utilisateurs ayant les [Datadog Admin et Datadog Standard roles][13] peuvent créer, modifier et supprimer des Synthetic HTTP tests. Pour obtenir un accès de création, d'édition et de suppression aux Synthetic HTTP tests, mettez à niveau votre utilisateur vers l'un de ces deux [default roles][13].

Si vous utilisez la [fonctionnalité de rôle personnalisé][14], ajoutez votre utilisateur à tout rôle personnalisé qui inclut les permissions `synthetics_read` et `synthetics_write`.

### Restreindre l'accès {#restrict-access}

{{% synthetics_grace_permissions %}}

## Lectures complémentaires {#further-reading}

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