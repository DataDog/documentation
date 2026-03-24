---
title: Unity Feature Flags (OpenFeature)
description: Set up Datadog Feature Flags for Unity applications using OpenFeature.
aliases:
  - /feature_flags/setup/unity-openfeature/
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
- link: "https://openfeature.dev/"
  tag: "External"
  text: "OpenFeature"
---

<div class="alert alert-info">This page documents the <strong>OpenFeature integration</strong> for Unity Feature Flags. For the direct FlagsClient API (without OpenFeature), see <a href="/feature_flags/client/unity/">Unity Feature Flags</a>.</div>

## Overview

This page describes how to instrument your Unity application with the Datadog Feature Flags SDK using the OpenFeature standard. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Datadog SDK registers a `DatadogFeatureProvider` with the OpenFeature `Api`. Configuration and evaluation context use Datadog types; all flag evaluation uses the standard OpenFeature client API.

## Installation

Declare the Datadog Unity SDK as a dependency in your project. The Datadog Unity SDK includes feature flags support.

1. Install the [External Dependency Manager for Unity (EDM4U)][1]. This can be done using [Open UPM][2].

2. Add the Datadog SDK Unity package from its Git URL at [https://github.com/DataDog/unity-package][3]. The package URL is `https://github.com/DataDog/unity-package.git`.

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

## Getting started

After the SDK is initialized, set up feature flags with these steps:

{{< code-block lang="csharp" >}}
using System.Collections;
using System.Collections.Generic;
using Datadog.Unity.Flags;
using OpenFeature;
using UnityEngine;

public class FlagsBehavior : MonoBehaviour
{
    private IEnumerator Start()
    {
        // 1. Enable the Flags feature after Datadog SDK initialization
        DdFlags.Enable(new FlagsConfiguration(
            trackExposures: true,
            trackEvaluations: true
        ));

        // 2. Create a client and register the Datadog provider with OpenFeature
        var client = DdFlags.Instance.CreateClient();
        var task = Api.Instance.SetProviderAsync(DdFlags.Instance.CreateProvider());
        yield return new WaitUntil(() => task.IsCompleted);

        // 3. Set the evaluation context (fetches flag assignments from the server)
        var done = false;
        client.SetEvaluationContext(
            new FlagsEvaluationContext("user-123", new Dictionary<string, object>
            {
                { "email", "user@example.com" },
                { "tier", "premium" },
            }),
            onComplete: _ => done = true
        );
        yield return new WaitUntil(() => done);

        // 4. Evaluate flags via the OpenFeature client
        var ofClient = Api.Instance.GetClient();
        var evalTask = ofClient.GetBooleanValueAsync("checkout.new", false);
        yield return new WaitUntil(() => evalTask.IsCompleted);
        Debug.Log($"checkout.new = {evalTask.Result}");
    }
}
{{< /code-block >}}

## Enable flags

After initializing Datadog, enable flags in your application code:

{{< code-block lang="csharp" >}}
using Datadog.Unity.Flags;

DdFlags.Enable(new FlagsConfiguration(
    trackExposures: true,
    trackEvaluations: true
));
{{< /code-block >}}

You can also pass additional configuration options; see [Advanced configuration](#advanced-configuration).

## Register the provider

Create a `FlagsClient`, then create and register the Datadog provider with the OpenFeature `Api`. The client is required to set the evaluation context later:

{{< code-block lang="csharp" >}}
using OpenFeature;

var client = DdFlags.Instance.CreateClient();
await Api.Instance.SetProviderAsync(DdFlags.Instance.CreateProvider());
{{< /code-block >}}

Retrieve the OpenFeature client anywhere in your app to evaluate flags:

{{< code-block lang="csharp" >}}
var ofClient = Api.Instance.GetClient();
{{< /code-block >}}

You can also create named clients to scope flags to different parts of your app:

{{< code-block lang="csharp" >}}
var client = DdFlags.Instance.CreateClient("checkout");
await Api.Instance.SetProviderAsync("checkout", DdFlags.Instance.CreateProvider("checkout"));
var ofClient = Api.Instance.GetClient("checkout");
{{< /code-block >}}

## Set the evaluation context

Define who or what the flag evaluation applies to using a `FlagsEvaluationContext`. The evaluation context includes user or session information used to determine which flag variations should be returned. Call this method before evaluating flags to ensure proper targeting.

{{< code-block lang="csharp" >}}
client.SetEvaluationContext(
    new FlagsEvaluationContext("user-123", new Dictionary<string, object>
    {
        { "email", "user@example.com" },
        { "tier", "premium" },
    }),
    onComplete: success =>
    {
        if (success)
        {
            Debug.Log("Flags loaded successfully!");
        }
    }
);
{{< /code-block >}}

This method fetches flag assignments from the server asynchronously in the background. The operation is non-blocking and thread-safe. Flag updates are available for subsequent evaluations once the background operation completes.

## Evaluate flags

After setting the evaluation context, use the OpenFeature client to read flag values throughout your app. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags.

Each flag is identified by a _key_ (a unique string). The OpenFeature client provides typed async methods for each value type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

Because Unity's `MonoBehaviour` does not support `await`, use coroutines to bridge async flag evaluation:

{{< code-block lang="csharp" >}}
private IEnumerator EvaluateFlags()
{
    var ofClient = Api.Instance.GetClient();

    var task = ofClient.GetBooleanValueAsync("checkout.new", false);
    yield return new WaitUntil(() => task.IsCompleted);
    Debug.Log($"checkout.new = {task.Result}");
}
{{< /code-block >}}

### Boolean flags

Use `GetBooleanValueAsync(key, defaultValue)` for flags that represent on/off or true/false conditions. For example:

{{< code-block lang="csharp" >}}
var task = ofClient.GetBooleanValueAsync("checkout.new", false);
yield return new WaitUntil(() => task.IsCompleted);

if (task.Result)
{
    ShowNewCheckoutFlow();
}
else
{
    ShowLegacyCheckout();
}
{{< /code-block >}}

### String flags

Use `GetStringValueAsync(key, defaultValue)` for flags that select between multiple variants or configuration strings. For example:

{{< code-block lang="csharp" >}}
var task = ofClient.GetStringValueAsync("ui.theme", "light");
yield return new WaitUntil(() => task.IsCompleted);

switch (task.Result)
{
    case "light":
        SetLightTheme();
        break;
    case "dark":
        SetDarkTheme();
        break;
    default:
        SetLightTheme();
        break;
}
{{< /code-block >}}

### Integer and double flags

For numeric flags, use `GetIntegerValueAsync(key, defaultValue)` or `GetDoubleValueAsync(key, defaultValue)`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="csharp" >}}
var maxItemsTask = ofClient.GetIntegerValueAsync("cart.items.max", 20);
var multiplierTask = ofClient.GetDoubleValueAsync("pricing.multiplier", 1.0);
yield return new WaitUntil(() => maxItemsTask.IsCompleted && multiplierTask.IsCompleted);

var maxItems = maxItemsTask.Result;
var priceMultiplier = multiplierTask.Result;
{{< /code-block >}}

### Object flags

For structured or JSON-like data, use `GetObjectValueAsync(key, defaultValue)`. This method returns an OpenFeature `Value` object, which can represent primitives, arrays, or dictionaries. Object flags are useful for remote configuration scenarios where multiple properties need to be provided together. For example:

{{< code-block lang="csharp" >}}
var defaultConfig = new Value(new Structure(new Dictionary<string, Value>
{
    { "color", new Value("#00A3FF") },
    { "fontSize", new Value(14) },
}));

var task = ofClient.GetObjectValueAsync("ui.config", defaultConfig);
yield return new WaitUntil(() => task.IsCompleted);

var color = task.Result.AsStructure["color"].AsString;
var fontSize = task.Result.AsStructure["fontSize"].AsInteger;
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the detail methods. These methods return both the evaluated value and metadata explaining the evaluation:

* `GetBooleanDetailsAsync(key, defaultValue)` -> `FlagEvaluationDetails<bool>`
* `GetStringDetailsAsync(key, defaultValue)` -> `FlagEvaluationDetails<string>`
* `GetIntegerDetailsAsync(key, defaultValue)` -> `FlagEvaluationDetails<int>`
* `GetDoubleDetailsAsync(key, defaultValue)` -> `FlagEvaluationDetails<double>`
* `GetObjectDetailsAsync(key, defaultValue)` -> `FlagEvaluationDetails<Value>`

For example:

{{< code-block lang="csharp" >}}
var task = ofClient.GetStringDetailsAsync("paywall.layout", "control");
yield return new WaitUntil(() => task.IsCompleted);
var details = task.Result;

Debug.Log($"Value: {details.Value}");         // Evaluated value (for example: "A", "B", or "control")
Debug.Log($"Variant: {details.Variant}");     // Variant name, if applicable
Debug.Log($"Reason: {details.Reason}");       // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
Debug.Log($"ErrorType: {details.ErrorType}"); // The error that occurred during evaluation, if any
{{< /code-block >}}

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
