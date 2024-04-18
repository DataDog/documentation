---
app_id: circleci
app_uuid: 042c421c-c655-4034-9b2f-c2c09faf0800
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - circleci.finished_builds.count
      metadata_path: metadata.csv
      prefix: circleci
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 213
    source_type_name: CircleCI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- 설정 및 배포
- 자동화
- 개발 툴
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: circleci
integration_id: circleci
integration_title: CircleCI
integration_version: ''
is_public: true
kind: 통합
manifest_version: 2.0.0
name: circleci
public_title: CircleCI
short_description: CircleCI 플랫폼은 간단하고 빠르게 빌드하고 고품질의 소프트웨어를 릴리스할 수 있도록 해줍니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::메트릭
  - Category::Configuration & Deployment
  - Category::Automation
  - Category::Developer Tools
  configuration: README.md#Setup
  description: CircleCI 플랫폼은 간단하고 빠르게 빌드하고 고품질의 소프트웨어를 릴리스할 수 있도록 해줍니다.
  media:
  - caption: Synthetics
    image_url: images/circleci_synthetics.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CircleCI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

CircleCI를 연결해 다음을 수행할 수 있습니다.

- 완료된 빌드 개수 또는 평균 빌드 시간 등 핵심 CircleCI 메트릭을 시각화합니다.
- Datadog 태그 시스템을 사용해 (작업 이름 또는 리포지토리별 빌드 나누기 등) 데이터를 분석합니다.
- Synthetics에서 orb 워크플로 데이터를 봅니다.
- Datadog에 CircleCI 작업 로그를 수집합니다.

## 설정

### 설치

[통합 타일][1]을 사용해 CircleCI 통합을 설치할 수 있습니다.

### 설정

1. CircleCI 설정에서 개인 API 토큰으로 이동해 양식에 생성된 키를 입력합니다. 이름은 CircleCI 레이블과 동일할 필요는 없지만 고유해야 합니다.
2. "Organization/repo*name", "Organization/repo*\*" 또는 "Organization/\*" 등 표현식을 사용해 리포지토리를 필터링합니다. **필터링은 추적한 프로젝트 목록에 있으며 CircleCI에서 설정되어야 합니다.**
3. 적합한 버전 관리 시스템을 지정하고 적절한 API 키를 참조합니다.
4. 리포지토리를 위해 로그 수집을 활성화한 경우 파이프라인이 Datadog CI 가시성에 전송되고 있는지 확인해야 합니다.
   [CircleCI 워크플로에서 추적 설정][2]에서 지침을 따릅니다.

여러 API 토큰을 설정해야 합니다. 하나의 제공된 토큰에 대해 다수의 프로젝트를 추적할 수 있습니다. 사용자는 Datadog에서 리포지토리의 정보를 확인하기 위해 특정 리포지토리에 대한 기여자로 설정되어야 합니다. 

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "circleci" >}}


### 이벤트

CircleCI 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

CircleCI 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

- [Datadog을 사용한 CircleCI 환경 모니터링][5]

[1]: https://app.datadoghq.com/integrations/circleci
[2]: https://docs.datadoghq.com/ko/continuous_integration/pipelines/circleci/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/circleci/circleci_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/circleci-monitoring-datadog/