---
aliases:
- /ko/integrations/awskms/
categories:
- cloud
- security
- aws
- log collection
dependencies: []
description: ' AWS KMS 키 만료 추적하기.'
doc_link: https://docs.datadoghq.com/integrations/amazon_kms/
draft: false
git_integration_title: amazon_kms
has_logo: true
integration_id: ''
integration_title: AWS 키 관리 서비스 (KMS)
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: amazon_kms
public_title: Datadog-AWS 키 관리 서비스 (KMS) 통합
short_description: ' AWS KMS 키 만료 추적하기.'
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS 키 관리 서비스(KMS)는 데이터를 암호화하는 데 사용하는 암호화 키를 쉽게 생성 및 제어할 수 있는 관리형 서비스입니다.

이 통합을 활성화하여 Datadog에서 모든 KMS 메트릭을 확인합니다.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭의 `KMS`이 활성화되어 있는지 확인하세요.

2. [Datadog - AWS 키 관리 서비스(KMS) 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS KMS를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch)에 로그를 전송합니다.

**참고**: S3 버킷에 로깅하는 경우 `amazon_kms`이 _대상 접두어_( _Target prefix_)로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에서 AWS KMS 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동으로 트리거를 추가하세요.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_kms" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS KMS 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS KMS 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-kms
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kms/amazon_kms_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/