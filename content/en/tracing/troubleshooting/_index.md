---
title: APM Troubleshooting
kind: documentation
further_reading:
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

If you experience unexpected behavior with Datadog APM, there are a few common issues you can investigate and this guide may help resolve issues quickly. Reach out to [Datadog support][1] for further assistance.  We also recommend regularly updating to the latest version of the Datadog tracing libraries you use, as each release contains improvements and fixes.

## Confirm APM setup and Agent status

During startup, all Datadog tracing libraries past the versions listed below emit logs that reflect the configurations applied in a JSON object, as well as any errors encountered, including if the Agent can be reached in languages where this is possible.  If your tracer version includes these [startup logs][2], start your troubleshooting there.

| Language | Version |
|----------|---------|
| Java    |  0.59+  |
| .NET | 1.18.2+  |
| PHP | 0.47.0+  |
| Go | 1.26.0+  |
| NodeJS | 0.23.0+  |
| Python | 0.41+  |
| Ruby | 0.38+  |
| C++ | 1.2.0+ |

## Tracer debug logs

To capture full details on the Datadog tracer, enable debug mode on your tracer by using the `DD_TRACE_DEBUG` environment variable. You might enable it for your own investigation or because  Datadog support recommended it for triage purposes. However, don't leave debug mode always enabled because of the logging overhead it introduces.

These logs can surface instrumentation errors or integration-specific errors.  For details on enabling and capturing these debug logs, see the [debug mode troubleshooting page][3].

## Data schema and quotas

Your instrumented application can submit spans with timestamps up to 18 hours in the past and two hours in the future from the current time.

Datadog truncates the following strings if they exceed the indicated number of characters:

| Name         | Characters |
|--------------|------------|
| [service][4]    |  100       |
| operation    |  100       |
| type         |  100       |
| [resource][5]   |  5000      |
| [tag key][6]    |  200       |
| [tag value][6]  |  5000      |

Datadog applies the following quotas, per 10 minute interval, which you can optionally increase by contacting [support][1]:

- 1000 unique environments and service combinations
- 30 unique host groups per environment
- 100 unique operation names per environment and service
- 1000 unique resources per environment, service, and operation name
- 30 unique versions per environment and service

## APM rate limits

Within Datadog Agent logs, if you see error messages about rate limits or max events per second, you can change these limits by following [these instructions][7].  If you have questions, before you change the limits, consult with our [support team][1].

## Modifying, discarding, or obfuscating spans

There are a number of configuration options available to scrub sensitive data or discard traces corresponding to health checks or other unwanted traffic that can be configured within the Datadog Agent, or in some languages the Tracing Client. For details on the options available, please see the [Security and Agent Customization][8] page of the documentation.  While this offers representative examples, if you require assistance applying these options to your environment, please reach out to [Datadog Support][1] and provide us with details of your desired outcome.

## Troubleshooting data requested by Datadog Support

When you open a [support ticket][1], our support team may ask for some combination of the following types of information:

1. **How are you confirming the issue? Provide links to a trace (preferably) or screenshots, for example, and tell us what you expect to see.**

    This allows us to confirm errors and attempt to reproduce your issues within our testing environments.

2. **[Tracer Startup Logs](#tracer-startup-logs)**

    Startup logs are a great way to spot misconfiguration of the tracer, or the inability for the tracer to communicate with the Datadog Agent. By comparing the configuration that the tracer sees to the one set within the application or container, we can identify areas where a setting is not being properly applied.

3. **[Tracer Debug Logs](#tracer-debug-logs)**

    Tracer Debug logs go one step deeper than startup logs, and will help us to identify if integrations are instrumenting properly in a manner that we aren't able to necessarily check until traffic flows through the application.  Debug logs can be extremely useful for viewing the contents of spans created by the tracer and can surface an error if there is a connection issue when attempting to send spans to the agent. Tracer debug logs are typically the most informative and reliable tool for confirming nuanced behavior of the tracer.

4. **An [Agent flare][9] (snapshot of logs and configs) that captures a representative log sample of a time period when traces are sent to your Agent while in [debug or trace mode][10] depending on what information we are looking for in these logs.**

    Agent flares allow us to see what is happening within the Datadog Agent, or if traces are being rejected or malformed within the Agent.  This will not help if traces are not reaching the Agent, but does help us identify the source of an issue, or any metric discrepancies.

    When adjusting the log level to `debug` or `trace` mode, please take into consideration that these will significantly increase log volume and therefore consumption of system resources (namely storage space over the long term). We recommend these only be used temporarily for troubleshooting purposes and the level be restored to `info` afterward.

    **Note**: If you are using Agent v7.19+ and the Datadog Helm Chart with the [latest version][7], or a DaemonSet where the Datadog Agent and trace-agent are in separate containers, you will need to run the following command with `log_level: DEBUG` or `log_level: TRACE` set in your `datadog.yaml` to get a flare from the trace-agent:

    {{< code-block lang="bash" filename="trace-agent.sh" >}}
kubectl exec -it <agent-pod-name> -c trace-agent -- agent flare <case-id> --local
    {{< /code-block >}}

5. **A description of your environment**

    Knowing how your application is deployed helps us identify likely issues for tracer-agent communication problems or misconfigurations. For difficult issues, we may ask to a see a Kubernetes manifest or an ECS task definition, for example.

6. **Custom code written using the tracing libraries, such as tracer configuration, [custom instrumentation][11], and adding span tags**

    Custom instrumentation can be a very powerful tool, but also can have unintentional side effects on your trace visualizations within Datadog, so we ask about this to rule it out as a suspect.  Additionally, asking for your automatic instrumentation and configuration allows us to confirm if this matches what we are seeing in both tracer startup and debug logs.

7. **Versions of languages, frameworks, the Datadog Agent, and Tracing Library being used**

    Knowing what versions are being used allows us to ensure integrations are supported in our [Compatiblity Requirements][12] section, check for known issues, or to recommend a tracer or language version upgrade if it will address the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/troubleshooting/tracer_startup_logs/
[3]: /tracing/troubleshooting/tracer_debug_logs/
[4]: /tracing/visualization/#services
[5]: /tracing/visualization/#resources
[6]: /tracing/visualization/#span-tags
[7]: /tracing/troubleshooting/agent_rate_limits
[8]: /tracing/custom_instrumentation/agent_customization
[9]: /agent/troubleshooting/send_a_flare/?tab=agentv6v7
[10]: /agent/troubleshooting/debug_mode/?tab=agentv6v7
[11]: /tracing/custom_instrumentation/
[12]: /tracing/compatibility_requirements/
