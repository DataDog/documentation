---
app_id: amazon_rekognition
categories:
- 클라우드
- aws
- 로그 수집
custom_kind: 통합
description: 핵심 Amazon Rekognition 메트릭을 수집하세요.
title: Amazon Rekognition
---
## 개요

Amazon Rekognition는 애플리케이션에 이미지와 비디오 분석을 손쉽게 추가할 수 있도록 해줍니다. Rekognition API에 이미지나 비디오를 제공하기만 하면 서비스가 개체, 사람, 텍스트, 장면 및 활동을 식별할 수 있습니다.

이 통합을 활성화해 Datadog에서 모든 Rekognition 메트릭을 참조하세요.

## 설정

### 설치

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### 메트릭 수집

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `Rekognition` is enabled under the `Metric Collection` tab.
1. Install the [Datadog - Amazon Rekognition integration](https://app.datadoghq.com/integrations/amazon-rekognition).

### 로그 수집

#### 로깅 활성화

Amazon Rekognition을 설정해 S3 버킷 또는 클라우드와치(CloudWatch)로 로그를 전송하세요.

**참고**: S3 버킷에 로그를 작성한 경우 `amazon_rekognition`이 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog로 로그 전송

1. If you haven’t already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).

1. 람다 함수가 설치되면 AWS 콘솔에서 Amazon Rekognition 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동으로 트리거를 추가합니다.

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.rekognition.deteceted_label_count** <br>(count) | The average number of labels detected with the DetectLabels operation.|
| **aws.rekognition.deteceted_label_count.sum** <br>(count) | The sum of the number of labels detected with the DetectLabels operation.|
| **aws.rekognition.detected_face_count** <br>(count) | The average number of faces detected with the IndexFaces or DetectFaces operation.|
| **aws.rekognition.detected_face_count.sum** <br>(count) | The sum of the number of faces detected with the IndexFaces or DetectFaces operation.|
| **aws.rekognition.response_time** <br>(count) | The time in milliseconds for Rekognition to compute the response.<br>_Shown as millisecond_ |
| **aws.rekognition.response_time.data_samples** <br>(count) | The time in milliseconds for Rekognition to compute the response.|
| **aws.rekognition.server_error_count** <br>(count) | The number of server errors.|
| **aws.rekognition.server_error_count.sum** <br>(count) | The sum of the number of server errors.|
| **aws.rekognition.successful_request_count** <br>(count) | The average number of successful requests.|
| **aws.rekognition.successful_request_count.sum** <br>(count) | The sum of the number of successful requests.|
| **aws.rekognition.throttled_count** <br>(count) | The average number of throttled requests. Rekognition throttles a request when it receives more requests than the limit of transactions per second set for your account.|
| **aws.rekognition.throttled_count.sum** <br>(count) | The sum of the number of throttled requests. Rekognition throttles a request when it receives more requests than the limit of transactions per second set for your account.|
| **aws.rekognition.user_error_count** <br>(count) | The average number of user errors (invalid parameters - invalid image - no permission etc).|
| **aws.rekognition.user_error_count.sum** <br>(count) | The sum of the number of user errors (invalid parameters - invalid image - no permission etc).|

### 이벤트

Amazon Rekognition 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Rekognition 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.