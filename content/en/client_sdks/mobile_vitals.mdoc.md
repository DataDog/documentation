---
title: Mobile Vitals
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_mobile_platform_options
    label: "SDK"
---

## Overview

Real User Monitoring offers Mobile Vitals, which includes a set of datapoints inspired by frameworks such as [Android Vitals][1] and [Apple's MetricKit][2], which can help compute insights about your mobile application's responsiveness, stability, and resource consumption. Mobile Vitals range from poor, moderate, to good.

You can view Mobile Vitals for your application by navigating to **Digital Experience > Performance Summary** and selecting your application.

{% img src="real_user_monitoring/android/android-mobile-vitals.png" alt="Mobile Vitals on the Performance Summary tab" style="width:90%;" /%}

To access the RUM mobile app performance dashboard, switch to the **Performance** tab, then click the **View Dashboard** link.

{% img src="real_user_monitoring/android/android-perf-dash-link.png" alt="Access the mobile performance dashboard from the Performance tab" style="width:90%;" /%}

Understand your application's overall health and performance with the line graphs displaying datapoints across various application versions. To filter on application version or see specific sessions and views, click on a graph.

{% img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="Event Timings and Mobile Vitals in the RUM Explorer" style="width:90%;" /%}

You can also select a view in the RUM Explorer and observe recommended benchmark ranges that directly correlate to your application's user experience in the session. Click on a metric such as **Refresh Rate Average** and click **Search Views With Poor Performance** to apply a filter in your search query and examine additional views.

## Telemetry

The following telemetry provide insight into your mobile application's performance.

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/mobile_vitals/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/mobile_vitals/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/mobile_vitals/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/mobile_vitals/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/mobile_vitals/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/mobile_vitals/unity.mdoc.md" /%}
{% /if %}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit
