---
app_id: cloud-foundry-api
app_uuid: a0c8e3e8-f3de-4405-88d3-0856e6c0948f
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloud_foundry_api.events.count
      metadata_path: metadata.csv
      prefix: cloud_foundry_api.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cloud Foundry API
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/README.md
display_on_public_website: true
draft: false
git_integration_title: cloud_foundry_api
integration_id: cloud-foundry-api
integration_title: Cloud Foundry API
integration_version: 3.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cloud_foundry_api
public_title: Cloud Foundry API
short_description: Cloud Foundry 감사 이벤트를 수집하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::macOS
  - 지원 OS::Windows
  - 카테고리::클라우드
  - 카테고리::오케스트레이션
  configuration: README.md#Setup
  description: Cloud Foundry 감사 이벤트를 수집하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cloud Foundry API
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 [Cloud Foundry API][1]를 쿼링하여 감사 이벤트를 수집하고 에이전트를 통해 Datadog으로 전송합니다.

## 설정

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

Cloud Foundry API 점검은 [Datadog 에이전트][3] 패키지에 포함됩니다. 
서버에 추가 설치할 필요가 없습니다.

### 설정

1. Agent의 설정 디렉터리 루트에서 `conf.d/` 폴더에 있는 `cloud_foundry_api.d/conf.yaml` 파일을 편집하여 Cloud Foundry API 데이터 수집을 시작하세요. 사용 가능한 모든 설정 옵션은 [cloud_foundry_api.d/conf.yaml 샘플][4]을 참조하세요.

2. [에이전트를 재시작합니다][5].

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 점검 섹션에서 `cloud_foundry_api`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cloud_foundry_api" >}}


### 이벤트

Cloud Foundry API 통합으로 설정한 감사 이벤트를 수집합니다.

### 서비스 점검
{{< get-service-checks-from-git "cloud_foundry_api" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: http://v3-apidocs.cloudfoundry.org
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/datadog_checks/cloud_foundry_api/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help