### Amplitude integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

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

### ConfigCat integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

When initializing the ConfigCat Swift iOS SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

For more information about initializing the ConfigCat Swift (iOS) SDK, see ConfigCat's[Swift iOS SDK documentation][2].

### Custom feature flag management

Before you initialize a custom feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

### DevCycle integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

DevCycle does not support this integration. Create a ticket with [DevCycle][3] to request this feature.

### Eppo integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's iOS SDK documentation][4].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

### Flagsmith integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Flagsmith does not support this integration. Create a ticket with Flagsmith to request this feature.

### GrowthBook integration

GrowthBook does not support this integration. Contact GrowthBook to request this feature.

### Kameleoon integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Kameleoon does not support this integration. Contact product@kameleoon.com to request this feature.

### LaunchDarkly integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

LaunchDarkly does not support this integration. Create a ticket with LaunchDarkly to request this feature.

### Split integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Split's SDK and create an inspector reporting feature flag evaluations to Datadog using the snippet of code below.

For more information about initializing Split's SDK, see Split's [iOS SDK documentation][5].

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

### Statsig integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Statsig does not support this integration. Contact support@statsig.com to request this feature.

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/
[2]: https://configcat.com/docs/sdk-reference/ios
[3]: https://devcycle.com/contact/request-support
[4]: https://docs.geteppo.com/sdks/client-sdks/ios
[5]: https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK
