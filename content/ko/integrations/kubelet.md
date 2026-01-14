---
app_id: kubelet
categories:
- containers
custom_kind: 통합
description: kubelet에서 컨테이너 통계를 수집합니다.
integration_version: 10.0.0
media: []
supported_os:
- linux
- macos
- windows
title: Kubelet
---
## 개요

이 통합은 kubelet에서 컨테이너 메트릭을 가져옵니다.

- kubelet 통계 시각화 및 모니터링
- kubelet 장애 조치 및 이벤트에 대한 알림 확인

## 설정

### 설치

Kubelet 검사는 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 추가 설치가 필요 없습니다.

### 설정

[Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트의 `conf.d/` 폴더에 있는 `kubelet.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 kubelet.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kubelet/datadog_checks/kubelet/data/conf.yaml.default)을 참조하세요.

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `kubelet`를 찾습니다.

### 호환성

kubelet 점검 은 두 가지 모드로 실행할 수 있습니다.

- 기본 프로메테우스 모드는 쿠버네티스(Kubernetes) 버전 1.7.6 이상에서 호환됩니다.
- cAdvisor 모드(`cadvisor_port` 옵션을 설정하여 활성화)는 버전 1.3 이상에서 호환되어야 합니다. 일관된 태깅 및 필터링을 사용하려면 에이전트 버전 6.2 이상이 필요합니다.

## OpenShift \<3.7 지원

cAdvisor 4194 포트는 OpenShift에서 기본적으로 비활성화되어 있습니다. 활성화하려면 다음을 추가해야 합니다.
[노드 구성 파일](https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files)에 다음 줄을 추가해야 합니다.

```text
kubeletArguments:
  cadvisor-port: ["4194"]
```

포트를 열 수 없는 경우 설정을 통해 컨테이너 메트릭 컬렉션의 두 소스를 모두 비활성화하세요.

- `cadvisor_port` 에 `0`
- `metrics_endpoint` 에 `""`

점검은 여전히 다음을 수집할 수 있습니다.

- kubelet 상태 서비스 점검
- 포드 실행/중지 메트릭
- 포드 제한 및 요청
- 노드 캐파 메트릭

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kubernetes.containers.last_state.terminated** <br>(gauge) | 이전에 종료된 컨테이너 수|
| **kubernetes.pods.running** <br>(gauge) | 실행 중인 포드 수|
| **kubernetes.pods.expired** <br>(gauge) | 점검이 무시하고 만료된 포드의 수|
| **kubernetes.containers.running** <br>(gauge) | 실행 중인 컨테이너의 수|
| **kubernetes.containers.restarts** <br>(gauge) | 컨테이너가 재시작된 횟수|
| **kubernetes.containers.state.terminated** <br>(gauge) | 현재 종료된 컨테이너의 수|
| **kubernetes.containers.state.waiting** <br>(gauge) | 현재 대기 중인 컨테이너의 수|
| **kubernetes.cpu.load.10s.avg** <br>(gauge) | 지난 10초 동안의 컨테이너 CPU 로드 평균|
| **kubernetes.cpu.system.total** <br>(gauge) | 시스템 시간에 사용되는 코어 수<br>_core로 표시_ |
| **kubernetes.cpu.user.total** <br>(gauge) | 사용자 시간 동안 사용된 코어 수<br>_core로 표시_ |
| **kubernetes.cpu.cfs.periods** <br>(gauge) | 경과된 시행 기간 간격 수|
| **kubernetes.cpu.cfs.throttled.periods** <br>(gauge) | 스로틀링된 기간 간격 수|
| **kubernetes.cpu.cfs.throttled.seconds** <br>(gauge) | 컨테이너가 스로틀링된 총 기간|
| **kubernetes.cpu.capacity** <br>(gauge) | 이 머신의 코어 수(Kubernetes v1.18까지 사용 가능)<br>_core로 표시_ |
| **kubernetes.cpu.usage.total** <br>(gauge) | 사용된 코어 수<br>_nanocore로 표시_ |
| **kubernetes.cpu.limits** <br>(gauge) | 설정된 CPU 코어 제한<br>_core로 표시_ |
| **kubernetes.cpu.requests** <br>(gauge) | The requested cpu cores<br>_core로 표시_ |
| **kubernetes.filesystem.usage** <br>(gauge) | 사용된 디스크의 양<br>_byte로 표시_ |
| **kubernetes.filesystem.usage_pct** <br>(gauge) | 사용된 디스크의 백분율<br>_fraction으로 표시_ |
| **kubernetes.io.read_bytes** <br>(gauge) | 디스크에서 읽은 바이트 수<br>_byte로 표시_. |
| **kubernetes.io.write_bytes** <br>(gauge) | 디스크에 기록된 바이트 수<br>_byte로 표시_. |
| **kubernetes.memory.capacity** <br>(gauge) | 이 머신의 메모리 양(바이트 단위)(Kubernetes v1.18까지 사용 가능)<br>_byte로 표시_ |
| **kubernetes.memory.limits** <br>(gauge) | 메모리 한도 설정<br>_byte로 표시_ |
| **kubernetes.memory.sw_limit** <br>(gauge) | 스왑 공간 제한 설정<br>_byte로 표시_ |
| **kubernetes.memory.requests** <br>(gauge) | 요청된 메모리<br>_byte로 표시_ |
| **kubernetes.memory.usage** <br>(gauge) | 액세스 시점과 관계없이 모든 메모리를 포함한 바이트 단위의 현재 메모리 사용량<br>_byte로 표시_ |
| **kubernetes.memory.working_set** <br>(gauge) | 현재 작업 설정(바이트 단위) - OOM 킬러가 주시하는 대상<br>_byte로 표시_ |
| **kubernetes.memory.cache** <br>(gauge) | 디스크에서 데이터를 캐시하는 데 사용되는 메모리 양(예: 블록 디바이스의 블록과 정확하게 연관될 수 있는 메모리 콘텐츠)<br>_byte로 표시_ |
| **kubernetes.memory.rss** <br>(gauge) | 바이트 단위의 RSS 크기<br>_byte로 표시_ |
| **kubernetes.memory.swap** <br>(gauge) | 이 cgroup의 프로세스가 현재 사용하는 스왑 양<br>_byte로 표시_ |
| **kubernetes.memory.usage_pct** <br>(gauge) | 포드당 사용되는 메모리 비율(메모리 제한을 설정해야 함)<br>_fraction으로 표시_ |
| **kubernetes.memory.sw_in_use** <br>(gauge) | 사용된 스왑 공간의 비율<br>_fraction으로 표시_ |
| **kubernetes.network.rx_bytes** <br>(gauge) | 수신된 초당 바이트 수<br>_byte로 표시_ |
| **kubernetes.network.rx_dropped** <br>(gauge) | 초당 삭제되는 수신 패킷의 양<br>_packet으로 표시_ |
| **kubernetes.network.rx_errors** <br>(gauge) | 초당 rx 오류의 양<br>_error로 표시_ |
| **kubernetes.network.tx_bytes** <br>(gauge) | 전송되는 초당 바이트 수<br>_byte로 표시_ |
| **kubernetes.network.tx_dropped** <br>(gauge) | 초당 삭제되는 tx 패킷의 양<br>_packet으로 표시_ |
| **kubernetes.network.tx_errors** <br>(gauge) | 초당 tx 오류 발생량<br>_error로 표시_ |
| **kubernetes.diskio.io_service_bytes.stats.total** <br>(gauge) | 컨테이너가 사용하는 디스크 공간의 양<br>_byte로 표시_ |
| **kubernetes.apiserver.certificate.expiration.count** <br>(gauge) | 요청을 인증하는 데 사용된 인증서의 남은 수명 수<br>_second로 표시_ |
| **kubernetes.apiserver.certificate.expiration.sum** <br>(gauge) | 요청을 인증하는 데 사용된 인증서의 남은 수명의 합계<br>_second로 표시_ |
| **kubernetes.rest.client.requests** <br>(gauge) | HTTP 요청 수<br>_operation으로 표시_ |
| **kubernetes.rest.client.latency.count** <br>(gauge) | 동사 및 URL별로 세분화된 요청 대기 시간(초) 수|
| **kubernetes.rest.client.latency.sum** <br>(gauge) | 동사 및 URL별로 세분화된 요청 지연 시간(초)의 합계<br>_second로 표시_ |
| **kubernetes.kubelet.pleg.discard_events** <br>(count) | PLEG의 폐기 이벤트 수|
| **kubernetes.kubelet.pleg.last_seen** <br>(gauge) | PLEG가 마지막으로 활성화된 것으로 확인된 시간(초)<br>_second로 표시_ |
| **kubernetes.kubelet.pleg.relist_duration.count** <br>(gauge) | PLEG에 재등록된 포드 수|
| **kubernetes.kubelet.pleg.relist_duration.sum** <br>(gauge) | PLEG에서 포드를 재상장하는 데 걸린 기간(초)의 합계<br>_second로 표시_ |
| **kubernetes.kubelet.pleg.relist_interval.count** <br>(gauge) | PLEG에 재상장된 포드의 수<br>_second로 표시_ |
| **kubernetes.kubelet.pleg.relist_interval.sum** <br>(gauge) | PLEG 재등록 간격(초)의 합계|
| **kubernetes.kubelet.runtime.operations** <br>(count) | 런타임 작업 수<br>_operation으로 표시_ |
| **kubernetes.kubelet.runtime.errors** <br>(gauge) | 누적 런타임 작업 오류 수<br>_operation으로 표시_ |
| **kubernetes.kubelet.runtime.operations.duration.sum** <br>(gauge) | 작업 기간의 합계<br>_operation으로 표시_. |
| **kubernetes.kubelet.runtime.operations.duration.count** <br>(gauge) | 작업 개수|
| **kubernetes.kubelet.network_plugin.latency.sum** <br>(gauge) | 네트워크 플러그인 작업의 지연 시간(마이크로초)의 합계<br>_microsecond로 표시_ |
| **kubernetes.kubelet.network_plugin.latency.count** <br>(gauge) | 지연 시간별 네트워크 플러그인 작업 수|
| **kubernetes.kubelet.network_plugin.latency.quantile** <br>(gauge) | 지연 시간별 네트워크 플러그인 작업의 백분위수|
| **kubernetes.kubelet.volume.stats.available_bytes** <br>(gauge) | 볼륨에서 사용 가능한 바이트 수<br>_byte로 표시_ |
| **kubernetes.kubelet.volume.stats.capacity_bytes** <br>(gauge) | 볼륨의 바이트 단위 용량<br>_byte로 표시_ |
| **kubernetes.kubelet.volume.stats.used_bytes** <br>(gauge) | 볼륨에서 사용된 바이트 수<br>_byte로 표시_ |
| **kubernetes.kubelet.volume.stats.inodes** <br>(gauge) | 볼륨의 최대 Inode 수<br>_inode로 표시_ |
| **kubernetes.volume.stats.inodes_free** <br>(gauge) | 볼륨의 사용 가능한 Inode 수<br>_inode로 표시_ |
| **kubernetes.kubelet.volume.stats.inodes_used** <br>(gauge) | 볼륨에서 사용된 Inode 수<br>_inode로 표시_ |
| **kubernetes.ephemeral_storage.limits** <br>(gauge) | 컨테이너의 임시 저장소 제한(Kubernetes v1.8 이상 필요)<br>_byte로 표시_ |
| **kubernetes.ephemeral_storage.requests** <br>(gauge) | 컨테이너의 임시 스토리지 요청(Kubernetes v1.8 이상 필요)<br>_byte로 표시_ |
| **kubernetes.ephemeral_storage.usage** <br>(gauge) | POD의 임시 저장소 사용량<br>_byte로 표시_ |
| **kubernetes.kubelet.evictions** <br>(count) | Kubelet에서 퇴출된 포드 수(Kubernetes v1.16의 ALPHA)|
| **kubernetes.kubelet.cpu.usage** <br>(gauge) | Kubelet에서 사용하는 코어 수<br>_nanocore로 표시_ |
| **kubernetes.kubelet.memory.usage** <br>(gauge) | 현재 Kubelet 메모리 사용량(바이트 단위)<br>_byte로 표시_ |
| **kubernetes.kubelet.memory.rss** <br>(gauge) | 바이트 단위의 Kubelet RSS 크기<br>_byte로 표시_ |
| **kubernetes.runtime.cpu.usage** <br>(gauge) | 런타임에서 사용하는 코어 수<br>_nanocore로 표시_ |
| **kubernetes.runtime.memory.usage** <br>(gauge) | 현재 런타임 메모리 사용량(바이트 단위)<br>_byte로 표시_ |
| **kubernetes.runtime.memory.rss** <br>(gauge) | 런타임 RSS의 바이트 크기<br>_byte로 표시_ |
| **kubernetes.kubelet.container.log_filesystem.used_bytes** <br>(gauge) | 파일 시스템에서 컨테이너의 로그가 사용하는 바이트(Kubernetes 1.14 이상 필요)<br>_byte로 표시_. |
| **kubernetes.kubelet.pod.start.duration** <br>(gauge) | 단일 포드가 보류 중 상태에서 실행 중으로 전환되는 데 걸리는 시간(마이크로초)<br>_microsecond로 표시_ |
| **kubernetes.kubelet.pod.worker.duration** <br>(gauge) | 단일 포드를 동기화하는 데 걸리는 시간(마이크로초). 작업 유형별 분류: 생성, 업데이트 또는 동기화<br>_microsecond로 표시_ |
| **kubernetes.kubelet.pod.worker.start.duration** <br>(gauge) | 포드 확인부터 워커 시작까지 걸리는 시간(마이크로초)<br>_microsecond로 표시_ |
| **kubernetes.kubelet.docker.operations** <br>(count) | 도커 작업의 수<br>_operation으로 표시_ |
| **kubernetes.kubelet.docker.errors** <br>(count) | 도커 작업 오류 수<br>_operation으로 표시_ |
| **kubernetes.kubelet.docker.operations.duration.sum** <br>(gauge) | 도커 작업 기간의 합계<br>_operation으로 표시_ |
| **kubernetes.kubelet.docker.operations.duration.count** <br>(gauge) | 도커 작업 개수|
| **kubernetes.go_threads** <br>(gauge) | 생성된 OS 스레드 수|
| **kubernetes.go_goroutines** <br>(gauge) | 현재 존재하는 고루틴 수|
| **kubernetes.liveness_probe.success.total** <br>(gauge) | 컨테이너의 누적 생존 프로브 성공 횟수(Kubernetes v1.15의 ALPHA)|
| **kubernetes.liveness_probe.failure.total** <br>(gauge) | 컨테이너의 실패한 누적 라이브니스 프로브 횟수(Kubernetes v1.15의 ALPHA)|
| **kubernetes.readiness_probe.success.total** <br>(gauge) | 컨테이너의 성공적인 준비 상태 프로브 누적 횟수(Kubernetes v1.15의 ALPHA)|
| **kubernetes.readiness_probe.failure.total** <br>(gauge) | 컨테이너의 준비 상태 프로브 실패 누적 횟수(Kubernetes v1.15의 ALPHA)|
| **kubernetes.startup_probe.success.total** <br>(gauge) | 컨테이너의 성공적인 시작 프로브 누적 횟수(Kubernetes v1.15의 ALPHA)|
| **kubernetes.startup_probe.failure.total** <br>(gauge) | 컨테이너의 시작 프로브 실패 누적 횟수(Kubernetes v1.15의 ALPHA)|
| **kubernetes.node.filesystem.usage** <br>(gauge) | 노드 수준에서 사용된 디스크의 양<br>_byte로 표시_ |
| **kubernetes.node.filesystem.usage_pct** <br>(gauge) | 노드 수준에서 사용된 디스크 공간의 백분율<br>_fraction으로 표시_ |
| **kubernetes.node.image.filesystem.usage** <br>(gauge) | 이미지 파일시스템에서 사용되는 디스크 용량(노드 수준)<br>_byte로 표시_ |
| **kubernetes.node.image.filesystem.usage_pct** <br>(gauge) | 사용된 디스크 비율(노드 수준)<br>_fraction으로 표시_ |

### 서비스 점검

**kubernetes.kubelet.check.ping**

Kubelet이 Ping에 응답하지 않으면 `CRITICAL`을 반환합니다. 그 외에는 OK를 반환합니다.

_상태: ok, critical_

**kubernetes.kubelet.check.docker**

Docker 서비스가 Kubelet에서 실행되지 않으면 `CRITICAL`을 반환합니다. 그 외에는 OK를 반환합니다.

_상태: ok, critical_

**kubernetes.kubelet.check.syncloop**

싱클루프 상태 점검이 중단되면 `CRITICAL`을 반환합니다. 그 외에는 OK를 반환합니다.

_상태: ok, critical_

**kubernetes.kubelet.check**

전체 Kubelet 상태 점검이 중단된 경우 `CRITICAL`을 반환합니다. 그 외에는 OK를 반환합니다.

_상태: ok, critical_

### 제외된 컨테이너

수집된 데이터를 배포된 컨테이너의 하위 집합으로 제한하려면 [`DD_CONTAINER_EXCLUDE` 환경 변수](https://docs.datadoghq.com/agent/guide/autodiscovery-management/?tab=containerizedagent)를 설정하세요. 해당 환경 변수에 지정된 컨테이너에서는 메트릭이 포함되지 않습니다.

포드 수준에서 보고된 네트워크 메트릭의 경우, 다른 컨테이너가 동일한 포드에 속할 수 있으므로 `name` 또는 `image name`을 기준으로 컨테이너를 제외할 수 없다. 따라서 `DD_CONTAINER_EXCLUDE`가 네임스페이스에 적용되는 경우, 포드가 해당 네임스페이스에 있으면 포드-수준 메트릭은 보고되지 않습니다. 그러나 `DD_CONTAINER_EXCLUDE`가 컨테이너 이름 또는 이미지 이름을 참조하는 경우, 제외 규칙이 포드의 일부 컨테이너에 적용되더라도 포드 수준 메트릭이 보고됩니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.