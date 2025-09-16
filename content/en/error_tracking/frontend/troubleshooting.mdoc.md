---
title: Troubleshooting
description: Learn how to troubleshoot issues.
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
---

## Overview

If you experience unexpected behavior with client SDKs, use this guide to resolve issues quickly. If you continue to have trouble, contact [Datadog Support][1] for further assistance. Regularly update to the latest version of the SDK, as each release contains improvements and fixes.

{% if equals($platform, "browser") %}
  {% partial file="sdks/troubleshooting/browser-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="sdks/troubleshooting/android-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  {% partial file="sdks/troubleshooting/ios-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "flutter") %}
  {% partial file="sdks/troubleshooting/flutter-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  {% partial file="sdks/troubleshooting/kotlin-multiplatform-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "react_native") %}
  {% partial file="sdks/troubleshooting/react-native-troubleshooting.mdoc.md" /%}
{% /if %}

{% if equals($platform, "unity") %}
  {% partial file="sdks/troubleshooting/unity-troubleshooting.mdoc.md" /%}
{% /if %}
