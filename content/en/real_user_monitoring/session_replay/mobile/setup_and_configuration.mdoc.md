---
title: Mobile Session Replay Setup and Configuration
description: Setting up and configuring Mobile Session Replay.
content_filters:
  - trait_id: platform
    option_group_id: rum_session_replay_sdk_options
    label: "SDK"
further_reading:
  - link: '/real_user_monitoring/session_replay/mobile'
    tag: Documentation
    text: Mobile Session Replay
  - link: '/real_user_monitoring/session_replay/mobile/app_performance'
    tag: Documentation
    text: How Mobile Session Replay Impacts App Performance
  - link: '/real_user_monitoring/session_replay/mobile/privacy_options'
    tag: Documentation
    text: Mobile Session Replay Privacy Options
  - link: '/real_user_monitoring/session_replay/mobile/troubleshooting'
    tag: Documentation
    text: Troubleshoot Mobile Session Replay
  - link: '/real_user_monitoring/session_replay'
    tag: Documentation
    text: Session Replay
  - link: '/real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking'
    tag: Documentation
    text: Web View Tracking
---

{% if equals($platform, "browser") %}
{% partial file="rum/session_replay/browser/setup.mdoc.md" /%}
{% else /%}
{% partial file="rum/session_replay/setup_and_configuration.mdoc.md" /%}
{% /if %}