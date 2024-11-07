---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: 핵심 Amazon Athena 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_athena/
draft: false
git_integration_title: amazon_athena
has_logo: true
integration_id: ''
integration_title: Amazon Athena
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_athena
public_title: Datadog-Amazon Athena 통합
short_description: 핵심 Amazon Athena 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Athena는 양방향 쿼리 서비스로, 표준 SQL을 사용해 Amazon S3(Amazon Simple Storage Service)에서 직접 데이터를 분석하는 것을 용이하게 합니다.

이 통합을 활성화해 Datadog에서 모든 Athena 메트릭을 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭에 `Athena`가 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon Athena 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_athena" >}}


### 이벤트

Amazon Athena 통합이 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Athena 통합이 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-athena
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_athena/amazon_athena_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/