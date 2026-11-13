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
- link: "/feature_flags/guide/server_flag_evaluation_metrics/"
  tag: "Guide"
  text: "Set Up Server-Side Flag Evaluation Metrics"
- link: "/feature_flags/guide/apm_trace_enrichment/"
  tag: "Guide"
  text: "Set Up APM Trace Enrichment for Feature Flags"
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Concept"
  text: "Feature Flag Graphs"
---

## Overview

This page describes how to instrument your Go application with the Datadog Feature Flags SDK. The Go SDK integrates with [OpenFeature][1], an open standard for feature flag management, and receives flag updates through Remote Configuration in the Datadog Go tracer (`dd-trace-go`).

This guide explains how to install and enable the SDK, create an OpenFeature client, and evaluate feature flags in your application.

## Prerequisites

Before setting up the Go Feature Flags SDK, ensure you have:

- **Datadog Agent** version 7.55 or later with [Remote Configuration][2] enabled
- **Datadog [API key][3]** configured on the Agent
- **Datadog Go SDK** `dd-trace-go` version 2.4.0 or later

Set the following environment variables:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true

# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

<div class="alert alert-info">The <code>EXPERIMENTAL_</code> prefix is retained for backwards compatibility; the provider itself is stable.</div>

To configure `feature_flag.evaluations`, including the required tracer version and Agent OTLP setup, see [Set Up Server-Side Flag Evaluation Metrics][4]. For more information on available graphing, see [Feature Flag Graphs][5].

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

Start the Datadog Go tracer and register the Datadog OpenFeature provider. The tracer must be started first because it enables Remote Configuration, which delivers flag configurations to your application.

Start the Datadog Agent before the application. If the application starts first, restart it after the Agent is available. See [Agent availability][6].

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

## Create a client

Create an OpenFeature client to evaluate flags. You can create multiple clients with different names for different parts of your application:

{{< code-block lang="go" >}}
// Create a client for your application
client := openfeature.NewClient("my-service")
{{< /code-block >}}

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

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

## Control flag evaluation telemetry and experiment participation

Both controls require `dd-trace-go/v2` version `2.12.0` or later. They are independent and disabled by default. See [Flag Evaluation and Experimentation Opt-Out][8] for shared behavior.

Set these variables before constructing the provider:

```bash
DD_FEATURE_FLAGS_EVALUATION_TELEMETRY_PER_SUBJECT_OPT_OUT_ENABLED=true
DD_FEATURE_FLAGS_EXPERIMENTATION_OPT_OUT_MODE=immediate
```

Register the provider during startup. Pass both preferences with each subject's evaluation:

```go
import (
    "context"
    "log"

    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
if err != nil {
    log.Fatal(err)
}
if err := openfeature.SetProviderAndWait(provider); err != nil {
    log.Printf("Feature Flags initialization failed: %v", err)
}
client := openfeature.NewClient("my-service")

evalCtx := openfeature.NewEvaluationContext("user-123", map[string]any{
    "dd_evaluation_telemetry_opt_out": true,
    "dd_experimentation_opt_out_at": "2026-10-30T12:00:00Z",
})
enabled, err := client.BooleanValue(context.Background(), "new-checkout", false, evalCtx)
```

Place initialization in the application's startup function. Replace the example timestamp with the subject's stored preference.

For programmatic configuration, set `ProviderConfig.EnableEvaluationTelemetryOptOutParameter` to a `*bool`. Set `ProviderConfig.ExperimentationOptOutMode` to `ExperimentationOptOutImmediate`, `ExperimentationOptOutFutureExperimentsOnly`, or `ExperimentationOptOutDisabled`. Explicit values override the environment; a nil Boolean pointer and `ExperimentationOptOutDefault` use the environment.

Use `future_experiments_only` to retain allocations activated strictly before the stored timestamp. This checks allocation activation, not prior enrollment. Invalid subject timestamps return the default with `INVALID_CONTEXT` in either enabled mode. Invalid activation metadata returns `PARSE_ERROR` for the affected flag when an opted-out subject uses future mode.

Telemetry opt-out suppresses new evaluation events, evaluation metrics, and automatic flag span annotations. Exposures remain enabled for eligible allocations. Supply a separate context for each request. To resume telemetry, omit its attribute or set it to `false`. To permit experimentation again, omit the timestamp.

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

## Record exposures in your own data store

Use `ddopenfeature.NewExposureHook` to record exposures in your own logs, data warehouse, or analytics pipeline. It calls your code after each flag evaluation with the same exposure decision that the provider uses for Datadog. To stop sending exposures to Datadog, set `DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false`. This requires `dd-trace-go` 2.12.0 or later. See [Record Feature Flag Exposures in Your Own Data Store][7].

## Testing

You can test against a dedicated Datadog test environment with the real `DatadogProvider`, or swap it for OpenFeature's in-memory provider to control flag values directly in test code. This section shows the in-memory approach, which keeps tests hermetic and offline. The in-memory provider ships in the upstream `go-sdk` module under `github.com/open-feature/go-sdk/openfeature/memprovider`, so no additional dependency is required.

Register the in-memory provider under a **named client** rather than the default global provider. The default provider is process-global, which breaks `t.Parallel()` and leaks flag state between tests. A named client scopes the provider to each test.

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

`ContextEvaluator` is defined as `*func(...)` — a pointer to a function. Define the evaluator in a local variable and pass its address with `&`, as shown above. Omit `ContextEvaluator` entirely to always return `DefaultVariant`.

[1]: https://openfeature.dev/
[2]: /agent/remote_config/
[3]: /account_management/api-app-keys/#api-keys
[4]: /feature_flags/guide/server_flag_evaluation_metrics/
[5]: /feature_flags/concepts/flag_graphs/
[6]: /feature_flags/concepts/configuration_sources/#agent-availability
[7]: /feature_flags/guide/record_exposures_in_your_own_data_store/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: /feature_flags/concepts/opt_out/
