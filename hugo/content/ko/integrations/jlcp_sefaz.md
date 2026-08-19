---
algolia:
  subcategory: Marketplace 통합
app_id: jlcp-sefaz
app_uuid: fc85f52c-08c0-48bc-9617-6950707c8f91
assets:
  dashboards:
    JLCPSefaz_CompactView: assets/dashboards/JLCPSefaz_CompactView.json
    JLCPSefaz_DetailedView: assets/dashboards/JLCPSefaz_DetailedView.json
    JLCPSefaz_Overview: assets/dashboards/JLCPSefaz_Overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - sefaz.can_connect
      - sefaz.response_time
      metadata_path: metadata.csv
      prefix: sefaz.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15205183
    source_type_name: JLCP Sefaz
  monitors:
    Authorizer Service is down: assets/monitors/metric_monitor.json
author:
  homepage: https://www.jlcp.com.br/
  name: JLCP
  sales_email: contato@jlcp.com.br
  support_email: contato@jlcp.com.br
  vendor_id: jlcp
categories:
- 경고
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: jlcp_sefaz
integration_id: jlcp-sefaz
integration_title: Sefaz
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: jlcp_sefaz
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: jlcp-sefaz
  short_description: 브라질의 모든 주를 모니터링.
  unit_price: 100.0
public_title: Sefaz
short_description: 브라질의 여러 주에서 SEFAZ 서비스를 모니터링하세요.
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
  - Category::Alerting
  - Category::Marketplace
  - 제공::통합
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: 브라질의 여러 주에서 SEFAZ 서비스를 모니터링하세요.
  media:
  - caption: 'JLCP: Sefaz 개요'
    image_url: images/JLCPSefaz_Overview.png
    media_type: 이미지
  - caption: 'JLCP: Sefaz 간략 뷰'
    image_url: images/JLCPSefaz_CompactView.png
    media_type: 이미지
  - caption: 'JLCP: Sefaz 상세한 뷰'
    image_url: images/JLCPSefaz_DetailedView.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Sefaz
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

JLCP Sefaz 통합은 브라질 여러 주에서 전자 송장(NF-e) 서비스를 제공하는 세무서(Secretaria de Estado da Fazenda, SEFAZ)를 모니터링합니다. SEFAZ는 브라질의 재정 관리 및 상거래 적법성에 필수적인 세무 행정 및 전자 재정 문서 발행을 담당합니다.

이 통합은 NF-e 서비스의 가용성 상태(예: OK, WARNING, CRITICAL)와 각 서비스의 응답 시간의 원격 측정 데이터를 수집합니다.

모니터링되는 서비스는 다음과 같습니다.
- nfe_inutilizacao:  NF-e 번호 매기기 비활성화.
- nfe_consulta_protocolo: NF-e 프로토콜 상담.
- nfe_status_servico: NF-e 서비스 상태 상담.
- nfe_consulta_cadastro: 납세자 등록 상담.
- nfe_recepcao_evento: NF-e 이벤트 접수.
- nfe_autorizacao: NF-e 발급 승인.
- nfe_ret_autorizacao: NF-e 승인 반환.
- nfe_distribuicao_dfe: 전자 재정 문서의 배포.

##### 고객 혜택

이 통합을 사용하면 브라질에서 전자 송장 발행에 필수적인 NF-e 서비스 상태를 사전에 포괄적으로 파악할 수 있습니다. 또한, 가용성 및 성능 문제를 신속하게 파악하고 해결하여 지속적인 영업 운영과 세무 요건 준수를 보장할 수 있습니다. 통합을 통해 제공되는 상세한 가시성 및 성능 분석은 프로세스 최적화, 인프라 용량 계획 수립, 다운타임 감소를 지원하여 운영 효율성과 고객 만족도를 향상시킵니다.

## 지원

지원이나 기능 관련 문의는 [contato@jlcp.com.br][3]을 통해 JLCP Sefaz에 문의하세요. 지원 언어는 영어, 스페인어, 포르투갈어입니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: mailto:contato@jlcp.com.br

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/jlcp-sefaz" target="_blank">Marketplace에서 구매하세요</a>.