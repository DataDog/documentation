## Set sdkVerbosity for easier debugging

If you're able to run your app, but you are not seeing the data you expect on the Datadog site, try adding the following to your code as part of initialization:

```csharp
DatadogSdk.Instance.SetSdkVerbosity(CoreLoggerLevel.Debug);
```

This causes the SDK to output additional information about what it's doing and what errors it's encountering, which may help you and Datadog Support narrow down your issue.

## The SDK is not sending data

{% alert type="info" %}
Datadog does not support sending data from the Unity Editor, only from iOS and Android simulators, emulators, and devices.
{% /alert %}

If you're not seeing any data in Datadog:

1. Make sure you are running your app on an iOS or Android simulator, emulator, or device, and not from the editor.
2. Check that you have set the `TrackingConsent` as part of your initialization. Tracking consent is set to `TrackingConsent.Pending` during initialization,
and needs to be set to `TrackingConsent.Granted` before Datadog sends any information.

```csharp
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
```
