---
title: Client Error Tracking
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
aliases:
- /real_user_monitoring/error_tracking/browser_errors
- /error_tracking/standalone_frontend/browser
further_reading:
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: "Source Code"
  text: "datadog-ci Source code"
- link: "/real_user_monitoring/guide/upload-javascript-source-maps"
  tag: "Documentation"
  text: "Upload JavaScript source maps"
- link: "/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
---

{% if equals($platform, "browser") %}
  {% partial file="error_tracking/browser_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="error_tracking/android_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  {% partial file="error_tracking/ios-setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "flutter") %}
  {% partial file="error_tracking/flutter-setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "roku") %}
  {% partial file="error_tracking/roku-setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "react_native") %}
  {% partial file="error_tracking/react-native-setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  {% partial file="error_tracking/kotlin-multiplatform-setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "unity") %}
  {% partial file="error_tracking/unity-setup.mdoc.md" /%}
{% /if %}
