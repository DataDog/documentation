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
- link: "/real_user_monitoring/investigate_problems/explore_retained_data/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/logs/log_configuration/attributes_naming_convention"
  tag: "Documentation"
  text: "Datadog standard attributes"
---

## Overview

Add custom attributes to your RUM events to filter, group, and analyze them by information that's specific to your application, such as a plan type, an experiment group, or a build flavor.

- **Global attributes** are added to every event the SDK collects after you set them.
- **View attributes** are added to the current view and the events that belong to it, where the SDK supports it.
- **Event-level attributes** are passed when you send a specific event. They're covered on each tracking page: [Track Navigation](/real_user_monitoring/setup/enable_rum/track_navigation/), [Track User Interactions](/real_user_monitoring/setup/enable_rum/track_user_interactions/), [Track Errors and Crashes](/real_user_monitoring/setup/enable_rum/track_errors/), and [Track Network Requests](/real_user_monitoring/setup/enable_rum/track_network_requests/).

To add user and account information, see [Track Users and Accounts](/real_user_monitoring/enrich_rum_data/track_user_ids/).

Select your SDK for platform-specific instructions.

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

## Next step

Continue to [Track Users and Accounts](/real_user_monitoring/enrich_rum_data/track_user_ids/).
