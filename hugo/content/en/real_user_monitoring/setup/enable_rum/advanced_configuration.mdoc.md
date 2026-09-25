---
title: Advanced Configuration
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
    show_if:
      - platform: ["browser"]
  - trait_id: rum_browser_sdk_version
    option_group_id: rum_browser_sdk_version_for_advanced_config_options
    show_if:
      - platform: ["browser"]
---

## Overview

The following configuration options go beyond initial setup. Select your SDK for platform-specific advanced configuration.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/advanced_config/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/advanced_config/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/advanced_config/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/advanced_config/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/advanced_config/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/advanced_config/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/advanced_config/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/advanced_config/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/advanced_config/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/advanced_config/unity.mdoc.md" /%}
{% /if %}
