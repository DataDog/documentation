---
title: Session Replay Privacy Options
description: Session Replay Privacy Options
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
further_reading:
  - link: '/real_user_monitoring/session_replay/troubleshooting'
    tag: Documentation
    text: Troubleshooting
---

## Overview

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data. Data is stored on Datadog-managed cloud instances and encrypted at rest.

Default privacy options for Session Replay are designed to protect end user privacy and prevent sensitive organizational information from being collected.

By enabling Session Replay, you can automatically mask sensitive elements from being recorded through the RUM Browser SDK. When data is masked, that data is not collected in its original form by Datadog's SDKs and thus is not sent to the backend.

{% if equals($platform, "browser") %}
  {% partial file="product_analytics/privacy_options/browser_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "flutter") %}
  Coming soon!
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "react_native") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "unity") %}
  Coming soon!
{% /if %}
