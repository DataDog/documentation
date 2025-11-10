---
title: Session Replay Setup and Configuration
description: Setting up and configuring Session Replay for Browser and Mobile.
aliases:
- /product_analytics/session_replay/browser/setup_and_configuration
- /product_analytics/session_replay/mobile/setup_and_configuration
content_filters:
  - trait_id: platform
    option_group_id: rum_session_replay_sdk_options
    label: "SDK"
further_reading:
  - link: '/product_analytics/session_replay'
    tag: Documentation
    text: Session Replay
  - link: '/product_analytics/session_replay/mobile/app_performance'
    tag: Documentation
    text: How Mobile Session Replay Impacts App Performance
  - link: '/product_analytics/session_replay/mobile/privacy_options'
    tag: Documentation
    text: Mobile Session Replay Privacy Options
  - link: '/product_analytics/session_replay/browser/privacy_options'
    tag: Documentation
    text: Browser Session Replay Privacy Options
  - link: '/product_analytics/session_replay/mobile/troubleshooting'
    tag: Documentation
    text: Troubleshoot Mobile Session Replay
  - link: '/product_analytics/session_replay/browser/troubleshooting'
    tag: Documentation
    text: Troubleshoot Browser Session Replay
  - link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
    tag: 'Blog'
    text: 'Use Datadog Session Replay to view real-time user journeys'
---

## Setup

{% if equals($platform, "browser") %}
  {% partial file="product_analytics/setup/browser_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="product_analytics/setup/mobile_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  {% partial file="product_analytics/setup/mobile_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  {% partial file="product_analytics/setup/mobile_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "react_native") %}
  {% partial file="product_analytics/setup/mobile_setup.mdoc.md" /%}
{% /if %}

{% if equals($platform, "flutter") %}
  {% partial file="product_analytics/setup/mobile_setup.mdoc.md" /%}
{% /if %}
