---
title: SDK Performance Impact
description: Learn about how the SDK impacts performance of your application.
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

Understand how the Datadog SDK affects your application's performance, and use the tools available to monitor and improve it.

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/sdk_performance_impact/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/sdk_performance_impact/ios.mdoc.md" /%}
{% /if %}

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/sdk_performance_impact/browser.mdoc.md" /%}
{% /if %}

<!-- Flutter, React Native, Kotlin Multiplatform, C / C++, Roku, Unity, .NET MAUI: no dedicated performance impact content -->
{% if includes($platform, ["flutter", "react_native", "kotlin_multiplatform", "cpp", "roku", "unity", "maui"]) %}
{% alert %}
SDK performance impact benchmarks are not available for the selected SDK.
{% /alert %}
{% /if %}
