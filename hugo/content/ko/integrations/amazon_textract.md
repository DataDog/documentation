---
categories:
- 자동화
- aws
- cloud
- 로그 수집
- ai/ml
custom_kind: integration
dependencies: []
description: 주요 Amazon Textract 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_textract/
draft: false
git_integration_title: amazon_textract
has_logo: true
integration_id: ''
integration_title: Amazon Textract
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_textract
public_title: Datadog-Amazon Textract 통합
short_description: 주요 Amazon Textract 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->

## 개요

Amazon Textract는 스캔한 문서에서 텍스트, 손글씨 및 데이터를 자동으로 추출하는 머신 러닝 서비스입니다.

이 통합을 활성화해 Datadog에서 모든 Amazon Textract 메트릭을 확인하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]의 `Metric Collection` 탭에서 `Textract`가 활성화되어 있는지 확인하세요.
2.  [Datadog - Amazon Textract 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_textract" >}}


### 이벤트

Amazon Textract 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Textract 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-textract
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_textract/amazon_textract_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/
