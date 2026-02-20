---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-anomali-threatstream
app_uuid: 40102d95-f0e5-4028-855d-2a6218913a86
assets:
  dashboards:
    Anomali ThreatStream - Incidents: assets/dashboards/crest_data_systems_anomali_threatstream_incidents.json
    Anomali ThreatStream - Observables: assets/dashboards/crest_data_systems_anomali_threatstream_observables.json
    Anomali ThreatStream - Overview: assets/dashboards/crest_data_systems_anomali_threatstream_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.anomali.threatstream.observables.confidence
      metadata_path: metadata.csv
      prefix: cds.anomali.threatstream
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10375
    source_type_name: crest_data_systems_anomali_threatstream
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- 데이터 스토어
- alerting
- 이벤트 관리
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_anomali_threatstream
integration_id: crest-data-systems-anomali-threatstream
integration_title: Anomali ThreatStream
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_anomali_threatstream
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: anomali-threatstream
  short_description: Anomali ThreatStream 통합의 월별 정액 요금입니다.
  unit_price: 495.0
public_title: Anomali ThreatStream
short_description: Anomali ThreatStream Observables 및 Incident ThreatModel 이벤트 모니터링
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
  - Category::Marketplace
  - 카테고리::데이터 저장
  - Category::Alerting
  - '카테고리:: 이벤트 관리'
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: Anomali ThreatStream Observables 및 Incident ThreatModel 이벤트 모니터링
  media:
  - caption: Anomali ThreatStream - Overview
    image_url: images/crest_data_systems_anomali_threatstream_overview.png
    media_type: image
  - caption: Anomali ThreatStream - Observables - 1
    image_url: images/crest_data_systems_anomali_threatstream_observables_1.png
    media_type: image
  - caption: Anomali ThreatStream - Observables - 2
    image_url: images/crest_data_systems_anomali_threatstream_observables_2.png
    media_type: image
  - caption: Anomali ThreatStream - Incidents
    image_url: images/crest_data_systems_anomali_threatstream_incidents.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Anomali ThreatStream
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Anomali ThreatStream의 위협 인텔리전스 관리 기능은 원시 데이터의 수집과 처리를 자동화하고, 불필요한 정보를 걸러내며, 이를 관련성 있고 실행 가능한 위협 인텔리전스로 변환하여 보안 팀을 돕습니다.

Anomali ThreatStream은 Actors, Vulnerabilities, Attack Patterns, Malware, Incidents 등 다양한 위협 모델을 지원합니다. 위협 모델링은 구조적 취약점이나 적절한 보안 조치 부재와 같은 잠재적 위협을 식별, 분석하고 대응책의 우선순위를 정하는 프로세스입니다.

Anomali ThreatStream은 환경에서 생성되는 Observables도 지원합니다. Observables는 잠재적 위협을 탐지할 수 있는 기술 정보입니다. 이는 인텔리전스 시스템(Anomali ThreatStream)에 포함된 모든 데이터를 기반으로 도출되지만, 항상 맥락화되어 있는 것은 아닙니다.

이 통합은 Anomali ThreatStream에서 발생한 `Observables`와 `Incident` Threat Model에서 생성된 이벤트를 모니터링합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][5]
- 세일즈: [datadog-sales@crestdata.ai][6]
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ ][10]

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Anomali_Threatstream.pdf
[8]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-anomali-threatstream" target="_blank">Marketplace에서 구매하세요</a>.