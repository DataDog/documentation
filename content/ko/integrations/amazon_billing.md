---
app_id: amazon-billing
app_uuid: 9409f423-8c1f-4a82-8632-1be74d52c028
assets:
  dashboards:
    aws_billing: assets/dashboards/amazon_billing_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.billing.estimated_charges
      metadata_path: metadata.csv
      prefix: aws.billing
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 158
    source_type_name: Amazon 빌링
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- cost management
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_billing
integration_id: amazon-billing
integration_title: AWS 빌링 및 비용 관리
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_billing
public_title: AWS 빌링 및 비용 관리
short_description: AWS 빌링을 통해 AWS 빌링 예측이 비용을 추적할 수 있습니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::Cost Management
  configuration: README.md#Setup
  description: AWS 빌링을 통해 AWS 빌링 예측이 비용을 추적할 수 있습니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS 빌링 및 비용 관리
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

AWS 빌링 및 비용 관리는 예측 요금과 예산 메트릭을 표시합니다.

이 통합을 활성화해 Datadog에서 AWS 빌링 및 비용 관리 메트릭을 확인하세요.

**참고**: 이 통합은 `budgets:ViewBudget` 권한이 완전히 활성화될 수 있도록 합니다. 빌링 메트릭은 AWS 콘솔에서 활성화되어야 합니다. AWS를 설정하는 방법에 대한 자세한 정보는 [Amazon Web Services 통합 설명서][1]를 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1.  [AWS 통합 페이지][2]에서 `Billing`이 `Metric Collection` 탭에 활성화되어 있는지 확인하세요.
2. [Datadog - AWS 빌링 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_billing" >}}


### 이벤트

AWS 빌링 및 비용 관리 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

AWS 빌링 및 비용 관리 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-billing
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_billing/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/