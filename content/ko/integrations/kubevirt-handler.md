---
aliases:
- /ko/integrations/kubevirt_handler
app_id: kubevirt-handler
categories:
- 컨테이너
- Kubernetes
custom_kind: 통합
description: 주요 메트릭을 수집하여 KubeVirt Handler Daemon의 상태를 모니터링합니다.
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: KubeVirt Handler
---
<div class="alert alert-warning">
이 통합 기능은 퍼블릭 베타 단계이므로 프로덕션 워크로드에서는 신중하게 사용해야 합니다.
</div>

## 개요

본 점검은 Datadog Agent를 통해 [KubeVirt Handler](https://docs.datadoghq.com/integrations/kubevirt_handler) 를 모니터링합니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

KubeVirt Handler 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가로 설치할 필요가 없습니다.

### 설정

1. Agent의 구성 디렉터리 루트에서 `conf.d/` 폴더의 `kubevirt_handler.d/conf.yaml` 파일을 편집해 kubevirt_handler 성능 데이터 수집을 시작할 수 있습니다. 모든 가용 구성 옵션을 보려면 [kubevirt_handler.d/conf.yaml 샘플](https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/datadog_checks/kubevirt_handler/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `kubevirt_handler`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kubevirt_handler.can_connect** <br>(gauge) | Agent가 KubeVirt Handler에 연결할 수 있으면 1, 그렇지 않으면 0의 값입니다.|
| **kubevirt_handler.vmi.cpu_system_usage_seconds.count** <br>(count) | 시스템 모드에서 소요된 총 CPU 시간<br>_second로 표시_ |
| **kubevirt_handler.vmi.cpu_usage_seconds.count** <br>(count) | 모든 모드에서 소요된 총 CPU 시간(vcpu 및 하이퍼바이저 사용량의 합계)<br>_second로 표시_ |
| **kubevirt_handler.vmi.cpu_user_usage_seconds.count** <br>(count) | 사용자 모드에서 소요된 총 CPU 시간<br>_second로 표시_ |
| **kubevirt_handler.vmi.memory_actual_balloon_bytes** <br>(gauge) | 현재 balloon 크기(바이트)<br>_byte로 표시_ |
| **kubevirt_handler.vmi.memory_available_bytes** <br>(gauge) | 도메인에서 인식하는 사용 가능한 메모리 양.<br>_byte로 표시_ |
| **kubevirt_handler.vmi.memory_domain_bytes** <br>(gauge) | 도메인에 할당된 메모리 양(바이트).<br>_byte로 표시_ |
| **kubevirt_handler.vmi.memory_pgmajfault.count** <br>(count) | 디스크 IO가 필요했던 경우의 Page 오류 수.<br>_page로 표시_ |
| **kubevirt_handler.vmi.memory_pgminfault.count** <br>(count) | 디스크 IO가 필요하지 않았던 경우의 기타 Page 오류 수.<br>_page로 표시_ |
| **kubevirt_handler.vmi.memory_resident_bytes** <br>(gauge) | 도메인을 실행하는 프로세스의 레지던트 세트 크기(RSS)<br>_byte로 표시_. |
| **kubevirt_handler.vmi.memory_swap_in_traffic_bytes** <br>(gauge) | 게스트의 스왑 공간에서 읽은 총 데이터 양(바이트)<br>_byte로 표시_ |
| **kubevirt_handler.vmi.memory_swap_out_traffic_bytes** <br>(gauge) | 게스트의 스왑 공간에 작성된 총 메모리 양(바이트)<br>_byte로 표시_ |
| **kubevirt_handler.vmi.memory_unused_bytes** <br>(gauge) | 시스템에서 완전히 사용하지 않고 남은 메모리 양.<br>_byte로 표시_ |
| **kubevirt_handler.vmi.memory_usable_bytes** <br>(gauge) | 게스트 시스템을 스왑 상태로 만들지 않고 balloon으로 회수할 수 있는 메모리 양으로, /proc/meminfo의 ‘Available’에 해당.<br>_byte로 표시_ |
| **kubevirt_handler.vmi.network_receive_bytes.count** <br>(count) | 수신된 총 네트워크 트래픽(바이트).<br>_byte로 표시_ |
| **kubevirt_handler.vmi.network_receive_errors.count** <br>(count) | 네트워크 수신 오류 패킷 총수.<br>_packet으로 표시_ |
| **kubevirt_handler.vmi.network_receive_packets.count** <br>(count) | 네트워크 트래픽 수신 패킷 총수.<br>_byte로 표시_ |
| **kubevirt_handler.vmi.network_receive_packets_dropped.count** <br>(count) | vNIC 인터페이스에서 드롭된 총 rx 패킷 수.<br>_packet으로 표시_ |
| **kubevirt_handler.vmi.network_transmit_bytes.count** <br>(count) | 송신된 총 네트워크 트래픽(바이트)<br>_byte로 표시_ |
| **kubevirt_handler.vmi.network_transmit_errors.count** <br>(count) | 네트워크 송신 오류 패킷 총수.<br>_packet으로 표시_ |
| **kubevirt_handler.vmi.network_transmit_packets.count** <br>(count) | 네트워크 트래픽 송신 패킷 총수.<br>_byte로 표시_ |
| **kubevirt_handler.vmi.network_transmit_packets_dropped.count** <br>(count) | vNIC 인터페이스에서 드롭된 총 tx 패킷 수.<br>_packet으로 표시_ |
| **kubevirt_handler.vmi.node_cpu_affinity** <br>(gauge) | 노드 물리 코어에 대한 VMI CPU 어피니티(affinity) 수.|
| **kubevirt_handler.vmi.storage_flush_requests.count** <br>(count) | 총 스토리지 플러시 요청 수.<br>_request으로 표시됨_ |
| **kubevirt_handler.vmi.storage_flush_times_seconds.count** <br>(count) | 캐시 플러싱에 소요된 총 시간.<br>_second로 표시_ |
| **kubevirt_handler.vmi.storage_iops_read.count** <br>(count) | 총 I/O 읽기 작업 수.<br>_read로 표시_ |
| **kubevirt_handler.vmi.storage_iops_write.count** <br>(count) | 총 I/O 쓰기 작업 수.<br>_write로 표시_ |
| **kubevirt_handler.vmi.storage_read_times_seconds.count** <br>(count) | 읽기 작업에 소요된 총 시간.<br>_second로 표시_ |
| **kubevirt_handler.vmi.storage_read_traffic_bytes.count** <br>(count) | 스토리지에서 읽은 바이트 총수.<br>_byte로 표시_ |
| **kubevirt_handler.vmi.storage_write_times_seconds.count** <br>(count) | 쓰기 작업에 소요된 총 시간.<br>_second로 표시_ |
| **kubevirt_handler.vmi.storage_write_traffic_bytes.count** <br>(count) | 기록된 바이트 총수.<br>_byte로 표시_ |
| **kubevirt_handler.vmi.vcpu_delay_seconds.count** <br>(count) | 각 vcpu가 실행되지 않고 대기열에서 대기하는 데 소요된 시간.<br>_second로 표시_ |
| **kubevirt_handler.vmi.vcpu_seconds.count** <br>(count) | 각 vcpu가 각 상태에서 소비한 총 시간(하이퍼바이저 시간을 제외한 cpu_time). `id`는 vcpu 식별자이며 `state`는 다음 중 하나일 수 있습니다. \[`OFFLINE`, `RUNNING`, `BLOCKED`\].<br>_second로 표시_ |
| **kubevirt_handler.vmi.vcpu_wait_seconds.count** <br>(count) | I/O를 대기하는 동안 각 vcpu가 소비한 시간<br>_second로 표시_ |
| **kubevirt_handler.workqueue.adds.count** <br>(count) | 작업 대기열에서 처리한 총 추가 수<br>_item으로 표시_ |
| **kubevirt_handler.workqueue.depth** <br>(gauge) | 현재 작업 대기열의 깊이<br>_item으로 표시됨_ |
| **kubevirt_handler.workqueue.longest_running_processor_seconds** <br>(gauge) | 작업 대기열에서 가장 오래 실행 중인 프로세서의 실행 시간(초)<br>_second로 표시됨_ |
| **kubevirt_handler.workqueue.queue_duration_seconds.bucket** <br>(count) | 아이템이 요청되기 전까지 작업 대기열에 머무르는 기간<br>_second로 표시됨_ |
| **kubevirt_handler.workqueue.queue_duration_seconds.count** <br>(count) | 아이템이 요청되기 전까지 작업 대기열에 머무르는 기간<br>_second로 표시됨_ |
| **kubevirt_handler.workqueue.queue_duration_seconds.sum** <br>(count) | 아이템이 요청되기 전까지 작업 대기열에 머무르는 기간<br>_second로 표시됨_ |
| **kubevirt_handler.workqueue.retries.count** <br>(count) | 작업 대기열에서 처리한 총 재시도 횟수|
| **kubevirt_handler.workqueue.unfinished_work_seconds** <br>(gauge) | 현재 진행 중이며 work_duration로 관측되지 않은 작업 수행 시간(초). 값이 클수록 스레드가 정체되어 있음을 의미합니다. 이 값이 증가하는 속도로 정체된 스레드의 수를 유추할 수 있습니다.<br>_second로 표시됨_ |
| **kubevirt_handler.workqueue.work_duration_seconds.bucket** <br>(count) | 작업 대기열에서 항목을 처리하는 데 걸리는 시간(초).<br>_second로 표시_ |
| **kubevirt_handler.workqueue.work_duration_seconds.count** <br>(count) | 작업 대기열에서 항목을 처리하는 데 걸리는 시간(초).<br>_second로 표시_ |
| **kubevirt_handler.workqueue.work_duration_seconds.sum** <br>(count) | 작업 대기열에서 항목을 처리하는 데 걸리는 시간(초).<br>_second로 표시_ |

### 이벤트

KubeVirt Handler 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

KubeVirt Handler 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.