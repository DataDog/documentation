---
title: Expo Monitoring
description: Collect RUM and Error Tracking data from your Expo projects.
aliases:
- /real_user_monitoring/mobile_and_tv_monitoring/setup/expo
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/react_native/advanced_configuration
  tag: Documentation
  text: RUM React Native Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: Source code for dd-sdk-reactnative
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

## Start monitoring Expo applications

To get started with RUM for Expo and Expo Go, create an application and configure the React Native SDK and Expo SDK.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/expo/setup">}}<u>Setup</u>: Learn how to setup the <code>expo-datadog</code> package with the React Native SDK, track background events, and send data when devices are offline.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/error_tracking/">}}<u>Crash Reporting</u>: Add ANR detection and crash reporting, get deobfuscated stack traces, then test your implementation.{{< /nextlink >}}
{{< /whatsnext >}}