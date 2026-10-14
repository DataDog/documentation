---
description: Configure las Feature Flags de Datadog para aplicaciones .NET.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /tracing/trace_collection/dd_libraries/dotnet-core/
  tag: Documentación
  text: Tracing de .NET
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de marcadores del lado del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de trazas de APM para Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
title: Feature Flags de .NET
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación .NET con el Datadog Feature Flags SDK. El SDK de .NET se integra con [OpenFeature][1], un estándar abierto para la gestión de Feature Flags, y utiliza el Datadog .NET tracer (`dd-trace-dotnet`) para recibir actualizaciones de Feature Flags desde la CDN gestionada o Agent Remote Configuration.

A partir de la versión 3.54.0 del Datadog .NET tracer, las nuevas instalaciones cargan la configuración de los Feature Flags desde la CDN gestionada por Datadog de forma predeterminada. Esta guía explica cómo instalar el SDK, crear un cliente de OpenFeature y evaluar Feature Flags en su aplicación.

<div class="alert alert-warning">En la versión 3.54.0, el modo sin Agent solo cambia la configuración de los Feature Flags. Los eventos de exposición a experimentos aún requieren un Agent local compatible o un relé de telemetría; no se admite la alternativa directa de Event Platform Proxy (EVP). Las métricas de evaluación requieren una ruta de exportación de OpenTelemetry configurada por separado. Sin una ruta de telemetría, solo funcionan la entrega de configuración y la evaluación de Feature Flags local.</div>

## Requisitos previos {#prerequisites}

Para la entrega de configuración sin Agent, instale el Datadog .NET tracer versión **3.54.0 o posterior** y `Datadog.FeatureFlags.OpenFeature` versión **2.3.1 o posterior**. El Datadog .NET tracer debe cargarse con [instrumentación automática][8]; instalar solo el proveedor de OpenFeature no es suficiente. No se requiere un Datadog Agent independiente para obtener la configuración de los Feature Flags.

Establezca estas variables de entorno en el proceso de la aplicación antes del inicio:

{{< code-block lang="bash" >}}
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Utilice una [API key][5] de Datadog y el sitio que aloja su organización, como `datadoghq.com`. No se requiere la habilitación de Feature Flags ni la configuración de la fuente para una nueva instalación. Inicialice el proveedor de OpenFeature de Datadog en su aplicación para comenzar el sondeo; instalar o inicializar el Datadog .NET tracer por sí solo no inicia el sondeo de la CDN. Las evaluaciones utilizan la configuración almacenada en caché localmente y no realizan solicitudes de red.

Las métricas de evaluación de Feature Flags utilizan una canalización de OpenTelemetry configurada por separado; habilitar la entrega por CDN no configura la exportación de métricas. Consulte [Configurar métricas de evaluación de Feature Flags del lado del servidor][6] y [Gráficos de Feature Flags][7].

### Utilice Agent Remote Configuration {#use-agent-remote-configuration}

Para la entrega basada en Agent, utilice Datadog Agent 7.55 o posterior con [Remote Configuration][2] habilitado y una API key configurada en el Agent. Las versiones mínimas del Datadog .NET tracer son 3.36.0 para .NET 6+ y 3.38.0 para .NET Framework 4.6.2+.

Con el Datadog .NET tracer 3.54.0 o posterior, seleccione la fuente explícitamente:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Las versiones anteriores del Datadog .NET tracer utilizan `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`. En la versión 3.54.0, esta configuración obsoleta conserva Remote Configuration cuando no se proporciona ni la nueva configuración de habilitación ni una fuente explícita. Para migrar, elimine la configuración heredada, configure las credenciales de la aplicación arriba y establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` si ya selecciona una fuente explícitamente. `DD_FEATURE_FLAGS_ENABLED=false` deshabilita Feature Flags independientemente de la fuente seleccionada.

Consulte [Configuration Sources][9] para obtener información sobre el sondeo, el tiempo de espera de la solicitud, el punto de conexión personalizado y la configuración de migración. El intervalo de sondeo predeterminado sin agente es de 30 segundos, el tiempo de espera de la solicitud es de 5 segundos y la inicialización del proveedor espera hasta 30 segundos para la primera configuración.

## Instalación {#installation}

Instale el Datadog [.NET SDK][3] y el [OpenFeature SDK][4] mediante NuGet:

{{< code-block lang="bash" >}}
dotnet add package Datadog.FeatureFlags.OpenFeature
dotnet add package OpenFeature
{{< /code-block >}}

O agréguelos a su archivo `.csproj`:

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="Datadog.FeatureFlags.OpenFeature" />
  <PackageReference Include="OpenFeature" />
</ItemGroup>
{{< /code-block >}}

Si habilita las métricas de evaluación de marcadores, también debe instalar el SDK de OpenTelemetry y el exportador OTLP:

{{< code-block lang="bash" >}}
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
{{< /code-block >}}

O agréguelos a su archivo `.csproj`:

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="OpenTelemetry" />
  <PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" />
</ItemGroup>
{{< /code-block >}}

## Inicializar el SDK {#initialize-the-sdk}

Registre el proveedor de Datadog OpenFeature con la API de OpenFeature. El proveedor activa la fuente de configuración seleccionada en el Datadog .NET tracer.

### Inicialización bloqueante {#blocking-initialization}

Use `SetProviderAsync` con `await` para bloquear la evaluación hasta que se reciba la configuración inicial de marcador. Esto asegura que los marcadores estén listos antes de que su aplicación comience a manejar solicitudes.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
{{< /code-block >}}

### Inicialización no bloqueante {#non-blocking-initialization}

Use `SetProvider` para registrar el proveedor sin esperar. Las evaluaciones de marcadores devuelven valores predeterminados hasta que se recibe la configuración.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
// Flag evaluations return defaults until configuration is received
{{< /code-block >}}

## Crear un cliente {#create-a-client}

Cree un cliente de OpenFeature para evaluar marcadores. Puede crear múltiples clientes con diferentes nombres para diferentes partes de su aplicación:

{{< code-block lang="csharp" >}}
// Create a client for your application
var client = Api.Instance.GetClient("my-service");
{{< /code-block >}}

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina un contexto de evaluación que identifique al usuario o entidad para la segmentación de marcadores. El contexto de evaluación incluye atributos utilizados para determinar qué variaciones de marcador deben devolverse:

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")  // Targeting key (typically user ID)
    .Set("email", "user@example.com")
    .Set("country", "US")
    .Set("tier", "premium")
    .Set("age", 25)
    .Build();
{{< /code-block >}}

**Nota:** En aplicaciones del lado del servidor, cree el contexto de evaluación una vez por solicitud según el usuario actual y, a continuación, pase el mismo contexto a todas las evaluaciones de marcadores dentro de esa solicitud. Solo vuelva a crear el contexto si cambian los atributos del usuario.

La clave de segmentación se utiliza para una distribución de tráfico consistente (lanzamientos porcentuales). Los atributos adicionales permiten reglas de segmentación, como "habilitar para usuarios en EE. UU." o "habilitar para usuarios de nivel premium" en el ejemplo anterior.

## Evalúe marcadores {#evaluate-flags}

Después de configurar el proveedor y crear un cliente, puede evaluar marcadores en toda su aplicación. La evaluación de marcadores es local y rápida: el SDK utiliza datos de configuración almacenados en caché localmente, por lo que no se producen solicitudes de red durante la evaluación.

Cada marcador se identifica mediante una clave (una cadena única) y se puede evaluar con un método tipado que devuelve un valor del tipo esperado. Si el marcador no existe o no se puede evaluar, el SDK devuelve el valor predeterminado proporcionado.

### Marcadores booleanos {#boolean-flags}

Utilice `GetBooleanValueAsync` para marcadores que representen condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="csharp" >}}
var enabled = await client.GetBooleanValueAsync("new-checkout-flow", false, evalCtx);

if (enabled)
{
    ShowNewCheckout();
}
else
{
    ShowLegacyCheckout();
}
{{< /code-block >}}

### Marcadores de cadena {#string-flags}

Utilice `GetStringValueAsync` para marcadores que seleccionen entre múltiples variantes o cadenas de configuración:

{{< code-block lang="csharp" >}}
var theme = await client.GetStringValueAsync("ui-theme", "light", evalCtx);

switch (theme)
{
    case "dark":
        SetDarkTheme();
        break;
    case "light":
        SetLightTheme();
        break;
    default:
        SetLightTheme();
        break;
}
{{< /code-block >}}

### Marcadores numéricos {#numeric-flags}

Para marcadores numéricos, utilice `GetIntegerValueAsync` o `GetDoubleValueAsync`. Estos son apropiados cuando una funcionalidad depende de un parámetro numérico como un límite, porcentaje o multiplicador:

{{< code-block lang="csharp" >}}
var maxItems = await client.GetIntegerValueAsync("cart-max-items", 20, evalCtx);

var discountRate = await client.GetDoubleValueAsync("discount-rate", 0.0, evalCtx);
{{< /code-block >}}

### Marcadores de objeto {#object-flags}

Para datos estructurados, use `GetObjectValueAsync`. Esto devuelve un valor que se puede utilizar para acceder a una configuración compleja:

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var defaultConfig = new Value(new Structure(new Dictionary<string, Value>
{
    ["maxRetries"] = new Value(3),
    ["timeout"] = new Value(30)
}));

var config = await client.GetObjectValueAsync("feature-config", defaultConfig, evalCtx);

// Access configuration values
var maxRetries = config.AsStructure?["maxRetries"].AsInteger ?? 3;
var timeout = config.AsStructure?["timeout"].AsInteger ?? 30;
{{< /code-block >}}

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Cuando necesite algo más que el valor del marcador, use los métodos `*DetailsAsync`. Estos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

{{< code-block lang="csharp" >}}
var details = await client.GetBooleanDetailsAsync("new-feature", false, evalCtx);

Console.WriteLine($"Value: {details.Value}");
Console.WriteLine($"Variant: {details.Variant}");
Console.WriteLine($"Reason: {details.Reason}");
Console.WriteLine($"Error Type: {details.ErrorType}");
Console.WriteLine($"Error Message: {details.ErrorMessage}");
{{< /code-block >}}

Los detalles del marcador le ayudan a depurar el comportamiento de evaluación y a entender por qué un usuario recibió un valor determinado.

## Esperando la inicialización del proveedor {#waiting-for-provider-initialization}

De forma predeterminada, el proveedor se inicializa de forma asíncrona y las evaluaciones de Feature Flags devuelven valores predeterminados hasta que se recibe la primera configuración de Feature Flags. Si su aplicación requiere que los marcadores estén listos antes de manejar solicitudes, puede esperar a que el proveedor se inicialice utilizando controladores de eventos:

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Constant;

var taskCompletionSource = new TaskCompletionSource<bool>();

// Register event handler
Api.Instance.AddHandler(ProviderEventTypes.ProviderReady, (eventDetails) =>
{
    Console.WriteLine("Provider is ready");
    taskCompletionSource.SetResult(true);
});

Api.Instance.AddHandler(ProviderEventTypes.ProviderError, (eventDetails) =>
{
    Console.WriteLine($"Provider error: {eventDetails.Message}");
    taskCompletionSource.SetResult(false);
});

// Set provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Wait for provider to be ready (with timeout)
var timeout = Task.Delay(TimeSpan.FromSeconds(30));
var completedTask = await Task.WhenAny(taskCompletionSource.Task, timeout);

if (completedTask == timeout)
{
    Console.WriteLine("Provider initialization timed out");
}

// Create client and evaluate flags
var client = Api.Instance.GetClient();
{{< /code-block >}}

## Limpieza {#cleanup}

Cuando su aplicación finalice, apague la API de OpenFeature para limpiar los recursos:

{{< code-block lang="csharp" >}}
await Api.Instance.ShutdownAsync();
{{< /code-block >}}

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba dedicado de Datadog con el `DatadogProvider` real, o cambiarlo por el `InMemoryProvider` de OpenFeature para controlar los valores de los marcadores directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `InMemoryProvider` se incluye en el paquete NuGet `OpenFeature` (espacio de nombres `OpenFeature.Providers.Memory`), por lo que no se requiere ninguna dependencia adicional más allá de lo que ya está instalado para producción.

`Api.Instance` es un singleton. Utilice `IAsyncLifetime` de xUnit para configurar el proveedor por prueba y eliminarlo en `DisposeAsync`, lo cual evita pruebas que dependen del orden. Para suites más rápidas que comparten la configuración, utilice `InMemoryProvider.UpdateFlagsAsync(...)` para mutar el estado del marcador entre pruebas sin volver a registrar el proveedor.

{{< code-block lang="csharp" >}}
using OpenFeature;
using OpenFeature.Model;
using OpenFeature.Providers.Memory;
using Xunit;

public class CheckoutFlagTests : IAsyncLifetime
{
    private FeatureClient _client = null!;

    public async Task InitializeAsync()
    {
        var flags = new Dictionary<string, Flag>
        {
            ["new-checkout-flow"] = new Flag<bool>(
                variants: new Dictionary<string, bool> { ["on"] = true, ["off"] = false },
                defaultVariant: "on"),
            ["ui-theme"] = new Flag<string>(
                variants: new Dictionary<string, string> { ["dark"] = "dark", ["light"] = "light" },
                defaultVariant: "light",
                contextEvaluator: ctx =>
                    ctx.GetValue("tier")?.AsString == "premium" ? "dark" : "light"),
        };

        await Api.Instance.SetProviderAsync(new InMemoryProvider(flags));
        _client = Api.Instance.GetClient("test");
    }

    public Task DisposeAsync() => Api.Instance.ShutdownAsync();

    [Fact]
    public async Task NewCheckoutEnabledByDefault()
    {
        Assert.True(await _client.GetBooleanValueAsync("new-checkout-flow", false));
    }

    [Fact]
    public async Task PremiumUserGetsDarkTheme()
    {
        var ctx = EvaluationContext.Builder()
            .SetTargetingKey("u1")
            .Set("tier", "premium")
            .Build();
        Assert.Equal("dark", await _client.GetStringValueAsync("ui-theme", "light", ctx));
    }
}
{{< /code-block >}}

El mismo patrón se aplica a NUnit (`[SetUp]`/`[TearDown]`) y MSTest (`[TestInitialize]`/`[TestCleanup]`). Para pruebas de integración de ASP.NET Core, registre el `InMemoryProvider` dentro de `WebApplicationFactory.ConfigureTestServices` antes de que la aplicación inicie.

Para evitar acoplar las pruebas a los componentes internos del SDK, prefiera intercambiar `InMemoryProvider` en lugar de simular el proveedor de Datadog con Moq o bibliotecas similares.

## Solución de problemas {#troubleshooting}

### La configuración agentless no funciona {#agentless-configuration-not-working}

- Verifique que el Datadog .NET tracer 3.54.0 o posterior esté cargado y que el proveedor de OpenFeature esté inicializado.
- Verifique `DD_API_KEY`, `DD_SITE` y `DD_ENV` en el proceso de la aplicación.
- Confirme que `DD_FEATURE_FLAGS_ENABLED` no sea `false`. Deje `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` sin configurar para una nueva instalación, o establézcalo explícitamente en `agentless`. Elimine la configuración heredada `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` al migrar.
- Permita el tráfico HTTPS saliente hacia `ufc-server.ff-cdn.<DD_SITE>`.
- Habilite `DD_TRACE_DEBUG=true` y revise los registros del Datadog .NET tracer en busca de errores de autenticación, tiempo de espera o configuración mal formada.

Antes de la primera configuración válida, las evaluaciones devuelven los valores predeterminados del llamador. Después de una inicialización exitosa, los fallos de entrega transitorios conservan la última configuración válida.

### Remote Configuration no funciona {#remote-configuration-not-working}

Verifique lo siguiente para asegurarse de que Remote Configuration esté funcionando:
- Datadog Agent es la [versión requerida](#prerequisites)
- Remote Configuration está habilitado en el Agent
- `DD_SERVICE` y `DD_ENV` las variables de entorno están configuradas
- El SDK puede comunicarse con el Agent

### Errores de evaluación asíncrona {#async-evaluation-errors}

El SDK de OpenFeature para .NET utiliza métodos asíncronos para todas las evaluaciones de marcadores. Asegúrese de estar utilizando `await` o de manejar correctamente el `Task` devuelto:

{{< code-block lang="csharp" >}}
// Correct: Using await
var enabled = await client.GetBooleanValueAsync("flag-key", false, context);

// Incorrect: Not awaiting (will not work as expected)
var enabled = client.GetBooleanValueAsync("flag-key", false, context);
{{< /code-block >}}

[1]: https://openfeature.dev/
[2]: /es/agent/remote_config/
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: https://www.nuget.org/packages/Datadog.FeatureFlags.OpenFeature
[5]: /es/account_management/api-app-keys/#api-keys
[6]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[7]: /es/feature_flags/concepts/flag_graphs/
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/
[9]: /es/feature_flags/concepts/configuration_sources/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}