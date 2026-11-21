### Amplitude integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Amplitude does not support this integration. Create a ticket with Amplitude to request this feature.

### ConfigCat integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

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

### Custom feature flag management

Before you initialize a custom feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```

### DevCycle integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

DevCycle does not support this integration. Create a ticket with [DevCycle][2] to request this feature.

### Eppo integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Eppo does not support this integration. [Contact Eppo][3] to request this feature.

### Flagsmith integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Flagsmith does not support this integration. Create a ticket with Flagsmith to request this feature.

### GrowthBook integration

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by calling `setFeatureUsageCallback`.

For more information about initializing GrowthBook's SDK, see [GrowthBook's Flutter SDK documentation][4].

```dart
final gbBuilder = GBSDKBuilderApp(...);
gbBuilder.setFeatureUsageCallback((featureKey, result) {
  DatadogSdk.instance.rum?.addFeatureFlagEvaluation(featureKey, result.value);
});
final gb = await gbBuilder.initialize();
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

For more information about initializing Split's SDK, see Split's [Flutter plugin documentation][5].

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

### Statsig integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Statsig does not support this integration. Contact support@statsig.com to request this feature.

[1]: https://configcat.com/docs/sdk-reference/dart
[2]: https://devcycle.com/contact/request-support
[3]: mailto:support@geteppo.com
[4]: https://docs.growthbook.io/lib/flutter#quick-usage
[5]: https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin
