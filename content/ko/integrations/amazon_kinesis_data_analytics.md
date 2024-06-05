---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: Azure Kinesis 데이터 분석의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis_data_analytics/
draft: false
git_integration_title: amazon_kinesis_data_analytics
has_logo: true
integration_id: ''
integration_title: Amazon Kinesis 데이터 분석
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: amazon_kinesis_data_analytics
public_title: Datadog-Amazon Kinesis 데이터 분석 통합
short_description: Azure Kinesis 데이터 분석의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Kinesis 데이터 분석으로 Apache Flink를 사용해 스트리밍 데이터를
실시간으로 변환, 쿼리 수집, 분석합니다.

본 통합을 활성화하면 Datadog에서 모든  Amazon Kinesis 데이터 분석 메트릭을
확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Kinesis Analytics`가 `Metric Collection`탭에서 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon Kinesis 데이터 분석 통합][3]을 설치하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_kinesis_data_analytics" >}}


### 이벤트

Amazon Kinesis 데이터 분석 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Kinesis 데이터 분석 통합은 서비스 점검을
포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-kinesis-data-analytics
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis_data_analytics/amazon_kinesis_data_analytics_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/