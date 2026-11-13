---
title: PHP Feature Flags
description: Set up Datadog Feature Flags for PHP applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/dd_libraries/php/"
  tag: "Documentation"
  text: "PHP Tracing"
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

## Getting started

Use agentless delivery to receive flag configuration directly from Datadog. The SDK evaluates flags locally from cached configuration.

### Install the SDK

Install the Datadog PHP extension version **1.28.0 or later**. Follow the [PHP library installation instructions][4]. The extension provides the Feature Flags API; an Agent and APM tracing are optional.

Use the Datadog PHP API with PHP 7 or later. For PHP 8 applications, you can also use the [OpenFeature][1] adapter.

### Configure flag delivery

Set these environment variables before PHP starts:

{{< code-block lang="bash" >}}
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
export DD_API_KEY='<DATADOG_API_KEY>'
export DD_ENV='<YOUR_ENVIRONMENT>'
{{< /code-block >}}

Set `DD_ENV` to your [Feature Flags environment][5]. Use a Datadog [API key][3]. For sites other than US1, also set `DD_SITE`. For the site selected on this page, use {{< region-param key="dd_site" code="true" >}}.

PHP requires an explicit `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` setting. Registering a provider or setting `DD_FEATURE_FLAGS_ENABLED=true` alone does not start configuration delivery. If `DD_FEATURE_FLAGS_ENABLED=false` is set, remove it or set it to `true`.

### Evaluate a flag

Create a Boolean flag named `my-flag`. Enable its **Server** distribution channel and enable it in the target environment.

For PHP 7 or PHP 8, create the Datadog client and evaluate the flag:

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();
$enabled = $flags->getBooleanValue('my-flag', false);
{{< /code-block >}}

Replace `my-flag` with a flag key from your environment. The example evaluates a global flag without targeting attributes.

For the OpenFeature API on PHP 8, install `open-feature/sdk` version 2.1 or later:

{{< code-block lang="bash" >}}
composer require open-feature/sdk:^2.1
{{< /code-block >}}

Register the Datadog provider and evaluate a flag:

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());
$client = $api->getClient('my-service');
$enabled = $client->getBooleanValue('my-flag', false);
{{< /code-block >}}

Both APIs use the same extension and environment settings. The first evaluation waits up to 10 seconds for initial configuration. If configuration is unavailable, the SDK returns the supplied default value. Later evaluations use available updates without starting another initialization wait.

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The targeting key is used for consistent traffic distribution, such as percentage rollouts. Additional attributes enable targeting rules, such as "enable for users in the US" or "enable for premium tier users."

### Datadog API

For the Datadog PHP API, pass context as an array with `targetingKey` and `attributes` keys:

{{< code-block lang="php" >}}
$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ],
];
{{< /code-block >}}

### OpenFeature adapter

For the OpenFeature adapter, use the OpenFeature PHP SDK's `EvaluationContext`:

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;

$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ])
);
{{< /code-block >}}

<div class="alert alert-warning">Evaluation context attributes must be flat primitive values: strings, numbers, and Booleans. Nested arrays, objects, and null values are ignored for targeting and exposure reporting.</div>

## Evaluate flags

After setting up the client, you can evaluate flags throughout your application. Each flag is identified by a unique string key and evaluated with a typed method that returns a value of the expected type. If the flag does not exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `getBooleanValue` for flags that represent on/off or true/false conditions:

{{< code-block lang="php" >}}
$enabled = $flags->getBooleanValue('new-checkout-flow', false, $context);

if ($enabled) {
    showNewCheckout();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

With OpenFeature:

{{< code-block lang="php" >}}
$enabled = $client->getBooleanValue('new-checkout-flow', false, $context);
{{< /code-block >}}

### String flags

Use `getStringValue` for flags that select between variants or configuration strings:

{{< code-block lang="php" >}}
$theme = $flags->getStringValue('ui-theme', 'light', $context);

switch ($theme) {
    case 'dark':
        setDarkTheme();
        break;
    case 'light':
    default:
        setLightTheme();
        break;
}
{{< /code-block >}}

### Numeric flags

For numeric flags, use `getIntegerValue` or `getFloatValue`. These methods are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="php" >}}
$maxItems = $flags->getIntegerValue('cart-max-items', 20, $context);

$discountRate = $flags->getFloatValue('discount-rate', 0.0, $context);
{{< /code-block >}}

### Object flags

For structured data, use `getObjectValue`. This returns a PHP array:

{{< code-block lang="php" >}}
$config = $flags->getObjectValue('feature-config', [
    'maxRetries' => 3,
    'timeout' => 30,
], $context);

$maxRetries = $config['maxRetries'] ?? 3;
$timeout = $config['timeout'] ?? 30;
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the `get<Type>Details` methods. These return both the evaluated value and metadata explaining the evaluation:

{{< code-block lang="php" >}}
$details = $flags->getBooleanDetails('new-feature', false, $context);

printf("Value: %s\n", $details->getValue() ? 'true' : 'false');
printf("Variant: %s\n", $details->getVariant() ?? 'none');
printf("Reason: %s\n", $details->getReason());

if ($details->isError()) {
    printf("Error Code: %s\n", $details->getErrorCode());
    printf("Error Message: %s\n", $details->getErrorMessage());
}
{{< /code-block >}}

Flag details help you debug evaluation behavior and understand why a user received a given value.

## Complete examples

The following examples combine initialization, evaluation context, typed evaluation, and evaluation details.

### PHP 7 and PHP 8: Datadog API

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();

$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'country' => 'US',
        'tier' => 'premium',
    ],
];

$details = $flags->getStringDetails('checkout-copy', 'control', $context);

if ($details->isError()) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $details->getErrorCode(),
        $details->getErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

### PHP 8: OpenFeature adapter

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('checkout-service', '1.0.0');
$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'country' => 'US',
        'tier' => 'premium',
    ])
);

$details = $client->getStringDetails('checkout-copy', 'control', $context);
$error = $details->getError();

if ($error !== null) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $error->getResolutionErrorCode()->getValue(),
        $error->getResolutionErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

## Evaluation without context

You can evaluate flags without providing an evaluation context. This is useful for global flags that do not require user-specific targeting:

{{< code-block lang="php" >}}
$maintenanceMode = $flags->getBooleanValue('maintenance-mode', false);

if ($maintenanceMode) {
    http_response_code(503);
    echo 'Service temporarily unavailable';
    return;
}
{{< /code-block >}}

## Additional configuration

### Service identification and tracing

Set `DD_SERVICE` and `DD_VERSION` to identify your application in telemetry. These settings are optional for receiving flags.

{{< code-block lang="bash" >}}
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

To add APM tracing, follow [Tracing PHP Applications][4]. For trace annotations, see [APM trace enrichment][9].

### Agent delivery

To receive flags through the Datadog Agent, configure the Agent with an [API key][3] and enable [Remote Configuration][2]. Set these application environment variables:

{{< code-block lang="bash" >}}
export DD_FEATURE_FLAGS_ENABLED=true
export DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
export DD_REMOTE_CONFIG_ENABLED=true
export DD_ENV='<YOUR_ENVIRONMENT>'
{{< /code-block >}}

The application API stays the same. Configure service identification as needed for your application.

### Migrate from Agent delivery

Set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` and provide `DD_API_KEY` in the PHP process environment. Keep `DD_ENV` matched to your flag environment. Set `DD_SITE` for sites other than US1, then remove `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` and restart PHP workers.

Replacing only `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` with `DD_FEATURE_FLAGS_ENABLED=true` stops configuration delivery. PHP also requires an explicit source. To retain Agent delivery, set `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`.

Keep Remote Configuration enabled if other Datadog products use it. For the shared migration procedure, see [Migrate an existing Remote Configuration setup][8].

### Delivery settings

The SDK polls for flag updates every 30 seconds. The request timeout is 5 seconds. Configure these values with `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` and `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS`.

Set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS` to change the first-evaluation timeout. Its default is `10000` milliseconds. Credentials, endpoint, and environment settings resolve at process startup. Restart PHP workers after changing them.

Agentless delivery requires the PHP library's subprocess sidecar. The default `auto` sidecar mode uses a subprocess when available. Thread mode, including automatic fallback to thread mode, does not support agentless configuration.

For additional source settings, see [Configuration sources][10].

## Testing

You can test against a dedicated Datadog test environment with the real Datadog provider, or replace feature flag evaluation with a test double in unit tests.

The OpenFeature PHP SDK 2.1 does not include a built-in in-memory provider. For unit tests, wrap feature flag evaluation behind an application interface and inject a fake implementation:

{{< code-block lang="php" filename="FeatureFlags.php" >}}
<?php

use DDTrace\FeatureFlags\Client;

interface FeatureFlagReader
{
    public function getBooleanValue($flagKey, $defaultValue, array $context = []);
}

final class DatadogFeatureFlagReader implements FeatureFlagReader
{
    private $client;

    public function __construct(Client $client = null)
    {
        $this->client = $client ?: new Client();
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return $this->client->getBooleanValue($flagKey, $defaultValue, $context);
    }
}

final class InMemoryFeatureFlagReader implements FeatureFlagReader
{
    private $flags;

    public function __construct(array $flags)
    {
        $this->flags = $flags;
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return array_key_exists($flagKey, $this->flags)
            ? (bool) $this->flags[$flagKey]
            : $defaultValue;
    }
}
{{< /code-block >}}

Use the fake in your test setup:

{{< code-block lang="php" filename="CheckoutTest.php" >}}
$flags = new InMemoryFeatureFlagReader([
    'new-checkout-flow' => true,
]);

$checkout = new CheckoutService($flags);

self::assertTrue($checkout->usesNewCheckoutFlow('user-123'));
{{< /code-block >}}

## Troubleshooting

### Feature flags always return default values

If feature flags unexpectedly always return default values, check the following:

- Verify the PHP extension version is 1.28.0 or later.
- Verify `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` is set before PHP starts.
- Verify `DD_FEATURE_FLAGS_ENABLED` is not set to `false`.
- Verify the PHP process receives `DD_API_KEY`, `DD_ENV`, and the correct `DD_SITE`.
- Verify `DD_ENV` matches the environment configured for your flag.
- Check that the PHP sidecar can connect to Datadog and uses subprocess mode.
- Inspect evaluation details to distinguish a returned default from a successful flag evaluation.
- If you select `remote_config`, verify Agent connectivity and Remote Configuration settings. See [Agent availability][11].

### OpenFeature provider not found

The OpenFeature adapter is available only for PHP 8 applications. If `DDTrace\OpenFeature\DataDogProvider` is not found:

- Verify the application is running on PHP 8 or later.
- Verify `open-feature/sdk` is installed through Composer.
- Verify the Datadog PHP tracer version includes feature flags support.

### Targeting rules do not match

If targeting rules do not match as expected:

- Set a stable `targetingKey` for the user, organization, session, or entity being evaluated.
- Pass custom targeting data under the `attributes` key when using the Datadog API.
- Use only flat primitive attributes. Nested arrays, objects, and null values are ignored.
- Verify the `DD_ENV` value appears in [{{< ui >}}Feature Flag Environments{{< /ui >}}][5].

### Verify flag metrics and exposures in Datadog

#### Flag evaluation metrics

The optional `feature_flag.evaluations` metric uses a separate OpenTelemetry (OTLP) export path. Set `DD_METRICS_OTEL_ENABLED=true` and configure an OTLP receiver to use this metric. These settings are not required to receive flags or send experiment exposures and evaluation-count events.

Each evaluation emits a counter tagged with the flag key, result variant, and evaluation reason. For receiver setup and troubleshooting, see [Set Up Server-Side Flag Evaluation Metrics][6]. For visualization options, see [Feature Flag Graphs][7].

#### Experiment exposures

Agentless delivery sends experiment exposures and evaluation-count events through a local event proxy when available. Otherwise, the SDK sends these events directly to Datadog using `DD_API_KEY` and `DD_SITE`.

Exposures appear only for flags associated with an experiment. Standard feature flags without an experiment association do not generate exposure events. If exposures are missing:

1. Verify the flag is associated with an experiment in the Datadog UI.
2. For agentless delivery, verify the PHP process has a valid `DD_API_KEY` and the correct `DD_SITE`.
3. Verify the sidecar can reach a local event proxy or the Datadog event intake. With Agent delivery, check the Agent's API key.
4. Use flat primitive attributes in the evaluation context. Nested arrays, objects, and null values are ignored for exposure reporting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /agent/remote_config/
[3]: /account_management/api-app-keys/#api-keys
[4]: /tracing/trace_collection/dd_libraries/php/
[5]: /feature_flags/concepts/environments/
[6]: /feature_flags/guide/server_flag_evaluation_metrics/
[7]: /feature_flags/concepts/flag_graphs/
[8]: /feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /feature_flags/guide/apm_trace_enrichment/
[10]: /feature_flags/concepts/configuration_sources/
[11]: /feature_flags/concepts/configuration_sources/#agent-availability
