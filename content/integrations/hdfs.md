---
title: Datadog-Hadoop HDFS Integration
integration_title: Hadoop HDFS
kind: integration
git_integration_title: hdfs
newhlevel: true
---
# Overview

Capture NameNode and DataNode HDFS metrics in Datadog to:

* Visualize cluster health, performance and utilization.
* Analyze and inspect individual node utilization

# Configuration

*These steps only apply to the Datadog Agent >= 5.7.0, please refer to the conf.d/hdfs.yaml file for older versions of the Agent.*

1.  Configure the NameNode agent to connect to the JMX URI: Edit conf.d/hdfs_namenode.yaml

        init_config:

        instances:
          #
          # The HDFS NameNode check retrieves metrics from the HDFS NameNode's JMX
          # interface. This check must be installed on the NameNode. The HDFS
          # NameNode JMX URI is composed of the NameNode's hostname and port.
          #
          # The hostname and port can be found in the hdfs-site.xml conf file under
          # the property dfs.http.address or dfs.namenode.http-address
          #
          -  hdfs_namenode_jmx_uri: http://localhost:50070

2.  Configure the DataNode agent to connect to the JMX URI: Edit conf.d/hdfs_datanode.yaml

        init_config:

        instances:
          #
          # The HDFS DataNode check retrieves metrics from the HDFS DataNode's JMX
          # interface. This check must be installed on a HDFS DataNode. The HDFS
          # DataNode JMX URI is composed of the DataNode's hostname and port.
          #
          # The hostname and port can be found in the hdfs-site.xml conf file under
          # the property dfs.datanode.http.address
          #
          - hdfs_datanode_jmx_uri: http://localhost:50075

3.  Restart the Agent

# Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]
      hdfs_datanode
      -------------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events
      hdfs_namenode
      -------------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events




# Metrics

The metrics available are collected using df from Spotify's Snakebite. hdfs.in_use is calculated by dividing used by capacity.

<%= get_metrics_from_git()
%>

You may experience reduced functionality if using hadoop before v2.2.0. For earlier versions, we need to use Snakebite v1.3.9. If using HA Mode, you may want to upgrade.
