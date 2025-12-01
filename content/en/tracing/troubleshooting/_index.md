---
title: APM Troubleshooting
description: Comprehensive troubleshooting guide for APM issues including trace retention, service configuration, and connection errors.
aliases:
    - /tracing/faq/my-trace-agent-log-renders-empty-service-error/
    - /tracing/troubleshooting/faq_apm/
algolia:
  tags: ['apm issues', 'apm faq', 'tracing troubleshooting', 'apm common issues']
further_reading:
- link: "/tracing/troubleshooting/connection_errors"
  tag: "Documentation"
  text: "Connection Errors"
- link: "/tracing/troubleshooting/tracer_startup_logs/"
  tag: "Documentation"
  text: "Datadog tracer startup logs"
- link: "/tracing/troubleshooting/tracer_debug_logs/"
  tag: "Documentation"
  text: "Datadog tracer debug logs"
- link: "/tracing/troubleshooting/agent_apm_metrics/"
  tag: "Documentation"
  text: "APM metrics sent by the Datadog Agent"
- link: '/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter'
  tag: 'Documentation'
  text: 'Custom retention filter'
- link: '/tracing/trace_pipeline/ingestion_mechanisms/?tab=java'
  tag: 'Documentation'
  text: "Trace Ingestion Sampling"
- link: '/tracing/troubleshooting/#data-volume-guidelines'
  tag: 'Documentation'
  text: "Data volume guidelines"
- link: '/integrations/'
  tag: 'Documentation'
  text: "Datadog's full list of integrations"
- link: '/tracing/services/inferred_services'
  tag: 'Documentation'
  text: 'Inferred Service dependencies'
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Learning Center
  text: Troubleshooting APM Instrumentation on a Host
---

If you experience unexpected behavior while using Datadog APM, read the information on this page to help resolve the issue. Datadog recommends regularly updating to the latest version of the Datadog tracing libraries you use, as each release contains improvements and fixes. If you continue to experience issues, reach out to [Datadog support][1].

The following components are involved in sending APM data to Datadog:

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="APM Troubleshooting Pipeline">}}

For more information, see [Additional support](#additional-support).

## Trace retention

This section addresses issues related to trace data retention and filtering across Datadog.

{{% collapse-content title="There are more spans in the Trace Explorer than on the Monitors page" level="h4" %}}

If you haven't set up [custom retention filters][19], this is expected behavior. Here's why:

The [Trace Explorer][20] page allows you to search all ingested or indexed spans using any tag. Here, you can query any of your traces.

By default, after spans have been ingested, they are retained by the [Datadog intelligent filter][21]. Datadog also has other [retention filters][22] that are enabled by default to give you visibility over your services, endpoints, errors, and high-latency traces.

However, to use these traces in your monitors, you must set [custom retention filters][19].

Custom retention filters allow you to decide which spans are indexed and [retained][23] by creating, modifying, and disabling additional filters based on tags. You can also set a percentage of spans matching each filter to be retained. These indexed traces can then be used in your monitors.

| PRODUCT                                                | SPAN SOURCE                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| Monitors                                               | Spans from custom retention filters                              |
| Other products <br> <i> (Dashboard, Notebook etc.)</i> | Spans from custom retention filters + Datadog intelligent filter |

{{% /collapse-content %}}

## Trace metrics

This section covers troubleshooting discrepancies and inconsistencies with trace metrics.

{{% collapse-content title="Trace metrics and custom span-based metrics have different values" level="h4" %}}

Trace metrics and custom span-based metrics can have different values because they are calculated based on different datasets:

- [Trace metrics][24] are calculated based on 100% of the application's traffic, regardless of your [trace ingestion sampling][25] configuration. The trace metrics namespace follows this format: `trace.<SPAN_NAME>.<METRIC_SUFFIX>`.
- [Custom span-based metrics][26] are generated based on your ingested spans, which depend on your [trace ingestion sampling][25]. For example, if you are ingesting 50% of your traces, your custom span-based metrics are based on the 50% ingested spans.

To ensure that your trace metrics and custom span-based metrics have the same value, configure a 100% ingestion rate for your application or service.

<div class="alert alert-info">Metric names must follow the <a href="/metrics/custom_metrics/#naming-custom-metrics">metric naming convention</a>. Metric names that start with <code>trace.*</code> are not permitted and are not saved.</div>

{{% /collapse-content %}}

## Services

This section covers strategies to troubleshoot service-related issues.

{{% collapse-content title="One service is showing up as multiple services in Datadog" level="h4" %}}

This can happen when the service name is not consistent across all spans.

For example, you might have a single service such as `service:test` showing multiple services in the Datadog:
- `service:test`
- `service:test-mongodb`
- `service:test-postgresdb`

You can use [Inferred Service dependencies (Preview)][30]. Inferred external APIs use the default naming scheme `net.peer.name`. For example: `api.stripe.com`, `api.twilio.com`, and `us6.api.mailchimp.com`. Inferred databases use the default naming `scheme db.instance`.

Or, you can merge the service names using an environment variable such as `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING`, depending on the language. 

For more information, see [Configure the Datadog Tracing Library][27] or choose your language here:

{{< tabs >}}
{{% tab "Java" %}}

`dd.service.mapping`
: **Environment Variable**: `DD_SERVICE_MAPPING`<br>
**Default**: `null`<br>
**Example**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Dynamically rename services with configuration. Useful for making databases have distinct names across different services.

{{% /tab %}}

{{% tab "Python" %}}

`DD_SERVICE_MAPPING`
: Define service name mappings to allow renaming services in traces, for example: `postgres:postgresql,defaultdb:postgresql`. Available in version 0.47+.

{{% /tab %}}
{{% tab "Go" %}}

`DD_SERVICE_MAPPING`
: **Default**: `null` <br>
Dynamically rename services through configuration. Services can be separated by commas or spaces, for example: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

{{% /tab %}}
{{% tab "Node.js" %}}

`DD_SERVICE_MAPPING`
: **Configuration**: `serviceMapping`<br>
**Default**: N/A<br>
**Example**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Provide service names for each plugin. Accepts comma separated `plugin:service-name` pairs, with or without spaces.

{{% /tab %}}
{{% tab ".NET" %}}

`DD_TRACE_SERVICE_MAPPING`
: Rename services using configuration. Accepts a comma-separated list of key-value pairs of service name keys to rename, and the name to use instead, in the format `[from-key]:[to-name]`. <br>
**Example**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
The `from-key` value is specific to the integration type, and should exclude the application name prefix. For example, to rename `my-application-sql-server` to `main-db`, use `sql-server:main-db`. Added in version 1.23.0

{{% /tab %}}
{{% tab "PHP" %}}

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**Default**: `null`<br>
Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names][1000]).

[1000]: https://docs.datadoghq.com/tracing/trace_collection/library_config/php#integration-names

{{% /tab %}}
{{% tab "Ruby" %}}

Ruby does not support `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING`. See [Additional Ruby configuration][2000] for code options to change the service name.

[2000]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#advanced-configuration

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="There is an unexpected increase in ingested/indexed spans on the Plan and Usage page" level="h4" %}}

Spikes in data ingestion and indexing can be caused by various factors. To investigate the cause of an increase, use the [APM Traces Estimated Usage metrics][31]:

| USAGE TYPE | METRIC | DESCRIPTION |
| ------- | ------------ |------------ |
| APM Indexed Spans     | `datadog.estimated_usage.apm.indexed_spans` | Total number of spans indexed by tag-based retention filters.|
| APM Ingested Spans     | `datadog.estimated_usage.apm.ingested_spans`| Total number of ingested spans. |

The [APM Traces Usage dashboard][28] contains several widget groups displaying high-level KPIs and additional usage information.

{{% /collapse-content %}}

{{% collapse-content title="Missing error message and stack trace" level="h4" %}}

In some traces with an error status, the **Errors** tab shows `Missing error message and stack trace` rather than exception details. 

A span can show this message for two possible reasons:
- The span contains an unhandled exception.
- An HTTP response within the span returned an HTTP status code between 400 and 599.

When an exception is handled in a try/catch block, `error.message`, `error.type`, and `error.stack` span tags are not populated. To populate the detailed error span tags, use [Custom Instrumentation][18] code.

{{% /collapse-content %}}

## Data volume guidelines

If you encounter any of the following issues, you may be exceeding [Datadog's volume guidelines][29]:

- Your trace metrics are not reporting as you would expect in the Datadog platform.
- You are missing some of your resources that you expected to see in the Datadog platform.
- You are seeing traces from your service but are not able to find this service on the [Software Catalog page][32].

{{% collapse-content title="Data volume guidelines" level="h4" %}}

Your instrumented application can submit spans with timestamps up to 18 hours in the past and two hours in the future from the current time.

Datadog accepts the following combinations for a given 40-minute interval:

- 5000 unique `environments` and `service` combinations
- 100 unique `primary tag values` per additional primary tag
- 100 unique `operation names` per environment and service
- 1000 unique `resources` per environment, service, and operation name
- 30 unique `versions` per environment and service

If you need to accommodate larger volumes, contact [Datadog support][1] with your use case.

Datadog truncates the following strings if they exceed the indicated number of characters:

| Name            | Characters |
|-----------------|------------|
| [service][6]    |  100       |
| operation       |  100       |
| type            |  100       |
| [resource][7]   |  5000      |
| [tag key][8]    |  200       |
| [tag value][8]  |  25000     |

Additionally, the number of [span tags][8] present on any span cannot exceed 1024.

{{% /collapse-content %}}

{{% collapse-content title="The number of services exceeds what is specified in the data volume guidelines" level="h4" %}}

If the number of services exceeds what is specified in the [data volume guidelines](#data-volume-guidelines), try following these best practices for service naming conventions.

### Exclude environment tag values from service names

By default, the environment (`env`) is the primary tag for [Datadog APM][17].

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="Environment is the default primary tag" style="width:100%;" >}}

A service is typically deployed in multiple environments, such as `prod`, `staging`, and `dev`. Performance metrics like request counts, latency, and error rate differ across various environments. The environment dropdown in the Software Catalog allows you to scope the data in the **Performance** tab to a specific environment.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="Choose a specific environment using the `env` dropdown in the Software Catalog" style="width:100%;" >}}

One pattern that often leads to issues with an overwhelming number of services is including the environment value in service names. For example, you might have two unique services instead of one since they are operating in two separate environments: `prod-web-store` and `dev-web-store`.

Datadog recommends tuning your instrumentation by renaming your services.

Trace metrics are unsampled, which means your instrumented application shows all data instead of subsections of them. The [volume guidelines](#data-volume-guidelines) are also applied.

### Use additional primary tags instead of putting metric partitions or grouping variables into service names

You can use additional primary tags to group and aggregate your trace metrics. Use the dropdown to scope the performance data to a given cluster name or data center value.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="Use the dropdown menu to select a specific cluster or data center value" style="width:100%;" >}}

Including metric partitions or grouping variables in service names instead of applying additional primary tags unnecessarily inflates the number of unique services in an account and results in potential delay or data loss.

For example, instead of the service `web-store`, you might decide to name different instances of a service `web-store-us-1`, `web-store-eu-1`, and `web-store-eu-2` to see performance metrics for these partitions side-by-side. Datadog recommends implementing the **region value** (`us-1`, `eu-1`, `eu-2`) as a primary tag.

{{% /collapse-content %}}

## Connection errors

This section provides guidance on diagnosing and resolving connection and communication issues between your applications and the Datadog Agent

{{% collapse-content title="Your instrumented application isn't communicating with the Datadog Agent" level="h4" %}}

Read about how to find and fix these problems in [Connection Errors][4].

{{% /collapse-content %}}

## Resource usage

This section contains information on troubleshooting performance issues related to resource utilization.

{{% collapse-content title="Out of memory errors" level="h4" %}}

Read about detecting trace collection CPU usage and about calculating adequate resource limits for the Agent in [Agent Resource Usage][10].

{{% /collapse-content %}}

{{% collapse-content title="Rate limit or max event error messages" level="h4" %}}

Within Datadog Agent logs, if you see error messages about rate limits or max events per second, you can change these limits by following [these instructions][9]. If you have questions, before you change the limits, consult with the Datadog [support team][1].

{{% /collapse-content %}}

## Security

This section covers approaches for addressing security concerns in APM, including protecting sensitive data and managing traffic.

{{% collapse-content title="Modifying, discarding, or obfuscating spans" level="h4" %}}

There are several configuration options available to scrub sensitive data or discard traces corresponding to health checks or other unwanted traffic that can be configured within the Datadog Agent, or in some languages the tracing client. For details on the options available, see [Security and Agent Customization][11]. While this offers representative examples, if you require assistance applying these options to your environment, reach out to [Datadog Support][1].

{{% /collapse-content %}}

## Debugging and logging

This section explains how to use debug and startup logs to identify and resolve issues with your Datadog tracer.

{{% collapse-content title="Debug logs" level="h4" %}}

To capture full details on the Datadog tracer, enable debug mode on your tracer by using the `DD_TRACE_DEBUG` environment variable. You might enable it for your own investigation or if Datadog support has recommended it for triage purposes. However, be sure to disable debug logging when you are finished testing to avoid the logging overhead it introduces.

These logs can surface instrumentation errors or integration-specific errors. For details on enabling and capturing these debug logs, see the [debug mode troubleshooting page][5].

{{% /collapse-content %}}

{{% collapse-content title="Startup logs" level="h4" %}}

During startup, Datadog tracing libraries emit logs that reflect the configurations applied in a JSON object, as well as any errors encountered, including if the Agent can be reached in languages where this is possible. Some languages require these startup logs to be enabled with the environment variable `DD_TRACE_STARTUP_LOGS=true`. For more information, see the [Startup logs][3].

{{% /collapse-content %}}

## Additional support

If you still need additional support, open a ticket with Datadog Support.

{{% collapse-content title="Open a Datadog Support ticket" level="h4" %}}

When you open a [support ticket][1], the Datadog support team may ask for the following types of information:

1. **Links to a trace or screenshots of the issue**: This helps reproduce your issues for troubleshooting purposes.

2. **Tracer startup logs**: Startup logs help identify tracer misconfiguration or communication issues between the tracer and the Datadog Agent. By comparing the tracer's configuration with the application or container settings, support teams can pinpoint improperly applied settings.

3. **Tracer debug logs**: Tracer debug logs provide deeper insights than startup logs, revealing:
   - Proper integration instrumentation during application traffic flow
   - Contents of spans created by the tracer
   - Connection errors when sending spans to the Agent

4. **Datadog Agent flare**: [Datadog Agent flares][12] enable you to see what is happening within the Datadog Agent, for example, if traces are being rejected or malformed. This does not help if traces are not reaching the Datadog Agent, but does help identify the source of an issue, or any metric discrepancies.

5. **A description of your environment**: Understanding your application's deployment configuration helps the Support team identify potential tracer-Agent communication issues and identify misconfigurations. For complex problems, support may request Kubernetes manifests, ECS task definitions, or similar deployment configuration files.

6. **Custom tracing code**: Custom instrumentation, configuration, and adding span tags can significantly impact trace visualizations in Datadog.

7. **Version information**: Knowing what language, framework, Datadog Agent, and Datadog tracer versions you are using allows Support to verify [Compatibility Requirements][15], check for known issues, or recommend a version upgrades. For example:
    
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/metrics/metrics_namespace/
[3]: /tracing/troubleshooting/tracer_startup_logs/
[4]: /tracing/troubleshooting/connection_errors/
[5]: /tracing/troubleshooting/tracer_debug_logs/
[6]: /tracing/glossary/#services
[7]: /tracing/glossary/#resources
[8]: /glossary/#span-tag
[9]: /tracing/troubleshooting/agent_rate_limits
[10]: /tracing/troubleshooting/agent_apm_resource_usage/
[11]: /tracing/custom_instrumentation/agent_customization
[12]: /agent/troubleshooting/send_a_flare/?tab=agentv6v7
[13]: /agent/troubleshooting/debug_mode/?tab=agentv6v7
[14]: /tracing/custom_instrumentation/
[15]: /tracing/compatibility_requirements/
[16]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
[17]: /tracing/guide/setting_primary_tags_to_scope/
[18]: /tracing/trace_collection/custom_instrumentation/?tab=datadogapi
[19]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[20]: https://app.datadoghq.com/apm/traces
[21]: /tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[22]: /tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /data_security/data_retention_periods/
[24]: /tracing/metrics/metrics_namespace/
[25]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[26]: /tracing/trace_pipeline/generate_metrics/
[27]: /tracing/trace_collection/library_config/
[28]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[29]: /tracing/troubleshooting/#data-volume-guidelines
[30]: /tracing/services/inferred_services
[31]: /tracing/trace_pipeline/metrics/#apm-traces-estimated-usage-dashboard
[32]: https://app.datadoghq.com/services

