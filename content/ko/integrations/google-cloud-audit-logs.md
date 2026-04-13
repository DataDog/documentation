---
aliases:
- /ko/integrations/google_cloud_audit_logs
app_id: google-cloud-audit-logs
categories:
- 클라우드
- google cloud
- 로그 수집
- security
custom_kind: 통합
description: GCP 감사 로그가 Datadog로 전송될 때 자동으로 활성화되는 GCP 보안의 사전 설정 대시보드
media: []
title: Google Cloud Audit Logs
---
## 개요

GCP 감사 로그를 모니터링하여 리소스에 접근하는 사용자, 접근 방법, 접근 허용 여부를 더욱 잘 파악할 수 있습니다.

감사 로그에는 네 가지 유형이 있습니다.

- **시스템 이벤트 감사 로그**: GCP가 로깅하는 시스템 이벤트 감사 로그에는 리소스의 설정을 수정하는 Google Cloud 작업에 대한 로그 엔티티가 기본적으로 포함됩니다. 시스템 이벤트 감사 로그는 Google 시스템이 생성하며, 직접적인 사용자 작업으로 생성되지 않습니다.
- **관리자 활동 감사 로그**: GCP가 기본값으로 로깅하는 관리자 활동 감사 로그에는 리소스 설정 또는 메타데이터를 수정하는 API 호출 또는 기타 작업에 대한 로그 엔티티가 포함됩니다. 예를 들어, 해당 로그는 사용자가 VM 인스턴스를 생성하거나 ID 및 액세스 관리 권한을 변경할 때 기록됩니다.
- **Data Access Audit Logs**: 리소스별로 [별도로 활성화]https://cloud.google.com/logging/docs/audit/configure-data-access)해야 하는 Data Access 감사 로그에는 리소스의 구성 또는 메타데이터를 읽는 API 호출과 사용자가 제공한 리소스 데이터를 생성, 수정, 또는 읽는 사용자 주도 API 호출이 기록됩니다. Data Access 감사 로그는 공개적으로 공유되는 리소스 데이터 액세스 작업은 기록하지 않습니다.
- **Policy Denied Audit Logs**: 기본적으로 생성되는 클라우드 로깅은 Google Cloud 서비스가 보안 정책 위반으로 인해 사용자 또는 서비스 계정(https://cloud.google.com/iam/docs/service-accounts)에 대한 액세스를 거부할 때  Policy Denied 감사 로그를 기록합니다.

## 설정

### 설치

이러한 로그는 Google Cloud Platform 통합 페이지의 [로그 수집 지침](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)을 따라 Pub/Sub 토픽을 통해 전달할 수 있습니다.

자세한 내용은 [감사 로그 이해](https://cloud.google.com/logging/docs/audit/understanding-audit-logs) 또는 [GCP 감사 로그 모니터링 모범 사례](https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/)를 참고하세요.

## 수집한 데이터

### Metrics

Google Cloud Audit Logs 통합에는 이벤트가 포함되지 않습니다.

### 이벤트

Google Cloud Audit Logs 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Google Cloud Audit Logs 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.