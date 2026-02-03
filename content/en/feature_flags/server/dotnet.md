---
title: .NET Feature Flags
description: Set up Datadog Feature Flags for .NET applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/dd_libraries/dotnet-core/"
  tag: "Documentation"
  text: ".NET Tracing"
---

## Overview

This page describes how to instrument your .NET application with the Datadog Feature Flags SDK. The .NET SDK integrates with [OpenFeature][1], an open standard for feature flag management, and uses the Datadog tracer's Remote Configuration to receive flag updates in real time.

This guide explains how to install and enable the SDK, create an OpenFeature client, and evaluate feature flags in your application.

## Prerequisites

Before setting up the .NET Feature Flags SDK, ensure you have:

- **Datadog Agent** version 7.55 or later with [Remote Configuration][2] enabled
- **Datadog .NET tracer** `dd-trace-dotnet` version 3.36.0 or later
- **.NET runtime** version 6.0 or later

Set the following environment variables:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## Installation

Install the Datadog .NET tracer and OpenFeature SDK using NuGet:

{{< code-block lang="bash" >}}
dotnet add package Datadog.Trace
dotnet add package OpenFeature
{{< /code-block >}}

Or add them to your `.csproj` file:

{{< code-block lang="xml" filename="MyProject.csproj" >}}
<ItemGroup>
  <PackageReference Include="Datadog.Trace" Version="3.36.0" />
  <PackageReference Include="OpenFeature" Version="2.0.0" />
</ItemGroup>
{{< /code-block >}}

## Initialize the SDK

Register the Datadog OpenFeature provider with the OpenFeature API. The provider connects to the Datadog tracer's Remote Configuration system to receive flag configurations.

### Blocking initialization

Use `SetProviderAsync` with `await` to block evaluation until the initial flag configuration is received. This ensures flags are ready before your application starts handling requests.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.Trace.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
{{< /code-block >}}

### Non-blocking initialization

Use `SetProvider` to register the provider without waiting. Flag evaluations return default values until the configuration is received.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.Trace.FeatureFlags.OpenFeature;

// Create and register the Datadog provider
var provider = new DatadogProvider();
Api.Instance.SetProvider(provider);

// Create an OpenFeature client
var client = Api.Instance.GetClient("my-service");

// Your application code here
// Flag evaluations return defaults until configuration is received
{{< /code-block >}}

## Create a client

Create an OpenFeature client to evaluate flags. You can create multiple clients with different names for different parts of your application:

{{< code-block lang="csharp" >}}
// Create a client for your application
var client = Api.Instance.GetClient("my-service");
{{< /code-block >}}

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

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

**Note:** In server-side applications, build the evaluation context once per request based on the current user, then pass the same context to all flag evaluations within that request. Only rebuild the context if user attributes change.

The targeting key is used for consistent traffic distribution (percentage rollouts). Additional attributes enable targeting rules, such as "enable for users in the US" or "enable for premium tier users" in the example above.

## Evaluate flags

After setting up the provider and creating a client, you can evaluate flags throughout your application. Flag evaluation is local and fast—the SDK uses locally cached configuration data, so no network requests occur during evaluation.

Each flag is identified by a key (a unique string) and can be evaluated with a typed method that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `GetBooleanValueAsync` for flags that represent on/off or true/false conditions:

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

### String flags

Use `GetStringValueAsync` for flags that select between multiple variants or configuration strings:

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

### Numeric flags

For numeric flags, use `GetIntegerValueAsync` or `GetDoubleValueAsync`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="csharp" >}}
var maxItems = await client.GetIntegerValueAsync("cart-max-items", 20, evalCtx);

var discountRate = await client.GetDoubleValueAsync("discount-rate", 0.0, evalCtx);
{{< /code-block >}}

### Object flags

For structured data, use `GetObjectValueAsync`. This returns a value that can be used to access complex configuration:

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

### Flag evaluation details

When you need more than just the flag value, use the `*DetailsAsync` methods. These return both the evaluated value and metadata explaining the evaluation:

{{< code-block lang="csharp" >}}
var details = await client.GetBooleanDetailsAsync("new-feature", false, evalCtx);

Console.WriteLine($"Value: {details.Value}");
Console.WriteLine($"Variant: {details.Variant}");
Console.WriteLine($"Reason: {details.Reason}");
Console.WriteLine($"Error Type: {details.ErrorType}");
Console.WriteLine($"Error Message: {details.ErrorMessage}");
{{< /code-block >}}

Flag details help you debug evaluation behavior and understand why a user received a given value.

## Waiting for provider initialization

By default, the provider initializes asynchronously and flag evaluations return default values until the first Remote Configuration payload is received. If your application requires flags to be ready before handling requests, you can wait for the provider to initialize using event handlers:

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

## Cleanup

When your application exits, shut down the OpenFeature API to clean up resources:

{{< code-block lang="csharp" >}}
await Api.Instance.ShutdownAsync();
{{< /code-block >}}

## Troubleshooting

### Provider not enabled

If you receive warnings about the provider not being enabled, ensure `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` is set in your environment or application configuration:

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

For containerized applications, add this to your Docker or Kubernetes configuration:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
environment:
  - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
  - DD_SERVICE=my-service
  - DD_ENV=production
{{< /code-block >}}

### Remote Configuration not working

Verify the following to ensure that Remote Configuration is working:
- Datadog Agent is the [required version](#prerequisites)
- Remote Configuration is enabled on the Agent
- `DD_SERVICE` and `DD_ENV` environment variables are set
- The tracer can communicate with the Agent

### Async evaluation errors

The .NET OpenFeature SDK uses async methods for all flag evaluations. Ensure you're using `await` or properly handling the returned `Task`:

{{< code-block lang="csharp" >}}
// Correct: Using await
var enabled = await client.GetBooleanValueAsync("flag-key", false, context);

// Incorrect: Not awaiting (will not work as expected)
var enabled = client.GetBooleanValueAsync("flag-key", false, context);
{{< /code-block >}}

[1]: https://openfeature.dev/
[2]: /agent/remote_config/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
