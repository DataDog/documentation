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

You can add [Datadog Feature Flags][1] to an application that uses [OpenTelemetry (OTel)][2] for tracing. Datadog supports two integration options. In both cases, feature flags evaluate correctly and your existing OpenTelemetry API instrumentation code remains the same.

Choose an integration option based on whether you can change your tracing provider initialization:

- **Option A:** Register the Datadog SDK as the TracerProvider
- **Option B:** Run the Datadog SDK alongside OpenTelemetry

If you can change your tracing provider initialization, Option A is recommended. If you cannot change your tracing provider, use Option B to adopt feature flags without changing your OTel trace pipeline.

## Prerequisites

Follow the Datadog Feature Flags installation guide for your language:

- [.NET Feature Flags][3]
- [Go Feature Flags][4]
- [Java Feature Flags][5]
- [Node.js Feature Flags][6]
- [Python Feature Flags][7]
- [Ruby Feature Flags][8]

## Option A: Register the Datadog SDK as the TracerProvider

In this option, the Datadog SDK replaces the OTel SDK as the `TracerProvider`. Your existing OpenTelemetry API instrumentation code — spans, attributes, events, and context propagation — stays the same.

<div class="alert alert-warning">Remove any existing OpenTelemetry TracerProvider and exporter initialization to avoid duplicate traces.</div>

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="csharp" filename="Program.cs" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var ffProvider = new DatadogProvider();
await Api.Instance.SetProviderAsync(ffProvider);

var client = Api.Instance.GetClient("my-service");

// Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

For more detail, see [OpenTelemetry API Support for .NET][9].

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="go" filename="main.go" >}}
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

For more detail, see [OpenTelemetry API Support for Go][10].

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry API calls continue to work unchanged */
{{< /code-block >}}

**Note**: Depend only on the OpenTelemetry API, not the OpenTelemetry SDK. For more detail, see [OpenTelemetry API Support for Java][11].

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';
import * as otel from '@opentelemetry/api';

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
const otelTracer = otel.trace.getTracer('my-service');
otelTracer.startActiveSpan('my-operation', (span) => { ... });
{{< /code-block >}}

For more detail, see [OpenTelemetry API Support for Node.js][12].

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="python" filename="app.py" >}}
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

For more detail, see [OpenTelemetry API Support for Python][13].

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="ruby" filename="app.rb" >}}
require 'datadog'
require 'opentelemetry/sdk'
require 'datadog/opentelemetry'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

# Enable remote configuration and OpenFeature integration
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

For more detail, see [OpenTelemetry API Support for Ruby][14].

{{% /tab %}}
{{< /tabs >}}

## Option B: Run the Datadog SDK alongside OpenTelemetry

In this option, your existing OTel SDK remains the `TracerProvider` for tracing. Add the Datadog SDK only for feature flag delivery through Remote Configuration. Your OTel SDK initialization, exporters, and instrumentation stay unchanged.

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="csharp" filename="Program.cs" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

var client = Api.Instance.GetClient("my-service");

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="go" filename="main.go" >}}
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

    // Your existing OpenTelemetry SDK initialization stays unchanged
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry SDK initialization stays unchanged */
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="javascript" filename="app.js" >}}
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

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="python" filename="app.py" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

# Register the Datadog OpenFeature provider
provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()

# Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="ruby" filename="app.rb" >}}
require 'datadog'
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

# Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

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

In both integration options, feature flags evaluate the same way. Flag configurations are delivered through the same Remote Configuration channel.

For complete setup instructions, typed getters, evaluation context requirements, and testing patterns, see your language's server-side SDK documentation:

- [.NET Feature Flags][3]
- [Go Feature Flags][4]
- [Java Feature Flags][5]
- [Node.js Feature Flags][6]
- [Python Feature Flags][7]
- [Ruby Feature Flags][8]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/server/
[2]: https://opentelemetry.io/
[3]: /feature_flags/server/dotnet/
[4]: /feature_flags/server/go/
[5]: /feature_flags/server/java/
[6]: /feature_flags/server/nodejs/
[7]: /feature_flags/server/python/
[8]: /feature_flags/server/ruby/
[9]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net&platform=traces
[10]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go&platform=traces
[11]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java&platform=traces
[12]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces
[13]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python&platform=traces
[14]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby&platform=traces
