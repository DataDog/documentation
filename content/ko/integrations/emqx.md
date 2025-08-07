---
app_id: emqx
categories:
- metrics
- iot
custom_kind: integration
description: MQTT 브로커에서 성능, 상태 데이터, 메시지 처리량, 메시지 지연 시간 등을 수집하세요.
integration_version: 1.1.0
media:
- caption: Datadog 대시보드의 EMQX 브로커 지표(1)
  image_url: images/emqx-overview-1.png
  media_type: image
- caption: Datadog 대시보드의 EMQX 브로커 지표(2)
  image_url: images/emqx-overview-2.png
  media_type: image
- caption: Datadog 대시보드의 EMQX 브로커 지표(3)
  image_url: images/emqx-overview-3.png
  media_type: image
- caption: Datadog 대시보드의 EMQX 브로커 지표(4)
  image_url: images/emqx-overview-4.png
  media_type: image
- caption: Datadog 대시보드의 EMQX 브로커 지표(5)
  image_url: images/emqx-overview-5.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: EMQX
---
## 개요

[EMQX](https://github.com/emqx/emqx) is a highly scalable, open-source MQTT broker designed for IoT (Internet of Things). MQTT stands for Message Queuing Telemetry Transport, which is a lightweight, publish-subscribe network protocol that transports messages between devices.

**EMQX의 주요 기능:**

- 확장성: EMQX는 수백만 개의 동시 MQTT 연결을 처리할 수 있으므로 많은 수의 장치를 처리해야 하는 IoT 애플리케이션에 적합합니다.
- 신뢰성: 안정적이고 신뢰할 수 있는 메시지 전송을 제공하여 장치와 서버 간에 데이터가 성공적으로 전송되도록 보장합니다.
- 짧은 지연 시간: 통신 지연 시간이 짧아야 하는 시나리오에 적합합니다.
- 높은 처리량: 많은 양의 메시지를 효율적으로 처리할 수 있습니다.
- 클러스터링: EMQX를 분산 클러스터에 배포하여 성능과 안정성을 향상시킬 수 있습니다.

EMQX와 Datadog 통합은 모니터링 기능을 강화하여 MQTT 브로커의 성능과 상태에 관한 유용한 인사이트를 제공합니다. 특히 IoT 애플리케이션은 효율적이고 안정적인 실시간 데이터 전송이 중요한데, 이에 적합합니다.

**Datadog으로 전송되는 데이터 유형:**

- 메트릭: 메시지 처리량(초당 메시지 전송/수신), 연결된 클라이언트 등의 성능 지표가 포함됩니다.

- 노드 성능: 지연 시간, 부하, 운영 메트릭과 같은 클러스터의 개별 노드 성능을 모니터링합니다.

- 운영 상태: 오류율 및 기타 중요 지표를 포함한 MQTT 브로커의 상태에 관한 데이터입니다.

## 설정

### 설치

Manually install the EMQX check (note that [instructions may change based on your environment](https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent)):

`datadog-agent integration install -t datadog-emqx==1.1.0`을 실행합니다.

### 설정

1. Agent 설정 디렉터리의 루트의 `conf.d/` 폴더에 있는 `emqx/conf.yaml` 파일을 편집하여 EMQX 성능 데이터 수집을 시작하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `emqx` under the Checks section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **emqx.connections.count** <br>(gauge) | Number of connection|
| **emqx.live.connections.count** <br>(gauge) | Number of live connection|
| **emqx.sessions.count** <br>(gauge) | Number of session|
| **emqx.topics.count** <br>(gauge) | Number of topic|
| **emqx.suboptions.count** <br>(gauge) | Number of subcribe options|
| **emqx.subscribers.count** <br>(gauge) | Number of subscriptions|
| **emqx.subscriptions.count** <br>(gauge) | Number of subsctriptions|
| **emqx.subscriptions.shared.count** <br>(gauge) | Number of shared subscriptions|
| **emqx.retained.count** <br>(gauge) | Number of retainer message|
| **emqx.delayed.count** <br>(gauge) | Number of Delayed message|
| **emqx.vm.cpu.use** <br>(gauge) | The CPU utilized by the virtual machine.|
| **emqx.vm.cpu.idle** <br>(gauge) | The CPU idle by the virtual machine.|
| **emqx.vm.run_queue** <br>(gauge) | The total length of all normal and dirty CPU run queues.|
| **emqx.vm.process.messages_in_queues** <br>(gauge) | The total Number of all client message queue.|
| **emqx.vm.total_memory** <br>(gauge) | The total amount of memory available to the Erlang emulator, allocated and free. May or may not be equal to the amount of memory configured in the system.<br>_Shown as byte_ |
| **emqx.vm.used_memory** <br>(gauge) | The current size of the memory being used.<br>_Shown as byte_ |
| **emqx.cluster.nodes_running** <br>(gauge) | The number of nodes currently running in the cluster.|
| **emqx.cluster.nodes_stopped** <br>(gauge) | The number of nodes currently stopped in the cluster.|
| **emqx.bytes.received.count** <br>(count) | The traffic bytes received.<br>_Shown as byte_ |
| **emqx.bytes.sent.count** <br>(count) | The traffic bytes sent<br>_Shown as byte_ |
| **emqx.packets.received.count** <br>(count) | The number of data packets transmitted|
| **emqx.packets.sent.count** <br>(count) | The number of data packets received|
| **emqx.packets.connack.sent.count** <br>(count) | The number of  connack packets sent|
| **emqx.packets.connect.count** <br>(count) | The number of  connect packets received|
| **emqx.packets.connack.error.count** <br>(count) | The number of  connack error packets sent|
| **emqx.packets.connack.auth_error.count** <br>(count) | The number of  connack auth_error packets sent|
| **emqx.packets.publish.received.count** <br>(count) | The number of publish packets received|
| **emqx.packets.publish.sent.count** <br>(count) | The number of publish packets sent|
| **emqx.packets.publish.inuse.count** <br>(count) | The number of publish packets with packet_identifter_in_use error|
| **emqx.packets.publish.error.count** <br>(count) | The number of publish packets error|
| **emqx.packets.publish.auth_error.count** <br>(count) | The number of publish packets auth error|
| **emqx.packets.publish.dropped.count** <br>(count) | The number of publish packets dropped|
| **emqx.packets.puback.received.count** <br>(count) | The number of puback receive  packets|
| **emqx.packets.puback.sent.count** <br>(count) | The number of puback sent packets|
| **emqx.packets.puback.inuse.count** <br>(count) | The number of puback infuse error packets|
| **emqx.packets.puback.missed.count** <br>(count) | The number of puback missed error packets|
| **emqx.packets.pubrec.received.count** <br>(count) | The number of pubrec packets received|
| **emqx.packets.pubrec.sent.count** <br>(count) | The number of pubrec packets sent|
| **emqx.packets.pubrec.inuse.count** <br>(count) | The number of pubrec packets infuse error|
| **emqx.packets.pubrec.missed.count** <br>(count) | The number of pubrec packets missed error|
| **emqx.packets.pubrel.received.count** <br>(count) | The number of pubrel packets received|
| **emqx.packets.pubrel.sent.count** <br>(count) | The number of pubrel packets sent|
| **emqx.packets.pubrel.missed.count** <br>(count) | The number of pubrel packets missed|
| **emqx.packets.pubcomp.received.count** <br>(count) | The number of pubcomp packets received|
| **emqx.packets.pubcomp.sent.count** <br>(count) | The number of pubcomp packets sent|
| **emqx.packets.pubcomp.inuse.count** <br>(count) | The number of pubcomp packets infuse error|
| **emqx.packets.pubcomp.missed.count** <br>(count) | The number of pubcomp packets missed|
| **emqx.packets.subscribe.received.count** <br>(count) | The number of subscribe packets received|
| **emqx.packets.subscribe.error.count** <br>(count) | The number of error subscribe packets |
| **emqx.packets.subscribe.auth_error.count** <br>(count) | The number of auth error subscribe packets |
| **emqx.packets.suback.sent.count** <br>(count) | The number of suback packets sent|
| **emqx.packets.unsuback.sent.count** <br>(count) | The number of unsuback packets sent|
| **emqx.packets.unsubscribe.received.count** <br>(count) | The number of unsubscribe packets received|
| **emqx.packets.unsubscribe.error.count** <br>(count) | The number of error unsubscribe packets|
| **emqx.packets.pingreq.received.count** <br>(count) | The number of pingreq packets received|
| **emqx.packets.pingresp.sent.count** <br>(count) | The number of pingresp packets sent|
| **emqx.packets.disconnect.received.count** <br>(count) | The number of disconnect packets received|
| **emqx.packets.disconnect.sent.count** <br>(count) | The number of disconnect packets sent|
| **emqx.packets.auth.received.count** <br>(count) | The number of  auth packets received|
| **emqx.packets.auth.sent.count** <br>(count) | The number of  auth packets sent|
| **emqx.messages.received.count** <br>(count) | The number of  messages received|
| **emqx.messages.sent.count** <br>(count) | The number of  messages sent|
| **emqx.messages.qos0.received.count** <br>(count) | The number of  qos0 messages received|
| **emqx.messages.qos0.sent.count** <br>(count) | The number of  qos0 messages sent|
| **emqx.messages.qos1.received.count** <br>(count) | The number of  qos1 messages received|
| **emqx.messages.qos1.sent.count** <br>(count) | The number of  qos1 messages sent|
| **emqx.messages.qos2.received.count** <br>(count) | The number of  qos2 messages received|
| **emqx.messages.qos2.sent.count** <br>(count) | The number of  qos2 messages sent|
| **emqx.messages.publish.count** <br>(count) | The number of  messages published|
| **emqx.messages.dropped.count** <br>(count) | The number of  messages dropped|
| **emqx.messages.dropped.expired.count** <br>(count) | The number of  expired messages dropped|
| **emqx.messages.dropped.no_subscribers.count** <br>(count) | The number of  no_subscribers messages dropped|
| **emqx.messages.forward.count** <br>(count) | The number of  forward messages|
| **emqx.messages.retained.count** <br>(count) | The number of  retained messages sent|
| **emqx.messages.delayed.count** <br>(count) | The number of  delayed messages sent|
| **emqx.messages.delivered.count** <br>(count) | The number of  messages delivered|
| **emqx.messages.acked.count** <br>(count) | The number of  acked messages|
| **emqx.delivery.dropped.count** <br>(count) | The number of  total dropped messages|
| **emqx.delivery.dropped.no_local.count** <br>(count) | The number of  no_local delivery messages dropped|
| **emqx.delivery.dropped.too_large.count** <br>(count) | The number of  too_large delivery messages dropped|
| **emqx.delivery.dropped.qos0.msg.count** <br>(count) | The number of  qos0 delivery messages dropped|
| **emqx.delivery.dropped.queue_full.count** <br>(count) | The number of  queue_full delivery messages dropped|
| **emqx.delivery.dropped.expired.count** <br>(count) | The number of  expired delivery messages dropped|
| **emqx.client.connect.count** <br>(count) | The number of the client_connect hook has been executed|
| **emqx.client.connack.count** <br>(count) | The number of the client_connack hook has been executed|
| **emqx.client.connected.count** <br>(count) | The number of the client_connected hook has been executed|
| **emqx.client.authenticate.count** <br>(count) | The number of the client_authenticated hook has been executed|
| **emqx.client.auth_anonymous.count** <br>(count) | The number of clients who connected in anonymously|
| **emqx.client.authorize.count** <br>(count) | The number of the client_authorize hook has been executed|
| **emqx.client.subscribe.count** <br>(count) | The number of the client_subscribe hook has been executed|
| **emqx.client.unsubscribe.count** <br>(count) | The number of the client_unsubscribe hook has been executed|
| **emqx.client.disconnected.count** <br>(count) | The number of the client_disconnected hook has been executed|
| **emqx.session.created.count** <br>(count) | The number of the session_created hook has been executed|
| **emqx.session.resumed.count** <br>(count) | The number of the session_resumed hook has been executed|
| **emqx.session.takenover.count** <br>(count) | The number of the session_takenover hook has been executed|
| **emqx.session.discarded.count** <br>(count) | The number of the session_discarded hook has been executed|
| **emqx.session.terminated.count** <br>(count) | The number of the session_terminated hook has been executed|
| **emqx.authorization.allow.count** <br>(count) | The number of successful(allow) authorizations|
| **emqx.authorization.deny.count** <br>(count) | The number of failed(deny) authorizations|
| **emqx.authorization.cache_hit.count** <br>(count) | The number of authorizations with cache|
| **emqx.authorization.superuser.count** <br>(count) | The number of authorizations with superuser|
| **emqx.authorization.nomatch.count** <br>(count) | The number of failed authorizations with no match|
| **emqx.authorization.matched_allow.count** <br>(count) | The number of match allow authorizations|
| **emqx.authorization.matched_deny.count** <br>(count) | The number of match deny authorizations|
| **emqx.authentication.success.count** <br>(count) | The number of success authorizations|
| **emqx.authentication.success_anonymous.count** <br>(count) | The number of success authorizations with anonymous|
| **emqx.authentication.failure.count** <br>(count) | The number of  failed authentication|
| **emqx.mria.last_intercepted_trans** <br>(gauge) | The number of  latest intercepted transaction on core node|
| **emqx.mria.weight** <br>(gauge) | The weight of mria's traffic in cluster|
| **emqx.mria.replicants** <br>(gauge) | The number of replicants report by mria in cluster|
| **emqx.mria.server.mql** <br>(gauge) | The messages that have not yet been processed in the mria shard.|

### 서비스 점검

**emqx.openmetrics.health**

Returns `CRITICAL` if the Agent is unable to connect to the EMQX OpenMetrics endpoint, otherwise returns `OK`.

_상태: ok, critical_

### 이벤트

EMQX에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

Need help? Contact [EMQX support](https://www.emqx.com/en/support).