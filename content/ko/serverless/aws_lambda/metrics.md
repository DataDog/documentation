---
aliases:
- /ko/serverless/custom_metrics
- /ko/serverless/enhanced_lambda_metrics
- /ko/serverless/real-time-enhanced-metrics
- /ko/serverless/real_time_enhanced_metrics
title: AWS Lambda 메트릭
---
본 페이지에서는 AWS Lambda의 서버리스 애플리케이션 모니터링용 메트릭에 대해 알아봅니다. AWS Lambda에서 메트릭을 얻는 3가지 방법이 있습니다.

-  [Datadog AWS 통합][5]에서 Cloudwatch Lambda 메트릭을 얻을 수 있습니다.
-  Datadog Lambda Extension을 통해 [AWS Lambda용 Serverless Monitoring][1]을 설치하여 [향상된 메트릭](#enhanced-lambda-metrics)을 얻을 수 있습니다.
-  Lambda 함수에서 Datadog으로 [사용자 정의 메트릭](#submit-custom-metrics)을 제출할 수 있습니다.

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda에서 향상된 메트릭 수집" >}}

### Lambda가 아닌 리소스에서 메트릭을 수집 {#collect-metrics-from-non-lambda-resources}

Datadog은 [API 게이트웨이][2], [AppSync][3], [SQS][4]와 같은 AWS 관리 리소스에 대한 메트릭을 수집하여 전체 Serverless 애플리케이션을 모니터링할 수 있도록 도와드립니다. 해당 메트릭은 관련된 AWS 리소스 태그로 보강됩니다.

해당 메트릭을 수집하려면 [Datadog AWS 통합][5]을 설정하세요.

[1]: /ko/serverless/aws_lambda/installation
[2]: /ko/integrations/amazon_api_gateway/#data-collected
[3]: /ko/integrations/amazon_appsync/#data-collected
[4]: /ko/integrations/amazon_sqs/#data-collected
[5]: /ko/integrations/amazon_web_services/

##  향상된 Lambda 메트릭 {#enhanced-lambda-metrics}

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda 향상된 메트릭 기본 대시보드" width="80%">}}

Datadog은 짧은 대기 시간, 몇 초 단위의 세분화, 콜드 스타트 ​​및 맞춤 태그에 대한 자세한 메타데이터를 통해 Lambda 런타임에서 향상된 Lambda 메트릭을 즉시 생성합니다.

향상된 Lambda 메트릭은 AWS Lambda 통합으로 활성화된 기본 [Lambda 메트릭][6]에 추가됩니다. 향상된 메트릭은 `aws.lambda.enhanced.*` 네임스페이스에 위치하여 구별됩니다. 이 메트릭은 [향상된 Lambda 메트릭 기본 대시보드][7]에서 확인할 수 있습니다.

다음의 실시간 향상된 Lambda 메트릭이 제공되며, 해당 `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` 및 `runtime` 태그로 태그가 지정됩니다.

해당 메트릭은 [분포][8]: 이며 `count`, `min`, `max`, `sum`, `avg` 집계를 사용하여 쿼리할 수 있습니다. 향상된 메트릭은 [Serverless Monitoring][1]으로 자동으로 활성화되지만, Lambda 함수에서 `DD_ENHANCED_METRICS` 환경 변수를 `false`로 설정하여 비활성화할 수 있습니다.

`aws.lambda.enhanced.invocations`
:  이벤트 또는 API 호출에 응답하여 함수가 호출된 횟수를 측정합니다.

`aws.lambda.enhanced.errors`
:  함수의 오류로 인해 실패한 호출 수를 측정합니다.

`aws.lambda.enhanced.max_memory_used`
:  함수에서 사용된 최대 메모리(mb) 양을 측정합니다.

`aws.lambda.enhanced.duration`
:  함수 코드가 호출의 결과로 실행을 시작한 후 실행을 중지하기까지의 경과 초 수를 측정합니다.

`aws.lambda.enhanced.billed_duration`
:  함수가 실행된 시간의 청구된 양을 측정합니다(100ms 단위).

`aws.lambda.enhanced.init_duration`
: 콜드 스타트 중 함수의 초기화 시간을(초) 측정합니다.

`aws.lambda.enhanced.runtime_duration`
:  함수 코드가 실행을 시작한 시점부터 클라이언트에 응답을 반환할 때까지 경과한 밀리초를 측정하며, Lambda Extension 실행에 의해 추가된 런타임 후 기간은 제외합니다.

`aws.lambda.enhanced.post_runtime_duration`
: 함수 코드가 클라이언트에 응답을 반환한 시점부터 함수 실행이 중지될 때까지 경과된 밀리초를 측정하며, Lambda Extension 실행으로 인해 추가된 시간을 나타냅니다.

`aws.lambda.enhanced.response_latency`
: 호출 요청이 수신된 시점부터 클라이언트에 첫 번째 바이트의 응답이 전송될 때까지 경과된 시간(밀리초)을 측정합니다.

`aws.lambda.enhanced.response_duration`
: 클라이언트에 첫 번째 응답 바이트가 전송된 시점부터 마지막 응답 바이트까지 경과된 시간(밀리초)을 측정합니다.

`aws.lambda.enhanced.produced_bytes`
: 함수가 반환한 바이트 수를 측정합니다.

`aws.lambda.enhanced.estimated_cost`
: 함수 호출의 총 예상 비용(미국 달러)을 측정합니다.

`aws.lambda.enhanced.timeouts`
: 함수가 타임아웃된 횟수를 측정합니다.

`aws.lambda.enhanced.out_of_memory`
: 함수가 메모리 부족으로 인해 중단된 횟수를 측정합니다.
: 메모리 부족 오류의 변형이 많기 때문에, 최선의 노력에도 불구하고 일부 경우는 잘 처리되지 않을 수 있습니다. 이런 경우가 발생하면 [Datadog Lambda Extension GitHub repo][18]에 문제를 생성하세요.

`aws.lambda.enhanced.cpu_total_utilization`
: 함수의 총 CPU 사용량을 코어 수로 측정합니다.

`aws.lambda.enhanced.cpu_total_utilization_pct`
: 함수의 총 CPU 사용량을 백분율로 측정합니다.

`aws.lambda.enhanced.cpu_max_utilization`
: 가장 많이 사용된 코어의 CPU 사용량을 측정합니다.

`aws.lambda.enhanced.cpu_min_utilization`
: 가장 적게 사용된 코어의 CPU 사용량을 측정합니다.

`aws.lambda.enhanced.cpu_system_time`
: CPU가 커널 모드에서 실행된 시간의 양을 측정합니다.

`aws.lambda.enhanced.cpu_user_time`
: CPU가 사용자 모드에서 실행된 시간의 양을 측정합니다.

`aws.lambda.enhanced.cpu_total_time`
: CPU가 실행된 총 시간을 측정합니다.

`aws.lambda.enhanced.num_cores`
: 사용 가능한 코어 수를 측정합니다.

`aws.lambda.enhanced.rx_bytes`
: 함수가 수신한 바이트를 측정합니다.

`aws.lambda.enhanced.tx_bytes`
: 함수가 전송한 바이트를 측정합니다.

`aws.lambda.enhanced.total_network`
: 함수가 전송하고 수신한 바이트를 측정합니다.

`aws.lambda.enhanced.tmp_max`
: /tmp 디렉토리의 총 사용 가능한 공간을 측정합니다.

`aws.lambda.enhanced.tmp_used`
: /tmp 디렉토리에서 사용된 공간을 측정합니다.

`aws.lambda.enhanced.fd_max`
: 사용 가능한 파일 설명자의 총 수를 측정합니다.

`aws.lambda.enhanced.fd_use`
: 함수 호출 기간 동안 사용된 최대 파일 설명자의 수를 측정합니다.

`aws.lambda.enhanced.threads_max`
: 사용 가능한 스레드의 총 수를 측정합니다.

`aws.lambda.enhanced.threads_use`
: 함수 호출 기간 동안 사용된 최대 스레드의 수를 측정합니다.

[6]: /ko/integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /ko/metrics/distributions/
[18]: https://github.com/DataDog/datadog-lambda-extension

## 커스텀 메트릭을 제출합니다 {#submit-custom-metrics}

### 로그 또는 트레이스에서 커스텀 메트릭을 생성합니다 {#create-custom-metrics-from-logs-or-traces}
Lambda 함수가 이미 트레이스 또는 로그 데이터를 Datadog에 전송하고 있고, 쿼리하려는 데이터가 기존 로그 또는 트레이스에 캡처되어 있는 경우, 애플리케이션 코드를 다시 배포하거나 변경하지 않고도 로그 및 트레이스에서 커스텀 메트릭을 생성할 수 있습니다.

로그 기반 메트릭을 사용하면 쿼리에 일치하는 로그의 수를 기록하거나 로그에 포함된 숫자 값을 요약할 수 있습니다. 예를 들어 요청 지속 시간을 기록할 수 있습니다. 로그 기반 메트릭은 전체 수집 스트림에서 로그 데이터를 요약하는 비용 효율적인 방법입니다. [로그 기반 메트릭 만들기][9]에 대해 자세히 알아보세요.

보존 필터에 의해 인덱싱되었는지 여부에 관계없이 수집된 모든 스팬에서 메트릭을 생성할 수도 있습니다. [스팬 기반 메트릭 만들기][10]에 대해 자세히 알아보세요.

### Lambda 함수로 직접 커스텀 메트릭 제출 {#submit-custom-metrics-directly-from-a-lambda-function}

모든 커스텀 메트릭은 [분포](#understanding-distribution-metrics)로 제출됩니다.

**참고**: 분포 메트릭은 반드시 신규 이름으로 제출해야 하며, 이전에 제출한 메트릭의 이름을 재사용해서는 안 됩니다.

1. [Install Serverless Monitoring for AWS Lambda][1]하고 Datadog Lambda Extension이 설치되어 있는지 확인합니다.

2. 런타임을 선택하세요.

{{< programming-lang-wrapper langs="python,nodeJS,go,java,dotnet,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
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
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )
}
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

[`java-dogstatsd-client`][1]의 최신 버전을 설치하세요.

```java
package com.datadog.lambda.sample.java;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyResponseEvent;

// import the statsd client builder
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {

    // instantiate the statsd client
    private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();

    @Override
    public APIGatewayV2ProxyResponseEvent handleRequest(APIGatewayV2ProxyRequestEvent request, Context context) {

        // submit a distribution metric
        Statsd.recordDistributionValue("my.custom.java.metric", 1, new String[]{"tag:value"});

        APIGatewayV2ProxyResponseEvent response = new APIGatewayV2ProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }

    static {
        // ensure all metrics are flushed before shutdown
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

[`dogstatsd-csharp-client`][1]의 최신 버전을 설치하세요.

```csharp
using System.IO;

// import the statsd client
using StatsdClient;

namespace Example
{
  public class Function
  {
    static Function()
    {
        // instantiate the statsd client
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
        // submit a distribution metric
        DogStatsd.Distribution("my.custom.dotnet.metric", 1, tags: new[] { "tag:value" });
        // your function logic
    }
  }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

1. 런타임용 DogStatsD 클라이언트를 [설치][1]합니다.
2. [샘플 코드][2]에 따라 커스텀 메트릭을 제출합니다.

[1]: /ko/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ko/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 이전 메트릭을 제출하세요 {#submit-historical-metrics}

Datadog Lambda Extension을 사용하여 이전 메트릭을 제출하세요. 이 메트릭은 최대 한 시간 전의 타임스탬프를 가질 수 있습니다.

[Install Serverless Monitoring for AWS Lambda][1]로 시작하세요. 최신 Datadog Lambda Extension이 설치되어 있는지 확인하세요.

다음에서 런타임을 선택합니다.

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )

    # Submit a metric with a timestamp that is within the last 20 minutes
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        timestamp=int(time.time()),             # Unix epoch in seconds
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
    );

    // Submit a metric with a timestamp that is within the last 20 minutes
    sendDistributionMetricWithDate(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        new Date(Date.now()),       // date
        'product:latte',            // First tag
        'order:online',             // Second tag
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
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )

  // Submit a metric with a timestamp that is within the last 20 minutes
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    time.Now(),                     // Timestamp
    "product:latte", "order:online" // Associated tags
  )
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # You only need to wrap your function handler (Not helper functions).
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          "product":"latte", "order":"online" # Associated tags
        )

        # Submit a metric with a timestamp that is within the last 20 minutes
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          time: Time.now.utc,                 # Timestamp
          "product":"latte", "order":"online" # Associated tags
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
            "coffee_house.order_value", // Metric name
            12.45,                      // Metric value
            myTags);                    // Associated tags
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

커스텀 메트릭을 다음 형식으로 기록하는 재사용 가능한 함수를 작성합니다.

```json
{
    "m": "Metric name",
    "v": "Metric value",
    "e": "Unix timestamp (seconds)",
    "t": "Array of tags"
}
```

예시는 다음과 같습니다.

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

### 분포 메트릭 이해 {#understanding-distribution-metrics}

Datadog이 동일한 타임스탬프와 태그 세트를 공유하는 여러 개의 카운트 또는 게이지 메트릭 포인트를 수신할 때, 가장 최근의 것만 반영됩니다. 호스트 기반 애플리케이션에서 작동합니다. 메트릭 포인트는 Datadog 에이전트에 의해 집계되며, 고유한 `host` 태그가 부여됩니다.

트래픽이 증가할 때 Lambda 함수는 많은 동시 실행 환경을 시작할 수 있습니다. 함수는 서로 덮어쓰는 카운트 또는 게이지 메트릭 포인트를 제출할 수 있으며, 이로 인해 과소 집계된 결과가 발생할 수 있습니다. 이 문제를 피하기 위해, Lambda 함수에 의해 생성된 커스텀 메트릭은 [분포][11]로 제출됩니다. 분포 메트릭 포인트는 Datadog 백엔드에서 집계되며, 모든 메트릭 포인트가 반영됩니다.

분포는 기본적으로 `avg`, `sum`, `max`, `min`, `count` 집계를 제공합니다. 메트릭 요약 페이지에서 백분위수 집계(p50, p75, p90, p95, p99)를 활성화하고 [태그 관리][12]도 할 수 있습니다. 게이지 메트릭 유형의 분포를 모니터링하려면, [시간 및 공간 집계][13] 모두에 대해 `avg`를 사용하세요. 카운트 메트릭 유형의 분포를 모니터링하려면, [시간 및 공간 집계][13] 모두에 대해 `sum`을 사용하세요. 시간 및 공간 집계가 어떻게 작동하는지에 대해서는 [Query to the Graph][14] 가이드를 참조하세요.

### Datadog에서 메트릭 사용량, 볼륨 및 가격을 이해합니다.{#understanding-your-metrics-usage-volume-and-pricing-in-datadog}

Datadog은 사용 중인 사용자 정의 메트릭에 대한 세부 정보, 태그 기수 및 Datadog 앱의 [Metrics Summary 페이지][15] 내에서 사용자 정의 메트릭을 관리하는 도구를 제공합니다. 모든 Serverless 사용자 정의 메트릭은 Distribution Metric Origin [패싯 패널][16]의 'Serverless' 태그 아래에서 확인할 수 있습니다. [Metrics without Limits™][17]을 통해 사용자 정의 메트릭의 볼륨과 비용을 제어할 수도 있습니다.

[9]: /ko/logs/logs_to_metrics/
[10]: /ko/tracing/trace_pipeline/generate_metrics/
[11]: /ko/metrics/distributions/
[12]: /ko/metrics/distributions/#customize-tagging
[13]: /ko/metrics/#time-and-space-aggregation
[14]: /ko/dashboards/guide/query-to-the-graph/
[15]: https://app.datadoghq.com/metric/summary
[16]: /ko/metrics/summary/#facet-panel
[17]: /ko/metrics/summary/#metrics-without-limits