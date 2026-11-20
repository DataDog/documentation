---
title: AWS Lambda Serverless 애플리케이션의 Custom Metrics
---
## 개요 {#overview}

Lambda 함수에서 Datadog으로 Custom Metrics를 전송하는 방법은 몇 가지가 있습니다.

- **[로그 또는 트레이스에서 Custom Metrics 생성](#creating-custom-metrics-from-logs-or-traces)**: Lambda 함수가 이미 트레이스 또는 로그 데이터를 Datadog에 전송하고 있고, 쿼리하려는 데이터가 기존 로그 또는 트레이스에 캡처되어 있는 경우, 애플리케이션 코드를 다시 배포하거나 변경하지 않고도 로그 및 트레이스에서 Custom Metrics를 생성할 수 있습니다.
- **[Datadog Lambda Extension을 사용하여 Custom Metrics 제출](#with-the-datadog-lambda-extension)**: Lambda 함수에서 직접 Custom Metrics를 제출하려면 [Datadog Lambda Extension][1]을 사용하는 것이 좋습니다.
- **[Datadog Forwarder Lambda를 사용하여 Custom Metrics 제출](#with-the-datadog-forwarder)**: Datadog Forwarder Lambda를 통해 Lambda 함수에서 텔레메트리를 전송하는 경우 Datadog에서 제공하는 헬퍼 함수를 사용하여 로그를 통해 Custom Metrics를 제출할 수 있습니다.
- **[(지원 중단) CloudWatch 로그에서 Custom Metrics 제출](#deprecated-cloudwatch-logs)**: `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` 형식의 로그를 출력하여 Custom Metrics를 제출하는 방법은 지원이 중단되었습니다. 대신 [Datadog Lambda Extension](#with-the-datadog-lambda-extension)을 사용하는 것이 좋습니다.
- **(지원 중단) Datadog Lambda 라이브러리를 사용하여 Custom Metrics 제출**: Python, Node.js 및 Go용 Datadog Lambda 라이브러리는 `DD_FLUSH_TO_LOG`을 `false`로 설정하면 호출을 차단하여 런타임에서 Datadog으로 Custom Metrics를 동기식으로 전송하는 기능을 지원합니다. 성능 오버헤드 외에도, 일시적인 네트워크 문제가 발생했을 때 재시도하지 않으므로 메트릭 제출 시 간헐적인 오류가 발생할 수 있습니다. 대신 [Datadog Lambda Extension](#with-the-datadog-lambda-extension)을 사용하는 것이 좋습니다.
- **(권장되지 않음) 타사 라이브러리 사용**: 대부분의 타사 라이브러리는 메트릭을 분포 메트릭으로 제출하지 않아 결과가 과소 집계될 수 있습니다. 일시적인 네트워크 문제가 발생했을 때 재시도하지 않으므로 간헐적인 오류가 발생할 수도 있습니다.

### 분포 메트릭 이해 {#understanding-distribution-metrics}

Datadog이 동일한 타임스탬프와 태그 세트를 공유하는 여러 개의 카운트 또는 게이지 메트릭 포인트를 수신할 때, 가장 최근의 것만 반영됩니다. 호스트 기반 애플리케이션에서 작동합니다. 메트릭 포인트는 Datadog Agent에 의해 집계되며, 고유한 `host` 태그가 부여됩니다.

트래픽이 증가할 때 Lambda 함수는 많은 동시 실행 환경을 시작할 수 있습니다. 함수는 서로 덮어쓰는 카운트 또는 게이지 메트릭 포인트를 제출할 수 있으며, 이로 인해 과소 집계된 결과가 발생할 수 있습니다. 이 문제를 피하기 위해 Lambda 함수에서 생성된 Custom Metrics가 [분포][2]로 제출됩니다. 분포 메트릭 포인트가 Datadog 백엔드에서 집계되어 모든 메트릭 포인트가 반영되기 때문입니다.

분포는 기본적으로 `avg`, `sum`, `max`, `min`, `count` 집계를 제공합니다. {{< ui >}}Metrics Catalog{{< /ui >}} 페이지에서 백분위수 집계(p50, p75, p90, p95, p99)를 활성화하고 [태그 관리][3]도 할 수 있습니다. 게이지 메트릭 유형의 분포를 모니터링하려면 [시간 및 공간 집계][4] 둘 다에 `avg`를 사용하세요. 카운트 메트릭 유형의 분포를 모니터링하려면 [시간 및 공간 집계][4] 둘 다에 `sum`을 사용하세요. 시간 및 공간 집계의 작동 방식은 [쿼리에서 그래프까지][5] 가이드를 참조하세요.

### 많은 데이터 포인트 제출 {#submitting-many-data-points}

예를 들어 대규모 `for` 루프 내에서 동일한 메트릭과 동일한 태그 세트에 대해 많은 데이터 포인트를 제출하기 위해 Forwarder를 사용하는 경우, Lambda 성능 및 CloudWatch 비용에 눈에 띄는 영향이 있을 수 있습니다. 애플리케이션에서 데이터 포인트를 집계하여 오버헤드를 방지할 수 있습니다. 다음 Python 예제를 참조하세요.

```python
def lambda_handler(event, context):

    # Inefficient when event['Records'] contains many records
    for record in event['Records']:
      lambda_metric("record_count", 1)

    # Improved implementation
    record_count = 0
    for record in event['Records']:
      record_count += 1
    lambda_metric("record_count", record_count)
```

## 로그 또는 트레이스에서 Custom Metrics 생성 {#creating-custom-metrics-from-logs-or-traces}

로그 기반 메트릭을 사용하면 쿼리에 일치하는 로그의 수를 기록하거나 로그에 포함된 숫자 값을 요약할 수 있습니다. 예를 들어 요청 지속 시간을 기록할 수 있습니다. 로그 기반 메트릭은 비용 효율적으로 수집 스트림 전체에서 로그 데이터를 요약하는 방법입니다. [로그 기반 메트릭 만들기][6]에 대해 자세히 알아보세요.

보존 필터에 의해 인덱싱되었는지 여부에 관계없이 수집된 모든 스팬에서 메트릭을 생성할 수도 있습니다. [스팬 기반 메트릭 만들기][7]에 대해 자세히 알아보세요.
## Datadog Lambda Extension 사용 {#with-the-datadog-lambda-extension}

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda에서 Custom Metrics 수집" >}}

지원되는 Lambda 런타임에서 Custom Metrics를 [**분포**](#understanding-distribution-metrics)로 제출하기 위해 [Datadog Lambda Extension][1]을 사용하는 것이 좋습니다.

1. Lambda 런타임에 적합한 일반 [Serverless 설치 지침][8]을 따르세요.
1. Lambda 함수에서 트레이스를 수집하지 않으려면 환경 변수 `DD_TRACE_ENABLED`를 `false`으로 설정하세요.
1. Lambda 함수에서 로그를 수집하지 않으려면 환경 변수 `DD_SERVERLESS_LOGS_ENABLED`을 `false`로 설정하세요.
1. 아래 샘플 코드 또는 지침에 따라 Custom Metrics를 제출합니다.

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

[java-dogstatsd-client][1] 최신 버전을 설치한 다음 아래 샘플 코드에 따라 Custom Metrics를 [**분포**](#understanding-distribution-metrics)로 제출합니다.

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

[dogstatsd-csharp-client][1] 최신 버전을 설치한 다음 아래 샘플 코드에 따라 Custom Metrics를 [**분포 메트릭**](#understanding-distribution-metrics)으로 제출합니다.

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
2. [샘플 코드][2]에 따라 Custom Metrics를 [**분포**](#understanding-distribution-metrics)로 제출합니다.


[1]: /ko/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ko/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Datadog Forwarder 사용 {#with-the-datadog-forwarder}

Datadog Lambda Extension에서 지원하지 않는 Lambda 런타임에서 Custom Metrics를 제출할 때 [Datadog Forwarder Lambda][9]를 사용하는 것이 좋습니다.

1. 일반 [Serverless 설치 지침][8]에 따라 Datadog Forwarder Lambda 함수를 사용하여 Lambda 함수를 계측합니다.
1. Lambda 함수에서 트레이스를 수집하지 않으려면 자체 Lambda 함수의 환경 변수 `DD_TRACE_ENABLED`를 `false`으로 설정합니다.
1. Lambda 함수에서 로그를 수집하지 않으려면 Forwarder의 CloudFormation 스택 파라미터 `DdForwardLog`을 `false`로 설정합니다.
1. Datadog Lambda 라이브러리의 헬퍼 함수(예: `lambda_metric` 또는 `sendDistributionMetric`)를 가져와 사용하고, 아래 샘플 코드에 따라 Custom Metrics를 제출합니다.

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

Custom Metrics를 다음 형식으로 기록하는 재사용 가능한 함수를 작성합니다.

```json
{
    "m": "Metric name",
    "v": "Metric value",
    "e": "Unix timestamp (seconds)",
    "t": "Array of tags"
}
```

예를 들면 다음과 같습니다.

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

## [지원 중단] CloudWatch 로그 {#deprecated-cloudwatch-logs}

**이 Custom Metrics 제출 방식은 더 이상 지원되지 않으며, 모든 신규 고객에 대해 비활성화되었습니다. 권장 솔루션 중 하나로 마이그레이션하세요.**

**참고**: 권장 솔루션 중 하나로 마이그레이션하는 경우, Custom Metrics를 Datadog에 제출할 때 **새 메트릭 이름**으로 계측하기 시작해야 합니다. 동일한 메트릭 이름을 분포 메트릭 유형과 비분포 메트릭 유형에 동시에 사용할 수 없습니다.

이를 위해서는 [Datadog IAM 정책][10]에 다음 AWS 권한이 필요합니다.

| AWS 권한            | 설명                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | 사용 가능한 로그 그룹을 나열합니다.                                  |
| `logs:DescribeLogStreams` | 그룹에 대해 사용 가능한 로그 스트림을 나열합니다.                     |
| `logs:FilterLogEvents`    | 메트릭을 생성하기 위해 스트림의 특정 로그 이벤트를 가져옵니다. |

Lambda 로그에서 Datadog으로 Custom Metrics를 보내려면 다음 형식으로 로그 라인을 출력하세요.

```text
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

항목:

- `MONITORING`은 Datadog 통합에 이 로그 항목을 수집해야 함을 알립니다.
- `<UNIX_EPOCH_TIMESTAMP>` 는 밀리초가 아닌 초 단위입니다.
- `<METRIC_VALUE>` 는 숫자(정수 또는 부동 소수점)여야 합니다.
- `<METRIC_TYPE>` 은 `count`, `gauge`, `histogram` 또는 `check`입니다.
- `<METRIC_NAME>` 은 메트릭을 고유하게 식별하며 [메트릭 명명 정책][11]을 따릅니다.
- `<TAG_LIST>` 는 선택 사항이며 쉼표로 구분되고 앞에 `#`이 와야 합니다. `function_name:<name_of_the_function>` 태그는 Custom Metrics에 자동으로 적용됩니다.

**참고**: 각 타임스탬프의 합계는 카운트에 사용되며, 특정 타임스탬프의 마지막 값은 게이지에 사용됩니다. 메트릭을 증가시킬 때마다 로그 문을 출력하는 것은 권장되지 않습니다. 로그를 구문 분석하는 데 걸리는 시간이 늘어나기 때문입니다. 코드에서 메트릭 값을 지속적으로 업데이트하고 함수가 종료되기 전에 해당 메트릭에 대한 로그 문을 하나 출력합니다.

[1]: /ko/serverless/libraries_integrations/extension/
[2]: /ko/metrics/distributions/
[3]: /ko/metrics/distributions/#customize-tagging
[4]: /ko/metrics/#time-and-space-aggregation
[5]: /ko/dashboards/guide/query-to-the-graph/
[6]: /ko/logs/logs_to_metrics/
[7]: /ko/tracing/trace_pipeline/generate_metrics/
[8]: /ko/serverless/installation/
[9]: /ko/serverless/forwarder/
[10]: /ko/integrations/amazon_web_services/?tab=roledelegation#datadog-aws-iam-policy
[11]: /ko/metrics/