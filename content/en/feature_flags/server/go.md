---
title: Go Feature Flags
description: Set up Datadog Feature Flags for Go applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/dd_libraries/go/"
  tag: "Documentation"
  text: "Go Tracing"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This page describes how to instrument your Go application with the Datadog Feature Flags SDK. The Go SDK integrates with [OpenFeature][1], an open standard for feature flag management, and uses the Datadog tracer's Remote Configuration to receive flag updates in real time.

This guide explains how to install and enable the SDK, create an OpenFeature client, and evaluate feature flags in your application.

## Prerequisites

In addition to the [common server-side prerequisites][2], ensure you have:

- **Datadog Go tracer** `dd-trace-go` version 2.4.0 or later

Set the following environment variable to enable feature flags:

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

## Installation

Install the Datadog OpenFeature provider package:

{{< code-block lang="bash" >}}
go get github.com/DataDog/dd-trace-go/v2/openfeature
{{< /code-block >}}

You also need the OpenFeature Go SDK:

{{< code-block lang="bash" >}}
go get github.com/open-feature/go-sdk/openfeature
{{< /code-block >}}

## Initialize the SDK

Start the Datadog tracer and register the Datadog OpenFeature provider. The tracer must be started first because it enables Remote Configuration, which delivers flag configurations to your application.

### Blocking initialization

Use `SetProviderAndWait` to block evaluation until the initial flag configuration is received. This ensures flags are ready before your application starts handling requests.

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

To specify a custom timeout, use `SetProviderAndWaitWithContext`:

{{< code-block lang="go" >}}
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

if err := openfeature.SetProviderAndWaitWithContext(ctx, provider); err != nil {
    log.Fatalf("Failed to set provider: %v", err)
}
{{< /code-block >}}

### Non-blocking initialization

Use `SetProvider` to register the provider without waiting. Flag evaluations return default values until the configuration is received.

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

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

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

The targeting key is used for consistent traffic distribution (percentage rollouts). Additional attributes enable targeting rules, such as "enable for users in the US" or "enable for premium tier users" in the example above.

## Evaluate flags

After setting up the provider and creating a client, you can evaluate flags throughout your application. Flag evaluation is local and fast—the SDK uses locally cached configuration data, so no network requests occur during evaluation.

Each flag is identified by a key (a unique string) and can be evaluated with a typed method that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `BooleanValue` for flags that represent on/off or true/false conditions:

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

### String flags

Use `StringValue` for flags that select between multiple variants or configuration strings:

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

### Numeric flags

For numeric flags, use `IntValue` or `FloatValue`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

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

### Object flags

For structured data, use `ObjectValue`. This returns a value that can be type-asserted to maps or other complex types:

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

### Flag evaluation details

When you need more than just the flag value, use the `*ValueDetails` methods. These return both the evaluated value and metadata explaining the evaluation:

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

Flag details help you debug evaluation behavior and understand why a user received a given value.

### Evaluation without context

You can evaluate flags without providing an evaluation context. This is useful for global flags that don't require user-specific targeting:

{{< code-block lang="go" >}}
// Global feature flag - no context needed
maintenanceMode, err := client.BooleanValue(ctx, "maintenance-mode", false, openfeature.EvaluationContext{})
if err != nil {
    log.Printf("Error evaluating flag: %v", err)
}

if maintenanceMode {
    http.Error(w, "Service temporarily unavailable", http.StatusServiceUnavailable)
    return
}
{{< /code-block >}}

[1]: https://openfeature.dev/
[2]: /feature_flags/server/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
