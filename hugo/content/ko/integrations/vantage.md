---
app_id: vantage
app_uuid: 2784a986-2673-4189-a3b8-320755f6c2b4
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.vantage.sh
  name: Vantage
  sales_email: sales@vantage.sh
  support_email: support@vantage.sh
categories:
- 비용 관리
- 클라우드
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vantage/README.md
display_on_public_website: true
draft: false
git_integration_title: vantage
integration_id: vantage
integration_title: Vantage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vantage
public_title: Vantage
short_description: Datadog 비용을 가져와 다른 인프라스트럭처 지출과 함께 추적하세요
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  - Category::Cost Management
  - Category::Cloud
  configuration: README.md#Setup
  description: Datadog 비용을 가져와 다른 인프라스트럭처 지출과 함께 추적하세요
  media:
  - caption: 예산에 따른 Datadog 월 비용
    image_url: images/vantage-datadog-budget-forecast.png
    media_type: image
  - caption: Datadog 비용 - 서비스별
    image_url: images/vantage-datadog-grouped-report.png
    media_type: image
  - caption: 제공 업체 비교 개요
    image_url: images/vantage-datadog-provider-summary.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Vantage
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Vantage는 클라우드 비용 투명성 및 최적화 플랫폼입니다. 이 통합을 통해 Datadog 비용을 Vantage로 가져와 AWS, Snowflake, Kubernetes 등 다른 인프라스트럭처 지출과 함께 추적할 수 있습니다.

## 설정

### 설치

[Vantage][1]를 방문하여 무료로 가입하세요. 등록 후 [Vantage 통합 페이지][2]를 방문해 Datadog 통합을 추가하세요. 이 페이지에서는 Vantage에 청구 및 사용 데이터에 대한 액세스 권한을 부여하는 Datadog OAUTH2 흐름을 안내합니다.

### 구성

통합이 완료되면 Vantage에서 Datadog 비용을 확인해 보세요. 지원되는 다른 Vantage 제공업체의 비용 외에도 특정 Datadog 조직 및 서비스 필터를 만들 수 있습니다.

## 삭제

Vantage에서 Datadog 통합을 제거하려면 [Vantage 통합 페이지][2]로 이동하여 **Remove**를 클릭합니다. Datadog에서 이 통합을 제거하려면 아래 **Uninstall Integration** 버튼을 클릭합니다. 이 통합을 제거하면 이전 권한이 모두 취소됩니다.

또한 [API Keys 관리 페이지][3]에서 통합 이름을 검색하여 이 통합과 관련된 모든 API 키가 비활성화되었는지 확인하세요.

## 지원

도움이 필요하신가요? [Vantage 지원팀][4]에 문의하세요.


[1]: https://console.vantage.sh
[2]: https://console.vantage.sh/settings/integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Vantage
[4]: mailto:support@vantage.sh