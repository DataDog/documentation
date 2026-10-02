---
title: Modify or Drop RUM Events Client-Side
description: "Modify attributes on RUM events or drop them entirely before they're sent to Datadog, using event mappers or the beforeSend API."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
    show_if:
      - platform: ["browser"]
further_reading:
- link: "/real_user_monitoring/setup/data_collected/"
  tag: "Documentation"
  text: "Data collected by the RUM SDKs"
- link: "/real_user_monitoring/investigate_problems/explore_retained_data/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
---

## Overview

The RUM SDKs let you modify attributes of RUM events, or drop events entirely, before they're sent to Datadog. These changes happen client-side, in your application.

To control which sessions Datadog retains server-side, use [retention filters](/real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/). To redact sensitive data server-side, use [Sensitive Data Scanner](/security/sensitive_data_scanner/).

Select your SDK for platform-specific instructions on modifying or dropping RUM events before they're sent to Datadog.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/modify_or_drop_rum_events/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/modify_or_drop_rum_events/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/modify_or_drop_rum_events/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/modify_or_drop_rum_events/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/modify_or_drop_rum_events/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/modify_or_drop_rum_events/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/modify_or_drop_rum_events/unavailable.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/modify_or_drop_rum_events/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/modify_or_drop_rum_events/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/modify_or_drop_rum_events/unavailable.mdoc.md" /%}
{% /if %}
