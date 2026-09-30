---
app_id: rum-expo
app_uuid: 6894cf91-e7a2-4600-966b-20a0c99ff08d
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- metrics
- mobile
- network
- tracing
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_expo/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_expo
integration_id: rum-expo
integration_title: 엑스포
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_expo
public_title: 엑스포
short_description: Datadog RUM으로 Expo 애플리케이션 모니터링 및 메트릭 생성
supported_os:
- android
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - 카테고리::메트릭
  - Category::Mobile
  - Category::Network
  - Category::Tracing
  - Supported OS::Android
  - Supported OS::iOS
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog RUM으로 Expo 애플리케이션 모니터링 및 메트릭 생성
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 설명서
    url: https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/
  - resource_type: 설명서
    url: https://docs.datadoghq.com/real_user_monitoring/error_tracking/expo/
  support: README.md#Support
  title: 엑스포
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog [Expo 통합][1]을 사용하면 다음과 같은 방식으로 문제 해결 시간을 줄이고, 새로운 기능 개발에 더 집중할 수 있습니다.

- 타사 라이브러리, 네트워크 요청, 대용량 미디어 파일에서 발생하는 느린 성능 문제 및 애플리케이션 충돌에 대한 원인 디버깅
- 애플리케이션 반응 속도 개선, 서비스 수준 지표(SLI) 설정, 기본 제공 대시보드, 실시간 메트릭, 난독화된 충돌 보고서를 통한 문제 진단
- 대량의 애플리케이션 오류를 정교하게 분류하여 관리 가능한 고유 이슈 집합으로 그룹화

사용자 경험이 비즈니스에 미치는 영향을 다음과 같은 방식으로 연결할 수 있습니다.

- 인구통계, 버전 릴리스, 사용자 정의 속성별 화면 참여도 같은 핵심 모바일 사용자 경험 데이터를 분석하여 비즈니스 KPI 달성
- ID, 셀룰러 활동, 추천 URL 등을 포함한 세션 이벤트 및 속성의 타임라인과 모든 사용자 여정을 자동으로 연결
- 맞춤형 분석 및 지리적 지도를 통해 사용자 행동 트렌드 파악

Expo 애플리케이션의 엔드투엔드 상태를 다음과 같이 모니터링합니다.

- 이슈 조사 시 사용자 경험 데이터를 백엔드 트레이스, 런타임 메트릭, 로그로 전환하여 전체 컨텍스트 파악
- 클라이언트 측과 서버 측 메트릭, 트레이스, 로그를 통합하여 충돌 디버깅을 더 빠르게 수행
- 프런트엔드 및 백엔드 팀을 위한 단일 플랫폼에서 풀스택 모니터링 통합

## 설정

### RUM 이벤트 수집

애플리케이션에서 Real User Monitoring 이벤트 수집을 시작하려면 [Expo 모니터링][2]을 참고하세요.

### 트레이스 수집

Expo 애플리케이션은 자동으로 Datadog에 트레이스를 전송합니다.

### 로그 수집

Expo 애플리케이션 로그를 Datadog으로 전달하려면 [Expo 로그 수집][3]을 참고하세요.

## 수집한 데이터

### 메트릭

Expo 통합은 메트릭을 포함하지 않습니다. RUM 애플리케이션에서 커스텀 메트릭을 생성하려면 [메트릭 생성][4]을 참고하세요.

### 이벤트

이벤트 및 속성에 관한 자세한 내용은 [RUM Expo 모니터링][5]을 참고하세요.

### 서비스 점검

Expo 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Expo 모니터링][5]
- [Expo 충돌 보고 및 오류 추적][7]

[1]: https://app.datadoghq.com/integrations/rum-expo
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/reactnative/expo/#setup
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/reactnative/#manual-instrumentation
[4]: https://docs.datadoghq.com/ko/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ko/real_user_monitoring/reactnative/expo/
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://docs.datadoghq.com/ko/real_user_monitoring/error_tracking/expo/