---
title: Track UI latency
private: true
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
aliases:
  - /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/
  - /real_user_monitoring/browser/monitoring_page_performance/
  - /real_user_monitoring/application_monitoring/android/monitoring_app_performance/
  - /real_user_monitoring/mobile_and_tv_monitoring/android/monitoring_app_performance
  - /real_user_monitoring/application_monitoring/ios/monitoring_app_performance/
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/monitoring_app_performance
  - /real_user_monitoring/application_monitoring/mobile_vitals/
  - /real_user_monitoring/android/mobile_vitals
  - /real_user_monitoring/ios/mobile_vitals
  - /real_user_monitoring/flutter/mobile_vitals
  - /real_user_monitoring/reactnative/mobile_vitals
  - /real_user_monitoring/application_monitoring/android/mobile_vitals/
  - /real_user_monitoring/application_monitoring/ios/mobile_vitals/
  - /real_user_monitoring/application_monitoring/flutter/mobile_vitals/
  - /real_user_monitoring/application_monitoring/kotlin_multiplatform/mobile_vitals/
  - /real_user_monitoring/application_monitoring/react_native/mobile_vitals/
  - /real_user_monitoring/application_monitoring/unity/mobile_vitals/
  - /real_user_monitoring/application_monitoring/maui/mobile_vitals/
---

## Overview

RUM measures how fast your UI responds, from page and view loading to user interactions. Metrics include Core Web Vitals, view loading time, Time to Network Settled, and Interaction to Next View. Select your SDK for platform-specific setup instructions.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/track_ui_latency/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/track_ui_latency/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/track_ui_latency/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/track_ui_latency/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/track_ui_latency/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_ui_latency/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/track_ui_latency/unavailable.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
{% partial file="sdk/track_ui_latency/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/track_ui_latency/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/track_ui_latency/unity.mdoc.md" /%}
{% /if %}
