---
title: Track Errors and Crashes
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
aliases:
- /real_user_monitoring/error_tracking/browser/
- /real_user_monitoring/error_tracking/browser_errors
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/browser/
- /real_user_monitoring/error_tracking/mobile/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/
- /real_user_monitoring/error_tracking/android
- /real_user_monitoring/error_tracking/mobile/android/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/android/
- /real_user_monitoring/error_tracking/expo
- /real_user_monitoring/error_tracking/mobile/expo/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/expo/
- /real_user_monitoring/error_tracking/flutter
- /real_user_monitoring/error_tracking/mobile/flutter/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/flutter/
- /real_user_monitoring/error_tracking/ios
- /real_user_monitoring/error_tracking/mobile/ios/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/ios/
- /real_user_monitoring/error_tracking/kotlin-multiplatform
- /real_user_monitoring/error_tracking/kotlin_multiplatform
- /real_user_monitoring/error_tracking/mobile/kotlin-multiplatform/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/kotlin-multiplatform/
- /real_user_monitoring/error_tracking/maui
- /real_user_monitoring/error_tracking/mobile/maui/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/maui/
- /real_user_monitoring/error_tracking/reactnative
- /real_user_monitoring/error_tracking/mobile/reactnative/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/reactnative/
- /real_user_monitoring/error_tracking/roku
- /real_user_monitoring/error_tracking/mobile/roku/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/roku/
- /real_user_monitoring/error_tracking/unity
- /real_user_monitoring/error_tracking/mobile/unity/
- /real_user_monitoring/investigate_problems/triage_errors_and_crashes/mobile/unity/
---

## Overview

RUM automatically captures crashes, unhandled exceptions, and other errors. You can also report errors manually from your own error-handling code. Select your SDK for platform-specific setup instructions.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/track_errors/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/track_errors/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/track_errors/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/track_errors/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/track_errors/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_errors/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/track_errors/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/track_errors/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/track_errors/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/track_errors/unity.mdoc.md" /%}
{% /if %}
