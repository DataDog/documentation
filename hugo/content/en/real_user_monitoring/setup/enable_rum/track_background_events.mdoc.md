---
title: Track Background Events
description: "Track events that occur while your application runs in the background, such as crashes and network requests."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
further_reading:
- link: '/real_user_monitoring/setup/enable_rum/manage_sessions/'
  tag: 'Documentation'
  text: 'Manage sessions'
- link: '/real_user_monitoring/setup/data_collected/'
  tag: 'Documentation'
  text: 'RUM data collected'
---

## Overview

Background events are events that occur while your application is in the background and no view is active, such as crashes and network requests. Enable background event tracking to collect these events in RUM.

Select your SDK for platform-specific instructions.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/track_background_events/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/track_background_events/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/track_background_events/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/track_background_events/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/track_background_events/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_background_events/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/track_background_events/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/track_background_events/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/track_background_events/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/track_background_events/unity.mdoc.md" /%}
{% /if %}
