---
title: Getting Started with Feature Flag data in RUM
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
Feature flag data gives you greater visibility into your user experience and performance monitoring by allowing you to determine which users are being shown a specific feature and if your change is having an impact on your user experience or causing a negative impact in performance. 

By enriching your RUM data with feature flag data, you can be confident that your feature will successfully launch, and ensure it’s not unintentionally causing a bug or performance regression. With this additional layer of insight, you can now correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster.

## Setup
Feature Flag tracking is available in the RUM Browser SDK. To start, set up [RUM browser monitoring](/real_user_monitoring/browser#setup). You need the Browser RUM SDK version >= 4.25.0.

You can start collecting feature flag data for [custom feature flag management solutions](#custom-feature-flag-management), or using one of our integration partners. 

We currently support integrations with:
- [LaunchDarkly](#launchdarkly-integration)
- [Split](#split-integration)

### Custom Feature Flag Management

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

2. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM

```
//
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

2. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM

```
//
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

2. Initialize LaunchDarkly’s SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

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

2. Initialize LaunchDarkly’s SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

```html
asdf
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

2. Initialize LaunchDarkly’s SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

```html
asdf
```

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

2. Initialize Split’s SDK and and create an impression listener reporting feature flags evaluations to Datadog using the following snippet of code

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

2. Initialize LaunchDarkly’s SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

```html
asdf
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

2. Initialize LaunchDarkly’s SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

```html
asdf
```

{{% /tab %}}
{{< /tabs >}}


## Analyze your Feature Flag Performance in RUM

Feature Flags appear in the context of your RUM Sessions, Views, and Errors as a list. 

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Feature Flag list of attributes in RUM Explorer" style="width:75%;">}}

### Search Feature Flags using the RUM Explorer
Search through all the data collected by RUM in the [RUM Explorer](https://app.datadoghq.com/rum/explorer) to surface trends on feature flags, analyze patterns with greater context, or export them into [dashboards](/dashboards/) and [monitors](/monitors/create/). You can search your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute. 

#### Sessions
Filtering your Sessions with the `@feature_flags.{flag_name}` attribute, you will find all Sessions in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Search Sessions for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Views
Filtering your Views with the `@feature_flags.{flag_name}` attribute, you will find the specific Views in the given time frame where your feature flag was evaluated.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Search Views for Feature Flags in the RUM Explorer" style="width:75%;">}}

#### Errors
Filtering your Errors with the `@feature_flags.{flag_name}` attribute, you will find all the Errors in the given time frame that occurred on the View where your feature flag was evaluated

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Search Errors for Feature Flags in the RUM Explorer" style="width:75%;">}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}