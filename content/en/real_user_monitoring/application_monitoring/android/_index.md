---
title: Android and Android TV Monitoring
description: "Monitor Android and Android TV applications with RUM to visualize user journeys, track performance, and analyze real-time user experiences."
aliases:
  - /real_user_monitoring/mobile_and_tv_monitoring/android
further_reading:
- link: /real_user_monitoring/application_monitoring/android/advanced_configuration
  tag: Documentation
  text: RUM Android Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

The Datadog Android SDK supports Android 5.0+ (API level 21) and Android TV. It works for Android apps written using Java or Kotlin.

## Start monitoring Android applications

To get started with RUM for Android, create an application and configure the Android SDK.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/setup">}}<u>Setup</u>: Learn how to set up the Android SDK, track background events, and send data when devices are offline.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/error_tracking">}}<u>Crash Reporting</u>: Add ANR detection and crash reporting, get deobfuscated stack traces, then test your implementation.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/monitoring_app_performance">}}<u>Monitoring App Performance</u>: Monitor view timings to understand your app's performance from a user's perspective. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/advanced_configuration">}}<u>Advanced Configuration</u>: Enrich user sessions, manage events and data, track custom global attributes and widgets, review initialization parameters, modify or drop RUM events, and more.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/mobile_vitals">}}<u>Data Collected</u>: Review data that the Android SDK collects.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/mobile_vitals">}}<u>Mobile Vitals</u>: View mobile vitals, which help compute insights about your mobile application.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/web_view_tracking">}}<u>Web View Tracking</u>: Monitor web views and eliminate blind spots in your mobile applications.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/integrated_libraries">}}
  <u>Integrated Libraries</u>: Import integrated libraries for your Android and Android TV applications.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/troubleshooting">}}
  <u>Troubleshooting</u>: Common troubleshooting Android SDK issues.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/android/jetpack_compose_instrumentation">}}<u>Jetpack Compose Instrumentation</u>: Instrument Jetpack Compose manually or automatically using the Datadog Gradle Plugin. {{< /nextlink >}}
{{< nextlink href="/real_user_monitoring/application_monitoring/android/sdk_performance_impact">}}<u>SDK Performance Impact</u>: Learn about how the SDK impacts performance of your application. {{< /nextlink >}}
{{< /whatsnext >}}
