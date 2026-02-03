---
title: Getting Started with Feature Flags
description: Manage feature delivery with integrated observability, real-time metrics, and OpenFeature-compatible gradual rollouts.
further_reading:
- link: '/feature_flags/client/'
  tag: 'Documentation'
  text: 'Client-Side SDKs'
- link: '/feature_flags/server/'
  tag: 'Documentation'
  text: 'Server-Side SDKs'
- link: 'https://www.datadoghq.com/blog/feature-flags/'
  tag: 'Blog'
  text: 'Ship features faster and safer with Datadog Feature Flags'
- link: 'https://www.datadoghq.com/blog/experimental-data-datadog/'
  tag: 'Blog'
  text: 'How to bridge speed and quality in experiments through unified data'
- link: 'https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/'
  tag: 'Blog'
  text: 'How Datadog Feature Flags is resilient to cloud provider failures'
site_support_id: getting_started_feature_flags
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Datadog feature flags offer a powerful, integrated way to manage feature delivery, with built-in observability and seamless integration across the platform.

* **Real-time metrics:** Understand who's receiving each variant, as well as how your flag impacts the health & performance of your application—all in real time.

* **Supports any data type:** Use Booleans, strings, numbers or full JSON objects—whatever your use case requires.

* **Built for experimentation:** Target specific audiences for A/B tests, roll out features gradually with canary releases, and automatically roll back when regressions are detected.

* **OpenFeature compatible:** Built on the OpenFeature standard, ensuring compatibility with existing OpenFeature implementations and providing a vendor-neutral approach to feature flag management.

## Feature Flags SDKs

This guide uses the JavaScript browser SDK as an example. You can integrate Datadog Feature Flags into any application using one of the following SDKs:

### Client-side SDKs

{{< partial name="feature_flags/feature_flags_client.html" >}}

### Server-side SDKs

{{< partial name="feature_flags/feature_flags_server.html" >}}

## Configure your environments

Your organization likely already has pre-configured environments for Development, Staging, and Production. If you need to configure these or any other environments, navigate to the [**Environments**][3] page to create tag queries for each environment. You can also identify which environment should be considered a Production environment.

{{< img src="getting_started/feature_flags/environments-list.png" alt="Environments list" style="width:100%;" >}}

## Create your first feature flag

### Step 1: Import and initialize the SDK

First, install `@datadog/openfeature-browser`, `@openfeature/web-sdk`, and `@openfeature/core` as dependencies in your project:


```
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
```

Then, add the following to your project to initialize the SDK:

```js
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
   clientToken: '<CLIENT_TOKEN>',
   applicationId: '<APPLICATION_ID>',
   enableExposureLogging: true, // Can impact RUM costs if enabled
   site: 'datadoghq.com',
   env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
   service: '<SERVICE_NAME>',
   version: '1.0.0',
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
```

<div class="alert alert-warning">Setting <code>enableExposureLogging</code> to <code>true</code> can impact <a href="https://docs.datadoghq.com/real_user_monitoring/">RUM</a> costs, as it sends exposure events to Datadog through RUM. You can disable it if you don't need to track feature exposure or guardrail metric status.</div>

More information about OpenFeature SDK configuration options can be found in its [documentation][1]. For more information on creating client tokens and application IDs, see [API and Application Keys][4].

### Step 2: Create a feature flag

Go to [**Create Feature Flag**][2] in Datadog and configure the following:

* **Name and key**: The flag's display name and the key referenced in code
* **Variant type**: The data type for the flag variants (Boolean, string, integer, number, or JSON)

  **Note**: The <b>flag key</b> and <b>variant type</b> cannot be modified after creation.
* **Variant values**: The possible values the flag can return (you can add these later)
* **Distribution channels**: Which types of SDKs receive this flag's configuration (client-side, server-side, or both)

<div class="alert alert-warning">
  <b>Flag keys</b>, <b>variant keys</b>, and <b>variant values</b> should be considered public when sent to client SDKs. 
</div>

{{< img src="getting_started/feature_flags/create-feature-flags.png" alt="Create Feature Flag" style="width:100%;" >}} 

### Step 3: Evaluate the flag and write feature code

In your application code, use the SDK to evaluate the flag and gate the new feature.

```js
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
   org_id: 2,
   user_id: 'user-123',
   email: 'user@example.com',
   targetingKey: 'user-123',
});

// This is what the SDK returns if the flag is disabled in
// the current environment
const fallback = false;

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
   // Feature code here
}
```

After you've completed this step, redeploy the application to pick up these changes. Additional usage examples can be found in the SDK's [documentation][1].

### Step 4: Define targeting rules and enable the feature flag

Now that the application is ready to check the value of your flag, you can start adding targeting rules. Targeting rules enable you to define where or to whom to serve different variants of your feature.

Go to **Feature Flags**, select your flag, then find the **Targeting Rules & Rollouts** section. Select the environment whose rules you want to modify, and click **Edit Targeting Rules**.

{{< img src="getting_started/feature_flags/ff-targeting-rules-and-rollouts.png" alt="Targeting Rules & Rollouts" style="width:100%;" >}}

### Step 5: Publish the rules in your environments

After saving changes to the targeting rules, publish those rules by enabling your flag in the environment of your choice.

<div class="alert alert-info">
As a general best practice, changes should be rolled out in a Staging environment before rolling out in Production.
</div>

In the **Targeting Rules & Rollouts** section, toggle your selected environment to **Enabled**.

{{< img src="getting_started/feature_flags/publish-targeting-rules.png" alt="Publish targeting rules" style="width:100%;" >}}

The flag serves your targeting rules in this environment. You can continue to edit these targeting rules to control where the variants are served.

### Step 6: Monitor your rollout

Monitor the feature rollout from the feature flag details page, which provides real-time exposure tracking and metrics such as **error rate** and **page load time**. As you incrementally release the feature with the flag, view the **Real-Time Metric Overview** panel in the Datadog UI to see how the feature impacts application performance.

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="Real-time flag metrics panel" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://app.datadoghq.com/feature-flags/settings/environments
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
