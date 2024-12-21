---
app_id: scalr
app_uuid: d74ce5c8-4e5a-485a-be79-ff55f8205c9d
assets:
  dashboards:
    Scalr Overview Dashboard: assets/dashboards/scalr_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: scalr.runs.count
      metadata_path: metadata.csv
      prefix: scalr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10312
    source_type_name: Scalr (Community Version)
author:
  homepage: https://scalr.com
  name: Scalr
  sales_email: sales@scalr.com
  support_email: support@scalr.com
categories:
- 자동화
- 설정 및 배포
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/scalr/README.md
display_on_public_website: true
draft: false
git_integration_title: scalr
integration_id: scalr
integration_title: Scalr
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: scalr
public_title: Scalr
short_description: Scalr는 Terraform Automation and COllaboration (TACO) 제품입니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Configuration & Deployment
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Scalr는 Terraform Automation and COllaboration (TACO) 제품입니다.
  media:
  - caption: Scalr 대시보드
    image_url: images/scalr_dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 설명서
    url: https://docs.scalr.com
  - resource_type: 설명서
    url: https://docs.scalr.com/en/latest/integrations.html#datadog
  support: README.md#Support
  title: Scalr
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Scalr는 한 곳에서 Terraform 운영을 분산할 수 있는 제어, 가시성 및 유연성을 제공하는 Terraform 클라우드 대안입니다.

Scalr [통합][1]은 큐 실행, 큐 상태, 환경 수 및 작업공간 수와 같은 심층 분석 및 보고를 위해 Terraform 실행 [이벤트][2] 세부 정보와 메트릭을 보냅니다. 이러한 메트릭은 즉시 사용 가능한 대시보드에 시각화되어 배포와 다른 인프라스트럭처 변경 사항의 상관 관계를 파악하고 Terraform 파이프라인 내 트렌드를 추적하는 데 도움이 됩니다.

## 설정
Scalr 통합은 [Datadog Agent][3] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Datadog Agent v7.21 또는 v6.21 이상의 경우 다음 지침에 따라 호스트에 Scalr 통합을 설치하세요. Docker Agent 또는 이전 버전의 Datadog Agent와 함께 설치하려면 [커뮤니티 통합 사용][4]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-scalr==1.0.0
   ```

2. Agent 기반 [통합][5]과 유사한 통합을 구성합니다.

### 구성

1. [Agent 구성 디렉터리][6]의 루트에 있는 `conf.d/` 폴더의 `scalr.d/conf.yaml` 파일을 편집하여 [Scalr 메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 scalr.d/conf.yaml][7]을 참조하세요.

2. [Agent를 재시작합니다][8].

### 검증

[Agent의 상태 하위 명령을 실행][9]하고 Checks 섹션에서 `scalr`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "scalr" >}}


### 이벤트

Scalr는 실행 결과를 [Events Explorer][12]에 이벤트로 보냅니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][13] 또는 [Scalr 지원팀][14]에 문의하세요.

## 참고 자료

- [Scalr 고객 설명서][15]
- [Scalr Datadog 통합 문서][16]


[1]: https://docs.scalr.com/en/latest/integrations.html
[2]: https://docs.datadoghq.com/ko/events/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ko/getting_started/integrations/
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/scalr/datadog_checks/scalr/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/scalr/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/scalr/assets/service_checks.json
[12]: https://docs.datadoghq.com/ko/events/explorer/
[13]: https://docs.datadoghq.com/ko/help/
[14]: https://scalr-labs.atlassian.net/servicedesk/customer/portal/31
[15]: https://docs.scalr.com
[16]: https://docs.scalr.com/en/latest/integrations.html#datadog