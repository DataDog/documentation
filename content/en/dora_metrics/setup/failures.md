---
title: How to Set Up Incident Data for DORA Metrics
description: Learn how to send incident events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/incidents
- /dora_metrics/setup/incidents
- /dora_metrics/failures/incident_api
- /dora_metrics/failures/pagerduty
- /dora_metrics/failures/
is_beta: true
further_reading:
- link: "/continuous_integration/dora_metrics/setup/deployments"
  tag: "Documentation"
  text: "Learn about setting up deployment data in DORA Metrics"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## Overview

Failed deployments events, currently interpreted through incident events, are used to compute [change failure rate](#calculating-change-failure-rate) and [mean time to restore (MTTR)](#calculating-mean-time-to-restore). 

## Selecting and configuring an incident data source

{{< tabs >}}
{{% tab "PagerDuty" %}}
[PagerDuty][104] is an incident management platform that equips IT teams with immediate incident visibility, enabling proactive and effective responses to maintain operational stability and resilience.

To integrate your PagerDuty account with DORA Metrics: 

1. Navigate to **Integrations > Developer Tools** in PagerDuty and click **Generic Webhooks (v3)**. 

1. Click **+ New Webhook** and enter the following details:

   | Variable | Description |
   |---|---|
   | Webhook URL | Add `https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/`. |
   | Scope Type | Select **Account** to send incidents for all PagerDuty services in your account. Alternatively, you can send incidents for specific services or teams by selecting a different scope type. |
   | Description | A description helps distinguish the webhook. Add something like `Datadog DORA Metrics integration`. |
   | Event Subscription | Select the following events:<br>-`incident.acknowledged`<br>-`incident.annotated`<br>-`incident.custom_field_values.updated`<br>-`incident.delegated`<br>-`incident.escalated`<br>-`incident.priority_updated`<br>-`incident.reassigned`<br>-`incident.reopened`<br>-`incident.resolved`<br>-`incident.triggered`<br>-`incident.unacknowledged` |
   | Custom Headers | Click **Add custom header**, enter `DD-API-KEY` as the name, and input your [Datadog API key][105] as the value.<br>  <br>Optionally, you can add an environment to all of the PagerDuty incidents sent from the webhook by creating an additional custom header with the name `dd_env` and the desired environment as the value. |

1. To save the webhook, click **Add Webhook**.

The severity of the incident in the DORA Metrics product is based on the [incident priority][106] in PagerDuty.

**Note:** Upon webhook creation, a new secret is created and used to sign all the webhook payloads. That secret is not needed for the integration to work, as the authentication is performed using the API key instead.

### Mapping PagerDuty services to Datadog services

When an incident event is received for a specific [PagerDuty service][101], Datadog attempts to retrieve the related Datadog service and team from the [Service Catalog][102].

The matching algorithm works in the following scenarios:

1. If the incident service URL matches with the PagerDuty service URL configured for one or more services in the Service Catalog:
   
   - If the incident service URL matches a single Datadog service, the incident metrics and events are emitted with the Datadog service name and team retrieved from the Service Catalog.
   - If the incident service URL matches multiple Datadog services, the incident metrics and events are emitted with the Datadog team name.
   
   For more information about setting the PagerDuty service URL for a Datadog service, see [Use Integrations with Service Catalog][103].

2. If the PagerDuty service name of the incident matches a Datadog service name in the Service Catalog, the incident metrics and events are emitted with the Datadog service name and team retrieved from the Service Catalog.
3. If the PagerDuty team name of the incident matches a Datadog team name in the Service Catalog, the incident metrics and events are emitted with the corresponding Datadog team name.
4. If the PagerDuty service name of the incident matches a Datadog team name in the Service Catalog, the incident metrics and events are emitted with the Datadog team name.

[101]: https://support.pagerduty.com/docs/services-and-integrations
[102]: /service_catalog/
[103]: /service_catalog/integrations/#pagerduty-integration
[104]: /integrations/pagerduty/
[105]: https://app.datadoghq.com/organization-settings/api-keys
[106]: https://support.pagerduty.com/main/docs/incident-priority

{{% /tab %}}
{{% tab "API" %}}

To send your own incident events, use the [DORA Metrics API][13]. Incident events are used in order to compute change failure rate and mean time to restore.

Include the `finished_at` attribute in an incident event to mark that the incident is resolved. You can send events at the start of the incident and after incident resolution. Incident events are matched by the `env`, `service`, and `started_at` attributes.

The following attributes are required:

- `services` or `team` (at least one must be present)
- `started_at`

You can optionally add the following attributes to the incident events:

- `finished_at` for *resolved incidents*. This attribute is required for calculating the time to restore service.
- `id` for identifying incidents when they are created and resolved. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `name` to describe the incident.
- `severity`
- `env` to filter your DORA metrics by environment on the [**DORA Metrics** page][14].
- `repository_url`
- `commit_sha`

See the [DORA Metrics API reference documentation][13] for the full spec and additional code samples.

### API (cURL) Example

For the following configuration, replace `<DD_SITE>` with {{< region-param key="dd_site" >}}:

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/incident" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High"
      }
    }
  }
EOF
```

[13]: /api/latest/dora-metrics/#send-an-incident-event-for-dora-metrics
[14]: https://app.datadoghq.com/ci/dora

{{% /tab %}}
{{< /tabs >}}

## Calculating change failure rate 
Change failure rate requires both [deployment data][7] and [incident data](#selecting-an-incident-data-source).

Change failure rate is calculated as the percentage of incident events out of the total number of deployments. Datadog divides `dora.incidents.count` over `dora.deployments.count` for the same services and/or teams associated to both an failure and a deployment event. 

## Calculating time to restore 
Time to restore is calculated as the duration distribution for *resolved incident* events.

DORA Metrics generates the `dora.time_to_restore` metric by recording the start and end times of each incident event. It calculates the mean time to restore (MTTR) as the average of these `dora.time_to_restore` data points over a selected time frame. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/service_catalog
[4]: /tracing/service_catalog/setup
[5]: /tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /dora_metrics/setup/deployments
