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
| Java    |  0.58 (once available)  |
| .NET | 1.18.1 (once available)  |
| PHP | 0.47.0+  |
| Go | 1.26.0 (once available)  |
| NodeJS | 0.23.0 (once available)  |
| Python | 0.41 (once available)  |
| Ruby | 0.38 (once available)  |
| C++ | 1.1.6 (once available)  |

If your tracer version includes these startup logs, they are a great place to begin troubleshooting, including steps for self-triage.

### Datadog tracer configuration

View the detailed instructions per language on the [tracer startup logs page][2] to find these logs prefixed with `DATADOG TRACER CONFIGURATION`.

If your tracer version is behind the required version and you're having trouble seeing traces or configuring the tracer, consider upgrading to the latest version.

## Tracer debug logs

In order to capture full details on the Datadog tracer, debug mode can be enabled on your tracer via the environment variable `DATADOG_TRACE_DEBUG=true`.  This may be recommended by Datadog support for triaging issues or for self-triage, but it is not recommended to be always enabled due to logging overhead.

These logs can surface instrumentation errors or integration-specific errors.  To see further details on how to enable and capture these debug logs, please see the [dedicated debug mode troubleshooting page][3].

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

## What to expect from Datadog support

When you open a [support ticket][1], our support team may ask for a combination of the below information:

- [Tracer Startup Logs](#tracer-startup-logs)

- [Tracer Debug Logs](#tracer-debug-logs)

- An [agent flare][4] from your agent in [debug mode][5]

- Links to traces within your Datadog account showing the anomalous behavior

- Any automatic or [custom instrumentation][6], along with any configurations

- Versions of languages, frameworks, the Datadog Agent and Tracing Library being used

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/troubleshooting/tracer_startup_logs/
[3]: /tracing/troubleshooting/tracer_debug_logs/
[4]: /agent/troubleshooting/#send-a-flare
[5]: /agent/troubleshooting/debug_mode/?tab=agentv6v7
[6]: /tracing/custom_instrumentation/
