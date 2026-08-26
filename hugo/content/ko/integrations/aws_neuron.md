---
app_id: aws-neuron
app_uuid: fff4d15b-0953-41c9-8139-ef0a8d718d93
assets:
  dashboards:
    AWS Neuron Overview: assets/dashboards/aws_neuron_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws_neuron.neuron_runtime.memory_used_bytes
      metadata_path: metadata.csv
      prefix: aws_neuron.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21046822
    source_type_name: AWS Neuron
  monitors:
    Execution errors: assets/monitors/execution_errors.json
    Execution latency: assets/monitors/execution_latency.json
    Neuron Runtime vCPU usage: assets/monitors/neuron_runtime_vcpu.json
  saved_views:
    AWS Neuron Error Logs Overview: assets/saved_views/error_logs_overview.json
    AWS Neuron Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- aws
- 클라우드
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aws_neuron/README.md
display_on_public_website: true
draft: false
git_integration_title: aws_neuron
integration_id: aws-neuron
integration_title: AWS Inferentia 및 AWS Trainium 모니터링
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: aws_neuron
public_title: AWS Inferentia 및 AWS Trainium 모니터링
short_description: AWS Inferentia/Trainium 인스턴스 및 Neuron SDK의 성능 및 사용을 모니터링합니다.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Category::AWS
  - Category::Cloud
  - Category::Log Collection
  - Offering::Integration
  - Queried Data Type::Metrics
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: AWS Inferentia/Trainium 인스턴스 및 Neuron SDK의 성능 및 사용을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Inferentia 및 AWS Trainium 모니터링
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 검사는 Datadog Agent를 통해 [AWS Neuron][1]를 모니터링합니다. Inferentia 및 Trainium 장치를 모니터링하고 머신 러닝 모델의 성능에 관한 인사이트를 제공해 드립니다.

## 설정

아래 지침을 따라 EC2 인스턴스에서 실행되는 Agent에 이 점검을 설치 및 설정하세요. 컨테이너화된 환경의 경우, 이러한 지침을 적용하는 데 가이드가 필요하다면 [Autodiscovery 통합 템플릿][2]을 참조하세요.

### 설치

AWS Neuron 검사는 [Datadog Agent][3] 패키지에 포함되어 있습니다.

또한 [AWS Neuron Tools][4] 패키지를 설치해야 합니다.

서버에 추가 설치가 필요하지 않습니다.

### 설정

#### 메트릭

1. [Neuron Monitor][5]를 Prometheus 엔드포인트를 노출하는 데 사용하고 있는지 확인합니다.

2. AWS Neuron 성능 데이터 수집을 시작하려면 [Agent 구성 디렉터리][6] 루트에 있는 `conf.d/` 폴더에서 `aws_neuron.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 aws_neuron.d/conf.yaml][7]을 참조하세요.

3. [에이전트를 재시작합니다][8].

#### 로그

AWS Neuron 통합으로 Neuron 컨테이너에서 로그를 수집하여 Datadog으로 전달할 수 있습니다.

{{< tabs >}}
{{% tab "호스트" %}}

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. `aws_neuron.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집하세요. 예를 들면 다음과 같습니다.

   ```yaml
   logs:
     - type: docker
       source: aws_neuron
       service: aws_neuron
   ```

{{% /tab %}}
{{% tab "쿠버네티스" %}}

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][1]을 참고하세요.

그런 다음 로그 통합을 포드 애노테이션으로 설정합니다. 파일, 구성 맵, 키-값 저장소를 사용하여 구성할 수도 있습니다. 자세한 내용은 [Kubernetes 로그 수집][2]의 구성 섹션을 참고하세요.

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][9]하고 Checks 섹션에서 `aws_neuron`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "aws_neuron" >}}


### 이벤트

AWS Neuron 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "aws_neuron" >}}


## 트러블슈팅

컨테이너화된 환경에서는 Agent가 `aws_neuron.d/conf.yaml` 파일에 지정된 엔드포인트에 대한 네트워크 액세스 권한이 있는지 확인하세요.

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.



[1]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/index.html
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/index.html
[5]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/neuron-sys-tools/neuron-monitor-user-guide.html#using-neuron-monitor-prometheus-py
[6]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/aws_neuron/datadog_checks/aws_neuron/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ko/help/