---
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/spark/
git_integration_title: spark
guid: f7a5a40f-f73c-465a-be8f-b2b371c706a2
has_logo: true
integration_title: Spark
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: spark
public_title: Datadog-Spark Integration
short_description: Track failed task rates, shuffled bytes, and much more.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.2.0
---


{{< img src="integrations/spark/sparkgraph.png" alt="spark graph" responsive="true" popup="true">}}
## Overview

The Spark check collects metrics for:

- Drivers and executors: RDD blocks, memory used, disk used, duration, etc.
- RDDs: partition count, memory used, disk used
- Tasks: number of tasks active, skipped, failed, total
- Job state: number of jobs active, completed, skipped, failed

## Setup
### Installation

The Spark check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your:

- Mesos master (if you're running Spark on Mesos),
- YARN ResourceManager (if you're running Spark on YARN), or
- Spark master (if you're running Standalone Spark)


If you need the newest version of the Spark check, install the `dd-check-spark` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `spark.yaml` in the Agent's `conf.d` directory. See the [sample spark.yaml](https://github.com/DataDog/integrations-core/blob/master/spark/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - spark_url: http://localhost:8088 # Spark master web UI



    spark_cluster_mode: spark_standalone_mode # default is spark_yarn_mode



    cluster_name: <CLUSTER_NAME> # required; adds a tag 'cluster_name:<CLUSTER_NAME>' to all metrics



```

Set `spark_url` and `spark_cluster_mode` according to how you're running Spark.

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to start sending Spark metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `spark` under the Checks section:

```
  Checks
  ======
    [...]

    spark
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The spark check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "spark" >}}


### Events
The Spark check does not include any event at this time.

### Service Checks
The Agent submits one of the following service checks, depending on how you're running Spark:

- **spark.standalone_master.can_connect**
- **spark.mesos_master.can_connect**
- **spark.resource_manager.can_connect**

The checks return CRITICAL if the Agent cannot collect Spark metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Hadoop & Spark monitoring with Datadog](https://www.datadoghq.com/blog/monitoring-spark/)

