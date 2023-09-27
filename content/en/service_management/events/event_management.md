---
title: Event Management
kind: documentation
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
---

{{< site-region region="us3,us5,gov" >}}
<div class="alert alert-warning">Event Management is not supported for this site.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSeYkh0jFy_wMCLGKZ5019H0DpFvq0fILvyJEt_gRyeGgvRymA/viewform" custom_class="sign-up-trigger" btn_hidden="false" header="Join the Beta!">}}
Join the Event Management beta to correlate Datadog and third party alerts, change events into actionable insights, centralize investigations, and manage critical issues faster as a team. Learn more <a href="https://www.datadoghq.com/blog/dash-2022-new-feature-roundup/#event-management">here</a>.
{{< /callout >}}

## Overview

Ingest, enrich & normalize, and correlate your events from any source into actionable insights. Datadog automatically creates events from monitors, Watchdog, Error Tracking and many others, as well as those generated from Agent and installed integrations. In addition, Event Management allows you to ingest events from any sources, including alert events from third parties, change requests, deployments, configuration changes. 

Today more than 100 Datadog integrations support events collection, including [Kubernetes][1], [Docker][2], [Jenkins][3], [Chef][4], [Puppet][5], [AWS ECS][6], [AWS Autoscaling][7], [Sentry][8], and [Nagios][9].

## Ingest events

<!-- Add some copy here -->

{{< whatsnext desc="Send your events to Datadog:">}}
    {{< nextlink href="https://app.datadoghq.com/integrations" >}}Integrations{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/agent/" >}}Custom Agent Check{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/email/" >}}Email{{< /nextlink >}}
    {{< nextlink href="/api/v1/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/events-from-sns-emails/" >}}Amazon SNS Emails{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/#configuration" >}}Amazon EventBridge API Destinations{{< /nextlink >}}
{{< /whatsnext >}}

## Explorer

{{< img src="service_management/events/events_explorer.png" alt="Events explorer display" >}}
Use the [Events Explorer][10] to aggregate and view events coming into Datadog. Utilize the following features to understand the changes taking place in your infrastructure:
- Searching
- Navigate-the-explorer 
- Customization
- Facets
- Attributes
- Notifications
- Analytics  
- Saved views 

## Using events
### Enrichment and normalization

A _processor_ runs data-structuring actions on events attributes when they are ingested. A _pipeline_ is composed of one or multiple processors executed sequentially. With event processing pipelines, you can:

- Normalize disparate sources of events by remapping attributes. For example, use the same reserved [service tags][11] everywhere.
- Enrich events with external data saved in a [Reference Table][12] (beta). For example, map a service name with your service directory to enrich events with team ownership information, links to dashboards, or links to documentation.

To add and configure event processing pipelines, see the [Enrich & Normalize][13] tab of Event Management. If you need further help, contact Datadog [support][14].

[Learn more about processing pipelines][15].

### Generate custom metrics

[Generate metrics][16] with 15-month retention from any event search query to create and monitor historical events and alerts.

{{< img src="service_management/events/generate-metrics.png" alt="Image of metrics with the events search query." >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/agent/kubernetes/#event-collection
[2]: https://docs.datadoghq.com/agent/docker/#events
[3]: https://docs.datadoghq.com/integrations/jenkins/#events
[4]: https://docs.datadoghq.com/integrations/chef/#report-handler
[5]: https://docs.datadoghq.com/integrations/puppet/#events
[6]: https://docs.datadoghq.com/integrations/amazon_ecs/#events
[7]: https://docs.datadoghq.com/integrations/amazon_auto_scaling/#events
[8]: https://docs.datadoghq.com/integrations/sentry/
[9]: https://docs.datadoghq.com/integrations/nagios/#events
[10]: https://docs.datadoghq.com/service_management/events/explorer/
[11]: /getting_started/tagging/unified_service_tagging/
[12]: /integrations/guide/reference-tables/
[13]: https://app.datadoghq.com/event/pipelines
[14]: /help/
[15]: /logs/log_configuration/processors/
[16]: /service_management/events/explorer/#event-analytics
