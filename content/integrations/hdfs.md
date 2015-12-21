---
title: Datadog-Hadoop HDFS Integration
integration_title: Hadoop HDFS
kind: integration
---

Capture HDFS metrics in Datadog to:

* Visualize key HDFS metrics
* Correlate HDFS performance with the rest of your applications

## Configuration
To configure the HDFS integration, copy hdfs.yaml.example if the conf.d directory to hdfs.yaml and make the appropriate changes. If you are running the agent locally and have not changed the default port, you may only want to configure the tags assigned to this host's hdfs metrics.

    init_config:
    # HDFS check does not require any init_config

    instances:
    # Each instance requires a namenode.
    # Port defaults to 8020.
    # When using HDFS in High Availabality mode
    # You can specify multiple urls and ports
    # WARNING: HA Mode is only available with Snakebite > 2.2.0
    # You have to manually install it with the following command:
    # sudo /opt/datadog-agent/embedded/bin/pip install --upgrade snakebite
    #
      - namenodes:
        - url: localhost
          port: 8020
    #     - url: namenode2.example.com # Optional, to be set when using HA Mode
    #       port: 8020 # Optional, to be set when using HA Mode
    #
    #     tags:
    #       - optional_tag

## Metrics Available
The metrics available are collected using df from Spotify's Snakebite. hdfs.in_use is calculated by dividing used by capacity.

    hdfs.used
    hdfs.free
    hdfs.capacity
    hdfs.in_use
    hdfs.under_replicated
    hdfs.missing_blocks
    hdfs.corrupt_blocks

You may experience reduced functionality if using hadoop before v2.2.0. For earlier versions, we need to use Snakebite v1.3.9. If using HA Mode, you may want to upgrade.
