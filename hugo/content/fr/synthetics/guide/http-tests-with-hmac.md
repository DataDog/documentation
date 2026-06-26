---
null
...
---

## Présentation

La surveillance Synthetic vous permet de générer des variables à partir des scripts JavaScript afin de définir des authentifications personnalisées ou d'encoder des paramètres.

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="Test HTTP avec authentification HMAC" style="width:100%;" >}}

Ce guide vous explique comment créer un test HTTP avec une signature HMAC, en utilisant des variables de script.

**Remarque** : il n'existe pas d'authentification HMAC standard. Votre propre authentification HMAC peut être légèrement différente. Par exemple, elle peut utiliser un autre nom d'en-tête.

## Configuration

### Créer les éléments constitutifs de l'authentification HMAC à l'aide de variables locales

Créez un [test HTTP Synthetic][3] et cliquez sur **Create a Local Variable** pour ajouter les variables suivantes :

`MY_SECRET_KEY`
: La clé codée en UTF-8 utilisée pour signer le message (qui peut également être importée à partir d'une [variable globale][4]).

`BODY`
: Le corps de la demande (qui est défini dans **Request Body**) et qui est utilisé pour calculer l'authentification HMAC.

`DATETIME`
: Un paramètre permettant de calculer la signature HMAC. Vous pouvez le créer en tant que [variable locale][1] ou le créer et l'exporter dans la [variable du script] (#calculer-la-signature-hmac-avec-JavaScript) avec `dd.variable.set('DATETIME', new Date().toISOString())`.

### Définir une URL de test et un corps de requête

Définissez l'URL et le type de requête pour le test HTTP. Ensuite, cliquez sur **Advanced Options** > **Request Body** pour ajouter la variable `{{ BODY }}` en tant que corps de la requête.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="Une variable locale définie comme corps de la requête d'un test HTTP" style="width:80%;" >}}

### Calculer la signature HMAC avec JavaScript

Cliquez sur **Variable From Script** pour générer la signature HMAC de votre requête HTTP.

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="Une variable locale générée avec JavaScript" style="width:80%;" >}}

* Pour importer des variables dans votre script, utilisez `dd.variable.get("<variable_name>")`.
* Pour définir une variable, utilisez `dd.variable.set("<variable_name>", <value>)` ou `dd.variable.setObfuscated("<variable_name>", <value>)`.

Vous avez également accès à des fonctions d'aide, telles que :
* La plupart des [bibliothèques `std`][5], accessibles avec `std.*`. Par exemple, pour appeler la fonction `encodeHex` définie dans `<std>/encoding/hex.ts`, utilisez `std.encoding.hex.encodeHex`.
* API JavaScript standards, telles que l'[API Web Crypto][6].

**Remarque** : certaines de ces API sont désactivées pour des raisons de sécurité.

Exemple :

{{< code-block lang="JavaScript" filename="Variable de Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// Définissez un en-tête HTTP "date" en utilisant DATETIME comme valeur dans l'interface
dd.variable.set("DATETIME", datetime);

const message = "Hello, World!";
// Utiliser BODY comme corps de la requête dans l'interface
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

// Définissez un en-tête HTTP d'authentification en utilisant SIGNATURE comme valeur dans l'interface
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// Alternative :
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### Ajouter la signature HMAC à l'en-tête de la requête

Utilisez la variable exportée `SIGNATURE` pour créer l'en-tête de la requête HTTP.

Sous l'onglet **Request Options** onglet, ajoutez un en-tête avec `Name` défini sur `Authentication` et `Value` défini sur `{{ SIGNATURE }}`, et un autre avec `Name` défini sur `Date` et `Value` défini sur `{{ DATETIME }}`. Vous pouvez définir un autre en-tête tel que `Authorization`.

Configurez le reste de votre test HTTP et cliquez sur **Create** pour enregistrer.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /fr/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://deno.land/std@0.206.0?doc
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto