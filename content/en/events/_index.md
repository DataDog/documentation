---
title: Event Management
aliases:
- /guides/eventcorrelation/
- /guides/markdown/
- /service_management/events/
further_reading:
- link: "/api/latest/events/"
  tag: "Documentation"
  text: "Datadog Events API"
- link: "/events/guides/recommended_event_tags/"
  tag: "Documentation"
  text: "Best Practices for Tagging Events"
- link: "https://www.datadoghq.com/blog/identify-sensitive-data-leakage-in-apm-rum-with-sensitive-data-scanner/"
  tag: "Blog"
  text: "Identify and redact sensitive data in Events with Sensitive Data Scanner"
- link: "https://app.datadoghq.com/event/configuration/quick-start"
  tag: "App"
  text: "Quick Start Guide"
- link: "https://www.datadoghq.com/blog/datadog-event-management"
  tag: "Blog"
  text: "Aggregate, correlate, and act on alerts faster with AIOps-powered Event Management"
- link: "https://www.datadoghq.com/blog/datadog-service-management/"
  tag: "Blog"
  text: "Ensure high service availability with Datadog Service Management"
---

{{< img src="service_management/events/correlation/event_management.png" alt="what is event management" style="width:100%;" >}}

## Overview

Ingest, enrich and normalize, and correlate your events from any source into actionable insights. Datadog automatically creates events from various products including monitors, Watchdog, and Error Tracking. You can also track events generated from the Agent and installed integrations. Event Management can also ingest events from any source, including alert events from third parties, change requests, deployments, configuration changes.

More than 100 Datadog integrations support events collection, including [Kubernetes][1], [Docker][2], [Jenkins][3], [Chef][4], [Puppet][5], [Amazon ECS][6] or [Autoscaling][7], [Sentry][8], and [Nagios][9].

<div class="alert alert-tip">To open the Event Management page from Datadog's global search, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> and search for <code>event explorer</code>.</div>

**Update to Datadog monitor events `aggregation_key` starting March 1, 2025:** The Datadog monitor events `aggregation_key` is unique to each Monitor ID. Starting March 1st, this key will also include Monitor Group, making it unique per *Monitor ID and Monitor Group*. If you're using monitor events `aggregation_key` in dashboard queries or the Event API, you must migrate to use `@monitor.id`. Reach out to [support][10] if you have any questions.

## Components

{{< whatsnext desc="Event Management features:">}}
    {{< nextlink href="/events/ingest/" >}}<u>Ingest events</u> - Learn how to send events to Datadog{{< /nextlink >}}
     {{< nextlink href="/events/triage_inbox" >}}<u>Triage Inbox</u> - Triage, investigate, collaborate, and resolve incidents{{< /nextlink >}}
     {{< nextlink href="/events/pipelines_and_processors/">}}<u>Pipelines and Processors</u> - Enrich and Normalize your events{{< /nextlink >}}
    {{< nextlink href="/events/explorer/" >}}<u>Events Explorer</u> - View, search and send notifications from events coming into Datadog{{< /nextlink >}}
    {{< nextlink href="/events/guides/usage/" >}}<u>Using events</u> - Analyze, investigate, and monitor events {{< /nextlink >}}
    {{< nextlink href="/events/correlation/" >}}<u>Correlation</u> - reduce alert fatigue and the number of tickets/notifications you receive {{< /nextlink >}}

{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/#event-collection
[2]: /agent/docker/#events
[3]: /integrations/jenkins/#events
[4]: /integrations/chef/#report-handler
[5]: /integrations/puppet/#events
[6]: /integrations/amazon_ecs/#events
[7]: /integrations/amazon_auto_scaling/#events
[8]: /integrations/sentry/
[9]: /integrations/nagios/#events
[10]: /help/
