---
aliases:
- /ko/integrations/google_cloud_armor
app_id: google-cloud-armor
categories:
- google cloud
- network
- security
custom_kind: integration
description: Datadog에서 Google Cloud Armor 메트릭, 이벤트, 로그를 확인하세요
further_reading:
- link: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
  tag: 블로그
  text: Google Cloud Armor 및 Datadog을 사용하여 네트워크 공격 모니터링
integration_version: 1.0.0
media: []
title: Google Cloud Armor
---
## 개요

[Google Cloud Armor](https://app.datadoghq.com/integrations/google-cloud-armor)는 분산 서비스 거부(DDoS) 공격, 크로스 사이트 스크립팅(XSS), SQL 인젝션(SQLi)과 같은 애플리케이션 공격을 비롯한 여러 유형의 위협으로부터 Google Cloud 배포를 보호하는 데 도움이 됩니다.

Armor’s Managed Protection은 분산 DDoS 공격 및 기타 인터넷 위협으로부터 웹 애플리케이션과 서비스를 보호하는 관리형 애플리케이션 보호 서비스입니다. 관리형 보호 기능은 로드 밸런서에 대한 상시 보호 기능을 제공하며, WAF 규칙 접근 권한을 제공합니다.

Google Cloud Armor는 Security Command Center와 자동으로 통합되어 Allowed Traffic Spike 및 Increasing Deny Ratio라는 두 가지 결과를 Security Command Center 대시보드로 내보냅니다.

Google Cloud Security Command Center 통합과 함께 이 통합을 활성화하면 Datadog에서 Google Cloud 환경의 DDoS 위협을 시각화할 수 있습니다. 이 통합을 통해 Datadog은 Google Cloud 네트워크 보안 구성에서 발생하는 중요한 보안 이벤트와 Google Cloud Armor에서 얻은 메트릭을 수집합니다.

이 통합을 통해 감사 로그부터 요청 로그에 이르기까지 클라우드 리소스 변경과 관련한 사용자 활동과 보안 정책으로 평가되는 모든 요청과 관련한 인사이트를 얻을 수 있습니다.

## 설정

### 설치

1. 시작하기 전에 Google Cloud Armor 이벤트를 수집하려는 프로젝트에 다음 API가 설정되어 있는지 확인하세요.

- [Cloud Resource Manager API](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)
- [Google Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com)
- [Google Cloud Monitoring API](https://console.cloud.google.com/apis/library/monitoring.googleapis.com)
- [Google Cloud Security Command Center API](https://console.cloud.google.com/apis/library/securitycenter.googleapis.com)

2. Google Cloud Armor 이벤트는 Google Security Command Center에 발견 사항으로 통합되므로 Google Cloud 콘솔의 Security Command Center에서 Google Cloud Armor가 활성화되어 있는지 확인하세요. 자세한 내용은 [Security Command Center 구성](https://console.cloud.google.com/security/command-center/overview)을 참고하세요.

1. 다음으로, [주요 Google Cloud Platform 통합](https://app.datadoghq.com/integrations/google-cloud-platform)에서 보안 발견 사항 수집을 활성화합니다.

### 설정

Google Cloud Armor 메트릭을 수집하기 위해 Google Cloud 통합을 구성합니다.

Google Cloud Armor 이벤트를 수집하려면 서비스 계정에 Security Center Findings Viewer 역할을 추가해야 합니다.
Google Cloud Security Command Center 통합을 설치하고 주요 Google Cloud 통합에서 보안 발견 사항 수집을 활성화하세요.

Google Cloud 환경에서 Datadog으로 로그 전달을 설정하려면 [Log Collection](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection) 섹션을 참고하세요.

감사 로그는 표준 로그 전달을 통해 전달될 수 있습니다. 이러한 감사 로그는 Google Cloud 리소스 유형  `gce_backend_service` 및 `network_security_policy`를 사용합니다. 감사 로그만 포함하려면
로그 싱크를 생성할 때 `protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog"`와 같은 필터를 사용하세요.

요청 로그는 표준 로그 전달을 통해 전달될 수 있습니다. 이러한 로그는 Google Cloud Load Balancing 로그에 자동으로 수집됩니다. 로그 싱크를 생성할 때 `jsonPayload.enforcedSecurityPolicy.outcome="DENY"`와 같은 필터를 사용하여 보안 정책에 의해 거부된 요청을 볼 수 있습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.networksecurity.dos.ingress_bytes_count** <br>(count) | 수신된 총 바이트 수를 드롭 상태(allowed 또는 dropped)별로 분류한 값<br>_byte로 표시_ |
| **gcp.networksecurity.dos.ingress_packets_count** <br>(count) | 수신된 총 패킷 수를 드롭 상태(allowed 또는 dropped)별로 분류한 값<br>_packet으로 표시_ |
| **gcp.networksecurity.firewall_endpoint.received_bytes_count** <br>(count) | 방화벽 엔드포인트에서 수신한 총 바이트 수<br>_byte로 표시_ |
| **gcp.networksecurity.firewall_endpoint.received_packets_count** <br>(count) | 방화벽 엔드포인트에서 수신한 총 패킷 수<br>_packet으로 표시_ |
| **gcp.networksecurity.firewall_endpoint.sent_bytes_count** <br>(count) | 방화벽 엔드포인트에서 전송한 총 바이트 수<br>_byte로 표시_ |
| **gcp.networksecurity.firewall_endpoint.sent_packets_count** <br>(count) | 방화벽 엔드포인트에서 전송한 총 패킷 수<br>_ packet으로 표시_ |
| **gcp.networksecurity.firewall_endpoint.threats_count** <br>(count) | 방화벽 엔드포인트에서 감지된 총 위협 수.|
| **gcp.networksecurity.https.previewed_request_count** <br>(count) | 현재 preview 모드인 규칙이 non-preview로 전환될 경우 영향을 받게 될 쿼리<br>_request로 표시_ |
| **gcp.networksecurity.https.request_count** <br>(count) | 정책 시행으로 인해 영향을 받은 실제 쿼리 수<br>_request로 표시_ |
| **gcp.networksecurity.l3.external.packet_count** <br>(count) | 규칙 일치 및 적용 조치별 예상 패킷 수<br>_packet으로 표시_ |
| **gcp.networksecurity.l3.external.preview_packet_count** <br>(count) | 현재 preview 모드인 규칙이 non-preview로 전환될 경우 영향을 받을 것으로 예상되는 패킷 수<br>_packet으로 표시_ |
| **gcp.networksecurity.tcp_ssl_proxy.new_connection_count** <br>(count) | 정책 시행의 영향을 받는 새 연결<br>_connection으로 표시_ |
| **gcp.networksecurity.tcp_ssl_proxy.previewed_new_connection_count** <br>(count) | 현재 preview 모드인 규칙이 non-preview로 전환될 경우 영향을 받는 새 연결<br>_connection으로 표시_ |

### 서비스 점검

Google Cloud Armor 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

Google Cloud Armor 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Google Cloud Armor 및 Datadog을 사용하여 네트워크 위협 모니터링](https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/)