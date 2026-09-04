---
aliases:
- /es/continuous_integration/setup_tests/javascript
- /es/continuous_integration/tests/javascript
- /es/continuous_integration/tests/setup/javascript
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentación
  text: Reenvío de variables de entorno para pruebas en Containers
- link: /continuous_integration/tests
  tag: Documentación
  text: Explorar resultados de pruebas y rendimiento
- link: /tests/test_impact_analysis/javascript
  tag: Documentación
  text: Acelere sus trabajos de prueba con Test Impact Analysis
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Pruebas de JavaScript y TypeScript
type: multi-code-lang
---
## Compatibilidad {#compatibility}

{{< tabs >}}
{{% tab "dd-trace v6" %}}

| Test Framework | Versión | Notas |
|---|---|---|
| Jest | >= 28.0.0 | Solo `jsdom` (en el paquete `jest-environment-jsdom`) y `node` (en el paquete `jest-environment-node`) son compatibles como entornos de prueba. Los entornos personalizados como `@jest-runner/electron/environment` en `jest-electron-runner` no son compatibles.<br><br>Solo [`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) es compatible como [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string).<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) es compatible a partir de `dd-trace>=6.1.0`. |
| Mocha | >= 8.0.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 12.0.0 |
| Playwright | >= 1.38.0 |
| Vitest | >= 1.6.0 | [`test.concurrent`](https://vitest.dev/api/#test-concurrent) es compatible a partir de `dd-trace>=6.1.0`. |

`dd-trace` v6 requiere Node.js 22 o posterior.

{{% /tab %}}
{{% tab "dd-trace v5" %}}

| Test Framework | Versión | Notas |
|---|---|---|
| Jest | >= 24.8.0 | Solo `jsdom` (en el paquete `jest-environment-jsdom`) y `node` (en el paquete `jest-environment-node`) son compatibles como entornos de prueba. Los entornos personalizados como `@jest-runner/electron/environment` en `jest-electron-runner` no son compatibles.<br><br>Solo [`jest-circus`](https://github.com/facebook/jest/tree/main/packages/jest-circus) es compatible como [`testRunner`](https://jestjs.io/docs/configuration#testrunner-string).<br><br>[`test.concurrent`](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) es compatible a partir de `dd-trace>=5.112.0`. |
| Mocha | >= 5.2.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |
| Vitest | >= 1.6.0 |  es compatible a partir de `dd-trace>=5.18.0`. [`test.concurrent`](https://vitest.dev/api/#test-concurrent) es compatible a partir de `dd-trace>=5.112.0`. |

{{% /tab %}}
{{< /tabs >}}

La instrumentación funciona en tiempo de ejecución, por lo que cualquier transpilador como TypeScript, Webpack o Babel es compatible de forma inmediata.

## Configuración del método de reporte {#configuring-reporting-method}

Para reportar los resultados de las pruebas a Datadog, necesita configurar la biblioteca de JavaScript de Datadog:

{{< tabs >}}
{{% tab "Proveedor de CI con soporte para instrumentación automática" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-danger">
  <strong>Nota</strong>: La instrumentación automática no es compatible con las pruebas de Cypress. Para instrumentar las pruebas de Cypress, siga los pasos de instrumentación manual descritos a continuación.
</div>

{{% /tab %}}

{{% tab "Otro proveedor de CI en la nube" %}}
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "Proveedor de CI local" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Instalación del rastreador de JavaScript {#installing-the-javascript-tracer}

Para instalar el [JavaScript Tracer][3], ejecute:

```bash
yarn add --dev dd-trace
```

Para obtener más información, consulte la [JavaScript Tracer installation documentation][4].

## Instrumente sus pruebas {#instrument-your-tests}

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
Establezca la variable de entorno `NODE_OPTIONS` en `-r dd-trace/ci/init`. Ejecute sus pruebas como lo haría normalmente, especificando opcionalmente un nombre para su sesión de prueba con `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=unit-tests yarn test
```

**Nota**: Si establece un valor para `NODE_OPTIONS`, asegúrese de que no sobrescriba `-r dd-trace/ci/init`. Esto se puede hacer utilizando la cláusula `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests}

Puede agregar etiquetas personalizadas a sus pruebas utilizando el tramo activo actual:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Agregar etiquetas][1] de la documentación de instrumentación personalizada de Node.js.


### Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests}

Al igual que con las etiquetas, puede agregar medidas personalizadas a sus pruebas utilizando el tramo activo actual:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

Para obtener más información sobre medidas personalizadas, consulte la [Guía para agregar medidas personalizadas][2].

### Módulos ECMAScript (ESM) de Mocha {#mocha-ecmascript-modules-esm}
[Mocha >=9.0.0][3] utiliza un enfoque basado principalmente en ESM para cargar archivos de prueba. Establezca `NODE_OPTIONS` en `-r dd-trace/ci/init --import dd-trace/register.js` para obtener visibilidad completa de sus pruebas. Consulte [`dd-trace-js` soporte para ESM][4] para obtener más información.


[1]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[4]: https://github.com/datadog/dd-trace-js?tab=readme-ov-file#ecmascript-modules-esm-support
{{% /tab %}}

{{% tab "Playwright" %}}
Establezca la variable de entorno `NODE_OPTIONS` en `-r dd-trace/ci/init`. Ejecute sus pruebas como lo haría normalmente, especificando opcionalmente un nombre para su sesión de prueba con `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
```

**Nota**: Si establece un valor para `NODE_OPTIONS`, asegúrese de que no sobrescriba `-r dd-trace/ci/init`. Esto se puede hacer utilizando la cláusula `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests-1}

Puede agregar etiquetas personalizadas a sus pruebas utilizando el tramo activo actual:

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

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Agregar etiquetas][1] de la documentación de instrumentación personalizada de Node.js.

### Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests-1}

También puede agregar medidas personalizadas a sus pruebas utilizando el tramo activo actual:

```javascript
test('user profile', async ({ page }) => {
  const testSpan = require('dd-trace').scope().active()
  testSpan.setTag('memory_allocations', 16)
  // ...
})
```

Para obtener más información sobre medidas personalizadas, consulte la [Guía para agregar medidas personalizadas][2].

### Integración de Playwright - RUM {#playwright-rum-integration}

Si la aplicación del navegador que se está probando está instrumentada mediante [Browser Monitoring][3], los resultados de las pruebas de Playwright y sus sesiones de navegador RUM y reproducciones de sesión generadas se vinculan automáticamente. Para obtener más información, consulte la [guía de instrumentación de sus pruebas de navegador con RUM][4].

### Cargar capturas de pantalla de fallas de prueba {#upload-test-failure-screenshots}

Cuando está habilitado, Test Optimization carga las capturas de pantalla que Playwright captura cuando una prueba falla. Vea las capturas de pantalla en la pestaña {{< ui >}}Media{{< /ui >}} del panel lateral de detalles de prueba de Test Optimization. Úselas para inspeccionar el estado del navegador en el momento de la falla.

{{< img src="continuous_integration/tests/setup/playwright-failure-screenshot-media-tab.png" alt="Una captura de pantalla de falla de Playwright mostrada en la pestaña Media del panel lateral de detalles de prueba de Test Optimization." style="width:100%;" >}}

Utilice [`dd-trace` v5.116.0 o posterior][5] en la línea de lanzamiento v5, o [`dd-trace` v6.5.0 o posterior][6] en la línea de lanzamiento v6.

Para habilitar la carga de capturas de pantalla, establezca la variable de entorno `DD_TEST_FAILURE_SCREENSHOTS_ENABLED` en `1`. En su configuración de Playwright, establezca [`screenshot`][7] bajo `use` en uno de los siguientes valores:

- `'on'`: Capturar captura de pantalla después de cada prueba.
- `'only-on-failure'`: Capturar captura de pantalla después de cada falla de prueba.
- `'on-first-failure'`: Capturar captura de pantalla después de la primera falla de cada prueba.

**Nota**: Si utiliza `'on'`, Test Optimization solo carga capturas de pantalla de las pruebas fallidas.

[1]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: /es/real_user_monitoring/application_monitoring/browser/setup/
[4]: /es/continuous_integration/guides/rum_integration/
[5]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.116.0
[6]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.5.0
[7]: https://playwright.dev/docs/api/class-testoptions#test-options-screenshot
{{% /tab %}}

{{% tab "Cucumber" %}}
Establezca la variable de entorno `NODE_OPTIONS` en `-r dd-trace/ci/init`. Ejecute sus pruebas como lo haría normalmente, especificando opcionalmente un nombre para su sesión de prueba con `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=integration-tests yarn test:integration
```

**Nota**: Si establece un valor para `NODE_OPTIONS`, asegúrese de que no sobrescriba `-r dd-trace/ci/init`. Esto se puede hacer utilizando la cláusula `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests-2}

Puede agregar etiquetas personalizadas a su prueba obteniendo el tramo activo actual:

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Agregar etiquetas][1] de la documentación de instrumentación personalizada de Node.js.


### Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests-2}

También puede agregar medidas personalizadas a su prueba obteniendo el tramo activo actual:

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

Para obtener más información sobre medidas personalizadas, consulte la [Guía para agregar medidas personalizadas][2].

[1]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress versión 10 o posterior {#cypress-version-10-or-later}

Utilice la documentación de la API de Cypress para [aprender a usar complementos][1] para `cypress>=10`.

En su archivo `cypress.config.js`, configure lo siguiente:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/e2e.js'
  }
})
{{< /code-block >}}

Agregue la siguiente línea al **nivel superior** de su `supportFile`:

{{< code-block lang="javascript" filename="cypress/support/e2e.js" >}}
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Also supported:
// import 'dd-trace/ci/cypress/support'
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

Si está utilizando otros complementos de Cypress, su archivo `cypress.config.js` debe contener lo siguiente:

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

#### Evento `after:run` de Cypress {#cypress-afterrun-event}
Datadog requiere el evento de Cypress [`after:run`][2] para funcionar, y Cypress no permite múltiples controladores para ese evento. Si ya definió controladores para `after:run`, agregue el controlador de Datadog manualmente importando `'dd-trace/ci/cypress/after-run'`:

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

#### Evento `after:spec` de Cypress {#cypress-afterspec-event}
Datadog requiere el evento de Cypress [`after:spec`][3] para funcionar, y Cypress no permite múltiples controladores para ese evento. Si ya definió controladores para `after:spec`, agregue el controlador de Datadog manualmente importando `'dd-trace/ci/cypress/after-spec'`:

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

Ejecute sus pruebas como lo haría normalmente, especificando opcionalmente un nombre para su sesión de prueba con `DD_TEST_SESSION_NAME`:

{{< code-block lang="shell" >}}
DD_TEST_SESSION_NAME=ui-tests yarn test:ui
{{< /code-block >}}


### Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests-3}

Para agregar información adicional a sus pruebas, como el equipo propietario, use `cy.task('dd:addTags', { yourTags: 'here' })` en sus pruebas o hooks.

Por ejemplo:

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

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Adding Tags][4] de la documentación de instrumentación personalizada de Node.js.

### Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests-3}

Para agregar medidas personalizadas a sus pruebas, como asignaciones de memoria, use `cy.task('dd:addTags', { yourNumericalTags: 1 })` en sus pruebas o hooks.

Por ejemplo:

```javascript
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'memory_allocations': 16
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

Para obtener más información sobre las medidas personalizadas, consulte la [Guía para agregar medidas personalizadas][5].

### Integración de Cypress - RUM {#cypress-rum-integration}

Si la aplicación de navegador que se está probando está instrumentada mediante [Browser Monitoring][6], los resultados de la prueba de Cypress y sus sesiones de navegador RUM y reproducciones de sesión se vinculan automáticamente. Para obtener más información, consulte la [Guía de instrumentación de pruebas de navegador con RUM][7].

### Cargar capturas de pantalla de fallas de prueba {#upload-test-failure-screenshots-1}

Cuando está habilitado, Test Optimization carga las capturas de pantalla que Cypress toma cuando falla una prueba. Aparecen en la pestaña {{< ui >}}Media{{< /ui >}} del panel lateral de detalles de Test Optimization. Úselas para inspeccionar el estado del navegador en el momento de la falla.

{{< img src="continuous_integration/tests/setup/cypress-failure-screenshot-media-tab.png" alt="Una captura de pantalla de falla de Cypress que se muestra en la pestaña Multimedia del panel lateral de detalles de Test Optimization." style="width:100%;" >}}

Utilice [`dd-trace` v5.112.0 o posterior][8] en la línea de lanzamiento v5, o [`dd-trace` v6.1.0 o posterior][9] en la línea de lanzamiento v6.

Para habilitar la carga de capturas de pantalla, establezca la variable de entorno `DD_TEST_FAILURE_SCREENSHOTS_ENABLED` en `1`. En su configuración de Cypress, asegúrese de que [`screenshotOnRunFailure`][10] esté establecido en `true` (el valor predeterminado).

[1]: https://docs.cypress.io/guides/tooling/plugins-guide#Using-a-plugin
[2]: https://docs.cypress.io/api/plugins/after-run-api
[3]: https://docs.cypress.io/api/plugins/after-spec-api
[4]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[5]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
[6]: /es/real_user_monitoring/application_monitoring/browser/setup/
[7]: /es/continuous_integration/guides/rum_integration/
[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.112.0
[9]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.1.0
[10]: https://docs.cypress.io/app/references/configuration#Screenshots
{{% /tab %}}

{{% tab "Vitest" %}}
<div class="alert alert-danger">
  <strong>Nota</strong>: <a href="https://github.com/vitest-dev/vitest?tab=readme-ov-file#features">Vitest es principalmente ESM</a>, por lo que su configuración es diferente a la de otros marcos de prueba.
</div>

Utilice una versión de Node.js compatible con su versión principal de `dd-trace` para la instrumentación de Vitest:
- `dd-trace` v5 requiere Node.js 18.19+ o Node.js 20.6+.
- `dd-trace` v6 requiere Node.js 22 o posterior.

Establezca la variable de entorno `NODE_OPTIONS` en `--import dd-trace/register.js -r dd-trace/ci/init`. Ejecute sus pruebas como lo haría normalmente, especificando opcionalmente un nombre para su sesión de prueba con `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=smoke-tests yarn test:smoke
```

**Nota**: Si establece un valor para `NODE_OPTIONS`, asegúrese de que no sobrescriba `--import dd-trace/register.js -r dd-trace/ci/init`. Esto se puede hacer utilizando la cláusula `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" vitest run"
  }
}
{{< /code-block >}}

### Agregar etiquetas o medidas personalizadas a las pruebas {#adding-custom-tags-or-measures-to-tests}

Puede agregar etiquetas personalizadas a sus pruebas utilizando el tramo activo actual:

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('team_owner', 'my_team')

  expect(1 + 2).toBe(3)
})
```

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Agregar etiquetas][1] de la documentación de instrumentación personalizada de Node.js.

También puede agregar medidas personalizadas a sus pruebas utilizando el tramo activo actual:

```javascript
import tracer from 'dd-trace'
import { expect, test } from 'vitest'

test('sum function can sum', () => {
  const testSpan = tracer.scope().active()
  testSpan.setTag('memory_allocations', 16)

  expect(1 + 2).toBe(3)
})
```

Para obtener más información sobre medidas personalizadas, consulte la [Guía para agregar medidas personalizadas][2].

[1]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{< /tabs >}}

### Cómo solucionar errores de \"Cannot find module 'dd-trace/ci/init'\" {#how-to-fix-cannot-find-module-dd-traceciinit-errors}

Al usar `dd-trace`, es posible que encuentre el siguiente mensaje de error:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

Esto podría deberse a un uso incorrecto de `NODE_OPTIONS`.

Por ejemplo, si su acción de GitHub se ve así:

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

**Nota:** Esto no funciona porque `NODE_OPTIONS` son interpretados por cada proceso de nodo, incluido `npm install`. Si intenta importar `dd-trace/ci/init` antes de que esté instalado, este paso fallará.

Su acción de GitHub debería verse así en su lugar:

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

Siga estas mejores prácticas:

* Asegúrese de que la variable de entorno `NODE_OPTIONS` solo esté configurada para el proceso que ejecuta las pruebas.
* Específicamente, evite definir `NODE_OPTIONS` en la configuración de variables de entorno globales en su canalización o definición de trabajo.


#### Uso de Yarn 2 o posterior {#using-yarn-2-or-later}

Si está usando `yarn>=2` y un archivo `.pnp.cjs`, es posible que también obtenga el mismo error:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

Puede solucionarlo configurando `NODE_OPTIONS` de la siguiente manera:

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## Reporting Code Coverage {#reporting-code-coverage}

Cuando las pruebas se instrumentan con [Istanbul][5], el Datadog Tracer (v3.20.0 o posterior) lo informa bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

Puede ver la evolución de la cobertura de pruebas en la pestaña **Coverage** de una sesión de prueba.

Para obtener más información, consulte [Code Coverage][6].

## Configuración de ajustes {#configuration-settings}

La siguiente es una lista de los ajustes de configuración más importantes que se pueden usar con el SDK.

`test_session.name`
: Úselo para identificar un grupo de pruebas, como `integration-tests`, `unit-tests` o `smoke-tests`.<br/>
**Variable de entorno**: `DD_TEST_SESSION_NAME`<br/>
**Predeterminado**: Para `dd-trace` v6, la invocación del framework, como `jest`, `mocha`, `playwright test` o `cucumber-js`. Para `dd-trace` v5, una combinación del nombre del trabajo de CI y el comando de prueba.<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

`service`
: Nombre del servicio o biblioteca bajo prueba.<br/>
**Variable de entorno**: `DD_SERVICE`<br/>
**Predeterminado**: (nombre del framework de prueba)<br/>
**Ejemplo**: `my-ui`

`env`
: Nombre del entorno donde se ejecutan las pruebas.<br/>
**Variable de entorno**: `DD_ENV`<br/>
**Predeterminado**: `none`<br/>
**Ejemplos**: `local`, `ci`

`url`
: URL del Datadog Agent para la recopilación de trazas en el formato `http://hostname:port`.<br/>
**Variable de entorno**: `DD_TRACE_AGENT_URL`<br/>
**Predeterminado**: `http://localhost:8126`

Para obtener más información sobre las etiquetas reservadas `service` y `env`, consulte [Unified Service Tagging][7]. También se pueden usar todas las demás opciones de [Datadog Tracer configuration][8].

## Recopilación de metadatos de Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## API de prueba manual {#manual-testing-api}

<div class="alert alert-danger">
  <strong>Nota</strong>: La API de prueba manual está disponible a partir de las <code>dd-trace</code> versiones <code>5.23.0</code> y <code>4.47.0</code>.
</div>

Si usa Jest, Mocha, Cypress, Playwright, Cucumber o Vitest, **no use la API de prueba manual**, ya que Test Optimization los instrumenta automáticamente y envía los resultados de las pruebas a Datadog. La API de prueba manual es **incompatible** con los marcos de pruebas ya compatibles.

Utilice la API de prueba manual solo si usa un marco de pruebas no compatible o si tiene un mecanismo de pruebas diferente.

La API de prueba manual aprovecha el módulo `node:diagnostics_channel` de Node.js y se basa en canales en los que puede publicar:

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

### Canal de inicio de prueba {#test-start-channel}

Obtenga este canal mediante su ID `dd-trace:ci:manual:test:start` para publicar que una prueba está comenzando. Un buen lugar para hacer esto es un hook `beforeEach` o similar.

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

La carga útil que se publicará tiene los atributos `testName` y `testSuite`, ambos cadenas de texto, que identifican la prueba que está a punto de comenzar.

### Canal de finalización de prueba {#test-finish-channel}

Obtenga este canal mediante su ID `dd-trace:ci:manual:test:finish` para publicar que una prueba está terminando. Un buen lugar para hacer esto es un hook `afterEach` o similar.

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

La carga útil que se publicará tiene los atributos `status` y `error`:

* `status` es una cadena de texto que toma uno de tres valores:
  * `'pass'` cuando una prueba pasa.
  * `'fail'` cuando una prueba falla.
  * `'skip'` cuando una prueba ha sido omitida.

* `error` es un objeto `Error` que contiene la razón por la cual una prueba falló.

### Agregar canal de etiquetas {#add-tags-channel}

Obtenga este canal por su ID `dd-trace:ci:manual:test:addTags` para publicar que una prueba necesita etiquetas personalizadas. Esto se puede hacer dentro de la prueba:

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

La carga útil que se publicará es un diccionario `<string, string|number>` de etiquetas o medidas que se agregan a la prueba.


### Ejecute las pruebas {#run-the-tests}

Cuando los canales de inicio y fin de la prueba estén en su código, ejecute su marco de pruebas como lo hace normalmente, incluyendo las siguientes variables de entorno:

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=custom-tests yarn run-my-test-framework
```



## Limitaciones conocidas {#known-limitations}

### Pruebas de navegador {#browser-tests}
Las pruebas de navegador ejecutadas con `mocha`, `jest`, `cucumber`, `cypress`, `playwright` y `vitest` son instrumentadas por `dd-trace-js`, pero la visibilidad dentro de la sesión del navegador en sí no se proporciona de forma predeterminada (por ejemplo, llamadas de red, acciones del usuario, cargas de página y más).

Si desea visibilidad dentro del proceso del navegador, considere usar [RUM & Session Replay][9]. Al usar Cypress o Playwright, los resultados de las pruebas y sus sesiones de navegador RUM y Session Replay generadas se vinculan automáticamente. Para obtener más información, consulte la [guía de instrumentación de sus pruebas de navegador con RUM][10].

### Modo interactivo de Cypress {#cypress-interactive-mode}

El modo interactivo de Cypress (al cual puede acceder ejecutando `cypress open`) no es compatible con Test Optimization porque algunos eventos de Cypress, como [`before:run`][11], no se activan. Si desea intentarlo de todos modos, pase `experimentalInteractiveRunEvents: true` al [archivo de configuración de Cypress][12].

### Los reintentos requieren aislamiento de pruebas de Cypress {#retries-require-cypress-test-isolation}

El [aislamiento de pruebas][13] de Cypress debe estar habilitado (la configuración predeterminada) para que
para que funcionen las funciones de Test Optimization basadas en reintentos. Cuando `testIsolation` se establece en
`false` en su configuración de Cypress, `dd-trace` deshabilita todos los reintentos de pruebas
—[Detección temprana de inestabilidad][22], [Reintentos automáticos de prueba][23] y
[intento de corrección][24]—debido a que estas funciones vuelven a ejecutar cada prueba en su lugar, lo cual requiere aislamiento.

Cuando el aislamiento está deshabilitado, el rastreador registra la advertencia `Test isolation is
disabled, retries will not be enabled`, y ninguna ejecución de prueba se etiqueta con
`@test.test_management.is_attempt_to_fix`. Debido a que el rastreador lee el valor global de
`testIsolation`, las anulaciones de `describe` por conjunto de pruebas no vuelven a habilitar los reintentos.

### Jest's `--forceExit` {#jests-forceexit}
La opción [--forceExit][15] de Jest puede causar pérdida de datos. Datadog intenta enviar datos inmediatamente después de que finalizan sus pruebas, pero cerrar el proceso abruptamente puede causar que algunas solicitudes fallen. Use `--forceExit` con precaución.

### Mocha's `--exit` {#mochas-exit}
La opción [--exit][16] de Mocha puede causar pérdida de datos. Datadog intenta enviar datos inmediatamente después de que finalizan sus pruebas, pero cerrar el proceso abruptamente puede causar que algunas solicitudes fallen. Use `--exit` con precaución.

### Vitest's browser mode {#vitests-browser-mode}
Vitest's [browser mode][17] no es compatible.

### Sobrecarga de duración de la prueba de Vitest {#vitests-test-duration-overhead}

De forma predeterminada, la opción [`isolate`][21] de Vitest es `true`, por lo que cada archivo de prueba se ejecuta en su propia bifurcación o hilo. Vitest prioriza ESM y depende de [import-in-the-middle][20] para la instrumentación, lo que conlleva un costo de configuración cada vez que se inicia una suite. Con el aislamiento, ese costo de configuración se repite para cada archivo. El efecto es mayor cuando tiene muchas suites pequeñas y rápidas, porque el tiempo de configuración puede dominar el tiempo total de ejecución.

Para reducir la sobrecarga, establezca `isolate: false` en su archivo de configuración de Vitest, o pase `--no-isolate` al comando de prueba.

Para mantener el aislamiento de Vitest habilitado con una menor sobrecarga de inicio de trabajadores, establezca `DD_EXPERIMENTAL_TEST_OPT_VITEST_NO_WORKER_INIT=true`. Esta opción está disponible en `dd-trace` v5 (desde `5.111.0`) y v6 (desde `6.0.0`). Se aplica a ejecuciones de grupos de trabajadores aislados de Vitest con Vitest `3.2.6` y versiones posteriores, y recurre a la instrumentación de trabajador normal para configuraciones no compatibles.

Debido a que este modo no inicializa `dd-trace` en los trabajadores de Vitest, las siguientes funciones no son compatibles:

- Etiquetas de prueba personalizadas
- Rangos personalizados
- Correlación de registros desde el código de prueba
- Repetición de pruebas fallidas

## Mejores prácticas {#best-practices}

Siga estas prácticas para aprovechar al máximo el marco de pruebas y Test Optimization.

### Pruebas parametrizadas {#parameterized-tests}

Siempre que sea posible, aproveche las herramientas que los marcos de pruebas proporcionan para las pruebas parametrizadas. Por ejemplo, para `jest`:

Evite esto:
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

Y utilice [`test.each`][18] en su lugar:

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

Para `mocha`, use [`mocha-each`][19]:

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

Cuando utiliza este enfoque, tanto el marco de pruebas como Test Optimization pueden distinguir sus pruebas.

### Nombre de la sesión de prueba `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Use `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de prueba y el grupo de pruebas relacionado. Ejemplos de valores para esta etiqueta serían:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor predeterminado es:

- Para `dd-trace` v6, la invocación del marco, como `jest`, `mocha`, `playwright test` o `cucumber-js`
- Para `dd-trace` v5, una combinación del nombre del trabajo de CI y el comando utilizado para ejecutar las pruebas (por ejemplo, `my-ci-job yarn test`)

El nombre de la sesión de prueba debe ser único dentro de un repositorio para ayudarle a distinguir diferentes grupos de pruebas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: /es/tracing/trace_collection/dd_libraries/nodejs
[4]: https://github.com/DataDog/dd-trace-js#version-release-lines-and-maintenance
[5]: https://istanbul.js.org/
[6]: /es/tests/code_coverage/?tab=javascripttypescript
[7]: /es/getting_started/tagging/unified_service_tagging
[8]: /es/tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[9]: /es/real_user_monitoring/application_monitoring/browser/
[10]: /es/continuous_integration/guides/rum_integration/
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
[22]: /es/tests/flaky_tests/early_flake_detection/
[23]: /es/tests/flaky_tests/auto_test_retries/
[24]: /es/tests/flaky_management/#confirm-fixes-for-flaky-tests