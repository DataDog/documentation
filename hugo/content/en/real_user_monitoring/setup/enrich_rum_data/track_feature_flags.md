---
title: Track feature flags
description: "Track feature flag usage and performance impact in RUM to maintain release safety and optimize user experience with controlled rollouts."
beta: true
further_reading:
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn about the RUM Explorer"
- link: "https://www.datadoghq.com/blog/feature-flag-tracking/"
  tag: "Blog"
  text: "Ensure release safety with feature flag tracking in Datadog RUM"
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Create and manage feature flags in Datadog"
---

<div class="alert alert-info">
This page explains how to enrich RUM data to track feature flag usage and status. If you want to create feature flags directly in Datadog, see the <a href="https://docs.datadoghq.com/feature_flags/">Datadog Feature Flags documentation</a>.
</div>

Feature flag data provides greater visibility into user experience and performance monitoring. It allows you to determine which users are being shown a specific feature and assess if any changes introduced are impacting user experience or negatively affecting performance. You can use this information to determine whether or not to roll back the feature.

By enriching your RUM data with feature flag data, you can:

- Be confident that your feature successfully launches without unintentionally causing a bug or performance regression
- Correlate feature releases with performance, pinpoint issues to specific releases, and troubleshoot faster
- Simplify data collection and analysis and focus on troubleshooting

Feature flag tracking is available in the RUM Browser, iOS, Android, Flutter, and React Native SDK. You can create and track feature flags directly in Datadog, or track feature flags from one of Datadog's integration partners or your own [custom feature flag management solution][1].

## Set up RUM monitoring

{{< tabs >}}
{{% tab "Browser" %}}

To enable feature flag data collection for the Browser SDK:

1. Set up [RUM browser monitoring][1]. You need the Browser RUM SDK version >= 4.25.0.

2. Initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with ` ["feature_flags"]`.

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

[1]: /real_user_monitoring/application_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

To enable feature flag data collection for your iOS application:

1. Set up [RUM iOS monitoring][1]. You need the iOS RUM SDK version >= 1.16.0.

[1]: https://docs.datadoghq.com/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

To enable feature flag data collection for your Android application:

1. Set up [RUM Android monitoring][1]. You need the Android RUM SDK version >= 1.18.0.

[1]: https://docs.datadoghq.com/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

To enable feature flag data collection for your Flutter application:

1. Set up [RUM Flutter monitoring][1]. You need the Flutter Plugin version >= 1.3.2.

[1]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/flutter/setup
{{% /tab %}}
{{% tab "React Native" %}}

To enable feature flag data collection for your React Native application:

1. Set up [RUM React Native monitoring][1]. You need the React Native RUM SDK version >= 1.7.0.

[1]: https://docs.datadoghq.com/real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

## Set up a feature flag integration

You can start collecting feature flag data with [custom feature flag management solutions](#custom-feature-flag-management), or by using one of Datadog's integration partners listed below.

<div class="alert alert-danger">

**Note**: The following special characters are not supported for Feature Flag Tracking: `.`, `:`, `+`, `-`, `=`, `&&`, `||`, `>`, `<`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `“`, `”`, `~`, `*`, `?`, `\`. Datadog recommends avoiding these characters when possible in your feature flag names. If you are required to use one of these characters, replace the character before sending the data to Datadog. For example:

  ```javascript
  datadogRum.addFeatureFlagEvaluation(key.replaceAll(':', '_'), value);
  ```

</div>

{{< card-grid card_width="200" >}}
  {{< image-card href="/feature_flags" src="integrations_logos/datadog_large.svg" alt="datadog" >}}
  {{< image-card href="#amplitude-integration" src="integrations_logos/amplitude_large.svg" alt="amplitude" >}}
  {{< image-card href="#configcat-integration" src="integrations_logos/configcat_large.svg" alt="custom" >}}
  {{< image-card href="#custom-feature-flag-management" src="integrations_logos/docs_custom_feature_flag_systems_card.png" alt="custom" >}}
  {{< image-card href="#devcycle-integration" src="integrations_logos/devcycle_large.svg" alt="devcycle" >}}
  {{< image-card href="#eppo-integration" src="integrations_logos/eppo_large.svg" alt="eppo" >}}
  {{< image-card href="#flagsmith-integration" src="integrations_logos/flagsmith_large.svg" alt="flagsmith" >}}
  {{< image-card href="#growthbook-integration" src="integrations_logos/growthbook_large.svg" alt="growthbook" >}}
  {{< image-card href="#kameleoon-integration" src="integrations_logos/kameleoon.png" alt="kameleoon" >}}
  {{< image-card href="#launchdarkly-integration" src="integrations_logos/launchdarkly_large.svg" alt="launchdarkly" >}}
  {{< image-card href="#split-integration" src="integrations_logos/split_large.svg" alt="split" >}}
  {{< image-card href="#statsig-integration" src="integrations_logos/statsig_large.svg" alt="statsig" >}}
{{< /card-grid >}}

### Amplitude integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialize Amplitude's SDK and create an exposure listener reporting feature flag evaluations to Datadog using the following snippet of code:

For more information about initializing Amplitude's SDK, see Amplitude's [JavaScript SDK documentation][1].

```javascript
  const experiment = Experiment.initialize("CLIENT_DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
      track(exposure: Exposure)  {
        // Send the feature flag when Amplitude reports the exposure
        datadogRum.addFeatureFlagEvaluation(exposure.flag_key, exposure.variant);
      }
    }
  })
```


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/

{{% /tab %}}
{{% tab "iOS" %}}

Initialize Amplitude's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Amplitude's SDK, see Amplitude's [iOS SDK documentation][1].

```swift
  class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    func track(exposure: Exposure) {
      // Send the feature flag when Amplitude reports the exposure
      if let variant = exposure.variant {
        RUMMonitor.shared().addFeatureFlagEvaluation(name: exposure.flagKey, value: variant)
      }
    }
  }

  // In initialization:
  ExperimentConfig config = ExperimentConfigBuilder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider(analytics))
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/


{{% /tab %}}
{{% tab "Android" %}}

Initialize Amplitude's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Amplitude's SDK, see Amplitude's [Android SDK documentation][1].

```kotlin
internal class DatadogExposureTrackingProvider : ExposureTrackingProvider {
  override fun track(exposure: Exposure) {
      // Send the feature flag when Amplitude reports the exposure
      GlobalRumMonitor.get().addFeatureFlagEvaluation(
          exposure.flagKey,
          exposure.variant.orEmpty()
      )
  }
}

// In initialization:
val config = ExperimentConfig.Builder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider())
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/


{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude does not support this integration. Create a ticket with Amplitude to request this feature.


{{% /tab %}}
{{< /tabs >}}

### ConfigCat integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

When initializing the ConfigCat Javascript SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```javascript
const configCatClient = configcat.getClient(
  '#YOUR-SDK-KEY#',
  configcat.PollingMode.AutoPoll,
  {
    setupHooks: (hooks) =>
      hooks.on('flagEvaluated', (details) => {
        datadogRum.addFeatureFlagEvaluation(details.key, details.value);
      })
  }
);
```

For more information about initializing the ConfigCat Javascript SDK, see ConfigCat's [JavaScript SDK documentation][1].

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

When initializing the ConfigCat Swift iOS SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

For more information about initializing the ConfigCat Swift (iOS) SDK, see ConfigCat's[Swift iOS SDK documentation][1].

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

When initializing the ConfigCat Android SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```java
ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
  options.hooks().addOnFlagEvaluated(details -> {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
  });
});
```

For more information about initializing the ConfigCat Android SDK, see ConfigCat's [Android SDK documentation][1].

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

When initializing the ConfigCat Dart SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```dart
  final client = ConfigCatClient.get(
    sdkKey: '#YOUR-SDK-KEY#',
    options: ConfigCatOptions(
        pollingMode: PollingMode.autoPoll(),
        hooks: Hooks(
            onFlagEvaluated: (details) => {
              DatadogSdk.instance.rum?.addFeatureFlagEvaluation(details.key, details.value);
            }
        )
    )
  );
```

For more information about initializing the ConfigCat Dart (Flutter) SDK, see ConfigCat's [Dart SDK documentation][1].

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

When initializing the ConfigCat React SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```typescript
<ConfigCatProvider
  sdkKey="YOUR_SDK_KEY"
  pollingMode={PollingMode.AutoPoll}
  options={{
    setupHooks: (hooks) =>
      hooks.on('flagEvaluated', (details) => {
        DdRum.addFeatureFlagEvaluation(details.key, details.value);
      }),
  }}
>
  ...
</ConfigCatProvider>
```

For more information about initializing the ConfigCat React SDK, see ConfigCat's [React SDK documentation][1].

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### Custom feature flag management

Before you initialize a custom feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### DevCycle integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

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
    "variableEvaluated:*",
    (key, variable) => {
        // track all variable evaluations
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
...
dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
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

DevCycle does not support this integration. Create a ticket with [DevCycle][1] to request this feature.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Android" %}}

DevCycle does not support this integration. Create a ticket with [DevCycle][1] to request this feature.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle does not support this integration. Create a ticket with [DevCycle][1] to request this feature.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "React Native" %}}

DevCycle does not support this integration. Create a ticket with [DevCycle][1] to request this feature.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{< /tabs >}}

### Eppo integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's JavaScript SDK documentation][1].

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    datadogRum.addFeatureFlagEvaluation(assignment.featureFlag, assignment.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

[1]: https://docs.geteppo.com/sdks/client-sdks/javascript
{{% /tab %}}
{{% tab "iOS" %}}

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's iOS SDK documentation][1].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's Android SDK documentation][1].

```java
AssignmentLogger logger = new AssignmentLogger() {
    @Override
    public void logAssignment(Assignment assignment) {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(assignment.getFeatureFlag(), assignment.getVariation());
    }
};

EppoClient eppoClient = new EppoClient.Builder()
    .apiKey("YOUR_API_KEY")
    .assignmentLogger(logger)
    .application(application)
    .buildAndInit();
```


[1]: https://docs.geteppo.com/sdks/client-sdks/android

{{% /tab %}}
{{% tab "Flutter" %}}

Eppo does not support this integration. [Contact Eppo][1] to request this feature.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's React native SDK documentation][1].

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    DdRum.addFeatureFlagEvaluation(assignment.featureFlag, assignment.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

[1]: https://docs.geteppo.com/sdks/client-sdks/react-native

{{% /tab %}}
{{< /tabs >}}

### Flagsmith Integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

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

Flagsmith does not support this integration. Create a ticket with Flagsmith to request this feature.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith does not support this integration. Create a ticket with Flagsmith to request this feature.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith does not support this integration. Create a ticket with Flagsmith to request this feature.

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith does not currently support this integration. Create a ticket with Flagsmith to request this feature.

{{% /tab %}}
{{< /tabs >}}

### GrowthBook integration

{{< tabs >}}
{{% tab "Browser" %}}

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by using the `onFeatureUsage` callback.

For more information about initializing GrowthBook's SDK, see [GrowthBook's JavaScript SDK documentation][1].

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/js#step-1-configure-your-app

{{% /tab %}}
{{% tab "iOS" %}}

GrowthBook does not support this integration. Contact GrowthBook to request this feature.

{{% /tab %}}
{{% tab "Android" %}}

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by calling `setFeatureUsageCallback`.

For more information about initializing GrowthBook's SDK, see [GrowthBook's Android SDK documentation][1].

```kotlin
val gbBuilder = GBSDKBuilder(...)

gbBuilder.setFeatureUsageCallback { featureKey, result ->
  GlobalRumMonitor.get().addFeatureFlagEvaluation(featureKey, result.value);
}

val gb = gbBuilder.initialize()
```

[1]: https://docs.growthbook.io/lib/kotlin#quick-usage

{{% /tab %}}
{{% tab "Flutter" %}}

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by calling `setFeatureUsageCallback`.

For more information about initializing GrowthBook's SDK, see [GrowthBook's Flutter SDK documentation][1].

```dart
final gbBuilder = GBSDKBuilderApp(...);
gbBuilder.setFeatureUsageCallback((featureKey, result) {
  DatadogSdk.instance.rum?.addFeatureFlagEvaluation(featureKey, result.value);
});
final gb = await gbBuilder.initialize();
```

[1]: https://docs.growthbook.io/lib/flutter#quick-usage

{{% /tab %}}
{{% tab "React Native" %}}

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by using the `onFeatureUsage` callback.

For more information about initializing GrowthBook's SDK, see [GrowthBook's React Native SDK documentation][1].

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/react-native#step-1-configure-your-app

{{% /tab %}}
{{< /tabs >}}

### Kameleoon integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

After creating and initializing the Kameleoon SDK, subscribe to the `Evaluation` event using the `onEvent` handler.

For more information about the SDK, see [Kameleoon JavaScript SDK documentation][1].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon does not support this integration. Contact product@kameleoon.com to request this feature.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon does not support this integration. Contact product@kameleoon.com to request this feature.

{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon does not support this integration. Contact product@kameleoon.com to request this feature.

{{% /tab %}}
{{% tab "React Native" %}}

After creating and initializing the Kameleoon SDK, subscribe to the `Evaluation` event using the `onEvent` handler.

Learn more about SDK initialization in the [Kameleoon React Native SDK documentation][1].

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
{{% /tab %}}
{{< /tabs >}}

### LaunchDarkly integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code shown below.

 For more information about initializing LaunchDarkly's SDK, see [LaunchDarkly's JavaScript SDK documentation][1].

```javascript
const client = LDClient.initialize("<CLIENT_SIDE_ID>", "<CONTEXT>", {
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

LaunchDarkly does not support this integration. Create a ticket with LaunchDarkly to request this feature.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly does not support this integration. Create a ticket with LaunchDarkly to request this feature.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly does not support this integration. Create a ticket with LaunchDarkly to request this feature.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly does not currently support this integration. Create a ticket with LaunchDarkly to request this feature.


{{% /tab %}}
{{< /tabs >}}


### Split Integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialize Split's SDK and create an impression listener reporting feature flag evaluations to Datadog using the following snippet of code:

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

```swift
  let config = SplitClientConfig()
  // Send the feature flag when Split reports the impression
  config.impressionListener = { impression in
      if let feature = impression.feature,
          let treatment = impression.treatment {
          RUMMonitor.shared().addFeatureFlagEvaluation(name: feature, value: treatment)
      }
  }
```


[1]: https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK
{{% /tab %}}
{{% tab "Android" %}}

Initialize Split's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Split's SDK, see Split's [Android SDK documentation][1].

```kotlin
internal class DatadogSplitImpressionListener : ImpressionListener {
  override fun log(impression: Impression) {
      // Send the feature flag when Split reports the impression
      GlobalRumMonitor.get().addFeatureFlagEvaluation(
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
{{% tab "Flutter" %}}

Initialize Split's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Split's SDK, see Split's [Flutter plugin documentation][1].

```dart
  StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
    // Send the feature flag when Split reports the impression
    final split = impression.split;
    final treatment = impression.treatment;
    if (split != null && treatment != null) {
      DatadogSdk.instance.rum?.addFeatureFlagEvaluation(split, treatment);
    }
  });
```


[1]: https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin
{{% /tab %}}
{{% tab "React Native" %}}

Initialize Split's SDK and create an impression listener reporting feature flag evaluations to Datadog using the following snippet of code:

For more information about initializing Split's SDK, see Split's [React Native SDK documentation][1].

```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {
          DdRum
              .addFeatureFlagEvaluation(
                  impressionData.impression.feature,
                  impressionData.impression.treatment
              );
    },
  },
});

const client = factory.client();
```


[1]: https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{< /tabs >}}

### Statsig Integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialize Statsig's SDK with `statsig.initialize`.

1. Update your Browser RUM SDK version 4.25.0 or above.
2. Initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with `["feature_flags"]`.
3. Initialize Statsig's SDK (`>= v4.34.0`) and implement the `gateEvaluationCallback` option as shown below:

   ```javascript
    await statsig.initialize('client-<STATSIG CLIENT KEY>',
    {userID: '<USER ID>'},
    {
        gateEvaluationCallback: (key, value) => {
            datadogRum.addFeatureFlagEvaluation(key, value);
        }
    }
    );
   ```

[1]: https://docs.statsig.com/client/jsClientSDK
{{% /tab %}}
{{% tab "iOS" %}}

Statsig does not support this integration. Contact support@statsig.com to request this feature.

{{% /tab %}}
{{% tab "Android" %}}

Statsig does not support this integration. Contact support@statsig.com to request this feature.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig does not support this integration. Contact support@statsig.com to request this feature.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig does not currently support this integration. Contact support@statsig.com to request this feature.

{{% /tab %}}
{{< /tabs >}}

## View and analyze your feature flags

After you set up your feature flag data collection, navigate to the [{{< ui >}}Feature Flag Tracking{{< /ui >}}][2] tab within RUM.

From this view, you can investigate any questions you have about your feature flag's health and usage.
- Monitor the number of users experiencing each variant and see summary statistics of your feature flag.
- Check the [status](#feature-flag-status) of your feature flag to see if there are any that can be removed for code clean up.
- View which pages your feature flags are being evaluated against.

Feature flags show up in the context of events where they are evaluated, meaning they should show up on the views that the feature flag code logic is run on.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="View a list of your feature flags to investigate any questions you have about your feature flag's health and usage" style="width:90%;" >}}

### Search and filter
Search and filter your feature flags by typing in the search bar. You can also use the faceted search to narrow down, broaden, or shift your focus on subsets of feature flags you are interested in.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Feature Flag list search bar and filtering" style="width:90%;" >}}

### Feature flag status
There are three possible feature flag statuses:

Active
: The feature flag has evaluated different variants for the past 2 weeks.

Inactive
: For the past 2 weeks, there have only been feature flag evaluations for your control variant.

Out to 100%
: For the past 2 weeks, there have only been feature flag evaluations for one of your _non-control_ variants.


### Analyze your feature flags
To get more details about the health and performance of your feature flag, you can click the flag in the list to navigate to a dedicated Feature Flag analysis dashboard. The Feature Flag analysis dashboard provides an overview of the performance of your feature flag, displaying information about user sessions, changes in your Core Web Vitals, and error rates.

These out-of-the-box graphs are aggregated across your flag variants, making it easy to spot problems in your feature releases before they turn into serious issues. This dashboard provides an easy way to monitor your feature releases and allows you to quickly roll back as soon as you spot an issue so you can avoid negative user experiences.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Feature Flag details page - Users overview" video=true width=90% >}}

- The {{< ui >}}Users{{< /ui >}} tab provides some high level summary statistics of your feature flag and allows you to further analyze the users viewing each of your feature flag variants by any attribute. If you want to understand what it looks like for someone who experienced a certain variant versus another, you can watch a [Session Replay][3] for each case.

- The {{< ui >}}Issues{{< /ui >}} tab gives you a view of the errors that are occurring in your application for user sessions that have your feature flag. Check if any issues detected by [Error Tracking][4] occurred for a specific variant of your feature flag and might be related to your changes.

- The {{< ui >}}Performance{{< /ui >}} tab allows you to understand if one of your feature flag variants have caused poor performance. You can view your Core Web Vitals and loading time for each variant to determine if one of your variants may be causing a negative impact on your application's performance.

### Build custom views from Feature Flag data using the RUM Explorer
Search through all the data collected by RUM in the [RUM Explorer][5] to surface trends on feature flags, analyze patterns with greater context, or export them into [dashboards][6] and [monitors][7].

You can search your Sessions, Views, or Errors in the RUM Explorer, with the `@feature_flags.{flag_name}` attribute to scope down and focus on events where users were shown a specific user experience.

You can compare important metrics to you and your teams by grouping your query by `@feature_flags.{flag_name}`. For example, if you want to understand how your new checkout flow is affecting the conversion rate from the checkout page to users making a purchase, you can add a "Group by" on the conversion rate graph.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Feature Flag list search bar and filtering" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/setup/?tab=npm#custom-feature-flag-management
[2]: https://app.datadoghq.com/rum/feature-flags
[3]: /session_replay/browser/
[4]: /real_user_monitoring/error_tracking/explorer/#explore-your-issues
[5]: https://app.datadoghq.com/rum/explorer
[6]: /dashboards/
[7]: /monitors/#create-monitors
