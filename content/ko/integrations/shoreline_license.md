---
algolia:
  subcategory: Marketplace 통합
app_id: shoreline-software-license
app_uuid: d1da5605-5ef5-47bc-af8d-16005945e21e
assets: {}
author:
  homepage: https://shoreline.io/
  name: Shoreline.io
  sales_email: sales@shoreline.io
  support_email: support@shoreline.io
  vendor_id: shoreline
categories:
- 자동화
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: shoreline_license
integration_id: shoreline-software-license
integration_title: Shoreline.io
integration_version: ''
is_public: true
kind: 통합
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: shoreline_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: Datadog.marketplace.shoreline.shoreline
  product_id: software-license
  short_description: 매월 호스트당 청구됩니다. 포드나 컨테이너에 대한 추가 비용은 없습니다.
  tag: host
  unit_label: 호스트
  unit_price: 25
public_title: Shoreline.io
short_description: 트리거된 모니터를 복구하는 자동화 구축
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Automation
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: 트리거된 모니터를 복구하는 자동화 구축
  media:
  - caption: 교정 대시보드
    image_url: images/remediation_dashboard.png
    media_type: image
  - caption: 교정 자동화 설정 예시
    image_url: images/automate_remediation.png
    media_type: image
  - caption: 신속한 상호작용 디버깅 및 복구의 예시
    image_url: images/fleetwide_interactive_debugging_and_repair.png
    media_type: image
  - caption: 전체 리눅스(Linux) 명령 세부 정보의 예
    image_url: images/fleetwide_linux_command_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Shoreline.io
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Shoreline 인시던트 자동화를 통해 DevOps 및 사이트 안정성 엔지니어(SRE)는 대화형으로 **대규모로 디버깅**하고 신속하게 **수정 조치를 구현**하여 반복 작업을 제거할 수 있습니다.

디버그 및 복구 기능을 사용하면 서버에 개별적으로 SSH로 접속할 필요 없이 서버 팜 전체에서 실시간으로 명령을 실행할 수 있습니다. 리눅스 명령, 셸 스크립트, 클라우드 공급자 API 호출 등 리눅스 명령 프롬프트에 입력할 수 있는 모든 것을 실행하고 이러한 디버그 세션을 Datadog 모니터에 연결된 자동화로 전환할 수 있습니다.

Shoreline 앱은 모니터링하다 이 트리거되면 자동화를 자동으로 실행하여 평균 수리 시간(MTTR)과 수작업을 크게 줄여줍니다.

Shoreline은 대기 중인 구성원이 최고의 SRE만큼 탁월한 성능을 발휘할 수 있도록 도와줍니다. Shoreline은 대기 중인 팀에 디버깅 도구와 승인된 해결 조치를 제공하여 더 적은 수의 에스컬레이션으로 더 빠르게 사건을 해결하고 더 적은 실수로 한 번에 사건이 올바르게 해결되도록 보장합니다.

시작하려면 [Shoreline][1]에서 평가판 계정을 설정하세요.

## 지원

지원 및 기능 요청은 다음 채널을 통해 Shoreline에 문의하세요:

- 이메일: [support@shoreline.io][2]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- Shoreline과 Datadog][11][12][13]로 문제를 디버그하고 해결을 자동화하세요.
- [Shoreline 설명서][9]

[1]: https://shoreline.io/datadog?source=DatadogMarketplace
[2]: mailto:support@shoreline.io
[3]: https://docs.shoreline.io/installation
[4]: https://docs.shoreline.io/integrations/datadog#install-the-shoreline-integration
[5]: https://docs.shoreline.io/installation/kubernetes
[6]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[7]: https://docs.shoreline.io/installation/virtual-machines
[8]: https://docs.shoreline.io/integrations/datadog#install-the-shoreline-integration
[9]: https://docs.shoreline.io/
[10]: https://app.datadoghq.com/account/settings#integrations/shoreline-integration
[11]: https://www.datadoghq.com/blog/shoreline-io-marketplace-Datadog/
---
이 애플리케이션은 마켓플레이스를 통해 제공되며 Datadog 기술 파트너가 지원합니다. 이 애플리케이션을 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/shoreline-software-license" target="_blank">여기를 클릭하세요</a>.