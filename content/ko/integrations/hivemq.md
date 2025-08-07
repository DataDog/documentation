---
app_id: hivemq
categories:
- iot
- 로그 수집
- 메시지 대기열
custom_kind: 통합
description: HiveMQ 클러스터를 모니터링하세요.
further_reading:
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: 블로그
  text: HiveMQ와 OpenTelemetry를 사용하여 Datadog에서 IoT 애플리케이션을 모니터링합니다.
integration_version: 2.1.0
media: []
supported_os:
- 리눅스
- windows
- macos
title: HiveMQ
---
## 개요

[HiveMQ](https://www.hivemq.com/hivemq/) is a MQTT based messaging platform designed for the fast, efficient and reliable movement
of data to and from connected IoT devices. It is a MQTT 3.1, 3.1.1, and 5.0 compliant broker.

## 설정

### 설치

The HiveMQ check is included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package.
No additional installation is needed on your server.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. 루트의 `conf.d/` 폴더에 있는 `hivemq.d/conf.yaml` 파일을 편집합니다.
   에이전트의 설정 디렉터리를 사용하여 HiveMQ 성능 데이터 수집을 시작하세요.
   See the [sample hivemq.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example) for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated in [the status page](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information).
   아래 설정을 편집해 관심 있는 메트릭을 지정할 수 있습니다.
   To learn how to customize the metrics to collect see the [JMX Checks documentation](https://docs.datadoghq.com/integrations/java) for more detailed instructions.
   If you need to monitor more metrics, contact [Datadog support](https://docs.datadoghq.com/help).

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. Add the following configuration block to your `hivemq.d/conf.yaml` file. Change the `path` and `service` parameter values based on your environment. See the [sample hivemq.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example) for all available configuration options.

   ```yaml
   logs:
     - type: file
       path: /var/log/hivemq.log
       source: hivemq
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

##### 메트릭 수집

For containerized environments, see the [Autodiscovery with JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent) guide.

##### 로그 수집

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker log collection](https://docs.datadoghq.com/agent/docker/log/).

| 파라미터      | 값                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hivemq", "service": "<SERVICE_NAME>"}` |

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `hivemq` under the **JMXFetch** section:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hivemq
      instance_name : hivemq-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

{{% /tab %}}

{{< /tabs >}}

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **hivemq.cache.payload_persistence.average_load_penalty** <br>(gauge) | Cache statistic capturing the average load penalty of the payload persistence cache|
| **hivemq.cache.payload_persistence.eviction_count** <br>(gauge) | Cache statistic capturing the eviction count of the payload persistence cache|
| **hivemq.cache.payload_persistence.hit_count** <br>(gauge) | Cache statistic capturing the hit count of the payload persistence cache<br>_Shown as hit_ |
| **hivemq.cache.payload_persistence.hit_rate** <br>(gauge) | Cache statistic capturing the hit rate of the payload persistence cache|
| **hivemq.cache.payload_persistence.load_count** <br>(gauge) | Cache statistic capturing the load count of the payload persistence cache|
| **hivemq.cache.payload_persistence.load_exception_count** <br>(gauge) | Cache statistic capturing the load exception count of the payload persistence cache|
| **hivemq.cache.payload_persistence.load_exception_rate** <br>(gauge) | Cache statistic capturing the load exception rate of the payload persistence cache|
| **hivemq.cache.payload_persistence.load_success_count** <br>(gauge) | Cache statistic capturing the load success count of the payload persistence cache|
| **hivemq.cache.payload_persistence.miss_count** <br>(gauge) | Cache statistic capturing the miss count of the payload persistence cache|
| **hivemq.cache.payload_persistence.miss_rate** <br>(gauge) | Cache statistic capturing the miss rate of the payload persistence cache|
| **hivemq.cache.payload_persistence.request_count** <br>(gauge) | Cache statistic capturing the request count of the payload persistence cache|
| **hivemq.cache.payload_persistence.total_load_time** <br>(gauge) | Cache statistic capturing the total load time of the payload persistence cache|
| **hivemq.cache.shared_subscription.average_load_penalty** <br>(gauge) | Cache statistic capturing the average load penalty of the shared subscription cache|
| **hivemq.cache.shared_subscription.eviction_count** <br>(gauge) | Cache statistic capturing the eviction count of the shared subscription cache|
| **hivemq.cache.shared_subscription.hit_count** <br>(gauge) | Cache statistic capturing the hit count of the shared subscription cache|
| **hivemq.cache.shared_subscription.hit_rate** <br>(gauge) | Cache statistic capturing the hit rate of the shared subscription cache|
| **hivemq.cache.shared_subscription.load_count** <br>(gauge) | Cache statistic capturing the load count of the shared subscription cache|
| **hivemq.cache.shared_subscription.load_exception_count** <br>(gauge) | Cache statistic capturing the load exception count of the shared subscription cache|
| **hivemq.cache.shared_subscription.load_exception_rate** <br>(gauge) | Cache statistic capturing the load exception rate of the shared subscription cache|
| **hivemq.cache.shared_subscription.load_success_count** <br>(gauge) | Cache statistic capturing the load success count of the shared subscription cache|
| **hivemq.cache.shared_subscription.miss_count** <br>(gauge) | Cache statistic capturing the miss count of the shared subscription cache|
| **hivemq.cache.shared_subscription.miss_rate** <br>(gauge) | Cache statistic capturing the miss rate of the shared subscription cache|
| **hivemq.cache.shared_subscription.request_count** <br>(gauge) | Cache statistic capturing the request count of the shared subscription cache|
| **hivemq.cache.shared_subscription.total_load_time** <br>(gauge) | Cache statistic capturing the total load time of the shared subscription cache|
| **hivemq.cluster.name_request.retry.count** <br>(count) | Counts the amount of retry until a name for a node via it's address is resolved|
| **hivemq.cpu_cores.licensed** <br>(gauge) | Holds the maximum amount of cpu cores allowed by license|
| **hivemq.cpu_cores.used** <br>(gauge) | Holds the current amount of cpu cores used|
| **hivemq.extension.managed_executor.running** <br>(count) | Measures the current count of running jobs in the ManagedExtensionExecutor|
| **hivemq.extension.managed_executor.scheduled.overrun** <br>(count) | Measures the current count of jobs in the ManagedExtensionExecutor that are overrun|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.50th_percentile** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.75th_percentile** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.95th_percentile** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.98th_percentile** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.999th_percentile** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.99th_percentile** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.count** <br>(count) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.max** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.mean** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.min** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.snapshot_size** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.std_dev** <br>(gauge) | Measures how many percent of the scheduled period the ManagedExtensionExecutorService jobs lasted|
| **hivemq.extension.services.publish_service_publishes** <br>(count) | Counts the amount of publish messages sent by the publish service.|
| **hivemq.extension.services.publish_service_publishes_to_client** <br>(count) | Counts the amount of publish messages sent by the publish service to a specific client.|
| **hivemq.extension.services.rate_limit_exceeded.count** <br>(count) | Counts the amount of times that the extension service rate limit was exceeded.|
| **hivemq.keep_alive.disconnect.count** <br>(count) | Counts every closed connection that was closed because the client missed sending PINGREQ message during the keep-alive interval|
| **hivemq.messages.dropped.count** <br>(count) | Counts every dropped message.|
| **hivemq.messages.dropped.internal_error.count** <br>(count) | Counts PUBLISH messages that have been dropped, because of an internal error.|
| **hivemq.messages.dropped.message_too_large.count** <br>(count) | Counts PUBLISH messages that have been dropped, because the message size was too large for the client|
| **hivemq.messages.dropped.mqtt_packet_too_large.count** <br>(count) | Counts MQTT messages (except PUBLISH) that have been dropped, because the message size was too large for the client.|
| **hivemq.messages.dropped.not_writable.count** <br>(count) | Counts PUBLISH messages that have been dropped, because the socket for the client was not writable (only QoS 0).|
| **hivemq.messages.dropped.publish_inbound_intercepted.count** <br>(count) | Counts PUBLISH messages that have been dropped, because a Publish Inbound Interceptor prevented onward delivery.|
| **hivemq.messages.dropped.qos_0_memory_exceeded.count** <br>(count) | Counts PUBLISH messages that have been dropped, because the global memory limit for QoS 0 messages has been exceeded.|
| **hivemq.messages.dropped.queue_full.count** <br>(count) | Counts PUBLISH messages that have been dropped, because the message queue for a disconnected persistent session client was full.|
| **hivemq.messages.expired_messages** <br>(count) | Counts every expired message|
| **hivemq.messages.incoming.auth.count** <br>(count) | Counts every incoming MQTT AUTH message|
| **hivemq.messages.incoming.connect.count** <br>(count) | Counts every incoming MQTT CONNECT message|
| **hivemq.messages.incoming.connect.mqtt3.count** <br>(count) | Counts every incoming MQTT 3 CONNECT message|
| **hivemq.messages.incoming.connect.mqtt5.count** <br>(count) | Counts every incoming MQTT 5 CONNECT message|
| **hivemq.messages.incoming.disconnect.count** <br>(count) | Counts every incoming MQTT DISCONNECT message|
| **hivemq.messages.incoming.pingreq.count** <br>(count) | Counts every incoming MQTT PINGREQ message|
| **hivemq.messages.incoming.puback.count** <br>(count) | Counts every incoming MQTT PUBACK message|
| **hivemq.messages.incoming.pubcomp.count** <br>(count) | Counts every incoming MQTT PUBCOMP message|
| **hivemq.messages.incoming.publish.bytes.50th_percentile** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.75th_percentile** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.95th_percentile** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.98th_percentile** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.999th_percentile** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.99th_percentile** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.count** <br>(count) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.max** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.mean** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.min** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.snapshot_size** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.bytes.std_dev** <br>(gauge) | Measures the distribution of incoming MQTT message size (including MQTT packet headers)|
| **hivemq.messages.incoming.publish.count** <br>(count) | Counts every incoming MQTT PUBLISH message|
| **hivemq.messages.incoming.pubrec.count** <br>(count) | Counts every incoming MQTT PUBREC message|
| **hivemq.messages.incoming.pubrel.count** <br>(count) | Counts every incoming MQTT PUBREL message|
| **hivemq.messages.incoming.subscribe.count** <br>(count) | Counts every incoming MQTT SUBSCRIBE message|
| **hivemq.messages.incoming.total.bytes.50th_percentile** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.75th_percentile** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.95th_percentile** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.98th_percentile** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.999th_percentile** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.99th_percentile** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.count** <br>(count) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.max** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.mean** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.min** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.snapshot_size** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.bytes.std_dev** <br>(gauge) | Measures the size distribution of incoming MQTT messages (including MQTT packet headers)|
| **hivemq.messages.incoming.total.count** <br>(count) | Counts every incoming MQTT message|
| **hivemq.messages.incoming.unsubscribe.count** <br>(count) | Counts every incoming MQTT UNSUBSCRIBE message|
| **hivemq.messages.outgoing.auth.count** <br>(count) | Counts every outgoing MQTT AUTH message|
| **hivemq.messages.outgoing.connack.count** <br>(count) | Counts every outgoing MQTT CONNACK message|
| **hivemq.messages.outgoing.disconnect.count** <br>(count) | Counts every outgoing MQTT DISCONNECT message|
| **hivemq.messages.outgoing.pingresp.count** <br>(count) | Counts every outgoing MQTT PINGRESP message|
| **hivemq.messages.outgoing.puback.count** <br>(count) | Counts every outgoing MQTT PUBACK message|
| **hivemq.messages.outgoing.pubcomp.count** <br>(count) | Counts every outgoing MQTT PUBCOMP message|
| **hivemq.messages.outgoing.publish.bytes.50th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.75th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.95th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.98th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.999th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.99th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.count** <br>(count) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.max** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.mean** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.min** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.snapshot_size** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.bytes.std_dev** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.publish.count** <br>(count) | Counts every outgoing MQTT PUBLISH message|
| **hivemq.messages.outgoing.pubrec.count** <br>(count) | Counts every outgoing MQTT PUBREC message|
| **hivemq.messages.outgoing.pubrel.count** <br>(count) | Counts every outgoing MQTT PUBREL message|
| **hivemq.messages.outgoing.suback.count** <br>(count) | Counts every outgoing MQTT SUBACK message|
| **hivemq.messages.outgoing.total.bytes.50th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.75th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.95th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.98th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.999th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.99th_percentile** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.count** <br>(count) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.max** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.mean** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.min** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.snapshot_size** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.bytes.std_dev** <br>(gauge) | Measures the size distribution of outgoing MQTT messages (including MQTT packet headers)|
| **hivemq.messages.outgoing.total.count** <br>(count) | Counts every outgoing MQTT message|
| **hivemq.messages.outgoing.unsuback.count** <br>(count) | Counts every outgoing MQTT UNSUBACK message|
| **hivemq.messages.pending.qos_0.count** <br>(gauge) | The current number of pending qos 0 messages|
| **hivemq.messages.pending.total.count** <br>(gauge) | The current number of pending messages total|
| **hivemq.messages.queued.count** <br>(gauge) | The current number of queued messages|
| **hivemq.messages.retained.current** <br>(gauge) | The current amount of retained messages|
| **hivemq.messages.retained.mean.50th_percentile** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.75th_percentile** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.95th_percentile** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.98th_percentile** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.999th_percentile** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.99th_percentile** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.count** <br>(count) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.max** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.mean** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.min** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.snapshot_size** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.mean.std_dev** <br>(gauge) | Metrics about the mean payload-size of retained messages in bytes|
| **hivemq.messages.retained.pending.total.count** <br>(gauge) | The current number of pending retained messages total|
| **hivemq.messages.retained.queued.count** <br>(gauge) | The current number of queued retained messages|
| **hivemq.networking.bytes.read.current** <br>(gauge) | The current (last 5 seconds) amount of read bytes|
| **hivemq.networking.bytes.read.total** <br>(gauge) | The total amount of read bytes|
| **hivemq.networking.bytes.write.current** <br>(gauge) | The current (last 5 seconds) amount of written bytes|
| **hivemq.networking.bytes.write.total** <br>(gauge) | Total amount of written bytes|
| **hivemq.networking.connections.current** <br>(gauge) | The current total number of active MQTT connections|
| **hivemq.networking.connections.mean.50th_percentile** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.75th_percentile** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.95th_percentile** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.98th_percentile** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.999th_percentile** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.99th_percentile** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.count** <br>(count) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.max** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.mean** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.min** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.snapshot_size** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections.mean.std_dev** <br>(gauge) | The mean total number of active MQTT connections|
| **hivemq.networking.connections_closed.graceful.count** <br>(count) | Counts clients which disconnected after sending a DISCONNECT Message|
| **hivemq.networking.connections_closed.total.count** <br>(count) | Counts all clients which disconnected from HiveMQ (= graceful + ungraceful)|
| **hivemq.networking.connections_closed.ungraceful.count** <br>(count) | Counts clients which disconnected without sending a DISCONNECT Message|
| **hivemq.overload_protection.clients.average_credits** <br>(gauge) | Holds the average amount of available credits between all clients|
| **hivemq.overload_protection.clients.backpressure_active** <br>(gauge) | Holds the current amount of clients for which backpressure is applied by overload protection|
| **hivemq.overload_protection.clients.using_credits** <br>(gauge) | Holds the current amount of clients having less than the full amount of credits|
| **hivemq.overload_protection.credits.per_tick** <br>(gauge) | Holds the current amount of credits a client receives per tick|
| **hivemq.overload_protection.level** <br>(gauge) | Holds the current level of overload protection|
| **hivemq.payload_persistence.cleanup_executor.running** <br>(count) | Counts tasks that are currently running in the scheduler in charge of the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.overrun** <br>(count) | Counts the periodic tasks which ran longer then their time frame allowed in the scheduler in charge of the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.50th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.75th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.95th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.98th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.999th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.99th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.count** <br>(count) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.max** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.mean** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.min** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.snapshot_size** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.std_dev** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used while running the cleanup of the persistence payload|
| **hivemq.persistence.executor.client_session.tasks** <br>(gauge) | Current amount of disk I/O tasks that are enqueued by the client session persistence|
| **hivemq.persistence.executor.noempty_queues** <br>(gauge) | Current amount of single writer task queues that are not empty|
| **hivemq.persistence.executor.outgoing_message_flow.tasks** <br>(gauge) | Current amount of disk I/O tasks that are enqueued by the outgoing message flow persistence|
| **hivemq.persistence.executor.queue_misses** <br>(count) | Current count of loops that all single writer threads have done without executing a task|
| **hivemq.persistence.executor.queued_messages.tasks** <br>(gauge) | Current amount of disk I/O tasks that are enqueued by the queued messages persistence|
| **hivemq.persistence.executor.request_event_bus.tasks** <br>(gauge) | Current amount of tasks that are enqueued by the request event bus|
| **hivemq.persistence.executor.retained_messages.tasks** <br>(gauge) | Current amount of disk I/O tasks that are enqueued by the retained message persistence|
| **hivemq.persistence.executor.running.threads** <br>(gauge) | Current amount of threads that are executing disk I/O tasks|
| **hivemq.persistence.executor.subscription.tasks** <br>(gauge) | Current amount of disk I/O tasks that are enqueued by the subscription persistence|
| **hivemq.persistence.executor.total.tasks** <br>(gauge) | Current amount of disk I/O tasks that are enqueued by all persistence executors|
| **hivemq.persistence.payload_entries.count** <br>(gauge) | Holds the current amount of payloads stored in the payload persistence|
| **hivemq.persistence.removable_entries.count** <br>(gauge) | Holds the current amount of payloads stored in the payload persistence, that can be removed by the cleanup|
| **hivemq.persistence_executor.running** <br>(count) | Counts tasks that are currently running in the persistence executor|
| **hivemq.persistence_scheduled_executor.running** <br>(count) | Counts tasks that are currently running in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.overrun** <br>(count) | Counts the periodic tasks which ran longer then their time frame allowed in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.50th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.75th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.95th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.98th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.999th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.99th_percentile** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.count** <br>(count) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.max** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.mean** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.min** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.snapshot_size** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.std_dev** <br>(gauge) | Metrics about how much percent of their allowed time frame periodic tasks used in the scheduler responsible for persistence|
| **hivemq.publish.without_matching_subscribers** <br>(count) | Counts the amount of publish messages received, without any matching subscribers|
| **hivemq.qos_0_memory.exceeded.per_client** <br>(gauge) | Holds the current amount of clients that exceeded their QoS 0 message memory|
| **hivemq.qos_0_memory.max** <br>(gauge) | Holds the maximum amount of bytes QoS 0 messages may use in memory|
| **hivemq.qos_0_memory.used** <br>(gauge) | Holds the current amount of bytes QoS 0 messages use in memory|
| **hivemq.sessions.overall.current** <br>(gauge) | Measures the current count of stored sessions. These sessions include all sessions, including online and offline clients|
| **hivemq.sessions.persistent.active** <br>(count) | Measures the current count of active persistent sessions (= Online MQTT clients which are connected with cleanSession=false).|
| **hivemq.single_writer_executor.running** <br>(count) | Counts tasks that are currently running in the scheduler responsible for single-writer|
| **hivemq.subscriptions.overall.current** <br>(count) | Measures the current count of subscriptions on the broker|
| **hivemq.system.max_file_descriptor** <br>(gauge) | Maximum allowed amount of file descriptors as seen by the JVM|
| **hivemq.system.open_file_descriptor** <br>(gauge) | Amount of open file descriptors as seen by the JVM|
| **hivemq.system.os.file_descriptors.max** <br>(gauge) | Maximum allowed amount of file descriptors|
| **hivemq.system.os.file_descriptors.open** <br>(gauge) | Amount of currently open file descriptors|
| **hivemq.system.os.global.memory.available** <br>(gauge) | The amount of physical memory currently available, in bytes|
| **hivemq.system.os.global.memory.swap.total** <br>(gauge) | The current size of the paging/swap file(s), in bytes|
| **hivemq.system.os.global.memory.swap.used** <br>(gauge) | The current memory committed to the paging/swap file(s), in bytes|
| **hivemq.system.os.global.memory.total** <br>(gauge) | The amount of actual physical memory, in bytes|
| **hivemq.system.os.global.uptime** <br>(gauge) | OS Uptime in seconds|
| **hivemq.system.os.process.disk.bytes_read** <br>(gauge) | Number of bytes the HiveMQ process has read from disk|
| **hivemq.system.os.process.disk.bytes_written** <br>(gauge) | Number of bytes the HiveMQ process has written to disk|
| **hivemq.system.os.process.memory.resident_set_size** <br>(gauge) | Resident Set Size (RSS) in bytes. It is used to show how much memory is allocated to the HiveMQ process and is in RAM. It does not include memory that is swapped out. It does include memory from shared libraries as long as the pages from those libraries are actually in memory. It does include all stack and heap memory|
| **hivemq.system.os.process.memory.virtual** <br>(gauge) | Virtual Memory Size (VSZ) in bytes. It includes all memory that the HiveMQ process can access, including memory that is swapped out and memory that is from shared libraries|
| **hivemq.system.os.process.threads.count** <br>(gauge) | Number of threads of the HiveMQ process as seen by the OS|
| **hivemq.system.os.process.time_spent.kernel** <br>(gauge) | Amount of milliseconds the HiveMQ process has executed in kernel/system mode as seen by the OS|
| **hivemq.system.os.process.time_spent.user** <br>(gauge) | Amount of milliseconds the the HiveMQ process has executed in user mode as seen by the OS|
| **hivemq.system.physical_memory.free** <br>(gauge) | Current amount of free physical memory in bytes|
| **hivemq.system.physical_memory.total** <br>(gauge) | Total amount of physical memory (bytes) available|
| **hivemq.system.process_cpu.load** <br>(gauge) | Current CPU usage for the JVM process (0.0 idle - 1.0 full CPU usage)|
| **hivemq.system.process_cpu.time** <br>(gauge) | Total amount of CPU time the JVM process has used to this point(in nanoseconds)|
| **hivemq.system.swap_space.free** <br>(gauge) | Current amount of free swap space in bytes|
| **hivemq.system.swap_space.total** <br>(gauge) | Total amount of swap space available in bytes|
| **hivemq.system.system_cpu.load** <br>(gauge) | Current CPU usage for the whole system (0.0 idle - 1.0 full CPU usage)|
| **hivemq.topic_alias.count.total** <br>(gauge) | Holds the current amount of topic aliases|
| **hivemq.topic_alias.memory.usage** <br>(gauge) | Holds the current amount of bytes topic aliases use in memory|

### 서비스 점검

**hivemq.can_connect**

Returns `CRITICAL` if the Agent is unable to connect to HiveMQ, `WARNING` if no metrics are collected, and `OK` otherwise.

_Statuses: ok, critical, warning_

### 이벤트

HiveMQ does not include any events.

### 서비스 점검

See [service_checks.json](https://github.com/DataDog/integrations-core/blob/master/hivemq/assets/service_checks.json) for a list of service checks provided by this integration.

## 트러블슈팅

Need help? Contact [Datadog support](https://docs.datadoghq.com/help).

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Use HiveMQ and OpenTelemetry to monitor IoT applications in Datadog](https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/)