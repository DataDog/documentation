---
app_id: quarkus
categories:
- metrics
- log collection
custom_kind: integration
description: Quarkus로 빌드된 애플리케이션을 모니터링하세요.
integration_version: 2.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Quarkus
---
## 개요

이 점검은 Datadog Agent를 통해 [Quarkus](https://quarkus.io/)를 모니터링합니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

Quarkus 점검은 Agent 7.62과 함께 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가적인 설치가 필요하지 않습니다.

### 설정

Quarkus에서 [이 단계](https://quarkus.io/guides/telemetry-micrometer-tutorial)를 따라 메트릭 생성을 설정합니다.

그런 다음 Agent를 구성합니다.

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `quarkus.d/conf.yaml` 파일을 편집하여 Quarkus 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 quarkus.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/quarkus/datadog_checks/quarkus/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### 로그 수집하기

[이 단계](https://quarkus.io/guides/logging)에 따라 Quarkus를 구성하여 로그를 내보내세요.

Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

```yaml
logs_enabled: true
```

`quarkus.d/conf.yaml` 파일의 `logs` 섹션을 편집하여 RabbitMQ 로그 수집을 시작하세요.

```yaml
logs:
 - type: file
   path: /var/log/application.log
   source: quarkus
   service: quarkus-app
```

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 점검 섹션에서 `quarkus`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **quarkus.http_server.active_requests** <br>(gauge) | 지금 바로 활성 서버에 요청을 전송.<br>_request로 표시됨_ |
| **quarkus.http_server.bytes_read.count** <br>(count) | 서버가 일부 바이트를 수신한 횟수.|
| **quarkus.http_server.bytes_read.max** <br>(gauge) | 현재 서버가 수신한 최대 바이트 수.<br>_byte로 표시됨_ |
| **quarkus.http_server.bytes_read.sum** <br>(count) | 시작된 이후 서버에서 수신한 총 바이트 수.<br>_byte로 표시됨_ |
| **quarkus.http_server.bytes_written.count** <br>(count) | 서버가 일부 바이트를 가져온 횟수.|
| **quarkus.http_server.bytes_written.max** <br>(gauge) | 서버가 전송한 현재 최대 바이트 수.<br>_byte로 표시됨_ |
| **quarkus.http_server.bytes_written.sum** <br>(count) | 서버에서 전송한 총 바이트 수.<br>_byte로 표시됨_ |
| **quarkus.http_server.connections.seconds.max** <br>(gauge) | 연결 기간(초)입니다.<br>_second로 표시됨_ |
| **quarkus.http_server.requests.seconds.count** <br>(count) | 지금까지 관찰된 요청 수.|
| **quarkus.http_server.requests.seconds.max** <br>(gauge) | 현재 가장 긴 요청 기간(초)입니다.<br>_초로 표시됨_ |
| **quarkus.http_server.requests.seconds.sum** <br>(count) | 지금까지 모든 요청에 걸린 총 시간(초).<br>_second로 표시됨_ |
| **quarkus.jvm.buffer.count_buffers** <br>(gauge) | 풀에 포함된 버퍼 개수 추정치.<br>_buffer로 표시됨_ |
| **quarkus.jvm.buffer.memory_used.bytes** <br>(gauge) | 이 버퍼 풀에 대해 Java 가상 머신이 사용 중인 메모리의 추정치.<br>_byte로 표시됨_ |
| **quarkus.jvm.buffer.total_capacity.bytes** <br>(gauge) | 이 풀에 있는 버퍼 총 용량의 추정치.<br>_byte로 표시됨_ |
| **quarkus.jvm.classes.loaded_classes** <br>(gauge) | Java 가상 머신에서 현재 로딩된 클래스의 수.|
| **quarkus.jvm.gc.live_data_size.bytes** <br>(gauge) | GC 이후에 회수되지 않고 잔존하는 힙 메모리 풀의 크기.<br>_byte로 표시됨_ |
| **quarkus.jvm.gc.max_data_size.bytes** <br>(gauge) | 잔존하는 힙 메모리 풀의 최대 크기.<br>_byte로 표시됨_ |
| **quarkus.jvm.gc.overhead** <br>(gauge) | 최근 조회 기간 또는 모니터링 시작 이후 중 더 짧은 기간을 기준으로, 가비지 컬렉션(GC) 활동에 사용된 CPU 시간의 비율을 \[0..1\]. 범위로 근사하여 나타낸 값입니다.|
| **quarkus.jvm.memory.committed.bytes** <br>(gauge) | Java 가상 머신이 사용하도록 커밋된 바이트 단위의 메모리 양.<br>_byte로 표시됨_ |
| **quarkus.jvm.memory.max.bytes** <br>(gauge) | 메모리 관리에 사용할 수 있는 최대 메모리 용량(바이트 단위).<br>_byte로 표시됨_ |
| **quarkus.jvm.memory.usage_after_gc** <br>(gauge) | 마지막 GC 이벤트 이후 사용된 잔존하는 힙 풀의 비율로, \[0..1\] 범위의 값.<br>_fraction으로 표시됨_ |
| **quarkus.jvm.memory.used.bytes** <br>(gauge) | 사용된 메모리 양.<br>_byte로 표시됨_ |
| **quarkus.jvm.threads.daemon_threads** <br>(gauge) | 현재 라이브 데몬 스레드 수입니다.<br>_thread로 표시됨_ |
| **quarkus.jvm.threads.live_threads** <br>(gauge) | 데몬 스레드와 비데몬 스레드를 모두 포함한 현재 라이브 스레드 수.<br>_thread로 표시됨_ |
| **quarkus.jvm.threads.peak_threads** <br>(gauge) | Java 가상 머신이 시작된 이후 최대 라이브 스레드 수 또는 피크가 재설정된 이후 최대 스레드 수.<br>_thread로 표시됨_ |
| **quarkus.jvm.threads.states_threads** <br>(gauge) | 스레드의 현재 수.<br>_스레드로 표시됨_ |
| **quarkus.netty.allocator.memory.pinned** <br>(gauge) | 할당된 버퍼가 사용하는 메모리의 크기(바이트.<br>_byte로 표시됨_ |
| **quarkus.netty.allocator.memory.used** <br>(gauge) | 할당자가 사용하는 메모리의 크기(바이트).<br>_byte로 표시됨_ |
| **quarkus.netty.allocator.pooled.arenas** <br>(gauge) | 풀링된 할당자에 대한 아레나의 수.<br>_byte로 표시됨_ |
| **quarkus.netty.allocator.pooled.cache_size** <br>(gauge) | 풀링된 할당자의 캐시 크기(바이트).<br>_byte로 표시됨_ |
| **quarkus.netty.allocator.pooled.chunk_size** <br>(gauge) | 풀링된 할당자의 메모리 청크 크기(바이트).<br>_byte로 표시됨_ |
| **quarkus.netty.allocator.pooled.threadlocal_caches** <br>(gauge) | 풀링된 할당자의 ThreadLocal 캐시 수.|
| **quarkus.netty.eventexecutor.tasks_pending** <br>(gauge) | 이벤트 실행자에서 대기 중인 작업 수.<br>_task로 표시됨_ |
| **quarkus.process.cpu.usage** <br>(gauge) | Java 가상 머신 프로세스의 최신 CPU 사용량.|
| **quarkus.process.files.max_files** <br>(gauge) | 최대 파일 디스크립터의 수.<br>_file로 표시됨_ |
| **quarkus.process.files.open_files** <br>(gauge) | 오픈 파일 디스크립터 수.<br>_file로 표시됨_ |
| **quarkus.process.uptime.seconds** <br>(gauge) | Java 가상 머신 가동 시간.<br>_second로 표시됨_ |
| **quarkus.system.cpu.count** <br>(gauge) | Java 가상 머신에서 사용 가능한 프로세서 수.|
| **quarkus.system.cpu.usage** <br>(gauge) | 애플리케이션이 실행되는 시스템의 현재 CPU 사용량.|
| **quarkus.system.load_average_1m** <br>(gauge) | 사용 가능한 프로세서에 대기 중인 실행 가능 엔티티 수와 사용 가능한 프로에서 실행 중인 실행 가능 엔터티 수의 합계를 일정 기간 동안 평균한 값.|
| **quarkus.worker_pool.active** <br>(gauge) | 현재 사용된 풀의 리소스 수.|
| **quarkus.worker_pool.idle** <br>(gauge) | 현재 사용된 풀의 리소스 수입니다.|
| **quarkus.worker_pool.queue.delay.seconds.count** <br>(count) | 처리되기 전에 대기열에서 대기한 항목의 수.|
| **quarkus.worker_pool.queue.delay.seconds.max** <br>(gauge) | 처리되기 전까지 대기열에서 대기한 현재 최대 시간.<br>_second로 표시됨_ |
| **quarkus.worker_pool.queue.delay.seconds.sum** <br>(count) | 처리되기 전까지 대기열에서 대기한 총 시간.|
| **quarkus.worker_pool.queue.size** <br>(gauge) | 대기 열에 보류 중인 요소 수.|
| **quarkus.worker_pool.ratio** <br>(gauge) | 현재 사용 중인 작업자 비율.<br>_fraction으로 표시됨_ |
| **quarkus.worker_pool.usage.seconds.count** <br>(count) | 풀의 리소스가 사용된 시간.<br>_second로 표시됨_ |
| **quarkus.worker_pool.usage.seconds.max** <br>(gauge) | 풀에서 리소스가 사용된 최대 시간.<br>_second로 표시됨_ |
| **quarkus.worker_pool.usage.seconds.sum** <br>(count) | 풀에서 리소스가 사용된 총 시간.<br>_second로 표시됨_ |

### 이벤트

Quarkus 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**quarkus.openmetrics.health**

Agent가 Quarkus OpenMetrics 엔드포인트에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그 외에는 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.