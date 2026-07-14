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
  text: Reenvío de variables de entorno para tests en contenedores
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /tests/test_impact_analysis/javascript
  tag: Documentación
  text: Acelera tus jobs (generic) de test con el análisis del efecto de los tests
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de Test Optimization (optimización de tests)
title: Tests de JavaScript y TypeScript
type: multi-code-lang
---

## Compatibilidad

Frameworks para tests compatibles:

| Framework para tests | Versión | Notas |
|---|---|---|
| Jest | >= 24.8.0 | Solo `jsdom` (en el paquete `jest-environment-jsdom` ) y `node` (en el paquete `jest-environment-node` ) se admiten como entornos de test. Los entornos personalizados como `@jest-runner/electron/environment` en `jest-electron-runner` no son compatibles.<br><br>Solo [`jest-circus`][1] se admite como [`testRunner`][2].<br><br>[`test.concurrent`](#jests-testconcurrent) no es compatible. |
| Mocha | >= 5.2.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |
| Vitest | >= 1.16.0 | Compatible a partir de `dd-trace>=4.42.0` y `dd-trace>=5.18.0`. Solo es compatible a partir de Node.js>=18.19 o de Node.js>=20.6 |

La instrumentación funciona en tiempo de ejecución, por lo que cualquier transpilador como TypeScript, Webpack o Babel es compatible desde el primer momento.

## Configuración del método de notificación

Para informar de los resultados de tests a Datadog, debes configurar la biblioteca de JavaScript de Datadog:

{{< tabs >}}
{{% tab "Proveedor de CI compatible con instrumentación automática" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-danger">
  <strong>Nota</strong>: La instrumentación automática no es compatible con los tests de Cypress. Para instrumentar tests de Cypress, sigue los steps (UI) / pasos (generic) de instrumentación manual descritos a continuación.
</div>

{{% /tab %}}

{{% tab "Otro proveedor de integración continua en la nube" %}}
<div class="alert alert-info">La modalidad agentless está disponible en las versiones de JavaScript de Datadog >= 2.5.0</div>
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "Proveedor de integración continua on-premises" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Instalación del rastreador de JavaScript

Para instalar el [JavaScript Tracer][3], ejecuta:

```bash
yarn add --dev dd-trace
```

Para obtener más información, consulta la [Documentación sobre la instalación de JavaScript Tracer][4].

## Instrumenta tus tests

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
Configura la variable de entorno `NODE_OPTIONS` en `-r dd-trace/ci/init`. Ejecuta tus tests como lo harías normalmente, opcionalmente especificando un nombre para tu sesión de tests con `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=unit-tests yarn test
```

**Nota**: Si configuras un valor para `NODE_OPTIONS`, asegúrate de que no sobrescriba `-r dd-trace/ci/init`. Esto se puede hacer mediante la cláusula `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Añadir tags (etiquetas) personalizadas a los tests

Puedes añadir tags (etiquetas) personalizadas a tus tests mediante el span (tramo) activo actual:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

Para crear filtros o campos `group by` para estas tags (etiquetas), primero debes crear facetas. Para obtener más información sobre el agregado de tags (etiquetas), consulta la sección [Añadir tags (etiquetas)][1] de la documentación sobre la instrumentación personalizada de Node.js.


### Añadir medidas personalizadas a tests

Al igual que las tags (etiquetas), puedes añadir medidas personalizadas a tus tests mediante el span activo actual:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

Para obtener más información acerca de las medidas personalizadas, consulta la [Guía para añadir medidas personalizadas][2].

### Módulos de ECMAScript de Mocha (ESM)
[Mocha >=9.0.0][3] utiliza un primer enfoque de ESM para cargar archivos de tests. Configura `NODE_OPTIONS` en `-r dd-trace/ci/init --import dd-trace/register.js` para obtener una visibilidad completa de tus tests. Consulta [Compatibilidad de`dd-trace-js` y ESM][4] para obtener más información.


[1]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[4]: https://github.com/datadog/dd-trace-js?tab=readme-ov-file#ecmascript-modules-esm-support
{{% /tab %}}

{{% tab "Playwright" %}}
Configura la variable de entorno `NODE_OPTIONS` en `-r dd-trace/ci/init`. Ejecuta tus tests como lo harías normalmente, opcionalmente especificando un nombre para tu sesión de tests con `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
```

**Nota**: Si configuras un valor para `NODE_OPTIONS`, asegúrate de que no sobrescriba `-r dd-trace/ci/init`. Esto se puede hacer mediante la cláusula `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Añadir tags (etiquetas) personalizadas a tests

Puedes añadir tags (etiquetas) personalizadas a tus tests mediante la [API de anotaciones personalizadas desde Playwright][1]:

```javascript
test('user profile', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.memory.usage]', // DD_TAGS is mandatory and case sensitive
    description: 'low',
  });
  test.info().annotations.push({
    type: 'DD_TAGS[test.task.id]',
    description: '41123',
  });
  // ...
});

test('landing page', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.cpu.usage]',
    description: 'high',
  });
  // ...
});
```

El formato de las anotaciones es el siguiente, donde `$TAG_NAME` y `$TAG_VALUE` son *cadenas* que representan el nombre y el valor de la tag (etiqueta), respectivamente:

```json
{
  "type": "DD_TAGS[$TAG_NAME]",
  "description": "$TAG_VALUE"
}
```

### Añadir medidas personalizadas a tests

Las medidas personalizadas también utilizan anotaciones personalizadas:

```javascript
test('user profile', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.memory.allocations]', // DD_TAGS is mandatory and case sensitive
    description: 16, // this is a number
  });
});
```

El formato de las anotaciones es el siguiente, donde `$TAG_NAME` es una *cadena* que representa el nombre de la tag (etiqueta) y `$TAG_VALUE` es un *número* que representa el valor de la tag (etiqueta):

```json
{
  "type": "DD_TAGS[$TAG_NAME]",
  "description": $TAG_VALUE
}
```
**Nota**:  Los valores `description` en las anotaciones se [escriben como cadenas][2]. Los números también funcionan, pero puede ser necesario desactivar el error de escritura con `// @ts-expect-error`.

<div class="alert alert-danger">
  <strong>Importante</strong>: El prefijo <code>DD_TAGS</code> es obligatorio y distingue mayúsculas de minúsculas.
</div>

### Integración de Playwright y RUM

Si la aplicación de navegador que se está comprobando se instrumenta mediante [Monitorización del navegador][3], los resultados del test de Playwright y sus sesiones de navegador y repeticiones de sesión generadas con RUM se vinculan automáticamente. Para obtener más información, consulta la [Guía de instrumentación de tests del navegador con RUM][4].

[1]: https://playwright.dev/docs/test-annotations#custom-annotations
[2]: https://playwright.dev/docs/api/class-testinfo#test-info-annotations
[3]: /es/real_user_monitoring/application_monitoring/browser/setup/
[4]: /es/continuous_integration/guides/rum_integration/
{{% /tab %}}

{{% tab "Cucumber" %}}
Configura la variable de entorno `NODE_OPTIONS` en `-r dd-trace/ci/init`. Ejecuta tus tests como lo harías normalmente, opcionalmente especificando un nombre para tu sesión de test con `DD_TEST_SESSION_NAME`:
```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=integration-tests yarn test:integration
```

**Nota**: Si estableces un valor para `NODE_OPTIONS`, asegúrate de que no sobrescriba la cláusula `-r dd-trace/ci/init`. This can be done using the `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Añadir tags (etiquetas) personalizadas a los tests

Puedes añadir etiquetas personalizadas a tus tests con el tramo activo en ese momento:

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continúa normalment
    // ...
  })
```

Para crear filtros o campos `group by` para estas etiquetas, primero debes crear facetas. Para obtener más información sobre la adición de etiquetas, consulta la sección [Adición de etiquetas][1] de la documentación de instrumentación personalizada de Node.js.


### Añadir medidas personalizadas a los tests

También puedes añadir medidas personalizadas a tu test con el tramo que esté activo en ese momento:

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

Para obtener más información sobre las medidas personalizadas, consulta la [guía para Añadir medidas personalizadas][2].

[1]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress versión 10 o posterior

Utiliza la documentación de la API de Cypress para [aprender a utilizar los complementos][1] para `cypress>=10`.

En tu archivo `cypress.config.js`, establece lo siguiente:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/e2e.js'
  }
})
{{< /code-block >}}

Añade la siguiente línea al **nivel superior** de tu `supportFile`:

{{< code-block lang="javascript" filename="cypress/support/e2e.js" >}}
// Tu código puede ir antes de esta línea
// require('./commands')
require('dd-trace/ci/cypress/support')
// También compatible:
// import 'dd-trace/ci/cypress/support'
// Tu código también puede ir después de esta línea
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

Si utilizas otros complementos de Cypress, tu archivo `cypress.config.js` debe contener lo siguiente:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // tu código anterior está antes de esta línea
      return require('dd-trace/ci/cypress/plugin')(on, config)
    }
  }
})
{{< /code-block >}}

#### Evento `after:run` de Cypress
Datadog requiere el evento [`after:run`][2] de Cypress para funcionar, y Cypress no permite múltiples manejadores para ese evento. Si ya has definido manejadores para `after:run`, añade el manejador de Datadog manualmente al importar `'dd-trace/ci/cypress/after-run'`:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // otros complementos
      on('after:run', (details) => {
        // otros manejadores 'after:run'
        // importante que se devuelva esta función
        return require('dd-trace/ci/cypress/after-run')(details)
      })
    }
  }
})
{{< /code-block >}}

#### Evento `after:spec` de Cypress
Datadog requiere el evento [`after:spec`][3] de Cypress para funcionar, y Cypress no permite múltiples manejadores para ese evento. Si ya has definido manejadores para `after:spec`, añade el manejador de Datadog manualmente al importar `'dd-trace/ci/cypress/after-spec'`:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // otros complementos
      on('after:spec', (...args) => {
        // otros manejadores 'after:spec'
        // Importante que se devuelva esta función
        // Importante que todos los argumentos se pasen
        return require('dd-trace/ci/cypress/after-spec')(...args)
      })
    }
  }
})
{{< /code-block >}}

### Cypress antes de la versión 10

Estas son las instrucciones si estás utilizando una versión anterior a `cypress@10`. Consulta la [documentación de Cypress][4] para obtener más información sobre la migración a una versión más reciente.

1. Establece [`pluginsFile`][5] en `"dd-trace/ci/cypress/plugin"`, por ejemplo, a través de [`cypress.json`][6]:
{{< code-block lang="json" filename="cypress.json" >}}
{
  "pluginsFile": "dd-trace/ci/cypress/plugin"
}
{{< /code-block >}}

Si ya has definido un `pluginsFile`, inicializa la instrumentación con:
{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // tu código anterior está antes de esta línea
  return require('dd-trace (traza)/ci/cypress/plugin')(on, config)
}
{{< /code-block >}}

2. Añade la siguiente línea al **nivel superior** de tu [`supportFile`][7]:
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// Tu código puede estar antes de esta línea
// require('./commands')
require('dd-trace/ci/cypress/support')
// Tu código también puede estar después de esta línea
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

#### Evento `after:run` de Cypress
Datadog requiere el evento [`after:run`][2] de Cypress para funcionar, y Cypress no permite múltiples manejadores para ese evento. Si ya has definido manejadores para `after:run`, añade el manejador de Datadog manualmente al importar `'dd-trace/ci/cypress/after-run'`:

{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // tu código anterior va antes de esta línea
  require('dd-trace/ci/cypress/plugin')(on, config)
  on('after:run', (details) => {
    // otros manejadores 'after:run'
    // importante que se devuelva esta llamada a la función
    return require('dd-trace/ci/cypress/after-run')(details)
  })
}
{{< /code-block >}}

#### Evento `after:spec` de Cypress
Datadog requiere el evento [`after:spec`][3] de Cypress para funcionar, y Cypress no permite múltiples manejadores para ese evento. Si ya has definido manejadores para `after:spec`, añade el manejador de Datadog manualmente al importar `'dd-trace/ci/cypress/after-spec'`:

{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // tu código anterior va antes de esta línea
  require('dd-trace/ci/cypress/plugin')(on, config)
  on('after:spec', (...args) => {
    // otros manejadores 'after:spec'
    // Importante que se devuelva esta llamada a la función
    // Importante que todos los argumentos se pasen
    return require('dd-trace/ci/cypress/after-run')(...args)
  })
}
{{< /code-block >}}


Ejecuta tus tests como lo harías normalmente, especificando opcionalmente un nombre para tu sesión de test con `DD_TEST_SESSION_NAME`:

{{< code-block lang="shell" >}}
DD_TEST_SESSION_NAME=ui-tests yarn test:ui
{{< /code-block >}}


### Añadir etiquetas (tags) personalizadas a los tests

Para añadir información adicional a tus tests, como el propietario del equipo, utiliza `cy.task('dd:addTags', { yourTags: 'here' })` en tu testo hooks.

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

Para crear filtros o campos `group by` para estas etiquetas, primero debes crear facetas. Para más información sobre cómo añadir etiquetas, consulta la sección [Añadir etiquetas][8] de la documentación de instrumentación personalizada de Node.js.

### Añadir medidas personalizadas a los tests

Para añadir información adicional a tus tests, como asignaciones de memoria, utiliza `cy.task('dd:addTags', { yourNumericalTags: 1 })` en tu test o hooks.

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

Para obtener más información sobre las medidas personalizadas, consulta la [guía para Añadir medidas personalizadas][9].

### Cypress: integración de RUM

Si la aplicación de navegador que se está probando se instrumenta con la [Monitorización de navegador][10], los resultados de los tests de Cypress y sus sesiones de navegador RUM generadas y las repeticiones de sesión se vinculan automáticamente. Para obtener más información, consulta la [guía para Instrumentar tus tests de navegador con RUM][11].


[1]: https://docs.cypress.io/guides/tooling/plugins-guide#Using-a-plugin
[2]: https://docs.cypress.io/api/plugins/after-run-api
[3]: https://docs.cypress.io/api/plugins/after-spec-api
[4]: https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-100
[5]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[6]: https://docs.cypress.io/guides/references/configuration#cypress-json
[7]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[8]: /es/tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[9]: /es/tests/guides/add_custom_measures/?tab=javascripttypescript
[10]: /es/real_user_monitoring/application_monitoring/browser/setup/
[11]: /es/continuous_integration/guides/rum_integration/
{{% /tab %}}

{{% tab "Vitest" %}}
<div class="alert alert-danger">
  <strong>Nota</strong>: <a href="https://github.com/vitest-dev/vitest?tab=readme-ov-file#features">Vitest es ESM primero</a>, por lo que tu configuración es diferente de otros frameworks de tests.
</div>

`vitest` y `dd-trace` requieren Node.js>=18.19 o Node.js>=20.6 para funcionar.

Configura la variable de entorno `NODE_OPTIONS` en `--import dd-trace/register.js -r dd-trace/ci/init`. Ejecuta tus tests como lo harías normalmente, opcionalmente especificando un nombre para tu sesión de test con `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=smoke-tests yarn test:smoke
```

**Nota**: Si estableces un valor para `NODE_OPTIONS`, asegúrate de que no sobrescriba la cláusula `--import dd-trace/register.js -r dd-trace/ci/init`. This can be done using the `${NODE_OPTIONS:-}`:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" vitest run"
  }
}
{{< /code-block >}}

### Añadir etiquetas o medidas personalizadas a los tests

No compatible.

{{% /tab %}}

{{< /tabs >}}

### Cómo solucionar los errores "No se encuentra el módulo 'dd-trace/ci/init'".

Al utilizar `dd-trace`, es posible que aparezca el siguiente mensaje de error:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

Esto puede deberse a un uso incorrecto de `NODE_OPTIONS`.

Por ejemplo, si tu acción de GitHub tiene este aspecto:
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

**Nota:** Esto no funciona porque `NODE_OPTIONS` es interpretado por cada proceso de nodo, incluido `npm install`. Si intentas importar `dd-trace/ci/init` antes de que esté instalado, este paso falla.

Tu acción de GitHub debería tener este aspecto:
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

Sigue estas prácticas recomendadas:

* Asegúrate de que la variable de entorno `NODE_OPTIONS` solo está configurada en el proceso que ejecuta los tests.
* En concreto, evita definir `NODE_OPTIONS` en la configuración de variables globales de entorno en la definición de tu proceso o trabajo.


#### Con Yarn 2 o posterior

Si utilizas `yarn>=2` y un archivo `.pnp.cjs`, también puedes obtener el mismo error:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

Puedes solucionarlo configurando `NODE_OPTIONS` de la siguiente manera:

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## Informar sobre la cobertura del código

Cuando los tests se instrumentan con [Istambul][5], el rastreador de Datadog (v3.20.0 o posterior) informa de ello en la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

Puedes ver la evolución de la cobertura de los tests en la pestaña **Coverage** (Cobertura) de una sesión de tests.

Para más información, consulta [Cobertura del código][6].

## Ajustes de configuración

A continuación, se muestra una lista de los ajustes más importantes de configuración que se pueden utilizar con el rastreador.

`test_session.name`
: Se utiliza para identificar un grupo de tests, como `integration-tests`, `unit-tests` o `smoke-tests`.<br/>
**Variable de entorno**: `DD_TEST_SESSION_NAME`<br/>
**Predeterminado**: (nombre del job (generic) de integración continua + comando de test)<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

`service`
: nombre del servicio o biblioteca en proceso de test.<br/>
**Variable de entorno **: `DD_SERVICE`<br/>
**Por defecto**: (nombre del framework de test)<br/>
**Ejemplo**: `my-ui`

`env`
: nombre del entorno donde se están ejecutando los tests.<br/>
**Variable de entorno **: `DD_ENV`<br/>
**Por defecto**: `none`<br/>
**Ejemplos**: `local`, `ci`

`url`
: URL del Datadog Agent para la recopilación de trazas con el formato `http://hostname:port`.<br/>
**Variable de entorno**: `DD_TRACE_AGENT_URL`<br/>
**Por defecto**: `http://localhost:8126`

Para más información sobre etiquetas `service` y `env` reservadas, consulta [Etiquetado de servicios unificado][7]. También se pueden utilizar todas las demás opciones de [configuración del rastreador de Datadog][8].

## Recopilación de metadatos Git

{{% ci-git-metadata %}}

## API para tests manuales

<div class="alert alert-danger">
  <strong>Nota</strong>: La API de tests manuales está disponible a partir de las versiones <code>5.23.0</code> y <code>4.47.0</code> de <code>dd-trace</code>.
</div>

Si utilizas Jest, Mocha, Cypress, Playwright, Cucumber o Vitest, **no utilices la API de tests manuales**, ya que Test Optimization (optimización de tests) los instrumenta automáticamente y envía los resultados de los tests a Datadog. La API de test manual es **incompatible** con los frameworks de tests ya admitidos.

Utiliza la API de tests manuales solo si utilizas un framework de test no compatible o tienes un mecanismo de test diferente.

La API de tests manuales aprovecha el módulo `node:diagnostics_channel` de Node.js y se basa en canales en los que se puede publicar:

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

### Canal de inicio del test

Toma este canal por su ID `dd-trace:ci:manual:test:start` para publicar que se está iniciando un test. Un buen lugar para hacer esto es un hook `beforeEach` o similar.

```typescript
const { channel } = require('node:diagnostics_channel')
const testStartCh = channel('dd-trace:ci:manual:test:start')

// ... el código para tu framework de test va aquí
  beforeEach(() => {
    const testDefinition = {
      testName: 'a-string-that-identifies-this-test',
      testSuite: 'what-suite-this-test-is-from.js'
    }
    testStartCh.publish(testDefinition)
  })
// el código para tu framework de test continúa aquí ...
```

La carga útil que se va a publicar tiene los atributos `testName` y `testSuite`, ambos cadenas, que identifican el test que está a punto de comenzar.

### Canal de finalización del test

Toma este canal por su ID `dd-trace:ci:manual:test:finish` para publicar que se está finalizando un test. Un buen lugar para hacer esto es un hook `afterEach` o similar.

```typescript
const { channel } = require('node:diagnostics_channel')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')

// ... el código para tu framework de test va aquí
  afterEach(() => {
    const testStatusPayload = {
      status: 'fail',
      error: new Error('assertion error')
    }
    testStartCh.publish(testStatusPayload)
  })
// el código para tu framework de test continúa aquí ...
```

La carga útil que se va a publicar tiene los atributos `status` y `error`:

* `status` es una cadena que toma uno de tres valores:
  * `'pass'` cuando se supera un test.
  * `'fail'` cuando falla un test.
  * `'skip'` cuando se ha omitido un test.

* `error` es un objeto `Error` que contiene la razón por la que ha fallado un test.

### Añadir etiquetas de canal

Toma este canal por su ID `dd-trace:ci:manual:test:addTags` para publicar que un test necesita etiquetas personalizadas. Esto puede hacerse dentro de la función de test:

```typescript
const { channel } = require('node:diagnostics_channel')
const testAddTagsCh = channel('dd-trace:ci:manual:test:addTags')

// ... el código para tu framework de test va aquí
  test('can sum', () => {
    testAddTagsCh.publish({ 'test.owner': 'my-team', 'number.assertions': 3 })
    const result = sum(2, 1)
    assert.equal(result, 3)
  })
// el código para tu framework de test continúa aquí ...
```

La carga útil que se publica es un diccionario `<string, string|number>` de etiquetas o medidas que se añaden al test.


### Ejecutar los tests

Cuando los canales de inicio y fin del test estén en tu código, ejecuta tu framework de test como lo haces normalmente, incluyendo las siguientes variables de entorno:

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=custom-tests yarn run-my-test-framework
```



## Limitaciones conocidas

### Tests de navegador
Los tests de navegador ejecutados con `mocha`, `jest`, `cucumber`, `cypress`, `playwright` y `vitest` son instrumentados por `dd-trace-js`, pero la visibilidad de la sesión del navegador en sí no se proporciona por defecto (por ejemplo, llamadas de red, acciones del usuario, cargas de páginas, etc.).

Si deseas tener visibilidad del proceso del navegador, considera el uso de [RUM y repetición de sesión][9]. Cuando se utiliza Cypress o Playwright, los resultados de test y sus sesiones de navegador de RUM generadas y las repeticiones de sesión se vinculan automáticamente. Para obtener más información, consulta la [Guía para Instrumentar tus tests del navegador con RUM][10].

### Modo interactivo de Cypress

El modo interactivo de Cypress (al que puedes entrar ejecutando `cypress open`) no es compatible con Test Optimization (optimización de tests) porque algunos eventos de cypress, como [`before:run`][11], no se disparan. Si deseas probarlo de todas formas, pasa `experimentalInteractiveRunEvents: true` al [archivo de configuración de cypress][12].

### `--workerThreads` de Jest
La opción [workerThreads][13] de Jest no es compatible.

### `test.concurrent` de Jest
[test.concurrent][14] de Jest no es compatible.

### `--forceExit` de Jest
La opción [--forceExit][15] de Jest puede provocar la pérdida de datos. Datadog intenta enviar datos inmediatamente después de que finalicen tus tests, pero el cierre abrupto del proceso puede hacer que fallen algunas solicitudes. Utiliza `--forceExit` con precaución.

### `--exit` de Mocha
La opción [--exit][16] de Mocha puede provocar la pérdida de datos. Datadog intenta enviar los datos inmediatamente después de que finalicen tus tests, pero el cierre abrupto del proceso puede hacer que fallen algunas solicitudes. Utiliza `--exit` con precaución.

### Modo navegador de Vitest
El [modo navegador][17] de Vitest no es compatible.

## Prácticas recomendadas

Siga estas prácticas para aprovechar al máximo el framework testing y la optimización de test (optimización de tests).

### Tests parametrizados

Siempre que sea posible, aprovecha las herramientas que ofrecen los frameworks de test para realizar tests parametrizados. Por ejemplo, para `jest`:

Evita esto:
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

Y usa [`test.each`][18] en su lugar:

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

Para `mocha`, utiliza [`mocha-each`][19]:

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

Cuando se utiliza este enfoque, tanto el framework de testing como test Optimization (optimización de tests) pueden distinguir sus tests.

### Nombre de la sesión de test `DD_TEST_SESSION_NAME`

Utiliza `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de test y del grupo de tests relacionado. Algunos ejemplos de valores para esta etiqueta serían:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor predeterminado utilizado es una combinación de:

- Nombre del job (generic) de CI
- Comando utilizado para ejecutar los tests (como `yarn test`)

El nombre de la sesión de tests debe ser único dentro de un repositorio para ayudarte a distinguir diferentes grupos de tests.

#### Cuándo utilizar `DD_TEST_SESSION_NAME`

Hay un conjunto de parámetros que Datadog comprueba para establecer la correspondencia entre las sesiones de test. El comando de test utilizado para ejecutar los tests es uno de ellos. Si el comando de test contiene una cadena que cambia en cada ejecución, como una carpeta temporal, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

- `yarn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `pnpm vitest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda utilizar `DD_TEST_SESSION_NAME` si tus comandos de test varían entre diferentes ejecuciones.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/facebook/jest/tree/main/packages/jest-circus
[2]: https://jestjs.io/docs/configuration#testrunner-string
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
[13]: https://jestjs.io/docs/configuration#workerthreads
[14]: https://jestjs.io/docs/api#testconcurrentname-fn-timeout
[15]: https://jestjs.io/docs/cli#--forceexit
[16]: https://mochajs.org/running/cli/#--exit
[17]: https://vitest.dev/guide/browser/
[18]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[19]: https://www.npmjs.com/package/mocha-each