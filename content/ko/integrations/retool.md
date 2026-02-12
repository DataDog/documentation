---
app_id: retool
app_uuid: 13239057-ebc6-4cb6-a789-35f064bbcd0f
assets:
  dashboards:
    'Retool + Datadog: ElasticSearch Action Console': assets/dashboards/retool_retool_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: retool
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10176
    source_type_name: Retool
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Retool
  sales_email: support@retool.com
  support_email: support@retool.com
categories:
- 개발 툴
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/retool/README.md
display_on_public_website: true
draft: false
git_integration_title: retool
integration_id: retool
integration_title: Retool
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: retool
public_title: Retool
short_description: Retool로 내부 도구를 빠르게 빌드할 수 있습니다.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Retool로 내부 도구를 빠르게 빌드할 수 있습니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Retool
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
모니터링 및 분석은 필수적인 인사이트를 제공하지만, 개발자들은 이러한 인사이트에 기반한 조치를 취하기 위해 종종 분리된 독립형 커스텀 도구들 사이를 오가야 하므로 대응이 비효율적이거나 효과적이지 못한 경우가 있습니다.

Retool은 개발자가 Datadog 대시보드에 직접 내장되는 커스텀 앱을 만들 수 있도록 지원하여 Datadog에서 벗어나지 않고도 조치를 취하고 워크플로를 자동화할 수 있도록 도와드립니다.

![스크린샷1][1]

### 메트릭
Datadog의 Elasticsearch 관리용 내장형 Retool 앱은 Datadog 대시보드에서 벗어나지 않고도 클러스터, 계정 등을 관리할 수 있는 기능과 주요 Elasticsearch 메트릭 및 로그에 대한 기존 가시성을 결합합니다.

### 대시보드
Retool은 Elasticsearch 관리용 내장 앱을 구축하였습니다. 이미 Datadog에서 Elasticsearch 메트릭, 트레이스, 로그를 모니터링할 수 있습니다. 개발자는 내장 앱으로 Datadog 대시보드에서 직접 풍부한 Datadog 인사이트에 대한 조치를 취할 수 있습니다. 해당 조치에는 다음이 포함됩니다.

- 샤드(shard)와 복제본으로 새 인덱스 추가하기
- 샤드(shard) 리라우팅 및 인덱스 제외를 통한 노드 관리
- 새 스냅샷 만들기 및 인덱스 복원

## 설정
Retool 통합은 즉시 사용 가능한 대시보드를 같이 제공합니다. iframe으로 Retool에 등록 또는 로그인할 수 있습니다.

연결 문자열로 ElasticSearch 클러스터에 연결하라는 메시지가 표시됩니다. 본 앱은 자동으로 인스턴스에 추가됩니다. 그런 다음 탐색 바에서 리소스를 클릭하고 새 Datadog 리소스를 생성합니다(API 및 애플리케이션 키 추가). 마지막으로 쿼리 편집기의 리소스 선택 드롭다운에서 Datadog 리소스를 선택하여 Datadog 쿼리 두 개에 연결합니다.

Datadog으로 돌아가 대시보드에서 실행 중인 앱을 확인합니다. 언제든지 앱을 편집하여 DevOps 워크플로에 맞게 사용자 지정할 수 있습니다.

## 수집한 데이터

### 메트릭
Retool 통합에는 아직 메트릭이 포함되지 않습니다.

### 이벤트
Retool 통합에는 아직 이벤트가 포함되지 않습니다.

### 서비스 점검
Retool에는 아직 서비스 점검이 포함되지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원 팀][2]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/retool/images/1.png
[2]: https://docs.datadoghq.com/ko/help/