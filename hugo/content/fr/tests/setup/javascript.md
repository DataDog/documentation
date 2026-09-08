---
aliases:
- /fr/continuous_integration/setup_tests/javascript
- /fr/continuous_integration/tests/javascript
- /fr/continuous_integration/tests/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests au sein de conteneurs
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /tests/test_impact_analysis/javascript
  tag: Documentation
  text: Accélérez vos tâches de test avec Test Impact Analysis
- link: /tests/troubleshooting/
  tag: Documentation
  text: Dépannage Test Optimization
title: Tests JavaScript et TypeScript
type: multi-code-lang
---
## Compatibilité {#compatibility}

{{< tabs >}}
{{% tab "dd-trace v6" %}}

| Framework de test | Version | Notes |
|---|---|---|
| Jest | >= 28.0.0 | Seuls `jsdom` (dans le package `jest-environment-jsdom`) et `node` (dans le package `jest-environment-node`) sont pris en charge en tant qu'environnements de test. Les environnements personnalisés comme `@jest-runner/electron/environment` dans `jest-electron-runner` ne sont pas pris en charge.<br><br>Seul [`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) est pris en charge en tant que [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string).<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) est pris en charge à partir de `dd-trace>=6.1.0`. |
| Mocha | >= 8.0.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 12.0.0 |
| Playwright | >= 1.38.0 |
| Vitest | >= 1.6.0 | [`test.concurrent`](https://vitest.dev/api/#test-concurrent) est pris en charge à partir de `dd-trace>=6.1.0`. |

`dd-trace` v6 nécessite Node.js 22 ou une version ultérieure.

{{% /tab %}}
{{% tab "dd-trace v5" %}}

| Framework de test | Version | Notes |
|---|---|---|
| Jest | >= 24.8.0 | Seuls `jsdom` (dans le package `jest-environment-jsdom`) et `node` (dans le package `jest-environment-node`) sont pris en charge en tant qu'environnements de test. Les environnements personnalisés comme `@jest-runner/electron/environment` dans `jest-electron-runner` ne sont pas pris en charge.<br><br>Seul [`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) est pris en charge en tant que [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string).<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) est pris en charge à partir de `dd-trace>=5.112.0`. |
| Mocha | >= 5.2.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |
| Vitest | >= 1.6.0 | Pris en charge à partir de `dd-trace>=5.18.0`. [`test.concurrent`](https://vitest.dev/api/#test-concurrent) est pris en charge à partir de `dd-trace>=5.112.0`. |

{{% /tab %}}
{{< /tabs >}}

L'instrumentation fonctionne à l'exécution, donc tous les transpileurs tels que TypeScript, Webpack ou Babel sont pris en charge sans configuration supplémentaire.

## Configuration de la méthode de rapport {#configuring-reporting-method}

Pour signaler les résultats des tests à Datadog, vous devez configurer la bibliothèque JavaScript Datadog :

{{< tabs >}}
{{% tab "Fournisseur CI avec prise en charge de l'auto-instrumentation" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-danger">
  <strong>Remarque</strong> : l'auto-instrumentation n'est pas prise en charge pour les tests Cypress. Pour instrumenter les tests Cypress, suivez les étapes d'instrumentation manuelle décrites ci-dessous.
</div>

{{% /tab %}}

{{% tab "Autre fournisseur CI Cloud" %}}
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "Fournisseur CI sur site" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Installation du traceur JavaScript {#installing-the-javascript-tracer}

Pour installer le [JavaScript Tracer][3], exécutez :

```bash
yarn add --dev dd-trace
```

Pour plus d'informations, consultez la [documentation d'installation du JavaScript Tracer][4].

## Instrumentez vos tests {#instrument-your-tests}

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
Définissez la variable d'environnement `NODE_OPTIONS` sur `-r dd-trace/ci/init`. Exécutez vos tests comme vous le feriez normalement, en spécifiant éventuellement un nom pour votre session de test avec `DD_TEST_SESSION_NAME` :

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=unit-tests yarn test
```

**Remarque**&nbsp;: si vous définissez une valeur pour `NODE_OPTIONS`, assurez-vous qu'elle n'écrase pas `-r dd-trace/ci/init`. Cela peut être fait en utilisant la clause `${NODE_OPTIONS:-}`&nbsp;:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests}

Vous pouvez ajouter des tags personnalisés à vos tests en utilisant la span actuellement active :

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Adding Tags][1] de la documentation sur l'instrumentation personnalisée de Node.js.


### Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests}

Tout comme pour les tags, vous pouvez ajouter des mesures personnalisées à vos tests en utilisant le span actif :

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

Pour plus d'informations sur les mesures personnalisées, consultez le [guide d'ajout de mesures personnalisées][2].

### Mocha ECMAScript modules (ESM) {#mocha-ecmascript-modules-esm}
[Mocha >=9.0.0][3] utilise une approche axée sur l'ESM pour charger les fichiers de test. Définissez `NODE_OPTIONS` sur `-r dd-trace/ci/init --import dd-trace/register.js` pour obtenir une visibilité complète sur vos tests. Consultez [`dd-trace-js` ESM support][4] pour plus d'informations.


[1]: /fr/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /fr/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[4]: https://github.com/datadog/dd-trace-js?tab=readme-ov-file#ecmascript-modules-esm-support
{{% /tab %}}

{{% tab "Playwright" %}}
Définissez la variable d'environnement `NODE_OPTIONS` sur `-r dd-trace/ci/init`. Exécutez vos tests comme vous le feriez normalement, en spécifiant éventuellement un nom pour votre session de test avec `DD_TEST_SESSION_NAME` :

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
```

**Remarque**&nbsp;: si vous définissez une valeur pour `NODE_OPTIONS`, assurez-vous qu'elle n'écrase pas `-r dd-trace/ci/init`. Cela peut être fait en utilisant la clause `${NODE_OPTIONS:-}`&nbsp;:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests-1}

Vous pouvez ajouter des tags personnalisés à vos tests en utilisant la span actuellement active :

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('team_owner', 'my_team')
  // ...
})

test('landing page', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('test.cpu.usage', 'high')
  // ...
})
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Adding Tags][1] de la documentation sur l'instrumentation personnalisée de Node.js.

### Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests-1}

Vous pouvez également ajouter des mesures personnalisées à vos tests en utilisant le span actif :

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('memory_allocations', 16)
  // ...
})
```

Pour plus d'informations sur les mesures personnalisées, consultez le [guide d'ajout de mesures personnalisées][2].

### Playwright - RUM integration {#playwright-rum-integration}

Si l'application de navigateur testée est instrumentée à l'aide de [Browser Monitoring][3], les résultats des tests Playwright et leurs RUM browser sessions et session replays générées sont automatiquement liés. Pour plus d'informations, consultez le [Instrumenting your browser tests with RUM guide][4].

### Télécharger les captures d'écran d'échec de test {#upload-test-failure-screenshots}

Lorsqu'elle est activée, Test Optimization télécharge les captures d'écran que Playwright capture lorsqu'un test échoue. Affichez les captures d'écran dans l'onglet {{< ui >}}Media{{< /ui >}} du panneau latéral des détails de test de Test Optimization. Utilisez-les pour inspecter l'état du navigateur au moment de l'échec.

{{< img src="continuous_integration/tests/setup/playwright-failure-screenshot-media-tab.png" alt="Une capture d'écran d'échec Playwright affichée dans l'onglet Média du panneau latéral des détails de test de Test Optimization." style="width:100%;" >}}

Utilisez [`dd-trace` v5.116.0 ou version ultérieure][5] sur la ligne de version v5, ou [`dd-trace` v6.5.0 ou version ultérieure][6] sur la ligne de version v6.

Pour activer les téléchargements de captures d'écran, définissez la variable d'environnement `DD_TEST_FAILURE_SCREENSHOTS_ENABLED` sur `1`. Dans votre configuration Playwright, définissez [`screenshot`][7] sous `use` sur l'une des valeurs suivantes :

- `'on'` : Capturez une capture d'écran après chaque test.
- `'only-on-failure'` : Capturez une capture d'écran après chaque échec de test.
- `'on-first-failure'` : Capturez une capture d'écran après le premier échec de chaque test.

**Remarque** : Si vous utilisez `'on'`, Test Optimization ne télécharge que les captures d'écran des tests ayant échoué.

[1]: /fr/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /fr/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[4]: /fr/continuous_integration/guides/rum_integration/
[5]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.116.0
[6]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.5.0
[7]: https://playwright.dev/docs/api/class-testoptions#test-options-screenshot
{{% /tab %}}

{{% tab "Cucumber" %}}
Définissez la variable d'environnement `NODE_OPTIONS` sur `-r dd-trace/ci/init`. Exécutez vos tests comme vous le feriez normalement, en spécifiant éventuellement un nom pour votre session de test avec `DD_TEST_SESSION_NAME` :

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=integration-tests yarn test:integration
```

**Remarque**&nbsp;: si vous définissez une valeur pour `NODE_OPTIONS`, assurez-vous qu'elle n'écrase pas `-r dd-trace/ci/init`. Cela peut être fait en utilisant la clause `${NODE_OPTIONS:-}`&nbsp;:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests-2}

Vous pouvez ajouter des tags personnalisés à votre test en récupérant la span active :

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Adding Tags][1] de la documentation sur l'instrumentation personnalisée de Node.js.


### Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests-2}

Vous pouvez également ajouter des mesures personnalisées à votre test en utilisant le span actif :

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

Pour plus d'informations sur les mesures personnalisées, consultez le [guide d'ajout de mesures personnalisées][2].

[1]: /fr/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /fr/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress version 10 ou ultérieure {#cypress-version-10-or-later}

Utilisez la documentation de l'API Cypress pour [apprendre à utiliser les plugins][1] pour `cypress>=10`.

Dans votre fichier `cypress.config.js`, définissez ce qui suit :

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/e2e.js'
  }
})
{{< /code-block >}}

Ajoutez la ligne suivante au **niveau supérieur** de votre `supportFile` :

{{< code-block lang="javascript" filename="cypress/support/e2e.js" >}}
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Also supported:
// import 'dd-trace/ci/cypress/support'
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

Si vous utilisez d'autres plugins Cypress, votre fichier `cypress.config.js` doit contenir ce qui suit :

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // your previous code is before this line
      return require('dd-trace/ci/cypress/plugin')(on, config)
    }
  }
})
{{< /code-block >}}

#### Événement Cypress `after:run` {#cypress-afterrun-event}
Datadog nécessite l'événement Cypress [`after:run`][2] pour fonctionner, et Cypress n'autorise pas plusieurs gestionnaires pour cet événement. Si vous avez déjà défini des gestionnaires pour `after:run`, ajoutez manuellement le gestionnaire Datadog en important `'dd-trace/ci/cypress/after-run'` :

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:run', (details) => {
        // other 'after:run' handlers
        // important that this function call is returned
        return require('dd-trace/ci/cypress/after-run')(details)
      })
    }
  }
})
{{< /code-block >}}

#### Événement Cypress `after:spec` {#cypress-afterspec-event}
Datadog nécessite l'événement Cypress [`after:spec`][3] pour fonctionner, et Cypress n'autorise pas plusieurs gestionnaires pour cet événement. Si vous avez déjà défini des gestionnaires pour `after:spec`, ajoutez manuellement le gestionnaire Datadog en important `'dd-trace/ci/cypress/after-spec'` :

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:spec', (...args) => {
        // other 'after:spec' handlers
        // Important that this function call is returned
        // Important that all the arguments are passed
        return require('dd-trace/ci/cypress/after-spec')(...args)
      })
    }
  }
})
{{< /code-block >}}

Exécutez vos tests comme vous le feriez normalement, en spécifiant éventuellement un nom pour votre session de test avec `DD_TEST_SESSION_NAME` :

{{< code-block lang="shell" >}}
DD_TEST_SESSION_NAME=ui-tests yarn test:ui
{{< /code-block >}}


### Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests-3}

Pour ajouter des informations supplémentaires à vos tests, telles que le propriétaire de l'équipe, utilisez `cy.task('dd:addTags', { yourTags: 'here' })` dans votre test ou vos hooks.

Exemple :

```javascript
beforeEach(() => {
  cy.task('dd:addTags', {
    'before.each': 'certain.information'
  })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'team.owner': 'ui'
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Adding Tags][4] de la documentation sur l'instrumentation personnalisée Node.js.

### Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests-3}

Pour ajouter des mesures personnalisées à vos tests, telles que les allocations de mémoire, utilisez `cy.task('dd:addTags', { yourNumericalTags: 1 })` dans votre test ou vos hooks.

Exemple :

```javascript
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'memory_allocations': 16
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

Pour plus d'informations sur les mesures personnalisées, consultez le [guide d'ajout de mesures personnalisées][5].

### Intégration Cypress - RUM {#cypress-rum-integration}

Si l'application de navigateur testée est instrumentée à l'aide de [Browser Monitoring][6], les résultats des tests Cypress ainsi que les sessions de navigateur RUM et les relectures de session générées sont automatiquement liés. Pour plus d'informations, consultez le [guide d'instrumentation de vos tests de navigateur avec RUM][7].

### Téléversez les captures d'écran d'échec de test {#upload-test-failure-screenshots-1}

Lorsqu'elle est activée, Test Optimization téléverse les captures d'écran que Cypress prend lorsqu'un test échoue. Elles apparaissent dans l'onglet {{< ui >}}Media{{< /ui >}} du panneau latéral des détails de test de Test Optimization. Utilisez-les pour inspecter l'état du navigateur au moment de l'échec.

{{< img src="continuous_integration/tests/setup/cypress-failure-screenshot-media-tab.png" alt="Une capture d'écran d'échec Cypress affichée dans l'onglet Media du panneau latéral des détails de test de Test Optimization." style="width:100%;" >}}

Utilisez [`dd-trace` v5.112.0 ou version ultérieure][8] sur la ligne de version v5, ou [`dd-trace` v6.1.0 ou version ultérieure][9] sur la ligne de version v6.

Pour activer les téléchargements de captures d'écran, définissez la variable d'environnement `DD_TEST_FAILURE_SCREENSHOTS_ENABLED` sur `1`. Dans votre configuration Cypress, assurez-vous que [`screenshotOnRunFailure`][10] est défini sur `true` (la valeur par défaut).

[1]: https://docs.cypress.io/guides/tooling/plugins-guide#Using-a-plugin
[2]: https://docs.cypress.io/api/plugins/after-run-api
[3]: https://docs.cypress.io/api/plugins/after-spec-api
[4]: /fr/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[5]: /fr/tests/guides/add_custom_measures/?tab=javascripttypescript
[6]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[7]: /fr/continuous_integration/guides/rum_integration/
[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.112.0
[9]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.1.0
[10]: https://docs.cypress.io/app/references/configuration#Screenshots
{{% /tab %}}

{{% tab "Vitest" %}}
<div class="alert alert-danger">
  <strong>Remarque</strong> : <a href="https://github.com/vitest-dev/vitest?tab=readme-ov-file#features">Vitest est prioritairement ESM</a>, sa configuration est donc différente de celle des autres frameworks de test.
</div>

Utilisez une version de Node.js prise en charge par votre version majeure de `dd-trace` pour l'instrumentation Vitest :
- `dd-trace` v5 nécessite Node.js 18.19+ ou Node.js 20.6+.
- `dd-trace` v6 nécessite Node.js 22 ou une version ultérieure.

Définissez la variable d'environnement `NODE_OPTIONS` sur `--import dd-trace/register.js -r dd-trace/ci/init`. Exécutez vos tests comme vous le feriez normalement, en spécifiant éventuellement un nom pour votre session de test avec `DD_TEST_SESSION_NAME` :

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=smoke-tests yarn test:smoke
```

**Remarque** : si vous définissez une valeur pour `NODE_OPTIONS`, assurez-vous qu'elle n'écrase pas `--import dd-trace/register.js -r dd-trace/ci/init`. Cela peut être fait en utilisant la clause `${NODE_OPTIONS:-}`&nbsp;:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" vitest run"
  }
}
{{< /code-block >}}

### Ajout de tags personnalisés ou de mesures personnalisées aux tests {#adding-custom-tags-or-measures-to-tests}

Vous pouvez ajouter des tags personnalisés à vos tests en utilisant la span actuellement active :

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('team_owner', 'my_team')

  expect(1 + 2).toBe(3)
})
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes. Pour plus d'informations sur l'ajout de tags, consultez la section [Adding Tags][1] de la documentation sur l'instrumentation personnalisée de Node.js.

Vous pouvez également ajouter des mesures personnalisées à vos tests en utilisant le span actif :

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('memory_allocations', 16)

  expect(1 + 2).toBe(3)
})
```

Pour plus d'informations sur les mesures personnalisées, consultez le [guide d'ajout de mesures personnalisées][2].

[1]: /fr/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /fr/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{< /tabs >}}

### Comment corriger les erreurs « Cannot find module 'dd-trace/ci/init' » {#how-to-fix-cannot-find-module-dd-traceciinit-errors}

Lorsque vous utilisez `dd-trace`, vous pourriez rencontrer le message d'erreur suivant :

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

Cela peut être dû à une utilisation incorrecte de `NODE_OPTIONS`.

Par exemple, si votre GitHub Action ressemble à ceci&nbsp;:

```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    # Invalid NODE_OPTIONS
    env:
      NODE_OPTIONS: -r dd-trace/ci/init
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

**Remarque&nbsp;:** Cela ne fonctionne pas car `NODE_OPTIONS` sont interprétés par chaque processus de nœud, y compris `npm install`. Si vous essayez d'importer `dd-trace/ci/init` avant qu'il ne soit installé, cette étape échoue.

Votre GitHub Action devrait plutôt ressembler à ceci&nbsp;:

```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
        env:
          NODE_OPTIONS: -r dd-trace/ci/init
```

Suivez ces bonnes pratiques&nbsp;:

* Assurez-vous que la variable d'environnement `NODE_OPTIONS` est uniquement définie sur le processus exécutant les tests.
* Évitez spécifiquement de définir `NODE_OPTIONS` dans les paramètres des variables d'environnement globales de votre pipeline ou de votre définition de job.


#### Utilisation de Yarn 2 ou version ultérieure {#using-yarn-2-or-later}

Si vous utilisez `yarn>=2` et un fichier `.pnp.cjs`, vous pourriez également obtenir la même erreur :

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

Vous pouvez le corriger en définissant `NODE_OPTIONS` sur ce qui suit&nbsp;:

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## Rapport de couverture de code {#reporting-code-coverage}

Lorsque les tests sont instrumentés avec [Istanbul][5], le traceur Datadog (v3.20.0 ou ultérieure) le signale sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Vous pouvez voir l'évolution de la couverture des tests dans l'onglet **Coverage** d'une session de test.

Pour plus d'informations, consultez [Code Coverage][6].

## Paramètres de configuration {#configuration-settings}

Voici une liste des paramètres de configuration les plus importants qui peuvent être utilisés avec le SDK.

`test_session.name`
: Utilisez-le pour identifier un groupe de tests, tels que `integration-tests`, `unit-tests` ou `smoke-tests`.<br/>
**Variable d'environnement**: `DD_TEST_SESSION_NAME`<br/>
**Par défaut**: Pour `dd-trace` v6, l'invocation du framework, telle que `jest`, `mocha`, `playwright test` ou `cucumber-js`. Pour `dd-trace` v5, une combinaison du nom du job CI et de la commande de test.<br/>
**Exemple**: `unit-tests`, `integration-tests`, `smoke-tests`

`service`
: Nom du service ou de la bibliothèque en cours de test.<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Par défaut** : (nom du framework de test)<br/>
**Exemple** : `my-ui`

`env`
: Nom de l'environnement où les tests sont exécutés.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

`url`
: URL du Datadog Agent pour la collecte des traces sous la forme `http://hostname:port`.<br/>
**Variable d'environnement** : `DD_TRACE_AGENT_URL`<br/>
**Par défaut** : `http://localhost:8126`

Pour plus d'informations sur les tags réservés `service` et `env`, consultez [Unified Service Tagging][7]. Toutes les autres options de [Datadog Tracer configuration][8] peuvent également être utilisées.

## Collecte des métadonnées Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## API de test manuel {#manual-testing-api}

<div class="alert alert-danger">
  <strong>Remarque</strong> : L'API de test manuel est disponible à partir de <code>dd-trace</code> versions <code>5.23.0</code> et <code>4.47.0</code>.
</div>

Si vous utilisez Jest, Mocha, Cypress, Playwright, Cucumber ou Vitest, **n'utilisez pas l'API de test manuel**, car Test Optimization les instrumente automatiquement et envoie les résultats des tests à Datadog. L'API de test manuel est **incompatible** avec les frameworks de test déjà pris en charge.

Utilisez l'API de test manuel uniquement si vous utilisez un framework de test non pris en charge ou si vous disposez d'un mécanisme de test différent.

L'API de test manuel exploite le module `node:diagnostics_channel` de Node.js et repose sur des canaux sur lesquels vous pouvez publier :

```javascript
const { channel } = require('node:diagnostics_channel')

const { describe, test, beforeEach, afterEach, assert } = require('my-custom-test-framework')

const testStartCh = channel('dd-trace:ci:manual:test:start')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')
const testSuite = __filename

describe('can run tests', () => {
  beforeEach((testName) => {
    testStartCh.publish({ testName, testSuite })
  })
  afterEach((status, error) => {
    testFinishCh.publish({ status, error })
  })
  test('first test will pass', () => {
    assert.equal(1, 1)
  })
})
```

### Canal de début de test {#test-start-channel}

Récupérez ce canal par son ID `dd-trace:ci:manual:test:start` pour publier qu'un test commence. Un bon endroit pour faire cela est un hook `beforeEach` ou similaire.

```typescript
const { channel } = require('node:diagnostics_channel')
const testStartCh = channel('dd-trace:ci:manual:test:start')

// ... code for your testing framework goes here
  beforeEach(() => {
    const testDefinition = {
      testName: 'a-string-that-identifies-this-test',
      testSuite: 'what-suite-this-test-is-from.js'
    }
    testStartCh.publish(testDefinition)
  })
// code for your testing framework continues here ...
```

La charge utile à publier possède les attributs `testName` et `testSuite`, tous deux des chaînes, qui identifient le test sur le point de commencer.

### Canal de fin de test {#test-finish-channel}

Récupérez ce canal par son ID `dd-trace:ci:manual:test:finish` pour publier qu'un test se termine. Un bon endroit pour faire cela est un hook `afterEach` ou similaire.

```typescript
const { channel } = require('node:diagnostics_channel')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')

// ... code for your testing framework goes here
  afterEach(() => {
    const testStatusPayload = {
      status: 'fail',
      error: new Error('assertion error')
    }
    testStartCh.publish(testStatusPayload)
  })
// code for your testing framework continues here ...
```

La charge utile à publier possède les attributs `status` et `error` :

* `status` est une chaîne qui prend l'une des trois valeurs suivantes :
  * `'pass'` lorsqu'un test réussit.
  * `'fail'` lorsqu'un test échoue.
  * `'skip'` lorsqu'un test a été ignoré.

* `error` est un objet `Error` contenant la raison pour laquelle un test a échoué.

### Canal d'ajout de tags {#add-tags-channel}

Récupérez ce canal par son ID `dd-trace:ci:manual:test:addTags` pour publier qu'un test nécessite des tags personnalisés. Cela peut être fait au sein de la fonction de test :

```typescript
const { channel } = require('node:diagnostics_channel')
const testAddTagsCh = channel('dd-trace:ci:manual:test:addTags')

// ... code for your testing framework goes here
  test('can sum', () => {
    testAddTagsCh.publish({ 'test.owner': 'my-team', 'number.assertions': 3 })
    const result = sum(2, 1)
    assert.equal(result, 3)
  })
// code for your testing framework continues here ...
```

La charge utile à publier est un dictionnaire `<string, string|number>` de tags ou de mesures qui sont ajoutés au test.


### Exécuter les tests {#run-the-tests}

Lorsque les canaux de début et de fin de test sont dans votre code, exécutez votre framework de test comme vous le faites normalement, en incluant les variables d'environnement suivantes :

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=custom-tests yarn run-my-test-framework
```



## Limitations connues {#known-limitations}

### Tests de navigateur {#browser-tests}
Les tests de navigateur exécutés avec `mocha`, `jest`, `cucumber`, `cypress`, `playwright` et `vitest` sont instrumentés par `dd-trace-js`, mais la visibilité sur la session de navigateur elle-même n'est pas fournie par défaut (par exemple, les appels réseau, les actions utilisateur, les chargements de page, et plus encore).

Si vous souhaitez une visibilité sur le processus de navigateur, envisagez d'utiliser [RUM & Session Replay][9]. Lors de l'utilisation de Cypress ou Playwright, les résultats des tests et leurs sessions de navigateur RUM générées ainsi que les relectures de session sont automatiquement liés. Pour plus d'informations, consultez le [guide d'instrumentation de vos tests de navigateur avec RUM][10].

### Mode interactif Cypress {#cypress-interactive-mode}

Le mode interactif Cypress (auquel vous pouvez accéder en exécutant `cypress open`) n'est pas pris en charge par Test Optimization car certains événements Cypress, tels que [`before:run`][11], ne sont pas déclenchés. Si vous souhaitez essayer malgré tout, transmettez `experimentalInteractiveRunEvents: true` au [fichier de configuration Cypress][12].

### Les tentatives exigent l'isolation des tests Cypress {#retries-require-cypress-test-isolation}

L'isolation des tests de Cypress [test isolation][13] doit être activée (par défaut) pour
que les fonctionnalités Test Optimization basées sur les tentatives fonctionnent. Lorsque `testIsolation` est défini sur
`false` dans votre configuration Cypress, `dd-trace` désactive toutes les tentatives
de test—[Early Flake Detection][22], [Auto Test Retries][23], et
[tentative de correction][24]—car ces fonctionnalités réexécutent chaque test sur place, ce qui nécessite l'isolation.

Lorsque l'isolation est désactivée, le traceur enregistre l'avertissement `Test isolation is
disabled, retries will not be enabled`, et aucune exécution de test n'est marquée avec
`@test.test_management.is_attempt_to_fix`. Parce que le traceur lit le global
`testIsolation` valeur, les remplacements `describe` par suite ne réactivent pas les tentatives.

### Jest `--forceExit` {#jests-forceexit}
L'option [--forceExit][15] de Jest peut entraîner une perte de données. Datadog essaie d'envoyer des données immédiatement après la fin de vos tests, mais l'arrêt brutal du processus peut entraîner l'échec de certaines requêtes. Utilisez `--forceExit` avec prudence.

### Mocha `--exit` {#mochas-exit}
L'option [--exit][16] de Mocha peut entraîner une perte de données. Datadog essaie d'envoyer des données immédiatement après la fin de vos tests, mais l'arrêt brutal du processus peut entraîner l'échec de certaines requêtes. Utilisez `--exit` avec prudence.

### Le mode navigateur de Vitest {#vitests-browser-mode}
Le [mode navigateur][17] de Vitest n'est pas pris en charge.

### La surcharge de durée de test de Vitest {#vitests-test-duration-overhead}

Par défaut, l'option [`isolate`][21] de Vitest est `true`, donc chaque fichier de test s'exécute dans son propre fork ou thread. Vitest est axé sur l'ESM et s'appuie sur [import-in-the-middle][20] pour l'instrumentation, ce qui entraîne un coût de configuration à chaque démarrage d'une suite. Avec l'isolation, ce coût de configuration est répété pour chaque fichier. L'effet est plus marqué lorsque vous disposez de nombreuses petites suites rapides, car le temps de configuration peut dominer le temps d'exécution global.

Pour réduire la surcharge, définissez `isolate: false` dans votre fichier de configuration Vitest, ou passez `--no-isolate` à la commande de test.

Pour maintenir l'isolation de Vitest activée avec une surcharge de démarrage de worker plus faible, définissez `DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true`. Cette option est disponible dans `dd-trace` v5 (à partir de `5.111.0`) et v6 (à partir de `6.0.0`). Elle s'applique aux exécutions isolées du pool de workers Vitest avec Vitest `3.2.6` et versions ultérieures, et revient à une instrumentation de worker normale pour les configurations non prises en charge.

Comme ce mode n'initialise pas `dd-trace` dans les workers Vitest, les fonctionnalités suivantes ne sont pas prises en charge :

- Tags de test personnalisés
- Spans personnalisés :
- Corrélation de logs à partir du code de test :
- Rejeu de test échoué

## Bonnes pratiques {#best-practices}

Suivez ces pratiques pour tirer pleinement parti du framework de test et de Test Optimization.

### Tests paramétrés {#parameterized-tests}

Dans la mesure du possible, tirez parti des outils fournis par les frameworks de test pour les tests paramétrés. Par exemple, pour `jest` :

Évitez ceci :
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

Et utilisez plutôt [`test.each`][18] :

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

Pour `mocha`, utilisez [`mocha-each`][19] :

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

Lorsque vous utilisez cette approche, le framework de test et Test Optimization peuvent distinguer vos tests.

### Nom de la session de test `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Utilisez `DD_TEST_SESSION_NAME` pour définir le nom de la session de test et le groupe de tests associé. Voici des exemples de valeurs pour ce tag :

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si `DD_TEST_SESSION_NAME` n'est pas spécifié, la valeur par défaut est :

- Pour `dd-trace` v6, l'appel du framework, tel que `jest`, `mocha`, `playwright test` ou `cucumber-js`
- Pour `dd-trace` v5, une combinaison du nom du job CI et de la commande utilisée pour exécuter les tests (par exemple, `my-ci-job yarn test`)

Le nom de la session de test doit être unique au sein d'un dépôt pour vous aider à distinguer différents groupes de tests.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: /fr/tracing/trace_collection/dd_libraries/nodejs
[4]: https://github.com/DataDog/dd-trace-js#version-release-lines-and-maintenance
[5]: https://istanbul.js.org/
[6]: /fr/tests/code_coverage/?tab=javascripttypescript
[7]: /fr/getting_started/tagging/unified_service_tagging
[8]: /fr/tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[9]: /fr/real_user_monitoring/application_monitoring/browser/
[10]: /fr/continuous_integration/guides/rum_integration/
[11]: https://docs.cypress.io/api/plugins/before-run-api
[12]: https://docs.cypress.io/guides/references/configuration#Configuration-File
[13]: https://docs.cypress.io/app/core-concepts/test-isolation
[15]: https://jestjs.io/docs/cli#--forceexit
[16]: https://mochajs.org/running/cli/#--exit
[17]: https://vitest.dev/guide/browser/
[18]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[19]: https://www.npmjs.com/package/mocha-each
[20]: https://github.com/nodejs/import-in-the-middle
[21]: https://vitest.dev/config/isolate
[22]: /fr/tests/flaky_tests/early_flake_detection/
[23]: /fr/tests/flaky_tests/auto_test_retries/
[24]: /fr/tests/flaky_management/#confirm-fixes-for-flaky-tests