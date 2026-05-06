---
title: JavaScript Feature Flags
description: Set up Datadog Feature Flags for browser JavaScript applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "https://openfeature.dev/docs/reference/sdks/client/web/"
  tag: "OpenFeature"
  text: "OpenFeature Web SDK"
- link: "/real_user_monitoring/application_monitoring/browser/"
  tag: "Documentation"
  text: "Browser Monitoring"
---

## Overview

This page describes how to instrument your browser JavaScript application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Datadog Feature Flags SDK for JavaScript is built on [OpenFeature][1], an open standard for feature flag management. This guide explains how to install the SDK, configure the Datadog provider, and evaluate flags in your application.

## Installation

Install the Datadog OpenFeature provider and the OpenFeature Web SDK using your preferred package manager:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Initialize the provider

Create a `DatadogProvider` instance with your Datadog credentials. To create a client token, see [Client tokens][2].

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## Set the evaluation context

Define who or what the flag evaluation applies to using an evaluation context. The evaluation context includes user or session information used to determine which flag variations should be returned. Reference these attributes in your targeting rules to control who sees each variant.

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
  email: 'user@example.com',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">The <code>targetingKey</code> is used as the randomization subject for percentage-based targeting. When a flag targets a percentage of subjects (for example, 50%), the <code>targetingKey</code> determines which "bucket" a user falls into. Users with the same <code>targetingKey</code> always receive the same variant for a given flag.</div>

## Evaluate flags

After the provider is initialized, you can evaluate flags anywhere in your application. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags.

### Get a client

Retrieve the OpenFeature client to evaluate flags:

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
{{< /code-block >}}

### Boolean flags

Use `getBooleanValue(key, defaultValue)` for flags that represent on/off or true/false conditions:

{{< code-block lang="javascript" >}}
const isNewCheckoutEnabled = client.getBooleanValue('checkout_new', false);

if (isNewCheckoutEnabled) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### String flags

Use `getStringValue(key, defaultValue)` for flags that select between multiple variants or configuration strings:

{{< code-block lang="javascript" >}}
const theme = client.getStringValue('ui_theme', 'light');

switch (theme) {
  case 'dark':
    setDarkTheme();
    break;
  case 'light':
  default:
    setLightTheme();
}
{{< /code-block >}}

### Number flags

Use `getNumberValue(key, defaultValue)` for numeric flags such as limits, percentages, or multipliers:

{{< code-block lang="javascript" >}}
const maxItems = client.getNumberValue('cart_items_max', 20);
const priceMultiplier = client.getNumberValue('pricing_multiplier', 1.0);
{{< /code-block >}}

### Object flags

Use `getObjectValue(key, defaultValue)` for structured configuration data:

{{< code-block lang="javascript" >}}
const config = client.getObjectValue('promo_banner_config', {
  color: '#00A3FF',
  message: 'Welcome!',
});
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the detail methods. These return both the evaluated value and metadata explaining the evaluation:

{{< code-block lang="javascript" >}}
const details = client.getBooleanDetails('checkout_new', false);

console.log(details.value);       // Evaluated value (true or false)
console.log(details.variant);     // Variant name, if applicable
console.log(details.reason);      // Why this value was chosen
console.log(details.errorCode);   // Error code, if evaluation failed
{{< /code-block >}}

## Complete example

Here's a complete example showing how to set up and use Datadog Feature Flags in a JavaScript application:

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the Datadog provider
const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

// Set the evaluation context
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);

// Get the client and evaluate flags
const client = OpenFeature.getClient();
const showNewFeature = client.getBooleanValue('new_feature', false);

if (showNewFeature) {
  console.log('New feature is enabled!');
}
```

## Update the evaluation context

To update the evaluation context after initialization (for example, when a user logs in), use `OpenFeature.setContext()`:

{{< code-block lang="javascript" >}}
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Testing

You can test against a dedicated Datadog test environment with the real `DatadogProvider`, or swap it for OpenFeature's `InMemoryProvider` to control flag values directly in test code. This section shows the in-memory approach, which keeps tests hermetic and offline. `InMemoryProvider` is exported directly from `@openfeature/web-sdk`, so no additional dependency is required.

Unlike the server-side SDK, the Web SDK evaluates flags synchronously after initialization. Still `await` `setProviderAndWait` once in `beforeEach` to ensure the provider is ready.

{{< code-block lang="javascript" >}}
import { beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
  ui_theme: {
    variants: { dark: 'dark', light: 'light' },
    defaultVariant: 'light',
    disabled: false,
  },
};

beforeEach(async () => {
  await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
  await OpenFeature.close();
});

test('new checkout button is enabled by default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('new_checkout_button', false)).toBe(true);
});

test('missing flag returns default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('does-not-exist', false)).toBe(false);
});
{{< /code-block >}}

The Web SDK flag shape requires `variants`, `defaultVariant`, and `disabled`. Omitting any of these fails TypeScript compilation; at runtime, evaluating an unknown flag key returns the supplied default. Prefer `TypedInMemoryProvider` over the deprecated `InMemoryProvider` for type-checked flag configurations. The same test pattern works with Jest + jsdom; swap the `vitest` imports for `@jest/globals` and add `jest-environment-jsdom` to your project.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /account_management/api-app-keys/#client-tokens

