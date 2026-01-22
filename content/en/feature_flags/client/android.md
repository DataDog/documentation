---
title: Android and Android TV Feature Flags
description: Set up Datadog Feature Flags for Android and Android TV applications using OpenFeature or direct integration.
aliases:
  - /feature_flags/setup/android/
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "https://openfeature.dev/docs/reference/technologies/client/kotlin/"
  tag: "External"
  text: "OpenFeature Kotlin SDK"
- link: "/real_user_monitoring/android/"
  tag: "Documentation"
  text: "Android and Android TV Monitoring"
---

## Overview

This page describes how to instrument your Android or Android TV application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

There are two ways to use Datadog Feature Flags in your Android application:

- **OpenFeature (Recommended)**: Use the industry-standard [OpenFeature](https://openfeature.dev/) API for a vendor-neutral, future-proof integration
- **Direct Integration**: Use the native Datadog `FlagsClient` API for advanced scenarios requiring fine-grained control

This guide explains how to install and enable the SDK using either approach, set evaluation context, evaluate flags, and configure advanced options.

## Installation

### Using OpenFeature (Recommended)

For the best developer experience and vendor flexibility, we recommend using the OpenFeature standard API. Add both the Datadog Feature Flags SDK and OpenFeature Provider as Gradle dependencies in your application module's `build.gradle` file:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"
    implementation "com.datadoghq:dd-sdk-android-flags-openfeature:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

### Using Direct Integration

For advanced use cases requiring fine-grained control over multiple independent contexts, you can use the Datadog `FlagsClient` directly:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## Initialize the SDK

Initialize Datadog as early as possible in your app lifecycle—typically in your `Application` class's `onCreate()` method. This ensures all feature flag evaluations and telemetry are captured correctly.

```kotlin
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="jenkins_site_name" code="true" >}})
    .build()

Datadog.initialize(this, configuration, TrackingConsent.GRANTED)
```

## Enable flags

After initializing Datadog, enable `Flags` to attach it to the current Datadog SDK instance and prepare for client creation and flags evaluation:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.Flags

Flags.enable()
{{< /code-block >}}

You can also pass a configuration object; see [Advanced configuration](#advanced-configuration).

## Create and configure the provider

### Using OpenFeature (Recommended)

Create a `FlagsClient` and convert it to an OpenFeature provider. Do this once during app startup:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

// Create and configure the provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()

// Set it as the OpenFeature provider
OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

You can also create named clients for different contexts:

{{< code-block lang="kotlin" >}}
val checkoutProvider = FlagsClient.Builder("checkout")
    .build()
    .asOpenFeatureProvider()

OpenFeatureAPI.setProviderAndWait(checkoutProvider)
{{< /code-block >}}

### Using FlagsClient Directly

Create a client once, typically during app startup:

{{< code-block lang="kotlin" >}}
FlagsClient.Builder().build() // Creates the default client
{{< /code-block >}}

Retrieve the same client anywhere in your app:

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.get() // Retrieves the "default" client
{{< /code-block >}}

You can also create and retrieve multiple clients by providing the `name` parameter:

{{< code-block lang="kotlin" >}}
FlagsClient.Builder("checkout").build()
val flagsClient = FlagsClient.get("checkout")
{{< /code-block >}}

<div class="alert alert-info">If a client with the given name already exists, the existing instance is reused.</div>

## Set the evaluation context

Define who or what the flag evaluation applies to using an evaluation context. The evaluation context includes user or session information used to determine which flag variations should be returned. Set this before evaluating flags to ensure proper targeting.

### Using OpenFeature

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.Value

OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to Value.String("user@example.com"),
            "tier" to Value.String("premium")
        )
    )
)
{{< /code-block >}}

<div class="alert alert-info">All attribute values must use <code>Value.String()</code> wrapper. The targeting key should be consistent for the same user to ensure consistent flag evaluation across sessions. For anonymous users, use a persistent UUID stored in <code>SharedPreferences</code>.</div>

### Using FlagsClient

{{< code-block lang="kotlin" >}}
flagsClient.setEvaluationContext(
    EvaluationContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to "user@example.com",
            "tier" to "premium"
        )
    )
)
{{< /code-block >}}

This method fetches flag assignments from the server asynchronously in the background. The operation is non-blocking and thread-safe. Flag updates are available for subsequent evaluations once the background operation completes.

## Evaluate flags

After setting up your provider or client and setting the evaluation context, you can start reading flag values throughout your app. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags. This makes evaluations safe to perform on the main thread.

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed method_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Boolean flags represent on/off or true/false conditions.

#### Using OpenFeature

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

val client = OpenFeatureAPI.getClient()
val isNewCheckoutEnabled = client.getBooleanValue(
    key = "checkout.new",
    defaultValue = false
)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

#### Using FlagsClient

{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = flagsClient.resolveBooleanValue(
    flagKey = "checkout.new",
    defaultValue = false
)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### String flags

String flags select between multiple variants or configuration strings.

#### Using OpenFeature

{{< code-block lang="kotlin" >}}
val theme = client.getStringValue(
    key = "ui.theme",
    defaultValue = "light"
)

when (theme) {
    "light" -> setLightTheme()
    "dark" -> setDarkTheme()
    else -> setLightTheme()
}
{{< /code-block >}}

#### Using FlagsClient

{{< code-block lang="kotlin" >}}
val theme = flagsClient.resolveStringValue(
    flagKey = "ui.theme",
    defaultValue = "light"
)

when (theme) {
    "light" -> setLightTheme()
    "dark" -> setDarkTheme()
    else -> setLightTheme()
}
{{< /code-block >}}

### Integer and double flags

Numeric flags are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier.

#### Using OpenFeature

{{< code-block lang="kotlin" >}}
val maxItems = client.getIntegerValue(
    key = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = client.getDoubleValue(
    key = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}

#### Using FlagsClient

{{< code-block lang="kotlin" >}}
val maxItems = flagsClient.resolveIntValue(
    flagKey = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = flagsClient.resolveDoubleValue(
    flagKey = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}

### Structured flags

Structured flags are useful for remote configuration scenarios where multiple properties need to be provided together as JSON-like data.

#### Using OpenFeature

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.Value

val config = client.getObjectValue(
    key = "ui.config",
    defaultValue = Value.Structure(mapOf(
        "color" to Value.String("#00A3FF"),
        "fontSize" to Value.Integer(14)
    ))
)

// Access nested values
val color = config.asStructure()?.get("color")?.asString()
val fontSize = config.asStructure()?.get("fontSize")?.asInteger()
{{< /code-block >}}

#### Using FlagsClient

{{< code-block lang="kotlin" >}}
import org.json.JSONObject

val config = flagsClient.resolveStructureValue(
    flagKey = "ui.config",
    defaultValue = JSONObject().apply {
        put("color", "#00A3FF")
        put("fontSize", 14)
    }
)
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, you can get detailed evaluation metadata including the evaluated value, variant name, reason, and any error codes.

#### Using OpenFeature

{{< code-block lang="kotlin" >}}
val details = client.getStringDetails(
    key = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Reason for this value (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode)  // Error code, if any
{{< /code-block >}}

Similar detail methods exist for other types: `getBooleanDetails()`, `getIntegerDetails()`, `getDoubleDetails()`, and `getObjectDetails()`.

#### Using FlagsClient

{{< code-block lang="kotlin" >}}
val details = flagsClient.resolve(
    flagKey = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode)  // The error that occurred during evaluation, if any
{{< /code-block >}}

Flag details may help you debug evaluation behavior and understand why a user received a given value.

## When to use each approach

### Use OpenFeature (Recommended) if you:

- Want a **vendor-neutral API** that follows industry standards
- Are already using OpenFeature in other parts of your application
- Want the flexibility to switch providers in the future without code changes
- Prefer **standardized hook support** for cross-cutting concerns like logging and metrics
- Want to use the **global/static context paradigm** where context is set once at the application level

### Use FlagsClient directly if you:

- Need the **most direct integration** with Datadog's native APIs
- Require **multiple independent evaluation contexts** in the same app (for example, different contexts for different users or sessions)
- Want to work with **native Kotlin types** directly (`JSONObject` instead of `Value.Structure`)
- Need **fine-grained control** over client lifecycle and configuration per instance

## API Comparison

| Feature | **OpenFeature** | **FlagsClient** |
|---------|----------------|-----------------|
| **API Standard** | OpenFeature (vendor-neutral) | Datadog-specific |
| **Evaluation Context** | Global/static | Per client instance |
| **Structured Flags** | `Value.Structure` | `JSONObject` |
| **Type Safety** | OpenFeature `Value` types | Kotlin-native types |
| **Vendor Lock-in** | Low (easy to swap) | Higher (Datadog-specific) |
| **State Management** | Flow-based observation | Manual listener registration |

Both approaches provide the same core functionality including RUM integration, exposure tracking, and advanced configuration options.

## Advanced configuration

The following configuration options apply whether you're using OpenFeature or FlagsClient directly.

### Global configuration

The `Flags.enable()` API accepts optional configuration with the options listed below. These settings apply globally to all clients:

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    // configure options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`trackExposures()`
: When `true` (default), the SDK automatically records an _exposure event_ when a flag is evaluated. These events contain metadata about which flag was accessed, which variant was served, and under what context. They are sent to Datadog so you can later analyze feature adoption. If you only need local evaluation without telemetry, you can disable it with: `trackExposures(false)`.

`rumIntegrationEnabled()`
: When `true` (default), flag evaluations are tracked in RUM, which enables correlating them with user sessions. This enables analytics such as _“Do users in variant B experience more errors?”_. If your app does not use RUM, this flag has no effect and can be safely left at its default value. Use `rumIntegrationEnabled(false)` to disable RUM integration.

`gracefulModeEnabled()`
: Controls how the SDK handles incorrect use of the `FlagsClient` API—for example, creating a client before calling `Flags.enable()`, creating a duplicate client with the same name, or retrieving a client that hasn't been created yet.

  The exact behavior of Graceful Mode depends on your build configuration:

  * **Release builds**: The SDK always enforces Graceful Mode: any misuse is only logged internally if `Datadog.setVerbosity()` is configured.
  * **Debug builds** with `gracefulModeEnabled = true` (default): The SDK always logs warnings to the console.
  * **Debug builds** with `gracefulModeEnabled = false`: The SDK raises `IllegalStateException` for incorrect API usage, enforcing a fail-fast approach that helps detect configuration mistakes early.

  You can adjust `gracefulModeEnabled()` depending on your development or QA phase.

`useCustomFlagEndpoint()`
: Configures a custom server URL for retrieving flag assignments.

`useCustomExposureEndpoint()`
: Configures a custom server URL for sending flags exposure data.

### Per-client configuration

You can configure individual clients with custom endpoints or other options before creating them.

#### Using OpenFeature

When using OpenFeature, configure the underlying `FlagsClient` before calling `asOpenFeatureProvider()`:

{{< code-block lang="kotlin" >}}
val provider = FlagsClient.Builder()
    .useCustomFlagEndpoint("https://your-proxy.example.com/flags")
    .useCustomExposureEndpoint("https://your-proxy.example.com/exposure")
    .build()
    .asOpenFeatureProvider()

OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

#### Using FlagsClient

Configure the client directly using the builder:

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.Builder()
    .useCustomFlagEndpoint("https://your-proxy.example.com/flags")
    .useCustomExposureEndpoint("https://your-proxy.example.com/exposure")
    .build()
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
