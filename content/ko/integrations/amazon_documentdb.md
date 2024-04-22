---
categories:
- cloud
- 데이터 스토어
- aws
- 로그 수집
dependencies: []
description: Amazon DocumentDB 메트릭 및 로그를 모니터링합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_documentdb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
  tag: 블로그
  text: Datadog을 사용하여 Amazon DocumentDB 메트릭 및 로그 수집
git_integration_title: amazon_documentdb
has_logo: true
integration_id: ''
integration_title: Amazon DocumentDB
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: amazon_documentdb
public_title: Datadog-Amazon DocumentDB 통합
short_description: Amazon DocumentDB 메트릭 및 로그를 모니터링합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon DocumentDB는 MongoDB 워크로드를 지원하는 빠르고 확장 가능하며 가용성이 뛰어난 완전 관리형 문서 데이터베이스 서비스입니다.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지[2]에서 `DocumentDB`가  `Metric Collection` 탭에 활성화되어있는지 확인합니다.
2. [Datadog - Amazon DocumentDB 통합][3]을 설치합니다.

### 로그 수집

#### 로깅 활성화

로그를 S3 버킷 또는 CloudWatch로 보내도록 Amazon DocumentDB를 설정합니다.

**참고**: S3 버킷에 로그를 보내려면 `amazon_documentdb`를 _대상 접두사_로 설정합니다.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. Lambda 함수가 설치되면 AWS 콘솔에서 Amazon DocumentDB 로그가 포함된 S3 버킷 또는 CloudWatch 로그 그룹에 트리거를 수동으로 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_documentdb" >}}


AWS에서 검색된 각 메트릭에는 dbinstanceidentifier, dbclusteridentifier 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon DocumentDB 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon DocumentDB 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-documentdb
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_documentdb/amazon_documentdb_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/