---
title: Troubleshooting Unity SDK issues
description: Learn how to troubleshoot issues with Unity Monitoring.
aliases:
    - /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
code_lang: unity
type: multi-code-lang
code_lang_weight: 30
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

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Set sdkVerbosity

If you're able to run your app, but you are not seeing the data you expect on the Datadog site, try adding the following to your code as part of initialization :

```cs
DatadogSdk.Instance.SetSdkVerbosity(CoreLoggerLevel.Debug);
```

This causes the SDK to output additional information about what it's doing and what errors it's encountering, which may help you and Datadog Support narrow down your issue.

## SDK not sending data

If you're not seeing any data in Datadog, first make sure you are running your app on an iOS or Android simulator, emulator, or device, and not from the editor.

<div class="alert alert-info">
Datadog does not currently support sending data fro the Unity Editor, only from iOS and Android simulators, emulators, and devices.
</div>

Next, check that you have set the `TrackingConsent` as part of your initialization. Tracking consent is set to `TrackingConsent.Pending` during initialization,
and needs to be set to `TrackingConsent.Granted` before Datadog sends any information.

```cs
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
```

