---
app_id: nvidia-triton
app_uuid: 72d17043-fa30-4f5c-95cb-939906d86fb7
assets:
  dashboards:
    Nvidia Triton Overview: assets/dashboards/nvidia_triton_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvidia_triton.cpu.memory.total_bytes
      metadata_path: metadata.csv
      prefix: nvidia_triton.
    process_signatures:
    - tritonserver
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10416
    source_type_name: Nvidia Triton
  monitors:
    Nvidia Triton CPU memory usage is high!: assets/monitors/cpu_memory.json
    Nvidia Triton GPU Utilization is high!: assets/monitors/gpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- ai/ml
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_triton
integration_id: nvidia-triton
integration_title: Nvidia Triton
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: nvidia_triton
public_title: Nvidia Triton
short_description: NVIDIA Triton Inference Server는 오픈 소스 추론 지원 소프트웨어입니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - 제공::통합
  configuration: README.md#Setup
  description: NVIDIA Triton Inference Server는 오픈 소스 추론 지원 소프트웨어입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia Triton
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog Agent를 통해 [Nvidia Triton][1]을 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

Nvidia Triton 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

#### OpenMetrics 엔드포인트

기본적으로 Nvidia Triton 서버는 Prometheus 엔드포인트를 통해 모든 메트릭을 공개합니다.
모든 메트릭 보고를 활성화하는 방법:

```
tritonserver --allow-metrics=true
```

메트릭 엔드포인트를 변경하려면 `--metrics-address` 옵션을 사용하세요.

예시:

```
tritonserver --metrics-address=http://0.0.0.0:8002
```

이 경우 OpenMetrics 엔드포인트는 다음 URL에 노출됩니다: `http://<NVIDIA_TRITON_ADDRESS>:8002/metrics`

[지연 시간 요약][4] 메트릭은 기본적으로 비활성화되어 있습니다. 지연 시간 요약 메트릭을 활성화하려면 아래 명령어를 사용하세요.

```
tritonserver --metrics-config summary_latencies=true
```

[응답 캐시 메트릭][5]은 기본적으로 보고되지 않습니다. 서버 측에서 캐시 구현을 활성화하려면 <cache_implementation> 및 해당 구성을 지정해야 합니다.

예:

```
tritonserver --cache-config local,size=1048576
```

Nvidia Triton은 Openemtrics 엔드포인트를 통해 [사용자 지정 메트릭][6]을 노출할 수 있는 기능도 제공합니다. Datadog도 `extra_metrics` 옵션을 사용하여 이러한 사용자 지정 메트릭을 수집할 수 있습니다.
<div class="alert alert-warning">이러한 맞춤형 Nvidia Triton 메트릭은 Datadog에서 표준 메트릭으로 간주됩니다.</div>

### 구성

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `nvidia_triton.d/conf.yaml` 파일을 편집하여 nvidia_triton 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 nvidia_triton.d/conf.yaml][7]을 참고하세요.

2. [Agent를 재시작합니다][8].

### 검증

[Agent 상태 하위 명령을 실행][9]하고 Checks 섹션에서 `nvidia_triton`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nvidia_triton" >}}


### 이벤트

Nvidia Triton 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "nvidia_triton" >}}


### 로그

Nvidia Triton 통합을 통해 Nvidia Triton 서버에서 로그를 수집하여 Datadog으로 전달할 수 있습니다.

{{< tabs >}}
{{% tab "Host" %}}

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. `nvidia_triton.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집하세요. 예를 들면 다음과 같습니다.

   ```yaml
   logs:
     - type: docker
       source: nvidia_triton
       service: nvidia_triton
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][1]을 참고하세요.

그런 다음 로그 통합을 포드 주석으로 설정합니다. 파일, 구성 맵, 키-값 저장소를 사용하여 구성할 수도 있습니다. 자세한 내용은 [Kubernetes 로그 수집][2]의 구성 섹션을 참고하세요.


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

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.



[1]: https://www.nvidia.com/en-us/ai-data-science/products/triton-inference-server/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#summaries
[5]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#response-cache-metrics
[6]: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/metrics.html#custom-metrics
[7]: https://github.com/DataDog/integrations-core/blob/master/nvidia_triton/datadog_checks/nvidia_triton/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ko/help/