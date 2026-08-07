---
algolia:
  subcategory: Marketplace 통합
app_id: hardware-sentry
app_uuid: daade024-2095-4a73-afe5-35afbe9e2b12
assets:
  dashboards:
    Hardware Sentry - Host: assets/dashboards/host.json
    Hardware Sentry - Main: assets/dashboards/main.json
    Hardware Sentry - Site: assets/dashboards/site.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: hardware_sentry.agent.info
      metadata_path: metadata.csv
      prefix: hardware_sentry.
    service_checks:
      metadata_path: service_checks.json
    source_type_id: 10286
    source_type_name: Hardware Sentry
  logs: {}
  monitors:
    Agent stopped sending metrics: assets/monitors/agent-nodata.json
    Battery charge is low: assets/monitors/low-battery.json
    Connector failed: assets/monitors/connector-failed.json
    Critically high temperature: assets/monitors/critical-temperature.json
    Device errors: assets/monitors/errors.json
    Device is missing: assets/monitors/missing-device.json
    Fan speed is critically low: assets/monitors/critical-fan-speed.json
    Hardware failure is predicted: assets/monitors/predicted-failure.json
    Hardware is degraded: assets/monitors/status-degraded.json
    Hardware is no longer operational: assets/monitors/status-failed.json
    LUN multi-pathing is unavailable: assets/monitors/lun-multipathing.json
    Low fan speed: assets/monitors/low-fan-speed.json
    Low fan speed (%): assets/monitors/low-fan-speed-percent.json
    Network errors is high: assets/monitors/errors-network.json
    Network link is down: assets/monitors/network-link-down.json
    Physical intrusion: assets/monitors/intrusion.json
    Power supply is near its capacity: assets/monitors/power-capacity.json
    Tape drive needs cleaning: assets/monitors/tape-drive-cleaning.json
    Temperature is high: assets/monitors/high-temperature.json
    Voltage is high: assets/monitors/high-voltage.json
    Voltage is low: assets/monitors/low-voltage.json
author:
  homepage: https://sentrysoftware.com
  name: Sentry Software
  sales_email: datadog@sentrysoftware.com
  support_email: support@sentrysoftware.com
  vendor_id: sentry-software
categories:
- 비용 관리
- marketplace
- 네트워크
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry_software_hardware_sentry
integration_id: hardware-sentry
integration_title: Hardware Sentry
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: sentry_software_hardware_sentry
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: hardware_sentry.host.configured
  product_id: hardware-sentry
  short_description: 월 구독료는 Hardware Sentry OpenTelemetry Collector로 모니터링하는 호스트 수에
    따라 결정됩니다. 구독 시 Sentry Desk에서 제공하는 지원 서비스를 이용하실 수 있습니다.
  tag: host
  unit_label: 모니터링되는 호스트
  unit_price: 8
public_title: Hardware Sentry
short_description: 100개 이상의 시스템(Cisco, Dell EMC, HPE, Hitachi, Lenovo, NetApp, NVIDIA,
  Pure 등)에 관한 하드웨어 및 지속 가능성 지표
supported_os:
- 리눅스
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cost Management
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - 제출한 데이터 유형::메트릭
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: 100개 이상의 시스템(Cisco, Dell EMC, HPE, Hitachi, Lenovo, NetApp, NVIDIA,
    Pure 등)에 관한 하드웨어 및 지속 가능성 지표
  media:
  - caption: Hardware Sentry의 주요 대시보드는 모든 데이터 센터와 서버실의 에너지 사용량과 탄소 배출량에 관한 개요를 제공합니다.
      Hardware Sentry OpenTelemetry Collector에서 수집한 지표를 활용합니다.
    image_url: images/dashboard-main.png
    media_type: image
  - caption: '아키텍처 다이어그램: 하드웨어 Sentry OpenTelemetry Collector는 온프레미스에서 실행되고 서버, 스위치
      및 스토리지 시스템을 모니터링하며 Datadog 환경으로 메트릭을 푸시합니다.'
    image_url: images/architecture.png
    media_type: image
  - caption: 모니터링되는 각 호스트에 관해 Hardware Sentry는 전자 구성 요소(CPU, 메모리, 디스크, NIC, 센서 등),
      전력 소비량, 탄소 배출량을 모니터링합니다.
    image_url: images/dashboard-host.png
    media_type: image
  - caption: 각 사이트(데이터 센터 또는 서버실)별로 1일, 1개월, 1년 동안의 에너지 및 탄소 배출량을 추산합니다. 최적의 온도는 1년
      동안의 에너지 절감 가능성을 고려하여 권장됩니다.
    image_url: images/dashboard-site.png
    media_type: image
  - caption: 모든 하드웨어 문제(디스크, 메모리 모듈, NIC, 전원 공급 장치 등)는 특정 모니터를 통해 모니터링되며 상세 메시지가 표시됩니다.
    image_url: images/events-explorer.png
    media_type: image
  - caption: Hardware Sentry 통합에는 인프라의 하드웨어 문제를 보고하는 데 권장되는 모니터 컬렉션이 함께 제공됩니다.
    image_url: images/triggered-monitors.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Hardware Sentry
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

**[Hardware Sentry][1]**는 Datadog용 대시보드와 모니터 컬렉션과 함께 패키지로 제공되는, 데이터 센터의 모든 서버, 네트워크 스위치 또는 스토리지 시스템의 하드웨어 구성 요소를 모니터링하는 데 특화된 에이전트입니다.

### 하드웨어 모니터링

**Hardware Sentry**는 서버, 네트워크 스위치 및 스토리지 시스템의 물리적 상태를 보고할 수 있는 모니터링 에이전트입니다. 각 프로세서, 컨트롤러, 디스크, 또는 전원 공급 장치의 상태, 온도, 팬 속도, 네트워크 카드의 링크 상태 및 속도 등을 보고하기 위해 주기적으로 메트릭을 수집합니다.

* **원격**: 하나의 에이전트가 SNMP, WBEM, WMI, SSH, IPMI, REST API 등을 통해 수백 개의 시스템을 모니터링합니다.
* **멀티 플랫폼**: 250개 이상의 커넥터를 통해 이미 100개 이상의 플랫폼이 지원됩니다(Cisco, Dell EMC, HP, Huawei, IBM, Lenovo, NetApp, Oracle, Pure 등). 지원되는 플랫폼의 전체 목록은 [Hardware Sentry 설명서][2]를 참조하세요.
* **간단한 이용**: 호스트 이름이나 IP 주소, 자격 증명을 지정 등 최소한의 구성 작업으로 시스템을 모니터링할 수 있습니다. **Hardware Sentry**는 사용 가능한 계측 장비를 자동으로 감지하고 즉시 모니터링을 시작합니다.
* **정규화**: 필요한 모든 정보는 Datadog의 표준화된 메트릭을 통해 보고됩니다. 예를 들어, 동일한 `hw.temperature` 메트릭은 NetApp 필터, HP BladeSystem, Windows를 실행하는 Dell PowerEdge, Linux를 실행하는 Cisco UCS 또는 기타 플랫폼의 온도를 나타내는 데 사용됩니다. 이러한 메트릭은 [OpenTelemetry의 의미 규칙][3]을 따릅니다.

**Hardware Sentry**는 프로세서, 메모리 모듈, 디스크, 네트워크 카드, 컨트롤러, 전원 공급 장치, 팬, 온도 센서 등의 오류를 감지하고 예측할 수 있는 사전 정의된 모니터와 함께 제공됩니다.

### 에너지 사용량 및 탄소 발자국 보고서

**Hardware Sentry**는 물리적 상태 모니터링 외에도 모니터링 대상 시스템의 에너지 사용량을 보고합니다. 제공된 대시보드는 전기 요금 및 탄소 밀도를 나타내는 지표와 함께 인프라의 전기 사용량(kWh)과 탄소 발자국(CO2 톤)을 보고합니다.

**100% 소프트웨어**: 내부 전원 센서가 장착되지 않은 시스템에서도 스마트 PDU가 필요하지 않습니다!

### 대시보드

이 통합에는 **[Hardware Sentry OpenTelemetry Collector][4]**에서 수집한 메트릭을 활용하는 대시보드 세트가 함께 제공됩니다.

| 대시보드 | 설명 |
|---|---|
| Hardware Sentry - 기본 | 지속 가능성에 초점을 맞춘 모니터링 호스트 전체 개요 |
| Hardware Sentry - 사이트 | 한 *사이트*(데이터 센터 또는 서버실) 및 모니터링되는 *호스트*와 관련된 메트릭 |
| Hardware Sentry - 호스트 | 하나의 *호스트*와 해당 내부 장치에 연결된 메트릭 |

## 지원

Datadog Marketplace를 통한 **Hardware Sentry** 구독은 [Sentry Desk][12]에서 제공하는 모든 서비스에 액세스 권한을 부여합니다.

* [Jira Service Management][13]를 통한 기술 지원
* 기술 문서
* 패치

구독을 신청하면 *Sentry Desk* 계정을 관리할 수 있는 초대장을 받게 됩니다.

### 추가 정보:

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Hardware Sentry의 제품으로 탄소 발자국을 추적하세요.][14]

[1]: https://www.sentrysoftware.com/products/hardware-sentry.html
[2]: https://www.sentrysoftware.com/docs/hws-doc/latest/platform-requirements.html
[3]: https://opentelemetry.io/docs/reference/specification/metrics/semantic_conventions/hardware-metrics/
[4]: https://www.sentrysoftware.com/products/hardware-sentry-opentelemetry-collector.html
[5]: https://www.sentrysoftware.com/docs/hws-doc/latest/integration/datadog.html
[6]: https://www.sentrysoftware.com/downloads/products-for-opentelemetry.html
[7]: https://www.sentrysoftware.com/products/hardware-sentry.html
[8]: https://www.sentrysoftware.com/docs/hws-doc/latest/install.html
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[10]: https://www.sentrysoftware.com/docs/hws-doc/latest/configuration/configure-agent.html
[11]: https://www.sentrysoftware.com/docs/hws-otel-collector/latest/install.html
[12]: https://www.sentrysoftware.com/desk
[13]: https://sentrydesk.atlassian.net/servicedesk/customer/portals
[14]: https://www.datadoghq.com/blog/sustainability-monitoring-carbon-footprint-hardware-sentry-datadog/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/hardware-sentry" target="_blank">Marketplace에서 이 애플리케이션을 구매하세요</a>.