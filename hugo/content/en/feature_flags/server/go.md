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

The Datadog Go SDK receives flag configuration directly from Datadog by default and evaluates flags locally. No Datadog Agent or tracer startup is required. The provider implements [OpenFeature][1].

## Getting started

Use `dd-trace-go` 2.12.0 or later and a Go runtime supported by that release. Create a Boolean flag named `my-flag`. Enable its **Server** distribution channel and enable it in the target environment.

Install the provider and OpenFeature SDK:

```bash
go get github.com/DataDog/dd-trace-go/v2/openfeature@v2.12.0
go get github.com/open-feature/go-sdk/openfeature
```

Set the application [API key][3] and flag environment before startup:

```bash
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'
```

Set `DD_SITE` if the organization uses a site other than `datadoghq.com`. For the selected site, use {{< region-param key="dd_site" code="true" >}}.

Register the provider and evaluate the flag:

```go
package main

import (
    "context"
    "log"

    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatal(err)
    }
    defer openfeature.Shutdown()

    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Print(err)
        return
    }
    client := openfeature.NewClient("my-service")
    enabled, err := client.BooleanValue(context.Background(), "my-flag", false,
        openfeature.NewEvaluationContext("user-123", nil))
    if err != nil {
        log.Print(err)
    }
    log.Println(enabled)
}
```

No `tracer.Start()`, Feature Flags enablement, or source setting is required for a new setup. Keep the provider for the application lifetime and shut it down when the application exits. For an existing Agent setup, follow [Migrate an existing Remote Configuration setup][8].

## Initialization options

`SetProviderAndWait` waits for the first configuration. The provider timeout defaults to 10 seconds. To set an application deadline, use `SetProviderWithContextAndWait`:

```go
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
err := openfeature.SetProviderWithContextAndWait(ctx, provider)
```

Use `openfeature.SetProvider(provider)` for background initialization. Evaluations return caller-provided defaults until configuration arrives.

## Use Agent delivery

To retain Agent-managed delivery, configure Datadog Agent 7.55 or later with [Remote Configuration][2] and an API key. Set this application variable before startup:

```bash
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
```

Register the provider as shown above. If the application uses APM, retain its tracer startup and shutdown. Start the Agent before the application. See [Agent availability][6].

Agentless mode sends experiment exposures and aggregated flag evaluation events through a compatible local relay when available. Otherwise, it uses direct HTTPS intake with the application API key. The `feature_flag.evaluations` OTLP metric requires a separate [metrics setup][4].

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

Use `ddopenfeature.NewExposureHook` to record exposures in your own logs, data warehouse, or analytics pipeline. It calls your code after each flag evaluation with the same exposure decision that the provider uses for Datadog. To stop sending exposures to Datadog, set `DD_FEATURE_FLAGS_EXPOSURES_DATADOG_LOGGING_ENABLED=false`. See [Record Feature Flag Exposures in Your Own Data Store][7].

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

[8]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
