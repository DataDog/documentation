---
title: Browser Feature Flags
description: Set up Datadog Feature Flags for browser applications.
aliases:
  - /feature_flags/setup/browser/
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/browser/"
  tag: "Documentation"
  text: "Browser Monitoring"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This page describes how to instrument your browser application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Datadog Browser Feature Flags SDK is built on [OpenFeature][1], providing a standardized API for feature flag evaluation. This guide explains how to install and configure the SDK, set up evaluation context, and evaluate flags in your application.

## Installation

Install the Datadog OpenFeature Browser provider and the OpenFeature Web SDK:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk
{{< /code-block >}}
{{% /tab %}}

{{% tab "CDN" %}}
Add the SDK to the `<head>` tag of your HTML page:

{{< code-block lang="html" >}}
<script src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-flagging.js" type="text/javascript"></script>
<script src="https://unpkg.com/@openfeature/web-sdk@1/dist/index.umd.js" type="text/javascript"></script>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Initialize the provider

Create and configure the `DatadogProvider`, then set it as the OpenFeature provider. Initialize the provider as early as possible in your app lifecycle to ensure all feature flag evaluations and telemetry are captured correctly.

{{< tabs >}}
{{% tab "npm/yarn" %}}
{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser'
import { OpenFeature } from '@openfeature/web-sdk'

const provider = new DatadogProvider({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    env: '<ENV_NAME>',
})

await OpenFeature.setProvider(provider)
{{< /code-block >}}
{{% /tab %}}

{{% tab "CDN" %}}
{{< code-block lang="javascript" >}}
const provider = new window.DD_FLAGGING.Provider({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    env: '<ENV_NAME>',
})

await window.OpenFeature.setProvider(provider)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Configuration options

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `clientToken` | String | Yes | | Your Datadog client token. |
| `site` | String | Yes | | The Datadog site to send data to (for example, `datadoghq.com`, `datadoghq.eu`). |
| `env` | String | Yes | | The environment name (for example, `production`, `staging`). |
| `applicationId` | String | No | | Your Datadog application ID for RUM attribution. |
| `service` | String | No | | The service name for your application. |
| `version` | String | No | | The application version. |
| `enableExposureLogging` | Boolean | No | `false` | When `true`, the SDK automatically records an exposure event when a flag is evaluated. |
| `enableFlagEvaluationTracking` | Boolean | No | `true` | When `true`, flag evaluations are tracked in RUM, enabling correlation with user sessions. |

## Set the evaluation context

Define who or what the flag evaluation applies to using an evaluation context. The evaluation context includes user or session information used to determine which flag variations should be returned. Set the context before evaluating flags to ensure proper targeting.

{{< code-block lang="javascript" >}}
await OpenFeature.setContext({
    targetingKey: 'user-123',
    email: 'user@example.com',
    tier: 'premium',
})
{{< /code-block >}}

Setting the context fetches flag assignments from the server asynchronously. Use `await` to ensure the context is fully set before evaluating flags.

## Evaluate flags

After setting the provider and evaluation context, you can start reading flag values throughout your app. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags. This makes evaluations safe to perform synchronously.

Get a client from OpenFeature and use it to evaluate flags:

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient()
{{< /code-block >}}

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed method_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `getBooleanValue(key, defaultValue)` for flags that represent on/off or true/false conditions:

{{< code-block lang="javascript" >}}
const isNewCheckoutEnabled = client.getBooleanValue('checkout.new', false)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### String flags

Use `getStringValue(key, defaultValue)` for flags that select between multiple variants or configuration strings:

{{< code-block lang="javascript" >}}
const theme = client.getStringValue('ui.theme', 'light')

switch (theme) {
    case 'light':
        setLightTheme()
        break
    case 'dark':
        setDarkTheme()
        break
    default:
        setLightTheme()
}
{{< /code-block >}}

### Integer and number flags

Use `getNumberValue(key, defaultValue)` for numeric flags. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="javascript" >}}
const maxItems = client.getNumberValue('cart.items.max', 20)
const priceMultiplier = client.getNumberValue('pricing.multiplier', 1.0)
{{< /code-block >}}

### Object flags

Use `getObjectValue(key, defaultValue)` for structured or JSON-like data. Object flags are useful for remote configuration scenarios where multiple properties need to be provided together:

{{< code-block lang="javascript" >}}
const config = client.getObjectValue('ui.config', {
    color: '#00A3FF',
    fontSize: 14,
})
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the `get<Type>Details` methods. These methods return both the evaluated value and metadata explaining the evaluation:

{{< code-block lang="javascript" >}}
const details = client.getStringDetails('paywall.layout', 'control')

console.log(details.value)    // Evaluated value (for example: "A", "B", or "control")
console.log(details.variant)  // Variant name, if applicable
console.log(details.reason)   // Description of why this value was chosen
console.log(details.errorCode) // The error that occurred during evaluation, if any
{{< /code-block >}}

Flag details help you debug evaluation behavior and understand why a user received a given value.

## A/B experimentation

To run A/B experiments and measure the impact of feature variations, enable exposure logging with `enableExposureLogging: true`. When enabled, the SDK automatically records an _exposure event_ when a flag is evaluated. These events contain metadata about which flag was accessed, which variant was served, and under what context. If you only need local evaluation without telemetry, you can leave this option disabled.

{{< code-block lang="javascript" >}}
const provider = new DatadogProvider({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    env: '<ENV_NAME>',
    enableExposureLogging: true,
})
{{< /code-block >}}

## Advanced configuration

The `DatadogProvider` constructor accepts additional configuration options:

`enableFlagEvaluationTracking`
: When `true` (default), flag evaluations are tracked in RUM, which enables correlating them with user sessions. This enables analytics such as _"Do users in variant B experience more errors?"_. If your app does not use RUM, this flag has no effect and can be safely left at its default value.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
