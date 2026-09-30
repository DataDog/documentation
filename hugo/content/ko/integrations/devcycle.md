---
app_id: devcycle
app_uuid: a550d328-e35d-445b-8d13-d12b2c7da5d2
assets: {}
author:
  homepage: https://devcycle.com
  name: DevCycle
  sales_email: sales@devcycle.com
  support_email: support@devcycle.com
categories:
- 설정 및 배포
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/devcycle/README.md
display_on_public_website: true
draft: false
git_integration_title: devcycle
integration_id: devcycle
integration_title: DevCycle
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: devcycle
public_title: DevCycle
short_description: 사용자가 코딩하는 방식으로 작동하는 기능 플래그
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 사용자가 코딩하는 방식으로 작동하는 기능 플래그
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 기타
    url: https://devcycle.com
  - resource_type: 설명서
    url: https://docs.devcycle.com/tools-and-integrations/datadog-rum
  support: README.md#Support
  title: DevCycle
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

DevCycle은 Datadog과 다음과 같은 통합을 제공합니다.

### 기능 플래그 추적 통합

DevCycle의 기능 플래그 추적 통합은 기능의 변수 평가를 통해 RUM 데이터를 강화하여 성능 모니터링 및 동작 변경에 대한 가시성을 제공합니다. 어떤 사용자에게 특정 사용자 경험이 표시되는지, 그리고 그것이 사용자의 성능에 부정적인 영향을 미치는지 확인합니다.

## 설정

### 기능 플래그 추적 설정

기능 플래그 추적은 RUM Browser SDK에서 사용할 수 있습니다. 자세한 설정 지침은 [RUM에서 기능 플래그 데이터 시작하기][1] 가이드를 참조하세요.

1. 브라우저 RUM SDK 버전 4.25.0 이상으로 업데이트하세요.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`으로 설정합니다.
3. DevCycle의 SDK를 초기화하고 `variableEvaluated` 이벤트를 구독하여 구독 콜백 내에서 `addFeatureFlagEvaluation`을 호출합니다.

```
// dvcClient 초기화

const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 

// 모든 변수를 평가하려면 

dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)

// 특정 변수를 평가하려면

dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

## 수집한 데이터

### 메트릭

DevCycle 통합은 메트릭을 포함하지 않습니다.

### 이벤트

DevCycle 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

DevCycle 통합은 서비스 점검을 포함하지 않습니다.

## 지원

도움이 필요하신가요? [Datadog 지원팀][2]에 문의하세요.

## 참고 자료

[DevCycle][3] 및 [DataDog RUM 통합][4]에 대해 자세히 알아보세요.

[1]: https://docs.datadoghq.com/ko/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: https://docs.datadoghq.com/ko/help/
[3]: https://devcycle.com
[4]: https://docs.devcycle.com/tools-and-integrations/datadog-rum