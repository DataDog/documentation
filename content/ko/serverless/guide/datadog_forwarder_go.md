---
title: Datadog 포워더를 사용하여 Go 서버리스 애플리케이션 계측하기
---
## 개요

<div class="alert alert-warning">
Datadog 서버리스를 처음 사용하신다면 <a href="/serverless/installation/go">Datadog Lambda 확장을 사용해 Lambda 함수를 계측하는 방법</a>을 따르세요. Lambda가 즉시 사용 가능한 기능을 제공하기 전에 Datadog 포워더를 사용하여 Datadog 서버리스를 설정한 경우, 이 가이드를 사용하여 인스턴스를 유지 관리하세요.
</div>

## 필수 설정

아직 설정하지 않은 경우:

- [AWS 통합][1]을 설치합니다. 그러면 Datadog은 AWS로부터 Lambda 메트릭을 수집합니다.
- [Datadog 포워더 Lamda 함수][2]를 설치합니다. AWS Lamda 트레이스, 향상된 지표, 커스텀 메트릭, 로그를 수집하기 위해 필요합니다.

[AWS 통합][1]과 [Datadog 포워더][2]를 설치한 후 다음 단계에 따라 애플리케이션을 계측하여 메트릭, 로그 및 트레이스를 Datadog으로 전송합니다.

## 설정

### 설치

다음 명령을 실행해 [Datadog Lamda 라이브러리][3]를 로컬에 설치합니다:

```
go get github.com/DataDog/datadog-lambda-go
```

### 계측

다음 단계에 따라 함수를 계측합니다:

1. 환경 변수 `DD_FLUSH_TO_LOG`와 `DD_TRACE_ENABLED`를 `true`로 설정합니다.
2. Lamda 함수 처리기가 표시되는 파일에서 필요한 패키지를 가져옵니다.

    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
      "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    )
    ```
3. Datadog Lamda 라이브러리에서 제공하는 래퍼를 사용해 Lamda 함수 처리기를 래핑합니다.

    ```go
    func main() {
      // Wrap your lambda handler like this
      lambda.Start(ddlambda.WrapHandler(myHandler, nil))
      /* OR with manual configuration options
      lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
        BatchInterval: time.Second * 15
        APIKey: "my-api-key",
      }))
      */
    }
    ```
4. 포함된 라이브러리를 사용해 추가 스팬을 생성하고, 로그와 트레이스를 연결하며, 다른 서비스로 트레이스 컨텍스트를 전달할 수 있습니다.
    ```go
    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // Trace an HTTP request
      req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
      client := http.Client{}
      client = *httptrace.WrapClient(&client)
      client.Do(req)

      // Connect your Lambda logs and traces
      currentSpan, _ := tracer.SpanFromContext(ctx)
      log.Printf("my log message %v", currentSpan)

      // Create a custom span
      s, _ := tracer.StartSpanFromContext(ctx, "child.span")
      time.Sleep(100 * time.Millisecond)
      s.Finish()
    }
    ```

### 연결

메트릭, 트레이스, 로그를 Datadog으로 보내려면 각 함수 로그 그룹에서 Datadog 포워더 Lamda 함수를 연결하세요. 

1. [아직 설치하지 않았다면 Datadog 포워더를 설치하세요][2].
2. [Datadog 포워더를 함수의 로그 그룹에 연결][4]합니다.

### 태그

선택 사항: Datadog에서는 [통합된 서비스 태깅][5]을 위해 서버리스 애플리케이션을 `env`, `service`, `version`으로 태깅하는 것을 추천합니다.

## 탐색

위 단계를 따라 함수를 설정한 후, [서버리스 홈페이지][6]에서 메트릭, 로그, 트레이스를 확인하세요.

## 커스텀 비즈니스 로직 모니터링

커스텀 메트릭을 제출하려면 아래 코드 예시를 참고하세요:

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // Wrap your handler function
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Submit a custom metric
  ddlambda.Metric(
    "coffee_house.order_value", // Metric name
    12.45, // Metric value
    "product:latte", "order:online" // Associated tags
  )

  // Submit a custom metric with timestamp
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value", // Metric name
    12.45, // Metric value
    time.Now(), // Timestamp, must be within last 20 mins
    "product:latte", "order:online" // Associated tags
  )

  req, err := http.NewRequest("GET", "http://example.com/status")

  // Add the datadog distributed tracing headers
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

[커스텀 메트릭 제출][7]에 대해 자세히 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/amazon_web_services/
[2]: /ko/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: /ko/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: https://app.datadoghq.com/functions
[7]: /ko/serverless/custom_metrics?tab=go