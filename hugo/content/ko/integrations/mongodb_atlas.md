---
app_id: mongodb-atlas
app_uuid: d7f734da-a1f7-4e3f-a590-ea154018a8d8
assets:
  dashboards:
    MongoDB-Atlas-Overview: assets/dashboards/MongoDB-Atlas-Overview_dashboard.json
    MongoDB-Atlas-Vector-Search-Overview: assets/dashboards/MongoDB-Atlas-Vector-Search-Overview_dashboard.json
    MongoDB-dbStats-collStats-Dashboard: assets/dashboards/MongoDB-Atlas-dbStats-collStats_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: mongodb.atlas.connections.current
      metadata_path: metadata.csv
      prefix: mongodb.atlas.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 230
    source_type_name: MongoDB Atlas
  monitors:
    CPU usage is higher than expected: assets/monitors/high_cpu.json
    Memory usage is higher than normal: assets/monitors/memory.json
    Query efficiency is degrading: assets/monitors/query_efficiency.json
    Read latency is higher than expected: assets/monitors/read_latency.json
    Write latency is higher than expected: assets/monitors/write_latency.json
author:
  homepage: https://www.mongodb.com
  name: MongoDB
  sales_email: field@mongodb.com
  support_email: frank.sun@mongodb.com
categories:
- ai/ml
- 메트릭
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/README.md
display_on_public_website: true
draft: false
git_integration_title: mongodb_atlas
integration_id: mongodb-atlas
integration_title: MongoDB Atlas
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mongodb_atlas
public_title: MongoDB Atlas
short_description: Atlas 읽기/쓰기 성능, 벡터 검색 메트릭 등을 추적하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Category::Metrics
  - 제공::통합
  configuration: README.md#Setup
  description: Atlas 읽기/쓰기 성능, 벡터 검색 메트릭 등을 추적하세요.
  media:
  - caption: MongoDB Atlas 개요 대시보드
    image_url: images/mongodb_atlas_dashboard.png
    media_type: 이미지
  - caption: MongoDB Atlas Vector 검색 개요 대시보드
    image_url: images/mongodb_atlas_vector_search_dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
  - resource_type: 기타
    url: https://www.mongodb.com/products/platform/atlas-for-government
  support: README.md#Support
  title: MongoDB Atlas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

계산된 메트릭을 Datadog로 푸시할 수 있습니다.

- 핵심 MongoDB Atlas 메트릭을 시각화하세요.
- MongoDB Atlas Vector 검색 메트릭을 시각화하세요.
- 전체 MongoDB Atlas 성능과 나머지 애플리케이션의 상관관계를 파악하세요.

통합에는 즉시 사용 가능한 모니터와 전용 대시보드가 포함되어 있어 Atlas 상태 및 성능 메트릭을 확인할 수 있습니다. 처리량 메트릭을 모니터링하고 시간 경과에 따른 읽기/쓰기 작업의 평균 지연 시간을 추적하고 현재 연결 수가 최대 한도에 가까워지면 알려주는 모니터를 생성할 수 있습니다.

MongoDB Atlas Vector 검색 메트릭을 사용하면 Atlas Vector 검색을 사용하여 고성능의 차세대 AI 애플리케이션을 색인, 검색 및 구축할 수 있습니다.

**참고**: MongoDB Atlas는 M10+ 클러스터에서만 사용할 수 있습니다.

## 설정

### 설치

Atlas 포털에 로그인하여 MongoDB Atlas 통합을 설치할 수 있습니다.

### 설정

1. Datadog [API 키][1]를 검색하거나 생성합니다.
2. [Atlas 포털][2]의 **통합** -> **Datadog 설정**에서 Datadog API 키를 입력합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mongodb-atlas" >}}


### 이벤트

MongoDB Atlas는 Datadog에 이벤트로 [알림][4]을 푸시할 수 있습니다.

### 서비스 점검

MongoDB Atlas 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀에 문의][5]하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog를 사용해 MongoDB Atlas 모니터링][6]
- [정부용 MongoDB Atlas][7]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/metadata.csv
[4]: https://www.mongodb.com/docs/atlas/configure-alerts/#std-label-notification-options
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
[7]: https://www.mongodb.com/products/platform/atlas-for-government