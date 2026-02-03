---
title: React Feature Flags
description: Set up Datadog Feature Flags for React applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "https://openfeature.dev/docs/reference/sdks/client/web/react/"
  tag: "OpenFeature"
  text: "OpenFeature React SDK"
- link: "/real_user_monitoring/application_monitoring/browser/"
  tag: "Documentation"
  text: "Browser Monitoring"
---

## Overview

This page describes how to instrument your React application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Datadog Feature Flags SDK for React is built on [OpenFeature][1], an open standard for feature flag management. This guide explains how to install the SDK, configure the Datadog provider, and evaluate flags in your React components.

## Installation

Install the Datadog OpenFeature provider and the OpenFeature React SDK using your preferred package manager:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/react-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Initialize the provider

Create a `DatadogProvider` instance and register it with OpenFeature. Do this as early as possible in your application, before rendering your React components.

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
});
{{< /code-block >}}

## Set the evaluation context

Define who or what the flag evaluation applies to using an evaluation context. The evaluation context includes user or session information used to determine which flag variations should be returned. Reference these attributes in your targeting rules to control who sees each variant.

Set the provider along with the evaluation context:

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setProvider(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">The <code>targetingKey</code> is used as the randomization subject for percentage-based targeting. When a flag targets a percentage of subjects (for example, 50%), the <code>targetingKey</code> determines which "bucket" a user falls into. Users with the same <code>targetingKey</code> always receive the same variant for a given flag.</div>

## Wrap your application

Wrap your application with the `OpenFeatureProvider` component. This makes feature flags available to all child components through React context.

{{< code-block lang="jsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
  return (
    <OpenFeatureProvider>
      <YourApp />
    </OpenFeatureProvider>
  );
}
{{< /code-block >}}

## Evaluate flags

The OpenFeature React SDK provides hooks for evaluating flags within your components. Each hook returns the flag value based on the evaluation context you configured.

### Boolean flags

Use `useBooleanFlagValue(key, defaultValue)` for flags that represent on/off or true/false conditions:

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function CheckoutButton() {
  const isNewCheckoutEnabled = useBooleanFlagValue('new_checkout_button', false);

  if (isNewCheckoutEnabled) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}
{{< /code-block >}}

### String flags

Use `useStringFlagValue(key, defaultValue)` for flags that select between multiple variants or configuration strings:

{{< code-block lang="jsx" >}}
import { useStringFlagValue } from '@openfeature/react-sdk';

function ThemedComponent() {
  const theme = useStringFlagValue('ui_theme', 'light');

  switch (theme) {
    case 'dark':
      return <DarkTheme />;
    case 'light':
    default:
      return <LightTheme />;
  }
}
{{< /code-block >}}

### Number flags

Use `useNumberFlagValue(key, defaultValue)` for numeric flags such as limits, percentages, or multipliers:

{{< code-block lang="jsx" >}}
import { useNumberFlagValue } from '@openfeature/react-sdk';

function CartDisplay() {
  const maxItems = useNumberFlagValue('max_cart_items', 20);

  return <Cart maxItems={maxItems} />;
}
{{< /code-block >}}

### Object flags

Use `useObjectFlagValue(key, defaultValue)` for structured configuration data:

{{< code-block lang="jsx" >}}
import { useObjectFlagValue } from '@openfeature/react-sdk';

function Banner() {
  const config = useObjectFlagValue('promo_banner', {
    color: '#00A3FF',
    message: 'Welcome!',
  });

  return <PromoBanner color={config.color} message={config.message} />;
}
{{< /code-block >}}

### Suspense support

Built-in [suspense](https://react.dev/reference/react/Suspense) support allows you to avoid displaying components with feature flags until provider initialization is complete, or when the context changes. Pass `{ suspend: true }` in the hook options to use this functionality.

For example:

{{< code-block lang="jsx" >}}
import { useBooleanFlag } from '@openfeature/react-sdk';
import { Suspense } from 'react';

import
function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const { value: showNewMessage } = useBooleanFlag('show-new-welcome-message', false, { suspend: true });

  return (
    <>
      {showNewMessage ? (
        <p>Welcome! You're seeing the new experience.</p>
      ) : (
        <p>Welcome back!</p>
      )}
    </>
  );
}
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the detail hooks. These return both the evaluated value and metadata explaining the evaluation:

* `useBooleanFlagDetails(key, defaultValue)`
* `useStringFlagDetails(key, defaultValue)`
* `useNumberFlagDetails(key, defaultValue)`
* `useObjectFlagDetails(key, defaultValue)`

For example:

{{< code-block lang="jsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';

function PaywallLayout() {
  const details = useStringFlagDetails('paywall_layout', 'control');

  console.log(details.value);   // Evaluated value (for example: "A", "B", or "control")
  console.log(details.variant); // Variant name, if applicable
  console.log(details.reason);  // Description of why this value was chosen

  return <Layout variant={details.value} />;
}
{{< /code-block >}}

Flag details help you debug evaluation behavior and understand why a user received a given value.

## Complete example

Here's a complete example showing how to set up and use Datadog Feature Flags in a React application:

{{< code-block lang="jsx" >}}
import { Suspense } from 'react';
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeatureProvider, OpenFeature, useBooleanFlagValue } from '@openfeature/react-sdk';

// Initialize the Datadog provider
const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
});

// Set the evaluation context
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
};

OpenFeature.setProvider(provider, evaluationContext);

// Wrap your app with the OpenFeatureProvider and Suspense for loading state
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <OpenFeatureProvider suspendUntilReady>
        <Page />
      </OpenFeatureProvider>
    </Suspense>
  );
}

// Use feature flags in your components
function Page() {
  const showNewFeature = useBooleanFlagValue('new_feature', false);

  return (
    <div>
      {showNewFeature ? <NewFeature /> : <ExistingFeature />}
    </div>
  );
}
{{< /code-block >}}

## Update the evaluation context

To update the evaluation context after initialization (for example, when a user logs in), use `OpenFeature.setContext()`:

{{< code-block lang="javascript" >}}
// When a user logs in
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
