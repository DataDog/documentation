---
app_id: google-cloud-private-service-connect
app_uuid: e4c77d0b-1c96-4484-85a5-7066ca938f98
assets:
  dashboards:
    google-cloud-private-service-connect: assets/dashboards/google_cloud_private_service_connect_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - gcp.gce.private_service_connect.consumer.open_connections
      - gcp.gce.private_service_connect.producer.open_connections
      metadata_path: metadata.csv
      prefix: gcp.gce.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 9347815
    source_type_name: Google Cloud Private Service Connect
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- google cloud
- network
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_private_service_connect
integration_id: google-cloud-private-service-connect
integration_title: Google Cloud Private Service Connect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_private_service_connect
public_title: Google Cloud Private Service Connect
short_description: 프라이빗 서비스 연결 모니터링
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Google Cloud
  - Category::Network
  - Category::Metrics
  - Submitted Data Type::Metrics
  - 제공::통합
  configuration: README.md#Setup
  description: 프라이빗 서비스 연결 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Private Service Connect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

[Google Cloud Private Service Connect][1]는 소비자가 VPC 네트워크 내부에서 관리형 서비스에 비공개로 액세스할 수 있도록 하는 Google Cloud Networking의 기능으로, 데이터 전송 보안을 강화하고 네트워크 오버헤드(송신) 비용을 절감합니다. 또한, 생산자는 다른 Google Cloud 고객에게 서비스를 호스팅하고 노출하여 서비스와 소비자 간에 프라이빗 연결을 제공할 수 있습니다.

이 통합을 활성화하면 Private Service Connect를 통한 연결, 전송된 데이터, 손실된 패킷을 시각화할 수 있습니다. 이 통합을 통해 Datadog은 Private Service Connect 연결에서 생산자와 소비자 모두에게 중요한 메트릭을 수집합니다.

## 설정

### 설치

### 구성

이 통합은 메트릭을 수집하기 위해 [기본 Google Cloud Platform 통합][2]에서 구성한 크리덴셜을 사용합니다.

Datadog은 Private Service Connect 기능도 제공합니다. 이 기능을 사용하면 공용 인터넷을 거치지 않고도 Private Link를 통해 Google Cloud 환경에서 Datadog으로 메트릭, 트레이스, 로그를 전송할 수 있습니다. 또한 네트워크 이그레스 비용을 절감하고 전송 중인 데이터 보안을 강화할 수 있습니다. 자세한 내용은 [지원되는 데이터 센터 가이드][3]를 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google_cloud_private_service_connect" >}}


### 서비스 점검

Google Cloud Private Service Connect는 서비스 점검을 포함하지 않습니다.

### 이벤트

Google Cloud Private Service Connect는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/google-cloud-private-service-connect
[2]: https://app.datadoghq.com/integrations/google-cloud-platform
[3]: https://docs.datadoghq.com/ko/agent/guide/gcp-private-service-connect/?site=us5
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/google_cloud_private_service_connect/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/