---
categories:
- aws
- cloud
- 데이터 스토어
- 로그 수집
dependencies: []
description: 핵심 AWS DMS (Database Migration Service) 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_dms/
draft: false
git_integration_title: amazon_dms
has_logo: true
integration_id: ''
integration_title: AWS DMS(Database Migration Service)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_dms
public_title: Datadog-AWS DMS(Database Migration Service) 통합
short_description: 핵심 AWS DMS (Database Migration Service) 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS DMS(Database Migration Service)는 클라우드 서비스로 연계 데이터베이스, 데이터 웨어하우스, NoSQL 데이터베이스 및 기타 유형의 데이터 저장소를 쉽게 마이그레이션할 수 있도록 해줍니다.

Datadog에서 모든 DMS 메트릭을 보려면 이 통합을 활성화하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지에서][2] `Metric Collection` 탭 아래에 `Database Migration Service`가 활성화되어 있는지 확인하세요.
2. [Datadog - AWS DMS(Database Migration Service) 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS DMS(Database Migration Service)를 설정해 S3 버킷 또는 클라우드와치(CloudWatch)에 로그를 전송하세요.

**참고**: S3 버킷에 기록하는 경우 `amazon_dms`이 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에서 AWS DMS 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동으로 트리거를 추가하세요.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_dms" >}}


### 이벤트

AWS DMS(Database Migration Service) 통합은 어떤 이벤트도 포함하지 않습니다.

### 서비스 점검

AWS DMS(Database Migration Service) 통합은 어떤 서비스 점검도 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-dms
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dms/amazon_dms_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/