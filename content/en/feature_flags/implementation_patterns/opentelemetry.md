---
title: Feature Flags with OpenTelemetry
description: Add Datadog Feature Flags to an application that uses OpenTelemetry for tracing.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/opentelemetry/instrument/dd_sdks/api_support/"
  tag: "Documentation"
  text: "OpenTelemetry API Support"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
---

## Overview

You can add [Datadog Feature Flags][1] to an application that uses [OpenTelemetry (OTel)][2] for tracing. Datadog supports two integration paths. In both cases, feature flags evaluate correctly and your existing OpenTelemetry API instrumentation code does not need to change.

Choose an integration option based on whether you are open to changing your tracing provider initialization:

| | Option A: Register the Datadog SDK as the TracerProvider | Option B: Run the Datadog SDK alongside OpenTelemetry |
| --- | --- | --- |
| **What changes** | Replace the OTel SDK `TracerProvider` with the Datadog SDK | Add the Datadog SDK alongside your OTel SDK |
| **Instrumentation changes** | None — existing OpenTelemetry API calls stay the same | None — your OTel setup stays unchanged |
| **Datadog visibility** | Traces and feature flags in Datadog | Feature flags only — the Datadog SDK does not send traces to Datadog |

If you can change your tracing provider initialization, Option A is recommended. It gives you one tracing runtime, full Datadog APM visibility, and feature flags. If you cannot change your tracing provider, Option B is a path to adopt feature flags without affecting your OTel trace pipeline.

## Prerequisites

Before you begin, confirm you have:

- **Datadog Agent** with [Remote Configuration][3] enabled. See [Agent configuration][4] for details.
- **Datadog [API key][5]** configured on the Agent
- An existing application instrumented with the OpenTelemetry API and, optionally, the OpenTelemetry SDK for your language

Each server-side language has minimum SDK version requirements:

| Language | Datadog SDK | OpenFeature SDK |
| --- | --- | --- |
| [.NET][9] | `dd-trace-dotnet` 3.36.0+ (.NET 6+) or 3.38.0+ (.NET Framework 4.6.2+) | `OpenFeature` NuGet package |
| [Go][10] | `dd-trace-go` 2.4.0+ | `github.com/open-feature/go-sdk/openfeature` |
| [Java][11] | `dd-java-agent` 1.57.0+ | `dev.openfeature:sdk` 1.18.2+ |
| [Node.js][12] | `dd-trace` 5.80.0+ | `@openfeature/server-sdk` ~1.20.0 |
| [Python][13] | `ddtrace` 3.19.0+ | `openfeature-sdk` 0.5.0+ |
| [Ruby][14] | `datadog` 2.23.0+ | `openfeature-sdk` 0.4.1+ |

**Note**: Ruby feature flags are [supported on Linux operating systems only][15].

## Application configuration

Configure these environment variables for all server-side languages. They apply to both integration options below:

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>

# Enable Remote Configuration in the SDK
DD_REMOTE_CONFIG_ENABLED=true

# Enable the feature flagging provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

<div class="alert alert-warning">The <code>DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true</code> environment variable is required to enable the feature flagging provider. The <code>EXPERIMENTAL_</code> prefix is kept for backwards compatibility; the provider is stable. Java also supports the system property <code>-Ddd.experimental.flagging.provider.enabled=true</code>. Node.js and Ruby support code-based configuration as an alternative — see your language tab below.</div>

## How feature flags work with the Datadog SDK

Datadog Feature Flags require a Datadog SDK because it is the client that fetches flag configurations through Remote Configuration from the Datadog Agent. There is no standalone feature flags client.

The flow works as follows:

1. The Datadog Agent connects to Datadog and receives feature flag configurations through Remote Configuration.
2. The Datadog SDK polls the Agent for flag configuration updates.
3. The Datadog SDK exposes flag configurations through the OpenFeature provider interface.
4. Your application evaluates flags with the [OpenFeature SDK][6].

This Remote Configuration channel is independent of the tracing pipeline. Feature flag delivery works whether the Datadog SDK is registered as the OTel `TracerProvider` (Option A) or runs alongside your OTel SDK with tracing disabled (Option B).

## Option A: Register the Datadog SDK as the TracerProvider (recommended)

In this option, the Datadog SDK replaces the OTel SDK as the `TracerProvider`. Your existing OpenTelemetry API instrumentation code — spans, attributes, events, and context propagation — stays the same. Only the initialization changes.

The Datadog SDK implements the OTel `TracerProvider` interface, so it can act as a drop-in replacement for the OTel SDK. Traces route through the Datadog SDK to the Datadog Agent using the standard APM intake. You do not need an OTLP endpoint for Datadog APM.

Complete the [application configuration](#application-configuration) steps first, then replace your OTel SDK `TracerProvider` initialization with the following setup for your language:

{{< tabs >}}
{{% tab ".NET" %}}

Install the [Datadog .NET SDK](/tracing/trace_collection/dd_libraries/dotnet-core/) and [enable the tracer for your service](/tracing/trace_collection/dd_libraries/dotnet-core/#enable-the-sdk-for-your-service). Set `DD_TRACE_OTEL_ENABLED=true` in your environment to emit your OpenTelemetry traces to Datadog. Remove your OpenTelemetry SDK `TracerProvider` and exporter initialization.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var ffProvider = new DatadogProvider();
await Api.Instance.SetProviderAsync(ffProvider);

var client = Api.Instance.GetClient("my-service");
{{< /code-block >}}

For more detail, see [OpenTelemetry API Support for .NET](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net&platform=traces).

{{% /tab %}}
{{% tab "Go" %}}

Start the Datadog tracer, register it as the OpenTelemetry `TracerProvider`, and initialize the OpenFeature provider:

{{< code-block lang="go" >}}
import (
    "log"

    ddotel "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
    "go.opentelemetry.io/otel"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    // Register the Datadog SDK as the OpenTelemetry TracerProvider
    otelProvider := ddotel.NewTracerProvider()
    defer otelProvider.Shutdown()
    otel.SetTracerProvider(otelProvider)

    // Register the Datadog OpenFeature provider
    flagProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    defer flagProvider.Shutdown()

    if err := openfeature.SetProviderAndWait(flagProvider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")

    // Your existing OpenTelemetry API calls continue to work unchanged
}
{{< /code-block >}}

For more detail, see [OpenTelemetry API Support for Go](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go&platform=traces).

{{% /tab %}}
{{% tab "Java" %}}

Start the Java tracer with OpenTelemetry API support enabled. Remove your OTel SDK `TracerProvider` initialization.

{{< code-block lang="bash" >}}
export DD_TRACE_OTEL_ENABLED=true

java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry API calls continue to work unchanged */
{{< /code-block >}}

**Note**: Depend on the OpenTelemetry API only, not the OpenTelemetry SDK. For more detail, see [OpenTelemetry API Support for Java](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java&platform=traces).

{{% /tab %}}
{{% tab "Node.js" %}}

Enable the feature flagging provider in code or with `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` from [Application configuration](#application-configuration):

{{< code-block lang="javascript" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    },
  },
});

// Register the Datadog SDK as the OpenTelemetry TracerProvider
const provider = new tracer.TracerProvider();
provider.register();

// Register the Datadog OpenFeature provider
OpenFeature.setProvider(tracer.openfeature);

// Your existing @opentelemetry/api calls continue to work unchanged:
// const otelTracer = require('@opentelemetry/api').trace.getTracer('my-service');
// otelTracer.startActiveSpan('my-operation', (span) => { ... });
{{< /code-block >}}

For more detail, see [OpenTelemetry API Support for Node.js](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces).

{{% /tab %}}
{{% tab "Python" %}}

Set `DD_TRACE_OTEL_ENABLED=true`, then configure the tracer and OpenFeature provider:

{{< code-block lang="python" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

# Register the Datadog OpenFeature provider
provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()

# Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

For more detail, see [OpenTelemetry API Support for Python](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python&platform=traces).

{{% /tab %}}
{{% tab "Ruby" %}}

Configure the Datadog SDK with OpenTelemetry support. Enable the feature flagging provider in code or with `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` from [Application configuration](#application-configuration):

{{< code-block lang="ruby" >}}
require 'datadog'
require 'opentelemetry/sdk'
require 'datadog/opentelemetry'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |c|
  c.remote.enabled = true
  c.open_feature.enabled = true
end

# Register the Datadog OpenFeature provider
OpenFeature::SDK.configure do |c|
  c.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
end

client = OpenFeature::SDK.build_client

# Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

For more detail, see [OpenTelemetry API Support for Ruby](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby&platform=traces).

{{% /tab %}}
{{< /tabs >}}

### What you gain

- Feature flags through Remote Configuration
- Datadog APM traces — your OTel spans appear in the [Traces Explorer][7]
- One tracing runtime instead of two

## Option B: Run the Datadog SDK alongside OpenTelemetry

In this option, your existing OTel SDK remains the `TracerProvider` for tracing. Add the Datadog SDK only for feature flag delivery through Remote Configuration. Your OTel SDK initialization, exporters, and instrumentation stay unchanged.

Complete the [application configuration](#application-configuration) steps first, then follow the setup for your language:

{{< tabs >}}
{{% tab ".NET" %}}

Install the [Datadog .NET SDK](/tracing/trace_collection/dd_libraries/dotnet-core/) and [enable the tracer for your service](/tracing/trace_collection/dd_libraries/dotnet-core/#enable-the-sdk-for-your-service). Set `DD_APM_TRACING_ENABLED=false` in your environment.

{{< code-block lang="csharp" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

var client = Api.Instance.GetClient("my-service");

// Your existing OpenTelemetry SDK initialization stays unchanged.
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

Set `DD_APM_TRACING_ENABLED=false` in your environment. Start the tracer and OpenFeature provider:

{{< code-block lang="go" >}}
import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    // Register the Datadog OpenFeature provider
    flagProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    defer flagProvider.Shutdown()

    if err := openfeature.SetProviderAndWait(flagProvider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")

    // Your existing OpenTelemetry SDK initialization stays unchanged.
    // Do not register the Datadog SDK as the TracerProvider.
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Set `DD_APM_TRACING_ENABLED=false` in your environment. Start the Java tracer with the `-javaagent` flag:

{{< code-block lang="bash" >}}
java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry SDK initialization stays unchanged. */
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

Initialize `dd-trace` with auto-instrumentation disabled and the feature flagging provider enabled:

{{< code-block lang="javascript" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init({
  plugins: false,
  experimental: {
    flaggingProvider: {
      enabled: true,
    },
  },
});

// Register the Datadog OpenFeature provider
OpenFeature.setProvider(tracer.openfeature);

// Your existing OpenTelemetry SDK initialization stays unchanged.
// Do not register dd-trace as the TracerProvider.
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

Set `DD_APM_TRACING_ENABLED=false` in your environment. Configure the tracer and OpenFeature provider:

{{< code-block lang="python" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

# Register the Datadog OpenFeature provider
provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()

# Your existing OpenTelemetry SDK initialization stays unchanged.
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

Configure the Datadog SDK with tracing disabled and the feature flagging provider enabled:

{{< code-block lang="ruby" >}}
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |c|
  c.remote.enabled = true
  c.open_feature.enabled = true
  c.tracing.enabled = false
end

# Register the Datadog OpenFeature provider
OpenFeature::SDK.configure do |c|
  c.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
end

client = OpenFeature::SDK.build_client

# Your existing OpenTelemetry SDK initialization stays unchanged.
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

With tracing disabled in the Datadog SDK, it does not interfere with your OTel tracing pipeline:

- No spans are sent to the Datadog Agent
- No service entry appears in the Datadog Service Catalog
- No out-of-the-box RED metrics are generated or double-counted
- The OTel SDK remains the global `TracerProvider`
- Your OTel exporter only sees spans created by your application code

### What you gain

- Feature flags through Remote Configuration
- Your existing OTel trace pipeline is unchanged

You can migrate to Option A later if you want Datadog APM visibility for your OTel spans.

## Evaluate feature flags

After you initialize the provider, evaluate flags with the OpenFeature client. Flag evaluation uses locally cached configuration, so evaluations do not make network requests.

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")
    .Set("companyID", "acme-corp")
    .Build();

var isEnabled = await client.GetBooleanValueAsync("my-flag", false, evalCtx);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="go" >}}
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "companyID": "acme-corp",
    },
)

enabled, err := client.BooleanValue(context.Background(), "my-flag", false, evalCtx)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

EvaluationContext context = new MutableContext("user-123")
    .add("companyID", "acme-corp");

boolean isEnabled = client.getBooleanValue("my-flag", false, context);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk';

const client = OpenFeature.getClient();

const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const isEnabled = await client.getBooleanValue(
  'my-flag',
  false,
  evaluationContext,
);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={"companyID": "acme-corp"},
)

is_enabled = client.get_boolean_value("my-flag", False, eval_ctx)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="ruby" >}}
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',
  companyID: 'acme-corp',
)

is_enabled = client.fetch_boolean_value(
  flag_key: 'my-flag',
  default_value: false,
  evaluation_context: context,
)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

In both integration options, feature flags evaluate the same way. Flag configurations are delivered through the same Remote Configuration channel. There is no difference in feature flag functionality between the two options.

For complete setup instructions, typed getters, evaluation context requirements, and testing patterns, see your language's server-side SDK documentation:

- [.NET Feature Flags][9]
- [Go Feature Flags][10]
- [Java Feature Flags][11]
- [Node.js Feature Flags][12]
- [Python Feature Flags][13]
- [Ruby Feature Flags][14]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/server/
[2]: https://opentelemetry.io/
[3]: /remote_configuration/
[4]: /feature_flags/server/#agent-configuration
[5]: /account_management/api-app-keys/#api-keys
[6]: https://openfeature.dev/
[7]: /tracing/trace_explorer/
[9]: /feature_flags/server/dotnet/
[10]: /feature_flags/server/go/
[11]: /feature_flags/server/java/
[12]: /feature_flags/server/nodejs/
[13]: /feature_flags/server/python/
[14]: /feature_flags/server/ruby/
[15]: /feature_flags/server/ruby/#prerequisites
