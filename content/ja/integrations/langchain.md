---
app_id: langchain
app_uuid: 7993851f-d36b-40f3-8425-92080f3b9d61
assets:
  dashboards:
    LangChain Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: langchain.request.duration
      metadata_path: metadata.csv
      prefix: langchain.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10372
    source_type_name: LangChain
  monitors:
    Error Rate: assets/monitors/error_rate.json
    Request Latency: assets/monitors/request_duration.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- developer tools
- cost management
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/langchain/README.md
display_on_public_website: true
draft: false
git_integration_title: langchain
integration_id: langchain
integration_title: LangChain
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: langchain
public_title: LangChain
short_description: 'Optimize LangChain usage: prompt sampling and performance and
  cost metrics.'
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Developer Tools
  - Category::Cost Management
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 'Optimize LangChain usage: prompt sampling and performance and cost
    metrics.'
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: LangChain
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get cost estimation, prompt and completion sampling, error tracking, performance metrics, and more out of [LangChain][1] Python library requests using Datadog metrics, APM, and logs.

## Setup

### Installation

1. Enable APM and StatsD in your Datadog Agent. For example, in Docker:

```
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -p 127.0.0.1:8126:8126/tcp \
              -p 127.0.0.1:8125:8125/udp \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
              -e DD_APM_ENABLED=true \
              gcr.io/datadoghq/agent:latest
```

2. Install the Datadog APM Python library.

```
pip install ddtrace>=1.17
```


3. Prefix your LangChain Python application command with `ddtrace-run`.

```
DD_SERVICE="my-service" DD_ENV="staging" DD_API_KEY=<DATADOG_API_KEY> ddtrace-run python <your-app>.py
```

**Note**: If the Agent is using a non-default hostname or port, be sure to also set `DD_AGENT_HOST`, `DD_TRACE_AGENT_PORT`, or `DD_DOGSTATSD_PORT`.

See the [APM Python library documentation][2] for more advanced usage.


### Configuration

See the [APM Python library documentation][3] for all the available configuration options.


#### Log Prompt & Completion Sampling

To enable log prompt and completion sampling, set the `DD_LANGCHAIN_LOGS_ENABLED=1` environment variable. By default, 10% of traced requests will emit logs containing the prompts and completions.

To adjust the log sample rate, see the [APM library documentation][3].

**Note**: Logs submission requires `DD_API_KEY` to be specified when running `ddtrace-run`.


### Validation

Validate that the APM Python library can communicate with your Agent using:

```
ddtrace-run --info
```

You should see the following output:

```
    Agent error: None
```

#### Debug Logging

Pass the `--debug` flag to `ddtrace-run` to enable debug logging.

```
ddtrace-run --debug
```

This displays any errors sending data:

```
ERROR:ddtrace.internal.writer.writer:failed to send, dropping 1 traces to intake at http://localhost:8126/v0.5/traces after 3 retries ([Errno 61] Connection refused)
WARNING:ddtrace.vendor.dogstatsd:Error submitting packet: [Errno 61] Connection refused, dropping the packet and closing the socket
DEBUG:ddtrace.contrib._trace_utils_llm.py:sent 2 logs to 'http-intake.logs.datadoghq.com'
```

## 収集データ

### Metrics
{{< get-metrics-from-git "langchain" >}}


### Events

The LangChain integration does not include any events.

### Service Checks

The LangChain integration does not include any service checks.


## Troubleshooting

Need help? Contact [Datadog support][5].


[1]: https://docs.langchain.com/docs/
[2]: https://ddtrace.readthedocs.io/en/stable/installation_quickstart.html
[3]: https://ddtrace.readthedocs.io/en/stable/integrations.html#langchain
[4]: https://github.com/DataDog/integrations-core/blob/master/langchain/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/