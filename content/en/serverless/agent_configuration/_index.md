---
title: Serverless Agent configuration
kind: documentation
---

## Overview

The Agent's [main configuration file][1] is `datadog.yaml`. For the Serverless Agent, `datadog.yaml` configuration options are passed in with environment variables. The environment variables are usually named as their config options, but in capital SNAKE_CASE

### Basic Configuration

| Env Variable                   | Description                                                                                                                                                                                                        |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`                   | Your Datadog API key (**required**).                                                                                                                                                                               |
| `DD_ENV`                       | Sets the global tag `env` tag for all data emitted.                                                                                                                                                                |
| `DD_TAGS`                      | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`.                                                                                                                                  |
| `DD_SITE`                      | Destination site for your metrics, traces, and logs. Set your Datadog site to: `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`.                                                                  |
| `DD_DD_URL`                    | Optional setting to override the URL for metric submission.                                                                                                                                                        |
| `DD_URL`                       | Alias for `DD_DD_URL`. Ignored if `DD_DD_URL` is already set.                                                                                                                                                      |
| `DD_TRACE_ENABLED`             | Enables trace collection. Defaults to `true`. Fore more information about additional trace collection environment variables.                                                                                       |
| `DD_TAGS`                      | List of tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.                                                                                                         |
| `DD_TAG_VALUE_SPLIT_SEPARATOR` | Split tag values according to a given separator. Only applies to host tags, and tags coming from container integrations. It does not apply to tags on dogstatsd metrics, and tags collected by other integrations. |
|

### Log collection configuration

| Env Variable                                  | Description                                                                                                                                                                                                                          |
|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LOGS_ENABLED`                             | Enable Datadog Agent log collection by setting logs_enabled to true.                                                                                                                                                                 |
| `DD_LOGS_CONFIG_DD_URL`                       | Define the endpoint and port to hit when using a proxy for logs. The logs are forwarded in TCP therefore the proxy must be able to handle TCP connections. String in the format <ENDPOINT>:<PORT>                                    |
| `DD_LOGS_CONFIG_LOGS_NO_SSL`                  | Disable the SSL encryption. This parameter should only be used when logs are forwarded locally to a proxy. It is highly recommended to then handle the SSL encryption on the proxy side.                                             |
| `DD_LOGS_CONFIG_PROCESSING_RULES`             | Global processing rules that are applied to all logs. The available rules are "exclude_at_match", "include_at_match" and "mask_sequences". More information in Datadog [documentation][2]                                            |
| `DD_LOGS_CONFIG_FORCE_USE_HTTP`               | By default, the Agent sends logs in HTTPS batches to port 443 if HTTPS connectivity can be established at Agent startup, and falls back to TCP otherwise. Set this parameter to `true` to always send logs with HTTPS (recommended). |
| `DD_LOGS_FORCE_USE_TCP`                       | By default, logs are sent through HTTPS if possible, set this parameter to `true` to always send logs via TCP. If `use_http` is set to `true`, this parameter is ignored.                                                            |
| `DD_LOGS_CONFIG_USE_COMPRESSION`              | This parameter is available when sending logs with HTTPS. If enabled, the Agent compresses logs before sending them.                                                                                                                 |
| `DD_LOGS_CONFIG_COMPRESSION_LEVEL`            | The compression_level parameter accepts values from 0 (no compression) to 9 (maximum compression but higher resource usage). Only takes effect if `use_compression` is set to `true`.                                                |
| `DD_LOGS_CONFIG_BATCH_WAIT`                   | The maximum time the Datadog Agent waits to fill each batch of logs before sending. Default to 5                                                                                                                                     |
| `DD_LOGS_CONFIG_OPEN_FILES_LIMIT`             | The maximum number of files that can be tailed in parallel. Default is 500.                                                                                                                                                          |
| `DD_LOGS_CONFIG_FILE_WILDCARD_SELECTION_MODE` | The strategy used to prioritize wildcard matches if they exceed the open file limit. Choices are `by_name` and `by_modification_time`.                                                                                               |

### Advanced networking configuration

| Env Variable             | Description                                                                                                                                                                                                                                                                                                                        |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SKIP_SSL_VALIDATION` | Setting this option to "true" tells the Agent to skip validation of SSL/TLS certificates. Defaults: false                                                                                                                                                                                                                          |
| `DD_SSLKEYLOGFILE`       | Specifies a destination for TLS master secrets in NSS key log format to allow external programs such as Wireshark to decrypt TLS connections. For more details, see https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/Key_Log_Format. Use of sslkeylogfile compromises security and should only be used for debugging. |
| `DD_MIN_TLS_VERSION`     | This option defines the minimum TLS version that will be used when submitting data to the Datadog intake specified in "site" or "dd_url". This parameter defaults to "tlsv1.2". Possible values are: tlsv1.0, tlsv1.1, tlsv1.2, tlsv1.3; values are case-insensitive. Default: "tlsv1.0"                                           |

### Proxy settings

| Env Variable        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | An HTTP URL to use as a proxy for `http` requests.                |
| `DD_PROXY_HTTPS`    | An HTTPS URL to use as a proxy for `https` requests.              |
| `DD_PROXY_NO_PROXY` | A space-separated list of URLs for which no proxy should be used. |

For more information about proxy settings, see the [Agent v6 Proxy documentation][15].

### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables
to enable them:

| Env Variable               | Description                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_NON_LOCAL_TRAFFIC` | Allow non-local traffic when [tracing from other containers][16].                                                                                                                                                                                                |
| `DD_LOGS_ENABLED`          | Enable [log collection][17] with the Logs Agent.                                                                                                                                                                                                                 |
| `DD_PROCESS_AGENT_ENABLED` | Enable [live process collection][18] with the Process Agent. The [live container view][19] is already enabled by default if the Docker socket is available. If set to `false`, the [live process collection][18] and the [live container view][19] are disabled. |

### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][20]:

| Env Variable                     | Description                                                                                                                                           |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).                                                                  |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is `0.95`.                                                                    |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is "max median avg count".                                                     |
| `DD_DOGSTATSD_SOCKET`            | Path to the unix socket to listen to. Must be in a `rw` mounted volume.                                                                               |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for unix socket metrics.                                                                                       |
| `DD_DOGSTATSD_TAGS`              | Additional tags to append to all metrics, events, and service checks received by this DogStatsD server, for example: `"env:golden group:retrievers"`. |
| `DD_USE_DOGSTATSD`               | Enable or disable sending custom metrics from the DogStatsD library.                                                                                  |

Learn more about [DogStatsD over Unix Domain Sockets][21].

### Tagging

As a best practice, Datadog recommends using [unified service tagging][22] when assigning tags.

Datadog automatically collects common tags from Docker, Kubernetes, ECS, Swarm, Mesos, Nomad, and Rancher. To extract
even more tags, use the following options:

| Env Variable                  | Description                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS` | Extract container labels. This env is equivalent to the old `DD_DOCKER_LABELS_AS_TAGS` env.             |
| `DD_CONTAINER_ENV_AS_TAGS`    | Extract container environment variables. This env is equivalent to the old `DD_DOCKER_ENV_AS_TAGS` env. |
| `DD_COLLECT_EC2_TAGS`         | Extract custom EC2 tags without using the AWS integration.                                              |

See the [Docker Tag Extraction][23] documentation to learn more.

### Misc

| Env Variable                        | Description                                                                                                                                                                                                                                                                                                                                      |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"`. This is no longer needed since Agent v7.35.0.                                                                                                                                                                                  |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                                                                                                                                                                                                                                                              |
| `DD_CHECK_RUNNERS`                  | The Agent runs all checks concurrently by default (default value = `4` runners). To run the checks sequentially, set the value to `1`. If you need to run a high number of checks (or slow checks), the `collector-queue` component may fall behind and fail the health check. You can increase the number of runners to run checks in parallel. |
| `DD_CHECKS_TAG_CARDINALITY`         | Configure the level of granularity of tags to send for checks metrics and events.                                                                                                                                                                                                                                                                |
| `DD_DOGSTATSD_TAG_CARDINALITY`      | Configure the level of granularity of tags to send for DogStatsD metrics and events.                                                                                                                                                                                                                                                             |
| `DD_INTERNAL_PROFILING_ENABLED`     | Enable internal profiling for the Agent process. Default: false                                                                                                                                                                                                                                                                                  |

You can add extra listeners and config providers using the `DD_EXTRA_LISTENERS` and `DD_EXTRA_CONFIG_PROVIDERS`
environment variables. They are added in addition to the variables defined in the `listeners` and `config_providers`
section of the `datadog.yaml` configuration file.

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml

[2]: https://docs.datadoghq.com/agent/logs/advanced_log_collection/#global-processing-rules
