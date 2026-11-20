---
app_id: launchdarkly
app_uuid: 7144d0c5-42f2-4cc5-b562-5f77debc0c52
assets:
  dashboards:
    launchdarkly: assets/dashboards/launchdarkly.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: launchdarkly_relay.connections_env_platformCategory_userAgent
      metadata_path: metadata.csv
      prefix: launchdarkly_relay.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10025
    source_type_name: 런치다클리
author:
  homepage: https://launchdarkly.com
  name: 런치다클리
  sales_email: sales@launchdarkly.com
  support_email: support@launchdarkly.com
categories:
- 설정 및 배포
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/launchdarkly/README.md
display_on_public_website: true
draft: false
git_integration_title: launchdarkly
integration_id: launchdarkly
integration_title: 런치다클리
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: launchdarkly
public_title: 런치다클리
short_description: 안심하고 기능 릴리스 및 인프라스트럭처 변경 사항을 제어하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Notifications
  - Offering::UI Extension
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 안심하고 기능 릴리스 및 인프라스트럭처 변경 사항을 제어하세요.
  media:
  - caption: LaunchDarkly에 대한 간략한 개요입니다.
    image_url: images/video-thumbnail.png
    media_type: 비디오
    vimeo_id: 637675972
  - caption: LaunchDarkly 플래그 위젯 및 이벤트 통합으로 설정된 LaunchDarkly 대시보드입니다.
    image_url: images/dashboard.png
    media_type: image
  - caption: 플래그 변경 사이드 패널이 열려 있는 LaunchDarkly 대시보드입니다.
    image_url: images/toggle-flag.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 기타
    url: https://launchdarkly.com
  - resource_type: 설명서
    url: https://docs.launchdarkly.com/integrations/datadog/events
  support: README.md#Support
  title: 런치다클리
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요


{{% site-region region="gov" %}}
*LaunchDarkly 통합은 Datadog {{< region-param key="dd_site_name" >}} 사이트에 대해 지원되지 않습니다.**
{{% /site-region %}}


LaunchDarkly는 Datadog와의 다음 통합을 제공합니다.

### 이벤트 통합

Datadog용 [LaunchDarkly][1] 이벤트 통합을 사용해 플래그 이벤트 마커를 모니터링 대시보드로 가져와 LaunchDarkly 기능 배포가 고객의 서비스 또는 시스템에 어떤 영향을 주는지 확인할 수 있습니다. 예를 들어 배포된 기능으로 인해 서비스 속도가 느려지는 경우 Datadog에서 원인을 확인할 수 있습니다.

### 기능 플래그 추적 통합

LaunchDarkly의 기능 플래그 추적(통합)은 기능 플래그로 RUM 데이터를 보강하여 성능(모니터링) 및 행동 변화에 대한 가시성을 제공합니다. 어떤 사용자에게 사용자 경험이 표시되는지, 그리고 그 경험이 사용자의 성능에 부정적인 영향을 미치는지 파악할 수 있습니다.

### 대시보드 위젯

LaunchDarkly의 대시보드 위젯을 사용하면 하위 집합 기능 플래그 타겟팅 토글을 Datadog 대시보드에 고정하여 단일 창에서 기능 출시를 모니터링하고 수행할 수 있습니다.

### 릴레이 프록시 메트릭 통합

[LaunchDarkly 릴레이 프록시][2]를 사용하는 하는 경우 이를 설정하여 활성 및 누적 연결과 같은 메트릭을 Datadog 으로 내보낼 수 있습니다.

## 설정

### 이벤트 통합

LaunchDarkly 이벤트 통합은 [Datadog API 키][3]를 사용하며, 이는 Datadog 관리자가 생성할 수 있습니다. Datadog API 키를 얻은 후에는 [Datadog 통합][4]에 대한 LaunchDarkly 설명서를 참조하여 Datadog에 대한 이벤트 통합을 설정하는 방법을 알아보세요.

### 기능 플래그 추적 설정

기능 플래그 추적은 RUM 브라우저 SDK에서 사용할 수 있습니다. 자세한 설정 지침은 [RUM에서 기능 플래그 데이터 시작하기][5] 가이드를 참조하세요.

1. 브라우저 RUM SDK 버전 4.25.0 이상으로 업데이트하세요.
2. RUM SDK를 초기화하고 `enableExperimentalFeatures` 초기화 파라미터를 `["feature_flags"]`으로 설정합니다.
3. LaunchDarkly의 SDK를 초기화하고 아래 코드 스니펫을 사용하여 Datadog에 기능 플래그 평가를 보고하는 인스펙터를 생성합니다.

```
const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
  inspectors: [
    {
      type: "flag-used",
      name: "dd-inspector",
      method: (key: string, detail: LDClient.LDEvaluationDetail) => {
        datadogRum.addFeatureFlagEvaluation(key, detail.value);
      },
    },
  ],
});
```

### 대시보드 위젯

1. [LaunchDarkly 통합 타일][6]에서 LaunchDarkly 통합이 설치되어 있는지 확인합니다.
1. Datadog에서 기존 대시보드로 이동하거나 새 계정을 생성합니다.
1. **위젯 추가** 버튼을 눌러 위젯 서랍을 표시합니다.
1. **LaunchDarkly**를 검색하는 경우 위젯 서랍의 **앱** 섹션에서 LaunchDarkly 위젯을 찾습니다.
1. LaunchDarkly 위젯 아이콘을 클릭하거나 드래그하여 대시보드에 추가하고 **LaunchDarkly 편집기** 모달을 엽니다.
1. **연결** 버튼을 눌러 LaunchDarkly 계정을 연결합니다. 새 창이 열리고 Datadog를 인증할지 여부를 묻는 메시지가 표시됩니다.
1. **인증**을 클릭하면 Datadog로 다시 이동합니다.
1. 다음으로, **LaunchDarkly 에디터**에서 다음 위젯 옵션을 설정합니다.

   - **LaunchDarkly 프로젝트**: 대시보드 위젯에 연결하려는 LaunchDarkly 프로젝트의 이름입니다.
   - **LaunchDarkly 환경**: 대시보드 위젯에 연결하려는 LaunchDarkly 환경의 이름입니다.
   - **환경 템플릿 변수**: 부수적인 [Datadog 템플릿 변수][7]는 **LaunchDarkly 환경** 옵션을 재정의하는 데 사용됩니다.
   - **LaunchDarkly 태그 필터**: 위젯 에 표시되는 기능 플래그를 필터링하는 데 사용되는 부수적인 `+`로 구분된 목록 태그입니다.  여러 태그가 포함된 경우 **모두** 포함된 태그와 일치하는 플래그만 위젯에 표시되며, 생략된 경우 프로젝트의 모든 기능 플래그가 위젯에 표시됩니다.
   - **정렬**: 위젯에 플래그가 표시되는 순서입니다. 기본값은 **최신순**입니다.

1. (선택 사항) 위젯에 타이틀을 지정합니다.
1. **저장**을 눌러 Datadog 대시보드 위젯 설정을 완료합니다.

### Relay Proxy 메트릭

Relay Proxy의 [메트릭 통합 설명서][8]를 참조하여 이 기능을 설정하세요.

## 수집한 데이터

### 메트릭

LaunchDarkly Relay Proxy를 설정하여 다음 메트릭을 Datadog에 전송할 수 있습니다.

- **`connections`**: SDK에서 Relay Proxy로의 현재 스트림 연결 개수를 알려줍니다.
- **`newconnections`**: 시작 이후 Relay Proxy로의 누적 스트림 연결 개수를 의미합니다.
- **`requests`**: Relay Proxy의 모든 [서비스 엔드포인트][9](상태 엔드포인트 제외)가 시작된 이후 받은 누적 요청 수입니다.

### 이벤트

LaunchDarkly 이벤트 통합은 플래그, 프로젝트, 환경 이벤트를 LaunchDarkly에서 Datadog로 전송합니다.

### 서비스 점검

LaunchDarkly 통합은 서비스 점검을 포함하지 않습니다.

## 지원

도움이 필요하세요? [Datadog 지원팀][10]에 문의하세요.

## 참고 자료

[LaunchDarkly][1] 및 [Datadog 이벤트 통합][4]에 대해 자세히 알아보세요.

[1]: https://launchdarkly.com
[2]: https://docs.launchdarkly.com/home/relay-proxy
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.launchdarkly.com/integrations/datadog/events
[5]: https://docs.datadoghq.com/ko/real_user_monitoring/guide/setup-feature-flag-data-collection/
[6]: https://app.datadoghq.com/integrations/launchdarkly
[7]: https://docs.datadoghq.com/ko/dashboards/template_variables/
[8]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/metrics.md
[9]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/endpoints.md
[10]: https://docs.datadoghq.com/ko/help/