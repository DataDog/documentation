---
app_id: rookout
app_uuid: a82a4f89-0690-48cf-bad0-9603fb652f44
assets:
  dashboards:
    rookout_overview: assets/dashboards/rookout_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rookout.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Datadog용 Rookout
author:
  homepage: https://rookout.com
  name: Rookout
  sales_email: support@rookout.com
  support_email: support@rookout.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rookout/README.md
display_on_public_website: true
draft: false
git_integration_title: rookout
integration_id: rookout
integration_title: Rookout 라이브 디버깅
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rookout
oauth: {}
public_title: Rookout 라이브 디버깅
short_description: Rookout을 사용해 프로덕션에서 실행되는 코드의 메트릭 수집
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 제공::UI 확장
  configuration: README.md#Setup
  description: Rookout을 사용해 프로덕션에서 실행되는 코드의 메트릭 수집
  media:
  - caption: Datadog Rookout 통합 데모
    image_url: images/video_thumbnail.png
    media_type: 비디오
    vimeo_id: 642104223
  - caption: Rookout 디버거
    image_url: images/app1.png
    media_type: image
  - caption: Rookout 디버그 세션 설정
    image_url: images/app2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Rookout 라이브 디버깅
---



## 개요

### 설명

[Rookout][1]은 클라우드 네이티브 디버깅 및 실시간 데이터 수집을 위한 획기적인 개발자 솔루션입니다. Rookout의 Non-Breaking Breakpoints를 사용하면 추가 코딩, 재배포 또는 재시작 없이 즉시 모든 유형의 데이터를 수집할 수 있습니다.

Rookout은 처음부터 쿠버네티스(Kubernetes), 마이크로서비스, 서버리스, 서비스 메시 기반 애플리케이션과 같은 프로덕션 환경과 최신 아키텍처 디버깅을 위해 설계되었습니다.

Rookout 통합을 사용하면 코드를 중지하거나 재배포할 필요 없이 프로덕션 또는 기타 환경에서 실시간으로 실행되는 코드에서 메트릭을 수집할 수 있습니다.

### 사용법

Rookout 통합에는 두 가지 구성 요소가 있습니다.

- 코드에서 메트릭 포인트를 수집할 수 있는 대시보드 위젯용 컨텍스트 메뉴 항목입니다.
- Rookout에 설정한 모든 측정 항목을 보여주는 커스텀 위젯입니다.

**컨텍스트 메뉴 항목**

하나 이상의 서버 또는 서비스를 나타내는 시계열 위젯을 클릭하면 새로운 상황에 맞는 메뉴 항목이 나타납니다.

"메트릭 포인트 설정"을 클릭하면 Rookout 앱이 열리고 올바른 인스턴스가 자동으로 선택됩니다.

**커스텀 대시보드 위젯**

Rookout 위젯을 대시보드에 추가하여 메트릭 포인트를 설정한 위치를 확인하세요.

## 설정

### 설정

대시보드의 시계열 위젯에 Rookout 컨텍스트 메뉴 항목을 추가하려면 제목에 Rookout 레이블 필터를 추가해야 합니다.

예를 들어, 시계열이 `cartservice`로 불리는 서비스의 일부 메트릭을 표시하는 경우 Rookout 컨텍스트 메뉴 항목이 `k8s_deployment:cartservice` 레이블 필터를 사용하여 Rookout 세션이 자동으로 시작되도록 합니다.

그러려면 시계열 위젯의 타이틀에 `[k8s_deployment:cartservice]`를 추가합니다.

## 수집한 데이터

### 메트릭

Rookout은 메트릭을 포함하지 않습니다.

### 서비스 점검

Rookout은 서비스 점검을 포함하지 않습니다.

### 이벤트

Rookout은 이벤트를 포함하지 않습니다.

## 트러블슈팅

지원이 필요하세요? [Rookout 지원][2]으로 문의해 주세요.

[1]: https://rookout.com
[2]: mailto:support@rookout.com