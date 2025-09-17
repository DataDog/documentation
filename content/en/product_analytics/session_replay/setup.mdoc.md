---
title: Session Replay Setup
description: Session Replay Setup
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
further_reading:
  - link: '/real_user_monitoring/session_replay/privacy_options'
    tag: Documentation
    text: Privacy Options
---

## Overview

Session Replay expands visibility into your  applications by visually replaying each user interaction, such as taps, swipes, and scrolls. It is available on Browser and native apps Android and iOS. Visually replaying user interactions on your applications makes it easier to reproduce crashes and errors, as well as understand the user journey for making UI improvements.

{% if equals($platform, "browser") %}
  {% partial file="product_analytics/setup/browser_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="product_analytics/setup/android_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  Coming soon!
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  Coming soon!
{% /if %}

{% if equals($platform, "react_native") %}
  Coming soon!
{% /if %}

{% if equals($platform, "flutter") %}
  Coming soon!
{% /if %}

{% if equals($platform, "roku") %}
  Coming soon!
{% /if %}

{% if equals($platform, "unity") %}
  Coming soon!
{% /if %}