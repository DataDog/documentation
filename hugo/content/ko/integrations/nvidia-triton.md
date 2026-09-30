---
aliases:
- /ko/integrations/nvidia_triton
app_id: nvidia-triton
categories:
- 로그 수집
- ai/ml
custom_kind: 통합
description: NVIDIA Triton Inference Server는 오픈 소스 추론 지원 소프트웨어입니다.
integration_version: 3.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Nvidia Triton
---
## 개요

본 점검은 Datadog Agent로 [Nvidia Triton](https://www.nvidia.com/en-us/ai-data-science/products/triton-inference-server/)을 모니터링합니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

Nvidia Triton 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest)  패키지에 포함되어 있습니다.
서버에 추가로 설치할 필요가 없습니다.

#### OpenMetrics 엔드포인트

기본적으로 Nvidia Triton 서버는 Prometheus 엔드포인트를 통해 모든 메트릭을 공개합니다.
모든 메트릭 보고를 활성화하려면:

```
tritonserver --allow-metrics=true
```

메트릭 엔드포인트를 변경하려면 `--metrics-address` 옵션을 사용하세요.

예시:

```
tritonserver --metrics-address=http://0.0.0.0:8002
```

이 경우 OpenMetrics 엔드포인트는 다음 URL에 노출됩니다: `http://<NVIDIA_TRITON_ADDRESS>:8002/metrics`

[레이턴시 요약](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#summaries) 메트릭은 기본적으로 비활성화되어 있습니다. 레이턴시 요약 메트릭을 활성화하려면 아래 명령어를 사용하세요.

```
tritonserver --metrics-config summary_latencies=true
```

[응답 캐시 메트릭](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#response-cache-metrics)은 기본적으로 보고되지 않습니다. \<cache_implementation> 및 해당 구성을 지정하여 서버 측에서 캐시 구현을 활성화해야 합니다.

예를 들어:

```
tritonserver --cache-config local,size=1048576
```

Nvidia Triton은 Openemtrics 엔드포인트를 통해 [사용자 지정 메트릭](https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#custom-metrics)을 노출할 수 있는 기능도 제공합니다. Datadog도 `extra_metrics` 옵션을 사용하여 이러한 사용자 지정 메트릭을 수집할 수 있습니다.

<div class="alert alert-warning">이러한 맞춤형 Nvidia Triton 메트릭은 Datadog에서 표준 메트릭으로 간주됩니다.</div>

### 설정

1. nvidia_triton 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `nvidia_triton.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 nvidia_triton.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/datadog_checks/nvidia_triton/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `nvidia_triton`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **nvidia_triton.cache.insertion.duration** <br>(gauge) | 캐시 삽입 총 소요 시간(마이크로초)<br>_microsecond로 표시_ |
| **nvidia_triton.cache.lookup.duration** <br>(gauge) | 캐시 조회 총 소요 시간(hit 및 miss, 마이크로초)<br>_microsecond로 표시_ |
| **nvidia_triton.cache.num.entries** <br>(gauge) | 응답 캐시에 저장된 응답 수|
| **nvidia_triton.cache.num.evictions** <br>(gauge) | 응답 캐시에서 캐시 제거 횟수|
| **nvidia_triton.cache.num.hits** <br>(gauge) | 응답 캐시에서 캐시 히트 횟수|
| **nvidia_triton.cache.num.lookups** <br>(gauge) | 응답 캐시에서 캐시 조회수|
| **nvidia_triton.cache.num.misses** <br>(gauge) | 응답 캐시에서 캐시 미스 횟수|
| **nvidia_triton.cache.util** <br>(gauge) | 캐시 사용률 \[0.0 - 1.0\]|
| **nvidia_triton.cpu.memory.total_bytes** <br>(gauge) | CPU 총 메모리(RAM), 바이트 단위<br>_byte로 표시_ |
| **nvidia_triton.cpu.memory.used_bytes** <br>(gauge) | CPU 사용 메모리(RAM), 바이트 단위<br>_byte로 표시_ |
| **nvidia_triton.cpu.utilization** <br>(gauge) | CPU 사용률 \[0.0 - 1.0\]|
| **nvidia_triton.energy.consumption.count** <br>(count) | Triton 서버 시작 이후 GPU 에너지 소비량(joules)|
| **nvidia_triton.gpu.memory.total_bytes** <br>(gauge) | CPU 총 메모리(바이트)<br>_byte로 표시_ |
| **nvidia_triton.gpu.memory.used_bytes** <br>(gauge) | CPU 사용 메모리(바이트)<br>_byte로 표시_ |
| **nvidia_triton.gpu.power.limit** <br>(gauge) | GPU 전원 관리 제한(와트)<br>_watt로 표시_ |
| **nvidia_triton.gpu.power.usage** <br>(gauge) | GPU 전원 사용량(와트)<br>_watt로 표시_ |
| **nvidia_triton.gpu.utilization** <br>(gauge) | GPU 사용률 \[0.0 - 1.0)|
| **nvidia_triton.inference.compute.infer.duration_us.count** <br>(count) | 마이크로초 단위의 누적 컴퓨팅 추론 소요 시간(캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.infer.summary_us.count** <br>(count) | 마이크로초 단위의 누적 컴퓨팅 추론 소요 시간(개수, (캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.infer.summary_us.quantile** <br>(gauge) | 마이크로초 단위의 누적 컴퓨팅 추론 소요 시간(분위수, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.infer.summary_us.sum** <br>(count) | 마이크로초 단위의 누적 컴퓨팅 추론 소요 시간(합계, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.input.duration_us.count** <br>(count) | 누적 컴퓨팅 입력 소요 시간, 마이크로초 단위(캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.input.summary_us.count** <br>(count) | 마이크로초 단위의 누적 컴퓨팅 입력 소요 시간(합계, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.input.summary_us.quantile** <br>(gauge) | 마이크로초 단위의 누적 컴퓨팅 입력 소요 시간(분위수, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.input.summary_us.sum** <br>(count) | 마이크로초 단위의 누적 컴퓨팅 입력 소요 시간(개수, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.output.duration_us.count** <br>(count) | 마이크로초 단위의 누적 추론 컴퓨팅 출력 소요 시간(캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.output.summary_us.count** <br>(count) | 마이크로초 단위의 누적 추론 컴퓨팅 출력 소요 시간(개수, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.output.summary_us.quantile** <br>(gauge) | 마이크로초 단위의 누적 추론 컴퓨팅 출력 소요 시간(분위수, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.compute.output.summary_us.sum** <br>(count) | 마이크로초 단위의 누적 추론 컴퓨팅 출력 소요 시간(합계, 캐시된 요청은 제외)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.count.count** <br>(count) | 실행된 추론 횟수(캐시된 요청은 제외)|
| **nvidia_triton.inference.exec.count.count** <br>(count) | 실행된 모델 실행 횟수(캐시된 요청은 제외)|
| **nvidia_triton.inference.pending.request.count** <br>(gauge) | 모델별로 실행 대기 중인 실시간 대기 요청의 수.|
| **nvidia_triton.inference.queue.duration_us.count** <br>(count) | 마이크로초 단위의 누적 추론 대기열 소요 시간(캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.queue.summary_us.count** <br>(count) | 마이크로초 단위의 추론 대기열 소요 시간 요약(개수, 캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.queue.summary_us.quantile** <br>(gauge) | 마이크로초 단위의 추론 대기열 소요 시간 요약(분위수, 캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.queue.summary_us.sum** <br>(count) | 마이크로초 단위의 추론 대기열 소요 시간 요약(합계, 캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.request.duration_us.count** <br>(count) | 마이크로초 단위의 누적 추론 요청 소요 시간(캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.request.summary_us.count** <br>(count) | 추론 요청 소요 시간 요약, 마이크로초 단위(개수, 캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.request.summary_us.quantile** <br>(gauge) | 추론 요청 소요 시간 요약, 마이크로초 단위(분위수, 캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.request.summary_us.sum** <br>(count) | 추론 요청 소요 시간 요약, 마이크로초 단위(합계, 캐시된 요청 포함)<br>_microsecond로 표시_ |
| **nvidia_triton.inference.request_failure.count** <br>(count) | 실패한 추론 요청의 수(모든 배치 크기)|
| **nvidia_triton.inference.request_success.count** <br>(count) | 성공한 추론 요청의 수(모든 배치 크기)|

### 이벤트

Nvidia Triton 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**nvidia_triton.openmetrics.health**

Agent가 Nvidia Triton OpenMetrics 엔드포인트에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그 외에는 `OK`를 반환합니다.

_상태: ok, critical_

**nvidia_triton.health.status**

서버가 4xx 또는 5xx 응답을 받으면 `CRITICAL`을, 응답이 200이면 `OK`를, 그 외에는 `unknown`을 반환합니다.

_Statuses: ok, warning, critical_

### 로그

Nvidia Triton 통합을 통해 Nvidia Triton 서버에서 로그를 수집하여 Datadog으로 전달할 수 있습니다.

{{< tabs >}}

{{% tab "Host" %}}

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `nvidia_triton.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집하세요. 예를 들면 다음과 같습니다.

   ```yaml
   logs:
     - type: docker
       source: nvidia_triton
       service: nvidia_triton
   ```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 이를 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/#setup)을 참고하세요.

다음으로,  Log 통합을 파드 어노테이션으로 설정합니다. 이는 파일, configMap 또는 키-값 저장소를 사용하여 구성할 수도 있습니다. 자세한 내용은 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/#configuration)의 구성 섹션을 참고하세요.

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nvidia_triton
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"nvidia_triton","service":"nvidia_triton"}]'
spec:
  containers:
    - name: ray
```

{{% /tab %}}

{{< /tabs >}}

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.