---
title: Event Management
kind: documentation
is_beta: true
aliases:
- /guides/eventcorrelation/
- /guides/markdown/
- /events
further_reading:
- link: "/api/latest/events/"
  tag: "Documentation"
  text: "Datadog Events API"
- link: "/service_management/events/guides/recommended_event_tags/"
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
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Event Management is not supported for this site.</div>
{{< /site-region >}}

{{< img src="service_management/events/correlation/event_management.png" alt="what is event management" style="width:100%;" >}}

## Overview

Ingest, enrich and normalize, and correlate (see public beta) your events from any source into actionable insights. Datadog automatically creates events from various products including monitors, Watchdog, and Error Tracking. You can also track events generated from the Agent and installed integrations. Event Management can also ingest events from any sources, including alert events from third parties, change requests, deployments, configuration changes.

More than 100 Datadog integrations support events collection, including [Kubernetes][1], [Docker][2], [Jenkins][3], [Chef][4], [Puppet][5], [Amazon ECS][6] or [Autoscaling][7], [Sentry][8], and [Nagios][9]. 

## Components

{{< whatsnext desc="Event Management features:">}}
    {{< nextlink href="/service_management/events/ingest/" >}}<u>Ingest events</u> - Learn how to send events to Datadog{{< /nextlink >}}
     {{< nextlink href="/service_management/events/pipelines_and_processors/">}}<u>Pipelines and Processors</u> - Enrich and Normalize your events{{< /nextlink >}}
    {{< nextlink href="/service_management/events/explorer/" >}}<u>Events Explorer</u> - View, search and send notifications from events coming into Datadog{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/usage/" >}}<u>Using events</u> - Analyze, investigate, and monitor events {{< /nextlink >}}
    {{< nextlink href="/service_management/events/correlation/" >}}<u>Correlation</u> - reduce alert fatigure and the number of tickets/notifictions you recieve {{< /nextlink >}}

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
