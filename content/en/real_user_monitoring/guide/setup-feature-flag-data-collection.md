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

{{< tabs >}}
{{% tab "Browser" %}}

Feature flag tracking is available in the RUM Browser SDK. To start, set up [RUM browser monitoring][1]. You need the Browser RUM SDK version >= 4.25.0.

To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

<details open>
  <summary>npm</summary>

```javascript
  import { datadogRum } from '@datadog/browser-rum';

  // Initialize Datadog Browser SDK
  datadogRum.init({
    ...
    enableExperimentalFeatures: ["feature_flags"],
    ...
});
```

</details>

<details>
  <summary>CDN async</summary>

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
})
```
</details>

<details>
  <summary>CDN sync</summary>

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
```
</details>
<br/>

[1]: /real_user_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

Feature flag tracking is available in the RUM iOS SDK. To start, set up [RUM iOS monitoring][1]. You need the iOS RUM SDK version >= 1.16.0.

[1]: https://docs.datadoghq.com/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

Feature flag tracking is available in the RUM Android SDK. To start, set up [RUM Android monitoring][1]. You need the Android RUM SDK version >= 1.18.0.

[1]: https://docs.datadoghq.com/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

Feature flag tracking is available for your Flutter applications. To start, set up [RUM Flutter monitoring][1]. You need the Flutter Plugin version >= 1.3.2.

[1]: https://docs.datadoghq.com/real_user_monitoring/flutter/
{{% /tab %}}
{{< /tabs >}}

## Integrations

You can start collecting feature flag data with [custom feature flag management solutions](#custom-feature-flag-management), or by using one of Datadog's integration partners.

Datadog supports integrations with:
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Custom feature flag management

{{< tabs >}}
{{% tab "Browser" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```javascript
   Global.rum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```javascript
   GlobalRum.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### LaunchDarkly integration

{{< tabs >}}
{{% tab "Browser" %}}

Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code shown below.

 For more information about initializing LaunchDarkly's SDK, see [LaunchDarkly's JavaScript SDK documentation][1].

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
{{% tab "iOS" %}}

LaunchDarkly does not currently support this integration. Create a ticket with LaunchDarkly to request this feature.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly does not currently support this integration. Create a ticket with LaunchDarkly to request this feature.


{{% /tab %}}
{{< /tabs >}}


### Split Integration

{{< tabs >}}
{{% tab "Browser" %}}

Initialize Split's SDK and and create an impression listener reporting feature flag evaluations to Datadog using the following snippet of code:

For more information about initializing Split's SDK, see Split's [JavaScript SDK documentation][1].

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
{{% tab "iOS" %}}

Initialize Split's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Split's SDK, see Split's [iOS SDK documentation][1].

```javascript
  let config = SplitClientConfig()
// Send the feature flag when Split reports the impression
  config.impressionListener = { impression in
      if let feature = impression.feature,
          let treatment = impression.treatment {
          Global.rum.addFeatureFlagEvaluation(name: feature, value: treatment)
      }
  }
```


[1]: https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK
{{% /tab %}}
{{% tab "Android" %}}

Initialize Split's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Split's SDK, see Split's [Android SDK documentation][1].

```javascript
  internal class DatadogSplitImpressionListener : ImpressionListener {
    override fun log(impression: Impression) {
        // Send the feature flag when Split reports the impression
        GlobalRum.get().addFeatureFlagEvaluation(
            impression.split(),
            impression.treatment()
        )
    }
    override fun close() {
    }
  }

  // In initialization:
  val apikey = BuildConfig.SPLIT_API_KEY
  val config = SplitClientConfig.builder()
      .impressionListener(DatadogSplitImpressionListener())
      .build()
```


[1]: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK
{{% /tab %}}
{{< /tabs >}}


### Flagsmith Integration

{{< tabs >}}
{{% tab "Browser" %}}

Initialize Flagsmith's SDK with the `datadogRum` option, which reports feature flag evaluations to Datadog using the snippet of code shown below.

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
{{% tab "iOS" %}}

Flagsmith does not currently support this integration. Create a ticket with Flagsmith to request this feature.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith does not currently support this integration. Create a ticket with Flagsmith to request this feature.

{{% /tab %}}
{{< /tabs >}}

### DevCycle integration

{{< tabs >}}
{{% tab "Browser" %}}

Initialize DevCycle's SDK and subscribe to the `variableEvaluated` event, choosing to subscribe to all variable evaluations `variableEvaluated:*` or particular variable evaluations `variableEvaluated:my-variable-key`.

For more information about initializing DevCycle's SDK, see [DevCycle's JavaScript SDK documentation][5] and for more information about DevCycle's event system, see [DevCycle's SDK Event Documentation][6].

```javascript
const user = { user_id: "<USER_ID>" };
const dvcOptions = { ... };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 
...
dvcClient.subscribe(
    "variableEvaluted:*",
    (key, variable) => {
        // track all variable evaluations
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
...
dvcClient.subscribe(
    "variableEvaluted:my-variable-key",
    (key, variable) => {
        // track a particular variable evaluation
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```


[5]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-install
[6]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle does not support this integration. Create a ticket with DevCycle to request this feature.


{{% /tab %}}
{{% tab "Android" %}}

DevCycle does not support this integration. Create a ticket with DevCycle to request this feature.


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

### Why doesn't my feature flag data reflect what I expect to see?
Feature flags will show up in the context of events where they are evaluated, meaning they should show up on the views that the feature flag code logic is run on.

Depending on how you've structured your code and set up your feature flags, you may see unexpected feature flags appear in the context of some events.

For example, to see what **Views** your feature flag is being evaluated on, you can use the RUM Explorer to make a similar query:


{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Search Views for Feature Flags in the RUM Explorer" style="width:75%;">}}


Here are a few examples of reasons why your feature flag is being evaluated on unrelated Views that can help with your investigations:

- A common react component that appears on multiple pages which evaluates feature flags whenever they run.
- A routing issue where components with a feature flag evaluation are rendered before/after URL changes.

When performing your investigations, you can also scope your data for `View Name`'s that are relevant to your feature flag.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/rum/explorer
[3]: /dashboards/
[4]: /monitors/#create-monitors
