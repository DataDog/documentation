---
title: Collect frontend profiles
description: "Use profiling with RUM to understand application performance issues affecting user experience."
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_profiling_options
    label: "SDK"
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/modern-frontend-monitoring/"
    tag: "Blog"
    text: "Start monitoring single-page applications"
  - link: "https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android"
    tag: "Documentation"
    text: "Start monitoring Android applications"
  - link: "https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios"
    tag: "Documentation"
    text: "Start monitoring iOS applications"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
---
## Overview

Datadog RUM supports profiling for browser, iOS, and Android applications. Use profiling data to identify performance bottlenecks, optimize slow code paths, and improve rendering performance at both the system and code level.

Select your SDK for platform-specific instructions on collecting frontend profiles with RUM.

{% if equals($platform, "browser") %}
{% partial file="sdk/collect_frontend_profiles/browser.mdoc.md" /%}
{% /if %}

{% if equals($platform, "android") %}
{% partial file="sdk/collect_frontend_profiles/android.mdoc.md" /%}
{% /if %}

{% if equals($platform, "ios") %}
{% partial file="sdk/collect_frontend_profiles/ios.mdoc.md" /%}
{% /if %}
