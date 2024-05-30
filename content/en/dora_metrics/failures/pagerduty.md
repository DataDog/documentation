---
title: Configuring PagerDuty for DORA Metrics
kind: documentation
description: Learn how to configure PagerDuty as a data source for DORA Metrics incidents.
is_beta: true
further_reading:
- link: "/dora_metrics/failures"
  tag: "Documentation"
  text: "See other incident data source options"
- link: "/dora_metrics/deployments"
  tag: "Documentation"
  text: "Learn about setting up deployments in DORA Metrics"
- link: "/service_management/events"
  tag: "Documentation"
  text: "Learn about Event Management"
- link: "/monitors/types/metric"
  tag: "Documentation"
  text: "Learn about Metric Monitors"
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## Overview

[PagerDuty][7] is an incident management platform that equips IT teams with immediate incident visibility, enabling proactive and effective responses to maintain operational stability and resilience.

[PagerDuty incidents][1] can be configured as a data source for failures in DORA Metrics.

## Setup

To integrate your PagerDuty account with DORA Metrics, navigate to **Integrations > Developer Tools** in PagerDuty and click **Generic Webhooks (v3)**. 

1. Click **+ New Webhook** and enter the following details:

   | Variable | Description |
   |---|---|
   | Webhook URL | Add `https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/`. |
   | Scope Type | Select **Account** to send incidents for all PagerDuty services in your account. Alternatively, you can send incidents for specific services or teams by selecting a different scope type. |
   | Description | A description helps distinguish the webhook. Add something like `Datadog DORA Metrics integration`. |
   | Event Subscription | Select the following events:<br>-`incident.acknowledged`<br>-`incident.annotated`<br>-`incident.custom_field_values.updated`<br>-`incident.delegated`<br>-`incident.escalated`<br>-`incident.priority_updated`<br>-`incident.reassigned`<br>-`incident.reopened`<br>-`incident.resolved`<br>-`incident.triggered`<br>-`incident.unacknowledged` |
   | Custom Headers | Click **Add custom header**, enter `DD-API-KEY` as the name, and input your [Datadog API key][2] as the value.<br>  <br>Optionally, you can add an environment to all of the PagerDuty incidents sent from the webhook by creating an additional custom header with the name `dd_env` and the desired environment as the value. |

1. To save the webhook, click **Add Webhook**.

The severity of the incident in the DORA Metrics product is based on the [incident priority][5] in PagerDuty.

**Note:** Upon webhook creation, a new secret is created and used to sign all the webhook payloads. That secret is not needed for the integration to work, as the authentication is performed using the API key instead.

### Mapping PagerDuty services to Datadog services

When an incident event is received for a specific [PagerDuty service][3], Datadog attempts to retrieve the related Datadog service and team from the [Service Catalog][4].

The matching algorithm works in the following scenarios:

1. If the incident service URL matches with the PagerDuty service URL configured for one or more services in the Service Catalog. In this scenario, the incident metrics and events are emitted with the Datadog team name. For more information on setting the PagerDuty service URL for a Datadog service, see [Use Integrations with Service Catalog][6].
2. If the PagerDuty service name of the incident matches a Datadog service name in the Service Catalog. In this scenario, the incident metrics and events are emitted with the Datadog service name and team retrieved from Service Catalog.
3. If the PagerDuty team name of the incident matches a Datadog team name in the Service Catalog. In this scenario, the incident metrics and events are emitted with the corresponding Datadog team name.
4. If the PagerDuty service name of the incident matches a Datadog team name in the Service Catalog. In this scenario, the incident metrics and events are emitted with the Datadog team name.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/incidents
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://support.pagerduty.com/docs/services-and-integrations
[4]: /service_catalog/
[5]: https://support.pagerduty.com/docs/incident-priority
[6]: /service_catalog/integrations/#pagerduty-integration
[7]: /integrations/pagerduty/