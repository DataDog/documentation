---
app_id: flume
custom_kind: 통합
description: Apache Flume Agent의 싱크, 채널, 소스 추적하기
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: flume
---
## 개요

This check monitors [Apache Flume](https://flume.apache.org/).

## 설정

The Flume check is not included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you need to install it.

### 설치

For Agent v7.21+ / v6.21+, follow the instructions below to install the Flume check on your host. See [Use Community Integrations](https://docs.datadoghq.com/agent/guide/use-community-integrations/) to install with the Docker Agent or earlier versions of the Agent.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

1. Configure your integration similar to core [integrations](https://docs.datadoghq.com/getting_started/integrations/).

### 설정

1. Configure the Flume agent to enable JMX by adding the following JVM arguments to your [flume-env.sh](https://flume.apache.org/FlumeUserGuide.html#jmx-reporting):

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. 내 에이전트 구성 디렉터리의 루트 수준에 있는 `conf.d/` 폴더에서 `flume.d/conf.yaml` 파일을 편집해
   Flume 성능 데이터 수집을 시작하세요.
   See the [sample `flume.d/conf.yaml`](https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example) file for all available configuration options.

   이 점검의 제한 값은 인스턴스당 메트릭 350개입니다. 반환된 메트릭 개수는 상태 출력에 표시됩니다.
   아래 설정을 편집해 관심 있는 메트릭을 지정할 수 있습니다.
   For detailed instructions on customizing the metrics to collect, see the [JMX Checks documentation](https://docs.datadoghq.com/integrations/java/).
   If you need to monitor more metrics, contact [Datadog support](https://docs.datadoghq.com/help/).

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### 검증

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `flume` under the Checks section.

### 구성 요소 메트릭

The metrics retrieved by this check depend on the source, channel, and sink used by your Flume agent. For a full list of metrics exposed by each component, review [Available Component Metrics](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) from the Apache Flume documentation. For a list of the metrics that you can see in Datadog, see the [Metrics](#metrics) section on this page.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **flume.channel.capacity** <br>(gauge) | The maximum number of events that can be queued in the channel at any time. For channel types without a capacity limit the value will be zero.<br>_Shown as event_ |
| **flume.channel.fill_percentage** <br>(gauge) | The channel fill percentage.<br>_Shown as percent_ |
| **flume.channel.size** <br>(gauge) | The number of events currently queued in the channel.<br>_Shown as event_ |
| **flume.channel.event_put_attempt_count** <br>(count) | The total number of events that have been attempted to be put into the channel.<br>_Shown as event_ |
| **flume.channel.event_put_success_count** <br>(count) | The total number of events that have successfully been put into the channel.<br>_Shown as event_ |
| **flume.channel.event_take_attempt_count** <br>(count) | The total number of attempts that have been made to take an event from the channel.<br>_Shown as event_ |
| **flume.channel.event_take_success_count** <br>(count) | The total number of events that have successfully been taken from the channel.<br>_Shown as event_ |
| **flume.channel.kafka_commit_timer** <br>(gauge) | The timer for the Kafka channel commits.<br>_Shown as time_ |
| **flume.channel.kafka_event_get_timer** <br>(gauge) | The timer for the kafka channel retrieving events. <br>_Shown as time_ |
| **flume.channel.kafka_event_send_timer** <br>(gauge) | The timer for the Kafka channel sending events.<br>_Shown as time_ |
| **flume.channel.rollbackcount** <br>(count) | The count of rollbacks from the kafka channel.<br>_Shown as event_ |
| **flume.sink.event_write_fail** <br>(count) | The total number of failed write events.<br>_Shown as event_ |
| **flume.sink.batch_empty_count** <br>(count) | The number of append batches attempted containing zero events.<br>_Shown as event_ |
| **flume.sink.channel_read_fail** <br>(count) | The number of failed read events from the channel.<br>_Shown as event_ |
| **flume.sink.batch_complete_count** <br>(count) | The number of append batches attempted containing the maximum number of events supported by the next hop.<br>_Shown as event_ |
| **flume.sink.batch_underflow_count** <br>(count) | The number of append batches attempted containing less than the maximum number of events supported by the next hop.<br>_Shown as event_ |
| **flume.sink.connection_closed_count** <br>(count) | The number of connections closed by this sink.<br>_Shown as connection_ |
| **flume.sink.connection_failed_count** <br>(count) | The number of failed connections.<br>_Shown as connection_ |
| **flume.sink.connection_created_count** <br>(count) | The number of connections created by this sink. Only applicable to some sink types.<br>_Shown as connection_ |
| **flume.sink.event_drain_attempt_count** <br>(count) | The total number of events that have been attempted to be drained to the next hop.<br>_Shown as event_ |
| **flume.sink.event_drain_success_count** <br>(count) | The total number of events that have successfully been drained to the next hop<br>_Shown as event_ |
| **flume.sink.kafka_event_sent_timer** <br>(gauge) | The timer for the Kafka sink sending events.<br>_Shown as time_ |
| **flume.sink.rollbackcount** <br>(gauge) | The count of rollbacks from the Kafka sink.<br>_Shown as event_ |
| **flume.source.event_read_fail** <br>(count) | The total number of failed read source events.<br>_Shown as event_ |
| **flume.source.channel_write_fail** <br>(count) | The total number of failed channel write events.<br>_Shown as event_ |
| **flume.source.event_accepted_count** <br>(count) | The total number of events successfully accepted, either through append batches or single-event appends.<br>_Shown as event_ |
| **flume.source.event_received_count** <br>(count) | The total number of events received, either through append batches or single-event appends.<br>_Shown as event_ |
| **flume.source.append_accepted_count** <br>(count) | The total number of single-event appends successfully accepted.<br>_Shown as event_ |
| **flume.source.append_received_count** <br>(count) | The total number of single-event appends received.<br>_Shown as event_ |
| **flume.source.open_connection_count** <br>(count) | The number of open connections<br>_Shown as connection_ |
| **flume.source.generic_processing_fail** <br>(count) | The total number of generic processing failures.<br>_Shown as event_ |
| **flume.source.append_batch_accepted_count** <br>(count) | The total number of append batches accepted successfully.<br>_Shown as event_ |
| **flume.source.append_batch_received_count** <br>(count) | The total number of append batches received.<br>_Shown as event_ |
| **flume.source.kafka_commit_timer** <br>(gauge) | The timer for the Kafka source committing events.<br>_Shown as time_ |
| **flume.source.kafka_empty_count** <br>(count) | The count of empty events from the Kafka source. <br>_Shown as event_ |
| **flume.source.kafka_event_get_timer** <br>(gauge) | The timer for the Kafka source retrieving events.<br>_Shown as time_ |

### 이벤트

Flume에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

**flume.can_connect**

Returns `CRITICAL` if the Agent is unable to connect to and collect metrics from the monitored Flume instance. Returns `OK` otherwise.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.