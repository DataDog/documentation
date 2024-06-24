---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: 핵심 AWS 백업 메트릭을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_backup/
draft: false
git_integration_title: amazon_backup
has_logo: true
integration_id: ''
integration_title: AWS 백업
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_backup
public_title: Datadog-AWS 백업 통합
short_description: 핵심 AWS 백업 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS 백업은 AWS 서비스 및 하이브리드 워크로드 전반에서 데이터 보호를 
중앙화하고 자동화합니다.

이 통합을 활성화하여 Datadog에서 백업 메트릭을 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 [Amazon Web Services 통합][1]을 설정합니다.

### 메트릭 수집

1. [AWS 통합 페이지][2]의 `Metric Collection` 탭에서 `Backup`이 활성화되어 있는지 확인합니다.
2. [Datadog - AWS Backup 통합][3]을 설치하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_backup" >}}


### 이벤트

AWS 백업 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS 백업 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-backup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_backup/amazon_backup_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/