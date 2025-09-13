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
This page describes how to instrument your applications for both Real User Monitoring (RUM) or Error Tracking. You can follow the steps below to instrument your applications for RUM or Error Tracking if you have purchased it as a standalone product.

## Setup
To start sending RUM data from your application to Datadog:

{% if equals($platform, "browser") %}
  {% partial file="sdks/browser/setup.mdoc.md" /%}
{% /if %}
{% if equals($platform, "android") %}
  {% partial file="sdks/android/setup.mdoc.md" /%}
{% /if %}


