---
aliases: []
description: monitor cassandra using the nodetool utility
git_integration_title: cassandra_nodetool
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Cassandra Nodetool Integration
---

 Check: Cassandra Nodetool

## Overview

This check collects metrics for your Cassandra cluster that are not available through [jmx integration](https://github.com/DataDog/integrations-core/tree/master/cassandra).
It uses the `nodetool` utility to collect them.

## Setup
### Installation

The cassandra nodetool check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your cassandra nodes.
If you need the newest version of the check, install the `dd-check-cassandra_nodetool` package.

### Configuration

Create a file `cassandra_nodetool.yaml` in the Agent's `conf.d` directory. See the [sample cassandra_nodetool.yaml](https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/conf.yaml.example) for all available configuration options:

```
init_config:
 or path to nodetool (e.g. /usr/bin/nodetool or docker exec container nodetool)
 be overwritten on an instance
: /usr/bin/nodetool

instances:
 list of keyspaces to monitor
  - keyspaces: []
 that nodetool will connect to.
: localhost
 port JMX is listening to for connections.
: 7199
 set of credentials to connect to the host. These are the credentials for the JMX server.
 the check to work, this user must have a read/write access so that nodetool can execute the `status` command
:
:
 list of additionnal tags to be sent with the metrics
: []
```

### Validation

[Run the Agent's `info` subcommand](https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information) and look for `cassandra_nodetool` under the Checks section:

    Checks
    ======

        cassandra_nodetool
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The `cassandra_nodetool` check is compatible with all major platforms

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The Cassandra_nodetool check does not include any event at this time.

### Service Checks

**cassandra.nodetool.node_up**:
The agent sends this service check for each node of the monitored cluster. Returns CRITICAL if the node is down, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [How to monitor Cassandra performance metrics](https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics/)
* [How to collect Cassandra metrics](https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics/)
* [Monitoring Cassandra with Datadog](https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog/)