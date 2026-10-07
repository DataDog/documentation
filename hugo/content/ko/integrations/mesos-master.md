---
aliases:
- /ko/integrations/mesos_master
app_id: mesos-master
categories:
- 설정 및 배포
- 컨테이너
- 오케스트레이션
- 로그 수집
custom_kind: 통합
description: 클러스터 리소스 사용량, 마스터 및 슬레이브 개수, 작업 상태 등을 추적하세요.
further_reading:
- link: https://www.datadoghq.com/blog/deploy-datadog-dcos
  tag: 블로그
  text: DC/OS를 사용하여 Mesos에 Datadog 설치
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
title: Mesos Master
---
이 점검은 Mesos 마스터용 메트릭을 수집합니다. Mesos 슬레이브 메트릭은 [Mesos Slave 통합](https://docs.datadoghq.com/integrations/mesos/#mesos-slave-integration)을 참고하세요.

![Mesos 마스터 대시보드](https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_master/images/mesos_dashboard.png)

## 개요

이 점검은 Mesos 마스터에서 다음 메트릭을 수집합니다.

- 클러스터 리소스
- registered, active, inactive, connected, disconnected 등의 상태인 슬레이브
- failed, finished, staged, running 등의 상태인 작업 수
- active, inactive, connected, disconnected 상태인 프레임워크 수

이외에 다수가 있습니다.

## 설정

### 설치

DC/OS 사용 여부와 관계없이 Mesos 설치 방법은 동일합니다. 각 Mesos 마스터 노드에서 datadog-agent 컨테이너를 실행하세요.

```shell
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=true \
  -e MARATHON_URL=http://leader.mesos:8080 \
  datadog/agent:latest
```

위 명령어에 Datadog API 키와 Mesos Master의 API URL을 입력합니다.

### 설정

datadog-agent를 시작할 때 올바른 마스터 URL을 전달했다면, Agent는 이미 기본 `mesos_master.d/conf.yaml`을 사용하여 마스터에서 메트릭을 수집하고 있습니다. 사용 가능한 모든 구성 옵션은 [샘플 mesos_master.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mesos_master/datadog_checks/mesos_master/data/conf.yaml.example)을 참고하세요.

마스터 API가 자체 서명 인증서를 사용하는 경우가 아니라면 `mesos_master.d/conf.yaml`에 `disable_ssl_validation: true`를 설정하세요.

#### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. Mesos 로그 수집을 시작하려면 다음 구성 블록을 `mesos_master.d/conf.yaml` 파일에 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/mesos/*
       source: mesos
   ```

   사용 환경에 따라 `path` 파라미터 값을 변경하거나 Docker의 기본 stdout을 사용하세요.

   ```yaml
   logs:
     - type: docker
       source: mesos
   ```

   사용 가능한 모든 옵션은 [샘플 mesos_master.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mesos_master/datadog_checks/mesos_master/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

Kubernetes 환경에서 로그를 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

### 검증

Datadog Metrics Explorer에서 `mesos.cluster`를 검색하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **mesos.cluster.cpus_percent** <br>(gauge) | 할당된 CPU 비율<br>_percent로 표시됨_ |
| **mesos.cluster.cpus_total** <br>(gauge) | CPU 수|
| **mesos.cluster.cpus_used** <br>(gauge) | 할당된 CPU 수|
| **mesos.cluster.disk_percent** <br>(gauge) | 할당된 디스크 공간의 비율<br>_percent로 표시됨_ |
| **mesos.cluster.disk_total** <br>(gauge) | 디스크 공간<br>_mebibyte로 표시됨_ |
| **mesos.cluster.disk_used** <br>(gauge) | 할당된 디스크 공간<br>_mebibyte로 표시됨_ |
| **mesos.cluster.dropped_messages** <br>(gauge) | 삭제된 메시지 수<br>_message로 표시됨_ |
| **mesos.cluster.event_queue_dispatches** <br>(gauge) | 이벤트 대기열에 있는 디스패치 수|
| **mesos.cluster.event_queue_http_requests** <br>(gauge) | 이벤트 큐에 있는 HTTP 요청 수<br>_request로 표시됨_ |
| **mesos.cluster.event_queue_messages** <br>(gauge) | 이벤트 큐에 있는 메시지 수<br>_message로 표시됨_ |
| **mesos.cluster.frameworks_active** <br>(gauge) | 활성 프레임워크 수|
| **mesos.cluster.frameworks_connected** <br>(gauge) | 연결된 프레임워크 수|
| **mesos.cluster.frameworks_disconnected** <br>(gauge) | 연결이 끊긴 프레임워크 수|
| **mesos.cluster.frameworks_inactive** <br>(gauge) | 비활성화된 프레임워크 수|
| **mesos.cluster.gpus_percent** <br>(gauge) | 할당된 GPU 비율<br>_percent로 표시됨_ |
| **mesos.cluster.gpus_total** <br>(gauge) | GPU 수|
| **mesos.cluster.gpus_used** <br>(gauge) | 할당된 GPU 수|
| **mesos.cluster.invalid_framework_to_executor_messages** <br>(gauge) | 유효하지 않은 프레임워크 메시지 수<br>_message로 표시됨_ |
| **mesos.cluster.invalid_status_update_acknowledgements** <br>(gauge) | 유효하지 않은 상태 업데이트 확인 수|
| **mesos.cluster.invalid_status_updates** <br>(gauge) | 유효하지 않은 상태 업데이트 수|
| **mesos.cluster.mem_percent** <br>(gauge) | 할당된 메모리 비율<br>_percent로 표시됨_ |
| **mesos.cluster.mem_total** <br>(gauge) | 총 메모리<br>_mebibyte로 표시됨_ |
| **mesos.cluster.mem_used** <br>(gauge) | 할당된 메모리<br>_mebibyte로 표시됨_ |
| **mesos.cluster.outstanding_offers** <br>(gauge) | 미처리 리소스 오퍼 수|
| **mesos.cluster.slave_registrations** <br>(gauge) | 마스터 연결이 끊어진 후 클러스터에 정상적으로 재합류하여 마스터에 다시 연결할 수 있었던 슬레이브 수.|
| **mesos.cluster.slave_removals** <br>(gauge) | 유지 보수 등 다양한 이유로 제거된 슬레이브 수|
| **mesos.cluster.slave_reregistrations** <br>(gauge) | 슬레이브 재등록 수|
| **mesos.cluster.slave_shutdowns_canceled** <br>(gauge) | 취소된 슬레이브 종료 수|
| **mesos.cluster.slave_shutdowns_scheduled** <br>(gauge) | 상태 검사에 실패하여 제거 예정인 슬레이브 수|
| **mesos.cluster.slaves_active** <br>(gauge) | 활성 슬레이브 수|
| **mesos.cluster.slaves_connected** <br>(gauge) | 연결된 슬레이브 수|
| **mesos.cluster.slaves_disconnected** <br>(gauge) | 연결이 끊긴 슬레이브 수|
| **mesos.cluster.slaves_inactive** <br>(gauge) | 비활성화된 슬레이브 수|
| **mesos.cluster.tasks_error** <br>(gauge) | 유효하지 않은 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.tasks_failed** <br>(count) | 실패한 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.tasks_finished** <br>(count) | 완료된 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.tasks_killed** <br>(count) | 강제 종료된 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.tasks_lost** <br>(count) | 분실된 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.tasks_running** <br>(gauge) | 실행 중인 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.tasks_staging** <br>(gauge) | 스테이징 중인 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.tasks_starting** <br>(gauge) | 시작 중인 작업 수<br>_task로 표시됨_ |
| **mesos.cluster.valid_framework_to_executor_messages** <br>(gauge) | 유효한 프레임워크 메시지 수<br>_message로 표시됨_ |
| **mesos.cluster.valid_status_update_acknowledgements** <br>(gauge) | 유효한 상태 업데이트 확인 수|
| **mesos.cluster.valid_status_updates** <br>(gauge) | 유효한 상태 업데이트 수|
| **mesos.framework.cpu** <br>(gauge) | 프레임워크 CPU|
| **mesos.framework.disk** <br>(gauge) | 프레임워크 디스크<br>_mebibyte로 표시됨_ |
| **mesos.framework.mem** <br>(gauge) | 프레임워크 메모리<br>_mebibyte로 표시됨_ |
| **mesos.registrar.log.recovered** <br>(gauge) | 복구된 레지스트리 로그|
| **mesos.registrar.queued_operations** <br>(gauge) | 대기 중인 작업 수|
| **mesos.registrar.registry_size_bytes** <br>(gauge) | 레지스트리 사이즈<br>_byte로 표시됨_ |
| **mesos.registrar.state_fetch_ms** <br>(gauge) | 레지스트리 읽기 지연 시간<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms** <br>(gauge) | 레지스트리 쓰기 지연 시간<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.count** <br>(gauge) | 레지스트리 쓰기 횟수|
| **mesos.registrar.state_store_ms.max** <br>(gauge) | 최대 레지스트리 쓰기 지연 시간<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.min** <br>(gauge) | 최소 레지스트리 쓰기 지연 시간<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.p50** <br>(gauge) | 쓰기 지연 시간 중간값<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.p90** <br>(gauge) | 레지스트리 쓰기 지연 시간 90번째 백분위수<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.p95** <br>(gauge) | 레지스트리 쓰기 지연 시간 95번째 백분위수<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.p99** <br>(gauge) | 레지스트리 쓰기 지연 시간 99번째 백분위수<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.p999** <br>(gauge) | 레지스트리 쓰기 지연 시간 99.9번째 백분위수<br>_millisecond로 표시됨_ |
| **mesos.registrar.state_store_ms.p9999** <br>(gauge) | 레지스트리 쓰기 지연 시간 99.99번째 백분위수<br>_millisecond로 표시됨_ |
| **mesos.role.cpu** <br>(gauge) | Role CPU|
| **mesos.role.disk** <br>(gauge) | Role 디스크<br>_mebibyte로 표시됨_ |
| **mesos.role.mem** <br>(gauge) | Role 메모리<br>_mebibyte로 표시됨_ |
| **mesos.stats.elected** <br>(gauge) | 선출된 마스터인지 여부|
| **mesos.stats.registered** <br>(gauge) | 해당 슬레이브가 마스터에 등록되어 있는지 여부|
| **mesos.stats.system.cpus_total** <br>(gauge) | 사용 가능한 CPU 개수|
| **mesos.stats.system.load_15min** <br>(gauge) | 지난 15분간의 평균 부하량|
| **mesos.stats.system.load_1min** <br>(gauge) | 지난 몇 분 동안의 평균 부하량|
| **mesos.stats.system.load_5min** <br>(gauge) | 지난 5분간의 평균 부하량|
| **mesos.stats.system.mem_free_bytes** <br>(gauge) | 사용 가능한 메모리<br>_byte로 표시됨_ |
| **mesos.stats.system.mem_total_bytes** <br>(gauge) | 총 메모리<br>_byte로 표시됨_ |
| **mesos.stats.uptime_secs** <br>(gauge) | 가동 시간<br>_second로 표시됨_ |

### 이벤트

Mesos-master 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**mesos_master.can_connect**

Agent가  Mesos Master API에 연결하여 메트릭을 수집할 수 없는 경우 CRITICAL을 반환하고, 마스터가 리더로 감지되지 않은 경우 UNKNOWN을 반환하며, 그 외에는 OK를 반환합니다.

_상태: ok, critical, unknown_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [DC/OS를 사용하여 Mesos에 Datadog 설치](https://www.datadoghq.com/blog/deploy-datadog-dcos)