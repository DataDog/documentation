---
title: Datadog-Redis Integration
integration_title: Redis
newhlevel: true
kind: integration
git_integration_title: redisdb
updated_for_agent: 5.8.5
aliases:
  - /integrations/redis
description: "{{< get-desc-from-git >}}"
---

{{< img src="integrations/redis/redis.png" alt="Redis default dashboard" >}}

## Overview

Track and graph your Redis activity and performance metrics with slice-and-dice at all levels
from individual column families to entire clusters.

## Setup
### Configuration

1.  Configure the Agent to connect to the Redis server. Edit `conf.d/redisdb.yaml`:
{{< highlight yaml>}}
init_config:

instances:
  - host: localhost
    port: 6379
    tags:
      - optional_tag1
      - optional_tag2
    keys:
      - key1
{{< /highlight >}}

2.  Restart the Agent

#### Configuration Options

* `unix_socket_path` - (Optional) - Can be used instead of `host` and `port`.
* `db`, `password`, and `socket_timeout` - (Optional) - Additional connection options.
* `warn_on_missing_keys` - (Optional) - Display a warning in the info page if the keys we're tracking are missing.
* `slowlog-max-len` - (Optional) - Maximum number of entries to fetch from the slow query log. By default, the check will
        read this value from the redis config. If it's above 128, it will default to 128 due to potential increased latency
        to retrieve more than 128 slowlog entries every 15 seconds. If you need to get more entries from the slow query logs
        set the value here. Warning: It may impact the performance of your redis instance
* `command_stats` - (Optional) - Collect INFO COMMANDSTATS output as metrics.

{{< insert-example-links conf="redisdb" check="redisdb" >}}

### Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell>}}
Checks
======

  [...]

  redisdb
  -------
    - instance #0 [OK]
    - Collected 8 metrics & 0 events
{{< /highlight >}}

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

[2]: https://app.datadoghq.com/account/overview
[3]: https://app.datadoghq.com/metric/explorer

## Troubleshooting
### How do I filter to look at the stats for a particular DB in a particular environment?

Prebuilt dashboards only allow you to filter on a single tag
(these are the dashboards you see when
clicking [Overview][2]). If you go to the [Metrics Explorer][3], you can select which
metrics you want to see and what you want to see it over.  In the ‘Over:’ section
you can select multiple environments and then select “Save these tiles to: a new dashboard.”

{{< img src="integrations/redis/metric-explorer-redis.png" >}}

## Further Reading
Learn more about how to monitor Redis performance metrics thanks to
[our series of posts](https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics/).
We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Redis.