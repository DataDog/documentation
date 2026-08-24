---
title: Data Collected
description: "Understand the event types, attributes, and telemetry data collected by the RUM SDKs, including sessions, views, actions, resources, and errors."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
aliases:
  - /real_user_monitoring/data_collected/
  - /real_user_monitoring/data_collected/view/
  - /real_user_monitoring/data_collected/resource/
  - /real_user_monitoring/data_collected/long_task/
  - /real_user_monitoring/data_collected/error/
  - /real_user_monitoring/data_collected/user_action/
  - /real_user_monitoring/browser/data_collected/
  - /real_user_monitoring/application_monitoring/browser/data_collected/
  - /real_user_monitoring/android/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/data_collected/android
  - /real_user_monitoring/mobile_and_tv_monitoring/android/data_collected
  - /real_user_monitoring/application_monitoring/android/data_collected/
  - /real_user_monitoring/flutter/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
  - /real_user_monitoring/mobile_and_tv_monitoring/flutter/data_collected
  - /real_user_monitoring/application_monitoring/flutter/data_collected/
  - /real_user_monitoring/ios/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/data_collected/ios/
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/data_collected/
  - /real_user_monitoring/application_monitoring/ios/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios
  - /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/supported_versions
  - /real_user_monitoring/application_monitoring/ios/supported_versions/
  - /real_user_monitoring/kotlin-multiplatform/data_collected/
  - /real_user_monitoring/kotlin_multiplatform/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/data_collected/kotlin-multiplatform/
  - /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/kotlin-multiplatform/data_collected/
  - /real_user_monitoring/application_monitoring/kotlin_multiplatform/data_collected/
  - /real_user_monitoring/reactnative/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/data_collected/reactnative/
  - /real_user_monitoring/mobile_and_tv_monitoring/react_native/data_collected/
  - /real_user_monitoring/application_monitoring/react_native/data_collected/
  - /real_user_monitoring/roku/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/data_collected/roku
  - /real_user_monitoring/mobile_and_tv_monitoring/roku/data_collected
  - /real_user_monitoring/application_monitoring/roku/data_collected/
  - /real_user_monitoring/unity/data_collected/
  - /real_user_monitoring/mobile_and_tv_monitoring/data_collected/unity
  - /real_user_monitoring/mobile_and_tv_monitoring/unity/data_collected
  - /real_user_monitoring/application_monitoring/unity/data_collected/
  - /real_user_monitoring/application_monitoring/cpp/data_collected/
  - /real_user_monitoring/application_monitoring/maui/data_collected/
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Introducing Datadog Real User Monitoring"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/explorer/visualize/"
  tag: "Documentation"
  text: "Apply visualizations on your events"
- link: "/logs/log_configuration/attributes_naming_convention"
  tag: "Documentation"
  text: "Datadog standard attributes"
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: "Source Code"
  text: "Source code for dd-sdk-android"
- link: "https://github.com/DataDog/dd-sdk-ios"
  tag: "Source Code"
  text: "Source code for dd-sdk-ios"
- link: "https://github.com/DataDog/dd-sdk-flutter"
  tag: "Source Code"
  text: "Source code for dd-sdk-flutter"
- link: "https://github.com/DataDog/dd-sdk-reactnative"
  tag: "Source Code"
  text: "Source code for dd-sdk-reactnative"
- link: "https://github.com/DataDog/dd-sdk-kotlin-multiplatform"
  tag: "Source Code"
  text: "Source code for dd-sdk-kotlin-multiplatform"
- link: "https://github.com/DataDog/dd-sdk-cpp"
  tag: "Source Code"
  text: "Source code for dd-sdk-cpp"
- link: "https://github.com/DataDog/dd-sdk-roku"
  tag: "Source Code"
  text: "Source code for dd-sdk-roku"
- link: "https://github.com/DataDog/dd-sdk-unity"
  tag: "Source Code"
  text: "Source code for dd-sdk-unity"
- link: "https://github.com/DataDog/dd-sdk-maui"
  tag: "Source Code"
  text: "Source code for dd-sdk-maui"
- link: "/real_user_monitoring/guide/monitor-hybrid-react-native-applications"
  tag: "Documentation"
  text: "Monitor hybrid React Native applications"
---

Select your SDK for platform-specific data collection details.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/data_collected/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/data_collected/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/data_collected/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/data_collected/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/data_collected/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/data_collected/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/data_collected/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/data_collected/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/data_collected/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/data_collected/unity.mdoc.md" /%}
{% /if %}
