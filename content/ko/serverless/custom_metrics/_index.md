---
title: AWS Lambda 서버리스 애플리케이션의 커스텀 메트릭
---

## 개요

Lambda 함수에서 커스텀 메트릭을 Datadog에 제출하는 방법에는 몇 가지가 있습니다.

- **[로그 또는 트레이스에서 커스텀 메트릭 생성](#creating-custom-metrics-from-logs-or-traces)**: Lambda 함수가 이미 트레이스 또는 로그 데이터를 Datadog에 전송하고 있고, 쿼리하려는 데이터가 기존 로그 또는 트레이스에 캡처되어 있는 경우, 애플리케이션 코드를 다시 배포하거나 변경하지 않고도 로그 및 트레이스에서 커스텀 메트릭을 생성할 수 있습니다.
- **[Datadog Lambda 확장을 사용하여 커스텀 메트릭 제출하기](#with-the-datadog-lambda-extension)**: Lambda 함수에서 직접 커스텀 메트릭을 제출하려는 경우, Datadog은 [Datadog Lambda 확장][1]을 사용할 것을 권장합니다.
- **[Datadog Forwarder Lambda를 사용하여 커스텀 메트릭 제출하기](#with-the-datadog-forwarder)**: Datadog Forwarder Lambda를 통해 Lambda 함수에서 텔레메트리를 전송하는 경우, Datadog이 제공하는 헬퍼 함수를 사용하여 로그를 통해 커스텀 메트릭을 제출할 수 있습니다.
- **[(더 이상 사용되지 않음) CloudWatch 로그에서 커스텀 메트릭 제출하기](#deprecated-cloudwatch-logs)**: `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` 형식의 로그를 출력하여 커스텀 메트릭을 제출하는 메서드는 더 이상 사용되지 않습니다. Datadog은 대신 [Datadog Lambda 확장](#with-the-datadog-lambda-extension) 사용을 권장합니다.
- **(더 이상 사용되지 않음) Datadog Lambda 라이브러리를 사용하여 커스텀 메트릭 제출하기**: Python, Node.js 및 Go용 Datadog Lambda 라이브러리는 `DD_FLUSH_TO_LOG`를 `false`로 설정하면 호출을 차단하고 런타임에서 Datadog으로 커스텀 메트릭을 동기식으로 보내는 것을 지원합니다. 성능 오버헤드 외에도 메트릭 전송은 일시적인 네트워크 문제로 인해 재시도할 수 없으므로 간헐적으로 오류가 발생할 수 있습니다. Datadog은 [Datadog Lambda 확장](#with-the-datadog-lambda-extension)을 대신 사용할 것을 권장합니다.
- **(권장하지 않음) 타사 라이브러리 사용하기**: 대부분의 타사 라이브러리는 메트릭을 분포로 제출하지 않으므로 결과가 과소 집계될 수 있습니다. 또한 일시적인 네트워크 문제로 인해 재시도 횟수가 부족하여 간헐적인 오류가 발생할 수도 있습니다.

### 분포 메트릭 이해하기

Datadog이 동일한 타임스탬프 및 태그 세트를 공유하는 여러 카운트 또는 게이지 메트릭 포인트를 수신하는 경우, 가장 최근의 것만 계산됩니다. 이는 메트릭 포인트가 Datadog Agent에 의해 집계되고 고유한 `host` 태그로 태그가 지정되므로 호스트 기반 애플리케이션에서 작동합니다.

트래픽이 증가하면 Lambda 함수가 여러 개의 동시 실행 환경을 시작할 수 있습니다. 이 함수는 서로를 덮어쓰는 카운트 또는 게이지 메트릭 포인트를 제출하여 과소 계산된 결과를 초래할 수 있습니다. 이 문제를 피하기 위해, 분포 메트릭 포인트가 Datadog 백엔드에서 집계되고 모든 메트릭 포인트가 카운트되기 때문에 Lambda 함수에 의해 생성된 커스텀 메트릭은 [분포][2]로 제출됩니다.

분포는 기본적으로 `avg`, `sum`, `max`, `min`, `count` 집계를 제공합니다. Metric Summary 페이지에서 백분위수 집계(p50, p75, p90, p95, p99)와 [태그 관리][3]를 활성화할 수 있습니다. 게이지 메트릭 유형에 대한 분포를 모니터링하려면 [시간 및 공간 집계][4]를 위해 `avg`를 사용합니다. 카운트 메트릭 유형에 대한 분포를 모니터링하려면 [시간 및 공간 집계][4]를 위해 `sum`을 사용합니다. 시간 및 공간 집계가 작동하는 방식은 [그래프에 쿼리하기][5] 가이드를 참조하세요.

### 히스토리 메트릭 제출하기

히스토리 메트릭(최근 20분 이내의 타임스탬프만 허용됨)을 제출하려면, [Datadog Forwarder](#with-the-datadog-forwarder)를 사용해야 합니다. [Datadog Lambda 확장](#with-the-datadog-lambda-extension)은 StatsD 프로토콜의 제한으로 인해 현재 타임스탬프가 있는 메트릭만 제출할 수 있습니다.

### 많은 데이터 포인트 전송하기

Forwarder를 사용하여 동일한 메트릭과 동일한 태그 세트에 대해 많은 데이터 포인트를 제출하는 경우(예: 큰 `for` 루프 내부), Lambda의 성능에 눈에 띄는 영향이 있을 수 있으며 CloudWatch 비용에도 영향을 미칠 수 있습니다. 오버헤드를 피하기 위해 애플리케이션에서 데이터 포인트를 집계할 수 있으며, 다음 Python 예제를 참조하세요:

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

## 로그 또는 트레이스에서 커스텀 메트릭 만들기

로그 기반 메트릭을 사용하면 쿼리와 일치하는 로그의 수를 기록하거나 요청 기간과 같이 로그에 포함된 숫자 값을 요약할 수 있습니다. 로그 기반 메트릭은 전체 수집 스트림에서 로그 데이터를 요약하는 비용 효율적인 방법입니다. [로그 기반 메트릭 만들기][6]에 대해 자세히 알아보세요.

보존 필터에 의해 인덱싱되었는지 여부에 관계없이 수집된 모든 스팬에서 메트릭을 생성할 수도 있습니다. [스팬 기반 메트릭 만들기][7]에 대해 자세히 알아보세요.
## Datadog Lambda 확장 사용

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Custom Metrics from AWS Lambda" >}}

Datadog은 지원되는 Lambda 런타임에서 커스텀 메트릭을 [**분포**](#understanding-distribution-metrics)로 제출하기 위해 [Datadog Lambda 확장][1] 사용을 권장합니다.

1. 해당 Lambda 런타임에 적합한 일반적인 [서버리스 설치 지침][8]을 따르세요.
1. Lambda 함수에서 트레이스를 수집하지 않으려면 환경 변수 `DD_TRACE_ENABLED`를 `false`로 설정하세요.
1. Lambda 함수에서 로그를 수집하지 않으려면 환경 변수 `DD_SERVERLESS_LOGS_ENABLED`를 `false`로 설정하세요.
1. 아래의 샘플 코드 또는 지침에 따라 커스텀 메트릭을 제출하세요.

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

최신 버전의 [java-dogstatsd-client][1]를 설치한 다음 아래 샘플 코드에 따라 커스텀 메트릭을 [**분포**](#understanding-distribution-metrics)로 제출합니다.

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
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

최신 버전의 [dogstatsd-csharp-client][1]를 설치한 다음 아래 샘플 코드에 따라 커스텀 메트릭을 [**분포 메트릭**](#understanding-distribution-metrics)으로 제출합니다.

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
2. [샘플 코드][2]대로 커스텀 메트릭을 [**분포**](#understanding-distribution-metrics)로 제출


[1]: /ko/developers/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /ko/developers/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Datadog Forwarder 사용

Datadog은 Datadog Lambda 확장이 지원하지 않는 Lambda 런타임에서 커스텀 메트릭을 전송할 때 [Datadog Forwarder Lambda][9] 사용을 권장합니다.

1. 일반적인 [서버리스 설치 지침][8]에 따라 Datadog Forwarder Lambda 함수를 사용하여 Lambda 함수를 계측하세요.
1. Lambda 함수에서 트레이스를 수집하지 않으려면 해당 Lambda 함수에서 환경 변수 `DD_TRACE_ENABLED`를 `false`로 설정하세요.
1. Lambda 함수에서 로그를 수집하지 않으려면 Forwarder의 CloudFormation 스택 파라미터 `DdForwardLog`를 `false`로 설정하세요.
1. `lambda_metric` 또는 `sendDistributionMetric`와 같은  Datadog Lambda 라이브러리에서 헬퍼 함수를 가져와 아래 샘플 코드에 따라 커스텀 메트릭을 제출하세요.

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

## [더 이상 사용되지 않음] CloudWatch 로그

**이 커스텀 메트릭 제출 방법은 더 이상 지원되지 않으며 모든 신규 고객에게 비활성화되어 있습니다. 권장 솔루션 중 하나로 이전하세요.**

**참고**: 권장 솔루션 중 하나로 이전하는 경우, 커스텀 메트릭을 Datadog에 제출할 때 **새 메트릭 이름**으로 계측을 시작해야 합니다. 동일한 메트릭 이름은 분포 메트릭 유형과 비분포 메트릭 유형으로 동시에 존재할 수 없습니다.

이를 위해서는 [Datadog IAM 정책][10]에 다음과 같은 AWS 권한이 필요합니다.

| AWS 권한             | 설명                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | 사용 가능한 로그 그룹을 나열합니다.                                  |
| `logs:DescribeLogStreams` | 그룹에 사용 가능한 로그 스트림을 나열합니다.                     |
| `logs:FilterLogEvents`    | 스트림에 대한 특정 로그 이벤트를 가져와 메트릭을 생성합니다. |

Lambda 로그에서 커스텀 메트릭을 Datadog으로 보내려면 다음 형식을 사용하여 로그 행을 출력합니다:

```text
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

여기에서

- `MONITORING`은 이 로그 엔트리를 수집해야 한다는 신호를 Datadog 통합에 보냅니다.
- `<UNIX_EPOCH_TIMESTAMP>`는 초 단위입니다. (밀리초 아님)
- `<METRIC_VALUE>`는 반드시 숫자(정수 또는 부동소수점 숫자) 이어야 합니다.
- `<METRIC_TYPE>`은 `count`, `gauge`, `histogram`, 또는 `check`입니다.
- `<METRIC_NAME>`은 메트릭을 고유하게 식별하고 [메트릭 이름 지정 정책][11]을 따릅니다.
- `<TAG_LIST>`는 선택 사항으로 쉼표로 구분되며, 앞에 반드시 `#`이 있어야 합니다. 태그 `function_name:<name_of_the_function>`는 커스텀 메트릭에 자동으로 적용됩니다.

**참고**: 각 타임스탬프의 합계는 카운트에 사용되며 주어진 타임스탬프의 마지막 값은 게이지에 사용됩니다. 메트릭을 증가시킬 때마다 로그 문을 출력하면 로그를 파싱하는데 시간이 길어지므로 권장하지 않습니다. 코드에서 메트릭 값을 계속 업데이트하고 함수가 완료되기 전에 해당 메트릭에 대한 로그 문을 한 번만 출력하세요.

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