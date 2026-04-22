---
aliases:
- /es/continuous_integration/setup_tests/dotnet
- /es/continuous_integration/tests/dotnet
- /es/continuous_integration/tests/setup/dotnet
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentación
  text: Reenvío de variables de entorno para tests en contenedores
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /tests/test_impact_analysis/dotnet
  tag: Documentación
  text: Acelerar tus tests con Test Impact Analysis
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de Test Optimization
title: Tests de .NET
type: multi-code-lang
---

## Compatibilidad

Para obtener una lista de los tiempos de ejecución y las plataformas compatibles, consulta [Compatibilidad con .NET Framework][18] y [Compatibilidad con .NET/.NET Core][19].

Frameworks para tests compatibles:

| Framework para tests | Versión |
|---|---|
| xUnit | >= 2.2 |
| NUnit | >= 3.0 |
| MsTestV2 | >= 14 |
| [BenchmarkDotNet][1] | >= 0.13.2 |

## Configuración del método de notificación

Para informar de los resultados de tests a Datadog, debes configurar la biblioteca .NET de Datadog:

{{< tabs >}}

{{% tab "Proveedor de CI con compatibilidad para la instrumentación automática" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Otro proveedor de CI en la nube" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "Proveedor de CI on-premises" %}}
{{% ci-agent %}}
{{% /tab %}}

{{< /tabs >}}

## Instalación de la CLI del rastreador .NET

Instala o actualiza el comando `dd-trace` de una de las siguientes maneras:

- Con el SDK de .NET ejecutando el comando:
   ```
   dotnet tool update -g dd-trace
   ```
- Descargando la versión adecuada:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- O descargándolo [de la página de la versión de GitHub][5].

## Instrumentación de tests

<div class="alert alert-warning">Para BenchmarkDotNet sigue <a href="#instrumenting-benchmarkdotnet-tests">estas instrucciones</a>.</div>

Para instrumentar tu conjunto de tests, antepone a tu comando de test `dd-trace ci run`, proporcionando el nombre de servicio o biblioteca en proceso de test como el parámetro `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env`. Por ejemplo:

{{< tabs >}}

{{% tab "dotnet test" %}}

Con <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

Con <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Todos los tests se instrumentan automáticamente.

### Compatibilidad con el paquete nuget de Microsoft.CodeCoverage

Desde la versión `17.2.0` de `Microsoft.CodeCoverage`, Microsoft introdujo la [instrumentación dinámica con la `.NET CLR Profiling API`][16] habilitada por defecto solo en Windows. La instrumentación automática de Datadog se basa en la `.NET CLR Profiling API`. Esta API solo permite un suscriptor (por ejemplo, `dd-trace`). El uso de la instrumentación dinámica de CodeCoverage rompe la instrumentación de test automática.

La solución es cambiar de instrumentación dinámica a [instrumentación estática][17]. Modifica tu archivo `.runsettings` con los siguientes mandos de configuración:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="Code Coverage">
              <Configuration>
                <CodeCoverage>
                  <!-- Switching to static instrumentation (dynamic instrumentation collides with dd-trace instrumentation) -->
                  <EnableStaticManagedInstrumentation>True</EnableStaticManagedInstrumentation>
                  <EnableDynamicManagedInstrumentation>False</EnableDynamicManagedInstrumentation>
                  <UseVerifiableInstrumentation>False</UseVerifiableInstrumentation>
                  <EnableStaticNativeInstrumentation>True</EnableStaticNativeInstrumentation>
                  <EnableDynamicNativeInstrumentation>False</EnableDynamicNativeInstrumentation>
                  ...
                </CodeCoverage>
              </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

## Ajustes de configuración

Puedes cambiar la configuración predeterminada de la CLI utilizando argumentos de línea de comandos o variables de entorno. Para obtener una lista completa de los ajustes de configuración, ejecuta:

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

En la siguiente lista, se muestran los valores por defecto de los ajustes de configuración clave:

`--dd-service`
: nombre del servicio o biblioteca en proceso de test.<br/>
**Variable de entorno **: `DD_SERVICE`<br/>
**Por defecto**: el nombre del repositorio<br/>
**Ejemplo**: `my-dotnet-app`

`--dd-env`
: nombre del entorno donde se están ejecutando los tests.<br/>
**Variable de entorno **: `DD_ENV`<br/>
**Por defecto**: `none`<br/>
**Ejemplos**: `local`, `ci`

`--agent-url`
: URL del Datadog Agent para la recopilación de trazas con el formato `http://hostname:port`.<br/>
**Variable de entorno**: `DD_TRACE_AGENT_URL`<br/>
**Por defecto**: `http://localhost:8126`

`test_session.name` (solo disponible como variable de entorno)
: Identifica un grupo de tests, como `integration-tests`, `unit-tests` o `smoke-tests`.<br/>
**Variable de entorno**: `DD_TEST_SESSION_NAME`<br/>
**Por defecto**: (nombre del trabajo CI (genérico) + comando de test)<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

Para más información sobre etiquetas reservadas `service` y `env`, consulta [etiquetado de servicios unificado][6]. También se pueden utilizar todas las demás opciones de [configuración del rastreador de Datadog][7].

### Añadir etiquetas (tags) personalizadas a los tests

Para añadir etiquetas personalizadas a los tests, configura la [instrumentación personalizada](#custom-instrumentation) primero.

Puedes añadir etiquetas personalizadas a tus tests con el tramo activo en ese momento:

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test continues normally
// ...
```

Para crear filtros o campos `group by` para estas etiquetas, primero debes crear facetas. Para obtener más información sobre la adición de etiquetas, consulta la sección [Adición de etiquetas][8] de la documentación de instrumentación personalizada de .NET.

### Añadir medidas personalizadas a los tests

Para añadir medidas personalizadas a los tests, configura la [instrumentación personalizada](#custom-instrumentation) primero.

Al igual que con las etiquetas, puedes añadir medidas personalizadas a tus tests utilizando el tramo activo en ese momento:

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test continues normally
// ...
```

Para crear filtros o visualizaciones para estas etiquetas, primero debes crear facetas. Para obtener más información sobre la adición de etiquetas, consulta la sección [Adición de etiquetas][8] de la documentación de instrumentación personalizada de .NET.

Más información sobre las medidas personalizadas en la [guía para añadir medidas personalizadas][9].

### Informar sobre la cobertura del código

Cuando la cobertura del código está disponible, el rastreador de Datadog (v2.31.0 o posterior) informa de ella en la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

Si utilizas [Coverlet][10] para calcular la cobertura del código, indica la ruta del archivo de informe en la variable de entorno `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` al ejecutar `dd-trace`. El archivo de informe debe estar en los formatos OpenCover o Cobertura. Alternativamente, puedes activar el cálculo de cobertura del código integrado del rastreador de Datadog con la variable de entorno `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

**Nota**: Cuando se utiliza Test Impact Analysis, la cobertura de código integrada en el rastreador está activada por defecto.

Puedes ver la evolución de la cobertura de los tests en la pestaña **Coverage** (Cobertura) de una sesión de tests.

Para más información sobre las opciones de exclusión, consulta [Cobertura del código][11].

### Instrumentación de los tests de BenchmarkDotNet

Para instrumentar tus tests de referencia, debes hacer lo siguiente:

1. Añade el [paquete NuGet `Datadog.Trace.BenchmarkDotNet`][12] a tu proyecto (por ejemplo, con `dotnet add package Datadog.Trace.BenchmarkDotNet`).
2. Configura tu proyecto para utilizar el exportador `Datadog.Trace.BenchmarkDotNet` con el atributo `DatadogDiagnoser` o el método de extensión `WithDatadog()`. Por ejemplo:

{{< tabs >}}

{{% tab "Using the [DatadogDiagnoser] Attribute" %}}
{{< code-block lang="csharp" >}}
con BenchmarkDotNet.Attributes;
con Datadog.Trace.BenchmarkDotNet;

[DatadogDiagnoser]
[MemoryDiagnoser]
public class OperationBenchmark
{
    [Benchmark]
    public void Operation()
    {
        // ...
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Using the Configuration" %}}
{{< code-block lang="csharp" >}}
con BenchmarkDotNet.Configs;
con BenchmarkDotNet.Running;
con Datadog.Trace.BenchmarkDotNet;

var config = DefaultConfig.Instance
              .WithDatadog();

BenchmarkRunner.Run<OperationBenchmark>(config);
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

3. [Configuración del método de notificación][13].
4. Ejecuta el proyecto de referencia como lo haces normalmente, todos los tests de referencia se instrumentarán automáticamente.

{{% ci-git-metadata %}}

## Instrumentación personalizada

<div class="alert alert-danger">
  <strong>Nota:</strong> La configuración de su instrumentación personalizada depende de la versión de <code>dd-trace</code>. Para usar la instrumentación personalizada, debes mantener las versiones del paquete para <code>dd-trace</code> y los paquetes NuGet <code>Datadog.Trace</code> sincronizados.
</div>

Para utilizar la instrumentación personalizada en tu aplicación .NET:

1. Ejecuta `dd-trace --version` para obtener la versión de la herramienta.
2. Añade el [paquete de NuGet][14] `Datadog.Trace` con la misma versión a tu aplicación.
3. En tu código de aplicación, accede al rastreador global a través de la propiedad de `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

Para más información sobre cómo añadir tramos y etiquetas para la instrumentación personalizada, consulta la [documentación de instrumentación personalizada de .NET][15].

## API para tests manuales

<div class="alert alert-danger">
  <strong>Nota:</strong> Para usar la API de test manual, debes agregar el paquete NuGet <code>Datadog.Trace</code> en el proyecto .NET de destino.
</div>

Si utilizas XUnit, NUnit o MSTest con tus proyectos .NET, Test Optimization los instrumenta automáticamente y envía los resultados de los tests a Datadog. Si utilizas un framework no compatible o si tienes un mecanismo de test diferente, puedes utilizar la API para informar de los resultados de los tests a Datadog.

La API se basa en tres conceptos: módulo de test, conjuntos de tests y tests.

### Módulo de test

Un módulo de test representa el ensamblado de .NET que incluye los tests.

Para iniciar un módulo de test, llama a `TestModule.Create()` y pasa el nombre del módulo o el nombre del ensamblado de .NET donde se encuentran los tests.

Cuando todos tus tests hayan finalizado, llama a `module.Close()` o `module.CloseAsync()`, lo que obliga a la biblioteca a enviar todos los resultados de los tests restantes al backend.

### Conjuntos de tests

Un conjunto de tests comprende un grupo de tests. Pueden tener métodos comunes de inicialización y desmontaje y compartir algunas variables. En .NET, suelen implementarse como una clase de test o fixture que contiene varios métodos de test. Un conjunto de tests puede tener opcionalmente información adicional como atributos o información de error.

Crea conjuntos de tests en el módulo de test llamando a `module.GetOrCreateSuite()` y pasando el nombre del conjunto de tests.

Llama a `suite.Close()` cuando todos los tests relacionados en el conjunto hayan finalizado su ejecución.

### Tests

Cada test se ejecuta dentro de un conjunto y debe terminar en uno de estos tres estados: `TestStatus.Pass`, `TestStatus.Fail` o `TestStatus.Skip`.

Un test puede tener opcionalmente información adicional como:

- Parámetros
- Atributos
- Información sobre errores
- Rasgos de test
- Datos de referencia

Crea tests en un conjunto llamando a `suite.CreateTest()` y pasando el nombre del test. Cuando un test finaliza, llama a `test.Close()` con uno de los estados predefinidos.

### Ejemplo de código

El siguiente código representa un uso sencillo de la API:

{{< code-block lang="csharp" >}}
con System.Reflection;
con Datadog.Trace.Ci;

var module = TestModule.Create(Assembly.GetExecutingAssembly().GetName().Name ?? "(dyn_module)");
module.SetTag("ModuleTag", "Value");

var suite = module.GetOrCreateSuite("MySuite");
suite.SetTag("SuiteTag", 42);

var test = suite.CreateTest("Test01");
test.SetTag("TestTag", "Value");
test.SetParameters(new TestParameters
{
    Arguments = new Dictionary<string, object>
    {
        ["a"] = 42,
        ["b"] = 0,
    }
});
test.SetTraits(new Dictionary<string, List<string>>
{
    ["Category"] = new () { "UnitTest" }
});

try
{
    var a = 42;
    var b = 0;
    var c = a / b;
}
catch (Exception ex)
{
    test.SetErrorInfo(ex);
}

test.Close(TestStatus.Fail);
suite.Close();
await module.CloseAsync();
{{< /code-block >}}

Llama siempre a `module.Close()` o `module.CloseAsync()` al final para que todos los datos del test se envíen a Datadog.

## Prácticas recomendadas

### Nombre de la sesión de test `DD_TEST_SESSION_NAME`

Utiliza `DD_TEST_SESSION_NAME` para definir el nombre de la sesión de test y del grupo de tests relacionado. Algunos ejemplos de valores para esta etiqueta serían:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si no se especifica `DD_TEST_SESSION_NAME`, el valor por defecto utilizado es una combinación de:

- Nombre del trabajo CI
- Comando utilizado para ejecutar los tests (como `yarn test`)

El nombre de la sesión de test debe ser único dentro de un repositorio para ayudar a distinguir diferentes grupos de tests.

#### Cuándo utilizar `DD_TEST_SESSION_NAME`

Hay un conjunto de parámetros que Datadog comprueba para establecer la correspondencia entre las sesiones de test. El comando de test utilizado para ejecutar los tests es uno de ellos. Si el comando de test contiene una cadena que cambia en cada ejecución, como una carpeta temporal, Datadog considera que las sesiones no están relacionadas entre sí. Por ejemplo:

- `dotnet test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda utilizar `DD_TEST_SESSION_NAME` si tus comandos de test varían entre diferentes ejecuciones.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/continuous_integration/tests/setup/dotnet/?tab=onpremisesciproviderdatadogagent#instrumenting-benchmarkdotnet-tests
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /es/getting_started/tagging/unified_service_tagging
[7]: /es/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[8]: /es/tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[9]: /es/tests/guides/add_custom_measures/?tab=net
[10]: https://github.com/coverlet-coverage/coverlet
[11]: /es/continuous_integration/tests/code_coverage/?tab=net
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /es/continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://www.nuget.org/packages/Datadog.Trace
[15]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[16]: https://github.com/microsoft/codecoverage/blob/main/docs/instrumentation.md
[17]: https://github.com/microsoft/codecoverage/blob/main/samples/Calculator/scenarios/scenario07/README.md
[18]: /es/tracing/trace_collection/compatibility/dotnet-framework/
[19]: /es/tracing/trace_collection/compatibility/dotnet-core/