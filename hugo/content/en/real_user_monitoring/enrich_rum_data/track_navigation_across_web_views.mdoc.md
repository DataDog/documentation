---
title: Track Navigation Across Web Views
description: "Track user activity across web and native components in hybrid mobile applications with RUM Web View Tracking."
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
aliases:
- /real_user_monitoring/application_monitoring/web_view_tracking/
- /real_user_monitoring/application_monitoring/android/web_view_tracking/
- /real_user_monitoring/application_monitoring/flutter/web_view_tracking/
- /real_user_monitoring/application_monitoring/ios/web_view_tracking/
- /real_user_monitoring/application_monitoring/kotlin_multiplatform/web_view_tracking/
- /real_user_monitoring/application_monitoring/react_native/web_view_tracking/
- /real_user_monitoring/application_monitoring/roku/web_view_tracking/
- /real_user_monitoring/android/web_view_tracking
- /real_user_monitoring/ios/web_view_tracking
- /real_user_monitoring/flutter/web_view_tracking
- /real_user_monitoring/reactnative/web_view_tracking
- /real_user_monitoring/kotlin-multiplatform/web_view_tracking
- /real_user_monitoring/kotlin_multiplatform/web_view_tracking
- /real_user_monitoring/mobile_and_tv_monitoring/android/web_view_tracking
- /real_user_monitoring/mobile_and_tv_monitoring/flutter/web_view_tracking
- /real_user_monitoring/mobile_and_tv_monitoring/ios/web_view_tracking
- /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/web_view_tracking
- /real_user_monitoring/mobile_and_tv_monitoring/react_native/web_view_tracking
- /real_user_monitoring/mobile_and_tv_monitoring/roku/web_view_tracking
- /real_user_monitoring/mobile_and_tv_monitoring/unity/web_view_tracking
further_reading:
- link: "/real_user_monitoring/setup/data_collected/"
  tag: "Documentation"
  text: "Data collected by the RUM SDKs"
- link: "/session_replay/setup_and_configuration/#web-view-instrumentation"
  tag: "Documentation"
  text: "Web View Instrumentation"
- link: "/account_management/billing/rum/"
  tag: "Documentation"
  text: "RUM & Session Replay Billing"
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: "Source Code"
  text: "Source code for dd-sdk-android"
- link: "https://github.com/DataDog/dd-sdk-ios"
  tag: "Source Code"
  text: "Source code for dd-sdk-ios"
- link: "https://github.com/DataDog/dd-sdk-flutter"
  tag: "Source Code"
  text: "Source code for dd-sdk-flutter"
- link: "https://github.com/DataDog/dd-sdk-reactnative"
  tag: "Source Code"
  text: "Source code for dd-sdk-reactnative"
- link: "https://github.com/DataDog/dd-sdk-kotlin-multiplatform"
  tag: "Source Code"
  text: "Source code for dd-sdk-kotlin-multiplatform"
- link: "https://www.datadoghq.com/blog/hybrid-app-monitoring/"
  tag: "Blog"
  text: "Monitor your hybrid mobile applications with Datadog"
---

## Overview

Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications. You can track user activity across web and native components, scope the root cause of latency to web pages or native components, and support users that have difficulty loading web pages on mobile devices.

You can also record the entire session across both web and native views and watch it in a single Session Replay. See [Web View Instrumentation](/session_replay/setup_and_configuration/#web-view-instrumentation) to learn more.

{% if or(equals($platform, "android"), equals($platform, "ios"), equals($platform, "flutter"), equals($platform, "react_native"), equals($platform, "kotlin_multiplatform")) %}
## Prerequisites

Set up the RUM Browser SDK on the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring](/real_user_monitoring/setup/install/?platform=browser).
{% /if %}

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/track_navigation_across_web_views/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/track_navigation_across_web_views/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/track_navigation_across_web_views/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/track_navigation_across_web_views/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/track_navigation_across_web_views/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_navigation_across_web_views/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/track_navigation_across_web_views/unavailable.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/track_navigation_across_web_views/unavailable.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/track_navigation_across_web_views/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/track_navigation_across_web_views/unavailable.mdoc.md" /%}
{% /if %}

{% if or(equals($platform, "android"), equals($platform, "ios"), equals($platform, "flutter"), equals($platform, "react_native"), equals($platform, "kotlin_multiplatform")) %}
## Access your web views

Your web views appear in the [RUM Explorer](https://app.datadoghq.com/rum/explorer) with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform.

To access your web views:

1. Navigate to {% ui %}Digital Experiences{% /ui %} > {% ui %}Real User Monitoring{% /ui %} > {% ui %}(Sessions) Explorer{% /ui %}.
2. Create a query to filter on the following:
   - Your mobile application using either `application.id` or `application.name`
   - The web component using `service`
   - The platform using `source`

   **Note**: If you see unrecognized version numbers reporting in your mobile app, they might belong to the Browser SDK version. In that case, you can filter out the Browser platform session, for example, `source:browser`.
3. Click a session. A side panel with a list of events in the session appears. Any service with the web icon indicates a web view.

From here, you can hover over a session event and click {% ui %}Open View waterfall{% /ui %} to navigate from the session to a resource waterfall visualization in the view's {% ui %}Performance{% /ui %} tab.

## Billing implications

See [RUM & Session Replay Billing](/account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing) for details on how web views in mobile applications impact session recordings and billing.
{% /if %}

## Next step

Continue to [Track Frontend-to-Backend Traces](/real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
