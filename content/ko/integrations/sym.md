---
app_id: sym
app_uuid: d81d1dd3-d5e8-4373-98a6-f95b797b3f9d
assets:
  dashboards:
    Sym Overview: assets/dashboards/sym_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sym.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10396
    source_type_name: sym
  logs:
    source: sym
  oauth: assets/oauth_clients.json
author:
  homepage: https://symops.com/
  name: Sym
  sales_email: sales@symops.com
  support_email: support@symops.com
categories:
- 보안
- 개발 툴
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sym/README.md
display_on_public_website: true
draft: false
git_integration_title: sym
integration_id: sym
integration_title: Sym
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sym
public_title: Sym
short_description: Datadog에 Sym 감사 로그 보내기
supported_os:
- windows
- macos
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Supported OS::Linux
  - 카테고리::보안
  - Category::Developer Tools
  - Offering::Integration
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: Datadog에 Sym 감사 로그 보내기
  media:
  - caption: Sym 개요 동영상
    image_url: images/sym_video_thumbnail.jpg
    media_type: 비디오
    vimeo_id: 846654213
  - caption: Sym은 기본 플랫폼 엔지니어링 도구를 사용하여 액세스 및 승인 워크플로를 구축하는 데 도움을 줍니다.
    image_url: images/home_hero_image.png
    media_type: image
  - caption: Terraform에서 액세스 규칙 정의 및 배포하기
    image_url: images/define_deploy.jpg
    media_type: image
  - caption: Slack에서 요청, 승인, 거부하기
    image_url: images/request_approve.jpg
    media_type: image
  - caption: Sym Overview Dashboard 예시
    image_url: images/sym_overview_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sym
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Sym][1]을 통해 적시 액세스 정책을 Slack에서 실행되는 운영하기 쉬운 워크플로로 전환하는 간단한 자동화를 정의할 수 있습니다. Terraform에서 액세스 흐름을 정의하고, 코드로 다른 시스템을 맞춤화 및 통합하고, API 또는 Slack 앱을 사용하여 액세스를 요청 및 승인/거부하세요.

이 통합을 통해 고객은 Sym Log Destination을 사용하여 Sym 감사 로그를 Datadog에 직접 보낼 수 있습니다.

이러한 로그는 `request` 또는 `approve`와 같은 Sym 플랫폼에서 처리되는 모든 이벤트에 대해 실시간으로 전송됩니다.

## 설정

### 설치

Sym 통합을 설정하려면:
1. Sym Datadog 통합 타일에서 "Connect Accounts"를 클릭합니다.
2. Datadog은 OAuth 인증 플로를 시작하기 위해 Sym으로 리디렉션합니다. 계속해서 Sym에 로그인하려면 여기에 Sym Org ID를 입력하세요.
3. 성공적으로 승인되면 `sym_log_destination` Terraform 리소스가 표시됩니다. 이것을 복사하여 Sym Terraform Configuration에 붙여넣으세요.

### 구성

Terraform에서 Datadog Log Destination을 구성하는 방법에 대한 자세한 내용은 [Sym 설명서][2]를 참조하세요.

### 검증

Datadog 로그 대상을 Terraform한 후 다음 `symflow` CLI 명령을 사용하여 해당 존재를 확인할 수 있습니다.
```
 symflow resources list sym_log_destination
```

## 삭제

- 통합 타일에서 Uninstall 버튼을 클릭하여 통합을 제거합니다.
- Once this integration has been uninstalled, any previous authorizations are revoked.
- 또한 API 키 페이지에서 통합 이름을 검색하여 이 통합과 연결된 모든 API 키가 비활성화되었는지 확인하세요.

## 트러블슈팅

도움이 필요하신가요? [support@symops.com][3]에 문의하세요.

[1]: https://symops.com/
[2]: https://docs.symops.com/docs/datadog
[3]: mailto:support@symops.com