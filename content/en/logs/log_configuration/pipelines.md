---
title: Pipelines
description: "Parse, enrich, and manage your logs with Datadog pipelines and processors"
aliases:
  - /logs/processing/pipelines/
further_reading:
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: Blog
  text: How we use Datadog to get comprehensive, fine-grained visibility into our email delivery system
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Consult the full list of available Processors"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without Limits*"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/troubleshooting/"
  tag: "Documentation"
  text: "Logs troubleshooting"
- link: "https://learn.datadoghq.com/courses/going-deeper-with-logs-processing"
  tag: "Learning Center"
  text: "Going Deeper with Logs Processing"
- link: "https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/"
  tag: "Blog"
  text: "Monitor Cloudflare Zero Trust with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
  tag: "Blog"
  text: "Monitor 1Password with Datadog Cloud SIEM"
- link: "https://www.datadoghq.com/blog/ocsf-common-data-model/"
  tag: "Blog"
  text: "Normalize your data with the OCSF Common Data Model in Datadog Cloud SIEM"
---

## Overview

<div class="alert alert-info">The pipelines and processors outlined in this documentation are specific to cloud-based logging environments. To aggregate, process, and route on-premises logs, see <a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Observability Pipelines</a>.</div>

Datadog automatically [parses][1] JSON-formatted logs. You can then add value to all your logs (raw and JSON) by sending them through a processing pipeline. Pipelines take logs from a wide variety of formats and translate them into a common format in Datadog. Implementing a log pipelines and processing strategy is beneficial as it introduces an [attribute naming convention][2] for your organization.

With pipelines, logs are parsed and enriched by chaining them sequentially through [processors][3]. This extracts meaningful information or attributes from semi-structured text to reuse as [facets][4]. Each log that comes through the pipelines is tested against every pipeline filter. If it matches a filter, then all the processors are applied sequentially before moving to the next pipeline.

Pipelines and processors can be applied to any type of log. You don't need to change logging configuration or deploy changes to any server-side processing rules. Everything can be configured within the [pipeline configuration page][5].

**Note**: For optimal use of the Log Management solution, Datadog recommends using at most **20 processors per pipeline** and **10 parsing rules** within a [Grok processor][6]. Datadog reserves the right to disable underperforming parsing rules, processors, or pipelines that might impact Datadog's service performance.

## Pipeline permissions

Pipelines use [Granular Access Control][7] to manage who can edit pipeline and processor configurations. This means permissions can be assigned to **roles**, **individual users**, and **teams**, ensuring precise control over pipeline resources. Pipelines without any restrictions are considered unrestricted, meaning any user with the `logs_write_pipelines` permission can modify the pipeline and its processors.

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Pipeline permissions configuration in Datadog" style="width:80%;" >}}

For each pipeline, administrators can choose the following edit scopes:

- **Editor**: Only specified users, teams, or roles can edit pipeline configuration and processors.
- **Processor Editor**: Only the processors (including nested pipelines) can be edited by specified users, teams, or roles. No one can modify the pipeline attributes, such as its filter query or its order in the global pipeline list.

<div class="alert alert-warning">Granting a user access to a pipeline's restriction list does not automatically grant  the <code>logs_write_pipelines</code> or <code>logs_write_processors</code> permissions. Administrators must grant those permissions separately.</div>

You can manage these permissions programmatically through [**API**][14] and **Terraform**.

## Preprocessing

Preprocessing of JSON logs occurs before logs enter pipeline processing. Preprocessing runs a series of operations based on reserved attributes, such as `timestamp`, `status`, `host`, `service`, and `message`. If you have different attribute names in your JSON logs, use preprocessing to map your log attribute names to those in the reserved attribute list.

JSON log preprocessing comes with a default configuration that works for standard log forwarders. To edit this configuration to adapt custom or specific log forwarding approaches:

1. Navigate to [Pipelines][8] in Datadog and select [Preprocessing for JSON logs][9].

    **Note:** Preprocessing JSON logs is the only way to define one of your log attributes as `host` for your logs.

2. Change the default mapping based on reserved attribute:

{{< tabs >}}
{{% tab "Source" %}}

#### Source attribute

If a JSON formatted log file includes the `ddsource` attribute, Datadog interprets its value as the log's source. To use the same source names Datadog uses, see the [Integration Pipeline Library][1].

**Note**: Logs coming from a containerized environment require the use of an [environment variable][2] to override the default source and service values.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Host attribute

Using the Datadog Agent or the RFC5424 format automatically sets the host value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's host:

* `host`
* `hostname`
* `syslog.hostname`

**Note**: In Kubernetes, if a JSON log ingested by the Datadog Agent contains a `host`, `hostname`, or `syslog.hostname` key attribute, that value overrides the default Agent hostname for that log. As a result, the log does not inherit the expected host-level tags, which are set at the host level, of the correct host. In this case, Datadog recommends clearing these attributes to ensure your logs can be attributed to the correct hosts.

{{% /tab %}}
{{% tab "Date" %}}

#### Date attribute

By default Datadog generates a timestamp and appends it in a date attribute when logs are received. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the log's official date:

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Specify alternate attributes to use as the source of a log's date by setting a [log date remapper processor][1].

**Note**: Datadog rejects a log entry if its official date is older than 18 hours in the past.

<div class="alert alert-danger">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /logs/log_configuration/processors/#log-date-remapper
{{% /tab %}}
{{% tab "Message" %}}

#### Message attribute

By default, Datadog ingests the message value as the body of the log entry. That value is then highlighted and displayed in the [Log Explorer][1], where it is indexed for [full text search][2].

Specify alternate attributes to use as the source of a log's message by setting a [log message remapper processor][3].


[1]: /logs/explorer/
[2]: /logs/explorer/#filters-logs
[3]: /logs/log_configuration/processors/#log-message-remapper
{{% /tab %}}
{{% tab "Status" %}}

#### Status attribute

Each log entry may specify a status level which is made available for faceted search within Datadog. However, if a JSON formatted log file includes one of the following attributes, Datadog interprets its value as the log's official status:

* `status`
* `severity`
* `level`
* `syslog.severity`

Specify alternate attributes to use as the source of a log's status by setting a [log status remapper processor][1].

[1]: /logs/log_configuration/processors/#log-status-remapper
{{% /tab %}}
{{% tab "Service" %}}

#### Service attribute

Using the Datadog Agent or the RFC5424 format automatically sets the service value on your logs. However, if a JSON formatted log file includes the following attribute, Datadog interprets its value as the log's service:

* `service`
* `syslog.appname`

Specify alternate attributes to use as the source of a log's service by setting a [log service remapper processor][1].


[1]: /logs/log_configuration/processors/#service-remapper
{{% /tab %}}
{{% tab "Trace ID" %}}

#### Trace ID attribute

By default, [Datadog tracers can automatically inject trace and span IDs into your logs][1]. However, if a JSON formatted log includes the following attributes, Datadog interprets its value as the log's `trace_id`:

* `dd.trace_id`
* `contextMap.dd.trace_id`

Specify alternate attributes to use as the source of a log's trace ID by setting a [trace ID remapper processor][2].


[1]: /tracing/other_telemetry/connect_logs_and_traces/
[2]: /logs/log_configuration/processors/#trace-remapper
{{% /tab %}}

{{% tab "Span ID" %}}

#### Span ID attribute

By default, Datadog tracers can [automatically inject span IDs into your logs][1]. However, if a JSON formatted log includes the following attributes, Datadog interprets its value as the log's `span_id`:

* `dd.span_id`
* `contextMap.dd.span_id`

[1]: /tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## Create a pipeline

1. Navigate to [Pipelines][8] in Datadog.
2. Select **New Pipeline**.
3. Select a log from the live tail preview to apply a filter, or apply your own filter. Choose a filter from the dropdown menu or create your own filter query by selecting the **</>** icon. Filters let you limit what kinds of logs a pipeline applies to.

    **Note**: The pipeline filtering is applied before any of the pipeline's processors. For this reason, you cannot filter on an attribute that is extracted in the pipeline itself.

4. Name your pipeline.
5. (Optional) Add a description and tags to the pipeline to indicate its purpose and ownership. Pipeline tags do not affect logs, but can be used to filter and search within the [Pipelines page][8].
6. Press **Create**.

An example of a log transformed by a pipeline:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="An example of a log transformed by a pipeline" style="width:50%;">}}

### Integration pipelines

<div class="alert alert-info">
See the <a href="/integrations/#cat-log-collection">list of supported integrations</a>.
</div>

Integration processing pipelines are available for certain sources when they are set up to collect logs. These pipelines are **read-only** and parse out your logs in ways appropriate for the particular source. For integration logs, an integration pipeline is automatically installed that takes care of parsing your logs and adds the corresponding facet in your Log Explorer.

To view an integration pipeline, navigate to the [Pipelines][8] page. To edit an integration pipeline, clone it and then edit the clone:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Cloning pipeline" style="width:80%;">}}

See the ELB logs example below:

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB log post processing" style="width:70%;">}}

**Note**: Integration pipelines cannot be deleted, only disabled.

### Integration pipeline library

To see the full list of integration pipelines that Datadog offers, browse the [integration pipeline library][10]. The pipeline library shows how Datadog processes different log formats by default.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Integration pipeline library" video=true style="width:80%;">}}

To use an integration pipeline, Datadog recommends installing the integration by configuring the corresponding log `source`. After Datadog receives the first log with this source, the installation is automatically triggered and the integration pipeline is added to the processing pipelines list. To configure the log source, see the corresponding [integration documentation][11].

It's also possible to copy an integration pipeline using the clone button.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Cloning pipeline from Library" video=true style="width:80%;">}}

## Add a processor or nested pipeline

1. Navigate to [Pipelines][8] in Datadog.
2. Hover over a pipeline and click the arrow next to it to expand processors and nested pipelines.
3. Select **Add Processor** or **Add Nested Pipeline**.

### Processors

A processor executes within a pipeline to complete a data-structuring action. See the [Processors docs][3] to learn how to add and configure a processor by processor type, within the app or with the API.

See [Parsing dates][12] to learn about custom date and time formats and the required `timezone` parameter for non-UTC timestamps.

### Nested pipelines

Nested pipelines are pipelines within a pipeline. Use nested pipelines to split the processing into two steps. For example, first use a high-level filter such as team and then a second level of filtering based on the integration, service, or any other tag or attribute.

A pipeline can contain nested pipelines and processors whereas a nested pipeline can only contain processors.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Nested pipelines" style="width:80%;">}}

Move a pipeline into another pipeline to make it into a nested pipeline:

1. Hover over the pipeline you want to move, and click on the **Move to** icon.
1. Select the pipeline you want to move the original pipeline into. **Note**: Pipelines containing nested pipelines can only be moved to another top level position. They cannot be moved into another pipeline.
1. Click **Move**.

## Manage your pipelines

Identify when the last change to a pipeline or processor was made and which user made the change using the modification information on the pipeline. Filter your pipelines using this modification information, as well as other faceted properties such as whether the pipeline is enabled or read-only.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="How to manage your pipelines with faceted search, pipeline modificiation information, and the reordering modal" style="width:50%;">}}

Reorder pipelines precisely with the `Move to` option in the sliding option panel. Scroll and click on the exact position to move the selected pipeline to using the `Move to` modal. Pipelines cannot be moved into other read-only pipelines. Pipelines containing nested pipelines can only be moved to other top level positions. They cannot be moved into other pipelines.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="How to reorder your pipelines precisely using the move to modal" style="width:50%;">}}

## Estimated usage metrics

Estimated usage metrics are displayed for each pipeline. This shows the volume and count of logs being ingested and modified by each pipeline. Every pipeline includes a link to the out-of-the-box [Logs Estimated Usage Dashboard][13]. This dashboard offers detailed charts of the pipeline's usage metrics.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="How to get a quick view of your pipelines' usage metrics" style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/log_configuration/parsing/
[2]: /logs/log_collection/?tab=host#attributes-and-tags
[3]: /logs/log_configuration/processors/
[4]: /logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /logs/log_configuration/processors/?tab=ui#grok-parser
[7]: /account_management/rbac/granular_access/
[8]: https://app.datadoghq.com/logs/pipelines
[9]: https://app.datadoghq.com/logs/pipelines/remapping
[10]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[11]: /integrations/#cat-log-collection
[12]: /logs/log_configuration/parsing/?tab=matchers#parsing-dates
[13]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[14]: /api/latest/restriction-policies/
