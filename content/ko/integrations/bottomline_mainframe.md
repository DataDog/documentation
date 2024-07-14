---
algolia:
  subcategory: Marketplace 통합
app_id: bottomline-mainframe
app_uuid: 249f45de-03cc-45f3-8a57-c40ce33e62a3
assets: {}
author:
  homepage: https://www.bottomline.com/
  name: Bottomline Technologies
  sales_email: partner.cfrm@bottomline.com
  support_email: partner.cfrm@bottomline.com
  vendor_id: bottomline
categories:
- 메인프레임
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bottomline_mainframe
integration_id: bottomline-mainframe
integration_title: Bottomline 기록 및 재생
integration_version: ''
is_public: true
kind: 통합
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: bottomline_mainframe
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: Datadog.marketplace.bottomline.mainframe.activity.usr.id.count
  product_id: mainframe
  short_description: 모니터링되는 사용자당 단가
  tag: 메인프레임_사용자
  unit_label: 메인프레임 등록 사용자
  unit_price: 4.68
public_title: 결론 기록 및 재생
short_description: 3270/5250 메인프레임 사용자 및 네트워크 트래픽을 사용하는 리소스 모니터링
supported_os:
- 리눅스
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::메인프레임
  - Category::Marketplace
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: 3270/5250 메인프레임 사용자 및 네트워크 트래픽을 사용하는 리소스 모니터링
  media:
  - caption: Bottomline의 기록 및 재생 개요
    image_url: images/video.png
    media_type: 비디오
    vimeo_id: 779688046
  - caption: 메인프레임 레코드\u0008 기록 및 사용자 세션 재생
    image_url: images/mainframe_replay.png
    media_type: image
  - caption: 세부 정보 기록 및 재생
    image_url: images/bt_replay.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Bottomline 기록 및 재생
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Bottomline의 메인프레임 레코드 및 재생은 네트워크 트래픽을 통해 3270/5250 사용자 모니터링을 지원하는 비침습적 솔루션입니다. Bottomline은 업계 최고의 사기 및 금융 범죄 솔루션을 통해 최상의 방법으로 사용자와 시스템을 모니터링할 수 있도록 지원합니다.

Datadog 마켓플레이스에서 Bottomline 라이선스를 구매한 후, 바로 사용할 수 있는 [통합][3]을 통해 다음 정보를 모니터링할 수 있습니다:

### 모니터링 기능

- 메인프레임 사용자: 사용자가 세션에서 수행한 작업에 대한 사용자 세션 및 로그 정보를 기록 및 재생합니다.
- 메인프레임: 사용자 응답 시간, 리소스 응답 시간.

## 지원
지원 또는 기능 요청은 [지원팀에 문의](mailto:partner.cfrm@bottomline.com)하세요.

[1]: https://www.bottomline.com/
[2]: https://www.bottomline.com/us
[3]: https://app.datadoghq.com/integrations/bottomline-recordandreplay


---
이 애플리케이션은 마켓플레이스를 통해 제공되며 Datadog 기술 파트너가 지원합니다. 이 애플리케이션을 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/bottomline-mainframe" target="_blank">여기를 클릭하세요</a>.