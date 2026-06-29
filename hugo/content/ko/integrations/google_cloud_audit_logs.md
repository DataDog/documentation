---
app_id: google-cloud-audit-logs
app_uuid: cadf465e-c3fa-4c62-8998-39e7149c2225
assets:
  dashboards:
    gcp_audit_logs: assets/dashboards/gcp_audit_logs.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 702
    source_type_name: Google Cloud Audit Logs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- 로그 수집
- 보안
custom_kind: 통합
dependencies: []
description: 감사 로그 대시보드를 확인합니다.
display_on_public_website: true
doc_link: ''
draft: false
git_integration_title: google_cloud_audit_logs
has_logo: true
integration_id: google-cloud-audit-logs
integration_title: Google Cloud Audit Logs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_audit_logs
public_title: Google Cloud Audit Logs
short_description: GCP 감사 로그가 Datadog로 전송될 때 자동으로 활성화되는 GCP 보안의 사전 설정 대시보드
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: GCP 감사 로그가 Datadog로 전송될 때 자동으로 활성화되는 GCP 보안의 사전 설정 대시보드
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Audit Logs
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

GCP 감사 로그를 모니터링하여 리소스에 접근하는 사용자, 접근 방법, 접근 허용 여부를 더욱 잘 파악할 수 있습니다.

감사 로그에는 네 가지 유형이 있습니다.
* **시스템 이벤트 감사 로그**: GCP가 로깅하는 시스템 이벤트 감사 로그에는 리소스의 설정을 수정하는 Google Cloud 작업에 대한 로그 엔티티가 기본적으로 포함됩니다. 시스템 이벤트 감사 로그는 Google 시스템이 생성하며, 직접적인 사용자 작업으로 생성되지 않습니다.
* **관리자 활동 감사 로그**: GCP가 기본값으로 로깅하는 관리자 활동 감사 로그에는 리소스 설정 또는 메타데이터를 수정하는 API 호출 또는 기타 작업에 대한 로그 엔티티가 포함됩니다. 예를 들어, 해당 로그는 사용자가 VM 인스턴스를 생성하거나 ID 및 액세스 관리 권한을 변경할 때 기록됩니다.
* **데이터 액세스 감사 로그**: 리소스당 [별도로 활성화][1]되는 데이터 액세스 감사 로그에는 리소스의 설정 또는 메타데이터를 읽는 API 호출과 사용자가 제공한 리소스 데이터를 생성, 수정 또는 읽는 사용자 기반 API 호출이 포함됩니다. 데이터 액세스 감사 로그는 공개적으로 공유되는 리소스에 대한 데이터 액세스 작업을 기록하지 않습니다.
* **정책 거부 감사 로그**: 기본적으로 생성되는 클라우드 로깅은 보안 정책 위반으로 인해 Google Cloud 서비스가 사용자 또는 [서비스 계정][2]의 액세스를 거부할 때 정책 거부 감사 로그를 기록합니다.

## 설정

### 설치
Google 클라우드 플랫폼 통합 페이지의 [로그 수집 지침][3]을 사용하여 Pub/Sub 토픽을 통해 해당 로그를 전달할 수 있습니다.

자세한 내용을 확인하려면 [감사 로그 이해하기][4] 또는 [GCP 감사 로그 모니터링 모범 사례][5]를 참조하세요.

## 수집한 데이터

### 메트릭

Google Cloud Audit Logs 통합에는 이벤트가 포함되지 않습니다.

### 이벤트

Google Cloud Audit Logs 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Google Cloud Audit Logs 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://cloud.google.com/logging/docs/audit/configure-data-access
[2]: https://cloud.google.com/iam/docs/service-accounts
[3]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[4]: https://cloud.google.com/logging/docs/audit/understanding-audit-logs
[5]: https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/
[6]: https://docs.datadoghq.com/ko/help/