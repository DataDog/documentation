---
algolia:
  subcategory: Marketplace 통합
app_id: komodor-komodor
app_uuid: d62310ba-c7a8-4c5b-ab9f-60bb46527f1b
assets: {}
author:
  homepage: https://komodor.com
  name: Komodor
  sales_email: datadogsales@komodor.com
  support_email: support@komodor.com
  vendor_id: komodor
categories:
- 설정 및 배포
- ㅊ
- 문제 추적
- 쿠버네티스(Kubernetes)
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: komodor_license
integration_id: komodor-komodor
integration_title: Komodor
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: komodor_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.komodor.komodor
  product_id: komodor
  short_description: 노드 볼륨에 따른 요금 체계
  tag: 노드
  unit_label: 노드 모니터링
  unit_price: 30.0
public_title: Komodor
short_description: Kubernetes 트러블슈팅 플랫폼
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Containers
  - 카테고리::이슈 추적
  - Category::Kubernetes
  - Category::Marketplace
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Kubernetes 트러블슈팅 플랫폼
  media:
  - caption: Komodor의 주요 서비스 보기 및 전체 워크로드 가시성
    image_url: images/Komodor_screen_01.png
    media_type: image
  - caption: 여러 서비스 간 상관관계를 파악하고 단일 타임라인에서 이벤트 순서 표시
    image_url: images/Komodor_screen_02.png
    media_type: image
  - caption: Komodor를 사용해 Kubernetes 매니페스트 변경 사항과 구성 변경 사항을 쉽게 비교
    image_url: images/Komodor_screen_03.png
    media_type: image
  - caption: 단일 kubecl 명령으로 포드와 로그 상태를 깊이 있게 파악
    image_url: images/Komodor_screen_04.png
    media_type: image
  - caption: Datadog 알림, Kubernetes 이벤트, 가용성 문제를 간편한 보기 하나로 연결
    image_url: images/Komodor_screen_06.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Komodor
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Komodor를 사용해 K8 스택 전체의 변경 사항을 추적하고, 파급 효과를 분석하며, 효과적이고 독립적으로 트러블슈팅하기 위해 필요한 컨텍스트를 얻을 수 있습니다. Komodor에서는 변경 사항, 푸시된 코드, 푸시한 사람 등 Kubernetes 배포와 관련한 정보와 함께 타임라인 인사이트를 제공합니다. 또한 Git, 구성 맵, 인프라스트럭처, 알림, Datadog를 포함한 기타 도구의 데이터를 중앙화되고 이해하기 쉬운 디스플레이로 확인할 수 있습니다.

Datadog Marketplace에서 이 서비스를 찾아 Komodor 플랫폼으로 액세스할 수 있습니다. 이미 Komodor를 이용 중인 고객은 [통합을 설정][1]하여 인스턴스를 Datadog로 연결해야 합니다.

## 지원
Komodor에서는 고객이 성공하는 데 필요한 도구를 제공하기 위해 최선을 다합니다. 이에 따라 고객이 필요할 때 도와드릴 수 있는 다양한 채널을 만들었습니다. Komodor 애플리케이션 내에서 저희에게 메시지를 보내시거나(우측 하단에 있는 커뮤니케이션 버튼), [support@komodor.com](mailto:support@komodor.com)로 이메일을 보내 티켓을 개설하실 수 있습니다.


[1]: https://app.datadoghq.com/integrations/komodor
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며, Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/komodor-komodor" target="_blank">Marketplace에서 구매하세요.</a>