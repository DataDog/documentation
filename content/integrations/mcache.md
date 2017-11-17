---
aliases:
- /integrations/memcached
description: Track memory use, hits, misses, evictions, fill percent, and more.
git_integration_title: mcache
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Memcache Integration
---

 Check

## Overview

The Agent's memcache check lets you track memcache's memory use, hits, misses, evictions, fill percent, and much more.

## Setup
### Installation

The memcache check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your memcache servers. If you need the newest version of the check, install the `dd-check-mcache` package.

### Configuration

Create a file `mcache.yaml` in the Agent's `conf.d` directory.See the [sample mcache.yaml](https://github.com/DataDog/integrations-core/blob/master/mcache/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - url: localhost  # url used to connect to the memcached instance
    port: 11212 # optional; default is 11211
: /path/to/memcache/socket # alternative to url/port; 'dd-agent' user must have read/write permission
    options:
      items: false # set to true to collect items stats
      slabs: false # set to true to collect slabs stats
:
#    - optional_tag
```

[Restart the Agent](https://help.datadoghq.com/hc/en-us/articles/203764515-Start-Stop-Restart-the-Datadog-Agent) to begin sending memcache metrics to Datadog.

### Validation

[Run the Agent's `info` subcommand](https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information) and look for `mcache` under the Checks section:

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
{{< get-metrics-from-git >}}


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