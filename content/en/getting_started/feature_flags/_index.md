---
title: Getting Started with Feature Flags
description: Manage feature delivery with integrated observability, real-time metrics, and OpenFeature-compatible gradual rollouts.
further_reading:
    - link: '/feature_flags/client/'
      tag: 'Documentation'
      text: 'Client-Side SDKs'
    - link: '/feature_flags/server/'
      tag: 'Documentation'
      text: 'Server-Side SDKs'
    - link: 'https://www.datadoghq.com/blog/feature-flags/'
      tag: 'Blog'
      text: 'Ship features faster and safer with Datadog Feature Flags'
    - link: 'https://www.datadoghq.com/blog/experimental-data-datadog/'
      tag: 'Blog'
      text: 'How to bridge speed and quality in experiments through unified data'
    - link: 'https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/'
      tag: 'Blog'
      text: 'How Datadog Feature Flags is resilient to cloud provider failures'
    - link: "https://www.datadoghq.com/blog/guardrail-metrics"
      tag: "Blog"
      text: "Make use of guardrail metrics and stop babysitting your releases"
site_support_id: getting_started_feature_flags
---

## Overview

Datadog feature flags offer a powerful, integrated way to manage feature delivery, with built-in observability and seamless integration across the platform.

- **Real-time metrics:** Understand who's receiving each variant, as well as how your flag impacts the health & performance of your application—all in real time.

- **Supports common flag types:** Use Boolean, string, integer, numeric (float/double), or JSON variants. JavaScript SDKs use `getNumberValue()` for both integer and numeric variants, while Java, Swift, Kotlin, and Python expose separate integer and floating-point evaluation methods.

- **Built for experimentation:** Target specific audiences for A/B tests, roll out features gradually with canary releases, and automatically roll back when regressions are detected.

- **OpenFeature compatible:** Built on the OpenFeature standard, ensuring compatibility with existing OpenFeature implementations and providing a vendor-neutral approach to feature flag management.

## Feature Flags SDKs

This guide uses the JavaScript browser SDK as an example. You can integrate Datadog Feature Flags into any application using one of the following SDKs:

### Client-side SDKs

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/flutter/" src="integrations_logos/flutter_large.svg" alt="Dart and Flutter" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

### Server-side SDKs

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

## Configure your environments

Your organization likely already has pre-configured environments for Development, Staging, and Production. For details on environment queries, production marking, and managing environments, see [Environments][4].

## Create your first feature flag

### Step 1: Import and initialize the SDK

Choose the SDK that matches where the flag is evaluated and initialize the Datadog Feature Flags provider.

{{< tabs >}}
{{% tab "JavaScript browser" %}}

Install `@datadog/openfeature-browser`, `@openfeature/web-sdk`, and `@openfeature/core` as dependencies in your project:

{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

Then, add the following to your project to initialize the SDK:

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags are not supported for the selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
    // Required client-side Datadog credentials
    applicationId: '<APPLICATION_ID>',
    clientToken: '<CLIENT_TOKEN>',
    site: '{{< region-param key="dd_site" code="true" >}}',
    env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
    service: '<SERVICE_NAME>',
    version: '1.0.0'
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
{{< /code-block >}}

<div class="alert alert-info">The browser SDK emits three independent telemetry streams, all enabled by default. <code>enableExposureLogging</code> sends per-evaluation exposure events to the exposures intake. <code>enableFlagEvaluationTracking</code> sends aggregated evaluation telemetry to the flag-evaluation intake. <code>enableRumFeatureFlagTracking</code> attaches flag evaluations to RUM events and is the setting that can affect RUM usage. Disable only the stream you do not need.</div>

{{% /tab %}}
{{% tab "Node.js server" %}}

Install `dd-trace` and the OpenFeature server SDK:

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Enable the provider with environment variables:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

Or enable the provider in code:

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    }
  }
});

// Wait for the provider to initialize before evaluating flags.
await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Add the OpenFeature SDK and Datadog OpenFeature provider dependencies:

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.63.0'
}
{{< /code-block >}}

Enable the provider and start your application with the Java tracer:

{{< code-block lang="bash" >}}
# Required: Enable the feature flagging provider
# The EXPERIMENTAL_ prefix is historical; the provider is no longer experimental.
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

To emit flag evaluation metrics, add the OpenTelemetry SDK dependencies and configure the OTLP endpoint. See [Set Up Server-Side Flag Evaluation Metrics][9].

Register the Datadog OpenFeature provider:

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

Enable the provider with environment variables:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

Install the Datadog Python SDK and OpenFeature SDK:

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

Register the Datadog OpenFeature provider:

{{< code-block lang="python" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Initialize the tracer (required for Remote Configuration)
tracer.configure()

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### Credentials at a glance

| Credential | Used by | Where it goes | Sensitive? |
| --- | --- | --- | --- |
| Client token | Browser, mobile, and game SDKs | Client application configuration | No — safe to ship in public client code |
| Application ID | Browser and RUM-backed client SDKs | Client application configuration | No — public identifier |
| API key | Datadog Agent for server-side Remote Configuration | Agent configuration only | Yes — keep server-side only |

Do not put API keys in browser, mobile, or game applications.

More information about OpenFeature SDK configuration options can be found in its [documentation][1]. For more information on creating client tokens and application IDs, see [API and Application Keys][3].

### Step 2: Create a feature flag

Go to [{{< ui >}}Create Feature Flag{{< /ui >}}][2] in Datadog and configure the following:

- **Name and key**: The flag's display name and the key referenced in code
- **SDK distribution channels**: Control which SDKs receive your flag configuration; see [Distribution Channels][6]
- **Variant type** and **variant values**: See [Variants and Flag Types][5]

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}, {{< ui >}}variant keys{{< /ui >}}, and {{< ui >}}variant values{{< /ui >}} should be considered public when sent to client SDKs.
</div>

{{< img src="getting_started/feature_flags/create-feature-flags-2.png" alt="Create Feature Flag" style="width:100%;" >}}

### Step 3: Evaluate the flag and write feature code

In your application code, use the SDK to evaluate the flag and gate the new feature.

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Do not pass nested objects or arrays; they are not supported and can cause exposure data to be dropped.</div>

{{< tabs >}}
{{% tab "JavaScript browser" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
    org_id: 2,
    user_id: 'user-123',
    email: 'user@example.com',
    targetingKey: 'user-123'
});

// This is what the SDK returns if the flag is disabled in
// the current environment
const fallback = false;

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
    // Feature code here
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js server" %}}

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const isNewCheckoutEnabled = await client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
    evaluationContext, // context
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "email": "user@example.com",
        "tier": "premium"
    }
)

enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

After you've completed this step, redeploy the application to pick up these changes. Additional usage examples can be found in the platform-specific SDK pages linked above.

### Step 4: Define targeting rules and enable the feature flag

Configure [targeting rules][7] to define which subjects receive each variant. After saving your rules, enable the flag in your chosen environment.

<div class="alert alert-info">
As a general best practice, roll out changes in a Staging environment before Production.
</div>

For percentage rollouts, see [Traffic Splitting and Randomization][8].

### Step 5: Monitor your rollout

Monitor the feature rollout from the feature flag details page, which provides real-time exposure tracking and metrics such as {{< ui >}}error rate{{< /ui >}} and {{< ui >}}page load time{{< /ui >}}. As you incrementally release the feature with the flag, view the {{< ui >}}Real-time metric overview{{< /ui >}} panel in the Datadog UI to see how the feature impacts application performance.

{{< img src="getting_started/feature_flags/real-time-flag-metrics-2.png" alt="Real-time flag metrics panel" style="width:100%;" >}}

For server-side applications, you can also enable flag evaluation metrics to track how often each variant is returned and graph the data on dashboards. See [Set Up Server-Side Flag Evaluation Metrics][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[4]: /feature_flags/concepts/environments/
[5]: /feature_flags/concepts/variants_and_flag_types/
[6]: /feature_flags/concepts/distribution_channels/
[7]: /feature_flags/concepts/targeting_rules/
[8]: /feature_flags/concepts/traffic_splitting/
[9]: /feature_flags/guide/server_flag_evaluation_metrics/
