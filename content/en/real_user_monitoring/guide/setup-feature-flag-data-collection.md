---
title: Getting Started with Feature Flag Data in RUM
kind: guide
beta: true
description: Learn how to set up RUM to capture feature flag data and analyze the performance in Datadog
aliases:
- /real_user_monitoring/guide/getting-started-feature-flags/
further_reading:
- link: '/real_user_monitoring/feature_flag_tracking'
  tag: 'Documentation'
  text: 'Analyze your feature flag data with Feature Flag Tracking'
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the RUM Explorer'
---

<div class="alert alert-warning">
    Feature Flag Tracking is in beta.
</div>


## Overview
Feature flag data gives you greater visibility into your user experience and performance monitoring by allowing you to determine which users are being shown a specific feature and if any change you introduce is impacting your user experience or negatively affecting performance.

By enriching your RUM data with feature flag data, you can be confident that your feature will successfully launch without unintentionally causing a bug or performance regression. With this additional layer of insight, you can correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster.

## Setup
Feature flag tracking is available in the RUM Browser SDK. To start, set up [RUM browser monitoring][1]. You need the Browser RUM SDK version >= 4.25.0.

You can start collecting feature flag data for [custom feature flag management solutions](#custom-feature-flag-management), or using one of our integration partners.

We currently support integrations with:

{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Custom feature flag management

{{< tabs >}}
{{% tab "npm" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     ...
     enableExperimentalFeatures: ["feature_flags"],
     ...
   });
   ```

2. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM

   ```javascript
   datadogRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "CDN async" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   })
   ```

2. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```javascript
   datadogRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "CDN sync" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   ```

2. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```javascript
   datadogRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### LaunchDarkly Integration

{{< tabs >}}
{{% tab "npm" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     …
     enableExperimentalFeatures: ["feature_flags"],
     …
   });
   ```

2. Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code shown below.

   For more information about initializing LaunchDarkly's SDK, check out [LaunchDarkly's JavaScript SDK documentation][1].

   ```javascript
   const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
     inspectors: [
       {
         type: "flag-used",
         name: "dd-inspector",
         method: (key: string, detail: LDClient.LDEvaluationDetail) => {
           datadogRum.addFeatureFlagEvaluation(key, detail.value);
         },
       },
     ],
   });
   ```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{% tab "CDN async" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   ```

2. Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code below.

   For more information about initializing LaunchDarkly's SDK, check out [LaunchDarkly's JavaScript SDK documentation][1].

   ```javascript
   const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
     inspectors: [
       {
         type: "flag-used",
         name: "dd-inspector",
         method: (key: string, detail: LDClient.LDEvaluationDetail) => {
           datadogRum.addFeatureFlagEvaluation(key, detail.value);
         },
       },
     ],
   });
   ```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{% tab "CDN sync" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   ```

2. Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code below.

   For more information about initializing LaunchDarkly's SDK, check out [LaunchDarkly's JavaScript SDK documentation][1].

   ```javascript
   const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
     inspectors: [
       {
         type: "flag-used",
         name: "dd-inspector",
         method: (key: string, detail: LDClient.LDEvaluationDetail) => {
           datadogRum.addFeatureFlagEvaluation(key, detail.value);
         },
       },
     ],
   });
   ```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{< /tabs >}}


### Split Integration

{{< tabs >}}
{{% tab "npm" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     …
     enableExperimentalFeatures: ["feature_flags"],
     …
   });
   ```

2. Initialize Split's SDK and and create an impression listener reporting feature flags evaluations to Datadog using the following snippet of code

   For more information about initializing Split's SDK, check out Split's [JavaScript SDK documentation][1].

   ```javascript
   const factory = SplitFactory({
       core: {
         authorizationKey: "<APP_KEY>",
         key: "<USER_ID>",
       },
       impressionListener: {
         logImpression(impressionData) {
             datadogRum
                 .addFeatureFlagEvaluation(
                      impressionData.impression.feature,
                      impressionData.impression.treatment
                 );
        },
     },
   });

   const client = factory.client();
   ```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{% tab "CDN async" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   })
   ```

2. Initialize Split's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code below.

   For more information about initializing Split's SDK, check out Split's [JavaScript SDK documentation][1].

   ```javascript
   const factory = SplitFactory({
       core: {
         authorizationKey: "<APP_KEY>",
         key: "<USER_ID>",
       },
       impressionListener: {
         logImpression(impressionData) {
             datadogRum
                 .addFeatureFlagEvaluation(
                      impressionData.impression.feature,
                      impressionData.impression.treatment
                 );
        },
     },
   });

   const client = factory.client();
   ```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{% tab "CDN sync" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   ```

2. Initialize Split's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code below.

   For more information about initializing Split's SDK, check out Split's [JavaScript SDK documentation][1].

   ```javascript
   const factory = SplitFactory({
       core: {
         authorizationKey: "<APP_KEY>",
         key: "<USER_ID>",
       },
       impressionListener: {
         logImpression(impressionData) {
             datadogRum
                 .addFeatureFlagEvaluation(
                      impressionData.impression.feature,
                      impressionData.impression.treatment
                 );
        },
     },
   });

   const client = factory.client();
   ```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{< /tabs >}}


### Flagsmith Integration

{{< tabs >}}
{{% tab "npm" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   // Initialize Datadog Browser SDK
   datadogRum.init({
     …
     enableExperimentalFeatures: ["feature_flags"],
     …
   });
   ```

2. Initialize Flagsmith's SDK with the `datadogRum` option, which reports feature flags evaluations to Datadog using the snippet of code shown below.

   Optionally, you can configure the client so that Flagsmith traits are sent to Datadog via `datadogRum.setUser()`. For more information about initializing Flagsmith's SDK, check out [Flagsmith's JavaScript SDK documentation][1].

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{% tab "CDN async" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   })
   ```

2. Initialize Flagsmith's SDK with the `datadogRum` option, which reports feature flags evaluations to Datadog using the snippet of code shown below.

    Optionally, you can configure the client so that Flagsmith traits are sent to Datadog via `datadogRum.setUser()`. For more information about initializing Flagsmith's SDK, check out [Flagsmith's JavaScript SDK documentation][1].

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{% tab "CDN sync" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   ```

2. Initialize Flagsmith's SDK with the `datadogRum` option, which reports feature flags evaluations to Datadog using the snippet of code shown below.

    Optionally, you can configure the client so that Flagsmith traits are sent to Datadog via `datadogRum.setUser()`. For more information about initializing Flagsmith's SDK, check out [Flagsmith's JavaScript SDK documentation][1].

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{< /tabs >}}

## Analyze your Feature Flag performance in RUM

Feature flags appear in the context of your RUM Sessions, Views, and Errors as a list.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Feature Flag list of attributes in RUM Explorer" style="width:75%;">}}

### Search feature flags using the RUM Explorer
Search through all the data collected by RUM in the [RUM Explorer][2] to surface trends on feature flags, analyze patterns with greater context, or export them into [dashboards][3] and [monitors][4]. You can search your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute.

#### Sessions
Filtering your **Sessions** with the `@feature_flags.{flag_name}` attribute, you will find all sessions in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Search Sessions for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Views
Filtering your **Views** with the `@feature_flags.{flag_name}` attribute, you will find the specific views in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Search Views for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Errors
Filtering your **Errors** with the `@feature_flags.{flag_name}` attribute, you will find all the errors in the given time frame that occurred on the View where your feature flag was evaluated

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Search Errors for Feature Flags in the RUM Explorer" style="width:75%;">}}

### Why doesn’t my feature flag data reflect what I expect to see?
Feature flags will show up in the context of events where they are evaluated, meaning they should show up on the views that the feature flag code logic is run on.

Depending on how you've structured your code and set up your feature flags, you may see unexpected feature flags appear in the context of some events.

For example, to see what **Views** your feature flag is being evaluated on, you can use the RUM Explorer to make a similar query:


{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Search Views for Feature Flags in the RUM Explorer" style="width:75%;">}}


Here are a few examples of reasons why your feature flag is being evaluated on unrelated Views that can help with your investigations:

- A common react component that appears on multiple pages which evaluates feature flags whenever they run.
- A routing issue where components with a feature flag evaluation are rendered before/after URL changes.

When performing your investigations, you can also scope your data for `View Name`’s that are relevant to your feature flag.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser#setup
[2]: https://app.datadoghq.com/rum/explorer
[3]: /dashboards/
[4]: /monitors/#create-monitors
