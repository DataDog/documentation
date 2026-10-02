---
title: Manage Sessions
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

Configure how the SDK samples RUM sessions and how to retrieve the current session ID.

The session sample rate is a client-side, head-based control: sessions that aren't sampled are never sent to Datadog. Datadog recommends keeping the session sample rate at 100% and using [retention filters](/real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/) to control the volume of sessions that Datadog retains. With a 100% sample rate, [out-of-the-box metrics](/real_user_monitoring/measure_health_with_metrics/out_of_the_box_metrics/) are computed over all of your sessions.

Select your SDK for platform-specific instructions.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/manage_sessions/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/manage_sessions/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/manage_sessions/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/manage_sessions/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/manage_sessions/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/manage_sessions/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/manage_sessions/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
{% partial file="sdk/manage_sessions/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/manage_sessions/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/manage_sessions/unity.mdoc.md" /%}
{% /if %}

## Next step

Continue to [Manage Data Collection](/real_user_monitoring/setup/enable_rum/manage_data_collection/).
