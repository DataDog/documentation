---
app_id: amazon-certificate-manager
app_uuid: 9eda4833-a2c0-4dcb-bf1c-7a868a0a59c3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.certificatemanager.days_to_expiry
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.certificatemanager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 330
    source_type_name: Amazon Certificate Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- 클라우드
- 설정 및 배포
- 로그 수집
- 프로비저닝
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_certificate_manager
integration_id: amazon-certificate-manager
integration_title: AWS Certificate Manager
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_certificate_manager
public_title: AWS Certificate Manager
short_description: AWS Certificate Manager lets you easily provision, manage, and
  deploy public and private SSL/TLS certificates.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Certificate Manager lets you easily provision, manage, and deploy
    public and private SSL/TLS certificates.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Certificate Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

AWS Certificate Manager를 사용하면 AWS 서비스 및 내부에 연결된 리소스에 사용할 SSL/TLS 인증서를 프로비저닝, 관리 및 배포할 수 있습니다.

Datadog에서 모든 Certificate Manager 메트릭을 보려면 이 통합을 활성화하세요.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]의 `Metric Collection` 탭에서 `CertificateManager`가 활성화되어 있는지 확인하세요.
2. [Datadog - AWS Certificate Manager 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon-certificate-manager" >}}


### 이벤트

AWS Certificate Manager 통합은 EventBridge의 인증서 만료 및 상태 변경 이벤트를 지원합니다.

### 서비스 점검

AWS Certificate Manager 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-certificate-manager
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_certificate_manager/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/ko/help/