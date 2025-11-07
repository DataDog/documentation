---
categories:
- aws
- 캐싱(caching)
- cloud
- 로그 수집
custom_kind: integration
dependencies: []
description: 주요 Amazon DynamoDB Accelerator (DAX) 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb_accelerator/
draft: false
git_integration_title: amazon_dynamodb_accelerator
has_logo: true
integration_id: ''
integration_title: Amazon DynamoDB Accelerator (DAX)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_dynamodb_accelerator
public_title: Datadog-Amazon DynamoDB Accelerator (DAX) 통합
short_description: 주요 Amazon DynamoDB Accelerator (DAX) 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon DynamoDB Accelerator(DAX)는 까다로운 애플리케이션을 위한 빠른 인메모리 성능의 이점을 누릴 수 있는 DynamoDB 호환 캐싱 서비스입니다.

Datadog에서 모든 Amazon DynamoDB Accelerator (DAX) 메트릭을 보려면 이 통합을 활성화하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 타일][2]에서 `DynamoDBAccelerator`가 체크되어 있는지 확인하세요.
   체크되어 있는지 확인하세요.
2. [Datadog - Amazon DynamoDB Accelerator 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_dynamodb_accelerator" >}}


### 이벤트

Amazon DynamoDB Accelerator (DAX) 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon DynamoDB Accelerator (DAX) 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-DynamoDB-accelerator
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_DynamoDB_accelerator/amazon_DynamoDB_accelerator_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/
