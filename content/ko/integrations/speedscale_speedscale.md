---
algolia:
  subcategory: Marketplace 통합
app_id: speedscale-speedscale
app_uuid: beb5efb1-63d5-4030-840d-7dbf6a92a4d6
assets: {}
author:
  homepage: https://speedscale.com
  name: Speedscale
  sales_email: datadog-sales@speedscale.com
  support_email: support@speedscale.com
  vendor_id: speedscale
categories:
- ㅊ
- 쿠버네티스(Kubernetes)
- marketplace
- 테스팅
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: speedscale_speedscale
integration_id: speedscale-speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: speedscale_speedscale
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: software-license
  short_description: Speedscale Pro(최대 100회 리플레이 및 10GB 트래픽) 월간 요금
  unit_price: 999
public_title: Speedscale
short_description: Kubernetes 부하 테스트용 트래픽 리플레이 플랫폼
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Testing
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Kubernetes 부하 테스트용 트래픽 리플레이 플랫폼
  media:
  - caption: Speedscale 트래픽 캡처
    image_url: images/spd-1-traffic-capture.png
    media_type: image
  - caption: Speedscale 리플레이 리포트
    image_url: images/spd-2-report.png
    media_type: image
  - caption: Datadog 대시보드와 Speedscale 통합
    image_url: images/spd-3-datadog-dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/stress-test-kubernetes-with-speedscale/
  - resource_type: 설명서
    url: https://docs.speedscale.com/
  support: README.md#Support
  title: Speedscale
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
많은 기업이 클라우드 서비스의 문제가 고객에게 영향을 미치기 전 이를 발견하는 데 어려움을 겪습니다. 개발자에게 있어서 테스트 작성은 시간이 많이 소요되는 수작업입니다. Speedscale은 Kubernetes 엔지니어링 및 DevOps 팀이 새로운 코드가 실제 시나리오에서 어떻게 작동할지 확신을 가질 수 있도록 도와드립니다. Speedscale은 API 트래픽을 수집 및 리플레이하고, 과부하 또는 혼잡을 시뮬레이션하며, 코드가 릴리스되기 전 레이턴시, 처리량, 포화도, 오류를 측정합니다. Speedscale Traffic Replay는 실행하는 데 며칠이나 몇 주가 소요되며, 최신 아키텍처에 적합하지 않은 레거시 테스트 접근 방식을 대체할 수 있습니다.

Speedscale 트래픽 리플레이 결과를 Datadog에 게시하려면 [Speedscale 통합][1]을 설치하세요. 본 통합으로 Datadog의 관측 가능성 데이터와 특정 Speedscale 리플레이 결과를 조합하여 성능 저하의 근본 원인을 조사할 수 있습니다.

## 지원

지원이나 기능 요청은 다음 채널을 통해 Speedscale 에 문의하세요.

- 이메일: [support@speedscale.com][5]
- Slack: [커뮤니티][4]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace의 Speedscale 제품으로 Kubernetes 애플리케이션 스트레스 테스트하기][6]
- [Speedscale 설명서][3]

[1]: https://app.datadoghq.com/integrations/speedscale
[3]: https://docs.speedscale.com/
[4]: https://slack.speedscale.com/
[5]: mailto:support@speedscale.com
[6]: https://www.datadoghq.com/blog/stress-test-kubernetes-with-speedscale/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/speedscale-speedscale" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.