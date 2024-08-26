---
app_id: amazon-s3
app_uuid: e7f3a9d8-7ddc-4ed4-b70c-9c95ef5f8581
assets:
  dashboards:
    aws_s3: assets/dashboards/amazon_s3_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.s3.bucket_size_bytes
      metadata_path: metadata.csv
      prefix: aws.s3
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 157
    source_type_name: Amazon S3
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- data stores
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_s3
integration_id: amazon-s3
integration_title: Amazon S3
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_s3
public_title: Amazon S3
short_description: Amazon S3는 가용성과 확장성이 뛰어난 클라우드 스토리지 서비스입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::Data Stores
  configuration: README.md#Setup
  description: Amazon S3는 가용성과 확장성이 뛰어난 클라우드 스토리지 서비스입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon S3
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

"Amazon S3는 가용성과 확장성이 뛰어난 클라우드 스토리지 서비스입니다."

이 통합을 활성화하여 Datadog에서 모든 S3 메트릭을 확인하세요.

참고: 이 통합이 완전히 활성화되려면 's3:GetBucketTagging' 권한이 필요합니다.

참고: S3 요청 메트릭은 버킷 자체에서 활성화되어야 합니다. [AWS 설명서][1]를 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][2]을 설정합니다. 

### 메트릭 수집

1. [AWS 통합 페이지][3]의 `Metric Collection` 탭에서 `S3`가 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon S3 통합][4]을 설치합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_s3" >}}


### 이벤트

Amazon S3 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Amazon S3 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-billing
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_s3/metadata.csv
[6]: https://docs.datadoghq.com/ko/help/