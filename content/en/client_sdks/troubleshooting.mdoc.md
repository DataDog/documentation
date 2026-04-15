---
title: Troubleshooting
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

Use the resources below to resolve common issues with the Datadog SDK for your platform. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/troubleshooting/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/troubleshooting/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/troubleshooting/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/troubleshooting/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/troubleshooting/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/troubleshooting/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- Roku: excluded for now — no troubleshooting content yet.
     Uses existing client_sdk_platform_options group (no new option group needed).
     Roku users will see only the Overview paragraph until content is added. -->

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/troubleshooting/unity.mdoc.md" /%}
{% /if %}

[1]: /help
