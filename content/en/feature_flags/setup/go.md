---
title: Go Feature Flags
description: Set up Datadog Feature Flags for Go applications.
further_reading:
- link: "/feature_flags/setup/"
  tag: "Documentation"
  text: "Feature Flags Setup"
- link: "/tracing/trace_collection/dd_libraries/go/"
  tag: "Documentation"
  text: "Go Tracing"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This page describes how to instrument your Go application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your application, experiment safely, and deliver new experiences with confidence.

This guide explains how to install and configure the SDK, create and use a client, and evaluate feature flags.

## Prerequisites

Before you begin, ensure you have:

- **Datadog Agent 7.55+** running with Remote Configuration enabled
- **Go 1.22+** installed in your development environment
- A Datadog account with Feature Flags access

## Installation

Add the Datadog tracing library and OpenFeature SDK as dependencies to your Go application:

{{< code-block lang="bash" >}}
go get github.com/DataDog/dd-trace-go/v2
go get github.com/open-feature/go-sdk
{{< /code-block >}}

## Initialize the SDK

Initialize the Datadog tracer and OpenFeature provider as early as possible in your application lifecycle—typically in your `main()` function. The tracer is required for Remote Configuration, which delivers flag configurations to your application.

{{< code-block lang="go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    // Start the Datadog tracer (required for Remote Config)
    tracer.Start()
    defer tracer.Stop()

    // Initialize the Datadog OpenFeature provider
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create Datadog OpenFeature provider: %v", err)
    }
    defer provider.(*ddopenfeature.DatadogProvider).Shutdown()

    // Set as the global provider and wait for initialization
    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set OpenFeature provider: %v", err)
    }

    // Your application code here
}
{{< /code-block >}}

<div class="alert alert-info">The <code>SetProviderAndWait</code> call blocks until the provider is ready to evaluate flags. This ensures flag configurations are available before your application starts serving requests.</div>

## Create a client

Create an OpenFeature client to evaluate flags. You can create multiple clients with different names to organize flag evaluations by feature area or service:

{{< code-block lang="go" >}}
// Create a client with your application name
client := openfeature.NewClient("my-app")

// Or create multiple clients for different feature areas
checkoutClient := openfeature.NewClient("checkout")
paymentClient := openfeature.NewClient("payment")
{{< /code-block >}}

## Set the evaluation context

Define who or what the flag evaluation applies to using an evaluation context. The evaluation context includes user or session information used to determine which flag variations should be returned.

{{< code-block lang="go" >}}
import "github.com/open-feature/go-sdk/openfeature"

evalCtx := openfeature.NewEvaluationContext(
    "user-123",  // Targeting key (typically user ID)
    map[string]interface{}{
        "email":   "user@example.com",
        "tier":    "premium",
        "country": "US",
    },
)
{{< /code-block >}}

The targeting key is used as the primary identifier for flag targeting rules and allocation. Additional attributes in the context map can be used for more granular targeting.

## Evaluate flags

After creating a client, you can start evaluating flag values throughout your application. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags.

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed method_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `BooleanValue` for flags that represent on/off or true/false conditions:

{{< code-block lang="go" >}}
ctx := context.Background()

isNewCheckoutEnabled, err := client.BooleanValue(ctx, "checkout.new", false, evalCtx)
if err != nil {
    log.Printf("Flag evaluation error: %v", err)
}

if isNewCheckoutEnabled {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### String flags

Use `StringValue` for flags that select between multiple variants or configuration strings:

{{< code-block lang="go" >}}
theme, err := client.StringValue(ctx, "ui.theme", "light", evalCtx)
if err != nil {
    log.Printf("Flag evaluation error: %v", err)
}

switch theme {
case "light":
    setLightTheme()
case "dark":
    setDarkTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### Integer flags

Use `IntValue` for flags that return integer values such as limits, counts, or percentages:

{{< code-block lang="go" >}}
maxItems, err := client.IntValue(ctx, "cart.items.max", 20, evalCtx)
if err != nil {
    log.Printf("Flag evaluation error: %v", err)
}

if len(cartItems) > int(maxItems) {
    return errors.New("cart item limit exceeded")
}
{{< /code-block >}}

### Float flags

Use `FloatValue` for flags that return floating-point values such as multipliers or thresholds:

{{< code-block lang="go" >}}
priceMultiplier, err := client.FloatValue(ctx, "pricing.multiplier", 1.0, evalCtx)
if err != nil {
    log.Printf("Flag evaluation error: %v", err)
}

finalPrice := basePrice * priceMultiplier
{{< /code-block >}}

### Object flags

Use `ObjectValue` for structured or JSON-like data. Object flags are useful for remote configuration scenarios where multiple properties need to be provided together:

{{< code-block lang="go" >}}
defaultConfig := map[string]interface{}{
    "color":    "#00A3FF",
    "fontSize": 14,
    "enabled":  true,
}

config, err := client.ObjectValue(ctx, "ui.config", defaultConfig, evalCtx)
if err != nil {
    log.Printf("Flag evaluation error: %v", err)
}

// Type assert to access the configuration
if configMap, ok := config.(map[string]interface{}); ok {
    color := configMap["color"].(string)
    fontSize := configMap["fontSize"].(float64)
}
{{< /code-block >}}

## Flag evaluation details

When you need more than just the flag value, use the details methods. These return both the evaluated value and metadata explaining the evaluation:

{{< code-block lang="go" >}}
details, err := client.BooleanValueDetails(ctx, "checkout.new", false, evalCtx)
if err != nil {
    log.Printf("Flag evaluation error: %v", err)
}

log.Printf("Value: %v", details.Value)           // The evaluated value
log.Printf("Variant: %s", details.Variant)       // Variant name, if applicable
log.Printf("Reason: %s", details.Reason)         // Why this value was chosen
log.Printf("Error Code: %s", details.ErrorCode)  // Error code, if any
{{< /code-block >}}

The following details methods are available:

- `BooleanValueDetails(ctx, key, defaultValue, evalCtx)`
- `StringValueDetails(ctx, key, defaultValue, evalCtx)`
- `IntValueDetails(ctx, key, defaultValue, evalCtx)`
- `FloatValueDetails(ctx, key, defaultValue, evalCtx)`
- `ObjectValueDetails(ctx, key, defaultValue, evalCtx)`

### Resolution reasons

The `Reason` field indicates why a particular value was returned:

| Reason | Description |
|--------|-------------|
| `TARGETING_MATCH` | Matched a targeting rule |
| `SPLIT` | Matched a percentage-based allocation |
| `DEFAULT` | Flag not found, using default value |
| `DISABLED` | Flag is disabled |
| `STATIC` | Static flag configuration |
| `CACHED` | Using cached evaluation result |
| `ERROR` | An error occurred during evaluation |

## Advanced configuration

### Agent configuration

The Datadog Agent delivers flag configurations to your application through Remote Configuration. Configure the following environment variables for the Agent:

{{< code-block lang="bash" >}}
# Enable Remote Configuration (required)
DD_REMOTE_CONFIGURATION_ENABLED=true

# Configure polling interval (default: 5s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=5s
{{< /code-block >}}

### Application environment variables

Configure your application with the standard Datadog environment variables:

{{< code-block lang="bash" >}}
# Required
DD_AGENT_HOST=localhost
DD_TRACE_AGENT_PORT=8126

# Service metadata
DD_SERVICE=my-app
DD_ENV=production
DD_VERSION=1.0.0
{{< /code-block >}}

### Provider configuration

The `NewDatadogProvider` function accepts an optional `ProviderConfig` for advanced customization:

{{< code-block lang="go" >}}
provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{
    // Configuration options
})
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
