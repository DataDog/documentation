---
app_id: nvml
app_uuid: 2c7a8b1e-9343-4b4a-bada-5091e37c4806
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvml.device_count
      metadata_path: metadata.csv
      prefix: nvml.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10177
    source_type_name: nvml
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- 쿠버네티스(Kubernetes)
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nvml/README.md
display_on_public_website: true
draft: false
git_integration_title: nvml
integration_id: nvml
integration_title: Nvidia NVML
integration_version: 1.0.9
is_public: true
manifest_version: 2.0.0
name: nvml
public_title: Nvidia NVML
short_description: k8s의 Nvidia GPU 메트릭 지원
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Kubernetes
  - Category::OS & System
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: k8s의 Nvidia GPU 메트릭 지원
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia NVML
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 점검은 Datadog 에이전트를 통해 노출된 [NVIDIA 관리 라이브러리(NVML)][1] 메트릭을 모니터링하고, [노출된 쿠버네티스(Kubernetes) 기기][2]와 상호 연결할 수 있습니다.

## 설정

NVML 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 따라 NVML 점검을 설치하세요. 도커(Docker)에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합 사용][4]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   Linux의 경우:
   ```shell
   datadog-agent integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```
   윈도우즈(Windows)(관리자 권한으로 실행하는 Powershell 사용)의 경우:
   ```shell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   & "$env:ProgramFiles\Datadog\Datadog Agent\embedded3\python" -m pip install grpcio pynvml
   ```

2. 통합을 코어 [통합][5]과 유사하게 설정하세요.

도커(Docker)를 사용하는 경우, NVML 리포지토리에 [Dockerfile 예제][6]가 있습니다.

   ```shell
   docker build -t dd-agent-nvml .
   ```

도커(Docker) 및 쿠버네티스(Kubernetes)를 사용하는 경우 환경 변수 `NVIDIA_VISIBLE_DEVICES` 및 `NVIDIA_DRIVER_CAPABILITIES`를 노출해야 합니다. 포함된 Dockerfile의 예제를 참조하세요.

본 기기를 사용해야여 예약된 쿠버네티스(Kubernetes) NVIDIA 기기를 쿠버네티스(Kubernetes) 포드에 연결하려면, Unix 도메인 소켓 `/var/lib/kubelet/pod-resources/kubelet.sock`을 에이전트 설정에 마운트합니다. 본 소켓에 대한 자세한 정보는 [쿠버네티스(Kubernetes) 웹사이트][2]에서 확인할 수 있습니다. **참고**: 본 기기는 버전 1.15 베타 서비스입니다.

### 구성

1. 에이전트 설정 디렉터리 루트의 `conf.d/` 폴더에서 `nvml.d/conf.yaml` 파일을 편집하여 NVML 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [nvml.d/conf.yaml 샘플][7]을 참조하세요.

2. [Agent를 재시작합니다][8].

### 검증

[에이전트 상태 하위 명령 실행][9]을 통해 점검 섹션에서 `nvml`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nvml" >}}
 권한 있는 메트릭 문서는 [NVIDIA 웹사이트][11]에서 확인할 수 있습니다.

가능하다면 메트릭 이름을 NVIDIA [데이터 센터 GPU 관리자(DCGM) 익스포터][12]와 일치시키려고 시도합니다.

### 이벤트

NVML에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "nvml" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.


[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ko/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/nvml/tests/Dockerfile
[7]: https://github.com/DataDog/integrations-extras/blob/master/nvml/datadog_checks/nvml/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/nvml/metadata.csv
[11]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html
[12]: https://github.com/NVIDIA/dcgm-exporter
[13]: https://github.com/DataDog/integrations-extras/blob/master/nvml/assets/service_checks.json
[14]: https://docs.datadoghq.com/ko/help