---
algolia:
  subcategory: Marketplace 통합
app_id: cloudnatix-cloudnatix
app_uuid: 96ab2cb5-ce57-48ea-9a19-e065261c7430
assets: {}
author:
  homepage: https://cloudnatix.com/
  name: CloudNatix Inc.
  sales_email: sales@cloudnatix.com
  support_email: support@cloudnatix.com
  vendor_id: cloudnatix
categories:
- cloud
- 쿠버네티스(Kubernetes)
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudnatix_inc_cloudnatix
integration_id: cloudnatix-cloudnatix
integration_title: CloudNatix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: cloudnatix_inc_cloudnatix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.cloudnatix
  product_id: cloudnatix
  short_description: CloudNatix는 월별 CPU Core 기준으로 가격이 책정되며, 더 큰 규모의 약정에는 추가 인센티브가
    제공됩니다.
  tag: cpu_core
  unit_label: CPU Core
  unit_price: 37.96
public_title: CloudNatix
short_description: CloudNatix는 Kubernetes 비용, 용량 및 지출에 대한 인사이트를 제공합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - "\b카테고리::클라우드"
  - Category::Kubernetes
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: CloudNatix는 Kubernetes 비용, 용량 및 지출에 대한 인사이트를 제공합니다.
  media:
  - caption: CloudNatix 대시보드
    image_url: images/cloudnatix-app-dashboard.png
    media_type: image
  - caption: CloudNatix 워크로드
    image_url: images/cloudnatix-app-workload.png
    media_type: image
  - caption: CloudNatix 워크로드 오토파일럿
    image_url: images/cloudnatix-app-autopilot.png
    media_type: image
  - caption: CloudNatix 클러스터 오토파일럿
    image_url: images/cloudnatix-app-cluster.png
    media_type: image
  - caption: dashboard
    image_url: images/cloudnatix-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CloudNatix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

[CloudNatix][1]는 Kubernetes 클러스터의 VM, 노드 및 워크로드를 모니터링하고, CPU/메모리 요청 구성을 수정하거나 노드의 인스턴스 유형을 변경하여 클러스터의 총 비용을 줄이는 등 지출에 관한 운영을 최적화할 수 있는 인사이트를 제공합니다.

즉시 사용 가능한 통합 기능을 통해 모니터링된 지출과 CloudNatix 운영 최적화 인사이트를 대시보드에서 시각화할 수 있습니다.


## 지원

지원이나 기능 요청이 있으시면 다음 채널을 통해 CloudNatix에 문의하세요.

- 이메일: [CloudNatix Support][4] 
- Slack: [CloudNatix Community][3]

[1]: https://cloudnatix.com/
[2]: mailto:support@cloudnatix.com
[3]: https://join.slack.com/t/a7t/shared_invite/zt-1fooygi86-wefZeBK_pGcBr_4_WhntnQ
[4]: mailto:support@cloudnatix.com
[5]: https://app.datadoghq.com/integrations/cloudnatix

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/cloudnatix-cloudnatix" target="_blank">Marketplace에서 구매하세요</a>.