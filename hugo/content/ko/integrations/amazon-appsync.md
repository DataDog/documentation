---
aliases:
- /ko/integrations/amazon_appsync
app_id: amazon-appsync
categories:
- aws
- cloud
- data stores
- log collection
custom_kind: 통합
description: AppSync의 유연하고 안전한 API로 앱 개발을 단순화하고, 다양한 소스의 데이터에 접근하여 데이터를 결합하세요.
media: []
title: AWS AppSync
---
## 개요

AWS AppSync는 안전하게 액세스하고, 조작하고 하나 이상의 데이터 소스 데이터를 결합하여 유연한 API를 생성하도록 함으로써 애플리케이션 개발을 단순화합니다.

이 통합을 활성화해 Datadog에서 모든 AppSync 메트릭을 참조하세요.

## 설정

### 설치

아직 하지 않았다면 먼저 [Amazon Web Services 통합](https://docs.datadoghq.com/integrations/amazon_web_services/)을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지](https://app.datadoghq.com/integrations/amazon-web-services)에서 `Metric Collection` 탭 아래에 `AppSync`가 활성화되어 있는지 확인하세요.
1. [Datadog - AWS AppSync 통합](https://app.datadoghq.com/integrations/amazon-appsync)을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS AppSync를 설정해 S3 버킷 또는 클라우드와치 중 하나에 로그를 전송합니다.

**참고**: S3 버킷에 로깅하면 `amazon_appsync`가 _Target prefix_로 설정되었는지 확인하세요.

#### Datadog로 로그 전송

1. 아직 하지 않았다면 먼저 [Datadog Forwarder Lambda 함수](https://docs.datadoghq.com/logs/guide/forwarder/)를 설정하세요.

1. 람다 함수가 설치되면, AWS 콘솔에서 AWS AppSync 로그를 포함하는 S3 버킷 또는 클라우드와치에서 수동으로 트리거를 추가합니다.

   - [S3 버킷에 수동 트리거 추가](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group에 수동 트리거 추가](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.appsync.4xxerror** <br>(count) | 잘못된 클라이언트 구성으로 인해 잘못된 요청의 결과로 캡처된 오류 개수.<br>_error로 표시_ |
| **aws.appsync.5xxerror** <br>(count) | GraphQL 쿼리 실행 동안 발생한 오류.<br>_error로 표시_ |
| **aws.appsync.active_connections** <br>(count) | 1분 동안 클라이언트에서 AWS AppSync로의 동시 WebSocket 연결 개수.|
| **aws.appsync.connect_server_error** <br>(count) | 연결 처리 중 AWS AppSync에서 발생한 오류 개수. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.connect_success** <br>(count) | AWS AppSync에 대한 성공적인 WebSocket 연결 수. 구독이 없는 연결도 존재할 수 있습니다. <br>_success로 표시_ |
| **aws.appsync.connection_duration** <br>(count) | 연결이 공개 상태인 시간입니다.<br>_millisecond로 표시_ |
| **aws.appsync.disconnect_client_error** <br>(count) | WebSocket 연결을 종료하는 과정에서 AWS AppSync에서 발생한 클라이언트 오류 수.<br>_error로 표시_ |
| **aws.appsync.disconnect_server_error** <br>(count) | WebSocket 연결을 종료하는 과정에서 AWS AppSync에서 발생한 서버 오류 수.<br>_error로 표시_ |
| **aws.appsync.disconnect_success** <br>(count) | AWS AppSync에서 성공적으로 종료된 WebSocket 연결 수.<br>_success로 표시_ |
| **aws.appsync.latency** <br>(gauge) | AWS AppSync가 클라이언트로부터 요청을 수신한 시점부터 클라이언트에 응답을 반환할 때까지의 평균 시간. 이 값에는 응답이 최종 엔드포인트에 도달하는 데 발생하는 네트워크 지연 시간은 포함되지 않습니다.<br>_millisecond로 표시_ |
| **aws.appsync.latency.maximum** <br>(gauge) | AWS AppSync가 클라이언트로부터 요청을 수신한 시점부터 클라이언트에 응답을 반환할 때까지의 최대 시간. 이 값에는 응답이 최종 엔드포인트에 도달하는 데 발생하는 네트워크 지연 시간은 포함되지 않습니다.<br>_millisecond로 표시_ |
| **aws.appsync.latency.p90** <br>(gauge) | AWS AppSync가 클라이언트로부터 요청을 수신한 시점부터 클라이언트에 응답을 반환할 때까지의 90번째 백분위수 시간. 이 값에는 응답이 최종 엔드포인트에 도달하는 데 발생하는 네트워크 지연 시간은 포함되지 않습니다.<br>_millisecond로 표시_ |
| **aws.appsync.publish_data_message_client_error** <br>(count) | 클라이언트측 오류로 게시에 실패한 구독 이벤트 메시지 개수.<br>_error로 표시_ |
| **aws.appsync.publish_data_message_server_error** <br>(count) | 이벤트 메시지 구독 게시 중 AWS AppSync에서 발생한 오류 개수. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.publish_data_message_size** <br>(gauge) | 게시된 구독 이벤트 메시지 크기.<br>_byte로 표시_ |
| **aws.appsync.publish_data_message_success** <br>(count) | 성공적으로 게시된 구독 이벤트 메시지 개수.<br>_success로 표시_ |
| **aws.appsync.requests** <br>(count) | 계정 내 모든 API가 처리한 요청(쿼리 및 뮤테이션)의 개수.<br>_request로 표시_ |
| **aws.appsync.subscribe_client_error** <br>(count) | 클라이언트 측 오류로 인해 AWS AppSync에서 거부된 구독 개수. 이는 JSON 페이로드가 잘못되었거나, 서비스가 스로틀링되었거나, 인증 설정이 잘못된 경우 발생할 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.subscribe_server_error** <br>(count) | 구독 처리 중 AWS AppSync에서 발생한 오류 개수. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.subscribe_success** <br>(count) | WebSocket을 통해 AWS AppSync에 성공적으로 등록된 구독 개수. 구독이 없는 연결은 존재할 수 있지만, 연결 없이 구독이 존재하는 것은 불가능합니다.<br>_success로 표시_ |
| **aws.appsync.unsubscribe_client_error** <br>(count) | 클라이언트측 오류로 게시에 실패한 구독 취소 개수.<br>_error로 표시_ |
| **aws.appsync.unsubscribe_server_error** <br>(count) | 구독 취소 처리 중 AWS AppSync에서 발생한 오류 개수. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.unsubscribe_success** <br>(count) | AWS AppSync에서 성공적으로 처리된 구독 취소 개수.<br>_success로 표시_ |
| **aws.appsync.active_connections.sum** <br>(count) | 1분 동안 클라이언트에서 AWS AppSync로의 동시 WebSocket 연결 합계.|
| **aws.appsync.active_subscriptions** <br>(count) | 1분 동안 클라이언트의 동시 구독 개수.|
| **aws.appsync.active_subscriptions.sum** <br>(count) | 1분 동안 클라이언트의 동시 구독 합계.|
| **aws.appsync.connect_client_error** <br>(count) | 클라이언트 측 오류로 인해 AWS AppSync에서 거부된 WebSocket 연결 개수. 이는 서비스가 스로틀링되었거나, 인증 설정이 잘못된 경우를 의미할 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.connect_client_error.sum** <br>(count) | 클라이언트 측 오류로 인해 AWS AppSync에서 거부된 WebSocket 연결 합계. 이는 서비스가 스로틀링되었거나, 인증 설정이 잘못된 경우를 의미할 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.connect_server_error.sum** <br>(count) | 연결 처리 중 AWS AppSync에서 발생한 오류 합계. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.connect_success.sum** <br>(count) | AWS AppSync에 대한 성공적인 WebSocket 연결 합계. 구독이 없는 연결도 존재할 수 있습니다. <br>_success로 표시_ |
| **aws.appsync.disconnect_client_error.sum** <br>(count) | WebSocket 연결을 종료하는 과정에서 AWS AppSync에서 발생한 클라이언트 오류 합계.<br>_error로 표시_ |
| **aws.appsync.disconnect_server_error.sum** <br>(count) | WebSocket 연결을 종료하는 과정에서 AWS AppSync에서 발생한 서버 오류 합계.<br>_error로 표시_ |
| **aws.appsync.disconnect_success.sum** <br>(count) | AWS AppSync에서 성공적으로 종료된 WebSocket 연결의 합계.<br>_success로 표시_ |
| **aws.appsync.publish_data_message_client_error.sum** <br>(count) | 클라이언트측 오류로 게시에 실패한 구독 이벤트 메시지 합계.<br>_error로 표시_ |
| **aws.appsync.publish_data_message_server_error.sum** <br>(count) | 이벤트 메시지 구독 게시 중 AWS AppSync에서 발생한 오류 개수입니다. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_오류로 표시_ |
| **aws.appsync.publish_data_message_success.sum** <br>(count) | 성공적으로 게시된 구독 이벤트 메시지 합계.<br>_success로 표시_ |
| **aws.appsync.subscribe_client_error.sum** <br>(count) | 클라이언트 측 오류로 인해 AWS AppSync에서 거부된 구독 합계. 이는 JSON 페이로드가 잘못되었거나, 서비스가 스로틀링되었거나, 인증 설정이 잘못된 경우 발생할 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.subscribe_server_error.sum** <br>(count) | 구독 처리 중 AWS AppSync에서 발생한 오류 합계. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.subscribe_success.sum** <br>(count) | WebSocket을 통해 AWS AppSync에 성공적으로 등록된 구독 합계. 구독이 없는 연결은 존재할 수 있지만, 연결 없이 구독이 존재하는 것은 불가능합니다.<br>_success로 표시_ |
| **aws.appsync.unsubscribe_client_error.sum** <br>(count) | 클라이언트측 오류로 게시에 실패한 구독 취소 합계.<br>_error로 표시_ |
| **aws.appsync.unsubscribe_server_error.sum** <br>(count) | 구독 취소 처리 중 AWS AppSync에서 발생한 오류 합계. 이는 예기치 않은 서버 측 문제 발생 시 나타날 수 있습니다.<br>_error로 표시_ |
| **aws.appsync.unsubscribe_success.sum** <br>(count) | AWS AppSync에서 성공적으로 처리된 구독 취소 합계.<br>_success로 표시_ |

### 이벤트

AWS AppSync 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS AppSync 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.