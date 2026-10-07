---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-swiftmq
app_uuid: 93738439-2cde-4718-a7f6-004f2da0177e
assets:
  dashboards:
    RapDev SwiftMQ Summary: assets/dashboards/summary.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.swiftmq.env
      metadata_path: metadata.csv
      prefix: rapdev.swiftmq
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10378
    source_type_name: RapDev SwiftMQ
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 메시지 큐
- marketplace
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_swiftmq
integration_id: rapdev-swiftmq
integration_title: SwiftMQ
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_swiftmq
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.swiftmq
  product_id: swiftmq
  short_description: 인스턴스당 유닛 비용.
  tag: swiftmq_endpoint
  unit_label: SwiftMQ 인스턴스
  unit_price: 10
public_title: SwiftMQ
short_description: SwiftMQ 인스턴스의 상태와 활동을 모니터링하세요
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
  - 카테고리::메세지 큐
  - Category::Marketplace
  - 카테고리::메트릭
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: SwiftMQ 인스턴스의 상태와 활성화를 모니터링하세요
  media:
  - caption: SwiftMQ 요약 대시보드(1/3)
    image_url: images/swiftmq_dash_one.png
    media_type: image
  - caption: SwiftMQ 요약 대시보드(2/3)
    image_url: images/swiftmq_dash_two.png
    media_type: image
  - caption: SwiftMQ 요약 대시보드(3/3)
    image_url: images/swiftmq_dash_three.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SwiftMQ
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## 개요

[SwiftMQ][1]는 엔터프라이즈 메시징, 실시간 스트리밍 분석, 마이크로서비스 플랫폼입니다. JMS 및 AMQP 1.0 표준 프로토콜을 통해 비즈니스 애플리케이션을 지원하며, IoT 클라이언트용 MQTT 3.1 또는 3.1.1도 지원합니다. 확장성이 뛰어난 아키텍처에 최적화되어 있으며, 내장 동적 라우팅을 통해 소스에서 목적지까지 투명하게 전송할 수 있습니다. 


본 통합은 [Flow Director][5]의 [SwiftMQ Prometheus Monitoring App][6]을 사용하여 [SwiftMQ][1]의 상태 및 운영에 관한 메트릭을 보고합니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.
- 고객지원: [support@rapdev.io][4]
- 영업: [sales@rapdev.io][3]
- 채팅: [rapdev.io][2]
- 전화: 855-857-0222

---

Made with ❤️ in Boston
*다른 통합이 필요하거나 조직에 필요한 핵심 기능이 있을 경우 RapDev에 [메시지][4]를 보내주시면 반영하겠습니다!!*


[1]: https://www.swiftmq.com/
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: mailto:support@rapdev.io
[5]: https://www.flowdirector.io/start/
[6]: https://www.flowdirector.io/apps/prometheus/swiftmqprometheus/
[7]: https://help.flowdirector.io/spma/install-the-app
[8]: https://help.flowdirector.io/spma/quick-setup
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-swiftmq" target="_blank">Marketplace에서 구매하세요</a>.