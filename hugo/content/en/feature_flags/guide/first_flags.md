---
title: Use First Flags in Client Applications
description: Read available feature flags during startup with First Flags callbacks in Android, iOS, and Flutter applications.
draft: true
private: true
further_reading:
- link: "/feature_flags/client/android/"
  tag: "Documentation"
  text: "Android Feature Flags"
- link: "/feature_flags/client/ios/"
  tag: "Documentation"
  text: "iOS Feature Flags"
- link: "/feature_flags/client/flutter/"
  tag: "Documentation"
  text: "Dart and Flutter Feature Flags"
---

<div class="alert alert-warning">First Flags is available on Android in <code>dd-sdk-android-flags</code> 3.15.0 and later. The Apple and Dart/Flutter examples describe APIs pending release confirmation; this guide remains a draft until their supporting versions are verified.</div>

## Overview

Use First Flags to react when a client first installs flags from its local cache or a network response. For example, read a Boolean flag from disk during startup without waiting for the first network request to finish.

First Flags reports that a configuration was accepted. The client can replace or clear that configuration before the callback runs. It does not indicate that the data is fresh or targeted to the user signing in. Choose whether previously cached values are appropriate for the feature, and keep a default value for reads that fail.

Before using the examples, complete the SDK initialisation and flags setup for [Android][1], [iOS][2], or [Dart and Flutter][3]. Use the same client for registration and evaluation. Replace `my-flag-key` with a Boolean flag key from the configured environment.

## Understand the callback

Register with `client.onFirstFlags(...)`. Each registration receives one event for the first accepted cache or network installation:

- A valid configuration with no flags triggers the callback with an empty key list. Missing or invalid cached data and failed requests do not trigger it. If no configuration is ever accepted, the callback remains pending indefinitely.
- `type` identifies `CONFIGURATION_CHANGED`. `flagsChanged` contains all keys from that first installation. Although the field is optional in the event API, a First Flags event supplies a list, which can be empty.
- The keys describe the installed flags, not every flag in Datadog or flags the application has evaluated. Do not evaluate every key to collect an inventory.
- The client retains information about the first installation. Registering later delivers an event describing that installation, including after later updates. This delivery does not fetch or reload flags.
- The event contains keys, not values. Evaluations in the callback read the client's data at evaluation time, which can differ from the first installation.

First Flags is a one-time notification for each registration, not a subscription to subsequent configuration changes. A context update does not produce another callback for the same registration.

## Register and evaluate

The examples register before starting context initialisation so the callback can observe an early cache installation. Retained replay also handles an installation that finishes before registration.

### Android

After initialising Datadog and enabling `Flags`, create a client and register a listener:

```kotlin
import android.util.Log
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.model.EvaluationContext

val client = FlagsClient.Builder().build()
val subscription = client.onFirstFlags { event ->
    Log.i("FeatureFlags", "First flag keys: ${event.flagsChanged}")
    val details = client.resolve("my-flag-key", false)
    Log.i("FeatureFlags", "Value: ${details.value}, reason: ${details.reason}, error: ${details.errorCode}")
}
client.setEvaluationContext(EvaluationContext(targetingKey = "user-123"))
```

Retain `subscription` with the component that owns the listener. To stop pending delivery when the component is destroyed, call:

```kotlin
subscription.unsubscribe()
```

If your application uses OpenFeature, retain this native client and pass its `asOpenFeatureProvider()` adapter to OpenFeature. Set context through OpenFeature for that integration; do not also start a separate native context request for the same operation.

### Apple platforms

After initialising Datadog and enabling `Flags`, use a model that owns the client and its subscription. Dispatch work that updates application state to the main actor.

```swift
import DatadogFlags

@MainActor
final class FirstFlagsModel {
    private let client = FlagsClient.create()
    private var subscription: (any FlagsSubscription)?

    func start() {
        subscription = client.onFirstFlags { @Sendable [weak self] event in
            let keys = event.flagsChanged
            Task { @MainActor in
                guard let self else { return }
                print("First flag keys: \(keys ?? [])")
                let details = self.client.getBooleanDetails(
                    key: "my-flag-key",
                    defaultValue: false
                )
                print("Value: \(details.value), reason: \(details.reason ?? "unavailable"), error: \(String(describing: details.error))")
            }
        }
        client.setEvaluationContext(FlagsEvaluationContext(targetingKey: "user-123"))
    }

    func stop() {
        subscription?.cancel()
        subscription = nil
    }
}
```

Retain the model for the component's lifetime, call `start()` once, and call `stop()` during cleanup. Cancellation stops pending SDK delivery; it does not cancel application work already scheduled in a `Task`.

If you create a `DatadogProvider` for OpenFeature, it creates a native client. Retrieve that registered client with `FlagsClient.shared(named:in:)`, using the same name and Datadog core as the provider. Register on that client instead of creating another one. Let OpenFeature manage context updates for that integration.

### Flutter

After initialising the Datadog Flutter SDK with `DatadogFlagsPluginConfiguration`, retrieve the existing client. Register before awaiting its initialisation:

```dart
import 'package:datadog_flags_flutter/datadog_flags_flutter.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

void Function()? unregisterFirstFlags;

Future<void> startFlags() async {
  final client = DatadogSdk.instance.flags?.sharedClient();
  if (client == null) return;

  unregisterFirstFlags = client.onFirstFlags((event) {
    print('First flag keys: ${event.flagsChanged}');
    final details = client.getBooleanDetails(
      key: 'my-flag-key',
      defaultValue: false,
    );
    print('Value: ${details.value}, reason: ${details.reason}, error: ${details.error}');
  });
  await client.initialize(
    const FlagsEvaluationContext(targetingKey: 'user-123'),
  );
}

void stopFlags() {
  unregisterFirstFlags?.call();
  unregisterFirstFlags = null;
}
```

Call `startFlags()` once from the existing initialisation flow and handle initialisation failures there. Call `stopFlags()` from the owning component's cleanup. A Flutter widget can store the unregister function in its `State` and invoke it from `dispose()`.

For standalone Dart, use the same `onFirstFlags` method on the client created with the [Dart setup][3]. The Flutter example uses the plugin's `sharedClient()` API; do not construct its implementation class directly.

## Account for delivery timing

| Platform | Registration when the first event is available | Registration before the first event is available | Cleanup |
|---|---|---|---|
| Android | Immediate on the registering thread, before `onFirstFlags` returns | Background delivery | `subscription.unsubscribe()` |
| iOS | Synchronous on the registering thread, before `onFirstFlags` returns | On the thread that installs the flags | `subscription.cancel()` |
| Dart and Flutter | A microtask after registration | A microtask after the event is available and client binding completes | Call the returned unregister function |

Android and iOS callbacks are not guaranteed to run on the UI thread. Dart and Flutter callbacks run in the zone where the listener was registered, including replay. Keep callbacks short and dispatch UI work as needed.

Cancel a registration to release captured references if flags never become available. Cancellation is idempotent and affects only that registration; it does not stop cache loading, network requests, or other listeners. Delivery already claimed by the SDK can still run. Discarding the subscription or unregister function does not cancel it.

## Interpret an early evaluation

With an SDK release that supports the `CACHED` evaluation reason, a successful read from flags restored from disk reports `CACHED`. A network installation uses its own evaluation reason. The callback event does not report which source won. Evaluation details describe the flag value read at evaluation time, which can come from a later installation.

`CACHED` does not mean the flags match a newly requested user context or reflect the latest server configuration. An empty installation can trigger First Flags while a particular flag still returns its default because the key is absent. Inspect the error field as well as the value and reason.

A native client can have flags before OpenFeature finishes initialisation. First Flags does not change OpenFeature readiness or bypass an OpenFeature SDK's evaluation gate. Use the native client for the early read shown here. Native reads use Datadog's configured evaluation tracking, but do not run OpenFeature hooks. A later call through OpenFeature is a separate evaluation.

## Verify delivery

1. Register the callback and start a client that has no stored flags. After a successful network response, check that the callback logs the installed keys.
2. Restart with stored flags and delay the network response. If the cache is accepted first, check that the callback runs and a successful cached read reports `CACHED` on a supporting SDK version.
3. Register another listener after installation. Check that it receives the retained first keys with the platform-specific timing above. Its evaluation can use newer data.
4. Cancel a pending registration and verify that it receives no callback unless delivery was already claimed.

[1]: /feature_flags/client/android/
[2]: /feature_flags/client/ios/
[3]: /feature_flags/client/flutter/
