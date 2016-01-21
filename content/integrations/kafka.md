---
title: Datadog-Apache Kafka Integration
integration_title: Apache Kafka
kind: integration
---

To capture Kafka metrics you need to install the Datadog Agent. Metrics will be captured using a JMX connection.
We recommend the use of Oracle's JDK for this integration.

This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in the info page. You can specify the metrics you are interested in by editing the configuration below. To learn how to customize the metrics to collect visit the JMX Checks documentation for more detailed instructions. If you need to monitor more metrics, please send us an email at support@datadoghq.com

* If you are using the Datadog Agent < 5.0.0, please look at the old documentation for more detailed instructions. The following instructions are for the Datadog Agent >= 5.0.0
* Configure the Agent to connect to Kafka

Edit `conf.d/kafka.yaml`

    instances:
    #    -   host: localhost
    #        port: 9999
    #        name: jmx_instance
    #        user: username
    #        password: password
    #        #java_bin_path: /path/to/java #Optional, should be set if the agent cannot find your java executable
    #        #trust_store_path: /path/to/trustStore.jks # Optional, should be set if ssl is enabled
    #        #trust_store_password: password


    init_config:
        is_jmx: true

        # Metrics collected by this check. You should not have to modify this.
        conf:
            #
            # Aggregate cluster stats
            #
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="BrokerTopicMetrics",name="AllTopicsBytesOutPerSec"'
                attribute:
                    MeanRate:
                        metric_type: counter
                        alias: kafka.net.bytes_out
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="BrokerTopicMetrics",name="AllTopicsBytesInPerSec"'
                attribute:
                    MeanRate:
                        metric_type: counter
                        alias: kafka.net.bytes_in
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="BrokerTopicMetrics",name="AllTopicsMessagesInPerSec"'
                attribute:
                    MeanRate:
                        metric_type: gauge
                        alias: kafka.messages_in

            #
            # Request timings
            #
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="BrokerTopicMetrics",name="AllTopicsFailedFetchRequestsPerSec"'
                attribute:
                    MeanRate:
                        metric_type: gauge
                        alias: kafka.request.fetch.failed
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="BrokerTopicMetrics",name="AllTopicsFailedProduceRequestsPerSec"'
                attribute:
                    MeanRate:
                        metric_type: gauge
                        alias: kafka.request.produce.failed
            - include:
                domain: '"kafka.network"'
                bean: '"kafka.network":type="RequestMetrics",name="Produce-TotalTimeMs"'
                attribute:
                    Mean:
                        metric_type: counter
                        alias: kafka.request.produce.time.avg
                    99thPercentile:
                        metric_type: counter
                        alias: kafka.request.produce.time.99percentile
            - include:
                domain: '"kafka.network"'
                bean: '"kafka.network":type="RequestMetrics",name="Fetch-TotalTimeMs"'
                attribute:
                    Mean:
                        metric_type: counter
                        alias: kafka.request.fetch.time.avg
                    99thPercentile:
                        metric_type: counter
                        alias: kafka.request.fetch.time.99percentile
            - include:
                domain: '"kafka.network"'
                bean: '"kafka.network":type="RequestMetrics",name="UpdateMetadata-TotalTimeMs"'
                attribute:
                    Mean:
                        metric_type: counter
                        alias: kafka.request.update_metadata.time.avg
                    99thPercentile:
                        metric_type: counter
                        alias: kafka.request.update_metadata.time.99percentile
            - include:
                domain: '"kafka.network"'
                bean: '"kafka.network":type="RequestMetrics",name="Metadata-TotalTimeMs"'
                attribute:
                    Mean:
                        metric_type: counter
                        alias: kafka.request.metadata.time.avg
                    99thPercentile:
                        metric_type: counter
                        alias: kafka.request.metadata.time.99percentile
            - include:
                domain: '"kafka.network"'
                bean: '"kafka.network":type="RequestMetrics",name="Offsets-TotalTimeMs"'
                attribute:
                    Mean:
                        metric_type: counter
                        alias: kafka.request.offsets.time.avg
                    99thPercentile:
                        metric_type: counter
                        alias: kafka.request.offsets.time.99percentile

            #
            # Replication stats
            #
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="ReplicaManager",name="ISRShrinksPerSec"'
                attribute:
                    MeanRate:
                        metric_type: counter
                        alias: kafka.replication.isr_shrinks
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="ReplicaManager",name="ISRExpandsPerSec"'
                attribute:
                    MeanRate:
                        metric_type: counter
                        alias: kafka.replication.isr_expands
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="ControllerStats",name="LeaderElectionRateAndTimeMs"'
                attribute:
                    MeanRate:
                        metric_type: counter
                        alias: kafka.replication.leader_elections
            - include:
                domain: '"kafka.server"'
                bean: '"kafka.server":type="ControllerStats",name="UncleanLeaderElectionsPerSec"'
                attribute:
                    MeanRate:
                        metric_type: counter
                        alias: kafka.replication.unclean_leader_elections

            #
            # Log flush stats
            #
            - include:
                domain: '"kafka.log"'
                bean: '"kafka.log":type="LogFlushStats",name="LogFlushRateAndTimeMs"'
                attribute:
                    MeanRate:
                        metric_type: counter
                        alias: kafka.log.flush_rate

And edit conf.d/kafka_consumer.yaml

    init_config:

    instances:
    #  -   kafka_connect_str: localhost:19092
    #      zk_connect_str: localhost:2181
    #      zk_prefix: /0.8
    #      consumer_groups:
    #        my_consumer:
    #          my_topic: [0, 1, 4, 12]

* Restart the Agent
* Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:


        Checks
        ======

          [...]

          kafka-localhost-9999
          --------------------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events

Not sure how to execute the last two steps? Visit the Agent Usage Guide for more detailed instructions.
