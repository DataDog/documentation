---
app_id: aspdotnet
app_uuid: 7d801e88-1fad-433e-81d9-07449fd45e13
assets:
  dashboards:
    ASP.NET - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aspdotnet.request.wait_time
      metadata_path: metadata.csv
      prefix: aspdotnet.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10039
    source_type_name: ASP.NET
  logs:
    source: iis
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aspdotnet/README.md
display_on_public_website: true
draft: false
git_integration_title: aspdotnet
integration_id: aspdotnet
integration_title: ASP.NET
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: aspdotnet
public_title: ASP.NET
short_description: 실시간으로 ASP.NET 서비스 메트릭을 추적하세요
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Languages
  - Category::로그 수집
  - Supported OS::Windows
  configuration: README.md#Setup
  description: 실시간으로 ASP.NET 서비스 메트릭을 추적하세요
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ASP.NET
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

실시간으로 ASP.NET에서 메트릭을 받아 다음을 수행할 수 있습니다.

- ASP.NET 상태를 시각화하고 모니터링합니다.
- ASP.NET 실패 조치 및 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

ASP.NET 검사는 [Datadog Agent][1] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 설정

1. ASP.NET 성능 데이터 수집을 시작하려면 [Agent 구성 디렉터리][2]의 루트에 있는 `conf.d/` 폴더에서 `aspdotnet.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 aspdotnet.d/conf.yaml][3]을 참조하세요.

2. [Agent를 재시작합니다][4].

**참고**: 이 검사의 버전 1.9.0 이상에서는 메트릭 수집을 위한 새로운 구현을 사용하며, Python 3이 필요합니다. Python 3을 사용할 수 없는 호스트의 경우 또는 이 검사의 레거시 버전을 사용하려는 경우에는 다음 [구성][5]을 참조하세요.

#### 로그 수집

ASP.NET은 IIS 로깅을 사용합니다. ASP.NET 요청 및 실패와 관련된 로그를 보려면 [IIS 설정 지침][6]을 따르세요.

ASP.NET 애플리케이션과 관련된 처리되지 않은 500 수준 예외 및 이벤트는 Windows Application EventLog를 통해 볼 수 있습니다.

### 검증

[Agent의 `status` 하위 명령을 실행][7]하고 Checks 섹션에서 `aspdotnet`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "aspdotnet" >}}


### 이벤트

ASP.NET 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

ASP.NET 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/integrations/iis/?tab=host#setup
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/