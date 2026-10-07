---
description: Configure las Feature Flags de Datadog para aplicaciones Go.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /tracing/trace_collection/dd_libraries/go/
  tag: Documentación
  text: Traza de Go
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de Feature Flags del lado del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de traza de APM para Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
title: Feature Flags de Go
---
## Información general {#overview}

Esta página describe cómo instrumentar su aplicación Go con el SDK de Feature Flags de Datadog. El SDK de Go se integra con [OpenFeature][1], un estándar abierto para la gestión de feature flags, y recibe actualizaciones de flags a través de Remote Configuration en el tracer de Go de Datadog (`dd-trace-go`).

Esta guía explica cómo instalar y habilitar el SDK, crear un cliente de OpenFeature y evaluar feature flags en su aplicación.

## Requisitos previos {#prerequisites}

Antes de configurar el SDK de Feature Flags de Go, asegúrese de tener:

- **Datadog Agent** versión 7.55 o posterior con [Remote Configuration][2] habilitada
- **clave de API de Datadog** configurado en el Agent
- **Datadog Go SDK** `dd-trace-go` versión 2.4.0 o posterior

Establezca las siguientes variables de entorno:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true

# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

<div class="alert alert-info">El <code>EXPERIMENTAL_</code> prefijo se conserva por compatibilidad con versiones anteriores; el proveedor en sí es estable.</div>

Para configurar `feature_flag.evaluations`, incluyendo la versión requerida del tracer y la configuración de OTLP del Agente, consulte [Set Up Server-Side Flag Evaluation Metrics][4]. Para obtener más información sobre los gráficos disponibles, consulte [Feature Flag Graphs][5].

## Instalación {#installation}

Instale el paquete del proveedor de Datadog OpenFeature:

{{< code-block lang="bash" >}}
go get github.com/DataDog/dd-trace-go/v2/openfeature
{{< /code-block >}}

También necesita el SDK de OpenFeature para Go:

{{< code-block lang="bash" >}}
go get github.com/open-feature/go-sdk/openfeature
{{< /code-block >}}

## Inicializar el SDK {#initialize-the-sdk}

Inicie el tracer de Datadog para Go y registre el proveedor de Datadog OpenFeature. El tracer debe iniciarse primero porque habilita Remote Configuration, la cual entrega las configuraciones de flags a su aplicación.

### Inicialización bloqueante {#blocking-initialization}

Use `SetProviderAndWait` para bloquear la evaluación hasta que se reciba la configuración inicial de flags. Esto asegura que las flags estén listas antes de que su aplicación comience a manejar solicitudes.

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider and wait for initialization (default 30s timeout)
    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
}
{{< /code-block >}}

Para especificar un tiempo de espera personalizado, use `SetProviderAndWaitWithContext`:

{{< code-block lang="go" >}}
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

if err := openfeature.SetProviderAndWaitWithContext(ctx, provider); err != nil {
    log.Fatalf("Failed to set provider: %v", err)
}
{{< /code-block >}}

### Inicialización no bloqueante {#non-blocking-initialization}

Use `SetProvider` para registrar el proveedor sin esperar. Las evaluaciones de flags devuelven valores predeterminados hasta que se recibe la configuración.

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (enables Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Create the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    // Register the provider without waiting
    openfeature.SetProvider(provider)

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
    // Flag evaluations return defaults until configuration is received
}
{{< /code-block >}}

## Crear un cliente {#create-a-client}

Cree un cliente de OpenFeature para evaluar flags. Puede crear múltiples clientes con diferentes nombres para diferentes partes de su aplicación:

{{< code-block lang="go" >}}
// Create a client for your application
client := openfeature.NewClient("my-service")
{{< /code-block >}}

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina un contexto de evaluación que identifique al usuario o entidad para la segmentación de flags. El contexto de evaluación incluye atributos utilizados para determinar qué variaciones de flag deben devolverse:

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

{{< code-block lang="go" >}}
evalCtx := openfeature.NewEvaluationContext(
    "user-123", // Targeting key (typically user ID)
    map[string]interface{}{
        "email":   "user@example.com",
        "country": "US",
        "tier":    "premium",
        "age":     25,
    },
)
{{< /code-block >}}

La clave de segmentación se utiliza para una distribución de tráfico consistente (lanzamientos porcentuales). Los atributos adicionales permiten reglas de segmentación, como "habilitar para usuarios en EE. UU." o "habilitar para usuarios de nivel premium" en el ejemplo anterior.

## Evalúe Feature Flags {#evaluate-flags}

Después de configurar el proveedor y crear un cliente, puede evaluar Feature Flags en toda su aplicación. La evaluación de Feature Flags es local y rápida: el SDK utiliza datos de configuración almacenados en caché localmente, por lo que no se producen solicitudes de red durante la evaluación.

Cada Feature Flag se identifica mediante una clave (una cadena única) y se puede evaluar con un método tipado que devuelve un valor del tipo esperado. Si el Feature Flag no existe o no se puede evaluar, el SDK devuelve el valor predeterminado proporcionado.

### Feature Flags booleanos {#boolean-flags}

Utilice `BooleanValue` para Feature Flags que representen condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="go" >}}
ctx := context.Background()

enabled, err := client.BooleanValue(ctx, "new-checkout-flow", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

if enabled {
    showNewCheckout()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### Feature Flags de cadena {#string-flags}

Utilice `StringValue` para Feature Flags que seleccionen entre múltiples variantes o cadenas de configuración:

{{< code-block lang="go" >}}
theme, err := client.StringValue(ctx, "ui-theme", "light", evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

switch theme {
case "dark":
    setDarkTheme()
case "light":
    setLightTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### Feature Flags numéricos {#numeric-flags}

Para Feature Flags numéricos, utilice `IntValue` o `FloatValue`. Estos son apropiados cuando una funcionalidad depende de un parámetro numérico como un límite, porcentaje o multiplicador:

{{< code-block lang="go" >}}
maxItems, err := client.IntValue(ctx, "cart-max-items", 20, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

discountRate, err := client.FloatValue(ctx, "discount-rate", 0.0, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}
{{< /code-block >}}

### Feature Flags de objeto {#object-flags}

Para datos estructurados, use `ObjectValue`. Esto devuelve un valor que puede ser afirmado como tipo a mapas u otros tipos complejos:

{{< code-block lang="go" >}}
config, err := client.ObjectValue(ctx, "feature-config", map[string]interface{}{
    "maxRetries": 3,
    "timeout":    30,
}, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

// Type assert to access the configuration
if configMap, ok := config.(map[string]interface{}); ok {
    maxRetries := configMap["maxRetries"]
    timeout := configMap["timeout"]
    // Use configuration values
}
{{< /code-block >}}

### Detalles de evaluación de Feature Flags {#flag-evaluation-details}

Cuando necesite más que solo el valor de Feature Flags, use los métodos `*ValueDetails`. Estos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

{{< code-block lang="go" >}}
details, err := client.BooleanValueDetails(ctx, "new-feature", false, evalCtx)
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

fmt.Printf("Value: %v\n", details.Value)
fmt.Printf("Variant: %s\n", details.Variant)
fmt.Printf("Reason: %s\n", details.Reason)
fmt.Printf("Error: %v\n", details.Error())
{{< /code-block >}}

Los detalles de Feature Flags le ayudan a depurar el comportamiento de evaluación y a entender por qué un usuario recibió un valor determinado.

## Pruebas {#testing}

Puede realizar pruebas contra un entorno de prueba de Datadog dedicado con el `DatadogProvider` real, o cambiarlo por el proveedor en memoria de OpenFeature para controlar los valores de Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. El proveedor en memoria se incluye en el módulo `go-sdk` ascendente bajo `github.com/open-feature/go-sdk/openfeature/memprovider`, por lo que no se requiere ninguna dependencia adicional.

Registre el proveedor en memoria bajo un **cliente con nombre** en lugar del proveedor global predeterminado. El proveedor predeterminado es global para el proceso, lo que interrumpe `t.Parallel()` y filtra el estado de Feature Flags entre pruebas. Un cliente con nombre limita el contexto del proveedor a cada prueba.

{{< code-block lang="go" >}}
package checkout

import (
    "context"
    "testing"

    "github.com/open-feature/go-sdk/openfeature"
    "github.com/open-feature/go-sdk/openfeature/memprovider"
)

func TestNewCheckoutFlow(t *testing.T) {
    cases := []struct {
        name string
        tier string
        want bool
    }{
        {"premium user sees new flow", "premium", true},
        {"free user sees legacy", "free", false},
    }

    for _, tc := range cases {
        t.Run(tc.name, func(t *testing.T) {
            evalByTier := func(flag memprovider.InMemoryFlag, flatCtx openfeature.FlattenedContext) (any, openfeature.ProviderResolutionDetail) {
                if flatCtx["tier"] == "premium" {
                    return flag.Variants["on"], openfeature.ProviderResolutionDetail{Reason: openfeature.TargetingMatchReason, Variant: "on"}
                }
                return flag.Variants[flag.DefaultVariant], openfeature.ProviderResolutionDetail{Reason: openfeature.DefaultReason, Variant: flag.DefaultVariant}
            }

            provider := memprovider.NewInMemoryProvider(map[string]memprovider.InMemoryFlag{
                "new-checkout-flow": {
                    State:            memprovider.Enabled,
                    DefaultVariant:   "off",
                    Variants:         map[string]any{"on": true, "off": false},
                    ContextEvaluator: &evalByTier,
                },
            })

            name := "test-" + t.Name()
            if err := openfeature.SetNamedProviderAndWait(name, provider); err != nil {
                t.Fatal(err)
            }
            t.Cleanup(func() {
                _ = openfeature.SetNamedProviderAndWait(name, openfeature.NoopProvider{})
            })

            client := openfeature.NewClient(name)
            got, err := client.BooleanValue(context.Background(), "new-checkout-flow", false, openfeature.NewEvaluationContext("user-1", map[string]any{"tier": tc.tier}))
            if err != nil {
                t.Fatal(err)
            }
            if got != tc.want {
                t.Errorf("got %v, want %v", got, tc.want)
            }
        })
    }
}
{{< /code-block >}}

`ContextEvaluator` se define como `*func(...)` — un puntero a una función. Defina el evaluador en una variable local y pase su dirección con `&`, como se muestra arriba. Omita `ContextEvaluator` por completo para devolver siempre `DefaultVariant`.

[1]: https://openfeature.dev/
[2]: /es/agent/remote_config/
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /es/feature_flags/concepts/flag_graphs/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}