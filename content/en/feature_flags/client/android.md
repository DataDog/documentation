---
title: Android and Android TV Feature Flags
description: Set up Datadog Feature Flags for Android and Android TV applications.
aliases:
  - /feature_flags/setup/android/
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/android/"
  tag: "Documentation"
  text: "Android and Android TV Monitoring"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This page describes how to instrument your Android or Android TV application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

This guide explains how to install and enable the SDK, create and use a `FlagsClient`, and configure advanced options.

## Installation

Declare `dd-sdk-android-flags` as a dependency in your project. Add the library as a Gradle dependency in your application module's `build.gradle` file:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## Initialize the SDK

Initialize Datadog as early as possible in your app lifecycle—typically in your `Application` class's `onCreate()` method. This ensures all feature flag evaluations and telemetry are captured correctly.

{{< code-block lang="kotlin" >}}
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
).build()

Datadog.initialize(this, configuration, TrackingConsent.GRANTED)
{{< /code-block >}}

## Enable flags

After initializing Datadog, enable `Flags` to attach it to the current Datadog SDK instance and prepare for client creation and flags evaluation:

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.Flags

Flags.enable()
{{< /code-block >}}

You can also pass a configuration object; see [Advanced configuration](#advanced-configuration).

## Create and retrieve a client

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

Define who or what the flag evaluation applies to using a `FlagsEvaluationContext`. The evaluation context includes user or session information used to determine which flag variations should be returned. Call this method before evaluating flags to ensure proper targeting.

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

After creating the `FlagsClient` and setting its evaluation context, you can start reading flag values throughout your app. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags. This makes evaluations safe to perform on the main thread.

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed method_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `resolveBooleanValue(key, defaultValue)` for flags that represent on/off or true/false conditions. For example:

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

Use `resolveStringValue(key, defaultValue)` for flags that select between multiple variants or configuration strings. For example:

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

For numeric flags, use `resolveIntValue(key, defaultValue)` or `resolveDoubleValue(key, defaultValue)`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

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

### Object flags

For structured or JSON-like data, use `resolveStructureValue(key, defaultValue)`. This method returns a `JSONObject`, which can represent complex nested data. Object flags are useful for remote configuration scenarios where multiple properties need to be provided together. For example:

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

When you need more than just the flag value, use the `resolve(key, defaultValue): ResolutionDetails<T>` method. These methods return both the evaluated value and metadata explaining the evaluation. For example:

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

## A/B experimentation

To run A/B experiments and measure the impact of feature variations, enable exposure tracking with `.trackExposures(true)`. When enabled, the SDK automatically records an _exposure event_ when a flag is evaluated. These events contain metadata about which flag was accessed, which variant was served, and under what context. If you only need local evaluation without telemetry, you can disable it with `.trackExposures(false)`.

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    .trackExposures(true)
    .build()

Flags.enable(config)
{{< /code-block >}}

## Advanced configuration

The `Flags.enable()` API accepts optional configuration with options listed below.

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    // configure options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`rumIntegrationEnabled()`
: When `true` (default), flag evaluations are tracked in RUM, which enables correlating them with user sessions. This enables analytics such as _"Do users in variant B experience more errors?"_. If your app does not use RUM, this flag has no effect and can be safely left at its default value. Use `rumIntegrationEnabled(false)` to disable RUM integration.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
