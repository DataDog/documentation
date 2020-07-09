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

When experiencing unexpected behavior with Datadog APM, there are a few common issues you may wish to investigate internally and this guide may help resolve issues quickly, but please feel free to reach out to [Datadog support][1] for further assistance.

## Tracer startup logs

All Datadog tracing libraries emit logs during startup by default to reflect the configurations applied, as well as any errors encountered during startup.  These startup logs are available from the minimum versions of the tracer indicated in the below table:

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

If your tracer version includes these [startup logs][2], they are the recommended place to begin troubleshooting.

## Tracer debug logs

In order to capture full details on the Datadog tracer, debug mode can be enabled on your tracer via the environment variable `DATADOG_TRACE_DEBUG`.  This may be done for your own investigation or recommended by Datadog support for triage purposes. However, it is not recommended to have debug mode always enabled due to logging overhead.

These logs can surface instrumentation errors or integration-specific errors.  To see further details on how to enable and capture these debug logs, please see the [debug mode troubleshooting page][3].

## APM rate limits

### Max events per second limit

If you encounter the following error message in your Agent logs, your application(s) are emitting more than the default 200 trace events per second allowed by APM.

```
Max events per second reached (current=300.00/s, max=200.00/s). Some events are now being dropped (sample rate=0.54). Consider adjusting event sampling rates.

```


To increase the APM rate limit for the Agent, configure the `max_events_per_second` attribute within the Agent's configuration file (underneath the `apm_config:` section). For containerized deployments (Docker, Kubernetes, etc.), use the `DD_APM_MAX_EPS` environment variable.

**Note**: Increasing the APM rate limit could result in increased costs for App Analytics.


### Max connection limit

If you encounter the following error message in your Agent logs, the default APM connection limit of 2000 has been exceeded:

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```


To increase the APM connection limit for the Agent, configure the `connection_limit` attribute within the Agent's configuration file (underneath the `apm_config:` section). For containerized deployments (Docker, Kubernetes, etc.), use the `DD_APM_CONNECTION_LIMIT` environment variable.

## Troubleshooting data requested by Datadog Support

When you open a [support ticket][1], our support team may ask for a combination of the below information:

1. How you are confirming the issue (links to a trace, screenshots, etc) and what you expect to see

    This allows us to confirm errors and attempt to reproduce your issues within our testing environments.

1. [Tracer Startup Logs](#tracer-startup-logs)

    Startup logs are a great way to spot misconfiguration of the tracer, or the inability for the tracer to communicate with the Datadog Agent.  By comparing the configuration that the tracer sees to the one set within the application or container, we can identify any areas where a setting is not being properly applied.

1. [Tracer Debug Logs](#tracer-debug-logs)

    Tracer Debug logs go one step deeper than startup logs, and will help us to identify if integrations are instrumenting properly in a manner that we aren't able to necessarily check until traffic flows through the application.

1. An [agent flare][4] from your agent in [debug mode][5]

    Agent flares allow us to see what is happening within the Datadog Agent, if any traces are being rejected or malformed within the Agent.  This will not help if traces are not reaching the Agent, but does help us identify the source of an issue, as well as identifying any metric discrepancies.

1. A description of your environment

    Knowing how your application is deployed helps us identify likely issues for tracer-agent communication problems or misconfigurations.  For difficult issues, we may ask to a see a Kubernetes manifest or an ECS task definition, for example.

1. Any automatic or [custom instrumentation][6], along with any configurations

    Custom instrumentation can be a very powerful tool, but also can have unintentional side effects on your trace visualizations within Datadog, so we ask about this to rule it out as a suspect.  Additionally, asking for your automatic instrumentation and configuration allows us to confirm if this matches what we are seeing in both tracer startup and debug logs to look for discrepancies.

1. Versions of languages, frameworks, the Datadog Agent and Tracing Library being used

    Versions allow us to ensure integrations are supported, as well as check against any known issues or recommend a tracer or language version upgrade if it will address the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/troubleshooting/tracer_startup_logs/
[3]: /tracing/troubleshooting/tracer_debug_logs/
[4]: /agent/troubleshooting/#send-a-flare
[5]: /agent/troubleshooting/debug_mode/?tab=agentv6v7
[6]: /tracing/custom_instrumentation/
