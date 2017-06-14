---
title: Datadog-Hadoop MapReduce Integration
integration_title: Hadoop MapReduce
kind: integration
git_integration_title: mapreduce
newhlevel: true
updated_for_agent: 5.8.0
---
# Overview

Capture MapReduce metrics to:

* Analyze and inspect individual MapReduce jobs and tasks.
* Visualize performance of individual tasks.

# Installation

Install Datadog Agent on the Master Node where the ResourceManager is running.

# Configuration

1.  Configure the agent to connect to the ResourceManager: Edit conf.d/mapreduce.yaml

        instances:
          # The MapReduce check retrieves metrics from YARN's ResourceManager. This
          # check must be run from the Master Node and the ResourceManager URI must
          # be specified below. The ResourceManager URI is composed of the
          # ResourceManager's hostname and port.
          # The ResourceManager port can be found in the yarn-site.xml conf file under
          # the property yarn.resourcemanager.webapp.address
          - resourcemanager_uri: http://localhost:8088

        init_config:
         general_counters:
            - counter_group_name: 'org.apache.hadoop.mapreduce.TaskCounter'
              counters:
                - counter_name: 'MAP_INPUT_RECORDS'
                - counter_name: 'MAP_OUTPUT_RECORDS'
                - counter_name: 'REDUCE_INPUT_RECORDS'
                - counter_name: 'REDUCE_OUTPUT_RECORDS'

            # Additional counter's can be specified as following
            # - counter_group_name: 'org.apache.hadoop.mapreduce.FileSystemCounter'
            #   counters:
            #     - counter_name: 'HDFS_BYTES_READ'

1.  Restart the Agent

{{< insert-example-links conf="mapreduce" check="mapreduce" >}}

# Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]

      mapreduce
      ---------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events

# Metrics

The metrics available are collected using df from Spotify's Snakebite. hdfs.in_use is calculated by dividing used by capacity.

<%= get_metrics_from_git()
%>
