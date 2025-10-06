---
title: Troubleshooting Mobile Session Replay
description: How to troubleshoot Mobile Session Replay.
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options_v2
    label: "SDK"
aliases:
further_reading:
    - link: '/real_user_monitoring/session_replay/mobile'
      tag: Documentation
      text: Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/setup_and_configuration'
      tag: Documentation
      text: Setup and Configure Mobile Session Replay
    - link: '/real_user_monitoring/session_replay/mobile/app_performance'
      tag: Documentation
      text: How Mobile Session Replay Impacts App Performance
    - link: '/real_user_monitoring/session_replay/mobile/privacy_options'
      tag: Documentation
      text: Mobile Session Replay Privacy Options
    - link: '/real_user_monitoring/session_replay'
      tag: Documentation
      text: Session Replay
---

{% if equals($platform, "browser") %}
{% partial file="rum/session_replay/browser/troubleshooting.mdoc.md" /%}
{% else /%}
{% partial file="rum/session_replay/mobile/troubleshooting.mdoc.md" /%}
{% /if %}
