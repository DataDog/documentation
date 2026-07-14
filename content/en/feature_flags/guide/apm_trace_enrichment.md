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

## Prerequisites

Before setting up APM trace enrichment, confirm the following:

- [Server-side feature flags][2] are already configured and flags are evaluating in your application.
- [APM tracing][3] is enabled and traces are flowing to Datadog.
- Your server-side tracer meets the minimum version for APM trace enrichment:

<!-- TODO: Update versions when each SDK releases with span enrichment support -->
| Language | Minimum tracer version |
| -------- | ---------------------- |
| .NET     | _TODO_                 |
| Go       | 2.8.0                  |
| Java     | _TODO_                 |
| Node.js  | 5.99.0                 |
| PHP      | _TODO_                 |
| Python   | _TODO_                 |
| Ruby     | _TODO_                 |

## How it works

When APM trace enrichment is enabled, the Datadog OpenFeature provider hooks into the evaluation life cycle:

1. Each time a flag is evaluated, the SDK captures the evaluation metadata (flag serial ID, targeting key, and default fallback value).
2. The metadata is accumulated on the root span of the current trace.
3. When the root span finishes, the SDK writes the accumulated data as compact span tags (`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`).
4. The Datadog backend decodes these tags and writes human-readable `@feature_flags.<flag_key>` facets to the span, making them searchable in Trace Explorer.

The SDK-side tags are transport-only and are stripped server-side. The tags visible to you in Trace Explorer are the decoded `@feature_flags.*` facets.

## Enable APM trace enrichment

Set the following environment variable in addition to the standard [server-side feature flag configuration][2]:

{{< code-block lang="bash" >}}
# Enable APM trace enrichment
DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true
{{< /code-block >}}

This environment variable is supported by all server-side SDKs. No code changes are required. Enabling the variable activates the enrichment hook automatically when the Datadog OpenFeature provider initializes.

### Language-specific configuration

{{< tabs >}}
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

<!-- TODO: Confirm minimum version for span enrichment release -->

{{% /tab %}}
{{% tab "Go" %}}

No additional code configuration is needed. The `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` environment variable enables span enrichment when the `DatadogProvider` initializes.

{{< code-block lang="go" filename="main.go" >}}
import (
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
    defer provider.Shutdown()

    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")
    // Flag evaluations now enrich APM spans automatically
}
{{< /code-block >}}

<!-- TODO: Confirm minimum version for span enrichment release -->

{{% /tab %}}
{{% tab "Java" %}}

No additional code configuration is needed. The `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` environment variable enables span enrichment. You can also use the system property `-Ddd.experimental.flagging.provider.span.enrichment.enabled=true`.

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

<!-- TODO: Confirm minimum version and system property name for span enrichment release -->

{{% /tab %}}
{{% tab "Python" %}}

No additional code configuration is needed. The `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` environment variable enables span enrichment.

{{< code-block lang="python" filename="app.py" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()
# Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

<!-- TODO: Confirm minimum version for span enrichment release -->

{{% /tab %}}
{{% tab "Ruby" %}}

You can also enable span enrichment in code:

{{< code-block lang="ruby" filename="app.rb" >}}
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |c|
  c.remote.enabled = true
  c.open_feature.enabled = true
  c.open_feature.span_enrichment_enabled = true
end

OpenFeature::SDK.configure do |c|
  c.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
end

client = OpenFeature::SDK.build_client
# Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

<!-- TODO: Confirm minimum version and Ruby config option name for span enrichment release -->

{{% /tab %}}
{{% tab "PHP" %}}

No additional code configuration is needed. The `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` environment variable enables span enrichment. The PHP SDK supports enrichment through both the OpenFeature `DataDogProvider` and the native `DDTrace\FeatureFlags\Client`.

{{< code-block lang="php" filename="app.php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

<!-- TODO: Confirm minimum version for span enrichment release -->

{{% /tab %}}
{{% tab ".NET" %}}

No additional code configuration is needed. The `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` environment variable enables span enrichment.

{{< code-block lang="csharp" filename="Program.cs" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

var client = Api.Instance.GetClient("my-service");
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

<!-- TODO: Confirm minimum version for span enrichment release -->

{{% /tab %}}
{{< /tabs >}}

## Verify enrichment is working

After deploying with span enrichment enabled:

1. Trigger requests in your application that evaluate feature flags.
2. Go to [Trace Explorer][1] and search for a recent trace from your service.
3. Open a trace and look for `@feature_flags.*` attributes on the root span. Each evaluated flag appears as `@feature_flags.<flag_key>` with the returned variant as the value.

### Search and filter by flag variant

Use the `@feature_flags.*` facets to filter traces in Trace Explorer:

{{< code-block lang="text" >}}
@feature_flags.checkout-flow:treatment
{{< /code-block >}}

This query returns all traces where the `checkout-flow` flag evaluated to `treatment`. Combine with other facets to narrow results:

{{< code-block lang="text" >}}
@feature_flags.checkout-flow:treatment service:web-store status:error
{{< /code-block >}}

## Use with experiments

APM trace enrichment enables APM-derived metrics as experiment metrics. After enrichment is enabled, the Datadog Experiments platform correlates feature flag allocations with trace-level data. You can measure the impact of flag variants on:

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
