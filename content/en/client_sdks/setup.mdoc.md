---
title: Client SDK Setup
content_filters:
  - trait_id: sdk
    option_group_id: sdk_platform_options
    label: "SDK"
---

## Overview
  
Follow the instructions below to install and configure the Datadog SDK for your platform.

## Setup

<!-- Browser -->
{% if equals($sdk, "browser") %}
{% partial file="sdks/setup/browser-setup.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($sdk, "android") %}
{% partial file="sdks/setup/android-setup.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($sdk, "ios") %}
{% partial file="sdks/setup/ios-setup.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($sdk, "react_native") %}
{% partial file="sdks/setup/react-native-setup.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($sdk, "flutter") %}
{% partial file="sdks/setup/flutter-setup.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($sdk, "kotlin_multiplatform") %}
{% partial file="sdks/setup/kotlin-multiplatform-setup.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($sdk, "roku") %}
{% partial file="sdks/setup/roku-setup.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($sdk, "unity") %}
{% partial file="sdks/setup/unity-setup.mdoc.md" /%}
{% /if %}