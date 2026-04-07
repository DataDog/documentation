---
title: Unity Feature Flags
description: Set up Datadog Feature Flags for Unity applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/application_monitoring/unity/"
  tag: "Documentation"
  text: "Unity Monitoring"
- link: "https://github.com/DataDog/dd-sdk-unity"
  tag: "Source Code"
  text: "dd-sdk-unity source code"
---

## Overview

This page describes how to instrument your Unity application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

This guide explains how to install and enable the SDK, create and use a `FlagsClient`, and configure advanced options.

## Installation

Declare the Datadog Unity SDK as a dependency in your project. The Datadog Unity SDK includes feature flags support.

1. Install the [External Dependency Manager for Unity (EDM4U)][1]. This can be done using [Open UPM][2].

2. Add the [Datadog SDK Unity package][3] using its Git URL `https://github.com/DataDog/unity-package.git`.

3. (Android only) Configure your project to use [Gradle templates][4], and enable both `Custom Main Template` and `Custom Gradle Properties Template`.

4. (Android only) If you build and receive `Duplicate class` errors (common in Unity 2022.x), add the following code to the `dependencies` block of your `mainTemplate.gradle`:

   ```groovy
   constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
   }
   ```

## Initialize the SDK

Initialize Datadog as early as possible in your app lifecycle. Navigate to your `Project Settings` and click on the `Datadog` section to configure your client token, environment, and other settings.

For more information about setting up the Unity SDK, see [Unity Monitoring Setup][5].

## Enable flags

After initializing Datadog, enable `Flags` to attach it to the current Datadog SDK instance and prepare for client creation and flag evaluation:

{{< code-block lang="csharp" >}}
using Datadog.Unity.Flags;

DdFlags.Enable();
{{< /code-block >}}

You can also pass a configuration object; see [Advanced configuration](#advanced-configuration).

## Create and retrieve a client

Create a client once, typically during app startup:

{{< code-block lang="csharp" >}}
var client = DdFlags.Instance.CreateClient();
{{< /code-block >}}

You can also create multiple clients by providing the `name` parameter:

{{< code-block lang="csharp" >}}
var checkoutClient = DdFlags.Instance.CreateClient("checkout");
{{< /code-block >}}

<div class="alert alert-info">If a client with the given name already exists, the existing instance is reused.</div>

## Set the evaluation context

Define who or what the flag evaluation applies to using a `FlagsEvaluationContext`. The evaluation context includes user or session information used to determine which flag variations should be returned. Call this method before evaluating flags to help ensure proper targeting.

{{< code-block lang="csharp" >}}
client.SetEvaluationContext(
    new FlagsEvaluationContext(
        targetingKey: "user-123",
        attributes: new Dictionary<string, object>
        {
            { "email", "user@example.com" },
            { "tier", "premium" },
        }
    ),
    onComplete: success =>
    {
        if (success)
        {
            // Flags are ready — begin evaluating
        }
        else
        {
            // Fetch failed — evaluations return default values
        }
    }
);
{{< /code-block >}}

This method fetches flag assignments from the server asynchronously in the background. The operation is non-blocking and thread-safe. Flag updates are available for subsequent evaluations after the background operation completes.

## Evaluate flags

After creating the `FlagsClient` and setting its evaluation context, you can start reading flag values throughout your app. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags. This makes evaluations safe to perform on the main thread.

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed getter_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `GetBooleanValue(key, defaultValue)` for flags that represent on/off or true/false conditions. For example:

{{< code-block lang="csharp" >}}
var isNewCheckoutEnabled = client.GetBooleanValue("checkout.new", false);

if (isNewCheckoutEnabled)
{
    ShowNewCheckoutFlow();
}
else
{
    ShowLegacyCheckout();
}
{{< /code-block >}}

### String flags

Use `GetStringValue(key, defaultValue)` for flags that select between multiple variants or configuration strings. For example:

{{< code-block lang="csharp" >}}
var theme = client.GetStringValue("ui.theme", "light");

switch (theme)
{
    case "light": SetLightTheme(); break;
    case "dark":  SetDarkTheme();  break;
    default:      SetLightTheme(); break;
}
{{< /code-block >}}

### Integer and double flags

For numeric flags, use `GetIntegerValue(key, defaultValue)` or `GetDoubleValue(key, defaultValue)`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="csharp" >}}
var maxItems = client.GetIntegerValue("cart.items.max", 20);

var priceMultiplier = client.GetDoubleValue("pricing.multiplier", 1.0);
{{< /code-block >}}

### Object flags

For structured or JSON-like data, use `GetObjectValue(key, defaultValue)`. This method returns an `object`, which can be cast to the appropriate type. Object flags are useful for remote configuration scenarios where multiple properties need to be provided together. For example:

{{< code-block lang="csharp" >}}
var config = client.GetObjectValue(
    "ui.config",
    new Dictionary<string, object>
    {
        { "color", "#00A3FF" },
        { "fontSize", 14 },
    }
);

if (config is Dictionary<string, object> configDict)
{
    var color = configDict["color"] as string;
    var fontSize = (int)configDict["fontSize"];
}
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the `Get<Type>Details` methods. These methods return both the evaluated value and metadata explaining the evaluation:

* `GetBooleanDetails(key, defaultValue)` -> `FlagDetails<bool>`
* `GetStringDetails(key, defaultValue)` -> `FlagDetails<string>`
* `GetIntegerDetails(key, defaultValue)` -> `FlagDetails<int>`
* `GetDoubleDetails(key, defaultValue)` -> `FlagDetails<double>`

For example:

{{< code-block lang="csharp" >}}
var details = client.GetStringDetails("paywall.layout", "control");

Debug.Log($"Value: {details.Value}");           // Evaluated value (for example: "A", "B", or "control")
Debug.Log($"Variant: {details.Variant}");       // Variant name, if applicable
Debug.Log($"Reason: {details.Reason}");         // Why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
Debug.Log($"Error: {details.Error?.ToString()}"); // The error that occurred during evaluation, if any
{{< /code-block >}}

Flag details may help you debug evaluation behavior and understand why a user received a given value.

## Advanced configuration

The `DdFlags.Enable()` API accepts optional configuration with options listed below.

{{< code-block lang="csharp" >}}
DdFlags.Enable(new FlagsConfiguration(
    trackExposures: true,
    trackEvaluations: true,
    evaluationFlushIntervalSeconds: 10.0f
));
{{< /code-block >}}

`trackExposures`
: When `true` (default), the SDK automatically records an _exposure event_ when a flag is evaluated. These events contain metadata about which flag was accessed, which variant was served, and under what context. They are sent to Datadog so you can later analyze feature adoption. Set to `false` to disable exposure tracking.

`trackEvaluations`
: When `true` (default), the SDK tracks flag evaluations and sends aggregated evaluation telemetry to Datadog. This enables analytics about flag usage patterns and performance. Set to `false` to disable evaluation tracking.

`evaluationFlushIntervalSeconds`
: The interval in seconds at which batched evaluation events are sent to Datadog. Accepted values are between `1` and `60`. Default is `10.0` seconds.

`customFlagsEndpoint`
: Configures a custom server URL for retrieving flag assignments.

`customExposureEndpoint`
: Configures a custom server URL for sending flags exposure data.

`customEvaluationEndpoint`
: Configures a custom server URL for sending flags evaluation telemetry.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/googlesamples/unity-jar-resolver
[2]: https://openupm.com/packages/com.google.external-dependency-manager/
[3]: https://github.com/DataDog/unity-package
[4]: https://docs.unity3d.com/Manual/gradle-templates.html
[5]: /real_user_monitoring/application_monitoring/unity/setup
