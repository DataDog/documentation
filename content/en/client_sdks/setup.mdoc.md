---
title: Client SDK Setup
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview
  
Follow the instructions below to install and configure the Datadog SDK for your platform.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/setup/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/setup/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/setup/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/setup/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}

The minimum supported version for the React Native SDK is React Native v0.65+. Compatibility with older versions is not guaranteed out-of-the-box.

{% tabs %}
{% tab label="React Native" %}

{% partial file="sdk/setup/react-native.mdoc.md" /%}

{% /tab %}
{% tab label="Expo" %}

{% partial file="sdk/setup/react-native-expo.mdoc.md" /%}

{% /tab %}
{% /tabs %}

{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/setup/kotlin-multiplatform.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/setup/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/setup/unity.mdoc.md" /%}
{% /if %}
