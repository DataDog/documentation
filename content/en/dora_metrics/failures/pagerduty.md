---
title: Configuring PagerDuty for DORA Metrics
kind: documentation
description: Learn how to configure PagerDuty as a data source for DORA Metrics incidents.
aliases:
- /continuous_integration/dora_metrics/setup/pagerduty
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "/continuous_integration/dora_metrics/setup/deployments"
  tag: "Documentation"
  text: "Learn about sending deployment events"
- link: "/service_management/events"
  tag: "Documentation"
  text: "Learn about Event Management"
- link: "/monitors/types/metric"
  tag: "Documentation"
  text: "Learn about Metric Monitors"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

PagerDuty is an incident management platform that equips IT teams with immediate incident visibility, enabling proactive and effective responses to maintain operational stability and resilience.
[PagerDuty incidents][1] can be configured as a data source for failures in DORA Metrics.

## Setup

To integrate your PagerDuty account with DORA Metrics, go to **Integrations > Developer Tools** and click on **Generic Webhooks (v3)**. Then, click **+ New Webhook** and input the following details:
   1. **Webhook URL**: <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>
   2. **Scope Type**: Select **Account** to send incidents for all PagerDuty services in your account. Alternatively, you can only send incidents for specific services/teams by selecting a different scope type.
   3. **Description**: A description to help identifying the webhook in the future, such as "Datadog DORA Metrics integration".
   4. **Event Subscription**:  Select the following events:
      - incident.acknowledged
      - incident.annotated
      - incident.custom_field_values.updated
      - incident.delegated
      - incident.escalated
      - incident.priority_updated
      - incident.reassigned
      - incident.reopened
      - incident.resolved
      - incident.triggered
      - incident.unacknowledged
  5. **Custom Headers**: Click on **Add custom header**, and input `DD-API-KEY` as the name and your [Datadog API Key][2] as the value.
     Optionally, you can add an environment to all the PagerDuty incidents sent from the webhook by creating an additional custom header with name `dd_env` and the desired environment as value.

Click on **Add Webhook** to save the new webhook.

The severity of the incident in the DORA Metrics product is based on the [incident priority][5] in Pagerduty.

<div class="alert alert-info"><strong>Note:</strong> Upon webhook creation, a new secret will be created and used to sign all the webhook payloads. That secret is not needed for the integration to work, as the authentication is performed via the API Key instead.</div>


### Mapping Pagerduty services to Datadog services

When an incident event is received for a specific [PagerDuty service][3], Datadog tries to retrieve the related Datadog service and team from [Service Catalog][4].
The matching algorithm works in the following cases:
1. If the incident service URL matches with the PagerDuty service URL configured for one or more services in Service Catalog. In this case, the incident metrics and events are emitted
   with the Datadog team name. For more information on how to specify the Pagerduty service URL for a Datadog service, see [this guide][6].
2. If the PagerDuty service of the incident has the same name of a Datadog service in Service Catalog. In this case, the incident metrics and events are emitted
   with the Datadog service name and team retrieved from Service Catalog.
3. If the PagerDuty team of the incident has the same name of a Datadog team in Service Catalog. In this case, the incident metrics and events are emitted
   with the Datadog team name.
4. If the PagerDuty service of the incident has the same name of a Datadog team in Service Catalog. In this case, the incident metrics and events are emitted
   with the Datadog team name.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/incidents
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://support.pagerduty.com/docs/services-and-integrations
[4]: https://docs.datadoghq.com/service_catalog/
[5]: https://support.pagerduty.com/docs/incident-priority
[6]: https://docs.datadoghq.com/service_catalog/integrations/#pagerduty-integration
