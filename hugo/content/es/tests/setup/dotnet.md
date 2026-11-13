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
  text: Reenvío de variables de entorno para pruebas en Containers
- link: /continuous_integration/tests
  tag: Documentación
  text: Explorar resultados de pruebas y rendimiento
- link: /tests/test_impact_analysis/dotnet
  tag: Documentación
  text: Acelere sus trabajos de prueba con Test Impact Analysis
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Pruebas de .NET
type: multi-code-lang
---
## Compatibilidad {#compatibility}

Para obtener una lista de los tiempos de ejecución y plataformas compatibles, consulte [Compatibilidad con .NET Framework][18] y [Compatibilidad con .NET/.NET Core][19].

Marcos de prueba compatibles:

| Framework de prueba | Versión |
|---|---|
| xUnit | >= 2.2 |
| NUnit | >= 3.0 |
| MsTestV2 | >= 14 |
| [BenchmarkDotNet][1] | >= 0.13.2 |

## Configuración del método de reporte {#configuring-reporting-method}

Para reportar los resultados de las pruebas a Datadog, necesita configurar la biblioteca de .NET de Datadog:

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

## Instalación de la CLI del trazador de .NET {#installing-the-net-tracer-cli}

Instale o actualice el comando `dd-trace` usando una de las siguientes formas:

- Usando el SDK de .NET al ejecutar el comando:
   ```
   dotnet tool update -g dd-trace
   ```
- Al descargar la versión apropiada:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- O descargando [desde la página de versiones de GitHub][5].

## Instrumentación de pruebas {#instrumenting-tests}

<div class="alert alert-warning">Para BenchmarkDotNet siga <a href="#instrumenting-benchmarkdotnet-tests">estas instrucciones</a>.</div>

Para instrumentar su conjunto de pruebas, anteponga `dd-trace ci run` a su comando de prueba. Puede usar `--dd-service` para establecer el servicio o la biblioteca bajo prueba y `--dd-env` para establecer el entorno donde se ejecutan las pruebas. Por ejemplo:

{{< tabs >}}

{{% tab "dotnet test" %}}

Al usar <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

Al usar <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Todas las pruebas se instrumentan automáticamente.

### Compatibilidad con el paquete nuget Microsoft.CodeCoverage {#compatibility-with-microsoftcodecoverage-nuget-package}

Desde `Microsoft.CodeCoverage` versión `17.2.0`, Microsoft introdujo la [instrumentación dinámica usando `.NET CLR Profiling API`][16] habilitada de forma predeterminada solo en Windows. La instrumentación automática de Datadog depende de `.NET CLR Profiling API`. Esta API permite solo un suscriptor (por ejemplo, `dd-trace`). El uso de la instrumentación dinámica de CodeCoverage interrumpe la instrumentación automática de pruebas.

La solución es cambiar de la instrumentación dinámica a la [instrumentación estática][17]. Modifique su archivo `.runsettings` con las siguientes opciones de configuración:

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

## Configuración de ajustes {#configuration-settings}

Puede cambiar la configuración predeterminada de la CLI mediante argumentos de línea de comandos o variables de entorno. Para obtener una lista completa de los ajustes de configuración, ejecute:

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

La siguiente lista muestra los valores predeterminados para los ajustes de configuración clave:

`--dd-service` (opcional)
: Nombre del servicio o biblioteca bajo prueba.<br/>
**Variable de entorno**: `DD_SERVICE`<br/>
**Predeterminado**: El nombre del repositorio<br/>
**Ejemplo**: `my-dotnet-app`

`--dd-env` (opcional)
: Nombre del entorno donde se ejecutan las pruebas.<br/>
**Variable de entorno**: `DD_ENV`<br/>
**Predeterminado**: `none`<br/>
**Ejemplos**: `local`, `ci`

`--agent-url` (Solo cuando se usa el Datadog Agent)
: URL del Datadog Agent para la recopilación de trazas, en el formato `http://hostname:port`.<br/>
**Variable de entorno**: `DD_TRACE_AGENT_URL`<br/>
**Predeterminado**: `http://localhost:8126`

`test_session.name` (Solo disponible como variable de entorno)
: Identifica un grupo de pruebas, como `unit-tests`, `integration-tests` o `smoke-tests`.<br/>
**Variable de entorno**: `DD_TEST_SESSION_NAME`<br/>
**Predeterminado**: El nombre del trabajo de CI y el comando de prueba, o el comando de prueba si el nombre del trabajo de CI no está disponible.<br/>
**Ejemplo**: `unit-tests`, `integration-tests`, `smoke-tests`

Para obtener más información sobre las etiquetas reservadas `service` y `env`, consulte [Unified Service Tagging][6]. También se pueden usar todas las demás opciones de [configuración del trazador de Datadog][7].

### Agregar etiquetas personalizadas a las pruebas {#adding-custom-tags-to-tests}

Para agregar etiquetas personalizadas a las pruebas, primero configure [instrumentación personalizada](#custom-instrumentation).

Puede agregar etiquetas personalizadas a sus pruebas utilizando el tramo activo actual:

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test continues normally
// ...
```

Para crear filtros o `group by` campos para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Adding Tags][8] de la documentación de instrumentación personalizada de .NET.

### Agregar medidas personalizadas a las pruebas {#adding-custom-measures-to-tests}

Para agregar medidas personalizadas a las pruebas, primero configure [instrumentación personalizada](#custom-instrumentation).

Al igual que con las etiquetas, puede agregar medidas personalizadas a sus pruebas utilizando el tramo activo actual:

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test continues normally
// ...
```

Para crear filtros o visualizaciones para estas etiquetas, primero debe crear facetas. Para obtener más información sobre cómo agregar etiquetas, consulte la sección [Adding Tags][8] de la documentación de instrumentación personalizada de .NET.

Lea más sobre las medidas personalizadas en la [Guía para agregar medidas personalizadas][9].

### Reportando Code Coverage {#reporting-code-coverage}

Cuando Code Coverage está disponible, el trazador de Datadog (v2.31.0 o posterior) lo informa bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

Si está utilizando [Coverlet][10] para calcular su cobertura de código, indique la ruta al archivo de informe en la variable de entorno `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` al ejecutar `dd-trace`. El archivo de informe debe estar en formato OpenCover o Cobertura. Alternativamente, puede habilitar el cálculo de Code Coverage integrado del trazador de Datadog con la variable de entorno `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

**Nota**: Al usar Test Impact Analysis, el Code Coverage integrado del SDK se habilita de forma predeterminada.

Puede ver la evolución de Code Coverage en la pestaña {{< ui >}}Coverage{{< /ui >}} de una sesión de prueba.

Para obtener más información sobre las opciones de exclusión, consulte [Code Coverage][11].

### Instrumentación de pruebas de BenchmarkDotNet {#instrumenting-benchmarkdotnet-tests}

Para instrumentar sus pruebas de referencia, necesita:

1. Agregar el [`Datadog.Trace.BenchmarkDotNet` paquete NuGet][12] a su proyecto (por ejemplo, usando `dotnet add package Datadog.Trace.BenchmarkDotNet`).
2. Configure su proyecto para usar el exportador `Datadog.Trace.BenchmarkDotNet` usando el atributo `DatadogDiagnoser` o el método de extensión `WithDatadog()`. Por ejemplo:

{{< tabs >}}

{{% tab "Uso del atributo [DatadogDiagnoser]" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Attributes;
using Datadog.Trace.BenchmarkDotNet;

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

{{% tab "Uso de la configuración" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Running;
using Datadog.Trace.BenchmarkDotNet;

var config = DefaultConfig.Instance
              .WithDatadog();

BenchmarkRunner.Run<OperationBenchmark>(config);
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

3. [Configure el método de informe][13].
4. Ejecute el proyecto de referencia como lo hace normalmente; todas las pruebas de referencia se instrumentarán automáticamente.

{{% ci-git-metadata %}}

## Instrumentación personalizada {#custom-instrumentation}

<div class="alert alert-danger">
  <strong>Nota:</strong> La configuración de su instrumentación personalizada depende de la <code>dd-trace</code> versión. Para usar la instrumentación personalizada, debe mantener las versiones de los paquetes de <code>dd-trace</code> y <code>Datadog.Trace</code> NuGet sincronizadas.
</div>

Para usar la instrumentación personalizada en su aplicación .NET:

1. Ejecute `dd-trace --version` para obtener la versión de la herramienta.
2. Agregue el `Datadog.Trace` [paquete NuGet][14] con la misma versión a su aplicación.
3. En el código de su aplicación, acceda al rastreador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

Para obtener más información sobre cómo agregar tramos y etiquetas para instrumentación personalizada, consulte la [documentación de instrumentación personalizada de .NET][15].

## API de prueba manual {#manual-testing-api}

<div class="alert alert-danger">
  <strong>Nota:</strong> Para usar la API de pruebas manuales, debe agregar el <code>Datadog.Trace</code> paquete NuGet en el proyecto de .NET de destino.
</div>

Si utiliza XUnit, NUnit o MSTest con sus proyectos .NET, Test Optimization los instrumenta automáticamente y envía los resultados de las pruebas a Datadog. Si utiliza un marco de pruebas no compatible o si tiene un mecanismo de prueba diferente, puede utilizar la API para informar los resultados de las pruebas a Datadog.

La API se basa en tres conceptos: módulo de prueba, conjuntos de pruebas y pruebas.

### Módulo de prueba {#test-module}

Un módulo de prueba representa el ensamblado de .NET que incluye las pruebas.

Para iniciar un módulo de prueba, llame a `TestModule.Create()` y pase el nombre del módulo o el nombre del ensamblado de .NET donde se encuentran las pruebas.

Cuando todas sus pruebas hayan finalizado, llame a `module.Close()` o `module.CloseAsync()`, lo cual fuerza a la biblioteca a enviar todos los resultados de prueba restantes al backend.

### Conjuntos de pruebas {#test-suites}

Un conjunto de pruebas comprende un conjunto de pruebas. Pueden tener métodos comunes de inicialización y finalización y compartir algunas variables. En .NET, generalmente se implementan como una clase de prueba o accesorio que contiene múltiples métodos de prueba. Un conjunto de pruebas puede tener opcionalmente información adicional como atributos o información de error.

Cree conjuntos de pruebas en el módulo de prueba llamando a `module.GetOrCreateSuite()` y pasando el nombre del conjunto de pruebas.

Llame a `suite.Close()` cuando todas las pruebas relacionadas en el conjunto hayan finalizado su ejecución.

### Pruebas {#tests}

Cada prueba se ejecuta dentro de un conjunto de pruebas y debe terminar en uno de estos tres estados: `TestStatus.Pass`, `TestStatus.Fail` o `TestStatus.Skip`.

Una prueba puede tener opcionalmente información adicional como:

- Parámetros
- Atributos
- Información de error
- Características de la prueba
- Datos de referencia

Cree pruebas en un conjunto de pruebas llamando a `suite.CreateTest()` y pasando el nombre de la prueba. Cuando una prueba finalice, llame a `test.Close()` con uno de los estados predefinidos.

### Ejemplo de código {#code-example}

El siguiente código representa un uso simple de la API:

{{< code-block lang="csharp" >}}
using System.Reflection;
using Datadog.Trace.Ci;

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

Llame siempre a `module.Close()` o `module.CloseAsync()` al final para que todos los datos de prueba se envíen a Datadog.

## Mejores prácticas {#best-practices}

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

- `dotnet test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recomienda usar `DD_TEST_SESSION_NAME` si sus comandos de prueba varían entre ejecuciones.

## Lecturas adicionales {#further-reading}

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