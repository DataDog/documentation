---
title: Enable GeoIP Enrichment
description: Learn how to control whether Datadog collects client IP and geolocation data for RUM events.
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
further_reading:
- link: '/data_security/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Data Security for Real User Monitoring'
---

## Overview

Datadog enriches RUM events with the client IP address and geolocation data (country, city, and region) derived from it. You can turn off this enrichment for an application in Datadog, and some SDKs also let you stop collecting user data at the source.

## Control collection in Datadog

After you've initialized your RUM application, you can choose whether to include IP or geolocation data from the {% ui %}User Data Collection{% /ui %} tab:

{% img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="You can include or exclude geolocation and client IP data from the RUM application management page" style="width:100%;" /%}

After you disable the collection of IP data, the change is applied immediately. Disabling it doesn't remove IP data from events collected before the change. It is performed on the backend, which means the SDK is still sending data, but IP addresses are omitted by Datadog backend pipelines and dropped at processing time.

## Control collection in the SDK

Select your SDK for platform-specific instructions.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/geoip/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/geoip/unavailable.mdoc.md" /%}
{% /if %}

## Next step

Continue to [Measure Health with Metrics](/real_user_monitoring/measure_health_with_metrics/).
