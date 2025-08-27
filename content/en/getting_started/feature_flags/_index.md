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

* **Integration with Datadog:** Out-of-the-box integration with Datadog metrics, change tracking events, and more - no additional instrumentation needed!

* **OpenFeature compatible:** Built on the OpenFeature standard, ensuring compatibility with existing OpenFeature implementations and providing a vendor-neutral approach to feature flag management.

## Configure your environments

Your organization likely already has pre-configured environments for `Development`, `Staging`, and `Production`. If not, and/or you need to configure other environments, navigate to [Feature Flags > Environments][3] to create tag queries for your environments, as well as identify which environment should be considered a **Production** environment.

{{< img src="getting_started/feature_flags/Environments.png" alt="Environments list" style="width:100%;" >}}

## Creating your first feature flag

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
   clientToken: '<CLIENT_TOKEN>',
   applicationId: '<APPLICATION_ID>',
   enableExposureLogging: true,
   site: 'datadoghq.com',
   env: '<YOUR_ENV>',
   service: 'my-service',
   version: '1.0.0',
});

// Set the provider
await OpenFeature.setProvider(provider);
```

More information about OpenFeature SDK configuration options can be found in its [README][1].

### Step 2: Create a feature flag

Use the [feature flags creation UI][2] to bootstrap your first feature flag. By default, the flag is disabled in all environments.

### Step 3: Evaluate your flag and write your feature code

In your application code, use the SDK to evaluate the flag and gate the new feature.

```js
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
   org: { id: 2 },
   user: { id: 'user-123', email: 'user@example.com' }
});

// This is what the SDK returns if the flag is disabled in
// the current environment
const fallback = false; 

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
   // Feature code here
}
```

After you’ve completed this step, redeploy your application to pick up these changes. Additional usage examples can be found in the SDK’s [README][1].

### Step 4: Define your targeting rules and enable your feature flag

Now that the application is ready to check the value of your flag, you’re ready to start adding targeting rules. Targeting rules enable you to define where or to whom to serve different variants of your feature. 

Go to **Feature Flags > <YOUR_FLAG_NAME> > Targeting Rules & Rollouts**, then select the `Environment` whose rules you want to modify from the dropdown. Click `Edit Targeting Rules`.

{{< img src="getting_started/feature_flags/ff-targeting-rules-and-rollouts.png" alt="Targeting Rules & Rollouts" style="width:100%;" >}}

### Step 5: Publish your rules in your environments

After saving changes to your targeting rules, publish those rules by enabling your flag in the environment of your choice. 

As a general best practice, changes should be rolled out in a `Staging` environment before rolling out in `Production`.

Go to Targeting Rules & Rollouts > Per environment override and select Use targeting rules in the dropdown under the environment of your choice.

{{< img src="getting_started/feature_flags/publish-targeting-rules.png" alt="Publish targeting rules" style="width:100%;" >}}

The flag now serves your targeting rules in this environment. You can continue to edit these targeting rules to control where the variants are served.

### Step 6: Monitor your rollout

Monitor the feature rollout from the feature flag details page, which provides real-time exposure tracking and metrics such as **error rate** and **page load time**. As you incrementally release the feature with your flag, refer to the `Real-Time Metric Overview` panel in the Datadog UI to see how your feature impacts your application performance.

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="Real-time flag metrics panel" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/openfeature-js-client/blob/main/README.md
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://app.datadoghq.com/feature-flags/environments
