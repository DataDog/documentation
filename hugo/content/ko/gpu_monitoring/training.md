---
description: 중단되거나 실패한 학습 실행 문제를 해결하고 학습 워크로드의 처리량을 극대화하세요.
further_reading:
- link: /gpu_monitoring/setup
  tag: 문서
  text: GPU Monitoring 설정하기
- link: /gpu_monitoring/tracing
  tag: 문서
  text: GPU Monitoring을 통한 지속적인 추적
- link: /gpu_monitoring
  tag: 문서
  text: GPU Monitoring 기능에 대해 자세히 알아보기
title: GPU Monitoring으로 학습 워크로드 최적화하기
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-training-obs/" >}}
GPU Monitoring을 통한 학습 워크로드 최적화는 현재 사전 액세스 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 양식을 작성하세요.
{{< /callout >}}

## 개요 {#overview}

학습 워크로드는 종종 실패하며, 각 실패는 값비싼 GPU 시간을 낭비하게 합니다. 대규모 분산 학습 워크로드를 디버깅하는 것은 MLOps, 플랫폼 및 ML 엔지니어링 팀에 많은 시간이 소요되는 작업일 수 있습니다. GPU Monitoring의 학습 페이지는 중단되거나 실패한 워크로드 문제를 해결하고 학습 실행의 전체 처리량을 극대화하도록 돕습니다. 이 페이지는 각 학습 실행을 해당 실행이 수행된 GPU 하드웨어 및 네트워크 상호 연결의 상태와 연결합니다.

학습 페이지를 통해 다음을 얻을 수 있습니다.

- **중단되거나 실패한 학습 워크로드에 대한 에이전트형 근본 원인 분석**: 하드웨어 이상, 통신 문제, 메모리 대역폭 부족 또는 스케줄링 문제 등 학습 워크로드가 실패하거나 느려지는 원인을 정확히 파악합니다.
- **학습 실행 성능 최적화**: 성공적인 학습 실행에서 처리량을 높일 수 있는 가장 영향력 있는 기회를 파악합니다.

{{< img src="gpu_monitoring/training-page.png" alt="학습 실행 인사이트, 시간 경과에 따른 실행 막대 그래프, 학습 실행 목록을 보여주는 GPU Monitoring의 학습 페이지입니다." style="width:100%;" >}}

## 설정 {#setup}

### 전제 조건 {#prerequisites}

학습 워크로드 모니터링을 시작하려면 먼저 다음 기준을 충족해야 합니다.
- [GPU Monitoring이 활성화된][1] Datadog Cluster Agent 버전 7.80 이상을 실행 중이어야 합니다.
- CUDA 및 CUPTI 버전 13 이상을 실행 중이어야 합니다.

### 1. 학습 실행을 GPU 하드웨어에 연결 {#1-connect-training-runs-to-gpu-hardware}

Kubernetes 워크로드에는 학습 실행 또는 실행 그룹을 식별하는 레이블이나 주석이 있을 수 있습니다. 이 단계에서는 해당 식별자를 태그로 GPU 메트릭에 추가하여 학습 실행 데이터를 해당 작업이 실행된 GPU 하드웨어에 직접 연결합니다. 2단계에서는 동일한 식별자를 트레이스에 추가합니다.

다음 예시에서는 `company.name/run-id` 및 `company.name/group-id` 포드 주석을 사용합니다. 워크로드에서 사용하는 주석으로 대체하세요.

메트릭의 경우 [태그 추출][2]을 사용하여 주석을 태그에 매핑하세요. 다음 구성을 기존 `DatadogAgent` 리소스에 병합하세요.

```yaml
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        company.name/run-id: training_run_id
        company.name/group-id: training_group_id
```

주석 대신 포드 레이블을 사용하려면 메트릭에 `kubernetesResourcesLabelsAsTags`를 사용하세요.

이 구성을 적용하면 GPU 메트릭에는 `training_run_id` 및 `training_group_id` 태그가 지정됩니다.

### 2. GPU 트레이싱 구성 {#2-configure-gpu-tracing}

GPU 트레이싱을 활성화하고 학습 실행 및 그룹 식별자를 트레이스에 추가하려면, 다음 구성을 기존 DatadogAgent 리소스에 병합하세요.

```yaml
spec:
  features:
    apm:
      enabled: true
      instrumentation:
        enabled: true
        targets:
          - name: gpu-monitoring
            podSelector:
              matchLabels:
                admission.datadoghq.com/gpu.enabled: "true"
            ddTraceVersions:
              c: "0.20.0"
            ddTraceConfigs:
              - name: DD_INJECT_NATIVE
                value: "always"
              - name: DD_TRACE_HOOK_MODULES
                value: "gpu"
              - name: DD_TRAINING_RUN_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/run-id']
              - name: DD_TRAINING_GROUP_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/group-id']
```

주석 대신 포드 레이블을 사용하려면 트레이스에 대해 `fieldPath`를 `metadata.labels['<LABEL_KEY>']`로 설정하세요.

구성을 적용하고 `DatadogAgent` 롤아웃이 완료될 때까지 기다리세요. 이 구성을 사용하면 [GPU 워크로드 레이블](#3-label-the-gpu-workload) 단계에서 레이블을 지정한 워크로드의 트레이스에 `training.run_id` 및 `training.group_id` 태그가 지정됩니다.

### 3. GPU 워크로드 레이블 지정 {#3-label-the-gpu-workload}

워크로드 컨트롤러(예: 작업)의 포드 템플릿에 `admission.datadoghq.com/gpu.enabled: "true"` 레이블을 추가하세요. 워크로드는 Agent가 배포된 네임스페이스 외부에서 실행되어야 합니다. 작업의 경우 `spec.template.metadata.labels` 아래에 레이블을 추가합니다.

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

리소스를 적용하고 롤아웃이 완료될 때까지 기다리세요.

### 4. 설정 확인 {#4-verify-setup}

새로 생성된 GPU 포드에 대해 다음 명령을 실행하여 설정을 확인합니다.

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**설정 컨테이너가 없나요?** 포드 템플릿에 레이블이 있는지, 구성 적용 후 포드가 생성되었는지, 워크로드가 Agent 네임스페이스 외부에서 실행되는지 확인하세요. 그런 다음 Cluster Agent 로그를 확인하세요.

설정을 완료하면 GPU 메트릭에는 `training_run_id` 및 `training_group_id` 태그가 지정되고, 트레이스에는 `training.run_id` 및 `training.group_id` 태그가 지정됩니다. 이 태그를 사용하여 동일한 학습 실행에 대한 GPU 메트릭 및 트레이스를 필터링할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/gpu_monitoring/setup
[2]: /ko/containers/kubernetes/tag/?tab=datadogoperator#tag-extraction