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

## Overview
Feature flag data gives you greater visibility into your user experience and performance monitoring by allowing you to determine which users are being shown a specific feature and if your change is having an impact on your user experience or causing a negative impact in performance. 

By enriching your RUM data with feature flag data, you can be confident that your feature will successfully launch, and ensure it’s not unintentionally causing a bug or performance regression. With this additional layer of insight, you can now correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster.
## Setup
Feature Flag tracking is available in the RUM Browser SDK. You can start collecting feature flag data for custom feature flag management solutions, or using one of our integration partners. 

We currently support integrations with:
- LaunchDarkly
- Split


{{< tabs >}}
{{% tab "npm" %}}

1. Set up [RUM browser monitoring](/real_user_monitoring/browser#setup).  You need the Browser RUM SDK version >= 4.25.0.
2. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

```
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog Browser SDK
datadogRum.init({
  …
  enableExperimentalFeatures: ["feature_flags"],
  …
});
```

3. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM

```
// Call the following function everytime a feature flag is evaluated
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "CDN" %}}

1. Set up [RUM browser monitoring](/real_user_monitoring/browser#setup).  You need the Browser RUM SDK version >= 4.25.0.
2. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

```
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog Browser SDK
datadogRum.init({
  …
  enableExperimentalFeatures: ["feature_flags"],
  …
});
```

3. Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM

```
//
```

{{% /tab %}}
{{% tab "LaunchDarkly Integration" %}}

1. Set up [RUM browser monitoring](/real_user_monitoring/browser#setup).  You need the Browser RUM SDK version >= 4.25.0.
2. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

```
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog Browser SDK
datadogRum.init({
  …
  enableExperimentalFeatures: ["feature_flags"],
  …
});
```

3. Initialize LaunchDarkly’s SDK and create an inspector reporting feature flags evaluations to Datadog using the following snippet of code

```
// Initialize LaunchDarkly’s SDK and create an inspector reporting feature flags evaluations to Datadog
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
}
```

{{% /tab %}}
{{% tab "Split Integration" %}}

1. Set up [RUM browser monitoring](/real_user_monitoring/browser#setup).  You need the Browser RUM SDK version >= 4.25.0.
2. To start collecting feature flag data, initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

```
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog Browser SDK
datadogRum.init({
  …
  enableExperimentalFeatures: ["feature_flags"],
  …
});
```

3. Initialize Split’s SDK and and create an impression listener reporting feature flags evaluations to Datadog using the following snippet of code

```
// Initialize Split’s SDK and create an impression listener reporting feature flag evaluations to Datadog
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
{{< /tabs >}}


## Analyze your Feature Flag Performance in RUM

Feature Flags appear in the context of your RUM Sessions, Views, and Errors as a list. 


You can filter your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute. This will show you Sessions, Views, or Errors that had the feature flag of interest evaluated during the Session.

You can also filter your Views in the RUM Explorer, with the `@view.feature_flags.{flag_name}` attribute. This will show you the Views where your feature flag evaluation occurred.

### Explore the Feature Flag Analysis Dashboard
The Feature Flag analysis dashboard provides an overview of the performance of your feature flag, showing you information about user sessions, changes in your Core Web Vitals, and error rates. 

You can clone this dashboard and customize it to fit your needs.

### Explore the Feature Flag Analysis Powerpacks

