---
title: Datadog-Cassandra Integration
integration_title: Cassandra
kind: integration
git_integration_title: cassandra
---

{{< img src="integrations/cassandra/cassandra.png" alt="Cassandra default dashboard" >}}

## Overview

Connect Cassandra to Datadog in order to:

* Visualize the performance of your clusters in real time
* Correlate the performance of Cassandra with the rest of your applications

Learn more about how to monitor Cassandra performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Cassandra.

For information on JMX Checks, please see <a href="http://docs.datadoghq.com/integrations/java/">here</a>.

## Installation

To capture Cassandra metrics you need to install the Datadog Agent. Metrics will be captured using a JMX connection. 
We recommend the use of Oracle's JDK for this integration. 

This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in the info page. You can specify the metrics you are interested in by editing the configuration below. To learn how to customize the metrics to collect visit the [JMX Checks documentation](https://docs.datadoghq.com/integrations/java/) for more detailed instructions. If you need to monitor more metrics, please send us an email at support@datadoghq.com

1. Configure the Agent to connect to Cassandra, just edit `conf.d/cassandra.yaml`:
{{< highlight yaml >}}
instances:
   -    host: localhost
        port: 7199
        user: username
        password: password
        name: cassandra_instance
        #trust_store_path: /path/to/trustStore.jks # Optional, should be set if ssl is enabled
        #trust_store_password: password
        #java_bin_path: /path/to/java #Optional, should be set if the agent cannot find your java executable

# List of metrics to be collected by the integration
# Visit http://docs.datadoghq.com/integrations/java/ to customize it
init_config:
  conf:
    - include:
        domain: org.apache.cassandra.metrics
        type: ClientRequest
        scope:
          - Read
          - Write
        name:
          - Latency
          - Timeouts
          - Unavailables
        attribute:
          - Count
          - OneMinuteRate
    - include:
        domain: org.apache.cassandra.metrics
        type: ClientRequest
        scope:
          - Read
          - Write
        name:
          - TotalLatency
    - include:
        domain: org.apache.cassandra.metrics
        type: Storage
        name:
          - Load
          - Exceptions
    - include:
        domain: org.apache.cassandra.metrics
        type: ColumnFamily
        bean_regex:
          - .*keyspace=.*
        name:
          - TotalDiskSpaceUsed
          - BloomFilterDiskSpaceUsed
          - BloomFilterFalsePositives
          - BloomFilterFalseRatio
          - CompressionRatio
          - LiveDiskSpaceUsed
          - LiveSSTableCount
          - MaxRowSize
          - MeanRowSize
          - MemtableColumnsCount
          - MemtableLiveDataSize
          - MemtableSwitchCount
          - MinRowSize
      exclude:
        keyspace:
          - OpsCenter
          - system
          - system_auth
          - system_distributed
          - system_schema
          - system_traces
    - include:
        domain: org.apache.cassandra.metrics
        type: Cache
        name:
          - Capacity
          - Size
        attribute:
          - Value
    - include:
        domain: org.apache.cassandra.metrics
        type: Cache
        name:
          - Hits
          - Requests
        attribute:
          - Count
    - include:
        domain: org.apache.cassandra.metrics
        type: ThreadPools
        path: request
        name:
          - ActiveTasks
          - CompletedTasks
          - PendingTasks
          - CurrentlyBlockedTasks
    - include:
        domain: org.apache.cassandra.db
        attribute:
          - UpdateInterval
{{< /highlight >}}

3. Restart the Agent

{{< insert-example-links check="none" >}}

## Validation 

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell >}}
Checks
======

  [...]

  cassandra
  ---------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}


## Metrics

{{< get-metrics-from-git >}}
