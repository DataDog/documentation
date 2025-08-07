---
app_id: twenty-forty-eight
app_uuid: 2f131079-67b3-444a-8f82-5a7fc7178795
assets: {}
author:
  homepage: https://datadoghq.com
  name: Datadog
  sales_email: sales@datadog.com
  support_email: help@datadoghq.com
categories: []
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/twenty_forty_eight/README.md
display_on_public_website: true
draft: false
git_integration_title: twenty_forty_eight
integration_id: twenty-forty-eight
integration_title: Twenty Forty Eight
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: twenty_forty_eight
public_title: Twenty Forty Eight
short_description: Datadog 대시보드에 추가할 수 있는 재미있는 퍼즐 게임
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
  - Offering::UI Extension
  configuration: README.md#Setup
  description: Datadog 대시보드에 추가할 수 있는 재미있는 퍼즐 게임
  media:
  - caption: Twenty Forty Eight
    image_url: images/twenty-forty-eight.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Twenty Forty Eight
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Twenty Forty Eight은 Datadog 대시보드에 추가할 수 있는 재미있는 게임입니다. 이 확장 기능은 [Datadog 앱][1]을 통해 이용할 수 있으며, 타사 콘텐츠(기본 미제공)로 사용자 인터페이스를 확장합니다. 비즈니스 또는 재미를 위해 Datadog을 더 다양하게 사용하고 싶다면 [직접 앱이나 게임을 만들어 보세요][1].

### 게임 방법

위젯을 클릭하여 앱을 켠 다음, **화살표 키**를 사용하여 타일을 움직입니다. 같은 번호의 타일은 서로 닿으면 **하나로 합쳐집니다**. 2048 이상이 되도록 타일을 계속 더하세요!

## 설정

1. Datadog 계정에서 대시보드로 이동해 게임을 추가할 대시보드를 선택하거나 [새 대시보드를 만드세요][2].

2. 대시보드에서 대시보드 제목 오른쪽에 있는 **+Add Widgets**를 클릭합니다. 위젯을 오른쪽으로 스크롤하여 **Twenty Forty Eight** 위젯을 대시보드의 원하는 위치로 드래그 앤 드롭하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/developers/datadog_apps
[2]: https://docs.datadoghq.com/ko/dashboards/#new-dashboard
[3]: https://www.datadoghq.com/support/