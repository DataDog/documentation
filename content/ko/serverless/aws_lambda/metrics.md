---
aliases:
- /ko/serverless/custom_metrics
- /ko/serverless/enhanced_lambda_metrics
- /ko/serverless/real-time-enhanced-metrics
- /ko/serverless/real_time_enhanced_metrics
title: AWS Lambda 메트릭
---

본 페이지에서는 AWS Lambda의 서버리스 애플리케이션 모니터링용 메트릭에 대해 알아봅니다.

[AWS Lambda용 서버리스 모니터링을 설치][1]한 후 Datadog은 Lambda 런타임에서 [향상된 메트릭](#enhanced-lambda-metrics)을 생성합니다. 또한 [커스텀 메트릭을 제출](#submit-custom-metrics)하여 Lambda 함수에서 Datadog으로 전송할 수도 있습니다.

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Enhanced Metrics from AWS Lambda" >}}

### 논람다 리소스에서 메트릭 수집

아울러, Datadog은 [API 게이트웨이][2], [AppSync][3], [SQS][4]와 같은 AWS 관리 리소스에 대한 메트릭을 수집하여 전체 서버리스 애플리케이션을 모니터링할 수 있도록 도와드립니다. 메트릭은 해당 AWS 리소스 태그를 통해 더욱 강력해집니다.

해당 메트릭을 수집하려면 [Datadog AWS 통합][5]을 설정하세요.

[1]: /ko/serverless/aws_lambda/installation
[2]: /ko/integrations/amazon_api_gateway/#data-collected
[3]: /ko/integrations/amazon_appsync/#data-collected
[4]: /ko/integrations/amazon_sqs/#data-collected
[5]: /ko/integrations/amazon_web_services/

## 향상된 Lambda 메트릭

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda 보강 메트릭 기본 대시보드" width="80%">}}

Datadog은 짧은 대기 시간, 몇 초 단위의 세분화, 콜드 스타트 ​​및 맞춤 태그에 대한 자세한 메타데이터를 통해 Lambda 런타임에서 향상된 Lambda 메트릭을 즉시 생성합니다.

향상된 Lambda 메트릭은 AWS Lambda 통합에서 활성화된 기본 [Lambda 메트릭][6]에 추가됩니다. 이러한 메트릭은 `aws.lambda.enhanced.*` 네임스페이스에 있다는 점에서 구별됩니다. [향상된 Lambda 메트릭 기본 대시보드][7]에서 해당 메트릭을 확인할 수있습니다.

다음과 같이 실시간으로 향상된 Lambda 메트릭을 사용할 수 있으며 `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource`, `runtime`로 태그가 지정됩니다.

해당 메트릭은 [분포][8]이며 `count`, `min`, `max`, `sum`, `avg` 집계를 사용하여 쿼리할 수 있습니다.

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

[6]: /ko/integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /ko/metrics/distributions/

## 커스텀 메트릭 제출

### 로그 또는 트레이스에서 커스텀 메트릭 생성하기
Lambda 함수가 이미 트레이스 또는 로그 데이터를 Datadog에 전송하고 있고, 쿼리하려는 데이터가 기존 로그 또는 트레이스에 캡처되어 있는 경우, 애플리케이션 코드를 다시 배포하거나 변경하지 않고도 로그 및 트레이스에서 커스텀 메트릭을 생성할 수 있습니다.

로그 기반 메트릭을 사용하면 쿼리와 일치하는 로그의 수를 기록하거나 요청 기간과 같이 로그에 포함된 숫자 값을 요약할 수 있습니다. 로그 기반 메트릭은 전체 수집 스트림에서 로그 데이터를 요약하는 비용 효율적인 방법입니다. [로그 기반 메트릭 만들기][9]에 대해 자세히 알아보세요.

보존 필터로 인덱싱되었는지 여부에 관계없이 수집된 모든 스팬에서 메트릭을 생성할 수도 있습니다. [스팬 기반 메트릭 만들기][10]에 대해 자세히 알아보세요.

### Lambda 함수로 직접 커스텀 메트릭 제출하기

모든 커스텀 메트릭은 [분포](#understanding-distribution-metrics)로 제출됩니다.

**참고**: 분포 메트릭은 반드시 신규 이름으로 제출해야 하며, 이전에 제출한 메트릭의 이름을 재사용해서는 안 됩니다.

1. [AWS Lambda용 서버리스 모니터링을 설치][1]하고 Datadog Lambda 확장 프로그램을 설치했는지 확인합니다.

2. 다음에서 런타임을 선택합니다.

{{< programming-lang-wrapper langs="python,nodeJS,go,java,dotnet,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # 메트릭 이름
        12.45,                                  # 메트릭 값
        tags=['product:latte', 'order:online']  # 연결된 태그
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // 메트릭 이름
        12.45,                      // 메트릭 값
        'product:latte',            // 첫 번째 태그
        'order:online'              // 두 번째 태그
    );
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // 메트릭 이름
    12.45,                          // 메트릭 값
    "product:latte", "order:online" // 연결된 태그
  )
}
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

최신 버전 [`java-dogstatsd-client`][1]을 설치합니다.

```java
package com.datadog.lambda.sample.java;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyResponseEvent;

// statsd 클라이언트 빌더 가져오기
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {

    // statsd 클라이언트의 인스턴스 만들기
    private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();

    @Override
    public APIGatewayV2ProxyResponseEvent handleRequest(APIGatewayV2ProxyRequestEvent request, Context context) {

        // 분포 메트릭 제출
        Statsd.recordDistributionValue("my.custom.java.metric", 1, new String[]{"tag:value"});

        APIGatewayV2ProxyResponseEvent response = new APIGatewayV2ProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }

    static {
        // 종료 전에 모든 측정항목이 플러시되었는지 확인하세요
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                System.out.println("[runtime] shutdownHook triggered");
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    System.out.println("[runtime] sleep interrupted");
                }
                System.out.println("[runtime] exiting");
            }
        });
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

최신 버전 [`dogstatsd-csharp-client`][1]을 설치합니다.

```csharp
using System.IO;

// statsd 클라이언트 가져오기
using StatsdClient;

namespace Example
{
  public class Function
  {
    static Function()
    {
        // statsd 클라이언트의 인스턴스 만들기
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };
        if (!DogStatsd.Configure(dogstatsdConfig))
            throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    }

    public Stream MyHandler(Stream stream)
    {
        // 분포 메트릭 제출
        DogStatsd.Distribution("my.custom.dotnet.metric", 1, tags: new[] { "tag:value" });
        // 함수 로직
    }
  }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

1. 런타임용 DogStatsD 클라이언트 [설치][1]
2. 다음 [샘플 코드][2]에 따라 커스텀 메트릭을 제출합니다.

[1]: /ko/developers/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ko/developers/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog 포워더(Forwarder)로 과거 메트릭 기록 제출하기

대부분의 경우 Datadog은 Datadog Lambda 확장 프로그램을 사용하여 커스텀 메트릭을 제출할 것을 권장합니다. 그러나 Lambda 확장 프로그램은 현재 타임스탬프가 있는 메트릭만 제출할 수 있습니다.

과거 메트릭 기록을 제출하려면 Datadog 포워더(Forwarder)를 사용하세요. 해당 메트릭에는 최근 1시간 이내의 타임스탬프가 존재할 수 있습니다.

먼저 [AWS Lambda용 서버리스 모니터링을 설치][1]하고 Datadog Lambda 포워더(Forwarder)를 설치했는지 확인합니다.

다음에서 런타임을 선택합니다.

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # 메트릭 이름
        12.45,                                  # 메트릭 값
        tags=['product:latte', 'order:online']  # 연결된 태그
    )

    # 최근 20분 이내의 타임스탬프가 있는 메트릭을 제출하세요.
    lambda_metric(
        "coffee_house.order_value",             # 메트릭 이름
        12.45,                                  # 메트릭 값
        timestamp=int(time.time()),             # Unix 에포크 (초)
        tags=['product:latte', 'order:online']  # 연결된 태그
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // 메트릭 이름
        12.45,                      // 메트릭 값
        'product:latte',            // 첫 번째 태그
        'order:online'              // 두 번째 태그
    );

    // 최근 20분 이내의 타임스탬프가 있는 메트릭을 제출하세요.
    sendDistributionMetricWithDate(
        'coffee_house.order_value', // 메트릭 이름
        12.45,                      // 메트릭 값
        new Date(Date.now()),       // 날짜
        'product:latte',            // 첫 번째 태그
        'order:online',             // 두 번째 태그
    ); 
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // 메트릭 이름
    12.45,                          // 메트릭 값
    "product:latte", "order:online" // 연결된 태그
  )

  // 최근 20분 이내의 타임스탬프가 있는 메트릭을 제출하세요.
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value",     // 메트릭 이름
    12.45,                          // 메트릭 값
    time.Now(),                     // 타임스탬프
    "product:latte", "order:online" // 연결된 태그
  )
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # 함수 핸들러만 래핑하면 됩니다 (헬퍼 함수 제외).
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # 메트릭 이름
          12.45,                              # 메트릭 값
          "product":"latte", "order":"online" # 연결된 태그
        )

        # 최근 20분 이내의 타임스탬프가 있는 메트릭을 제출하세요.
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # 메트릭 이름
          12.45,                              # 메트릭 값
          time: Time.now.utc,                 # 타임스탬프
          "product":"latte", "order":"online" # 연결된 태그
        )
    end
end
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order", "online");

        dd.metric(
            "coffee_house.order_value", // 메트릭 이름
            12.45,                      // 메트릭 값
            myTags);                    // 연결된 태그
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

커스텀 메트릭을 다음 형식으로 기록하는 재사용 가능한 함수를 작성합니다:

```json
{
    "m": "메트릭 이름",
    "v": "메트릭 값",
    "e": "Unix 타임스탬프 (초)",
    "t": "태그 배열"
}
```

예시:

```json
{
    "m": "coffee_house.order_value",
    "v": 12.45,
    "e": 1572273854,
    "t": ["product:latte", "order:online"]
}
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### 많은 데이터 포인트 전송하기

동일한 메트릭 및 동일한 태그 세트(예: 대형 `for`-루프 내부)에 관한 데이터 포인트를 많이 제출할 목적으로 포워더(Forwarder)를 사용하면 Lambda 성능 및 클라우드와치(CloudWatch) 비용에 영향을 미칠 수 있습니다.

애플리케이션에서 데이터 포인트를 집계하여 오버헤드를 피할 수 있습니다.

예를 들어, 파이썬(Python)에서는 다음과 같습니다.

```python
def lambda_handler(event, context):

    #event['Records']에 많은 레코드가 포함된 경우 비효율적임
    for record in event['Records']:
      lambda_metric("record_count", 1)

    #개선된 구현
    record_count = 0
    for record in event['Records']:
      record_count += 1
    lambda_metric("record_count", record_count)
```

### 분포 메트릭 이해하기

Datadog이 동일한 타임스탬프 및 태그 세트를 공유하는 여러 카운트 또는 게이지 메트릭 포인트를 수신하는 경우, 가장 최근의 것만 계산됩니다. 이는 메트릭 포인트가 Datadog Agent에 의해 집계되고 고유한 `host` 태그로 태그가 지정되므로 호스트 기반 애플리케이션에서 작동합니다.

트래픽이 증가하면 Lambda 함수가 여러 개의 동시 실행 환경을 시작할 수 있습니다. 이 함수는 서로를 덮어쓰는 카운트 또는 게이지 메트릭 포인트를 제출하여 과소 계산된 결과를 초래할 수 있습니다. 이 문제를 피하기 위해, 분포 메트릭 포인트가 Datadog 백엔드에서 집계되고 모든 메트릭 포인트가 카운트되기 때문에 Lambda 함수가 생성한 커스텀 메트릭은 [분포][11]로 제출됩니다.

분포는 기본적으로 `avg`, `sum`, `max`, `min`, `count` 집계를 제공합니다. 메트릭 요약 페이지에서 백분위수 집계(p50, p75, p90, p95, p99)와 [태그 관리][12]를 활성화할 수 있습니다. 게이지 메트릭 유형에 대한 분포를 모니터링하려면 [시간 및 공간 집계][13] 모두에 `avg`를 사용합니다. 카운트 메트릭 유형에 대한 분포를 모니터링하려면 [시간 및 공간 집계][13] 모두에 `sum`을 사용합니다. 시간 및 공간 집계가 작동하는 방식을 확인하려면 [그래프에 쿼리하기][14] 지침을 참조하세요.

[9]: /ko/logs/logs_to_metrics/
[10]: /ko/tracing/trace_pipeline/generate_metrics/
[11]: /ko/metrics/distributions/
[12]: /ko/metrics/distributions/#customize-tagging
[13]: /ko/metrics/#time-and-space-aggregation
[14]: /ko/dashboards/guide/query-to-the-graph/