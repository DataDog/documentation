---
title: Session Replay Privacy Options
description: Configure privacy options for Session Replay.
aliases:
- /product_analytics/session_replay/browser/privacy_options
- /product_analytics/session_replay/mobile/privacy_options
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
  - link: '/product_analytics/session_replay/setup_and_configuration'
    tag: Documentation
    text: Setup and Configure Session Replay
  - link: '/product_analytics/session_replay/mobile/troubleshooting'
    tag: Documentation
    text: Troubleshoot Mobile Session Replay
  - link: '/product_analytics/session_replay/browser/troubleshooting'
    tag: Documentation
    text: Troubleshoot Browser Session Replay
  - link: "https://www.datadoghq.com/blog/default-privacy-session-replay/"
    tag: "Blog"
    text: "Obfuscate user data with Session Replay default privacy settings"
---

## Overview

Session Replay provides privacy controls to ensure organizations of any scale do not expose sensitive or personal data. Data is stored on Datadog-managed cloud instances and encrypted at rest.

Default privacy options for Session Replay protect end user privacy and prevent sensitive organizational information from being collected.

{% if equals($platform, "browser") %}
  {% partial file="product_analytics/privacy_options/browser_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "kotlin_multiplatform") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "react_native") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

{% if equals($platform, "flutter") %}
  {% partial file="product_analytics/privacy_options/mobile_privacy_options.mdoc.md" /%}
{% /if %}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
