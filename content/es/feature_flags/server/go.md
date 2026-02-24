---
description: Configura marcas de funciones de Datadog para aplicaciones de Go.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Marcas de funciones del lado del servidor
- link: /tracing/trace_collection/dd_libraries/go/
  tag: Documentación
  text: Rastreo de Go
title: Marcas de funciones de Go
---

## Información general

En esta page (página) se describe cómo instrumentar tu aplicación de Go con el kit de desarrollo de software (SDK) de marcas de funciones de Datadog. El kit de desarrollo de software (SDK) de Go se integra con [OpenFeature][1], un estándar abierto para la gestión de marcas de funciones y utiliza la configuración remota del rastreador de Datadog para recibir actualizaciones de marcas en tiempo real.

En esta guía se explica cómo instalar y habilitar el kit de desarrollo de software (SDK), crear un cliente de OpenFeature y evaluar las marcas de funciones en tu aplicación.

## Requisitos previos

Antes de configurar el kit de desarrollo de software (SDK) de marcas de funciones de Go, asegúrate de que tengas:

- **Datadog Agent** con la [Configuración remota][2] activada
- **Rastreador de Go de Datadog** `dd-trace (traza)-go` versión 2.4.0 o posterior

Configura las siguientes variables de entorno:

{{< code-block lang="bash" >}}
# Obligatorio: Habilitar el proveedor de marcas de funciones
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Obligatorio: Identificación del servicio
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## Instalación

Instala el paquete del proveedor de OpenFeature de Datadog:

{{< code-block lang="bash" >}}
go get github.com/DataDog/dd-trace-go/v2/openfeature
{{< /code-block >}}

También necesitas el kit de desarrollo de software (SDK) de OpenFeature Go:

{{< code-block lang="bash" >}}
go get github.com/open-feature/go-sdk/openfeature
{{< /code-block >}}

## Inicializa el kit de desarrollo de software (SDK)

Inicia el rastreador Datadog y registra el proveedor Datadog OpenFeature. El rastreador debe iniciarse primero porque habilita la configuración remota, que entrega configuraciones de marcas a tu aplicación.

### Bloqueo de la inicialización

Utiliza `SetProviderAndWait` para bloquear la evaluación hasta que se reciba la configuración inicial de las marcas. Esto asegura que las marcas estén listas antes de que tu aplicación comience a gestionar solicitudes.

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
    defer provider.Shutdown()

    // Register the provider and wait for initialization (default 30s timeout)
    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
}
{{< /code-block >}}

Para especificar un tiempo de espera personalizado, utiliza `SetProviderAndWaitWithContext`:

{{< code-block lang="go" >}}
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

if err := openfeature.SetProviderAndWaitWithContext(ctx, provider); err != nil {
    log.Fatalf("Failed to set provider: %v", err)
}
{{< /code-block >}}

### Inicialización no bloqueante

Utiliza `SetProvider` para registrar el proveedor sin esperar. Las evaluaciones de marcas devuelven valores predeterminados hasta que se reciba la configuración.

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
    defer provider.Shutdown()

    // Register the provider without waiting
    openfeature.SetProvider(provider)

    // Create the OpenFeature client
    client := openfeature.NewClient("my-service")

    // Your application code here
    // Flag evaluations return defaults until configuration is received
}
{{< /code-block >}}

## Crear un cliente

Crea un cliente de OpenFeature para evaluar las marcas. Puedes crear varios clientes con diferentes nombres para diferentes partes de tu aplicación:

{{< code-block lang="go" >}}
// Create a client for your application
client := openfeature.NewClient("my-service")
{{< /code-block >}}

## Definir el contexto de evaluación

Define un contexto de evaluación que identifique al usuario o la entidad a la que se dirigen las marcas. El contexto de evaluación incluye atributos utilizados para determinar qué variaciones de marcas deben devolverse:

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

La clave de segmentación se utiliza para una distribución coherente del tráfico (porcentajes de lanzamiento). Los atributos adicionales permiten establecer reglas de segmentación, como "activar para usuarios de EE.UU." o "activar para usuarios de nivel premium" en el ejemplo anterior.

## Evaluar marcas

Después de configurar el proveedor y crear un cliente, puedes evaluar las marcas en toda la aplicación. La evaluación de marcas es local y rápida: el kit de desarrollo de software (SDK) utiliza datos de configuración almacenados en caché local, por lo que no se producen solicitudes de red durante la evaluación.

Cada marca se identifica mediante una clave (una cadena única) y puede evaluarse con un método con tipo que devuelve un valor del tipo esperado. Si la marca no existe o no puede evaluarse, el kit de desarrollo de software (SDK) devuelve el valor predeterminado proporcionado.

### Marcas booleanas

Utiliza `BooleanValue` para las marcas que representan condiciones de activado/desactivado o true/false:

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

### Marcas de cadenas

Utiliza `StringValue` para las marcas que seleccionan entre múltiples variantes o cadenas de configuración:

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

### Marcas numéricas

Para las marcas numéricos, utiliza `IntValue` o `FloatValue`. Son adecuadas cuando una función depende de un parámetro numérico como un límite, un porcentaje o un multiplicador:

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

### Marcas de objetos

Para datos estructurados, utiliza `ObjectValue`. Esto devuelve un valor que puede ser tipo-afirmado a mapas u otros tipos complejos:

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

### Detalles de la evaluación de marcas

Si necesita algo más que el valor de la marca, utiliza los métodos `*ValueDetails`. Estos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

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

Los detalles de las marcas te ayudan a depurar el comportamiento de la evaluación y a comprender por qué un usuario ha recibido un valor determinado.

[1]: https://openfeature.dev/
[2]: /es/agent/remote_config/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}