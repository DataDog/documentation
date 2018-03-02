---
aliases:
- /integrations/memcached
categories:
- web
- caching
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/mcache/
git_integration_title: mcache
guid: b1c4033c-bf96-4456-be63-e74ff171f991
has_logo: true
integration_title: Memcache
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: mcache
public_title: Datadog-Memcache Integration
short_description: Track memory use, hits, misses, evictions, fill percent, and more.
support: core
supported_os:
- linux
- mac_os
version: 1.1.0
---



## Overview

The Agent's memcache check lets you track memcache's memory use, hits, misses, evictions, fill percent, and much more.

## Setup
### Installation

The memcache check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your memcache servers.

If you need the newest version of the Memcache check, install the `dd-check-mcache` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `mcache.yaml` in the Agent's `conf.d` directory.See the [sample mcache.yaml](https://github.com/DataDog/integrations-core/blob/master/mcache/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - url: localhost  # url used to connect to the memcached instance
    port: 11212 # optional; default is 11211

    options:
      items: false # set to true to collect items stats
      slabs: false # set to true to collect slabs stats


```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending memcache metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `mcache` under the Checks section:

```
  Checks
  ======
    [...]

    mcache
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The memcache check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "mcache" >}}


The check only collects `memcache.slabs.*` metrics if you set `options.slabs: true` in `mcache.yaml`. Likewise, it only collects `memcache.items.*` metrics if you set `options.items: true`.


### Events
The Mcache check does not include any event at this time.

### Service Checks

`memcache.can_connect`:

Returns CRITICAL if the Agent cannot connect to memcache to collect metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Speed up your web applications with Memcached monitoring](https://www.datadoghq.com/blog/speed-up-web-applications-memcached/)
* [Instrument Memcached performance metrics with DogStatsD](https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd/)
* [Monitoring ElastiCache performance metrics with Redis or Memcached](https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached/)

