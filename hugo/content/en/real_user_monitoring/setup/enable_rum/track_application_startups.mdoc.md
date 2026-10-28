---
title: Track Application Startups
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---
This page has instructions for each SDK. Choose your SDK in the SDK menu above.

## Overview

RUM measures how fast your mobile app becomes usable after launch. Time to initial display (TTID) is collected automatically, and time to full display (TTFD) is reported manually from your own code. With RUM without Limits, TTID and TTFD each get their own [out-of-the-box metrics](/real_user_monitoring/measure_health_with_metrics/out_of_the_box_metrics/), computed over all ingested sessions regardless of retention.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/track_app_startups/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/track_app_startups/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/track_app_startups/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/track_app_startups/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_app_startups/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/track_app_startups/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
{% /if %}

## Next step

Continue to [Track UI Latency](/real_user_monitoring/setup/enable_rum/track_ui_latency/).
