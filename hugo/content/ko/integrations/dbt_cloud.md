---
app_id: dbt-cloud
app_uuid: b237cca3-e51e-400b-ae1d-960d0cab286b
assets:
  dashboards:
    dbt Cloud Overview: assets/dashboards/dbt_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - dbt_cloud.runs.total
      metadata_path: metadata.csv
      prefix: dbt_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24633362
    source_type_name: DBT Cloud
  monitors:
    High runs error rate: assets/monitors/high_runs_error_rate.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- 개발 툴
- 메트릭
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: dbt_cloud
integration_id: dbt-cloud
integration_title: dbt Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dbt_cloud
public_title: dbt Cloud
short_description: dbt Cloud 계정에서 실행, 작업 성능 등의 통계를 가져오세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Developer Tools
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: dbt Cloud 계정에서 실행, 작업 성능 등의 통계를 가져오세요.
  media:
  - caption: dbt Cloud Dashboard
    image_url: images/dbt-dashboard-screenshot.png
    media_type: 이미지
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/
  support: README.md#Support
  title: dbt Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

Datadog과 [dbt Cloud][1]의 통합을 통해 dbt 실행, 모델 및 테스트에서 주요 메트릭을 수집하고 시각화할 수 있습니다. dbt Cloud와 Datadog을 통합하면 다음과 같은 작업을 할 수 있습니다.

- dbt 실행의 성능과 상태를 모니터링합니다.
- 실행, 모델, 테스트의 실행 시간, 컴파일 시간, 상태 코드를 시각화합니다.
- 스택의 다른 서비스에서 얻은 데이터와 dbt 메트릭을 연관시킵니다.

## 설정

### 사전 필수 조건

- dbt Cloud 계정.
- 필수 권한이 있는 API 토큰.

### 1단계: dbt Cloud에서 API 토큰 생성

1. dbt Cloud에서 **User Profile** > **API Tokens** > **Service Tokens**로 이동합니다.
2. **+ Create Service Token**을 클릭합니다.
3. 토큰 이름을 제공합니다.
4. 토큰 권한을 설정합니다.
   - Administrative API 메트릭의 경우: 토큰이 실행 및 작업에 액세스할 수 있는지 확인하세요.
   - Discovery API 메트릭의 경우(선택 사항): 토큰에 **Metadata API** 권한이 있는지 확인하고 프로젝트에 [Discovery API를 활성화][2]했는지 확인하세요.
5. **Save**를 클릭하고 생성된 **API Token**을 복사합니다.

### 2단계: dbt 클라우드 계정을 Datadog에 연결

1. Datadog 플랫폼에서 **Integrations**로 이동합니다.
2. **dbt Cloud**를 검색하고 통합을 선택합니다.
3. 계정 도메인, 메타데이터 도메인(선택 사항), API 토큰을 입력합니다.
4. **Save** 버튼을 클릭하여 설정을 저장합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "dbt_cloud" >}}


### 서비스 점검

dbt Cloud 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

dbt Cloud 통합은 이벤트를 포함하지 않습니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:
- [Datadog을 사용하여 dbt Cloud 모니터링][3]

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][4]에 문의하세요.

[1]: https://www.getdbt.com/product/dbt-cloud
[2]: https://docs.getdbt.com/docs/dbt-cloud-apis/discovery-api
[3]: https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/
[4]: https://docs.datadoghq.com/ko/help/