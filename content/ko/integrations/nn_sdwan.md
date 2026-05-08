---
app_id: nn-sdwan
app_uuid: 8ff5c833-1498-4e63-9ef2-8deecf444d09
assets:
  dashboards:
    Netnology SD-WAN Overview: assets/dashboards/nn_sdwan_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - nn_sdwan.device_control_status
      - nn_sdwan.app_aware_routing.latency
      metadata_path: metadata.csv
      prefix: nn_sdwan.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10277
    source_type_name: Netnology SD-WAN
  monitors:
    Link latency is high: assets/monitors/high-latency-monitor.json
    Packet loss percentage is high: assets/monitors/packet-loss-monitor.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Netnology
  sales_email: info@netnology.io
  support_email: info@netnology.io
categories:
- 네트워크
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/README.md
display_on_public_website: true
draft: false
git_integration_title: nn_sdwan
integration_id: nn-sdwan
integration_title: Netnology Cisco SD-WAN
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: nn_sdwan
public_title: Netnology Cisco SD-WAN
short_description: Cisco SDWAN Controller Metric Exporter
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Cisco SDWAN Controller Metric Exporter
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Netnology Cisco SD-WAN
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 [Netnology][1] 제공 SD-WAN 플랫폼을 사용하는 Datadog Agent를 통해 Cisco SD-WAN 컨트롤러를 모니터링합니다. 이 점검을 통해 사용자는 여러 Cisco SD-WAN 컨트롤러의 네트워크 상태 및 성능을 동시에 모니터링할 수 있습니다. 수집된 정보는 구성된 모니터/알림에 대한 통합 대시보드 및 알림에 사용될 수 있습니다.

현재 SD-WAN 컨트롤러 대상으로는 Cisco vManage 디바이스만 지원됩니다.

## 설정

Netnology Cisco SD-WAN 통합은 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 수동으로 설치해야 합니다.

### 설치

Agent v7.21 이상/v6.21 이상의 경우, 아래 지침에 따라 호스트에 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent를 사용하여 설치하려면 [커뮤니티 통합 사용][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ``` bash
   datadog-agent integration install -t nn_sdwan==1.0.1
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더의 `nn_sdwan.d/conf.yaml` 파일을 편집하여 Cisco SD-WAN 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 nn_sdwan.d/conf.yaml][5]을 참고하세요.

2. [Agent를 재시작합니다][6].

### 검증

[Agent 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `nn_sdwan`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nn_sdwan" >}}


### 이벤트

Netnology Cisco SD-WAN 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "nn_sdwan" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://netnology.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/datadog_checks/nn_sdwan/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/