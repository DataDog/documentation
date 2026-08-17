---
title: Track application startups
private: true
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

RUM measures how fast your mobile app becomes usable after launch. Time to initial display (TTID) is collected automatically, and time to full display (TTFD) is reported manually from your own code. Select your SDK for platform-specific setup instructions.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
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
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/track_app_startups/unavailable.mdoc.md" /%}
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
