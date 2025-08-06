---
app_id: rum-angular
app_uuid: 0dd38c9b-921d-4252-8c46-c7a6d83c5778
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 메트릭
- 추적
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_angular/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_angular
integration_id: rum-angular
integration_title: Angular
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_angular
public_title: Angular
short_description: Datadog RUM으로 Angular 애플리케이션 모니터링 및 메트릭 생성
supported_os:
- 모두
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::메트릭
  - Category::Tracing
  - Supported OS::Any
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog RUM으로 Angular 애플리케이션 모니터링 및 메트릭 생성
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Angular
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog [Angular 통합][1]을 사용하면 다음의 방식으로 Angular 구성 요소의 성능 문제를 신속하게 해결할 수 있습니다.

- 느린 서버 응답 시간, 렌더링 차단 리소스, 구성 요소 내부 오류와 같은 성능 병목 현상의 원인 디버깅
- Angular 성능 데이터를 사용자 여정, 서버 측 AJAX 호출, 로그와 자동으로 상호 연결
- Angular의 핵심 성능 메트릭(예: Core Web Vitals)이 임계값 이하로 떨어져 사용자 경험에 부정적 영향을 미칠 경우 엔지니어링 팀에 알림 전송


다음을 통해 Angular 애플리케이션을 엔드투엔드로 모니터링합니다.

- 전체 스택에서 사용자 여정 추적 및 시각화
- Angular 코드, 네트워크 성능, 기본 인프라스트럭처에 발생할 수 있는 느린 로드 시간 원인 디버깅
- 사용자 ID, 이메일, 이름 등의 속성을 사용하여 모든 사용자 세션을 분석하고 맥락화
- 프런트엔드 및 백엔드 개발 팀을 위한 하나의 플랫폼에서 풀스택 모니터링 통합






## 설정

### RUM 이벤트 수집

애플리케이션에서 Real User Monitoring 이벤트 수집을 시작하려면 [브라우저 모니터링][2]을 참고하세요.

### 트레이스 수집

Angular 애플리케이션은 자동으로 Datadog에 트레이스를 보냅니다.

### 로그 수집

Angular 애플리케이션의 로그를 Datadog으로 전달하려면 [JavaScript 로그 수집][3]을 참고하세요.

## 수집한 데이터

### 메트릭

Angular 통합은 메트릭을 포함하지 않습니다. RUM 애플리케이션에서 커스텀 메트릭을 생성하려면 [메트릭 생성][4]을 참고하세요.

### 이벤트

이벤트 및 속성에 관한 자세한 내용은 [수집된 RUM 브라우저 데이터][5]를 참고하세요.

### 서비스 점검

Angular 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.



[1]: https://app.datadoghq.com/integrations/rum-angular
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/ko/logs/log_collection/javascript/
[4]: https://docs.datadoghq.com/ko/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ko/real_user_monitoring/browser/data_collected/
[6]: https://docs.datadoghq.com/ko/help/