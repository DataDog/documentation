---
title: Troubleshooting Android SDK issues
kind: documentation
description: Learn how to troubleshoot issues with Android Monitoring.
aliases:
    - /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
code_lang: android
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Check if Datadog RUM is initialized
Use the utility method `isInitialized` to check if the SDK is properly initialized:

```kotlin
if (Datadog.isInitialized()) {
    // your code here
}
```

## Debugging
When writing your application, you can enable development logs by calling the `setVerbosity` method. All internal messages in the library with a priority equal to or higher than the provided level are then logged to Android's Logcat:

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the SDK requires the tracking consent value at initialization.
Tracking consent can be one of the following values:

- `TrackingConsent.PENDING`: (Default) The SDK starts collecting and batching the data but does not send it to the
 collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You are not able to manually send any logs, traces, or
 RUM events.

To update the tracking consent after the SDK is initialized, call `Datadog.setTrackingConsent(<NEW CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:

- `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. 

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

## Migrating to 2.0.0

If you've been using the SDK v1, there are some breaking changes introduced in version `2.0.0`. See the [migration guide][2] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD
