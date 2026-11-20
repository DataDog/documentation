---
app_id: hyper-v
app_uuid: 6024e97b-c3c6-45e3-ba71-a48adeebc191
assets:
  dashboards:
    hyper-v: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hyperv.hypervisor_logical_processor.total_run_time
      metadata_path: metadata.csv
      prefix: hyperv.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10046
    source_type_name: HyperV
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- OS & 시스템
- 윈도우즈(Windows)
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hyperv/README.md
display_on_public_website: true
draft: false
git_integration_title: hyperv
integration_id: hyper-v
integration_title: HyperV
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: hyperv
public_title: HyperV
short_description: Microsoft의 Hyper-V 가상화 기술을 모니터링합니다.
supported_os:
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::OS & System
  - Category::Windows
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Microsoft의 Hyper-V 가상화 기술을 모니터링합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog
  support: README.md#Support
  title: HyperV
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog Agent를 통해 [Hyper-V][1]를 모니터링합니다.

## 설정

### 설치

Hyper-V 점검은 [Datadog Agent][2] 패키지에 포함되어 있어 서버에 추가 설치가 필요하지 않습니다.

### 설정

1. Hyper-V 성능 데이터를 수집하려면 Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서  `hyperv.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 hyperv.d/conf.yaml][3]을 참조하세요.

2. [에이전트를 재시작합니다][4].

**참고**: 이 점검의 1.5.0 이상 버전에서는 메트릭 수집을 위한 새로운 구현을 사용하므로 Python 3이 필요합니다. Python 3을 사용할 수 없는 호스트의 경우 또는 이 점검의 레거시 버전을 사용하려는 경우 다음 [config][5]를 참조하세요.

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `hyperv`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hyper-v" >}}


### 서비스 점검

Hyper-V는 서비스 점검을 포함하지 않습니다.

### 이벤트

Hyper-V는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 Microsoft Hyper-V 모니터링][9]

[1]: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/hyperv/metadata.csv
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog
