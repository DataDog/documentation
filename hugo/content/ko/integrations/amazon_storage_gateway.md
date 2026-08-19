---
aliases:
- /ko/integrations/awsstoragegateway/
categories:
- cloud
- data stores
- aws
- log collection
dependencies: []
description: 핵심 AWS 스토리지 게이트웨이 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_storage_gateway/
draft: false
git_integration_title: amazon_storage_gateway
has_logo: true
integration_id: ''
integration_title: AWS 스토리지 게이트웨이
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_storage_gateway
public_title: Datadog-AWS 스토리지 게이트웨이 통합
short_description: 핵심 AWS 스토리지 게이트웨이 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS 스토리지 게이트웨이는 조직의 IT 환경과 AWS 스토리지 인프라스트럭처 간의 원활하면서도 안전한 통합을 제공합니다.

이 통합을 활성화하여 Datadog에서 모든 스토리지 게이트웨이 메트릭을 확인합니다.

## 설정

### 설치

아직 설치하지 않았다면 먼저 [Amazon Web Services 통합][1]을 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `StorageGateway`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.
2. [Datadog - AWS 스토리지 게이트웨이 통합][3]을 설치합니다.

### 로그 수집

#### 로깅 활성화

AWS 스토리지 게이트웨이를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch)로 로그를 전송합니다.

**참고**: S3 버킷으로 로그를 전송하려면 _Target prefix_(대상 접두사)를 `amazon_storage_gateway`로 설정합니다.

#### Datadog에 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][4]를 설정하세요.
2. Lambda 함수가 설치되면, AWS 콘솔에서 AWS 스토리지 게이트웨이 로그가 포함된 클라우드와치(CloudWatch) 또는 S3 버킷 로그 그룹에 다음 트리거를 수동으로 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_storage_gateway" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS 스토리지 게이트웨이 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

AWS 스토리지 게이트웨이 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-storage-gateway
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_storage_gateway/amazon_storage_gateway_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/