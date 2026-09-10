---
title: Manage Data Collection
description: "Clear unsent data, stop data collection, control event buildup, and set the remote log threshold for the RUM SDKs."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
further_reading:
- link: "/real_user_monitoring/setup/data_collected/"
  tag: "Documentation"
  text: "Data collected by the RUM SDKs"
---

Select your SDK for platform-specific instructions on managing data collection.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/manage_data_collection/unavailable.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/manage_data_collection/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/manage_data_collection/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/manage_data_collection/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/manage_data_collection/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/manage_data_collection/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/manage_data_collection/unavailable.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/manage_data_collection/unavailable.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/manage_data_collection/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/manage_data_collection/unity.mdoc.md" /%}
{% /if %}
