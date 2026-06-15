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
  text: Exploración de los resultados de tests y del rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Test Impact Analysis para JavaScript y TypeScript
type: lenguaje de código múltiple
---

## Información general

Test Impact Analysis para JavaScript omite _conjuntos de tests_ (archivos de test) enteros en lugar de tests individuales.


## Compatibilidad

Test Impact Analysis sólo es compatible con las siguientes versiones y marcos de test:

* `jest>=24.8.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Sólo se admite `jest-circus/runner` como `testRunner`.
  * Sólo se admiten `jsdom` y `node` como entornos de test.
* `mocha>=5.2.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Ejecuta mocha con [`nyc`][1] para activar la cobertura de código.
* `cucumber-js>=7.0.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Ejecuta cucumber-js con [`nyc`][1] para activar la cobertura de código.
* `cypress>=6.7.0`
  * Desde `dd-trace>=4.17.0` o `dd-trace>=3.38.0`.
  * Instrumenta tu aplicación web con [cobertura de código][2].

## Configuración

### Test Optimization (optimización de tests)

Antes de configurar Test Impact Analysis, configura [Test Optimization (optimización de tests) para JavaScript y TypeScript][3]. Si vas a informar de los datos a través del Agent, utiliza la versión 6.40 y versiones posteriores o 7.40 y versiones posteriores.

{{% ci-itr-activation-instructions %}}

## Ejecutar tests con Test Impact Analysis activado

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

Una vez finalizada la configuración, ejecuta los tests como lo haces normalmente:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

Una vez finalizada la configuración, ejecuta los tests como lo haces normalmente:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress

Para que Test Impact Analysis para Cypress funcione, debes instrumentar tu aplicación web con cobertura de código. Para más información sobre cómo habilitar la cobertura de código, consulta la [documentación de Cypress][2].

Para comprobar que has habilitado con éxito la cobertura de código, navega a tu aplicación web con Cypress y comprueba la variable global `window.__coverage__`. Esto es lo que `dd-trace` utiliza para recopilar la cobertura de código para Test Impact Analysis.

## Duración poco constante de los tests

En algunos marcos, como `jest`, existen mecanismos de caché que hacen que los tests sean más rápidos después de que otros tests se hayan ejecutado (ver la documentación [jest cache][4]). Si Test Impact Analysis omite todos los archivos de test excepto algunos, estos conjuntos podrían ejecutarse más lentamente de lo habitual. Esto se debe a que se ejecutan con una caché de almacenamiento en frío. Independientemente de esto, el tiempo total de ejecución de tu comando de test debería reducirse.

## Desactivación de la omisión de test específicos

Puedes anular el comportamiento de Test Impact Analysis y evitar que se omitan tests específicos. Estos tests se denominan tests no omitibles.

### ¿Por qué no se pueden omitir los tests?

Test Impact Analysis utiliza datos de cobertura del código para determinar si deben omitirse tests o no. En algunos casos, estos datos pueden no ser suficientes para tomar esta determinación.

Algunos ejemplos son:

* Tests que leen datos de archivos de texto
* Tests que interactúan con APIs ajenas al código que se está probando (como las API REST remotas).

Designar los tests como no omitibles garantiza que Test Impact Analysis los ejecute independientemente de los datos de cobertura.

### Marcar tests como no omitibles

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress" %}}
Puedes utilizar el siguiente docblock en la parte superior de tu archivo de test para marcar un conjunto como no omitible. Esto evita que cualquiera de los tests definidos en el archivo de test sea omitido por Test Impact Analysis. Esto es similar a [`testEnvironmentOptions`][1] de jest.

```javascript
/**
 * @datadog {"unskippable": true}
 */

describe('context', () => {
  it('can sum', () => {
    expect(1 + 2).to.equal(3)
  })
})
```

[1]: https://jestjs.io/docs/configuration#testenvironmentoptions-object
{{% /tab %}}
{{% tab "Cucumber" %}}
Puedes utilizar la [etiqueta][1] `@datadog:unskippable` en tu archivo de características para marcarlo como no omitible. Esto evita que cualquiera de los escenarios definidos en el archivo de características sea omitido por Test Impact Analysis.

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

### Ejemplos de tests que no se pueden omitir

Esta sección muestra algunos ejemplos de tests que deben marcarse como no omitibles.

#### Tests que dependen de accesorios
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

#### Tests que se comunican con servicios externos
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


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /es/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache