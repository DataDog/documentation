---
title: Integrated Libraries
private: true
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

The Datadog SDK supports integration with third-party libraries to extend its functionality.

<!-- Browser, Roku, Unity: no integrated libraries -->
{% if includes($platform, ["browser", "roku", "unity"]) %}
{% alert %}
Integrated libraries are not available for the selected SDK.
{% /alert %}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/integrated_libraries/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/integrated_libraries/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/integrated_libraries/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/integrated_libraries/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/integrated_libraries/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

