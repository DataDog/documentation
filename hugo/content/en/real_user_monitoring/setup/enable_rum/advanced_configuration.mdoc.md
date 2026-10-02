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
aliases:
  - /real_user_monitoring/application_monitoring/android/advanced_configuration/
  - /real_user_monitoring/android/advanced_configuration/
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android
  - /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration
  - /real_user_monitoring/application_monitoring/browser/advanced_configuration/
  - /real_user_monitoring/installation/advanced_configuration/
  - /real_user_monitoring/browser/modifying_data_and_context/
  - /real_user_monitoring/browser/advanced_configuration/
  - /real_user_monitoring/application_monitoring/cpp/advanced_configuration/
  - /real_user_monitoring/application_monitoring/flutter/advanced_configuration/
  - /real_user_monitoring/flutter/advanced_configuration
  - /real_user_monitoring/otel
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
  - /real_user_monitoring/mobile_and_tv_monitoring/setup/otel
  - /real_user_monitoring/flutter/otel_support/
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
  - /real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration
  - /real_user_monitoring/application_monitoring/ios/advanced_configuration/
  - /real_user_monitoring/ios/advanced_configuration
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
  - /real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/kotlin-multiplatform
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/kotlin_multiplatform
  - /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/advanced_configuration
  - /real_user_monitoring/application_monitoring/maui/advanced_configuration/
  - /real_user_monitoring/application_monitoring/react_native/advanced_configuration/
  - /real_user_monitoring/react-native/advanced_configuration/
  - /real_user_monitoring/reactnative/advanced_configuration/
  - /real_user_monitoring/mobile_and_tv_monitoring/react_native/advanced_configuration
  - /real_user_monitoring/application_monitoring/roku/advanced_configuration/
  - /real_user_monitoring/roku/advanced_configuration/
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku
  - /real_user_monitoring/mobile_and_tv_monitoring/roku/advanced_configuration
  - /real_user_monitoring/application_monitoring/unity/advanced_configuration/
  - /real_user_monitoring/unity/advanced_configuration
  - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/unity
  - /real_user_monitoring/mobile_and_tv_monitoring/unity/advanced_configuration
  - /real_user_monitoring/unity/otel_support

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
