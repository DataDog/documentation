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
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon S3는 가용성과 확장성이 뛰어난 클라우드 스토리지 서비스입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon S3
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
<div class="alert alert-info">Monitor S3 metrics and optimize storage costs at the prefix level with <a href="https://www.datadoghq.com/product-preview/storage-monitoring/"> Storage Monitoring (Preview)</a>.</div>


## 개요

"Amazon S3는 가용성과 확장성이 뛰어난 클라우드 스토리지 서비스입니다."

이 통합을 활성화하여 Datadog에서 모든 S3 메트릭을 확인하세요.

참고: 이 통합이 완전히 활성화되려면 's3:GetBucketTagging' 권한이 필요합니다.

참고: S3 요청 메트릭은 버킷 자체에서 활성화되어야 합니다. [AWS 설명서][1]를 참조하세요.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][2]을 설정하세요. 

### 메트릭 수집

1. [AWS 통합 페이지][3]의 `Metric Collection` 탭에서 `S3`가 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon S3 통합][4]을 설치합니다.

### 로그 수집

#### S3 액세스 로그 활성화

1. S3 버킷으로 이동합니다.
2. **Properties**를 클릭합니다.
3. Services Access Logging 섹션으로 이동해 **Edit**을 클릭합니다.
4. **Enable**를 선택합니다.
5. 로그를 전송할 S3 버킷을 선택합니다.

 더 자세한 정보는 [Amazon S3 서버 액세스 로깅 활성화][5]를 참고하세요

#### Datadog로 로그 전송

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog Forwarder Lambda 함수][6]를 설정하세요.
2. Lambda 함수가 설치되면 S3 액세스 로그를 수집하는 데는 두 가지 방법이 있습니다.

    - 자동: Datadog가 일련의 권한을 가지고 액세스할 수 있도록 하면 S3 로그가 자동으로 관리됩니다. Datadog Forwarder Lambda 함수에서 자동 로그 수집을 설정하는 방법에 대한 자세한 정보는 [자동으로 트리거 설정][7]을 참조하세요.
    - 수동: AWS 콘솔에서 S3 액세스 로그가 포함된 S3 버킷에 트리거를 추가합니다. [수동 설치 단계](#manual-installation-steps)를 참조하세요.

#### 수동 설치 단계

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog Forwarder Lambda 함수][6]를 설정하세요.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. 트리거 설정에 대해 **S3** 트리거를 선택합니다.
4. S3 로그를 포함하는 S3 버킷을 선택합니다.
5. 이벤트 유형을 `All object create events`로 남겨둡니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[로그 탐색기][8]로 이동해 로그를 살펴보기 시작합니다.

AWS 서비스 로그 수집에 대한 자세한 내용은 , [Datadog 람다 함수][9]에 포함된 AWS 서비스 로그 전송]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon-s3" >}}


### 이벤트

Amazon S3 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Amazon S3 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3
[5]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html
[6]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_s3/metadata.csv
[11]: https://docs.datadoghq.com/ko/help/