---
algolia:
  subcategory: Marketplace 통합
app_id: avio-consulting-mulesoft-observability
app_uuid: 54de8550-348d-4b1b-a8e1-1e2efc633bff
assets:
  dashboards:
    Anypoint Platform - Business Group Summary: assets/dashboards/anypoint_platform_-_business_group_summary.json
    Anypoint Platform - Executive: assets/dashboards/anypoint_platform_-_executive.json
    Anypoint Platform - Root Organization: assets/dashboards/anypoint_platform_-_root_organization.json
    Mule Application Dashboard: assets/dashboards/mule_application_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    metrics:
      check:
      - avio.mule.app.message.count
      metadata_path: metadata.csv
      prefix: avio
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17618199
    source_type_name: MuleSoft Observability
author:
  homepage: https://www.avioconsulting.com
  name: AVIO Consulting
  sales_email: sales@avioconsulting.com
  support_email: datadog-support@avioconsulting.com
  vendor_id: avio-consulting
categories:
- 메트릭
- 추적
- marketplace
- 자동화
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avio_consulting_mulesoft_observability
integration_id: avio-consulting-mulesoft-observability
integration_title: MuleSoft Observability
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avio_consulting_mulesoft_observability
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.avio_consulting.mulesoft_observability
  product_id: mulesoft-observability
  short_description: 프로덕션 애플리케이션당 단가
  tag: app.prod.identifier
  unit_label: 계측된 프로덕션 MuleSoft 애플리케이션
  unit_price: 30
public_title: MuleSoft Observability
short_description: MuleSoft 애플리케이션 관측을 위한 Otel 메트릭, 트레이스, 로그
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Tracing
  - Category::Marketplace
  - 카테고리::자동화
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Setup
  description: MuleSoft 애플리케이션 관측을 위한 Otel 메트릭, 트레이스, 로그
  media:
  - caption: MuleSoft Application Distributed Trace 시각화
    image_url: images/mulesoft_observability_trace.png
    media_type: 이미지
  - caption: Root Organization용 MuleSoft Anypoint Platform 대시보드
    image_url: images/mulesoft_observability_anypoint_root_organization.png
    media_type: 이미지
  - caption: Business Group Applications용 MuleSoft Anypoint Platform 대시보드
    image_url: images/mulesoft_observability_anypoint_business_groups.png
    media_type: 이미지
  - caption: Executive Summary용 MuleSoft Anypoint Platform 대시보드
    image_url: images/mulesoft_observability_anypoint_executive.png
    media_type: 이미지
  - caption: 리소스 활용도 및 성능 확인용 MuleSoft Application 대시보드
    image_url: images/mulesoft_observability_mule_application.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: MuleSoft Observability
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

MuleSoft는 기업이 온프레미스 및 클라우드 컴퓨팅 환경에서 데이터, 애플리케이션 및 디바이스를 연결하는 데 도움이 되는 엔터프라이즈 통합 플랫폼입니다.

이 MuleSoft Observability 통합은 OpenTelemetry 기반 통합으로, MuleSoft 애플리케이션 옵저버빌리티 및 텔레메트리 데이터를 Datadog으로 전송합니다. MuleSoft 애플리케이션은 MuleSoft 모듈을 통해 분산된 트레이스를 수집하고 흐름과 구성 가능한 프로세서 세트의 스팬을 생성할 수 있습니다. 또한 이 통합은 Anypoint 플랫폼 및 애플리케이션 수준 메트릭 전송을 지원하고, MuleSoft 애플리케이션 내에서 사용할 수 있는 OpenTelemetry 호환 Log4j appender를 제공합니다.

플랫폼 및 애플리케이션 수준 메트릭을 시각화하는 기본 대시보드는 다음과 같습니다.
1. Anypoint Platform - Organization and Business Groups: 이 대시보드에서는 조직에서 사용할 수 있는 리소스와 사용된 방법을 파악할 수 있습니다.
1. Anypoint Platform - Executive Summary: Anypoint Platform 구독의 전반적인 사용량을 이해하는 데 도움이 되는 고급 대시보드입니다.
1. Mule Applications: CPU, JVM, MuleSoft 메트릭을 포함하여 하나 이상의 MuleSoft 애플리케이션의 애플리케이션 및 시스템 수준 메트릭을 시각화합니다.

## 지원
지원이나 기능 요청이 있으면 다음 채널을 통해 AVIO 지원팀에 문의하세요.

- 이메일: [datadog-support@avioconsulting.com][2]  
- [AVIO 지원 포털][3]

### 참고 자료
[MuleSoft OpenTelemetry 문서][4]
[Datadog Agent를 통한 OTLP 수집][5]
[OpenTelemetry Collector 및 Datadog Exporter][6]

[1]: https://github.com/DataDog/marketplace/blob/master/avio_consulting_mulesoft_observability/metadata.csv
[2]: mailto:datadog-support@avioconsulting.com
[3]: https://datadog-support.avioconsulting.com
[4]: https://avioconsulting.github.io/mule-opentelemetry-module/
[5]: https://docs.datadoghq.com/ko/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[6]: https://docs.datadoghq.com/ko/opentelemetry/collector_exporter/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며, Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/avio-consulting-mulesoft-observability" target="_blank">Marketplace에서 구매하세요</a>.