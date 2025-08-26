---
title: Getting Started with Feature Flags
further_reading:
- link: 'https://github.com/DataDog/openfeature-js-client/blob/main/README.md'
  tag: 'External Site'
  text: 'OpenFeature JS Client Documentation'
---

## Overview

Datadog Feature Flags offer a powerful, integrated way to manage feature delivery, with built-in observability and seamless integration across the platform.

* **Real-time metrics:** Understand who’s receiving each variant, as well as how your flag impacts the health & performance of your application - all in real time.

* **Supports any data type:** Use booleans, strings, numbers or full JSON objects - whatever your use case requires.

* **Built for experimentation:** Target specific audiences for A-B tests, roll out features gradually via canary releases, and automatically roll back when regressions are detected.

* **Datadog Integration with Datadog:** Out-of-the-box integration with Datadog metrics, change tracking events, and more - no additional instrumentation needed!

* **OpenFeature compatible:** Built on the OpenFeature standard, ensuring compatibility with existing OpenFeature implementations and providing a vendor-neutral approach to feature flag management.

## Creating Your First Feature Flag

### Step 1: Import and initialize the SDK

First, install `@datadog/openfeature-browser` and `@openfeature/web-sdk` as dependencies in your project:


```
yarn add @datadog/openfeature-browser @openfeature/web-sdk
```

Then, add the following to your project to initialize the SDK:

```js
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
  clientToken: 'your-datadog-client-token',
  applicationId: 'your-application-id',
  enableExposureLogging: true,
  site: 'datadoghq.com',
  env: '<prod|staging|dev>',
  service: 'my-service',
  version: '1.0.0',
});

// Set the provider
await OpenFeature.setProvider(provider);
```

More information about OpenFeature SDK configuration options can be found in its [README](https://github.com/DataDog/openfeature-js-client/blob/main/README.md).

### Step 2: Create a feature flag

Use the [feature flags creation UI](https://app.datadoghq.com/feature-flags/create) to bootstrap your first feature flag. By default, your flag will be disabled in all environments.

### Step 3: Evaluate your flag and write your feature code

In your application code, use the SDK to evaluate your flag and gate your new feature.

```js
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
  org: { id: 2 },
  user: { id: 'user-123', email: 'user@example.com' }
});

// This is what the SDK will return if the flag is disabled in 
// the current environment
const fallback = false; 

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
  // Feature code here
}
```

After you’ve completed this step, you’ll need to redeploy your application to pick up these changes. Additional usage examples can be found in the SDK’s [README](https://github.com/DataDog/openfeature-js-client/blob/main/README.md).

### Step 4: Define your targeting rules and enable your feature flag

Now that your application is ready to check the value of your flag, you’re ready to start adding targeting rules. Targeting rules enable you to define where or to whom to serve different variants of your feature. 

Go to **Feature Flags > [your flag] > Targeting Rules & Rollouts**, then select the `Environment` whose rules you want to modify from the dropdown. Now click `Edit Targeting Rules`.

![Targeting Rules & Rollouts](/content/en/getting_started/feature_flags/ff-targeting-rules-and-rollouts.png)

### Step 5: Publish your rules in your environments

After saving changes to your targeting rules, click you’ll now need to “publish” those rules by enabling your flag in the environment of your choice. 

As a general best practice, changes should be rolled out in a `Staging` environment before rolling out in `Production`.

Go to Targeting Rules & Rollouts > Per environment override and select Use targeting rules in the dropdown under the environment of your choice.

![Publish Targeting Rules](/content/en/getting_started/feature_flags/publish-targeting-rules.png)

Congratulations! Your flag is now serving your targeting rules in this environment - you can continue to edit these targeting rules to control where your variants are served.

### Step 6: Monitor your rollout

Datadog flags offer real-time exposure tracking and “gut-check” metrics like **error rate** and **page load time** to help you track the progress of your feature’s rollout directly from the feature flag details page! As you incrementally release your feature with your flag, refer to the `Real-Time Metric Overview` panel in the Datadog UI to see how your feature impacts your application performance.

![Real Time Flag Metrics Panel](/content/en/getting_started/feature_flags/real-time-flag-metrics.png)

## Further Reading
