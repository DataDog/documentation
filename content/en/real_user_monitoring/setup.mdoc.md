---
title: Real User Monitoring Setup
description: Real User Monitoring Setup
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    label: "SDK"
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/app_performance'
      tag: Documentation
      text: How Mobile Session Replay Impacts App Performance
    - link: '/real_user_monitoring/session_replay/mobile/setup_and_configuration'
      tag: Documentation
      text: Setup and Configure Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/troubleshooting'
      tag: Documentation
      text: Troubleshoot Mobile Session Replay
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

## Overview

This guide walks you through setting up Real User Monitoring (RUM) for your application. RUM provides deep insight into your application's frontend performance and user experience across different platforms.

## Setup

{% if equals($platform, "browser") %}
  {% partial file="sdks/setup/browser_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="sdks/setup/android_setup.mdoc.md" /%}
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
