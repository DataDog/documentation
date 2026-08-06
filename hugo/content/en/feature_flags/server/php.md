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
- link: "/feature_flags/concepts/flag_graphs/"
  tag: "Concept"
  text: "Feature Flag Graphs"
---

## Overview

This page describes how to instrument your PHP application with the Datadog Feature Flags SDK. The PHP SDK uses the Datadog SDK's Remote Configuration to receive flag updates in real time.

The PHP SDK provides two application APIs:

- **Datadog PHP API**: Use `DDTrace\FeatureFlags\Client` with PHP 7 or PHP 8 applications.
- **OpenFeature adapter**: Use `DDTrace\OpenFeature\DataDogProvider` with PHP 8 applications that use the [OpenFeature][1] standard API.

Flag evaluation is local and fast. The SDK uses locally cached configuration data, so no network requests occur during evaluation.

## Prerequisites

Before setting up the PHP Feature Flags SDK, ensure you have:

- **Datadog Agent** with [Remote Configuration][2] enabled
- **Datadog [API key][3]** configured on the Agent
- **Datadog PHP SDK** `datadog/dd-trace` version 1.21.0 or later
- **Supported PHP runtime**: PHP 7 or later with the Datadog PHP API, or PHP 8 or later with the OpenFeature adapter
- **OpenFeature PHP SDK** `open-feature/sdk` version 2.1 or later, if you use the OpenFeature adapter

Set the following environment variables:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Enable Remote Configuration in the SDK
export DD_REMOTE_CONFIG_ENABLED=true

# Required: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_VERSION=<YOUR_APP_VERSION>

# Required for flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

<div class="alert alert-info">The <code>EXPERIMENTAL_</code> prefix is retained for backwards compatibility; the provider itself is stable.</div>

To configure `feature_flag.evaluations`, including the required tracer version and Agent OTLP setup, see [Set Up Server-Side Flag Evaluation Metrics][6]. For more information on available graphing, see [Feature Flag Graphs][7].

## Installation

Feature Flagging is provided by Application Performance Monitoring (APM). Install and configure the Datadog PHP tracer by following [Tracing PHP Applications][4].

If you use the OpenFeature adapter in a PHP 8 application, install the OpenFeature PHP SDK:

{{< code-block lang="bash" >}}
composer require open-feature/sdk:^2.1
{{< /code-block >}}

## Initialize the SDK

Choose the API that matches your PHP runtime and application architecture.

### PHP 7 and PHP 8: Datadog API

Use `DDTrace\FeatureFlags\Client` directly in PHP 7 or PHP 8 applications:

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();
{{< /code-block >}}

### PHP 8: OpenFeature adapter

In PHP 8 applications, you can register Datadog as the OpenFeature provider:

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');
{{< /code-block >}}

The OpenFeature provider returns default values until Remote Configuration delivers the initial flag configuration. Initialize the provider early in application startup so flag configuration has time to load before business logic evaluates flags.

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

- Verify `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` is set in your application environment.
- Verify Remote Configuration is enabled in your Datadog Agent configuration.
- Ensure `DD_SERVICE` and `DD_ENV` are set and match the service and environment configured for your flag.
- Confirm your Datadog PHP SDK version includes feature flags support.
- Check that the PHP process can communicate with the Datadog Agent.

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

Flag evaluation counts appear in Datadog when `DD_METRICS_OTEL_ENABLED=true` is set for the PHP tracer. Each evaluation emits a `feature_flag.evaluations` counter metric tagged with the flag key, result variant, and evaluation reason. If this metric does not appear, confirm `DD_METRICS_OTEL_ENABLED=true` is set in your environment and that your PHP tracer version supports flag evaluation metrics. See [Set Up Server-Side Flag Evaluation Metrics][6] for Agent OTLP receiver setup and troubleshooting.

#### Experiment exposures

Exposures appear in Datadog only for flags associated with an experiment. Standard feature flags without an experiment association do not generate exposure events. If exposures are missing:

1. Verify the flag is associated with an experiment in the Datadog UI.
2. Verify the Agent's `DD_API_KEY` is correct and the Agent is receiving events.
3. Verify the evaluation context uses flat primitive attributes. Nested arrays, objects, and null values are ignored for exposure reporting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /agent/remote_config/
[3]: /account_management/api-app-keys/#api-keys
[4]: /tracing/trace_collection/dd_libraries/php/
[5]: /feature_flags/concepts/environments/
[6]: /feature_flags/guide/server_flag_evaluation_metrics/
