---
title: Datadog-Java/JMX Integration
integration_title: Java/JMX
kind: integration
git_integration_title: java
newhlevel: true
updated_for_agent: 5.8.5
---

# Introduction

The JMX integration collects metrics from applications that expose [JMX](http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html) metrics.

A lightweight Java plugin named JMXFetch is called by the Datadog Agent to connect to the MBean Server and to collect these metrics. This plugin sends metrics to the Datadog Agent using the Dogstatsd server running within the Agent. This functionality is also leveraged in the integrations for ActiveMQ, Cassandra, Solr, and Tomcat.

JMXFetch also sends service checks that report on the status of your monitored instances.

JMX Checks have a limit of 350 metrics per instance which should be enough to satisfy your needs as it's  easy to customize which metrics you want to collect.

# Installation

Make sure you can open a [JMX remote connection](http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html).

# Configuration

1.  Configure the Agent to connect using JMX and edit it according to your needs. Here is a sample jmx.yaml file:

        init_config:
          custom_jar_paths: # optional
            - /path/to/custom/jarfile.jar
          #is_jmx: true

        instances:
          - host: localhost
            port: 7199
            user: username
            password: password

            jmx_url: "service:jmx:rmi:///jndi/rmi://myhost.host:9999/custompath" # optional

            name: jmx_instance  # optional
            java_bin_path: /path/to/java
            java_options: "-Xmx200m -Xms50m"
            trust_store_path: /path/to/trustStore.jks
            trust_store_password: password

            process_name_regex: .*process_name.*
            tools_jar_path: /usr/lib/jvm/java-7-openjdk-amd64/lib/tools.jar
            refresh_beans: 600 # optional (in seconds)
            tags:
              env: stage
              newTag: test

            conf:
              - include:
                  domain: my_domain
                  bean:
                    - my_bean
                    - my_second_bean
                  attribute:
                    attribute1:
                      metric_type: counter
                      alias: jmx.my_metric_name
                    attribute2:
                      metric_type: gauge
                      alias: jmx.my2ndattribute
              - include:
                  domain: 2nd_domain
                exclude:
                  bean:
                    - excluded_bean
              - include:
                  domain_regex: regex_on_domain
                exclude:
                  bean_regex:
                    - regex_on_excluded_bean


## Configuration Options

* `custom_jar_paths` (Optional) - Allows specifying custom jars that will be added to the classpath of the agent's JVM.
* `jmx_url` - (Optional) - If the agent needs to connect to a non-default JMX URL, specify it here instead of a host and a port. If you use this you need to specify a 'name' for the instance.
* `is_jmx` (Optional) - Allows creating different configuration files for each application rather than using a single long jmx file. Include the option in each configuration file.
* `name` - (Optional) - Used in conjunction with `jmx_url`.
* `java_bin_path` - (Optional) - Should be set if the agent cannot find your java executable.
* `java_options` - (Optional) - Java JVM options
* `trust_store_path` and `trust_store_password` - (Optional) - Should be set if ssl is enabled.
* `process_name_regex` - (Optional) - Instead of specifying a host and port or jmx_url, the agent can connect using the attach api. This requires the JDK to be installed and the path to tools.jar to be set.
* `tools_jar_path` - (Optional) - To be set when process_name_regex is set.
* `refresh_beans` - (Optional) - Refresh period for refreshing the matching MBeans list.  Default is 600 seconds.  Decreasing this value may result in increased CPU usage.

The `conf` parameter is a list of dictionaries. Only 2 keys are allowed in this dictionary:

* `include` (**mandatory**): Dictionary of filters, any attribute that matches these filters will be collected unless it also matches the "exclude" filters (see below)
* `exclude` (**optional**): Another dictionary of filters. Attributes that match these filters won't be collected

For a given bean, metrics get tagged in the following manner:

    mydomain:attr0=val0,attr1=val1

Your metric will be mydomain (or some variation depending on the attribute inside the bean) and have the tags `attr0:val0, attr1:val1, domain:mydomain`.

If you specify an alias in an `include` key that is formatted as *camel case*, it will be converted to *snake case*. For example, `MyMetricName` will be shown in Datadog as `my_metric_name`.

## Description of the filters

Each `include` or `exclude` dictionary supports the following keys:

* `domain`: a list of domain names (e.g. `java.lang`)
* `domain_regex`: a list of regexes on the domain name (e.g. `java\.lang.*`)
* `bean` or `bean_name`: A list of full bean names (e.g. `java.lang:type=Compilation`)
* `bean_regex`: A list of regexes on the full bean names (e.g. `java\.lang.*[,:]type=Compilation.*`)
* `attribute`: A list or a dictionary of attribute names (see below for more details)

The regexes defined in `domain_regex` and `bean_regex` must conform to [Java's regular expression format](http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html).

The `domain_regex` and `bean_regex` filters were added in version 5.5.0.

On top of these parameters, the filters support "custom" keys which means that you can filter by bean parameters. For example, if you want to collect metrics regarding the Cassandra cache, you could use the `type: - Caches` filter:

    conf:
    - include:
        domain: org.apache.cassandra.db
        type:
          - Caches

## The `attribute` filter

The `attribute` filter can accept two types of values:

*   A dictionary whose keys are attributes names:

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

*   A list of attributes names:

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


## Note

List of filters is only supported in Datadog Agent > 5.3.0. If you are using an older version, please use singletons and multiple `include` statements instead.

    # Datadog Agent > 5.3.0
      conf:
        - include:
            domain: domain_name
            bean:
              - first_bean_name
              - second_bean_name
    ...


    # Older Datadog Agent versions
      conf:
        - include:
            domain: domain_name
            bean: first_bean_name
        - include:
            domain: domain_name
            bean: second_bean_name
    ...

## Commands to view the metrics that are available:

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

For more details about configuring this integration refer to the following file(s) on GitHub:

* [Java/JMX YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/jmx.yaml.example)

<!-- <%= insert_example_links(conf: "jmx", check: "none")%> -->

# Validation

JMX Checks have a default configuration that will collect 11 metrics from your JMX application. A few of these metrics are: `jvm.heap_memory`, `jvm.non_heap_memory`, `jvm.gc.cms.count`... So seeing these metrics is a sign that JMXFetch is properly running.

# Metrics

<%= get_metrics_from_git()%>


# Troubleshooting

## The 350 metric limit

Due to the nature of these integrations, it is possible to submit an extremely high number of metrics directly to Datadog. What we've found in speaking with many customers is that some of these metrics are not needed; thus, we've set the limit at 350 metrics.

To see what you're collecting and get below the limit, begin by using the commands seen above to investigate what metrics are available. We then recommend creating filters to refine what metrics are collected. If you believe you need more than 350 metrics, please reach out to [support@datadoghq.com](mailto:support@datadoghq.com).

## Java Path

The agent does not come with a bundled JVM, but will use the one installed on your system. Therefore you must make sure that the Java home directory is present in the path of the user running the agent.

Alternatively, you can specify the JVM path in the integration's configuration file:

    java_bin_path: /path/to/java


## Monitoring JBoss/WildFly applications

The following instructions will work on version 5.6.0 (and higher) of the Agent

JBoss/WildFly applications expose JMX over a specific protocol (Remoting JMX) that is not bundled by default with JMXFetch. To allow JMXFetch to connect to these applications, configure it as follows:

  1. Locate the `jboss-cli-client.jar` file on your JBoss/WildFly server (by default, its path should be `$JBOSS_HOME/bin/client/jboss-cli-client.jar`).
  2. If JMXFetch is running on a different host than the JBoss/WildFly application, copy `jboss-cli-client.jar` to a location on the host JMXFetch is running on.
  3. Add the path of the jar to the `init_config` section of your configuration:

    # Datadog Agent >= 5.6.0

    init_config:
      custom_jar_paths:
        - /path/to/jboss-cli-client.jar


  4. Specify a custom URL that JMXFetch will connect to, in the `instances` section of your configuration:

    # Datadog Agent >= 5.6.0

    # The jmx_url may be different depending on the version of JBoss/WildFly you're using
    # and the way you've set up JMX on your server
    # Please refer to the relevant documentation of JBoss/WildFly for more information
    instances:
      - jmx_url: "service:jmx:remoting-jmx://localhost:9999"
        name: jboss-application  # Mandatory, but can be set to any value,
                                 # will be used to tag the metrics pulled from that instance


  5. Restart the agent: `sudo /etc/init.d/datadog-agent`

## Monitoring Tomcat with JMX Remote Lifecycle Listener enabled

The following instructions will work on version 5.6.0 (and higher) of the Agent

If you're using Tomcat with JMX Remote Lifecycle Listener enabled (see the [Tomcat documentation](https://tomcat.apache.org/tomcat-7.0-doc/config/listeners.html#JMX_Remote_Lifecycle_Listener_-_org.apache.catalina.mbeans.JmxRemoteLifecycleListener) for more information), JMXFetch will need some extra setup to be able to connect to your Tomcat application.

  1. Locate the `catalina-jmx-remote.jar` file on your Tomcat server (by default, its path should be `$CATALINA_HOME/lib`).
  2. If JMXFetch is running on a different host than the Tomcat application, copy `catalina-jmx-remote.jar` to a location on the host JMXFetch is running on.
  3. Add the path of the jar to the `init_config` section of your configuration:

    # Datadog Agent >= 5.6.0

    init_config:
      custom_jar_paths:
        - /path/to/catalina-jmx-remote.jar


  4. Specify a custom URL that JMXFetch will connect to, in the `instances` section of your configuration:

    # Datadog Agent >= 5.6.0

    # The jmx_url may be different depending on the way you've set up JMX on your Tomcat server
    instances:
      - jmx_url: "service:jmx:rmi://:10002/jndi/rmi://:10001/jmxrmi"
        name: tomcat-application  # Mandatory, but can be set to any arbitrary value,
                                  # will be used to tag the metrics pulled from that instance


  5. Restart the agent: `sudo /etc/init.d/datadog-agent`







