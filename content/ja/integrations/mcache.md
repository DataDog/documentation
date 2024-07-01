---
"app_id": "memcached"
"app_uuid": "711c00b1-c62c-4a50-867b-be1929950b2c"
"assets":
  "dashboards":
    "memcached": "assets/dashboards/memcached_dashboard.json"
    "memcached_screenboard": "assets/dashboards/memcached_screenboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "memcache.uptime"
      "metadata_path": "metadata.csv"
      "prefix": "memcache."
    "process_signatures":
    - "memcached"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "32"
    "source_type_name": "Memcached"
  "saved_views":
    "memcached_processes": "assets/saved_views/memcached_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "log collection"
- "tracing"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/mcache/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "mcache"
"integration_id": "memcached"
"integration_title": "Memcache"
"integration_version": "4.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "mcache"
"public_title": "Memcache"
"short_description": "Track memory use, hits, misses, evictions, fill percent, and more."
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Category::Tracing"
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track memory use, hits, misses, evictions, fill percent, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Memcache"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The Agent's Memcache check lets you track Memcache's memory use, hits, misses, evictions, fill percent, and much more.

## Setup

### Installation

The Memcache check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your Memcache servers.

### Configuration

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section

When launching the Memcache server, set the binding protocol `-B` to `binary` or `auto`. Automatic (auto) is the default.

#### Metric collection

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `mcache.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample mcache.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## url used to connect to the Memcached instance.
     #
     - url: localhost
   ```

2. [Restart the Agent][3] to begin sending Memcache metrics to Datadog.

##### Trace collection

Datadog APM integrates with Memcache to see the traces across your distributed system. Trace collection is enabled by default in the Datadog Agent v6+. To start collecting traces:

1. [Enable trace collection in Datadog][4].
2. [Instrument your application that makes requests to Memcache][5].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/tracing/send_traces/
[5]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                 |
| -------------------- | ------------------------------------- |
| `<INTEGRATION_NAME>` | `mcache`                              |
| `<INIT_CONFIG>`      | blank or `{}`                         |
| `<INSTANCE_CONFIG>`  | `{"url": "%%host%%","port": "11211"}` |

##### Trace collection

APM for containerized apps is supported on hosts running Agent v6+ but requires extra configuration to begin collecting traces.

Required environment variables on the Agent container:

| Parameter            | Value                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

See [Tracing Kubernetes Applications][2] and the [Kubernetes Daemon Setup][3] for a complete list of available environment variables and configuration.

Then, [instrument your application container][4] and set `DD_AGENT_HOST` to the name of your Agent container.

#### Log collection

_Available for Agent versions >6.0_

1. Add this configuration block to your `mcache.d/conf.yaml` file to start collecting your Memcached Logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/memcached.log
       source: memcached
       service: mcache
   ```

    Change the `path` and `service` parameter values and configure them for your environment.

2. [Restart the Agent][5] to validate these changes.

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/tracing/setup/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Validation

Run the [Agent's `status` subcommand][2] and look for `mcache` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "mcache" >}}


The check only collects `memcache.slabs.*` metrics if you set `options.slabs: true` in `mcache.d/conf.yaml`. Likewise, it only collects `memcache.items.*` metrics if you set `options.items: true`.

### Events

The Mcache check does not include any events.

### Service Checks
{{< get-service-checks-from-git "mcache" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].

## Further Reading

- [Speed up your web applications with Memcached monitoring][4]
- [Instrument Memcached performance metrics with DogStatsD][5]
- [Monitoring ElastiCache performance metrics with Redis or Memcached][6]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/speed-up-web-applications-memcached
[5]: https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd
[6]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
