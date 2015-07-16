---
last_modified: 2015/07/13
translation_status: progress
language: ja
title: Datadog-Apache Kafka Integration
integration_title: Apache Kafka
kind: integration
doclevel:
---

Kafkaのメトリクスを取得するにはDatadog Agentのインストールが必要です。Kafkaのメトリクスは、JMXを通して取得されます。尚、JMXインテグレーションには、オラクルJDKの使用をお勧めします。

JMXインテグレーションには、取得メトリクス数の上限値として350が設定されています。現在収集しているメトリクスの数については、Infoページで確認出来ます。取得したいメトリクスは、以下に示す設定ファイルで指定可能です。取得するメトリクスのカスタマイズに関しては、JMXインテグレーションに関するドキュメントを参照してください。もしも350個以上のメトリクスを監視したい場合は、support@datadoghq.comまで連絡をください。

* 以下のドキュメントは、ver.5.0.0以降のDatadog Agentに対応しています。それ以前のバージョンに関しては、旧ドキュメントを参照してください。

1. Datadog Agentがkafka(JMX)からメトリクスを取得するように設定します。

    conf.d/kafka.yamlを以下のように編集します。

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

    更に、conf.d/kafka_consumer.yamlを編集します。

        init_config:

        instances:
        #  -   kafka_connect_str: localhost:19092
        #      zk_connect_str: localhost:2181
        #      zk_prefix: /0.8
        #      consumer_groups:
        #        my_consumer:
        #          my_topic: [0, 1, 4, 12]

2.  Datadog Agentを再起動します。

    datadog-agent restart

3. 設定が正しく完了しているか`info`コマンドを実行して確認します:

    datadog-agent info

    kafkaのセクションが次のように表示されれば設定は完了です。

        Checks
        ======

          [...]

          kafka-localhost-9999
          --------------------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events
