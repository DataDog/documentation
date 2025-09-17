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
  {% partial file="error_tracking/setup/browser_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="error_tracking/setup/android_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  Coming soon!
{% /if %}

{% if equals($platform, "flutter") %}
  Coming soon!
{% /if %}

{% if equals($platform, "roku") %}
  Coming soon!
{% /if %}

{% if equals($platform, "react_native") %}
  Coming soon!
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  Coming soon!
{% /if %}

{% if equals($platform, "unity") %}
  Coming soon!
{% /if %}
