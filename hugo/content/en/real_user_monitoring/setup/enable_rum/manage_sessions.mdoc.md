---
title: Manage sessions
private: true
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

Add user information to your RUM sessions to follow the journey of a given user, know which users are the most impacted by errors, and monitor performance for your most important users. Select your SDK for platform-specific instructions.

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
