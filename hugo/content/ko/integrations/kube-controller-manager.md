---
aliases:
- /ko/integrations/kube_controller_manager
app_id: kube-controller-manager
categories:
- 컨테이너
- kubernetes
- 오케스트레이션
custom_kind: 통합
description: Kubernetes Controller Manager 모니터링
integration_version: 8.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kubernetes Controller Manager
---
![Kube Controller Manager 대시보드](https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_controller_manager/images/screenshot.png)

## 개요

이 점검은 Kubernetes 컨트롤 플레인의 일부인 [Kubernetes Controller Manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager)를 모니터링합니다.

**참고**: 이 점검은 해당 서비스가 노출되지 않기 때문에 Amazon EKS 클러스터에 대한 데이터를 수집하지 않습니다. 

## 설정

### 설치

Kubernetes Controller Manager 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 다른
서버에 추가 설치가 필요 없습니다.

### 설정

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `kube_controller_manager.d/conf.yaml` 파일을 편집하여 kube_controller_manager 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 kube_controller_manager.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example)을 참조하세요.

1. [Agent 다시 시작](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) 

이 통합을 위해서는 컨트롤러 관리자의 메트릭 엔드포인트에 대한 액세스가 필요합니다. 메트릭 엔드포인트에 액세스하려면 다음을 수행해야 합니다.

- controller-manager 프로세스의 IP/포트에 대한 액세스가 있어야 합니다.
- /metrics 엔드포인트에 대한 `get` RBAC 권한이 있어야 합니다. (기본 Datadog Helm 차트에는 이미 이에 대한 올바른 RBAC 역할과 바인딩이 추가되어 있습니다.)

### 검증

[Agent `status` 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 점검 섹션에서 `kube_controller_manager`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kube_controller_manager.goroutines** <br>(gauge) | 현재 존재하는 goroutine의 개수|
| **kube_controller_manager.job_controller.terminated_pods_tracking_finalizer** <br>(count) | 작업 컨트롤러가 종료된 포드를 작업 상태로 계정화한 후 포드 파이널라이저를 제거하는지 여부를 모니터링하는 데 사용됩니다.|
| **kube_controller_manager.leader_election.lease_duration** <br>(gauge) | 리더십 리스 기간|
| **kube_controller_manager.leader_election.transitions** <br>(count) | 관측된 리더십 전환 횟수|
| **kube_controller_manager.max_fds** <br>(gauge) | 열려 있는 파일에 대해 최대 허용되는 설명자|
| **kube_controller_manager.nodes.count** <br>(gauge) | 영역당 등록된 노드 수|
| **kube_controller_manager.nodes.evictions** <br>(count) | 영역당 노드 축출 이벤트 수|
| **kube_controller_manager.nodes.unhealthy** <br>(gauge) | 영역당 비정상 노드 수|
| **kube_controller_manager.open_fds** <br>(gauge) | 열려 있는 파일의 설명자 수|
| **kube_controller_manager.queue.adds** <br>(count) | 추가된 요소, 대기열별|
| **kube_controller_manager.queue.depth** <br>(gauge) | 현재 깊이, 대기열별|
| **kube_controller_manager.queue.latency.count** <br>(gauge) | 처리 대기 시간 수, 대기열별(Kubernetes v1.14에서 더 이상 사용되지 않음)|
| **kube_controller_manager.queue.latency.quantile** <br>(gauge) | 처리 지연 시간 백분위수, 대기열별(Kubernetes v1.14에서 더 이상 사용되지 않음)<br>_microsecond로 표시_ |
| **kube_controller_manager.queue.latency.sum** <br>(gauge) | 처리 대기 시간 합계, 대기열별(Kubernetes v1.14에서 더 이상 사용되지 않음)<br>_microsecond로 표시_ |
| **kube_controller_manager.queue.process_duration.count** <br>(gauge) | 작업 대기열에서 항목을 처리하는 데 걸리는 시간, 대기열별|
| **kube_controller_manager.queue.process_duration.sum** <br>(gauge) | 총 작업 대기열 처리 시간, 대기열별<br>_second로 표시_ |
| **kube_controller_manager.queue.queue_duration.count** <br>(gauge) | 항목이 요청되기 전까지 대기열에 머무르는 기간, 대기열별|
| **kube_controller_manager.queue.queue_duration.sum** <br>(gauge) | 항목이 요청되기 전까지 대기열에 머무른 총 시간, 대기열별<br>_second로 표시_ |
| **kube_controller_manager.queue.retries** <br>(count) | 처리된 재시도, 대기열별|
| **kube_controller_manager.queue.work_duration.count** <br>(gauge) | 작업 기간, 대기열별(Kubernetes v1.14에서 더 이상 사용되지 않음)|
| **kube_controller_manager.queue.work_duration.quantile** <br>(gauge) | 작업 지속 시간 백분위수, 대기열별(Kubernetes v1.14에서 더 이상 사용되지 않음)<br>_microsecond로 표시_ |
| **kube_controller_manager.queue.work_duration.sum** <br>(gauge) | 작업 지속 시간 합계, 대기열별(Kubernetes v1.14에서 더 이상 사용되지 않음)<br>_microsecond로 표시_ |
| **kube_controller_manager.queue.work_longest_duration** <br>(gauge) | 가장 오래 실행 중인 프로세서가 실행된 시간, 대기열별<br>_second로 표시_ |
| **kube_controller_manager.queue.work_unfinished_duration** <br>(gauge) | 진행 중이지만 process_duration으로 관측되지 않은 작업 시간(초)<br>_second로 표시_ |
| **kube_controller_manager.rate_limiter.use** <br>(gauge) | 레이트 리미터 사용, 리미터별|
| **kube_controller_manager.slis.kubernetes_healthcheck** <br>(gauge) | 단일 컨트롤러 관리자 상태 확인 결과(알파, k8s v1.26 이상 필요)|
| **kube_controller_manager.slis.kubernetes_healthcheck_total** <br>(count) | 모든 컨트롤러 관리자 상태 확인의 누적 결과(alpha, k8s v1.26 이상 필요)|
| **kube_controller_manager.threads** <br>(gauge) | 생성된 OS 스레드 수|

### 이벤트

Kubernetes Controller Manager 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**kube_controller_manager.prometheus.health**

검사에서 메트릭 엔드포인트에 액세스할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**kube_controller_manager.leader_election.status**

현재 리더로 설정된 복제본이 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**kube_controller_manager.up**

Kube Controller Manager가 정상 상태가 아니면 `CRITICAL`을 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀](https://docs.datadoghq.com/help/)으로 문의하세요.