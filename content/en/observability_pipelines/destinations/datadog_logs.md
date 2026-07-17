---
title: Datadog Logs Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Datadog Logs destination to send logs to Datadog Log Management. You can also use [AWS PrivateLink](#aws-privatelink) to send logs from Observability Pipelines to Datadog.

## Setup

Configure the Datadog Logs destination when you [set up a pipeline][4]. You can set up a pipeline in the [UI][1], using the [API][5], or with [Terraform][6]. The steps in this section are configured in the UI.

<div class="alert alert-info">Before routing logs through Observability Pipelines, review any indexes, pipelines, or exclusion filters that use the <code>datadog.pipelines:false</code> tag. For logs from a Datadog Agent source, the Datadog Logs destination sets <code>source_type</code> to <code>datadog_agent</code> (<code>@source_type:datadog_agent</code> in log search). Datadog then evaluates those logs as <code>datadog_agent</code> logs when deciding whether to apply the <code>datadog.pipelines:false</code> tag. To change this behavior before logs are delivered, use the <a href="/observability_pipelines/processors/edit_fields/">Edit Fields processor</a> or <a href="/observability_pipelines/processors/custom_processor/">Custom Processor</a> to remove the <code>source_type</code> attribute from the logs.</div>

### Optional settings

After you select the Datadog Logs destination in the pipeline UI, you can configure these optional settings.

#### Route logs to multiple Datadog organizations

You can route logs to multiple Datadog organizations. After routing has been set up, you can [view metrics for the component or specific organizations](#view-metrics-for-the-component-or-specific-organizations) to which you are routing logs.

**Note**: You can route up to 100 Datadog organizations.

{{< img src="observability_pipelines/destinations/multi_dd_orgs.png" alt="The Datadog Logs destination showing us1 and us3 org" style="width:45%;" >}}

Click {{< ui >}}Route to Multiple Organizations{{< /ui >}} to set up routing to multiple Datadog organizations.

- If you haven't added any organizations yet, enter organization details as described in the [Add a Datadog organization](#add-an-organization) section.
- If you have already added organizations, you can:
  - Click on an organization in the table to edit or delete it.
  - Use the search bar to find a specific organization by name, filter query, or Datadog site, and then select the organization to edit or delete it.
  - [View metrics](#view-metrics-for-the-component-or-specific-organizations) for an organization.
  - Click {{< ui >}}Add organization{{< /ui >}} to route to another Datadog organization.

**Note**: If you don't set up routing to multiple Datadog organizations, logs are routed to the default Datadog organization. This is the organization tied to the API key when you install the Worker.

#### Add an organization

<div class="alert alert-warning">Logs that do not match any of the organization filters are dropped. The <a href="#component-level-metrics">component metric</a> <code>Data dropped (intentional)</code> shows the number logs that do not match the filters and are dropped.</div>

1. Enter a name for the organization.
	- **Note**: The name does not have to correspond to the actual name of the Datadog organization.
1. Define a filter query. Only logs that match the specified filter query are sent to the organization. See [Observability Pipelines Search Syntax][3] for more information on writing filter queries.
1. Select the Datadog organization's site.
1. Enter the identifier for the API key for that Datadog organization.
	- **Note**: Only enter the identifier for the API key. Do **not** enter the actual API key.
1. Click {{< ui >}}Save{{< /ui >}}.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers for this destination.

{{% /tab %}}

{{% tab "Environment Variables" %}}

<!-- vale Datadog.words_case_sensitive = NO -->
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}
<!-- vale Datadog.words_case_sensitive = YES -->

{{% /tab %}}
{{< /tabs >}}

## View metrics for the component or specific organizations

You can view metrics at the [component level](#component-level-metrics) or [organization level](#organization-level-metrics).

### Component-level metrics

To view metrics for the overall Datadog Logs destination:

1. Navigate to [Observability Pipelines][1].
1. Select your pipeline.
1. Click the cog on the {{< ui >}}Datadog Logs{{< /ui >}} destination and select {{< ui >}}View details{{< /ui >}}.

**Note**: The {{< ui >}}Data dropped (intentional){{< /ui >}} metric shows logs that didn't match any of the organizations' filters.

### Organization-level metrics

To view metrics for a specific Datadog organization:

1. Navigate to [Observability Pipelines][1].
1. Select your pipeline.
1. Click the {{< ui >}}Datadog Logs{{< /ui >}} destination so the organizations show up.
  {{< img src="observability_pipelines/destinations/multi_dd_orgs_highlighted.png" alt="The Datadog Logs destination showing us1 and us3 org highlighted" style="width:45%;" >}}
1. Click the organization you want to see metrics for.
1. Click {{< ui >}}View Health Metrics{{< /ui >}}.

Alternatively, click {{< ui >}}Review Configured Organizations{{< /ui >}} in the Datadog Logs destination. Then, click the graph icon in the {{< ui >}}Metrics{{< /ui >}} column for the organization.

## Metrics

For [component metrics][7] and [destination buffer metrics][8] emitted by all destinations, see the [Pipelines Usage Metrics][9] documentation.

### Datadog Logs metrics

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `datadog_logs` for Datadog Logs destination metrics.

`pipelines.datadog_logs_reserved_attribute_conflicts_total`
: **Description**: The number of conflicts encountered when relocating fields with semantic meaning to a Datadog [reserved attribute][10]. See the [example](#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute). Available in Worker version 2.18 and later.
: **Metric type**: count

#### Example of relocating fields with semantic meaning to a Datadog reserved attribute

The OpenTelemetry source decodes the following event, where `severity_text` semantically maps to the reserved `status` attribute:

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "attributes": {
    "status": 404,
    "http.method": "GET"
  },
  "timestamp": "..."
}
```

A processor then flattens the event, so that `status` and `severity_text` both exist at the top level:

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "status": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

Because the reserved `status` attribute already exists, the destination renames it to `_RESERVED_severity` to avoid it being overridden by the conflicting field:

```json
{
  "message": "GET /api/users returned 404",
  "status": "WARN",
  "_RESERVED_severity": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

{{< site-region region="us,ap1,ap2,uk1" >}}

## AWS PrivateLink

To send logs from Observability Pipelines to Datadog using AWS PrivateLink, see [Connect to Datadog over AWS PrivateLink][1] for setup instructions. The two endpoints you need to set up are:

- Logs (User HTTP intake): {{< region-param key=http_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a PrivateLink endpoint.

[1]: /agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

<!-- vale Datadog.headings = NO -->
## Azure Private Link
<!-- vale Datadog.headings = YES -->

To send logs from Observability Pipelines to Datadog using Azure Private Link, see [Connect to Datadog over Azure Private Link][1] for setup instructions. The two endpoints you need to set up are:

- Logs (User HTTP intake): `http-intake.logs.us3.datadoghq.com`
- Remote Configuration: `config.us3.datadoghq.com`

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a Private Link endpoint.

[1]: /agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/search_syntax/logs/
[4]: /observability_pipelines/configuration/set_up_pipelines/
[5]: /api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[10]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes