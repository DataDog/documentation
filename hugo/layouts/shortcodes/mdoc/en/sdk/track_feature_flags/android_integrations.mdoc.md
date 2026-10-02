### Amplitude integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

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

### ConfigCat integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

When initializing the ConfigCat Android SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```java
ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
  options.hooks().addOnFlagEvaluated(details -> {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
  });
});
```

For more information about initializing the ConfigCat Android SDK, see ConfigCat's [Android SDK documentation][2].

### Custom feature flag management

Before you initialize a custom feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

### DevCycle integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

DevCycle does not support this integration. Create a ticket with [DevCycle][3] to request this feature.

### Eppo integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's Android SDK documentation][4].

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

### Flagsmith integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Flagsmith does not support this integration. Create a ticket with Flagsmith to request this feature.

### GrowthBook integration

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by calling `setFeatureUsageCallback`.

For more information about initializing GrowthBook's SDK, see [GrowthBook's Android SDK documentation][5].

```kotlin
val gbBuilder = GBSDKBuilder(...)

gbBuilder.setFeatureUsageCallback { featureKey, result ->
  GlobalRumMonitor.get().addFeatureFlagEvaluation(featureKey, result.value);
}

val gb = gbBuilder.initialize()
```

### Kameleoon integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Kameleoon does not support this integration. Contact product@kameleoon.com to request this feature.

### LaunchDarkly integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

LaunchDarkly does not support this integration. Create a ticket with LaunchDarkly to request this feature.

### Split integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Split's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Split's SDK, see Split's [Android SDK documentation][6].

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

### Statsig integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Statsig does not support this integration. Contact support@statsig.com to request this feature.

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/
[2]: https://configcat.com/docs/sdk-reference/android
[3]: https://devcycle.com/contact/request-support
[4]: https://docs.geteppo.com/sdks/client-sdks/android
[5]: https://docs.growthbook.io/lib/kotlin#quick-usage
[6]: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK
