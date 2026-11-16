---
aliases:
- /fr/continuous_integration/intelligent_test_runner/javascript/
- /fr/continuous_integration/intelligent_test_runner/setup/javascript/
- /fr/intelligent_test_runner/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Test Impact Analysis pour JavaScript et TypeScript
type: multi-code-lang
---
## Présentation {#overview}

Test Impact Analysis pour JavaScript ignore des _suites de tests_ entières (fichiers de test) plutôt que des tests individuels.


## Compatibilité {#compatibility}

Test Impact Analysis n'est pris en charge que dans les versions et frameworks de test suivants :

* `jest>=24.8.0`
  * À partir de `dd-trace>=4.17.0` ou `dd-trace>=3.38.0`.
  * Seul `jest-circus/runner` est pris en charge en tant que `testRunner`.
  * Seuls `jsdom` et `node` sont pris en charge en tant qu'environnements de test.
* `mocha>=5.2.0`
  * À partir de `dd-trace>=4.17.0` ou `dd-trace>=3.38.0`.
  * Exécutez mocha avec [`nyc`][1] pour activer la couverture de code.
* `cucumber-js>=7.0.0`
  * À partir de `dd-trace>=4.17.0` ou `dd-trace>=3.38.0`.
  * Exécutez cucumber-js avec [`nyc`][1] pour activer la couverture de code.
* `cypress>=6.7.0`
  * À partir de `dd-trace>=4.17.0` ou `dd-trace>=3.38.0`.
  * Instrumentez votre application web pour la [couverture de code][2].
* `vitest>=1.6.0`
  * À partir de `dd-trace>=6.21.0` ou `dd-trace>=5.132.0`.

## Configuration {#setup}

### Test Optimization {#test-optimization}

Avant de configurer Test Impact Analysis, configurez [Test Optimization for JavaScript and TypeScript][3]. Si vous rapportez des données via l'Agent, utilisez la v6.40 ou une version ultérieure, ou la v7.40 ou une version ultérieure.

{{% ci-itr-activation-instructions %}}

## Exécutez les tests avec Test Impact Analysis activé {#run-tests-with-test-impact-analysis-enabled}

{{< tabs >}}

{{% tab "Fournisseur CI sur site (Datadog Agent)" %}}

Une fois la configuration terminée, exécutez vos tests comme vous le faites habituellement :

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

Pour Vitest, incluez le chargeur ESM et utilisez `vitest run` :

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn vitest run
{{< /code-block >}}

{{% /tab %}}

{{% tab "Fournisseur CI cloud (Agentless)" %}}

Une fois la configuration terminée, exécutez vos tests comme vous le faites habituellement :

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

Pour Vitest, incluez le chargeur ESM et utilisez `vitest run` :

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn vitest run
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress {#cypress}

Pour que Test Impact Analysis fonctionne avec Cypress, vous devez instrumenter votre application web pour la couverture de code. Pour plus d'informations sur l'activation de la couverture de code, consultez la [documentation Cypress][2].

Pour vérifier que vous avez correctement activé la couverture de code, accédez à votre application web avec Cypress et vérifiez la variable globale `window.__coverage__`. C'est ce que `dd-trace` utilise pour collecter les données de couverture de code nécessaires à Test Impact Analysis.

### Vitest {#vitest}

`dd-trace` collecte automatiquement la couverture de code par suite requise pour Test Impact Analysis. Aucun package de couverture supplémentaire ou indicateur `--coverage` n'est requis.

Test Impact Analysis n'est pas pris en charge en browser mode ou en watch mode de Vitest, ni lors des exécutions limitées à la vérification des types. Test Impact Analysis n'est pas non plus pris en charge lorsque le mode expérimental activé par `DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true` est utilisé.

## Durées de test incohérentes {#inconsistent-test-durations}

Dans certains frameworks, tels que `jest`, il existe des mécanismes de cache qui accélèrent les tests après l'exécution d'autres tests (voir la documentation [jest cache][4]). Si Test Impact Analysis ignore tous les fichiers de test sauf quelques-uns, ces suites peuvent s'exécuter plus lentement que d'habitude, car elles utilisent un cache plus froid. Malgré cela, le temps d'exécution total de votre commande de test devrait tout de même être réduit.

## Empêcher l'omission de tests spécifiques {#disabling-skipping-for-specific-tests}

Vous pouvez modifier le comportement de Test Impact Analysis pour empêcher l'omission de tests spécifiques. Ces tests sont appelés tests à ne jamais ignorer.

### Pourquoi rendre certains tests impossibles à ignorer ? {#why-make-tests-unskippable}

Test Impact Analysis utilise les données de couverture de code pour déterminer si les tests doivent être ignorés ou non. Dans certains cas, ces données peuvent ne pas suffire pour en décider.

Voici quelques exemples de workflows disponibles :

* Tests qui lisent des données à partir de fichiers texte
* Tests qui interagissent avec des API en dehors du code testé (telles que des API REST distantes)

Désigner des tests comme des tests à ne jamais ignorer permet à Test Impact Analysis de les exécuter quelles que soient les données de couverture.

### Marquer des tests comme des tests à ne jamais ignorer {#marking-tests-as-unskippable}

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress/Vitest" %}}
Vous pouvez utiliser le bloc de documentation suivant pour marquer un fichier de test entier comme un fichier à ne jamais ignorer. Vous ne pouvez pas marquer des tests individuels comme des tests à ne jamais ignorer. Placez le bloc de documentation en haut du fichier, avant tout code ; seuls d'autres commentaires peuvent apparaître avant lui. Cela empêche Test Impact Analysis d'ignorer les tests définis dans le fichier de test. Ceci est similaire à [`testEnvironmentOptions`][1] de Jest.

```javascript
// Other comments can appear above the docblock.

/**
 * @datadog {"unskippable": true}
 */

describe('context', () => {
  it('can sum', () => {
    expect(1 + 2).to.equal(3)
  })
})
```

L'exemple suivant n'est pas valide, car le bloc de documentation apparaît après le code et tente de marquer un seul test comme un test à ne jamais ignorer :

```javascript
it('can sum', () => {
  expect(1 + 2).to.equal(3)
})

// THIS IS INVALID: The docblock cannot mark an individual test as unskippable.
/**
 * @datadog {"unskippable": true}
 */
it('can subtract', () => {
  expect(3 - 2).to.equal(1)
})
```

[1]: https://jestjs.io/docs/configuration#testenvironmentoptions-object
{{% /tab %}}
{{% tab "Cucumber" %}}
Vous pouvez utiliser le [tag][1] `@datadog:unskippable` dans votre fichier de fonctionnalité pour indiquer que celui-ci ne doit jamais être ignoré. Cela empêche Test Impact Analysis d'ignorer les scénarios définis dans le fichier de fonctionnalité.

```
@datadog:unskippable
Feature: Greetings
  Scenario: Say greetings
    When the greeter says greetings
    Then I should have heard "greetings"
```
[1]: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags
{{% /tab %}}
{{< /tabs >}}

### Exemples de tests à ne jamais ignorer {#examples-of-tests-that-should-be-unskippable}

Cette section présente quelques exemples de tests qui devraient être marqués comme des tests à ne jamais ignorer.

#### Tests qui dépendent de fixtures {#tests-that-depend-on-fixtures}

```javascript
/**
 * We have a `payload.json` fixture file in `./fixtures/payload`
 * that is processed by `processPayload` and put into a snapshot.
 * Changes in `payload.json` do not affect the test code coverage but can
 * make the test fail.
 */

/**
 * @datadog {"unskippable": true}
 */
import processPayload from './process-payload';
import payload from './fixtures/payload';

it('can process payload', () => {
    expect(processPayload(payload)).toMatchSnapshot();
});
```

#### Tests qui communiquent avec des services externes {#tests-that-communicate-with-external-services}

```javascript
/**
 * We query an external service running outside the context of
 * the test.
 * Changes in this external service do not affect the test code coverage
 * but can make the test fail.
 */

/**
 * @datadog {"unskippable": true}
 */
it('can query data', (done) => {
    fetch('https://www.external-service.com/path')
        .then((res) => res.json())
        .then((json) => {
            expect(json.data[0]).toEqual('value');
            done();
        });
});
```

```
# Same way as above we're requesting an external service

@datadog:unskippable
Feature: Process the payload
  Scenario: Server responds correctly
    When the server responds correctly
    Then I should have received "value"
```


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /fr/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache