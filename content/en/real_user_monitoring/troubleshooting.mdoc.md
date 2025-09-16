---
title: Troubleshooting
description: Learn how to troubleshoot issues with RUM monitoring.
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
further_reading:
- link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
  tag: 'Blog'
  text: 'Real User Monitoring'
- link: '/integrations/content_security_policy_logs/'
  tag: 'Documentation'
  text: 'Content Security Policy'
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## Overview

If you experience unexpected behavior with Datadog RUM, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance. Regularly update to the latest version of the SDK, as each release contains improvements and fixes.

{% if equals($platform, "browser") %}
  {% partial file="rum/browser-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="rum/android-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  {% partial file="rum/ios-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "flutter") %}
  {% partial file="rum/flutter-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  {% partial file="rum/kotlin-multiplatform-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "react_native") %}
  {% partial file="rum/react-native-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "unity") %}
  {% partial file="rum/unity-troubleshooting.mdoc.md" /%}
{% /if %}
