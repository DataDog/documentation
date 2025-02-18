---
app_id: dotnetclr
app_uuid: 2147d078-2742-413e-83eb-58400657de56
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: dotnetclr.memory.time_in_gc
      metadata_path: metadata.csv
      prefix: dotnetclr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10069
    source_type_name: .NET CLR
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
- windows
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md
display_on_public_website: true
draft: false
git_integration_title: dotnetclr
integration_id: dotnetclr
integration_title: .NET CLR
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: dotnetclr
public_title: .NET CLR
short_description: Dotnetclr 상태 시각화 및 모니터링
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Languages
  - Category::Windows
  - Offering::통합
  configuration: README.md#Setup
  description: Dotnetclr 상태 시각화 및 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: .NET CLR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

.NET CLR 서비스에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- .NET CLR 상태를 시각화하고 모니터링합니다.
- .NET CLR 실패 조치 및 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

.NET CLR 점검은 [Datadog Agent][1] 패키지에 포함되어 있습니다. 서버에 추가 설치가 필요하지 않습니다.

### 설정

1. .NET CLR 성능 데이터 수집을 시작하려면 [Agent 구성 디렉터리][2]의 루트에 있는 `conf.d/` 폴더에서 `dotnetclr.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 dotnetclr.d/conf.yaml][3]을 참조하세요.
2. [Agent를 재시작합니다][4].

**참고**: 이 점검의 버전 1.10.0 이상에서는 메트릭 수집을 위한 새로운 구현을 사용하며, Python 3이 필요합니다. Python 3을 사용할 수 없는 호스트의 경우 또는 이 검사의 레거시 버전을 사용하려는 경우 다음 [구성][5]을 참조하세요.

## 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `dotnetclr`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "dotnetclr" >}}


### 서비스 점검

.NET CLR 점검은 서비스 점검을 포함하지 않습니다.

### 이벤트

.NET CLR 점검은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/metadata.csv
[8]: https://docs.datadoghq.com/ko/help/