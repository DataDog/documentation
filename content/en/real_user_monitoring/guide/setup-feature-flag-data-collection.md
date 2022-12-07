---
title: Getting Started with Feature Flag Data in RUM
kind: guide
beta: true
private: true
description: Learn how to set up RUM to capture feature flag data and analyze the performance in Datadog
aliases:
- /real_user_monitoring/guide/getting-started-feature-flags/
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the RUM Explorer'
---

{{< beta-callout url="#" btn_hidden="true" >}}
Feature Flag data collection in RUM is in private beta. To request access, contact Support at support@datadoghq.com.
{{< /beta-callout >}}

## Overview
Feature flag data gives you greater visibility into your user experience and performance monitoring by allowing you to determine which users are being shown a specific feature and if any change you introduce is impacting your user experience or negatively affecting performance. 

By enriching your RUM data with feature flag data, you can be confident that your feature will successfully launch without unintentionally causing a bug or performance regression. With this additional layer of insight, you can correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster.

## Setup
Feature flag tracking is available in the RUM Browser SDK. To start, set up [RUM browser monitoring][1]. You need the Browser RUM SDK version >= 4.25.0.

You can start collecting feature flag data for [custom feature flag management solutions][2], or using one of our integration partners. 

We currently support integrations with:
- [LaunchDarkly][3]
- [Split][4]

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

   ```html
   <script>
     (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
     })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   </script>
   ```

2. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```javascript
   datadogRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "CDN sync" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```html
   <script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
   <script>
     window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   </script>
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

   For more information about initializing LaunchDarkly's SDK, check out [LaunchDarkly's JavaScript SDK documentation][5].

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

[5]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client

{{% /tab %}}
{{% tab "CDN async" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```html
   <script>
     (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
     })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   </script>
   ```

2. Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code below.

   For more information about initializing LaunchDarkly's SDK, check out [LaunchDarkly's JavaScript SDK documentation][5].

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

[5]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client

{{% /tab %}}
{{% tab "CDN sync" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```html
   <script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
   <script>
     window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   </script>
   ```

2. Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code below.

   For more information about initializing LaunchDarkly's SDK, check out [LaunchDarkly's JavaScript SDK documentation][5].

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

[5]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client

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

   For more information about initializing Split's SDK you can check their documentation [here][6].

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
                      impressionData.impression.value
                 );
        },
     },
   });

   const client = factory.client();
   ```

[6]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client

{{% /tab %}}
{{% tab "CDN async" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```html
   <script>
     (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
     })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
     DD_RUM.onReady(function() {
       DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
     })
   </script>
   ```

2. Initialize Split's SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

   For more information about initializing Split's SDK you can check their documentation [here][6].

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
                      impressionData.impression.value
                 );
        },
     },
   });

   const client = factory.client();
   ```

[6]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client

{{% /tab %}}
{{% tab "CDN sync" %}}

1. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

   ```html
   <script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
   <script>
     window.DD_RUM &&
       window.DD_RUM.init({
         ...
         enableExperimentalFeatures: ["feature_flags"],
         ...
       })
   </script>
   ```

2. Initialize Split's SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

   For more information about initializing Split's SDK you can check their documentation [here][6].

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
                      impressionData.impression.value
                 );
        },
     },
   });

   const client = factory.client();
   ```

[6]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client

{{% /tab %}}
{{< /tabs >}}


## Analyze your Feature Flag performance in RUM

Feature Flags appear in the context of your RUM Sessions, Views, and Errors as a list. 

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Feature Flag list of attributes in RUM Explorer" style="width:75%;">}}

### Search Feature Flags using the RUM Explorer
Search through all the data collected by RUM in the [RUM Explorer][7] to surface trends on feature flags, analyze patterns with greater context, or export them into [dashboards][8] and [monitors][9]. You can search your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute. 

#### Sessions
Filtering your **Sessions** with the `@feature_flags.{flag_name}` attribute, you will find all sessions in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Search Sessions for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Views
Filtering your **Views** with the `@feature_flags.{flag_name}` attribute, you will find the specific views in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Search Views for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Errors
Filtering your **Errors** with the `@feature_flags.{flag_name}` attribute, you will find all the errors in the given time frame that occurred on the View where your feature flag was evaluated

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Search Errors for Feature Flags in the RUM Explorer" style="width:75%;">}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser#setup
[2]: #custom-feature-flag-management
[3]: #launchdarkly-integration
[4]: #split-integration
[5]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
[6]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
[7]: https://app.datadoghq.com/rum/explorer
[8]: /dashboards/
[9]: /monitors/create/
