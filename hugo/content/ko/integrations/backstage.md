---
app_id: backstage
app_uuid: 2b89148d-0938-46fc-a9dc-fd8a45e583a9
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: backstage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10281
    source_type_name: backstage
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Roadie
  sales_email: oss@roadie.io
  support_email: oss@roadie.io
categories:
- 개발 툴
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/backstage/README.md
display_on_public_website: true
draft: false
git_integration_title: backstage
integration_id: backstage
integration_title: Backstage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: backstage
public_title: Backstage
short_description: Datadog 대시보드 및 그래프를 백스테이지 인스턴스에 임베드하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog 대시보드 및 그래프를 백스테이지 인스턴스에 임베드하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Backstage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Backstage][1]는 개발자 포털을 구축하기 위한 오픈 플랫폼입니다. 이 통합을 통해 Backstage 인스턴스에 Datadog 그래프와 대시보드를 임베드할 수 있습니다.

## 설정

### 설치

1. Datadog 플러그인을 Backstage에 설치합니다.

```shell
cd packages/app
yarn add @roadiehq/backstage-plugin-datadog
```

2. Backstage 개요 탭에 Datadog 플러그인 위젯을 추가합니다. 자세한 내용은 [상세 지침][2]을 참조하세요.
3. Datadog 대시보드에 [공개 URL][3]을 찾거나 만듭니다. 
4. 플러그인의 메타데이터에 대시보드 URL을 추가합니다.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-service
  description: |
    A sample service
  annotations:
    datadoghq.com/dashboard-url: <DATADOGURL>
```

### 확인

Backstage 인스턴스 개요 탭을 열어 Datadog 대시보드 또는 그래프가 예상대로 렌더링되었는지 확인합니다.

## 수집한 데이터

### 메트릭

Backstage 통합에는 어떤 지표도 포함되지 않습니다.

### 서비스 점검

Backstage 통합에는 서비스 점검이 포함되지 않습니다.

### 이벤트

Backstage 통합에는 이벤트가 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Backstage 커뮤니티][4]에 문의하세요.

[1]: https://backstage.io
[2]: https://roadie.io/backstage/plugins/datadog/
[3]: https://docs.datadoghq.com/ko/dashboards/sharing/#share-a-dashboard-by-public-url
[4]: https://backstage.io/community