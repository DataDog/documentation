---
aliases:
- /es/continuous_integration/intelligent_test_runner/javascript/
- /es/continuous_integration/intelligent_test_runner/setup/javascript/
- /es/intelligent_test_runner/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Explorar resultados de pruebas y rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
title: Test Impact Analysis para JavaScript y TypeScript
type: multi-code-lang
---
## Descripción general {#overview}

Test Impact Analysis para JavaScript omite _conjuntos de pruebas_ completos (archivos de prueba) en lugar de pruebas individuales.


## Compatibilidad {#compatibility}

Test Impact Analysis solo es compatible con las siguientes versiones y marcos de trabajo de prueba:

* `jest>=24.8.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Solo `jest-circus/runner` es compatible como `testRunner`.
  * Solo `jsdom` y `node` son compatibles como entornos de prueba.
* `mocha>=5.2.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Ejecute mocha con [`nyc`][1] para habilitar la cobertura de código.
* `cucumber-js>=7.0.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Ejecute cucumber-js con [`nyc`][1] para habilitar la cobertura de código.
* `cypress>=6.7.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Instrumente su aplicación web con [cobertura de código][2].
* `vitest>=1.6.0`
  * Desde `dd-trace>=6.21.0` o `dd-trace>=5.132.0`.

## Configuración {#setup}

### Test Optimization {#test-optimization}

Antes de configurar Test Impact Analysis, configure [Test Optimization para JavaScript y TypeScript][3]. Si está reportando datos a través del Agent, utilice la v6.40 o posterior o la v7.40 o posterior.

{{% ci-itr-activation-instructions %}}

## Ejecute pruebas con Test Impact Analysis habilitado {#run-tests-with-test-impact-analysis-enabled}

{{< tabs >}}

{{% tab "Proveedor de CI local (Datadog Agent)" %}}

Después de completar la configuración, ejecute sus pruebas como lo hace normalmente:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

Para Vitest, incluya el cargador ESM y utilice `vitest run`:

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn vitest run
{{< /code-block >}}

{{% /tab %}}

{{% tab "Proveedor de CI en la nube (Agentless)" %}}

Después de completar la configuración, ejecute sus pruebas como lo hace normalmente:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

Para Vitest, incluya el cargador ESM y utilice `vitest run`:

{{< code-block lang="shell" >}}
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn vitest run
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress {#cypress}

Para que Test Impact Analysis para Cypress funcione, debe instrumentar su aplicación web con cobertura de código. Para obtener más información sobre cómo habilitar la cobertura de código, consulte la [documentación de Cypress][2].

Para verificar que ha habilitado correctamente la cobertura de código, navegue a su aplicación web con Cypress y verifique la variable global `window.__coverage__`. Esto es lo que `dd-trace` utiliza para recopilar la cobertura de código para Test Impact Analysis.

### Vitest {#vitest}

`dd-trace` recopila automáticamente la cobertura de código por conjunto de pruebas necesaria para Test Impact Analysis. No se requiere ningún paquete de cobertura adicional ni la bandera `--coverage`.

Test Impact Analysis no es compatible con el modo navegador de Vitest, el modo de observación ni las ejecuciones de solo verificación de tipos. Tampoco es compatible con el modo experimental habilitado por `DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true`.

## Duraciones de prueba inconsistentes {#inconsistent-test-durations}

En algunos marcos de trabajo, como `jest`, existen mecanismos de caché que hacen que las pruebas sean más rápidas después de que se hayan ejecutado otras pruebas (consulte la documentación de [jest cache][4]). Si Test Impact Analysis está omitiendo todos los archivos de prueba excepto unos pocos, es posible que estos conjuntos de pruebas se ejecuten más lentamente de lo habitual. Esto se debe a que se ejecutan con una caché más fría. Independientemente de esto, el tiempo total de ejecución de su comando de prueba debería reducirse de todos modos.

## Deshabilitar la omisión para pruebas específicas {#disabling-skipping-for-specific-tests}

Puede anular el comportamiento de Test Impact Analysis y evitar que se omitan pruebas específicas. Estas pruebas se conocen como pruebas que no se pueden omitir.

### ¿Por qué hacer que las pruebas no se puedan omitir? {#why-make-tests-unskippable}

Test Impact Analysis utiliza datos de cobertura de código para determinar si las pruebas deben omitirse o no. En algunos casos, estos datos pueden no ser suficientes para realizar esta determinación.

Algunos ejemplos incluyen:

* Pruebas que leen datos de archivos de texto
* Pruebas que interactúan con API fuera del código que se está probando (como API REST remotas)

Designar pruebas como pruebas que no se pueden omitir ayuda a Test Impact Analysis a ejecutarlas independientemente de los datos de cobertura.

### Marcar pruebas como pruebas que no se pueden omitir {#marking-tests-as-unskippable}

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress/Vitest" %}}
Puede utilizar el siguiente bloque de documentación para marcar un archivo de prueba completo como archivo que no se puede omitir. No puede marcar pruebas individuales como pruebas que no se pueden omitir. Coloque el bloque de documentación en la parte superior del archivo, antes de cualquier código; solo pueden aparecer otros comentarios antes de él. Esto evita que Test Impact Analysis omita cualquiera de las pruebas definidas en el archivo de prueba. Esto es similar a [`testEnvironmentOptions`][1] de Jest.

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

El siguiente ejemplo no es válido porque el bloque de documentación aparece después del código e intenta marcar solo una prueba como que no se puede omitir:

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
Puede utilizar la `@datadog:unskippable` [etiqueta][1] en su archivo de características para marcarlo como que no se puede omitir. Esto evita que cualquiera de los escenarios definidos en el archivo de características sea omitido por Test Impact Analysis.

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

### Ejemplos de pruebas que no deberían omitirse {#examples-of-tests-that-should-be-unskippable}

Esta sección muestra algunos ejemplos de pruebas que deberían marcarse como pruebas que no se pueden omitir.

#### Pruebas que dependen de fixtures {#tests-that-depend-on-fixtures}

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

#### Pruebas que se comunican con servicios externos {#tests-that-communicate-with-external-services}

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


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /es/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache