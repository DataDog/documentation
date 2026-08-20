---
title: Create a RUM app
private: true
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

Create a RUM application in Datadog to generate the `applicationId` and `clientToken` that the Datadog SDK uses to associate collected data with your application. Select your SDK, then follow the steps below.

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/create_app/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/create_app/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/create_app/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/create_app/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% tabs %}
{% tab label="React Native" %}

{% partial file="sdk/create_app/react-native.mdoc.md" /%}

{% /tab %}
{% tab label="Expo" %}

{% partial file="sdk/create_app/react-native-expo.mdoc.md" /%}

{% /tab %}
{% /tabs %}
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/create_app/kotlin-multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->
{% if equals($platform, "cpp") %}
{% partial file="sdk/create_app/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->
{% if equals($platform, "maui") %}
{% partial file="sdk/create_app/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/create_app/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/create_app/unity.mdoc.md" /%}
{% /if %}

## Next steps

{% if equals($platform, "browser") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=browser) to start collecting RUM data.
{% /if %}
{% if equals($platform, "android") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=android) to start collecting RUM data.
{% /if %}
{% if equals($platform, "ios") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=ios) to start collecting RUM data.
{% /if %}
{% if equals($platform, "flutter") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=flutter) to start collecting RUM data.
{% /if %}
{% if equals($platform, "react_native") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=react_native) to start collecting RUM data.
{% /if %}
{% if equals($platform, "kotlin_multiplatform") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=kotlin_multiplatform) to start collecting RUM data.
{% /if %}
{% if equals($platform, "cpp") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=cpp) to start collecting RUM data.
{% /if %}
{% if equals($platform, "maui") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=maui) to start collecting RUM data.
{% /if %}
{% if equals($platform, "roku") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=roku) to start collecting RUM data.
{% /if %}
{% if equals($platform, "unity") %}
[Install the Datadog SDK](/real_user_monitoring/setup/install/?platform=unity) to start collecting RUM data.
{% /if %}
