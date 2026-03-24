---
title: Unity Feature Flags
description: Set up Datadog Feature Flags for Unity applications.
aliases:
  - /feature_flags/setup/unity/
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

## Overview

This page describes how to instrument your Unity application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Datadog Feature Flags SDK for Unity integrates with [OpenFeature][1], an open standard for feature flag management. This guide explains how to install the SDK, register the Datadog provider, set an evaluation context, and evaluate flags in your application.

<div class="alert alert-info">For most applications, the OpenFeature API is the recommended approach. If you need direct access to the underlying <code>FlagsClient</code>—for example, to manage the client lifecycle independently—see <a href="#direct-flagsclient-integration-advanced">Direct FlagsClient integration</a>.</div>

## Getting started

Here's a minimal example to get feature flags working in your Unity app:

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
        DdFlags.Enable(new FlagsConfiguration());

        // 2. Create a client and register the Datadog OpenFeature provider
        var client = DdFlags.Instance.CreateClient();
        var providerTask = Api.Instance.SetProviderAsync(DdFlags.Instance.CreateProvider());
        yield return new WaitUntil(() => providerTask.IsCompleted);

        // 3. Set the evaluation context
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
        var flagTask = ofClient.GetBooleanValueAsync("checkout.new", false);
        yield return new WaitUntil(() => flagTask.IsCompleted);
        Debug.Log($"checkout.new = {flagTask.Result}");
    }
}
{{< /code-block >}}

The rest of this guide explains each step in detail.

## Installation

Declare the Datadog Unity SDK as a dependency in your project. The Datadog Unity SDK includes feature flags support.

1. Install the [External Dependency Manager for Unity (EDM4U)][2]. This can be done using [Open UPM][3].

2. Add the Datadog SDK Unity package from its Git URL at [https://github.com/DataDog/unity-package][4]. The package URL is `https://github.com/DataDog/unity-package.git`.

3. (Android only) Configure your project to use [Gradle templates][5], and enable both `Custom Main Template` and `Custom Gradle Properties Template`.

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

For more information about setting up the Unity SDK, see [Unity Monitoring Setup][6].

## Enable flags

After initializing Datadog, enable flags in your application code:

{{< code-block lang="csharp" >}}
using Datadog.Unity.Flags;

DdFlags.Enable(new FlagsConfiguration());
{{< /code-block >}}

You can also pass configuration options; see [Advanced configuration](#advanced-configuration).

## Register the provider

Create a `FlagsClient`, then create and register the Datadog provider with the OpenFeature `Api`. You need to hold a reference to the `FlagsClient` to set the evaluation context later.

{{< code-block lang="csharp" >}}
using OpenFeature;

var client = DdFlags.Instance.CreateClient();
await Api.Instance.SetProviderAsync(DdFlags.Instance.CreateProvider());
{{< /code-block >}}

<div class="alert alert-info">Call <code>CreateClient()</code> before <code>CreateProvider()</code>. The provider must be bound to an existing client.</div>

## Set the evaluation context

Define who or what the flag evaluation applies to using a `FlagsEvaluationContext`. The evaluation context includes user or session information used to determine which flag variations should be returned. Set this before evaluating flags to help ensure proper targeting.

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

After setting up your provider and evaluation context, you can read flag values throughout your app. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags.

Each flag is identified by a _key_ (a unique string). The OpenFeature client provides typed async methods for each value type. Because Unity's `MonoBehaviour` does not support `await`, use coroutines to bridge async flag evaluation:

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

{{< code-block lang="csharp" >}}
var task = ofClient.GetStringValueAsync("ui.theme", "light");
yield return new WaitUntil(() => task.IsCompleted);

switch (task.Result)
{
    case "light": SetLightTheme(); break;
    case "dark":  SetDarkTheme();  break;
    default:      SetLightTheme(); break;
}
{{< /code-block >}}

### Integer and double flags

{{< code-block lang="csharp" >}}
var maxItemsTask = ofClient.GetIntegerValueAsync("cart.items.max", 20);
var multiplierTask = ofClient.GetDoubleValueAsync("pricing.multiplier", 1.0);
yield return new WaitUntil(() => maxItemsTask.IsCompleted && multiplierTask.IsCompleted);

var maxItems = maxItemsTask.Result;
var priceMultiplier = multiplierTask.Result;
{{< /code-block >}}

### Object flags

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

When you need evaluation metadata beyond the flag value, use the detail methods. These return both the value and information about why it was chosen:

{{< code-block lang="csharp" >}}
var task = ofClient.GetStringDetailsAsync("paywall.layout", "control");
yield return new WaitUntil(() => task.IsCompleted);
var details = task.Result;

Debug.Log($"Value: {details.Value}");         // Evaluated value (for example: "A", "B", or "control")
Debug.Log($"Variant: {details.Variant}");     // Variant name, if applicable
Debug.Log($"Reason: {details.Reason}");       // Why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
Debug.Log($"ErrorType: {details.ErrorType}"); // Error code, if any
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

## Direct FlagsClient integration (advanced)

For most applications, the OpenFeature API described above is the recommended approach. Use the `FlagsClient` directly only if you need to manage the evaluation context independently of the OpenFeature provider—for example, to update context without triggering a provider state transition.

### Create and use a client

Create and hold a reference to the `FlagsClient`:

{{% collapse-content title="Create a client" level="h4" %}}
{{< code-block lang="csharp" >}}
var client = DdFlags.Instance.CreateClient();
{{< /code-block >}}

You can also create named clients:

{{< code-block lang="csharp" >}}
var checkoutClient = DdFlags.Instance.CreateClient("checkout");
{{< /code-block >}}

<div class="alert alert-info">If a client with the given name already exists, the existing instance is reused.</div>
{{% /collapse-content %}}

{{% collapse-content title="Set the evaluation context" level="h4" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="Boolean flags" level="h4" %}}
{{< code-block lang="csharp" >}}
var isEnabled = client.GetBooleanValue("checkout.new", false);
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="String flags" level="h4" %}}
{{< code-block lang="csharp" >}}
var theme = client.GetStringValue("ui.theme", "light");
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Integer and double flags" level="h4" %}}
{{< code-block lang="csharp" >}}
var maxItems = client.GetIntegerValue("cart.items.max", 20);
var priceMultiplier = client.GetDoubleValue("pricing.multiplier", 1.0);
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Object flags" level="h4" %}}
{{< code-block lang="csharp" >}}
var config = client.GetObjectValue(
    "ui.config",
    new Dictionary<string, object>
    {
        { "color", "#00A3FF" },
        { "fontSize", 14 },
    }
);
{{< /code-block >}}
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: https://github.com/googlesamples/unity-jar-resolver
[3]: https://openupm.com/packages/com.google.external-dependency-manager/
[4]: https://github.com/DataDog/unity-package
[5]: https://docs.unity3d.com/Manual/gradle-templates.html
[6]: /real_user_monitoring/application_monitoring/unity/setup
