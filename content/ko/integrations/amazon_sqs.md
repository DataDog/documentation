---
app_id: amazon-sqs
app_uuid: 3a036cf4-b953-441a-ad13-a99f2b8a684e
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.sqs.sent_message_size
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.sqs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 102
    source_type_name: Amazon SQS
  monitors:
    SQS Message Processing Time Monitor: assets/monitors/sqs_message_processing_time.json
    SQS Message Queue Anomaly Monitor: assets/monitors/sqs_message_queue_anomaly.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- log collection
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_sqs
integration_id: amazon-sqs
integration_title: Amazon SQS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_sqs
public_title: Amazon SQS
short_description: Amazon 심플 큐 서비스(SQS)는 빠르고 안정적이며 확장 가능한 완전 관리형 메시지 대기열 서비스입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::로그 수집
  - Offering::Integration
  - Product::데이터 스트림 모니터링
  configuration: README.md#Setup
  description: Amazon 심플 큐 서비스(SQS)는 빠르고 안정적이며 확장 가능한 완전 관리형 메시지 대기열 서비스입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon SQS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![SQS 대시보드][1]

## 개요

빠르고 신뢰할 수 있으며 확장 가능한 완전 관리형 메시지 대기열 서비스인 Amazon 심플 큐 서비스(SQS)를 만나보세요.

본 통합 기능을 활성화하면 Datadog에서 모든 SQS 메트릭을 확인할 수 있습니다.

## 설정

### 설치

이미 하지 않았다면 [먼저 Amazon Web Services 통합][1]을 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][3]에서 `Metric Collection` 탭 하단의 `SQS`이 활성화되어 있는지 확인합니다.
2. Amazon SQS 메트릭를 수집하려면 [Datadog IAM 정책][4]에 다음 권한을 추가합니다.

    - `sqs:ListQueues`: 목록 대기열(큐)에 사용됩니다.
    - `tag:GetResources`: 커스텀 태그를 SQS 대기열(큐)에 적용합니다.

    자세한 내용을 확인하려면 AWS 웹사이트의 [SQS 정책][5]을 참조하세요.

3. [Datadog - Amazon SQS 통합][6]을 설치합니다.

### 로그 수집

#### SQS 로깅 활성화

[AWS CloudTrail을 사용하여 Amazon SQS API 호출 로깅하기][7]를 참조하여 트레일을 설정합니다. 트레일 정의 시 로그를 작성할 다음 S3 버킷을 선택합니다.

![CloudTrail 로깅][8]

#### Datadog로 로그 전송

1. 아직 설정하지 않았다면 [Datadog 로그 컬렉션 AWS 람다 함수][9]를 설정하세요.
2. Lambda 함수를 설치한 다음 AWS 콘솔에서 Amazon SQS 로그를 포함하는 S3 버킷에 트리거를 수동으로 추가합니다. Lambda 함수에서 다음 트리거 목록의 S3를 클릭합니다.
   ![S3 트리거 구성][10]
   Amazon SQS 로그가 포함된 S3 버킷을 선택하여 트리거를 설정하고 이벤트 유형을 `Object Created (All)`로 변경한 다음 추가 버튼을 클릭합니다.
   ![S3 Lambda 트리거 구성][11]

트리거가 추가되면 [Datadog Log Explorer][12]를 사용하여 로그를 확인하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon-sqs" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon SQS 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon SQS 통합은 서비스 점검을 포함하지 않습니다.

## 즉시 사용 가능한 모니터링

Amazon SQS 통합은 즉시 사용 가능한 모니터링 기능을 제공하여 성능을 모니터링하고 최적화합니다.

- Amazon SQS 대시보드: 즉시 사용 가능한 [Amazon SQS 대시보드][14]를 사용해 SQS 대기열에 관한 포괄적인 개요를 확인할 수 있습니다.
- 권장 모니터링: [권장 Amazon SQS 모니터링][15]을 활성화하여 문제를 사전에 감지하고 적시에 알림을 받습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][16]에 문의해 주세요.

[1]: images/sqsdashboard.png
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-sqs
[7]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[8]: images/cloudtrail_logging.png
[9]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[10]: images/s3_trigger_configuration.png
[11]: images/s3_lambda_trigger_configuration.png
[12]: https://app.datadoghq.com/logs
[13]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_sqs/assets/metrics/metric-spec.yaml
[14]: https://app.datadoghq.com/dash/integration/6/aws-sqs
[15]: https://app.datadoghq.com/monitors/recommended
[16]: https://docs.datadoghq.com/ko/help/