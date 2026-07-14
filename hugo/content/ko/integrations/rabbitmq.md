---
app_id: rabbitmq
categories:
- log collection
- message queues
custom_kind: 통합
description: 대기열 크기, 소비자 수, 미확인 메시지 등을 추적하세요.
further_reading:
- link: https://www.datadoghq.com/blog/rabbitmq-monitoring
  tag: 블로그
  text: RabbitMQ 모니터링을 위한 주요 메트릭
- link: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
  tag: 블로그
  text: RabbitMQ 모니터링 도구를 사용하여 메트릭 수집
- link: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
  tag: 블로그
  text: Datadog을 사용하여 RabbitMQ 모니터링
integration_version: 8.0.0
media: []
supported_os:
- linux
- windows
- macos
title: RabbitMQ
---
![RabbitMQ Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png)

## 개요

이 점검은 Datadog Agent를 통해 [RabbitMQ][1]를 모니터링합니다. 이를 통해 다음 작업을 할 수 있습니다.

- 대기열 기반 통계를 추적합니다: 대기열 크기, 소비자 수, 확인되지 않은 메시지, 재전송된 메시지 등.
- 노드 기반 통계를 추적합니다: 대기 프로세스, 사용된 소켓, 사용된 파일 설명자 등.
- 가상 호스트의 활성 여부와 연결 수를 모니터링합니다.

RabbitMQ 통합을 강화하려면 [Data Streams Monitoring][2]을 사용해 보세요. 이 솔루션은 파이프라인 시각화 및 지연 추적 기능을 제공하여 병목 현상을 파악하고 해결하는 데 유용합니다.

## 설정

### 설치

RabbitMQ 점검은 [Datadog Agent][3] 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 없습니다.

### 설정

RabbitMQ는 [RabbitMQ Management Plugin][4]과 [RabbitMQ Prometheus Plugin][5] 두 가지 방식으로 메트릭을 제공합니다. Datadog 통합은 두 버전 모두를 지원합니다. 원하는 버전 가이드를 이 파일에서 확인하세요. Datadog 통합에는 각 버전에 대한 기본 대시보드와 모니터가 포함되어 있으며, 각각 Dashboard와 Monitor로 표시됩니다.

#### RabbitMQ 준비

##### [RabbitMQ Prometheus Plugin][5].

*RabbitMQ v3.8부터 [RabbitMQ Prometheus Plugin][5]이 기본적으로 활성화되어 있습니다.*

*RabbitMQ의 Prometheus Plugin 버전은 Datadog Agent의 Python 3 지원이 필요하므로 Agent v6 이상에서만 사용할 수 있습니다. 통합의 Prometheus Plugin 버전을 구성하기 전에 Agent가 업데이트되었는지 확인하세요.*

인스턴스 구성에서 `prometheus_plugin` 섹션을 구성합니다. `prometheus_plugin` 옵션을 사용할 때 Management Plugin과 관련된 설정은 무시됩니다.

```yaml
instances:
  - prometheus_plugin:
      url: http://<HOST>:15692
```

이를 통해 하나의 RabbitMQ 노드에서 [`/metrics` 엔드포인트][6]를 스크래핑할 수 있습니다. Datadog은 [`/metrics/detailed` 엔드포인트][7]에서도 데이터를 수집할 수 있습니다. 수집되는 메트릭은 포함된 패밀리에 따라 달라집니다.

```yaml
 instances:
   - prometheus_plugin:
       url: http://<HOST>:15692
       unaggregated_endpoint: detailed?family=queue_coarse_metrics&family=queue_consumer_count&family=channel_exchange_metrics&family=channel_queue_exchange_metrics&family=node_coarse_metrics
```

이 구성은 각 대기열, 익스체인지 및 노드에 관한 메트릭을 수집합니다. 각 제품군에서 제공하는 메트릭에 관한 자세한 내용은 [`/metrics/detailed` API 문서][7]를 참고하세요.

##### [RabbitMQ Management Plugin][4].

플러그인을 활성화합니다. 그러면 Agent 사용자는 최소한 `monitoring` 태그와 다음 필수 권한이 ​​필요합니다.

| 권한 | 명령어            |
| ---------- | ------------------ |
| **conf**   | `^aliveness-test$` |
| **write**  | `^amq\.default$`   |
| **read**   | `.*`               |

다음 명령을 사용하여 기본 가상 호스트에 대한 Agent 사용자를 생성합니다.

```text
rabbitmqctl add_user datadog <SECRET>
rabbitmqctl set_permissions  -p / datadog "^aliveness-test$" "^amq\.default$" ".*"
rabbitmqctl set_user_tags datadog monitoring
```

여기서 `/`는 기본 호스트를 나타냅니다. 이 값을 지정한 가상 호스트 이름으로 설정하세요. 자세한 내용은 [RabbitMQ 문서][8]를 참고하세요.

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. RabbitMQ 메트릭을 수집하려면 [Agent 구성 디렉터리][9] 루트에 있는 `conf.d/` 폴더에서 `rabbitmq.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 구성 옵션은 [샘플 rabbitmq.d/conf.yaml][10]을 참고하세요.

   **참고**: Agent는 기본적으로 모든 대기열, 가상 호스트, 노드를 확인하지만, 목록이나 정규식을 제공하여 검사 대상을 제한할 수 있습니다. [rabbitmq.d/conf.yaml][10]에서 예시를 확인하세요.

1. [Agent를 다시 시작합니다][11].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 기본 로그 파일 위치를 수정하려면 `RABBITMQ_LOGS` 환경 변수를 설정하거나 다음을 RabbitMQ 구성 파일(`/etc/rabbitmq/rabbitmq.conf`)에 추가하세요.

   ```conf
     log.dir = /var/log/rabbit
     log.file = rabbit.log
   ```

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `rabbitmq.d/conf.yaml` 파일의 `logs` 섹션을 수정하여  RabbitMQ 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/rabbit/*.log
       source: rabbitmq
       service: myservice
       log_processing_rules:
         - type: multi_line
           name: logs_starts_with_equal_sign
           pattern: "="
   ```

1. [Agent를 다시 시작합니다][11].

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

Datadog의 [Docker 컨테이너 Autodiscovery][12] 기능을 활용할 수 있습니다. RabbitMQ 관련 설정은 `auto_conf.yaml` 예제 구성을 참고하세요.

Kubernetes와 같은 컨테이너 환경에서 아래 파라미터를 적용하는 방법은 [Autodiscovery 통합 템플릿][13]에서 확인하세요.

##### 메트릭 수집

| 파라미터            | 값                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `rabbitmq`                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                |
| `<INSTANCE_CONFIG>`  | `{"prometheus_plugin": {"url": "http://%%host%%:15692"}}` |

##### 로그 수집

_Agent v6.0 이상에서 사용 가능_

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][14]을 참고하세요.

| 파라미터      | 값                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "rabbitmq", "service": "rabbitmq", "log_processing_rules": [{"type":"multi_line","name":"logs_starts_with_equal_sign", "pattern": "="}]}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고][15] Checks 섹션에서 `rabbitmq`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **rabbitmq.alarms.file_descriptor_limit** <br>(gauge) | \[OpenMetrics\] 파일 디스크립터 제한 알람이 활성화된 경우 값은 1입니다.|
| **rabbitmq.alarms.free_disk_space.watermark** <br>(gauge) | \[OpenMetrics\] 디스크 여유 공간 워터마크 알람이 활성화된 경우 값은 1입니다.|
| **rabbitmq.alarms.memory_used_watermark** <br>(gauge) | \[OpenMetrics\] VM 메모리 워터마크 알람이 활성화된 경우 값은 1입니다.|
| **rabbitmq.auth_attempts.count** <br>(count) | \[OpenMetrics\] 총 인증 시도 횟수|
| **rabbitmq.auth_attempts.failed.count** <br>(count) | \[OpenMetrics\] 총 인증 시도 실패 횟수|
| **rabbitmq.auth_attempts.succeeded.count** <br>(count) | \[OpenMetrics\] 총 인증 시도 성공 횟수|
| **rabbitmq.build_info** <br>(gauge) | \[OpenMetrics\] RabbitMQ & Erlang/OTP 버전 정보|
| **rabbitmq.channel.acks_uncommitted** <br>(gauge) | \[OpenMetrics\] 아직 커밋되지 않은 트랜잭션 내의 메시지 확인|
| **rabbitmq.channel.consumers** <br>(gauge) | \[OpenMetrics\] 채널 소비자|
| **rabbitmq.channel.get.ack.count** <br>(count) | \[OpenMetrics\] 수동 확인 모드에서 basic.get을 사용하여 가져온 총 메시지 수|
| **rabbitmq.channel.get.count** <br>(count) | \[OpenMetrics\] 자동 확인 모드에서 basic.get을 사용하여 가져온 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.get.empty.count** <br>(count) | \[OpenMetrics\] basic.get 작업이 메시지를 가져오지 않은 총 횟수|
| **rabbitmq.channel.messages.acked.count** <br>(count) | \[OpenMetrics\] 소비자가 확인한 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.confirmed.count** <br>(count) | \[OpenMetrics\] 익스체인지로 발행되고 채널에서 확인된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.delivered.ack.count** <br>(count) | \[OpenMetrics\] 수동 확인 모드로 소비자에게 전달된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.delivered.count** <br>(count) | \[OpenMetrics\] 자동 확인 모드로 소비자에게 전달된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.published.count** <br>(count) | \[OpenMetrics\] 채널에서 익스체인지로 발행된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.redelivered.count** <br>(count) | \[OpenMetrics\] 소비자에게 재전송된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.unacked** <br>(gauge) | \[OpenMetrics\] 전달되었으나 아직 확인되지 않은 메시지<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.uncommitted** <br>(gauge) | \[OpenMetrics\] 트랜잭션에서 수신되었지만 아직 커밋되지 않은 메시지<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.unconfirmed** <br>(gauge) | \[OpenMetrics\] 발행되었지만 아직 확인되지 않은 메시지<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.unroutable.dropped.count** <br>(count) | \[OpenMetrics\] 익스체인지에 non-mandatory로 발행되었으나, 라우팅 불가로 삭제된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.messages.unroutable.returned.count** <br>(count) | \[OpenMetrics\] 익스체인지에 mandatory로 발행되었으나 라우팅 불가로 발행자에게 반환된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.channel.prefetch** <br>(gauge) | \[OpenMetrics\] 채널의 모든 소비자에 대한 미확인 메시지 총 한도<br>_message로 표시됨_ |
| **rabbitmq.channel.process_reductions.count** <br>(count) | \[OpenMetrics\] 채널 프로세스 감소 총 횟수|
| **rabbitmq.channels** <br>(gauge) | \[OpenMetrics\] 현재 열려 있는 채널|
| **rabbitmq.channels.closed.count** <br>(count) | \[OpenMetrics\] 폐쇄된 채널 총 개수|
| **rabbitmq.channels.opened.count** <br>(count) | \[OpenMetrics\] 열려 있는 채널 총 개수|
| **rabbitmq.cluster.exchange_bindings** <br>(gauge) | \[OpenMetrics\] 익스체인지에 설정된 바인딩 수. 이 값은 클러스터 전체에 적용됩니다.|
| **rabbitmq.cluster.exchange_name** <br>(gauge) | \[OpenMetrics\] 추가 정보 없이 익스체인지를 열거합니다. 이 값은 클러스터 전체에 적용되며, `exchange_bindings`의 저렴한 대안입니다.|
| **rabbitmq.cluster.vhost_status** <br>(gauge) | \[OpenMetrics\] 특정 vhost가 실행 중인지 여부|
| **rabbitmq.connection.channels** <br>(gauge) | \[OpenMetrics\] 연결에 있는 채널|
| **rabbitmq.connection.incoming_bytes.count** <br>(count) | \[OpenMetrics\] 연결을 통해 수신된 총 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.connection.incoming_packets.count** <br>(count) | \[OpenMetrics\] 연결에서 수신된 총 패킷 수<br>_packet으로 표시됨_ |
| **rabbitmq.connection.outgoing_bytes.count** <br>(count) | \[OpenMetrics\] 연결을 통해 전송된 총 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.connection.outgoing_packets.count** <br>(count) | \[OpenMetrics\] 연결에서 전송된 총 패킷 수<br>_packet으로 표시됨_ |
| **rabbitmq.connection.pending_packets** <br>(gauge) | \[OpenMetrics\] 연결에서 전송 대기 중인 패킷 수<br>_packet으로 표시됨_ |
| **rabbitmq.connection.process_reductions.count** <br>(count) | \[OpenMetrics\] 연결 프로세스 감소 총 횟수|
| **rabbitmq.connections** <br>(gauge) | \[OpenMetrics, Management CLI\] 특정 RabbitMQ 가상 호스트에 연결된 현재 연결 수. 'rabbitmq_vhost:\<vhost_name>' 태그가 지정되어 있으며 연결은 현재 열려 있음<br>_connection으로 표시됨_ |
| **rabbitmq.connections.closed.count** <br>(count) | \[OpenMetrics\] 종료되거나 끊긴 총 연결 수|
| **rabbitmq.connections.opened.count** <br>(count) | \[OpenMetrics\] 열려 있는 총 연결 수|
| **rabbitmq.connections.state** <br>(gauge) | 지정된 연결 상태에 있는 연결 수<br>_connection으로 표시됨_ |
| **rabbitmq.consumer_prefetch** <br>(gauge) | \[OpenMetrics\] 각 소비자에 대한 미확인 메시지 제한|
| **rabbitmq.consumers** <br>(gauge) | \[OpenMetrics\] 현재 연결된 소비자|
| **rabbitmq.disk_space.available_bytes** <br>(gauge) | \[OpenMetrics\] 디스크 사용 가능 공간(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.disk_space.available_limit_bytes** <br>(gauge) | \[OpenMetrics\] 디스크 여유 공간 하한선(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.erlang.gc.reclaimed_bytes.count** <br>(count) | \[OpenMetrics\] Erlang 가비지 컬렉터가 회수한 총 메모리 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.gc.runs.count** <br>(count) | \[OpenMetrics\] Erlang 가비지 컬렉터 총 실행 횟수|
| **rabbitmq.erlang.mnesia.committed_transactions.count** <br>(count) | \[OpenMetrics\] 커밋된 트랜잭션 수<br>_transaction으로 표시됨_ |
| **rabbitmq.erlang.mnesia.failed_transactions.count** <br>(count) | \[OpenMetrics\] 실패한(즉, 중단된) 트랜잭션 수<br>_transaction으로 표시됨_ |
| **rabbitmq.erlang.mnesia.held_locks** <br>(gauge) | \[OpenMetrics\] 보유한 락(lock) 수|
| **rabbitmq.erlang.mnesia.lock_queue** <br>(gauge) | \[OpenMetrics\] 락(lock) 대기 중인 트랜잭션 수<br>_transaction으로 표시됨_ |
| **rabbitmq.erlang.mnesia.logged_transactions.count** <br>(count) | \[OpenMetrics\] 기록된 트랜잭션 수<br>_transaction으로 표시됨_ |
| **rabbitmq.erlang.mnesia.memory_usage_bytes** <br>(gauge) | \[OpenMetrics\] 모든 mnesia 테이블에서 할당된 총 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.mnesia.restarted_transactions.count** <br>(count) | \[OpenMetrics\] 총 트랜잭션 재시작 횟수<br>_transaction으로 표시됨_ |
| **rabbitmq.erlang.mnesia.tablewise_memory_usage_bytes** <br>(gauge) | \[OpenMetrics\] mnesia 테이블당 할당된 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.mnesia.tablewise_size** <br>(gauge) | \[OpenMetrics\] 테이블당 존재하는 행 수|
| **rabbitmq.erlang.mnesia.transaction_coordinators** <br>(gauge) | \[OpenMetrics\] 코디네이터 트랜잭션 수<br>_transaction로 표시됨_ |
| **rabbitmq.erlang.mnesia.transaction_participants** <br>(gauge) | \[OpenMetrics\] 참여 중인 트랜잭션 수<br>_transaction으로 표시됨_ |
| **rabbitmq.erlang.net.ticktime_seconds** <br>(gauge) | \[OpenMetrics\] 노드 간 하트비트(heartbeat) 간격<br>_second로 표시됨_ |
| **rabbitmq.erlang.processes_limit** <br>(gauge) | \[OpenMetrics\] Erlang 프로세스 제한<br>_process로 표시됨_ |
| **rabbitmq.erlang.processes_used** <br>(gauge) | \[OpenMetrics\] 사용된 Erlang 프로세스<br>_process로 표시됨_ |
| **rabbitmq.erlang.scheduler.context_switches.count** <br>(count) | \[OpenMetrics\] Erlang 스케줄러 컨텍스트 스위치 총 횟수|
| **rabbitmq.erlang.scheduler.run_queue** <br>(gauge) | \[OpenMetrics\] Erlang 스케줄러 실행 대기열|
| **rabbitmq.erlang.uptime_seconds** <br>(gauge) | \[OpenMetrics\] 노드 가동 시간<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.allocators** <br>(gauge) | \[OpenMetrics\] VM의 다양한 할당자에 할당된(carriers_size) 및 사용된(blocks_size) 메모리. erts_alloc(3) 참고.|
| **rabbitmq.erlang.vm.atom_count** <br>(gauge) | \[OpenMetrics\] 현재 로컬 노드에 존재하는 Atom 수|
| **rabbitmq.erlang.vm.atom_limit** <br>(gauge) | \[OpenMetrics\] 로컬 노드에서 동시에 존재할 수 있는 최대 Atom 수|
| **rabbitmq.erlang.vm.dirty_cpu_schedulers** <br>(gauge) | \[OpenMetrics\] 에뮬레이터가 사용하는 더티 CPU 스케줄러 스레드 수<br>_thread로 표시됨_ |
| **rabbitmq.erlang.vm.dirty_cpu_schedulers_online** <br>(gauge) | \[OpenMetrics\] 현재 활성화된 더티 CPU 스케줄러 스레드 수<br>_thread로 표시됨_ |
| **rabbitmq.erlang.vm.dirty_io_schedulers** <br>(gauge) | \[OpenMetrics\] 에뮬레이터가 사용하는 더티 I/O 스케줄러 스레드 수<br>_thread로 표시됨_ |
| **rabbitmq.erlang.vm.dist.node_queue_size_bytes** <br>(gauge) | \[OpenMetrics\] 출력 분배 대기열에 있는 바이트 수. 이 대기열는 Erlang 코드와 포트 드라이버 사이에 있습니다.<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.node_state** <br>(gauge) | \[OpenMetrics\] 분배 링크의 현재 상태. 상태는 숫자 값으로 표시되며, `pending=1', `up_pending=2' 및 `up=3'을 의미합니다.| | **rabbitmq.erlang.vm.dist.port_input_bytes** <br>(gauge) | [OpenMetrics] 포트에서 읽은 총 바이트 수<br>_byte로 표시됨_ | | **rabbitmq.erlang.vm.dist.port_memory_bytes** <br>(gauge) | [OpenMetrics] 런타임 시스템에서 이 포트에 할당한 총 바이트 수. 포트 자체에 포함되지 않은 할당된 메모리가 있을 수 있습니다.<br>_byte로 표시됨_ | | **rabbitmq.erlang.vm.dist.port_output_bytes** <br>(gauge) | [OpenMetrics] 포트에 기록된 총 바이트 수<br>_byte로 표시됨_ | | **rabbitmq.erlang.vm.dist.port_queue.size_bytes** <br>(gauge) | [OpenMetrics] ERTS 드라이버 대기열 구현을 사용하는 포트에서 대기 중인 총 바이트 수<br>_byte로 표시됨_ | | **rabbitmq.erlang.vm.dist.proc.heap_size_words** <br>(gauge) | [OpenMetrics] 프로세스의 가장 최근 힙 세대 크기를 단어 단위로 나타낸 값. 이 세대에는 프로세스 스택이 포함됩니다. 이 정보는 구현에 따라 크게 달라지며, 구현이 변경될 경우 함께 변경될 수 있습니다.| | **rabbitmq.erlang.vm.dist.proc.memory_bytes** <br>(gauge) | [OpenMetrics] 프로세스의 크기(바이트). 여기에는 호출 스택, 힙 및 내부 구조가 포함됩니다.<br>_byte로 표시됨_ | | **rabbitmq.erlang.vm.dist.proc.message_queue_len** <br>(gauge) | [OpenMetrics] 프로세스의 메시지 대기열에 현재 있는 메시지 수<br>_message로 표시됨_ | | **rabbitmq.erlang.vm.dist.proc.min_bin_vheap_size_words** <br>(gauge) | [OpenMetrics] 프로세스에 필요한 최소 바이너리 가상 힙 크기| | **rabbitmq.erlang.vm.dist.proc.min_heap_size_words** <br>(gauge) | [OpenMetrics] 프로세스에 필요한 최소 힙 크기| | **rabbitmq.erlang.vm.dist.proc.reductions** <br>(gauge) | [OpenMetrics] 해당 프로세스에서 실행된 감소 횟수| | **rabbitmq.erlang.vm.dist.proc.stack_size_words** <br>(gauge) | [OpenMetrics] 프로세스의 스택 크기(단어 단위)| | **rabbitmq.erlang.vm.dist.proc.status** <br>(gauge) | [OpenMetrics] 분배 프로세스 현재 상태. 상태는 숫자 값으로 표시됩니다. `exiting=1', `suspended=2', `runnable=3', `garbage_collecting=4', `running=5' and \`waiting=6'.|
| **rabbitmq.erlang.vm.dist.proc.total_heap_size_words** <br>(gauge) | \[OpenMetrics\] 프로세스의 모든 힙 조각 총 크기(단어 단위). 여기에는 프로세스 스택과 힙의 일부로 간주되는 수신되지 않은 메시지가 모두 포함됩니다.|
| **rabbitmq.erlang.vm.dist.recv.avg_bytes** <br>(gauge) | \[OpenMetrics\] 소켓이 수신한 패킷의 평균 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.recv.cnt** <br>(gauge) | \[OpenMetrics\] 소켓이 수신한 패킷 수|
| **rabbitmq.erlang.vm.dist.recv.dvi_bytes** <br>(gauge) | \[OpenMetrics\] 소켓에서 수신된 패킷 크기의 평균 편차(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.recv.max_bytes** <br>(gauge) | \[OpenMetrics\] 소켓이 수신한 가장 큰 패킷의 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.recv_bytes** <br>(gauge) | \[OpenMetrics\] 소켓이 수신한 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.send.avg_bytes** <br>(gauge) | \[OpenMetrics\] 소켓에서 전송된 패킷의 평균 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.send.cnt** <br>(gauge) | \[OpenMetrics\] 소켓에서 전송된 패킷 수|
| **rabbitmq.erlang.vm.dist.send.max_bytes** <br>(gauge) | \[OpenMetrics\] 소켓에서 전송된 가장 큰 패킷의 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.send.pend_bytes** <br>(gauge) | \[OpenMetrics\] 소켓에서 전송 대기 중인 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.dist.send_bytes** <br>(gauge) | \[OpenMetrics\] 소켓에서 전송된 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.ets_limit** <br>(gauge) | \[OpenMetrics\] 허용되는 최대 ETS 테이블 수|
| **rabbitmq.erlang.vm.logical_processors** <br>(gauge) | \[OpenMetrics\] 시스템에서 구성되어 감지된 논리 프로세서 수|
| **rabbitmq.erlang.vm.logical_processors.available** <br>(gauge) | \[OpenMetrics\] Erlang 런타임 시스템에서 사용 가능한, 감지된 논리 프로세서 수|
| **rabbitmq.erlang.vm.logical_processors.online** <br>(gauge) | \[OpenMetrics\] 시스템에서 온라인 상태로 감지된 논리 프로세서 수|
| **rabbitmq.erlang.vm.memory.atom_bytes_total** <br>(gauge) | \[OpenMetrics\] 현재 Atom에 할당된 총 메모리 용량. 이 메모리는 시스템 메모리로 표시되는 메모리의 일부입니다.<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.memory.bytes_total** <br>(gauge) | \[OpenMetrics\] 현재 할당된 총 메모리 용량. 이는 프로세스 메모리와 시스템 메모리 크기의 합계와 같습니다.<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.memory.dets_tables** <br>(gauge) | \[OpenMetrics\] Erlang VM DETS 테이블 수|
| **rabbitmq.erlang.vm.memory.ets_tables** <br>(gauge) | \[OpenMetrics\] Erlang VM ETS 테이블 수|
| **rabbitmq.erlang.vm.memory.processes_bytes_total** <br>(gauge) | \[OpenMetrics\] 현재 Erlang 프로세스에 할당된 총 메모리 용량<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.memory.system_bytes_total** <br>(gauge) | \[OpenMetrics\] 현재 에뮬레이터에 할당된 메모리 중 Erlang 프로세스와 직접적인 관련이 없는 총 메모리 양. 프로세스로 표시되는 메모리는 포함되지 않습니다.<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.alloc_seconds.count** <br>(count) | \[OpenMetrics\] 메모리 관리에 소요된 총 시간(초). 추가 상태가 없으면 이 시간은 다른 모든 상태에 분산됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.aux_seconds.count** <br>(count) | \[OpenMetrics\] 보조 작업 처리에 소요된 총 시간(초)<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.bif_seconds.count** <br>(count) | \[OpenMetrics\] BIF에서 소요된 총 시간(초). 추가 상태가 없는 경우 이 시간은 'emulator' 상태에 포함됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.busy_wait_seconds.count** <br>(count) | \[OpenMetrics\] 대기하는 데 소요된 총 시간(초). 추가 상태가 없는 경우 이 시간은 'other' 상태에 포함됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.check_io_seconds.count** <br>(count) | \[OpenMetrics\] 새로운 I/O 이벤트를 확인하는 데 소요된 총 시간(초)<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.emulator_seconds.count** <br>(count) | \[OpenMetrics\] Erlang 프로세스 실행에 소요된 총 시간(초)<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.ets_seconds.count** <br>(count) | \[OpenMetrics\] ETS BIF 실행에 소요된 총 시간(초). 추가 상태가 없는 경우 이 시간은 'emulator' 상태에 포함됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.gc_full_seconds.count** <br>(count) | \[OpenMetrics\] 전체 가비지 컬렉션에 소요된 총 시간(초). 추가 상태가 없는 경우 이 시간은 'gc' 상태에 포함됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.gc_seconds.count** <br>(count) | \[OpenMetrics\] 가비지 컬렉션에 소요된 총 시간(초). 추가 상태가 활성화된 경우, 부분 가비지 컬렉션에 소요된 시간입니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.nif_seconds.count** <br>(count) | \[OpenMetrics\] NIF에서 소요된 총 시간(초). 추가 상태가 없는 경우 이 시간은 'emulator' 상태에 포함됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.other_seconds.count** <br>(count) | \[OpenMetrics\] 기록되지 않은 활동에 소요된 총 시간(초)<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.port_seconds.count** <br>(count) | \[OpenMetrics\] 포트 실행에 소요된 총 시간(초)<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.send_seconds.count** <br>(count) | \[OpenMetrics\] 메시지 전송에 소요된 총 시간(초)(프로세스만 해당). 추가 상태가 없으면 이 시간은 'emulator' 상태에 포함됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.sleep_seconds.count** <br>(count) | \[OpenMetrics\] 잠자는 데 소요된 총 시간(초)<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.msacc.timers_seconds.count** <br>(count) | \[OpenMetrics\] 타이머 관리에 소요된 총 시간(초). 추가 상태가 없는 경우 이 시간은 'other' 상태에 포함됩니다.<br>_second로 표시됨_ |
| **rabbitmq.erlang.vm.port_count** <br>(gauge) | \[OpenMetrics\] 현재 로컬 노드에 존재하는 포트 수|
| **rabbitmq.erlang.vm.port_limit** <br>(gauge) | \[OpenMetrics\] 로컬 노드에서 동시에 존재할 수 있는 최대 포트 수|
| **rabbitmq.erlang.vm.process_count** <br>(gauge) | \[OpenMetrics\] 로컬 노드에 현재 실행 중인 프로세스 수<br>_process로 표시됨_ |
| **rabbitmq.erlang.vm.process_limit** <br>(gauge) | \[OpenMetrics\] 로컬 노드에서 동시에 실행될 수 있는 최대 프로세스 수<br>_process로 표시됨_ |
| **rabbitmq.erlang.vm.schedulers** <br>(gauge) | \[OpenMetrics\] 에뮬레이터가 사용하는 스케줄러 스레드 수|
| **rabbitmq.erlang.vm.schedulers_online** <br>(gauge) | \[OpenMetrics\] 온라인 상태의 스케줄러 수|
| **rabbitmq.erlang.vm.smp_support** <br>(gauge) | \[OpenMetrics\] 에뮬레이터가 SMP 지원으로 컴파일된 경우 1, 그렇지 않은 경우 0.|
| **rabbitmq.erlang.vm.statistics.bytes_output.count** <br>(count) | \[OpenMetrics\] 포트로 출력된 총 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.statistics.bytes_received.count** <br>(count) | \[OpenMetrics\] 포트를 통해 수신된 총 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.statistics.context_switches.count** <br>(count) | \[OpenMetrics\] 시스템 시작 이후 발생한 컨텍스트 스위치 총 횟수|
| **rabbitmq.erlang.vm.statistics.dirty_cpu_run_queue_length** <br>(gauge) | \[OpenMetrics\] 더티 CPU 실행 대기열 길이|
| **rabbitmq.erlang.vm.statistics.dirty_io_run_queue_length** <br>(gauge) | \[OpenMetrics\] 더티 IO 실행 대기열 길이|
| **rabbitmq.erlang.vm.statistics.garbage_collection.bytes_reclaimed.count** <br>(count) | \[OpenMetrics\] 가비지 컬렉션: 회수된 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.erlang.vm.statistics.garbage_collection.number_of_gcs.count** <br>(count) | \[OpenMetrics\] 가비지 컬렉션: GC 횟수|
| **rabbitmq.erlang.vm.statistics.garbage_collection.words_reclaimed.count** <br>(count) | \[OpenMetrics\] 가비지 컬렉션: 회수된 단어 수|
| **rabbitmq.erlang.vm.statistics.reductions.count** <br>(count) | \[OpenMetrics\] 총 감소 횟수|
| **rabbitmq.erlang.vm.statistics.run_queues_length** <br>(gauge) | \[OpenMetrics\] 일반 실행 대기열 길이|
| **rabbitmq.erlang.vm.statistics.runtime_milliseconds.count** <br>(count) | \[OpenMetrics\] Erlang 런타임 시스템의 모든 스레드 실행 시간의 합계. 실제 시간보다 클 수 있습니다.<br>_millisecond로 표시됨_ |
| **rabbitmq.erlang.vm.statistics.wallclock_time_milliseconds.count** <br>(count) | \[OpenMetrics\] 벽시계(wall clock)에 관한 정보. 실제 시간을 측정한다는 것을 제외하면 erlang_vm_statistics_runtime_milliseconds와 동일합니다.<br>_millisecond로 표시됨_ |
| **rabbitmq.erlang.vm.thread_pool_size** <br>(gauge) | \[OpenMetrics\] 비동기 드라이버 호출에 사용되는 비동기 스레드 풀의 비동기 스레드 수|
| **rabbitmq.erlang.vm.threads** <br>(gauge) | \[OpenMetrics\] 에뮬레이터가 스레드 지원으로 컴파일된 경우 1, 그렇지 않으면 0.|
| **rabbitmq.erlang.vm.time_correction** <br>(gauge) | \[OpenMetrics\] 시간 보정이 활성화된 경우 1, 그렇지 않으면 0.|
| **rabbitmq.erlang.vm.wordsize_bytes** <br>(gauge) | \[OpenMetrics\] Erlang 용어 워드 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.exchange.messages.ack.count** <br>(gauge) | 익스체인지를 통해 클라이언트에게 전달된 후 확인된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.ack.rate** <br>(gauge) | 익스체인지에서 클라이언트로 전달되어 확인된 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.confirm.count** <br>(gauge) | 익스체인지에서 확인 처리가 완료된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.confirm.rate** <br>(gauge) | 익스체인지에서 초당 확인된 메시지 속도<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.deliver_get.count** <br>(gauge) | 익스체인지에서 전달된 메시지의 총합으로, 소비자에게 확인 모드로 전달된 메시지, 소비자에게 비확인 모드로 전달된 메시지, basic.get 요청에 관한 확인 모드 응답 메시지, basic.get 요청에 관한 비확인 모드 응답 메시지를 모두 포함합니다.<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.deliver_get.rate** <br>(gauge) | 확인 모드로 소비자에게 전달된 익스체인지 메시지, 비확인 모드로 소비자에게 전달된 익스체인지 메시지, basic.get에 관한 확인 모드 응답 메시지, 그리고 basic.get에 관한 비확인 모드 응답 메시지 합계의 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.publish.count** <br>(gauge) | 익스체인지에서 발행된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.publish.rate** <br>(gauge) | 익스체인지에 발행된 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.publish_in.count** <br>(gauge) | 채널에서 이 익스체인지로 발행된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.publish_in.rate** <br>(gauge) | 채널에서 이 익스체인지로 발행된 메시지의 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.publish_out.count** <br>(gauge) | 이 익스체인지에서 대기열에 발행된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.publish_out.rate** <br>(gauge) | 이 익스체인지에서 대기열로 발행되는 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.redeliver.count** <br>(gauge) | redelivered 플래그가 설정된 deliver_get 익스체인지에서 메시지 하위 집합 개수<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.redeliver.rate** <br>(gauge) | redelivered 플래그가 설정된 deliver_get 익스체인지에서 메시지 하위 집합 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.return_unroutable.count** <br>(gauge) | 익스체인지에서 라우팅 불가로 발행자에게 반환된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.exchange.messages.return_unroutable.rate** <br>(gauge) | 익스체인지에서 라우팅 불가로 발행자에게 반환된 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.global.consumers** <br>(gauge) | \[OpenMetrics\] 현재 소비자 수|
| **rabbitmq.global.messages.acknowledged.count** <br>(count) | \[OpenMetrics\] 소비자가 확인한 메시지 총 개수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.confirmed.count** <br>(count) | \[OpenMetrics\] 발행자에게 확인된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.dead_lettered.confirmed.count** <br>(count) | \[OpenMetrics\] 데드레터 처리되고 대상 대기열에서 확인된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.dead_lettered.delivery_limit.count** <br>(count) | \[OpenMetrics\] 전달 한도 초과로 데드레터 처리된 총 메시지 수<br>_message로표시됨_ |
| **rabbitmq.global.messages.dead_lettered.expired.count** <br>(count) | \[OpenMetrics\] 메시지 TTL 초과로 데드레터 처리된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.dead_lettered.maxlen.count** <br>(count) | \[OpenMetrics\] overflow drop-head 또는 reject-publish-dlx로 인해 데드레터 처리된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.dead_lettered.rejected.count** <br>(count) | \[OpenMetrics\] basic.reject 또는 basic.nack으로 인해 데드레터 처리된 메시지 총 개수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.delivered.consume_auto_ack.count** <br>(count) | \[OpenMetrics\] 자동 확인 기능이 포함된 basic.consume을 사용해 소비자에게 전달된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.delivered.consume_manual_ack.count** <br>(count) | \[OpenMetrics\] 수동 확인이 포함된 basic.consume을 사용하여 소비자에게 전달된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.delivered.count** <br>(count) | \[OpenMetrics\] 소비자에게 전달된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.delivered.get_auto_ack.count** <br>(count) | \[OpenMetrics\] 자동 확인이 포함된 basic.get을 사용하여 소비자에게 전달된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.delivered.get_manual_ack.count** <br>(count) | \[OpenMetrics\] 수동 확인이 포함된 basic.get을 사용하여 소비자에게 전달된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.get_empty.count** <br>(count) | \[OpenMetrics\] basic.get 작업이 메시지를 가져오지 않은 총 횟수|
| **rabbitmq.global.messages.received.count** <br>(count) | \[OpenMetrics\] 발행자로부터 수신한 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.received_confirm.count** <br>(count) | \[OpenMetrics\] 발행자로부터 수신한 확인 메시지 총 개수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.redelivered.count** <br>(count) | \[OpenMetrics\] 소비자에게 재전송된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.routed.count** <br>(count) | \[OpenMetrics\] 대기열 또는 스트림으로 라우팅된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.unroutable.dropped.count** <br>(count) | \[OpenMetrics\] 익스체인지에 non-mandatory로 발행되었으나, 라우팅되지 않아 삭제된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.messages.unroutable.returned.count** <br>(count) | \[OpenMetrics\] 익스체인지에 mandatory로 발행되었으나 라우팅 불가로 발행자에게 반환된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.global.publishers** <br>(gauge) | \[OpenMetrics\] 현재 발행자 수|
| **rabbitmq.identity_info** <br>(gauge) | \[OpenMetrics\] RabbitMQ 노드 & 클러스터 ID 정보|
| **rabbitmq.io.read_bytes.count** <br>(count) | \[OpenMetrics\] 읽은 총 I/O 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.io.read_ops.count** <br>(count) | \[OpenMetrics\] 총 I/O 읽기 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.io.read_time_seconds.count** <br>(count) | \OpenMetrics\] 총 I/O 읽기 시간<br>_second로 표시됨_ |
| **rabbitmq.io.reopen_ops.count** <br>(count) | \OpenMetrics\] 파일을 다시 연 총 횟수|
| **rabbitmq.io.seek_ops.count** <br>(count) | \[OpenMetrics\] 총 I/O 탐색 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.io.seek_time_seconds.count** <br>(count) | \OpenMetrics\] 총 I/O 탐색 시간<br>_second로 표시됨_ |
| **rabbitmq.io.sync_ops.count** <br>(count) | \[OpenMetrics\] 총 I/O 동기화 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.io.sync_time_seconds.count** <br>(count) | \OpenMetrics\] 총 I/O 동기화 시간<br>_second로 표시됨_ |
| **rabbitmq.io.write_bytes.count** <br>(count) | \[OpenMetrics\] 총 기록된 I/O 바이트 수<br>_byte로 표시됨_ |
| **rabbitmq.io.write_ops.count** <br>(count) | \[OpenMetrics\] 총 I/O 쓰기 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.io.write_time_seconds.count** <br>(count) | \OpenMetrics\] 총 I/O 쓰기 시간<br>_second로 표시됨_ |
| **rabbitmq.msg_store.read.count** <br>(count) | \[OpenMetrics\] 총 Message Store 읽기 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.msg_store.write.count** <br>(count) | \[OpenMetrics\] 총 Message Store 쓰기 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.node.disk_alarm** <br>(gauge) | 노드에 디스크 알람이 있는지 여부|
| **rabbitmq.node.disk_free** <br>(gauge) | 현재 디스크 여유 공간<br>_byte로 표시_ |
| **rabbitmq.node.fd_used** <br>(gauge) | 사용된 파일 디스크립터|
| **rabbitmq.node.mem_alarm** <br>(gauge) | 호스트에 메모리 알람이 있는지 여부|
| **rabbitmq.node.mem_limit** <br>(gauge) | 메모리 사용량 상한점(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.node.mem_used** <br>(gauge) | 메모리 사용량(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.node.partitions** <br>(gauge) | 이 노드에서 감지된 네트워크 파티션 수|
| **rabbitmq.node.run_queue** <br>(gauge) | 실행 대기 중인 평균 Erlang 프로세스 수<br>_process로 표시됨_ |
| **rabbitmq.node.running** <br>(gauge) | 노드가 실행 중인지 여부|
| **rabbitmq.node.sockets_used** <br>(gauge) | 소켓으로 사용되는 파일 디스크립터 수|
| **rabbitmq.overview.messages.ack.count** <br>(gauge) | 클라이언트에 전달되어 확인된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.ack.rate** <br>(gauge) | 클라이언트에 전달되고 확인된 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.confirm.count** <br>(gauge) | 확인된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.confirm.rate** <br>(gauge) | 확인된 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.deliver_get.count** <br>(gauge) | 소비자에게 확인 모드로 전달된 메시지, 소비자에게 비확인 모드로 전달된 메시지, basic.get의 확인 모드 응답 메시지, basic.get의 비확인 모드 응답 메시지 총 합계<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.deliver_get.rate** <br>(gauge) | 확인 모드로 소비자에게 전달된 메시지, 비확인 모드로 소비자에게 전달된 메시지, basic.get의 확인 모드 응답 메시지, 그리고 basic.get의 비확인 모드 응답 메시지 합계의 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.drop_unroutable.count** <br>(gauge) | 라우팅 불가로 삭제된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.drop_unroutable.rate** <br>(gauge) | 라우팅 불가로 삭제된 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.publish.count** <br>(gauge) | 발행된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.publish.rate** <br>(gauge) | 초당 발행된 메시지 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.publish_in.count** <br>(gauge) | 채널에서 이 개요에 발행된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.publish_in.rate** <br>(gauge) | 채널에서 이 개요로 초당 발행된 메시지 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.publish_out.count** <br>(gauge) | 이 개요에서 대기열에 발행된 메시지 개수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.publish_out.rate** <br>(gauge) | 이 개요에서 초당 대기열에 발행된 메시지 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.redeliver.count** <br>(gauge) | redelivered 플래그가 설정된 deliver_get의 메시지 하위 집합 개수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.redeliver.rate** <br>(gauge) | redelivered 플래그가 설정된 deliver_get의 메시지 하위 집합 초당 속도 <br>_message로 표시됨_ |
| **rabbitmq.overview.messages.return_unroutable.count** <br>(gauge) | 라우팅 불가로 발행자에게 반환된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.messages.return_unroutable.rate** <br>(gauge) | 라우팅 불가로 발행자에게 반환되는 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.object_totals.channels** <br>(gauge) | 총 채널 수<br>_item으로 표시됨_ |
| **rabbitmq.overview.object_totals.connections** <br>(gauge) | 총 연결 수<br>_connection으로 표시됨_ |
| **rabbitmq.overview.object_totals.consumers** <br>(gauge) | 총 소비자 수<br>_item으로 표시됨_ |
| **rabbitmq.overview.object_totals.queues** <br>(gauge) | 총 대기열 수<br>_item으로 표시됨_ |
| **rabbitmq.overview.queue_totals.messages.count** <br>(gauge) | 총 메시지 수(ready 및 unacknowledged)<br>_message로 표시됨_ |
| **rabbitmq.overview.queue_totals.messages.rate** <br>(gauge) | 메시지(ready 및 unacknowledged) 수의 속도<br>_message로 표시됨_ |
| **rabbitmq.overview.queue_totals.messages_ready.count** <br>(gauge) | 전송 준비된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.queue_totals.messages_ready.rate** <br>(gauge) | 전송 준비된 메시지 수의 속도 <br>_message로 표시됨_ |
| **rabbitmq.overview.queue_totals.messages_unacknowledged.count** <br>(gauge) | 확인되지 않은 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.overview.queue_totals.messages_unacknowledged.rate** <br>(gauge) | 확인되지 않은 메시지 수의 속도<br>_message로 표시됨_ |
| **rabbitmq.process.max_fds** <br>(gauge) | \[OpenMetrics\] 열린 파일 디스크립터 제한|
| **rabbitmq.process.max_tcp_sockets** <br>(gauge) | \[OpenMetrics\] 열린 TCP 소켓 제한|
| **rabbitmq.process.open_fds** <br>(gauge) | \[OpenMetrics\] 열린 파일 디스크립터|
| **rabbitmq.process.open_tcp_sockets** <br>(gauge) | \[OpenMetrics\] 열린 TCP 소켓|
| **rabbitmq.process.resident_memory_bytes** <br>(gauge) | \OpenMetrics\] 메모리 사용량(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.process_start_time_seconds** <br>(gauge) | \OpenMetrics\] Unix epoch 이후 프로세스 시작 시간(초)<br>_second로 표시됨_ |
| **rabbitmq.queue.active_consumers** <br>(gauge) | 활성 소비자 수, 대기열로 전송된 모든 메시지를 즉시 수신할 수 있는 소비자 수|
| **rabbitmq.queue.bindings.count** <br>(gauge) | 특정 대기열의 바인딩 수|
| **rabbitmq.queue.consumer_capacity** <br>(gauge) | \OpenMetrics\] 소비자 용량|
| **rabbitmq.queue.consumer_utilisation** <br>(gauge) | 대기열에 있는 소비자가 새 메시지를 받을 수 있는 시간 비율<br>_fraction으로 표시됨_ |
| **rabbitmq.queue.consumers** <br>(gauge) | 소비자 수|
| **rabbitmq.queue.disk_reads.count** <br>(count) | \OpenMetrics\] 대기열가 디스크로부터 메시지들을 읽어들인 총 횟수|
| **rabbitmq.queue.disk_writes.count** <br>(count) | \[OpenMetrics\] 대기열가 디스크에 메시지를 기록한 총 횟수|
| **rabbitmq.queue.get.ack.count** <br>(count) | \OpenMetrics\] 수동 확인 모드에서 basic.get을 사용하여 대기열에서 가져온 총 메시지 수|
| **rabbitmq.queue.get.count** <br>(count) | \OpenMetrics\] 자동 확인 모드에서 basic.get을 사용하여 대기열에서 가져온 총 메시지 수|
| **rabbitmq.queue.get.empty.count** <br>(count) | \OpenMetrics\] basic.get 작업이 대기열에서 메시지를 가져오지 않은 총 횟수|
| **rabbitmq.queue.head_message_timestamp** <br>(gauge) | \[OpenMetrics, Management CLI\] 대기열의 헤드 메시지의 타임스탬프. 대기열에 메시지가 있다면, 첫 번째 메시지의 타임스탬프<br>_millisecond로 표시됨_ |
| **rabbitmq.queue.index.read_ops.count** <br>(count) | \[OpenMetrics\] 총 Queue Index 읽기 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.queue.index.write_ops.count** <br>(count) | \[OpenMetrics\] 총 Queue Index 쓰기 작업 수<br>_operation으로 표시됨_ |
| **rabbitmq.queue.memory** <br>(gauge) | 스택, 힙 및 내부 구조를 포함하여 대기열와 관련된 Erlang 프로세스가 사용하는 메모리 바이트<br>_byte로 표시됨_ |
| **rabbitmq.queue.message_bytes** <br>(gauge) | 클라이언트에 전달할 준비가 된 메시지 바이트 수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages** <br>(gauge) | \[OpenMetrics, Management CLI\] 대기열의 총 메시지 수, 즉 ready 및 unacknowledged  메시지의 합계(총 대기열 깊이)<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.ack.count** <br>(gauge) | 클라이언트에 전달되어 확인된 대기열의 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.ack.rate** <br>(gauge) | 클라이언트에 전달되어 확인된 초당 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.acked.count** <br>(count) | \OpenMetrics\] 대기열에서 소비자가 확인한 총 메시지 수|
| **rabbitmq.queue.messages.bytes** <br>(gauge) | \OpenMetrics\] ready 및 unacknowledged 메시지 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.queue.messages.deliver.count** <br>(gauge) | 소비자에게 확인 모드로 전달된 메시지 개수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.deliver.rate** <br>(gauge) | 소비자에게 확인 모드로 전달된 메시지 비율<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.deliver_get.count** <br>(gauge) | 대기열에서 전달된 메시지의 합계로 소비자에게 확인 모드로 전달된 메시지, 소비자에게 비확인 모드로 전달된 메시지, basic.get의 확인 모드 응답 메시지, basic.get의 비확인 모드 응답 메시지 합계<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.deliver_get.rate** <br>(gauge) | 대기열에 있는 메시지 합계의 초당 속도이며, 확인 모드로 소비자에게 전달된 메시지, 비확인 모드로 소비자에게 전달된 메시지, basic.get의 확인 모드 응답 메시지, basic.get의 비확인 모드 응답 메시지 합계의 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.delivered.ack.count** <br>(count) | \OpenMetrics\] 자동 확인 모드로 대기열에서 소비자에게 전달된 총 메시지 수|
| **rabbitmq.queue.messages.delivered.count** <br>(count) | \OpenMetrics\] 자동 확인 모드로 대기열에서 소비자에게 전달된 총 메시지 수|
| **rabbitmq.queue.messages.paged_out** <br>(gauge) | \OpenMetrics\] 디스크로 페이지 아웃된 메시지|
| **rabbitmq.queue.messages.paged_out_bytes** <br>(gauge) | \OpenMetrics\] 디스크로 페이지 아웃된 메시지 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.queue.messages.persistent** <br>(gauge) | \OpenMetrics\] 영구 메시지<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.persistent_bytes** <br>(gauge) | \OpenMetrics\] 영구 메시지 크기(바이트)<br>_ byte로 표시됨_ |
| **rabbitmq.queue.messages.publish.count** <br>(gauge) | 대기열에서 발행된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.publish.rate** <br>(gauge) | 발행된 메시지 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.published.count** <br>(count) | \[OpenMetrics\] 대기열에 발행된 총 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.ram** <br>(gauge) | \OpenMetrics\] 메모리에 저장된 ready 및 unacknowledged 메시지<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.ram_bytes** <br>(gauge) | \OpenMetrics\] 메모리에 저장된 ready 및 unacknowledged 메시지 크기<br>_byte로 표시됨_ |
| **rabbitmq.queue.messages.rate** <br>(gauge) | 대기열에 있는 전체 메시지 초당 개수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.ready** <br>(gauge) | \OpenMetrics\] 소비자에게 전달할 준비가 된 메시지<br>_ message로 표시됨_ |
| **rabbitmq.queue.messages.ready_bytes** <br>(gauge) | \OpenMetrics\] 준비된 메시지 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.queue.messages.ready_ram** <br>(gauge) | \OpenMetrics\] 메모리에 저장되어 있는 준비된 메시지<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.redeliver.count** <br>(gauge) | redelivered 플래그가 설정된 deliver_get의 대기열에 있는 메시지 하위 집합 개수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.redeliver.rate** <br>(gauge) | redelivered 플래그가 설정된 deliver_get의 메시지 하위 집합 초당 속도<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.redelivered.count** <br>(count) | \OpenMetrics\] 대기열에서 소비자에게 재전송된 총 메시지 수|
| **rabbitmq.queue.messages.unacked** <br>(gauge) | \OpenMetrics\] 소비자에게 전달되었지만 아직 확인되지 않은 메시지<br>_message로 표시됨_ |
| **rabbitmq.queue.messages.unacked_bytes** <br>(gauge) | \OpenMetrics\] 확인되지 않은 모든 메시지 크기(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.queue.messages.unacked_ram** <br>(gauge) | \[OpenMetrics\] 메모리에 저장된 미확인 메시지<br>_message로 표시됨_ |
| **rabbitmq.queue.messages_ready** <br>(gauge) | 클라이언트에 전달할 준비가 된 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages_ready.rate** <br>(gauge) | 클라이언트에 전달할 준비가 된 초당 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.queue.messages_unacknowledged** <br>(gauge) | 클라이언트에 전달되었지만 아직 확인되지 않은 메시지 수<br>_ message로 표시됨_ |
| **rabbitmq.queue.messages_unacknowledged.rate** <br>(gauge) | 클라이언트에 전달되었지만 아직 확인되지 않은 초당 메시지 수<br>_message로 표시됨_ |
| **rabbitmq.queue.process_memory_bytes** <br>(gauge) | \OpenMetrics\] Erlang 대기열 프로세스 메모리 사용량(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.queue.process_reductions.count** <br>(count) | \OpenMetrics\] 총 대기열 프로세스 감소 수|
| **rabbitmq.queues** <br>(gauge) | \OpenMetrics\] 사용 가능한 대기열|
| **rabbitmq.queues.created.count** <br>(count) | \OpenMetrics\] 생성된 총 대기열 수|
| **rabbitmq.queues.declared.count** <br>(count) | \OpenMetrics\] 선언된 총 대기열 수|
| **rabbitmq.queues.deleted.count** <br>(count) | \OpenMetrics\] 삭제된 총 대기열 수|
| **rabbitmq.raft.entry_commit_latency_seconds** <br>(gauge) | \OpenMetrics\] 로그 항목이 커밋되는 데 걸리는 시간<br>_second로 표시됨_ |
| **rabbitmq.raft.log.commit_index** <br>(gauge) | \OpenMetrics\] Raft 로그 커밋 인덱스|
| **rabbitmq.raft.log.last_applied_index** <br>(gauge) | \OpenMetrics\] Raft 로그 마지막 적용 인덱스|
| **rabbitmq.raft.log.last_written_index** <br>(gauge) | \OpenMetrics\] Raft 로그 마지막 작성 인덱스|
| **rabbitmq.raft.log.snapshot_index** <br>(gauge) | \OpenMetrics\] Raft 로그 스냅샷 인덱스|
| **rabbitmq.raft.term.count** <br>(count) | \OpenMetrics\] 현재 Raft 임기 번호|
| **rabbitmq.resident_memory_limit_bytes** <br>(gauge) | \OpenMetrics\] 메모리 사용량 상한치(바이트)<br>_byte로 표시됨_ |
| **rabbitmq.schema.db.disk_tx.count** <br>(count) | \[OpenMetrics\] 총 Schema DB 디스크 트랜잭션 수<br>_transaction으로 표시됨_ |
| **rabbitmq.schema.db.ram_tx.count** <br>(count) | \[OpenMetrics\] 총 Schema DB 메모리 트랜잭션 수<br>_transaction으로 표시됨_ |
| **rabbitmq.telemetry.scrape.duration_seconds.count** <br>(count) | \OpenMetrics\] 스크레이프 소요 시간<br>_second로 표시됨_ |
| **rabbitmq.telemetry.scrape.duration_seconds.sum** <br>(count) | \OpenMetrics\] 스크레이프 소요 시간<br>_second로 표시됨_ |
| **rabbitmq.telemetry.scrape.encoded_size_bytes.count** <br>(count) | \OpenMetrics\] 스크레이프 크기(인코딩됨)<br>_byte로 표시됨_ |
| **rabbitmq.telemetry.scrape.encoded_size_bytes.sum** <br>(count) | \OpenMetrics\] 스크레이프 크기(인코딩됨)<br>_byte로 표시됨_ |
| **rabbitmq.telemetry.scrape.size_bytes.count** <br>(count) | \OpenMetrics\] 스크레이프 크기(인코딩되지 않음)<br>_byte로 표시됨_ |
| **rabbitmq.telemetry.scrape.size_bytes.sum** <br>(count) | \OpenMetrics\] 스크레이프 크기(인코딩되지 않음)<br>_byte로 표시됨_ |

### 이벤트

### 서비스 점검

**rabbitmq.aliveness**

RabbitMQ Management Plugin에서만 사용할 수 있습니다. RabbitMQ [Aliveness API][16]를 기반으로 가상 호스트의 상태를 반환합니다. Aliveness API는 테스트 대기열을 생성한 후 해당 대기열에서 메시지를 발행하고 소비합니다. API에서 상태 코드가 200이면 `OK`를, 그렇지 않으면 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**rabbitmq.status**

RabbitMQ Management Plugin에서만 사용할 수 있습니다. RabbitMQ 서버의 상태를 반환합니다. Agent가 API에 연결할 수 있었으면 `OK`를, 그 외에는 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**rabbitmq.openmetrics.health**

RabbitMQ Prometheus Plugin에서만 사용할 수 있습니다. Agent가 OpenMetrics 엔드포인트에 연결할 수 없으면 `CRITICAL`을, 그 외에는 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

### Prometheus Plugin으로 마이그레이션

Prometheus 플러그인은 Management Plugin과는 다른 메트릭 세트를 노출합니다.
Management에서 Prometheus Plugin으로 마이그레이션할 때 주의해야 할 사항은 다음과 같습니다.

- [이 표][17]에서 메트릭을 확인하세요. 메트릭 설명에 `[OpenMetrics]` 태그가 포함되어 있으면 Prometheus Plugin에서 사용할 수 있습니다. Management Plugin에서만 사용할 수 있는 메트릭은 설명에 태그가 없습니다.
- Management Plugin 메트릭을 사용하는 대시보드와 모니터는 작동하지 않습니다. *OpenMetrics Version*으로 표시된 대시보드와 모니터로 전환하세요.
- 기본 구성은 집계된 메트릭을 수집합니다. 즉, 예를 들어 대기열로 태그된 메트릭이 없습니다. `prometheus_plugin.unaggregated_endpoint` 옵션을 구성하여 집계 없이 메트릭을 가져오세요.
- `rabbitmq.status` 서비스 점검은 `rabbitmq.openmetrics.health`로 교체되었습니다. Prometheus Plugin에는 `rabbitmq.aliveness` 서비스 점검과 동일한 기능이 없습니다.

Prometheus Plugin은 일부 태그를 변경합니다. 아래 표는 보다 일반적인 태그에 대한 변경 사항을 설명합니다.

| 관리          | Prometheus                               |
|:--------------------|:-----------------------------------------|
| `queue_name`        | `queue`                                  |
| `rabbitmq_vhost`    | `vhost`, `exchange_vhost`, `queue_vhost` |
| `rabbitmq_exchange` | `exchange`                               |

자세한 내용은 [태그 패밀리별로 RabbitMQ 대기열 태깅][18]을 참고하세요.

도움이 필요하세요? [Datadog 지원 팀][19]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [RabbitMQ 모니터링을 위한 주요 메트릭][20]
- [RabbitMQ 모니터링 도구를 사용하여 메트릭 수집][21]
- [Datadog을 사용하여 RabbitMQ 성능 모니터링][22]

[1]: https://www.rabbitmq.com
[2]: /data_streams/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.rabbitmq.com/management.html
[5]: https://www.rabbitmq.com/prometheus.html
[6]: https://www.rabbitmq.com/prometheus.html#default-endpoint
[7]: https://www.rabbitmq.com/prometheus.html#detailed-endpoint
[8]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[9]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[11]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[12]: /containers/docker/integrations/?tab=dockeradv2
[13]: /agent/kubernetes/integrations/
[14]: /agent/kubernetes/log/
[15]: /agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/rabbitmq/rabbitmq-management/blob/rabbitmq_v3_6_8/priv/www/api/index.html
[17]: /integrations/rabbitmq/?tab=host#metrics
[18]: /integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[19]: /help/
[20]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[21]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[22]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog