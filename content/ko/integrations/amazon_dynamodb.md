---
aliases:
- /ko/integrations/awsdynamo/
categories:
- cloud
- data stores
- aws
- log collection
dependencies: []
description: 표 크기, 읽기/쓰기 용량, 요청 대기 시간 등을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_id: ''
integration_title: Amazon DynamoDB
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_dynamodb
public_title: Datadog-Amazon DynamoDB 통합
short_description: 표 크기, 읽기/쓰기 용량, 요청 대기 시간 등을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="DynamoDB 기본 대시보드" popup="true">}}

## 개요

Amazon DynamoDB는 AWS 포트폴리오의 일부인 완전관리형 NoSQL 데이터베이스 클라우드 서비스입니다. 빠르고 쉽게 확장할 수 있으며 대규모 데이터를 처리하는 중에도 매우 낮은 지연을 요구하는 애플리케이션을 지원할 수 있습니다. 문서 및 핵심-값 저장 모델을 모두를 지원하며 데이터베이스 및 분산된 해시 표 등 속성을 제공합니다.

## 설정

### 설치

아직 설치하지 않으셨다면, [Amazon Web Services 통합을 먼저][1] 설치하시기 바랍니다.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭에 `DynamoDB`가 활성화되어 있습니다.
2. Amazon DynamoDB 메트릭를 수집하려면 [Datadog IAM 정책][3]에 이러한 권한을 추가합니다.

    - `dynamodb:ListTables`: 사용 가능한 DynamoDB 표를 목록화하는 데 사용됩니다.
    - `dynamodb:DescribeTable`: 메트릭을 표 크기 또는 항목 개수로 추가할 수 있습니다.
    - `dynamodb:ListTagsOfResource`: DynamoDB 리소스에서 태그를 모두 수집하는 데 사용됩니다.

    자세한 내용은 AWS 웹사이트의 [DynamoDB 정책][4]을 참조하세요.

3. [Datadog - Amazon DynamoDB 통합][5]을 설치합니다.

### 로그 수집

#### 로깅 활성화

AWS CloudTrail에서 [트레일을 생성][6]한 다음 기록을 작성할 S3 버킨을 선택합니다.

#### Datadog에 로그 보내기

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog 포워더 람다 함수][7]를 설정하세요. 
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. 트리거 설정에 대해 **S3** 트리거를 선택합니다.
4. Amazon DynamoDB가 포함된 S3 버킷을 선택합니다.
5. 이벤트 유형을 `All object create events`로 남겨둡니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[로그 탐색기][8]로 이동해 로그를 살펴보기 시작합니다.

AWS 서비스 로그 수집에 대한 자세한 내용은 , [Datadog 람다 함수][9]에 포함된 AWS 서비스 로그 전송]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_dynamodb" >}}


AWS로부터 받은 호스트 이름, 보안 그룹 및 그 외의 모든 메트릭은 AWS 콘솔에 표시되는 태그와 동일한 태그에 배정됩니다.

### 이벤트

Amazon DynamoDB 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon DynamoDB 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해 주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-dynamodb
[6]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[7]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dynamodb/amazon_dynamodb_metadata.csv
[11]: https://docs.datadoghq.com/ko/help/