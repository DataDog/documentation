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
- link: /continuous_integration/intelligent_test_runner/dotnet
  tag: Documentación
  text: Acelerar tus tests con Intelligent Test Runner
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Tests de .NET
type: multi-code-lang
---

## Compatibilidad

Marcos compatibles:

| Marco | Versión |
|---|---|
| .NET Framework | >= 4.6.1 |
| .NET Core | >= 2.1 |
| .NET Core | >= 3.1 |
| .NET | >= 5 |
| .NET | >= 6 |
| .NET | >= 7 |
| .NET | >= 8 |

Marcos de test compatibles:

| Marco de test | Versión |
|---|---|
| xUnit | >= 2.2 |
| NUnit | >= 3.0 |
| MsTestV2 | >= 14 |
| [BenchmarkDotNet][1] | >= 0.13.2 |

## Configuración del método de informe

Para informar resultados de test a Datadog, debes configurar la librería de Datadog .NET:

{{< tabs >}}
{{% tab "Github Actions" %}}
Puedes usar la [acción de Datadog Test Visibility Github][1] dedicada para activar la visibilidad de test.
Si lo haces, el resto de los pasos de configuración a continuación pueden omitirse.

[1]: https://github.com/marketplace/actions/configure-datadog-test-visibility
{{% /tab %}}

{{% tab "Jenkins" %}}
Puedes usar [la configuración basada en interfaz de usuario][1] para activar la Visibilidad de test para tus trabajos y pipelines.
Si lo haces, el resto de los pasos de configuración a continuación pueden omitirse.

[1]: /es/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1
{{% /tab %}}

{{% tab "Other cloud CI provider" %}}
<div class="alert alert-info">El modo sin Agent está disponible en las versiones de librería de Datadog .NET >= 2.5.1</div>
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Instalación de la CLI del rastreador de .NET

Instala o actualiza el comando `dd-trace` de una de las siguientes maneras:

- Uso del SDK de .NET al ejecutar el comando:
   ```
   dotnet tool update -g dd-trace
   ```
- Descargando la versión apropiada:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- O descargando [desde la página de versiones de GitHub][5].

## Instrumentación de tests

<div class="alert alert-danger"><strong>Nota</strong>: Para BenchmarkDotNet sigue <a href="#instrumenting-benchmarkdotnet-tests">estas instrucciones</a>.</div>

Para instrumentar tu conjunto de tests, antepone a tu comando de test `dd-trace ci run`, proporcionando el nombre de servicio o biblioteca en proceso de test como el parámetro `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env`. Por ejemplo:

{{< tabs >}}

{{% tab "dotnet test" %}}

Con <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

Con <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
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
                  <!-- Cambio a la instrumentación estática (la instrumentación dinámica colapsa cn la instrumentación dd-trace) -->
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

Para más información sobre etiquetas reservadas `service` y `env`, consulta [etiquetado de servicios unificado][6]. También se pueden utilizar todas las demás opciones de [configuración del rastreador de Datadog][7].

### Añadir etiquetas personalizadas a los tests

Para añadir etiquetas personalizadas a los tests, configura la [instrumentación personalizada](#custom-instrumentation) primero.

Puedes añadir etiquetas personalizadas a tus tests con el tramo activo en ese momento:

```csharp
// dentro de tu test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test sigue con normalidad
// ...
```

Para crear filtros o campos `group by` para estas etiquetas, primero debes crear facetas. Para obtener más información sobre la adición de etiquetas, consulta la sección [Adición de etiquetas][8] de la documentación de instrumentación personalizada de .NET.

### Añadir medidas personalizadas a los tests

Para añadir medidas personalizadas a los tests, configura la [instrumentación personalizada](#custom-instrumentation) primero.

Al igual que con las etiquetas, puedes añadir medidas personalizadas a tus tests utilizando el tramo activo en ese momento:

```csharp
// dentro de tu test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test sigue normalmente
// ...
```

Para crear filtros o visualizaciones para estas etiquetas, primero debes crear facetas. Para obtener más información sobre la adición de etiquetas, consulta la sección [Adición de etiquetas][8] de la documentación de instrumentación personalizada de .NET.

Más información sobre las medidas personalizadas en la [guía para añadir medidas personalizadas][9].

### Informar sobre la cobertura del código

Cuando la cobertura del código está disponible, el rastreador de Datadog (v2.31.0 o posterior) informa de ella en la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

Si utilizas [Coverlet][10] para calcular la cobertura del código, indica la ruta del archivo de informe en la variable de entorno `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` al ejecutar `dd-trace`. El archivo de informe debe estar en los formatos OpenCover o Cobertura. Alternativamente, puedes activar el cálculo de cobertura del código integrado del rastreador de Datadog con la variable de entorno `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

**Nota**: Cuando se utiliza Intelligent Test Runner, la cobertura del código integrada en el rastreador está activada de forma predeterminada.

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
 <strong>Nota:</strong> Tu configuración de instrumentación personalizada depende de la versión <code>dd-trace</code>. Para utilizar la instrumentación personalizada, debes mantener sincronizadas las versiones del paquete para <code>dd-trace</code> y <code>Datadog.Trace</code> de NuGet.
</div>

Para utilizar la instrumentación personalizada en tu aplicación .NET:

1. Ejecuta `dd-trace --version` para obtener la versión de la herramienta.
2. Añade el [paquete de NuGet][14] `Datadog.Trace` con la misma versión a tu aplicación.
3. En tu código de aplicación, accede al rastreador global por medio de la propiedad de `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

Para más información sobre cómo añadir tramos y etiquetas para la instrumentación personalizada, consulta la [documentación de instrumentación personalizada de .NET][15].

## API para tests manuales

<div class="alert alert-danger">
 <strong>Nota:</strong> Para utilizar la API de tests manuales, debes añadir el paquete de NuGet <code>Datadog.Trace</code> en el proyecto .NET de destino.
</div>

Si utilizas XUnit, NUnit o MSTest con tus proyectos de .NET, CI Visibility los instrumenta automáticamente y envía los resultados de los tests a Datadog. Si utilizas un marco de test no compatible o si tienes un mecanismo de test diferente, puedes utilizar la API para informar de los resultados de los tests a Datadog.

La API se basa en tres conceptos: módulo de test, conjuntos de tests y tests.

### Módulo de test

Un módulo de test representa el ensamblado de .NET que incluye los tests.

Para iniciar un módulo de test, llama a `TestModule.Create()` y pasa el nombre del módulo o el nombre del ensamblado de .NET donde se encuentran los tests.

Cuando todos tus tests hayan finalizado, llama a `module.Close()` o `module.CloseAsync()`, lo que obliga a la librería a enviar todos los resultados de los tests restantes al backend.

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

### API de interfaz

{{< code-block lang="csharp" >}}
namespace Datadog.Trace.Ci
{
    /// <summary>
    /// CI Visibility test module
    /// </summary>
    public sealed class TestModule
    {
        /// <summary>
        /// Gets the test framework
        /// </summary>
        public string? Framework { get; }
        /// <summary>
        /// Gets the module name
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Gets the test module start date
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <remarks>Use CloseAsync() version whenever possible.</remarks>
        public void Close() { }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <remarks>Use CloseAsync() version whenever possible.</remarks>
        /// <param name="duration">Duration of the test module</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <returns>Task instance </returns>
        public System.Threading.Tasks.Task CloseAsync() { }
        /// <summary>
        /// Close test module
        /// </summary>
        /// <param name="duration">Duration of the test module</param>
        /// <returns>Task instance </returns>
        public System.Threading.Tasks.Task CloseAsync(System.TimeSpan? duration) { }
        /// <summary>
        /// Create a new test suite for this session
        /// </summary>
        /// <param name="name">Name of the test suite</param>
        /// <returns>Test suite instance</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name) { }
        /// <summary>
        /// Create a new test suite for this session
        /// </summary>
        /// <param name="name">Name of the test suite</param>
        /// <param name="startDate">Test suite start date</param>
        /// <returns>Test suite instance</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name, System.DateTimeOffset? startDate) { }
        /// <summary>
        /// Set Error Info from Exception
        /// </summary>
        /// <param name="exception">Exception instance</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Set Error Info
        /// </summary>
        /// <param name="type">Error type</param>
        /// <param name="message">Error message</param>
        /// <param name="callStack">Error callstack</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Sets a number tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Sets a string tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// Create a new Test Module
        /// </summary>
        /// <param name="name">Test module name</param>
        /// <returns>New test module instance</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name) { }
        /// <summary>
        /// Create a new Test Module
        /// </summary>
        /// <param name="name">Test module name</param>
        /// <param name="framework">Testing framework name</param>
        /// <param name="frameworkVersion">Testing framework version</param>
        /// <returns>New test module instance</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion) { }
        /// <summary>
        /// Create a new Test Module
        /// </summary>
        /// <param name="name">Test module name</param>
        /// <param name="framework">Testing framework name</param>
        /// <param name="frameworkVersion">Testing framework version</param>
        /// <param name="startDate">Test session start date</param>
        /// <returns>New test module instance</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion, System.DateTimeOffset startDate) { }
    }

    /// <summary>
    /// CI Visibility test suite
    /// </summary>
    public sealed class TestSuite
    {
        /// <summary>
        /// Gets the test module for this suite
        /// </summary>
        public Datadog.Trace.Ci.TestModule Module { get; }
        /// <summary>
        /// Gets the test suite name
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// Gets the test suite start date
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Close test suite
        /// </summary>
        public void Close() { }
        /// <summary>
        /// Close test suite
        /// </summary>
        /// <param name="duration">Duration of the test suite</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// Create a new test for this suite
        /// </summary>
        /// <param name="name">Name of the test</param>
        /// <returns>Test instance</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name) { }
        /// <summary>
        /// Create a new test for this suite
        /// </summary>
        /// <param name="name">Name of the test</param>
        /// <param name="startDate">Test start date</param>
        /// <returns>Test instance</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name, System.DateTimeOffset startDate) { }
        /// <summary>
        /// Set Error Info from Exception
        /// </summary>
        /// <param name="exception">Exception instance</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Set Error Info
        /// </summary>
        /// <param name="type">Error type</param>
        /// <param name="message">Error message</param>
        /// <param name="callStack">Error callstack</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Sets a number tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Sets a string tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, string? value) { }
    }

    /// <summary>
    /// CI Visibility test
    /// </summary>
    public sealed class Test
    {
        /// <summary>
        /// Gets the test name
        /// </summary>
        public string? Name { get; }
        /// <summary>
        /// Gets the test start date
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// Gets the test suite for this test
        /// </summary>
        public Datadog.Trace.Ci.TestSuite Suite { get; }
        /// <summary>
        /// Add benchmark data
        /// </summary>
        /// <param name="measureType">Measure type</param>
        /// <param name="info">Measure info</param>
        /// <param name="statistics">Statistics values</param>
        public void AddBenchmarkData(Datadog.Trace.Ci.BenchmarkMeasureType measureType, string info, in Datadog.Trace.Ci.BenchmarkDiscreteStats statistics) { }
        /// <summary>
        /// Close test
        /// </summary>
        /// <param name="status">Test status</param>
        public void Close(Datadog.Trace.Ci.TestStatus status) { }
        /// <summary>
        /// Close test
        /// </summary>
        /// <param name="status">Test status</param>
        /// <param name="duration">Duration of the test suite</param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration) { }
        /// <summary>
        /// Close test
        /// </summary>
        /// <param name="status">Test status</param>
        /// <param name="duration">Duration of the test suite</param>
        /// <param name="skipReason">In case </param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration, string? skipReason) { }
        /// <summary>
        /// Set benchmark metadata
        /// </summary>
        /// <param name="hostInfo">Host info</param>
        /// <param name="jobInfo">Job info</param>
        public void SetBenchmarkMetadata(in Datadog.Trace.Ci.BenchmarkHostInfo hostInfo, in Datadog.Trace.Ci.BenchmarkJobInfo jobInfo) { }
        /// <summary>
        /// Set Error Info from Exception
        /// </summary>
        /// <param name="exception">Exception instance</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// Set Error Info
        /// </summary>
        /// <param name="type">Error type</param>
        /// <param name="message">Error message</param>
        /// <param name="callStack">Error callstack</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// Set Test parameters
        /// </summary>
        /// <param name="parameters">TestParameters instance</param>
        public void SetParameters(Datadog.Trace.Ci.TestParameters parameters) { }
        /// <summary>
        /// Sets a number tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// Sets a string tag into the test
        /// </summary>
        /// <param name="key">Key of the tag</param>
        /// <param name="value">Value of the tag</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// Set Test method info
        /// </summary>
        /// <param name="methodInfo">Test MethodInfo instance</param>
        public void SetTestMethodInfo(System.Reflection.MethodInfo methodInfo) { }
        /// <summary>
        /// Set Test traits
        /// </summary>
        /// <param name="traits">Traits dictionary</param>
        public void SetTraits(System.Collections.Generic.Dictionary<string, System.Collections.Generic.List<string>> traits) { }
    }

    /// <summary>
    /// Test status
    /// </summary>
    public enum TestStatus
    {
        /// <summary>
        /// Pass test status
        /// </summary>
        Pass = 0,
        /// <summary>
        /// Fail test status
        /// </summary>
        Fail = 1,
        /// <summary>
        /// Skip test status
        /// </summary>
        Skip = 2,
    }

    /// <summary>
    /// Test parameters
    /// </summary>
    public class TestParameters
    {
        /// <summary>
        /// Gets or sets the test arguments
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Arguments { get; set; }
        /// <summary>
        /// Gets or sets the test parameters metadata
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Metadata { get; set; }
    }

    /// <summary>
    /// Benchmark measurement discrete stats
    /// </summary>
    public readonly struct BenchmarkDiscreteStats
    {
        /// <summary>
        /// Kurtosis value
        /// </summary>
        public readonly double Kurtosis;
        /// <summary>
        /// Max value
        /// </summary>
        public readonly double Max;
        /// <summary>
        /// Mean value
        /// </summary>
        public readonly double Mean;
        /// <summary>
        /// Median value
        /// </summary>
        public readonly double Median;
        /// <summary>
        /// Min value
        /// </summary>
        public readonly double Min;
        /// <summary>
        /// Number of samples
        /// </summary>
        public readonly int N;
        /// <summary>
        /// 90 percentile value
        /// </summary>
        public readonly double P90;
        /// <summary>
        /// 95 percentile value
        /// </summary>
        public readonly double P95;
        /// <summary>
        /// 99 percentile value
        /// </summary>
        public readonly double P99;
        /// <summary>
        /// Skewness value
        /// </summary>
        public readonly double Skewness;
        /// <summary>
        /// Standard deviation value
        /// </summary>
        public readonly double StandardDeviation;
        /// <summary>
        /// Standard error value
        /// </summary>
        public readonly double StandardError;
        /// <summary>
        /// Initializes a new instance of the <see cref="BenchmarkDiscreteStats"/> struct.
        /// </summary>
        /// <param name="n">Number of samples</param>
        /// <param name="max">Max value</param>
        /// <param name="min">Min value</param>
        /// <param name="mean">Mean value</param>
        /// <param name="median">Median value</param>
        /// <param name="standardDeviation">Standard deviation value</param>
        /// <param name="standardError">Standard error value</param>
        /// <param name="kurtosis">Kurtosis value</param>
        /// <param name="skewness">Skewness value</param>
        /// <param name="p99">99 percentile value</param>
        /// <param name="p95">95 percentile value</param>
        /// <param name="p90">90 percentile value</param>
        public BenchmarkDiscreteStats(int n, double max, double min, double mean, double median, double standardDeviation, double standardError, double kurtosis, double skewness, double p99, double p95, double p90) { }
        /// <summary>
        /// Get benchmark discrete stats from an array of doubles
        /// </summary>
        /// <param name="values">Array of doubles</param>
        /// <returns>Benchmark discrete stats instance</returns>
        public static Datadog.Trace.Ci.BenchmarkDiscreteStats GetFrom(double[] values) { }
    }

    /// <summary>
    /// Benchmark host info
    /// </summary>
    public struct BenchmarkHostInfo
    {
        /// <summary>
        /// Chronometer Frequency
        /// </summary>
        public double? ChronometerFrequencyHertz;
        /// <summary>
        /// Chronometer resolution
        /// </summary>
        public double? ChronometerResolution;
        /// <summary>
        ///  Logical core count
        /// </summary>
        public int? LogicalCoreCount;
        /// <summary>
        /// OS Version
        /// </summary>
        public string? OsVersion;
        /// <summary>
        /// Physical core count
        /// </summary>
        public int? PhysicalCoreCount;
        /// <summary>
        /// Physical processor count
        /// </summary>
        public int? ProcessorCount;
        /// <summary>
        /// Processor max frequency hertz
        /// </summary>
        public double? ProcessorMaxFrequencyHertz;
        /// <summary>
        /// Processor Name
        /// </summary>
        public string? ProcessorName;
        /// <summary>
        /// Runtime version
        /// </summary>
        public string? RuntimeVersion;
    }

    /// <summary>
    /// Benchmark job info
    /// </summary>
    public struct BenchmarkJobInfo
    {
        /// <summary>
        /// Job description
        /// </summary>
        public string? Description;
        /// <summary>
        /// Job platform
        /// </summary>
        public string? Platform;
        /// <summary>
        /// Job runtime moniker
        /// </summary>
        public string? RuntimeMoniker;
        /// <summary>
        /// Job runtime name
        /// </summary>
        public string? RuntimeName;
    }

    /// <summary>
    /// Benchmark measure type
    /// </summary>
    public enum BenchmarkMeasureType
    {
        /// <summary>
        /// Duration in nanoseconds
        /// </summary>
        Duration = 0,
        /// <summary>
        /// Run time in nanoseconds
        /// </summary>
        RunTime = 1,
        /// <summary>
        /// Mean heap allocations in bytes
        /// </summary>
        MeanHeapAllocations = 2,
        /// <summary>
        /// Total heap allocations in bytes
        /// </summary>
        TotalHeapAllocations = 3,
        /// <summary>
        /// Application launch in nanoseconds
        /// </summary>
        ApplicationLaunch = 4,
        /// <summary>
        /// Garbage collector gen0 count
        /// </summary>
        GarbageCollectorGen0 = 5,
        /// <summary>
        /// Garbage collector gen1 count
        /// </summary>
        GarbageCollectorGen1 = 6,
        /// <summary>
        /// Garbage collector gen2 count
        /// </summary>
        GarbageCollectorGen2 = 7,
        /// <summary>
        /// Memory total operations count
        /// </summary>
        MemoryTotalOperations = 8,
    }
}
{{< /code-block >}}

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
