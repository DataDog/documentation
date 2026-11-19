---
aliases:
- /es/continuous_integration/setup_tests/swift
- /es/continuous_integration/tests/swift
- /es/continuous_integration/tests/setup/swift
code_lang: swift
code_lang_weight: 50
further_reading:
- link: /tests
  tag: Documentación
  text: Explorar resultados de pruebas y rendimiento
- link: /tests/test_impact_analysis/swift
  tag: Documentación
  text: Acelere sus trabajos de prueba con Test Impact Analysis
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Pruebas de Swift
type: multi-code-lang
---
## Compatibilidad {#compatibility}

Idiomas admitidos:

| Idioma    | Versión |
| ----------- | ------- |
| Swift       | >= 6.2  |
| Objective-C | >= 2.0  |
| Xcode       | >= 26.0 |

Plataformas compatibles:

| Plataforma     | Versión  |
| ------------ | -------- |
| iOS / iPadOS | >= 15.0  |
| macOS        | >= 11.0  |
| tvOS         | >= 15.0  |
| macCatalyst  | >= 13.0  |

Marcos de prueba compatibles:

| Framework     | Versión del SDK  | Nivel de prueba                                     |
| ------------- | ------------ | ------------------------------------------------- |
| XCTest        | Todas las versiones | Soporte completo                                      |
| Swift Testing | >= 2.7.0     | Soporte completo desde 2.7.1; solo observación en 2.7.0 |

## Instalación del SDK de prueba de Swift {#installing-the-swift-testing-sdk}

Existen tres formas en las que puede instalar el framework de prueba:

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

### Usando proyecto de Xcode {#using-xcode-project}

1. Agregue el paquete `dd-sdk-swift-testing` a su proyecto. Se encuentra en [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

{{< img src="continuous_integration/swift_package.png" alt="Swift Package" >}}


2. Vincule sus objetivos de prueba con la biblioteca `DatadogSDKTesting` del paquete.

{{< img src="continuous_integration/swift_link2.png" alt="Vinculación de SPM en Swift" >}}

3. Si ejecuta pruebas de interfaz de usuario (UI Tests) y no utiliza RUM, agregue también la dependencia a sus aplicaciones que ejecutan las pruebas.

### Usando proyecto de Swift Package {#using-swift-package-project}

1. Agregue `dd-sdk-swift-testing` a su matriz de dependencias del paquete, por ejemplo:

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.5.3")
{{< /code-block >}}

2. Para agregar el framework de prueba a las dependencias de los objetivos de prueba, agregue la siguiente línea a la matriz de dependencias de los objetivos de prueba:
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "CocoaPods" %}}

1. Agregue la dependencia `DatadogSDKTesting` a los objetivos de prueba de su `Podfile`:

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Vinculación de framework" %}}

1. Descargue y descomprima `DatadogSDKTesting.zip` desde la página de [lanzamiento][1].

2. Copie y vincule sus objetivos de prueba con el XCFramework resultante.

{{< img src="continuous_integration/swift_link.png" alt="Vinculación de XCFramework en Swift" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">Este framework es útil solo para pruebas y solo debe vincularse con la aplicación al ejecutar pruebas. No distribuya el framework a sus usuarios. </div>

## Instrumentación de sus pruebas {#instrumenting-your-tests}

### Framework de Swift Testing {#swift-testing-framework}

El SDK de Datadog es compatible con el framework Swift Testing a partir de la versión 2.7.0 (solo observación) y ofrece soporte completo para todas las funciones avanzadas a partir de la versión 2.7.1.

#### Configuración de la observación de Swift Testing {#setting-up-swift-testing-observation}

Para habilitar la observación de sus pruebas de Swift Testing:

1. Importe `DatadogSDKTesting` en sus archivos fuente de prueba:

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import Testing
{{< /code-block >}}

2. Agregue el rasgo `.datadogTesting` a sus suites de prueba o funciones de prueba independientes:

{{< code-block lang="swift" >}}
@Suite(.datadogTesting)
struct MyTestSuite {
    @Test func myTest() {
        // ...
    }
}

// For standalone test functions:
@Test(.datadogTesting) func myStandaloneTest() {
    // ...
}
{{< /code-block >}}

### Configuración del SDK {#configuring-sdk}

#### Uso de un proyecto de Xcode {#using-xcode-project-1}

Para habilitar la instrumentación de pruebas, agregue las siguientes variables de entorno a su objetivo de prueba o en el archivo `Info.plist` como se [describe a continuación](#using-infoplist-for-configuration). Usted **debe** seleccionar su objetivo principal en {{< ui >}}Expand variables based on{{< /ui >}} o {{< ui >}}Target for Variable Expansion{{< /ui >}} si está utilizando planes de prueba:

{{< img src="continuous_integration/swift_env.png" alt="Entornos de Swift" >}}

<div class="alert alert-danger">Debe tener su objetivo principal en la expansión de variables de las variables de entorno; si no está seleccionado, las variables no son válidas. </div>

Para las pruebas de interfaz de usuario (UI Tests), las variables de entorno solo deben configurarse en el objetivo de prueba, ya que el framework inyecta automáticamente estos valores en la aplicación.

#### Uso de un proyecto de Swift Package {#using-swift-package-project-1}

Para habilitar la instrumentación de pruebas, debe configurar las siguientes variables de entorno para la ejecución de sus pruebas desde la línea de comandos. Alternativamente, puede configurarlas en el entorno antes de ejecutar las pruebas o puede anteponerlas al comando:

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


Configure todas estas variables en su objetivo de prueba:

`DD_TEST_RUNNER`
: Habilita o deshabilita la instrumentación de pruebas. Establezca este valor en `$(DD_TEST_RUNNER)` para que pueda habilitar y deshabilitar la instrumentación de pruebas con una variable de entorno definida fuera del proceso de prueba (por ejemplo, en la compilación de CI).<br/>
**Predeterminado**: `false`<br/>
**Recomendado**: `$(DD_TEST_RUNNER)`

`DD_API_KEY` (Obligatorio)
: La [clave de Datadog API][2] utilizada para autenticar las cargas de resultados de pruebas.<br/>
**Predeterminado**: `(empty)`

`DD_TEST_SESSION_NAME` (Opcional)
: Identifica un grupo de pruebas, como `unit-tests`, `integration-tests` o `smoke-tests`.<br/>
**Predeterminado**: El nombre del trabajo de CI y el comando de prueba, o el comando de prueba si el nombre del trabajo de CI no está disponible.<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

`DD_SERVICE` (Opcional)
: Nombre del servicio o biblioteca bajo prueba.<br/>
**Predeterminado**: El nombre del repositorio<br/>
**Ejemplo**: `my-ios-app`

`DD_ENV` (Opcional)
: Nombre del entorno donde se ejecutan las pruebas.<br/>
**Predeterminado**: `ci` cuando se detecta un proveedor de CI; de lo contrario, `none`.<br/>
**Recomendado**: `$(DD_ENV)`<br/>
**Ejemplos**: `local`, `ci`

`SRCROOT`
: La ruta a la ubicación del proyecto. Si usa Xcode, utilice `$(SRCROOT)` para el valor, ya que este lo establece automáticamente.<br/>
**Predeterminado**: `(empty)`<br/>
**Recomendado**: `$(SRCROOT)`<br/>
**Ejemplo**: `/Users/ci/source/MyApp`

Para obtener más información sobre las etiquetas reservadas `service` y `env`, consulte [Unified Service Tagging][8].

Configure `DD_SITE` para su sitio ({{< region-param key="dd_site_name" >}}):

`DD_SITE` (opcional)
: El [sitio de Datadog][3] al que cargar los resultados.<br/>
**Predeterminado**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}

## Recopilación de metadatos de Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

### Ejecución de pruebas {#running-tests}

Después de la instalación, ejecute sus pruebas como lo hace normalmente, por ejemplo, utilizando el comando `xcodebuild test`. Las pruebas, las solicitudes de red y los bloqueos de la aplicación se instrumentan automáticamente. Pase sus variables de entorno al ejecutar sus pruebas en la CI, por ejemplo:

<pre>
<code>
DD_TEST_RUNNER=1 DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=arm64" \
  test
</code>
</pre>

### UI Tests {#ui-tests}

### Integración de RUM {#rum-integration}

Si la aplicación que se está probando está instrumentada mediante RUM, los resultados de sus pruebas y las sesiones de RUM generadas se vinculan automáticamente. Obtenga más información sobre RUM en la guía de [Integración de RUM para iOS][4]. Se necesita una versión de RUM para iOS >= 1.10.

Las variables de entorno solo deben configurarse en el destino de la prueba, ya que el framework inyecta automáticamente estos valores en la aplicación.

### SDK de optimización de pruebas {#test-optimisation-sdk}

Si no utiliza RUM, puede vincular el destino de su aplicación con el SDK de pruebas. El SDK añade instrumentación automática a su aplicación, recopila solicitudes de red y registros, y los adjunta a las trazas de las pruebas.

Las variables de entorno solo deben configurarse en el destino de la prueba, ya que el framework inyecta automáticamente estos valores en la aplicación.

## Configuración opcional adicional {#additional-optional-configuration}

Para los siguientes ajustes de configuración:
 - `Boolean` las variables pueden usar cualquiera de : `1`, `0`, `true`, `false`, `YES`, o `NO`
 - `String` Las variables de lista aceptan una lista de elementos separados por `,` o `;`

### Habilitar la auto-instrumentación {#enabling-auto-instrumentation}

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: Captura los mensajes escritos en `stdout` (por ejemplo, `print()`) y los reporta como registros. Esto puede afectar su factura. (Booleano)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: Captura los mensajes escritos en `stderr` (por ejemplo, `NSLog()`, pasos de UI Test) y los reporta como registros. Esto puede afectar su factura. (Booleano)

### Deshabilitar la auto-instrumentación {#disabling-auto-instrumentation}

El framework habilita la auto-instrumentación de todas las bibliotecas compatibles, pero en algunos casos esto podría no ser deseado. Puede deshabilitar la auto-instrumentación de ciertas bibliotecas configurando las siguientes variables de entorno (o en el archivo `Info.plist` como se [describe a continuación](#using-infoplist-for-configuration)):

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Deshabilita toda la instrumentación de red (Booleano)

`DD_DISABLE_RUM_INTEGRATION`
: Deshabilita la integración con sesiones RUM (Booleano)

`DD_DISABLE_SOURCE_LOCATION`
: Deshabilita la ubicación del código fuente de prueba y los Codeowners (Booleano)

`DD_DISABLE_CRASH_HANDLER`
: deshabilita el manejo y la notificación de fallos. (Booleano)
<div class="alert alert-danger">Si deshabilita la notificación de fallos, las pruebas que fallan no se informan en absoluto y no aparecen como errores de prueba. Si necesita deshabilitar el manejo de fallos para alguna de sus pruebas, ejecútelas como un destino separado, para no deshabilitarlo para las demás.</div>

### Instrumentación automática de red {#network-auto-instrumentation}

Para la instrumentación automática de red, puede configurar estos ajustes adicionales:

`DD_DISABLE_HEADERS_INJECTION`
: Deshabilita toda la inyección de encabezados de rastreo (booleano)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: Encabezados adicionales específicos que desea incluir en el registro (lista de cadenas)

`DD_EXCLUDED_URLS`
: URLs que no desea incluir en el registro ni inyectar encabezados (lista de cadenas)

`DD_ENABLE_RECORD_PAYLOAD`
: Habilita el informe de un subconjunto (1024 bytes) de las cargas útiles en las solicitudes y respuestas (booleano)

`DD_MAX_PAYLOAD_SIZE`
: Establece el tamaño máximo informado de la carga útil. Predeterminado `1024` (entero)

`DD_DISABLE_NETWORK_CALL_STACK`
: Deshabilita la información de la pila de llamadas en los tramos de red (booleano)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: Muestra la información de la pila de llamadas no solo con el nombre del método, sino también con la información precisa del archivo y la línea. Puede afectar el rendimiento de sus pruebas (booleano)

### Correlación de prueba de infraestructura {#infrastructure-test-correlation}

Si está ejecutando pruebas en su propia infraestructura (pruebas en macOS o simulador), puede correlacionar sus pruebas con las métricas de su infraestructura instalando el Datadog Agent y configurando lo siguiente:

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: Informa el nombre de host de la máquina que inicia las pruebas (booleano)

También puede deshabilitar o habilitar la instrumentación automática específica en algunas de las pruebas desde Swift u Objective-C importando el módulo `DatadogSDKTesting` y usando la clase: `DDInstrumentationControl`.

## Etiquetas personalizadas {#custom-tags}

### Variables de entorno {#environment-variables}

Puede usar la variable de entorno `DD_TAGS` (o en el archivo `Info.plist` como se [describe a continuación](#using-infoplist-for-configuration)). Debe contener pares de `key:tag` separados por espacios. Por ejemplo:
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

Si uno de los valores comienza con el carácter `$`, se reemplaza por una variable de entorno del mismo nombre (si existe), por ejemplo:
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

El uso del carácter `$` también permite reemplazar una variable de entorno al principio de un valor si contiene caracteres no compatibles con variables de entorno (`a-z`, `A-Z` o `_`), por ejemplo:
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### Dentro de un método de prueba {#inside-a-test-method}

Puede agregar etiquetas personalizadas dentro de sus métodos de prueba. La propiedad estática `DDTest.current` devolverá la instancia actual de prueba si se llama dentro del contexto del método de prueba.

{{< code-block lang="swift" >}}
// Somewhere inside the test method
DDTest.current?.setTag(key: "key1", value: "value1")
// test continues normally
// ...
{{< /code-block >}}

### OpenTelemetry {#opentelemetry}

**Nota**: El uso de OpenTelemetry solo es compatible con Swift.

El marco de pruebas de Datadog Swift utiliza [OpenTelemetry][6] como tecnología de rastreo subyacente. Puede acceder al rastreador de OpenTelemetry usando `DDInstrumentationControl.openTelemetryTracer` y utilizar cualquier API de OpenTelemetry. Por ejemplo, para agregar una etiqueta o atributo:

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

El objetivo de prueba debe vincularse explícitamente con `opentelemetry-swift`.

### Reportando Code Coverage {#reporting-code-coverage}

Cuando la cobertura de código está disponible, el SDK de Datadog (v2.2.7+) la reporta bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

En Xcode, puede habilitar la recopilación de cobertura de código en su Plan de prueba o Esquema de prueba, dependiendo de la configuración de su proyecto.

Puede ver la evolución de Code Coverage en la pestaña {{< ui >}}Coverage{{< /ui >}} de una sesión de prueba.

## Uso de Info.plist para la configuración {#using-infoplist-for-configuration}

Como alternativa a establecer variables de entorno, todos los valores de configuración pueden proporcionarse agregándolos al archivo `Info.plist` del paquete de prueba (no del paquete de la aplicación). Si la misma configuración se establece tanto en una variable de entorno como en el archivo `Info.plist`, la variable de entorno tiene prioridad.

## Variables de entorno del proveedor de CI {#ci-provider-environment-variables}

{{< tabs >}}
{{% tab "Jenkins" %}}

| Variable de entorno | Valor                  |
| -------------------- | ---------------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`       |
| `WORKSPACE`          | `$(WORKSPACE)`         |
| `BUILD_TAG`          | `$(BUILD_TAG)`         |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)`      |
| `BUILD_URL`          | `$(BUILD_URL)`         |
| `JOB_NAME`           | `$(JOB_NAME)`          |
| `DD_CUSTOM_TRACE_ID` | `$(DD_CUSTOM_TRACE_ID)`|

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno | Valor           |
| -------------------- | --------------- |
| `GIT_COMMIT`         | `$(GIT_COMMIT)` |
| `GIT_URL`            | `$(GIT_URL)`    |
| `GIT_URL_1`          | `$(GIT_URL_1)`  |
| `GIT_BRANCH`         | `$(GIT_BRANCH)` |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Variable de entorno       | Valor                         |
| -------------------------- | ----------------------------- |
| `CIRCLECI`                 | `$(CIRCLECI)`                 |
| `CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
| `CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
| `CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
| `CIRCLE_WORKFLOW_ID`       | `$(CIRCLE_WORKFLOW_ID)`       |
| `CIRCLE_PROJECT_REPONAME`  | `$(CIRCLE_PROJECT_REPONAME)`  |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno    | Valor                      |
| ----------------------- | -------------------------- |
| `CIRCLE_SHA1`           | `$(CIRCLE_SHA1)`           |
| `CIRCLE_REPOSITORY_URL` | `$(CIRCLE_REPOSITORY_URL)` |
| `CIRCLE_BRANCH`         | `$(CIRCLE_BRANCH)`         |
| `CIRCLE_TAG`            | `$(CIRCLE_TAG)`            |

{{% /tab %}}
{{% tab "GitLab CI" %}}

| Variable de entorno | Valor                |
| -------------------- | -------------------- |
| `GITLAB_CI`          | `$(GITLAB_CI)`       |
| `CI_PROJECT_DIR`     | `$(CI_PROJECT_DIR)`  |
| `CI_JOB_STAGE`       | `$(CI_JOB_STAGE)`    |
| `CI_JOB_NAME`        | `$(CI_JOB_NAME)`     |
| `CI_JOB_URL`         | `$(CI_JOB_URL)`      |
| `CI_PIPELINE_ID`     | `$(CI_PIPELINE_ID)`  |
| `CI_PIPELINE_IID`    | `$(CI_PIPELINE_IID)` |
| `CI_PIPELINE_URL`    | `$(CI_PIPELINE_URL)` |
| `CI_PROJECT_PATH`    | `$(CI_PROJECT_PATH)` |
| `CI_PROJECT_URL`     | `$(CI_PROJECT_URL)`  |


Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno | Valor                  |
| -------------------- | ---------------------- |
| `CI_COMMIT_SHA`      | `$(CI_COMMIT_SHA)`     |
| `CI_REPOSITORY_URL`  | `$(CI_REPOSITORY_URL)` |
| `CI_COMMIT_BRANCH`   | `$(CI_COMMIT_BRANCH)`  |
| `CI_COMMIT_TAG`      | `$(CI_COMMIT_TAG)`     |
| `CI_COMMIT_MESSAGE`  | `$(CI_COMMIT_MESSAGE)` |
| `CI_COMMIT_AUTHOR`  | `$(CI_COMMIT_AUTHOR)` |
| `CI_COMMIT_TIMESTAMP`  | `$(CI_COMMIT_TIMESTAMP)` |

{{% /tab %}}
{{% tab "Travis" %}}

| Variable de entorno       | Valor                         |
| -------------------------- | ----------------------------- |
| `TRAVIS`                   | `$(TRAVIS)`                   |
| `TRAVIS_BUILD_DIR`         | `$(TRAVIS_BUILD_DIR)`         |
| `TRAVIS_BUILD_ID`          | `$(TRAVIS_BUILD_ID)`          |
| `TRAVIS_BUILD_NUMBER`      | `$(TRAVIS_BUILD_NUMBER)`      |
| `TRAVIS_BUILD_WEB_URL`     | `$(TRAVIS_BUILD_WEB_URL)`     |
| `TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |
| `TRAVIS_REPO_SLUG`         | `$(TRAVIS_REPO_SLUG)`         |
| `TRAVIS_PULL_REQUEST_SLUG` | `$(TRAVIS_PULL_REQUEST_SLUG)` |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno         | Valor                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`                 | `$(TRAVIS_TAG)`                 |
| `TRAVIS_COMMIT_MESSAGE`      | `$(TRAVIS_COMMIT_MESSAGE)`      |

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| Variable de entorno | Valor                   |
| -------------------- | ----------------------- |
| `GITHUB_WORKSPACE`   | `$(GITHUB_WORKSPACE)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)`  |
| `GITHUB_RUN_ID`      | `$(GITHUB_RUN_ID)`      |
| `GITHUB_RUN_NUMBER`  | `$(GITHUB_RUN_NUMBER)`  |
| `GITHUB_WORKFLOW`    | `$(GITHUB_WORKFLOW)`    |
| `GITHUB_SHA`         | `$(GITHUB_SHA)`         |
| `GITHUB_SERVER_URL`  | `$(GITHUB_SERVER_URL)`  |
| `GITHUB_RUN_ATTEMPT` | `$(GITHUB_RUN_ATTEMPT)` |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno | Valor                  |
| -------------------- | ---------------------- |
| `GITHUB_REF`         | `$(GITHUB_REF)`        |
| `GITHUB_HEAD_REF`    | `$(GITHUB_HEAD_REF)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)` |

{{% /tab %}}
{{% tab "Buildkite" %}}

| Variable de entorno            | Valor                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE`                     | `$(BUILDKITE)`                     |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | `$(BUILDKITE_BUILD_CHECKOUT_PATH)` |
| `BUILDKITE_BUILD_ID`            | `$(BUILDKITE_BUILD_ID)`            |
| `BUILDKITE_BUILD_NUMBER`        | `$(BUILDKITE_BUILD_NUMBER)`        |
| `BUILDKITE_BUILD_URL`           | `$(BUILDKITE_BUILD_URL)`           |
| `BUILDKITE_PIPELINE_SLUG`       | `$(BUILDKITE_PIPELINE_SLUG)`       |
| `BUILDKITE_JOB_ID`              | `$(BUILDKITE_JOB_ID)`              |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno           | Valor                             |
| ------------------------------ | --------------------------------- |
| `BUILDKITE_COMMIT`             | `$(BUILDKITE_COMMIT)`             |
| `BUILDKITE_REPO`               | `$(BUILDKITE_REPO)`               |
| `BUILDKITE_BRANCH`             | `$(BUILDKITE_BRANCH)`             |
| `BUILDKITE_TAG`                | `$(BUILDKITE_TAG)`                |
| `BUILDKITE_MESSAGE`            | `$(BUILDKITE_MESSAGE)`            |
| `BUILDKITE_BUILD_AUTHOR`       | `$(BUILDKITE_BUILD_AUTHOR)`       |
| `BUILDKITE_BUILD_AUTHOR_EMAIL` | `$(BUILDKITE_BUILD_AUTHOR_EMAIL)` |

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| Variable de entorno       | Valor                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`      |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`   |
| `BITBUCKET_PIPELINE_UUID`  | `$(BITBUCKET_PIPELINE_UUID)`  |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno       | Valor                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_COMMIT`         | `$(BITBUCKET_COMMIT)`         |
| `BITBUCKET_GIT_SSH_ORIGIN` | `$(BITBUCKET_GIT_SSH_ORIGIN)` |
| `BITBUCKET_BRANCH`         | `$(BITBUCKET_BRANCH)`         |
| `BITBUCKET_TAG`            | `$(BITBUCKET_TAG)`            |

{{% /tab %}}
{{% tab "AppVeyor" %}}

| Variable de entorno     | Valor                       |
| ------------------------ | --------------------------- |
| `APPVEYOR`               | `$(APPVEYOR)`               |
| `APPVEYOR_BUILD_FOLDER`  | `$(APPVEYOR_BUILD_FOLDER)`  |
| `APPVEYOR_BUILD_ID`      | `$(APPVEYOR_BUILD_ID)`      |
| `APPVEYOR_BUILD_NUMBER`  | `$(APPVEYOR_BUILD_NUMBER)`  |
| `APPVEYOR_REPO_TAG_NAME` | `$(APPVEYOR_REPO_TAG_NAME)` |
| `APPVEYOR_REPO_NAME`     | `$(APPVEYOR_REPO_NAME)`     |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno                     | Valor                                       |
| ---------------------------------------- | ------------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`  | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`            | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`            |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`      | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`      |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Variable de entorno             | Valor                               |
| -------------------------------- | ----------------------------------- |
| `TF_BUILD`                       | `$(TF_BUILD)`                       |
| `BUILD_SOURCESDIRECTORY`         | `$(BUILD_SOURCESDIRECTORY)`         |
| `BUILD_BUILDID`                  | `$(BUILD_BUILDID)`                  |
| `BUILD_DEFINITIONNAME`           | `$(BUILD_DEFINITIONNAME)`           |
| `SYSTEM_TEAMPROJECTID`           | `$(SYSTEM_TEAMPROJECTID)`           |
| `SYSTEM_TEAMFOUNDATIONSERVERURI` | `$(SYSTEM_TEAMFOUNDATIONSERVERURI)` |
| `SYSTEM_JOBID`                   | `$(SYSTEM_JOBID)`                   |
| `SYSTEM_TASKINSTANCEID`          | `$(SYSTEM_TASKINSTANCEID)`          |
| `SYSTEM_JOBDISPLAYNAME`          | `$(SYSTEM_JOBDISPLAYNAME)`          |
| `SYSTEM_STAGEDISPLAYNAME`          | `$(SYSTEM_STAGEDISPLAYNAME)`          |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno                     | Valor                                       |
| ---------------------------------------- | ------------------------------------------- |
| `BUILD_SOURCEVERSION`                    | `$(BUILD_SOURCEVERSION)`                    |
| `BUILD_REPOSITORY_URI`                   | `$(BUILD_REPOSITORY_URI)`                   |
| `BUILD_SOURCEBRANCH`                     | `$(BUILD_SOURCEBRANCH)`                     |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`      | `$(SYSTEM_PULLREQUEST_SOURCECOMMITID)`      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`        | `$(SYSTEM_PULLREQUEST_SOURCEBRANCH)`        |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI` | `$(SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI)` |
| `BUILD_SOURCEVERSIONMESSAGE`             | `$(BUILD_SOURCEVERSIONMESSAGE)`             |
| `BUILD_REQUESTEDFORID`                   | `$(BUILD_REQUESTEDFORID)`                   |
| `BUILD_REQUESTEDFOREMAIL`                | `$(BUILD_REQUESTEDFOREMAIL)`                |

{{% /tab %}}
{{% tab "Bitrise" %}}

| Variable de entorno   | Valor                     |
| ---------------------- | ------------------------- |
| `BITRISE_SOURCE_DIR`   | `$(BITRISE_SOURCE_DIR)`   |
| `BITRISE_TRIGGERED_WORKFLOW_ID`  | `$(BITRISE_TRIGGERED_WORKFLOW_ID)`  |
| `BITRISE_BUILD_SLUG`   | `$(BITRISE_BUILD_SLUG)`   |
| `BITRISE_BUILD_NUMBER` | `$(BITRISE_BUILD_NUMBER)` |
| `BITRISE_BUILD_URL`    | `$(BITRISE_BUILD_URL)`    |

Configuración de Git adicional para pruebas en dispositivos físicos:

| Variable de entorno               | Valor                                 |
| ---------------------------------- | ------------------------------------- |
| `GIT_REPOSITORY_URL`               | `$(GIT_REPOSITORY_URL)`               |
| `BITRISE_GIT_COMMIT`               | `$(BITRISE_GIT_COMMIT)`               |
| `BITRISE_GIT_BRANCH`               | `$(BITRISE_GIT_BRANCH)`               |
| `BITRISE_GIT_TAG`                  | `$(BITRISE_GIT_TAG)`                  |
| `GIT_CLONE_COMMIT_HASH`            | `$(GIT_CLONE_COMMIT_HASH)`            |
| `BITRISE_GIT_MESSAGE`              | `$(BITRISE_GIT_MESSAGE)`              |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT` | `$(GIT_CLONE_COMMIT_MESSAGE_SUBJECT)` |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`    | `$(GIT_CLONE_COMMIT_MESSAGE_BODY)`    |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`     | `$(GIT_CLONE_COMMIT_AUTHOR_NAME)`     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`    | `$(GIT_CLONE_COMMIT_AUTHOR_EMAIL)`    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`   | `$(GIT_CLONE_COMMIT_COMMITER_NAME)`   |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`  | `$(GIT_CLONE_COMMIT_COMMITER_EMAIL)`  |

{{% /tab %}}
{{% tab "Xcode Cloud" %}}

| Variable de entorno    | Valor                   |
| ----------------------- | ----------------------- |
| `DD_GIT_REPOSITORY_URL` | La URL del repositorio      |
| `CI_WORKSPACE`          | `$(CI_WORKSPACE)`       |
| `CI_COMMIT`             | `$(CI_COMMIT)`          |
| `CI_BUILD_ID`           | `$(CI_BUILD_ID)`        |
| `CI_BUILD_NUMBER`       | `$(CI_BUILD_NUMBER)`    |
| `CI_WORKFLOW`           | `$(CI_WORKFLOW)`        |
| `CI_TAG`                | `$(CI_TAG)`             |
| `CI_BRANCH`             | `$(CI_BRANCH)`          |
| `CI_GIT_REF`            | `$(CI_GIT_REF)`         |

{{% /tab %}}
{{< /tabs >}}

## Mejores prácticas {#best-practices}

Siga estas prácticas para aprovechar al máximo el marco de pruebas y Test Optimization.

### Generar archivo de símbolos al compilar {#generate-symbols-file-when-building}

Compile su código en Xcode usando `DWARF with dSYM File` (o `-Xswiftc -debug-info-format=dwarf` si compila con `swift`)

El marco de pruebas utiliza archivos de símbolos para parte de su funcionalidad, incluyendo: simbolización de bloqueos, informar la ubicación de la fuente de la prueba e informar los propietarios del código. Lo genera automáticamente cuando los símbolos de depuración están integrados en los binarios, pero puede tomar algo de tiempo adicional cargarlos.

### Deshabilitar entorno aislado para UI Tests en macOS {#disable-sandbox-for-ui-tests-on-macos}

En algunas versiones de Xcode, los paquetes de pruebas de IU se compilan con un entorno aislado de forma predeterminada. La configuración que viene con un entorno aislado impide que el marco de pruebas se ejecute mediante algunos comandos del sistema con `xcrun`, por lo que debe deshabilitarlo.

Deshabilite el entorno aislado agregando Entitlements al paquete de IU de Test Runner y luego agregue `App Sandbox = NO` a estos. También puede crear un archivo `.entitlement` y agregarlo a Signing Build Settings. Este archivo debe incluir el siguiente contenido:

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

### Nombre de la sesión de prueba `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Use `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de prueba y el grupo de pruebas relacionado. Ejemplos de valores para esta etiqueta serían:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor predeterminado es el nombre del trabajo de CI y el comando de prueba. Si el nombre del trabajo de CI no está disponible, se utiliza el comando de prueba.

El nombre de la sesión de prueba debe ser único dentro de un repositorio para ayudarle a distinguir diferentes grupos de pruebas.

#### Cuándo usar `DD_TEST_SESSION_NAME` {#when-to-use-dd-test-session-name}

Existe un conjunto de parámetros que Datadog verifica para establecer la correspondencia entre las sesiones de prueba. El comando de prueba utilizado para ejecutar las pruebas es uno de ellos. Si el comando de prueba contiene una cadena que cambia en cada ejecución, como una carpeta temporal, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

- `swift test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda usar `DD_TEST_SESSION_NAME` si sus comandos de prueba varían entre ejecuciones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/getting_started/site/
[4]: /es/tests/swift_tests/
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /es/tests/test_impact_analysis/
[8]: /es/getting_started/tagging/unified_service_tagging