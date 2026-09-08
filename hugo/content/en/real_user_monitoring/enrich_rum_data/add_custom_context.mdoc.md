---
title: Add Custom Context
description: "Add custom attributes and context to your RUM events across the Datadog RUM SDKs."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
    show_if:
      - platform: ["browser"]
further_reading:
- link: "/real_user_monitoring/setup/data_collected/"
  tag: "Documentation"
  text: "Data collected by the RUM SDKs"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/logs/log_configuration/attributes_naming_convention"
  tag: "Documentation"
  text: "Datadog standard attributes"
---

Select your SDK for platform-specific instructions on adding custom context to your RUM events.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/add_custom_context/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/add_custom_context/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/add_custom_context/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/add_custom_context/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/add_custom_context/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/add_custom_context/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/add_custom_context/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/add_custom_context/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/add_custom_context/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/add_custom_context/unity.mdoc.md" /%}
{% /if %}
