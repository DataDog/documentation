---
app_id: nvidia-jetson
app_uuid: eccb9836-9dc7-443c-ac05-9c341e5ccf90
assets:
  dashboards:
    Nvidia Jetson: assets/dashboards/nvidia_jetson.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: nvidia.jetson.mem.used
      metadata_path: metadata.csv
      prefix: nvidia.jetson.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10134
    source_type_name: Nvidia Jetson
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- iot
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_jetson
integration_id: nvidia-jetson
integration_title: Nvidia Jetson
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nvidia_jetson
public_title: Nvidia Jetson
short_description: Nvidia Jetson 보드에 대한 메트릭 가져오기
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::IoT
  - 제공::통합
  configuration: README.md#Setup
  description: Nvidia Jetson 보드에 대한 메트릭 가져오기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia Jetson
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 [NVIDIA Jetson][1] 보드를 모니터링합니다.
`tegrastats`에서 수집한 메트릭을 보고합니다.

## 설정

### 설치

NVIDIA Jetson 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있습니다.
서버에 추가 설치할 필요가 없습니다.

### 설정

1. 루트의 `conf.d/` 폴더에 있는 `jetson.d/conf.yaml` 파일을 생성합니다.
   에이전트의 설정 디렉토리에서 Jetson 성능 데이터 수집을 시작하세요.
   사용 가능한 모든 설정 옵션은 [jetson.d/conf.yaml.example 샘플][3]을 참조하세요.

2. [에이전트를 재시작합니다][4].

### 검증

[에이전트의 상태 하위 명령][5]을 실행하고 점검 섹션에서 `jetson`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nvidia-jetson" >}}


일부 메트릭은 `use_sudo`가 true로 설정된 경우에만 보고됩니다.
- `nvidia.jetson.iram.used`
- `nvidia.jetson.iram.total`
- `nvidia.jetson.iram.lfb`
- `nvidia.jetson.emc.freq`
- `nvidia.jetson.gpu.freq`
- `nvidia.jetson.cpu.freq`

### 서비스 점검

NVIDIA Jetson 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

NVIDIA Jetson 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://developer.nvidia.com/embedded-computing
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jetson.d/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/metadata.csv
[7]: https://docs.datadoghq.com/ko/help/