---
title: APM Troubleshooting
aliases:
    - /tracing/faq/my-trace-agent-log-renders-empty-service-error/
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
---

If you experience unexpected behavior with Datadog APM, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance. Datadog recommends regularly updating to the latest version of the Datadog tracing libraries you use, as each release contains improvements and fixes.

## Troubleshooting pipeline

The following components are involved in sending APM data to Datadog:

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="APM Troubleshooting Pipeline">}}

Traces (JSON data type) and [Tracing Application Metrics][2] are generated from the application and sent to the Datadog Agent before traveling to the backend. Different troubleshooting information can be collected at each section of the pipeline. Importantly, the Tracer debug logs are written to your application's logs, which is a separate component from the Datadog Agent flare. More information about these items can be seen below in [Troubleshooting data requested by Datadog Support](#troubleshooting-data-requested-by-datadog-support).

## Confirm APM setup and Agent status

During startup, Datadog tracing libraries emit logs that reflect the configurations applied in a JSON object, as well as any errors encountered, including if the Agent can be reached in languages where this is possible. Some languages require these startup logs to be enabled with the environment variable `DD_TRACE_STARTUP_LOGS=true`. For more information on startup logs, see the [dedicated page][3] for troubleshooting.

## Connection errors

A common source of trouble is the inability of the instrumented application to communicate with the Datadog Agent. Read about how to find and fix these problems in [Connection Errors][4].

## Tracer debug logs

To capture full details on the Datadog tracer, enable debug mode on your tracer by using the `DD_TRACE_DEBUG` environment variable. You might enable it for your own investigation or because Datadog support recommended it for triage purposes. However, don't leave debug mode always enabled because of the logging overhead it introduces.

These logs can surface instrumentation errors or integration-specific errors. For details on enabling and capturing these debug logs, see the [debug mode troubleshooting page][5].

## Data volume guidelines

Your instrumented application can submit spans with timestamps up to 18 hours in the past and two hours in the future from the current time.

Datadog truncates the following strings if they exceed the indicated number of characters:

| Name         | Characters |
|--------------|------------|
| [service][6]    |  100       |
| operation    |  100       |
| type         |  100       |
| [resource][7]   |  5000      |
| [tag key][8]    |  200       |
| [tag value][8]  |  25000     |

Additionally, the number of [span tags][8] present on any span cannot exceed 1024.

For a given 40 minute interval, Datadog accepts the following combinations. To accommodate larger volumes, contact [support][1] to discuss your use case.

- 5000 unique environments and service combinations
- 30 unique [second primary tag][16] values per environment
- 100 unique operation names per environment and service
- 1000 unique resources per environment, service, and operation name
- 30 unique versions per environment and service

## APM rate limits

Within Datadog Agent logs, if you see error messages about rate limits or max events per second, you can change these limits by following [these instructions][9]. If you have questions, before you change the limits, consult with the Datadog [support team][1].

## APM resource usage

Read about detecting trace collection CPU usage and about calculating adequate resource limits for the Agent in [Agent Resource Usage][10].

## Modifying, discarding, or obfuscating spans

There are a number of configuration options available to scrub sensitive data or discard traces corresponding to health checks or other unwanted traffic that can be configured within the Datadog Agent, or in some languages the Tracing Client. For details on the options available, see [Security and Agent Customization][11]. While this offers representative examples, if you require assistance applying these options to your environment, reach out to [Datadog Support][1].

## Service naming convention issues

If the number of services exceeds what is specified in the [data volume guidelines](#data-volume-guidelines), try following these best practices for service naming conventions.

### Exclude environment tag values from service names

By default, the environment (`env`) is the primary tag for [Datadog APM][17].

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="Environment is the default primary tag" style="width:100%;" >}}

A service is typically deployed in multiple environments, such as `prod`, `staging`, and `dev`. Performance metrics like request counts, latency, and error rate differ across various environments. The environment dropdown in the Service Catalog allows you to scope the data in the **Performance** tab to a specific environment.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="Choose a specific environment using the `env` dropdown in the Service Catalog" style="width:100%;" >}}

One pattern that often leads to issues with an overwhelming number of services is including the environment value in service names. For example, you might have two unique services instead of one since they are operating in two separate environments: `prod-web-store` and `dev-web-store`.

Datadog recommends tuning your instrumentation by renaming your services.

Trace metrics are unsampled, which means your instrumented application shows all data instead of subsections of them. The [volume guidelines](#data-volume-guidelines) are also applied.

### Use the second primary tag instead of putting metric partitions or grouping variables into service names

Second primary tags are additional tags that you can use to group and aggregate your trace metrics. You can use the dropdown to scope the performance data to a given cluster name or data center value.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="Use the dropdown menu to select a specific cluster or data center value" style="width:100%;" >}}

Including metric partitions or grouping variables in service names instead of applying the second primary tag unnecessarily inflates the number of unique services in an account and results in potential delay or data loss.

 For example, instead of the service `web-store`, you might decide to name different instances of a service `web-store-us-1`, `web-store-eu-1`, and `web-store-eu-2` to see performance metrics for these partitions side-by-side. Datadog recommends implementing the **region value** (`us-1`, `eu-1`, `eu-2`) as a second primary tag.

## Troubleshooting data requested by Datadog Support

When you open a [support ticket][1], our support team may ask for some combination of the following types of information:

1. **How are you confirming the issue? Provide links to a trace (preferably) or screenshots, for example, and tell support what you expect to see.**

    This allows Support to confirm errors and attempt to reproduce your issues within Datadog's testing environments.

2. **[Tracer startup logs](#confirm-apm-setup-and-agent-status)**

    Startup logs are a great way to spot misconfiguration of the tracer, or the inability for the tracer to communicate with the Datadog Agent. By comparing the configuration that the tracer sees to the one set within the application or container, Support can identify areas where a setting is not being properly applied.

3. **[Tracer debug logs](#tracer-debug-logs)**

    Tracer debug logs go one step deeper than startup logs, and help to identify if integrations are instrumenting properly in a manner that can't necessarily be checked until traffic flows through the application. Debug logs can be extremely useful for viewing the contents of spans created by the tracer and can surface an error if there is a connection issue when attempting to send spans to the agent. Tracer debug logs are typically the most informative and reliable tool for confirming nuanced behavior of the tracer.

4. **A [Datadog Agent flare][12] (snapshot of logs and configs) that captures a representative log sample of a time period when traces are sent to your Datadog Agent while in [debug or trace mode][13] depending on what information you are looking for in these logs.**

    Datadog Agent flares enables you to see what is happening within the Datadog Agent, for example, if traces are being rejected or malformed. This does not help if traces are not reaching the Datadog Agent, but does help identify the source of an issue, or any metric discrepancies.

    When adjusting the log level to `debug` or `trace` mode, take into consideration that these significantly increase log volume and therefore consumption of system resources (namely storage space over the long term). Datadog recommends these only be used temporarily for troubleshooting purposes and the level be restored to `info` afterward.

    **Note**: If you are using the Datadog Agent v7.19+ and the Datadog Helm Chart with the [latest version][9], or a DaemonSet where the Datadog Agent and trace-agent are in separate containers, you will need to run the following command with `log_level: DEBUG` or `log_level: TRACE` set in your `datadog.yaml` to get a flare from the trace-agent:

    {{< code-block lang="shell" filename="trace-agent.sh" >}}
kubectl exec -it <agent-pod-name> -c trace-agent -- agent flare <case-id> --local
    {{< /code-block >}}

5. **A description of your environment**

    Knowing how your application is deployed helps the Support team identify likely issues for tracer-agent communication problems or misconfigurations. For difficult issues, Support may ask to a see a Kubernetes manifest or an ECS task definition, for example.

6. **Custom code written using the tracing libraries, such as tracer configuration, [custom instrumentation][14], and adding span tags**

    Custom instrumentation can be a powerful tool, but also can have unintentional side effects on your trace visualizations within Datadog, so support may ask about this to rule it out as a suspect.

    Additionally, asking for your automatic instrumentation and configuration allows Datadog to confirm if this matches what it is seeing in both tracer startup and debug logs.

7. **Versions of the:**
   * **programming language, frameworks, and dependencies used to build the instrumented application**
   * **Datadog Tracer**
   * **Datadog Agent**

    Knowing what versions are being used allows us to ensure integrations are supported in our [Compatiblity Requirements][15] section, check for known issues, or to recommend a tracer or language version upgrade if it will address the problem.

## Further Reading

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
[16]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[17]: /tracing/guide/setting_primary_tags_to_scope/
