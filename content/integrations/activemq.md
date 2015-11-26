---
title: Datadog-ActiveMQ Integration
integration_title: ActiveMQ
kind: integration
doclevel: complete
---

## Overview
{: #int-overview}

Get metrics from ActiveMQ in real time to

* Visualize your web ActiveMQ server performance
* Correlate the performance of ActiveMQ with the rest of your applications


## Configuration
{: #int-configuration}

***This integration requires Linux or Mac OS X.***

*To capture ActiveMQ metrics you need to install the Datadog agent. Metrics will be captured using a JMX connection. **We recommend the use of Oracle's JDK for this integration.***

1. **Make sure that [ JMX Remote is enabled][1] on your ActiveMQ server.**
2. Configure the agent to connect to ActiveMQ. Edit `${confd_help('`conf.d/activemq.yaml`')}`

        instances:
          - host: localhost
            port: 7199
            user: username
            password: password
            name: activemq_instance
        # List of metrics to be collected by the integration
        # You should not have to modify this.
        init_config:
          conf:
            - include:
              Type: Queue
              attribute:
                AverageEnqueueTime:
                  alias: activemq.queue.avg_enqueue_time
                  metric_type: gauge
                ConsumerCount:
                  alias: activemq.queue.consumer_count
                  metric_type: gauge
                ProducerCount:
                  alias: activemq.queue.producer_count
                  metric_type: gauge
                MaxEnqueueTime:
                  alias: activemq.queue.max_enqueue_time
                  metric_type: gauge
                MinEnqueueTime:
                  alias: activemq.queue.min_enqueue_time
                  metric_type: gauge
                MemoryPercentUsage:
                  alias: activemq.queue.memory_pct
                  metric_type: gauge
                QueueSize:
                  alias: activemq.queue.size
                  metric_type: gauge
                DequeueCount:
                  alias: activemq.queue.dequeue_count
                  metric_type: counter
                DispatchCount:
                  alias: activemq.queue.dispatch_count
                  metric_type: counter
                EnqueueCount:
                  alias: activemq.queue.enqueue_count
                  metric_type: counter
                ExpiredCount:
                  alias: activemq.queue.expired_count
                  type: counter
                InFlightCount:
                  alias: activemq.queue.in_flight_count
                  metric_type: counter

            - include:
              Type: Broker
              attribute:
                StorePercentUsage:
                  alias: activemq.broker.store_pct
                  metric_type: gauge
                TempPercentUsage:
                  alias: activemq.broker.temp_pct
                  metric_type: gauge
                MemoryPercentUsage:
                  alias: activemq.broker.memory_pct
                  metric_type: gauge
    {:.language-yaml}

3. Restart the agent

        sudo /etc/init.d/datadog-agent restart
    {:.language-shell}

        if [ $(sudo supervisorctl status | egrep "datadog-agent.*RUNNING" | wc -l) == 3 ]; \
        then echo -e "\e[0;32mAgent is running\e[0m"; \
        else echo -e "\e[031mAgent is not running\e[0m"; fi
    {:.language-shell}


[1]: http://activemq.apache.org/jmx.html
