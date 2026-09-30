---
aliases:
- /ko/integrations/kubevirt_api
app_id: kubevirt-api
categories:
- 컨테이너
- Kubernetes
custom_kind: 통합
description: 주요 메트릭을 수집하여 KubeVirt API 서비스의 상태를 모니터링합니다.
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: KubeVirt API
---
<div class="alert alert-warning">
이 통합 기능은 퍼블릭 베타 단계이므로 프로덕션 워크로드에서는 신중하게 사용해야 합니다.
</div>

## 개요

본 점검은 Datadog Agent를 통해 [KubeVirt API](https://docs.datadoghq.com/integrations/kubevirt_api)를 모니터링합니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

KubeVirt API은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가로 설치할 필요가 없습니다.

### 설정

`kubevirt_api` 점검은 주로 [클러스터 수준 점검](https://docs.datadoghq.com/containers/cluster_agent/clusterchecks/?tab=datadogoperator)을 실행하기 위해 케이스를 사용합니다.

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
    namespace: <DD_NAMESPACE>
```

`<DD_NAMESPACE>`를 `datadog-agent` 서비스 계정을 설치한 네임스페이스로 변경합니다.

2. `KubeVirt` 리소스를 다음과 같이 패치하여 `virt-api` 배포의 포드 템플릿에 주석을 추가합니다.

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
        resourceName: virt-api
        patch: '{"spec":{"template":{"metadata":{"annotations":{"ad.datadoghq.com/virt-api.check_names":"[\"kubevirt_api\"]","ad.datadoghq.com/virt-api.init_configs":"[{}]","ad.datadoghq.com/virt-api.instances":"[{\"kubevirt_api_metrics_endpoint\":\"https://%%host%%:%%port%%/metrics\",\"kubevirt_api_healthz_endpoint\":\"https://%%host%%:%%port%%/healthz\",\"kube_namespace\":\"%%kube_namespace%%\",\"kube_pod_name\":\"%%kube_pod_name%%\",\"tls_verify\":\"false\"}]"}}}}}'
        type: strategic
```

### 검증

[클러스터 Agent의 `clusterchecks` 하위 명령](https://docs.datadoghq.com/containers/troubleshooting/cluster-and-endpoint-checks/#dispatching-logic-in-the-cluster-agent)을 클러스터 Agent 컨테이너 내에서 실행하고, Checks 섹션에서 `kubevirt_api` 점검을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kubevirt_api.can_connect** <br>(gauge) | Agent가 KubeVirt Handler에 연결할 수 있으면 1, 그렇지 않으면 0의 값입니다.|
| **kubevirt_api.process.cpu_seconds.count** <br>(count) | 총 사용자 및 시스템 CPU 사용 시간(초)<br>_Second로 표시됨_ |
| **kubevirt_api.process.max_fds** <br>(gauge) | 오픈 파일 디스크립터의 최대 수.<br>_file로 표시됨_ |
| **kubevirt_api.process.open_fds** <br>(gauge) | 오픈 파일 디스크립터의 수.<br>_file로 표시됨_ |
| **kubevirt_api.process.resident_memory_bytes** <br>(gauge) | 레지던트 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **kubevirt_api.process.start_time_seconds** <br>(gauge) | 유닉스 에포크 이후 프로세스 시작 시간(초)<br>_byte로 표시됨_ |
| **kubevirt_api.process.virtual_memory_bytes** <br>(gauge) | 버추얼 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **kubevirt_api.process.virtual_memory_max_bytes** <br>(gauge) | 시용 가능한 버추얼 메모리의 최대 용량(바이트)<br>_byte로 표시됨_ |
| **kubevirt_api.promhttp.metric_handler_requests.count** <br>(count) | HTTP 상태 코드별 총 스크레이프 수.<br>_request로 표시됨_ |
| **kubevirt_api.promhttp.metric_handler_requests_in_flight** <br>(gauge) | 현재 처리 중인 스크레이프 수.<br>_request로 표시됨_ |
| **kubevirt_api.rest.client_rate_limiter_duration_seconds.bucket** <br>(count) | 클라이언트 측 속도 제한기 레이턴시(초)의 히스토그램. HTTP 메서드(동사) 및 URL별로 세분화.<br>_second로 표시됨_ |
| **kubevirt_api.rest.client_rate_limiter_duration_seconds.count** <br>(count) | 클라이언트 측 속도 제한기 레이턴시(초)의 히스토그램. HTTP 메서드(동사) 및 URL별로 세분화.<br>_second로 표시됨_ |
| **kubevirt_api.rest.client_rate_limiter_duration_seconds.sum** <br>(count) | 클라이언트 측 속도 제한기 레이턴시(초)의 히스토그램. HTTP 메서드(동사) 및 URL별로 세분화.<br>_second로 표시됨_ |
| **kubevirt_api.rest.client_request_latency_seconds.bucket** <br>(count) | 요청 레이턴시(초)의 히스토그램. HTTP 메서드(동사) 및 URL별로 세분화.<br>_second로 표시됨_ |
| **kubevirt_api.rest.client_request_latency_seconds.count** <br>(count) | 요청 레이턴시(초)의 히스토그램. HTTP 메서드(동사) 및 URL별로 세분화.<br>_second로 표시됨_ |
| **kubevirt_api.rest.client_request_latency_seconds.sum** <br>(count) | 요청 레이턴시(초)의 히스토그램. HTTP 메서드(동사) 및 URL별로 세분화.<br>_second로 표시됨_ |
| **kubevirt_api.rest.client_requests.count** <br>(count) | 상태 코드, 메서드 및 호스트별로 구분된 HTTP 요청 수.<br>_request로 표시_. |
| **kubevirt_api.vm.count** <br>(gauge) | KubeVirt API의 VirtualMachine 수.|
| **kubevirt_api.vmi.count** <br>(gauge) | KubeVirt API의 VirtualMachineInstance 수.|

### 이벤트

KubeVirt API 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

KubeVirt API 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.