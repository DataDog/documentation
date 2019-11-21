---
title: Real User Monitoring
kind: documentation
description: "Visualize and analyze the performance of your front end applications as seen by your users."
beta: true
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

<div class="alert alert-warning">
This feature is in private beta. Signup for <a href="https://app.datadoghq.com/rum/2019signup">Datadog US Site</a> or <a href="https://app.datadoghq.eu/rum/2019signup">Datadog EU Site</a>  to enable Datadog-Real User Monitoring for your account.
</div>

## What is Real User Monitoring?

Datadog Real User Monitoring enables you to visualize and analyze the performance of your front end applications as seen by your users. It follows the latency from the frontend to the backend using advanced visualizations.

{{< img src="real_user_monitoring/real_user_monitering_overview.png" alt="Image Description" responsive="true" style="width:100%;">}}

### Supported browsers

The `datadog-rum` library supports all modern desktop and mobile browsers. Resources collection is limited on IE10 and IE11.

## Data collected

By default, all data collected is kept at full granularity for 15 days. The Datadog-Real User Monitoring script sends to Datadog three main types of events:

- Events about pages loading:
    - DOM interactive time
    - First paint time
    - First contentful paint time
- Events about resources loading
- [Custom events and measures][1].

The following contexts-following the [Datadog Standard Attributes][2] logic-are then attached automatically to all events sent to Datadog:

* [HTTP Requests][3]
* [URL details][4]
* [Geolocation][5]
* [User-Agent][6]
* `sessionId`	The ID corresponding to the session of your user.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/javascript/?tab=us#send-a-custom-log-entry
[2]: /logs/processing/attributes_naming_convention
[3]: /logs/processing/attributes_naming_convention/#http-requests
[4]: /logs/processing/attributes_naming_convention/#url-details-attributes
[5]: /logs/processing/attributes_naming_convention/#geolocation
[6]: /logs/processing/attributes_naming_convention/#user-agent-attributes
