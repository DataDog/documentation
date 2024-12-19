---
title: React Native and CodePush Monitoring
description: Collect RUM data from your CodePush projects.
aliases:
- /real_user_monitoring/mobile_and_tv_monitoring/setup/codepush
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

## Start monitoring CodePush applications

To get started with RUM for CodePush, create an application and configure the React Native SDK and Datadog's CodePush package.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/codepush/setup">}}<u>Setup</u>: Learn how to setup the <code>mobile-react-native-code-push</code> package with the React Native SDK, track background events, and send data when devices are offline.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/error_tracking/">}}<u>Crash Reporting</u>: Add ANR detection and crash reporting, get deobfuscated stack traces, then test your implementation.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/advanced_configuration">}}<u>Advanced Configuration</u>: Enrich user sessions, manage events and data, track custom global attributes and widgets, review initialization parameters, modify or drop RUM events, and more.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/mobile_vitals">}}<u>Data Collected</u>: Review data that the React Native SDK collects.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/mobile_vitals">}}<u>Mobile Vitals</u>: View mobile vitals, which help compute insights about your mobile application.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/web_view_tracking/?tab=reactnative">}}<u>Web View Tracking</u>: Monitor web views and eliminate blind spots in your mobile applications.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/integrated_libraries">}}
  <u>Integrated Libraries</u>: Import integrated libraries for your React Native applications.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/troubleshooting">}}
  <u>Troubleshooting</u>: Common troubleshooting React Native SDK issues.{{< /nextlink >}}
{{< /whatsnext >}}