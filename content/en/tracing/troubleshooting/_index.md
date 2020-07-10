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

If you experience unexpected behavior with Datadog APM, there are a few common issues you can investigate and this guide may help resolve issues quickly. Reach out to [Datadog support][1] for further assistance.

## Confirm APM setup and Agent status

During startup, all Datadog tracing libraries past the versions listed below emit logs that reflect the configurations applied in a JSON object, as well as any errors encountered, including if the Agent can be reached in languages where this is possible.  If your tracer version includes these [startup logs][2], start your troubleshooting there.

| Language | Version |
|----------|---------|
| Java    |  0.59 (once available)  |
| .NET | 1.18.2+  |
| PHP | 0.47.0+  |
| Go | 1.26.0 (once available)  |
| NodeJS | 0.23.0 (once available)  |
| Python | 0.41 (once available)  |
| Ruby | 0.38 (once available)  |
| C++ | 1.1.6 (once available)  |

## Tracer debug logs

To capture full details on the Datadog tracer, enable debug mode on your tracer by using the `DATADOG_TRACE_DEBUG` environment variable. You might enable it for your own investigation or because  Datadog support recommended it for triage purposes. However, don't leave debug mode always enabled because of the logging overhead it introduces.

These logs can surface instrumentation errors or integration-specific errors.  For details on enabling and capturing these debug logs, see the [debug mode troubleshooting page][3].

## APM rate limits

Within Datadog Agent logs, if you see error messages about rate limits or max events per second, these limits can be adjusted by following  [these instructions][4].  For any questions before changing limits, consult with our [support team][1].

## Troubleshooting data requested by Datadog Support

When you open a [support ticket][1], our support team may ask for some combination of the following types of information:

1. **How are you confirming the issue? Provide links to a trace or screenshots, for example, and tell us what you expect to see**

    This allows us to confirm errors and attempt to reproduce your issues within our testing environments.

1. **[Tracer Startup Logs](#tracer-startup-logs)**

    Startup logs are a great way to spot misconfiguration of the tracer, or the inability for the tracer to communicate with the Datadog Agent. By comparing the configuration that the tracer sees to the one set within the application or container, we can identify areas where a setting is not being properly applied.

1. **[Tracer Debug Logs](#tracer-debug-logs)**

    Tracer Debug logs go one step deeper than startup logs, and will help us to identify if integrations are instrumenting properly in a manner that we aren't able to necessarily check until traffic flows through the application.  Debug logs can be extremely useful for viewing the contents of spans created by the tracer and can surface an error if there is a connection issue when attempting to send spans to the agent. Tracer debug logs are typically the most informative and reliable tool for confirming nuanced behavior of the tracer.

1. **An [agent flare][5] (snapshot of logs and configs) that captures a representative log sample of a time period when traces are sent to your agent while in [debug mode][6]**

    Agent flares allow us to see what is happening within the Datadog Agent, or if traces are being rejected or malformed within the Agent.  This will not help if traces are not reaching the Agent, but does help us identify the source of an issue, or any metric discrepancies.

1. **A description of your environment**

    Knowing how your application is deployed helps us identify likely issues for tracer-agent communication problems or misconfigurations. For difficult issues, we may ask to a see a Kubernetes manifest or an ECS task definition, for example.

1. **Any automatic or [custom instrumentation][7], along with any configurations**

    Custom instrumentation can be a very powerful tool, but also can have unintentional side effects on your trace visualizations within Datadog, so we ask about this to rule it out as a suspect.  Additionally, asking for your automatic instrumentation and configuration allows us to confirm if this matches what we are seeing in both tracer startup and debug logs.

1. **Versions of languages, frameworks, the Datadog Agent, and Tracing Library being used**

    Knowing what versions are being used allows us to ensure integrations are supported, to check for known issues, or to recommend a tracer or language version upgrade if it will address the problem.

1. **Confirm Agent configurations, including if APM is enabled**

    While APM is enabled for Agent 6+, in containerized environments there is an additional configuration step for [non local traffic][8] and can be the solution to traces not being received.

    You can check this by running the command `netstat -van | grep 8126` on your Agent host. If you don't see an entry, this means you should check if your Agent is running or the configuration of your `datadog.yaml` file. Instructions can be found on the [Agent Configuration page][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/troubleshooting/tracer_startup_logs/
[3]: /tracing/troubleshooting/tracer_debug_logs/
[4]: /tracing/troubleshooting/apm_rate_limits
[5]: /agent/troubleshooting/#send-a-flare
[6]: /agent/troubleshooting/debug_mode/?tab=agentv6v7
[7]: /tracing/custom_instrumentation/
[8]: /tracing/send_traces/#datadog-agent
