---
app_id: stormforge
app_uuid: 6f1ddcc9-e704-4f94-941b-8a914fcd89a0
assets:
  dashboards:
    StormForge Optimize Live Application Overview: assets/dashboards/stormforge_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: stormforge.recommendation_cpu_requests_cores
      metadata_path: metadata.csv
      prefix: stormforge.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: StormForge
author:
  homepage: https://stormforge.io
  name: StormForge
  sales_email: sales@stormforge.io
  support_email: support@stormforge.io
categories:
- cloud
- 설정 및 배포
- cog-2
- 비용 관리
- 쿠버네티스(Kubernetes)
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stormforge/README.md
display_on_public_website: true
draft: false
git_integration_title: stormforge
integration_id: stormforge
integration_title: StormForge
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: stormforge
oauth: {}
public_title: StormForge
short_description: 기계 학습을 사용해 쿠버네티스 리소스 실시간 최적화
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Cost Management
  - Category::Kubernetes
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: 기계 학습을 사용해 쿠버네티스 리소스 실시간 최적화
  media:
  - caption: 최적화 타겟팅을 위한 리소스 컬렉션으로 애플리케이션을 생성합니다.
    image_url: images/sf_ui_01_application.jpg
    media_type: image
  - caption: Optimize Live 설정
    image_url: images/sf_ui_02_configure.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: StormForge
---



## 개요

[StormForge Optimize Live][1]는 기계 학습을 관측 가능성 메트릭에 적용하여 쿠버네티스(Kubernetes)가 실행되는 모든 배포 환경에 대한 리소스 요청 권장 사항을 실시간으로 제공합니다.

**StormForge Optimize Live를 사용하면 다음이 가능합니다.**
- 리소스 효율성 향상
- 기존 관측 가능성 데이터 활용
- 성능 문제 위험 감소
- 빠른 시간 대비 가치 확보
- 자동 권장 사항 배포 또는 승인을 통한 배포

## 설정

이 통합을 설정하려면 Datadog API 및 애플리케이션 키와 함께 StormForge 계정을 보유해야 합니다.

### 설정

1. [Datadog API 키][2]를 생성합니다.
2. [Datadog 애플리케이션 키][3]를 생성합니다.
3. Datadog API와 애플리케이션 키를 [StormForge Datadog 통합][4]에 추가합니다.
4. Optimize Live 배포
5. [StormForge][5] 내에서 애플리케이션을 설정합니다.

더 자세한 지침은 StormForge [시작하기 가이드][6]에서 찾을 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "stormforge" >}}


### Events

StormForge 통합은 다음에 대한 이벤트를 생성합니다.
- 애플리케이션 업데이트
- 적용된 권장 사항

### 서비스 점검

StormForge 통합은 서비스 점검을 포함하지 않습니다.

## 지원팀

질문이나 기타 지원이 필요한 경우 [이메일][8]을 통해 StormForge에 문의할 수 있습니다.

[1]: https://www.stormforge.io/how-stormforge-optimize-live-works/
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#application-keys
[4]: https://docs.stormforge.io/optimize-live/getting-started/install/#datadog-metric-provider
[5]: https://app.stormforge.io
[6]: https://docs.stormforge.io/optimize-live/
[7]: https://github.com/DataDog/integrations-extras/blob/master/stormforge/metadata.csv
[8]: mailto:support@stormforge.io