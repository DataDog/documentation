---
aliases:
- /ko/integrations/kube_scheduler
app_id: kube-scheduler
categories:
- 컨테이너
- Kubernetes
- 로그 수집
- 오케스트레이션
custom_kind: 통합
description: Kubernetes Scheduler 모니터링
integration_version: 7.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Kubernetes Scheduler
---
![Kube Scheduler 대시보드](https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_scheduler/images/kube_scheduler_screenshot.jpeg)

## 개요

이 점검은 Kubernetes 컨트롤 플레인의 일부인 [Kubernetes Scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler)를 모니터링합니다.

**참고**: 이 점검은 해당 서비스가 노출되지 않기 때문에 Amazon EKS 클러스터에 대한 데이터를 수집하지 않습니다. 

## 설정

### 설치

Kubernetes Scheduler 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

아래 파라미터 적용에 대한 지침은 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)을 참조하세요.

#### 메트릭 수집

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `kube_scheduler.d/conf.yaml` 파일을 편집하여 kube_scheduler 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 kube_scheduler.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

#### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "kube_scheduler", "service": "<SERVICE_NAME>"}` |

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 점검 섹션에서 `kube_scheduler`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kube_scheduler.binding_duration.count** <br>(gauge) | 지연 시간(초)|
| **kube_scheduler.binding_duration.sum** <br>(gauge) | 총 바인딩 지연 시간(초)|
| **kube_scheduler.cache.lookups** <br>(count) | 캐시 항목 발견 여부에 따른 동등성 캐시 조회 횟수|
| **kube_scheduler.client.http.requests** <br>(count) | 상태 코드, 메서드 및 호스트별로 분할된 HTTP 요청 수|
| **kube_scheduler.client.http.requests_duration.count** <br>(gauge) | 클라이언트 요청 수입니다. 동사 및 URL별로 세분화|
| **kube_scheduler.client.http.requests_duration.sum** <br>(gauge) | 총 지연 시간. 동사 및 URL별로 세분화|
| **kube_scheduler.gc_duration_seconds.count** <br>(gauge) | GC 호출 횟수|
| **kube_scheduler.gc_duration_seconds.quantile** <br>(gauge) | GC 호출 지속 시간 백분위수|
| **kube_scheduler.gc_duration_seconds.sum** <br>(gauge) | GC 호출 기간 합계|
| **kube_scheduler.goroutine_by_scheduling_operation** <br>(gauge) | 바인딩과 같은 작업으로 분할된 실행 중인 고루틴 수(alpha, k8s v1.26 이상 필요)|
| **kube_scheduler.goroutines** <br>(gauge) | 현재 존재하는 goroutine의 개수|
| **kube_scheduler.max_fds** <br>(gauge) | 오픈 파일에 최대 허용되는 디스크립터|
| **kube_scheduler.open_fds** <br>(gauge) | 오픈 파일의 디스크립터 수|
| **kube_scheduler.pending_pods** <br>(gauge) | 대기 중인 포드 수, 대기열 유형별(k8s v1.15 이상 필요)|
| **kube_scheduler.pod_preemption.attempts** <br>(count) | 지금까지 클러스터에서 선점 시도 횟수|
| **kube_scheduler.pod_preemption.victims.count** <br>(gauge) | 최근 선점 라운드 동안 선택된 포드 수|
| **kube_scheduler.pod_preemption.victims.sum** <br>(gauge) | 최근 선점 라운드 동안 선택된 총 포드 수|
| **kube_scheduler.queue.incoming_pods** <br>(count) | 이벤트 및 대기열 유형별로 스케줄링 대기열에 추가된 포드 수(k8s v1.17 이상 필요)|
| **kube_scheduler.schedule_attempts** <br>(gauge) | 일정 포드에 대한 시도 횟수, 결과 기준. 'unschedulable'은 포드를 스케줄할 수 없음을 의미하며, 'error'는 내부 스케줄러 문제를 의미합니다.|
| **kube_scheduler.scheduling.algorithm.predicate_duration.count** <br>(gauge) | 스케줄링 알고리즘 프레디케이트 평가 횟수|
| **kube_scheduler.scheduling.algorithm.predicate_duration.sum** <br>(gauge) | 총 스케줄링 알고리즘 프리케이트 평가 기간|
| **kube_scheduler.scheduling.algorithm.preemption_duration.count** <br>(gauge) | 스케줄링 알고리즘 선점 평가 횟수|
| **kube_scheduler.scheduling.algorithm.preemption_duration.sum** <br>(gauge) | 총 스케줄링 알고리즘 선점 평가 기간|
| **kube_scheduler.scheduling.algorithm.priority_duration.count** <br>(gauge) | 스케줄링 알고리즘 우선순위 평가 횟수|
| **kube_scheduler.scheduling.algorithm.priority_duration.sum** <br>(gauge) | 총 스케줄링 알고리즘 우선순위 평가 기간|
| **kube_scheduler.scheduling.algorithm_duration.count** <br>(gauge) | 스케줄링 알고리즘 지연 시간 수|
| **kube_scheduler.scheduling.algorithm_duration.sum** <br>(gauge) | 총 스케줄링 알고리즘 지연 시간|
| **kube_scheduler.scheduling.attempt_duration.count** <br>(gauge) | 스케줄링 시도 지연 시간(초)(스케줄링 알고리즘 + 바인딩)(k8s v1.23 이상 필요)|
| **kube_scheduler.scheduling.attempt_duration.sum** <br>(gauge) | 총 스케줄링 시도 지연 시간(초)(스케줄링 알고리즘 + 바인딩)(k8s v1.23 이상 필요)|
| **kube_scheduler.scheduling.e2e_scheduling_duration.count** <br>(gauge) | E2e 스케줄링 지연 시간 수(스케줄링 알고리즘 + 바인딩) |
| **kube_scheduler.scheduling.e2e_scheduling_duration.sum** <br>(gauge) | 총 E2e 스케줄링 지연 시간(스케줄링 알고리즘 + 바인딩)|
| **kube_scheduler.scheduling.pod.scheduling_attempts.count** <br>(gauge) | 포드 스케쥴 성공 시도 횟수(k8s v1.23 이상 필요)|
| **kube_scheduler.scheduling.pod.scheduling_attempts.sum** <br>(gauge) | 성공적으로 스케쥴 포드를 시도한 총 횟수(k8s v1.23 이상 필요)|
| **kube_scheduler.scheduling.pod.scheduling_duration.count** <br>(gauge) | 여러 번의 스케줄링 시도를 포함할 수 있는 스케줄링 중인 포드의 E2e 지연 시간(k8s v1.23 이상 필요)|
| **kube_scheduler.scheduling.pod.scheduling_duration.sum** <br>(gauge) | 여러 번의 스케줄링 시도를 포함할 수 있는 스케줄링 중인 포드의 총 e2e 지연 시간(k8s v1.23 이상 필요)|
| **kube_scheduler.scheduling.scheduling_duration.count** <br>(gauge) | 스케줄링 작업의 하위 부분별로 분할된 스케줄 수|
| **kube_scheduler.scheduling.scheduling_duration.quantile** <br>(gauge) | 스케줄링 작업의 하위 부분별로 나눈 스케줄링 대기 시간 백분위수|
| **kube_scheduler.scheduling.scheduling_duration.sum** <br>(gauge) | 스케줄링 작업의 하위 부분별로 나눈 총 스케줄링 대기 시간|
| **kube_scheduler.slis.kubernetes_healthcheck** <br>(gauge) | 단일 스케줄러 상태 검사 결과(알파, k8s v1.26 이상 필요)|
| **kube_scheduler.slis.kubernetes_healthcheck_total** <br>(count) | 모든 스케줄러 상태 확인의 누적 결과(알파, k8s v1.26 이상 필요)|
| **kube_scheduler.threads** <br>(gauge) | 생성된 OS 스레드 수|
| **kube_scheduler.volume_scheduling_duration.count** <br>(gauge) | 볼륨 스케줄링 횟수|
| **kube_scheduler.volume_scheduling_duration.sum** <br>(gauge) | 총 볼륨 스케줄링 단계 지연 시간|

### 이벤트

Kube Scheduler는 이벤트를 포함하지 않습니다.

### 서비스 점검

**kube_scheduler.prometheus.health**

검사에서 메트릭 엔드포인트에 액세스할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**kube_scheduler.leader_election.status**

현재 리더로 설정된 복제본이 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**kube_scheduler.up**

Kube Scheduler가 정상적이지 않으면 `CRITICAL`을 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.