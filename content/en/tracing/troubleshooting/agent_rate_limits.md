---
title: Agent Rate Limits
kind: Documentation
aliases:
  - /tracing/troubleshooting/apm_rate_limits
---

## Max events per second limit

If you encounter the following error message in your Agent logs, your applications are emitting more than the default 200 trace events per second allowed by APM.

```
Max events per second reached (current=300.00/s, max=200.00/s). Some events are now being dropped (sample rate=0.54). Consider adjusting event sampling rates.

```

To increase the APM rate limit for the Agent, configure the `max_events_per_second` attribute within the Agent's configuration file (underneath the `apm_config:` section). For containerized deployments (for example, Docker or Kubernetes), use the `DD_APM_MAX_EPS` environment variable.

**Note**: Increasing the APM rate limit could result in increased costs for App Analytics.

## Max connection limit

If you encounter the following error message in your Agent logs, the default APM connection limit of 2000 has been exceeded:

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

To increase the APM connection limit for the Agent, configure the `connection_limit` attribute within the Agent's configuration file (underneath the `apm_config:` section). For containerized deployments (for example, Docker or Kubernetes), use the `DD_APM_CONNECTION_LIMIT` environment variable.

## Max memory limit

If you encounter the following error message in your Agent logs, it means the Agent has exceeded the max memory usage by 150%:

```
CRITICAL | (pkg/trace/api/api.go:703 in watchdog) | Killing process. Memory threshold exceeded: 8238.08M / 715.26M
CRITICAL | (pkg/trace/osutil/file.go:39 in Exitf) | OOM
```

To increase the max memory limit for the Agent, configure the `max_memory` attribute in the `apm_config` section of the Agent's configuration file. For containerized deployments (for example, Docker or Kubernetes), use the `DD_APM_MAX_MEMORY` environment variable.
