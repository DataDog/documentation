---
app_id: split-rum
app_uuid: 750d9e38-2856-44fe-98d0-9fbbc617d876
assets: {}
author:
  homepage: https://split.io/
  name: Split
  sales_email: partners@split.io
  support_email: support@split.io
categories:
- 설정 및 배포
- 문제 추적
- 개발 툴
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/split-rum/README.md
display_on_public_website: true
draft: false
git_integration_title: split-rum
integration_id: split-rum
integration_title: Split - RUM
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: split-rum
public_title: Split - RUM
short_description: Split의 기능 플래그로 RUM 데이터를 강화하세요
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
  - Category::Configuration & Deployment
  - 카테고리::이슈 추적
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Split의 기능 플래그로 RUM 데이터를 강화하세요
  media:
  - caption: Split 기능 플래그가 있는 Datadog RUM 개요(플래그 목록)
    image_url: images/split-feature-flags-list-in-dd-rum.png
    media_type: image
  - caption: Split 기능 플래그 세부 정보가 포함된 Datadog RUM
    image_url: images/split-feature-flag-detail-in-dd-rum.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Split - RUM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## 개요

[Split][1]은 기능 플래그의 속도와 신뢰성을 데이터와 결합하여 모든 기능의 영향을 측정하는 Intelligent Feature Management [플랫폼][2]입니다. Split을 사용하면 조직은 출시한 기능이 고객 경험 메트릭에 미치는 영향을 안전하게 측정할 수 있습니다. 

Datadog Split RUM 통합을 통해 프로덕트 팀은 RUM 데이터에 중첩된 기능 플래그 정보를 볼 수 있습니다. 이를 통해 개별 사용자의 실시간 활동과 경험을 사전에 모니터링할 수 있으며, 필요한 경우 성능 저하를 일으킬 수 있는 기능을 빠르게 롤백하거나 종료할 수 있습니다.

## 설정

기능 플래그 추적은 RUM Browser SDK에서 사용할 수 있습니다. 자세한 설정 지침은 [RUM에서 기능 플래그 데이터 시작하기][3] 가이드를 참조하세요.

1. Browser RUM SDK 버전을 4.25.0 이상으로 업데이트하세요.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`으로 설정합니다.
3. Split SDK를 초기화하고 다음 코드 스니펫을 사용하여 기능 플래그 평가를 Datadog에 보고하는 임프레션 리스너를 만듭니다.


```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {              
          datadogRum
              .addFeatureFlagEvaluation(
                   impressionData.impression.feature,
                   impressionData.impression.treatment
              );
     },
  },
});

const client = factory.client();
```

## 트러블슈팅

도움이 필요하신가요? Split 문서의 [JavaScript SDK 페이지][4]를 참고하시거나 [Datadog 지원팀][5]에 문의하세요.

[1]: https://split.io
[2]: https://www.split.io/product/
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/guide/setup-feature-flag-data-collection/
[4]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
[5]: https://docs.datadoghq.com/ko/help/