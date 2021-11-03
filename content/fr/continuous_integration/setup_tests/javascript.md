---
title: Tests JavaScript
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: Documentation
    text: Explorer les résultats de test et la performance
  - link: /continuous_integration/troubleshooting/
    tag: Documentation
    text: Dépannage des éléments de configuration
---
## Compatibilité

Frameworks de test pris en charge :
* Jest >= 24.8.0
  * Seuls les environnements de test `jsdom` (dans le package `jest-environment-jsdom`) et `node` (dans le package `jest-environment-node`) peuvent être utilisés. Les environnements personnalisés, comme `@jest-runner/electron/environment` dans `jest-electron-runner`, ne sont pas pris en charge.
  * Seuls les [`testRunners`][3] [`jest-circus`][1] et [`jest-jasmine2`][2] sont pris en charge.
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 : [prise en charge partielle](#limites-connues).
* Cucumber-js >= 7.0.0
* Cypress >= 6.7.0
  * Avec au minimum `dd-trace>=1.4.0`.

## Prérequis

[Installez l'Agent Datadog pour recueillir des données de test][4].

## Installer le traceur JavaScript

Pour installer le [traceur JavaScript][5], exécutez ce qui suit :

{{< code-block lang="bash" >}}
yarn add --dev dd-trace
{{< /code-block >}}

Pour en savoir plus, consultez la section relative à l'[installation du traceur JavaScript][6].

## Instrumenter vos tests

{{< tabs >}}
{{% tab "Jest" %}}

1. Configurez un [`testEnvironment`][1] personnalisé dans votre `jest.config.js` ou à l'emplacement où vous configurez `jest` :

```javascript
module.exports = {
  // ...
  // Le chemin peut être modifié. Il fait référence au fichier ci-dessous.
  testEnvironment: '<rootDir>/testEnvironment.js',
  // ...
}
```

2. Dans `testEnvironment.js` :

```javascript
require('dd-trace').init({
  // Active uniquement l'instrumentation de tests sur l'environnement de CI
  enabled: process.env.DD_ENV === 'ci',
  // Nom du service ou de la bibliothèque concerné(e) par les tests
  service: 'my-javascript-app',
  // Pour garantir l'envoi des spans de test
  flushInterval: 300000
})

// L'option jest-environment-jsdom est également acceptée
module.exports = require('jest-environment-node')
```

<div class="alert alert-warning"><strong>Remarque</strong> : à compter de la version 27 de Jest, <code>jest-environment-node</code>, <code>jest-environment-jsdom</code>, <code>jest-jasmine2</code>, et <code>jest-circus</code> sont fournis avec <code>jest</code>. Ils n'apparaissent donc normalement pas dans votre <code>package.json</code>. Si vous avez extrait une ou plusieurs de ces bibliothèques dans votre <code>package.json</code>, vérifiez que les versions installées correspondent à celles de <code>jest</code>.</div>

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

```bash
DD_ENV=ci npm test
```


[1]: https://jestjs.io/docs/en/configuration#testenvironment-string
{{% /tab %}}

{{% tab "Mocha" %}}

Créez un fichier dans votre projet (par exemple, `init-tracer.js`) avec le contenu suivant :

```javascript
require('dd-trace').init({
  // Active uniquement l'instrumentation de tests sur l'environnement de CI
  enabled: process.env.DD_ENV === 'ci',

  // Nom du service ou de la bibliothèque concerné(e) par les tests
  service: 'my-ui-app'
})
```

Ajoutez `--require init-tracer` à la commande d'exécution pour vos tests `mocha`. Par exemple, dans votre `package.json` :

```json
"scripts": {
  "test": "mocha --require init-tracer"
},
```

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

```bash
DD_ENV=ci npm test
```

{{% /tab %}}
{{% tab "Cucumber" %}}

Ajoutez `--require-module dd-trace/init` à l'emplacement où vous exécutez normalement vos tests `cucumber-js`. Par exemple, dans votre `package.json` :

{{< code-block lang="json" filename="package.json" >}}
"scripts": {
  "test": "DD_SERVICE=my-ui-app cucumber-js --require-module=dd-trace/init"
},
{{< /code-block >}}

Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

{{< code-block lang="bash" >}}
DD_ENV=ci npm test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cypress" %}}

1. Définissez [`pluginsFile`][1] sur `"dd-trace/cypress/plugin"`. Par exemple, avec [`cypress.json`][2] :
{{< code-block lang="json" filename="cypress.json" >}}
{
  "pluginsFile": "dd-trace/cypress/plugin"
}
{{< /code-block >}}

Si vous avez déjà défini un `pluginsFile`, vous pouvez tout de même initialiser l'instrumentation avec :
{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // votre ancien code se trouve avant ce commentaire
  require('dd-trace/cypress/plugin')(on, config)
}
{{< /code-block >}}

2. Ajoutez la ligne suivante à [`supportFile`][3] :
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// votre ancien code se trouve avant ce commentaire
require('dd-trace/cypress/support')
{{< /code-block >}}


Exécutez normalement vos tests, en spécifiant l'environnement concerné (par exemple, `local` pour des tests exécutés sur la machine d'un développeur, ou `ci` pour des tests exécutés sur un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Exemple :

{{< code-block lang="bash" >}}
DD_ENV=ci npm test
{{< /code-block >}}



[1]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[2]: https://docs.cypress.io/guides/references/configuration#cypress-json
[3]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
{{% /tab %}}
{{< /tabs >}}

## Paramètres de configuration

La liste suivante répertorie les principaux paramètres de configuration pouvant être utilisés avec le traceur. Vous pouvez les transmettre avec la fonction `init()` ou sous la forme de variables d'environnement :

`service`
: Nom du service ou de la bibliothèque concerné(e) par les tests.<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Valeur par défaut** : (nom du framework de test)<br/>
**Exemple** : `my-ui`

`env`
: Nom de l'environnement dans lequel sont exécutés les tests.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Valeur par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

`url`
: URL de l'Agent Datadog pour la collecte de traces, au format `http://hostname:port`.<br/>
**Variable d'environnement** : `DD_TRACE_AGENT_URL`<br/>
**Valeur par défaut** : `http://localhost:8126`

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][7].

### Recueillir les métadonnées Git

Datadog tire profit des données Git pour vous présenter les résultats de vos tests et les regrouper par référentiel, branche et commit. Les métadonnées Git sont automatiquement recueillies par l'instrumentation de test, à partir des variables d'environnement du fournisseur de CI et du dossier local `.git` dans le chemin du projet, le cas échéant.

Si vous exécutez des tests pour des fournisseurs de CI non pris en charge, ou sans dossier `.git`, vous pouvez configurer manuellement les données Git à l'aide de variables d'environnement. Ces dernières sont prioritaires et remplacent les informations détectées automatiquement. Configurez les variables d'environnement suivantes pour obtenir des données Git :

`DD_GIT_REPOSITORY_URL`
: URL du référentiel dans lequel le code est stocké. Les URL HTTP et SSH sont prises en charge.<br/>
**Exemple** : `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branche Git concernée par les tests. Ne renseignez pas cette variable si vous fournissez à la place des informations sur les tags.<br/>
**Exemple** : `develop`

`DD_GIT_TAG`
: Tag Git concerné par les tests (le cas échéant). Ne renseignez pas cette variable si vous fournissez à la place des informations sur la branche.<br/>
**Exemple** : `1.0.1`

`DD_GIT_COMMIT_SHA`
: Hash entier du commit.<br/>
**Exemple** : `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Message du commit.<br/>
**Exemple** : `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Nom de l'auteur du commit.<br/>
**Exemple** : `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: E-mail de l'auteur du commit.<br/>
**Exemple** : `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Date de l'auteur du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Nom du responsable du commit.<br/>
**Exemple** : `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: E-mail du responsable du commit.<br/>
**Exemple** : `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Date du responsable du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`


## Limites connues

### Modules ES
[Mocha >=9.0.0][8] adopte une approche axée sur ESM pour charger les fichiers de test. Ainsi, si vous utilisez des modules ES (par exemple, si vous avez défini des fichiers de test avec l'extension `.mjs`), _l'instrumentation est limitée_. Les tests sont détectés, mais vous n'avez aucune visibilité sur ces derniers. Pour en savoir plus les modules ES, consultez la [documentation NodeJS][9] (en anglais).

### Tests Browser
Le traceur JavaScript ne prend par en charge les navigateurs. Si vous exécutez des tests Browser avec `mocha` ou `jest`, vous n'avez donc aucune visibilité sur les tests.

## Meilleures pratiques

Suivez les recommandations suivantes pour tirer pleinement profit du framework de test et de la solution CI Visibility.

### Paramétrage des tests

Utilisez tant que possible les outils des frameworks de test afin de paramétrer vos tests. Par exemple, pour `jest` :

Évitez ce qui suit :
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

Et privilégiez plutôt [`test.each`][10] :
{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

Pour `mocha`, utilisez [`mocha-each`][11] :
{{< code-block lang="javascript" >}}
const forEach = require('mocha-each');
forEach([
  [1,2,3],
  [3,4,7]
])
.it('adds %i and %i then returns %i', (a,b,expected) => {
  expect(a+b).to.equal(expected)
});
{{< /code-block >}}

Avec cette approche, le framework de test et la solution CI Visibility peuvent différencier vos tests.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/facebook/jest/tree/master/packages/jest-circus
[2]: https://github.com/facebook/jest/tree/master/packages/jest-jasmine2
[3]: https://jestjs.io/docs/configuration#testrunner-string
[4]: /fr/continuous_integration/setup_tests/agent/
[5]: https://github.com/DataDog/dd-trace-js
[6]: /fr/tracing/setup_overview/setup/nodejs
[7]: /fr/tracing/setup_overview/setup/nodejs/?tab=containers#configuration
[8]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[9]: https://nodejs.org/api/packages.html#packages_determining_module_system
[10]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[11]: https://github.com/ryym/mocha-each