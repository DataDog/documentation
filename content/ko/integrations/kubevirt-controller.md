---
aliases:
- /ko/integrations/kubevirt_controller
app_id: kubevirt-controller
categories:
- 컨테이너
- Kubernetes
custom_kind: 통합
description: 주요 메트릭을 수집하여 KubeVirt Controller 서비스의 상태를 모니터링합니다.
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: KubeVirt Controller
---
<div class="alert alert-warning">
이 통합 기능은 퍼블릭 베타 단계이므로 프로덕션 워크로드에서는 신중하게 사용해야 합니다.
</div>

## 개요

본 점검은 Datadog Agent를 통해 [KubeVirt Controller](https://docs.datadoghq.com/integrations/kubevirt_controller)를 모니터링합니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

KubeVirt Controller 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가로 설치할 필요가 없습니다.

### 설정

`kubevirt_controller` 점검은 주로 [클러스터 수준 점검](https://docs.datadoghq.com/containers/cluster_agent/clusterchecks/?tab=datadogoperator)을 실행하기 위해 케이스를 사용합니다.

아래 단계에 따라 일부 RBAC 권한을 업데이트하여  `datadog-agent` 서비스 계정에`KubeVirt` 리소스에 대한 읽기 전용 액세스 권한을 부여합니다.

1. `kubevirt.io:view` 클러스터 역할을 `datadog-agent` 서비스 계정에 바인딩합니다.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent-kubevirt
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubevirt.io:view
subjects:
  - kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

2. `KubeVirt` 리소스를 다음과 같이 패치하여 `virt-controller` 배포의 포드 템플릿에 주석을 추가합니다.

```yaml
apiVersion: kubevirt.io/v1
kind: KubeVirt
metadata:
  name: kubevirt
  namespace: kubevirt
spec:
  certificateRotateStrategy: {}
  configuration: {}
  customizeComponents:
    patches:
    - resourceType: Deployment
        resourceName: virt-controller
        patch: '{"spec": {"template":{"metadata":{"annotations":{ "ad.datadoghq.com/virt-controller.check_names": "[\"kubevirt_controller\"]", "ad.datadoghq.com/virt-controller.init_configs": "[{}]", "ad.datadoghq.com/virt-controller.instances": "[{ \"kubevirt_controller_metrics_endpoint\": \"https://%%host%%:%%port%%/metrics\",\"kubevirt_controller_healthz_endpoint\": \"https://%%host%%:%%port%%/healthz\", \"kube_namespace\":\"%%kube_namespace%%\", \"kube_pod_name\":\"%%kube_pod_name%%\", \"tls_verify\": \"false\"}]"}}}}}'
        type: strategic
```

`<DD_CLUSTER_NAME>`를 원하는 클러스터 이름으로 변경합니다. 

### 검증

[클러스터 Agent의 `clusterchecks` 하위 명령](https://docs.datadoghq.com/containers/troubleshooting/cluster-and-endpoint-checks/#dispatching-logic-in-the-cluster-agent)을 클러스터 Agent 컨테이너 내에서 실행하고, Checks 섹션에서 `kubevirt_controller` 점검을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kubevirt_controller.can_connect** <br>(gauge) | Agent가 KubeVirt Controller에 연결할 수 있으면 1, 그렇지 않으면 0의 값입니다.|
| **kubevirt_controller.virt_controller.leading_status** <br>(gauge) | 작동 중인 가상 컨트롤러 표시.|
| **kubevirt_controller.virt_controller.ready_status** <br>(gauge) | 리더 역할을 할 준비가 된 가상 컨트롤러 표시.|
| **kubevirt_controller.vm.error_status_last_transition_timestamp_seconds.count** <br>(count) | 가상 머신이 마지막으로 오류 상태로 전환된 시점의 타임스탬프.<br>_second로 표시_ |
| **kubevirt_controller.vm.migrating_status_last_transition_timestamp_seconds.count** <br>(count) | 가상 머신이 마지막으로 마이그레이션 상태로 전환된 시점의 타임스탬프.<br>_second로 표시_ |
| **kubevirt_controller.vm.non_running_status_last_transition_timestamp_seconds.count** <br>(count) | 가상 머신이 마지막으로 일시 중지/중지 상태로 전환된 시점의 타임스탬프.<br>_second로 표시_ |
| **kubevirt_controller.vm.running_status_last_transition_timestamp_seconds.count** <br>(count) | 가상 머신이 마지막으로 실행 상태로 전환된 시점의 타임스탬프<br>_second로 표시_ |
| **kubevirt_controller.vm.starting_status_last_transition_timestamp_seconds.count** <br>(count) | 가상 머신이 마지막으로 시작 상태로 전환된 시점의 타임스탬프.<br>_second로 표시_ |
| **kubevirt_controller.vmi.migrations_in_pending_phase** <br>(gauge) | 현재 보류 상태인 마이그레이션 수.|
| **kubevirt_controller.vmi.migrations_in_running_phase** <br>(gauge) | 현재 실행 중인 마이그레이션의 수.|
| **kubevirt_controller.vmi.migrations_in_scheduling_phase** <br>(gauge) | 현재 예정된 마이그레이션 수.|
| **kubevirt_controller.vmi.non_evictable** <br>(gauge) | 축출 전략이 라이브 마이그레이션으로 설정되었지만 마이그레이션할 수 없는 VirtualMachine 표시.|
| **kubevirt_controller.vmi.number_of_outdated** <br>(gauge) | 가장 최신 버전의 가상 런처 환경 내에서 실행되지 않는 VirtualMachineInstance 워크로드의 총 수 표시.|
| **kubevirt_controller.vmi.phase_count** <br>(gauge) | 단계 및 노드별 VMI의 합계. 단계는 다음 중 하나일 수 있습니다. \[Pending, Scheduling, Scheduled, Running, Succeeded, Failed, Unknown\]|
| **kubevirt_controller.vmi.phase_transition_time_from_creation_seconds.bucket** <br>(count) | 생성 시간부터 VM 단계 전환 기간까지의 히스토그램(초)<br>_second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_from_creation_seconds.count** <br>(count) | 생성 시간부터 VM 단계 전환 기간까지의 히스토그램(초)<br>__second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_from_creation_seconds.sum** <br>(count) | 생성 시간부터 VM 단계 전환 기간까지의 히스토그램(초)<br>__second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_from_deletion_seconds.bucket** <br>(count) | 삭제 시간부터 VM 단계 전환 기간까지의 히스토그램(초)<br>_second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_from_deletion_seconds.count** <br>(count) | 삭제 시간부터 VM 단계 전환 기간까지의 히스토그램(초)<br>_second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_from_deletion_seconds.sum** <br>(count) | 삭제 시간부터 VM 단계 전환 기간까지의 히스토그램(초)<br>_second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_seconds.bucket** <br>(count) | 서로 다른 단계 간 VM 단계 전환 시간의 히스토그램(초)<br>_second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_seconds.count** <br>(count) | 서로 다른 단계 간 VM 단계 전환 시간의 히스토그램(초)<br>_second로 표시_ |
| **kubevirt_controller.vmi.phase_transition_time_seconds.sum** <br>(count) | 서로 다른 단계 간 VM 단계 전환 시간의 히스토그램(초)<br>_second로 표시_ |
| **kubevirt_controller.workqueue.adds.count** <br>(count) | 작업 대기열에서 처리한 총 추가 횟수<br>_item으로 표시_ |
| **kubevirt_controller.workqueue.depth** <br>(gauge) | 현재 작업 대기열의 깊이<br>_item으로 표시_ |
| **kubevirt_controller.workqueue.longest_running_processor_seconds** <br>(gauge) | 작업 대기열에서 가장 오래 실행 중인 프로세서의 실행 시간(초)<br>_second로 표시_ |
| **kubevirt_controller.workqueue.queue_duration_seconds.bucket** <br>(count) | 항목이 요청되기 전까지 작업 대기열에 머무르는 시간<br>_second로 표시_ |
| **kubevirt_controller.workqueue.queue_duration_seconds.count** <br>(count) | 항목이 요청되기 전까지 작업 대기열에 머무르는 시간<br>_second로 표시_ |
| **kubevirt_controller.workqueue.queue_duration_seconds.sum** <br>(count) | 항목이 요청되기 전까지 작업 대기열에 머무르는 시간<br>_second로 표시_ |
| **kubevirt_controller.workqueue.retries.count** <br>(count) | 작업 대기열에서 처리한 총 재시도 횟수.|
| **kubevirt_controller.workqueue.unfinished_work_seconds** <br>(gauge) | 현재 처리 중이며 work_duration로 관측되지 않은 작업 수행 시간(초). 값이 클수록 스레드가 정체되어 있음을 의미합니다. 이 값이 증가하는 속도로 정체된 스레드의 수를 유추할 수 있습니다.<br>_second로 표시_ |
| **kubevirt_controller.workqueue.work_duration_seconds.bucket** <br>(count) | 작업 대기열에서 항목을 처리하는 데 걸리는 시간(초).<br>_second로 표시_ |
| **kubevirt_controller.workqueue.work_duration_seconds.count** <br>(count) | 작업 대기열에서 항목을 처리하는 데 걸리는 시간(초).<br>_second로 표시_ |
| **kubevirt_controller.workqueue.work_duration_seconds.sum** <br>(count) | 작업 대기열에서 항목을 처리하는 데 걸리는 시간(초).<br>_second로 표시_ |

### 이벤트

KubeVirt Controller 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

KubeVirt Controller 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.