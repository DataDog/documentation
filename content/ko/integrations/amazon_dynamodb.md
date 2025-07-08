---
aliases:
- /ko/integrations/awsdynamo/
app_id: amazon-dynamodb
app_uuid: dc7abf1f-b346-49bb-a02d-83a4bda1d493
assets:
  dashboards:
    amazon-dynamodb: assets/dashboards/amazon_dynamodb_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.dynamodb.table_size
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.dynamodb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 96
    source_type_name: Amazon DynamoDB
  monitors:
    DynamoDB Throttled Requests is High: assets/monitors/rec_mon_throttles.json
    Read Consumed Capacity is High: assets/monitors/rec_mon_read_cap_high.json
    Write Consumed Capacity is High: assets/monitors/rec_mon_write_cap_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
custom_kind: 통합
dependencies: []
description: 표 크기, 읽기/쓰기 용량, 요청 대기 시간 등을 추적하세요.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_id: amazon-dynamodb
integration_title: Amazon DynamoDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_dynamodb
public_title: Amazon DynamoDB
short_description: 빠르고 유연한 NoSQL 데이터베이스 서비스인 Amazon DynamoDB
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: 빠르고 유연한 NoSQL 데이터베이스 서비스인 Amazon DynamoDB
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon DynamoDB
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![DynamoDB 기본 대시보드][1]

## 개요

Amazon DynamoDB는 AWS 포트폴리오의 일부인 완전관리형 NoSQL 데이터베이스 클라우드 서비스입니다. 빠르고 쉽게 확장할 수 있으며 대규모 데이터를 처리하는 중에도 매우 낮은 지연을 요구하는 애플리케이션을 지원할 수 있습니다. 문서 및 핵심-값 저장 모델을 모두를 지원하며 데이터베이스 및 분산된 해시 표 등 속성을 제공합니다.

## 설정

### 설치

이미 하지 않은 경우 [Amazon Web Services 통합][2]을 설정합니다.

### 메트릭 수집

1. [AWS 통합 페이지][3]에서 `Metric Collection` 탭에 `DynamoDB`가 활성화되어 있습니다.
2. Amazon DynamoDB 메트릭를 수집하려면 [Datadog IAM 정책][4]에 이러한 권한을 추가합니다.

    - `dynamodb:ListTables`: 사용 가능한 DynamoDB 표를 목록화하는 데 사용됩니다.
    - `dynamodb:DescribeTable`: 메트릭을 표 크기 또는 항목 개수로 추가할 수 있습니다.
    - `dynamodb:ListTagsOfResource`: DynamoDB 리소스에서 태그를 모두 수집하는 데 사용됩니다.

    자세한 내용은 AWS 웹사이트의 [DynamoDB 정책][5]을 참고하세요.

3. [Datadog - Amazon DynamoDB 통합][6]을 설치합니다.

### 로그 수집

#### 로깅 활성화

AWS CloudTrail에서 [트레일을 생성][7]한 다음 로그를 작성할 S3 버킷을 선택합니다.

#### Datadog로 로그 전송

1. 이미 하지 않은 경우 AWS 계정에서 [Datadog 포워더(Forwarder) 람다 함수][8]를 설정하세요.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동합니다. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. 트리거 설정에 대해 **S3** 트리거를 선택합니다.
4. Amazon DynamoDB가 포함된 S3 버킷을 선택합니다.
5. 이벤트 유형을 `All object create events`로 남겨둡니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

 [Log Explorer][9]로 이동해 로그를 탐색합니다.

AWS 서비스 로그 수집에 대한 자세한 정보는 [Datadog Lambda 함수를 사용해 AWS 서비스 로그 전송][10]을 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon-dynamodb" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon DynamoDB 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon DynamoDB 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의하세요.

[1]: images/dynamodb.png
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-dynamodb
[7]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[8]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[11]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_dynamodb/assets/metrics/metric-spec.yaml
[12]: https://docs.datadoghq.com/ko/help/