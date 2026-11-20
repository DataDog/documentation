---
description: 모델 배포의 지연 시간, 처리량 및 상태를 해당 모델이 실행되는 GPU의 상태와 함께 모니터링하세요.
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
title: GPU Monitoring으로 추론 워크로드 모니터링
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-inference/" >}}
Continuous Tracing with GPU Monitoring을 통한 추론 워크로드 최적화는 현재 사전 액세스 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 양식을 작성하세요.
{{< /callout >}}

## 개요 {#overview}

추론 워크로드는 실시간 트래픽을 처리하므로 느린 응답과 오류가 사용자에게 직접적인 영향을 미칩니다. GPU 사용률이 낮아도 모델 서빙 비용이 증가합니다. GPU Monitoring의 Inference 페이지에서는 각 모델 배포의 성능과 해당 모델이 실행되는 GPU의 상태를 함께 보여줍니다. MLOps, 플랫폼 및 ML 엔지니어링 팀은 한곳에서 모델 서빙 문제를 발견하고 해결할 수 있습니다.

Inference 페이지에서 다음과 같은 정보를 확인할 수 있습니다.

- **모델 배포 전반의 지연 시간 및 처리량**: 모델 배포 전반의 첫 토큰 생성 시간(TTFT), 토큰 간 지연 시간(ITL), 초당 출력 토큰 수를 비교하고 환경, 배포 또는 Kubernetes 네임스페이스별로 필터링할 수 있습니다.
- **한눈에 보는 배포 상태**: 각 모델 배포의 평균 동시 요청 수, 오류율, 상태, 모니터 및 GPU 키-값(KV) 캐시 사용량을 검토하여 주의가 필요한 배포를 식별할 수 있습니다.

{{< img src="gpu_monitoring/inference-page3.png" alt="특정 모델 배포의 첫 토큰 생성 시간과 출력 토큰 수 등 주요 메트릭을 보여주는 GPU Monitoring의 Inference 페이지" style="width:100%;" >}}

## 설정 {#setup}

추론 모니터링은 다음 추론 엔진 및 배포를 지원합니다.
- [vLLM][1]: 독립형, NVIDIA Dynamo를 추론 라우터로 사용하는 방식 또는 Ray 기반
- [SGLang][3]: 독립형

다른 추론 엔진 및 라우터는 지원되지 않습니다. 다른 추론 엔진이나 라우터에 대한 지원을 요청하려면 Datadog 담당자에게 문의하세요.

배포 환경에 해당하는 탭을 선택합니다.

{{< tabs >}}
{{% tab "독립형 vLLM" %}}

설정 과정에서는 엔진 메트릭을 수집하는 vLLM 통합을 사용합니다.

### 전제 조건 {#prerequisites}

추론 워크로드 모니터링을 시작하려면 다음 조건을 충족해야 합니다.
- [GPU Monitoring이 활성화되어 있어야 합니다][1].
- Datadog Agent 7.85.0 이상 버전을 실행 중입니다.
- 추론 워크로드가 Kubernetes에서 실행되어야 합니다.
- vLLM으로 모델을 서빙해야 합니다.

### 0. GPU Monitoring 활성화 {#0-enable-gpu-monitoring}

아직 설정하지 않았다면 GPU 호스트에서 [GPU Monitoring을 설정][1]합니다. 다음 단계를 수행하려면 GPU Monitoring이 활성화되어 있어야 합니다.

### 1. Datadog Agent 업데이트 {#1-update-the-datadog-agent}

Datadog Agent 7.85.0 이상 버전에는 vLLM 검사가 포함되어 있으므로 vLLM 통합을 별도로 설치할 필요가 없습니다.

이전 버전을 실행 중인 경우 다음 구성을 기존 `DatadogAgent` 리소스에 병합하세요. 기존 자격 증명, 사이트 및 기타 기능은 변경하지 않고 유지합니다.

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0
```

JMX 지원 Agent 이미지 또는 전체 Agent 이미지를 사용하려면 `tag`의 값을 `7.85.0-jmx` 또는 `7.85.0-full`로 설정합니다.

리소스를 적용하고 Agent DaemonSet의 롤아웃이 완료될 때까지 기다립니다.

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. 메트릭 엔드포인트 및 포트 확인 {#2-confirm-the-metrics-endpoint-and-port}

vLLM 통합은 다음 엔드포인트에서 메트릭을 수집합니다.

| 대상 | 엔드포인트 | 통합 | 메트릭 |
|--------|----------|-------------|---------|
| vLLM 서버 | `:8000/metrics` | vLLM | `vllm.*` |

vLLM은 OpenAI 호환 API 서버와 동일한 포트에서 메트릭을 제공하며, 해당 포트의 기본값은 `8000`입니다. vLLM을 다른 `--port`로 시작하는 경우 3단계의 주석에 해당 값을 적용합니다.

### 3. 통합 구성 {#3-configure-the-integration}

모든 vLLM 포드 템플릿에 다음 [Autodiscovery 주석][2]을 추가합니다. 주석 키에서 `<VLLM_CONTAINER_NAME>`을 이미지 이름이 아닌 `spec.template.spec.containers[]`에 있는 컨테이너의 `name` 필드 값으로 바꿉니다.

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<VLLM_CONTAINER_NAME>.checks: |-
      {
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

`<SERVICE_NAME>`을 `inference-vllm-glm5.3`과 같은 모델 배포 이름으로 바꿉니다. Inference 페이지는 메트릭을 `service`를 기준으로 그룹화합니다.

업데이트된 워크로드 리소스를 적용하고 Autodiscovery가 새 주석을 탐지할 수 있도록 포드를 다시 생성합니다.

### 4. 설정 확인 {#4-verify-setup}

두 개의 터미널을 사용하여 vLLM 엔드포인트가 응답하는지, Agent가 검사를 실행하는지 확인합니다. 워크로드의 Kubernetes 네임스페이스에서 포트 포워딩을 실행하거나, 워크로드의 네임스페이스가 현재 네임스페이스와 다르면 `-n <WORKLOAD_NAMESPACE>`를 추가합니다.

**터미널 1**: vLLM 메트릭 엔드포인트를 전달하고 실행 상태를 유지합니다.

```shell
kubectl port-forward pod/<VLLM_POD> 18000:8000
```

**터미널 2**: 엔드포인트와 Agent 검사 실행 여부를 확인합니다.

```shell
# Show vLLM metrics from the endpoint
curl -fsS http://localhost:18000/metrics | grep '^vllm:'

# Look for "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

완료되면 터미널 1에서 **Ctrl+C** 키를 눌러 전달을 중지합니다.

설정을 완료하면 Datadog이 vLLM 포드에서 `vllm.*` 메트릭을 수집합니다.

메트릭이 표시되지 않으면 모델 배포로 추론 트래픽을 전송합니다. vLLM은 첫 번째 요청을 처리한 후에만 일부 메트릭을 내보냅니다.

### 5. 메트릭의 백분위수 활성화 {#5-enable-percentiles-on-your-metrics}

특정 vLLM 메트릭의 백분위수를 그래프로 표시하려면 다음 분포 메트릭에 대해 [고급 쿼리 기능][3]을 활성화해야 합니다.

| 메트릭 |
|--------|
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. GPU 트레이싱 활성화(선택 사항) {#6-enable-gpu-tracing-optional}

추론 요청과 GPU 활동을 연관 지으려면 [Continuous Tracing with GPU Monitoring][4]을 설정하세요.

[1]: /ko/gpu_monitoring/setup
[2]: /ko/containers/kubernetes/integrations/?tab=annotations
[3]: /ko/metrics/distributions/#enabling-advanced-query-functionality
[4]: /ko/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "Dynamo를 사용하는 vLLM" %}}

설정에는 두 가지 통합을 사용합니다. Dynamo 통합은 프런트엔드 및 Worker 런타임 메트릭을 수집하고, vLLM 통합은 엔진 메트릭을 수집합니다.

### 전제 조건 {#prerequisites-1}

추론 워크로드 모니터링을 시작하려면 다음 조건을 충족해야 합니다.
- [GPU Monitoring이 활성화되어 있어야 합니다][1].
- Datadog Agent 7.85.0 이상 버전을 실행 중입니다.
- 추론 워크로드가 Kubernetes에서 실행되어야 합니다.
- NVIDIA Dynamo 배포에서 vLLM Worker를 사용하여 모델을 서빙해야 합니다.

### 0. GPU Monitoring 활성화 {#0-enable-gpu-monitoring-1}

아직 설정하지 않았다면 GPU 호스트에서 [GPU Monitoring을 설정][1]합니다. 다음 단계를 수행하려면 GPU Monitoring이 활성화되어 있어야 합니다.

### 1. Datadog Agent 업데이트 {#1-update-the-datadog-agent-1}

Datadog Agent 7.85.0 이상 버전에는 Dynamo 및 vLLM 검사가 모두 포함되어 있으므로 두 통합 중 어느 것도 별도로 설치할 필요가 없습니다.

이전 버전을 실행 중인 경우 다음 구성을 기존 `DatadogAgent` 리소스에 병합하세요. 기존 자격 증명, 사이트 및 기타 기능은 변경하지 않고 유지합니다.

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0
```

JMX 지원 Agent 이미지 또는 전체 Agent 이미지를 사용하려면 `tag`의 값을 `7.85.0-jmx` 또는 `7.85.0-full`로 설정합니다.

리소스를 적용하고 Agent DaemonSet의 롤아웃이 완료될 때까지 기다립니다.

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. 메트릭 엔드포인트 및 포트 확인 {#2-confirm-the-metrics-endpoints-and-ports}

통합은 다음 엔드포인트에서 메트릭을 수집합니다.

| 대상 | 엔드포인트 | 통합 | 메트릭 |
|--------|----------|-------------|---------|
| Dynamo 프런트엔드 | `:8000/metrics` | Dynamo | `dynamo.frontend.*` |
| Dynamo Worker | `:9090/metrics` | Dynamo | `dynamo.component.*` |
| vLLM 엔진 | `:9090/metrics` | vLLM | `vllm.*` |

기본적으로 Dynamo Worker와 vLLM 엔진은 엔드포인트를 공유합니다. Dynamo는 Worker의 메트릭 엔드포인트를 통해 vLLM 엔진 메트릭을 제공하며, 각 통합은 해당 엔드포인트에서 자체 메트릭을 수집합니다.

<div class="alert alert-info">사이드카 등에서 vLLM 엔진을 Dynamo Worker와 별도로 실행하는 배포에서는 Worker와 엔진이 각각 다른 엔드포인트에서 메트릭을 제공합니다. 이 경우 <code>dynamo</code> 검사는 3단계에서 Worker의 메트릭 엔드포인트를 검사 대상으로, <code>vllm</code> 검사는 엔진의 메트릭 엔드포인트를 검사 대상으로 지정합니다.</div>

Dynamo Kubernetes Operator는 기본적으로 `DYN_SYSTEM_PORT=9090`을 설정합니다. Worker를 직접 실행하는 경우 포트를 명시적으로 설정합니다.

```yaml
env:
  - name: DYN_SYSTEM_PORT
    value: "9090"
```

Worker가 `9090` 이외의 포트를 사용하는 경우 3단계의 Worker 어노테이션에서 해당 포트로 변경합니다.

### 3. 통합 구성 {#3-configure-the-integrations}

해당 워크로드 포드 템플릿에 다음 [Autodiscovery 어노테이션][2]을 추가합니다. 각 어노테이션 키에서 플레이스홀더를 이미지 이름이 아닌 `spec.template.spec.containers[]`의 컨테이너 `name` 필드 값으로 바꿉니다.

Dynamo 프런트엔드 포드 템플릿에 다음 어노테이션을 추가합니다.

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<FRONTEND_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics"
          }]
        }
      }
```

`<SERVICE_NAME>`을 `inference-vllm-glm5.3`과 같은 모델 배포 이름으로 바꿉니다. Inference 페이지는 메트릭을 `service`를 기준으로 그룹화합니다.

모든 vLLM Worker 포드 템플릿에 다음 어노테이션을 추가합니다. 두 통합 모두 포트 `9090`에서 Worker의 메트릭 엔드포인트를 사용합니다.

```yaml
metadata:
  annotations:
    ad.datadoghq.com/<WORKER_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

업데이트된 워크로드 리소스를 적용하고 Autodiscovery가 새 주석을 탐지할 수 있도록 포드를 다시 생성합니다.

### 4. 설정 확인 {#4-verify-setup-1}

세 개의 터미널을 사용하여 각 엔드포인트가 응답하는지, Agent가 두 검사를 모두 실행하는지 확인합니다. 워크로드의 Kubernetes 네임스페이스에서 포트 전달을 실행하거나, 해당 네임스페이스가 현재 네임스페이스와 다르면 `-n <WORKLOAD_NAMESPACE>`를 추가합니다.

**터미널 1**: 프런트엔드 메트릭 엔드포인트를 전달하고 실행 상태를 유지합니다.

```shell
kubectl port-forward pod/<FRONTEND_POD> 18000:8000
```

**터미널 2**: Worker 메트릭 엔드포인트를 전달하고 실행 상태를 유지합니다. Worker가 다른 메트릭 포트를 사용하는 경우 `9090`을 해당 포트로 바꿉니다.

```shell
kubectl port-forward pod/<WORKER_POD> 19090:9090
```

**터미널 3**: 두 엔드포인트와 Agent 검사 실행 여부를 확인합니다.

```shell
# Show the first ten lines of frontend metrics
curl -fsS http://localhost:18000/metrics | sed -n '1,10p'

# Show Dynamo and vLLM metrics from the worker
curl -fsS http://localhost:19090/metrics | grep -E '^(dynamo_|vllm:)'

# Look for "dynamo" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Worker 출력에 `dynamo_` 및 `vllm:` 메트릭 이름이 모두 포함되어 있고 Agent 상태에 두 검사가 모두 표시되는지 확인합니다. 완료되면 터미널 1과 2에서 **Ctrl+C** 키를 눌러 전달을 중지합니다.

설정을 완료하면 Datadog은 다음 항목을 수집합니다.
프런트엔드 포드에서 수집한 - `dynamo.frontend.*` 메트릭
Worker 포드에서 수집한 - `dynamo.component.*` 메트릭
Worker 포드에서 수집한 - `vllm.*` 메트릭

메트릭이 표시되지 않으면 모델 배포로 추론 트래픽을 전송합니다. Dynamo와 vLLM은 첫 번째 요청을 처리한 후에야 일부 메트릭을 전송합니다.

### 5. 메트릭의 백분위수 활성화 {#5-enable-percentiles-on-your-metrics-1}

특정 vLLM 및 Dynamo 메트릭의 백분위수를 그래프로 표시하려면 다음 분포 메트릭에 대해 [고급 쿼리 기능][3]을 활성화해야 합니다.

| 메트릭 |
|--------|
| `dynamo.frontend.time_to_first_token.seconds` |
| `dynamo.frontend.inter_token_latency.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. GPU 트레이싱 활성화(선택 사항) {#6-enable-gpu-tracing-optional-1}

추론 요청과 GPU 활동을 연관 지으려면 [Continuous Tracing with GPU Monitoring][4]을 설정하세요.

[1]: /ko/gpu_monitoring/setup
[2]: /ko/containers/kubernetes/integrations/?tab=annotations
[3]: /ko/metrics/distributions/#enabling-advanced-query-functionality
[4]: /ko/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "Ray를 사용하는 vLLM" %}}

설정에는 두 가지 통합을 사용합니다. [Ray 통합][5]은 Ray 클러스터 메트릭을 수집하고, [vLLM 통합][6]은 엔진 메트릭을 수집합니다.

### 전제 조건 {#prerequisites-2}

추론 워크로드 모니터링을 시작하려면 다음 조건을 충족해야 합니다.
- [GPU Monitoring이 활성화되어 있어야 합니다][1].
- Datadog Agent 7.85.0 이상 버전을 실행 중입니다.
- 추론 워크로드가 KubeRay로 관리되는 Ray 클러스터를 사용하는 Kubernetes 환경에서 실행되어야 합니다.
- Ray Serve 등을 사용하여 Ray 환경에서 vLLM으로 모델을 서빙해야 합니다.

### 1. Datadog Agent 업데이트 {#1-update-the-datadog-agent-2}

Datadog Agent 7.85.0 이상 버전에는 Ray 및 vLLM 검사가 모두 포함되어 있으므로 두 통합 중 어느 것도 별도로 설치할 필요가 없습니다.

이전 버전을 실행 중인 경우 다음 구성을 기존 `DatadogAgent` 리소스에 병합하세요. 기존 자격 증명, 사이트 및 기타 기능은 변경하지 않고 유지합니다.

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0
```

JMX 지원 Agent 이미지 또는 전체 Agent 이미지를 사용하려면 `tag`의 값을 `7.85.0-jmx` 또는 `7.85.0-full`로 설정합니다.

리소스를 적용하고 Agent DaemonSet의 롤아웃이 완료될 때까지 기다립니다.

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. 메트릭 엔드포인트 및 포트 확인 {#2-confirm-the-metrics-endpoint-and-port-1}

vLLM이 Ray 내에서 실행되면 별도의 메트릭 엔드포인트를 제공하지 않습니다. 대신 vLLM은 Ray를 통해 엔진 메트릭을 기록하며, 각 Ray 노드는 Ray 자체 메트릭과 동일한 엔드포인트에서 `ray_vllm_` 접두사를 붙여 해당 메트릭을 게시합니다. Ray 및 vLLM 통합은 모두 해당 엔드포인트에서 메트릭을 수집합니다.

예시에서는 Ray 시작 시 `--metrics-export-port`에 의해 설정되는 `8080` 포트를 사용합니다. Ray 노드가 다른 포트를 사용하는 경우 3단계의 어노테이션에서 `8080`을 해당 포트로 바꿉니다.

### 3. 통합 구성 {#3-configure-the-integrations-1}

vLLM을 실행하는 모든 KubeRay Worker 그룹의 포드 템플릿에 다음 [Autodiscovery 어노테이션][2]을 추가합니다. `RayCluster` 또는 `RayService` 리소스에서 포드 템플릿은 `workerGroupSpecs[].template` 아래에 위치합니다. 어노테이션 키에서 `<RAY_CONTAINER_NAME>`을 이미지 이름이 아닌 Ray 컨테이너의 `name` 필드 값으로 바꿉니다.

vLLM 통합은 `extra_metrics`를 사용하여 각 `ray_vllm_` 메트릭을 Inference 페이지에서 사용하는 이름에 매핑합니다.

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<RAY_CONTAINER_NAME>.checks: |-
      {
        "ray": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true,
            "exclude_metrics": ["python_.+", "process_.+"],
            "exclude_labels": ["WorkerId", "SessionName", "otel_scope_name", "otel_scope_schema_url", "otel_scope_version"],
            "extra_metrics": [{
              "ray_vllm_time_to_first_token_seconds": "time_to_first_token.seconds",
              "ray_vllm_e2e_request_latency_seconds": "e2e_request_latency.seconds",
              "ray_vllm_request_prompt_tokens": "request.prompt_tokens",
              "ray_vllm_request_generation_tokens": "request.generation_tokens",
              "ray_vllm_request_params_n": "request.params.n",
              "ray_vllm_prompt_tokens": "prompt_tokens",
              "ray_vllm_generation_tokens": "generation_tokens",
              "ray_vllm_request_success": "request.success",
              "ray_vllm_request_decode_time_seconds": "request.decode_time.seconds",
              "ray_vllm_request_prefill_time_seconds": "request.prefill_time.seconds",
              "ray_vllm_request_queue_time_seconds": "request.queue_time.seconds",
              "ray_vllm_request_prefill_kv_computed_tokens": "request.prefill_kv_computed_tokens",
              "ray_vllm_prompt_tokens_cached": "prompt_tokens.cached"
            }]
          }]
        }
      }
```

`<SERVICE_NAME>`을 `inference-vllm-glm5.3`과 같은 모델 배포 이름으로 바꿉니다. Inference 페이지는 메트릭을 `service`를 기준으로 그룹화합니다.

`vllm` 인스턴스에서는 다음과 같습니다.
- `exclude_metrics` 옵션은 Ray 엔드포인트에서 vLLM 엔진이 아닌 Ray 프로세스에 관한 Python 및 프로세스 메트릭을 제외합니다.
- `exclude_labels` 옵션은 Worker 또는 클러스터가 다시 시작될 때마다 변경되는 Ray 레이블을 제거합니다.

<div class="alert alert-info">사용 중인 <code>ray</code> 검사에서 이미 <code>ray_vllm_</code> 메트릭을 다음 설정을 통해 수집하는 경우( <code>extra_metrics</code>), 해당 메트릭은 다음 두 가지 이름으로 중복 제출됩니다. <code>ray.ray_vllm_*</code> 및 <code>vllm.*</code>. 다음 검사에서 해당 패턴을 제거합니다( <code>ray</code> 검사). 먼저 다음 이름을 사용하는 모든 대시보드와 모니터를 마이그레이션합니다. <code>ray.ray_vllm_*</code> .</div>

업데이트된 워크로드 리소스를 적용합니다. KubeRay를 사용하면 Worker 그룹의 포드 템플릿을 변경할 때 Worker 포드가 다시 생성됩니다. `RayService`의 경우, 업그레이드 전략에 따라 KubeRay가 기존 클러스터 대신 새 Ray 클러스터를 생성할 수 있습니다.

### 4. 설정 확인 {#4-verify-setup-2}

두 개의 터미널을 사용하여 Ray 엔드포인트가 vLLM 메트릭을 제공하는지, Agent가 두 검사를 모두 실행하는지 확인합니다. 워크로드의 Kubernetes 네임스페이스에서 포트 포워딩을 실행하거나, 워크로드의 네임스페이스가 현재 네임스페이스와 다르면 `-n <WORKLOAD_NAMESPACE>`를 추가합니다.

**터미널 1**: Worker 포드의 Ray 메트릭 엔드포인트를 전달하고 실행 상태를 유지합니다.

```shell
kubectl port-forward pod/<RAY_WORKER_POD> 18080:8080
```

**터미널 2**: 엔드포인트와 Agent 검사 실행 여부를 확인합니다.

```shell
# Show vLLM metrics published by Ray
curl -fsS http://localhost:18080 | grep '^ray_vllm_'

# Look for "ray" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

완료되면 터미널 1에서 **Ctrl+C** 키를 눌러 전달을 중지합니다.

설정을 완료하면 Datadog은 다음 항목을 수집합니다.
Ray 포드에서 수집한 - `ray.*` 메트릭
vLLM을 실행하는 Ray Worker 포드에서 수집한 - `vllm.*` 메트릭

메트릭이 표시되지 않으면 모델 배포로 추론 트래픽을 전송합니다. vLLM은 첫 번째 요청을 처리한 후에만 일부 메트릭을 내보냅니다.

<div class="alert alert-info">일부 vLLM 버전은 실행 중이거나 대기 중인 요청 수 또는 KV 캐시 사용량과 같은 게이지 메트릭을 Ray를 통해 제공하지 않습니다. 엔드포인트에 <code>ray_vllm_num_requests_running</code> 또는 <code>ray_vllm_kv_cache_usage_perc</code> 메트릭이 없으면 Inference 페이지의 <strong>Requests</strong> 및 <strong>GPU Cache</strong> 열이 계속 비어 있습니다.</div>

### 5. 메트릭의 백분위수 활성화 {#5-enable-percentiles-on-your-metrics-2}

특정 vLLM 메트릭의 백분위수를 그래프로 표시하려면 다음 분포 메트릭에 대해 [고급 쿼리 기능][3]을 활성화해야 합니다.

| 메트릭 |
|--------|
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. GPU 트레이싱 활성화(선택 사항) {#6-enable-gpu-tracing-optional-2}

추론 요청과 GPU 활동을 연관 지으려면 [Continuous Tracing with GPU Monitoring][4]을 설정하세요.

[1]: /ko/gpu_monitoring/setup
[2]: /ko/containers/kubernetes/integrations/?tab=annotations
[3]: /ko/metrics/distributions/#enabling-advanced-query-functionality
[4]: /ko/gpu_monitoring/tracing
[5]: /ko/integrations/ray/
[6]: /ko/integrations/vllm/

{{% /tab %}}
{{% tab "SGLang" %}}

설정 과정에서는 엔진 메트릭을 수집하는 [SGLang 통합][5]을 사용합니다.

### 전제 조건 {#prerequisites-3}

추론 워크로드 모니터링을 시작하려면 다음 조건을 충족해야 합니다.
- [GPU Monitoring이 활성화되어 있어야 합니다][1].
- Datadog Agent 7.85.0 이상 버전을 실행 중입니다.
- 추론 워크로드가 Kubernetes에서 실행되어야 합니다.
- 독립형 SGLang으로 모델을 서빙하고 있습니다.

### 0. GPU Monitoring 활성화 {#0-enable-gpu-monitoring-2}

아직 설정하지 않았다면 GPU 호스트에서 [GPU Monitoring을 설정][1]합니다. SGLang 검사는 GPU Monitoring이 활성화된 경우에만 실행됩니다.

### 1. Datadog Agent 업데이트 {#1-update-the-datadog-agent-3}

Datadog Agent 7.85.0 이상 버전에는 SGLang 검사가 포함되어 있으므로 SGLang 통합을 별도로 설치할 필요가 없습니다.

이전 버전을 실행 중인 경우 다음 구성을 기존 `DatadogAgent` 리소스에 병합하세요. 기존 자격 증명, 사이트 및 기타 기능은 변경하지 않고 유지합니다.

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0
```

JMX 지원 Agent 이미지 또는 전체 Agent 이미지를 사용하려면 `tag`의 값을 `7.85.0-jmx` 또는 `7.85.0-full`로 설정합니다.

리소스를 적용하고 Agent DaemonSet의 롤아웃이 완료될 때까지 기다립니다.

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. SGLang 메트릭 활성화 및 포트 확인 {#2-enable-sglang-metrics-and-confirm-the-port}

SGLang은 기본적으로 메트릭을 노출하지 않습니다. 모든 SGLang 포드 템플릿의 SGLang 서버 명령에 `--enable-metrics`을 추가합니다.

```shell
python3 -m sglang.launch_server --model-path <MODEL> --enable-metrics
```

SGLang 통합은 다음 엔드포인트에서 메트릭을 수집합니다.

| 대상 | 엔드포인트 | 통합 | 메트릭 |
|--------|----------|-------------|---------|
| SGLang 서버 | `:30000/metrics` | SGLang | `sglang.*` |

SGLang은 HTTP 서버와 동일한 포트에서 메트릭을 제공하며 기본 포트는 `30000`입니다. SGLang을 다른 `--port`로 시작하는 경우 3단계의 주석에 해당 값을 적용합니다.

분리된 프리필 및 디코드 Worker를 실행하는 경우 각 프리필 및 디코드 Worker는 자체 메트릭 엔드포인트를 제공합니다. 모든 Worker 포드 템플릿에서 통합을 구성합니다. 통합은 KV 전송 및 분리 대기열 메트릭을 `sglang.disaggregation.*`으로 수집합니다.

### 3. 통합 구성 {#3-configure-the-integration-1}

모든 SGLang 포드 템플릿에 다음 [Autodiscovery 주석][2]을 추가합니다. 주석 키에서 `<SGLANG_CONTAINER_NAME>`을 이미지 이름이 아닌 `spec.template.spec.containers[]`에 있는 컨테이너의 `name` 필드 값으로 바꿉니다.

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<SGLANG_CONTAINER_NAME>.checks: |-
      {
        "sglang": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:30000/metrics"
          }]
        }
      }
```

`<SERVICE_NAME>`을 `inference-sglang-glm5.3`과 같은 모델 배포 이름으로 바꿉니다. Inference 페이지는 메트릭을 `service`를 기준으로 그룹화합니다. 분리 배포의 경우 모델 배포의 프리필 및 디코드 Worker에서 동일한 `<SERVICE_NAME>`을 사용합니다.

SGLang 통합은 기본적으로 히스토그램 버킷을 분포로 제출하므로 `histogram_buckets_as_distributions` 또는 `collect_counters_with_distributions`를 설정할 필요가 없습니다.

업데이트된 워크로드 리소스를 적용하고 Autodiscovery가 새 주석을 탐지할 수 있도록 포드를 다시 생성합니다.

### 4. 설정 확인 {#4-verify-setup-3}

두 개의 터미널을 사용하여 SGLang 엔드포인트가 응답하고 Agent가 검사를 실행하는지 확인합니다. 워크로드의 Kubernetes 네임스페이스에서 포트 포워딩을 실행하거나, 워크로드의 네임스페이스가 현재 네임스페이스와 다르면 `-n <WORKLOAD_NAMESPACE>`를 추가합니다.

**터미널 1**: SGLang 메트릭 엔드포인트를 전달하고 실행 상태를 유지합니다.

```shell
kubectl port-forward pod/<SGLANG_POD> 18080:30000
```

**터미널 2**: 엔드포인트와 Agent 검사 실행 여부를 확인합니다.

```shell
# Show SGLang metrics from the endpoint
curl -fsS http://localhost:18080/metrics | grep '^sglang:'

# Look for "sglang" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

완료되면 터미널 1에서 **Ctrl+C** 키를 눌러 전달을 중지합니다.

설정을 완료하면 Datadog이 SGLang 포드에서 `sglang.*` 메트릭을 수집합니다.

메트릭이 표시되지 않으면 모델 배포로 추론 트래픽을 전송합니다. SGLang은 첫 번째 요청을 처리한 후에만 일부 메트릭을 내보냅니다.

### 5. 메트릭의 백분위수 활성화 {#5-enable-percentiles-on-your-metrics-3}

특정 SGLang 메트릭의 백분위수를 그래프로 표시하려면 다음 분포 메트릭에 대해 [고급 쿼리 기능][3]을 활성화해야 합니다.

| 메트릭 |
|--------|
| `sglang.time_to_first_token.seconds` |
| `sglang.inter_token_latency.seconds` |
| `sglang.request.prompt_tokens` |
| `sglang.request.generation_tokens` |
| `sglang.e2e_request_latency.seconds` |
| `sglang.request.stage_latency.seconds` |
| `sglang.queue_time.seconds` |

### 6. GPU 트레이싱 활성화(선택 사항) {#6-enable-gpu-tracing-optional-3}

추론 요청과 GPU 활동을 연관 지으려면 [Continuous Tracing with GPU Monitoring][4]을 설정하세요.

[1]: /ko/gpu_monitoring/setup
[2]: /ko/containers/kubernetes/integrations/?tab=annotations
[3]: /ko/metrics/distributions/#enabling-advanced-query-functionality
[4]: /ko/gpu_monitoring/tracing
[5]: /ko/integrations/sglang/

{{% /tab %}}
{{< /tabs >}}

## Inference 페이지 살펴보기 {#explore-the-inference-page}

시작하려면 GPU Monitoring의 [Inference 페이지][2]로 이동하세요.

### 모델 배포 필터링 {#filter-model-deployments}

페이지 상단의 검색창을 사용하여 모델 배포, 모델, 엔진 또는 네임스페이스를 검색하세요. {{< ui >}}Env{{< /ui >}}, {{< ui >}}Deployment{{< /ui >}}, {{< ui >}}Kube Namespace{{< /ui >}}별로 필터링하거나 {{< ui >}}Filter{{< /ui >}}를 클릭하여 다른 필터를 추가할 수 있습니다.

### 지연 시간 및 처리량 이해 {#understand-latency-and-throughput}

페이지 상단의 그래프는 모델 배포의 지연 시간과 처리량을 보여줍니다.

| 그래프 | 설명 |
|-------|-------------|
| Time to First Token | 요청이 수신된 시점부터 첫 번째 출력 토큰이 생성될 때까지의 시간 |
| Inter-Token Latency | 연속적인 출력 토큰 사이의 시간 |
| Output Tokens | 초당 생성된 출력 토큰 수 |

다른 배포에서는 상응하는 변화가 나타나지 않는데 특정 배포에서만 첫 토큰 생성 시간이나 토큰 간 지연 시간이 급증한다면 공유 인프라가 아닌 해당 배포에 문제가 있음을 나타냅니다.

### 모델 배포 상태 검토 {#review-model-deployment-health}

페이지 하단의 표에는 각 모델 배포의 추론 엔진, 환경 및 Kubernetes 네임스페이스가 나열되며 다음 열이 포함됩니다.

| 열 | 설명 |
|--------|-------------|
| Output Tok/s | 초당 생성된 출력 토큰 수 |
| Requests | 선택한 기간 동안의 평균 동시 처리 요청 수 |
| TTFT | 첫 토큰 생성 시간 |
| ITL | 토큰 간 지연 시간 |
| Error Rate | 오류가 발생한 요청의 비율 |
| Health | {{< ui >}}Warning{{< /ui >}} 또는 {{< ui >}}Critical{{< /ui >}} 등 배포의 상태 |
| Monitors | 배포와 연결된 모니터 |
| GPU Cache | GPU KV 캐시 사용량 |

{{< ui >}}Column Settings{{< /ui >}}를 클릭하여 표시할 열을 선택하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/vllm/
[2]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=inference-monitoring
[3]: /ko/integrations/sglang/