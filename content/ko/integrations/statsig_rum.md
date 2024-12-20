---
app_id: statsig-rum
app_uuid: 86a69c7d-8042-4f93-96b1-f139b2058644
assets:
  dashboards:
    statsig_rum: assets/dashboards/statsig_rum_overview.json
author:
  homepage: https://statsig.com
  name: Statsig
  sales_email: support@statsig.com
  support_email: support@statsig.com
categories:
- 설정 및 배포
- 개발 툴
- 이벤트 관리
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/statsig_rum/README.md
display_on_public_website: true
draft: false
git_integration_title: statsig_rum
integration_id: statsig-rum
integration_title: Statsig - RUM
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: statsig_rum
public_title: Statsig - RUM
short_description: Statsig의 기능 게이트 정보로 Datadog RUM 데이터를 강화하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - '카테고리:: 이벤트 관리'
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: Statsig의 기능 게이트 정보로 Datadog RUM 데이터를 강화하세요.
  media:
  - caption: 사용자 세션 및 활성화된 기능 게이트 조사 내용을 보여주는 Datadog 대시보드
    image_url: images/dd-view-1.jpg
    media_type: image
  - caption: 모든 게이트의 개요와 각 게이트에 할당된 사용자 볼륨을 표시하는 Datadog 대시보드
    image_url: images/dd-view-2.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Statsig - RUM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Statsig의 기능 플래그 추적 통합은 기능 게이트 정보로 Datadog RUM 데이터를 강화하여 제품 기능과 시스템 및 성능 메트릭 간의 인과성을 측정할 수 있도록 해줍니다.

## 설정

### 기능 플래그 추적 설정

기능 플래그 추적은 RUM Browser SDK에서 사용할 수 있습니다. 자세한 설정 지침은 [RUM에서 기능 플래그 데이터 시작하기][1]를 참조하세요.

1. 브라우저 RUM SDK 버전을 4.25.0 이상으로 업데이트하세요.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`으로 설정합니다.
3. Statsig의 SDK(`>= v4.34.0`)를 초기화하고 아래와 같이 `gateEvaluationCallback` 옵션을 구현합니다.

```js
await statsig.initialize('client-<STATSIG CLIENT KEY>',
  {userID: '<USER ID>'},
  {     
    gateEvaluationCallback: (key, value) => {
      datadogRum.addFeatureFlagEvaluation(key, value);
    }
  }
); 
```

## 지원

이 통합 활성화에 대한 지원을 받으려면 [Statsig Slack 커뮤니티][2]에 가입하세요. [1]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection
[2]: https://join.slack.com/t/statsigcommunity/shared_invite/zt-pbp005hg-VFQOutZhMw5Vu9eWvCro9g