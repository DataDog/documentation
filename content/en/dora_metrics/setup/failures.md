---
title: Set Up Failure Data for DORA Metrics
description: Learn how to send failure events for DORA Metrics.
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
- link: "/tracing/software_catalog"
  tag: "Documentation"
  text: "Learn about the Software Catalog"
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

## Overview

Failure events are used to compute [change failure rate](#calculating-change-failure-rate) and [time to restore](#calculating-time-to-restore).

## Selecting and configuring a failure data source

{{< tabs >}}
{{% tab "Datadog Incidents" %}}
DORA Metrics can automatically identify and track failures through [Datadog Incidents][201]. After incidents are declared, DORA uses them to measure change failure rate and time to restore.

**Note**: The time to restore is measured as the total duration an incident spends in the `active` state. For cases like `active` → `stable` → `active` → `stable`, it includes all `active` periods. The time to restore is shown only when an incident is in a `stable` or `resolved` state. If a `resolved` incident is reactivated, the metric is hidden until it's `resolved` again.


### Requirements

- **Incidents** is enabled as a **Failures** event data source in [DORA settings][202].

To avoid having unlabeled failures, Datadog strongly recommends adding the following attributes to incidents:
  - `Teams`
  - `Services`
  - `Envs`: The `Envs` attribute can be added in the [Incident Settings][203] if it doesn’t already exist.

If provided with incidents, the `Severity` tag is added to failure events.

**Recommended**: In the [Incident Settings][203], set attributes field `Prompted` to `At Resolution` to ensure you never forget to add these attributes to your incidents.

### Include historical incidents

You can retroactively include incidents from the past two years by selecting **Backfill Data** in the [DORA settings][202], which creates failures from those incidents. Backfilling data can take up to an hour to complete.

[201]: /incident_response/incident_management/
[202]: https://app.datadoghq.com/ci/settings/dora
[203]: https://app.datadoghq.com/incidents/settings?section=property-fields


{{% /tab %}}
{{% tab "PagerDuty" %}}
[PagerDuty][104] is an incident management platform that equips IT teams with immediate incident visibility, enabling proactive and effective responses to maintain operational stability and resilience.

To integrate your PagerDuty account with DORA Metrics:

1. Enable **PagerDuty** as a **Failures** event data source in [DORA settings][111].

1. Navigate to **Integrations > Developer Tools** in PagerDuty and click **Generic Webhooks (v3)**.

1. Click **+ New Webhook** and enter the following details:

     <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Webhook URL</td>
          <td>Add <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>Scope Type</td>
          <td>Select the scope of which incidents you want to send. You can send incidents for a specific <strong>Service</strong> or <strong>Team</strong>, or all PagerDuty services in your <strong>Account</strong>. Depending on your environment and access level, some scope types may not be available.</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>A description helps distinguish the webhook. Add something like <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>Event Subscription</td>
          <td>Select the following events:<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>Custom Headers</td>
          <td>Click <strong>Add custom header</strong>, enter <code>DD-API-KEY</code> as the name, and input your <a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">Datadog API key</a> as the value.<br><br>Optionally, you can add an environment to all of the PagerDuty incidents sent from the webhook by creating an additional custom header with the name <code>dd_env</code> and the desired environment as the value.</td>
        </tr>
      </tbody>
    </table>

1. To save the webhook, click **Add Webhook**.

The severity of the failure in the DORA Metrics product is based on the [incident priority][106] in PagerDuty.

**Note:** Upon webhook creation, a new secret is created and used to sign all the webhook payloads. That secret is not needed for the integration to work, as the authentication is performed using the API key instead.

### Mapping PagerDuty services to Datadog services

When an incident event is received for a specific [PagerDuty service][101], Datadog attempts to retrieve the related Datadog service and team from any triggering [Datadog monitors][107] and from the [Software Catalog][102].

The matching algorithm works in the following steps:

1. If the PagerDuty incident event was [triggered from a Datadog monitor][107]:
   - If the monitor is in [Multi Alert mode][109], the incident metrics and events are emitted with the `env`, `service`, and `team` from the alerted group.
   - If the monitor has [tags][110] for `env`, `service`, or `team`:
     - `env`: If the monitor has a single `env` tag, the incident metrics and events are emitted with the environment.
     - `service`: If the monitor has one or more `service` tags, the incident metrics and events are emitted with the provided services.
     - `team`: If the monitor has a single `team` tag, the incident metrics and events are emitted with the team.

2. If the service URL of the incident matches the PagerDuty service URL for any services in the Software Catalog:
   - If a single Datadog service matches, the incident metrics and events are emitted with the service and team.
   - If multiple Datadog services match, the incident metrics and events are emitted with the team.

   For more information about setting the PagerDuty service URL for a Datadog service, see [Use Integrations with Software Catalog][103].

3. If the PagerDuty service name of the incident matches a service name in the Software Catalog, the incident metrics and events are emitted with the service and team.
4. If the PagerDuty team name of the incident matches a team name in the Software Catalog, the incident metrics and events are emitted with the team.
5. If the PagerDuty service name of the incident matches a team name in the Software Catalog, the incident metrics and events are emitted with the team.
6. If there have been no matches up to this point, the incident metrics and events are emitted with the PagerDuty service and PagerDuty team provided in the incident.

<div class="alert alert-danger">
If an incident is resolved manually in PagerDuty instead of from a monitor notification, the incident resolution event does not contain monitor information and the first step of the matching algorithm is skipped.
</div>

[101]: https://support.pagerduty.com/docs/services-and-integrations
[102]: /software_catalog/
[103]: /software_catalog/integrations/#pagerduty-integration
[104]: /integrations/pagerduty/
[105]: https://app.datadoghq.com/organization-settings/api-keys
[106]: https://support.pagerduty.com/main/docs/incident-priority
[107]: /integrations/pagerduty/#troubleshooting
[109]: /monitors/configuration/#multi-alert
[110]: /monitors/manage/#monitor-tags
[111]: https://app.datadoghq.com/ci/settings/dora


{{% /tab %}}
{{% tab "API" %}}

To send your own failure events, use the [DORA Metrics API][13]. Failure events are used in order to calculate change failure rate and time to restore.

Include the `finished_at` attribute in a failure event to mark that the failure is resolved. You can send events at the start of the failure and after it has been resolved. Failure events are matched by the `env`, `service` and `started_at` attributes.

### Requirements

- **datadog-ci CLI / API** is enabled as a **Failures** event data source in [DORA settings][15].
- The following attributes are required:
  - `services` or `team` (at least one must be present)
  - `started_at`

You can optionally add the following attributes to the failure events:
- `finished_at` for *resolved failures*. ***Required for calculating time to restore***
- `id` for identifying failures. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `name` to describe the failure.
- `severity`
- `env` to filter your DORA metrics by environment on the [**DORA Metrics** page][14].
- `repository_url`
- `commit_sha`
- `version`
- `custom_tags`: Tags in the form `key:value` that can be used to filter events on the [**DORA Metrics** page][14].

See the [DORA Metrics API reference documentation][13] for the full spec and additional code samples.

### API (cURL) Example

For the following configuration, replace `<DD_SITE>` with {{< region-param key="dd_site" >}}:

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/failure" \
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
        "severity": "High",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

[13]: /api/latest/dora-metrics/#send-a-failure-event-for-dora-metrics
[14]: https://app.datadoghq.com/ci/dora
[15]: https://app.datadoghq.com/ci/settings/dora


{{% /tab %}}
{{< /tabs >}}

## Calculating change failure rate
Change failure rate requires both [deployment data][7] and [failure data](#selecting-and-configuring-a-failure-data-source).

Change failure rate is calculated as the percentage of failure events out of the total number of deployments. Datadog divides `Count of Failures` over `Count of Deployments` for the same services and/or teams associated to both a failure and a deployment event.

## Calculating time to restore
Time to restore is calculated as the duration distribution for *resolved failure* events.

DORA Metrics generates the `Time to Restore` metric by recording the start and end times of each failure event. It calculates the time to restore as the median of these `Time to Restore` data points over a selected time frame.

## Custom tags
If the services associated with the failure are registered in the [Software Catalog][1] with metadata set up (see [Adding Metadata][2]), the `languages` of the services and any `tags` are automatically retrieved and associated with the failure event.

[1]: /tracing/software_catalog
[2]: /tracing/software_catalog/adding_metadata

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/software_catalog
[4]: /tracing/software_catalog/setup
[5]: /tracing/software_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /dora_metrics/setup/deployments
