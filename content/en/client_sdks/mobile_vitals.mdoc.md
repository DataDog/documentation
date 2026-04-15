---
title: Mobile Vitals
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_mobile_platform_options
    label: "SDK"
---

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/mobile_vitals/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/mobile_vitals/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/mobile_vitals/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/mobile_vitals/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/mobile_vitals/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/mobile_vitals/unity.mdoc.md" /%}
{% /if %}
