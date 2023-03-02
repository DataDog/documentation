---
title: Agent Rate Limits
kind: Documentation
aliases:
  - /tracing/troubleshooting/apm_rate_limits
---

## Maximum connection limit

If you encounter the following error message in your Agent logs, the default APM connection limit of 2000 has been exceeded:

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

To increase the APM connection limit for the Agent, configure the `connection_limit` attribute within the Agent's configuration file (underneath the `apm_config:` section). For containerized deployments (for example, Docker or Kubernetes), use the `DD_APM_CONNECTION_LIMIT` environment variable.

## Maximum memory limit

If you encounter the following error message in your Agent logs, it means the Agent has exceeded the max memory usage by 150%:

```
CRITICAL | (pkg/trace/api/api.go:703 in watchdog) | Killing process. Memory threshold exceeded: 8238.08M / 715.26M
CRITICAL | (pkg/trace/osutil/file.go:39 in Exitf) | OOM
```

To increase the max memory limit for the Agent, configure the `max_memory` attribute in the `apm_config` section of the Agent's configuration file. For containerized deployments (for example, Docker or Kubernetes), use the `DD_APM_MAX_MEMORY` environment variable.

If you'd like your orchestrator (such as Kubernetes) to handle your memory limits, this limit can be disabled by setting it to `0` since Datadog Agent 7.23.0.

## Maximum CPU percentage

This setting defines the maximum CPU percentage that the APM agent should be using. In non-Kubernetes environments it defaults to 50, which is equivalent to 0.5 cores (100 = 1 core). After this limit is reached, payloads will be refused until the CPU usage goes below the limit again. This is reflected by the `datadog.trace_agent.receiver.ratelimit` which represents the percentage of payloads that are currently being dropped (a value of 1 meaning that no traces are being dropped). This may also be visible in the [Service Table View][1] as a `Limited Resource` warning.

If you want your orchestrator (or an external service) to manage resource limitations for the Datadog Agent, Datadog recommends disabling this by setting the environment variable `DD_APM_MAX_CPU_PERCENT` to `0` (supported since Datadog Agent 7.23.0).

[1]: /tracing/trace_pipeline/ingestion_controls/#service-table-view
