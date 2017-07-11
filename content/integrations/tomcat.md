---
title: Datadog-Tomcat Integration
integration_title: Tomcat
git_integration_title: tomcat
kind: integration
newhlevel: true
updated_for_agent: 5.8.5
---
## Overview

Get metrics from Tomcat in real time to:

* Visualize your web server performance
* Correlate the performance of Tomcat with the rest of your applications

## Installation

Metrics will be captured using a JMX connection. Due to [an issue with the OpenJDK and Tomcat](https://bugs.launchpad.net/ubuntu/+source/openjdk-6/+bug/1099903), we recommend the use of Oracle's JDK for this integration.

This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in the info page. You can specify the metrics you are interested in by editing the configuration below. To learn how to customize the metrics to collect visit the JMX Checks documentation for more detailed instructions. If you need to monitor more metrics, please send us an email at support@datadoghq.com

Make sure that JMX Remote is enabled on your Tomcat server. For information on JMX , please see [the JMX integration documentation](http://docs.datadoghq.com/integrations/java/).

## Configuration

1.  Configure the Agent to connect to Tomcat. Edit conf.d/tomcat.yaml:

        instances:
          - host: localhost
            port: 9012
          #   name: tomcat_instance
          #   # java_bin_path: /path/to/java
          #   # java_options: "-Xmx200m -Xms50m"
          #   # trust_store_path: /path/to/trustStore.jks
          #   # trust_store_password: password
          #   tags:
          #     env: stage
          #     newTag: test

        init_config:
          conf:
            - include:
                type: ThreadPool
                attribute:
                  maxThreads:
                    alias: tomcat.threads.max
                    metric_type: gauge
                  currentThreadCount:
                    alias: tomcat.threads.count
                    metric_type: gauge
                  currentThreadsBusy:
                    alias: tomcat.threads.busy
                    metric_type: gauge
            - include:
                type: GlobalRequestProcessor
                attribute:
                  bytesSent:
                    alias: tomcat.bytes_sent
                    metric_type: counter
                  bytesReceived:
                    alias: tomcat.bytes_rcvd
                    metric_type: counter
                  errorCount:
                    alias: tomcat.error_count
                    metric_type: counter
                  requestCount:
                    alias: tomcat.request_count
                    metric_type: counter
                  maxTime:
                    alias: tomcat.max_time
                    metric_type: gauge
                  processingTime:
                    alias: tomcat.processing_time
                    metric_type: counter
            - include:
                j2eeType: Servlet
                attribute:
                  processingTime:
                    alias: tomcat.servlet.processing_time
                    metric_type: counter
                  errorCount:
                    alias: tomcat.servlet.error_count
                    metric_type: counter
                  requestCount:
                    alias: tomcat.servlet.request_count
                    metric_type: counter
            - include:
                type: Cache
                attribute:
                  accessCount:
                    alias: tomcat.cache.access_count
                    metric_type: counter
                  hitsCounts:
                    alias: tomcat.cache.hits_count
                    metric_type: counter
            - include:
                type: JspMonitor
                attribute:
                  jspCount:
                    alias: tomcat.jsp.count
                    metric_type: counter
                  jspReloadCount:
                    alias: tomcat.jsp.reload_count
                    metric_type: counter

1.  Restart the Agent

### Configuration Options

* `user` and `password` (Optional) - Username and password.
* `process_name_regex` - (Optional) - Instead of specifying a host and port or jmx_url, the agent can connect using the attach api. This requires the JDK to be installed and the path to tools.jar to be set.
* `tools_jar_path` - (Optional) - To be set when process_name_regex is set.
* `java_bin_path` - (Optional) - Should be set if the agent cannot find your java executable.
* `java_options` - (Optional) - Java JVM options
* `trust_store_path` and `trust_store_password` - (Optional) - Should be set if ssl is enabled.

The `conf` parameter is a list of dictionaries. Only 2 keys are allowed in this dictionary:

* `include` (**mandatory**): Dictionary of filters, any attribute that matches these filters will be collected unless it also matches the "exclude" filters (see below)
* `exclude` (**optional**): Another dictionary of filters. Attributes that match these filters won't be collected

For a given bean, metrics get tagged in the following manner:

    mydomain:attr0=val0,attr1=val1

Your metric will be mydomain (or some variation depending on the attribute inside the bean) and have the tags `attr0:val0, attr1:val1, domain:mydomain`.

If you specify an alias in an `include` key that is formatted as *camel case*, it will be converted to *snake case*. For example, `MyMetricName` will be shown in Datadog as `my_metric_name`.

### The `attribute` filter

The `attribute` filter can accept two types of values:

* A dictionary whose keys are attributes names:

      conf:
        - include:
            attribute:
              maxThreads:
                alias: tomcat.threads.max
                metric_type: gauge
              currentThreadCount:
                alias: tomcat.threads.count
                metric_type: gauge
              bytesReceived:
                alias: tomcat.bytes_rcvd
                metric_type: counter

In that case you can specify an alias for the metric that will become the metric name in Datadog. You can also specify the metric type either a gauge or a counter. If you choose counter, a rate per second will be computed for this metric.

* A list of attributes names:

      conf:
        - include:
            domain: org.apache.cassandra.db
            attribute:
              - BloomFilterDiskSpaceUsed
              - BloomFilterFalsePositives
              - BloomFilterFalseRatio
              - Capacity
              - CompressionRatio
              - CompletedTasks
              - ExceptionCount
              - Hits
              - RecentHitRate

In that case:

  * The metric type will be a gauge
  * The metric name will be jmx.\[DOMAIN_NAME].\[ATTRIBUTE_NAME]

Here is another filtering example:

    instances:
      - host: 127.0.0.1
        name: jmx_instance
        port: 9999

    init_config:
      conf:
        - include:
            bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
            attribute:
              - OneMinuteRate
              - 75thPercentile
              - 95thPercentile
              - 99thPercentile


### Note

List of filters is only supported in Datadog Agent > 5.3.0. If you are using an older version, please use singletons and multiple `include` statements instead.

    # Datadog Agent > 5.3.0
      conf:
        - include:
            domain: domain_name
            bean:
              - first_bean_name
              - second_bean_name

    # Older Datadog Agent versions
      conf:
        - include:
            domain: domain_name
            bean: first_bean_name
        - include:
            domain: domain_name
            bean: second_bean_name



### Commands to view the metrics that are available:

The `datadog-agent jmx` command was added in version 4.1.0.

  * List attributes that match at least one of your instances configuration:
`sudo /etc/init.d/datadog-agent jmx list_matching_attributes`
  * List attributes that do match one of your instances configuration but that are not being collected because it would exceed the number of metrics that can be collected:
`sudo /etc/init.d/datadog-agent jmx list_limited_attributes`
  * List attributes that will actually be collected by your current instances configuration:
`sudo /etc/init.d/datadog-agent jmx list_collected_attributes`
  * List attributes that don't match any of your instances configuration:
`sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes`
  * List every attributes available that has a type supported by JMXFetch:
`sudo /etc/init.d/datadog-agent jmx list_everything`
  * Start the collection of metrics based on your current configuration and display them in the console:
`sudo /etc/init.d/datadog-agent jmx collect`


{{< insert-example-links check="none" >}}


## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]

      tomcat
      ------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events


## Metrics

{{< get-metrics-from-git >}}
