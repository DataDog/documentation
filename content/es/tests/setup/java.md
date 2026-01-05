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
  text: Reenvío de variables de entorno para tests en contenedores
- link: /tests/explorer
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /tests/early_flake_detection
  tag: Documentación
  text: Detección de defectos en test con Early Flake Detection
- link: /tests/auto_test_retries
  tag: Documentación
  text: Reintento de casos de tests fallidos con Auto Test Retries
- link: /tests/correlate_logs_and_tests
  tag: Documentación
  text: Correlacionar logs y trazas
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Tests de Java
type: multi-code-lang
---

## Compatibilidad

Marcos para tests compatibles:

| Marco para tests | Versión |
|---|---|
| JUnit 4 | >= 4.10 |
| JUnit 5 | >= 5.3 |
| TestNG | >= 6.4 |
| Spock | >= 2.0 |
| Cucumber | >= 5.4.0 |
| Karate | >= 1.0.0 |
| Scalatest | >= 3.0.8 |
| Scala MUnit | >= 0.7.28 |

Si tu marco de test no es compatible, puedes intentar instrumentar tus tests con la [API de test manual][1].

Sistemas de compilación compatibles:

| Sistema de compilación | Versión |
|---|---|
| Gradle | >= 2.0 |
| Maven | >= 3.2.1 |

Otros sistemas de compilación, como Ant o Bazel, son compatibles con las siguientes limitaciones:
- No se admite la configuración ni la elaboración de informes de cobertura automática.
- Cuando se compila un proyecto multimódulo, cada módulo se informa en una traza (trace) separada.

## Configuración

Puedes seguir los pasos de configuración interactiva en el [sitio de Datadog][2] o las instrucciones que figuran a continuación.

La configuración del rastreador de Datadog Java varía en función de tu proveedor de CI.

{{< tabs >}}
{{% tab "Github Actions" %}}
Puedes utilizar la [acción de Datadog Test Visibility Github][1] dedicada para activar la Visibilidad de tests.
Si lo haces, puedes omitir los pasos **Descargar biblioteca del rastreador** y **Ejecutar tus tests** a continuación.

[1]: https://github.com/marketplace/actions/configure-datadog-test-visibility
{{% /tab %}}

{{% tab "Jenkins" %}}
Puedes usar la [configuración basada en la interfaz de usuario][1] para habilitar la Visibilidad de tests para tus trabajos y pipelines.
Si lo haces, puedes omitir los pasos "Descargar biblioteca del rastreador" y "Ejecutar tus tests" a continuación.

[1]: /es/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1
{{% /tab %}}

{{% tab "Other cloud CI provider" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "On-Premises CI Provider" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

### Descarga de la librería del rastreador

Solo tienes que descargar la librería de rastreador una vez para cada servidor.

Si la librería del rastreador ya está disponible localmente en el servidor, puedes proceder directamente a ejecutar los tests.

Declara la variable `DD_TRACER_FOLDER` con la ruta a la carpeta donde deseas almacenar el JAR del rastreador descargado:

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

Ejecuta el siguiente comando para descargar el JAR del rastreador a la carpeta especificada:

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

Puedes ejecutar el comando `java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` para comprobar la versión de la librería del rastreador.

### Ejecutar tus tests

{{< tabs >}}
{{% tab "Maven" %}}

Establece las siguientes variables de entorno para configurar el rastreador:

`DD_CIVISIBILITY_ENABLED=true` (Obligatorio)
: activa el producto de CI Visibility.

`DD_ENV` (Obligatorio)
: entorno donde se ejecutan los tests (por ejemplo: `local` cuando se ejecutan tests en una estación de trabajo de desarrollador o `ci` cuando se ejecutan en un proveedor de CI).

`DD_SERVICE` (Obligatorio)
: nombre de servicio o biblioteca que se está comprobando.

`DD_TRACER_FOLDER` (Obligatorio)
: ruta a la carpeta donde se encuentra el rastreador de Java descargado.

`MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Obligatorio)
: inyecta el rastreador en el proceso de compilación de Maven.

Ejecuta tus tests como lo haces normalmente (por ejemplo: `mvn test` o `mvn verify`).

{{% /tab %}}
{{% tab "Gradle" %}}

Asegúrate de establecer la variable `DD_TRACER_FOLDER` en la ruta donde has descargado el rastreador.

Ejecuta tus tests utilizando la propiedad del sistema `org.gradle.jvmargs` para especificar la ruta al JAR del rastreador de Datadog Java.

Al especificar los argumentos del rastreador, incluye lo siguiente:

* Habilita CI Visibility estableciendo la propiedad `dd.civisibility.enabled` en `true`.
* Define el entorno en el que se ejecutan los tests utilizando la propiedad `dd.env` (por ejemplo: `local` cuando se ejecutan test en una estación de trabajo de desarrollador o `ci` cuando se ejecutan en un proveedor de CI).
* Define el nombre del servicio o la librería que se está comprobando en la propiedad `dd.service`.

Por ejemplo:

{{< code-block lang="shell" >}}
./gradlew cleanTest test -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

La especificación de `org.gradle.jvmargs` en la línea de comandos anula el valor especificado en otro lugar. Si tienes esta propiedad especificada en un archivo `gradle.properties`, asegúrate de replicar los ajustes necesarios en la invocación de la línea de comandos.

{{% /tab %}}
{{% tab "Other" %}}

Establece las siguientes variables de entorno para configurar el rastreador:

`DD_CIVISIBILITY_ENABLED=true` (Obligatorio)
: activa la visibilidad de test.

`DD_ENV` (Obligatorio)
: entorno donde se ejecutan los tests (por ejemplo: `local` cuando se ejecutan tests en una estación de trabajo de desarrollador o `ci` cuando se ejecutan en un proveedor de CI).

`DD_SERVICE` (Obligatorio)
: nombre de servicio o biblioteca que se está comprobando.

`DD_TRACER_FOLDER` (Obligatorio)
: ruta a la carpeta donde se encuentra el rastreador de Java descargado.

`JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Obligatorio)
: inyecta el rastreador en las JVMs que ejecutan tus tests.

Ejecuta tus tests como lo haces normalmente.

{{% /tab %}}
{{< /tabs >}}

## Configuración

Los valores por defecto de configuración funcionan bien en la mayoría de los casos.

Sin embargo, si es necesario ajustar el comportamiento del rastreador, se pueden utilizar las opciones [de configuración del rastreador de Datadog][3].

### Recopilación de metadatos Git

{{% ci-git-metadata %}}

## Extensiones

El rastreador expone un conjunto de APIs que pueden utilizarse para ampliar su funcionalidad mediante programación.

### Añadir etiquetas personalizadas a los tests

Para añadir etiquetas personalizadas, incluye la librería [opentracing-util][4] como una dependencia de tiempo de compilación en tu proyecto.

A continuación, puedes añadir etiquetas personalizadas a tus tests mediante el tramo activo:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// dentro de tu test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// test sigue normalmente
// ...
```

Para crear filtros o campos `group by` para estas etiquetas, primero debes crear facetas.

Para más información sobre cómo añadir etiquetas, consulta la sección [Añadir etiquetas][5] de la documentación de instrumentación personalizada de Java.

### Añadir medidas personalizadas a los tests

Al igual que con las etiquetas, puedes añadir medidas personalizadas a tus tests utilizando el tramo activo en ese momento:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// dentro de tu test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// el test continúa normalmente
// ...
```

Para obtener más información sobre las medidas personalizadas, consulta la [guía para Añadir medidas personalizadas][6].

### Uso de la API de tests manuales

Si utilizas uno de los marcos de test compatibles, el rastreador de Java instrumentará automáticamente tus tests y enviará los resultados al backend de Datadog.

Si utilizas un marco que no es compatible o una solución de tests ad hoc, puedes aprovechar la API de test manual, que también informa de los resultados de los tests al backend.

Para utilizar la API de test manual, añade la librería [`dd-trace-api`][7] como dependencia de tiempo de compilación en tu proyecto.

#### Modelo de dominio

La API se basa en cuatro conceptos: sesión de tests, módulo de test, conjuntos de tests y tests.

##### Sesión de tests

Una sesión de tests representa una compilación del proyecto, que normalmente corresponde a la ejecución de un comando de test emitido por un usuario o por un script de CI.

Para iniciar una sesión de test, llama a `datadog.trace.api.civisibility.CIVisibility#startSession` y pasa el nombre del proyecto y el nombre del marco de tests que has utilizado.

Cuando todos tus tests hayan finalizado, llama a `datadog.trace.api.civisibility.DDTestSession#end`, que obliga a la librería a enviar todos los resultados de los tests restantes al backend.

##### Módulo de test

Un módulo de test representa una unidad de trabajo más pequeña dentro de la compilación de un proyecto, que suele corresponder a un módulo del proyecto. Por ejemplo, un submódulo de Maven o un subproyecto de Gradle.

Para iniciar un modo de test, llama a `datadog.trace.api.civisibility.DDTestSession#testModuleStart` y pasa el nombre del módulo.

Cuando el módulo haya terminado de complilarse y probarse, llama a `datadog.trace.api.civisibility.DDTestModule#end`.

##### Conjunto de tests

Un conjunto de tests comprende un grupo de tests que comparten una funcionalidad común.
Pueden compartir una inicialización y un desmontaje comunes, y también pueden compartir algunas variables.
Un único conjunto suele corresponder a una clase de Java que contiene casos de tests.

Crea conjuntos de tests en un módulo de tests llamando a `datadog.trace.api.civisibility.DDTestModule#testSuiteStart` y pasando el nombre del conjunto de tests.

Llama a `datadog.trace.api.civisibility.DDTestSuite#end` cuando todos los tests relacionados en el conjunto hayan finalizado su ejecución.

##### Test

Un test representa un único caso de test que se ejecuta como parte de un conjunto de tests.
Suele corresponder a un método que contiene la lógica de test.

Crea tests en un conjunto llamando a `datadog.trace.api.civisibility.DDTestSuite#testStart` y pasando el nombre del test.

Llama a `datadog.trace.api.civisibility.DDTest#end` cuando un test haya finalizado su ejecución.

#### Ejemplo de código

El siguiente código representa un uso sencillo de la API:

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

Llama siempre a ``datadog.trace.api.civisibility.DDTestSession#end`` al final para que toda la información del test se envíe a Datadog.

## Prácticas recomendadas

### Representación determinista de los parámetros de test

La visibilidad de test funciona mejor cuando los [parámetros de test son deterministas][8] y permanecen invariables entre las ejecuciones de test.
Si un caso de test tiene un parámetro que varía entre las ejecuciones del test (como una fecha actual, un número aleatorio o una instancia de una clase cuyo método `toString()` no se sobrescribe), es posible que algunas de las funciones del producto no funcionen como se espera.
Por ejemplo, puede que el historial de ejecuciones no esté disponible, o que el caso de test no se clasifique como defectuoso aunque lo sea.

La mejor forma de solucionar este problema es asegurarse de que los parámetros de test son los mismos en todas las ejecuciones de tests.

En JUnit 5, esto también puede solucionarse [personalizando la representación de cadena de los parámetros de test][9] sin cambiar sus valores.
Para ello, utiliza la interfaz `org.junit.jupiter.api.Named` o cambia el parámetro `name` de la anotación `org.junit.jupiter.params.ParameterizedTest`:

```java
@ParameterizedTest
@MethodSource("namedArguments")
void parameterizedTest(String s, Date d) {
   // El segundo parámetro en este caso de test no es determinista.
   // En el método de proveedor de argumentos se encierra en Nombre para asegurar que tenga un nombre determinista.
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
  // El segundo parámetro de este caso de test no es determinista.
// El nombre del test parametrizado se personaliza para asegurar que tiene un nombre determinista.
}

static Stream<Arguments> randomArguments() {
    return Stream.of(
            Arguments.of("a string", ThreadLocalRandom.current().nextInt(10) + 1),
            Arguments.of("another string", ThreadLocalRandom.current().nextInt(10) + 1)
    );
}
```

## Solucionar problemas

### Los tests no aparecen en Datadog después de activar CI Visibility en el rastreador

Comprueba que el rastreador se ha inyectado en tu proceso de compilación examinando tus logs de compilación.
Si la inyección se ha realizado correctamente, podrás ver una línea que contiene `DATADOG TRACER CONFIGURATION`.
Si la línea no está ahí, asegúrate de que las variables de entorno utilizadas para inyectar y configurar el trazador están disponibles para el proceso de compilación.
Un error común es establecer las variables en un paso de compilación y ejecutar los tests en otro paso de compilación. Este enfoque puede no funcionar si las variables no se propagan entre los pasos de compilación.

Asegúrate de que estás utilizando la última versión del rastreador.

Comprueba que tu sistema de compilación y tu marco de test son compatibles con CI Visibility. Consulta la lista de [sistemas de compilación y marcos de test compatibles](#compatibility).

Asegúrate de que la propiedad `dd.civisibility.enabled` (o la variable de entorno `DD_CIVISIBILITY_ENABLED`) se establece en `true` en los argumentos del rastreador.

Prueba ejecutar la compilación con el registro de depuración del rastreador activado, estableciendo la variable de entorno `DD_TRACE_DEBUG` en `true`.
Comprueba la salida de la compilación para cualquier error que indique una mala configuración del rastreador, como una variable de entorno `DD_API_KEY` no configurada.

### Los tests o la compilación del código fuente fallan cuando se compila un proyecto con el rastreador conectado

Por defecto, CI Visibility ejecuta la compilación de código Java con un complemento de compilador adjunto.

El complemento es opcional, ya que solo sirve para reducir la sobrecarga de rendimiento.

Según la configuración de la compilación, añadir el complemento puede a veces interrumpir el proceso de compilación.

Si el complemento interfiere con la compilación, desactívalo añadiendo `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` a lista de los argumentos `-javaagent` 
(o configurando la variable de entorno `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED=false`).

### La compilación falla porque no se encuentra el artefacto dd-javac-plugin-client

Es posible que el complemento del compilador de Java no esté disponible si la compilación utiliza un almacenamiento de artefactos personalizado o si se ejecuta en modo sin conexión.

Si este es el caso, puedes desactivar la inyección de complemento añadiendo `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` a la lista de los argumentos `-javaagent`
(o estableciendo la variable de entorno `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED` en false).

El complemento es opcional, ya que solo sirve para reducir la sobrecarga de rendimiento.

### Los tests fallan cuando se compila un proyecto con el rastreador conectado

En algunos casos, adjuntar el rastreador puede romper los tests, especialmente si ejecutan aserciones sobre el estado interno de la JVM o instancias de clases de librerías de terceros.

Aunque en estos casos lo mejor es actualizar los tests, también existe la opción más rápida de desactivar las integraciones de librería de terceros del rastreador.

Las integraciones proporcionan información adicional sobre lo que ocurre en el código probado y es especialmente útil en los tests de integración, para monitorizar cosas como solicitudes HTTP o llamadas a bases de datos.
Están activadas por defecto.

Para desactivar una integración específica, consulta la tabla de [Compatibilidad del rastreador de Datadog][10] para los nombres de propiedades de la configuración relevantes.
Por ejemplo, para desactivar la integración de solicitud del cliente `OkHttp3`, añade `dd.integration.okhttp-3.enabled=false` a la lista de argumentos `-javaagent`.

Para desactivar todas las integraciones, aumenta la lista de la variable de entorno `-javaagent` arguments with `dd.trace.enabled=false` (or set `DD_TRACE_ENABLED=false`).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: #using-manual-testing-api
[2]: https://app.datadoghq.com/ci/setup/test?language=java
[3]: /es/tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util
[5]: /es/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[6]: /es/tests/guides/add_custom_measures/?tab=java
[7]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[8]: /es/tests/#parameterized-test-configurations
[9]: https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests-display-names
[10]: /es/tracing/trace_collection/compatibility/java#integrations
