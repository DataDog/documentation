---
aliases:
- /ko/integrations/amazon_api_gateway
app_id: amazon-api-gateway
categories:
- aws
- metrics
- cloud
custom_kind: integration
description: Amazon API Gateway는 API를 위한 관리형 서비스입니다.
media: []
title: Amazon API Gateway 통합
---
## 개요

Amazon API Gateway는 개발자가 어떠한 규모에서도 API를 쉽게 생성, 게시, 유지 관리, 모니터링, 보호할 수 있도록 지원하는 완전관리형 서비스입니다.

이 통합을 활성화하여 Datadog에서 모든 API Gateway 메트릭을 확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우 [먼저 Amazon Web Service 통합]을 설정하세요(https://docs.datadoghq.com/integrations/amazon_web_services/).

### 메트릭 수집

1. [AWS 통합 페이지](https://app.datadoghq.com/integrations/amazon-web-services)에서 `API Gateway`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.

1. API Gateway Stage에 적용되는 커스텀 태그를 얻으려면 [Datadog IAM 정책](https://docs.datadoghq.com/integrations/amazon_web_services/#installation)에 다음 권한을 추가하세요.

   - `apigateway:GET`
   - `tag:GetResources`

1. [Datadog - Amazon API Gateway 통합을 설치합니다](https://app.datadoghq.com/integrations/amazon-api-gateway).

AWS에서 검색된 각 메트릭에는 AWS 콘솔에 표시되는 것과 동일한 태그가 할당됩니다. 여기에는 호스트 이름, 보안 그룹 등이 포함됩니다.

**참고**: 자세한 CloudWatch 메트릭을 활성화한 경우 단계 내의 모든 리소스 또는 경로에서 이를 활성화해야 합니다. 그러지 않으면 Datadog의 집계 값이 부정확해집니다.

### 로그 수집

API Gateway 로깅 활성화 방법:

1. AWS 콘솔에서 API Gateway로 이동합니다.

1. 원하는 API를 선택합니다.

1. 왼쪽 탐색 탭의 **Monitor** 드롭다운에서 **Logging**을 선택합니다. 왼쪽 탐색 탭이 보이지 않으면 왼쪽 상단 **API Gateway** 브레드크럼 옆의 햄버거 아이콘을 클릭합니다.

1. 단계를 선택합니다.

1. **Access logging** 섹션에서 **Edit**를 클릭합니다.

1. **Access logging** 토글을 활성화합니다.

1. **Log destination**의 경우 CloudWatch 로그 그룹 이름이 `api-gateway`로 시작하는지 확인합니다.

1. JSON 형식(CLF 및 CSV도 지원됨)을 선택하고 **Log format** 상자에 다음을 추가합니다.

   ```text
   {
       "apiId": "$context.apiId",
       "stage": "$context.stage",
       "requestId":"$context.requestId",
       "ip":"$context.identity.sourceIp",
       "caller":"$context.identity.caller",
       "user":"$context.identity.user",
       "requestTime":$context.requestTimeEpoch,
       "httpMethod":"$context.httpMethod",
       "resourcePath":"$context.resourcePath",
       "status":$context.status,
       "protocol":"$context.protocol",
       "responseLength":$context.responseLength
   }
   ```

1. **Save**를 클릭합니다.

#### Datadog로 로그 전송

1. 아직 설정하지 않은 경우 [먼저 Datadog 로그 수집 AWS Lambda 함수]를 설정하세요(https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function).
1. 람다 함수가 설치되면 AWS 콘솔에서 API Gateway 로그를 포함하는 클라우드와치(CloudWatch) 로그 그룹에 대해 수동으로 트리거를 추가합니다.
   해당 CloudWatch Log 그룹을 선택하고 필터 이름을 추가한 다음(필터는 비워 두어도 됨) 트리거를 추가합니다.

완료되면 [로그 페이지](https://app.datadoghq.com/logs)로 이동하여 로그 탐색을 시작하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.apigateway.4xx** <br>(count) | HTTP API의 클라이언트 측 오류 수<br>_operation으로 표시_ |
| **aws.apigateway.4xxerror** <br>(count) | REST API의 클라이언트 측 오류 수<br>_operation으로 표시_ |
| **aws.apigateway.5xx** <br>(count) | HTTP API의 서버 측 오류 수<br>_operation으로 표시_ |
| **aws.apigateway.5xxerror** <br>(count) | REST API의 서버 측 오류 수<br>_operation으로 표시_ |
| **aws.apigateway.cache_hit_count** <br>(count) | API 캐시에서 제공된 요청 수<br>_operation으로 표시_ |
| **aws.apigateway.cache_miss_count** <br>(count) | API 캐싱이 활성화된 경우 백엔드에서 제공되는 요청 수<br>_operation으로 표시_ |
| **aws.apigateway.client_error** <br>(count) | 통합이 호출되기 전에 API Gateway에서 4XX 응답을 반환한 평균 요청 수.<br>_operation으로 표시_ |
| **aws.apigateway.client_error.sum** <br>(count) | 통합이 호출되기 전에 API Gateway에서 4XX 응답을 반환한 총 요청 수.<br>_operation으로 표시_ |
| **aws.apigateway.connect_count** <br>(count) | $connect 라우트 통합으로 전송된 평균 메시지 수.<br>_operation으로 표시_ |
| **aws.apigateway.connect_count.sum** <br>(count) | $connect 라우트 통합으로 전송된 총 메시지 수.<br>_operation으로 표시_ |
| **aws.apigateway.count** <br>(count) | API 메서드 호출 횟수<br>_operation으로 표시_ |
| **aws.apigateway.execution_error** <br>(count) | 통합 호출 시 발생한 평균 오류.<br>_operation으로 표시_ |
| **aws.apigateway.execution_error.sum** <br>(count) | 통합 호출 시 발생한 총 오류.<br>_operation으로 표시_ |
| **aws.apigateway.integration_error** <br>(count) | 통합에서 4XX/5XX 응답을 반환하는 평균 요청 수.<br>_operation으로 표시_ |
| **aws.apigateway.integration_error.sum** <br>(count) | 통합에서 4XX/5XX 응답을 반환하는 총 요청 수.<br>_operation으로 표시_ |
| **aws.apigateway.integration_latency** <br>(gauge) | API Gateway가 백엔드에 요청을 전달한 시점과 백엔드로부터 응답을 받는 시점 사이의 시간.<br>_millisecond로 표시_ |
| **aws.apigateway.integration_latency.maximum** <br>(gauge) | API Gateway가 백엔드에 요청을 전달한 시점과 백엔드로부터 응답을 받는 시점 사이의 최대 시간.<br>_millisecond로 표시_ |
| **aws.apigateway.integration_latency.minimum** <br>(gauge) | API Gateway가 백엔드에 요청을 전달한 시점과 백엔드로부터 응답을 받는 시점 사이의 최소 시간.<br>_millisecond로 표시_ |
| **aws.apigateway.integration_latency.p90** <br>(gauge) | API Gateway가 백엔드에 요청을 전달한 시점과 백엔드로부터 응답을 받는 시점 사이의 90번째 백분위 시간.<br>_millisecond로 표시_ |
| **aws.apigateway.integration_latency.p95** <br>(gauge) | API Gateway가 백엔드에 요청을 전달한 시점과 백엔드로부터 응답을 받는 시점 사이의 95번째 백분위 시간.<br>_millisecond로 표시_ |
| **aws.apigateway.integration_latency.p99** <br>(gauge) | API Gateway가 백엔드에 요청을 전달한 시점과 백엔드로부터 응답을 받는 시점 사이의 99번째 백분위 시간.<br>_millisecond로 표시_ |
| **aws.apigateway.latency** <br>(gauge) | API Gateway가 클라이언트로부터 요청을 받은 시점과 클라이언트에게 응답을 반환한 시점 사이의 시간. 해당 지연 시간에는 integration_latency와 기타 API Gateway 오버헤드가 포함됩니다.<br>_millisecond로 표시_ |
| **aws.apigateway.latency.maximum** <br>(gauge) | 요청이 수신된 시점과 응답이 반환되는 시점 사이의 최대 시간<br>_millisecond로 표시_ |
| **aws.apigateway.latency.minimum** <br>(gauge) | 요청이 수신된 시점과 응답이 반환되는 시점 사이의 최소 시간<br>_millisecond로 표시_ |
| **aws.apigateway.latency.p50** <br>(gauge) | 요청이 수신된 시점과 응답이 반환되는 시점 사이의 50번째 백분위 시간<br>_millisecond로 표시_ |
| **aws.apigateway.latency.p75** <br>(gauge) | 요청이 수신된 시점과 응답이 반환되는 시점 사이의 75번째 백분위 시간<br>_millisecond로 표시_ |
| **aws.apigateway.latency.p90** <br>(gauge) | 요청이 수신된 시점과 응답이 반환되는 시점 사이의 90번째 백분위 시간<br>_millisecond로 표시_ |
| **aws.apigateway.latency.p95** <br>(gauge) | 요청이 수신된 시점과 응답이 반환되는 시점 사이의 95번째 백분위 시간<br>_millisecond로 표시_ |
| **aws.apigateway.latency.p99** <br>(gauge) | 요청이 수신된 시점과 응답이 반환되는 시점 사이의 99번째 백분위 시간<br>_millisecond로 표시_ |
| **aws.apigateway.message_count** <br>(count) | 클라이언트와 주고받은 WebSocket API의 평균 메시지 수.<br>_operation으로 표시_ |
| **aws.apigateway.message_count.sum** <br>(count) | 클라이언트와 주고받은 WebSocket API의 총 메시지 수.<br>_operation으로 표시_ |

### 이벤트

Amazon API Gateway 통합에는 어떠한 이벤트도 포함되지 않습니다.

### 서비스 점검

Amazon API Gateway 통합에는 어떠한 서비스 점검도 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.