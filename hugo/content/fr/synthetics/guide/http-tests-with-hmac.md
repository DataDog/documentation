---
description: Apprenez à créer un test HTTP avec HMAC.
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: Documentation
  text: En savoir plus sur les tests HTTP
- link: /synthetics/api_tests/http_tests#variables
  tag: Documentation
  text: En savoir plus sur les variables de test Synthetic
title: Création de tests HTTP avec l'authentification HMAC
---
## Présentation {#overview}

Synthetic Monitoring vous permet de générer des variables à partir des scripts JavaScript afin de définir des authentifications personnalisées ou d'encoder des paramètres.

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="Test HTTP avec authentification HMAC" style="width:100%;" >}}

Ce guide vous explique comment créer un test HTTP avec une signature HMAC, en utilisant des variables de script.

**Remarque**: Il n'existe pas d'authentification HMAC standard, votre propre authentification HMAC peut être légèrement différente. Par exemple, elle peut utiliser un nom d'en-tête différent.

## Configuration {#setup}

### Créez les éléments constitutifs de l'authentification HMAC à l'aide de variables locales {#create-the-building-blocks-of-hmac-authentication-using-local-variables}

Créez un [test HTTP Synthetic][3] et cliquez sur {{< ui >}}Create a Local Variable{{< /ui >}} pour ajouter les variables suivantes :

`MY_SECRET_KEY`
: La clé encodée en UTF-8 qui est utilisée pour signer le message (qui peut également être importée à partir d'une [variable globale][4]).

`BODY`
: Le corps de la requête (qui est défini dans le {{< ui >}}Request Body{{< /ui >}}) et qui est utilisé pour calculer l'authentification HMAC.

`DATETIME`
: Un paramètre pour calculer la signature HMAC. Vous pouvez le créer en tant que [variable locale][1] ou le créer et l'exporter dans la variable [ à partir du script ](#compute-the-hmac-signature-with-javascript) avec `dd.variable.set('DATETIME', new Date().toISOString())`.

### Définissez une URL de test et un corps de requête {#define-a-test-url-and-request-body}

Définissez l'URL et le type de requête pour le test HTTP. Ensuite, cliquez sur {{< ui >}}Advanced Options{{< /ui >}} > {{< ui >}}Request Body{{< /ui >}} pour ajouter le `{{ BODY }}` en tant que corps de la requête.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="Une variable locale définie comme corps de requête pour un test HTTP" style="width:80%;" >}}

### Calculez la signature HMAC avec JavaScript {#compute-the-hmac-signature-with-javascript}

Cliquez sur {{< ui >}}Variable From Script{{< /ui >}} pour générer la signature HMAC pour votre requête HTTP.

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="Une variable locale générée avec JavaScript" style="width:80%;" >}}

Ce script s'exécute avant que Datadog n'envoie la requête HTTP. Pour valider les données de réponse JSON une fois la requête terminée, utilisez les [assertions JavaScript][7] et `dd.response.body`.

* Pour importer des variables dans votre script, utilisez `dd.variable.get("<variable_name>")`.
* Pour définir une variable, utilisez `dd.variable.set("<variable_name>", <value>)` ou `dd.variable.setObfuscated("<variable_name>", <value>)`.

Vous avez également accès à des fonctions d'aide, telles que :
* La majeure partie de la [bibliothèque `std`][5], accessible avec `std.*`. Par exemple, pour appeler la fonction `encodeHex` définie dans `@std/encoding/hex.ts`, utilisez `std.encoding.hex.encodeHex`.
* Les API JavaScript standard, telles que la [Web Crypto API][6].

**Remarque** : certaines de ces API sont désactivées pour des raisons de sécurité.

Par exemple :

{{< code-block lang="JavaScript" filename="Variable from Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// Set a "date" HTTP header using DATETIME as its value in the UI
dd.variable.set("DATETIME", datetime);

const message = "Hello, World!";
// Use BODY as the request body in the UI
dd.variable.set("BODY", message);

const secretKeyUtf8 = dd.variable.get("MY_SECRET_KEY");
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretKeyUtf8),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

const rawSignature = await crypto.subtle.sign(
  { name: "HMAC" },
  key,
  new TextEncoder().encode(datetime + "." + message)
);

// Set an "authentication" HTTP header using SIGNATURE as its value in the UI
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// Alternative:
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### Ajoutez la signature HMAC à l'en-tête de la requête {#add-the-hmac-signature-to-the-request-header}

Utilisez la variable `SIGNATURE` exportée pour construire l'en-tête de la requête HTTP.

Sous l'onglet {{< ui >}}Request Options{{< /ui >}}, ajoutez un en-tête avec {{< ui >}}Name{{< /ui >}} défini sur `Authentication` et {{< ui >}}Value{{< /ui >}} défini sur `{{ SIGNATURE }}`, and another one with {{< ui >}}Name{{< /ui >}} défini sur `Date` and {{< ui >}}Value{{< /ui >}} défini sur `{{ DATETIME }}`. You can define a different header such as `Authorization`.

Configurez le reste de votre test HTTP, puis cliquez sur {{< ui >}}Create{{< /ui >}} pour enregistrer.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /fr/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://jsr.io/@std
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto
[7]: /fr/synthetics/api_tests/http_tests/#define-assertions