---
title: Troubleshooting Unity SDK Issues
description: Learn how to troubleshoot issues with Unity Monitoring.
aliases:
- /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/unity
- /real_user_monitoring/mobile_and_tv_monitoring/unity/troubleshooting
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: "Source Code"
  text: Source code for dd-sdk-unity
- link: https://github.com/DataDog/unity-package
  tag: "Source Code"
  text: Package URL for Unity SDK
- link: real_user_monitoring/unity/
  tag: Documentation
  text: Learn about Unity Monitoring

---

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve those issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Set sdkVerbosity for easier debugging

If you're able to run your app, but you are not seeing the data you expect on the Datadog site, try adding the following to your code as part of initialization:

{{< code-block lang="cs" >}}
DatadogSdk.Instance.SetSdkVerbosity(CoreLoggerLevel.Debug);
{{< /code-block >}}

This causes the SDK to output additional information about what it's doing and what errors it's encountering, which may help you and Datadog Support narrow down your issue.

## The SDK is not sending data

<div class="alert alert-info">Datadog does not support sending data from the Unity Editor, only from iOS and Android simulators, emulators, and devices.</div>

If you're not seeing any data in Datadog:

1. Make sure you are running your app on an iOS or Android simulator, emulator, or device, and not from the editor.
2. Check that you have set the `TrackingConsent` as part of your initialization. Tracking consent is set to `TrackingConsent.Pending` during initialization,
and needs to be set to `TrackingConsent.Granted` before Datadog sends any information.

   {{< code-block lang="cs" >}}
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help

