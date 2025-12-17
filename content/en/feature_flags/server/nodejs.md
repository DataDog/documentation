---
title: Node.js Feature Flags
description: Set up Datadog Feature Flags for Node.js applications.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/tracing/trace_collection/dd_libraries/nodejs/"
  tag: "Documentation"
  text: "Node.js Tracing"
- link: "/apm/"
  tag: "Documentation"
  text: "APM Setup"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This page describes how to instrument your Node.js application with the Datadog Feature Flags SDK.

## Installing and initializing

Feature Flagging is provided by APM. To integrate APM into your application with feature flagging support, install `dd-trace` and enable Remote Configuration with the `flaggingProvider` option as shown below. See documentation on `dd-trace` integration for detailed APM installation instructions.

```shell
npm install dd-trace @openfeature/server-sdk
```

```javascript
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    }
  }
});

OpenFeature.setProvider(tracer.openfeature);
```

### Accepting default variant until initialization is complete

When you call `setProvider` without waiting, the client returns default values until Remote Configuration loads in the background. This approach keeps your application responsive during startup but may serve defaults for early requests.

```javascript
OpenFeature.setProvider(tracer.openfeature);
const client = OpenFeature.getClient();

app.get('/my-endpoint', (req, res) => {
  const value = client.getBooleanValue('my-flag', false);
  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }
});
```

### Waiting for initialization before evaluating a flag

Use `setProviderAndWait` to ensure the provider fully initializes before evaluating flags. This guarantees that flag evaluations use actual configuration data rather than defaults, at the cost of delaying requests during initialization.

```javascript
const initializationPromise = OpenFeature.setProviderAndWait(tracer.openfeature);
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {
  await initializationPromise;

  OpenFeature.setContext({
    userID: req.session?.userID,
    companyID: req.session?.companyID
  });

  const value = client.getBooleanValue('my-flag', false);
  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }
});
```

## Set the evaluation context

Define who or what the flag evaluation applies to using an `EvaluationContext`. The evaluation context can include user or session information used to determine which flag variations should be returned. Call `OpenFeature.setContext` method before evaluating flags to ensure proper targeting.

## Evaluating flags

After creating the `OpenFeature` client as described in the previous section, you can start reading flag values throughout your app. Flag evaluation uses locally cached data, so no network requests occur when evaluating flags.

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed getter_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `getBooleanValue()` for flags that represent on/off or true/false conditions. Optionally set the context for specific targeting rules.

```javascript
OpenFeature.setContext({
  userID: req.session?.userID,
  companyID: req.session?.companyID
});

const isNewCheckoutEnabled = client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
```

### String flags

Use `getStringValue()` for flags that select between multiple variants or configuration strings. For example:

```javascript
OpenFeature.setContext({
  userID: req.session?.userID,
  companyID: req.session?.companyID
});

const theme = client.getStringValue(
  'ui-theme', // flag key
  'light', // default value
);

switch (theme) {
  case 'light':
      setLightTheme();
      break;
  case 'dark':
      setDarkTheme();
      break;
  case 'blue':
      setBlueTheme();
      break;
  default:
      setLightTheme();
}
```

### Number flags

For number flags, use `getNumberValue()`. This is appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

```javascript
OpenFeature.setContext({
  userID: req.session?.userID,
  companyID: req.session?.companyID
});

const maxItems = client.getNumberValue(
    'max-cart-items', // flag key
    20, // default value
);

const priceMultiplier = client.getNumberValue(
    'pricing-multiplier', // flag key
    1.3, // default value
);
```

### Object flags

For structured JSON data, use `getObjectValue()`. This method returns an `object`, which can represent primitives, arrays, or dictionaries. Object flags are useful for Remote Configuration scenarios where multiple properties need to be provided together.

```javascript
OpenFeature.setContext({
  userID: req.session?.userID,
  companyID: req.session?.companyID
});

const defaultConfig = {
  color: '#00A3FF',
  fontSize: 14,
};
const config = client.getObjectValue('ui-config', defaultConfig);
```

### Flag evaluation details

When you need more than just the flag value, use the `get<Type>Details` functions. These methods return both the evaluated value and metadata explaining the evaluation:

* `getBooleanDetails() -> EvaluationDetails<boolean>`
* `getStringDetails() -> EvaluationDetails<string>`
* `getNumberDetails() -> EvaluationDetails<number>`
* `getObjectDetails() -> EvaluationDetails<JsonValue>`

For example:

```javascript
const details = client.getStringDetails('paywall-layout', 'control');

console.log(details.value);        // Evaluated value (for example: "A", "B", or "control")
console.log(details.variant);      // Variant name, if applicable
console.log(details.reason);       // Description of why this value was chosen (for example: "TARGETING_MATCH")
console.log(details.errorCode);    // The error that occurred during evaluation, if any
console.log(details.errorMessage); // A more detailed message of the error that occurred, if any
console.log(details.flagMetadata); // Additional information about the evaluation
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
