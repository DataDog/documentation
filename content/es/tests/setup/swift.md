---
aliases:
- /es/continuous_integration/setup_tests/swift
- /es/continuous_integration/tests/swift
- /es/continuous_integration/tests/setup/swift
code_lang: swift
code_lang_weight: 50
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Explore los resultados de los tests y el rendimiento
- link: /continuous_integration/intelligent_test_runner/swift
  tag: Documentación
  text: Para acelerar tus tests con Intelligent Test Runner
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Tests Swift
type: lenguaje de código múltiple
---

## Compatibilidad

Lenguajes compatibles:

| Lenguaje | Versión | Notas |
|---|---|---|
| Swift |  v5.2 o anterior | Si estás utilizando Swift Concurrency, necesitas Xcode v13.2 o anterior para la representación precisa de tramos (spans) de tareas asíncronas. |
| Objective-C | v2.0 o anterior | |

Plataformas compatibles:

| Plataforma | Versión |
|---|---|
| iOS | v11.0 o anterior |
| macOS | v10.13 o anterior |
| tvOS | v11.0 o anterior |

## Instalación del SDK para tests Swift

Existen tres maneras de instalar el marco para tests:

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

### Uso de un proyecto Xcode

1. Añade el paquete `dd-sdk-swift-testing` localizado en [`https://github.com/DataDog/dd-sdk-swift-testing`][1] a tu proyecto.

{{< img src="continuous_integration/swift_package.png" alt="Swift Package" >}}


2. Vincula tus objetivos de tests con la librería `DatadogSDKTesting` del paquete.

{{< img src="continuous_integration/swift_link2.png" alt="Swift Linking SPM" >}}

3. Si ejecutas tests de interfaz de usuario, vincula también la aplicación que ejecuta los tests con la librería.

### Uso de un proyecto Swift Package

1. Añade `dd-sdk-swift-testing` a la matriz de dependencias de tu paquete. Por ejemplo:

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.2.0")
{{< /code-block >}}

2. Para añadir el marco para tests a las dependencias de tus objetivos de tests añade la siguiente línea a la matriz de dependencias de tus objetivos de tests:
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}

3. Si ejecutas tests de interfaz de usuario, añade también la dependencia a tus aplicaciones que ejecutan los tests.


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "Cocoapods" %}}

1. Añade la dependencia `DatadogSDKTesting` a los objetivos de tests de tu `Podfile`:

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

2. Si ejecutas tests de interfaz de usuario, añade también la dependencia a la aplicación que ejecuta los tests.

{{% /tab %}}
{{% tab "Framework linking" %}}

1. Descarga y descomprime `DatadogSDKTesting.zip` desde la página de la [versión][1].

2. Copia y vincula tus objetivos de tests con el XCFramework resultante.

{{< img src="continuous_integration/swift_link.png" alt="Swift Linking XCFramework" >}}

3. Si ejecutas tests de interfaz de usuario, vincula también la aplicación que ejecuta los tests con esta biblioteca.

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{% tab "Acciones de GitHub" %}}

Si utilizas GitHub, puedes utilizar la [acción para tests de Swift][1] del Marketplace de GitHub para configurar y ejecutar tus tests automáticamente. Por defecto, es posible omitir el resto de la configuración descrita en esta página (excepto la configuración de la acción misma), aunque puedes utilizar las variables de entorno de configuración para deshabilitar o configurar funcionalidades adicionales.

En comparación con otros métodos, como la vinculación de Cocoapods and Framework, puede que la opción de la acción para tests de Swift presente una configuración y una ejecución menos flexibles, pero no requiere cambios de código.

[1]: https://github.com/marketplace/actions/swift-test-action-for-datadog
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-danger"><strong>Nota</strong>: Este marco sólo es útil para realizar tests y debes vincularlo sólo con la aplicación durante la ejecución de tests. No debes distribuir el marco entre tus usuarios. </div>

## Instrumentación de tus pruebas

### Configuración de Datadog

#### Uso del proyecto Xcode

Para habilitar la instrumentación de los tests añade las siguientes variables de entorno a tu objetivo de test o al archivo `Info.plist`, como [se describe a continuación](##using-infoplist-for-configuration). Si estás utilizando planes de tests, **debes** seleccionar tu objetivo principal en `Expand variables based on` o `Target for Variable Expansion`:

{{< img src="continuous_integration/swift_env.png" alt="Entornos Swift" >}}

<div class="alert alert-danger">Tu objetivo principal debe encontrarse en la expansión de variables de las variables de entorno. Si no se selecciona, las variables no son válidas.</div>

Para los tests de interfaz de usuario, las variables de entorno sólo deben configurarse en el objetivo del test, ya que el marco inyecta automáticamente estos valores en la aplicación.

#### Uso del proyecto Swift Package

Para habilitar la instrumentación de los tests debes configurar las siguientes variables de entorno en tu ejecución de línea de comandos para los tests. También puedes configurarlas en el entorno, antes de ejecutar los tests, o puedes anteponerlas al siguiente comando:

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


Configura todas estas variables en tu objetivo de test:

`DD_TEST_RUNNER`
: Habilita o deshabilita la instrumentación de los tests. Define este valor en `$(DD_TEST_RUNNER)` para poder habilitar o deshabilitar la instrumentación de los tests con una variable de entorno definida fuera del proceso de test (por ejemplo, en la compilación CI).<br/>
**Por defecto**: `false`<br/>
**Recomendado**: `$(DD_TEST_RUNNER)`

`DD_API_KEY`
: La [clave de API de Datadog][2] utilizada para cargar los resultados de los tests.<br/>
**Por defecto**: `(empty)`

`DD_APPLICATION_KEY`
: La [clave de aplicación de Datadog][5] utilizada para cargar los resultados de los tests.<br/>
**Por defecto**: `(empty)`

`DD_SERVICE`
: El nombre del servicio o la librería a los que se realizan tests.<br/>
**Por defecto**: El nombre del repositorio.<br/>
**Ejemplo**: `my-ios-app`

`DD_ENV`
: El nombre del entorno donde se ejecutan los tests. Configura este valor como `$(DD_ENV)` para poder utilizar una variable de entorno en tiempo de ejecución para configurarlo.<br/>
**Por defecto**: `none`<br/>
**Recomendado**: `$(DD_ENV)`<br/>
**Ejemplos**: `ci`, `local`

`SRCROOT`
: La ruta de localización del proyecto. Si utilizas Xcode, utiliza `$(SRCROOT)` para el valor, ya que se define automáticamente por él.<br/>
**Por defecto**: `(empty)`<br/>
**Recomendado**: `$(SRCROOT)`<br/>
**Ejemplo**: `/Users/ci/source/MyApp`

Para obtener más información sobre las etiquetas (tags) reservadas `service` y `env`, consulta  [Etiquetado unificado de servicios][8].

Además, configura el sitio Datadog para utilizar el sitio ({{< region-param key="dd_site_name" >}}) seleccionado:

`DD_SITE` (Obligatorio)
: El [sitio Datadog][3] al que cargar los resultados.<br/>
**Por defecto**: `datadoghq.com`<br/>
**Sitio seleccionado**: {{< region-param key="dd_site" code="true" >}}

## Recopilación de metadatos Git

{{% ci-git-metadata %}}

### Ejecución de tests

Después de la instalación, ejecuta tus tests como lo haces normalmente; por ejemplo, utilizando el comando `xcodebuild test`. Los tests, las solicitudes de red y los fallos de aplicaciones se instrumentan automáticamente. Cuando ejecutes tus tests en el CI, pasa tus variables de entorno, por ejemplo:

<pre>
<code>
DD_TEST_RUNNER=1 DD_ENV=ci DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
</code>
</pre>

### Tests de interfaz de usuario

En el caso de los tests de interfaz de usuario, tanto el objetivo del test como la aplicación que se ejecuta desde tests de interfaz de usuario, deben vincularse con el marco. Las variables de entorno sólo deben configurarse en el objetivo del test, ya que el marco inyecta automáticamente estos valores en la aplicación.

### Integración RUM

Si la aplicación que se está probando está instrumentada con RUM, los resultados de los tests de interfaz de usuario y las sesiones RUM generadas se vinculan automáticamente. Para obtener más información sobre RUM, consulta la guía de la [integración RUM iOS][4]. Se necesita una versión 1.10 o anterior de RUM iOS.


## Configuración opcional adicional

Para los siguientes parámetros de configuración:
 - Las variables `Boolean` pueden utilizar cualquiera de los siguientes valores: `1`, `0`, `true`, `false`, `YES` o `NO`
 - Las variables de lista de `String` aceptan una lista de elementos separados por `,` o `;`

### Habilitación de la instrumentación automática

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: Captura los mensajes escritos en `stdout` (por ejemplo, `print()`) y los notifica en forma de logs. Esto puede afectar a tu factura. (Booleano)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: Captura los mensajes escritos en `stderr` (por ejemplo, `NSLog()`, pasos de test de interfaz de usuario) y los notifica en forma de logs. Esto puede afectar a tu factura. (Booleano)

### Deshabilitación de la instrumentación automática

El marco habilita la instrumentación automática de todas los bibliotecas compatibles, pero en algunos casos puede que no quieras que esto ocurra. Puedes deshabilitar la instrumentación automática de algunas bibliotecas configurando las siguientes variables de entorno (o en el archivo `Info.plist` como [se describe a continuación](#using-infoplist-for-configuration)):

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Deshabilita la instrumentación de toda la red. (Booleano)

`DD_DISABLE_RUM_INTEGRATION`
: Deshabilita la integración con sesiones RUM. (Booleano)

`DD_DISABLE_SOURCE_LOCATION`
: Deshabilita la localización y los codeowners del código de la fuente de los tests. (Booleano)

`DD_DISABLE_CRASH_HANDLER`
: Deshabilita la gestión y la notificación de fallos. (Booleano)
<div class="alert alert-danger"><strong>Importante</strong>: Si deshabilitas la notificación de fallos, los tests fallidos no se notificarán y no aparecerán como fallos del test. Si necesitas deshabilitar la gestión de fallos para alguno de tus tests, ejecútala como un objetivo separado, para no deshabilitarla para los demás.</div>

### Instrumentación automática de la red

Para la instrumentación automática de la red, puedes configurar los siguientes parámetros adicionales:

`DD_DISABLE_HEADERS_INJECTION`
: Deshabilita cualquier inyección de cabeceras de rastreo. (Booleano)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: Las cabeceras adicionales específicas que quieres registrar. (Lista de cadenas)

`DD_EXCLUDED_URLS`
: Las URL que no quieres registrar o en las que no quieres inyectar cabeceras. (Lista de cadenas)

`DD_ENABLE_RECORD_PAYLOAD`
: Permite informar un subconjunto (1024 bytes) de cargas útiles en las solicitudes y respuestas. (Booleano)

`DD_MAX_PAYLOAD_SIZE`
: Define el tamaño máximo informado de la carga útil. Por defecto `1024`. (Entero)

`DD_DISABLE_NETWORK_CALL_STACK`
: Deshabilita la información de las llamadas del stack tecnológico en los tramos de la red. (Booleano)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: Muestra la información de las llamadas del stack tecnológico no sólo con el nombre del método, sino también con la información precisa del archivo y la línea. Puede afectar al rendimiento de los tests. (Booleano)

### Correlación de tests con la infraestructura

Si estás ejecutando tests en tu propia infraestructura (tests de macOS o simulador), puedes correlacionar tus tests con las métricas de tu infraestructura instalando el Datadog Agent y configurando lo siguiente:

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: Informa del nombre de host de la máquina que inicia los tests. (Booleano)

También puedes deshabilitar o habilitar una instrumentación automática determinada en algunos de los tests de Swift o Objective-C, importando el módulo `DatadogSDKTesting` y utilizando la clase: `DDInstrumentationControl`.

## Etiquetas personalizadas

### Variables de entorno

Puedes utilizar la variable de entorno `DD_TAGS` (o en el archivo `Info.plist` como [se describe a continuación](#using-infoplist-for-configuration)). Debe contener pares de `key:tag` separados por espacios. Por ejemplo:
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

Si uno de los valores empieza con el carácter `$`, se sustituye por una variable de entorno con el mismo nombre (si existe). Por ejemplo:
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

El uso del carácter `$` también permite sustituir una variable de entorno al principio de un valor si contiene caracteres no compatibles con la variable de entorno (`a-z`, `A-Z` o `_`). Por ejemplo:
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### OpenTelemetry

**Nota**: El uso de OpenTelemetry sólo es compatible con Swift.

El marco para tests Swift de Datadog utiliza [OpenTelemetry][6] como la tecnología de rastreo subyacente. Puedes acceder al rastreador OpenTelemetry utilizando `DDInstrumentationControl.openTelemetryTracer` y utilizar cualquier API de OpenTelemetry. Por ejemplo, para añadir una etiqueta o un atributo:

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

El objetivo de test debe vincularse explícitamente con `opentelemetry-swift`.

### Informes sobre la cobertura del código

Cuando la cobertura del código está disponible, el SDK de Datadog (v2.2.7 y posteriores) lo informa mediante la etiqueta `test.code_coverage.lines_pct` para tus sesiones de tests.

En Xcode, puedes habilitar el informe de cobertura del código en tu esquema de test.

Puedes ver la evolución de la cobertura de los tests en la pestaña **Coverage** (Cobertura) de una sesión de tests.

## Uso de Info.plist para la configuración

Como alternativa a la configuración de variables de entorno, se pueden proporcionar todos los valores de configuración añadiéndolos al archivo `Info.plist` del paquete de tests (no del paquete de aplicaciones). Si se define la misma configuración, tanto en una variable de entorno como en el archivo `Info.plist`, la variable de entorno tiene prioridad.

## Variables de entorno del proveedor de IC

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

Configuración Git adicional para tests de dispositivos físicos:

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

Configuración Git adicional para tests de dispositivos físicos:

| Variable de entorno    | Valor                      |
| ----------------------- | -------------------------- |
| `CIRCLE_SHA1`           | `$(CIRCLE_SHA1)`           |
| `CIRCLE_REPOSITORY_URL` | `$(CIRCLE_REPOSITORY_URL)` |
| `CIRCLE_BRANCH`         | `$(CIRCLE_BRANCH)`         |
| `CIRCLE_TAG`            | `$(CIRCLE_TAG)`            |

{{% /tab %}}
{{% tab "CLI GitLab" %}}

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


Configuración Git adicional para tests de dispositivos físicos:

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

Configuración Git adicional para tests de dispositivos físicos:

| Variable de entorno         | Valor                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`                 | `$(TRAVIS_TAG)`                 |
| `TRAVIS_COMMIT_MESSAGE`      | `$(TRAVIS_COMMIT_MESSAGE)`      |

{{% /tab %}}
{{% tab "Acciones GitHub" %}}

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

Configuración Git adicional para tests de dispositivos físicos:

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

Configuración Git adicional para tests de dispositivos físicos:

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
{{% tab "Pipelines de Bitbucket" %}}

| Variable de entorno       | Valor                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`      |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`   |
| `BITBUCKET_PIPELINE_UUID`  | `$(BITBUCKET_PIPELINE_UUID)`  |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

Configuración Git adicional para tests de dispositivos físicos:

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

Configuración Git adicional para tests de dispositivos físicos:

| Variable de entorno                     | Valor                                       |
| ---------------------------------------- | ------------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`  | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`            | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`            |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`      | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`      |

{{% /tab %}}
{{% tab "Pipelines de Azure" %}}

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

Configuración Git adicional para tests de dispositivos físicos:

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

Configuración Git adicional para tests de dispositivos físicos:

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
{{% tab "Nube Xcode" %}}

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

## API para tests manuales

Si utilizas XCTests en tus proyectos Swift, el marco `DatadogSDKTesting` los instrumenta automáticamente y envía los resultados al backend de Datadog. Si no utilizas XCTest, puedes utilizar la API para tests manuales Swift/Objective-C, que también informa de los resultados de los tests al backend.

La API se basa en tres conceptos: *módulo de test*, *conjuntos de tests* y *tests*.

### Módulo de test

Un módulo de test representa la carga de una biblioteca o un paquete que incluye los tests.

Para iniciar un módulo de test, llama a `DDTestModule.start()` y pasa el nombre del módulo o el paquete al que se va a realizar el test.

Cuando todos tus tests hayan finalizado, llama a `module.end()`, que obliga a la librería a enviar todos los resultados de los tests restantes al backend.

### Conjuntos de tests

Un conjunto de tests incluye aquellos tests que comparten una funcionalidad común. Pueden compartir una inicialización y un desmontaje comunes, y también pueden compartir algunas variables.

Crea el conjunto de tests en el módulo de test llamando a `module.suiteStart()` y pasando el nombre del conjunto de tests.

Llama a `suite.end()` cuando todos los tests relacionados del conjunto hayan finalizado su ejecución.

### Tests

Cada test se ejecuta dentro de conjunto y debe terminar en uno de estos tres estados: `pass`, `fail` o `skip`. Un test también puede contener información adicional, como atributos o información de errores.

Crea tests dentro de un conjunto llamando a `suite.testStart()` y pasando el nombre del test. Cuando finaliza un test, debe configurarse uno de los estados predefinidos.

### API de interfaz

{{< code-block lang="swift" >}}
class DDTestModule {
    // Inicia el módulo.
    // - Parámetros:
    //   - bundleName: Nombre del módulo o el paquete al que se va a realizar un test.
    //   - startTime (opcional): Hora de inicio del módulo.
    static func start(bundleName: String, startTime: Date? = nil) -> DDTestModule
    //
    // Finaliza el módulo.
    // - Parámetros:
    //   - endTime (opcional): Hora de finalización del módulo.
    func end(endTime: Date? = nil)
    // Añade una etiqueta o un atributo al módulo de test. Se puede agregar cualquier número de etiquetas.
    // - Parámetros:
    //   - key: Nombre de la etiqueta. Si ya existe una etiqueta con el mismo nombre,
    //     se sustituirá su valor por uno nuevo.
    //   - value: Valor de la etiqueta. Puede ser un número o una cadena.
    func setTag(key: String, value: Any)
    //
    // Inicia un conjunto en este módulo.
    // - Parámetros:
    //   - name: Nombre del conjunto.
    //   - startTime (opcional): Hora de inicio del conjunto.
    func suiteStart(name: String, startTime: Date? = nil) -> DDTestSuite
}
    //
public class DDTestSuite : NSObject {
    // Finaliza el conjunto de tests.
    // - Parámetros:
    //   - endTime (opcional): Hora de finalización del conjunto.
    func end(endTime: Date? = nil)
    // Añade una etiqueta o un atributo al conjunto de tests. Se puede agregar cualquier número de etiquetas.
    // - Parámetros:
    //   - key: Nombre de la etiqueta. Si ya existe una etiqueta con el mismo nombre,
    //     se sustituirá su valor por uno nuevo.
    //   - value: Valor de la etiqueta. Puede ser un número o una cadena.
    func setTag(key: String, value: Any)
    //
    // Inicia un test en este conjunto.
    // - Parámetros:
    //   - name: Nombre del test.
    //   - startTime (opcional): Hora de inicio del test.
    func testStart(name: String, startTime: Date? = nil) -> DDTest
}
    //
public class DDTest : NSObject {
    // Añade una etiqueta o un atributo al test. Se puede agregar cualquier número de etiquetas.
    // - Parámetros:
    //   - key: Nombre de la etiqueta. Si ya existe una etiqueta con el mismo nombre,
    //     se sustituirá su valor por uno nuevo.
    //   - value: Valor de la etiqueta. Puede ser un número o una cadena.
    func setTag(key: String, value: Any)
    //
    // Añade información de errores al test. Un test sólo puede notificar una información de error..
    // - Parámetros:
    //   - type: Tipo de error que se va a informar.
    //   - message: Mensaje asociado al error.
    //   - callstack (opcional): El stack tecnológico de las llamadas asociado al error.
    func setErrorInfo(type: String, message: String, callstack: String? = nil)
    //
    // Finaliza el test.
    // - Parámetros:
    //   - status: Estado informado de este test.
    //   - endTime (opcional): Hora de finalización del test.
    func end(status: DDTestStatus, endTime: Date? = nil)
}
    //
// Posibles estados informados por un test:
enum DDTestStatus {
  // El test ha sido aprobado.
  case pass
  //
  //El test ha fallado.
  case fail
  //
  //El test se ha omitido.
  case skip
}
{{< /code-block >}}

### Ejemplo de código

El siguiente código representa un uso sencillo de la API:

{{< code-block lang="swift" >}}
import DatadogSDKTesting
let module = DDTestModule.start(bundleName: "ManualModule")
let suite1 = module.suiteStart(name: "ManualSuite 1")
let test1 = suite1.testStart(name: "Test 1")
test1.setTag(key: "key", value: "value")
test1.end(status: .pass)
let test2 = suite1.testStart(name: "Test 2")
test2.SetErrorInfo(type: "Error Type", message: "Error message", callstack: "Optional callstack")
test2.end(test: test2, status: .fail)
suite1.end()
let suite2 = module.suiteStart(name: "ManualSuite 2")
..
..
module.end()
{{< /code-block >}}

Llama siempre a `module.end()` al finalizar, para que toda la información de los tests se envíe a Datadog.

## Prácticas recomendadas

Sigue estas prácticas para aprovechar al máximo el marco para tests y CI Visibility.

### Generación de archivos de símbolos durante la creación

Crea tu código en Xcode utilizando `DWARF with dSYM File` (o `-Xswiftc -debug-info-format=dwarf` si lo creas utilizando `swift`)

El marco para tests utiliza archivos de símbolos para algunas de sus funciones, entre ellas: simbolizar fallos, informar de la localización original de los tests e informar de los propietarios de códigos. Genera automáticamente el archivo de símbolos cuando se incrustan símbolos de depuración en los binarios, pero puede tardar un poco más en cargarse.

### Deshabilitar el entorno aislado para tests de interfaz de usuario en macOS

En algunas versiones de Xcode, los paquetes de tests de interfaz de usuario se crean utilizando un entorno aislado por defecto. Los parámetros que vienen con un entorno aislado impiden que el marco para tests sea ejecutado por algunos comandos del sistema con `xcrun`, por lo que es necesario deshabilitarlo.

Deshabilita el entorno aislado añadiendo Privilegios al paquete del ejecutador de tests de interfaz de usuario y luego añadiendo `App Sandbox = NO`. También puedes crear un archivo de `.entitlement` y añadirlo a los parámetros de creación de firmas. Este archivo debe incluir el siguiente contenido:

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/getting_started/site/
[4]: /es/continuous_integration/guides/rum_swift_integration
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /es/continuous_integration/intelligent_test_runner/
[8]: /es/getting_started/tagging/unified_service_tagging
