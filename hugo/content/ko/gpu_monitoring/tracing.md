---
description: 선택한 Kubernetes 워크로드에 대해 GPU 활동 추적을 활성화하세요.
further_reading:
- link: /gpu_monitoring/setup
  tag: 설명서
  text: GPU Monitoring 설정
- link: /gpu_monitoring
  tag: GPU Monitoring이란?
  text: GPU Monitoring 기능에 대해 자세히 알아보기
is_beta: true
private: true
title: GPU Monitoring을 통한 지속적인 추적
---
{{< beta-callout url="#" btn_hidden="true" >}}
GPU Monitoring을 통한 지속적인 추적은 현재 사전 액세스 단계에 있습니다.
{{< /beta-callout >}}

## 개요 {#overview}

GPU Monitoring을 통한 지속적인 추적 기능은 선택한 Kubernetes 워크로드에 대해 간단한 GPU 활동 추적을 활성화합니다. 대규모 분산 워크로드 문제를 해결하는 과정은 번거롭고 시간이 많이 소요될 수 있습니다. GPU Monitoring의 추적 기능을 사용하면 CUDA 및 NCCL 작업을 모델 및 PyTorch 작업과 연결하는 상세한 실행 트레이스를 통해 병목 현상을 식별하고 조사할 수 있습니다.

{{< img src="gpu_monitoring/gpu-tracing.png" alt="NCCL allgather 작업 및 CUDA 커널 실행 등 GPU 스트림 활동과 정렬된 CPU 스팬을 보여주는 torch.step 트레이스의 플레임 그래프 뷰 화면입니다." style="width:100%;" >}}

## 설정 {#setup}

### 전제 조건 {#prerequisites}

워크로드를 지속적으로 추적하려면 우선 다음 기준을 충족해야 합니다.
- [GPU Monitoring 활성화][1] Datadog Cluster Agent 버전 7.80 이상을 실행 중이어야 합니다.
- 최소 필수 CUDA 및 CUPTI 버전: 13.

### 1. GPU 추적 구성 {#1-configure-gpu-tracing}

다음 구성을 기존 `DatadogAgent` 리소스에 병합합니다.

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
```

구성을 적용하고 `DatadogAgent` 롤아웃이 완료될 때까지 기다리세요.

### 2. GPU 워크로드 레이블 지정 {#2-label-the-gpu-workload}

컨트롤러의 포드 템플릿에 레이블을 추가합니다. 워크로드는 Agent 네임스페이스 외부에 있어야 합니다. Jobs의 경우 `spec.template.metadata.labels`를 사용합니다. KubeRay의 경우 헤드 및 워커 포드 템플릿에 레이블을 지정합니다.

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

리소스를 적용하고 롤아웃이 완료될 때까지 기다리세요.

### 3. 설정 확인 {#3-verify-setup}

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**설정 컨테이너가 없나요?** 포드 템플릿에 레이블이 지정되어 있는지, 포드가 새로 생성되었는지, 워크로드가 Agent 네임스페이스 외부에 있는지 확인하세요. 그런 다음 Cluster Agent 로그를 확인합니다.

### 4. 트레이스 탐색 {#4-explore-traces}

워크로드를 실행한 다음 [APM Trace Explorer][2]에서 쿼리를 진행합니다.

```
pod_name:<NEW_GPU_POD> kube_namespace:<GPU_WORKLOAD_NAMESPACE>
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/gpu_monitoring/setup
[2]: /ko/tracing/trace_explorer/