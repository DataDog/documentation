---
app_id: sosivio
app_uuid: d98f7912-e5a3-48bc-b63e-612d835bf6b4
assets:
  dashboards:
    sosivio_overview.json: ./assets/dashboards/sosivio_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sosivio.healthchecks
      metadata_path: metadata.csv
      prefix: sosivio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10285
    source_type_name: Sosivio
author:
  homepage: https://www.sosiv.io
  name: Sosivio
  sales_email: sales@sosiv.io
  support_email: support@sosiv.io
categories:
- 경고
- ㅊ
- 쿠버네티스(Kubernetes)
- 네트워크
- 알림
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sosivio/README.md
display_on_public_website: true
draft: false
git_integration_title: sosivio
integration_id: sosivio
integration_title: Sosivio
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sosivio
public_title: Sosivio
short_description: 데이터가 필요 없는 해답. 쿠버네티스를 통한 예측적 문제 해결
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Containers
  - Category::Kubernetes
  - Category::Network
  - Category::Notifications
  - Category::Orchestration
  - Supported OS::Linux
  - 제공::통합
  configuration: README.md#Setup
  description: 데이터가 필요 없는 해답. 쿠버네티스를 통한 예측적 문제 해결
  media:
  - caption: Datadog의 Sosivios 대시보드
    image_url: images/datadog-sosivio-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sosivio
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Sosivio는 쿠버네티스 환경과 애플리케이션을 위해 특별히 구축된 예측형 문제 해결 플랫폼입니다. Sosivio는 예측형 문제 해결 도구로 근본 원인을 분석하고 쿠버네티스 환경에서 발생하는 모든 장애에 즉각적인 조치를 제공합니다. 실시간 메트릭과 클러스터 상태 점검을 통해 쿠버네티스의 상태을 면밀히 확인하고, 경량의 AI를 활용해 치명적인 장애가 나타나기 전에 이를 예측하고 예방할 수 있습니다.

Sosivio의 Datadog 통합 기능은 사용자가 Datadog 대시보드에서 Sosivio Failure Alerts를 바로 확인할 수 있도록 해줍니다. 사용자는 즉각적으로 Sosivio UI로 리디렉션되어 해당 장애(Sosivio Premium 라이선스 필요)를 해결할 수 있습니다. 또한, 심각한 장애의 Sosivio의 근본원인 분석을 확인함으로써 Datadog의 신호의 추가적인 컨텍스트를 확보할 수 있습니다.

## 설정

Sosivio 계정이 없다면, 웹사이트에서 [계정을 생성][1]하여 바로 Sosivio Premium의 무료 4주 체험판에 가입하세요(신용카드 필요 없음). 4주 체험이 끝나면 라이선스는 Sosivio Community 버전으로 전환되며, 이 버전은 영구적으로 무료입니다. 계정을 설정하면 Datadog에서 Sosivio 통합을 사용할 수 있습니다.


Sosivio는 하나의 네임스페이스(“sosivio”로 라벨 지정됨)로 설치되며, 이로써 제품에 필요한 모든 구성 요소가 생성됩니다.


### 설치

1. Sosivio 대시보드 구성 페이지에서 [Datadog API 키][2]와 Datadog URL을 추가하세요(기본 datadoghq.com 사이트가 아닌 경우). 자세한 내용은 [Datadog 사이트][3]를 참고하세요.
2. **Install**을 클릭합니다.

자세한 정보는 [Sosivio 설명서][4]를 참조하세요.

## 지원

도움이 필요하세요? [Datadog 지원팀[5]에 문의하거나 [Sosivio][6]에 연락하세요.


[1]: https://www.sosiv.io/try-sosivio
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://docs.sosiv.io
[5]: https://docs.datadoghq.com/ko/help/
[6]: mailto:info@sosiv.io