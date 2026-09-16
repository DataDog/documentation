---
title: Enrich RUM Data
description: "Add custom context and attributes to your RUM events to filter and group observed user behavior with code-level information."
further_reading:
- link: "/real_user_monitoring/setup/data_collected/"
  tag: "Documentation"
  text: "Data collected by the RUM SDKs"
---

## Overview

RUM SDKs automatically track attributes such as user activity, views, errors, and network requests. Add custom context and attributes to your RUM events to filter and group information about observed user behavior with code-level information, such as backend services or error logs.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/add_custom_context/" >}}
    <h3>Add custom context</h3>
    Add custom attributes to your RUM events.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/" >}}
    <h3>Modify or drop RUM events client-side</h3>
    Modify attributes on RUM events or drop them entirely before they're sent to Datadog.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/track_navigation_across_web_views/" >}}
    <h3>Track navigation across web views</h3>
    Track user journeys across web and native components in hybrid mobile applications.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/" >}}
    <h3>Track frontend-to-backend traces</h3>
    Connect frontend RUM data with backend APM traces for end-to-end visibility.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/collect_frontend_profiles/" >}}
    <h3>Collect frontend profiles</h3>
    Use profiling with RUM to understand application performance issues affecting user experience.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/track_feature_flags/" >}}
    <h3>Track feature flags</h3>
    Track feature flag usage and performance impact in RUM to maintain release safety.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/define_view_owners/" >}}
    <h3>Define view owners</h3>
    Use view-based ownership to filter event data for views your team owns.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/enrich_rum_data/enable_geoip_enrichment/" >}}
    <h3>Enable GeoIP enrichment</h3>
    Control whether Datadog collects client IP and geolocation data for RUM events.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
