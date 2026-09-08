---
title: Additional plugins
description: "Integrate Datadog build plugins with your JavaScript bundler to automate source map uploads, action name deobfuscation, source code context, and other RUM tasks at build time."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
aliases:
- /real_user_monitoring/application_monitoring/browser/build_plugins/
- /real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation/
- /real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context/
- /real_user_monitoring/application_monitoring/browser/build_plugins/source_maps/
further_reading:
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
- link: '/real_user_monitoring/application_monitoring/browser/setup/client'
  tag: 'Documentation'
  text: 'RUM Browser Client-Side Setup'
- link: '/real_user_monitoring/application_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Tracking User Actions'
- link: '/data_security/real_user_monitoring'
  tag: 'Documentation'
  text: 'RUM Data Security'
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Error Tracking'
- link: '/real_user_monitoring/guide/upload-javascript-source-maps'
  tag: 'Documentation'
  text: 'Upload JavaScript Source Maps'
- link: '/real_user_monitoring/guide/debug-symbols'
  tag: 'Documentation'
  text: 'Debug Symbols'
---

## Overview

Datadog build plugins integrate with your JavaScript bundler to automate common RUM tasks during your build process. Select your SDK to see if build plugins are available.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/additional_plugins/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/additional_plugins/unavailable.mdoc.md" /%}
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
