---
aliases:
- /ko/serverless/real-time-enhanced-metrics
- /ko/serverless/real_time_enhanced_metrics
title: 향상된 Lambda 메트릭
---

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda Enhanced Metrics Default Dashboard" >}}

## 개요

Datadog은 짧은 대기 시간, 몇 초 단위의 세분화, 콜드 스타트 ​​및 맞춤 태그에 대한 자세한 메타데이터를 통해 Lambda 런타임에서 향상된 Lambda 메트릭을 즉시 생성합니다.

향상된 Lambda 메트릭은 AWS Lambda 통합에서 활성화된 기본 [Lambda 메트릭][1]을 뛰어넘는 보기를 제공합니다. 이러한 메트릭은 `aws.lambda.enhanced.*` 네임스페이스에 있다는 점에서 구별되며, 서버리스 애플리케이션 상태에 대해 실시간 모니터를 설정하기 위한 Datadog의 모범 사례입니다.

### 실시간으로 향상된 Lambda 메트릭

다음과 같이 실시간으로 향상된 Lambda 메트릭을 사용할 수 있으며 `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource`, `runtime`로 태그가 지정되어 있습니다. 이러한 메트릭은 [분포][2]이며 `count`, `min`, `max`, `sum`, `avg` 집계를 사용하여 쿼리할 수 있습니다.


`aws.lambda.enhanced.invocations`
: 이벤트 또는 API 호출에 응답하여 함수가 호출된 횟수를 측정합니다.

`aws.lambda.enhanced.errors`
: 함수의 오류로 인해 실패한 호출 수를 측정합니다.

`aws.lambda.enhanced.max_memory_used`
: 함수에서 사용하는 최대 메모리 양(mb)을 측정합니다.

`aws.lambda.enhanced.duration`
: 함수 코드가 호출의 결과로 실행을 시작한 후 실행을 중지하기까지의 경과 초 수를 측정합니다.


`aws.lambda.enhanced.billed_duration`
: 청구 대상 함수가 실행된 시간을 측정합니다(100밀리초 단위).

`aws.lambda.enhanced.init_duration`
: 콜드 스타트 중 함수의 초기화 시간(초)을 측정합니다.

`aws.lambda.enhanced.runtime_duration`
: 함수 코드가 실행을 시작한 시점부터 클라이언트에 응답을 반환할 때까지 경과한 밀리초를 측정하며, Lambda 확장 실행에 의해 추가된 런타임 후 기간은 제외합니다.

`aws.lambda.enhanced.post_runtime_duration`
: 함수 코드가 클라이언트에 응답을 반환한 시점부터 함수 실행이 중지될 때까지 경과된 밀리초를 측정하며, Lambda 확장 실행으로 인해 추가된 기간을 나타냅니다.

`aws.lambda.enhanced.response_latency`
: 호출 요청이 수신된 시점부터 클라이언트에 첫 번째 바이트의 응답이 전송될 때까지 경과된 시간(밀리초)을 측정합니다.

`aws.lambda.enhanced.response_duration`
: 클라이언트에 첫 번째 응답 바이트가 전송된 시점부터 마지막 응답 바이트까지 경과된 시간(밀리초)을 측정합니다.

`aws.lambda.enhanced.produced_bytes`
: 함수가 반환한 바이트 수를 측정합니다.

`aws.lambda.enhanced.estimated_cost`
: 함수 호출의 총 예상 비용(미국 달러)을 측정합니다.

`aws.lambda.enhanced.timeouts`
: 함수가 시간 초과된 횟수를 측정합니다.

`aws.lambda.enhanced.out_of_memory`
: 함수의 메모리 부족 횟수를 측정합니다.

## 향상된 Lambda 메트릭 사용

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Enhanced Metrics from AWS Lambda" >}}

[설치 지침][3]에 따라 서버리스 애플리케이션의 계측을 설정하세요. 향상된 Lambda 메트릭은 기본적으로 활성화되어 있습니다.

## 대시보드 보기

향상된 Lambda 메트릭을 활성화한 후, [Datadog 앱의 기본 대시보드][4]를 확인합니다.

[1]: /ko/integrations/amazon_lambda/#metric-collection
[2]: /ko/metrics/distributions/
[3]: /ko/serverless/installation/
[4]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics