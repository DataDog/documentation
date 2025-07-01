---
app_id: keep
app_uuid: 40ac95c0-35bd-49c8-a5f0-b21037bc87b4
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.keephq.dev
  name: Keep
  sales_email: founders@keephq.dev
  support_email: tal@keephq.dev
categories:
- alerting
- 개발 툴
- incidents
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/keep/README.md
display_on_public_website: true
draft: false
git_integration_title: keep
integration_id: keep
integration_title: Keep
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: keep
public_title: Keep
short_description: Keep의 AIOps 플랫폼에서 Datadog으로 모니터 메트릭을 전송하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Developer Tools
  - Category::Incidents
  - Queried Data Type::Metrics
  - Queried Data Type::Logs
  - Queried Data Type::Events
  - 제출한 데이터 유형::메트릭
  - 제공::통합
  configuration: README.md#Setup
  description: Keep의 AIOps 플랫폼에서 Datadog으로 모니터 메트릭을 전송하세요.
  media:
  - caption: Keep의 간략 제품 소개
    image_url: images/alerts-page.png
    media_type: 비디오
    vimeo_id: 906118097
  - caption: Keep 알림 페이지
    image_url: images/alerts-page.png
    media_type: image
  - caption: Keep 노이즈 감소 규칙 빌더 페이지
    image_url: images/alert-rules.png
    media_type: image
  - caption: Keep 워크플로 뷰어
    image_url: images/workflows.png
    media_type: image
  - caption: Keep 워크플로 빌더 페이지
    image_url: images/workflow-builder.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Keep
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Keep][1]는 오픈 소스 AIOps 알림 관리 및 자동화 플랫폼으로, 관측 스택의 다양한 구성 요소에서 알림을 통합하고 자동화하며 노이즈를 줄이는 기능을 제공합니다. 이 통합을 통해 두 플랫폼의 강점을 결합하여 알림 관리 및 이벤트 상관 분석을 위한 통합적이고 효율적인 접근 방식을 구현할 수 있습니다.

Keep은 Datadog 모니터, 로그, 이벤트 데이터를 사용하여 알림과 상관관계를 수립하고 노이즈를 줄입니다.

이 통합의 주요 기능은 다음과 같습니다.

- 중앙 집중식 알림 관리: 모든 Datadog 알림을 Keep의 단일 창에 통합하여 간소화된 제어 및 가시성을 제공합니다.
- 알림 노이즈 감소: Datadog 알림을 필터링하고 우선순위를 지정하여 팀이 가장 중요한 알림을 즉시 처리하도록 함으로써 알림 피로를 최소화합니다.
- 종합적인 분석: Keep의 분석 도구를 활용하여 Datadog 알림에서 인사이트를 도출하여 선제적인 의사 결정과 트렌드 분석에 도움을 받을 수 있습니다.

이 통합은 알림 기능을 강화하고, 운영 효율성을 개선하고, **노이즈를 줄이면서** 데이터 기반 의사 결정을 내리고자 하는 팀에 이상적입니다.

자세한 내용은 [공식 Keep 설명서][2]를 참고하세요.



## 설정

### 설치

Datadog 계정의 [통합 타일][3]을 사용하여 [OAuth2][4]와의 통합 유지를 설치합니다.

Keep 통합 기능을 설정하려면 다음을 실행합니다.

1. Keep 통합 타일을 클릭하고 **통합 설치**를 선택합니다.
2. 사용자는 Keep 계정에 로그인하기 위해 Keep의 플랫폼으로 리디렉션됩니다.
3. 사용자는 Datadog 계정에서 필요한 범위를 검토하고 확인하기 위해 Datadog으로 다시 리디렉션됩니다.
4. 확인이 완료되면 사용자는 Keep 플랫폼으로 다시 리디렉션되어 설치가 성공적으로 완료되었는지 확인할 수 있습니다.

Keep이 성공적으로 설치되면 Datadog에 새 `Webhook` 통합이 자동으로 생성되고 모니터가 알림을 보내도록 수정됩니다.

## 삭제

- 이 통합이 삭제되면 이전 승인이 철회됩니다.
- 또한 [API 키 Page][5]에서 통합 이름을 검색하여 이 통합과 관련된 모든 API 키가 비활성화되었는지 확인합니다.
- [통합 페이지][6]에서 `Webhooks` 통합에 `keep-datadog-webhook-integration-UUID`이 포함되어 있지 않은지 확인합니다.

### 검증

Keep 통합이 제대로 작동하는지 확인하려면 다음 단계를 따르세요.
1. [Webhook 통합 페이지][6]로 이동합니다.
2. 설치된 `Webhooks` 목록에서 `keep-datadog-webhook-integration-UUID`로 시작하는 `Webhook`을 찾습니다.

## 수집한 데이터

### 메트릭

Keep 통합에는 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

Keep 통합에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Keep 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Keep 지원팀][7]에 문의하세요.

[1]: https://www.keephq.dev/
[2]: https://docs.keephq.dev/providers/documentation/datadog-provider
[3]: https://app.datadoghq.com/integrations/keephq
[4]: https://docs.datadoghq.com/ko/developers/authorization/oauth2_in_datadog/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/integrations/webhooks
[7]: mailto:rnd@keephq.dev?subject=[Datadog]%20OAuth%20Integration%20Support