---
title: Set Up APM Trace Enrichment for Feature Flags
description: Automatically attach feature flag evaluation data to APM traces so you can filter traces by flag variant and use APM metrics in experiments.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/feature_flags/guide/server_flag_evaluation_metrics/"
  tag: "Guide"
  text: "Set Up Server-Side Flag Evaluation Metrics"
- link: "/experiments/"
  tag: "Documentation"
  text: "Experiments"
- link: "/tracing/trace_explorer/"
  tag: "Documentation"
  text: "Trace Explorer"
---

## Overview

APM trace enrichment automatically attaches feature flag evaluation data to your APM traces. When a feature flag is evaluated during a traced request, the SDK records which flags were evaluated and which variants were returned. This data is written to the root span and processed server-side so you can:

- **Filter traces by flag variant** in [Trace Explorer][1] using `@feature_flags.<flag_key>:<variant>` facets.
- **Use APM error rates and latency as experiment metrics** to measure the impact of flag changes on application performance.
- **Debug flag-related issues** by seeing which flags were active when an error occurred.

<div class="alert alert-warning">APM trace enrichment is experimental and may change in a future release.</div>

APM trace enrichment is available in the following SDKs:

| Language | Minimum version |
| -------- | --------------- |
| Go       | 2.8.0           |
| Java     | 1.64.1          |
| Node.js  | 5.105.0         |

## Prerequisites

Before setting up APM trace enrichment, confirm the following:

- Server-side feature flags are already configured and flags are evaluating in your application.
- [APM tracing][3] is enabled and traces are flowing to Datadog.
- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` is set, or the equivalent code-based configuration for your language.

See [Server-Side Feature Flags][2] for details on setting up flags for supported languages.

## How APM trace enrichment works

When APM trace enrichment is enabled, the Datadog OpenFeature provider hooks into the evaluation life cycle:

1. Each time a flag is evaluated, the SDK captures the evaluation metadata (flag serial ID, targeting key, and default fallback value).
2. The metadata is accumulated on the root span of the current trace.
3. When the root span finishes, the SDK writes the accumulated data as compact span tags (`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`).
4. The Datadog backend decodes these tags and writes human-readable `@feature_flags.<flag_key>` facets to the span, making them searchable in Trace Explorer.

The SDK-side tags are transport-only and are stripped server-side. The tags visible to you in Trace Explorer are the decoded `@feature_flags.<flag_key>` facets.

## Enable APM trace enrichment

Set the following environment variables. The first enables the Datadog Feature Flags provider (if not already set), and the second enables span enrichment:

{{< code-block lang="bash" >}}
# Required: Enable the Datadog Feature Flags provider (if not already set)
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Enable APM trace enrichment
DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true
{{< /code-block >}}

The enrichment environment variable is supported by all supported server-side SDKs. No code changes are required. Enabling the variable activates the enrichment hook automatically when the Datadog OpenFeature provider initializes. Node.js additionally supports code-level configuration as shown in the language tabs below.

### Language-specific configuration

{{< tabs >}}
{{% tab "Go" %}}

No additional code configuration is needed. The `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` environment variable enables span enrichment when the `DatadogProvider` initializes.

{{< code-block lang="go" filename="main.go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")
    // Flag evaluations now enrich APM spans automatically
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

No additional code configuration is needed. The `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` environment variable enables span enrichment. Java also supports the system property `-Ddd.experimental.flagging.provider.span.enrichment.enabled=true` as an alternative.

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

You can also enable span enrichment in code:

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
      spanEnrichment: {
        enabled: true,
      },
    },
  },
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Verify APM trace enrichment

After deploying with span enrichment enabled:

1. Trigger requests in your application that evaluate feature flags.
2. Go to [Trace Explorer][1] and search for a recent trace from your service.
3. Open a trace and look for `@feature_flags.<flag_key>` attributes on the root span.

The SDK writes compact encoded tags (`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`) to the root span. The Datadog backend decodes these and produces human-readable `@feature_flags.<flag_key>` facets. This processing takes a few seconds after the span is ingested.

After backend processing, the root span contains attributes such as the following examples:

| Example attribute | Example value |
| --------- | ------------- |
| `@feature_flags.checkout-flow` | `treatment` |
| `@feature_flags.dark-mode` | `control` |

Each attribute key is `@feature_flags.<flag_key>` and the value is the variant returned by the evaluation.

### Troubleshooting

If `@feature_flags.<flag_key>` attributes do not appear on your traces:

- Confirm the Datadog OpenFeature provider is active (`DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`).
- Confirm span enrichment is enabled (`DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true`).
- Verify that your application is evaluating flags during traced requests. Enrichment only occurs when a flag is evaluated while a trace is active.
- Wait a few seconds after the span is ingested. The `@feature_flags.<flag_key>` facets are derived by backend processing and do not appear in raw span metadata.
- For debugging, inspect raw span metadata for the `ffe_flags_enc` tag. If this tag is present, the SDK is emitting enrichment data. Either the backend has not processed it yet, or the feature flag gate is not enabled for your organization.

## Search and filter by flag variant

These examples use the `@feature_flags.<flag_key>` facets to filter traces in Trace Explorer:

| Use case | Example query |
| -------- | ------------- |
| Traces for a specific variant | `@feature_flags.checkout-flow:treatment` |
| Errors under a variant | `@feature_flags.checkout-flow:treatment status:error` |
| Any trace where a flag was evaluated | `@feature_flags.checkout-flow:*` |
| Multiple flags on the same request | `@feature_flags.checkout-flow:treatment @feature_flags.new-search:enabled` |
| Scoped to service and environment | `env:production service:api-gateway @feature_flags.rate-limit-v2:enabled` |

## Use enriched traces across Datadog

Feature flag attributes on traces are available across Datadog:

- **Monitors**: Alert when the error count for a specific variant exceeds a threshold to catch variant-specific regressions.
- **Dashboards**: Add a timeseries widget comparing p99 latency across variants using `@feature_flags.<flag_key>` as a group-by dimension.
- **Notebooks**: Build an investigation notebook comparing control and treatment performance during an experiment.
- **Visualizations**: Use the Top List view in Trace Explorer to verify that rollout traffic distribution matches your targeting rules.

## Use with experiments

APM trace enrichment enables APM-derived metrics as experiment metrics. After enrichment is enabled, Datadog Experiments correlate feature flag allocations with trace-level data. You can measure the impact of flag variants on:

- **Error rate**: Compare error rates between control and treatment variants.
- **Latency**: Measure p50, p95, and p99 latency differences per variant.
- **Throughput**: Track request volume by variant.

See [Experiments][4] for details on defining metrics and launching experiments.

## Limits

The SDK enforces the following per-span limits to bound payload size:

| Limit | Value |
| ----- | ----- |
| Flag serial IDs per span | 128 to 200 (varies by SDK) |
| Subjects per span | 10 to 25 (varies by SDK) |
| Runtime default keys per span | 5 |
| Runtime default value length | 64 characters (truncated) |

Evaluations beyond these limits are dropped for that span.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/
[2]: /feature_flags/server/
[3]: /tracing/
[4]: /experiments/
