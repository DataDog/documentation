---
app_id: flagsmith-rum
app_uuid: a88f10b6-aef7-41df-979e-d70b720c6752
assets: {}
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- 설정 및 배포
- 문제 추적
- 개발 툴
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith-rum/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith-rum
integration_id: flagsmith-rum
integration_title: Flagsmith
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: flagsmith-rum
public_title: Flagsmith
short_description: Flagsmith의 기능 플래그로 RUM 데이터를 강화하세요
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
  - Category::Configuration & Deployment
  - Category::Issue Tracking
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Flagsmith의 기능 플래그로 RUM 데이터를 강화하세요
  media:
  - caption: Datadog RUM과 Flagsmith Flags 개요
    image_url: images/flag_rum_overview.png
    media_type: image
  - caption: Datadog RUM과 Flagsmith Flags 세부 정보
    image_url: images/flag_rum_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Flagsmith][1]는 웹, 모바일 및 서버 측 애플리케이션 전반의 기능 관리를 용이하게 합니다.

Datadog Flagsmith RUM 통합은 기능 플래그로 RUM 데이터를 강화하여 성능 모니터링 및 동작 변경에 대한 가시성을 제공합니다. 어떤 사용자에게 사용자 경험이 표시되는지, 그리고 이것이 사용자의 성능에 부정적인 영향을 미치는지 확인합니다.

## 설정

기능 플래그 추적은 RUM Browser SDK에서 사용할 수 있습니다. 자세한 설정 지침은 [RUM에서 기능 플래그 데이터 시작하기][2] 가이드를 참조하세요.

1. 브라우저 RUM SDK 버전을 4.25.0 이상으로 업데이트하세요.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`으로 설정합니다.
3. 아래 표시된 코드 스니펫을 사용하여 Datadog에 기능 플래그 평가를 보고하는 `datadogRum` 옵션으로 Flagsmith의 SDK를 초기화합니다.

```javascript
flagsmith.init({
     datadogRum: {
        client: datadogRum,
        trackTraits: true,
    },
    ...
})
```

## 트러블슈팅

도움이 필요하신가요? [Flagsmith 문서][3]를 참조하거나 [Datadog 지원팀][4]에 문의하세요.

[1]: https://flagsmith.com/
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.flagsmith.com/clients/javascript#datadog-rum-javascript-sdk-integration
[4]: https://docs.datadoghq.com/ko/help/