---
title: Disable RUM
description: Learn how to fully disable Real User Monitoring, including removing the SDK from your application and deleting the application from Datadog.
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options_v3
    label: "SDK"
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
- link: '/real_user_monitoring/guide/monitor-your-rum-usage'
  tag: 'Guide'
  text: 'Monitor your RUM usage'
- link: '/real_user_monitoring/guide/sampling-browser-plans'
  tag: 'Guide'
  text: 'Configure RUM sampling'
---

## Overview

Disabling RUM involves two independent components:

- **The SDK in your application**: collects user session data and sends it to Datadog. Removing or disabling the SDK stops data from being collected and sent.
- **The RUM application in Datadog**: stores the application configuration, dashboards, and monitors. Deleting the application removes it from the Datadog UI.

These two components are independent. Disabling one does not automatically disable the other. To fully stop data collection and remove the application from Datadog, you must address both.

## What happens if you only disable one component

| Action | Result |
|---|---|
| Delete the application from Datadog, but keep the SDK in your code | The application is marked as disabled. The SDK continues running in your code, but Datadog rejects the data at intake; events are not ingested or billed. |
| Remove the SDK from your code, but keep the application in Datadog | No new data is sent. The application remains visible in Datadog with a "no data" state, and its dashboards and monitors remain intact. |

## Disable the SDK in your application

Choose one of the following approaches depending on your goal.

### Revoke the client token

To stop data ingestion without deploying code changes, revoke the client token in Datadog. The SDK continues running in your application and collecting data, but Datadog rejects all submissions with a 403 error. Revoking a token takes approximately 2 hours to take effect across all intake endpoints.

To revoke a client token, go to [**Organization Settings** > **Client Tokens**][2], find the token for your application, and revoke it.

### Skip initialization

If you do not initialize the Datadog SDK, all SDK methods remain safe to call and do nothing. The SDK logs a one-time warning but does not throw errors. This is useful if you want to remove the initialization call from your code without removing every call site immediately.

### Pause data collection without removing the SDK

Set the session sample rate to `0` to stop sending data without removing the SDK from your codebase. This lets you re-enable RUM later without changing your deployment pipeline.

<!-- Browser -->
{% if equals($platform, "browser") %}
1. Set `sessionSampleRate` and `sessionReplaySampleRate` to `0` in your initialization call. This takes effect after the next page load.

   {% tabs %}

   {% tab label="CDN async" %}
   ```javascript
   DD_RUM.onReady(function() {
     DD_RUM.init({
       // ... other options
       sessionSampleRate: 0,
       sessionReplaySampleRate: 0,
     });
   });
   ```
   {% /tab %}

   {% tab label="CDN sync" %}
   ```javascript
   window.DD_RUM && window.DD_RUM.init({
     // ... other options
     sessionSampleRate: 0,
     sessionReplaySampleRate: 0,
   });
   ```
   {% /tab %}

   {% tab label="npm" %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
     // ... other options
     sessionSampleRate: 0,
     sessionReplaySampleRate: 0,
   });
   ```
   {% /tab %}

   {% /tabs %}

2. Deploy the change. No sessions are collected after the next page load.
{% /if %}
<!-- end Browser -->

<!-- iOS -->
{% if equals($platform, "ios") %}
1. Set `sessionSampleRate` to `0` in your RUM configuration and deploy the change. This takes effect after the next app launch.

   ```swift
   let configuration = RUM.Configuration(
       applicationID: "<RUM_APPLICATION_ID>",
       sessionSampleRate: 0
   )
   ```

2. To stop collection immediately without waiting for a relaunch, call `Datadog.set(trackingConsent:)`. Any data already captured before this call is still sent to Datadog.

   ```swift
   Datadog.set(trackingConsent: .notGranted)
   ```
{% /if %}
<!-- end iOS -->

<!-- Android -->
{% if equals($platform, "android") %}
1. Set `sessionSampleRate` to `0.0f` in your RUM configuration and deploy the change. This takes effect after the next app launch.

   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
       .setSessionSampleRate(0.0f)
       .build()
   Rum.enable(rumConfig)
   ```

2. To stop collection immediately without waiting for a relaunch, call `Datadog.setTrackingConsent()`. Any data already captured before this call is still sent to Datadog.

   ```kotlin
   Datadog.setTrackingConsent(TrackingConsent.NOT_GRANTED)
   ```
{% /if %}
<!-- end Android -->

<!-- Flutter -->
{% if equals($platform, "flutter") %}
1. Set `sessionSamplingRate` to `0.0` in your RUM configuration and deploy the change. `sessionSamplingRate` controls RUM sessions. To also disable Session Replay, set `replaySampleRate: 0.0`. This takes effect after the next app launch.

   ```dart
   final config = DatadogConfiguration(
       // other configuration...
       rumConfiguration: DatadogRumConfiguration(
           applicationId: '<RUM_APPLICATION_ID>',
           sessionSamplingRate: 0.0,
       ),
   );
   ```

2. To stop collection immediately without waiting for a relaunch, call `setTrackingConsent`. Any data already captured before this call is still sent to Datadog.

   ```dart
   await DatadogSdk.instance.setTrackingConsent(TrackingConsent.notGranted);
   ```
{% /if %}
<!-- end Flutter -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
1. Set `sessionSampleRate` to `0` in your SDK configuration and deploy the change. This takes effect after the next app launch.

   ```javascript
   import { DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';

   const config = new DdSdkReactNativeConfiguration(
       '<CLIENT_TOKEN>',
       '<ENVIRONMENT_NAME>',
       '<RUM_APPLICATION_ID>',
       true,
       true,
       true
   );
   config.sessionSampleRate = 0;
   ```

2. To stop collection immediately without waiting for a relaunch, call `DdSdkReactNative.setTrackingConsent()`. Any data already captured before this call is still sent to Datadog.

   ```javascript
   import { DdSdkReactNative, TrackingConsent } from '@datadog/mobile-react-native';

   await DdSdkReactNative.setTrackingConsent(TrackingConsent.NOT_GRANTED);
   ```
{% /if %}
<!-- end React Native -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
1. Set `sessionSampleRate` to `0.0f` in your RUM configuration and deploy the change. This takes effect after the next app launch.

   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
       .setSessionSampleRate(0.0f)
       .build()
   Rum.enable(rumConfig)
   ```

2. To stop collection immediately without waiting for a relaunch, call `Datadog.setTrackingConsent()`. Any data already captured before this call is still sent to Datadog.

   ```kotlin
   Datadog.setTrackingConsent(TrackingConsent.NOT_GRANTED)
   ```
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- Roku -->
{% if equals($platform, "roku") %}
1. Set `sessionSampleRate` to `0` in your initialization call and deploy the change. This takes effect after the next channel launch.

   ```basic
   datadogroku_initialize({
       clientToken: "<CLIENT_TOKEN>",
       applicationId: "<APPLICATION_ID>",
       site: "<DATADOG_SITE>",
       env: "<ENV_NAME>",
       sessionSampleRate: 0,
       launchArgs: args
   })
   ```
{% /if %}
<!-- end Roku -->

<!-- Unity -->
{% if equals($platform, "unity") %}
1. In Unity, go to **Project Settings** and set **Session Sample Rate** to `0` in the Datadog configuration. This takes effect after the next app launch.

2. To stop collection immediately without waiting for a relaunch, call `SetTrackingConsent`. Any data already captured before this call is still sent to Datadog.

   ```csharp
   DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.NotGranted);
   ```
{% /if %}
<!-- end Unity -->

### Remove the SDK from your application

<!-- Browser -->
{% if equals($platform, "browser") %}
1. Remove the SDK based on your installation method:

   {% tabs %}

   {% tab label="CDN async" %}
   Remove the `<script>` block from the `<head>` of your HTML pages.
   {% /tab %}

   {% tab label="CDN sync" %}
   Remove the `<script>` block from the `<head>` of your HTML pages.
   {% /tab %}

   {% tab label="npm" %}
   Remove the SDK initialization code and uninstall the package:

   ```shell
   npm uninstall @datadog/browser-rum
   ```
   {% /tab %}

   {% /tabs %}

2. Deploy the change. No RUM data is sent after the next page load.
{% /if %}
<!-- end Browser -->

<!-- iOS -->
{% if equals($platform, "ios") %}
1. Remove the Datadog pod from your Podfile, then run:

   ```shell
   pod install
   ```

2. Remove any remaining Datadog initialization and import statements from your code.
3. Deploy the change. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.
{% /if %}
<!-- end iOS -->

<!-- Android -->
{% if equals($platform, "android") %}
1. Remove the Datadog dependency from your `build.gradle` file, then sync your project.
2. Remove any remaining Datadog initialization and import statements from your code.
3. Deploy the change. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.
{% /if %}
<!-- end Android -->

<!-- Flutter -->
{% if equals($platform, "flutter") %}
1. Remove the Datadog packages from your `pubspec.yaml` file, then run:

   ```shell
   flutter pub get
   ```

2. Remove any remaining Datadog initialization and import statements from your code.
3. Deploy the change. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.
{% /if %}
<!-- end Flutter -->

<!-- React Native -->
{% if equals($platform, "react_native") %}
1. Remove the SDK initialization code and uninstall the package:

   ```shell
   npm uninstall @datadog/mobile-react-native
   ```

2. Remove any remaining Datadog import statements from your code.
3. Deploy the change. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.
{% /if %}
<!-- end React Native -->

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
1. Remove the Datadog dependency from your `build.gradle` file, then sync your project.
2. Remove any remaining Datadog initialization and import statements from your code.
3. Deploy the change. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.
{% /if %}
<!-- end Kotlin Multiplatform -->

<!-- Roku -->
{% if equals($platform, "roku") %}
1. Remove the Datadog initialization call from your channel code.
2. Remove the SDK based on your installation method:

   **ROPM**: Uninstall the package:

   ```shell
   ropm uninstall datadog-roku
   ```

   **Manual installation**: Delete the Datadog SDK files from your project.
{% /if %}
<!-- end Roku -->

<!-- Unity -->
{% if equals($platform, "unity") %}
1. Remove the Datadog SDK package from your project using the Unity Package Manager.
2. Remove any remaining Datadog initialization code from your scripts.
3. Deploy the change. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.
{% /if %}
<!-- end Unity -->

## Delete the RUM application from Datadog

After disabling the SDK, delete the RUM application from Datadog to remove its configuration, dashboards, and monitors.

1. In Datadog, go to [**Digital Experience** > **RUM Applications**][1].
1. Find your application and click the settings icon.
1. Select **Delete application**.
1. Confirm the deletion.

{% alert level="warning" %}
Deleting an application is permanent. All associated data, monitors, and dashboards for that application are removed from Datadog.
{% /alert %}

[1]: https://app.datadoghq.com/rum/list
[2]: https://app.datadoghq.com/organization-settings/client-tokens
