---
categories:
- aws
- cloud
- 데이터 스토어
- 로그 수집
custom_kind: integration
dependencies: []
description: "주요 AWS Elemental MediaStore\b 메트릭을 추적하세요."
doc_link: https://docs.datadoghq.com/integrations/amazon_mediastore/
draft: false
git_integration_title: amazon_mediastore
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaStore
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mediastore
public_title: Datadog-AWS Elemental MediaStore 통합
short_description: "주요 AWS Elemental MediaStore\b 메트릭을 추적하세요."
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Elemental MediaStore는 미디어에 최적화된 AWS 스토리지 서비스입니다.

Datadog에서 모든 AWS Elemental MediaStore 메트릭을 보려면 이 통합을 활성화하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 타일][2]에서 메트릭 수집에 `MediaStore`가
   체크되어 있는지 확인하세요.
2. [Datadog - AWS Elemental MediaStore 통합][3]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_mediastore" >}}


### 이벤트

AWS Elemental MediaStore 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS Elemental MediaStore 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediastore
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediastore/amazon_mediastore_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/
