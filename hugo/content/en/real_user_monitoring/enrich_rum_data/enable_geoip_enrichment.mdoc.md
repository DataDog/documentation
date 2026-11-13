---
title: Enable GeoIP Enrichment
description: Learn how to control whether Datadog enriches RUM events with client IP and geolocation data.
further_reading:
- link: '/data_security/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Data Security for Real User Monitoring'
- link: '/real_user_monitoring/guide/proxy-rum-data/'
  tag: 'Guide'
  text: 'Proxy Your Browser RUM Data'
---

## Overview

Datadog enriches RUM events with the client IP address and the geolocation data derived from it, such as country, city, region, ISP, and latitude and longitude. Datadog servers determine the IP address from incoming requests. The SDKs don't collect or send it, so you control this enrichment in Datadog rather than in the SDK.

## Turn off IP and geolocation enrichment

You can choose whether to include IP or geolocation data when you [create a RUM application][1], or later from the application's {% ui %}User Data Collection{% /ui %} tab:

{% img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="You can include or exclude geolocation and client IP data from the RUM application management page" style="width:100%;" /%}

Changes take effect within a few minutes. Events that Datadog already stored aren't rewritten, so they keep their IP and geolocation data.

To keep end-user devices from communicating with Datadog directly, you can also send RUM events through your own [proxy server][2].

## Next step

Continue to [Measure Health with Metrics](/real_user_monitoring/measure_health_with_metrics/).

[1]: /real_user_monitoring/setup/create_application/
[2]: /real_user_monitoring/guide/proxy-rum-data/
