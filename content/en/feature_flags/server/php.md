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
---

## Overview

This page describes how to instrument your PHP application with the Datadog Feature Flags SDK. The PHP SDK integrates with [OpenFeature][1], an open standard for feature flag management, and uses the Datadog tracer's Remote Configuration to receive flag updates in real time.

This guide explains how to install and enable the SDK, create an OpenFeature client, and evaluate feature flags in your application.

## Prerequisites

Before setting up the PHP Feature Flags SDK, ensure you have:

- **Datadog Agent** with [Remote Configuration][2] enabled
- **Datadog PHP tracer** `ddtrace` version 1.16.0 or later
- **OpenFeature PHP SDK** `open-feature/sdk` version 2.0 or later

Set the following environment variables:

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## Installation

Install the Datadog PHP tracer and OpenFeature SDK:

{{< code-block lang="bash" >}}
# Install the Datadog PHP tracer
php datadog-setup.php --php-bin=all

# Install the OpenFeature SDK
composer require open-feature/sdk
{{< /code-block >}}

Or add the OpenFeature SDK to your `composer.json`:

{{< code-block lang="json" filename="composer.json" >}}
{
    "require": {
        "open-feature/sdk": "^2.0"
    }
}
{{< /code-block >}}

## Initialize the SDK

Register the Datadog OpenFeature provider with the OpenFeature API. The provider connects to the Datadog tracer's Remote Configuration system to receive flag configurations.

{{< code-block lang="php" >}}
<?php

use OpenFeature\API;
use DDTrace\OpenFeature\DataDogProvider;

// Create and register the Datadog provider
$provider = new DataDogProvider();
API::setProvider($provider);

// Create an OpenFeature client
$client = API::getClient();

// Your application code here
{{< /code-block >}}

## Set the evaluation context

Define an evaluation context that identifies the user or entity for flag targeting. The evaluation context includes attributes used to determine which flag variations should be returned:

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\EvaluationContext;
use OpenFeature\implementation\flags\Attributes;

$context = new EvaluationContext(
    'user-123',  // Targeting key (typically user ID)
    new Attributes([
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ])
);
{{< /code-block >}}

The targeting key is used for consistent traffic distribution (percentage rollouts). Additional attributes enable targeting rules, such as "enable for users in the US" or "enable for premium tier users" in the example above.

## Evaluate flags

After setting up the provider and creating a client, you can evaluate flags throughout your application. Flag evaluation is local and fast—the SDK uses locally cached configuration data, so no network requests occur during evaluation.

Each flag is identified by a key (a unique string) and can be evaluated with a typed method that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `getBooleanValue` for flags that represent on/off or true/false conditions:

{{< code-block lang="php" >}}
$enabled = $client->getBooleanValue('new-checkout-flow', false, $context);

if ($enabled) {
    showNewCheckout();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

### String flags

Use `getStringValue` for flags that select between multiple variants or configuration strings:

{{< code-block lang="php" >}}
$theme = $client->getStringValue('ui-theme', 'light', $context);

if ($theme === 'dark') {
    setDarkTheme();
} else {
    setLightTheme();
}
{{< /code-block >}}

### Numeric flags

For numeric flags, use `getIntegerValue` or `getFloatValue`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="php" >}}
$maxItems = $client->getIntegerValue('cart-max-items', 20, $context);

$discountRate = $client->getFloatValue('discount-rate', 0.0, $context);
{{< /code-block >}}

### Object flags

For structured data, use `getObjectValue`. This returns an array with complex configuration:

{{< code-block lang="php" >}}
$config = $client->getObjectValue('feature-config', [
    'maxRetries' => 3,
    'timeout' => 30,
], $context);

$maxRetries = $config['maxRetries'] ?? 3;
$timeout = $config['timeout'] ?? 30;
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the `*Details` methods. These return both the evaluated value and metadata explaining the evaluation:

{{< code-block lang="php" >}}
$details = $client->getBooleanDetails('new-feature', false, $context);

echo "Value: " . var_export($details->getValue(), true) . "\n";
echo "Reason: " . $details->getReason() . "\n";
echo "Variant: " . $details->getVariant() . "\n";
{{< /code-block >}}

Flag details help you debug evaluation behavior and understand why a user received a given value.

### Evaluation without context

You can evaluate flags without providing an evaluation context. This is useful for global flags that don't require user-specific targeting:

{{< code-block lang="php" >}}
// Global feature flag - no context needed
$maintenanceMode = $client->getBooleanValue('maintenance-mode', false);

if ($maintenanceMode) {
    echo "Service temporarily unavailable";
    exit;
}
{{< /code-block >}}

## Troubleshooting

### Provider not enabled

If you receive warnings about the provider not being enabled, ensure `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` is set in your environment:

{{< code-block lang="bash" >}}
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

### Remote Configuration not working

Verify the following to ensure that Remote Configuration is working:
- Datadog Agent is version 7.55 or later
- Remote Configuration is enabled on the Agent
- `DD_SERVICE` and `DD_ENV` environment variables are set
- The tracer can communicate with the Agent

[1]: https://openfeature.dev/
[2]: /agent/remote_config/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
