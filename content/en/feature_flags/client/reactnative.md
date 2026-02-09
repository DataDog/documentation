---
title: React Native Feature Flags
description: Set up Datadog Feature Flags for React Native applications.
aliases:
  - /feature_flags/setup/reactnative/
further_reading:
- link: "https://openfeature.dev/docs/reference/sdks/client/web/react/"
  tag: "OpenFeature"
  text: "OpenFeature React SDK"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/real_user_monitoring/application_monitoring/react_native/"
  tag: "Documentation"
  text: "React Native Monitoring"
---

## Overview

This page describes how to instrument your React Native application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

The Datadog Feature Flags SDK for React Native is built on [OpenFeature][1], an open standard for feature flag management. This guide explains how to install the SDK, configure the Datadog provider, and evaluate flags in your React Native components.

## Requirements

- React Native v0.65+
- iOS: iOS 13+
- Android: API level 23+
- Datadog React Native SDK (`@datadog/mobile-react-native`) must be initialized first

## Installation

Install the Datadog React Native SDK, the OpenFeature provider, and the OpenFeature React SDK using your preferred package manager:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### iOS setup

Install the added pod:

{{< code-block lang="bash" >}}
(cd ios && pod install)
{{< /code-block >}}

### Android setup

If you use React Native version 0.68 or higher, use Java 17. If you use React Native version 0.67 or lower, use Java version 11.

In your `android/build.gradle` file, specify the `kotlinVersion` to avoid clashes among kotlin dependencies:

{{< code-block lang="groovy" filename="build.gradle" >}}
buildscript {
    ext {
        kotlinVersion = "1.8.21"
    }
}
{{< /code-block >}}

## Initialize the SDK

The Datadog OpenFeature provider for React Native requires the core Datadog SDK to be initialized first, followed by enabling the Feature Flags feature.

### Option 1: Using DatadogProvider component

If you use the `DatadogProvider` component for SDK initialization, enable Feature Flags in the `onInitialized` callback:

```tsx
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);
config.site = '{{< region-param key="dd_site" code="true" >}}';

export default function App() {
    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();
                OpenFeature.setProvider(provider);
            }}
        >
            <OpenFeatureProvider>
                <Navigation />
            </OpenFeatureProvider>
        </DatadogProvider>
    );
}
```

### Option 2: Using imperative initialization

If you initialize the SDK imperatively, enable Feature Flags after initialization completes:

```tsx
import { DdSdkReactNative, DdFlags, CoreConfiguration } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature } from '@openfeature/react-sdk';

(async () => {
    const config = new CoreConfiguration(
        '<CLIENT_TOKEN>',
        '<ENVIRONMENT_NAME>',
        '<APPLICATION_ID>'
    );
    config.site = '{{< region-param key="dd_site" code="true" >}}';

    await DdSdkReactNative.initialize(config);

    // Enable Feature Flags after core SDK initialization
    await DdFlags.enable();

    // Set the Datadog provider with OpenFeature
    const provider = new DatadogOpenFeatureProvider();
    OpenFeature.setProvider(provider);
})();
```

<div class="alert alert-info">Sending flag evaluation data to Datadog is automatically enabled when using the Feature Flags SDK. Provide <code>rumIntegrationEnabled</code> and <code>trackExposures</code> parameters to the <code>DdFlags.enable()</code> call to configure this behavior.</div>

## Set the evaluation context

Define who or what the flag evaluation applies to using an evaluation context. The evaluation context includes user or session information used to determine which flag variations should be returned. Reference these attributes in your targeting rules to control who sees each variant.

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setContext(evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">The <code>targetingKey</code> is used as the randomization subject for percentage-based targeting. When a flag targets a percentage of subjects (for example, 50%), the <code>targetingKey</code> determines which "bucket" a user falls into. Users with the same <code>targetingKey</code> always receive the same variant for a given flag.</div>

## Wrap your application

Wrap your application with the `OpenFeatureProvider` component. This makes feature flags available to all child components through React context.

{{< code-block lang="tsx" >}}
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

The OpenFeature React SDK provides hooks for evaluating flags within your components. Each hook returns the flag value based on the evaluation context you configured. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags.

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
import { useBooleanFlagValue } from '@openfeature/react-sdk';
import { Suspense } from 'react';

function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const { value: showNewMessage } = useBooleanFlagValue('show-new-welcome-message', false, { suspend: true });

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

Here's a complete example showing how to set up and use Datadog Feature Flags in a React Native application:

```tsx
import { Suspense } from 'react';
import { View } from 'react-native';
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);

// Wrap your app with the DatadogProvider and OpenFeatureProvider.
export default function AppWithProviders() {
    // Based on your auth state.
    const user = getCurrentUser();

    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();

                const evaluationContext = {
                    targetingKey: user.id,
                    region: user.country,
                };

                OpenFeature.setProvider(provider, evaluationContext);
            }}
        >
          <Suspense fallback={<Loading />}>
            <OpenFeatureProvider suspendUntilReady>
                <App />
            </OpenFeatureProvider>
          </Suspense>
        </DatadogProvider>
    );
}

// Use feature flags in your components
function App() {
    const showNewFeature = useBooleanFlagValue('new_feature', false);

    return (
        <View>
            {showNewFeature ? <NewFeature /> : <ExistingFeature />}
        </View>
    );
}
```

## Update the evaluation context

To update the evaluation context after initialization (for example, when a user logs in), use `OpenFeature.setContext()`:

{{< code-block lang="tsx" >}}
import { OpenFeature } from '@openfeature/react-sdk';

// When a user logs in
function onUserLogin(user) {
    OpenFeature.setContext({
        targetingKey: user.id,
        email: user.email,
        plan: user.plan,
    });
}
{{< /code-block >}}

## Configure Feature Flags options

Pass configuration options to `DdFlags.enable()` to customize Feature Flags behavior:

{{< code-block lang="tsx" >}}
await DdFlags.enable({
    // Send flag evaluation data to RUM for session analysis (default: true)
    rumIntegrationEnabled: true,
    // Track flag exposures for analytics (default: true)
    trackExposures: true,
});
{{< /code-block >}}

`rumIntegrationEnabled`
: When `true` (default), flag evaluations are tracked in RUM, which enables correlating them with user sessions. This enables analytics such as _"Do users in variant B experience more errors?"_.

`trackExposures`
: When `true` (default), the SDK automatically records an _exposure event_ when a flag is evaluated. These events contain metadata about which flag was accessed, which variant was served, and under what context. They are sent to Datadog so you can analyze feature adoption.

## Context attribute requirements

<div class="alert alert-warning">
Evaluation context attributes must be flat primitive values (strings, numbers, booleans). Nested objects and arrays are <strong>not supported</strong> and cause exposure events to be silently dropped.
</div>

Use flat attributes in your evaluation context:

{{< code-block lang="javascript" >}}
OpenFeature.setContext({
    targetingKey: 'user-123',
    userId: 'user-123',
    tier: 'premium',
    age: 25
});
{{< /code-block >}}

Avoid nested objects and arrays:

{{< code-block lang="javascript" >}}
// These attributes cause exposure events to be dropped
OpenFeature.setContext({
    targetingKey: 'user-123',
    user: { id: 'user-123' },        // nested object - NOT SUPPORTED
    features: ['beta', 'analytics']  // array - NOT SUPPORTED
});
{{< /code-block >}}

## Troubleshooting

### No flags returned

If flag evaluations return default values:

1. Verify the Datadog SDK is initialized before calling `DdFlags.enable()`.
2. Confirm `DdFlags.enable()` completed before setting the OpenFeature provider.
3. Check that the evaluation context is set before evaluating flags.
4. Confirm the flag exists and is enabled in your Datadog Feature Flags dashboard.

### iOS pod install errors

If you have `use_frameworks!` enabled in your `Podfile`, you may see errors during `pod install`. Edit your `Podfile` to install the SDK pod as a static library:

{{< code-block lang="ruby" filename="Podfile" >}}
static_libraries = ['DatadogSDKReactNative']

pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
{{< /code-block >}}

### Feature Flags not initialized error

If you see an error about Feature Flags not being initialized, verify the initialization order:

1. Initialize the core Datadog SDK first (`DdSdkReactNative.initialize()` or `DatadogProvider`)
2. Call `DdFlags.enable()` after SDK initialization
3. Create and set the `DatadogOpenFeatureProvider` after enabling flags

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
