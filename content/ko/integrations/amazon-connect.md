---
aliases:
- /ko/integrations/amazon_connect
app_id: amazon-connect
categories:
- cloud
- aws
- log collection
custom_kind: integration
description: Amazon Connects는 셀프 서비스 구성을 제공하며 동적이고 개인적이며 자연스러운 고객 참여를 가능케 합니다.
media: []
title: Amazon Connect
---
## 개요

Amazon Connect는 자체 서비스 설정을 제공하여 역동적이고 개인적이며 자연스러운 고객 참여를 활성화합니다.

이 통합을 활성화하면 Datadog에서 모든 Connect 메트릭을 볼 수 있습니다.

## 설정

### 설치

아직 하지 않았다면 먼저 [Amazon Web Services 통합](https://docs.datadoghq.com/integrations/amazon_web_services/)을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지](https://app.datadoghq.com/integrations/amazon-web-services)에서 `Metric Collection` 탭 아래에  `Connect`가 활성화되어 있는지 확인합니다.
1. [Datadog - Amazon Connect 통합](https://app.datadoghq.com/integrations/amazon-connect)을 설치합니다.

### 로그 수집

#### 로깅 활성화

Amazon Connect를 설정해 S3 버킷이나 클라우드와치(CloudWatch)로 로그를 전송합니다.

**참고**: S3 버킷에 기록하면 `amazon_connect`를 _대상 접두어_로 설정합니다.

#### Datadog로 로그 전송

1. 아직 하지 않았다면 먼저 [Datadog Forwarder 람다 함수](https://docs.datadoghq.com/logs/guide/forwarder/)를 설정하세요.

1. 람다 함수가 설치되면 AWS  콘솔에서 Amazon Connect 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동 트리거를 추가합니다.

   - [S3 버킷에 수동 트리거 추가](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group에 수동 트리거 추가](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.connect.call_back_not_dialable_number** <br>(count) | 인스턴스에서 발신이 허용되지 않은 국가의 고객 번호로 인해 대기 중인 고객 콜백을 연결할 수 없었던 평균 횟수.|
| **aws.connect.call_back_not_dialable_number.maximum** <br>(count) | 인스턴스에서 발신이 허용되지 않은 국가의 고객 번호로 인해 대기 중인 고객 콜백을 연결할 수 없었던 최대 횟수.|
| **aws.connect.call_back_not_dialable_number.minimum** <br>(count) | 인스턴스에서 발신이 허용되지 않은 국가의 고객 번호로 인해 대기 중인 고객 콜백을 연결할 수 없었던 최소 횟수.|
| **aws.connect.call_recording_upload_error** <br>(count) | 인스턴스를 위해 구성된 Amazon S3 버킷에 업로드하는 데 실패한 호출 레코딩 평균 개수.|
| **aws.connect.call_recording_upload_error.maximum** <br>(count) | 인스턴스를 위해 구성된 Amazon S3 버킷에 업로드하는 데 실패한 호출 레코딩 최대 개수.|
| **aws.connect.call_recording_upload_error.minimum** <br>(count) | 인스턴스를 위해 구성된 Amazon S3 버킷에 업로드하는 데 실패한 호출 레코딩 최소 개수.|
| **aws.connect.calls_breaching_concurrency_quota** <br>(count) | 인스턴스의 동시 활성 호출 한도를 초과한 음성의 평균 개수.|
| **aws.connect.calls_breaching_concurrency_quota.maximum** <br>(count) | 인스턴스의 동시 활성 호출 한도를 초과한 음성의 최대 개수.|
| **aws.connect.calls_breaching_concurrency_quota.minimum** <br>(count) | 인스턴스의 동시 활성 호출 한도를 초과한 음성의 최소 개수.|
| **aws.connect.calls_per_interval** <br>(count) | 인스턴스에서 초당 수신하거나 배정된 수신 및 발신 음성 호출의 평균 개수.|
| **aws.connect.calls_per_interval.maximum** <br>(count) | 인스턴스에서 초당 수신하거나 배정된 수신 및 발신 음성 호출의 최대 개수.|
| **aws.connect.calls_per_interval.minimum** <br>(count) | 인스턴스에서 초당 수신하거나 배정된 수신 및 발신 음성 호출의 최소 개수.|
| **aws.connect.concurrent_calls** <br>(count) | 대시보드에 데이터가 표시된 시간에 인스턴스의 동시 활성 음성 호출 평균 개수.|
| **aws.connect.concurrent_calls.maximum** <br>(count) | 대시보드에 데이터가 표시된 시간에 인스턴스의 동시 활성 음성 호출 최대 개수.|
| **aws.connect.concurrent_calls.minimum** <br>(count) | 대시보드에 데이터가 표시된 시간에 인스턴스의 동시 활성 음성 호출 최소 개수.|
| **aws.connect.concurrent_calls_percentage** <br>(gauge) | 인스턴스에서 사용된 동시 활성 음성 호출 서비스 한도의 평균 백분율.<br>_percent로 표시_ |
| **aws.connect.concurrent_calls_percentage.maximum** <br>(gauge) | 인스턴스에서 사용된 동시 활성 음성 호출 서비스 한도의 최대 백분율.<br>_percent로 표시_ |
| **aws.connect.concurrent_calls_percentage.minimum** <br>(gauge) | 인스턴스에서 사용된 동시 활성 음성 호출 서비스 한도의 최소 백분율.<br>_percent로 표시_ |
| **aws.connect.contact_flow_errors** <br>(count) | 컨택트 플로우 처리 중 오류 분기가 실행된 평균 횟수.|
| **aws.connect.contact_flow_errors.maximum** <br>(count) | 컨택트 플로우 처리 중 오류 분기가 실행된 최대 횟수.|
| **aws.connect.contact_flow_errors.minimum** <br>(count) | 컨택트 플로우 처리 중 오류 분기가 실행된 최소 횟수.|
| **aws.connect.contact_flow_fatal_errors** <br>(count) | 시스템 오류로 컨택 플로우가 실행에 실패한 평균 횟수.|
| **aws.connect.contact_flow_fatal_errors.maximum** <br>(count) | 시스템 오류로 컨택 플로우가 실행에 실패한 최대 횟수.|
| **aws.connect.contact_flow_fatal_errors.minimum** <br>(count) | 시스템 오류로 컨택 플로우가 실행에 실패한 최소 횟수.|
| **aws.connect.longest_queue_wait_time** <br>(count) | 대기열에서 컨택이 대기한 시간(초) 중 최장 시간의 평균값으로, 새로 고침 간격 동안 컨택이 대기열에서 대기한 시간.|
| **aws.connect.longest_queue_wait_time.maximum** <br>(count) | 대기열에서 컨택이 대기한 시간(초) 중 최장 시간의 평균값으로, 새로 고침 간격 동안 컨택이 대기열에서 대기한 시간입니다.|
| **aws.connect.longest_queue_wait_time.minimum** <br>(count) | 대기열에서 컨택이 대기한 시간(초) 중 최장 시간의 평균값으로, 새로 고침 간격 동안 컨택이 대기열에서 대기한 시간입니다.|
| **aws.connect.misconfigured_phone_numbers** <br>(count) | 전화 번호가 컨택 플로우와 연결되지 않아 호출이 실패한 평균 횟수.|
| **aws.connect.misconfigured_phone_numbers.maximum** <br>(count) | 전화 번호가 컨택 플로우와 연결되지 않아 호출이 실패한 최대 횟수.|
| **aws.connect.misconfigured_phone_numbers.minimum** <br>(count) | 전화 번호가 컨택 플로우와 연결되지 않아 호출이 실패한 최소 횟수.|
| **aws.connect.missed_calls** <br>(count) | 새로 고침 간격 동안 에이전트 호출에서 누락한 음성 호출의 평균 개수.|
| **aws.connect.missed_calls.maximum** <br>(count) | 새로 고침 간격 동안 에이전트 호출에서 누락한 음성 호출의 최대 개수.|
| **aws.connect.missed_calls.minimum** <br>(count) | 새로 고침 간격 동안 에이전트 호출에서 누락한 음성 호출의 최소 개수.|
| **aws.connect.public_signing_key_usage** <br>(count) | 컨택 플로우에서 고객 입력을 암호화하는 데 컨택 플로우 보안 키(공개 서명 키)가 사용된 평균 횟수.|
| **aws.connect.public_signing_key_usage.maximum** <br>(count) | 컨택 플로우에서 고객 입력을 암호화하는 데 컨택 플로우 보안 키(공개 서명 키)가 사용된 최대 횟수.|
| **aws.connect.public_signing_key_usage.minimum** <br>(count) | 컨택 플로우에서 고객 입력을 암호화하는 데 컨택 플로우 보안 키(공개 서명 키)가 사용된 최소 횟수.|
| **aws.connect.queue_size** <br>(count) | 대기열의 평균 컨택 개수.|
| **aws.connect.queue_size.maximum** <br>(count) | 대기열의 최대 컨택 개수.|
| **aws.connect.queue_size.minimum** <br>(count) | 대기열의 최소 컨택 개수.|
| **aws.connect.throttled_calls** <br>(count) | 초당 호출 비율이 최대 지원 한도를 초과하여 거부된 음성 호출의 평균 개수.|
| **aws.connect.throttled_calls.maximum** <br>(count) | 초당 호출 비율이 최대 지원 한도를 초과하여 거부된 음성 호출의 최대 개수.|
| **aws.connect.throttled_calls.minimum** <br>(count) | 초당 호출 비율이 최대 지원 한도를 초과하여 거부된 음성 호출의 최소 개수.|
| **aws.connect.to_instance_packet_loss_rate** <br>(count) | 10초마다 보고되는 인스턴스에서 호출의 패킷 손실 평균 비율.|
| **aws.connect.to_instance_packet_loss_rate.maximum** <br>(count) | 10초마다 보고되는 인스턴스에서 호출의 패킷 손실 최대 비율.|
| **aws.connect.to_instance_packet_loss_rate.minimum** <br>(count) | 10초마다 보고되는 인스턴스에서 호출의 패킷 손실 최소 비율.|
| **aws.connect.queue_capacity_exceeded_error** <br>(count) | 대기열이 가득 차 거부된 호출의 평균 개수.|
| **aws.connect.queue_capacity_exceeded_error.maximum** <br>(count) | 대기열이 가득 차 거부된 호출의 최대 개수.|
| **aws.connect.queue_capacity_exceeded_error.minimum** <br>(count) | 대기열이 가득 차 거부된 호출의 최소 개수.|

### 이벤트

Amazon Connect 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon Connect 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.