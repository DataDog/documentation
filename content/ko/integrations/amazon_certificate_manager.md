---
categories:
- aws
- cloud
- 설정 및 배포
- 로그 수집
- 프로비저닝
dependencies: []
description: 주요 AWS Certificate Manager 메트릭을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_certificate_manager/
draft: false
git_integration_title: amazon_certificate_manager
has_logo: true
integration_id: ''
integration_title: AWS Certificate Manager
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: amazon_certificate_manager
public_title: Datadog-AWS Certificate Manager 통합
short_description: 주요 AWS Certificate Manager 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Certificate Manager를 사용하면 AWS 서비스 및 내부에 연결된 리소스에 사용할 SSL/TLS 인증서를 프로비저닝, 관리 및 배포할 수 있습니다.

Datadog에서 모든 Certificate Manager 메트릭을 보려면 이 통합을 활성화하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]의 `Metric Collection` 탭에서 `CertificateManager`가 활성화되어 있는지 확인하세요.
2. [Datadog - AWS Certificate Manager 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_certificate_manager" >}}


### 이벤트

AWS Certificate Manager 통합은 EventBridge의 인증서 만료 및 상태 변경 이벤트를 지원합니다.

### 서비스 점검

AWS Certificate Manager 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-certificate-manager
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_certificate_manager/amazon_certificate_manager_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/