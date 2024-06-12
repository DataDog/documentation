---
aliases:
- /ko/integrations/awssqs/
categories:
- aws
- cloud
- log collection
dependencies: []
description: 대기열(큐) 크기, 평균 메시지 크기, 메시지 수 등을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_sqs/
draft: false
git_integration_title: amazon_sqs
has_logo: true
integration_id: amazon-sqs
integration_title: Amazon 심플 큐 서비스 (SQS)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  sqs_message_processing_time: assets/monitors/sqs_message_processing_time.json
  sqs_message_queue_anomaly: assets/monitors/sqs_message_queue_anomaly.json
name: amazon_sqs
public_title: Datadog-Amazon 심플 큐 서비스 (SQS) 통합
short_description: 대기열(큐) 크기, 평균 메시지 크기, 메시지 수 등을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="SQS 대시보드" popup="true">}}

## 개요

빠르고 신뢰할 수 있으며 확장 가능한 완전 관리형 메시지 대기열 서비스인 Amazon 심플 큐 서비스(SQS)를 만나보세요.

본 통합 기능을 활성화하면 Datadog에서 모든 SQS 메트릭을 확인할 수 있습니다.

## 설정

### 설치

아직 설치하지 않으셨다면, [Amazon Web Services 통합을 먼저][1] 설치하시기 바랍니다.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 하단의 `SQS`이 활성화되어 있는지 확인합니다.
2. Amazon SQS 메트릭를 수집하려면 [Datadog IAM 정책][3]에 다음 권한을 추가합니다.

    - `sqs:ListQueues`: 목록 대기열(큐)에 사용됩니다.
    - `tag:GetResources`: 커스텀 태그를 SQS 대기열(큐)에 적용합니다.

    자세한 내용을 확인하려면 AWS 웹사이트의 [SQS 정책][4]을 참조하세요.

3. [Datadog - Amazon SQS 통합][5]을 설치합니다.

### 로그 수집

#### SQS 로깅 활성화

[AWS CloudTrail을 사용하여 Amazon SQS API 호출 로깅하기][6]를 참조하여 트레일을 설정합니다. 트레일 정의 시 로그를 작성할 다음 S3 버킷을 선택합니다.

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="CloudTrail 로깅" popup="true" style="width:70%;">}}

#### Datadog에 로그 보내기

1. 아직 설정하지 않았다면,  [Datadog 로그 수집 AWS Lambda 함수][7]를 설정하세요.
2. Lambda 함수를 설치한 다음 AWS 콘솔에서 Amazon SQS 로그를 포함하는 S3 버킷에 트리거를 수동으로 추가합니다. Lambda 함수에서 다음 트리거 목록의 S3를 클릭합니다.
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 트리거 설정" popup="true" style="width:70%;">}}
   Amazon SQS 로그가 포함된 S3 버킷을 선택하여 트리거를 설정하고 이벤트 유형을 `Object Created (All)`로 변경한 다음 추가 버튼을 클릭합니다.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda 트리거 설정" popup="true" style="width:70%;">}}

완료되면 [Datadog 로그 익스플로러][8]를 사용하여 로그를 확인합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_sqs" >}}


AWS로부터 받은 호스트 이름, 보안 그룹 및 그 외의 모든 메트릭은 AWS 콘솔에 표시되는 태그와 동일한 태그에 배정됩니다.

### 이벤트 

Amazon SQS 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon SQS 통합은 서비스 점검을 포함하지 않습니다.

## 즉시 사용 가능한 모니터링

Amazon SQS 통합은 즉시 사용 가능한 모니터링 기능을 제공하여 성능을 모니터링하고 최적화합니다.

- Amazon SQS 대시보드: 즉시 사용 가능한 [Amazon SQS 대시보드][10]를 사용하여 SQS 대기열(큐)에 대한 포괄적인 개요를 확인해 보세요.
- 권장 모니터링: [권장 Amazon SQS 모니터링][11]을 활성화하여 문제를 사전에 감지하고 적시에 알림을 받습니다.

## 문제 해결

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-sqs
[6]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sqs/amazon_sqs_metadata.csv
[10]: https://app.datadoghq.com/dash/integration/6/aws-sqs
[11]: https://app.datadoghq.com/monitors/recommended
[12]: https://docs.datadoghq.com/ko/help/