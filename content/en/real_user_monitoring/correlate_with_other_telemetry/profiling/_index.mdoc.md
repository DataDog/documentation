---
title: Correlate RUM and Profiling
description: "Use profiling with RUM to understand application performance issues affecting user experience."
content_filters:
  - trait_id: platform
    option_group_id: rum_sdk_platform_options_v3
    label: "Browser"
aliases:
  - /real_user_monitoring/correlate_with_other_telemetry/profiling/browser_profiling
  - /real_user_monitoring/correlate_with_other_telemetry/profiling/ios_profiling
  - /real_user_monitoring/correlate_with_other_telemetry/profiling/android_profiling
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

{% partial file="real_user_monitoring/correlate_with_other_telemetry/profiling.mdoc.md" /%}