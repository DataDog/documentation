---
title: Remotely Configure RUM Using Feature Flags
beta: false
private: true
description: Use feature flags to configure Browser RUM for RUM without Limits, with 100% session sampling by default and reduced collection when needed.
aliases:
- /real_user_monitoring/guide/remote-config-launchdarkly/
- /real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/
further_reading:
- link: '/real_user_monitoring/rum_without_limits/'
  tag: 'Documentation'
  text: 'RUM without Limits'
- link: '/feature_flags/client/javascript/'
  tag: 'Documentation'
  text: 'Set up Datadog Feature Flags for JavaScript'
- link: '/real_user_monitoring/guide/best-practices-for-rum-sampling/'
  tag: 'Documentation'
  text: 'Best practices for RUM sampling'
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the RUM Explorer'
---

## Overview

For applications using [RUM without Limits][13], Datadog recommends setting `sessionSampleRate` to `100` for optimal visibility and metrics accuracy. Use [retention filters][14] to choose which ingested sessions to index and retain. Performance metrics cover all ingested sessions, even when you retain only a fraction of them.

Use feature flags to change Browser RUM initialization settings without redeploying your application. Start with 100% session sampling, and use a flag to reduce collection when technical constraints or ingestion costs prevent collecting all sessions. Restore 100% sampling when those constraints are resolved.

Reducing `sessionSampleRate` drops sessions before they reach Datadog. Those sessions are unavailable to retention filters and do not contribute to RUM metrics. For routine control over indexed session volume, adjust retention filters while keeping session sampling at 100%.

This guide uses [Datadog Feature Flags][1]. The same approach works with other browser feature flag providers, including LaunchDarkly: initialize the flag provider, evaluate the configuration flags, and pass their values to `datadogRum.init()`.

Datadog Feature Flags works independently of RUM. RUM does not need to be initialized, enabled, or installed for flag evaluation. To use flags to configure RUM, provide the evaluation context from your application before initializing RUM.

**Note:** These examples configure RUM at initialization. Changing a flag does not reconfigure a RUM SDK that is already running. The application must retrieve and apply the updated flag value on a subsequent initialization, such as a new page load. Do not call `datadogRum.init()` again to apply a flag change.

## Prerequisites

- A [Browser RUM application][2] using RUM without Limits, its application ID, and a client token.
- Access to Datadog Feature Flags and the environment you want to configure.
- The [Datadog browser feature flag provider][3] version **1.4.0 or later** for the `withTimeout` helper used in this guide.

Install the SDKs for an npm-based application:

```shell
npm install @datadog/browser-rum @datadog/openfeature-browser@^1.4.0 @openfeature/web-sdk @openfeature/core
```

## Create a configuration flag

Use a separate flag for each setting when you want to adjust settings independently. Use a JSON flag when several settings should change together.

### Configure an individual setting

Create a numeric flag for `sessionSampleRate`:

1. Open [**Create Feature Flag**][4] in Datadog.
2. Name the flag **RUM session sample rate** and set its key to `rum-session-sample-rate`.
3. Configure the flag's [distribution channels][5] so the browser SDK receives it.
4. Choose the **Number** variant type and add two variants:

   | Variant | Value | Purpose |
   | --- | --- | --- |
   | Standard | `100` | Send 100% of RUM sessions, as recommended for RUM without Limits. |
   | Reduced Collection | `20` | Send 20% of RUM sessions when technical or budget constraints require lower ingestion. |

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-feature-flags/rum-session-sample-rate-variants.png" alt="Number flag variants with Standard set to 100 and marked as the default, and Reduced Collection set to 20." style="width:100%;" >}}

5. In the target environment, select **Standard** as the default variant. If you need to reduce ingestion for a group of users, add a [targeting rule][6] that serves **Reduced Collection** to that group. For example, set the filter to `business_id` **is one of** `example-company`. Set the rollout to 100% of matching traffic so all matching users receive the reduced session sample rate of 20%.
6. Save the rules and enable the flag in that environment.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-feature-flags/rum-reduced-collection-targeting-rule.png" alt="Targeting rule editor serving Reduced Collection (20) to 100% of matching traffic for example-company." style="width:70%;" >}}

The reduced rate of `20` is an example, not a recommended baseline. Choose a reduced rate that addresses your constraints, and apply it only where needed. The code below uses `100` as the local fallback when the flag is disabled, unavailable, or invalid.

### Configure multiple settings together

To change several settings together, create a flag with the key `rum-configuration` and the **JSON** variant type. Enable distribution to the browser SDK and add these variants:

**Standard**:

```json
{
  "sessionSampleRate": 100,
  "sessionReplaySampleRate": 10
}
```

**Reduced Collection**:

```json
{
  "sessionSampleRate": 20,
  "sessionReplaySampleRate": 0
}
```

Select **Standard** as the default variant, and target **Reduced Collection** only to users for whom collection needs to be reduced. This example reduces session ingestion and disables Session Replay for that group. Optionally, add a JSON Schema to validate the configuration values. See [Dynamic Configuration][7].

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-feature-flags/rum-configuration-json-variants.png" alt="JSON variants: Standard uses sessionSampleRate 100 and sessionReplaySampleRate 10; Reduced Collection uses 20 and 0." style="width:100%;" >}}

RUM without Limits does not require 100% Session Replay sampling. Choose `sessionReplaySampleRate` independently based on your observability needs; `10` is an example. It is the percentage of sessions sampled by RUM that are also eligible for Session Replay, so changing `sessionSampleRate` also affects replay volume. See [Browser RUM and Session Replay sampling][8]. Keep the application ID, client token, and other fixed settings in application code.

## Initialize flags before RUM

Replace your existing RUM initialization with the following startup code. Run it once per page load. Replace the placeholders with your Datadog configuration, and use the same environment as the flag's targeting rules.

Get the user ID and targeting attributes from your application's authentication or user state. For anonymous visitors, use a stable application-generated identifier as the `targetingKey`. Do not depend on a RUM-generated identity to decide how to initialize RUM.

```javascript
import { datadogRum } from '@datadog/browser-rum';
import { DatadogProvider, withTimeout } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const datadogConfig = {
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  service: 'my-web-application',
  env: '<ENV_NAME>',
  version: '1.0.0',
};

// Replace these values with identity and attributes from your application.
const user = { id: '<USER_ID>', business_id: 'example-company' };
const evaluationContext = {
  targetingKey: user.id,
  business_id: user.business_id,
};

let rumSettings = {
  sessionSampleRate: 100,
  sessionReplaySampleRate: 10, // Example: choose a rate for your replay needs.
};

function validSampleRate(value, fallback) {
  return Number.isFinite(value) && value >= 0 && value <= 100
    ? value
    : fallback;
}

try {
  const provider = new DatadogProvider({
    ...datadogConfig,
    // Limit each flag configuration request to 1500 ms.
    flagConfigurationFetch: withTimeout(globalThis.fetch, 1500),
    enableRumFeatureFlagTracking: true,
  });

  await OpenFeature.setProviderAndWait(provider, evaluationContext);

  const client = OpenFeature.getClient();
  rumSettings.sessionSampleRate = validSampleRate(
    client.getNumberValue('rum-session-sample-rate', rumSettings.sessionSampleRate),
    rumSettings.sessionSampleRate,
  );
} catch {
  // Keep the local settings if the provider cannot initialize.
}

// Initialize RUM once, after selecting the configuration.
datadogRum.init({
  ...datadogConfig,
  ...rumSettings,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
datadogRum.setUser(user);
```

Choose a timeout that fits your startup requirements. Waiting for flag configuration delays RUM initialization. The provider can use a matching cached configuration if the request fails; if initialization still fails, the example starts RUM with local settings. See [flag request timeouts and retries][9].

### Use the JSON configuration flag

To use `rum-configuration`, replace the `client.getNumberValue()` evaluation and its assignment inside the `try` block with the following code. Keep the provider initialization, error handling, and single `datadogRum.init()` call from the full example.

```javascript
const settings = client.getObjectValue('rum-configuration', rumSettings);
rumSettings = {
  sessionSampleRate: validSampleRate(
    settings?.sessionSampleRate,
    rumSettings.sessionSampleRate,
  ),
  sessionReplaySampleRate: validSampleRate(
    settings?.sessionReplaySampleRate,
    rumSettings.sessionReplaySampleRate,
  ),
};
```

`getObjectValue()` returns an object, so no `JSON.parse()` call is needed. This example validates the two supported settings before applying them. Add validation for any other settings you choose to control with the flag.

### Share user context and track flag evaluations

Set OpenFeature context and RUM user information from the same application state, as shown above. Calling `datadogRum.setUser()` after the provider initializes does not automatically update its evaluation context. If the user changes, also call `await OpenFeature.setContext()` with the new targeting key and attributes. See [evaluation context][10].

Initializing the provider before RUM does not disable `enableRumFeatureFlagTracking`. The example imports the RUM SDK before evaluating the flag. The provider sends the evaluation to RUM, which buffers it until RUM starts. Subsequent evaluations are attached to RUM events when RUM is available.

If you load the RUM SDK only after evaluating the flag, that earlier evaluation is not automatically replayed. Evaluate the flag again after loading RUM if you need to attach it to RUM events. RUM sampling and tracking consent still determine whether RUM data is collected.

## Change the configuration in Datadog

After deploying the startup code:

1. Open the configuration flag in Datadog and select the environment used by the application.
2. If technical or budget constraints require lower ingestion, update the targeting rules to serve **Reduced Collection** to the affected users. Keep **Standard** as the default for other users.
3. Save the changes. Subsequent page loads that retrieve the updated configuration use it when initializing RUM.
4. When those constraints are resolved, restore the **Standard** variant to return the affected users to 100% session sampling.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-feature-flags/rum-session-sample-rate-enabled.png" alt="RUM session sample rate flag enabled in prod, serving Reduced Collection when business_id is example-company and Standard otherwise." style="width:100%;" >}}

RUM makes session sampling decisions for the session and preserves them across page loads. Changing `sessionSampleRate` does not resample an existing session. Validate sampling changes with a new RUM session. See [Best practices for RUM sampling][11].

## Use another flag provider

With another browser flag provider, follow the same initialization sequence:

1. Initialize the provider with identity and targeting attributes from your application.
2. Wait for the provider to become ready, with a timeout and local fallback settings.
3. Evaluate numeric or JSON configuration flags and validate their values.
4. Pass the values to `datadogRum.init()` once.

For an OpenFeature-compatible provider, replace `DatadogProvider` with that provider and follow its configuration and readiness requirements. For providers with their own client APIs, use their equivalent evaluation methods. RUM user context sharing and automatic flag evaluation tracking depend on the provider; configure [RUM feature flag tracking][12] separately when needed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/feature_flags/
[2]: /real_user_monitoring/application_monitoring/browser/setup/client/
[3]: /feature_flags/client/javascript/
[4]: https://app.datadoghq.com/feature-flags/create
[5]: /feature_flags/concepts/distribution_channels/
[6]: /feature_flags/concepts/targeting_rules/
[7]: /feature_flags/use_cases/dynamic_configuration/
[8]: /real_user_monitoring/guide/sampling-browser-plans/
[9]: /feature_flags/client/javascript/#set-a-timeout-and-retries-for-flag-configuration-requests
[10]: /feature_flags/concepts/evaluation_context/
[11]: /real_user_monitoring/guide/best-practices-for-rum-sampling/
[12]: /real_user_monitoring/feature_flag_tracking/
[13]: /real_user_monitoring/rum_without_limits/
[14]: /real_user_monitoring/rum_without_limits/retention_filters/
