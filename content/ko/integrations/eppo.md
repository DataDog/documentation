---
app_id: eppo
app_uuid: 1d7b7957-82d6-4e9d-8ba1-b697f01fc850
assets:
  dashboards:
    Eppo Dashboard: assets/dashboards/eppo_dashboard.json
author:
  homepage: https://www.geteppo.com/
  name: Eppo
  sales_email: support@geteppo.com
  support_email: support@geteppo.com
categories:
- 설정 및 배포
- 개발 툴
- 이벤트 관리
- 클라우드
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eppo/README.md
display_on_public_website: true
draft: false
git_integration_title: eppo
integration_id: eppo
integration_title: Eppo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: eppo
public_title: Eppo
short_description: Eppo의 기능 플래그 정보로 Datadog RUM 데이터를 강화하세요
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - 제공::통합
  - 카테고리::설정 및 배포
  - Category::Developer Tools
  - 카테고리::이벤트 관리
  - 카테고리::클라우드
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: Eppo의 기능 플래그 정보로 Datadog RUM 데이터를 강화하세요
  media:
  - caption: Datadog RUM과 Eppo Flags 개요
    image_url: images/eppo_datadog1.png
    media_type: image
  - caption: Datadog RUM과 Eppo Flags 세부 정보
    image_url: images/eppo_datadog2.png
    media_type: image
  - caption: Datadog RUM과 Eppo Flags 세션 보기
    image_url: images/eppo_datadog3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Eppo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Eppo][1]는 조직 내 모든 구성원이 고급 A/B 테스트에 액세스할 수 있게 해주는 실험 및 기능 관리 플랫폼입니다.

Datadog Eppo RUM 통합은 플래그 이름 및 변형을 포함한 기능 플래그 정보로 Datadog RUM 데이터를 강화하여 성능 모니터링 및 동작 변경에 대한 가시성을 제공합니다. 이를 사용하여 어떤 사용자에게 기능이 표시되는지, 그리고 해당 기능이 사용자 성능에 부정적인 영향을 미치는지 확인할 수 있습니다.

## 설정

기능 플래그 추적은 RUM Browser SDK에서 사용할 수 있습니다. 자세한 설정 지침은 [RUM에서 기능 플래그 데이터 시작하기][2] 가이드를 참조하세요.

1. 브라우저 RUM SDK 버전을 4.25.0 이상으로 업데이트하세요.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`으로 설정합니다.
3. Datadog에 기능 플래그 평가를 보고하는 `datadogRum` 옵션을 사용하여 Eppo의 SDK를 초기화합니다.

다음은 JavaScript 예입니다.

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    // 고객의 이벤트 로깅에 할당 이벤트를 전송합니다.
    analytics.track({
      userId: assignment.subject,
      event: "Eppo Randomized Assignment",
      type: "track",
      properties: { ...assignment },
    });

    // `exposure`가 이 컨텍스트에서 정의되고 `variation` 속성을 갖는다고 가정합니다.
    datadogRum.addFeatureFlagEvaluation(assignment.experiment, exposure.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

## 트러블슈팅

도움이 필요하신가요? [Eppo 문서][3]를 참고하세요.

[1]: https://www.geteppo.com/
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.geteppo.com/sdks/datadog