---
app_id: rum-cypress
app_uuid: a6c112b6-f3af-4f9e-bf25-e0f8d8d7bb5f
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 문제 추적
- 메트릭
- 네트워크
- 테스팅
- 추적
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_cypress/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_cypress
integration_id: rum-cypress
integration_title: Cypress
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_cypress
public_title: Cypress
short_description: Datadog으로 애플리케이션의 Cypress 테스트 실행 모니터링
supported_os:
- 모두
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::이슈 추적
  - 카테고리::메트릭
  - Category::Network
  - Category::Testing
  - Category::Tracing
  - Supported OS::Any
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog으로 애플리케이션의 Cypress 테스트 실행 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cypress
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog [Cypress 통합][1]을 사용하면 다음의 방식으로 파이프라인에서 실행되는 CI/CD 파이프라인과 Cypress 테스트의 성능을 모니터링할 수 있습니다.

- 불안정하거나 실패하는 테스트를 조사하고, 실패한 단계에 집중하여 문제를 정확히 파악
- 분산 추적 정보가 포함된 테스트 결과를 확인하고 Cypress 테스트가 느린 이유 분석
- RUM 및 Session Replay에서 수집된 데이터를 사용하여 엔드투엔드 Cypress 테스트의 성능 격차 문제 해결
- 실제 사용자 세션을 모니터링하고 캡처하여 시각적으로 재생


## 설정

Cypress 테스트를 RUM 및 Session Replay과 통합하는 방법은 [CI Visibility-RUM 통합 문서][2]를 참고하세요.


### RUM 이벤트 수집

애플리케이션에서 Real User Monitoring 이벤트 수집을 시작하려면 [Cypress 모니터링][3]을 참고하세요.

### 트레이스 수집

해당 애플리케이션은 자동으로 Datadog에 트레이스를 보냅니다.

## 수집한 데이터

### 메트릭

CI Visibility-RUM 통합은 메트릭을 포함하지 않습니다. RUM 애플리케이션에서 커스텀 메트릭을 생성하려면 [메트릭 생성][4]을 참고하세요.

### 서비스 점검

Cypress 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

참고할 만한 유용한 문서, 링크, 게시물:

- [CI Visibility][6]



[1]: https://app.datadoghq.com/integrations/rum-cypress
[2]: https://docs.datadoghq.com/ko/continuous_integration/guides/rum_integration/
[3]: https://docs.datadoghq.com/ko/continuous_integration/guides/rum_integration/#browser-tests-and-rum
[4]: https://docs.datadoghq.com/ko/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://docs.datadoghq.com/ko/continuous_integration/