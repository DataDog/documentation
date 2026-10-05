---
title: Additional Plugins and Integrations
description: "Extend the Datadog SDK with build plugins for JavaScript bundlers and integrations with third-party libraries."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
aliases:
- /real_user_monitoring/application_monitoring/browser/build_plugins/
- /real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation/
- /real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context/
- /real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/
- /real_user_monitoring/reference/integrated_libraries/
- /real_user_monitoring/application_monitoring/android/integrated_libraries/
- /real_user_monitoring/android/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/android
- /real_user_monitoring/mobile_and_tv_monitoring/android/integrated_libraries
- /real_user_monitoring/application_monitoring/flutter/integrated_libraries/
- /real_user_monitoring/flutter/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/flutter
- /real_user_monitoring/mobile_and_tv_monitoring/flutter/integrated_libraries
- /real_user_monitoring/application_monitoring/ios/integrated_libraries/
- /real_user_monitoring/ios/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/ios/
- /real_user_monitoring/mobile_and_tv_monitoring/ios/integrated_libraries/
- /real_user_monitoring/application_monitoring/kotlin_multiplatform/integrated_libraries/
- /real_user_monitoring/kotlin-multiplatform/integrated_libraries/
- /real_user_monitoring/kotlin_multiplatform/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/kotlin-multiplatform/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/integrated_libraries
- /real_user_monitoring/application_monitoring/react_native/integrated_libraries/
- /real_user_monitoring/reactnative/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/reactnative
- /real_user_monitoring/mobile_and_tv_monitoring/react_native/integrated_libraries
further_reading:
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
- link: '/real_user_monitoring/setup/install/?platform=browser'
  tag: 'Documentation'
  text: 'RUM Browser Client-Side Setup'
- link: '/real_user_monitoring/application_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Tracking User Actions'
- link: '/data_security/real_user_monitoring'
  tag: 'Documentation'
  text: 'RUM Data Security'
- link: '/real_user_monitoring/investigate_problems/triage_errors_and_crashes/'
  tag: 'Documentation'
  text: 'Error Tracking'
- link: '/real_user_monitoring/guide/upload-javascript-source-maps'
  tag: 'Documentation'
  text: 'Upload JavaScript Source Maps'
- link: '/real_user_monitoring/guide/debug-symbols'
  tag: 'Documentation'
  text: 'Debug Symbols'
- link: "https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection"
  tag: "Blog"
  text: "Get better RUM data with our custom React components"
---

## Overview

Extend the Datadog SDK with additional plugins and integrations:

- **Build plugins** (Browser): Integrate with your JavaScript bundler to automate common RUM tasks during your build process, such as source map uploads.
- **Integrated libraries** (mobile): Integrate the SDK with third-party libraries, such as networking and image-loading libraries, to collect more RUM data.

Select your SDK for platform-specific instructions.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/additional_plugins/browser.mdoc.md" /%}
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

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

## Next step

Continue to [Data Collected](/real_user_monitoring/setup/data_collected/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
