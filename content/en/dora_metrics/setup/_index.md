---
title: Set up DORA Metrics
aliases:
- /continuous_integration/dora_metrics/setup/
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## Overview

The four DORA Metrics are calculated based on two types of events which support different data sources.

[**Deployment events**][8]
: Indicate that a new deployment has occurred for a service in a specific environment. Deployment events are used to compute deployment frequency, change lead time, and change failure rate.

[**Incident events**][9]
: Indicate that a new failure has occurred for a service in a specific environment. Incident events are used to compute change failure rate and mean time to restore.

## Configure data sources

### Select a deployment data source

DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up the data source for your deployment events:

{{% collapse-content title="APM Deployment Tracking" level="h4" %}}

[APM Deployment Tracking][15] can be configured as a data source for deployments in DORA Metrics.

To ensure your service deployments tracked by APM contribute to DORA Metrics, the following requirements must be met:

- Your service has [metadata][16] defined in the Service Catalog.
- Your service has [unified service tagging][17] enabled. Deployments are identified using the `version` tag.

For more information about ensuring service deployments that are tracked by APM contribute to change lead time, see [Deployment Data Sources][18].

{{% /collapse-content %}} 

{{% collapse-content title="Deployment Event API or the datadog-ci CLI" level="h4" %}}
To send your own deployment events, use the [DORA Metrics API][21] or the [`datadog-ci dora deployment`][22] command.

The following attributes are required:
- `started_at`: The time the deployment started.
- `finished_at`: The time the deployment finished.
- `service`: The service that was deployed. If the provided service is registered in the [Service Catalog][23] with metadata set up (see [Adding Metadata][24]), the `team` of the service is automatically retrieved and associated with all metrics.

The `repository_url` and `commit_sha` attributes are also required for calculating the Change Lead Time metric. You can optionally specify the `env` attribute to filter your DORA metrics by environment on the [**DORA Metrics** page][25].

#### Example

{{< tabs >}}
{{% tab "API - cURL" %}}

See the [DORA Metrics API reference documentation][1] for the full spec and additional code samples.

For the following example, replace `<DD_SITE>` in the URL with {{< region-param key="dd_site" code="true" >}} and `${DD_API_KEY}` with your [Datadog API Key][2]:
```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod"
      }
    }
  }
EOF
```

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "datadog-ci CLI" %}}

The [`datadog-ci`][1] CLI tool provides a shortcut to send deployment events within your Continuous Integration environment.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} and set the `DD_API_KEY` environment variable to your [Datadog API Key][2]:
```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

The deployment finish time is automatically set to now if `--finished-at` is not provided.

If the deployment CI job is running on the exact same Git revision that is being deployed, `git-repository-url` and `git-commit-sha` can be omitted and are automatically inferred from the CI context.

The `--skip-git` option can be provided to disable sending the repository URL and commit SHA. When this option is added, the Change Lead Time metric becomes unavailable.

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}} 

<br>

### Select an incident data source

DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up a data source for your deployment events:

{{% collapse-content title="PagerDuty" level="h4" %}}
[PagerDuty][10] is an incident management platform that equips IT teams with immediate incident visibility, enabling proactive and effective responses to maintain operational stability and resilience.

To integrate your PagerDuty account with DORA Metrics: 

1. Navigate to **Integrations > Developer Tools** in PagerDuty and click **Generic Webhooks (v3)**. 

1. Click **+ New Webhook** and enter the following details:

   | Variable | Description |
   |---|---|
   | Webhook URL | Add `https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/`. |
   | Scope Type | Select **Account** to send incidents for all PagerDuty services in your account. Alternatively, you can send incidents for specific services or teams by selecting a different scope type. |
   | Description | A description helps distinguish the webhook. Add something like `Datadog DORA Metrics integration`. |
   | Event Subscription | Select the following events:<br>-`incident.acknowledged`<br>-`incident.annotated`<br>-`incident.custom_field_values.updated`<br>-`incident.delegated`<br>-`incident.escalated`<br>-`incident.priority_updated`<br>-`incident.reassigned`<br>-`incident.reopened`<br>-`incident.resolved`<br>-`incident.triggered`<br>-`incident.unacknowledged` |
   | Custom Headers | Click **Add custom header**, enter `DD-API-KEY` as the name, and input your [Datadog API key][11] as the value.<br>  <br>Optionally, you can add an environment to all of the PagerDuty incidents sent from the webhook by creating an additional custom header with the name `dd_env` and the desired environment as the value. |

1. To save the webhook, click **Add Webhook**.

The severity of the incident in the DORA Metrics product is based on the [incident priority][12] in PagerDuty.

**Note:** Upon webhook creation, a new secret is created and used to sign all the webhook payloads. That secret is not needed for the integration to work, as the authentication is performed using the API key instead.

{{% /collapse-content %}} 

{{% collapse-content title="Incident Event API" level="h4" %}}
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

#### Example

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
{{% /collapse-content %}} 

<br>

## Limitations

- When you first select a data source option (such as APM Deployment Tracking or PagerDuty), DORA Metrics begins populating data from that point forward. If you switch from source A to source B, then back to source A, the historical data from source A is only available from the time it was first selected. 
- Deployments or incidents of the same service cannot occur at the same second.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /dora_metrics/
[4]: /service_management/events/explorer/
[5]: /api/latest/metrics/#query-timeseries-points
[6]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[7]: /dora_metrics/data_collected/
[8]: /dora_metrics/deployments/
[9]: /dora_metrics/failures/
[10]: /integrations/pagerduty/
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://support.pagerduty.com/main/docs/incident-priority
[13]: /api/latest/dora-metrics/#send-an-incident-event-for-dora-metrics
[14]: https://app.datadoghq.com/ci/dora
[15]: /tracing/services/deployment_tracking
[16]: /service_catalog/adding_metadata 
[17]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[18]: /dora_metrics/deployments/?tab=apmdeploymenttracking#selecting-a-deployment-data-source
[20]: /dora_metrics/data_collected/#change-lead-time-metrics
[21]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[22]: https://www.npmjs.com/package/@datadog/datadog-ci
[23]: /tracing/service_catalog
[24]: /tracing/service_catalog/adding_metadata
[25]: https://app.datadoghq.com/ci/dora