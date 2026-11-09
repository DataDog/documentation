---
aliases:
- /es/continuous_integration/setup_tests/java
- /es/continuous_integration/tests/java
- /es/continuous_integration/tests/setup/java
code_lang: java
code_lang_weight: 10
further_reading:
- link: /tests/containers/
  tag: Documentación
  text: Reenvío de variables de entorno para pruebas en Containers
- link: /tests/explorer
  tag: Documentación
  text: Explorar resultados de pruebas y rendimiento
- link: /tests/flaky_test_management/early_flake_detection
  tag: Documentación
  text: Detectar la inestabilidad de la prueba con Early Flake Detection
- link: /tests/flaky_test_management/auto_test_retries
  tag: Documentación
  text: Reintentar pruebas fallidas con Auto Test Retries
- link: /tests/correlate_logs_and_tests
  tag: Documentación
  text: Correlacionar registros y trazas de prueba
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Pruebas de Java
type: multi-code-lang
---
## Compatibilidad {#compatibility}

Marcos de prueba compatibles:

| Framework de prueba | Versión |
|---|---|
| JUnit 4 | >= 4.10 |
| JUnit 5 | >= 5.3 |
| TestNG | >= 6.4 |
| Spock | >= 2.0 |
| Cucumber | >= 5.4.0 |
| Karate | >= 1.0.0 |
| Scalatest | >= 3.0.8 |
| Scala MUnit | >= 0.7.28 |
| Scala Weaver | >= 0.8.4 (Solo al usar SBT como sistema de compilación) |

Si su framework de prueba no es compatible, puede intentar instrumentar sus pruebas usando [Manual Testing API][1].

Sistemas de compilación compatibles:

| Sistema de compilación | Versión |
|---|---|
| Gradle | >= 2.0 |
| Maven | >= 3.2.1 |
| Bazel | >= 1.2.0 |

<div class="alert alert-info">Si utiliza Bazel para ejecutar pruebas de Java, utilice las <a href="/tests/setup/bazel/java/">reglas de Datadog para Bazel en pruebas de Java</a>.</div>

Otros sistemas de compilación, como Ant o SBT, son compatibles con las siguientes limitaciones:
- La configuración y los informes automáticos de cobertura no son compatibles.
- Al compilar un proyecto de varios módulos, cada módulo se informa en una traza independiente.

### Android {#android}

Las pruebas de Android que se ejecutan en la JVM son compatibles. Las pruebas que dependen de la API de Android, como las pruebas de Espresso, las pruebas de Compose UI y algunas pruebas unitarias, solo son compatibles con el framework [Robolectric][11].

Las pruebas que requieren un emulador o un dispositivo físico no son compatibles.

## Configuración {#setup}

Puede seguir los pasos de configuración interactiva en el [sitio de Datadog][2] o las instrucciones a continuación.

La configuración del rastreador de Java de Datadog varía según su proveedor de CI.

{{< tabs >}}
{{% tab "Proveedor de CI con soporte para instrumentación automática" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Otro proveedor de CI en la nube" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "Proveedor de CI local" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

### Descarga del SDK {#downloading-sdk}

Solo necesita descargar el SDK una vez por cada servidor.

Si el SDK ya está disponible localmente en el servidor, puede proceder directamente a ejecutar las pruebas.

Declare la variable `DD_TRACER_FOLDER` con la ruta a la carpeta donde desea almacenar el JAR del rastreador descargado:

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

Ejecute el siguiente comando para descargar el JAR del SDK en la carpeta especificada:

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

Puede ejecutar el comando `java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` para verificar la versión del SDK.

### Ejecución de sus pruebas {#running-your-tests}

Establezca estas variables antes de iniciar el proceso de prueba. Para ejecutores de pruebas en paralelo, establézcalas en el proceso principal para que cada trabajador las herede.

Primero, establezca las siguientes variables de entorno obligatorias para su herramienta de compilación:

{{< tabs >}}
{{% tab "Maven" %}}

`DD_TRACER_FOLDER` (Obligatorio)
: Ruta a la carpeta donde se encuentra el Java Tracer descargado.

`MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Obligatorio)
: Inyecta el SDK en el proceso de compilación de Maven.

{{% /tab %}}
{{% tab "Gradle" %}}

`DD_TRACER_FOLDER` (Obligatorio)
: Ruta a la carpeta donde se encuentra el Java Tracer descargado.

`GRADLE_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Obligatorio)
: Inyecta el SDK en el proceso de inicio de Gradle.

{{% /tab %}}
{{% tab "SBT" %}}

`DD_TRACER_FOLDER` (Obligatorio)
: Ruta a la carpeta donde se encuentra el Java Tracer descargado.

`SBT_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Obligatorio)
: Inyecta el SDK en las JVM que ejecutan sus pruebas.

{{% /tab %}}
{{% tab "Otro" %}}

`DD_TRACER_FOLDER` (Obligatorio)
: Ruta a la carpeta donde se encuentra el Java Tracer descargado.

`JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Obligatorio)
: Inyecta el SDK en las JVM que ejecutan sus pruebas.

{{% /tab %}}
{{< /tabs >}}

Luego, establezca las siguientes variables de entorno comunes para configurar el SDK y su método de generación de informes:

`DD_CIVISIBILITY_ENABLED=true` (Obligatorio)
: Habilita Test Optimization.<br/>
**Predeterminado**: `false`

`DD_ENV` (Opcional)
: Nombre del entorno donde se ejecutan las pruebas.<br/>
**Predeterminado**: `(empty)`<br/>
**Ejemplos**: `local`, `ci`

`DD_SERVICE` (Opcional)
: Nombre del servicio o biblioteca bajo prueba.<br/>
**Predeterminado**: `unnamed-java-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Requerido para el modo Agentless)
: Habilita el modo Agentless para enviar los resultados de las pruebas directamente a Datadog.<br/>
**Predeterminado**: `false`

`DD_API_KEY` (Requerido para el modo Agentless)
: La clave de Datadog API utilizada para autenticar la carga de resultados de prueba. Esta variable no habilita el modo Agentless.<br/>
**Predeterminado**: `(empty)`

`DD_SITE` (Opcional para el modo Agentless)
: El [sitio de Datadog][4] al cual cargar los resultados de las pruebas. Establezca esta configuración cuando utilice un sitio distinto a US1.<br/>
**Predeterminado**: `datadoghq.com`

`DD_TRACE_AGENT_URL` (Solo cuando se utiliza el Datadog Agent)
: URL del Datadog Agent para la recopilación de trazas, en el formato `http://hostname:port`.<br/>
**Predeterminado**: `http://localhost:8126`

`DD_TEST_SESSION_NAME` (Opcional)
: Identifica un grupo de pruebas, como `unit-tests`, `integration-tests` o `smoke-tests`.<br/>
**Predeterminado**: El nombre del trabajo de CI y el comando de prueba, o el comando de prueba si el nombre del trabajo de CI no está disponible.<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

Ejecute sus pruebas como lo hace normalmente (por ejemplo: `mvn test`, `mvn verify`, `./gradlew clean test` o `sbt test`).

## Configuración {#configuration}

Los valores de configuración predeterminados funcionan bien en la mayoría de los casos.

Sin embargo, para personalizar el comportamiento del SDK, se pueden utilizar las opciones de [configuración del SDK de Datadog][3].

### Recopilación de metadatos de Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## Extensiones {#extensions}

El SDK expone un conjunto de API que se pueden utilizar para ampliar su funcionalidad mediante programación.

### Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests}

{{< tabs >}}
{{% tab "API de OpenTelemetry" %}}

Para agregar etiquetas personalizadas, incluya la biblioteca [opentelemetry-api][1] como una dependencia de tiempo de compilación y establezca `dd.trace.otel.enabled` (propiedad del sistema) o `DD_TRACE_OTEL_ENABLED` (variable de entorno) en `true`.

Luego puede agregar etiquetas personalizadas a sus pruebas utilizando el tramo activo:

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test_owner", "my_team");
// test continues normally
// ...
```

Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Adding Tags][2] de la documentación de instrumentación personalizada de Java.

[1]: https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-api
[2]: /es/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{% tab "API de OpenTracing" %}}

Para agregar etiquetas personalizadas, incluya la biblioteca [opentracing-util][1] como una dependencia de tiempo de compilación en su proyecto.

Luego puede agregar etiquetas personalizadas a sus pruebas utilizando el tramo activo:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// test continues normally
// ...
```

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas.

Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Adding Tags][2] de la documentación de instrumentación personalizada de Java.

[1]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util
[2]: /es/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{< /tabs >}}

### Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests}

Al igual que con las etiquetas, puede agregar medidas personalizadas a sus pruebas utilizando el tramo activo actual:

{{< tabs >}}
{{% tab "API de OpenTelemetry" %}}

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test.memory.usage", 1e8);
// test continues normally
// ...
```

{{% /tab %}}
{{% tab "API de OpenTracing" %}}

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

{{% /tab %}}
{{< /tabs >}}

Para obtener más información sobre las medidas personalizadas, consulte la [Guía para agregar medidas personalizadas][6].

### Uso de la API de prueba manual {#using-manual-testing-api}

Si utiliza uno de los marcos de prueba compatibles, el rastreador de Java instrumenta automáticamente sus pruebas y envía los resultados al backend de Datadog.

Si está utilizando un marco que no es compatible, o una solución de prueba ad-hoc, puede aprovechar la API de prueba manual, que también informa los resultados de las pruebas al backend.

Para utilizar la API de prueba manual, agregue la biblioteca [`dd-trace-api`][7] como una dependencia de tiempo de compilación a su proyecto.

#### Modelo de dominio {#domain-model}

La API se basa en cuatro conceptos: sesión de prueba, módulo de prueba, conjunto de pruebas y prueba.

##### Sesión de prueba {#test-session}

Una sesión de prueba representa una compilación de proyecto, que normalmente corresponde a la ejecución de un comando de prueba emitido por un usuario o por un script de CI.

Para iniciar una sesión de prueba, llame a `datadog.trace.api.civisibility.CIVisibility#startSession` y pase el nombre del proyecto y el nombre del marco de pruebas que utilizó.

Cuando todas sus pruebas hayan terminado, llame a `datadog.trace.api.civisibility.DDTestSession#end`, lo cual obliga a la biblioteca a enviar todos los resultados de prueba restantes al backend.

##### Módulo de prueba {#test-module}

Un módulo de prueba representa una unidad de trabajo más pequeña dentro de una compilación de proyecto, que normalmente corresponde a un módulo de proyecto. Por ejemplo, un submódulo de Maven o un subproyecto de Gradle.

Para iniciar un modo de prueba, llame a `datadog.trace.api.civisibility.DDTestSession#testModuleStart` y pase el nombre del módulo.

Cuando el módulo haya terminado de compilarse y probarse, llame a `datadog.trace.api.civisibility.DDTestModule#end`.

##### Conjunto de pruebas {#test-suite}

Un conjunto de pruebas comprende un grupo de pruebas que comparten una funcionalidad común.
Pueden compartir una inicialización y una finalización comunes, y también pueden compartir algunas variables.
Un solo conjunto de pruebas suele corresponder a una clase de Java que contiene casos de prueba.

Cree conjuntos de pruebas en un módulo de prueba llamando a `datadog.trace.api.civisibility.DDTestModule#testSuiteStart` y pasando el nombre del conjunto de pruebas.

Llame a `datadog.trace.api.civisibility.DDTestSuite#end` cuando todas las pruebas relacionadas en el conjunto de pruebas hayan finalizado su ejecución.

##### Prueba {#test}

Una prueba representa una sola incidencia de prueba que se ejecuta como parte de un conjunto de pruebas.
Por lo general, corresponde a un método que contiene lógica de prueba.

Cree pruebas en un conjunto de pruebas llamando a `datadog.trace.api.civisibility.DDTestSuite#testStart` y pasando el nombre de la prueba.

Llame a `datadog.trace.api.civisibility.DDTest#end` cuando una prueba haya terminado su ejecución en el conjunto de pruebas.

#### Ejemplo de código {#code-example}

El siguiente código representa un uso simple de la API:

```java
package com.datadog.civisibility.example;

import datadog.trace.api.civisibility.CIVisibility;
import datadog.trace.api.civisibility.DDTest;
import datadog.trace.api.civisibility.DDTestModule;
import datadog.trace.api.civisibility.DDTestSession;
import datadog.trace.api.civisibility.DDTestSuite;
import java.lang.reflect.Method;

// the null arguments in the calls below are optional startTime/endTime values:
// when they are not specified, current time is used
public class ManualTest {
    public static void main(String[] args) throws Exception {
        DDTestSession testSession = CIVisibility.startSession("my-project-name", "my-test-framework", null);
        testSession.setTag("my-tag", "additional-session-metadata");
        try {
            runTestModule(testSession);
        } finally {
            testSession.end(null);
        }
    }

    private static void runTestModule(DDTestSession testSession) throws Exception {
        DDTestModule testModule = testSession.testModuleStart("my-module", null);
        testModule.setTag("my-module-tag", "additional-module-metadata");
        try {
            runFirstTestSuite(testModule);
            runSecondTestSuite(testModule);
        } finally {
            testModule.end(null);
        }
    }

    private static void runFirstTestSuite(DDTestModule testModule) throws Exception {
        DDTestSuite testSuite = testModule.testSuiteStart("my-suite", ManualTest.class, null);
        testSuite.setTag("my-suite-tag", "additional-suite-metadata");
        try {
            runTestCase(testSuite);
        } finally {
            testSuite.end(null);
        }
    }

    private static void runTestCase(DDTestSuite testSuite) throws Exception {
        Method myTestCaseMethod = ManualTest.class.getDeclaredMethod("myTestCase");
        DDTest ddTest = testSuite.testStart("myTestCase", myTestCaseMethod, null);
        ddTest.setTag("my-test-case-tag", "additional-test-case-metadata");
        ddTest.setTag("my-test-case-tag", "more-test-case-metadata");
        try {
            myTestCase();
        } catch (Exception e) {
            ddTest.setErrorInfo(e); // pass error info to mark test case as failed
        } finally {
            ddTest.end(null);
        }
    }

    private static void myTestCase() throws Exception {
        // run some test logic
    }

    private static void runSecondTestSuite(DDTestModule testModule) {
        DDTestSuite secondTestSuite = testModule.testSuiteStart("my-second-suite", ManualTest.class, null);
        secondTestSuite.setSkipReason("this test suite is skipped"); // pass skip reason to mark test suite as skipped
        secondTestSuite.end(null);
    }
}
```

Llame siempre a ``datadog.trace.api.civisibility.DDTestSession#end`` al final para que toda la información de la prueba se envíe a Datadog.

## Mejores prácticas {#best-practices}

### Representación determinista de los parámetros de prueba {#deterministic-test-parameters-representation}

Test Optimization funciona mejor cuando los [parámetros de prueba son deterministas][8] y permanecen iguales entre las ejecuciones de prueba.
Si una incidencia de prueba tiene un parámetro que varía entre las ejecuciones de prueba (como una fecha actual, un número aleatorio o una instancia de una clase cuyo método `toString()` no se ha sobrescrito), es posible que algunas de las funciones del producto no funcionen como se espera.
Por ejemplo, es posible que el historial de ejecuciones no esté disponible o que el caso de prueba no se clasifique como inestable incluso si muestra inestabilidad.

La mejor manera de solucionar esto es asegurarse de que los parámetros de prueba sean los mismos entre las ejecuciones de prueba.

En JUnit 5, esto también se puede solucionar [personalizando la representación de cadena de los parámetros de prueba][9] sin cambiar sus valores.
Para hacerlo, utilice la interfaz `org.junit.jupiter.api.Named` o cambie el parámetro `name` de la anotación `org.junit.jupiter.params.ParameterizedTest`:

```java
@ParameterizedTest
@MethodSource("namedArguments")
void parameterizedTest(String s, Date d) {
   // The second parameter in this test case is non-deterministic.
   // In the argument provider method it is wrapped with Named to ensure it has a deterministic name.
}

static Stream<Arguments> namedArguments() {
    return Stream.of(
            Arguments.of(
                    "a string",
                    Named.of("current date", new Date())),
            Arguments.of(
                    "another string",
                    Named.of("a date in the future", new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(1))))
    );
}
```

```java
@ParameterizedTest(name = "[{index}] {0}, a random number from one to ten")
@MethodSource("randomArguments")
void anotherParameterizedTest(String s, int i) {
  // The second parameter in this test case is non-deterministic.
  // The name of the parameterized test is customized to ensure it has a deterministic name.
}

static Stream<Arguments> randomArguments() {
    return Stream.of(
            Arguments.of("a string", ThreadLocalRandom.current().nextInt(10) + 1),
            Arguments.of("another string", ThreadLocalRandom.current().nextInt(10) + 1)
    );
}
```

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

- `mvn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda usar `DD_TEST_SESSION_NAME` si sus comandos de prueba varían entre ejecuciones.

## Solución de problemas {#troubleshooting}

### Las pruebas no aparecen en Datadog después de habilitar Test Optimization en el SDK {#the-tests-are-not-appearing-in-datadog-after-enabling-test-optimization-in-the-sdk}

Verifique que el SDK esté inyectado en su proceso de compilación examinando los registros de su compilación.
Si la inyección es exitosa, puede ver una línea que contiene `DATADOG TRACER CONFIGURATION`.
Si la línea no está allí, asegúrese de que las variables de entorno utilizadas para inyectar y configurar el SDK estén disponibles para el proceso de compilación.
Un error común es establecer las variables en un paso de compilación y ejecutar las pruebas en otro paso de compilación. Este enfoque puede no funcionar si las variables no se propagan entre los pasos de compilación.

Asegúrese de estar utilizando la versión más reciente del SDK.

Verifique que su sistema de compilación y su marco de pruebas sean compatibles con Test Optimization. Consulte la lista de [sistemas de compilación y marcos de pruebas compatibles](#compatibility).

Asegúrese de que la propiedad `dd.civisibility.enabled` (o la variable de entorno `DD_CIVISIBILITY_ENABLED`) esté establecida en `true` en los argumentos del SDK.

Intente ejecutar su compilación con el registro de depuración del rastreador habilitado estableciendo la variable de entorno `DD_TRACE_DEBUG` en `true`.
Verifique la salida de la compilación en busca de errores que indiquen una configuración incorrecta del rastreador, como una variable de entorno `DD_API_KEY` no establecida.

### Las pruebas o la compilación del código fuente fallan al compilar un proyecto con el SDK adjunto {#tests-or-source-code-compilation-fails-when-building-a-project-with-the-sdk-attached}

De forma predeterminada, Test Optimization ejecuta la compilación de código Java con un complemento de compilador adjunto.

El complemento es opcional, ya que solo sirve para reducir la sobrecarga de rendimiento.

Dependiendo de la configuración de compilación, agregar el complemento a veces puede interrumpir el proceso de compilación.

Si el complemento interfiere con la compilación, desactívelo agregando `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` a la lista `-javaagent` de argumentos
(o configurando la variable de entorno `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED=false`).

### Las compilaciones fallan porque no se puede encontrar el artefacto dd-javac-plugin-client {#builds-fails-because-dd-javac-plugin-client-artifact-cannot-be-found}

Es posible que el complemento del compilador de Java inyectado en la compilación no esté disponible si la compilación utiliza un almacenamiento de Artifactory personalizado o si se ejecuta en modo sin conexión.

Si este es el caso, puede deshabilitar la inyección del complemento agregando `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` a la lista `-javaagent` de argumentos
(o configurando la variable de entorno `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED` en false).

El complemento es opcional, ya que solo sirve para reducir la sobrecarga de rendimiento.

### Las pruebas fallan al compilar un proyecto con el SDK adjunto {#tests-fail-when-building-a-project-with-the-sdk-attached}

En algunos casos, adjuntar el SDK puede interrumpir las pruebas, especialmente si ejecutan aserciones sobre el estado interno de la JVM o instancias de clases de bibliotecas de terceros.

Aunque el mejor enfoque en tales casos es actualizar las pruebas, también existe una opción más rápida que consiste en deshabilitar las integraciones de bibliotecas de terceros del SDK.

Las integraciones proporcionan información adicional sobre lo que ocurre en el código probado y son especialmente útiles en las pruebas de integración, para hacer un seguimiento de aspectos como las solicitudes HTTP o las llamadas a bases de datos.
Están habilitadas de forma predeterminada.

Para deshabilitar una integración específica, consulte la tabla [Datadog Tracer Compatibility][10] para obtener los nombres de las propiedades de configuración relevantes.
Por ejemplo, para deshabilitar la integración de solicitudes de cliente `OkHttp3`, agregue `dd.integration.okhttp-3.enabled=false` a la lista `-javaagent` de argumentos.

Para deshabilitar todas las integraciones, aumente la lista `-javaagent` de argumentos con `dd.trace.enabled=false` (o configure la variable de entorno `DD_TRACE_ENABLED=false`).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #using-manual-testing-api
[2]: https://app.datadoghq.com/ci/setup/test?language=java
[3]: /es/tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: /es/getting_started/site/
[6]: /es/tests/guides/add_custom_measures/?tab=java
[7]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[8]: /es/tests/#parameterized-test-configurations
[9]: https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests-display-names
[10]: /es/tracing/trace_collection/compatibility/java#integrations
[11]: https://robolectric.org/getting-started/