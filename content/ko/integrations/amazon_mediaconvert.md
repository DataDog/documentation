---
app_id: amazon-mediaconvert
app_uuid: 9ec40305-4c25-41ee-afd8-cc6cc820dc36
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.mediaconvert.hdoutput_duration
      metadata_path: metadata.csv
      prefix: aws.mediaconvert.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 245
    source_type_name: Amazon MediaConvert
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- 메트릭
- 로그 수집
- 클라우드
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_mediaconvert
integration_id: amazon-mediaconvert
integration_title: Amazon MediaConvert
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_mediaconvert
public_title: Amazon MediaConvert
short_description: 텔레비전 및 연결 디바이스에서 비디오 형식을 만들고 압축하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Log Collection
  - Category::Cloud
  configuration: README.md#Setup
  description: 텔레비전 및 연결 디바이스에서 비디오 형식을 만들고 압축하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MediaConvert
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Amazon Elemental MediaConvert는 오프라인 비디오 컨텐츠의 형식을 지정하고 압축해 텔레비전이나 연결된 디바이스로 전송하는 서비스입니다.

이 통합을 활성화하면 Elemental MediaConvert 메트릭 전체를 Datadog에서 확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래 `MediaConvert`가 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon Elemental MediaConvert 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

S3 버킷이나 CloudWatch로 로그를 전송하도록 Amazon ElementalConvert를 구성하세요.

**참고**: S3 버킷에 로깅하는 경우 `amazon_mediaconvert`가 _Target prefix_로 지정되어야 합니다.

#### Datadog에 로그 전송

1. 아직 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][4]를 설정하세요.
2. Lambda 함수를 설치한 후 AWS 콘솔에서 Amazon Elemental MediaConvert 로그를 포함하는 S3 버킷이나 CloudWatch 로그 그룹에 수동으로 트리거를 추가하세요.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [CloudWatch 로그 그룹에 수동으로 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_mediaconvert" >}}


### 이벤트

Amazon Elemental MediaConvert 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Amazon Elemental MediaConvert 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediaconvert
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconvert/amazon_mediaconvert_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/