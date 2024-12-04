---
app_id: steadybit
app_uuid: b1194c36-afd0-47dc-9c0a-11f3ab82f387
assets:
  dashboards:
    Steadybit Chaos Engineering Activity: assets/dashboards/steadybit.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: steadybit.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10321
    source_type_name: Steadybit
author:
  homepage: https://steadybit.com/
  name: Steadybit
  sales_email: sales@steadybit.com
  support_email: support@steadybit.com
categories:
- 인시던트
- 테스팅
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/steadybit/README.md
display_on_public_website: true
draft: false
git_integration_title: steadybit
integration_id: steadybit
integration_title: Steadybit
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: steadybit
public_title: Steadybit
short_description: 카오스 엔지니어링을 통해 시스템 안정성을 향상시키세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 카오스 엔지니어링을 통해 시스템 안정성을 즉시 향상시키세요.
  media:
  - caption: Datadog API와 Steadybit의 통합이 실제로 작동하는 모습을 보여주는 동영상
    image_url: images/steadybit_experiment_editor.png
    media_type: 비디오
    vimeo_id: 782622274
  - caption: 일단 실행되면 Datadog 모니터 상태는 실험 동작을 제어하는 ​​데 사용됩니다.
    image_url: images/steadybit_experiment_execution_run_log.png
    media_type: image
  - caption: 관련 Datadog 모니터의 상태는 Steadybit 내에서 시간이 지남에 따라 표시됩니다.
    image_url: images/steadybit_experiment_execution_monitor_status_over_time.png
    media_type: image
  - caption: Steadybit은 조직 전체가 알 수 있도록 이벤트를 Datadog에 다시 보고합니다.
    image_url: images/steadybit_events_in_datadog.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Steadybit
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Steadybit][1]은 카오스 엔지니어링 플랫폼으로, 난기류를 제어된 방식으로 시뮬레이션하여 시스템 안정성을 개선하고 조직이 더 나은 인시던트 관리를 할 수 있도록 안내합니다.

Steadybit 통합은 카오스 엔지니어링 실험 내에서 Datadog 모니터의 상태를 사용합니다. 이 통합은 Datadog 이벤트를 통해 실험 환경, 시작 및 종료 시간, 실험 결과 등 카오스 엔지니어링 활동에 대한 인사이트를 제공합니다.

## 설정

Datadog과 Steadybit 간의 통합은 [Steadybit Datadog 확장][2]을 통해 수행됩니다. 확장 프로그램은 Datadog의 API와 상호 작용하여 모니터에 대한 정보를 수집하고 이벤트를 Datadog에 보고합니다.

### 사전 필수 요건

[무료 또는 유료 Steadybit 라이선스][3]가 필요합니다. 통합은 Steadybit의 SAAS 및 온프레미스 제품을 지원합니다.

### 설치

여러 가지 [설치 방법이 지원됩니다][4]. 최상의 경험을 위해서는 아래와 같이 전용 Helm 차트를 통해 Steadybit Datadog 확장을 설치하세요. `datadog.siteParameter` 및 `datadog.siteUrl`에 지원되는 값에 대해 자세히 알아보려면 [Datadog 사이트][5] 페이지를 참조하세요.

```
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update

helm upgrade steadybit-extension-datadog \
  --install \
  --wait \
  --timeout 5m0s \
  --create-namespace \
  --namespace steadybit-extension \
  --set datadog.apiKey="{{API_KEY}}" \
  --set datadog.applicationKey="{{APPLICATION_KEY}}" \
  --set datadog.siteParameter="{{SITE_PARAMETER}}" \
  --set datadog.siteUrl="{{SITE_URL}}" \
  steadybit/steadybit-extension-datadog
```

### 검증

Steadybit Datadog 확장이 실행되면 Steadybit의 *Landscape* 탭에서 Datadog 모니터 목록을 확인하세요.

## 수집한 데이터

### 메트릭

Steadybit은 메트릭을 포함하지 않습니다.

### 서비스 점검

Steadybit은 서비스 점검을 포함하지 않습니다.

### 이벤트

Steadybit은 카오스 엔지니어링 활동을 나타내는 이벤트를 Datadog에 보고합니다. 이러한 모든 이벤트에는 `source:steadybit` 태그가 있습니다.

## 트러블슈팅

도움이 필요하신가요? [Steadybit 지원팀][6]에 문의하세요.

[1]: https://steadybit.com/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[2]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[3]: https://signup.steadybit.io/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[4]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme#content-installation
[5]: https://docs.datadoghq.com/ko/getting_started/site/#access-the-datadog-site
[6]: mailto:support@steadybit.com