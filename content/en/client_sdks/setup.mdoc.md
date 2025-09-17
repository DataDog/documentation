---
title: Client SDK Setup
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
aliases:
---

{% if equals($platform, "browser") %}
  {% partial file="sdks/setup/browser_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="sdks/setup/android_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  coming soon!
{% /if %}

{% if equals($platform, "flutter") %}
  coming soon!
{% /if %}

{% if equals($platform, "roku") %}
  coming soon!
{% /if %}

{% if equals($platform, "react_native") %}
  coming soon!
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  coming soon!
{% /if %}

{% if equals($platform, "unity") %}
  coming soon!
{% /if %}
