---
aliases:
- /ko/integrations/awscloudsearch/
categories:
- aws
- cloud
- log collection
dependencies: []
description: 인덱스 사용률, 성공적인 요청 수 등을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/awscloudsearch/
draft: false
git_integration_title: amazon_cloudsearch
has_logo: true
integration_id: ''
integration_title: Amazon CloudSearch
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: amazon_cloudsearch
public_title: Datadog-Amazon CloudSearch 통합
short_description: 인덱스 사용률, 성공적인 요청 수 등을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon CloudSearch는 검색 솔루션을 간단하고 비용 효율적으로 설정, 관리 및 확장할 수 있게 해주는 AWS Cloud의 관리형 서비스입니다.

Datadog에서 모든 CloudSearch 메트릭을 보려면 이 통합을 활성화합니다.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `CloudSearch`가 `Metric Collection` 탭 아래 활성화되었는지 확인하세요.
2. [Datadog - Amazon CloudSearch 통합][3]을 설치합니다.

### 로그 수집

#### 로깅 활성화

로그를 S3 버킷 또는 CloudWatch로 보내도록 Amazon CloudSearch를 설정합니다.

**참고**: S3 버킷에 로그를 보내려면 `amazon_cloudsearch`가 _Target prefix_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. Lambda 함수가 설치되면 AWS 콘솔에서 Amazon CloudSearch 로그가 포함된 S3 버킷 또는 CloudWatch 로그 그룹에 트리거를 수동으로 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_cloudsearch" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon CloudSearch 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Amazon CloudSearch 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cloudsearch
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudsearch/amazon_cloudsearch_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/